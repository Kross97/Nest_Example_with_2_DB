import React, { SyntheticEvent, useState } from 'react';
import './App.css';

function App() {
  const [file, setFile] = useState<File | null | undefined>(null)

  const change = (e: SyntheticEvent) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    const formData = new FormData();
    if(file) {
      formData.set('file', file);
      console.log("FORM_DATA", formData);
      fetch('http://localhost:3001/photos/', {
        method: 'POST',
        body: formData,
      })
    }
  };

  const changeUserPhoto = (e: SyntheticEvent) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    setFile(file);
  };

  const createUser = () => {
    if(file) {
      const formData = new FormData();
      formData.set('file', file);
      console.log("FORM_DATA", formData);
      fetch('http://localhost:3001/user/', {
        method: 'POST',

        body: JSON.stringify( {
          name: 'front_user_test',
          test: 'test',
          car: {
            model: 1,
            year: 2001,
          },
          //photos: [file]
        })
      })
    }
  };

  return (
    <div>
      <span>Фото</span>
      <input onChange={change} type={'file'} />
      <span>User</span>
      <input onChange={changeUserPhoto} type={'file'} />
      <button onClick={createUser}>post_user</button>
    </div>
  );
}

export default App;
