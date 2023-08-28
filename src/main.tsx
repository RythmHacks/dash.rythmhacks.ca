import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.scss';
import App from './App';
import { AuthProvider } from './contexts/Auth';
import { StatusProvider } from './contexts/UserStatus';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <React.StrictMode>
        <AuthProvider>
          <StatusProvider>
            <App />
          </StatusProvider>
        </AuthProvider>
    </React.StrictMode>
  </BrowserRouter>
);