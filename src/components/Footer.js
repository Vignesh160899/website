import React from 'react';
import '../styles.css';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">Shopy</h3>
          <p className="footer-description">
            Ultra-fast delivery for your daily needs. Fresh groceries, electronics, and essentials at your doorstep.
          </p>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><a href="/" className="footer-link">Home</a></li>
                        <li><a href="/about" className="footer-link">About</a></li>
            <li><a href="/how-it-works" className="footer-link">How It Works</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-heading">Connect With Us</h4>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <img src="/images/facebook-logo.svg" alt="Facebook" className="social-icon" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <img src="/images/instagram-logo.svg" alt="Instagram" className="social-icon" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <img src="/images/twitter-logo.svg" alt="Twitter" className="social-icon" />
            </a>
            <a href="https://wa.me" target="_blank" rel="noopener noreferrer" className="social-link">
              <img src="/images/whatsapp-logo.svg" alt="WhatsApp" className="social-icon" />
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p className="copyright">
          © {new Date().getFullYear()} Shopy. All rights reserved. Made with ❤️ for fast delivery.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
