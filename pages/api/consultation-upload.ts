import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = { api: { bodyParser: false } };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const uploadDir = path.join(process.cwd(), '.next', 'cache', 'uploads');
  await fs.promises.mkdir(uploadDir, { recursive: true });

  const form = formidable({ multiples: false, uploadDir, keepExtensions: true, maxFileSize: 10 * 1024 * 1024 });

  try {
    const { fields, files } = await new Promise<{ fields: formidable.Fields; files: formidable.Files }>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    const file = files.file as formidable.File | formidable.File[] | undefined;
    if (!file || Array.isArray(file)) return res.status(400).json({ error: 'No file' });

    // In a real blob storage, you'd upload the temp file and return a public URL
    // Here we simulate by returning a pseudo URL path (you can wire to S3/GCS/Vercel Blob)
    const filename = path.basename(file.filepath);
    const url = `/api/uploads/${filename}`; // placeholder; replace with real blob URL

    return res.status(200).json({ url });
  } catch (err) {
    console.error('Upload error:', err);
    return res.status(500).json({ error: 'Upload failed' });
  }
}

