import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

interface IHeaderProps {
  namePageTerm: string;
}

export class Header extends React.Component<IHeaderProps> {
  constructor(props: IHeaderProps) {
    super(props);
  }

  render() {
    const { namePageTerm } = this.props;

    return (
      <>
        <header className="header">
          <nav className="navigation">
            <div className="navigation-links">
              <NavLink to="/">Home Page</NavLink>
              <NavLink to="/about">About US</NavLink>
            </div>
            <h6 className="current-page">Current Page: {namePageTerm}</h6>
          </nav>
        </header>
      </>
    );
  }
}

export default Header;
