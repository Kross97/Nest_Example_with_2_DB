import cn from './Photos.module.scss';
import React, {ChangeEvent, SyntheticEvent, useEffect, useState} from 'react';
import {FetchAgent} from '../../FetchService';

interface IFile {
    id: number;
    name: string;
    mimeType: string;
}

export const PhotoBlock = () => {
    const [file, setFile] = useState<File | null | undefined>(null);
    const [files, setFiles] = useState<IFile[]>([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        FetchAgent.getRequest({url: '/media/all', body: { search }}).then((results) => {
            setFiles(results || []);
        });
    }, [search]);


    const change = (e: SyntheticEvent) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        const formData = new FormData();
        if (file) {
            formData.set('file', file);
            FetchAgent.postRequest({url: '/media', body: formData});

        }
    };

    const changeMany = (e: SyntheticEvent) => {
        const files = (e.target as HTMLInputElement).files;
        const formData = new FormData();

        if (files) {
            for (let i = 0; i < files.length; i++) {
                formData.append('file', files[i]);
            }
            FetchAgent.postRequest({url: '/media/many', body: formData});
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
                    model: 'vw',
                    year: 2001,
                },
            }));

            FetchAgent.postRequest({url: '/user/createWithFile', body: formData});

        }
    };
    const downloadFile = async (file: IFile) => {
        const arrayBuffer = await FetchAgent.getRequest({
            url: `/media/download/first/${file.id}`,
            responseType: 'arrayBuffer',
        });
        const blob = new Blob([arrayBuffer], {
            type: file.mimeType,
        });

        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = file.name;
        a.click();
    };

    const downloadFile2 = async (file: IFile) => {
        const arrayBuffer = await FetchAgent.getRequest({
            url: `/media/download/second/${file.id}`,
            responseType: 'arrayBuffer',
        });
        const blob = new Blob([arrayBuffer], {
            type: file.mimeType,
        });

        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = file.name;
        a.click();
    };

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };


    return <div className={cn.photosBlock}>
        <h3>Модуль для работы с медиа-материалами (Сохранение и получение медиа из БД)</h3>
        <h3>Фотографии</h3>
        <div className={cn.column}>
            <span>Закачка медиа</span>
            <input onChange={change} type={'file'}/>
        </div>
        <div className={cn.column}>
            <span>Закачка медиа (множественное)</span>
            <input onChange={changeMany} multiple={true} type={'file'}/>
        </div>
        <div className={cn.column} style={{alignItems: 'flex-start'}}>
            <span>Установка пользователя вместе с фотографией</span>
            <input onChange={changeUserPhoto} type={'file'}/>
            {file && <button onClick={createUser}>Создать пользователя</button>}
        </div>
        <label style={{display: 'flex', flexDirection: 'column', rowGap: '10px'}}>
            <b>Поиск</b>
            <input type={'text'} onChange={changeHandler}/>
        </label>
        <div className={cn.listFiles}>
            {files.map((f: IFile) => {
                return <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        whiteSpace: 'wrap',
                        wordBreak: 'break-all',
                        rowGap: '12px'
                    }}>
                    <b>{f.name}</b>
                    <button style={{alignSelf: 'flex-start'}} onClick={() => downloadFile(f)}>загрузка_способ_1</button>
                    <button style={{alignSelf: 'flex-start'}} onClick={() => downloadFile2(f)}>загрузка_способ_2
                    </button>
                </div>;
            })}
        </div>
    </div>;
};