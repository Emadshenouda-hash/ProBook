#!/usr/bin/env node

/**
 * Firebase Service Account → Vercel Environment Variable Helper
 * 
 * Usage:
 *   node scripts/prepare-firebase-env.js path/to/firebase-service-account.json
 * 
 * This will:
 * 1. Read your Firebase service account JSON file
 * 2. Validate it's correct format
 * 3. Convert to single line
 * 4. Copy to clipboard (if possible)
 * 5. Show instructions for adding to Vercel
 */

const fs = require('fs');
const path = require('path');

// ANSI colors for terminal
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    log('\n🔥 Firebase Service Account → Vercel Environment Variable Helper\n', 'cyan');
    log('Usage:', 'yellow');
    log('  node scripts/prepare-firebase-env.js <path-to-firebase-json>\n', 'reset');
    log('Example:', 'yellow');
    log('  node scripts/prepare-firebase-env.js ~/Downloads/probooksolution-b724f-xxxxx.json\n', 'reset');
    log('What this does:', 'yellow');
    log('  1. Validates your Firebase service account JSON');
    log('  2. Converts it to single-line format for Vercel');
    log('  3. Displays the value ready to copy');
    log('  4. Shows instructions for adding to Vercel\n');
    process.exit(0);
  }

  const filePath = args[0];

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    log(`\n❌ Error: File not found: ${filePath}\n`, 'red');
    process.exit(1);
  }

  log('\n🔍 Reading Firebase service account file...', 'cyan');

  try {
    // Read and parse JSON
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(fileContent);

    // Validate required fields
    const requiredFields = [
      'type',
      'project_id',
      'private_key_id',
      'private_key',
      'client_email',
      'client_id'
    ];

    const missingFields = requiredFields.filter(field => !json[field]);

    if (missingFields.length > 0) {
      log(`\n❌ Error: Missing required fields: ${missingFields.join(', ')}\n`, 'red');
      process.exit(1);
    }

    // Validate it's a service account
    if (json.type !== 'service_account') {
      log('\n❌ Error: This is not a service account JSON file\n', 'red');
      log('Expected type: "service_account"', 'yellow');
      log(`Got: "${json.type}"\n`, 'yellow');
      process.exit(1);
    }

    log('✅ Valid Firebase service account JSON', 'green');
    log(`   Project: ${json.project_id}`, 'reset');
    log(`   Email: ${json.client_email}\n`, 'reset');

    // Convert to single line
    const singleLine = JSON.stringify(json);

    log('✅ Converted to single-line format', 'green');
    log(`   Length: ${singleLine.length} characters\n`, 'reset');

    // Save to file
    const outputPath = path.join(__dirname, 'firebase-env-value.txt');
    fs.writeFileSync(outputPath, singleLine);
    log(`✅ Saved to: ${outputPath}\n`, 'green');

    // Display instructions
    log('═══════════════════════════════════════════════════════════════', 'cyan');
    log('  📋 COPY THIS VALUE (starts below the line):', 'cyan');
    log('═══════════════════════════════════════════════════════════════', 'cyan');
    console.log(singleLine);
    log('═══════════════════════════════════════════════════════════════', 'cyan');
    log('  📋 END OF VALUE (copy everything above this line)', 'cyan');
    log('═══════════════════════════════════════════════════════════════\n', 'cyan');

    log('📝 NEXT STEPS:', 'yellow');
    log('─────────────────────────────────────────────────────────────────\n', 'yellow');
    
    log('1. Copy the value above (everything between the lines)', 'cyan');
    log('   OR read from file: cat scripts/firebase-env-value.txt\n', 'cyan');

    log('2. Go to Vercel Dashboard:', 'cyan');
    log('   https://vercel.com/dashboard → Your Project → Settings\n', 'cyan');

    log('3. Add Environment Variable:', 'cyan');
    log('   Name:  FIREBASE_SERVICE_ACCOUNT', 'reset');
    log('   Value: [paste the copied value]', 'reset');
    log('   Environments: ✓ Production, ✓ Preview, ✓ Development\n', 'cyan');

    log('4. Save and Redeploy:', 'cyan');
    log('   git commit --allow-empty -m "Add Firebase env var"', 'reset');
    log('   git push origin main\n', 'cyan');

    log('5. Test the integration:', 'cyan');
    log('   https://yourdomain.com/api/test-firebase\n', 'cyan');

    log('✅ Done! The value is ready to paste into Vercel.\n', 'green');

  } catch (error) {
    if (error instanceof SyntaxError) {
      log('\n❌ Error: Invalid JSON file\n', 'red');
      log('Make sure this is a valid Firebase service account JSON file.', 'yellow');
      log('Download it from: Firebase Console → Settings → Service Accounts → Generate New Private Key\n', 'yellow');
    } else {
      log(`\n❌ Error: ${error.message}\n`, 'red');
    }
    process.exit(1);
  }
}

main();
