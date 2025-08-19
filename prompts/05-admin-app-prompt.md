# Master Prompt: Admin Dashboard Application (`apps/admin`)

## 1. Project Goal

Your goal is to create a secure, standalone admin dashboard for the AmberOps Console. This application will be used by administrators to manage users and all public-facing content that appears on the `home` application.

## 2. Core Technologies

- **Framework**: Next.js with App Router.
- **Data Fetching & State Management**: `@tanstack/react-query` for all interactions with the backend API.
- **Forms**: `react-hook-form` with `zod` for validation.
- **Styling**: Tailwind CSS, using the shared theme from `@amberops/design-tokens`.
- **UI Components**: Use shared components from `@amberops/ui`, especially the `DataTable`.

## 3. Application Structure & Authentication

### A. Project Setup

- **`next.config.js`**: Configure `transpilePackages`, environment variables, and rewrites for the API.
- **`src/app/layout.tsx`**: The root layout for the admin application.
  - **Admin-Only Guard**: This is the most critical part of the application. The layout must implement a strict authentication and authorization check.
    1.  It should first check for a `token` in the URL search parameters, which occurs after an admin logs in via the `home` app. If present, it must decode the JWT, verify the user's `role` is 'Admin', and store the user object and JWT in `localStorage`. If the role is not 'Admin', it must redirect to the main web app (`/dashboard`) with an error toast.
    2.  If no token is in the URL, it must check `localStorage`. If a user object and JWT are found, it must verify the user's role is 'Admin'.
    3.  If no valid admin session can be found, it must immediately redirect the user to the main login page (`/auth` on the `home` app) with an error toast.
    4.  Display a `Preloader` component while these checks are in progress.
- **Sidebar (`src/components/layout/admin-sidebar-nav.tsx`)**:
  - Create a dedicated sidebar for the admin console.
  - It should have navigation links to: Dashboard, Users, Documentation, Legal Pages, Pricing, Testimonials, and FAQs.
  - Include an "Exit Admin" button in the footer that logs the user out and redirects to the login page.

## 4. Page Implementations

All pages that involve managing lists of data (users, articles, etc.) must use the `DataTable` component from `@amberops/ui` for a consistent experience. Each of these pages should implement full CRUD (Create, Read, Update, Delete) functionality using `useQuery` for fetching data and `useMutation` for all create, update, and delete operations. Use toast notifications to provide feedback for all actions (e.g., "User created successfully!", "Error: Failed to delete article.").

- **Admin Dashboard (`/dashboard`)**:
  - The main landing page for the admin console.
  - Display a grid of `Card` components, with each card linking to one of the main management sections (User Management, Documentation, Legal Docs, Pricing Tiers, Testimonials, FAQs).
- **User Management (`/users`)**:
  - A `DataTable` listing all users.
  - Columns should include User (Avatar, Name, Email), Role, and Last Login.
  - Provide a "New User" button that opens a dialog to create a new user with fields for name, email, password, and role.
  - Include an actions menu for each row to Edit (opens the same dialog in edit mode) or Delete a user.
- **Documentation Management (`/documentation`)**:
  - A `DataTable` listing all documentation articles.
  - Columns: Title, Slug, Last Updated.
  - A "New Article" button to open a dialog with fields for Title, Slug, and Content (a large `Textarea`).
  - Actions menu to Edit or Delete articles.
- **Legal Documents (`/legal`)**:
  - A tabbed interface (`Tabs` component) for managing "Terms of Service" and "Privacy Policy".
  - Each tab should contain an editor (`LegalEditor` component) with a large `Textarea` to modify the HTML content of the document.
  - Include a "Save Changes" button for each document.
- **Pricing Tiers (`/pricing`)**:
  - A `DataTable` listing all pricing tiers.
  - A "New Tier" button opening a dialog with fields for Title, Price, Period, Description, Features (one per line in a `Textarea`), and a `Switch` to mark the tier as "Featured".
  - Actions menu to Edit or Delete tiers.
- **Testimonials (`/testimonials`)**:
  - A `DataTable` listing all customer testimonials.
  - A "New Testimonial" button opening a dialog with fields for Name, Role, Avatar URL, and Quote (`Textarea`).
  - Actions menu to Edit or Delete testimonials.
- **FAQs (`/faqs`)**:
  - A `DataTable` listing all Frequently Asked Questions.
  - A "New FAQ" button opening a dialog with fields for Question and Answer (`Textarea`).
  - Actions menu to Edit or Delete FAQs.
