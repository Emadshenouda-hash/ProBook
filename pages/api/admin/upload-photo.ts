import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import { uploadToFirebase, saveToFirestore } from '../../../utils/firebase';
import { requireAdmin } from '../../../utils/auth';

export const config = {
  api: {
    bodyParser: false,
  },
};

/**
 * Upload photos to Firebase Storage
 * Saves photo URLs to Firestore
 * 🔐 PROTECTED: Requires admin authentication
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 🔐 SECURITY: Require admin authentication
  const admin = await requireAdmin(req, res);
  if (!admin) return; // Response already sent by requireAdmin
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Parse multipart form data
    const form = formidable();
    const [fields, files] = await form.parse(req);
    
    const file = files.file?.[0];
    const photoType = fields.photoType?.[0];
    
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    if (!photoType) {
      return res.status(400).json({ error: 'Photo type not specified' });
    }

    // Read file buffer
    const fileBuffer = fs.readFileSync(file.filepath);
    
    // Determine content type
    const contentType = file.mimetype || 'image/jpeg';
    
    // Create file path in Firebase Storage
    const filePath = `website/${photoType}/${Date.now()}-${file.originalFilename}`;
    
    // Upload to Firebase Storage
    const { url, path } = await uploadToFirebase(fileBuffer, filePath, contentType);

    // Save photo metadata to Firestore
    await saveToFirestore('website_photos', {
      photoType,
      url,
      path,
      filename: file.originalFilename,
      sizeBytes: file.size,
      contentType,
      uploadedBy: 'admin'
    });

    // Clean up temp file
    fs.unlinkSync(file.filepath);

    return res.status(200).json({ 
      success: true, 
      url,
      message: 'Photo uploaded successfully' 
    });
  } catch (error: any) {
    console.error('Photo upload error:', error);
    return res.status(500).json({ 
      error: 'Upload failed', 
      message: error.message 
    });
  }
}
