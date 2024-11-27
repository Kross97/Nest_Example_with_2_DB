// @ts-nocheck
import {Injectable} from "@nestjs/common";
import * as cluster from 'node:cluster';


const initWorkerEvents = (worker: any) => {

    /**
     * Выдается после отключения IPC-канала рабочего. Это может произойти, когда рабочий изящно завершает работу,
     * его убивают или отключают вручную (например, с помощью worker.disconnect()).
     *
     * Между событиями 'disconnect' и 'exit' может быть задержка. Эти события могут быть использованы для обнаружения того,
     * что процесс застрял в очистке или что есть долгоживущие соединения.
     * */

    worker.on('disconnect', () => {
      console.log('disconnect - Выдается после отключения IPC-канала рабочего')
    });

    worker.on('error', (err) => {
      console.log("error - событие ошибки в ворвкере", err);
    });

    /**
     *  code <number> Код выхода, если выход произошел нормально.
        signal <string> Имя сигнала (например, 'SIGHUP'), который вызвал завершение процесса.
     * */
    worker.on('exit', (code, signal) => {
      console.log(`Exit - Когда любой из рабочих умирает, кластерный модуль выдает событие exit, code: ${code}, signal: ${signal}`)
    });

    /**
     * address - содержит следующие свойства соединения: address, port и addressType
     * */
    worker.on('listening', (address) => {
        console.log(`listening - старт запуска прослушивания в процессе по адресу: ${JSON.stringify(address, undefined, 2)}`)
    });

    // будет использоваться в сервисе
    // worker.on('message', () => {
    //
    // });

    worker.on('online', () => {
       console.log('Online - событие запуска процесса после форка')
    })
};

@Injectable()
export class ClusterService {

    startClustersFork() {

        if(cluster.isPrimary) {
            console.log('Основной процесс');
            const workerFirst = cluster.fork({ test: 'test_env_1'});
            initWorkerEvents(workerFirst);
            const workerSecond = cluster.fork({ test: 'test_env_2'});
            workerFirst.on('listening', () => {
              workerFirst.send('Соощение воркеру №1')
            });
            workerSecond.on('listening', () => {
               workerSecond.send('Сообщение воркеру №2')
            });
            // console.log("Воркеры внутри cluster", cluster.workers);

        } else if(cluster.isWorker) {
            // cluster.worker - Ссылка на текущий объект worker. Недоступно в основном процессе.
            cluster.worker.on('message', (message, handle) => {
                console.log(`Сообщение полученное в форкнутом воркере id: ${cluster.worker.id}, message: ${message}, handle: ${handle}`);
            });

            // Прокинутые env в форкнутый процесс
            console.log('ENV прокинутый в форкнутый процесс', process.env.test)


            console.log(`Форкнутый процесс,
            id: ${cluster.worker.id}, \n
            isConnected: ${cluster.worker.isConnected()} // true, если форк подключен к своему основному через его IPC-канал, \n
            isDead: ${cluster.worker.isDead()} // true, если процесс рабочего завершился (из-за выхода, из-за получения сигнала), \n
            exitedAfterDisconnect: ${cluster.worker.exitedAfterDisconnect} // true, если рабочий вышел через .disconnect(). Если рабочий вышел другим способом, оно равно false. Если рабочий не вышел, то не определено. \n
            `)
        }
    }
}
