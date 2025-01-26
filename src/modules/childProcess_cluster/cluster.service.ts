// @ts-nocheck
import { Injectable } from "@nestjs/common";
import * as cluster from "node:cluster";
import type { Cluster, Worker } from "cluster";
import * as os from "os";
import { Response } from "express";
import { randomIntFromInterval } from "../../common/utils/randomIntFromInterbal";

// @ts-ignore
const typedCluster = cluster as Cluster;

const initWorkerEvents = async (worker: Worker) => {
  return new Promise((resolve) => {
    /**
     * Выдается после отключения IPC-канала рабочего. Это может произойти, когда рабочий изящно завершает работу,
     * его убивают или отключают вручную (например, с помощью worker.disconnect()).
     *
     * Между событиями 'disconnect' и 'exit' может быть задержка. Эти события могут быть использованы для обнаружения того,
     * что процесс застрял в очистке или что есть долгоживущие соединения.
     * */

    worker.on("disconnect", () => {
      console.log(`disconnect событие worker ${worker.id} - Выдается после отключения IPC-канала рабочего`);
    });

    worker.on("error", (err) => {
      console.log(`error событие worker ${worker.id} - событие ошибки в ворвкере`, err);
    });

    /**
     *  code <number> Код выхода, если выход произошел нормально.
     signal <string> Имя сигнала (например, 'SIGHUP'), который вызвал завершение процесса.
     * */
    worker.on("exit", (code, signal) => {
      console.log(
        `Exit событие worker ${worker.id} - Когда любой из рабочих умирает, кластерный модуль выдает событие exit, code: ${code}, signal: ${signal}`
      );
    });

    /**
     * address - содержит следующие свойства соединения: address, port и addressType
     * */
    worker.on("listening", (address) => {
      console.log(
        `listening событие  worker ${worker.id} - старт запуска прослушивания в процессе по адресу: ${JSON.stringify(
          address,
          undefined,
          2
        )}`
      );
      resolve(address.port);
    });

    worker.on("message", (message, handle) => {
      console.log(
        `message событие - Сообщение полученное в форкнутом воркере id: ${typedCluster.worker.id}, message: ${message}, handle: ${handle}`
      );
    });

    worker.on("online", () => {
      console.log(`Online событие worker ${worker.id} - событие запуска процесса после форка`);
    });
  });
};

const initClusterEvents = () => {
  typedCluster.on("message", (data) => {
    console.log("message Основного процесса принятое сообщение от процесса форка", data);
  });
  typedCluster.on("exit", (worker, code, signal) => {
    console.log(`exit Основного процесса - Форк #${worker.id} перестал работать. code -> ${code}, signal -> ${signal}`);
    ClusterService.availablePorts = ClusterService.availablePorts.filter((portData) => portData.id !== worker.id);
    // typedCluster.fork(); // возможность для рестарта форка кластера
  });
  typedCluster.on("disconnect", (worker) => {
    console.log(`disconnect Основного процесса - Форк #${worker.id} отключился от канала IPC (обмен сообщениями)`);
  });
  typedCluster.on("listening", (worker, address) => {
    console.log(`listening Основного процесса - Форк #${worker.id} начал прослушиваться на порту ${address.port}`);
    ClusterService.availablePorts.push({ id: worker.id, port: address.port });
  });
  typedCluster.on("online", (worker) => {
    console.log(`online Основного процесса - Форк #${worker.id} начал работу`);
  });
};

@Injectable()
export class ClusterService {
  static mainPort: number = +process.env.NEST_PORT || 3001;

  static availablePorts = [{ id: null, port: ClusterService?.mainPort }];

  async startClustersFork() {
    if (typedCluster.isPrimary) {
      console.log("Основной процесс запускает кластеризацию");
      initClusterEvents();
      const promised = [];
      for (let i = 0; i <= os.cpus().length; i++) {
        const fork = typedCluster.fork({ forkNumber: `Форк кластера №${i + 1}` });
        promised.push(initWorkerEvents(fork));
      }
      // console.log("Воркеры внутри cluster", cluster.workers);
      return Promise.all(promised);
    }
    if (typedCluster.isWorker) {
      // cluster.worker - Ссылка на текущий объект worker. Недоступно в основном процессе.

      // Прокинутые env в форкнутый процесс
      console.log("ENV прокинутый в форкнутый процесс", process.env.forkNumber);

      console.log(`Форкнутый процесс,
            id: ${typedCluster.worker.id},\n
            isConnected: ${typedCluster.worker.isConnected()} // true, если форк подключен к своему основному через его IPC-канал,\n
            isDead: ${typedCluster.worker.isDead()} // true, если процесс рабочего завершился (из-за выхода, из-за получения сигнала),\n
            exitedAfterDisconnect: ${typedCluster.worker.exitedAfterDisconnect} // true, если рабочий вышел через .disconnect().\n
            Если рабочий вышел другим способом, оно равно false. Если рабочий не вышел, то не определено. \n
           `);
    }
  }

  async exitClusterForks(response: Response) {
    // cluster.workers - все воркеры есть только в основном процессе, в процессе форке будет равно undefined
    if (typedCluster.isPrimary) {
      response.setHeader("content-type", "application/json; charset=utf-8");
      const result = await Promise.all(
        Object.values(typedCluster.workers).map(async (worker) => {
          return new Promise((resolve) => {
            worker.on("exit", () => {
              console.log(`worker ${worker.id} exited`);
              resolve(`worker ${worker.id} exited`);
            });
            worker.send(`Форк ${worker.id} удаляется вручную (message)`);
            worker.disconnect();
            worker.kill();
          });
        })
      );

      response.end(JSON.stringify(result));
    } else if (typedCluster.isWorker) {
      response.redirect(301, `http://localhost:${ClusterService.mainPort}/childProcess_cluster/cluster_exit`);
    }
  }

  getCurrentPort() {
    return ClusterService.availablePorts[randomIntFromInterval(0, ClusterService.availablePorts.length - 1)].port;
  }

  getClustersPortData(response: Response) {
    if (typedCluster.isPrimary) {
      response.setHeader("content-type", "application/json; charset=utf-8");
      response.end(
        JSON.stringify({
          availablePorts: ClusterService.availablePorts.map((portData) => portData.port),
          currentPort: this.getCurrentPort(),
        })
      );
    } else if (typedCluster.isWorker) {
      response.redirect(301, `http://localhost:${ClusterService.mainPort}/childProcess_cluster/cluster_ports`);
    }
  }
}
