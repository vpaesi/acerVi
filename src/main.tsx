import { createRoot } from 'react-dom/client'
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
