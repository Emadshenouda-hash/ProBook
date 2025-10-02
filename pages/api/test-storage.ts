import type { NextApiRequest, NextApiResponse } from 'next';
import { getFirebaseStorage } from '../../utils/firebase';

function normalize(name?: string): string | undefined {
  if (!name) return undefined;
  let n = name.trim();
  n = n.replace(/^gs:\/\//, '').replace(/^https?:\/\//, '');
  if (n.startsWith('storage.googleapis.com')) {
    const parts = n.split('/');
    n = parts[1] || '';
  }
  return n;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const storage = getFirebaseStorage();
    if (!storage) {
      return res.status(500).json({
        status: 'ERROR',
        message: 'Firebase Storage not initialized',
      });
    }

    const envBucketRaw = process.env.FIREBASE_STORAGE_BUCKET;
    const envBucket = normalize(envBucketRaw);
    const defaultBucket = storage.bucket();
    const defaultBucketName = defaultBucket.name;

    const candidates: string[] = [];
    if (envBucket) {
      candidates.push(envBucket);
      // Add cross-variant for convenience
      if (envBucket.endsWith('.firebasestorage.app')) {
        const project = envBucket.replace('.firebasestorage.app', '');
        candidates.push(`${project}.appspot.com`);
      }
      if (envBucket.endsWith('.appspot.com')) {
        const project = envBucket.replace('.appspot.com', '');
        candidates.push(`${project}.firebasestorage.app`);
      }
    }
    if (!candidates.includes(defaultBucketName)) {
      candidates.push(defaultBucketName);
      // Also add cross-variant for default
      if (defaultBucketName.endsWith('.appspot.com')) {
        const project = defaultBucketName.replace('.appspot.com', '');
        candidates.push(`${project}.firebasestorage.app`);
      }
      if (defaultBucketName.endsWith('.firebasestorage.app')) {
        const project = defaultBucketName.replace('.firebasestorage.app', '');
        candidates.push(`${project}.appspot.com`);
      }
    }

    const results: Array<{ name: string; exists: boolean; error?: string }> = [];
    for (const name of candidates) {
      try {
        const [exists] = await storage.bucket(name).exists();
        results.push({ name, exists });
      } catch (e: any) {
        results.push({ name, exists: false, error: e?.message || 'exists() failed' });
      }
    }

    const found = results.find(r => r.exists);

    // Optional write test: /api/test-storage?write=1
    let writeTest: { attempted: boolean; ok?: boolean; error?: string } = { attempted: false };
    if (req.query.write === '1' && found) {
      writeTest.attempted = true;
      try {
        const testPath = `diagnostics/test-${Date.now()}.txt`;
        const fileRef = storage.bucket(found.name).file(testPath);
        await fileRef.save(Buffer.from('ok'), { metadata: { contentType: 'text/plain' }, public: false });
        await fileRef.delete();
        writeTest.ok = true;
      } catch (e: any) {
        writeTest.ok = false;
        writeTest.error = e?.message || 'write test failed';
      }
    }

    const status = found ? 'OK' : 'ERROR';
    const message = found
      ? `Found bucket: ${found.name}`
      : 'No working bucket found. Enable Cloud Storage or set FIREBASE_STORAGE_BUCKET to the correct bucket name.';

    return res.status(200).json({
      status,
      message,
      environment: {
        envBucket: envBucketRaw || null,
        envBucketNormalized: envBucket || null,
        defaultBucketName,
      },
      checks: {
        candidates,
        results,
      },
      writeTest,
      nextSteps: found
        ? [
            'Set FIREBASE_STORAGE_BUCKET to the found bucket (if not already).',
            'Retry upload at /admin/upload-test or Admin → Photo Manager.',
          ]
        : [
            'In Firebase Console → Storage: Click Get started and create the default bucket.',
            'Copy the exact bucket name (usually <project-id>.appspot.com).',
            'Set FIREBASE_STORAGE_BUCKET to that value and redeploy.',
          ],
    });
  } catch (error: any) {
    return res.status(500).json({ status: 'ERROR', message: error?.message || 'Unknown error' });
  }
}

