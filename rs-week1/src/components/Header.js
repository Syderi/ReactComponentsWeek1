import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
export class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: '',
        };
    }
    componentDidMount() {
        const searchTerm = localStorage.getItem('searchTerm');
        if (searchTerm) {
            this.setState({ searchInput: searchTerm });
        }
    }
    componentDidUpdate(_, prevState) {
        const { searchInput } = this.state;
        if (searchInput !== prevState.searchInput) {
            localStorage.setItem('searchTerm', searchInput);
            this.props.onSearch(searchInput);
        }
    }
    handleInputChange = (event) => {
        const { value } = event.target;
        this.setState({ searchInput: value });
    };
    handleFormSubmit = (event) => {
        event.preventDefault();
    };
    render() {
        const { searchInput } = this.state;
        // const { location } = this.props;
        // const currentPath = location.pathname;
        return (React.createElement(React.Fragment, null,
            React.createElement("header", { className: "header" },
                React.createElement("nav", { className: "navigation" },
                    React.createElement("div", { className: "navigation-search" },
                        React.createElement("form", { onSubmit: this.handleFormSubmit },
                            React.createElement("input", { type: "text", placeholder: "Search...", value: searchInput, onChange: this.handleInputChange }),
                            React.createElement("button", { type: "submit" }, "Search"))),
                    React.createElement("div", { className: "navigation-links" },
                        React.createElement(Link, { to: "/" }, "Home Page"),
                        React.createElement(Link, { to: "/about" }, "About US"),
                        React.createElement(Link, { to: "/404" }, "Page 404"))))));
    }
}
export default Header;
