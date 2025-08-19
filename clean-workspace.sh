#!/bin/bash

# This script cleans the entire workspace by removing all generated
# artifacts, caches, and installed dependencies. It's useful for
# starting from a completely clean state before a fresh build.

# Exit immediately if a command exits with a non-zero status.
set -e

echo "--- Starting workspace cleanup ---"

# 1. Kill any running processes on the project ports
echo "--- Stopping any running development servers ---"
sh ./kill-ports.sh

# 2. Remove all node_modules directories
echo "--- Removing all node_modules directories ---"
find . -name "node_modules" -type d -prune -exec rm -rf '{}' +

# 3. Remove all .next build cache directories
echo "--- Removing all .next build caches ---"
find ./apps -name ".next" -type d -prune -exec rm -rf '{}' +

# 4. Remove all dist build output directories
echo "--- Removing all dist build outputs ---"
find ./apps -name "dist" -type d -prune -exec rm -rf '{}' +
find ./packages -name "dist" -type d -prune -exec rm -rf '{}' +

# 5. Remove the root lockfile
if [ -f "pnpm-lock.yaml" ]; then
  echo "--- Removing pnpm-lock.yaml ---"
  rm -f pnpm-lock.yaml
fi

# 6. Remove test reports and other cache folders
echo "--- Removing test reports and Storybook cache ---"
rm -rf playwright-report/
rm -rf storybook-static/

echo "--- Workspace cleanup complete! ---"
echo "You can now run 'sh build-workspace.sh' for a fresh setup."
