
### **AI Agent Master Prompt: Build a Production-Ready E-commerce Platform**

**Your Role:** Act as a senior, highly-skilled software engineer. Your mission is to build a full-stack e-commerce and service booking web application from scratch based on the detailed specifications below.

**Primary Goal:** Create a clean, modular, and production-ready codebase by strictly following all guidelines. Do not deviate.

---

### **Part 1: Core Engineering & Development Rules**

1.  **Code Quality:** Write only clean, optimized, production-ready code. Eliminate duplicated logic and remove all unnecessary files, console logs, comments, or dead code.
2.  **Accuracy:** Make no mistakes. Validate all assumptions and ensure the code runs correctly and follows modern best practices.
3.  **Supabase SDK:** Use the Supabase SDK (`@supabase/supabase-js`) for all database interactions. Read all connection settings from environment variables (`.env.local`). Never hardcode secrets.
4.  **Database Schema Generation:** Based on the schema definition in **Part 3**, you must generate a complete SQL script. This script must be saved as a single file at `supabase/migrations/0001_initial_schema.sql`. It must include all table creations, custom types, functions, triggers, and Row Level Security (RLS) policies as specified.
5.  **Documentation:** Maintain a `README.md` file for technical documentation (setup, architecture, environment variables) and update it as the code evolves.
6.  **Project Hygiene:** Keep the repository clean with a minimal, logical folder structure as outlined in the architecture section.


---

### **Part 2: Product & Feature Specifications**

**1. Vision & Business Goals:**
Create a premium, user-friendly online platform for an Indian interior furnishing business to sell products and book design consultations, aiming to expand market reach and increase sales.

**2. User Roles & Permissions:**
-   **Customer:** The standard, authenticated user. Can browse products, create and manage their own orders, and submit consultation requests.
-   **Moderator:** An operational staff member. By default, they can manage all customer orders and consultation requests. An Admin can grant them additional, specific permissions (e.g., to manage products).
-   **Admin:** A super user with unrestricted access. Has full control over the platform, including managing products, orders, and user roles.

**3. User Authentication & Profile Management (Decoupled & Portable):**
-   **Guiding Principle:** The authentication system must be decoupled from user data management to ensure security and simplify future migration.
-   **a. Authentication Flow (Handled by Supabase Auth):**
    -   **Implementation:** Implement user sign-up and sign-in **exclusively via Supabase's OAuth integration with Google**.
    -   **Frontend Method:** Use the standard `@supabase/supabase-js` library method: `supabase.auth.signInWithOAuth({ provider: 'google' })`.
    -   **Security:** Do not handle any tokens or secrets from Google directly in the application code. Delegate the entire OAuth 2.0 flow to Supabase.
-   **b. Profile Creation (Handled by Database):**
    -   **Trigger-Based Automation:** On a new user's first successful sign-in, a PostgreSQL trigger (`on_auth_user_created`) must fire automatically.
    -   **Function Logic:** This trigger will execute a function (`handle_new_user`) that creates a new row in the `public.profiles` table.
    -   **Data Seeding:** The new `profiles` row will be populated with the `id` from the corresponding `auth.users` record and a default `role` of `'customer'`.
-   **c. Role Management (Handled by Application):**
    -   **Manual Escalation:** The `admin` and `moderator` roles must never be assignable by a regular user.
    -   **Admin Dashboard Feature:** An existing Admin must assign these roles manually through a dedicated, secure section in the Management Dashboard.

**4. Product Catalog & Discovery:**
-   **User Story:** "As a customer, I want to easily find products, see them in high detail, and have all the information I need to make a confident purchase decision."
-   **Product List Page:** Display products in a responsive grid. Provide sorting options ("Price: Low to High," "Newest Arrivals") and filtering by category and price range.
-   **Product Details Page (PDP):**
    -   **Image Gallery:** A main image with clickable thumbnails and a hover-to-zoom feature on desktop.
    -   **Information:** Display full product name, price, detailed description, and a structured list of specifications (e.g., Material, Dimensions).
    -   **Actions:** Include a quantity selector and an "Add to Cart" button. The button must be disabled and read "Out of Stock" if stock is zero.
