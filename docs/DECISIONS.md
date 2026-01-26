# Key Technical Decisions

## Authentication System
• Chose Google OAuth 2.0 with JWT + database sessions
  - Reason: Secure, trusted provider with persistent login capability
  - Tradeoff: Relies on third-party service availability
• Database-backed sessions ensure role changes take effect immediately

## Database Schema Design
• Selected INTEGER primary keys (not UUID) for simplicity
  - Reason: Native PostgreSQL auto-increment, simpler debugging
  - Tradeoff: Less distributed-friendly than UUIDs
• Foreign key constraints ensure referential integrity

## Image Storage Architecture
• Implemented Cloudflare R2 with private bucket + API proxy
  - Reason: Secure image access without exposing raw URLs
  - Tradeoff: Additional API call for image retrieval
• Proxy endpoint (/api/images/[key]) handles authentication

## State Management Strategy
• Zustand for cart persistence, React Context for global state
  - Reason: Lightweight solution fitting Next.js architecture
  - Tradeoff: Multiple state solutions may complicate debugging
• Server-synced cart ensures consistency across devices

## Payment Processing Integration
• Selected Razorpay for payment gateway
  - Reason: Popular in Indian market with good developer experience
  - Tradeoff: Limited to regional payment methods

## Rejected Options
• Firebase Authentication - Preferred more control with OAuth + JWT
• MongoDB - Chose PostgreSQL for ACID compliance needs
• AWS S3 - Selected Cloudflare R2 for better performance
• Redux Toolkit - Overkill for application complexity
• Custom authentication - OAuth provides better security