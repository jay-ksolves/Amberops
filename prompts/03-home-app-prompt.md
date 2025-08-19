# Master Prompt: Home Application (`apps/home`)

## 1. Project Goal

Your goal is to create the public-facing "home" application for the AmberOps Console. This Next.js application serves two main purposes:
1.  A modern, attractive landing page to market the product.
2.  A unified user interface for authentication (login and registration).

## 2. Core Technologies

- **Framework**: Next.js with App Router.
- **Styling**: Tailwind CSS, consuming shared tokens from `@amberops/design-tokens`.
- **UI Components**: Use shared components from the `@amberops/ui` package.
- **Data Fetching**: Use `@tanstack/react-query` to fetch public data (pricing, testimonials, etc.) from the backend service.

## 3. Application Structure

- **`next.config.js`**:
  - Configure `transpilePackages` to include the shared workspace packages.
  - Set up a rewrite for `/api/v1/public/:path*` to proxy requests to the backend service.
  - Define all necessary `env` variables (`NEXT_PUBLIC_AUTH_API_URL`, `NEXT_PUBLIC_WEB_URL`, etc.).
- **`src/app/layout.tsx`**: The root layout, which sets up the `ThemeProvider`, `QueryClientProvider`, and global `Toaster`. It also implements a custom "thunderbolt" cursor effect.
- **`src/app/page.tsx`**: The main landing page.
- **`src/app/auth/page.tsx`**: The unified authentication page.
- **`src/app/documentation/`**: Pages for viewing public documentation articles.
- **`src/app/legal/`**: Pages for viewing legal documents (Terms of Service, Privacy Policy).
- **`src/components/`**: Contains components specific to the `home` app.
  - **`layout/`**: `Header` and `Footer` components.
  - Other presentational components for the landing page sections.

## 4. Landing Page (`src/app/page.tsx`)

The landing page should be visually impressive and professional, designed to convert visitors into users. It should be a single, scrollable page composed of multiple sections with smooth transitions and animations.

- **Hero Section**:
  - A compelling headline (e.g., "Unified Cluster Management, Supercharged by AI").
  - A sub-headline describing the value proposition.
  - "Get Started" and "Learn More" call-to-action (CTA) buttons.
  - Include a visually engaging animation, like a rotating 3D globe (`AnimatedGlobe` component).
- **Features Section**:
  - A section highlighting the key features of AmberOps (e.g., "Blazing Fast UI", "AI-Powered Insights", "Unified Cluster View").
  - Use a `FeatureCarousel` component to display these features in an interactive way.
- **Integrations/Social Proof Section**:
  - Display logos or names of trusted companies.
  - Include an `IntegrationsGrid` component that shows an animated marquee of logos for supported technologies (HDFS, YARN, Spark, etc.).
- **Pricing Section**:
  - Fetch pricing tier data from the public API endpoint (`/public/pricing`).
  - Display the tiers using a `PricingCard` component with a 3D tilt effect on hover. One tier should be highlighted as "Featured".
  - Handle loading states with skeletons.
- **Testimonials Section**:
  - Fetch testimonial data from the public API endpoint (`/public/testimonials`).
  - Display the testimonials in a horizontally scrolling `TestimonialsMarquee`.
  - Handle loading states with skeletons.
- **FAQ Section**:
  - Fetch FAQ data from the public API endpoint (`/public/faqs`).
  - Display the questions and answers in an `Accordion` component.
  - Handle loading states with skeletons.
- **Contact Section**:
  - A simple section with a "Contact Us" CTA that links to a support email address.
- **Final CTA Section**:
  - A final, prominent call-to-action encouraging users to sign up.

## 5. Authentication Page (`src/app/auth/page.tsx`)

This page must provide a seamless UI for both user registration and login.

- **Layout**: Use a two-panel layout. One panel shows the sign-in form, and the other shows the sign-up form. An animated toggle panel should slide between them.
- **Sign-In Form**:
  - Inputs for email and password.
  - A "Forgot Password?" link.
  - A "Sign In" button.
  - Social login buttons for Google and GitHub.
- **Sign-Up Form**:
  - Inputs for name, email, and password.
  - A "Sign Up" button.
  - Social login buttons for Google and GitHub.
- **Authentication Logic**:
  - All form submissions and OAuth initiations should make requests to the `auth` service API (running on port 3002).
  - **Login**: On successful login, the `auth` service will respond with a JWT and a `redirectUrl`. The client-side code must store the decoded user payload and the JWT in `localStorage`, then redirect the user to the `redirectUrl`.
  - **Registration**: On successful registration, display a success toast and switch the view to the sign-in form.
  - **Error Handling**: Display any error messages from the API using toast notifications.
- **Session Check**:
  - When this page loads, it should first check `localStorage` for an existing JWT. If a valid session exists, it should immediately redirect the user to their appropriate dashboard, showing a toast notification that they are already logged in.

## 6. Other Public Pages

- **Documentation (`/documentation/[slug]`)**: A dynamic route that fetches and displays the content of a single documentation article.
- **Legal (`/legal/[type]`)**: A dynamic route that fetches and displays the content for "Terms of Service" or "Privacy Policy".
- **Not Found Page**: Create a visually engaging, animated 404 page featuring a "lost astronaut" theme.

## 7. Styling and UX

- Use the shared theme from `@amberops/design-tokens`.
- Implement subtle animations and transitions to create a modern and fluid user experience.
- Add a custom "thunderbolt" cursor effect for visual flair.
- Ensure the entire application is fully responsive and looks great on all screen sizes.
- The footer should include a playful "swinging girl" animation.
