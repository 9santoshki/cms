You are an expert software developer. Your task is to build a full-stack e-commerce and service booking web application for an interior furnishing business based in India.

**Primary Goal:** Create a clean, modular, and production-ready codebase.

**Core Requirements & Technology Stack:**
- **Frontend:** Next.js 14+ (App Router) with React and TypeScript.
- **Backend & Database:** Supabase (PostgreSQL, Auth, Storage).
- **Styling:** Tailwind CSS.
- **Payment Gateway:** Integrate Razorpay for Indian payment methods.

**Development Guidelines & Best Practices:**

1.  **Project Structure:**
    - Use the Next.js App Router.
    - Organize components logically. Create a `/components` directory with subdirectories for `ui` (reusable, generic components like buttons, inputs), `layout` (header, footer), and `features` (domain-specific components like `ProductCard`, `ShoppingCart`, `AppointmentCalendar`).
    - Keep server-side logic (`/lib` or `/utils`) separate from client-side UI.

2.  **TypeScript:**
    - Use strict TypeScript. Define clear types and interfaces for all data models (e.g., `Product`, `Order`, `User`, `Appointment`).
    - Type all function props, arguments, and return values. Avoid using `any`.

3.  **Supabase Integration:**
    - Create a Supabase client instance in a central file (`/lib/supabaseClient.ts`).
    - Use environment variables for Supabase URL and anon key.
    - Use Supabase Row Level Security (RLS) to secure your database. Users should only be able to view their own orders and appointments.
    - Use Supabase Storage for all product images.

4.  **State Management:**
    - For global state like the shopping cart, use React Context or a lightweight library like Zustand.
    - For server-state (fetching products, appointments), use the built-in `fetch` with React Server Components or a library like `SWR` for client-side data fetching.

5.  **Code Quality & Maintainability:**
    - Write clean, self-documenting code. Add comments only for complex logic.
    - Keep components small and focused on a single responsibility.
    - Use ESLint and Prettier to enforce a consistent code style.

6.  **Authentication:**
    - Implement authentication using Supabase Auth.
    - **Crucially, enable and configure Google as a social login provider.** The login page should feature both email/password and a "Sign in with Google" button.
    - Create protected routes (e.g., `/account`, `/book-appointment`) and public routes.
    - Use middleware (`middleware.ts`) to handle route protection.

7.  **New Feature: Appointment Booking:**
    - Create a new table in Supabase named `appointments` with columns for `id`, `user_id`, `appointment_date`, `status`, and `notes`.
    - Build a booking interface where users can select an available date and time. You can start with a simple date picker and predefined time slots (e.g., 10:00 AM, 2:00 PM, 4:00 PM).
    - Form submission should create a new record in the `appointments` table.
    - The user's account page should display their upcoming and past appointments.

8.  **Production Readiness:**
    - Implement comprehensive error handling and loading states for all data-fetching and form submission operations.
    - Optimize images using the Next.js `<Image>` component.
    - Ensure the application is fully responsive.
    - Set up environment variables for production and development.

9.  **Testing:**
    - Write unit tests for all components using Jest.
    - make sure to cover edge cases and error scenarios.
    - Implement end-to-end testing using Cypress or Play
    - make necessary changes incase of any issues during the development process.