import React, { useCallback, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Header from './components/pages/Header';
import About from './components/pages/About';
import Page404 from './components/pages/Page404';
import FormPage from './components/pages/FormPage/FormPage';

function App() {
  const [namePage, setNamePage] = useState<string>('');

  const handleNamePage = useCallback((namePage: string) => {
    setNamePage(namePage);
  }, []);

  return (
    <>
      <Header namePageTerm={namePage} />
      <Routes>
        <Route path="/" element={<Home onChangeNamePage={handleNamePage} />} />
        <Route path="/about" element={<About onChangeNamePage={handleNamePage} />} />
        <Route path="/form" element={<FormPage onChangeNamePage={handleNamePage} />} />
        <Route path="*" element={<Page404 onChangeNamePage={handleNamePage} />} />
      </Routes>
    </>
  );
}

export default App;
