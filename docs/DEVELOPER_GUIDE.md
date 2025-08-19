# AmberOps Console: The Ultimate Developer Guide

Welcome to the AmberOps Console project. This document is the comprehensive, in-depth guide for developers and system administrators. It covers the project's architecture, development workflow, testing strategy, and deployment guidelines.

## 1. Core Philosophy

The AmberOps Console is built on a foundation of modern, scalable, and maintainable principles. The key goals are:

- **Separation of Concerns**: Each part of the project has a distinct and well-defined responsibility.
- **Code Reusability**: Shared code is managed in dedicated packages to avoid duplication and ensure consistency.
- **Developer Experience**: The project is designed to be easy to set up, run, and contribute to, with a focus on automation and clear documentation.
- **Testability**: The architecture is designed to be easily testable at all levels, from individual components to end-to-end user flows.

---

## 2. In-Depth Folder & File Structure

This project is a `pnpm` workspace-based monorepo. This structure is ideal for managing multiple related projects within a single repository.

`/
├── .github/              # GitHub Actions workflows and templates
├── apps/
│   ├── admin/            # Admin dashboard frontend app
│   ├── auth/             # Standalone Node.js authentication service
│   ├── backend/          # Standalone Node.js backend API service
│   ├── home/             # Public-facing landing page and auth frontend
│   └── web/              # The core, protected user dashboard app
├── packages/
│   ├── api/              # Centralized API client and Genkit AI flows
│   ├── design-tokens/    # Tailwind CSS configuration, theme, and global styles
│   ├── lib/              # Shared TypeScript types and utility functions
│   └── ui/               # Reusable React UI components with Storybook
├── tests/                # Playwright end-to-end tests for all applications
├── .env.example          # Example environment variables configuration
├── .env                  # Your local environment variables (gitignored)
├── Dockerfile            # Universal Dockerfile for building all services
├── docker-compose.yml    # Docker Compose file for orchestrating all services
├── package.json          # Root package manifest managing pnpm workspaces
└── tsconfig.base.json    # The shared base TypeScript configuration`

---

## 3. Scripts and Commands

The project includes several shell scripts and `pnpm` commands to automate common tasks. All commands should be run from the project root.

### Shell Scripts

These scripts provide high-level orchestration for setting up and running the workspace.

| Script                  | Description                                                                                                                                               |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sh build-workspace.sh` | **First-Time Setup**: Prepares the entire workspace. It installs `nvm`, Node.js, `pnpm`, all dependencies, and runs builds and tests.                     |
| `sh run.sh`             | **Run All Services**: Starts the development servers for all applications and services simultaneously. This is the primary command for local development. |
| `sh clean-workspace.sh` | **Full Cleanup**: Stops all running server processes, removes all `node_modules` folders, build caches (`.next`, `dist`), and the `pnpm-lock.yaml` file.  |

### PNPM Commands

| Command            | Description                                                           |
| ------------------ | --------------------------------------------------------------------- |
| `pnpm install`     | Installs all dependencies across all packages in the workspace.       |
| `pnpm dev`         | Runs the main `web` dashboard application on `localhost:3000`.        |
| `pnpm dev:home`    | Runs the `home` landing page application on `localhost:3001`.         |
| `pnpm dev:admin`   | Runs the `admin` dashboard application on `localhost:3003`.           |
| `pnpm dev:auth`    | Runs the `auth` service on port `3002`.                               |
| `pnpm dev:backend` | Runs the `backend` API service on port `3004`.                        |
| `pnpm build`       | Builds all applications and packages for production.                  |
| `pnpm test:e2e`    | Runs all Playwright end-to-end tests.                                 |
| `pnpm seed`        | Populates your MongoDB database with initial data for development.    |
| `pnpm storybook`   | Starts the Storybook server for the `@amberops/ui` component library. |

---

## 4. Development Workflow

### Step 1: Environment Configuration

Before running the application, you must configure your environment variables.

1.  **Create your local `.env` file**: At the root of the project, make a copy of the example environment file:
    `cp .env.example .env`
2.  **Set Required Variables**: Open the new `.env` file. The file is pre-configured for local development. You only need to provide your `MONGODB_URI` and a `JWT_SECRET`.
3.  **Set Optional Variables**: For features like social login (Google/GitHub) or AI-powered features (Gemini), you will need to provide the corresponding API keys and secrets in the `.env` file.

#### Environment Variable Details

| Variable               | Description                                                                          | Required? |
| ---------------------- | ------------------------------------------------------------------------------------ | --------- |
| `MONGODB_URI`          | The connection string for your MongoDB database.                                     | **Yes**   |
| `JWT_SECRET`           | A secret key for signing JSON Web Tokens.                                            | **Yes**   |
| `CORS_ORIGINS`         | A comma-separated list of allowed origins for the backend services.                  | **Yes**   |
| `COOKIE_DOMAIN`        | The domain for session cookies. Use `localhost` for dev, `.yourdomain.com` for prod. | **Yes**   |
| `GOOGLE_CLIENT_ID`     | The client ID for Google OAuth 2.0.                                                  | No        |
| `GOOGLE_CLIENT_SECRET` | The client secret for Google OAuth 2.0.                                              | No        |
| `GITHUB_CLIENT_ID`     | The client ID for GitHub OAuth.                                                      | No        |
| `GITHUB_CLIENT_SECRET` | The client secret for GitHub OAuth.                                                  | No        |
| `GEMINI_API_KEY`       | Your API key for Google Gemini, used for all AI features.                            | No        |

### Step 2: Database Seeding

With your environment configured, seed the database with initial data. From the project root, run:
`pnpm seed`
This will create three standard users for testing and development:

- **Admin User**: `admin@amberops.com` / `admin@amberops` (for the Admin Console)
- **Default User**: `jay@gmail.com` / `123456` (pre-populated with data for the main dashboard)
- **Test User**: `test@example.com` / `password` (a clean slate for testing new user flows)

### Step 3: Running the Application Locally

Use this command to start all development servers simultaneously:
`sh run.sh`
The servers will be available at:

- **Landing Page (`home`)**: `http://localhost:3001`
- **Dashboard App (`web`)**: `http://localhost:3000`
- **Admin App (`admin`)**: `http://localhost:3003`
- **Auth Service (`auth`)**: Port `3002`
- **Backend Service (`backend`)**: Port `3004`

---

## 5. Running with Docker

For a more isolated and production-like environment, you can run the entire application stack using Docker Compose.

### Step 1: Install Docker

Ensure you have Docker and Docker Compose installed on your system.

### Step 2: Configure Environment

Copy the `.env.example` to `.env` and fill in the required variables, just as you would for a local setup. The `docker-compose.yml` file is configured to automatically load these variables.

### Step 3: Build and Run

From the project root, run the following command:

`docker-compose up --build`
This command will build the Docker images and start a container for each service. The services will be available on the same ports as the local development setup. To stop all the running containers, press `Ctrl+C`, and then run `docker-compose down`.

---

## 6. Testing Strategy

- **End-to-End (E2E) Testing**: Uses **Playwright** and is located in the `tests/` directory.
- **Static Analysis & Linting**: Uses **ESLint** and **Prettier** to enforce code style and catch errors.
