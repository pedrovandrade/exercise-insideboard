import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from 'routes/HomePage';
import Details from 'routes/Details';
import style from './App.css';

export default function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={ <HomePage /> } />
        <Route path='/details/:uuid' element={ <Details /> } />
        <Route path='*' element={
          <main><h2>Error 404</h2><p>URL not found</p></main>
        } />
      </Routes>
    </div>
  );
}
