import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

interface IHeaderProps {
  namePageTerm: string;
}

function Header({ namePageTerm }: IHeaderProps) {
  return (
    <>
      <header className="header">
        <nav className="navigation">
          <div className="navigation-links">
            <NavLink to="/">Home Page</NavLink>
            <NavLink to="/about">About US</NavLink>
            <NavLink to="/form">Form Page</NavLink>
          </div>
          <h6 className="current-page">Current Page: {namePageTerm}</h6>
        </nav>
      </header>
    </>
  );
}

export default Header;
