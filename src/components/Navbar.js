import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    setLoggedInUser(user);

    // Listen for storage changes (login from other components)
    const handleStorageChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem('loggedInUser'));
      setLoggedInUser(updatedUser);
    };

    // Listen for custom login event
    const handleLoginEvent = () => {
      const updatedUser = JSON.parse(localStorage.getItem('loggedInUser'));
      setLoggedInUser(updatedUser);
    };

    // Listen for logout event
    const handleLogoutEvent = () => {
      setLoggedInUser(null);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('user-login', handleLoginEvent);
    window.addEventListener('user-logout', handleLogoutEvent);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('user-login', handleLoginEvent);
      window.removeEventListener('user-logout', handleLogoutEvent);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setLoggedInUser(null);
    // Trigger custom logout event
    window.dispatchEvent(new Event('user-logout'));
    navigate('/');
  };

  const handleProtectedLink = (path) => {
    if (!loggedInUser) {
      alert('Please login to access this feature!');
      navigate('/login');
      return;
    }
    navigate(path);
  };

  return (
    <header className="navbar">
      <div className="logo">🏠 Student Room Finder</div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          {loggedInUser && (
            <>
              <li>
                <Link to="/post-room">Post Room</Link>
              </li>
              <li>
                <Link to="/search-room">Search</Link>
              </li>
            </>
          )}
          {!loggedInUser && (
            <>
              <li>
                <a href="#" onClick={(e) => {
                  e.preventDefault();
                  handleProtectedLink('/post-room');
                }}>Post Room</a>
              </li>
              <li>
                <a href="#" onClick={(e) => {
                  e.preventDefault();
                  handleProtectedLink('/search-room');
                }}>Search</a>
              </li>
            </>
          )}
          {loggedInUser ? (
            <>
              <li className="user-info">
                <span>👤 {loggedInUser.name || loggedInUser.email}</span>
              </li>
              <li>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;