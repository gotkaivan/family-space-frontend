import React from 'react';
import ReactDOM from 'react-dom/client';
import './common/assets/satoshi.css';
import './common/assets/globals.css';
import reportWebVitals from './reportWebVitals';
import App from './domains/App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);

reportWebVitals();
