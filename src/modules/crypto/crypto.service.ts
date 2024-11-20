import { Injectable } from '@nestjs/common';
import { scrypt, randomFill, createCipheriv, scryptSync, createDecipheriv } from 'crypto';

const algorithm = 'aes-192-cbc';
const password = 'Password used to generate key';

const encryptedTest = 'a987171b2035ea9f6d7679ff854e484ec0e257aefc7dfa1326c3622389b3b93d'

@Injectable()
export class CryptoService {

  getCipherExampleFirstData() {
   return new Promise((resolve) => {
     scrypt(password, process.env.SECRET_TOKEN_KEY, 24, (err, key) => {
       if (err) throw err;

       console.log('key =>', key);
       // Затем мы сгенерируем случайный вектор инициализации
       randomFill(new Uint8Array(16), (err, iv) => {
         if (err) throw err;

         // Получив ключ и iv, мы можем создать и использовать шифр...
         const cipher = createCipheriv(algorithm, key, iv);

         let encrypted = '';
         cipher.setEncoding('hex');

         cipher.on('data', (chunk) => (encrypted += chunk));
         cipher.on('end', () => {
           resolve(encrypted);
         });

         cipher.write('some clear text data');
         cipher.end();
       });
     });
   })
  }

  async getDecipherExampleFirstData() {
    return new Promise((resolve) => {
      const algorithm = 'aes-192-cbc';
      const password = 'Password used to generate key';
        // Key length is dependent on the algorithm. In this case for aes192, it is
        // 24 bytes (192 bits).
        // Use the async `crypto.scrypt()` instead.
      const key = scryptSync(password, 'salt', 24);
        // The IV is usually passed along with the ciphertext.
      const iv = Buffer.alloc(16, 0); // Initialization vector.

      const decipher = createDecipheriv(algorithm, key, iv);

      let decrypted = '';
      decipher.on('readable', () => {
        let chunk;
        while (null !== (chunk = decipher.read())) {
          decrypted += chunk.toString('utf8');
        }
      });
      decipher.on('end', () => {
        console.log('decrypted', decrypted);
        // Prints: some clear text data
      });

      // Encrypted with same algorithm, key and iv.
      const encrypted =
        'e5f79c5915c02171eec6b212d5520d44480993d7d622a7c4c2da32f6efda0ffa';
      decipher.write(encrypted, 'hex');
      decipher.end();
    });
  }
}
