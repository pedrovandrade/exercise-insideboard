import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'components/App';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
// ReactDOM.createRoot(
//   container,
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
// );

// ReactDOM.hydrateRoot(
//   container,
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
// );
