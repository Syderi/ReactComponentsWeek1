import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

// interface IHeaderState {
//   searchInput: string;
// }

interface IHeaderProps {
  namePageTerm: string;
}

export class Header extends React.Component<IHeaderProps> {
  // private beforeUnloadListener: ((event: BeforeUnloadEvent) => void) | null = null;

  constructor(props: IHeaderProps) {
    super(props);
    // this.state = {
    //   searchInput: '',
    // };
  }

  // componentDidMount() {
  //   const searchTerm = localStorage.getItem('searchTerm');
  //   if (searchTerm) {
  //     this.setState({ searchInput: searchTerm });
  //   }

  //   // Добавляем обработчик события beforeunload
  //   // this.beforeUnloadListener = () => {
  //   //   localStorage.setItem('searchTerm', this.state.searchInput);
  //   // };
  //   // window.addEventListener('beforeunload', this.beforeUnloadListener);
  // }

  // componentWillUnmount() {
  //   // Удаляем обработчик события beforeunload
  //   if (this.beforeUnloadListener) {
  //     window.removeEventListener('beforeunload', this.beforeUnloadListener);
  //   }
  // }

  // componentDidUpdate(_: IHeaderProps, prevState: IHeaderState) {
  //   const { searchInput } = this.state;
  //   if (searchInput !== prevState.searchInput) {
  //     // this.props.onSearch(searchInput);
  //   }
  // }

  // handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value } = event.target;
  //   this.setState({ searchInput: value });
  // };

  // handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  // };

  render() {
    // const { searchInput } = this.state;
    const { namePageTerm } = this.props;

    return (
      <>
        <header className="header">
          <nav className="navigation">
            {/* <div className="navigation-search">
              <form onSubmit={this.handleFormSubmit}>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchInput}
                  onChange={this.handleInputChange}
                />
                <button type="submit">Search</button>
              </form>
            </div> */}
            <div className="navigation-links">
              <NavLink to="/">Home Page</NavLink>
              <NavLink to="/about">About US</NavLink>
              {/* <NavLink to="/404">Page 404</NavLink> */}
            </div>
            <h6 className="current-page">Current Page: {namePageTerm}</h6>
          </nav>
        </header>
      </>
    );
  }
}

export default Header;
