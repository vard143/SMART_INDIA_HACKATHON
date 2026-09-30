import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Register PWA Offline Service Worker
if ('serviceWorker' in navigator && (import.meta.env.PROD || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => console.log('[BhashaSetu] Offline Service Worker registered:', reg.scope))
      .catch((err) => console.warn('[BhashaSetu] SW registration skipped:', err));
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
