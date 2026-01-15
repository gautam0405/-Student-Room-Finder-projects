import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="logo">🏠 Student Room Finder</div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/post-room">Post Room</Link></li>
          <li><Link to="/search-room">Search</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;