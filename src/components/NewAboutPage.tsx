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
          <h1>About Colour My Space</h1>
          <p>Creating extraordinary interiors with timeless elegance and contemporary functionality</p>
        </div>
      </AboutHero>

      {/* About Content */}
      <AboutContent>
        <div className="content-wrapper">
          <AboutIntro>
            <h2>Our Story</h2>
            <p>
              Founded by Rajnish Kumar Ranjan, Colour My Space brings over 10 years of real estate industry experience in creating
              transformative interiors that reflect our clients' unique lifestyles and aspirations. Our philosophy centers on
              the belief that exceptional interior design is the intersection of artistry, functionality, and real-world execution expertise.
            </p>
          </AboutIntro>

          {/* Founder Section */}
          <FounderSection>
            <div className="founder-content">
              <FounderImage>
                <div className="image-placeholder">Founder Image</div>
              </FounderImage>
              <FounderInfo>
                <h3>Rajnish Kumar Ranjan</h3>
                <h4>Founder & Managing Director</h4>
                <p>
                  An Engineer from NIT Hamirpur and MBA graduate from IIT Kharagpur, Rajnish brings over 10 years of
                  comprehensive real estate industry experience to Colour My Space. His unique combination of technical
                  expertise and business acumen enables him to deliver exceptional interior design solutions that balance
                  aesthetic vision with practical execution.
                </p>
                <p>
                  Rajnish's professional journey includes significant roles at eBuild (Total Environment Home Customization)
                  where he stabilized operations and created innovative Vendor Management Systems, and Jones Lang La Salle,
                  where he managed financial and legal contracts for pan-India projects. His hands-on experience spans from
                  on-site construction to international client management, bringing a holistic understanding of the entire
                  design and execution process.
                </p>
                <div className="awards">
                  <h5>Core Expertise</h5>
                  <ul>
                    <li>Design Options & Home Customization Solutions</li>
                    <li>Vendor Management Systems & Central Procurement</li>
                    <li>Import Procurement & Supply Chain Management</li>
                    <li>Project Management with National & International Clients</li>
                    <li>People & Process Management</li>
                    <li>On-site Construction & Execution Experience</li>
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