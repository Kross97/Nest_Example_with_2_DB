// @ts-nocheck
import * as cluster from "cluster";
import * as http from "http";


function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

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

const startPort = 3002;
const countClusterServers = 4;

const isHtmlRedirect = false;

if (cluster.isPrimary) {
    console.log('Основной процесс');
    for (let i = 0; i <= countClusterServers; i++) {
        const worker = cluster.fork({forkNumber: `форк_номер_${i + 1}`});
        if(i === 0){
            initWorkerEvents(worker);
        }
    }

    const httpServer = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
        const randomClusterPort = randomIntFromInterval(startPort + 1, startPort + 1 + countClusterServers);

        if(isHtmlRedirect) {
            res.appendHeader('content-type', 'text/html; charset=utf-8');
            res.appendHeader('x-port-number', randomClusterPort)
            res.end(`
             <html>
                <head>
                    <meta http-equiv="refresh" content="10; URL=http://localhost:${randomClusterPort}/" />
                </head>
                <body style="background-color: #bcbbbb">
                 <div style="font-size: 18px; font-weight: bold; color: #6767f6">Ответ на запрос от основного сервера.
                    Перенаправление на кластер сервер на порту <a href="http://localhost:${randomClusterPort}/">${randomClusterPort}</a>
                 </div> 
                </body> 
            </html>
            `)
        } else {
            res.appendHeader('content-type', 'text/plain; charset=utf-8');
            /**
             * Делаем перенаправление на кластер-сервер 301 код (постоянные редирект)
             * */
            res.statusCode = 301;
            res.appendHeader('location', `http://localhost:${randomClusterPort}/`);
            res.appendHeader('x-port-number', randomClusterPort)
            res.end(`Ответ на запрос от основного сервера. Порт кластер сервера ${randomClusterPort}`);
        }

    })

    httpServer.listen(startPort, () => {
        console.log(`ОСНОНОЙ_СЕРВЕР_ЗАПУЩЕН_НА ПОРТУ ${startPort}`)
    });
} else if (cluster.isWorker) {
    // cluster.worker - Ссылка на текущий объект worker. Недоступно в основном процессе.
    const currentPort = cluster.worker.id + startPort;

    console.log(`Форкнутый процесс,
            id: ${cluster.worker.id},\n
            isConnected: ${cluster.worker.isConnected()} // true, если форк подключен к своему основному через его IPC-канал,\n
            isDead: ${cluster.worker.isDead()} // true, если процесс рабочего завершился (из-за выхода, из-за получения сигнала),\n
            exitedAfterDisconnect: ${cluster.worker.exitedAfterDisconnect} // true, если рабочий вышел через .disconnect().\n
            Если рабочий вышел другим способом, оно равно false. Если рабочий не вышел, то не определено. \n
            `)

    // Прокинутые env в форкнутый процесс
    console.log('ENV прокинутый в форкнутый процесс', process.env.forkNumber)
    if (currentPort) {
        const httpServer = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
            res.appendHeader('content-type', 'text/plain; charset=utf-8')
            res.end(`Ответ на запрос от кластер сервера, ${process.env.forkNumber}`);
        })

        httpServer.listen(currentPort, () => {
            console.log(`КЛАСТЕР_СЕРВЕР_ЗАПУЩЕН_НА ПОРТУ ${currentPort} для ${process.env.forkNumber}`)
        });
    }
}

