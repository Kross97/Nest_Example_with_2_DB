import React, { useEffect, useState } from "react";
import cn from "./Crypto.module.scss";
import { FetchAgent } from "../../FetchService";

export function CryptoBlock() {
  const [search, setSearch] = useState("");

  const [cipherData, setCipherData] = useState("");
  const [deCipherData, setDeCipherData] = useState("");

  const [dataSign, setDataSign] = useState("");

  const cipherHandler = async () => {
    const res = await FetchAgent.postRequest({ url: "crypto/cipherPersist", body: search });
    setCipherData(res);
  };

  const signHandler = async () => {
    const res = await FetchAgent.postRequest({ url: "crypto/testSign1", body: dataSign });
    await FetchAgent.postRequest({
      url: "crypto/testVerify1",
      body: { text: dataSign, signature: res },
      requestType: "json",
    });
  };

  const deCipherHandler = async () => {
    const res = await FetchAgent.postRequest({ url: "crypto/decipherPersist", body: cipherData });
    setDeCipherData(res);
  };

  return (
    <div style={{ display: "flex", columnGap: "10px", whiteSpace: "wrap", wordBreak: "break-all" }}>
      <div data-cyid="crypto_block" className={cn.cryptoBlock}>
        <h3>Модуль для работы с шифрованием (Crypto node.js)</h3>
        <h4>Шифрование и де-шифрование данных</h4>
        <div className={cn.blockInfo}>
          <span>
            <b>1. "+$+"</b> - в шифрованном тексте является разделителем между вектором
            инициализации <b>(iv)</b> и шифруемыми данными
          </span>
          <span>
            <b>2. iv (вектор инициализации)</b> - участвует в шифровании данных, при каждом новом
            шифровании <b>(Cipher)</b> возвращаемый шифр будет отличаться т.к создается новый
            экземпляр iv (вектора инициализации)
          </span>
          <span>
            <b>3. iv берется из шифра по разделителю</b> - при каждой де-шифрации, что гарантирует
            корректную работу де-шифрации <b>(Decipher)</b>
          </span>
        </div>
        <label className={cn.column}>
          Данные для шифрования <b>(класс Cipher node)</b>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
        </label>
        <div className={cn.column}>
          <span>
            Данные после шифрования <b>(класс Decipher node)</b>
          </span>
          <span data-testid="cipher-field">{cipherData}</span>
        </div>
        <label className={cn.column}>
          Данные для де-шифрования (hex - строка) <b>(класс Decipher node)</b>
          <input type="text" value={cipherData} onChange={(e) => setCipherData(e.target.value)} />
        </label>
        <div className={cn.column}>
          <span>Данные после де-шифрования</span>
          <span data-testid="decipher-field">{deCipherData}</span>
        </div>
        <button data-testid="cipher-button" onClick={cipherHandler}>
          шифровать
        </button>
        <button data-testid="decipher-button" onClick={deCipherHandler}>
          де-шифровать
        </button>
      </div>
      <div className={cn.cryptoSignBlock}>
        <h3>Модуль для работы с подписями (Sign, Verify node.js)</h3>
        <h4>Подпись и проверка данных</h4>
        <label className={cn.column}>
          Данные для подписи <b>(класс Sign, Verify node)</b>
          <input type="text" value={dataSign} onChange={(e) => setDataSign(e.target.value)} />
        </label>
        <button onClick={signHandler}>тест подписи</button>
      </div>
    </div>
  );
}
