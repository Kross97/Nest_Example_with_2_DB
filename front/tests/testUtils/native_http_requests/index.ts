//@ts-nocheck
import http from 'http';

interface IRequest {
  url: string;
  method?: 'GET' | 'POST' | 'DELETE';
  body?: any;
  headers?: any
}

export const getNativeRequest = ({ url, body = '', headers = {}, method = 'GET'}: IRequest): Promise<any> => {
  return new Promise((resolve, reject) => {
    const allData = [];
    const usersRequestClient = http.request(url,{  method, headers: {...headers} });


    usersRequestClient.addListener('response', (response) => {
      response.addListener('data', (chunk) => {
        allData.push(chunk);
      });

      response.addListener('end', () => {
        resolve(JSON.parse(Buffer.from(Buffer.concat(allData)).toString('utf8')));
      });
    });

    if(body) {
      const buffer = Buffer.from(JSON.stringify(body), 'utf8');
      console.log("BUFFER", buffer);
      usersRequestClient.end(buffer);
    } else {
      usersRequestClient.end();
    }

    setTimeout(reject, 10_000);
  });
};
