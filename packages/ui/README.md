# UI Package

This package is the heart of the AmberOps Console's design system. It contains a comprehensive library of reusable React components, their documentation, and their isolated development environment.

## In-Depth Overview

- **Purpose**: To provide a robust and consistent set of building blocks for the user interface. By creating a shared component library, we ensure that both the `home` and `web` applications have a unified look, feel, and behavior. This also accelerates development, as we can build complex UIs by composing these simple, pre-built components.

- **Technology**:
  - **Component Primitives**: Built on top of **Radix UI**, which provides a set of unstyled, accessible, and highly functional UI primitives.
  - **Styling**: Styled with **Tailwind CSS** using recipes from **ShadCN/UI**. This provides a great balance of pre-built styles and easy customizability.
  - **Development Environment**: Uses **Storybook** to create an interactive workshop for developing and showcasing components in isolation.

- **Key Contents**:
  - **`src/components/ui/`**: This directory contains all the core, reusable UI components, such as:
    - `Button.tsx`
    - `Card.tsx`
    - `Table.tsx`
    - `Dialog.tsx`
    - `Input.tsx`
    - `Select.tsx`
    - And many more.
  - **`src/stories/`**: This directory contains the **Storybook stories** for the components. Each story file (e.g., `Button.stories.tsx`) defines different states and variations of a component, allowing developers to see how it looks and behaves without needing to run the full application. The Storybook setup also includes the accessibility addon (`@storybook/addon-a11y`) to automatically check for and report accessibility issues.

- **Usage**: The `apps/home` and `apps/web` applications import these components directly to build their pages and features. For example, instead of creating a new button in the `web` app, a developer would simply `import { Button } from '@amberops/ui/components/ui/button'`.
