import React, { useEffect, useState } from 'react';
import '../styles.css';
import Navbar from '../components/Navbar';

const Contact = () => {
  // Navbar is now shared via <Navbar />; page-specific menu state removed
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    category: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  useEffect(() => {
    // Simple scroll animations without interfering with normal scrolling
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Only animate elements, don't interfere with scroll behavior
          const animateElements = document.querySelectorAll('.animate-on-scroll:not(.visible)');
          animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            // Check if element is in viewport (with some offset)
            if (elementTop < windowHeight * 0.8) {
              element.classList.add('visible');
            }
          });
          
          ticking = false;
        });
        ticking = true;
      }
    };

    // Add scroll event listener with passive option for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check for visible elements
    setTimeout(() => {
      const animateElements = document.querySelectorAll('.animate-on-scroll:not(.visible)');
      animateElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        // Check if element is already in viewport
        if (elementTop < windowHeight * 0.8) {
          element.classList.add('visible');
        }
      });
    }, 100);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Navbar behaviors handled by shared Navbar component

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let v = value;
    if (name === 'name') {
      // Only alphabets and spaces
      v = value.replace(/[^A-Za-z ]/g, '');
    }
    if (name === 'number') {
      // Only digits, limit to 10
      v = value.replace(/\D/g, '').slice(0, 10);
    }
    setFormData(prev => ({
      ...prev,
      [name]: v
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      // Send form data to server endpoint
      const response = await fetch('http://localhost:5050/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      
      if (response.ok && result.success) {
        setSubmitStatus('success');
        alert('Thank you for contacting us! We have sent a confirmation email to your address.');
        setFormData({
          name: '',
          email: '',
          number: '',
          category: '',
          message: ''
        });
      } else {
        throw new Error(result.message || 'Failed to send email');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      alert('There was an error submitting your form. Please try again or contact us directly at levi16v@outlook.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-root contact-page">
      <Navbar />

      <main className="contact-main">
       

        {/* Contact Form Section */}
        <section className="contact-form-section">
          <div className="contact-form-container">
            <div className="contact-form-wrapper animate-on-scroll fade-up">
              <div className="form-header">
                <h2 className="form-title">We Are Here to Help You </h2>
                <p className="form-subtitle">Fill out the form below and we'll get back to you within 24 hours.</p>
              </div>
              
              <form className="modern-contact-form" onSubmit={handleSubmit}>
                <div className="form-group animate-on-scroll fade-up">
                  <label htmlFor="name" className="form-label">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                    pattern="[A-Za-z ]+"
                    title="Only alphabets and spaces allowed"
                    required
                  />
                </div>

                <div className="form-group animate-on-scroll fade-up delay-1">
                  <label htmlFor="email" className="form-label">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group animate-on-scroll fade-up delay-2">
                  <label htmlFor="number" className="form-label">Number *</label>
                  <input
                    type="tel"
                    id="number"
                    name="number"
                    value={formData.number}
                    onChange={handleInputChange}
                    className="form-input"
                    inputMode="numeric"
                    maxLength={10}
                    pattern="^[6-9][0-9]{9}$"
                    title="Enter a valid 10-digit Indian mobile number starting with 6-9"
                    required
                  />
                </div>

                <div className="form-group animate-on-scroll fade-up delay-3">
                  <label htmlFor="category" className="form-label">Category *</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="form-select"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="coustomer">coustomer</option>
                    <option value="store">store</option>
                  </select>
                </div>

                <div className="form-group animate-on-scroll fade-up delay-4">
                  <label htmlFor="message" className="form-label">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="form-textarea"
                    rows="6"
                    required
                  ></textarea>
                </div>
                
                <div className="contact-submit-row animate-on-scroll fade-up delay-5">
                  <button type="submit" className="submit-btn pulse" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                  {submitStatus === 'success' && (
                    <p style={{ color: '#10b981', marginTop: '10px', fontSize: '14px' }}>
                      Message sent successfully!
                    </p>
                  )}
                  {submitStatus === 'error' && (
                    <p style={{ color: '#ef4444', marginTop: '10px', fontSize: '14px' }}>
                      Failed to send. Please try again.
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Admin Contact (unique + animated) */}
        <section className="business-hours-section">
          <div className="business-hours-container">
            <div className="admin-card animate-on-scroll fade-up">
              <div className="admin-card-inner">
                <div className="admin-contact-section">
                  <h3 className="admin-title">Admin Contact</h3>
                  <p className="admin-subtitle">Admin Support Team</p>
                  <div className="admin-actions">
                    <a href="tel:+917010744553" className="contact-btn admin-btn primary" aria-label="Call Admin Support" onClick={(e) => {
                      e.preventDefault();
                      window.location.href = 'tel:+917010744553';
                    }}> Call Now</a>
                    <a href="mailto:levi16v@outlook.com" className="contact-btn admin-btn secondary" aria-label="Email Admin Support" onClick={(e) => {
                      e.preventDefault();
                      window.location.href = 'mailto:levi16v@outlook.com';
                    }}>Email Us</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Social Media Section */}
        <div className="social-media-section animate-on-scroll zoom-out">
          <h3 className="zoom-out delay-1">Connect With Shopy</h3>
          <p className="social-media-subtitle zoom-out delay-2">Follow us on social media for updates, tips, and exclusive offers</p>
          <div className="social-media-links">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="social-link facebook zoom-out delay-3" aria-label="Follow Shopy on Facebook">
              <img src="/images/facebook-logo.svg" alt="Facebook" className="social-logo" />
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="social-link instagram zoom-out delay-4" aria-label="Follow Shopy on Instagram">
              <img src="/images/instagram-logo.svg" alt="Instagram" className="social-logo" />
            </a>
            <a href="https://wa.me/917010744553" target="_blank" rel="noopener noreferrer" className="social-link whatsapp zoom-out delay-5" aria-label="Contact Shopy on WhatsApp">
              <img src="/images/whatsapp-logo.svg" alt="WhatsApp" className="social-logo" />
            </a>
            <a href="https://twitter.com/shopy" target="_blank" rel="noopener noreferrer" className="social-link twitter zoom-out delay-6" aria-label="Follow Shopy on Twitter">
              <img src="/images/twitter-logo.svg" alt="Twitter" className="social-logo" />
            </a>
          </div>
        </div>
        
        <footer className="footer animate-on-scroll fade-up">
          <div className="footer-inner">
            <span className="footer-copy">
              &copy; 2026 Shopy. All rights reserved.
            </span>
            <div className="footer-links">
              <a href="/privacy" className="footer-link">Privacy Policy</a>
              <span className="footer-link-separator"> | </span>
              <a href="/terms" className="footer-link">Terms of Service</a>
            </div>
          </div>
        </footer>
      </main>
      <style jsx global>{`
        .contact-submit-row { 
          text-align: center; 
          margin-top: 10px;
        }
        .submit-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 12px 28px;
          border-radius: 999px;
          border: none;
          cursor: pointer;
          font-size: 16px;
          font-weight: 600;
          color: #fff;
          background: linear-gradient(135deg, #3179ec, #2563eb);
          box-shadow: 0 8px 20px rgba(37, 99, 235, 0.35);
          transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
        }
        .submit-btn:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 12px 28px rgba(37, 99, 235, 0.45);
          filter: brightness(1.03);
        }
        .submit-btn:active {
          transform: translateY(0) scale(0.98);
          box-shadow: 0 6px 16px rgba(37, 99, 235, 0.35);
        }
        @keyframes subtlePulse {
          0% { transform: scale(0.98); }
          50% { transform: scale(1); }
          100% { transform: scale(0.98); }
        }
        .submit-btn.pulse {
          animation: subtlePulse 1.2s ease-in-out 0.6s 2 both;
        }
        @media (max-width: 768px) {
          .submit-btn { width: auto; min-width: 220px; }
        }

        /* Center Admin Contact card */
        .business-hours-section {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 60px 20px;
          min-height: 6vh;
        }
        .business-hours-container {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        /* Admin Contact unique styles */
        .admin-card {
          margin: 0 auto;
          padding: 3px; /* gradient border width */
          border-radius: 16px;
          background: linear-gradient(135deg, cyan, yellow, orange, #ff7a7a);
          display: inline-block;
          max-width: 720px;
          width: 100%;
        }
        .admin-card-inner {
          background: #ffffff;
          border-radius: 14px;
          padding: 24px;
        }
        .admin-contact-section {
          text-align: center;
          padding: 30px 20px;
        }
        .admin-title {
          margin: 0 0 10px;
          font-size: clamp(1.8rem, 3vw, 2.2rem);
          font-weight: 800;
          line-height: 1.1;
          background: linear-gradient(135deg, #111, #444, #111);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          opacity: 0;
          transform: translateY(10px) scale(0.98);
          animation: adminPopIn 700ms ease-out forwards;
        }
        .admin-subtitle {
          margin: 0 0 18px;
          color: #374151;
          font-weight: 600;
          opacity: 0;
          transform: translateY(8px);
          animation: adminPopIn 700ms ease-out 120ms forwards;
        }
        .admin-actions {
          display: flex;
          gap: 16px;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
        }
        .admin-btn {
          border-radius: 999px;
          padding: 10px 20px;
          font-weight: 700;
          border: 2px solid #e5e7eb;
          background: #fff;
          color: #1f2937;
          box-shadow: 0 6px 18px rgba(0,0,0,0.08);
          transform: translateY(8px);
          opacity: 0;
        }
        .admin-btn.primary { animation: adminBtnIn 550ms cubic-bezier(.22,.78,.29,.99) 220ms forwards; }
        .admin-btn.secondary { animation: adminBtnIn 550ms cubic-bezier(.22,.78,.29,.99) 340ms forwards; }

        .admin-btn:hover {
          transform: translateY(0) scale(1.03);
          box-shadow: 0 10px 24px rgba(0,0,0,0.14);
          border-color: #c7ccd3;
        }
        .admin-btn:active {
          transform: translateY(1px) scale(0.98);
        }

        @keyframes adminPopIn {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes adminBtnIn {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        @media (max-width: 768px) {
          .admin-actions { gap: 12px; }
          .admin-btn { padding: 10px 16px; font-weight: 600; }
        }
      `}</style>
    </div>
  );
};

export default Contact;
