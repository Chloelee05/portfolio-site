#!/bin/bash
cd frontend
npm run build
cd ..
cp -r frontend/build/static/* static/
cp frontend/build/index.html templates/index.html
echo "✅ React build and Flask static updated"
