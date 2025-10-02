import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { requireAdmin } from '../../../utils/auth';

/**
 * API endpoint to update content from CMS admin panel
 * Saves changes to the translation JSON files
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
    const content = req.body;

    // Update English translations
    if (content.homepage?.en || content.about?.en || content.consultation?.en) {
      const enPath = path.join(process.cwd(), 'locales', 'en.json');
      const enData = JSON.parse(fs.readFileSync(enPath, 'utf-8'));

      // Update homepage content
      if (content.homepage?.en) {
        enData.home = enData.home || {};
        if (content.homepage.en.title) enData.home.title = content.homepage.en.title;
        if (content.homepage.en.subtitle) enData.home.subtitle = content.homepage.en.subtitle;
        if (content.homepage.en.socialProof) enData.home.social_proof = content.homepage.en.socialProof;
      }

      // Update about content
      if (content.about?.en) {
        enData.about = enData.about || {};
        if (content.about.en.intro) enData.about.description = content.about.en.intro;
        if (content.about.en.mission) enData.about.mission_description = content.about.en.mission;
      }

      // Update consultation content
      if (content.consultation?.en) {
        enData.consultation = enData.consultation || {};
        if (content.consultation.en.heroTitle) enData.consultation.hero_title = content.consultation.en.heroTitle;
        if (content.consultation.en.heroSubtitle) enData.consultation.hero_subtitle = content.consultation.en.heroSubtitle;
      }

      fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
    }

    // Update Arabic translations
    if (content.homepage?.ar || content.about?.ar || content.consultation?.ar) {
      const arPath = path.join(process.cwd(), 'locales', 'ar.json');
      const arData = JSON.parse(fs.readFileSync(arPath, 'utf-8'));

      // Update homepage content
      if (content.homepage?.ar) {
        arData.home = arData.home || {};
        if (content.homepage.ar.title) arData.home.title = content.homepage.ar.title;
        if (content.homepage.ar.subtitle) arData.home.subtitle = content.homepage.ar.subtitle;
        if (content.homepage.ar.socialProof) arData.home.social_proof = content.homepage.ar.socialProof;
      }

      // Update about content
      if (content.about?.ar) {
        arData.about = arData.about || {};
        if (content.about.ar.intro) arData.about.description = content.about.ar.intro;
        if (content.about.ar.mission) arData.about.mission_description = content.about.ar.mission;
      }

      // Update consultation content
      if (content.consultation?.ar) {
        arData.consultation = arData.consultation || {};
        if (content.consultation.ar.heroTitle) arData.consultation.hero_title = content.consultation.ar.heroTitle;
        if (content.consultation.ar.heroSubtitle) arData.consultation.hero_subtitle = content.consultation.ar.heroSubtitle;
      }

      fs.writeFileSync(arPath, JSON.stringify(arData, null, 2));
    }

    return res.status(200).json({ success: true, message: 'Content updated successfully' });
  } catch (error) {
    console.error('Error updating content:', error);
    return res.status(500).json({ error: 'Failed to update content' });
  }
}
