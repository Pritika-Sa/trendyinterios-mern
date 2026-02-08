import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaWhatsapp,
  FaClock,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn
} from 'react-icons/fa';
import ContactForm from '../components/ContactForm';
import './ReachUs.css';

const ReachUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="reach-us-page">

      {/* Hero */}
      <section className="reach-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Reach Us</h1>
          <p className="hero-subtitle">
            Let's start the conversation about your dream space
          </p>
          <div className="breadcrumbs">
            <Link to="/">Home</Link>
            <span className="separator">/</span>
            <span className="current">Contact</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="reach-us-content">
        <div className="container">
          <div className="reach-us-wrapper">

            {/* Form */}
            <div className="form-column">
              <div className="form-card">
                <div className="form-header">
                  <h3>Send us a Message</h3>
                  <p>Fill out the form below and we will get back to you within 24 hours.</p>
                </div>
                <ContactForm formType="contact" />
              </div>
            </div>

            {/* Info */}
            <div className="info-column">
              <div className="info-card">
                <h2>Contact Information</h2>
                <p className="info-intro">
                  We'd love to hear from you. Visit us at our office or reach out via phone or email.
                </p>

                <div className="contact-list">

                  {/* OFFICE */}
                  <div className="contact-item">
                    <div className="icon-box"><FaMapMarkerAlt /></div>
                    <div className="details">
                      <div className="detail-text">
                        <p>138, Muthugoundampalayam, Sathy-Erode Road,</p>
                        <p>Opp. TNK School, Kavindapadi,</p>
                        <p>Erode, Tamilnadu - 638 455</p>
                      </div>
                    </div>
                  </div>

                  {/* PHONE */}
                  <div className="contact-item">
                    <div className="icon-box"><FaPhoneAlt /></div>
                    <div className="details">
                      <div className="detail-text">
                        <p><a href="tel:+919965299777">+91 99652 99777</a></p>
                        <p><a href="tel:+919080398889">+91 90803 98889</a></p>
                      </div>
                    </div>
                  </div>

                  {/* EMAIL */}
                  <div className="contact-item">
                    <div className="icon-box"><FaEnvelope /></div>
                    <div className="details">
                      <div className="detail-text">
                        <p><a href="mailto:trendyinterios@gmail.com">trendyinterios@gmail.com</a></p>
                        <p><a href="mailto:info@trendyinterios.com">info@trendyinterios.com</a></p>
                      </div>
                    </div>
                  </div>

                  {/* HOURS */}
                  <div className="contact-item">
                    <div className="icon-box"><FaClock /></div>
                    <div className="details">
                      <div className="detail-text">
                        <p>Mon - Sat: 09:00 AM - 07:00 PM</p>
                        <p>Sunday: Closed</p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* SOCIAL */}
                <div className="social-connect">
                  <h4>Follow Us</h4>
                  <div className="social-icons">
                    <button className="social-link"><FaFacebookF /></button>
                    <button className="social-link"><FaInstagram /></button>
                    <button className="social-link"><FaLinkedinIn /></button>
                    <a
                      href="https://wa.me/919965299777"
                      className="social-link whatsapp"
                    >
                      <FaWhatsapp />
                    </a>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default ReachUs;
