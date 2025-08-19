#!/bin/sh

# This script starts all development servers as background processes
# within the current terminal session.

# Exit immediately if a command exits with a non-zero status.
set -e

# --- 1. Kill any running processes on the project ports ---
echo "--- Checking for and stopping any running services... ---"
# Use a subshell to run kill-ports.sh to avoid script termination issues
(sh ./kill-ports.sh)
echo "--- Port check complete. ---"


# --- 2. Start Development Servers ---
echo "--- Starting all development servers in the background ---"
echo "Home: http://localhost:3001"
echo "Web: http://localhost:3000"
echo "Admin: http://localhost:3003"
echo "Auth Service: Port 3002"
echo "Backend Service: Port 3004"
echo "-------------------------------------------------------"

pnpm dev:backend &
pnpm dev:auth &
pnpm dev:home &
pnpm dev:admin &
pnpm dev &

echo "✅ All services have been started as background processes."
echo "You can view their logs in this terminal window."
echo "To stop all services, run 'sh kill-ports.sh' or 'pnpm stop'."
wait
