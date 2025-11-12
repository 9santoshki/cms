'use client';

import React from 'react';
import Header from './Header';
import Footer from './Footer';

// Styled components for the elegant about page
import {
  AboutContainer,
  AboutHero,
  AboutContent,
  AboutIntro,
  FounderSection,
  FounderImage,
  FounderInfo,
  PhilosophySection,
  PhilosophyGrid,
  PhilosophyCard,
  TeamSection,
  TeamGrid,
  TeamMember,
  ValuesSection,
  ValuesList,
  ValueItem
} from '../styles/NewAboutStyles';

const NewAboutPage = () => {
  

  return (
    <AboutContainer>
      {/* Navigation Bar */}
      <Header activePage="about" />

      {/* About Hero Section */}
      <AboutHero>
        <div className="hero-content">
          <h1>About Elegant Spaces</h1>
          <p>Creating extraordinary interiors with timeless elegance and contemporary functionality</p>
        </div>
      </AboutHero>

      {/* About Content */}
      <AboutContent>
        <div className="content-wrapper">
          <AboutIntro>
            <h2>Our Story</h2>
            <p>
              Founded by award-winning designer Sarah Johnson, Elegant Spaces brings over 15 years of experience in creating 
              transformative interiors that reflect our clients' unique lifestyles and aspirations. Our philosophy centers on 
              the belief that exceptional interior design is the intersection of artistry and functionality.
            </p>
          </AboutIntro>

          {/* Founder Section */}
          <FounderSection>
            <div className="founder-content">
              <FounderImage>
                <div className="image-placeholder">Founder Image</div>
              </FounderImage>
              <FounderInfo>
                <h3>Sarah Johnson</h3>
                <h4>Founder & Principal Designer</h4>
                <p>
                  With a Master's degree in Interior Architecture from Pratt Institute and over two decades of industry experience, 
                  Sarah has established herself as a visionary in contemporary residential and commercial design. Her work has been 
                  featured in Architectural Digest, Elle Decor, and House Beautiful.
                </p>
                <p>
                  Sarah's design approach combines careful listening with innovative thinking to create spaces that are not only 
                  beautiful but also deeply personal and functional. She believes that great design tells a story and enhances 
                  the lives of those who inhabit the space.
                </p>
                <div className="awards">
                  <h5>Recognitions</h5>
                  <ul>
                    <li>Interior Design Excellence Award - 2022</li>
                    <li>Architectural Digest 50 Top Designers - 2021</li>
                    <li>House Beautiful Designer of the Year - 2020</li>
                    <li>Elle Decor Rising Star Award - 2019</li>
                  </ul>
                </div>
              </FounderInfo>
            </div>
          </FounderSection>

          {/* Philosophy Section */}
          <PhilosophySection>
            <h2>Our Philosophy</h2>
            <PhilosophyGrid>
              <PhilosophyCard>
                <div className="philosophy-icon">
                  <i className="fas fa-heart"></i>
                </div>
                <h3>Client-Centered Design</h3>
                <p>We begin every project by truly understanding our clients' needs, preferences, and lifestyle to create spaces that reflect their personality.</p>
              </PhilosophyCard>
              
              <PhilosophyCard>
                <div className="philosophy-icon">
                  <i className="fas fa-recycle"></i>
                </div>
                <h3>Sustainable Practices</h3>
                <p>Commitment to environmentally responsible design through sustainable materials and practices that minimize environmental impact.</p>
              </PhilosophyCard>
              
              <PhilosophyCard>
                <div className="philosophy-icon">
                  <i className="fas fa-star"></i>
                </div>
                <h3>Attention to Detail</h3>
                <p>Meticulous attention to every element ensures cohesive design that exceeds expectations and stands the test of time.</p>
              </PhilosophyCard>
              
              <PhilosophyCard>
                <div className="philosophy-icon">
                  <i className="fas fa-lightbulb"></i>
                </div>
                <h3>Innovative Solutions</h3>
                <p>Creative problem-solving to overcome spatial challenges and achieve functional beauty in every corner of your space.</p>
              </PhilosophyCard>
            </PhilosophyGrid>
          </PhilosophySection>

          {/* Team Section */}
          <TeamSection>
            <h2>Our Team</h2>
            <TeamGrid>
              <TeamMember>
                <div className="member-image">
                  <div className="image-placeholder">Team Member</div>
                </div>
                <h3>Michael Chen</h3>
                <h4>Senior Designer</h4>
                <p>Specializing in commercial design with expertise in creating inspiring workplace environments.</p>
              </TeamMember>
              
              <TeamMember>
                <div className="member-image">
                  <div className="image-placeholder">Team Member</div>
                </div>
                <h3>Jennifer Roberts</h3>
                <h4>Lead Designer</h4>
                <p>Focused on residential projects with a passion for blending classic elegance with modern functionality.</p>
              </TeamMember>
              
              <TeamMember>
                <div className="member-image">
                  <div className="image-placeholder">Team Member</div>
                </div>
                <h3>David Park</h3>
                <h4>Project Manager</h4>
                <p>Ensuring seamless execution of every project with meticulous attention to timeline and quality control.</p>
              </TeamMember>
            </TeamGrid>
          </TeamSection>

          {/* Values Section */}
          <ValuesSection>
            <h2>Our Core Values</h2>
            <ValuesList>
              <ValueItem>
                <h3>Integrity</h3>
                <p>Honest communication and transparent partnerships with every client throughout the design journey.</p>
              </ValueItem>
              
              <ValueItem>
                <h3>Excellence</h3>
                <p>Commitment to the highest standards of design, craftsmanship, and service in every project we undertake.</p>
              </ValueItem>
              
              <ValueItem>
                <h3>Innovation</h3>
                <p>Constant exploration of new ideas, materials, and techniques to push the boundaries of interior design.</p>
              </ValueItem>
              
              <ValueItem>
                <h3>Sustainability</h3>
                <p>Dedication to environmentally conscious practices that protect our planet for future generations.</p>
              </ValueItem>
            </ValuesList>
          </ValuesSection>
        </div>
      </AboutContent>

      <Footer />
    </AboutContainer>
  );
};

export default NewAboutPage;