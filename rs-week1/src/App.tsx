import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Header from './components/header/Header';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import FormPage from './pages/Form/FormPage';
import Page404 from './pages/Page404/Page404';

function App() {
  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/form" element={<FormPage />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
