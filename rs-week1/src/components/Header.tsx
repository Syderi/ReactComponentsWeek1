import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

export function Header() {
  const location = useLocation();
  const currentPath = location.pathname;
  console.log('currentPath===', currentPath);
  return (
    <>
      <header className="header">
        <Link to="/">Home Page</Link>
        <Link to="/about">About US</Link>
        <Link to="/404">Page 404</Link>
        <h6>Current Page: {currentPath}</h6>
      </header>
    </>
  );
}
