'use client';

import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import Header from './Header';
import Footer from './Footer';

// Import elegant portfolio styles
import {
  PortfolioContainer,
  PortfolioHero,
  PortfolioFilter,
  PortfolioGrid,
  ProjectCard,
  ProjectImage,
  ProjectOverlay,
  ProjectInfo,
  ProjectCategory,
  ProjectTitle,
  ProjectDescription,
  PortfolioCTA,
  LoadingSpinner,
  FilterButton
} from '../styles/NewPortfolioStyles';

const NewPortfolioPage = () => {
  const { user } = useAppContext();
  
  const [activeFilter, setActiveFilter] = useState('All');
  const [projects, setProjects] = useState<Array<{
    id: number;
    title: string;
    category: string;
    description: string;
    imageClass: string;
  }>>([]);
  const [loading, setLoading] = useState(true);

  // Sample portfolio projects data
  useEffect(() => {
    // Simulate loading projects
    const sampleProjects = [
      {
        id: 1,
        title: "Modern Minimalist Living Room",
        category: "Residential",
        description: "Clean lines and contemporary aesthetics with a focus on functionality and natural light.",
        imageClass: "modern"
      },
      {
        id: 2,
        title: "Classic Elegance Dining Space",
        category: "Residential",
        description: "Timeless designs with refined details featuring rich textures and elegant furnishings.",
        imageClass: "classic"
      },
      {
        id: 3,
        title: "Coastal Retreat Bedroom",
        category: "Residential",
        description: "Light, airy spaces with natural elements and soothing color palettes inspired by the ocean.",
        imageClass: "coastal"
      },
      {
        id: 4,
        title: "Corporate Office Design",
        category: "Commercial",
        description: "Professional workspace that balances productivity with comfort and aesthetic appeal.",
        imageClass: "office"
      },
      {
        id: 5,
        title: "Boutique Hotel Lobby",
        category: "Hospitality",
        description: "Luxurious and inviting space that creates a memorable first impression for guests.",
        imageClass: "hotel"
      },
      {
        id: 6,
        title: "Restaurant Interior",
        category: "Commercial",
        description: "Atmospheric dining environment that enhances the culinary experience.",
        imageClass: "restaurant"
      }
    ];

    setProjects(sampleProjects);
    setLoading(false);
  }, []);

  const filterButtons = ['All', 'Residential', 'Commercial', 'Hospitality'];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  if (loading) {
    return (
      <PortfolioContainer>
        <LoadingSpinner />
      </PortfolioContainer>
    );
  }

  return (
    <PortfolioContainer>
      {/* Navigation Bar */}
      <Header activePage="portfolio" />

      {/* Hero Section */}
      <PortfolioHero>
        <div className="hero-content">
          <h1>Design Portfolio</h1>
          <p>Showcasing our finest interior design projects across residential, commercial, and hospitality spaces.</p>
        </div>
      </PortfolioHero>

      {/* Portfolio Filter */}
      <PortfolioFilter>
        <div className="filter-container">
          <div className="filter-buttons">
            {filterButtons.map((filter) => (
              <FilterButton
                key={filter}
                $active={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </FilterButton>
            ))}
          </div>
        </div>
      </PortfolioFilter>

      {/* Portfolio Grid */}
      <PortfolioGrid>
        <div className="projects-container">
          {filteredProjects.length > 0 ? (
            <div className="projects-grid">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id}>
                  <ProjectImage imageClass={project.imageClass as any} />
                  <ProjectOverlay>
                    <ProjectInfo>
                      <ProjectCategory>{project.category}</ProjectCategory>
                      <ProjectTitle>{project.title}</ProjectTitle>
                      <ProjectDescription>{project.description}</ProjectDescription>
                    </ProjectInfo>
                  </ProjectOverlay>
                </ProjectCard>
              ))}
            </div>
          ) : (
            <div className="no-projects">
              <h3>No projects found for this category</h3>
            </div>
          )}
        </div>
      </PortfolioGrid>

      {/* CTA Section */}
      <PortfolioCTA>
        <div className="cta-content">
          <h2>Ready to Transform Your Space?</h2>
          <p>Let our expert designers create a space that reflects your unique style and meets your needs.</p>
          <button className="cta-button" onClick={() => window.location.href = '/booking'}>Schedule a Consultation</button>
        </div>
      </PortfolioCTA>

      <Footer />
    </PortfolioContainer>
  );
};

export default NewPortfolioPage;