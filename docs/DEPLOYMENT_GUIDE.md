# AmberOps Console: Deployment Guide

This guide provides comprehensive instructions for deploying the AmberOps Console to various platforms. The project's multi-service monorepo architecture is flexible and can be deployed to modern cloud platforms like Vercel and Netlify, or as a set of Docker containers on services like AWS.

## 1. Core Deployment Concepts

- **Multi-Service Architecture**: The project consists of multiple independent applications (`home`, `web`, `admin`) and services (`auth`, `backend`). Each must be deployed and managed.
- **Environment Variables**: The entire stack is configured via environment variables. A complete set of required variables can be found in the `.env.example` file at the project root. You **must** provide values for these variables in your deployment environment.
- **Database**: The `auth` and `backend` services require a MongoDB database. For production, it is highly recommended to use a managed database service like **MongoDB Atlas**.
- **CORS**: For security, the backend services use a CORS (Cross-Origin Resource Sharing) policy. You must configure the `CORS_ORIGINS` environment variable with the public URLs of your frontend applications.

---

## 2. Environment Variable Configuration

Before any deployment, you must set the following environment variables in your chosen platform's settings.

| Variable                 | Description                                                                                           | Example (Production)                |
| ------------------------ | ----------------------------------------------------------------------------------------------------- | ----------------------------------- |
| `MONGODB_URI`            | The connection string for your production MongoDB database.                                           | `mongodb+srv://...`                 |
| `JWT_SECRET`             | A strong, random string (at least 32 characters) for signing session tokens.                            | `your-randomly-generated-secret`    |
| `SESSION_SECRET`         | A strong, random string for session management in the auth service.                                   | `another-randomly-generated-secret` |
| `COOKIE_DOMAIN`          | **Crucial for production**. The root domain for session cookies (e.g., `.your-app.com`).               | `.amberops.com`                     |
| `CORS_ORIGINS`           | Comma-separated list of your frontend application URLs.                                               | `https://app.amberops.com,https://admin.amberops.com` |
| `NEXT_PUBLIC_HOME_URL`   | The public URL of your `home` application.                                                            | `https://amberops.com`              |
| `NEXT_PUBLIC_WEB_URL`    | The public URL of your `web` (dashboard) application.                                                 | `https://app.amberops.com`          |
| `NEXT_PUBLIC_ADMIN_URL`  | The public URL of your `admin` application.                                                           | `https://admin.amberops.com`        |
| `NEXT_PUBLIC_AUTH_API_URL` | The public URL of your deployed `auth` service.                                                         | `https://auth.api.amberops.com/api` |
| `GEMINI_API_KEY`         | (Optional) Your Google Gemini API key to enable AI features.                                          | `your-gemini-api-key`               |

---

## 3. Deployment to Vercel (Frontend Apps)

Vercel is an excellent platform for deploying the Next.js frontend applications (`home`, `web`, `admin`).

### Step 1: Import Your Git Repository

In your Vercel dashboard, create a new project and import your forked Git repository.

### Step 2: Configure Each Application

You will need to create a separate Vercel project for **each frontend application** (`home`, `web`, `admin`).

For each Vercel project, configure the following settings:

- **Root Directory**: Select the directory for the specific application (e.g., `apps/web`).
- **Build Command**: `pnpm build`
- **Output Directory**: `.next`
- **Install Command**: `pnpm install`

### Step 3: Set Environment Variables

In the settings for each Vercel project, add all the required environment variables from the list above. Ensure the URLs point to your live Vercel deployment URLs and your backend service URLs (from Render, see below).

---

## 4. Deployment to Render (Backend Services)

Render is a great choice for deploying the Node.js backend services (`auth` and `backend`).

### Step 1: Create New Web Services

In your Render dashboard, you will create a new **Web Service** for each of the two backend applications.

### Step 2: Configure Each Service

You will need to repeat this configuration process for both the `auth` service and the `backend` service.

- **Connect Repository**: Connect your Git repository where the monorepo is stored.
- **Service Settings**:
  - **Name**: Give your service a unique name (e.g., `amberops-auth` or `amberops-backend`).
  - **Runtime**: Select `Node`.
  - **Root Directory**: Set this to the specific app's directory (e.g., `apps/auth` or `apps/backend`).
  - **Build Command**: `pnpm install; pnpm build`
  - **Start Command**: `pnpm start`

### Step 3: Add Environment Variables

Navigate to the **Environment** tab for each of your newly created services.

- Add all the required environment variables from the list in Section 2.
- **Important**: The `CORS_ORIGINS` variable on your backend services must include the live URLs of your Vercel frontend deployments.
- The `NEXT_PUBLIC_AUTH_API_URL` variable on your frontend apps must point to your live Render URL for the `auth` service (e.g., `https://amberops-auth.onrender.com/api`).

---

## 5. Deployment with Docker (AWS, Google Cloud, etc.)

This method is the most flexible and is recommended for production environments where you have full control, such as AWS ECS, Google Cloud Run, or a dedicated server.

### Step 1: Set Up Infrastructure

- **Database**: Provision a production-ready MongoDB instance (e.g., MongoDB Atlas).
- **Container Registry**: Set up a container registry to store your Docker images (e.g., Amazon ECR, Docker Hub).

### Step 2: Build and Push Docker Images

The provided `Dockerfile` is a multi-stage build file that can create optimized images for each service.

Build and push an image for each service:

```bash
# Example for the 'web' application
docker build --target frontend --build-arg APP_NAME=web -t your-registry/amberops-web:latest .
docker push your-registry/amberops-web:latest

# Example for the 'backend' service
docker build --target backend --build-arg APP_NAME=backend -t your-registry/amberops-backend:latest .
docker push your-registry/amberops-backend:latest

# Repeat for all 5 services (web, home, admin, auth, backend)
```

### Step 3: Deploy the Containers

Deploy the containers to your chosen cloud platform (e.g., AWS ECS, Kubernetes).

- **Configuration**: When running the containers, inject the required environment variables. Make sure the database URI, JWT secrets, and inter-service URLs are correctly set for your production environment.
- **Networking**: Configure your cloud platform's networking to allow the services to communicate with each other. For example, the frontend apps need to be able to make requests to the `auth` and `backend` services.
- **Reverse Proxy**: Set up a reverse proxy (like NGINX or an AWS Application Load Balancer) to route incoming traffic to the correct frontend application based on the hostname (e.g., `app.yourdomain.com` -> `web` container, `admin.yourdomain.com` -> `admin` container).
