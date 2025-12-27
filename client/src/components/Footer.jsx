import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaWhatsapp, FaPhone, FaEnvelope, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-section">
          <h3 className="footer-logo">TrendyInterios</h3>
          <p className="footer-tagline">Filling the Heart, Not Just Space</p>
          <p className="footer-description">
            Premium interior design solutions that transform spaces into extraordinary living experiences.
          </p>
          <div className="footer-social">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://wa.me/919965299777" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <FaWhatsapp />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/abouts">About Us</Link>
            </li>
            <li>
              <Link to="/projects">Our Projects</Link>
            </li>
            <li>
              <Link to="/testimonials">Testimonials</Link>
            </li>
            <li>
              <Link to="/registers">Give Testimonial</Link>
            </li>
            <li>
              <Link to="/reachus">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div className="footer-section">
          <h3>Our Services</h3>
          <ul>
            <li>
              <a href="#interior-design">Living Room Design</a>
            </li>
            <li>
              <a href="#modern-design">Modular Kitchen</a>
            </li>
            <li>
              <a href="#planning-design">Bedroom Interiors</a>
            </li>
            <li>
              <a href="#office-design">Office Design</a>
            </li>
            <li>
              <a href="#wardrobe-design">Wardrobe Solutions</a>
            </li>
            <li>
              <a href="#tv-unit">TV Unit & Paneling</a>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <div className="contact-info">
            <div className="contact-item">
              <FaMapMarkerAlt className="contact-icon" />
              <div>
                <p>138, Muthugoundampalayam,</p>
                <p>Sathy-Erode Road, Opp TNK School,</p>
                <p>Kavindapadi, Erode - 638 455</p>
              </div>
            </div>
            <div className="contact-item">
              <FaPhone className="contact-icon" />
              <div>
                <p>+91 99652 99777</p>
                <p>+91 90803 98889</p>
              </div>
            </div>
            <div className="contact-item">
              <FaEnvelope className="contact-icon" />
              <div>
                <p>trendyinterios@gmail.com</p>
                <p>info@trendyinterios.com</p>
              </div>
            </div>
            <div className="contact-item">
              <FaClock className="contact-icon" />
              <div>
                <p>Mon - Sat: 09:00 AM - 07:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="footer-newsletter">
        <div className="newsletter-container">
          <h3>Subscribe to Our Newsletter</h3>
          <p>Get the latest design trends and exclusive offers</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email address" />
            <button className="btn-newsletter">Subscribe</button>
          </div>
        </div>
      </div>

      {/* Google Map */}
      <div className="footer-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3914.0!2d77.7!3d11.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDIxJzAwLjAiTiA3N8KwNDInMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="TrendyInterios Location"
        ></iframe>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p>&copy; {new Date().getFullYear()} <span className="brand-name">TrendyInterios</span>. All Rights Reserved.</p>

          <button
            className="back-to-top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to Top"
          >
            Back to Top ↑
          </button>

          <p>
            Designed with <span className="heart">❤</span> by{' '}
            <a href="#" className="developer-link">Genewtech</a>
          </p>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="floating-buttons">
        <a
          href="https://wa.me/919965299777"
          className="floating-btn whatsapp-btn"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
        >
          <FaWhatsapp />
        </a>
        <a href="tel:+919965299777" className="floating-btn call-btn" aria-label="Call">
          <FaPhone />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
