export declare class CipherService {
    private cipher;
    private deCipher;
    private ivPersist;
    private secretKeyPersist;
    constructor();
    /**
     * Мои заметки:
     * 1. создавать экземпляры Cipher и Decipher нужно из одного и того же scriptKey и vector иначе де-шифровка происходит некорректно
     * 2. инициализировать Cipher и Decipher нужно перед каждой операцией шифрование и де-шифрования иначе запрос падает в долгий "pending"
     * */
    private initCiphersInstances;
    private createCipherInstance;
    private createDeCipherInstance;
    /**
     * Если у Cipher и Decipher будут разные векторы инициализации (IV) то шифрование ломается (нужно сохранять одинаковые как секретный ключ, так и векторы)
     * */
    private generateInitializationVector;
    /**
     * scrypt - это функция получения ключа на основе пароля, которая спроектирована так,
     * чтобы быть дорогой в вычислительном плане и по памяти,
     * чтобы сделать атаки "грубой силы" невыгодными. (Документация)
     * */
    private getScrypt;
    /**
     * Заполнение буффер массива для крипто-операций
     * */
    private getRandomFill;
    getCipherExampleOnce(text: string): Promise<unknown>;
    getDecipherExampleOnce(text: string): Promise<unknown>;
    private IvBufferStringSeparation;
    getCipherExamplePersist(text: string): Promise<string>;
    getDeCipherExamplePersist(text: string): Promise<string>;
}
//# sourceMappingURL=cipher.service.d.ts.map