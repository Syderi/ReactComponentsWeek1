import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './assets/components/pages/Home';
import { Header } from './assets/components/Header';
import { AboutUS } from './assets/components/pages/About';
import { NotFound404 } from './assets/components/pages/Page404';


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUS />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </>
  );
}

export default App;
