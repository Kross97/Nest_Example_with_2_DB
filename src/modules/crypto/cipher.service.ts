import { Injectable } from '@nestjs/common';
import { scrypt, randomFill, createCipheriv, scryptSync, createDecipheriv, Cipher, Decipher } from 'crypto';

const algorithm = 'aes-192-cbc';

@Injectable()
export class CipherService {

  private cipher: Cipher = null;

  private deCipher: Decipher = null;


  constructor() {
  }

  /**
   * Мои заметки:
   * 1. создавать экземпляры Cipher и Decipher нужно из одного и того же scriptKey и vector иначе де-шифровка происходит некорректно
   * 2. инициализировать Cipher и Decipher нужно перед каждой операцией шифрование и де-шифрования иначе запрос падает в долгий "pending"
   * */
  private async initCiphersInstances() {
      const scriptKey = await this.getScrypt();
      const vector = await this.getRandomFill();

      // Получив ключ и iv, мы можем создать и использовать шифр...
      this.cipher = createCipheriv(algorithm, scriptKey, vector);
      this.deCipher = createDecipheriv(algorithm, scriptKey, vector);
  }


  /**
   * scrypt - это функция получения ключа на основе пароля, которая спроектирована так,
   * чтобы быть дорогой в вычислительном плане и по памяти,
   * чтобы сделать атаки "грубой силы" невыгодными. (Документация)
   * */
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

  async getCipherExampleFirstData(text: string) {
    await this.initCiphersInstances();
    return new Promise(async (resolve, reject) => {

     let encrypted = '';
     this.cipher.setEncoding('hex');

     this.cipher.on('data', (chunk) => (encrypted += chunk));
     this.cipher.on('end', () => {
       console.log('encrypted =>', encrypted);
       resolve(encrypted);
     });

     this.cipher.write(text);
     this.cipher.end();
   })
  }

  async getDecipherExampleFirstData(text: string) {
    console.log('text =>', text);
    return new Promise(async (resolve) => {
      let decrypted = '';
      this.deCipher.on('readable', () => {
        let chunk;
        while (null !== (chunk = this.deCipher.read())) {
          decrypted += chunk.toString('utf8');
        }
      });
      this.deCipher.on('end', () => {
        console.log('decrypted =>', decrypted);
        resolve(decrypted);
      });

      this.deCipher.write(text, 'hex');
      this.deCipher.end();
    });
  }
}
