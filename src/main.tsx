import './services/firebase';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './router';
import Header from './components/Header';
import { AuthProvider } from './hooks/useAuth';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
);