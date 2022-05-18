import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'components/App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
// root.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
// );
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
// root.render(
//   <Provider store={store}>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </Provider>,
// );
// root.render(
//   <BrowserRouter>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </BrowserRouter>,
// );

// ReactDOM.hydrateRoot(
//   container,
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
// );
// ReactDOM.hydrateRoot(
//   document.getElementById('root'),
//   <Provider store={store}>
//     <App />
//   </Provider>,
// );
