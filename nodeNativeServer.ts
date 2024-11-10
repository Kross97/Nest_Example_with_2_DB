import * as http from 'http';


http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
  req.on('data', (chunk) => {
    console.log('Проверка данных', chunk);
  });
  res.end('ответ на запрос');
}).listen(3002, () => {
  console.log("СЕРВЕ_ЗАПУЩЕН_НА ПОРТУ 3002")
});
