# AmberOps Home Application

This application is the public-facing entry point for the AmberOps Console. It serves two primary functions: acting as a modern, responsive landing page and providing the user interface for all authentication flows.

## In-Depth Overview

- **Purpose**: This app is designed to attract new users and to provide a seamless and secure way for all users (including admins) to sign in. It is the dedicated frontend for the standalone `auth` service.

- **Technology**:
  - **Framework**: Built with **Next.js** and the App Router.
  - **Styling**: Uses **Tailwind CSS** and consumes the shared theme from `packages/design-tokens`.
  - **Components**: Leverages the reusable component library from `packages/ui`.

- **Authentication Flow**:
  1.  A user visits the landing page and decides to either sign up or log in.
  2.  They are directed to the unified `/auth` page within this application.
  3.  This app's UI captures their credentials or initiates an OAuth flow (Google/GitHub).
  4.  The form sends a `fetch` request to the standalone `auth` service (running on port `3002`).
  5.  The `auth` service handles all logic (validating credentials, interacting with Google, etc.) and returns a JSON Web Token (JWT) upon success.
  6.  The `home` app receives the JWT, stores it in `localStorage`, and securely redirects the user to the appropriate protected dashboard (`/dashboard` or `/admin`).

## Running Locally

To run this application in a local development environment, use the following command from the root of the monorepo:

```bash
pnpm dev:home
```

The application will be available at `http://localhost:3001`.

Note that for the full authentication flow to work correctly, the `auth` service must also be running. You can start all applications and services simultaneously by running `sh run.sh` from the root directory.
