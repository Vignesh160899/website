// src/pages/About.js
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import '../styles.css';
import '../leadership.css';

const About = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe all elements with fade-up class
    const fadeUpElements = document.querySelectorAll('.fade-up');
    fadeUpElements.forEach((el) => observer.observe(el));

    return () => {
      fadeUpElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <>
      <Navbar />
     

      <main className="about-main">
      <section className="about-banner fade-up delay-1">
        <div className="about-banner-inner">
          <h1 className="about-banner-title">About Shopy</h1>
          <p className="about-banner-subtitle">
            Local commerce, redesigned for speed, scale, and simplicity.
          </p>
        </div>
      </section>
       {/* WHO WE ARE – Split Section (Red/Pink gradient + image with overlay) */}
        <section className="who-split-section fade-up delay-1">
          <div className="who-split">
            <div className="who-heading-container fade-up delay-2">
            <h2 className="who-heading">
              <span>WHO WE ARE</span>
            </h2>
            <div className="who-heading-line"></div>
          </div>

            <div className="who-right fade-up delay-3">
              <div className="who-image-card">
                <img
                  src="/Who we are.png"
                  alt="Who we are"
                  className="who-image"
                  onError={(e) => { e.currentTarget.src = '/images/store.jpg'; }}
                />
                <div className="who-overlay">
                  <p>
                    Shopy is a modern commerce platform powered by local stores. We enable faster
                    fulfillment through operational efficiency and intelligent use of existing retail
                    infrastructure.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* OUR APPROACH */}
        <section className="who-split-section fade-up delay-1">
          <div className="who-split">
            <div className="who-heading-container fade-up delay-2">
              <h2 className="who-heading">
                <span>OUR APPROACH</span>
              </h2>
              <div className="who-heading-line"></div>
            </div>

            <div className="who-right fade-up delay-3">
              <div className="who-image-card">
                <img
                  src="Our Approach.jpg"
                  alt="Our Approach"
                  className="who-image"
                  onError={(e) => { e.currentTarget.src = '/images/customer.jpg'; }}
                />
                <div className="who-overlay">
                  <p>
                    Shopy follows a store-first and asset-light model by integrating neighborhood
                    retailers as decentralized fulfillment points. This enables faster delivery,
                    lower operating costs, better margins for store partners, and sustainable growth.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* OUR VISION */}
        <section className="who-split-section fade-up delay-1">
          <div className="who-split">
            <div className="who-heading-container fade-up delay-2">
              <h2 className="who-heading">
                <span>OUR VISION</span>
              </h2>
              <div className="who-heading-line"></div>
            </div>

            <div className="who-right fade-up delay-3">
              <div className="who-image-card">
                <img
                  src="Our vision.jpg"
                  alt="Our vision"
                  className="who-image"
                  onError={(e) => { e.currentTarget.src = '/images/about-mission.jpg'; }}
                />
                <div className="who-overlay">
                  <p>
                    Local commerce at scale. We envision a future where neighborhood stores are
                    digitally enabled to serve customers with greater speed and efficiency.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LEADERSHIP */}
        <section className="leadership-section fade-up delay-1">
          <div className="leadership-header fade-up delay-2">
            <h2>LEADERSHIP</h2>
            <p>Led by visionaries who are reshaping the future of commerce</p>
          </div>
          <div className="leadership-grid">
            <div className="leader-card fade-up delay-3">
              <div className="leader-avatar">
                <img
                  src="/images/leader1.jpg"
                  alt="Vignesh Annadurai"
                  className="leader-photo"
                  onError={(e) => { e.currentTarget.src = '/images/ceo.png'; }}
                />
              </div>
              <div className="leader-info" style={{ textAlign: 'center' }}>
                <h3 className="leader-name">Vignesh Annadurai</h3>
                <p className="leader-title">Founder & Cheif Executive Officer</p>
                <p className="leader-bio">
                  Vignesh founded Shopy and heads the company's overall vision, strategy, and business execution. 
                  As Chairman, he provides strategic oversight and governance, advances key partnerships, and steers the organization
                  toward building a scalable, local-first commerce platform focused on long-term growth and sustainability.
                </p>
              </div>
            </div>

            <div className="leader-card fade-up delay-4">
              <div className="leader-avatar">
                <img
                  src="/images/leader2.jpg"
                  alt="Ajay"
                  className="leader-photo"
                  onError={(e) => { e.currentTarget.src = '/images/Ajay.png'; }}
                />
              </div>
              <div className="leader-info" style={{ textAlign: 'center' }}>
                <h3 className="leader-name">Ajay Arasu</h3>
                <p className="leader-title">Director Of Technology And Operations</p>
                <p className="leader-bio">
                  Ajay guides Shopy's technology and innovation roadmap. He focuses on identifying emerging technologies, evaluating new ideas, and aligning innovation with business goals.
                  His role centers on analysis, strategic planning, and ensuring that technology initiatives support product evolution and operational efficiency.
                </p>
              </div>
            </div>
          </div>
        </section>
        
      
        {/* Social Media Section */}
        <div className="social-media-section fade-up delay-1">
          <h3 className="fade-up delay-2">Connect With Shopy</h3>
          <p className="social-media-subtitle fade-up delay-3">Follow us on social media for updates, tips, and exclusive offers</p>
          <div className="social-media-links">
            <a href="https://www.facebook.com/shopy" target="_blank" rel="noopener noreferrer" className="social-link facebook fade-up delay-4" aria-label="Follow Shopy on Facebook">
              <img src="/images/facebook-logo.svg" alt="Facebook" className="social-logo" />
            </a>
            <a href="https://www.instagram.com/shopy" target="_blank" rel="noopener noreferrer" className="social-link instagram fade-up delay-5" aria-label="Follow Shopy on Instagram">
              <img src="/images/instagram-logo.svg" alt="Instagram" className="social-logo" />
            </a>
            <a href="https://wa.me/7010744553" target="_blank" rel="noopener noreferrer" className="social-link whatsapp fade-up delay-6" aria-label="Contact Shopy on WhatsApp">
              <img src="/images/whatsapp-logo.svg" alt="WhatsApp" className="social-logo" />
            </a>
            <a href="https://twitter.com/shopy" target="_blank" rel="noopener noreferrer" className="social-link twitter fade-up delay-7" aria-label="Follow Shopy on Twitter">
              <img src="/images/twitter-logo.svg" alt="Twitter" className="social-logo" />
            </a>
          </div>
        </div>
        
        <footer className="footer animate-on-scroll fade-up">
          <div className="footer-inner">
            <span className="footer-copy">
              &copy; 2025 Shopy. All rights reserved.
            </span>
            <div className="footer-links">
              <a href="/privacy" className="footer-link">Privacy Policy</a>
              <a href="/terms" className="footer-link">Terms of Service</a>
            </div>
          </div>
        </footer>
    </main>
    </>
  );
};

export default About;