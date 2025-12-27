import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarAlt, FaRulerCombined, FaArrowRight, FaLongArrowAltRight } from 'react-icons/fa';
import './Projects.css';

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleProjects, setVisibleProjects] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'residential', label: 'Residential' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'art-craft', label: 'Art & Craft' },
  ];

  const allProjects = [
    {
      id: 1,
      name: 'Luxury Villa Interiors',
      category: 'residential',
      location: 'Coimbatore',
      year: '2024',
      area: '3,500 sq.ft',
      image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1974&auto=format&fit=crop',
      description: 'A modern luxury villa designed with warmth and elegance.',
    },
    {
      id: 2,
      name: 'Modern Tech Office',
      category: 'commercial',
      location: 'Bangalore',
      year: '2023',
      area: '12,000 sq.ft',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
      description: 'Open-plan office space fostering collaboration and innovation.',
    },
    {
      id: 3,
      name: 'Handcrafted Wall Art',
      category: 'art-craft',
      location: 'Erode',
      year: '2024',
      area: 'N/A',
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2070&auto=format&fit=crop',
      description: 'Bespoke wall art pieces for a contemporary living room.',
    },
    {
      id: 4,
      name: 'Contemporary Kitchen',
      category: 'residential',
      location: 'Chennai',
      year: '2023',
      area: '450 sq.ft',
      image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=2068&auto=format&fit=crop',
      description: 'Modular kitchen with premium finish and smart storage.',
    },
    {
      id: 5,
      name: 'Boutique Showroom',
      category: 'commercial',
      location: 'Salem',
      year: '2024',
      area: '1,800 sq.ft',
      image: 'https://images.unsplash.com/photo-1541575765-8857d47453f2?q=80&w=2000&auto=format&fit=crop',
      description: 'Elegant retail space designed to highlight premium products.',
    },
    {
      id: 6,
      name: 'Master Bedroom Suite',
      category: 'residential',
      location: 'Erode',
      year: '2023',
      area: '600 sq.ft',
      image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=2070&auto=format&fit=crop',
      description: 'Serene master bedroom with custom wardrobe and lighting.',
    },
    {
      id: 7,
      name: 'Minimalist Living',
      category: 'residential',
      location: 'Trichy',
      year: '2024',
      area: '2,200 sq.ft',
      image: 'https://images.unsplash.com/photo-1628151016027-e81882d27771?q=80&w=2000&auto=format&fit=crop',
      description: 'Clean lines and neutral tones for a clutter-free home.',
    },
    {
      id: 8,
      name: 'Executive Cabin',
      category: 'commercial',
      location: 'Coimbatore',
      year: '2023',
      area: '300 sq.ft',
      image: 'https://images.unsplash.com/photo-1504384308090-c54be3855091?q=80&w=2000&auto=format&fit=crop',
      description: 'Premium executive workspace with soundproofing and luxury finish.',
    },
  ];

  useEffect(() => {
    setIsAnimating(true);
    const filtered = activeCategory === 'all'
      ? allProjects
      : allProjects.filter(p => p.category === activeCategory);

    // Small delay for animation effect
    const timer = setTimeout(() => {
      setVisibleProjects(filtered);
      setIsAnimating(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [activeCategory]);

  return (
    <div className="projects-page">
      {/* Hero Section */}
      <section className="projects-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Our Projects</h1>
          <p className="hero-subtitle">Crafted spaces that define excellence &amp; luxury</p>
          <div className="breadcrumbs">
            <Link to="/">Home</Link>
            <span className="separator">/</span>
            <span className="current">Projects</span>
          </div>
        </div>
      </section>

      {/* Projects Content */}
      <section className="projects-content">
        <div className="container">

          {/* Category Filter */}
          <div className="filter-container">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className={`projects-grid ${isAnimating ? 'fade-out' : 'fade-in'}`}>
            {visibleProjects.map((project) => (
              <div key={project.id} className="project-card-premium">
                <div className="project-image-wrapper">
                  <img src={project.image} alt={project.name} />
                  <div className="project-overlay">
                    <div className="overlay-content">
                      <span className="project-badge">{project.category}</span>
                      <h3>{project.name}</h3>
                      <p className="project-app-desc">{project.description}</p>
                      <button className="view-project-btn">
                        View Project <FaLongArrowAltRight />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="project-meta-bar">
                  <div className="meta-item">
                    <FaMapMarkerAlt /> {project.location}
                  </div>
                  <div className="meta-item">
                    <FaCalendarAlt /> {project.year}
                  </div>
                  <div className="meta-item">
                    <FaRulerCombined /> {project.area}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {visibleProjects.length === 0 && !isAnimating && (
            <div className="empty-projects">
              <p>No projects found in this category coming soon.</p>
            </div>
          )}

        </div>
      </section>

      {/* CTA Section */}
      <section className="projects-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Have a project in mind?</h2>
            <p>Let's collaborate to create something extraordinary for your space.</p>
            <button className="btn-cta-gold">Get Free Consultation</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
