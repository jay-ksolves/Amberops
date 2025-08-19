# **App Name**: AmberOps Console

## Core Features:

- Dashboard: Cluster overview with health & metrics widgets (mock data).
- Clusters List & Detail: Display Clusters List & Detail.
- Services List & Detail: Display Services List & Detail.
- Hosts List & Detail: Manage Hosts List & Detail.
- Alerts & Alert Definitions management: Manage Alerts & Alert Definitions.
- Configuration Editor: Configuration Editor with versioning and rollback UI (mocked).
- Tasks/Operations tracker UI: Tasks/Operations tracker UI.
- Logs search and live tail UI: Logs search and live tail UI (mocked).
- Settings & User Management UI: Settings & User Management UI (mocked).
- Custom branded 404 and 500 error pages: Custom branded 404 and 500 error pages.
- AI-powered recommendations and alert correlation hooks: AI-powered recommendations and alert correlation hooks (no real AI yet, prepare hooks).
- Global error boundary with fallback UI to handle unexpected UI errors gracefully.

---

### Project Requirements:

1. **Framework & Language:**
   - Use **Next.js** (App Router)
   - Use **TypeScript** throughout the project
   - Functional components with React Hooks only

2. **Styling:**
   - Use **Tailwind CSS** for styling
   - Follow **BEM naming convention** for any custom CSS classes outside Tailwind utilities (e.g., component wrappers)
   - Implement a **reddish-orange and white color theme** with proper contrast and accessible colors
   - Include **dark mode toggle** (preferred) using CSS variables and Tailwind theming

3. **State Management & Data Fetching:**
   - Use **TanStack Query (React Query)** for server-state/data fetching and caching
   - Use **Zustand** or React Context for local UI state management where necessary
   - Mock API data for now using **Mock Service Worker (MSW)** — no real backend integration yet
   - Create a clear API adapter layer that can be swapped out later to connect to real Ambari REST APIs

4. **Component Architecture:**
   - Create a **Storybook** setup with stories for all components (buttons, cards, modals, tables, forms, charts)
   - Components must be accessible (ARIA attributes, keyboard navigable)
   - Include automated **axe-core accessibility checks** integrated into Storybook and CI pipeline
   - Components should have props interfaces typed with TypeScript
   - Include examples of interactive components: modal dialogs, toast notifications, tooltips, tables with sorting/filtering
   - Publish Storybook as a static site or use Chromatic for UI review and visual regression

5. **Routing & Pages:**
   - Implement routing using Next.js App Router conventions
   - Include pages for:
     - Dashboard (cluster overview with mock health & metrics widgets)
     - Clusters list & detail
     - Services list & detail
     - Hosts list & detail
     - Alerts & alert definitions
     - Configuration editor with versioning UI (mocked)
     - Tasks/operations tracker UI
     - Logs search & tailing UI (mocked)
     - Settings & user management (mocked)
     - Custom 404 and 500 error pages with branding

6. **Code Quality & Formatting:**
   - ESLint with **Airbnb style guide** + TypeScript rules + accessibility plugin
   - Prettier configured to format on save and pre-commit
   - Husky git hooks to run lint, format, and tests on pre-commit
   - Commit messages follow **Conventional Commits** format, enforced by commitlint
   - Include recommended VSCode settings (`.vscode/settings.json`) for editor integration (format on save, lint on save, etc.)

7. **Testing:**
   - Setup **Jest** + **React Testing Library** for unit and integration tests
   - Include basic test coverage for all critical components and pages, targeting minimum **80% coverage**
   - Setup **Playwright** for E2E testing with example test scripts for main user flows
   - Include accessibility testing with axe-core integrated into Storybook and test suites

8. **Internationalization:**
   - Setup **react-i18next** with English as default language
   - Provide sample translation JSON files
   - Include language switcher UI component (no backend needed)
   - Support RTL layouts as a bonus

9. **CI/CD:**
   - Create **GitHub Actions** workflows for:
     - Linting, testing, and building on every PR
     - Accessibility audit with axe-core as part of the CI pipeline
     - Deploy previews (mocked or static site)
     - Release pipeline stub (tag triggers build/deploy)
   - Include Pull Request and Issue templates for bug reports and feature requests
   - Enforce mandatory code reviews and passing CI before merges

10. **Project Structure & Documentation:**
    - Use a **monorepo** style structure (using `pnpm` or `yarn` workspaces) with at least:
      - `apps/web` for the Next.js frontend app
      - `packages/ui` for shared React components + Storybook
      - `packages/api` for API adapter layer with mocks
      - `packages/design-tokens` for theme colors and spacing tokens
    - Include a detailed README with setup, dev, build, test, and deploy instructions
    - Provide ADRs (Architecture Decision Records) folder with key decisions
    - Include contribution guidelines and code of conduct files

11. **Future-ready hooks:**
    - Leave placeholders and context for integrating AI-powered features later (e.g., recommendations, smart alerts)
    - Add telemetry hooks for user interaction tracking (stubbed with no backend integration initially)
    - Prepare for multi-language and accessibility-first growth

12. **Do NOT include:**
    - Firebase Authentication
    - Firebase Storage or Firestore
    - Firebase Hosting config (assume you will deploy to Vercel or other platform)
    - Any backend server code besides mock API (MSW)

---

### Deliverables:

- Full frontend source code with all above features and tooling configured
- Clean, modular, documented TypeScript React code
- Storybook running with documented components and accessibility reports
- Test suites runnable with coverage reports and accessibility checks
- GitHub Actions workflows ready to use, including accessibility audit
- Example `.github` issue and PR templates enforcing contribution standards
- README with all instructions for local dev, testing, and build
- Mock API using MSW with realistic data shapes for Ambari REST endpoints
- Recommended VSCode settings included in repo
- Monorepo workspace configs (pnpm or yarn) included

---

### Extra notes for AI:

- Use only public NPM packages
- Follow latest React and Next.js best practices as of 2025
- Prioritize maintainability, scalability, and developer DX
- Keep accessibility (WCAG 2.1 AA) in mind for all UI components and workflows
- Make it visually appealing with modern UI patterns, consistent spacing, and the reddish-orange/white theme
- Organize code to support large teams with clear separation of concerns

---

## Style Guidelines:

- Primary color: Reddish-orange (#FF4500) to align with the branding, conveying energy and action.
- Background color: Very light orange (#FAF0E6), almost white, to provide a clean and accessible backdrop.
- Accent color: A slightly darker reddish-orange (#D43A00) used for interactive elements and highlights, ensuring sufficient contrast.
- Body font: 'Inter', a sans-serif font, for a modern and neutral look.
- Headline font: 'Space Grotesk', a sans-serif font, for headings to give a computerized, techy, scientific feel.
- Use consistent and modern icons from a library like FontAwesome or Material Icons.
- Employ a grid-based layout for consistency, with responsive design for various screen sizes.
- Include a dark mode toggle with suitable contrast adjustments.
