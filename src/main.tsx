import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import VConsole from 'vconsole';
import App from './App';
import './index.css';
// import 'antd-mobile/es/global';

// @ts-ignore
if (import.meta.env.DEV) {
  new VConsole();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
