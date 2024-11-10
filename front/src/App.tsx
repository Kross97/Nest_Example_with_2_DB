import React, { SyntheticEvent, useEffect, useState } from 'react';
import './App.css';
import { FetchAgent } from './FetchService';

function App() {
  const [file, setFile] = useState<File | null | undefined>(null);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    FetchAgent.getRequest({ url: '/photos/all' }).then((results) => {
      setFiles(results);
    });
  }, []);

  console.log('files =>', files);

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

  const downloadFile = (file: any) => {
    const blob = new Blob(file.buffer.data, {
      type: file.mimetype,
    });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = file.originalname;
    a.click();
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

  return (
    <div>
      <span>Фото</span>
      <input onChange={change} type={'file'} />
      <span>User</span>
      <input onChange={changeUserPhoto} type={'file'} />
      <button onClick={createUser}>post_user</button>
      <div>
        {files.map((f: any) => {
          return <div>
            <span>{f.data.originalname}</span>
            <button onClick={() => downloadFile(f.data)}>download</button>
          </div>;
        })}
      </div>
    </div>
  );
}

export default App;
