import Header from './components/header/Header';
import FormPage from './pages/Form/FormPage';
import Home from './pages/Home/Home';
import Page404 from './pages/Page404/Page404';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import About from './pages/About/About';

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
