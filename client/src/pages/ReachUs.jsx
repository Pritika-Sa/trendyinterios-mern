import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaWhatsapp, FaClock, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import ContactForm from '../components/ContactForm';
import './ReachUs.css';

const ReachUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="reach-us-page">
      {/* Hero Section */}
      <section className="reach-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Reach Us</h1>
          <p className="hero-subtitle">Let's start the conversation about your dream space</p>
          <div className="breadcrumbs">
            <Link to="/">Home</Link>
            <span className="separator">/</span>
            <span className="current">Contact</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="reach-us-content">
        <div className="container">
          <div className="reach-us-wrapper">

            {/* Left: Form */}
            <div className="form-column">
              <div className="form-card">
                <div className="form-header">
                  <h3>Send us a Message</h3>
                  <p>Fill out the form below and we will get back to you within 24 hours.</p>
                </div>
                <ContactForm formType="contact" />
              </div>
            </div>

            {/* Right: Info */}
            <div className="info-column">
              <div className="info-card">
                <h2>Contact Information</h2>
                <p className="info-intro">We'd love to hear from you. Visit us at our office or reach out via phone or email.</p>

                <div className="contact-list">
                  <div className="contact-item">
                    <div className="icon-box"><FaMapMarkerAlt /></div>
                    <div className="details">
                      <h4>Our Office</h4>
                      <p>138, Muthugoundampalayam, Sathy-Erode Road,</p>
                      <p>Opp. TNK School, Kavindapadi,</p>
                      <p>Erode, Tamilnadu - 638 455</p>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="icon-box"><FaPhoneAlt /></div>
                    <div className="details">
                      <h4>Phone Number</h4>
                      <p><a href="tel:+919965299777">+91 99652 99777</a></p>
                      <p><a href="tel:+919080398889">+91 90803 98889</a></p>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="icon-box"><FaEnvelope /></div>
                    <div className="details">
                      <h4>Email Address</h4>
                      <p><a href="mailto:trendyinterios@gmail.com">trendyinterios@gmail.com</a></p>
                      <p><a href="mailto:info@trendyinterios.com">info@trendyinterios.com</a></p>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="icon-box"><FaClock /></div>
                    <div className="details">
                      <h4>Working Hours</h4>
                      <p>Mon - Sat: 09:00 AM - 07:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>

                <div className="social-connect">
                  <h4>Follow Us</h4>
                  <div className="social-icons">
                    <a href="#" className="social-link"><FaFacebookF /></a>
                    <a href="#" className="social-link"><FaInstagram /></a>
                    <a href="#" className="social-link"><FaLinkedinIn /></a>
                    <a href="https://wa.me/919965299777" className="social-link whatsapp"><FaWhatsapp /></a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="container">
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15652.74412089858!2d77.633!3d11.233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDEzJzU5LjkiTiA3N8KwMzcnNTkuOSJF!5e0!3m2!1sen!2sin!4v1634567890123!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Trendy Interiors Location"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReachUs;
