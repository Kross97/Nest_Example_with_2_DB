import React, { useEffect, useState } from "react";
import cn from "./Cluster.module.scss";
import { FetchAgent } from "../../FetchService";
import { IPortsData, useAllContext } from "../../provider/AllProvider";

export function ClusterBlock() {
  const [currentPorts, setPorts] = useState<number[]>([]);

  const { setCurrentPortHandler, currentPort } = useAllContext();

  const getCurrentPorts = () => {
    FetchAgent.getRequest({ url: "/childProcess_cluster/cluster_ports" })
      .then((results: IPortsData) => {
        setPorts(results.availablePorts);
      })
      .catch((err) => {
        console.log("Ошибка получения портов", Object.entries(err));
      });
  };

  useEffect(() => {
    getCurrentPorts();
  }, []);

  const enableClusterHandle = () =>
    FetchAgent.getRequest({ url: "/childProcess_cluster/cluster_enable" }).then(() => {
      getCurrentPorts();
    });

  const disableClusterHandler = () => {
    FetchAgent.getRequest({ url: "/childProcess_cluster/cluster_exit" }).then(() => {
      getCurrentPorts();
      setCurrentPortHandler();
    });
  };

  const setNewPortServer = () => {
    void setCurrentPortHandler();
  };

  return (
    <div className={cn.clusterBlock}>
      <h2>Работа с кластеризацией сервера (Cluster модуль node)</h2>
      <h3>{`Состояние кластеризации: ${currentPorts.length === 1 ? "Отключена" : "Включена"}`}</h3>
      <h3>{`Текущий порт: ${currentPort}`}</h3>
      <div>
        <span>Доступные порты:</span>
        <span>
          {currentPorts.map((currentPort) => (
            <React.Fragment key={currentPort}>
              <span style={{ cursor: "pointer", color: "blue" }} onClick={() => setCurrentPortHandler(currentPort)}>
                {currentPort}
              </span>
              <span>{` , `}</span>
            </React.Fragment>
          ))}
        </span>
      </div>
      <div>
        <button disabled={currentPorts.length === 1} onClick={setNewPortServer}>
          Выбрать новый порт сервера
        </button>
        <button disabled={currentPorts.length !== 1} onClick={enableClusterHandle}>
          Включить кластеризацию
        </button>
        <button disabled={currentPorts.length === 1} onClick={disableClusterHandler}>
          Отключить кластеризацию
        </button>
      </div>
    </div>
  );
}
