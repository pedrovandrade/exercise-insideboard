import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import HomePage from 'routes/HomePage';
import Details from 'routes/Details';
import style from './App.css';

// The backend base URL
// const apiUrl = 'http://localhost:8080';

/**
 * The main app component. It sets the routers as well a default 404 page.
 * @constructor
 */
export default function App() {
  return (
    <BrowserRouter>
    <div className='App'>
      <Routes>
        <Route path='/' element={ <HomePage /> } />
        <Route path='/details/:uuid' element={ <Details /> } />
        <Route path='*' element={
          <main><h2>Error 404</h2><p>URL not found</p></main>
        } />
      </Routes>
    </div>
    </BrowserRouter>
  );
}
