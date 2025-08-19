# Master Prompt: AmberOps Monorepo & Shared Packages

## 1. Project Goal

Your goal is to create a complete, production-ready monorepo setup for a web application called "AmberOps Console". This console is a modern frontend for Apache Ambari, designed for managing data clusters. The monorepo will house multiple frontend applications, backend services, and shared libraries.

## 2. Core Technologies

- **Package Manager**: pnpm workspaces.
- **Language**: TypeScript for all code.
- **Frontend Framework**: Next.js with the App Router.
- **Styling**: Tailwind CSS.
- **UI Components**: Radix UI primitives, styled with ShadCN/UI conventions.
- **CI/CD**: GitHub Actions.
- **Linting & Formatting**: ESLint and Prettier.

## 3. Monorepo Structure

Create the following directory structure at the root of the project:

```
/
├── .github/
│   ├── workflows/
│   │   └── ci.yml
│   └── ISSUE_TEMPLATE/
├── apps/
│   ├── admin/
│   ├── auth/
│   ├── backend/
│   ├── home/
│   └── web/
├── packages/
│   ├── api/
│   ├── design-tokens/
│   ├── lib/
│   └── ui/
├── tests/
└── docs/
```

## 4. Root-Level Configuration

### `package.json`

- Configure pnpm workspaces to recognize the paths in `apps/*` and `packages/*`.
- Add scripts for running, building, testing, and linting individual apps and the entire workspace (e.g., `dev`, `dev:home`, `dev:web`, `build`, `test:e2e`, `lint`, `seed`).
- Include `devDependencies` for `typescript`, `eslint`, `prettier`, `husky`, `playwright`, and `tsx`.

### `pnpm-workspace.yaml`

- Define the package locations for the pnpm workspace.

### `tsconfig.base.json`

- Create a base TypeScript configuration that all other projects will extend.
- Define path aliases for all the shared packages (e.g., `@amberops/ui`, `@amberops/lib`).

### Utility Scripts

- **`run.sh`**: A shell script to run all development servers concurrently.
- **`kill-ports.sh`**: A utility script to find and kill processes running on the standard development ports (3000-3004).
- **`clean-workspace.sh`**: A script to remove all `node_modules`, build caches (`.next`, `dist`), and the `pnpm-lock.yaml` file.
- **`scripts/seed.ts`**: A TypeScript script (run with `tsx`) to populate the MongoDB database with initial mock data.

### CI/CD (`.github/workflows/ci.yml`)

- Create a GitHub Actions workflow that runs on push/pull_request to the `main` branch.
- Include jobs for `lint`, `build`, and `test` (running Playwright E2E tests).

### Issue & PR Templates (`.github/`)

- Create standard templates for Bug Reports, Feature Requests, and Pull Requests to standardize contributions.

### Documentation (`docs/`)

- Create a `docs` directory with an `ADR` subfolder for Architecture Decision Records and guides for `DEVELOPMENT` and `DEPLOYMENT`.

### Testing (`tests/`)

- Set up a `tests` directory for Playwright E2E tests.
- Create test files that cover critical user flows like authentication, navigation, and core feature interactions.
- Configure `playwright.config.ts` to run the frontend applications as web servers during the test run.

---

## 5. Shared Packages Implementation

### A. `@amberops/lib` (Shared Logic and Types)

- **`src/types.ts`**: Define all shared TypeScript types for the entire application. This includes `User`, `Cluster`, `Service`, `Host`, `Alert`, `Task`, `ActivityLog`, `DocumentationArticle`, `LegalDocument`, `PricingTier`, `Testimonial`, and `FAQ`.
- **`src/utils.ts`**: Create a `cn` utility function that intelligently merges Tailwind CSS classes using `clsx` and `tailwind-merge`.
- **`src/logger.ts`**: Create a `log` utility function that conditionally logs to the console based on an environment variable.

### B. `@amberops/design-tokens` (Styling)

- **`globals.css`**:
  - Define all CSS variables for the color palette, including light and dark mode themes. The color scheme should be modern and professional, using a primary color like orange/amber.
  - Define variables for `background`, `foreground`, `card`, `popover`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `border`, `input`, and `ring`.
  - Include variables for the sidebar theme and chart colors.
  - Apply base styles using `@layer base`, setting the background, text color, and fonts for the `body`.
- **`tailwind.config.ts`**:
  - Create a shared Tailwind configuration that will be used as a preset by the frontend applications.
  - Reference the CSS variables defined in `globals.css` for all colors.
  - Configure `fontFamily` for `body` (Inter) and `headline` (Space Grotesk).
  - Configure `borderRadius`, `keyframes` for animations (`accordion-down`, `accordion-up`).
  - Include the `tailwindcss-animate` plugin.

### C. `@amberops/ui` (Component Library)

- **Setup**: This is a React component library.
- **Core Components**: Create a comprehensive set of reusable UI components based on Radix UI and styled with Tailwind CSS, following ShadCN/UI conventions. This includes, but is not limited to:
  - `Accordion`, `Alert`, `AlertDialog`, `Avatar`, `Badge`, `Button`, `Card`, `Checkbox`, `Dialog`, `DropdownMenu`, `Input`, `Label`, `Popover`, `Progress`, `Select`, `Separator`, `Sheet`, `Skeleton`, `Slider`, `Switch`, `Table`, `Tabs`, `Textarea`, `Toast`, `Toaster`, `Tooltip`.
- **Composite Components**:
  - **`PageHeader`**: A component for consistent page titles and descriptions.
  - **`DataTable`**: A powerful, reusable data table component built with TanStack Table. It must include features for sorting, filtering, pagination, column visibility toggling, column reordering, density/style adjustments, and data export to PDF, Excel, and CSV.
  - **`Sidebar`**: A collapsible sidebar navigation component with support for icons, labels, tooltips (when collapsed), and nested accordion-style menu items. Use `useContext` for state management.
  - **`Breadcrumbs`**: A component that automatically generates breadcrumbs based on the current URL pathname.
  - **`Preloader`**: A full-page loading animation component.
  - **`QuickAccessNav`**: A floating action button that opens a modal with quick links to different parts of the application.
- **Storybook**:
  - Configure Storybook to document and test all UI components in isolation.
  - Create stories for each component, showcasing its different variants and states.
  - Ensure the Storybook setup is compatible with Next.js and Tailwind CSS. Add the `@storybook/addon-a11y` for accessibility testing.

### D. `@amberops/api` (API Client & AI)

- **`src/client.ts`**: Create a centralized, universal API client using `fetch` for making requests to the backend. It should have methods for `get`, `post`, `put`, and `delete`. This client must automatically attach the JWT from `localStorage` to the `Authorization` header for all protected requests. It should also export functions for every specific API call (e.g., `fetchClusters`, `updateUser`).
- **`src/ai/genkit.ts`**: Initialize and configure a global Genkit instance.
- **`src/ai/flows/`**: Define all AI-powered flows here as server-side TypeScript modules. This includes `summarize-cluster-health` and `suggest-troubleshooting-steps`. Each flow should define its input/output schemas using Zod and its core prompt logic.
