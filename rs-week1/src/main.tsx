import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
ReactDOM.hydrateRoot(document.getElementById('root') as Element, <App />);
