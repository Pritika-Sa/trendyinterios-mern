import React, { useState } from 'react';
import axios from 'axios';
import { FaUser, FaEnvelope, FaTag, FaPhone, FaPen, FaMapMarkerAlt } from 'react-icons/fa';
import './ContactForm.css';

const ContactForm = ({ formType = 'contact' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    purpose: '',
    mobileNumber: '',
    message: '',
    postalAddress: '',
    testimonialText: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      let endpoint = '';
      let payload = {};

      if (formType === 'contact') {
        endpoint = '/api/contacts';
        payload = {
          name: formData.name,
          email: formData.email,
          purpose: formData.purpose,
          mobileNumber: formData.mobileNumber,
          message: formData.message,
        };
      } else if (formType === 'testimonial') {
        endpoint = '/api/testimonials';
        payload = {
          name: formData.name,
          postalAddress: formData.postalAddress,
          mobileNumber: formData.mobileNumber,
          testimonialText: formData.testimonialText,
        };
      }

      await axios.post(endpoint, payload);

      setMessage(`Thank you! Your ${formType === 'contact' ? 'message' : 'testimonial'} has been sent successfully.`);
      setFormData({
        name: '',
        email: '',
        purpose: '',
        mobileNumber: '',
        message: '',
        postalAddress: '',
        testimonialText: '',
      });
    } catch (error) {
      setMessage('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="contact-form-premium" onSubmit={handleSubmit}>
      {message && (
        <div className={`form-message ${message.includes('successfully') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="name">Name</label>
        <div className="input-with-icon">
          <FaUser className="input-icon" />
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your Full Name"
          />
        </div>
      </div>

      {formType === 'contact' && (
        <>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-with-icon">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="purpose">Purpose</label>
            <div className="input-with-icon">
              <FaTag className="input-icon" />
              <select
                id="purpose"
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                className="select-input"
              >
                <option value="">Select a purpose</option>
                <option value="Home Interior">Home Interior</option>
                <option value="Office Interior">Office Interior</option>
                <option value="Modular Kitchen">Modular Kitchen</option>
                <option value="Renovation">Renovation</option>
                <option value="General Enquiry">General Enquiry</option>
              </select>
            </div>
          </div>
        </>
      )}

      {formType === 'testimonial' && (
        <div className="form-group">
          <label htmlFor="postalAddress">Location / Project</label>
          <div className="input-with-icon">
            <FaMapMarkerAlt className="input-icon" />
            <input
              type="text"
              id="postalAddress"
              name="postalAddress"
              value={formData.postalAddress}
              onChange={handleChange}
              required
              placeholder="e.g. Dream Villa, Erode"
            />
          </div>
        </div>
      )}

      <div className="form-group">
        <label htmlFor="mobileNumber">Mobile Number</label>
        <div className="input-with-icon">
          <FaPhone className="input-icon" />
          <input
            type="tel"
            id="mobileNumber"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
            placeholder="+91 XXXXX XXXXX"
            pattern="\d{10,12}"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="message">
          {formType === 'contact' ? 'Message' : 'Your Experience'}
        </label>
        <div className="input-with-icon textarea-wrapper">
          <FaPen className="input-icon textarea-icon" />
          <textarea
            id="message"
            name={formType === 'contact' ? 'message' : 'testimonialText'}
            value={formType === 'contact' ? formData.message : formData.testimonialText}
            onChange={handleChange}
            required
            placeholder={
              formType === 'contact'
                ? 'Tell us about your requirements...'
                : 'Share your story with us...'
            }
            rows="5"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="submit-btn-premium"
      >
        {loading ? 'Sending...' : formType === 'contact' ? 'Send Message →' : 'Submit Testimonial'}
      </button>

      {formType === 'contact' && (
        <p className="privacy-note">We respect your privacy. Your info is safe with us.</p>
      )}
    </form>
  );
};

export default ContactForm;
