#!/bin/bash

# Firebase Integration Test Script
# Tests all aspects of Firebase integration

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                                                                ║"
echo "║     🔥 FIREBASE INTEGRATION TEST SUITE 🔥                     ║"
echo "║                                                                ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

DOMAIN=${1:-"yourdomain.com"}

if [ "$DOMAIN" = "yourdomain.com" ]; then
  echo "⚠️  Please provide your domain:"
  echo "   ./scripts/test-firebase.sh probooksolutions.com"
  echo ""
  read -p "Enter your domain (without https://): " DOMAIN
fi

echo "Testing domain: $DOMAIN"
echo ""

# Test 1: Check test endpoint
echo "┌────────────────────────────────────────────────────────────────┐"
echo "│ TEST 1: Firebase Test Endpoint                                │"
echo "└────────────────────────────────────────────────────────────────┘"

RESPONSE=$(curl -s "https://$DOMAIN/api/test-firebase")
STATUS=$(echo "$RESPONSE" | grep -o '"status":"[^"]*"' | cut -d'"' -f4)

if [ "$STATUS" = "OK" ]; then
  echo "✅ Test endpoint returned: OK"
  echo "   Firebase Admin SDK is initialized"
else
  echo "❌ Test endpoint returned: $STATUS"
  echo "   Response: $RESPONSE"
  echo ""
  echo "⚠️  Firebase may not be configured correctly"
  echo "   Check: FIREBASE_SERVICE_ACCOUNT in Vercel environment variables"
fi

echo ""

# Test 2: Check if Firestore is accessible
echo "┌────────────────────────────────────────────────────────────────┐"
echo "│ TEST 2: Firestore Database                                    │"
echo "└────────────────────────────────────────────────────────────────┘"

FIRESTORE=$(echo "$RESPONSE" | grep -o '"firestore":[^,]*' | cut -d':' -f2)

if [ "$FIRESTORE" = "true" ]; then
  echo "✅ Firestore is accessible"
else
  echo "❌ Firestore is not accessible"
  echo "   Check: Firebase Console → Firestore Database → Create database"
fi

echo ""

# Test 3: Check if Storage is accessible
echo "┌────────────────────────────────────────────────────────────────┐"
echo "│ TEST 3: Firebase Storage                                      │"
echo "└────────────────────────────────────────────────────────────────┘"

STORAGE=$(echo "$RESPONSE" | grep -o '"storage":[^,]*' | cut -d':' -f2)

if [ "$STORAGE" = "true" ]; then
  echo "✅ Storage is accessible"
else
  echo "❌ Storage is not accessible"
  echo "   Check: Firebase Console → Storage → Get started"
fi

echo ""

# Test 4: Project info
echo "┌────────────────────────────────────────────────────────────────┐"
echo "│ TEST 4: Project Information                                   │"
echo "└────────────────────────────────────────────────────────────────┘"

PROJECT_ID=$(echo "$RESPONSE" | grep -o '"projectId":"[^"]*"' | cut -d'"' -f4)

if [ ! -z "$PROJECT_ID" ]; then
  echo "✅ Project ID: $PROJECT_ID"
  
  BUCKET=$(echo "$RESPONSE" | grep -o '"bucketName":"[^"]*"' | cut -d'"' -f4)
  if [ ! -z "$BUCKET" ]; then
    echo "✅ Storage Bucket: $BUCKET"
  fi
  
  COLLECTIONS=$(echo "$RESPONSE" | grep -o '"collections":\[[^]]*\]')
  if [ ! -z "$COLLECTIONS" ]; then
    echo "✅ Firestore Collections: $COLLECTIONS"
  fi
else
  echo "⚠️  Could not retrieve project info"
fi

echo ""

# Test 5: Manual test instructions
echo "┌────────────────────────────────────────────────────────────────┐"
echo "│ TEST 5: Manual Verification Steps                             │"
echo "└────────────────────────────────────────────────────────────────┘"
echo ""
echo "📝 To complete testing, do these manual checks:"
echo ""
echo "1. Submit Contact Form:"
echo "   → Visit: https://$DOMAIN/contact"
echo "   → Submit test message"
echo "   → Check Firebase Console → Firestore → contact_submissions"
echo "   → Should see new document"
echo ""
echo "2. Upload Photo (Admin):"
echo "   → Visit: https://$DOMAIN/admin"
echo "   → Login with admin password"
echo "   → Go to Photo Manager"
echo "   → Upload test image"
echo "   → Check Firebase Console → Storage → website/"
echo "   → Should see uploaded file"
echo ""
echo "3. Check Vercel Logs:"
echo "   → Run: vercel logs | grep firebase"
echo "   → Should see: 'Firebase Admin initialized successfully'"
echo ""

# Summary
echo "┌────────────────────────────────────────────────────────────────┐"
echo "│ SUMMARY                                                        │"
echo "└────────────────────────────────────────────────────────────────┘"

if [ "$STATUS" = "OK" ] && [ "$FIRESTORE" = "true" ] && [ "$STORAGE" = "true" ]; then
  echo "✅ All automated tests passed!"
  echo "   Firebase is properly configured and working."
  echo ""
  echo "   Now test real features (contact form, photo upload)"
  echo "   to verify end-to-end functionality."
else
  echo "❌ Some tests failed."
  echo "   Review the errors above and check:"
  echo "   1. FIREBASE_SERVICE_ACCOUNT is set in Vercel"
  echo "   2. Firebase Console has Firestore and Storage enabled"
  echo "   3. Service account JSON is valid"
fi

echo ""
echo "Full response from test endpoint:"
echo "$RESPONSE" | jq . 2>/dev/null || echo "$RESPONSE"
