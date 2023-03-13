import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Header from './components/Header';
import About from './components/pages/About';
import Page404 from './components/pages/Page404';

interface IAppState {
  searchTerm: string;
  namePage: string;
}

class App extends Component<Record<string, never>, IAppState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      searchTerm: '',
      namePage: '111',
    };
  }

  handleSearch = (searchTerm: string) => {
    this.setState({ searchTerm });
  };

  handleNamePage = (namePage: string) => {
    this.setState({ namePage });
  };

  render() {
    const { searchTerm, namePage } = this.state;
    return (
      <>
        <Header onSearch={this.handleSearch} namePageTerm={namePage} />
        <Routes>
          <Route
            path="/"
            element={<Home searchTerm={searchTerm} onChangeNamePage={this.handleNamePage} />}
          />
          <Route
            path="/home"
            element={<Home searchTerm={searchTerm} onChangeNamePage={this.handleNamePage} />}
          />
          <Route path="/about" element={<About onChangeNamePage={this.handleNamePage} />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </>
    );
  }
}

export default App;
