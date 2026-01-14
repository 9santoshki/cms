-- Migration: Add CMS Content Tables
-- Created: 2024-01-11
-- Description: Tables for managing portfolio, testimonials, about page, and contact info

-- Portfolio projects
CREATE TABLE IF NOT EXISTS portfolio_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    image_url TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_name VARCHAR(255) NOT NULL,
    author_title VARCHAR(255),
    author_image_url TEXT,
    text TEXT NOT NULL,
    rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Site content (for About page and other simple content blocks)
CREATE TABLE IF NOT EXISTS site_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_key VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(255),
    content TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact info
CREATE TABLE IF NOT EXISTS contact_info (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    address_line1 VARCHAR(255),
    address_line2 VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100),
    phone VARCHAR(50),
    email VARCHAR(255),
    business_hours TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_active ON portfolio_projects(is_active);
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_category ON portfolio_projects(category);
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_order ON portfolio_projects(display_order);
CREATE INDEX IF NOT EXISTS idx_testimonials_active ON testimonials(is_active);
CREATE INDEX IF NOT EXISTS idx_testimonials_order ON testimonials(display_order);
CREATE INDEX IF NOT EXISTS idx_site_content_key ON site_content(page_key);

-- Insert default portfolio projects
INSERT INTO portfolio_projects (title, category, description, image_url, display_order, is_active) VALUES
('Modern Minimalist Living Room', 'Residential', 'Clean lines and contemporary aesthetics with a focus on functionality and natural light.', 'https://pub-f991142b10cf4e8098836944eaf05d12.r2.dev/product_images/1767927656951-4l8ihxmzbpv-portfolio-modern.jpg', 1, true),
('Classic Elegance Dining Space', 'Residential', 'Timeless designs with refined details featuring rich textures and elegant furnishings.', 'https://pub-f991142b10cf4e8098836944eaf05d12.r2.dev/product_images/1767927752411-djoibj8v0mv-portfolio-classic.jpg', 2, true),
('Coastal Retreat Bedroom', 'Residential', 'Light, airy spaces with natural elements and soothing color palettes inspired by the ocean.', 'https://pub-f991142b10cf4e8098836944eaf05d12.r2.dev/product_images/1767927657557-5gupsrfjnxk-portfolio-coastal.jpg', 3, true),
('Corporate Office Design', 'Commercial', 'Professional workspace that balances productivity with comfort and aesthetic appeal.', 'https://pub-f991142b10cf4e8098836944eaf05d12.r2.dev/product_images/1767927752946-qy6cbzlqq8-portfolio-office.jpg', 4, true),
('Boutique Hotel Lobby', 'Hospitality', 'Luxurious and inviting space that creates a memorable first impression for guests.', 'https://pub-f991142b10cf4e8098836944eaf05d12.r2.dev/product_images/1767927658162-r7b41efd26-portfolio-hotel.jpg', 5, true),
('Restaurant Interior', 'Commercial', 'Atmospheric dining environment that enhances the culinary experience.', 'https://pub-f991142b10cf4e8098836944eaf05d12.r2.dev/product_images/1767927658512-sle3q538dgl-portfolio-restaurant.jpg', 6, true)
ON CONFLICT DO NOTHING;

-- Insert default testimonials
INSERT INTO testimonials (author_name, author_title, text, rating, display_order, is_active) VALUES
('Michael & Jennifer Roberts', 'Homeowners', 'Sarah transformed our outdated home into a modern masterpiece. Her attention to detail and creative vision exceeded all our expectations. The process was seamless from start to finish!', 5, 1, true),
('David Chen', 'Bistro 45 Owner', 'Working with Colour My Space was a game-changer for our restaurant. The design elevated our brand and created an atmosphere that our customers love. Revenue has increased by 30% since the redesign!', 5, 2, true),
('Priya Sharma', 'Architect', 'The team at Colour My Space understood our vision perfectly. They created a home office that inspires productivity while maintaining the warmth of our family space. Truly exceptional work!', 5, 3, true)
ON CONFLICT DO NOTHING;

-- Insert default about page content
INSERT INTO site_content (page_key, title, content) VALUES
('about', 'About Colour My Space', 'At Colour My Space, we believe that exceptional interior design has the power to transform not just spaces, but lives. Founded with a passion for creating extraordinary environments, our studio brings together creativity, functionality, and timeless elegance in every project we undertake.

Our journey began with a simple belief: that everyone deserves to live and work in spaces that inspire them. Today, we continue to uphold this vision, working closely with our clients to understand their unique needs, preferences, and aspirations.

What sets us apart is our commitment to personalized service and attention to detail. We don''t just design spaces; we craft experiences. From initial consultation to final reveal, we guide our clients through every step of the design process, ensuring that the end result exceeds their expectations.

Our team of talented designers brings diverse perspectives and expertise to each project, whether it''s a cozy residential renovation, a sophisticated commercial space, or an inviting hospitality venue. We stay at the forefront of design trends while honoring timeless principles that ensure lasting beauty and functionality.')
ON CONFLICT (page_key) DO NOTHING;

-- Insert default contact info
INSERT INTO contact_info (address_line1, address_line2, city, state, postal_code, country, phone, email, business_hours) VALUES
('123 Design Avenue', 'Creative District', 'Mumbai', 'Maharashtra', '400001', 'India', '+91 (555) 123-4567', 'hello@colourmyspace.com', 'Monday - Friday: 9:00 AM - 6:00 PM
Saturday: 10:00 AM - 4:00 PM
Sunday: Closed')
ON CONFLICT DO NOTHING;
