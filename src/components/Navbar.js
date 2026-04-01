import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

    // Close menu on scroll
    const handleScroll = () => {
      setIsMenuOpen(false);
    };

    // Close menu on window resize
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('user-login', handleLoginEvent);
    window.addEventListener('user-logout', handleLogoutEvent);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('user-login', handleLoginEvent);
      window.removeEventListener('user-logout', handleLogoutEvent);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setLoggedInUser(null);
    // Trigger custom logout event
    window.dispatchEvent(new Event('user-logout'));
    navigate('/');
    closeMenu();

    // Show logout notification
    setTimeout(() => {
      alert('✅ Logged out successfully!');
    }, 300);
  };

  const handleProtectedLink = (path) => {
    if (!loggedInUser) {
      alert('🔒 Please login to access this feature!');
      navigate('/login');
      closeMenu();
      return;
    }
    navigate(path);
    closeMenu();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          🏠 Student Room Finder
        </Link>

        {/* Hamburger Menu Button */}
        <button 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Navigation Menu */}
        <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul className="nav-links">
            <li><Link to="/" onClick={closeMenu}>Home</Link></li>
            
            <li>
              <Link to="/marketplace" onClick={closeMenu}>Marketplace</Link>
            </li>
            
            <li>
              <a href="/map">Map</a>
            </li>

            {loggedInUser && (
              <>
                <li>
                  <Link to="/post-room" onClick={closeMenu}>Post Room</Link>
                </li>
                <li>
                  <Link to="/search-room" onClick={closeMenu}>Search Room</Link>
                </li>
              </>
            )}

            {!loggedInUser && (
              <>
                <li>
                  <a 
                    href="#post-room" 
                    onClick={(e) => {
                      e.preventDefault();
                      handleProtectedLink('/post-room');
                    }}
                  >
                    Post Room
                  </a>
                </li>
                <li>
                  <a 
                    href="#search-room"
                    onClick={(e) => {
                      e.preventDefault();
                      handleProtectedLink('/search-room');
                    }}
                  >
                    Search Room
                  </a>
                </li>
              </>
            )}

            {loggedInUser ? (
              <>
                <li className="user-info">
                  👤 {loggedInUser.name || loggedInUser.email}
                </li>
                <li>
                  <button className="logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/login" onClick={closeMenu}>Login</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;