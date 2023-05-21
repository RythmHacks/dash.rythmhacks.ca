import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.scss';
import App from './App';
import { AuthProvider } from './contexts/Auth';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <React.StrictMode>
        <AuthProvider>
          <App />
        </AuthProvider>
    </React.StrictMode>
  </BrowserRouter>
);