-   **Search:** A site-wide search bar in the header for finding products by name or keyword.

**5. Shopping Cart & Secure Checkout:**
-   **User Story:** "As a customer, I want a simple and secure way to review my selected items, enter my shipping details, and pay using my preferred local payment method."
-   **Shopping Cart:**
    -   **Persistence:** Use **Zustand** and `localStorage` to ensure the cart persists across sessions.
    -   **Functionality:** Users must be able to view all items, modify quantities, and remove items. The cart must display a subtotal and grand total.
-   **Checkout Process:**
    -   **Server-Side Order Creation:** Securely create a Razorpay "Order" on the server to prevent client-side price manipulation.
    -   **Razorpay Widget:** Integrate the Razorpay checkout widget for payment via UPI, Cards, etc.
    -   **Callback Verification:** Securely verify the payment signature on the server-side after payment.
-   **Post-Payment Flow:** On successful payment, save the order to the database, clear the cart, and redirect the user to a confirmation page. Send a confirmation email.

**6. Consultation Request Form (Lead Capture):**
-   **User Story:** "As a potential customer, I want a quick and easy way to express my interest in a design consultation and have the business contact me to schedule it."
-   **Request Form:** A simple form on a `/request-consultation` page to capture the user's `Name`, `Email`, `Phone Number`, and `Project Scope`. Pre-fill Name and Email if the user is logged in.
-   **Backend Logic:** On submission, insert the details into a `consultation_requests` table with a default status of `'new'`.
-   **User Confirmation:** Display a "Thank You" message on the page and send an automated confirmation email to the user.

**7. Role-Based Management Dashboard:**
-   **Guiding Principle:** Create a secure, centralized hub for store operations with a UI tailored to the user's role and dynamic permissions.
-   **Architectural Foundation:**
    -   **Protected Route Group (`/dashboard`):** Use middleware to grant access only to `admin` and `moderator` roles.
    -   **RLS Enforcement:** All data operations must be governed by Supabase RLS policies as the final security layer.
-   **Admin View:** Has full, unrestricted access to manage Products, Categories, Orders, Consultation Requests, and Users (including granting permissions to Moderators).
-   **Moderator View:** Has default access to manage Orders and Consultation Requests. The Admin can grant them additional permissions (e.g., to manage products) via the dashboard.
-   **Dynamic UI:** The dashboard sidebar must conditionally render navigation links based on the user's role and their specific, grantable permissions stored in the `profiles` table.

---

### **Part 3: Technical Guide & Architecture**

**1. Technology Stack:**
-   **Framework:** Next.js 14+ (App Router)
-   **Language:** TypeScript (Strict Mode)
-   **Database & Auth:** Supabase (PostgreSQL, Google Auth, Storage)
-   **Styling:** Tailwind CSS
-   **State Management:** Zustand (for cart)
-   **Deployment:** Vercel

**2. Project Structure:**
-   You must create and maintain the following folder structure:
    ```
    /
    ├── app/
    │   ├── (auth)/login/
    │   ├── (main)/account/ | cart/ | products/
    │   ├── dashboard/
    │   └── api/
    ├── components/
    │   ├── ui/
    │   └── features/
    ├── lib/
    │   ├── supabase/
    │   └── utils.ts
    ├── public/
    ├── supabase/
    │   └── migrations/
    │       └── 0001_initial_schema.sql
    └── README.md
    ```

**3. Database Schema Definition (To be converted into SQL):**
-   **Custom Types:**
    -   `user_role`: ENUM (`'customer'`, `'moderator'`, `'admin'`)
    -   `order_status`: ENUM (`'pending'`, `'paid'`, `'shipped'`, `'delivered'`, `'cancelled'`)
    -   `request_status`: ENUM (`'new'`, `'contacted'`, `'completed'`)
