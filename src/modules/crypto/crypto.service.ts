import { Injectable } from '@nestjs/common';
import { scrypt, randomFill, createCipheriv, scryptSync, createDecipheriv } from 'crypto';

const algorithm = 'aes-192-cbc';

@Injectable()
export class CryptoService {

  private async getScrypt(): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      scrypt(process.env.DB_MAIN_PASSWORD, process.env.SECRET_TOKEN_KEY, 24, (err, key) => {
        if(err) reject(err);
        resolve(key);
      });
    })
  }

  /**
   * Заполнение буффер массива для крипто-операций
   * */
  private async getRandomFill(): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
      randomFill(new Uint8Array(16), (err, vector) => {
        if(err) reject(err);
        resolve(vector);
      })
    });
  }

  getCipherExampleFirstData(text: string) {
   return new Promise(async (resolve, reject) => {
     const scriptKey = await this.getScrypt();
     const vector = await this.getRandomFill();

     // Получив ключ и iv, мы можем создать и использовать шифр...
     const cipher = createCipheriv(algorithm, scriptKey, vector);

     let encrypted = '';
     cipher.setEncoding('hex');

     cipher.on('data', (chunk) => (encrypted += chunk));
     cipher.on('end', () => {
       console.log('encrypted =>', encrypted);
       resolve(encrypted);
     });

     cipher.write(text);
     cipher.end();
   })
  }

  async getDecipherExampleFirstData(text: string) {
    console.log('text =>', text);
    return new Promise(async (resolve) => {
      const scriptKey = await this.getScrypt();
      const iv = await this.getRandomFill();// Buffer.alloc(16, 0); // Инициализировать вектор массив
      const decipher = createDecipheriv(algorithm, scriptKey, iv);

      let decrypted = '';
      decipher.on('readable', () => {
        let chunk;
        while (null !== (chunk = decipher.read())) {
          decrypted += chunk.toString('utf8');
        }
      });
      decipher.on('end', () => {
        console.log('decrypted =>', decrypted);
        resolve(decrypted);
      });

      decipher.write(text, 'hex');
      decipher.end();
    });
  }
}
