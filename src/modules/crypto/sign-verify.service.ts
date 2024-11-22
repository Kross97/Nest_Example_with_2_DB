import {Injectable} from "@nestjs/common";
import {generateKeyPairSync, createSign, createVerify, KeyObject, Sign, Verify} from 'crypto'

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

@Injectable()
export class SignVerifyService {

    private readonly privateKey: KeyObject

    private readonly publicKey: KeyObject

    constructor() {

        /**
         * Генерирует новую пару асимметричных ключей заданного типа.
         * В настоящее время поддерживаются RSA, RSA-PSS, DSA, EC, Ed25519, Ed448, X25519, X448 и DH.
         * */
        const { privateKey, publicKey } = generateKeyPairSync(
            'rsa',
            {
                modulusLength: 2048,
            }
        );
        this.privateKey = privateKey;
        this.publicKey = publicKey;
    }


    /**
     * Создание классов Sign и Verify
     * 1. Sign - для создания подписи, и подписи данных
     * 2. Verify - для проверки данных с помощью публичного ключа и сигнатуры (Buffer)
     * */
    private initialSignVerifyInstances() {
        return { sign: createSign('SHA256') , verify: createVerify('SHA256') }
    }

    async createSign(text: string) {
        const { sign } = this.initialSignVerifyInstances();
        sign.update(text);
        sign.end();
        const signature = sign.sign(this.privateKey);
        console.log("ЗАКРЫТЫЙ (ПРИВАТНЫЙ) КЛЮЧ", this.privateKey);
        console.log("ОТКРЫТЫЙ (ПУБЛИЧНЫЙ) КЛЮЧ", this.publicKey);

        console.log('signature (подпись с приватным ключом)', signature);
        return signature.toString('base64')
    }

    async verifySign(text: string, signature: string) {
        const { verify } = this.initialSignVerifyInstances();
        verify.update(text);
        verify.end();
        console.log('signature (создание буффера подписи из base64)', Buffer.from(signature, 'base64'));

        const isVerify = verify.verify(this.publicKey, Buffer.from(signature, 'base64'));
        console.log('isVerify', isVerify);
        return isVerify;
    }
};