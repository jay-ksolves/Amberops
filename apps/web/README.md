# AmberOps Web Application (Dashboard)

This is the main, protected Next.js application for the AmberOps Console. It contains all the core features for cluster management and is only accessible to authenticated users.

## In-Depth Overview

- **Purpose**: This application serves as the primary tool for DevOps engineers and system administrators to monitor, manage, and troubleshoot their data clusters. It is designed as a feature-rich, highly interactive Single-Page Application (SPA).

- **Technology**:
  - **Framework**: Built with **Next.js** and the App Router.
  - **State Management**: Uses **TanStack Query** for managing server state (caching, refetching API data) and **Zustand** or React Context for local UI state.

- **Key Responsibilities**:
  - **Displaying Data**: Renders all the main pages, including the Dashboard, Clusters, Services, Hosts, and Alerts lists by fetching data from the standalone `backend` service.
  - **User Interaction**: Handles all user actions, such as starting/stopping services, acknowledging alerts, and editing configurations.
  - **AI Integration**: This app's client-side components make calls to the Genkit AI flows (defined in `packages/api`) to fetch and display AI-powered insights like health summaries and troubleshooting steps.
  - **Security**: All pages within this application are protected. The main layout checks for a valid JSON Web Token (JWT) in `localStorage`. Unauthenticated users are redirected to the login page in the `apps/home` application.

## Running Locally

To run this application in a local development environment, use the following command from the root of the monorepo:

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.

For the complete user experience, including login and signup, you must also run the `home` and `auth` applications. You can start all applications and services simultaneously by running `sh run.sh` from the root directory.