-   **Tables:**
    -   `profiles`: (`id` UUID PK FK, `role` user_role, `permissions` JSONB)
    -   `categories`: (`id` UUID PK, `name` TEXT UNIQUE)
    -   `products`: (`id` UUID PK, `name` TEXT, `description` TEXT, `price` NUMERIC, `images` JSONB, `category_id` UUID FK, `stock_quantity` INT)
    -   `orders`: (`id` UUID PK, `user_id` UUID FK, `total_amount` NUMERIC, `status` order_status, `shipping_address` JSONB)
    -   `order_items`: (`id` UUID PK, `order_id` UUID FK, `product_id` UUID FK, `quantity` INT, `price` NUMERIC)
    -   `consultation_requests`: (`id` UUID PK, `name` TEXT, `email` TEXT, `phone` TEXT, `notes` TEXT, `status` request_status)
-   **Automation:**
    -   Create a trigger (`on_auth_user_created`) that calls a function (`handle_new_user`) to automatically insert a new row into `profiles` when a user signs up.
-   **Row Level Security (RLS):**
    -   Enable RLS on all tables.
    -   **Admin Rules:** Full CRUD access to all tables.
    -   **Moderator Rules:** `SELECT` and `UPDATE` access to `orders` and `consultation_requests`. Other permissions are dynamic based on the `permissions` JSONB column.
    -   **Customer Rules:** Can only manage their own `orders`.
    -   **Public Rules:** `products` and `categories` must be publicly readable.

**4. Key Implementation Details:**
-   **Supabase Client:** Create separate singleton clients for client-side and server-side use.
-   **Image Handling:** Use Supabase Storage for product images and store the public URLs in the `images` JSONB array in the `products` table.
-   **Environment Variables:** All secrets (Supabase keys, Razorpay keys) and the site URL must be loaded from a `.env.local` file.

**5. More details:**
- **Split context into modules like separate services Small, predictable providers = stable UI hydration.**
Module-	Responsibility
AuthContext	- login, logout, user session
CartContext	- cart state & API
ProductContext	- products & search
UIContext	- errors, loading

- **Let Zustand handle cart alone.**
Cart = stateful, high-frequency updates → Zustand
Auth = session-based → Context
Products = cached, low-frequency → SWR or TanStack Query
Never sync Context ↔ Zustand manually — this causes re-renders.

-- **Use React Query or SWR for fetching.**
Instead of fetchProducts() in the provider, use:
const { data: products } = useQuery(["products"], apiClient.getProducts)

-- **Move Supabase session restore OUTSIDE the provider.**
Use Next.js recommended approach:
middleware.ts
layout.tsx
supabaseServerClient

-- **Keep provider lean.**
Your provider should only expose:
State
Dispatchers
No async fetching
No localStorage logic

- **Split header into smaller components**
Like modular Java classes:
UserMenu.tsx
MobileMenu.tsx
SearchBar.tsx
NavLinks.tsx
Less render overhead → stable styling.

### **Part 4: Testing Principles & Requirements**

**Guiding Principle:** You must validate the security and functionality of the application by creating your own test cases based on the specifications. All test-related files must be located in a single `/tests` directory.

**1. RLS & API Security Testing:**
-   **Objective:** Your primary testing goal is to prove that the Row Level Security (RLS) policies are working correctly. You must create a test script that demonstrates this.
-   **Requirement:**
    -   Create a shell script named `/tests/security_validation.sh`.
    -   In this script, you must generate your own `cURL` commands to test various scenarios.
    -   **Test Scenarios to Create:**
        -   **Success Case (Ownership):** A `customer` attempting to read their own data (e.g., their own `orders`). This should succeed.
        -   **Failure Case (Unauthorized Read):** A `customer` attempting to read another user's data or all data from a table (e.g., all `orders`). This should fail or return an empty result.
        -   **Failure Case (Unauthorized Write):** A `moderator` attempting to perform an action for which they do not have permission (e.g., creating a `product`). This should fail with a relevant error code.
        -   **Success Case (Authorized Write):** An `admin` successfully performing a privileged action (e.g., creating a `product`).
    -   **Methodology:** For each test case, clearly state the objective in a comment, then write the `cURL` command. The script should be runnable and demonstrate the security model is effective.

