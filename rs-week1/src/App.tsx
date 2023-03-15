import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Header from './components/Header';
import About from './components/pages/About';
import Page404 from './components/pages/Page404';

interface IAppState {
  namePage: string;
}

class App extends Component<Record<string, never>, IAppState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      namePage: '',
    };
  }

  handleNamePage = (namePage: string) => {
    this.setState({ namePage });
  };

  render() {
    const { namePage } = this.state;
    return (
      <>
        <Header namePageTerm={namePage} />
        <Routes>
          <Route path="/" element={<Home onChangeNamePage={this.handleNamePage} />} />
          <Route path="/about" element={<About onChangeNamePage={this.handleNamePage} />} />
          <Route path="*" element={<Page404 onChangeNamePage={this.handleNamePage} />} />
        </Routes>
      </>
    );
  }
}

export default App;
