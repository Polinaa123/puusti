import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import GlobalStyle from './globalStyles';
import reportWebVitals from './reportWebVitals';
import './index.css';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <GlobalStyle />
    <BrowserRouter basename="/puusti">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
