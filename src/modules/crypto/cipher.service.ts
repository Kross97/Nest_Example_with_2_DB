import { Injectable } from "@nestjs/common";
import {
  scrypt,
  randomFill,
  createCipheriv,
  scryptSync,
  createDecipheriv,
  Cipher,
  Decipher,
  randomBytes,
} from "crypto";

const algorithm = "aes-192-cbc";

@Injectable()
export class CipherService {
  private cipher: Cipher = null;

  private deCipher: Decipher = null;

  private ivPersist: Buffer = null;

  private secretKeyPersist = null;

  constructor() {
    /**
     * КЛЮЧ ДОЛЖЕН СОСТОЯТЬ из 24 символов
     * Может быть как строкой так и Buffer
     * */
    this.secretKeyPersist = process.env.SECRET_TOKEN_KEY; // Buffer.from(process.env.SECRET_TOKEN_KEY)
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

  private createCipherInstance(iv: Buffer) {
    const cipher = createCipheriv(algorithm, this.secretKeyPersist, iv); // iv - this.ivPersist Если шифру не требуется вектор инициализации, iv может быть null.
    cipher.setEncoding("hex");
    return cipher;
  }

  // ошибка вылетает если разные секретные ключи
  // error:06065064:digital envelope routines:EVP_DecryptFinal_ex:bad decrypt
  private createDeCipherInstance(iv: Buffer) {
    return createDecipheriv(algorithm, this.secretKeyPersist, iv); // iv - this.ivPersist Если шифру не требуется вектор инициализации, iv может быть null.
  }

  // должен быть размеров 16 байтов
  /**
   * Если у Cipher и Decipher будут разные векторы инициализации (IV) то шифрование ломается (нужно сохранять одинаковые как секретный ключ, так и векторы)
   * */
  private generateInitializationVector() {
    return randomBytes(16);
  }

  /**
   * scrypt - это функция получения ключа на основе пароля, которая спроектирована так,
   * чтобы быть дорогой в вычислительном плане и по памяти,
   * чтобы сделать атаки "грубой силы" невыгодными. (Документация)
   * */
  private async getScrypt(): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      //  КЛЮЧ для Cipher\Decipher ДОЛЖЕН СОСТОЯТЬ из 24 символов
      scrypt(process.env.DB_MAIN_PASSWORD, process.env.SECRET_TOKEN_KEY, 24, (err, key) => {
        if (err) reject(err);
        resolve(key);
      });
    });
  }

  /**
   * Заполнение буффер массива для крипто-операций
   * */
  private async getRandomFill(): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
      randomFill(new Uint8Array(16), (err, vector) => {
        if (err) reject(err);
        resolve(vector);
      });
    });
  }

  async getCipherExampleOnce(text: string) {
    await this.initCiphersInstances();
    return new Promise(async (resolve, reject) => {
      let encrypted = "";
      this.cipher.setEncoding("hex");

      this.cipher.on("data", (chunk) => (encrypted += chunk));
      this.cipher.on("end", () => {
        resolve(encrypted);
      });

      this.cipher.write(text);
      this.cipher.end();
    });
  }

  async getDecipherExampleOnce(text: string) {
    return new Promise(async (resolve) => {
      let decrypted = "";
      this.deCipher.on("readable", () => {
        let chunk;
        while ((chunk = this.deCipher.read()) !== null) {
          decrypted += chunk.toString("utf8");
        }
      });
      this.deCipher.on("end", () => {
        resolve(decrypted);
      });

      this.deCipher.write(text, "hex");
      this.deCipher.end();
    });
  }

  private IvBufferStringSeparation = "+$+";

  async getCipherExamplePersist(text: string) {
    const iv = this.generateInitializationVector();
    const cipher = this.createCipherInstance(iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return `${iv.toString("hex")}${this.IvBufferStringSeparation}${encrypted.toString("hex")}`;
  }

  async getDeCipherExamplePersist(text: string) {
    const [ivBufferString, currentText] = text.split(this.IvBufferStringSeparation);
    const decipher = this.createDeCipherInstance(Buffer.from(ivBufferString, "hex"));
    const encryptedText = Buffer.from(currentText, "hex");
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString("utf8");
  }
}
