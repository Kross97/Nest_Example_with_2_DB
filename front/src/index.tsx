import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AllProvider } from './provider/AllProvider';
import './FetchService/index';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AllProvider>
      <App />
    </AllProvider>
  </React.StrictMode>
);
