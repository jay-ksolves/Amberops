#!/bin/bash

# This script sets up the entire workspace for development.
# It ensures Node.js and pnpm are installed, installs all
# dependencies, and then runs builds and tests to verify the setup.

# Exit immediately if a command exits with a non-zero status.
set -e

# --- 1. Check for Node.js and nvm ---
echo "--- Checking for Node.js (v20.x) and nvm ---"
# Check if nvm is installed
if [ -d "$HOME/.nvm" ]; then
  echo "nvm is already installed."
  # Source nvm script to make it available in this shell
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
else
  echo "nvm not found. Installing nvm..."
  # Install nvm
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
  # Source nvm script to make it available now
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
  echo "nvm installed successfully."
fi

# Install and use Node.js v20
echo "Installing and using Node.js v20.x..."
nvm install 20
nvm use 20

# --- 2. Enable pnpm with Corepack ---
echo "--- Enabling pnpm ---"
# Use corepack (the recommended way with modern Node.js) to manage pnpm
corepack enable
corepack prepare pnpm@latest --activate
echo "pnpm is enabled."

# --- 3. Install Dependencies ---
echo "--- Installing project dependencies with pnpm ---"
pnpm install

# --- 4. Build Everything ---
echo "--- Building all applications and packages ---"
pnpm build

echo "--- Building Storybook ---"
pnpm build-storybook

# --- 5. Run Tests ---
echo "--- Running Playwright E2E tests ---"
npx playwright install --with-deps # Ensure browsers are installed
pnpm test:e2e

echo "--- Workspace setup complete and verified! ---"
echo "You can now run 'sh run.sh' to start the development servers."
