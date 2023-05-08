import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HOME } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HOME />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
