import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

// type IHeaderProps = Record<string, never>;

interface IHeaderState {
  searchInput: string;
}

interface IHeaderProps {
  onSearch: (searchTerm: string) => void;
}

export class Header extends React.Component<IHeaderProps, IHeaderState> {
  constructor(props: IHeaderProps) {
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

  componentDidUpdate(_: IHeaderProps, prevState: IHeaderState) {
    const { searchInput } = this.state;
    if (searchInput !== prevState.searchInput) {
      localStorage.setItem('searchTerm', searchInput);
      this.props.onSearch(searchInput);
    }
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    this.setState({ searchInput: value });
  };

  handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  render() {
    const { searchInput } = this.state;
    // const { location } = this.props;
    // const currentPath = location.pathname;

    return (
      <>
        <header className="header">
          <nav className="navigation">
            <div className="navigation-search">
              <form onSubmit={this.handleFormSubmit}>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchInput}
                  onChange={this.handleInputChange}
                />
                <button type="submit">Search</button>
              </form>
            </div>
            <div className="navigation-links">
              <Link to="/">Home Page</Link>
              <Link to="/about">About US</Link>
              <Link to="/404">Page 404</Link>
            </div>
          </nav>
          {/* <h6 className="current-page">Current Page: {currentPath}</h6> */}
        </header>
      </>
    );
  }
}

export default Header;
