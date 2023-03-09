import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/pages/Home';
import Header from './components/Header';
import AboutUS from './components/pages/About';
import NotFound404 from './components/pages/Page404';

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
    // console.log('this.state.searchTerm', this.state.searchTerm);
  };

  render() {
    const { searchTerm } = this.state;
    console.log('searchTerm', searchTerm);
    return (
      <>
        <Header onSearch={this.handleSearch} />
        <Routes>
          <Route path="/" element={<HomePage searchTerm={searchTerm} />} />
          <Route path="/home" element={<HomePage searchTerm={searchTerm} />} />
          <Route path="/about" element={<AboutUS />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </>
    );
  }
}

export default App;
