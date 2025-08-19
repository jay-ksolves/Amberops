#!/bin/sh

# This script finds and kills any processes running on the
# standard AmberOps Console development ports. It first tries `fuser`,
# then falls back to `lsof` for broader compatibility.

set -e

echo "--- Stopping any running development servers ---"

PORTS="3000 3001 3002 3003 3004"
FOUND_PROCESS=0

# Check if fuser is available
if command -v fuser >/dev/null 2>&1; then
  echo "Using 'fuser' to terminate processes..."
  for PORT in $PORTS; do
    if fuser -k -n tcp "$PORT" >/dev/null 2>&1; then
      echo "Process on port $PORT found and terminated."
      FOUND_PROCESS=1
    else
      echo "No process found on port $PORT."
    fi
  done
# Check if lsof is available
elif command -v lsof >/dev/null 2>&1; then
  echo "Using 'lsof' as a fallback to terminate processes..."
  for PORT in $PORTS; do
    # Use lsof to find the PID, -t for terse output (PID only)
    PID=$(lsof -t -i:$PORT || true)
    if [ -n "$PID" ]; then
      echo "Found process with PID $PID on port $PORT. Killing it..."
      # Forcefully kill the process
      kill -9 "$PID"
      echo "Process on port $PORT killed."
      FOUND_PROCESS=1
    else
      echo "No process found on port $PORT."
    fi
  done
else
  echo "Error: Neither 'fuser' nor 'lsof' commands are available. Cannot stop processes."
  exit 1
fi


if [ "$FOUND_PROCESS" -eq 1 ]; then
    echo "--- All running processes terminated. ---"
else
    echo "--- No running processes were found on the specified ports. ---"
fi
