import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Header from './pages/Header';
import About from './pages/About';
import Page404 from './pages/Page404';
import FormPage from './pages/formPage/FormPage';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}

export default App;
