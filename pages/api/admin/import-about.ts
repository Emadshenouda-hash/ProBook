import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAdmin } from '../../../utils/auth';
import { getFirebaseDB } from '../../../utils/firebase';

function docId(locale: string, key: string): string {
  const b64 = Buffer.from(key).toString('base64').replace(/=+$/,'').replace(/\+/g,'-').replace(/\//g,'_');
  return `${locale}__${b64}`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const admin = await requireAdmin(req, res);
  if (!admin) return;

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  const db = getFirebaseDB();
  if (!db) return res.status(500).json({ ok: false, error: 'Firestore not initialized' });

  const now = new Date().toISOString();

  const en: Record<string, string> = {
    'about.title': 'About Emad Shenouda',
    'about.tagline': 'International Finance Leader',
    'about.intro': 'I design accounting systems that go beyond compliance—built for insight, efficiency, and growth. With 20+ years across the US, UK, EU, and MENA, I tailor scalable reporting, clean month‑end close, and executive dashboards for startups, nonprofits, and SMEs.',
    'about.my_story_title': 'My Story',
    'about.story_para1': 'I began my accounting career in Cairo and have served nonprofits, media companies, PR agencies, and e‑commerce businesses across the US, Middle East, and Europe. I combine operational bookkeeping with reporting that leaders use.',
    'about.story_para2': 'In 2003, I sat for the U.S. CPA exam and completed the Audit section (not a licensed CPA). Exposure to U.S. GAAP and regulatory expectations helps me support U.S. clients remotely with consistent, compliant financials.',
    'about.story_para3': 'I specialize in QuickBooks (Desktop & Online), Zoho Books, NetSuite, and Xero; e‑commerce revenue reconciliation; donor and grant reporting; and executive dashboards. Typical outcomes: 60% faster month‑end, 15–20% expense reduction through controls and clean data.',
    'about.mission_title': 'My Mission:',
    'about.mission_description': 'Provide startups and SMEs with enterprise‑grade financial clarity—clean books, timely reports, and actionable insights to drive growth—at a fraction of the enterprise cost.',
    'about.experience_title': 'Professional Experience',
    'about.education_title': 'Education & Certifications',
    'about.expertise_title': 'Core Expertise',
    'about.software_title': 'Software & Tools',
    'about.software_intro': "I'm proficient in a wide range of accounting software and business tools:",
    'about.why_work_title': 'Why Work With Me?',
    'about.ready_cta_title': 'Ready to Get Your Books in Order?',
    'about.ready_cta_desc': "Whether you need ongoing bookkeeping, a one-time cleanup, or fractional CFO services, I'd love to discuss how ProBook Solutions can support your business."
  };

  const ar: Record<string, string> = {
    'about.title': 'نبذة عن عماد شنودة',
    'about.tagline': 'قائد مالي دولي',
    'about.intro': 'أصمّم أنظمة محاسبية تتجاوز الامتثال نحو الرؤية والكفاءة والنمو. لديّ خبرة تتجاوز 20 عامًا عبر الولايات المتحدة والمملكة المتحدة وأوروبا ومنطقة الشرق الأوسط وشمال إفريقيا، وأخصّص تقارير قابلة للتوسّع وإقفالًا شهريًا منظمًا ولوحات تنفيذية عملية للشركات الناشئة والمتوسطة وغير الربحية.',
    'about.my_story_title': 'قصتي',
    'about.story_para1': 'بدأت مسيرتي في المحاسبة بالقاهرة وقدمت خدمات لجهات غير ربحية وشركات إعلام وعلاقات عامة وتجارة إلكترونية عبر الولايات المتحدة والشرق الأوسط وأوروبا. أمزج بين التنفيذ العملي والتقارير التي يعتمد عليها القادة.',
    'about.story_para2': 'في عام 2003 جلست لامتحان CPA في الولايات المتحدة وأتممت قسم التدقيق (لست محاسبًا قانونيًا مرخّصًا). هذه الخبرة ساعدتني على خدمة العملاء وفق معايير GAAP ومتطلبات الامتثال.',
    'about.story_para3': 'أتخصّص في QuickBooks (سطح المكتب والنسخة السحابية) وZoho Books وNetSuite وXero، ومطابقة إيرادات التجارة الإلكترونية، وتقارير المنح، ولوحات القيادات. نتائج متكررة: تسريع الإقفال الشهري بنسبة 60% وتقليل المصروفات 15–20% عبر ضبط العمليات والبيانات.',
    'about.mission_title': 'رسالتي:',
    'about.mission_description': 'توفير وضوح مالي احترافي للشركات الناشئة والمتوسطة—دفاتر نظيفة وتقارير في الوقت ورؤى قابلة للتنفيذ—وبتكلفة مناسبة.',
    'about.experience_title': 'الخبرة العملية',
    'about.education_title': 'التعليم والشهادات',
    'about.expertise_title': 'مجالات الخبرة',
    'about.software_title': 'البرامج والأدوات',
    'about.software_intro': 'أتقن مجموعة واسعة من برامج المحاسبة وأدوات الأعمال:',
    'about.why_work_title': 'لماذا تعمل معي؟',
    'about.ready_cta_title': 'جاهز لتنظيم حساباتك؟',
    'about.ready_cta_desc': 'سواء كنت بحاجة إلى محاسبة شهرية مستمرة، أو تنظيف دفعة واحدة، أو خدمات قيادية مالية، يسعدني مناقشة كيف ندعم عملك.'
  };

  try {
    let written = 0;
    for (const [key, value] of Object.entries(en)) {
      const id = docId('en', key);
      await db.collection('site_content').doc(id).set({ key, locale: 'en', value, updatedAt: now }, { merge: true });
      written++;
    }
    for (const [key, value] of Object.entries(ar)) {
      const id = docId('ar', key);
      await db.collection('site_content').doc(id).set({ key, locale: 'ar', value, updatedAt: now }, { merge: true });
      written++;
    }
    return res.status(200).json({ ok: true, written });
  } catch (e: any) {
    return res.status(500).json({ ok: false, error: e?.message || 'Import failed' });
  }
}

