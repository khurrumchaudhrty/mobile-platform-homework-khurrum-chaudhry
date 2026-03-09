#!/usr/bin/env bash
set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "==> Starting Metro"
(cd "$ROOT_DIR/app" && npm install && npm start -- --reset-cache) &

echo "==> Starting Groq proxy"
(cd "$ROOT_DIR/server" && npm install && npm start) &

echo "==> Preparing Android (reverse port)"
adb reverse tcp:8081 tcp:8081 || true
adb reverse tcp:8787 tcp:8787 || true

echo "==> Preparing Web"
(cd "$ROOT_DIR/web" && npm install && npm run dev) &

echo "==> Done. Use Android Studio and Xcode to run apps."
wait
