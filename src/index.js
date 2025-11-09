import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Toaster } from 'react-hot-toast';

// Import CSS chính
// All global CSS removed — using styled-components GlobalStyle instead
import './assets/css/bootstrap.min.css';
import GlobalStyle from './styles/GlobalStyle';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <GlobalStyle />
    <Toaster
      position="top-right"
      reverseOrder={false}
    />
  </React.StrictMode>
);

reportWebVitals();