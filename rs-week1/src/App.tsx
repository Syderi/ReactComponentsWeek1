import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Header from './components/Header';
import About from './components/pages/About';
import Page404 from './components/pages/Page404';

interface IAppState {
  searchTerm: string;
}

class App extends Component<Record<string, never>, IAppState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      searchTerm: '',
    };
  }

  handleSearch = (searchTerm: string) => {
    this.setState({ searchTerm });
  };

  render() {
    const { searchTerm } = this.state;
    return (
      <>
        <Header onSearch={this.handleSearch} />
        <Routes>
          <Route path="/" element={<Home searchTerm={searchTerm} />} />
          <Route path="/home" element={<Home searchTerm={searchTerm} />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </>
    );
  }
}

export default App;
