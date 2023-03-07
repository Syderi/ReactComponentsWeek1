import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

function Header() {
  const location = useLocation();
  const currentPath = location.pathname;

  const [searchInput, setSearchInput] = useState<string>('');

  useEffect(() => {
    const searchTerm = localStorage.getItem('searchTerm');
    if (searchTerm) {
      setSearchInput(searchTerm);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('searchTerm', searchInput);
  }, [searchInput]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <header className="header">
        <nav className="navigation">
          <div className="navigation-search">
            <form onSubmit={handleFormSubmit}>
              <input
                type="text"
                placeholder="Search..."
                value={searchInput}
                onChange={handleInputChange}
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
        <h6 className="current-page">Current Page: {currentPath}</h6>
      </header>
    </>
  );
}

export default Header;
