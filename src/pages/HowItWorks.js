import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';
import Navbar from '../components/Navbar';

// Add gradient animation keyframes
const gradientAnimation = `
  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

// Create a style element for the animation
const styleElement = document.createElement('style');
styleElement.textContent = gradientAnimation;
document.head.appendChild(styleElement);

const HowItWorks = () => {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [navVisible, setNavVisible] = useState(true);
  const [menuButtonVisible, setMenuButtonVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 768 : false);

  // Force scroll to top immediately when component renders
  React.useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    // Aggressive scroll to top with multiple methods
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      if (window.pageYOffset !== 0) {
        window.scrollTo(0, 0);
      }
    };
    
    // Use requestAnimationFrame for better timing
    requestAnimationFrame(scrollToTop);
    requestAnimationFrame(() => {
      requestAnimationFrame(scrollToTop);
    });
    
    // Additional attempts with timeouts
    setTimeout(scrollToTop, 0);
    setTimeout(scrollToTop, 50);
    setTimeout(scrollToTop, 100);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setNavVisible(false);
            setMenuButtonVisible(false);
          } else {
            setNavVisible(true);
            setMenuButtonVisible(true);
          }
          setLastScrollY(currentScrollY);
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.zoom-out');
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight - 100) {
          element.classList.add('animate');
        }
      });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load

    return () => {
      window.removeEventListener('scroll', animateOnScroll);
    };
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
      ...document.querySelectorAll('.how-usp-card'),
      ...document.querySelectorAll('.how-step-card'),
      ...document.querySelectorAll('.section-header'),
      ...document.querySelectorAll('.zoom-out'),
    ];

    elementsToObserve.forEach((el) => observer.observe(el));

    return () => {
      elementsToObserve.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const handleNavClick = (target) => {
    if (target === 'home') {
      window.location.href = '/';
      return;
    }
    if (target === 'about') {
      window.location.href = '/about';
      return;
    }
    const el = document.getElementById(target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleMenuNav = (path) => {
    window.location.href = path;
    setMenuOpen(false);
  };

  // Toggle body scroll lock
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${window.scrollY}px`;
      document.body.style.width = '100%';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  }, [menuOpen]);

  return (
    <div className="page-root">
      <Navbar />
          <style jsx global={true}>{`
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
              background: rgba(253, 253, 253, 0.2);
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

      <main id="top">
        <section className="section how-hero-section" style={{
        padding: '0px 0 0',
        margin: 0,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffffff',
        position: 'relative',
        overflow: 'visible',
        width: '100vw',
        marginLeft: 'calc(50% - 50vw)',
        marginRight: 'calc(50% - 50vw)'
      }}>
        <div style={{
          maxWidth: '100vw',
          width: '100vw',
          padding: 0,
          textAlign: 'center',
          zIndex: 1
        }}>
          <div style={{
            marginBottom: '40px',
            display: 'inline-block',
            padding: '8px 24px',
            background: 'white',
            borderRadius: '50px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
          }}>
            <span style={{
              fontSize: '2.2rem',
              background: 'linear-gradient(90deg, #FFD700, #FFA500, #FF4500, #1E90FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '300% 100%',
              animation: 'gradient 8s ease infinite',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              fontWeight: 600,
              display: 'inline-block'
            }}>How it works</span>
          </div>
          
          <div style={{
            width: '100vw',
            marginLeft: 'calc(50% - 50vw)',
            marginRight: 'calc(50% - 50vw)',
            padding: '40px 0',
            boxSizing: 'border-box'
          }}>
            <div style={{
              width: '100vw',
              textAlign: 'center',
              margin: 0,
              padding: 0,
              boxSizing: 'border-box'
            }}>
              <h1 style={{
                fontSize: 'clamp(3rem, 8.5vw, 9.5rem)',
                margin: 0,
                lineHeight: '1.1',
                background: 'linear-gradient(90deg, #FFD700, #FFA500, #FF4500, #1E90FF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '300% 100%',
                animation: 'gradient 8s ease infinite',
                fontWeight: 700,
                letterSpacing: '-2px',
                whiteSpace: 'normal',
                display: 'block',
                width: '100vw',
                padding: 0,
                boxSizing: 'border-box',
                textAlign: 'center'
              }}>
                <span style={{ display: 'block' }}>Designed for Speed.</span>
                <span style={{ display: 'block' }}>Built Around Local Stores.</span>
              </h1>
            </div>
            
            
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '20px',
              marginTop: '40px'
            }}>
              
            </div>
          </div>
        </div>
        
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '100px',
          background: 'linear-gradient(to top, rgba(255,255,255,1), rgba(255,255,255,0))',
          zIndex: 2
        }}></div>
        
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 30%, rgba(255, 215, 0, 0.1) 0%, transparent 30%), radial-gradient(circle at 80% 70%, rgba(30, 144, 255, 0.1) 0%, transparent 30%)',
          zIndex: 0
        }}></div>
      </section>
      
      <section className="section how-it-works" style={{
        paddingBottom: '50px',
        backgroundColor: '#fff'
      }}>
            <p className="animate-words" style={{
              fontSize: '2.2rem',
              textAlign: 'center',
              lineHeight: '1.8',
              color: '#555',
              margin: '0 auto',
              maxWidth: '1000px',
              opacity: 0,
              animation: 'fadeInGrow 1s ease-out 0.5s forwards'
            }}>
              Shopy operates on a hyperlocal model that connects customers directly with nearby neighborhood stores. By using existing local inventory instead of centralized warehouses, Shopy enables faster and more efficient order fulfillment.
            </p>
      </section>

      {/* Customers Hero Section */}
      <section className="customers-hero">
          <div className="customers-content" style={{
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center',
            padding: '60px 20px'
          }}>
            <h2 className="customers-title" style={{
              fontSize: '4.5rem',
              margin: '0 0 20px',
              color: '#fff',
              fontWeight: '700',
              lineHeight: '1.1',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              <div>For</div>
              <div style={{marginTop: '-10px'}}>Customer's</div>
            </h2>
            <p className="customers-subtitle" style={{
              fontSize: '1.8rem',
              color: 'rgba(63, 62, 62, 0.9)',
              margin: '0 auto',
              maxWidth: '600px',
              lineHeight: '1.6',
              fontWeight: '400',
              letterSpacing: '0.5px'
            }}>
              A Simple Flow. Built for Speed.
            </p>
          </div>
      </section>

        {/* Customer Images with Descriptions Inside */}
        <section className="section zigzag-section animate-on-scroll fade-up" style={{
         background: 'linear-gradient(-45deg, #fffef5, #5fdaebff, #00e0feda, #fffef5)',
          backgroundSize: '300% 300%',
          animation: 'gradientShift 8s ease infinite',
          padding: '60px 0'
        }}>
          <div className="zigzag-list">
            <div className="zigzag-item zigzag-left animate-on-scroll fade-up">
              <div className="zigzag-image-container" style={{ padding: '10px 16px', boxSizing: 'border-box' }}>
                <img style={{ width: '100%', display: 'block', borderRadius: '16px' }} 
                  src="/Discover Nearby Stores.png" 
                  alt="Happy customer Sarah" 
                  className="zigzag-media zigzag-gradient-1" 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/customer.jpg';
                  }}
                />
                <div className="zigzag-text-overlay">
                  <h3 className="zigzag-title animate-on-scroll fade-up">Discover Nearby Stores</h3>
                </div>
              </div>
              <div className="zigzag-content animate-on-scroll slide-in-left" style={{ padding: '40px 24px' }}>
                <h3 className="zigzag-title">Discover Nearby Stores</h3>
                <p className="zigzag-body">
                  Browse verified local stores based on your location. View real-time product availability and pricing.
                </p>
              </div>
            </div>
            
            <div className="zigzag-item zigzag-right animate-on-scroll fade-up">
              <div className="zigzag-content animate-on-scroll slide-in-right" style={{ padding: '40px 24px' }}>
                <h3 className="zigzag-title">Place an Order</h3>
                <p className="zigzag-body">
                  Add items to your cart and complete payment securely through the app. Orders are confirmed instantly.
                </p>
              </div>
              <div className="zigzag-image-container" style={{ padding: '0 16px', boxSizing: 'border-box' }}>
                <img style={{ width: '100%', display: 'block', borderRadius: '16px' }} 
                  src="fairprice.png" 
                  alt="Satisfied customer Mike" 
                  className="zigzag-media zigzag-gradient-2" 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/customer.jpg';
                  }}
                />
                <div className="zigzag-text-overlay">
                  <h3 className="zigzag-title animate-on-scroll fade-up">Place an Order</h3>
                </div>
              </div>
            </div>
            
            <div className="zigzag-item zigzag-left animate-on-scroll fade-up">
              <div className="zigzag-image-container" style={{ padding: '0 16px', boxSizing: 'border-box' }}>
                <img style={{ width: '100%', display: 'block', borderRadius: '16px' }} 
                  src="local fulfillment.png" 
                  alt="Customer Emily with delivery" 
                  className="zigzag-media zigzag-gradient-3" 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/customer.jpg';
                  }}
                />
                <div className="zigzag-text-overlay">
                  <h3 className="zigzag-title animate-on-scroll fade-up">Local Fulfillment</h3>
                </div>
              </div>
              <div className="zigzag-content animate-on-scroll slide-in-left" style={{ padding: '40px 24px' }}>
                <h3 className="zigzag-title">Local Fulfillment</h3>
                <p className="zigzag-body">
                 The nearest store prepares your order using available inventory, reducing fulfillment time.
                </p>
              </div>
            </div>
            <div className="zigzag-item zigzag-right animate-on-scroll fade-up">
              <div className="zigzag-content animate-on-scroll slide-in-right" style={{ padding: '40px 24px' }}>
                <h3 className="zigzag-title">Fast Delivery</h3>
                <p className="zigzag-body">
                  Orders are delivered over short distances with real-time tracking until they reach your doorstep.
                </p>
              </div>
              <div className="zigzag-image-container" style={{ padding: '0 16px', boxSizing: 'border-box' }}>
                <img style={{ width: '100%', display: 'block', borderRadius: '16px' }} 
                  src="/Fast delivery.png" 
                  alt="Satisfied customer Mike" 
                  className="zigzag-media zigzag-gradient-2" 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/customer.jpg';
                  }}
                />
                <div className="zigzag-text-overlay">
                  <h3 className="zigzag-title animate-on-scroll fade-up">Fast Delivery</h3>
                </div>
              </div>
            </div>
          </div>
      </section>

        {/* Stores Hero Section */}
        <section className="stores-hero" style={{
          background: 'linear-gradient(-45deg, #fffef5, #fffacd, #fff200, #fffef5)',
          backgroundSize: '300% 300%',
          animation: 'gradientShift 8s ease infinite',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          color: '#333'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center',
            padding: '60px 20px'
          }}>
            <h2 style={{
              fontSize: '4.5rem',
              margin: '0 0 20px',
              color: '#000000ff',
              fontWeight: '700',
              lineHeight: '1.1',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              <div>For</div>
              <div style={{marginTop: '-10px'}}>Store's</div>
            </h2>
            <p style={{
              fontSize: '1.8rem',
              color: 'rgba(63, 62, 62, 0.9)',
              margin: '0 auto',
              maxWidth: '600px',
              lineHeight: '1.6',
              fontWeight: '400',
              letterSpacing: '0.5px'
            }}>
              Go Digital Without Disruption.
            </p>
          </div>
      </section>

        {/* Store Images with Descriptions Inside */}
        <section className="section zigzag-section animate-on-scroll fade-up" style={{
          background: 'linear-gradient(-45deg, #fffef5, #fffacd, #fff200, #fffef5)',
          backgroundSize: '300% 300%',
          animation: 'gradientShift 8s ease infinite',
          padding: '60px 0'
        }}>
          
          
          <div className="zigzag-list">
            <div className="zigzag-item zigzag-right animate-on-scroll fade-up">
              <div className="zigzag-content animate-on-scroll slide-in-right">
                <h3 className="zigzag-title">Simple Onboarding</h3>
                <p className="zigzag-body">
                  Stores are onboarded through a quick verification process without changes to existing operations.
                </p>
              </div>
              <div className="zigzag-image-container" style={{ padding: '0 16px', boxSizing: 'border-box' }}>
                <img style={{ width: '100%', display: 'block', borderRadius: '16px' }} 
                  src="/Simple Onboarding.png" 
                  alt="Green Pharmacy store" 
                  className="zigzag-media zigzag-gradient-3" 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/customer.jpg';
                  }}
                />
                <div className="zigzag-text-overlay">
                  <h3 className="zigzag-title animate-on-scroll fade-up">Simple Onboarding</h3>
                </div>
              </div>
            </div>
            
            <div className="zigzag-item zigzag-left animate-on-scroll fade-up">
              <div className="zigzag-image-container" style={{ padding: '0 16px', boxSizing: 'border-box' }}>
                <img style={{ width: '100%', display: 'block', borderRadius: '16px' }} 
                  src="/Digital Listing.png" 
                  alt="TechHub Electronics store" 
                  className="zigzag-media zigzag-gradient-1" 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/customer.jpg';
                  }}
                />
                <div className="zigzag-text-overlay">
                  <h3 className="zigzag-title animate-on-scroll fade-up">Digital Listing</h3>
                </div>
              </div>
              <div className="zigzag-content animate-on-scroll slide-in-left">
                <h3 className="zigzag-title">Digital Listing</h3>
                <p className="zigzag-body">
                  List products, manage pricing, and update stock levels in real time.
                </p>
              </div>
            </div>
            
            <div className="zigzag-item zigzag-right animate-on-scroll fade-up">
              <div className="zigzag-content animate-on-scroll slide-in-right">
                <h3 className="zigzag-title">Order Processing</h3>
                <p className="zigzag-body">
                  Receive orders from nearby customers and prepare them directly from in-store inventory.
                </p>
              </div>
              <div className="zigzag-image-container" style={{ padding: '0 16px', boxSizing: 'border-box' }}>
                <img style={{ width: '100%', display: 'block', borderRadius: '16px' }} 
                  src="/Order Processing.png" 
                  alt="Bakery Bliss store" 
                  className="zigzag-media zigzag-gradient-2" 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/customer.jpg';
                  }}
                />
                <div className="zigzag-text-overlay">
                  <h3 className="zigzag-title animate-on-scroll fade-up">Order Processing</h3>
                </div>
              </div>
            </div>
            <div className="zigzag-item zigzag-left animate-on-scroll fade-up">
              <div className="zigzag-image-container" style={{ padding: '0 16px', boxSizing: 'border-box' }}>
                <img style={{ width: '100%', display: 'block', borderRadius: '16px' }} 
                  src="/Last-Mile Support.png" 
                  alt="TechHub Electronics store" 
                  className="zigzag-media zigzag-gradient-1" 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/customer.jpg';
                  }}
                />
                <div className="zigzag-text-overlay">
                  <h3 className="zigzag-title animate-on-scroll fade-up">Last-Mile Support</h3>
                </div>
              </div>
              <div className="zigzag-content animate-on-scroll slide-in-left">
                <h3 className="zigzag-title">Last-Mile Support</h3>
                <p className="zigzag-body">
                  Shopy coordinates delivery so stores can focus on fulfillment and customer satisfaction.
                </p>
              </div>
            </div>
          </div>
      </section>

        {/* Social Media Section */}
        <div className="social-media-section animate-on-scroll zoom-out">
          <h3 className="zoom-out delay-1">Connect With Shopy</h3>
          <p className="social-media-subtitle zoom-out delay-2">Follow us on social media for updates, tips, and exclusive offers</p>
          <div className="social-media-links">
            <a href="https://www.facebook.com/shopy" target="_blank" rel="noopener noreferrer" className="social-link facebook zoom-out delay-3" aria-label="Follow Shopy on Facebook">
              <img src="/images/facebook-logo.svg" alt="Facebook" className="social-logo" />
            </a>
            <a href="https://www.instagram.com/shopy" target="_blank" rel="noopener noreferrer" className="social-link instagram zoom-out delay-4" aria-label="Follow Shopy on Instagram">
              <img src="/images/instagram-logo.svg" alt="Instagram" className="social-logo" />
            </a>
            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="social-link whatsapp zoom-out delay-5" aria-label="Contact Shopy on WhatsApp">
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
              &copy; 2025 Shopy. All rights reserved.
            </span>
            <div className="footer-links">
              <a href="/privacy" className="footer-link">Privacy Policy</a>
              <a href="/terms" className="footer-link">Terms of Service</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default HowItWorks;
