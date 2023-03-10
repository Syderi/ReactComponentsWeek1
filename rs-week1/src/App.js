import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Header from './components/Header';
import About from './components/pages/About';
import Page404 from './components/pages/Page404';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
        };
    }
    handleSearch = (searchTerm) => {
        this.setState({ searchTerm });
    };
    render() {
        const { searchTerm } = this.state;
        console.log('searchTerm', searchTerm);
        return (React.createElement(React.Fragment, null,
            React.createElement(Header, { onSearch: this.handleSearch }),
            React.createElement(Routes, null,
                React.createElement(Route, { path: "/", element: React.createElement(Home, { searchTerm: searchTerm }) }),
                React.createElement(Route, { path: "/home", element: React.createElement(Home, { searchTerm: searchTerm }) }),
                React.createElement(Route, { path: "/about", element: React.createElement(About, null) }),
                React.createElement(Route, { path: "*", element: React.createElement(Page404, null) }))));
    }
}
export default App;
