import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';
import FlippableCard from '../components/FlippableCard';
import Navbar from '../components/Navbar';

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'how-it-works', label: 'How it works' },
];

function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const carouselRef = useRef(null);
  
  const images = [
    'https://picsum.photos/seed/shopy-platform/400/400.jpg',
    'https://picsum.photos/seed/shopy-delivery/400/400.jpg',
    'https://picsum.photos/seed/shopy-stores/400/400.jpg'
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Auto-slide the USP cards carousel horizontally
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const interval = setInterval(() => {
      const card = el.querySelector('.flippable-card-3d');
      if (!card) return;
      const cardWidth = card.getBoundingClientRect().width + 24; // include gap
      const maxScroll = el.scrollWidth - el.clientWidth;
      const nextLeft = el.scrollLeft + cardWidth;
      if (nextLeft >= maxScroll - 4) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Add this useEffect hook at the top of your Home component
useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
      }
    });
  }, { threshold: 0.1 });

  // Observe all zigzag items
  document.querySelectorAll('.zz-item').forEach((item, index) => {
    // Add delay based on index for staggered animation
    item.style.animationDelay = `${index * 0.2}s`;
    observer.observe(item);
  });

  return () => observer.disconnect();
}, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    const elementsToObserve = [
      ...document.querySelectorAll('.animate-on-scroll'),
      ...document.querySelectorAll('.fade-up'),
      ...document.querySelectorAll('.zoom-out'),
      ...document.querySelectorAll('.slide-in'),
    ];

    elementsToObserve.forEach((el) => observer.observe(el));

    return () => {
      elementsToObserve.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="page-root">
      <Navbar />

      <style jsx global={true}>{`
            .nav-wrapper {
              position: relative;
              z-index: 999999 !important;
              height: 60px;
            }
            .nav-links {
              display: flex !important;
              position: static !important;
              visibility: visible !important;
              opacity: 1 !important;
              transform: none !important;
              top: auto !important;
              right: auto !important;
              width: auto !important;
              height: auto !important;
              flex-direction: row !important;
              align-items: center !important;
              z-index: 1 !important;
            }
            .nav-link {
              display: block !important;
              visibility: visible !important;
              opacity: 1 !important;
            }
            .mobile-menu-wrapper {
              position: fixed;
              top: 20px;
              right: 20px;
              z-index: 999999;
              display: none;
              transition: transform 0.3s ease, opacity 0.3s ease;
            }
            .mobile-menu-wrapper.menu-button-visible {
              transform: translateX(0);
              opacity: 1;
            }
            .mobile-menu-wrapper.menu-button-hidden {
              transform: translateX(100px);
              opacity: 0;
            }
            @media (max-width: 1024px) and (min-width: 769px) {
              .mobile-menu-wrapper {
                top: 50%;
                right: 50%;
                transform: translate(50%, -50%);
              }
              .mobile-menu-wrapper.menu-button-visible {
                transform: translate(50%, -50%);
              }
              .mobile-menu-wrapper.menu-button-hidden {
                transform: translate(50%, -50%) translateX(100px);
              }
            }
            .mobile-menu-btn {
              background: transparent;
              border: none;
              border-radius: 0;
              padding: 8px;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              width: auto;
              height: auto;
              transition: all 0.3s ease;
            }
            .mobile-menu-btn:hover {
              background: transparent;
              transform: scale(1.1);
            }
            .menu-icon {
              width: 30px;
              height: 24px;
              position: relative;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            }
            .menu-icon span {
              display: block;
              height: 3px;
              background: #000000;
              transition: transform 0.3s, opacity 0.3s;
              border-radius: 2px;
            }
            .menu-icon.open span:nth-child(1) { transform: rotate(45deg) translate(8px, 8px); }
            .menu-icon.open span:nth-child(2) { opacity: 0; }
            .menu-icon.open span:nth-child(3) { transform: rotate(-45deg) translate(8px, -8px); }
            .mobile-menu-backdrop {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: rgba(0, 0, 0, 0.5);
              z-index: 999998;
            }
            .mobile-menu-dropdown {
              position: fixed;
              top: 140px;
              left: 50%;
              transform: translateX(-50%) translateY(-120%);
              width: 90%;
              max-width: 400px;
              height: auto;
              display: flex !important;
              flex-direction: column;
              z-index: 999999;
              visibility: visible !important;
              opacity: 1 !important;
              background: #000000;
              border-radius: 20px;
              box-shadow: 0 10px 40px rgba(0,0,0,0.5);
              transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            .mobile-menu-dropdown.open {
              transform: translateX(-50%) translateY(0);
            }
            .mobile-menu-handle {
              width: 60px;
              height: 6px;
              background: #ffffff;
              border-radius: 3px;
              margin: 20px auto;
            }
            .mobile-menu-item {
              padding: 25px 30px;
              background: rgba(255, 255, 255, 0.1);
              border: 2px solid rgba(255, 255, 255, 0.3);
              text-align: center;
              cursor: pointer;
              font-size: 20px;
              font-weight: 600;
              color: #ffffff;
              transition: all 0.3s ease;
              position: relative;
              z-index: 999999;
              opacity: 1 !important;
              transform: translateX(0);
              display: block !important;
              visibility: visible !important;
              margin: 10px 20px;
              border-radius: 15px;
            }
            .mobile-menu-item:last-child {
              border-bottom: none;
            }
            .mobile-menu-item:hover {
              background: rgba(255, 255, 255, 0.2);
              border-color: #ffffff;
              transform: scale(1.02);
              box-shadow: 0 4px 15px rgba(255,255,255,0.3);
            }
            @media (max-width: 1024px) {
              .nav-links {
                display: none !important;
              }
              .mobile-menu-wrapper {
                display: flex;
                align-items: center;
                margin-left: auto;
              }
            }
          `}</style>

      <main>
        <section id="home" className="hero-section" style={{
          background: 'linear-gradient(-45deg, #ff6c6cff 10%, #f60101c4 20%, #ffa600ff 35%, #f4f450ff 55%, #21ff8cf0 70%,#00FFFF 80%, #00fff2ff 100%)',
          backgroundSize: '300% 300%',
          animation: 'gradient 10s ease infinite',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          padding: '2rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <style jsx global>{`
            @keyframes gradient {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
          `}</style>
          <div className="hero-content">
            <div className="hero-backdrop"></div>
            <div className="hero-grid">
              <div className="hero-left">
                <h1 className="hero-title" style={{
                  fontSize: 'clamp(3rem, 8.5vw, 10rem)',
                  margin: '0 0 rem 0',
                  lineHeight: '1.1'
                }}>
                  <span className="hero-title-main animated-shopy" style={{
                    display: 'block',
                    marginBottom: '0.5rem'
                  }}>Shopy</span>
                  <span className="hero-tagline" style={{
                    fontSize: 'clamp(1rem, 3vw, 8rem)',
                    display: 'block',
                    fontWeight: 500
                  }}>Store at your Door</span>
                </h1>
                <h2 className="hero-subtitle" style={{
                  fontSize: '2rem',
                  margin: 'rem 0 0 0',
                  fontWeight: 600
                }}>
                  Unlocking the future of hyperlocal e-commerce and e-retailers.
                </h2>
              </div>
              <div className="hero-right">
                <img src="/logo.png" alt="Shopy Logo" className="hero-logo-hero" />
              </div>
            </div>
            {/* <div className="hero-cta-row"> 
              <button
                className="primary-cta"
                onClick={() => { window.location.href = '/products'; }}
              >
                Explore products
              </button>
              <button
                className="secondary-cta"
                onClick={() => { window.location.href = '/how-it-works'; }}
              >
                See how it works
              </button>
            </div> */}
          </div>
        </section>

        <section id="features" className="section section-zigzag">
          <div className="what-is-shopy-container">
            <h2 className="what-is-shopy-title">What is Shopy</h2>
            <p className="what-is-shopy-description">
              <span className="highlight"> Shopy is a hyperlocal commerce platform that connects customers with nearby local stores 
              for fast and reliable delivery</span>.
            </p>
          </div>
          
          {/* USP Flippable Card Section */}
          <div className="usp-cards-section">
            <div className="section-header">
              <h2 className="section-title">Why Shopy</h2>
              <p className="section-subtitle">
                Discover the benefits that make Shopy the perfect choice for local stores and customers alike
              </p>
            </div>
            <div className="usp-cards-container carousel" ref={carouselRef}>
              <FlippableCard 
                image="Built to Scale.png"
                uspTitle="Businesses, Empowered"
                uspDescription="Shopy enables local stores to go digital and reach nearby customers without changing how they operate. 
                Stores gain visibility and demand without additional inventory or infrastructure investment."
              />
              <FlippableCard 
                image="Businesses.png"
                uspTitle="Built to Scale, Asset-Light"
                uspDescription="Shopy grows by levering existing retail infrastructure, instead of building warehouses. 
                This asset-light approach supports rapid expansion while maintaining operations efficiency."
                className="card-style-2"
              />
              <FlippableCard 
                image="fairprice.png"
                uspTitle="Fair Price, Faster Than Ever"
                uspDescription="By fulfilling orders directly from nearby stores, Shopy minimizes logistics overhead. 
                This ensures faster delivery and fair, transparent pricing for customers."
                className="card-style-3"
              />
            </div>
          </div>
          
        <header className="section-header">
          <h2 className="section-title">How it works</h2>
          <p className="section-body">
            The complete solution to speed up operations, improve sales, and elevate your store's value.
          </p>
        </header>

        {/* Main Cards in Zigzag */}
        <div className="how-zigzag">
          {/* First Card (content only) */}
          <div className="zz-item left content-only">
            <div className="zz-content animate-on-scroll fade-up zz-gradient" style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <h3 className="zz-title animate-on-scroll fade-up" style={{
                opacity: 0,
                animation: 'fadeInUp 0.8s ease-out 0.3s forwards',
                transform: 'translateY(20px)'
              }}>Work With Us</h3>
              <p className="zz-body animate-on-scroll fade-up" style={{
                opacity: 0,
                animation: 'fadeInUp 0.8s ease-out 0.5s forwards',
                transform: 'translateY(20px)'
              }}>
                Shopy is a community of builders, doers and thinkers reimagining hyperlocal commerce.
                We're looking to inspire the next generation.
              </p>
              <button className="zz-btn zoom-out delay-3" style={{ display: 'block', margin: '0 auto' }} onClick={() => { window.location.href = '/how-it-works'; }}>
                Explore
              </button>
            </div>
          </div>

          {/* Second Card (content only) */}
          <div className="zz-item right content-only">
            <div className="zz-content animate-on-scroll fade-up zz-gradient" style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <h3 className="zz-title animate-on-scroll fade-up" style={{
                opacity: 0,
                animation: 'fadeInUp 0.8s ease-out 0.3s forwards',
                transform: 'translateY(20px)'
              }}>Understand Real Customer Needs</h3>
              <p className="zz-body animate-on-scroll fade-up" style={{
                opacity: 0,
                animation: 'fadeInUp 0.8s ease-out 0.5s forwards',
                transform: 'translateY(20px)'
              }}>
                We listen closely and design experiences that add real value. Every choice is driven by quality, 
                convenience, and trust.
              </p>
              <button className="zz-btn zoom-out delay-3" style={{ display: 'block', margin: '0 auto' }} onClick={() => { window.location.href = '/how-it-works'; }}>
                Explore
              </button>
            </div>
          </div>

          
        </div>
        </section>
      </main>

      {/* Social Media Section */}
      <div className="social-media-section animate-on-scroll zoom-out">
        <h3 className="zoom-out delay-1">Follow Us</h3>
        <p className="social-media-subtitle zoom-out delay-2">Connect with us on social media</p>
        <div className="social-media-links">
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="social-link facebook zoom-out delay-3">
            <img src="/images/facebook-logo.svg" alt="Facebook" className="social-logo" />
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="social-link instagram zoom-out delay-4">
            <img src="/images/instagram-logo.svg" alt="Instagram" className="social-logo" />
          </a>
          <a href="https://wa.me/7010744553" target="_blank" rel="noopener noreferrer" className="social-link whatsapp zoom-out delay-5">
            <img src="/images/whatsapp-logo.svg" alt="WhatsApp" className="social-logo" />
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="social-link twitter zoom-out delay-6">
            <img src="/images/twitter-logo.svg" alt="Twitter" className="social-logo" />
          </a>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-inner">
          <span className="footer-copy">
            &copy; 2025 Shopy. All rights reserved.
          </span>
          <div className="footer-links">
            <a href="#" className="footer-link">
              Privacy Policy
            </a>
            <a href="#" className="footer-link">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
