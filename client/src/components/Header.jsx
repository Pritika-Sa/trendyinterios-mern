import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaYoutube, FaHome, FaBuilding, FaPaintBrush, FaUtensils, FaCouch } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper to check if link is active
  const isActive = (path) => location.pathname === path;

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Luxury Logo Section */}
        <div className="logo">
          <Link to="/" onClick={closeMenu}>
            <div className="logo-wrapper">
              <span className="logo-icon"><FaHome /></span>
              <span className="logo-text">
                Trendy <span className="logo-accent">Interios</span>
              </span>
            </div>
          </Link>
        </div>

        {/* Center Navigation */}
        <nav className={`navigation ${isMenuOpen ? 'active' : ''}`}>
          <Link
            to="/"
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            to="/abouts"
            className={`nav-link ${isActive('/abouts') ? 'active' : ''}`}
            onClick={closeMenu}
          >
            About Us
          </Link>

          {/* Enhanced Project Dropdown */}
          <div
            className={`dropdown ${activeDropdown === 'project' ? 'open' : ''}`}
            onMouseEnter={() => window.innerWidth > 992 && setActiveDropdown('project')}
            onMouseLeave={() => window.innerWidth > 992 && setActiveDropdown(null)}
          >
            <button
              className={`nav-link dropdown-toggle ${location.pathname.includes('/projects') ? 'active' : ''}`}
              onClick={() => toggleDropdown('project')}
            >
              Project
              <span className="dropdown-arrow">▼</span>
            </button>
            <div className={`dropdown-menu wide-menu ${activeDropdown === 'project' ? 'active' : ''}`}>
              <Link to="/projects?type=commercial" className="dropdown-item" onClick={closeMenu}>
                <div className="menu-icon"><FaBuilding /></div>
                <div className="menu-content">
                  <span className="menu-title">Commercial</span>
                  <span className="menu-desc">Office & Retail Spaces</span>
                </div>
              </Link>
              <Link to="/projects?type=residential" className="dropdown-item" onClick={closeMenu}>
                <div className="menu-icon"><FaHome /></div>
                <div className="menu-content">
                  <span className="menu-title">Residential</span>
                  <span className="menu-desc">Luxury Homes & Villas</span>
                </div>
              </Link>
              <Link to="/projects?type=art-craft" className="dropdown-item" onClick={closeMenu}>
                <div className="menu-icon"><FaPaintBrush /></div>
                <div className="menu-content">
                  <span className="menu-title">Art & Craft</span>
                  <span className="menu-desc">Handmade Decor Items</span>
                </div>
              </Link>
            </div>
          </div>

          <Link
            to="/testimonials"
            className={`nav-link ${isActive('/testimonials') ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Testimonial
          </Link>
          <Link
            to="/reachus"
            className={`nav-link ${isActive('/reachus') ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Reach Us
          </Link>
          <Link
            to="/registers"
            className={`nav-link ${isActive('/registers') ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Give Testimonial
          </Link>
        </nav>

        {/* Right Side Actions */}
        <div className="header-actions">
          {/* Buy Online Dropdown Button */}
          <div
            className={`dropdown buy-online-dropdown ${activeDropdown === 'buyOnline' ? 'open' : ''}`}
            onMouseEnter={() => window.innerWidth > 992 && setActiveDropdown('buyOnline')}
            onMouseLeave={() => window.innerWidth > 992 && setActiveDropdown(null)}
          >
            <button
              className="btn-buy-online"
              onClick={() => toggleDropdown('buyOnline')}
            >
              Buy Online
              <span className="dropdown-arrow">▼</span>
            </button>
            <div className={`dropdown-menu ${activeDropdown === 'buyOnline' ? 'active' : ''}`}>
              <Link to="/buy-online?category=kitchen" className="dropdown-item" onClick={closeMenu}>
                <div className="menu-icon"><FaUtensils /></div>
                <span>Kitchen</span>
              </Link>
              <Link to="/buy-online?category=accessories" className="dropdown-item" onClick={closeMenu}>
                <div className="menu-icon"><FaCouch /></div>
                <span>Accessories</span>
              </Link>
            </div>
          </div>

          {/* YouTube Icon with Tooltip */}
          <a
            href="https://www.youtube.com/@TrendyInterioS-ql7rz"
            target="_blank"
            rel="noopener noreferrer"
            className="youtube-icon-wrapper"
            data-tooltip="Watch Our Works"
          >
            <div className="youtube-icon">
              <FaYoutube />
            </div>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </header>
  );
};

export default Header;
