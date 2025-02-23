import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StudentProvider } from './context/StudentContext';
import { AuthProvider } from './context/AuthContext';
import App from './App';
import './index.css';
import './i18n';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <AuthProvider>
      <StudentProvider>
        <App />
      </StudentProvider>
    </AuthProvider>
  </BrowserRouter>
);