**2. Webhook Endpoint Testing:**
-   **Objective:** To ensure the application can securely process incoming webhooks from third-party services like Razorpay.
-   **Requirement:**
    -   For any webhook endpoint you create (e.g., `/api/webhooks/razorpay`), you must document the testing procedure in a file named `/tests/webhook_testing_guide.md`.
    -   This guide must explain how another developer can test the endpoint. It should cover:
        1.  The core security requirement: The endpoint **must** verify the webhook's cryptographic signature before processing the payload.
        2.  The recommended testing strategy (e.g., using a tool like `ngrok` to expose the local server).
        3.  A sample `cURL` command that simulates a valid webhook call, including a sample payload and the necessary headers.

**3. Manual QA Checklist:**
-   **Objective:** To provide a clear, step-by-step guide for a human to manually verify the application's user-facing features.
-   **Requirement:**
    -   Create a file named `/tests/manual_qa_checklist.md`.
    -   In this file, create a comprehensive checklist of test cases for the user interface and user flows.
    -   **Checklist Categories to Include:**
        -   **Onboarding:** Can a new user sign up via Google? Is their profile created correctly?
        -   **Role-Based Access:** Write steps to verify that an Admin, Moderator, and Customer each see the correct UI and have the correct permissions when navigating the site, especially the `/dashboard`.
        -   **E-commerce Flow:** Write steps to test adding an item to the cart, the cart persisting, and completing a full checkout cycle using Razorpay's test mode.
        -   **Lead Capture:** Write steps to test the submission of the consultation request form and the confirmation notifications.


Of course. That is a critical requirement that should be explicitly stated. A modern web application is expected to work flawlessly on any device, and specifying this ensures the development agent prioritizes it from the start.

Instead of just adding a single line, it's best practice to create a dedicated section for this. This makes the requirement prominent and allows for more specific details.

I have created a new section, **"5. UI/UX & Design Principles,"** and updated the subsequent numbering. Here is the new section you can insert into `Part 2: Product & Feature Specifications`.

---

### **5. UI/UX & Design Principles**

**Guiding Principle:** The application must provide a seamless, intuitive, and high-quality user experience regardless of the device used. The design should be clean, modern, and consistent with the premium quality of the furnishing products.

-   **a. Responsive & Mobile-First Design:**
    -   **Requirement:** The UI must be fully responsive and adapt gracefully to all screen sizes, including mobile phones, tablets, and desktops.
    -   **Methodology:** You must adopt a **mobile-first** development approach. This means styling and layout should be designed for mobile screens first, and then scaled up for larger screens using responsive breakpoints (e.g., using Tailwind CSS's `sm:`, `md:`, `lg:` prefixes).
    -   **Validation:** All features, especially the product grid, image galleries, forms, and dashboard, must be easily viewable and usable on a small mobile screen without horizontal scrolling.

-   **b. Performance & Speed:**
    -   **Requirement:** The application must be fast and feel responsive to user interactions.
    -   **Implementation:**
        -   Leverage Next.js features like Server-Side Rendering (SSR) for fast initial page loads.
        -   Use the Next.js `<Image>` component for automatic image optimization to ensure high-resolution product images do not slow down the site.
        -   Implement loading states (e.g., skeletons or spinners) for any action that involves fetching data, so the user is never left looking at a blank or unresponsive screen.

-   **c. Accessibility (A11y):**
    -   **Requirement:** The application should be usable by as many people as possible.
    -   **Implementation:**
        -   Use semantic HTML5 tags (`<nav>`, `<main>`, `<header>`, etc.).
        -   Ensure all interactive elements (buttons, links) are clearly distinguishable and have proper focus states.
        -   Ensure sufficient color contrast between text and background.
