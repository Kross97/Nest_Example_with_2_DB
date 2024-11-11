import cn from './Photos.module.scss';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { FetchAgent } from '../FetchService';

interface IFile { id: number; originalname: string; mimetype: string;}

export const PhotoBlock = () => {
  const [file, setFile] = useState<File | null | undefined>(null);
  const [files, setFiles] = useState<IFile[]>([]);

  useEffect(() => {
    FetchAgent.getRequest({ url: '/photos/all' }).then((results) => {

      setFiles(results);
    });
  }, []);


  const change = (e: SyntheticEvent) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    const formData = new FormData();
    if (file) {
      formData.set('file', file);
      FetchAgent.postRequest({ url: '/photos', body: formData });

    }
  };

  const changeUserPhoto = (e: SyntheticEvent) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    setFile(file);
  };
  const createUser = () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.set('user', JSON.stringify({
        name: {
          first: 'front_photo_first_name',
          last: 'front_photo_last_name',
        }, test: 'test ', car: {
          model: 1,
          year: 2001,
        },
      }));

      FetchAgent.postRequest({ url: '/user', body: formData });

    }
  };
  const downloadFile = async (file: IFile) => {
    const arrayBuffer = await FetchAgent.getRequest({ url: `/photos/download/first/${file.id}`, responseType: 'arrayBuffer'});
    const blob = new Blob([arrayBuffer], {
      type: file.mimetype,
    });

    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = file.originalname;
    a.click();
  };

  return <div className={cn.photosBlock}>
    <h3>Фотографии</h3>
    <div className={cn.column}>
      <span>Закачка фотографии</span>
      <input onChange={change} type={'file'} />
    </div>
    <div className={cn.column} style={{ alignItems: 'flex-start'}}>
      <span>Установка пользователя вместе с фотографией</span>
      <input onChange={changeUserPhoto} type={'file'} />
      { file && <button onClick={createUser}>Создать пользователя</button>}
    </div>
    <div className={cn.listFiles}>
      {files.map((f: any) => {
        return <div>
          <span>{f.originalname}</span>
          <button onClick={() => downloadFile(f)}>загрузка</button>
        </div>;
      })}
    </div>
  </div>;
};