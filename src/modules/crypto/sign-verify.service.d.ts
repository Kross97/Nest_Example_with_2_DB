/**
 *  Документация по options в методе generateKeyPairSync :
 *
 *   modulusLength: <number> Размер ключа в битах (RSA, DSA).
     publicExponent: <number> Публичная экспонента (RSA). По умолчанию: 0x10001.
     hashAlgorithm: <string> Имя дайджеста сообщения (RSA-PSS).
     mgf1HashAlgorithm: <string> Имя дайджеста сообщения, используемого MGF1 (RSA-PSS).
     saltLength: <number> Минимальная длина соли в байтах (RSA-PSS).
     divisorLength: <number> Размер q в битах (DSA).
     namedCurve: <string> Имя кривой, которую следует использовать (EC).
     prime: <Buffer> Параметр prime (DH).
     primeLength: <number> Длина прайма в битах (DH).
     generator: <number> Пользовательский генератор (DH). По умолчанию: 2.
     groupName: <string> Имя группы Диффи-Хеллмана (DH). См. crypto.getDiffieHellman().
     paramEncoding: <string>. Должно быть именованным или явным (EC). По умолчанию: 'named'.
     publicKeyEncoding: <Object> См. keyObject.export().
     privateKeyEncoding: <Object> См. keyObject.export()
 * */
export declare class SignVerifyService {
    private readonly privateKey;
    private readonly publicKey;
    constructor();
    /**
     * Создание классов Sign и Verify
     * 1. Sign - для создания подписи, и подписи данных
     * 2. Verify - для проверки данных с помощью публичного ключа и сигнатуры (Buffer)
     * */
    private initialSignVerifyInstances;
    createSign(text: string): Promise<string>;
    verifySign(text: string, signature: string): Promise<boolean>;
}
//# sourceMappingURL=sign-verify.service.d.ts.map