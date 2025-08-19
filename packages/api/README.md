# API Package

This package is responsible for managing the application's data layer, including the API client adapter, mock API for local development, and the definitions for all AI-powered flows.

## In-Depth Overview

- **Purpose**: To abstract away the data-fetching and AI logic from the UI components. This separation makes the application easier to test and allows the frontend to be developed independently of a live backend.

- **Key Contents**:
  - **`src/mocks/`**: This directory contains the entire mock API setup using **Mock Service Worker (MSW)**.
    - `mock-data.ts`: A collection of realistic, typed mock data for clusters, services, hosts, alerts, etc. This serves as the "database" for local development.
    - `handlers.ts`: Defines all the mock API route handlers. When the application makes an API request (e.g., `fetch('/api/v1/clusters')`), MSW intercepts it and returns the corresponding data from `mock-data.ts`, simulating a real backend response.
    - `browser.ts`: Sets up and starts the MSW worker for use in the browser.

  - **`src/ai/`**: This directory contains all the server-side AI logic built with **Google's Genkit**.
    - `genkit.ts`: Initializes and configures the Genkit instance with the necessary plugins (like `googleAI`).
    - `flows/`: Contains individual files for each AI-powered feature. For example, `summarize-cluster-health.ts` defines the Genkit flow, including the prompt and the input/output schemas (using Zod), for generating a cluster health summary.

- **Usage**: The `web` application imports from this package to fetch data (which is intercepted by MSW in development) and to call the exported AI functions as Server Actions.
