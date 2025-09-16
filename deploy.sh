#!/bin/bash

# Deployment script for Thought Trap Escape
# This script helps prepare the game for deployment

echo "🎯 Thought Trap Escape - Deployment Script"
echo "=========================================="

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ Error: index.html not found. Please run this script from the project root directory."
    exit 1
fi

echo "✅ Project files found"

# Create deployment directory
DEPLOY_DIR="dist"
if [ -d "$DEPLOY_DIR" ]; then
    echo "🗑️  Cleaning existing deployment directory..."
    rm -rf "$DEPLOY_DIR"
fi

echo "📁 Creating deployment directory..."
mkdir -p "$DEPLOY_DIR"

# Copy essential files
echo "📋 Copying files..."
cp index.html "$DEPLOY_DIR/"
cp styles.css "$DEPLOY_DIR/"
cp config.js "$DEPLOY_DIR/"
cp game-data.js "$DEPLOY_DIR/"
cp game-logic.js "$DEPLOY_DIR/"
cp README.md "$DEPLOY_DIR/"
cp package.json "$DEPLOY_DIR/"

# Optional: Copy test file for debugging
if [ "$1" = "--include-test" ]; then
    echo "🧪 Including test file..."
    cp test.html "$DEPLOY_DIR/"
fi

# Create a simple server script for the deployment
cat > "$DEPLOY_DIR/serve.py" << 'EOF'
#!/usr/bin/env python3
"""
Simple HTTP server for Thought Trap Escape
Usage: python3 serve.py [port]
Default port: 8000
"""
import http.server
import socketserver
import sys
import os

# Change to the directory containing this script
os.chdir(os.path.dirname(os.path.abspath(__file__)))

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
    print(f"🚀 Serving Thought Trap Escape at http://localhost:{PORT}")
    print("📱 Open this URL in your web browser to play the game")
    print("⏹️  Press Ctrl+C to stop the server")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n👋 Server stopped")
EOF

chmod +x "$DEPLOY_DIR/serve.py"

# Create a batch file for Windows users
cat > "$DEPLOY_DIR/serve.bat" << 'EOF'
@echo off
echo Starting Thought Trap Escape server...
python serve.py 8000
pause
EOF

# Create deployment info
cat > "$DEPLOY_DIR/DEPLOYMENT.md" << EOF
# Deployment Information

## Files Included
- \`index.html\` - Main game interface
- \`styles.css\` - Game styling and animations
- \`config.js\` - Game configuration
- \`game-data.js\` - Thought traps and keys data
- \`game-logic.js\` - Main game logic
- \`README.md\` - Project documentation
- \`package.json\` - Project metadata

## Running the Game

### Option 1: Direct File Access
Simply open \`index.html\` in a modern web browser.

### Option 2: Local Server (Recommended)
For better performance and to avoid CORS issues:

**Python 3:**
\`\`\`bash
python3 serve.py [port]
\`\`\`

**Python 2:**
\`\`\`bash
python -m SimpleHTTPServer 8000
\`\`\`

**Node.js (if you have it installed):**
\`\`\`bash
npx http-server -p 8000
\`\`\`

**Windows:**
Double-click \`serve.bat\`

### Option 3: Web Server
Upload all files to any web server that supports static files.

## Browser Requirements
- Modern browser with ES6+ support
- JavaScript enabled
- Local storage support (for settings persistence)

## Deployment Date
$(date)

## Version
1.0.0
EOF

echo "✨ Deployment complete!"
echo ""
echo "📁 Files copied to: $DEPLOY_DIR/"
echo "🚀 To run the game:"
echo "   cd $DEPLOY_DIR"
echo "   python3 serve.py"
echo "   Then open http://localhost:8000 in your browser"
echo ""
echo "📖 See $DEPLOY_DIR/DEPLOYMENT.md for more deployment options"