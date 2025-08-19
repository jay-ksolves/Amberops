# Standalone Backend API Service (Node.js/Express)

This directory contains the primary backend API service for the AmberOps Console, built with Node.js, Express, and Mongoose. It follows a modern, scalable, and modular architecture to ensure maintainability and ease of development.

## Architecture Overview

The backend is structured using a layered approach to separate concerns, making the codebase clean, organized, and easy to extend.

- **`src/models`**: Defines all the Mongoose schemas for the application's data entities (e.g., `user.model.ts`, `cluster.model.ts`). This is the data layer.
- **`src/services`**: Contains the core business logic. Each service (e.g., `user.service.ts`) is responsible for interacting with the models to perform database operations (CRUD).
- **`src/controllers`**: Handles the incoming HTTP requests. Controllers (e.g., `user.controller.ts`) orchestrate the flow by calling the appropriate services and sending back the response. They contain the request/response handling logic.
- **`src/api/routes`**: Defines the API endpoints for each resource (e.g., `user.routes.ts`). These files map HTTP verbs and URL paths to specific controller functions. They are also annotated with JSDoc comments to generate the API documentation.
- **`src/api/index.ts`**: The main API router that aggregates all the individual resource routes and mounts them under the `/api/v1` prefix.
- **`src/utils`**: Contains utility functions, such as the centralized `error-handler.ts`.
- **`src/config`**: Contains configuration files, such as the setup for our interactive API documentation.
- **`src/index.ts`**: The main entry point for the server. It initializes the Express app, connects to the database, and sets up all global middleware like CORS, Helmet (for security), and rate limiting.

### Request Flow

A typical request flows through the application as follows:
`index.ts` -> `api/index.ts` -> `api/routes/*.routes.ts` -> `controllers/*.controller.ts` -> `services/*.service.ts` -> `models/*.model.ts`

## Production-Ready Features

- **Security**: Uses `helmet` to apply essential security headers, protecting against common web vulnerabilities.
- **Rate Limiting**: Implements global rate limiting with `express-rate-limit` to prevent API abuse.
- **Centralized Error Handling**: A dedicated middleware ensures that all errors are caught and returned in a consistent JSON format with the correct HTTP status codes.
- **Interactive API Documentation**: The entire API is documented using Swagger/OpenAPI and is available at the `/api-docs` endpoint when the server is running. This provides a live, interactive way to explore and test API endpoints.

## Running Locally

This service is designed to run as part of the overall development environment.

To start this service along with all other applications, run the following command from the root of the monorepo:

```bash
sh run.sh
```

The backend service will start on port `3004` by default. All AmberOps frontend applications are configured to send their API requests to this service.
