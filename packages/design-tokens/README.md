# Design Tokens Package

This package is the single source of truth for all styling and design-related configurations in the AmberOps Console. It ensures a consistent and cohesive visual identity across all applications and components.

## In-Depth Overview

- **Purpose**: To centralize the application's design system, making it easy to manage and update the look and feel from one place. By sharing these tokens, we guarantee that both the `home` and `web` applications, as well as all components in `packages/ui`, have a unified appearance.

- **Key Contents**:
  - **`tailwind.config.ts`**: This is the shared **Tailwind CSS** configuration file. It defines:
    - **Color Palette**: A comprehensive set of CSS variables for all colors used in the application, including `primary`, `secondary`, `destructive`, `background`, etc. It includes definitions for both **light and dark modes**.
    - **Typography**: Defines the `fontFamily` for body text (`Inter`) and headlines (`Space Grotesk`).
    - **Spacing & Sizing**: Custom spacing, border radius, and other core theme values.
  - **`globals.css`**: A global CSS file that includes Tailwind's base styles and defines the color variables for `:root` (light mode) and `.dark` (dark mode).

- **Usage**: The `tailwind.config.ts` files in both the `apps/home` and `apps/web` applications import this shared configuration as a preset. This means any change made in this package will automatically be reflected everywhere, ensuring visual consistency.
