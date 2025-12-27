import React from 'react';
import { FaHandshake, FaPalette, FaFileInvoiceDollar, FaClipboardCheck, FaTruck, FaTools, FaCheckCircle, FaKey } from 'react-icons/fa';
import Carousel from '../components/Carousel';
import './Home.css';

const Home = () => {
  const heroSlides = [
    {
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974&auto=format&fit=crop',
      title: 'LUXURY LIVING SPACES',
      description: 'Transform your home into a masterpiece of elegance and comfort',
    },
    {
      image: 'https://images.unsplash.com/photo-1556912173-46c336c7fd55?q=80&w=2070&auto=format&fit=crop',
      title: 'MODULAR KITCHEN DESIGN',
      description: 'Elegant, clutter-free kitchens with smart storage and premium finishes',
    },
    {
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2032&auto=format&fit=crop',
      title: 'BEDROOM SANCTUARIES',
      description: 'Relaxing master bedrooms with warm lighting and sophisticated design',
    },
    {
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop',
      title: 'PROFESSIONAL WORKSPACES',
      description: 'Modern office interiors designed for productivity and inspiration',
    },
  ];

  const services = [
    {
      title: 'Interior Design',
      description:
        'Transform your space with our expert interior design services. We create personalized environments that reflect your style and enhance your lifestyle with meticulous attention to detail.',
      icon: '🏛️',
    },
    {
      title: 'Modern Design',
      description:
        'Experience contemporary aesthetics with our modern design solutions. We blend functionality with cutting-edge style to create spaces that are both beautiful and practical.',
      icon: '✨',
    },
    {
      title: 'Planning & Consultation',
      description:
        'Comprehensive planning services from concept to completion. Our expert consultants guide you through every step, ensuring your vision becomes reality with precision and care.',
      icon: '📐',
    },
  ];

  const projects = [
    {
      title: 'Luxury Kitchen Interior',
      location: 'Erode, Tamil Nadu',
      image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=2068&auto=format&fit=crop',
    },
    {
      title: 'Contemporary Living Room',
      location: 'Chennai, Tamil Nadu',
      image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1974&auto=format&fit=crop',
    },
    {
      title: 'Master Bedroom Suite',
      location: 'Coimbatore, Tamil Nadu',
      image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=2070&auto=format&fit=crop',
    },
    {
      title: 'Wardrobe & Dressing',
      location: 'Erode, Tamil Nadu',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2069&auto=format&fit=crop',
    },
    {
      title: 'TV Unit with Paneling',
      location: 'Salem, Tamil Nadu',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop',
    },
    {
      title: 'Modern Office Space',
      location: 'Bangalore, Karnataka',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
    },
  ];



  const designProcess = [
    { step: 'Meet Designer', icon: <FaHandshake />, description: 'Initial consultation to understand your vision' },
    { step: 'Design Concepts', icon: <FaPalette />, description: 'Creative design proposals tailored to you' },
    { step: 'Finalize Costing', icon: <FaFileInvoiceDollar />, description: 'Transparent pricing and budget planning' },
    { step: 'Place Order', icon: <FaClipboardCheck />, description: 'Confirm your design and specifications' },
    { step: 'Material Delivery', icon: <FaTruck />, description: 'Premium materials delivered to site' },
    { step: 'Implementation', icon: <FaTools />, description: 'Expert execution by skilled craftsmen' },
    { step: 'Quality Check', icon: <FaCheckCircle />, description: 'Rigorous quality control at every stage' },
    { step: 'Site Handover', icon: <FaKey />, description: 'Final walkthrough and project completion' },
  ];

  const ourServices = [
    {
      title: 'Living Room',
      description: 'Conceptualize, design and execute stunning living room interiors that become the heart of your home.',
      icon: '🛋️',
    },
    {
      title: 'Bedroom',
      description: 'Create peaceful sanctuaries with modern bedroom designs featuring smart storage and elegant aesthetics.',
      icon: '🛏️',
    },
    {
      title: 'Kitchen',
      description: 'Modular kitchen solutions with premium finishes, smart storage, and contemporary design elements.',
      icon: '🍳',
    },
    {
      title: 'Office',
      description: 'Professional office interiors that boost productivity with ergonomic design and modern aesthetics.',
      icon: '💼',
    },
    {
      title: 'Wardrobe',
      description: 'Custom wardrobe solutions with intelligent storage systems and luxurious finishes.',
      icon: '👔',
    },
    {
      title: 'TV Unit',
      description: 'Elegant entertainment units with integrated storage and sophisticated paneling designs.',
      icon: '📺',
    },
  ];

  const news = [
    {
      title: 'Modern Kitchen Design Trends 2024',
      date: '15 Dec 2024',
      author: 'Design Team',
      category: 'Kitchen',
      comments: 12,
      excerpt:
        'Discover the latest trends in modular kitchen design. From smart storage solutions to premium finishes, explore what makes modern kitchens both beautiful and functional.',
      image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=400&auto=format&fit=crop',
    },
    {
      title: 'Luxury Living Room Ideas',
      date: '10 Dec 2024',
      author: 'Interior Experts',
      category: 'Living Room',
      comments: 8,
      excerpt:
        'Transform your living space into a luxurious retreat. Learn about color palettes, furniture selection, and design principles that create stunning living rooms.',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=400&auto=format&fit=crop',
    },
    {
      title: 'Bedroom Design Essentials',
      date: '05 Dec 2024',
      author: 'TrendyInterios',
      category: 'Bedroom',
      comments: 15,
      excerpt:
        'Create the perfect bedroom sanctuary with our expert tips. From lighting to storage, discover the essential elements of sophisticated bedroom design.',
      image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=400&auto=format&fit=crop',
    },
  ];

  return (
    <div className="home-page">
      {/* Hero Carousel Section */}
      <section className="hero-section">
        <Carousel slides={heroSlides} autoPlay={true} interval={5000} />
        <div className="tagline">
          <h1>Filling the Heart, Not Just Space</h1>
          <p>Premium Interior Design Solutions for Modern Living</p>
          <div className="hero-cta-buttons">
            <button className="btn-primary">
              View Projects
            </button>
            <button className="btn-secondary">
              Get Free Consultation
            </button>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="services-section">
        <div className="container">
          <div className="section-header">
            <div className="section-subtitle-line"></div>
            <h2>WHAT WE DO</h2>
            <p className="section-subtitle">Crafting exceptional spaces with passion and precision</p>
          </div>
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className="read-more-wrapper">
                  <button className="read-more-btn">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Projects Section */}
      <section className="projects-section">
        <div className="container">
          <div className="section-header">
            <div className="section-subtitle-line"></div>
            <h2>LATEST PROJECTS</h2>
            <p className="section-subtitle" style={{ color: 'var(--color-gray-light)' }}>
              Explore our portfolio of stunning interior transformations
            </p>
          </div>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                <img src={project.image} alt={project.title} />
                <h3>
                  {project.title}
                  <span className="project-location">{project.location}</span>
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Design Journey Section */}
      <section className="design-process-section">
        <div className="container">
          <div className="section-header">
            <div className="section-subtitle-line"></div>
            <h2>Our Design Journey</h2>
            <p className="section-subtitle">
              From Concept to Completion - A Seamless Experience
            </p>
          </div>
          <div className="design-process-timeline">
            {designProcess.map((item, index) => (
              <div key={index} className="process-step">
                <div className="step-content-wrapper">
                  <div className="step-icon-wrapper">
                    <div className="step-icon">{item.icon}</div>
                    <div className="step-number">{index + 1}</div>
                  </div>
                  <div className="process-step-info">
                    <h4>{item.step}</h4>
                    <p>{item.description}</p>
                  </div>
                </div>
                {index < designProcess.length - 1 && <div className="step-connector"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <div className="section-subtitle-line"></div>
            <h2>WHAT OUR CLIENTS SAY</h2>
            <p className="section-subtitle">
              Trusted by 200+ happy homeowners across India
            </p>
          </div>

          <div className="testimonials-carousel">
            <div className="testimonial-card">
              <div className="quote-icon">"</div>
              <div className="stars">★★★★★</div>
              <p className="testimonial-text">
                "TrendyInterios transformed our home into a masterpiece! Their attention to detail and creative design solutions exceeded our expectations. The team was professional, timely, and truly understood our vision."
              </p>
              <div className="customer-info">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                  alt="Priya Sharma"
                  className="customer-avatar"
                />
                <div className="customer-details">
                  <h4>Priya Sharma</h4>
                  <p>Chennai, Tamil Nadu</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="quote-icon">"</div>
              <div className="stars">★★★★★</div>
              <p className="testimonial-text">
                "Exceptional service from start to finish! The modular kitchen design is both beautiful and functional. Every detail was carefully planned and executed. Highly recommend TrendyInterios for premium interiors."
              </p>
              <div className="customer-info">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
                  alt="Rajesh Kumar"
                  className="customer-avatar"
                />
                <div className="customer-details">
                  <h4>Rajesh Kumar</h4>
                  <p>Erode, Tamil Nadu</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="quote-icon">"</div>
              <div className="stars">★★★★★</div>
              <p className="testimonial-text">
                "Outstanding craftsmanship and innovative designs! Our bedroom and living room look absolutely stunning. The team's professionalism and dedication to quality is truly commendable."
              </p>
              <div className="customer-info">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
                  alt="Ananya Reddy"
                  className="customer-avatar"
                />
                <div className="customer-details">
                  <h4>Ananya Reddy</h4>
                  <p>Coimbatore, Tamil Nadu</p>
                </div>
              </div>
            </div>
          </div>

          <div className="trust-badges">
            <div className="trust-badge">
              <div className="badge-icon">🏆</div>
              <div className="badge-text">
                <h3>200+</h3>
                <p>Happy Clients</p>
              </div>
            </div>
            <div className="trust-badge">
              <div className="badge-icon">⭐</div>
              <div className="badge-text">
                <h3>4.9/5</h3>
                <p>Average Rating</p>
              </div>
            </div>
            <div className="trust-badge">
              <div className="badge-icon">✓</div>
              <div className="badge-text">
                <h3>100%</h3>
                <p>Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="our-services-section">
        <div className="container">
          <div className="section-header">
            <div className="section-subtitle-line"></div>
            <h2>OUR SERVICES</h2>
            <p className="section-subtitle">
              Comprehensive interior design solutions for every space
            </p>
          </div>
          <div className="services-detail-grid">
            {ourServices.map((service, index) => (
              <div key={index} className="service-detail">
                <div className="service-icon" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                  {service.icon}
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="news-section">
        <div className="container">
          <div className="section-header">
            <div className="section-subtitle-line"></div>
            <h2>LATEST NEWS & INSIGHTS</h2>
            <p className="section-subtitle">
              Stay updated with the latest trends and design inspiration
            </p>
          </div>
          <div className="news-grid">
            {news.map((item, index) => (
              <div key={index} className="news-card">
                <img src={item.image} alt={item.title} className="news-card-image" />
                <div className="news-card-content">
                  <span className="news-category">{item.category}</span>
                  <h3>{item.title}</h3>
                  <div className="news-meta">
                    <span>📅 {item.date}</span>
                    <span>✍️ {item.author}</span>
                    <span>💬 {item.comments} comments</span>
                  </div>
                  <p>{item.excerpt}</p>
                  <button className="read-more-btn">
                    Read Full Article
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
