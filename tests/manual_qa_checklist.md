# Manual QA Checklist

This checklist provides step-by-step verification procedures for the application's user-facing features.

## Onboarding Flow

### Google OAuth Registration/Login
- [ ] Navigate to `/auth`
- [ ] Click "Sign in with Google"
- [ ] Complete Google OAuth flow
- [ ] Verify successful redirect back to home page
- [ ] Verify user profile is created in the database with role "customer"
- [ ] Check that user name/email appear in header
- [ ] Test with a new Google account to ensure new user registration works
- [ ] Test with an existing Google account to ensure login works

### Profile Creation
- [ ] After Google login, verify a profile is created in the `profiles` table
- [ ] Confirm the profile has the correct user ID linking to auth
- [ ] Check that default role is set to "customer"

## Role-Based Access

### Admin User Access
- [ ] Log in as an admin user (manually set role to 'admin' in database)
- [ ] Navigate to `/dashboard`
- [ ] Verify access to all dashboard sections (Products, Orders, Users, etc.)
- [ ] Check that admin can access all functionality
- [ ] Verify admin can update user roles

### Moderator User Access
- [ ] Log in as a moderator user (manually set role to 'moderator' in database)
- [ ] Navigate to `/dashboard`
- [ ] Verify access to Orders and Appointments sections
- [ ] Confirm restricted access to other sections (Products, Users)
- [ ] Check that moderator sees appropriate UI elements

### Customer User Access
- [ ] Log in as a customer user
- [ ] Navigate to `/dashboard`
- [ ] Verify limited dashboard access (only personal orders/appointments if applicable)
- [ ] Confirm no access to admin/moderator features

## E-commerce Flow

### Product Discovery
- [ ] Visit product listing page `/products`
- [ ] Verify products display in responsive grid
- [ ] Test sorting options (Low to High, Newest Arrivals)
- [ ] Test filtering by category
- [ ] Use search bar to find products
- [ ] Click on product to go to detail page

### Product Details Page
- [ ] On product page, verify all information displays (name, description, price, images)
- [ ] Test image gallery navigation
- [ ] Check that "Add to Cart" button works
- [ ] Verify quantity selector functionality

### Shopping Cart
- [ ] Add product to cart from PDP
- [ ] Navigate to `/cart`
- [ ] Verify item appears in cart
- [ ] Update quantity using +/- buttons
- [ ] Remove item from cart
- [ ] Verify cart persists across page refreshes
- [ ] Test "Continue Shopping" and "Proceed to Checkout" buttons

### Checkout Process
- [ ] Navigate to `/checkout` from cart
- [ ] Fill in shipping information
- [ ] Verify cart items display in order summary
- [ ] Initiate Razorpay checkout
- [ ] Complete test payment using Razorpay's test credentials
- [ ] Verify successful redirect to confirmation page
- [ ] Confirm order is recorded in database
- [ ] Verify cart is cleared after successful payment

## Lead Capture (Consultation Requests)

### Consultation Request Form
- [ ] Navigate to `/request-consultation`
- [ ] Verify form fields (Name, Email, Phone, Project Scope)
- [ ] If logged in, verify Name and Email are pre-filled
- [ ] Submit form with valid information
- [ ] Verify success message appears
- [ ] Check that consultation request is recorded in database
- [ ] Verify notification is sent (or queued)

## Dashboard Functionality

### Order Management (for Admin/Moderator)
- [ ] Navigate to `/dashboard/orders`
- [ ] Verify list of orders displays
- [ ] Test filtering and sorting capabilities
- [ ] Update order status
- [ ] Verify changes are persisted in database

### Product Management (for Admin)
- [ ] Navigate to `/dashboard/products`
- [ ] Add a new product with all required fields
- [ ] Verify product appears in listings
- [ ] Edit existing product
- [ ] Delete a product (confirm deletion)
- [ ] Verify all changes are reflected in the database

## Performance & Usability

### Responsiveness
- [ ] Open site on mobile device
- [ ] Verify mobile menu works
- [ ] Check that all forms are usable on mobile
- [ ] Verify product images scale appropriately

### Performance
- [ ] Time page load for main sections
- [ ] Verify no slow-loading components
- [ ] Check for any console errors
- [ ] Verify all API calls complete within reasonable time

## Error Handling

### Invalid Inputs
- [ ] Attempt to submit forms without required fields
- [ ] Enter invalid data in forms
- [ ] Verify appropriate error messages appear

### Authentication Errors
- [ ] Try to access protected routes while logged out
- [ ] Verify redirects to login page
- [ ] Try to access protected routes with insufficient permissions
- [ ] Verify appropriate access denials

## Browser Compatibility

### Cross-Browser Testing
- [ ] Test all major functionality in Chrome
- [ ] Test all major functionality in Firefox
- [ ] Test all major functionality in Safari
- [ ] Verify consistent experience across browsers

## Accessibility

### Keyboard Navigation
- [ ] Navigate site using only keyboard
- [ ] Verify all interactive elements are accessible
- [ ] Check that tab navigation is logical

### Screen Reader Compatibility
- [ ] Verify key elements have appropriate labels
- [ ] Check that screen reader announcements are meaningful