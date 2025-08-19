# Lib Package

This package contains shared, non-UI code, including core utilities and TypeScript type definitions, that are used across the entire AmberOps Console monorepo.

## In-Depth Overview

- **Purpose**: To provide a centralized location for foundational code that is shared between multiple applications and packages. This avoids code duplication and ensures that different parts of the project are working with the same data structures and helper functions.

- **Key Contents**:
  - **`src/types.ts`**: This is one of the most critical files in the project. It defines all the core **TypeScript types** used throughout the application, such as `Cluster`, `Service`, `Host`, `Alert`, `User`, etc. By sharing these types, we ensure type safety and consistency between the API layer and the UI components.
  - **`src/utils.ts`**: Contains common utility functions. A key example is the `cn` function, which intelligently merges Tailwind CSS classes using `clsx` and `tailwind-merge`. This is essential for building flexible and overridable UI components.

- **Usage**: Both the `apps/web` application and the `packages/ui` component library import types and utilities from this package. For example, a data table component in `packages/ui` will use the `Cluster` type from this package to define its expected data shape.
