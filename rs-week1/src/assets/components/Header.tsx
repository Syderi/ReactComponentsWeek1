import React from 'react';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <>
      <div>
        <Link to="/">Home Page</Link>
        <Link to="/about">About US</Link>
        <Link to="/404">Page 404</Link>
      </div>
    </>
  );
}
