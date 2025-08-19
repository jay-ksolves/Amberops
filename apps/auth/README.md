# Standalone Authentication Service (Node.js/Express)

This directory contains a complete, standalone authentication service built with Node.js, Express, and Mongoose. It handles user registration and login, providing JSON Web Tokens (JWTs) for session management.

## In-Depth Overview

- **Purpose**: To provide a dedicated, decoupled authentication service for the entire AmberOps platform. This is a common pattern in microservice architectures, enhancing security and scalability.

- **Technology**:
  - **Runtime**: Node.js
  - **Framework**: Express.js for routing and middleware.
  - **Database**: MongoDB with Mongoose for data modeling and validation.
  - **Authentication**: Uses `bcryptjs` for hashing passwords and `jsonwebtoken` for creating secure session tokens.
  - **Social Logins**: Integrated with Passport.js to support OAuth providers like Google and GitHub.
  - **CORS**: Configured to allow requests from the frontend applications.

- **API Endpoints**:
  - `POST /api/register`: Handles new user creation.
  - `POST /api/login`: Validates user credentials and returns a JWT.
  - `POST /api/forgot-password`: Initiates the password reset flow.
  - `POST /api/reset-password`: Completes the password reset flow.
  - `GET /api/auth/google`, `GET /api/auth/google/callback`: Routes for Google OAuth.
  - `GET /api/auth/github`, `GET /api/auth/github/callback`: Routes for GitHub OAuth.

## Running Locally

This service is designed to run as part of the overall development environment.

To start this service along with all other applications, run the following command from the root of the monorepo:

```bash
sh run.sh
```

The authentication service will start on port `3002` by default. The `apps/home` application is pre-configured to send its login and registration requests to this service.
