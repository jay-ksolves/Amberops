# Master Prompt: Main Web Application (`apps/web`)

## 1. Project Goal

Your goal is to create the core, protected dashboard application for the AmberOps Console. This is a feature-rich, single-page application (SPA) where authenticated users will manage their data clusters.

## 2. Core Technologies

- **Framework**: Next.js with App Router.
- **State Management**: `@tanstack/react-query` for server state (caching, refetching) and `zustand` for any complex local UI state.
- **Styling**: Tailwind CSS, consuming shared tokens from `@amberops/design-tokens`.
- **UI Components**: Use shared components from the `@amberops/ui` package.
- **Data Fetching**: Use the API client from `@amberops/api` for all data fetching.
- **AI Integration**: Call server actions that wrap Genkit flows defined in `@amberops/api`.

## 3. Application Structure & Authentication

### A. Project Setup

- **`next.config.js`**:
  - Configure `transpilePackages`.
  - Set up a rewrite for `/api/v1/app/:path*` to proxy requests to the backend service.
  - Add the `GEMINI_API_KEY` to the environment variables.
  - Add necessary Webpack configurations to handle Genkit dependencies in the browser.
- **`src/app/(app)/layout.tsx`**: This is the main protected layout.
  - **Authentication Guard**: This layout is the primary defense for the application. On mount, it must check for a valid JWT in `localStorage`.
    - If a token is found in the URL (from an OAuth redirect), it should store the token and user data in `localStorage` and clean the URL.
    - If no token exists in `localStorage`, it must immediately redirect the user to the login page (`/auth` on the `home` app).
    - It should display a `Preloader` component while verifying the session.
- **`src/app/actions.ts`**: Re-export the Genkit AI flows from `@amberops/api` as Server Actions. This allows client components to call them securely without bundling server-side code.

### B. Core Layout (`src/components/layout/app-layout.tsx`)

- **Header**:
  - A persistent header containing a `GlobalSearch` component, a `QuickAccessNav` menu, a `LanguageSwitcher`, a `ThemeToggle`, and a user dropdown menu.
  - The user menu should show the user's avatar and name, with options for "Settings", "Support", and "Logout". If the user is an 'Admin', it must also show a link to the "Admin Dashboard".
- **Sidebar (`src/components/layout/sidebar-nav.tsx`)**:
  - A collapsible navigation sidebar using the `Sidebar` component from `@amberops/ui`.
  - It should list all the main pages: Dashboard, Clusters, Services, Hosts, Alerts (with sub-items), Config, Tasks, Activity, Logs.
  - It should also have a footer section with links to Documentation, Settings, and Help.

## 4. Page Implementations

For all pages, use the `DataTable` component for lists of data and `useQuery` from `@tanstack/react-query` for data fetching. Ensure all pages have appropriate loading skeletons.

- **Dashboard (`/dashboard`)**:
  - Display high-level summary cards for "Total Clusters", "Active Alerts", "Avg. CPU Usage", and "Avg. Memory Usage".
  - Show a "Cluster Status" table summarizing all clusters.
  - Show a "Critical Alerts" table listing the most recent, urgent alerts.
  - Include an "AI Health Summary" widget (`ClusterHealthSummary` component) that allows users to select a cluster and see a generated summary of its health.
  - Implement a `UserOnboardingTour` using `react-joyride` that highlights the key features of the dashboard for first-time users.
- **Clusters (`/clusters`)**:
  - Display a list of all clusters using the `DataTable` component. Provide both table and card views.
  - Include an "Add Cluster" button that opens a multi-step dialog (`Stepper` component) to guide the user through registering a new Ambari cluster.
- **Cluster Detail (`/clusters/[id]`)**:
  - Display detailed information for a single cluster.
  - Show summary cards for the cluster's status and resource usage.
  - Use `recharts` to display historical data for "Resource Utilization" (CPU/Memory) and "I/O Performance" (Disk/Network).
  - List all services and hosts belonging to the cluster in separate tables, with links to their respective detail pages.
- **Services (`/services`)**:
  - A `DataTable` listing all services across all clusters.
  - Include action menus for each service to Start, Stop, and Restart it. These actions should create a new entry on the Tasks page.
- **Service Detail (`/services/[id]`)**:
  - Show the status and version of the service.
  - Provide quick links to view configurations and run a service check.
  - List all hosts that the service is running on.
- **Hosts (`/hosts`)**:
  - A `DataTable` listing all hosts across all clusters.
- **Host Detail (`/hosts/[id]`)**:
  - Display detailed metrics for the host (OS, CPU, Memory, Storage).
  - List all service components running on that specific host.
- **Alerts (`/alerts`)**:
  - A `DataTable` listing all triggered alerts, sortable by severity, status, and timestamp.
- **Alert Detail (`/alerts/[id]`)**:
  - Show all details for a specific alert.
  - Display a snippet of the related logs.
  - Provide "Acknowledge" and "Resolve" action buttons.
  - Include a `TroubleshootingSteps` component that uses an AI flow to suggest resolution steps based on the alert's description and logs.
- **Alert Definitions (`/alerts/definitions`)**:
  - A `DataTable` for viewing and managing all alert definitions.
  - Include a dialog to create new definitions.
- **Tasks & Ops (`/tasks`)**:
  - A `DataTable` to track the status and progress of background operations like starting a service or running a check. Use a `Progress` bar component.
- **Logs (`/logs`)**:
  - A log viewer page with filtering options for level, service, cluster, and a text search query.
- **Settings (`/settings`)**:
  - A tabbed interface for managing General settings (profile info, theme), Integrations (Slack, PagerDuty), and API Access (generating/revoking keys).
- **Help & Documentation (`/help`, `/documentation`)**:
  - Static pages providing user guides and FAQs.
