import { NavLinks } from 'types/interface';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Header.css';

function Header() {
  const navLinks: NavLinks = { '/': 'Home', '/about': 'About Us', '/form': 'Form' };
  const location = useLocation();
  return (
    <>
      <header className="header">
        <nav className="navigation">
          <div className="navigation-links">
            <NavLink to="/" data-testid="home">
              Home Page
            </NavLink>
            <NavLink to="/about">About US</NavLink>
            <NavLink to="/form">Form Page</NavLink>
          </div>
          <h6 className="current-page">
            Current Page: {navLinks[location.pathname] ?? 'Page 404'}
          </h6>
        </nav>
      </header>
    </>
  );
}

export default Header;
