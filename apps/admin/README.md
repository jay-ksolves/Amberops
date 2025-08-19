# AmberOps Admin Application

This is the dedicated Next.js application for all administrative functions of the AmberOps Console. It is designed to be a secure, standalone portal for managing site content and users.

## In-Depth Overview

- **Purpose**: This application provides a centralized and secure interface for site administrators to manage all dynamic content that appears on the public-facing `home` app, as well as to manage user accounts across the entire platform.

- **Technology**:
  - **Framework**: Built with **Next.js** and the App Router.
  - **Data Management**: Uses **TanStack Query** to interact with the backend API for all CRUD (Create, Read, Update, Delete) operations.

- **Key Responsibilities**:
  - **User Management**: Provides a full-featured interface to add, edit, and delete users and manage their roles (Admin, Operator, Viewer).
  - **Content Management**: Contains dedicated pages for managing:
    - **Documentation**: Articles for the public documentation site.
    - **Legal Documents**: The Terms of Service and Privacy Policy.
    - **Pricing Tiers**: The plans displayed on the landing page.
    - **Testimonials**: Customer quotes for the marketing section.
    - **FAQs**: The frequently asked questions section.

- **Authentication**: This application is protected and assumes it will be secured by the dedicated authentication service (e.g., Keycloak) defined in the `apps/auth` directory. Only users with an "Admin" role should be granted access.

## Running Locally

To run this application in a local development environment, use the following command from the root of the monorepo:

```bash
pnpm dev:admin
```

The application will be available at `http://localhost:3003`.

For the complete user experience, you should also have the other applications running on their respective ports. You can start all applications simultaneously by running `sh run.sh` from the root directory.
