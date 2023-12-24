import React from 'react';
import { createRoot } from 'react-dom/client';  
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/Main';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Main />
  </BrowserRouter>
);

reportWebVitals();