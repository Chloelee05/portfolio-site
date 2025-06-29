#!/bin/bash
cd frontend
npm run build
cd ..
cp -r frontend/build/static/* static/
echo "✅ React build and Flask static updated"
