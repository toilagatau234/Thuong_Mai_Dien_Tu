import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Toaster } from 'react-hot-toast';

// Import CSS chính
import './assets/css/bootstrap.min.css';
import './assets/css/style.css';
import './assets/css/switches.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <Toaster
      position="top-right"
      reverseOrder={false}
    />
  </React.StrictMode>
);

reportWebVitals();