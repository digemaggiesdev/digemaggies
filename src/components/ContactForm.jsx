import React, { useState, useEffect } from 'react';

const ContactForm = ({ formTitle = 'Start a conversation.', isSponsorForm = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const [status, setStatus] = useState({
    submitting: false,
    message: '',
    type: '' // 'success' | 'error'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, message: 'Sending inquiry...', type: '' });

    const payload = {
      access_key: '470a65df-bb10-4b57-90e1-e2f9750e6e74',
      name: formData.name,
      email: formData.email,
      company: formData.company,
      message: formData.message
    };

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.success) {
        setStatus({
          submitting: false,
          message: 'Thank you! Your inquiry has been sent.',
          type: 'success'
        });
        setFormData({ name: '', email: '', company: '', message: '' });
      } else {
        setStatus({
          submitting: false,
          message: 'Oops! Something went wrong. Please try again.',
          type: 'error'
        });
      }
    } catch (error) {
      console.error(error);
      setStatus({
        submitting: false,
        message: 'Error sending form. Please try again.',
        type: 'error'
      });
    }
  };

  useEffect(() => {
    if (status.message) {
      const timer = setTimeout(() => {
        setStatus({ submitting: false, message: '', type: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [status.message]);

  return (
    <div className="contact-form-wrapper">
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="company">Company / Organization</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Your Company Name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message / Inquiry</label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            placeholder={
              isSponsorForm
                ? 'Tell us about your sponsorship goals or questions'
                : 'Tell us about your inquiry, goals, or questions'
            }
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-submit" disabled={status.submitting}>
          {status.submitting ? 'Sending...' : isSponsorForm ? 'Send sponsorship inquiry →' : 'Send Inquiry'}
        </button>

        {status.message && (
          <p className={`form-message ${status.type}`} role="status" aria-live="polite">
            {status.message}
          </p>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
