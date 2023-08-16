import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ResetStyle from './Styles/ResetStyle';
import GlobalStyle from './Styles/GlobalStyles';
//import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ResetStyle/>
    <GlobalStyle/>
    <App />
  </React.StrictMode>
);