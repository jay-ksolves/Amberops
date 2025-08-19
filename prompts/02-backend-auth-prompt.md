# Master Prompt: Backend and Authentication Services

## 1. Project Goal

Your goal is to create two standalone backend services using Node.js, Express, and MongoDB. These services will provide the complete API layer for the AmberOps Console.

- **`auth` service**: Handles all user registration, login (including social OAuth), and JWT generation.
- **`backend` service**: Provides a protected REST API for all application data (clusters, services, hosts, etc.).

## 2. Core Technologies

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose for data modeling.
- **Authentication**: `bcryptjs` for password hashing, `jsonwebtoken` for session tokens.
- **Social Login**: `passport` with `passport-google-oauth20` and `passport-github2`.
- **API Documentation**: `swagger-jsdoc` and `swagger-ui-express` for generating interactive API docs.
- **Security**: `helmet` and `express-rate-limit`.

---

## 3. `auth` Service Implementation (`apps/auth`)

### A. Project Setup

- Initialize a Node.js project with a `package.json`.
- Dependencies: `express`, `mongoose`, `bcryptjs`, `jsonwebtoken`, `cors`, `dotenv`, `passport`, `passport-google-oauth20`, `passport-github2`, `express-session`, `@amberops/lib`.
- Dev Dependencies: `tsx`, `@types/*` for all dependencies.

### B. Database Model (`src/models/User.ts`)

- Create a Mongoose schema for the `User` model.
- It should include `name`, `email` (unique), `password` (select: false), `role` ('Admin', 'Operator', 'Viewer'), `avatar`, and `lastLogin`.
- Use the `User` type from `@amberops/lib`.

### C. Passport Configuration (`src/config/passport.ts`)

- Configure Passport.js strategies for Google and GitHub OAuth.
- If a user authenticates via OAuth and doesn't exist, create a new user account for them with the 'Viewer' role.
- Implement `serializeUser` and `deserializeUser`.

### D. Express Server (`src/index.ts`)

- Initialize an Express app.
- Configure CORS to allow requests from the frontend applications (specified in an environment variable `CORS_ORIGINS`).
- Connect to the MongoDB database using the `MONGODB_URI` environment variable.
- Set up session middleware required by Passport.
- Initialize Passport middleware.
- Mount the authentication routes.

### E. Authentication Routes (`src/routes/auth.ts`)

- **`POST /api/register`**:
  - Hash the password using `bcryptjs`.
  - Create a new user in the database.
  - Return a success message.
- **`POST /api/login`**:
  - Find the user by email.
  - Compare the provided password with the stored hash using `bcrypt.compare`.
  - If valid, create a JWT containing the user's ID, name, email, role, and avatar.
  - Set the JWT as a secure, `HttpOnly` cookie.
  - Respond with the JWT and a `redirectUrl` based on the user's role (`/admin` for Admins, `/dashboard` for others).
- **OAuth Routes**:
  - `GET /api/auth/google`, `GET /api/auth/google/callback`
  - `GET /api/auth/github`, `GET /api/auth/github/callback`
  - The callback handlers should use Passport to authenticate, generate a JWT, set it as a cookie, and then redirect the user to the appropriate frontend dashboard (`/admin` or `/dashboard`) with the JWT as a URL query parameter (`?token=...`) for client-side session initialization.

---

## 4. `backend` Service Implementation (`apps/backend`)

### A. Project Setup

- Initialize a Node.js project.
- Dependencies: `express`, `mongoose`, `cors`, `dotenv`, `helmet`, `express-rate-limit`, `jsonwebtoken`, `swagger-jsdoc`, `swagger-ui-express`.
- Dev Dependencies: `tsx`, `@types/*` for all dependencies.

### B. Layered Architecture

- **`src/models/`**: Define Mongoose schemas for all data entities: `Cluster`, `Service`, `Host`, `Alert`, `AlertDefinition`, `Task`, `LogEntry`, `ActivityLog`, and all public content types (`Documentation`, `Legal`, `PricingTier`, `Testimonial`, `FAQ`). Use types from `@amberops/lib`. Associate user-specific data with a `userId`.
- **`src/services/`**: Implement the business logic for each model. Create a `generic.service.ts` for common CRUD operations (findAll, findById, create, update, delete) that correctly handle filtering by `userId`. Create specific services for more complex logic like `search.service.ts`.
- **`src/controllers/`**: Handle HTTP request/response logic. Each controller should call the appropriate service function(s) and send back the JSON response.
- **`src/api/routes/`**: Define the Express routers for each resource, mapping endpoints to controller functions. Annotate all endpoints with JSDoc comments for Swagger.
- **`src/middleware/`**:
  - **`auth.middleware.ts`**: Create a middleware that verifies the `Authorization: Bearer <token>` header on incoming requests. If the JWT is valid, it should decode the payload and attach the user's ID and role to the `req` object. If invalid, it should return a 401 Unauthorized error.
- **`src/utils/`**:
  - **`error-handler.ts`**: A centralized error handling middleware that catches all errors and returns them in a consistent JSON format.

### C. Express Server (`src/index.ts`)

- Initialize the Express app.
- Apply global middleware: `helmet`, `cors`, `express.json`.
- Configure and apply `express-rate-limit` to all protected routes.
- **Swagger Setup**: Configure `swagger-jsdoc` to parse the JSDoc comments from the route files. Use `swagger-ui-express` to serve the interactive documentation at the `/api-docs` endpoint.
- **Routing**:
  - Mount a `publicRouter` at `/api/v1/public`. These routes should **not** use the `authMiddleware`.
  - Mount a `protectedRouter` at `/api/v1/app`. All routes under this path **must** be protected by the `authMiddleware` and the rate limiter.

### D. API Endpoints

- **Public Router (`/api/v1/public`)**:
  - `GET` endpoints for all public content (documentation, pricing, testimonials, FAQs, legal).
  - `POST`, `PUT`, `DELETE` endpoints for managing this content, which **must** be protected by the `authMiddleware`.
- **Protected Router (`/api/v1/app`)**:
  - Full CRUD endpoints for `Users`, `Clusters`, `Services`, `Hosts`, `Alerts`, `AlertDefinitions`, `Tasks`, `ActivityLogs`, `LogEntries`. All of these must be protected and operate within the scope of the authenticated user's `userId`.
  - A `GET /search` endpoint that performs a global search across multiple collections.
