import './App.css';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/pages/Home';
import { Header } from './components/Header';
import { AboutUS } from './components/pages/About';
import { NotFound404 } from './components/pages/Page404';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUS />} />
        <Route path="*" element={<NotFound404 />} />
        {/* <Navigate to="/404" replace /> */}
      </Routes>
    </>
  );
}

export default App;
