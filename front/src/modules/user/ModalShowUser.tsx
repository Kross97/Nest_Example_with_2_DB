import React, { useEffect, useState } from "react";
import { FetchAgent } from "../../FetchService";
import { IUSerRequest } from "./types";
import cn from "./User.module.scss";

interface IProps {
  id: number;
  onClose: () => void;
}

interface ICurrentUser extends Omit<IUSerRequest, "car" | "nameLast" | "nameFirst"> {
  car: { id: number; model: string } | null;
  name: {
    first: string;
    last: string;
  };
  mediaMaterials: { name: string; size: number; mimeType: string; id: number }[];
}

export function ModalShowUser({ id, onClose }: IProps) {
  const [user, setUser] = useState<ICurrentUser | null>(null);

  console.log();
  useEffect(() => {
    FetchAgent.getRequest({ url: `/user/${id}` }).then((res) => {
      setUser(res);
    });
  }, [id]);

  return (
    <>
      <div className={cn.backdrop} onClick={onClose} />
      <div className={cn.formUserModal}>
        <div style={{ display: "flex", flexDirection: "column", rowGap: "8px" }}>
          <span>{`nameFirst: ${user?.name?.first}`}</span>
          <span>{`nameLast: ${user?.name?.last}`}</span>
          <span>{`login: ${user?.login}`}</span>
          <span>{`password: ${user?.password}`}</span>
          <span>{`role: ${user?.role?.role || "нет"}`}</span>
          <span>{`car: ${user?.car?.model || "нет"}`}</span>
        </div>
        <div>
          <p>Фотографии юзера</p>
          <div style={{ maxHeight: "70vh", overflow: "auto" }}>
            {user?.mediaMaterials?.map((media) => (
              <div
                onClick={() =>
                  window.open(`http://localhost:3001/media/download/second/${media.id}`, "_blank")
                }
                style={{
                  display: "flex",
                  cursor: "pointer",
                  flexDirection: "column",
                  rowGap: "10px",
                }}
              >
                <b>{media.name}</b>
                <img
                  width={100}
                  height={100}
                  src={`http://localhost:3001/media/download/second/${media.id}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
