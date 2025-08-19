# AmberOps Console Monorepo

This repository contains the source code for the AmberOps Console, a modern management console for Apache Ambari-like operations, built with a scalable and maintainable monorepo architecture.

## 1. Core Philosophy

- **Separation of Concerns**: Each part of the project has a distinct and well-defined responsibility.
- **Code Reusability**: Shared code is managed in dedicated packages to avoid duplication and ensure consistency.
- **Developer Experience**: The project is designed to be easy to set up, run, and contribute to, with a focus on automation and clear documentation.
- **Testability**: The architecture is designed to be easily testable at all levels, from individual components to end-to-end user flows.

---

## 2. Folder Structure

This project is a `pnpm` workspace-based monorepo. This structure is ideal for managing multiple related projects within a single repository.

`/
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
└── docs/                 # Project documentation (ADRs, Guides)`

---

## 3. Getting Started

Follow this three-step process to set up and run the project locally.

### Step 1: Configure Your Environment

First, create a `.env` file at the project root by copying the example file:

```bash
cp .env.example .env
```

Next, open the new `.env` file and **fill in all required variables**, such as your `MONGODB_URI` and a `JWT_SECRET`. The `.env.example` file is pre-configured with all the necessary URLs and settings for a local development environment.

### Step 2: Seed the Database

Once your `.env` file is configured, seed your MongoDB database with initial data:

```bash
pnpm seed
```

This will create three default users:

- **Admin User**:
  - **Email**: `admin@amberops.com`
  - **Password**: `admin@amberops`
  - **Purpose**: For accessing the Admin Console at `localhost:3003`.

- **Default User**:
  - **Email**: `jay@gmail.com`
  - **Password**: `123456`
  - **Purpose**: A pre-populated account for the main `web` dashboard with sample clusters, services, and alerts.

- **Test User**:
  - **Email**: `test@example.com`
  - **Password**: `password`
  - **Purpose**: A clean account with no data, for testing the new user experience.

### Step 3: Run the Development Servers

Start all local development servers simultaneously:

```bash
sh run.sh
```

The servers will be available at:

- **Landing Page App (`home`)**: `http://localhost:3001`
- **Dashboard App (`web`)**: `http://localhost:3000`
- **Admin App (`admin`)**: `http://localhost:3003`
- **Auth Service (`auth`)**: Port `3002`
- **Backend Service (`backend`)**: Port `3004`

---

## 4. Scripts and Commands

The project includes several shell scripts and `pnpm` commands to automate common tasks. All commands should be run from the project root.

| Command                 | Description                                                                                                                                               |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sh run.sh`             | **Run All Services**: Starts the development servers for all applications and services simultaneously. This is the primary command for local development. |
| `pnpm install`          | Installs all dependencies across all packages in the workspace.                                                                                           |
| `pnpm dev`              | Runs the main `web` dashboard application on `localhost:3000`.                                                                                            |
| `pnpm dev:home`         | Runs the `home` landing page application on `localhost:3001`.                                                                                             |
| `pnpm dev:admin`        | Runs the `admin` dashboard application on `localhost:3003`.                                                                                               |
| `pnpm dev:auth`         | Runs the `auth` service on port `3002`.                                                                                                                   |
| `pnpm dev:backend`      | Runs the `backend` API service on port `3004`.                                                                                                            |
| `pnpm build`            | Builds all applications and packages for production.                                                                                                      |
| `pnpm test:e2e`         | Runs all Playwright end-to-end tests.                                                                                                                     |
| `pnpm seed`             | Populates your MongoDB database with initial data for development.                                                                                        |
| `pnpm storybook`        | Starts the Storybook server for the `@amberops/ui` component library.                                                                                     |
| `sh clean-workspace.sh` | **Full Cleanup**: Stops all running server processes, removes all `node_modules` folders, build caches (`.next`, `dist`), and the `pnpm-lock.yaml` file.  |
# Amberops
