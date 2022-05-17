import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from 'routes/HomePage';
import Details from 'routes/Details';
import style from './App.css';

const apiUrl = 'http://localhost:8080';

export default function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={ <HomePage apiUrl={apiUrl} /> } />
        <Route path='/details/:uuid' element={ <Details apiUrl={apiUrl} /> } />
        <Route path='*' element={
          <main><h2>Error 404</h2><p>URL not found</p></main>
        } />
      </Routes>
    </div>
  );
}
