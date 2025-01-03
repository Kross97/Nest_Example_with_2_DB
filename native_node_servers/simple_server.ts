import * as http from 'http';


http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
  req.on('data', (chunk) => {
    console.log('Проверка данных', chunk);
  });

  if(req.url.includes('/users')) {
    const allData = [];
    const usersRequestClient = http.request(`http://localhost:3001/user/all`);


    usersRequestClient.addListener('response', (response) => {
      response.addListener('data', (chunk) => {
        allData.push(chunk);
      });

      response.addListener('end', () => {
        res.end(Buffer.from(Buffer.concat(allData)).toString('utf8'))
      });
    });
    usersRequestClient.end();
  } else {
    res.end('ответ на запрос');
  }
}).listen(3002, () => {
  console.log("СЕРВЕ_ЗАПУЩЕН_НА ПОРТУ 3002")
});
