#!/bin/bash

# Create .env format for Vercel from Firebase JSON
# Usage: ./scripts/create-env-for-vercel.sh path/to/firebase.json

if [ -z "$1" ]; then
  echo "❌ Error: Please provide path to Firebase JSON file"
  echo ""
  echo "Usage:"
  echo "  ./scripts/create-env-for-vercel.sh ~/Downloads/firebase-xxxxx.json"
  exit 1
fi

FIREBASE_JSON="$1"

if [ ! -f "$FIREBASE_JSON" ]; then
  echo "❌ Error: File not found: $FIREBASE_JSON"
  exit 1
fi

echo "🔍 Converting Firebase JSON to .env format..."

# Convert to single line using Node.js
SINGLE_LINE=$(node -e "console.log(JSON.stringify(JSON.parse(require('fs').readFileSync('$FIREBASE_JSON', 'utf8'))))")

# Create .env file
OUTPUT_FILE="firebase-for-vercel.env"
echo "FIREBASE_SERVICE_ACCOUNT=$SINGLE_LINE" > "$OUTPUT_FILE"

echo "✅ Created: $OUTPUT_FILE"
echo ""
echo "📋 You can now:"
echo "   1. Copy the contents: cat $OUTPUT_FILE"
echo "   2. Paste into Vercel Dashboard → Settings → Environment Variables"
echo ""
echo "Or use Vercel CLI:"
echo "   vercel env add FIREBASE_SERVICE_ACCOUNT production < $OUTPUT_FILE"
echo ""
cat "$OUTPUT_FILE"
