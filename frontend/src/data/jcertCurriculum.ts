import { LessonPlan } from '../types';

export interface OfficialBookCatalogItem {
  id: string;
  grade: string;
  gradeKey: 'class1' | 'class2' | 'class3' | 'balvatika';
  subject: 'hindi' | 'math' | 'evs' | 'english' | 'math_santhali';
  subjectNameHindi: string;
  subjectNameEnglish: string;
  titleOfficial: string;
  stateEquivalent: string;
  bookCode: string;
  totalChapters: number;
  icon: string;
  badgeBg: string;
  accentGradient: string;
  borderColor: string;
  tagColor: string;
  featuredChapters: { chNum: number; titleHindi: string; titleTribal: string; theme: string }[];
}

export const OFFICIAL_TEXTBOOKS_CATALOG: OfficialBookCatalogItem[] = [
  {
    id: 'tb-c1-hindi-sarangi',
    grade: 'Class 1',
    gradeKey: 'class1',
    subject: 'hindi',
    subjectNameHindi: 'भाषा एवं साक्षरता (Hindi)',
    subjectNameEnglish: 'Language & Literacy',
    titleOfficial: 'सारंगी भाग 1 (Sarangi Part 1)',
    stateEquivalent: 'मांदर भाग 1 (Mandar 1 - JCERT)',
    bookCode: 'ahsr1',
    totalChapters: 19,
    icon: '📖',
    badgeBg: 'bg-rose-100 text-rose-900 border-rose-200',
    accentGradient: 'from-rose-600 via-amber-600 to-orange-700',
    borderColor: 'border-rose-300',
    tagColor: 'text-rose-700 bg-rose-50',
    featuredChapters: [
      { chNum: 1, titleHindi: 'मीना का परिवार', titleTribal: 'ᱢᱤᱱᱟ ᱨᱮᱱ ᱜᱷᱟᱨᱚᱸᱡᱽ', theme: 'Family & Household Realia' },
      { chNum: 2, titleHindi: 'दादा-दादी', titleTribal: 'ᱦᱟᱲᱟᱢ ᱵᱩᱰᱷᱤ', theme: 'Elders & Respect' },
      { chNum: 3, titleHindi: 'रीना का दिन', titleTribal: 'ᱨᱤᱱᱟ ᱟᱜ ᱢᱟᱦᱟᱸ', theme: 'Daily Routine & Hygiene' },
      { chNum: 4, titleHindi: 'रानी भी', titleTribal: 'ᱨᱟᱱᱤ ᱦᱚᱸ', theme: 'Inclusivity & Sibling Bonds' }
    ]
  },
  {
    id: 'tb-c1-math-joyful',
    grade: 'Class 1',
    gradeKey: 'class1',
    subject: 'math',
    subjectNameHindi: 'गणित ज्ञान (Mathematics)',
    subjectNameEnglish: 'Foundational Numeracy',
    titleOfficial: 'आनंदमय गणित भाग 1 (Joyful Math 1)',
    stateEquivalent: 'गणित खेल भाग 1 (JCERT Class 1)',
    bookCode: 'ahjm1',
    totalChapters: 13,
    icon: '🔢',
    badgeBg: 'bg-blue-100 text-blue-900 border-blue-200',
    accentGradient: 'from-blue-600 via-indigo-600 to-cyan-700',
    borderColor: 'border-blue-300',
    tagColor: 'text-blue-700 bg-blue-50',
    featuredChapters: [
      { chNum: 1, titleHindi: 'खोजें अपने आस-पास (आकृतियाँ)', titleTribal: 'ᱟᱵᱚᱣᱟᱜ ᱥᱩᱨ ᱥᱩᱯᱩᱨ ᱧᱮᱞ (ᱦᱩᱱᱟᱹᱨ)', theme: 'Shapes & Spatial Understanding' },
      { chNum: 2, titleHindi: 'खिलौने ही खिलौने (1 से 9 तक गिनती)', titleTribal: 'ᱮᱱᱮᱡ ᱡᱤᱱᱤᱥ (᱑ ᱠᱷᱚᱱ ᱙ ᱮᱞ)', theme: 'Concrete Numbers 1 to 9' },
      { chNum: 3, titleHindi: 'साप्ताहिक हाट (गिनती)', titleTribal: 'ᱦᱟᱴ ᱨᱮ ᱠᱤᱨᱤᱧ', theme: 'Village Market & Counting' }
    ]
  },
  {
    id: 'tb-c1-math-santhali',
    grade: 'Class 1',
    gradeKey: 'class1',
    subject: 'math_santhali',
    subjectNameHindi: 'ᱥᱟᱱᱛᱟᱲᱤ ᱮᱞᱠᱷᱟ (Santhali Math)',
    subjectNameEnglish: 'Santhali Numeracy (Ol Chiki)',
    titleOfficial: 'ᱨᱟᱹᱥᱠᱟᱹ ᱮᱞᱠᱷᱟ ᱑ (Joyful Math Santhali 1)',
    stateEquivalent: 'संथाली ओल चिकी गणित 1 (JCERT)',
    bookCode: 'asnjm1',
    totalChapters: 13,
    icon: '🏹',
    badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-200',
    accentGradient: 'from-emerald-700 via-teal-600 to-forest-800',
    borderColor: 'border-emerald-300',
    tagColor: 'text-emerald-800 bg-emerald-50',
    featuredChapters: [
      { chNum: 1, titleHindi: 'ᱟᱵᱚᱣᱟᱜ ᱥᱩᱨ ᱥᱩᱯᱩᱨ ᱧᱮᱞ (आकृतियाँ)', titleTribal: 'ᱥᱩᱨ ᱥᱩᱯᱩᱨ ᱡᱤᱱᱤᱥ', theme: 'Ol Chiki Spatial Concepts' },
      { chNum: 2, titleHindi: 'ᱮᱱᱮᱡ ᱡᱤᱱᱤᱥ (1 to 9 Counting)', titleTribal: '᱑ ᱠᱷᱚᱱ ᱙ ᱞᱮᱠᱷᱟ', theme: 'Ol Chiki Numerals' }
    ]
  },
  {
    id: 'tb-c1-english-mridang',
    grade: 'Class 1',
    gradeKey: 'class1',
    subject: 'english',
    subjectNameHindi: 'अंग्रेजी भाषा (English)',
    subjectNameEnglish: 'English Reader',
    titleOfficial: 'Mridang Book 1 (मृदंग भाग 1)',
    stateEquivalent: 'Sunrise Part 1 (JCERT Class 1)',
    bookCode: 'aemr1',
    totalChapters: 9,
    icon: '🔤',
    badgeBg: 'bg-purple-100 text-purple-900 border-purple-200',
    accentGradient: 'from-purple-600 via-indigo-600 to-violet-700',
    borderColor: 'border-purple-300',
    tagColor: 'text-purple-700 bg-purple-50',
    featuredChapters: [
      { chNum: 1, titleHindi: 'My Family and Me', titleTribal: 'ᱤᱧ ᱟᱨ ᱤᱧᱟᱜ ᱜᱷᱟᱨᱚᱸᱡᱽ', theme: 'Self & Family Greetings' },
      { chNum: 2, titleHindi: 'Picture Time (Animals)', titleTribal: 'ᱡᱤᱭᱟᱹᱞᱤ ᱠᱚᱣᱟᱜ ᱪᱤᱛᱟᱹᱨ', theme: 'Animal Sounds & Phonics' },
      { chNum: 3, titleHindi: 'The Cap-seller and the Monkeys', titleTribal: 'ᱴᱩᱯᱤ ᱟᱹᱠᱷᱨᱤᱧᱤᱡ ᱟᱨ ᱜᱟᱹᱰᱷᱤ', theme: 'Classic Folktale & Action' }
    ]
  },
  {
    id: 'tb-c2-hindi-sarangi',
    grade: 'Class 2',
    gradeKey: 'class2',
    subject: 'hindi',
    subjectNameHindi: 'भाषा एवं साक्षरता (Hindi)',
    subjectNameEnglish: 'Language & Literacy',
    titleOfficial: 'सारंगी भाग 2 (Sarangi Part 2)',
    stateEquivalent: 'सखुआ भाग 2 (Sakhua 2 - JCERT)',
    bookCode: 'bhsr1',
    totalChapters: 26,
    icon: '📖',
    badgeBg: 'bg-rose-100 text-rose-900 border-rose-200',
    accentGradient: 'from-rose-600 via-red-600 to-amber-700',
    borderColor: 'border-rose-300',
    tagColor: 'text-rose-700 bg-rose-50',
    featuredChapters: [
      { chNum: 1, titleHindi: 'नीम की सीख', titleTribal: 'ᱱᱤᱢ ᱫᱟᱨᱮ ᱨᱮᱱᱟᱜ ᱥᱮᱪᱮᱫ', theme: 'Health, Medicinal Plants & Ecology' },
      { chNum: 2, titleHindi: 'घर', titleTribal: 'ᱳᱲᱟᱜ (Home & Family)', theme: 'Shelter, Architecture & Kinship' },
      { chNum: 3, titleHindi: 'माला की चाँदी की पायल', titleTribal: 'ᱢᱟᱞᱟ ᱟᱜ ᱨᱩᱯᱟᱹ ᱯᱟᱸᱭᱡᱚᱱ', theme: 'Village Festivities & Crafts' },
      { chNum: 4, titleHindi: 'माथे का पसीना', titleTribal: 'ᱦᱚᱲᱢᱚ ᱨᱮᱱᱟᱜ ᱩᱫᱽᱜᱟᱹᱨ', theme: 'Dignity of Labor & Agriculture' }
    ]
  },
  {
    id: 'tb-c2-math-joyful',
    grade: 'Class 2',
    gradeKey: 'class2',
    subject: 'math',
    subjectNameHindi: 'गणित ज्ञान (Mathematics)',
    subjectNameEnglish: 'Foundational Numeracy',
    titleOfficial: 'आनंदमय गणित भाग 2 (Joyful Math 2)',
    stateEquivalent: 'गणित खेल भाग 2 (JCERT Class 2)',
    bookCode: 'bhjm1',
    totalChapters: 11,
    icon: '🔢',
    badgeBg: 'bg-blue-100 text-blue-900 border-blue-200',
    accentGradient: 'from-blue-600 via-sky-600 to-teal-700',
    borderColor: 'border-blue-300',
    tagColor: 'text-blue-700 bg-blue-50',
    featuredChapters: [
      { chNum: 1, titleHindi: 'संख्याओं का मेला (20 से 99)', titleTribal: 'ᱮᱞ ᱨᱮᱱᱟᱜ ᱢᱮᱞᱟ (᱒᱐ ᱠᱷᱚᱱ ᱙᱙)', theme: 'Place Value & 2-Digit Numbers' },
      { chNum: 2, titleHindi: 'दिन और तारीख (कैलेंडर)', titleTribal: 'ᱢᱟᱦᱟᱸ ᱟᱨ ᱛᱟᱹᱨᱤᱠᱷ', theme: 'Calendar, Days & Seasons' },
      { chNum: 3, titleHindi: 'सब्जी मंडी (घटाव व जोड़)', titleTribal: 'ᱩᱛᱩ ᱦᱟᱴ (ᱡᱚᱲ ᱟᱨ ᱜᱷᱟᱴᱟᱣ)', theme: 'Addition, Subtraction & Local Currency' }
    ]
  },
  {
    id: 'tb-c2-math-santhali',
    grade: 'Class 2',
    gradeKey: 'class2',
    subject: 'math_santhali',
    subjectNameHindi: 'ᱥᱟᱱᱛᱟᱲᱤ ᱮᱞᱠᱷᱟ (Santhali Math)',
    subjectNameEnglish: 'Santhali Numeracy (Ol Chiki)',
    titleOfficial: 'ᱨᱟᱹᱥᱠᱟᱹ ᱮᱞᱠᱷᱟ ᱒ (Joyful Math Santhali 2)',
    stateEquivalent: 'संथाली ओल चिकी गणित 2 (JCERT)',
    bookCode: 'bsnjm1',
    totalChapters: 11,
    icon: '🏹',
    badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-200',
    accentGradient: 'from-emerald-700 via-teal-600 to-cyan-800',
    borderColor: 'border-emerald-300',
    tagColor: 'text-emerald-800 bg-emerald-50',
    featuredChapters: [
      { chNum: 1, titleHindi: 'ᱮᱞ ᱨᱮᱱᱟᱜ ᱢᱮᱞᱟ (Numbers 20-99)', titleTribal: 'ᱮᱞ ᱢᱮᱞᱟ', theme: 'Ol Chiki Place Value' },
      { chNum: 2, titleHindi: 'ᱢᱟᱦᱟᱸ ᱟᱨ ᱛᱟᱹᱨᱤᱠᱷ (Calendar)', titleTribal: 'ᱪᱟᱸᱫᱚ ᱟᱨ ᱢᱟᱦᱟᱸ', theme: 'Time & Calendar' }
    ]
  },
  {
    id: 'tb-c2-english-mridang',
    grade: 'Class 2',
    gradeKey: 'class2',
    subject: 'english',
    subjectNameHindi: 'अंग्रेजी भाषा (English)',
    subjectNameEnglish: 'English Reader',
    titleOfficial: 'Mridang Book 2 (मृदंग भाग 2)',
    stateEquivalent: 'Sunshine Part 2 (JCERT Class 2)',
    bookCode: 'bemr1',
    totalChapters: 13,
    icon: '🔤',
    badgeBg: 'bg-purple-100 text-purple-900 border-purple-200',
    accentGradient: 'from-purple-600 via-indigo-600 to-blue-700',
    borderColor: 'border-purple-300',
    tagColor: 'text-purple-700 bg-purple-50',
    featuredChapters: [
      { chNum: 1, titleHindi: 'My Bicycle', titleTribal: 'ᱤᱧᱟᱜ ᱥᱟᱭᱠᱮᱞ', theme: 'Vehicles & Rhyme Rhythm' },
      { chNum: 2, titleHindi: 'Picture Reading (Village Fair)', titleTribal: 'ᱟᱹᱛᱩ ᱢᱮᱞᱟ ᱨᱮᱱᱟᱜ ᱪᱤᱛᱟᱹᱨ', theme: 'Observation & Vocabulary' },
      { chNum: 3, titleHindi: 'A Drop in the Ocean', titleTribal: 'ᱫᱚᱨᱭᱟ ᱨᱮ ᱴᱷᱚᱯ ᱫᱟᱜ', theme: 'Water Conservation & Environmental Care' }
    ]
  },
  {
    id: 'tb-c3-math-mathsmela',
    grade: 'Class 3',
    gradeKey: 'class3',
    subject: 'math',
    subjectNameHindi: 'गणित ज्ञान (Mathematics)',
    subjectNameEnglish: 'Foundational Numeracy',
    titleOfficial: 'Maths Mela 3 (गणित मेला भाग 3)',
    stateEquivalent: 'रोचक गणित भाग 3 (JCERT Class 3)',
    bookCode: 'cemm1',
    totalChapters: 14,
    icon: '🔢',
    badgeBg: 'bg-blue-100 text-blue-900 border-blue-200',
    accentGradient: 'from-blue-700 via-indigo-700 to-purple-800',
    borderColor: 'border-blue-300',
    tagColor: 'text-blue-700 bg-blue-50',
    featuredChapters: [
      { chNum: 1, titleHindi: 'What is in a Name? (3-digit Numbers)', titleTribal: 'ᱧᱩᱛᱩᱢ ᱨᱮ ᱪᱮᱫ ᱢᱮᱱᱟᱜ-ᱟ?', theme: '3-Digit Numbers & Place Value' },
      { chNum: 2, titleHindi: 'Toy Joy (Multiplication Concepts)', titleTribal: 'ᱮᱱᱮᱡ ᱨᱟᱹᱥᱠᱟᱹ (ᱜᱩᱬᱟᱹ)', theme: 'Repeated Addition & Multiplication' },
      { chNum: 3, titleHindi: 'Double Century (Cricket Math)', titleTribal: 'ᱵᱟᱨ ᱥᱟᱭ (ᱠᱨᱤᱠᱮᱴ ᱮᱞ)', theme: 'Mental Math & Estimation' }
    ]
  },
  {
    id: 'tb-c3-english-santoor',
    grade: 'Class 3',
    gradeKey: 'class3',
    subject: 'english',
    subjectNameHindi: 'अंग्रेजी भाषा (English)',
    subjectNameEnglish: 'English Reader',
    titleOfficial: 'Santoor Book 3 (संतूर भाग 3)',
    stateEquivalent: 'Sunflower Part 3 (JCERT Class 3)',
    bookCode: 'cesa1',
    totalChapters: 12,
    icon: '🔤',
    badgeBg: 'bg-purple-100 text-purple-900 border-purple-200',
    accentGradient: 'from-purple-700 via-fuchsia-600 to-pink-700',
    borderColor: 'border-purple-300',
    tagColor: 'text-purple-700 bg-purple-50',
    featuredChapters: [
      { chNum: 1, titleHindi: 'Fun with Friends', titleTribal: 'ᱜᱟᱛᱮ ᱠᱚ ᱥᱟᱶ ᱨᱟᱹᱥᱠᱟᱹ', theme: 'Friendship & Outdoor Games' },
      { chNum: 2, titleHindi: 'The Little Bird', titleTribal: 'ᱠᱟᱹᱴᱤᱡ ᱪᱮᱬᱮ', theme: 'Nature Poetry & Compassion' },
      { chNum: 3, titleHindi: 'The Big Banyan Tree', titleTribal: 'ᱢᱟᱨᱟᱝ ᱵᱟᱲᱮ ᱫᱟᱨᱮ', theme: 'Ecology & Community Shade' }
    ]
  },
  {
    id: 'tb-c3-evs-veena',
    grade: 'Class 3',
    gradeKey: 'class3',
    subject: 'evs',
    subjectNameHindi: 'पर्यावरण अध्ययन (EVS / Our Wondrous World)',
    subjectNameEnglish: 'Environmental Studies',
    titleOfficial: 'वीणा 3 (Veena 3 / Our Wondrous World)',
    stateEquivalent: 'हमारी दुनिया भाग 3 (JCERT Class 3)',
    bookCode: 'chve1',
    totalChapters: 18,
    icon: '🌿',
    badgeBg: 'bg-forest-100 text-forest-900 border-forest-200',
    accentGradient: 'from-forest-800 via-emerald-700 to-green-800',
    borderColor: 'border-forest-300',
    tagColor: 'text-forest-800 bg-forest-50',
    featuredChapters: [
      { chNum: 1, titleHindi: 'हमारा पर्यावरण (Our Environment)', titleTribal: 'ᱟᱵᱚᱣᱟᱜ ᱯᱚᱨᱤᱵᱮᱥ', theme: 'Living & Non-living Nature' },
      { chNum: 2, titleHindi: 'पौधों की दुनिया (Plant Life & Sal Grove)', titleTribal: 'ᱫᱟᱨᱮ ᱱᱟᱹᱲᱤ ᱫᱩᱱᱤᱭᱟᱹ', theme: 'Flora, Forests & Medicinal Herbs' },
      { chNum: 3, titleHindi: 'पानी अनमोल है (Water Conservation)', titleTribal: 'ᱫᱟᱜ ᱫᱚ ᱟᱹᱰᱤ ᱫᱟᱢᱟᱱᱟ', theme: 'Clean Water, Rivers & Wells' }
    ]
  }
];

export interface SubjectMetadata {
  id: string;
  nameHindi: string;
  nameEnglish: string;
  textbookName: string;
  icon: string;
  colorClass: string;
  badgeBg: string;
}

export const JCERT_SUBJECTS: SubjectMetadata[] = [
  {
    id: 'hindi',
    nameHindi: 'Language & Literacy (Mandar / Sakhua / Bhashanjali)',
    nameEnglish: 'Language & Literacy',
    textbookName: 'Mandar (Cl.1) / Sakhua (Cl.2) / Bhashanjali (Cl.3)',
    icon: '📖',
    colorClass: 'text-amber-700 border-amber-300 bg-amber-50',
    badgeBg: 'bg-amber-100 text-amber-900 border-amber-200'
  },
  {
    id: 'math',
    nameHindi: 'Foundational Numeracy (Magic of Numbers / Maths in Play / Rochak Ganit)',
    nameEnglish: 'Foundational Numeracy',
    textbookName: 'Magic of Numbers (Cl.1) / Maths in Play (Cl.2) / Rochak Ganit (Cl.3)',
    icon: '🔢',
    colorClass: 'text-blue-700 border-blue-300 bg-blue-50',
    badgeBg: 'bg-blue-100 text-blue-900 border-blue-200'
  },
  {
    id: 'evs',
    nameHindi: 'Environmental Studies (Hamara Parivesh / Hamari Duniya)',
    nameEnglish: 'Environmental Studies',
    textbookName: 'Hamara Parivesh (Cl.1,2) / Hamari Duniya (Cl.3)',
    icon: '🌿',
    colorClass: 'text-forest-700 border-forest-300 bg-forest-50',
    badgeBg: 'bg-forest-100 text-forest-900 border-forest-200'
  },
  {
    id: 'english',
    nameHindi: 'English Language (Blooming Buds / Sunrise / Sunshine)',
    nameEnglish: 'English Language',
    textbookName: 'Blooming Buds (Cl.1) / Sunrise (Cl.2) / Sunshine (Cl.3)',
    icon: '🔤',
    colorClass: 'text-purple-700 border-purple-300 bg-purple-50',
    badgeBg: 'bg-purple-100 text-purple-900 border-purple-200'
  }
];

export function getAvailableGrades(): string[] {
  return ['Class 1', 'Class 2', 'Class 3', 'Balvatika'];
}

export function getSubjectsForGrade(grade: string): { id: 'hindi' | 'math' | 'evs' | 'english'; nameHindi: string; nameEnglish: string; textbookName: string; icon: string; badgeBg: string }[] {
  const g = grade.toLowerCase();
  if (g.includes('1')) {
    return [
      { id: 'hindi', nameHindi: 'Language Literacy (Mandar 1)', nameEnglish: 'Language Literacy', textbookName: 'Mandar Part 1 (JCERT Class 1)', icon: '📖', badgeBg: 'bg-amber-100 text-amber-900 border-amber-200' },
      { id: 'math', nameHindi: 'Mathematics (Magic of Numbers 1)', nameEnglish: 'Foundational Numeracy', textbookName: 'Magic of Numbers Part 1 (JCERT Class 1)', icon: '🔢', badgeBg: 'bg-blue-100 text-blue-900 border-blue-200' },
      { id: 'evs', nameHindi: 'EVS (Hamara Parivesh 1)', nameEnglish: 'Environmental Studies', textbookName: 'Hamara Parivesh Part 1 (JCERT Class 1)', icon: '🌿', badgeBg: 'bg-forest-100 text-forest-900 border-forest-200' },
      { id: 'english', nameHindi: 'English (Blooming Buds 1)', nameEnglish: 'English Reader', textbookName: 'Blooming Buds Part 1 (JCERT Class 1)', icon: '🔤', badgeBg: 'bg-purple-100 text-purple-900 border-purple-200' }
    ];
  }
  if (g.includes('2')) {
    return [
      { id: 'hindi', nameHindi: 'Language Literacy (Sakhua 2)', nameEnglish: 'Language Literacy', textbookName: 'Sakhua Part 2 (JCERT Class 2)', icon: '📖', badgeBg: 'bg-amber-100 text-amber-900 border-amber-200' },
      { id: 'math', nameHindi: 'Mathematics (Maths in Play 2)', nameEnglish: 'Foundational Numeracy', textbookName: 'Maths in Play Part 2 (JCERT Class 2)', icon: '🔢', badgeBg: 'bg-blue-100 text-blue-900 border-blue-200' },
      { id: 'evs', nameHindi: 'EVS (Hamara Parivesh 2)', nameEnglish: 'Environmental Studies', textbookName: 'Hamara Parivesh Part 2 (JCERT Class 2)', icon: '🌿', badgeBg: 'bg-forest-100 text-forest-900 border-forest-200' },
      { id: 'english', nameHindi: 'English (Sunrise 2)', nameEnglish: 'English Reader', textbookName: 'Sunrise Part 2 (JCERT Class 2)', icon: '🔤', badgeBg: 'bg-purple-100 text-purple-900 border-purple-200' }
    ];
  }
  if (g.includes('3')) {
    return [
      { id: 'hindi', nameHindi: 'Language Literacy (Bhashanjali 3)', nameEnglish: 'Language Literacy', textbookName: 'Bhashanjali Part 3 (JCERT Class 3)', icon: '📖', badgeBg: 'bg-amber-100 text-amber-900 border-amber-200' },
      { id: 'math', nameHindi: 'Mathematics (Rochak Ganit 3)', nameEnglish: 'Foundational Numeracy', textbookName: 'Rochak Ganit Part 3 (JCERT Class 3)', icon: '🔢', badgeBg: 'bg-blue-100 text-blue-900 border-blue-200' },
      { id: 'evs', nameHindi: 'EVS (Hamari Duniya 3)', nameEnglish: 'Environmental Studies', textbookName: 'Hamari Duniya Part 3 (JCERT Class 3)', icon: '🌿', badgeBg: 'bg-forest-100 text-forest-900 border-forest-200' },
      { id: 'english', nameHindi: 'English (Sunshine 3)', nameEnglish: 'English Reader', textbookName: 'Sunshine Part 3 (JCERT Class 3)', icon: '🔤', badgeBg: 'bg-purple-100 text-purple-900 border-purple-200' }
    ];
  }
  return [
    { id: 'hindi', nameHindi: 'Early Literacy & Phonics', nameEnglish: 'Early Literacy', textbookName: 'Balvatika Activity Workbook 1', icon: '📖', badgeBg: 'bg-amber-100 text-amber-900 border-amber-200' },
    { id: 'math', nameHindi: 'Early Numeracy (1-5)', nameEnglish: 'Early Numeracy', textbookName: 'Balvatika Mathematics Kit', icon: '🔢', badgeBg: 'bg-blue-100 text-blue-900 border-blue-200' },
    { id: 'evs', nameHindi: 'Nature & Surroundings', nameEnglish: 'Early EVS', textbookName: 'Balvatika Environmental Chart', icon: '🌿', badgeBg: 'bg-forest-100 text-forest-900 border-forest-200' },
    { id: 'english', nameHindi: 'Early English Fun', nameEnglish: 'Early English', textbookName: 'Early Phonics & Rhymes', icon: '🔤', badgeBg: 'bg-purple-100 text-purple-900 border-purple-200' }
  ];
}

export function getChaptersForSubject(grade: string, subjectId: string): LessonPlan[] {
  return JCERT_CURRICULUM_DATA.filter(l => {
    const matchGrade = l.grade.toLowerCase().includes(grade.toLowerCase()) || 
      (grade === 'Class 1' && l.grade.includes('1')) || 
      (grade === 'Class 2' && l.grade.includes('2')) || 
      (grade === 'Class 3' && l.grade.includes('3')) || 
      (grade === 'Balvatika' && l.grade.includes('Balvatika'));
    const matchSub = l.subject_code === subjectId || (l.subject && l.subject.toLowerCase().includes(subjectId.toLowerCase()));
    return matchGrade && matchSub;
  });
}

export const JCERT_CURRICULUM_DATA: LessonPlan[] = [
  {
    "id": "jcert-c1-h01",
    "textbook": "मांदर भाग 1 (JCERT Class 1)",
    "chapter_number": 1,
    "title": "पाठ 1: सवेरा और सरना (Morning & Sacred Forest)",
    "grade": "Class 1",
    "subject": "हिन्दी (मांदर / सखुआ / भाषांजलि)",
    "subject_code": "hindi",
    "theme": "प्रकृति, प्रभात वंदना व सरना संस्कृति",
    "tribal_title": {
      "santhali_ol": "ᱥᱟᱹᱜᱩᱱ ᱥᱮᱛᱟᱜ ᱟᱨ ᱥᱟᱨᱱᱟ (Sagun Setah aar Sarna)",
      "santhali_dev": "सगुन सेताः आर सारना",
      "mundari": "बोगि सेताः आर सरना दारू",
      "ho": "बोगि सेताः आर सरना दारू"
    },
    "topics": [
      "प्रभात वंदना",
      "सवेरे का परिवेश",
      "प्रकृति ध्वनि व पक्षियों की बोली"
    ],
    "subtopics": [
      "सूरज की किरणें (सिंगी चान्दो / ᱥᱤᱸᱜᱤ ᱪᱟᱸᱫᱚ)",
      "चिड़ियों का कलरव (चेणे सेरेञ / ᱪᱮᱬᱮ ᱥᱮᱨᱮᱧ)",
      "सुबह की अच्छी आदतें (दाँत साफ करना, हाथ धोना)",
      "ध्वनि पहचान (क, स, र वर्ण ध्वनि)"
    ],
    "fln_milestones": [
      "मौखिक भाषा विकास",
      "ध्वन्यात्मक जागरूकता",
      "मातृभाषा व हिन्दी का शब्द सेतु"
    ],
    "tlem_realia": [
      "सखुआ/साल के ताजे फूल (बाहा)",
      "पक्षियों के चित्र चार्ट",
      "प्रभात गीत"
    ],
    "learning_outcomes": [
      "बच्चे सवेरे के वातावरण का वर्णन मातृभाषा और हिन्दी में कर सकेंगे",
      "सवेरा, सूरज, चिड़िया, पेड़ शब्दों का सही उच्चारण करेंगे"
    ],
    "duration_minutes": 40,
    "teacher_guide": "कक्षा की शुरुआत स्थानीय प्रभात गीत से करें। बच्चों को सखुआ के फूल दिखाकर सवेरे की ताजगी पर चर्चा करें।",
    "steps": [
      {
        "step_number": 1,
        "type": "प्रस्तावना व प्रभात वंदना (Morning Greeting)",
        "time_mins": 5,
        "teacher_hindi": "सुप्रभात बच्चों! देखो सवेरे का सूरज निकल आया है। सब मिलकर बोलेंगे।",
        "dialogue_santhali": {
          "ol_chiki": "ᱥᱟᱹᱜᱩᱱ ᱥᱮᱛᱟᱜ ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ! ᱧᱮᱞ ᱯᱮ ᱥᱮᱛᱟᱜ ᱥᱤᱸᱜᱤ ᱪᱟᱸᱫᱚ ᱨᱟᱠᱟᱵ ᱮᱱᱟ᱾ ᱡᱚᱛᱚ ᱦᱚᱲ ᱢᱮᱥᱟ ᱠᱟᱛᱮ ᱵᱚᱱ ᱨᱚᱲᱟ᱾",
          "dev": "सगुन सेताः गिदरा को! ञेल पे सेताः सिंगी चान्दो राकाब एना। जोतो होड़ मेसा काते बोन रोड़ा।",
          "rom": "Sagun setah gidra ko! Nyel pe setah singi chando rakab ena. Joto hor mesa kate bon rora."
        },
        "dialogue_mundari": {
          "dev": "बोगि सेताः होन को! नेले पे सेताः सिंगी राकाब जना। सोबेन को मिशा काते बु काजीये।",
          "rom": "Bogi setah hon ko! Nele pe setah singi rakab jana. Soben ko misha kate bu kajiye."
        },
        "dialogue_ho": {
          "dev": "बोगि सेताः होन को! नेले पे सेताः सिंगी राकाब यना। सोबेन को मिशा काते बु कजीये।",
          "rom": "Bogi setah hon ko! Nele pe setah singi rakab yana. Soben ko misha kate bu kajiye."
        }
      },
      {
        "step_number": 2,
        "type": "पाठ्यपुस्तक वाचन (Textbook Reading & Picture Talk)",
        "time_mins": 15,
        "teacher_hindi": "किताब में देखो, चिड़िया गा रही है और फूल खिल रहे हैं।",
        "dialogue_santhali": {
          "ol_chiki": "ᱯᱚᱛᱚᱵ ᱨᱮ ᱧᱮᱞ ᱯᱮ, ᱪᱮᱬᱮ ᱠᱚ ᱥᱮᱨᱮᱧ ᱮᱫᱟ ᱟᱨ ᱵᱟᱦᱟ ᱯᱷᱩᱴᱟᱹᱣ ᱮᱱᱟ᱾",
          "dev": "पोतोब रे ञेल पे, चेणे को सेरेञ एदा आर बाहा फुटाव एना।",
          "rom": "Potob re nyel pe, chene ko seren eda aar baha phutaw ena."
        },
        "dialogue_mundari": {
          "dev": "पुथी रे नेले पे, चेड़े को दुरंग-ए ताना आर बा फूटाव जना।",
          "rom": "Puthi re nele pe, chere ko durang-e tana aar ba phutaw jana."
        },
        "dialogue_ho": {
          "dev": "पुथी रे नेले पे, चेणे को दुरंग-ए तना आर बा फूटाव यना।",
          "rom": "Puthi re nele pe, chene ko durang-e tana aar ba phutaw yana."
        }
      }
    ]
  },
  {
    "id": "jcert-c1-h02",
    "textbook": "मांदर भाग 1 (JCERT Class 1)",
    "chapter_number": 2,
    "title": "पाठ 2: हमारा घर और परिवार (Home & Family)",
    "grade": "Class 1",
    "subject": "हिन्दी (मांदर / सखुआ / भाषांजलि)",
    "subject_code": "hindi",
    "theme": "पारिवारिक रिश्ते व आत्मीयता",
    "tribal_title": {
      "santhali_ol": "ᱟᱵᱚᱣᱟᱜ ᱳᱲᱟᱜ ᱟᱨ ᱜᱷᱟᱨᱚᱸᱡᱽ",
      "santhali_dev": "आबोवाः ओड़ाः आर घारोंज",
      "mundari": "आबुवाः ओड़ाः आर घारोंज",
      "ho": "आबुवाः ओड़ाः आर घारोंज"
    },
    "topics": [
      "परिवार के सदस्य",
      "पारिवारिक संबंध",
      "घर के काम में सहयोग"
    ],
    "subtopics": [
      "माँ (आयो / ᱟᱭᱳ), पिताजी (बाबा / ᱵᱟᱵᱟ)",
      "भाई (बोयहा / ᱵᱚᱭᱦᱟ), बहन (मिसि / ᱢᱤᱥᱤ)",
      "घर के कमरे व आँगन (राचा / ᱨᱟᱪᱟ)"
    ],
    "fln_milestones": [
      "अपने परिवार के बारे में 3-4 वाक्य बोलना",
      "रिश्तों के नाम मातृभाषा व हिन्दी में पहचानना"
    ],
    "tlem_realia": [
      "परिवार का चित्र कार्ड",
      "मिट्टी के छोटे खिलौने घर"
    ],
    "learning_outcomes": [
      "विद्यार्थी अपने माता-पिता और भाई-बहनों का परिचय दे सकेंगे"
    ],
    "duration_minutes": 40,
    "steps": [
      {
        "step_number": 1,
        "type": "पारिवारिक संवाद (Family Conversation)",
        "time_mins": 15,
        "teacher_hindi": "बच्चों, आपके घर में कौन-कौन रहते हैं? अपनी माँ और पिताजी का नाम बताओ।",
        "dialogue_santhali": {
          "ol_chiki": "ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱟᱯᱮ ᱳᱲᱟᱜ ᱨᱮ ᱠᱚᱭ ᱠᱚ ᱢᱮᱱᱟᱜ ᱠᱚᱣᱟ? ᱟᱯᱱᱟᱨ ᱟᱭᱳ ᱟᱨ ᱵᱟᱵᱟ ᱦᱟᱜ ᱧᱩᱛᱩᱢ ᱞᱟᱹᱭ ᱯᱮ᱾",
          "dev": "गिदरा को, आपे ओड़ाः रे कोय को मेनाः कोवा? आपनार आयो आर बाबा हाः ञुतुम लय पे।",
          "rom": "Gidra ko, ape orah re koy ko menah kowa? Apnar ayo aar baba hah nyutum lay pe."
        },
        "dialogue_mundari": {
          "dev": "होन को, आपे ओड़ाः रे ओकोए को मेनाः कोवा? अपना एंगा आर आपा हाः नुतुम काजी पे।",
          "rom": "Hon ko, ape orah re okoe ko menah kowa? Apna enga aar apa hah nutum kaji pe."
        },
        "dialogue_ho": {
          "dev": "होन को, आपे ओड़ाः रे ओकोए को मेनाः कोवा? अपना एंगा आर आपा हाः नुतुम कजी पे।",
          "rom": "Hon ko, ape orah re okoe ko menah kowa? Apna enga aar apa hah nutum kaji pe."
        }
      }
    ]
  },
  {
    "id": "jcert-c1-h03",
    "textbook": "मांदर भाग 1 (JCERT Class 1)",
    "chapter_number": 3,
    "title": "पाठ 3: हमारे पशु-पक्षी (Animals & Birds Around Us)",
    "grade": "Class 1",
    "subject": "हिन्दी (मांदर / सखुआ / भाषांजलि)",
    "subject_code": "hindi",
    "theme": "जीव-जंतु, पशु प्रेम व बोलियाँ",
    "tribal_title": {
      "santhali_ol": "ᱟᱵᱚ ᱟᱰᱮ-ᱯᱟᱥᱮ ᱡᱤᱵᱽ-ᱡᱤᱭᱟᱹᱞᱤ ᱟᱨ ᱪᱮᱬᱮ",
      "santhali_dev": "आबो आड़े-पासे जिब-जियाली आर चेणे",
      "mundari": "आबु सुर रिन जीब-जीयली आर चेड़े",
      "ho": "आबु सुर रिन जीब-जीयली आर चेणे"
    },
    "topics": [
      "घरेलू पशु",
      "जंगली पशु",
      "पशु-पक्षियों की आवाजें"
    ],
    "subtopics": [
      "हाथी (हाती / ᱦᱟᱹᱛᱤ), बाघ (कुल / ᱠᱩᱞ)",
      "बकरी (मेरोम / ᱢᱮᱨᱚᱢ), गाय (गाई / ᱜᱟᱹᱭ)",
      "कुत्ता (सेता / ᱥᱮᱛᱟ), बिल्ली (पुसी / ᱯᱩᱥᱤ)"
    ],
    "fln_milestones": [
      "पशु-पक्षियों के नाम पहचानना",
      "उनकी आवाजों की नकल करना"
    ],
    "tlem_realia": [
      "पशु मुखौटे (Animal Masks)",
      "पशु ध्वनियों का ऑडियो"
    ],
    "learning_outcomes": [
      "छात्र घरेलू व वन्य जीवों में अंतर समझ सकेंगे"
    ],
    "duration_minutes": 40,
    "steps": [
      {
        "step_number": 1,
        "type": "ध्वनि अनुकरण खेल (Animal Sound Game)",
        "time_mins": 15,
        "teacher_hindi": "कुत्ता कैसे बोलता है? भौं-भौं! संथाली में कुत्ते को सेता कहते हैं।",
        "dialogue_santhali": {
          "ol_chiki": "ᱥᱮᱛᱟ ᱪᱮᱫ ᱞᱮᱠᱟᱭ ᱨᱚᱲᱟ? ᱵᱷᱚᱣ-ᱵᱷᱚᱣ! ᱥᱮᱛᱟ ᱫᱚ ᱟᱵᱚ ᱥᱟᱶ ᱛᱟᱦᱮᱸᱱᱟᱭ᱾",
          "dev": "सेता चेद लेकाय रोड़ा? भौ-भौ! सेता दो आबो साव ताहेनाय।",
          "rom": "Seta ched lekay rora? Bhow-bhow! Seta do abo saw tahenay."
        },
        "dialogue_mundari": {
          "dev": "सेता चिलेका कजीये? भौ-भौ! सेता आबु लोः ताएना।",
          "rom": "Seta chileka kajiye? Bhow-bhow! Seta abu loh taena."
        },
        "dialogue_ho": {
          "dev": "सेता चिलेका कजीये? भौ-भौ! सेता आबु लोः तयना।",
          "rom": "Seta chileka kajiye? Bhow-bhow! Seta abu loh tayna."
        }
      }
    ]
  },
  {
    "id": "jcert-c1-m01",
    "textbook": "संख्याओं का जादू भाग 1 (JCERT Class 1)",
    "chapter_number": 1,
    "title": "पाठ 1: स्थानिक समझ (Spatial Relationships)",
    "grade": "Class 1",
    "subject": "गणित (संख्याओं का जादू / खेल-खेल में गणित / रोचक गणित)",
    "subject_code": "math",
    "theme": "आकार, स्थिति व स्थानिक अवधारणाएँ",
    "tribal_title": {
      "santhali_ol": "ᱪᱮᱛᱟᱱ-ᱞᱟᱛᱟᱨ, ᱥᱩᱨ-ᱥᱟᱺᱜᱤᱧ ᱵᱩᱡᱷᱟᱹᱣ",
      "santhali_dev": "चेतान-लातार, सुर-सांगिञ बुझौ",
      "mundari": "चेतान-लातार, सुर-सांगिन बुझौ",
      "ho": "चेतान-लातार, सुर-सांगिन बुझौ"
    },
    "topics": [
      "ऊपर-नीचे (Top-Bottom)",
      "पास-दूर (Near-Far)",
      "अंदर-बाहर (Inside-Outside)"
    ],
    "subtopics": [
      "ऊपर / नीचे (चेतान / ᱪᱮᱛᱟᱱ - लातार / ᱞᱟᱛᱟᱨ)",
      "पास / दूर (सुर / ᱥᱩᱨ - सांगिञ / ᱥᱟᱺᱜᱤᱧ)",
      "बड़ा / छोटा (मारांग / ᱢᱟᱨᱟᱝ - हुडिंग / ᱦᱩᱰᱤᱧ)"
    ],
    "fln_milestones": [
      "स्थानिक शब्दावली का सही प्रयोग",
      "आकार व दूरी की तुलना"
    ],
    "tlem_realia": [
      "कक्षा के बक्से व गेंदें",
      "पत्ते व कंकड़"
    ],
    "learning_outcomes": [
      "बच्चे वस्तुओं की स्थिति को देखकर ऊपर, नीचे, पास, दूर बता सकेंगे"
    ],
    "duration_minutes": 40,
    "steps": [
      {
        "step_number": 1,
        "type": "स्थानिक गतिविधि (Spatial Action Game)",
        "time_mins": 15,
        "teacher_hindi": "हाथ ऊपर करो (चेतान) और हाथ नीचे करो (लातार)!",
        "dialogue_santhali": {
          "ol_chiki": "ᱛᱤ ᱪᱮᱛᱟᱱ ᱨᱟᱠᱟᱵ ᱯᱮ ᱟᱨ ᱛᱤ ᱞᱟᱛᱟᱨ ᱟᱬᱜᱚᱭ ᱯᱮ!",
          "dev": "ती चेतान राकाब पे आर ती लातार आड़गोय पे!",
          "rom": "Ti chetan rakab pe aar ti latar arngoy pe!"
        },
        "dialogue_mundari": {
          "dev": "ती चेतान राकब पे आर ती लातार तिंगु पे!",
          "rom": "Ti chetan rakab pe aar ti latar tingu pe!"
        },
        "dialogue_ho": {
          "dev": "ती चेतान राकब पे आर ती लातार तिंगु पे!",
          "rom": "Ti chetan rakab pe aar ti latar tingu pe!"
        }
      }
    ]
  },
  {
    "id": "jcert-c1-m02",
    "textbook": "संख्याओं का जादू भाग 1 (JCERT Class 1)",
    "chapter_number": 2,
    "title": "पाठ 2: संख्याएँ 1 से 9 तक (Numbers 1 to 9 & Concrete Counting)",
    "grade": "Class 1",
    "subject": "गणित (संख्याओं का जादू / खेल-खेल में गणित / रोचक गणित)",
    "subject_code": "math",
    "theme": "1 से 9 तक संख्या बोध व स्थानीय सामग्री से गिनती",
    "tribal_title": {
      "santhali_ol": "᱑ ᱠᱷᱚᱱ ᱙ ᱫᱷᱟᱹᱵᱤᱡ ᱞᱮᱠᱷᱟ (मित् खोन आरे धाबिज लेखा)",
      "santhali_dev": "१ खोन ९ धाबिज लेखा (मित् से आरे)",
      "mundari": "मियाद एते अया नंबर लेका",
      "ho": "मोय एते अया नंबर लेका"
    },
    "topics": [
      "1-to-1 संगति से गिनती",
      "संख्या नाम व अंक पहचान",
      "वस्तुओं का मिलान"
    ],
    "subtopics": [
      "1 (मित् / ᱢᱤᱫ), 2 (बार / ᱵᱟᱨ), 3 (पे / ᱯᱮ)",
      "4 (पोन / ᱯᱳᱱ), 5 (मोड़े / ᱢᱚᱬᱮ), 6 (तुरुय / ᱛᱩᱨᱩᱭ)",
      "7 (एयाय / ᱮᱭᱟᱭ), 8 (इराल / ᱤᱨᱟᱹᱞ), 9 (आरे / ᱟᱨᱮ)"
    ],
    "fln_milestones": [
      "1 से 9 तक वस्तुओं को गिनना",
      "अंक और मात्रा का संबंध समझना"
    ],
    "tlem_realia": [
      "सखुआ पत्ते",
      "नदी के गोल कंकड़",
      "माचिस की तीलियाँ"
    ],
    "learning_outcomes": [
      "छात्र 1 से 9 तक ठोस वस्तुओं को सही-सही गिनकर अंक लिख सकेंगे"
    ],
    "duration_minutes": 45,
    "steps": [
      {
        "step_number": 1,
        "type": "गिनती का बालगीत (Counting Rhyme)",
        "time_mins": 15,
        "teacher_hindi": "चलो उँगलियों से गिनते हैं: एक, दो, तीन, चार, पाँच!",
        "dialogue_santhali": {
          "ol_chiki": "ᱫᱮᱞᱟ ᱠᱟᱹᱴᱩᱵ ᱛᱮ ᱵᱚᱱ ᱞᱮᱠᱷᱟᱭᱟ: ᱢᱤᱫ, ᱵᱟᱨ, ᱯᱮ, ᱯᱳᱱ, ᱢᱚᱬᱮ!",
          "dev": "देला काटुब ते बोन लेखाया: मित्, बार, पे, पोन, मोड़े!",
          "rom": "Dela katub te bon lekhaya: Mit, Bar, Pe, Pon, More!"
        },
        "dialogue_mundari": {
          "dev": "देला गांगुली ते बु लेकाये: मियाद, बारिया, अपिया, उपूनिया, मोनेया!",
          "rom": "Dela ganguli te bu lekaye: Miyad, Bariya, Apiya, Upuniya, Moneya!"
        },
        "dialogue_ho": {
          "dev": "देला गांगुली ते बु लेकाये: मोय, बारिया, आपिया, उपून, मोया!",
          "rom": "Dela ganguli te bu lekaye: Moy, Bariya, Apiya, Upun, Moya!"
        }
      }
    ]
  },
  {
    "id": "jcert-c1-m03",
    "textbook": "संख्याओं का जादू भाग 1 (JCERT Class 1)",
    "chapter_number": 3,
    "title": "पाठ 3: जोड़ना और घटाना 1 से 9 (Concrete Addition & Subtraction)",
    "grade": "Class 1",
    "subject": "गणित (संख्याओं का जादू / खेल-खेल में गणित / रोचक गणित)",
    "subject_code": "math",
    "theme": "वस्तुओं को मिलाकर जोड़ना व कम करके घटाव",
    "tribal_title": {
      "santhali_ol": "ᱡᱚᱲᱟᱣ ᱟᱨ ᱜᱷᱟᱴᱟᱣ (Joraw aar Ghataw)",
      "santhali_dev": "जोड़ाव आर घाटाव",
      "mundari": "मिशा आर हटिंग",
      "ho": "मिशा आर हटिंग"
    },
    "topics": [
      "कंकड़ों और पत्तों से जोड़",
      "वस्तुओं को हटाकर घटाव",
      "चिह्न (+) और (-) का ज्ञान"
    ],
    "subtopics": [
      "2 आम + 1 आम = 3 आम",
      "5 कंकड़ में से 2 हटाए = 3 बचे",
      "मातृभाषा में मौखिक जोड़-घटाव"
    ],
    "fln_milestones": [
      "1 से 9 तक एकल अंकीय जोड़ व घटाव ठोस वस्तुओं से करना",
      "गणितीय शब्दावली प्रयोग"
    ],
    "tlem_realia": [
      "सखुआ के सूखे पत्ते",
      "रंगीन कंकड़",
      "माचिस की तीलियों के बंडल"
    ],
    "learning_outcomes": [
      "छात्र ठोस वस्तुओं को जोड़कर और हटाकर दैनिक जीवन के छोटे गणित हल कर सकेंगे"
    ],
    "duration_minutes": 40,
    "steps": [
      {
        "step_number": 1,
        "type": "ठोस सामग्री से जोड़ (Concrete Addition Activity)",
        "time_mins": 15,
        "teacher_hindi": "मेरे हाथ में 2 कंकड़ हैं, 1 और मिलाया तो कितने हुए? तीन!",
        "dialogue_santhali": {
          "ol_chiki": "ᱤᱧᱟᱜ ᱛᱤ ᱨᱮ ᱵᱟᱨᱭᱟ ᱫᱷᱤᱨᱤ ᱢᱮᱱᱟᱜ-ᱟ, ᱢᱤᱫᱴᱟᱝ ᱤᱧ ᱢᱮᱥᱟ ᱠᱮᱫᱟ ᱛᱚ ᱛᱤᱱᱟᱹᱜ ᱦᱩᱭᱮᱱᱟ? ᱯᱮᱭᱟ!",
          "dev": "इञाः ती रे बारया धीरी मेनाः-आ, मिदटांग इञ मेसा केदा तो तीनाः हुयेना? पेया!",
          "rom": "Inyah ti re barya dhiri menah-a, midtang iny mesa keda to tinah huyena? Peya!"
        },
        "dialogue_mundari": {
          "dev": "ऐंयाः ती रे बारिया धीरी मेनाः, मियाद मिशा केदा तो चिमिन जना? अपिया!",
          "rom": "Enyah ti re bariya dhiri menah, miyad misha keda to chimin jana? Apiya!"
        },
        "dialogue_ho": {
          "dev": "ऐंयाः ती रे बारिया धीरी मेनाः, मियाद मिशा केदा तो चिमिन यना? आपिया!",
          "rom": "Enyah ti re bariya dhiri menah, miyad misha keda to chimin yana? Apiya!"
        }
      }
    ]
  },
  {
    "id": "jcert-c1-e01",
    "textbook": "हमारा परिवेश भाग 1 (JCERT Class 1)",
    "chapter_number": 1,
    "title": "पाठ 1: मेरा शरीर व ज्ञानेंद्रियाँ (My Body & Senses)",
    "grade": "Class 1",
    "subject": "पर्यावरण (हमारा परिवेश / हमारी दुनिया)",
    "subject_code": "evs",
    "theme": "शरीर के अंग व उनकी कार्यप्रणाली",
    "tribal_title": {
      "santhali_ol": "ᱟᱵᱚᱣᱟᱜ ᱦᱚᱲᱢᱚ ᱟᱨ ᱩᱱᱤᱭᱟᱜ ᱦᱟᱹᱴᱤᱧ",
      "santhali_dev": "आबोवाः होड़मो आर उनियाः हाटिंञ",
      "mundari": "आबुवाः होड़मो आर हटिंग",
      "ho": "आबुवाः होड़मो आर हटिंग"
    },
    "topics": [
      "शरीर के बाहरी अंग",
      "ज्ञानेंद्रियाँ (आँख, कान, नाक, जीभ, त्वचा)",
      "सफाई"
    ],
    "subtopics": [
      "आँख (मेत् / ᱢᱮᱫ) - देखना",
      "कान (लुतुर / ᱞᱩᱛᱩᱨ) - सुनना",
      "नाक (मुँ / ᱢᱩᱸ) - सूंघना",
      "जीभ (आलांग / ᱟᱞᱟᱝ) - स्वाद लेना"
    ],
    "fln_milestones": [
      "अंगों की पहचान व कार्य बताना",
      "शरीर की सफाई के नियम"
    ],
    "tlem_realia": [
      "शरीर का चार्ट",
      "अंग स्पर्श खेल"
    ],
    "learning_outcomes": [
      "बच्चे अपने अंगों के नाम मातृभाषा व हिन्दी में बोल सकेंगे"
    ],
    "duration_minutes": 40,
    "steps": [
      {
        "step_number": 1,
        "type": "अंग पहचान खेल (Body Parts Song)",
        "time_mins": 15,
        "teacher_hindi": "अपनी आँख छुओ और बोलो - आँख से देखते हैं! संथाली में मेत् कहते हैं।",
        "dialogue_santhali": {
          "ol_chiki": "ᱟᱯᱱᱟᱨ ᱢᱮᱫ ᱡᱚᱴᱮᱫ ᱯᱮ ᱟᱨ ᱨᱚᱲ ᱯᱮ - ᱢᱮᱫ ᱛᱮ ᱵᱚᱱ ᱧᱮᱞᱟ!",
          "dev": "आपनार मेत् जोतेद पे आर रोड़ पे - मेत् ते बोन ञेला!",
          "rom": "Apnar med joted pe aar ror pe - med te bon nyela!"
        },
        "dialogue_mundari": {
          "dev": "अपना मेद जोतोम पे आर काजी पे - मेद ते बु नेले!",
          "rom": "Apna med jotam pe aar kaji pe - med te bu nele!"
        },
        "dialogue_ho": {
          "dev": "अपना मेद जोतोम पे आर कजी पे - मेद ते बु नेले!",
          "rom": "Apna med jotam pe aar kaji pe - med te bu nele!"
        }
      }
    ]
  },
  {
    "id": "jcert-c1-e02",
    "textbook": "हमारा परिवेश भाग 1 (JCERT Class 1)",
    "chapter_number": 2,
    "title": "पाठ 2: मेरा विद्यालय और खेल (My School & Games)",
    "grade": "Class 1",
    "subject": "पर्यावरण (हमारा परिवेश / हमारी दुनिया)",
    "subject_code": "evs",
    "theme": "विद्यालयी जीवन व पारंपरिक खेल",
    "tribal_title": {
      "santhali_ol": "ᱟᱵᱚᱣᱟᱜ ᱟᱥᱲᱟ ᱟᱨ ᱮᱱᱮᱡ-ᱥᱮᱨᱮᱧ",
      "santhali_dev": "आबोवाः आसड़ा आर एनेज-सेरेञ",
      "mundari": "आबुवाः इसकुल आर सुसुन-दुरंग",
      "ho": "आबुवाः इसकुल आर सुसुन-दुरंग"
    },
    "topics": [
      "विद्यालय का परिवेश",
      "शिक्षक व सहपाठी",
      "अखड़ा व खेल"
    ],
    "subtopics": [
      "विद्यालय (आसड़ा / ᱟᱥᱲᱟ)",
      "शिक्षक (माचेत / ᱢᱟᱪᱮᱛ)",
      "मित्र (गाते / ᱜᱟᱛᱮ)"
    ],
    "fln_milestones": [
      "सहपाठियों के साथ खेलना",
      "कक्षा के नियमों का पालन"
    ],
    "tlem_realia": [
      "मांदर (तुमदाः)",
      "खेल सामग्री"
    ],
    "learning_outcomes": [
      "विद्यालय के प्रति रुचि व सकारात्मक दृष्टिकोण बनेगा"
    ],
    "duration_minutes": 40,
    "steps": [
      {
        "step_number": 1,
        "type": "विद्यालय परिचय (School Conversation)",
        "time_mins": 15,
        "teacher_hindi": "हमारा विद्यालय (आसड़ा) बहुत सुंदर है। यहाँ हम पढ़ते और खेलते हैं।",
        "dialogue_santhali": {
          "ol_chiki": "ᱟᱵᱚᱣᱟᱜ ᱟᱥᱲᱟ ᱫᱚ ᱟᱹᱰᱤ ᱱᱟᱯᱟᱭᱟ᱾ ᱱᱚᱸᱰᱮ ᱟᱵᱚ ᱵᱚᱱ ᱯᱟᱲᱦᱟᱣᱜ-ᱟ ᱟᱨ ᱵᱚᱱ ᱮᱱᱮᱡᱟ᱾",
          "dev": "आबोवाः आसड़ा दो आडी नापाया। नोंडे आबो बोन पाड़हावः-आ आर बोन एनेजा।",
          "rom": "Abowah asra do adi napaya. Nonde abo bon parhawh-a aar bon eneja."
        },
        "dialogue_mundari": {
          "dev": "आबुवाः इसकुल पुरो बोगि ताना। नेरे आबु बु पाड़हाव आर बु एनेजे।",
          "rom": "Abuwah iskul puro bogi tana. Nere abu bu parhaw aar bu eneje."
        },
        "dialogue_ho": {
          "dev": "आबुवाः इसकुल पुरो बुगिन तना। नेरे आबु बु पाड़हाव आर बु एनेजे।",
          "rom": "Abuwah iskul puro bugin tana. Nere abu bu parhaw aar bu eneje."
        }
      }
    ]
  },
  {
    "id": "jcert-c1-e03",
    "textbook": "हमारा परिवेश भाग 1 (JCERT Class 1)",
    "chapter_number": 3,
    "title": "पाठ 3: हमारा प्यारा भोजन और पानी (Our Food & Clean Water)",
    "grade": "Class 1",
    "subject": "पर्यावरण (हमारा परिवेश / हमारी दुनिया)",
    "subject_code": "evs",
    "theme": "स्वच्छ भोजन, फल, साग-भाजी व शुद्ध पेयजल",
    "tribal_title": {
      "santhali_ol": "ᱟᱵᱚᱣᱟᱜ ᱡᱚᱢᱟᱜ ᱟᱨ ᱥᱟᱯᱷᱟ ᱫᱟᱜ",
      "santhali_dev": "आबोवाः जोमाः आर साफा दाः",
      "mundari": "आबुवाः जोमाः आर साफा दाः",
      "ho": "आबुवाः जोमाः आर साफा दाः"
    },
    "topics": [
      "पारंपरिक भोजन (दाल-भात, मड़ुआ रोटी)",
      "साग व मौसमी फल",
      "पानी की स्वच्छता व हाथ धोना"
    ],
    "subtopics": [
      "चावल/भात (दाका / ᱫᱟᱠᱟ)",
      "साग (आड़ाः / ᱟᱲᱟᱜ)",
      "पानी (दाः / ᱫᱟᱜ)",
      "खाने से पहले साबुन से हाथ धोना"
    ],
    "fln_milestones": [
      "स्वस्थ खान-पान की पहचान",
      "भोजन से पूर्व स्वच्छता की आदत"
    ],
    "tlem_realia": [
      "स्थानीय अनाजों के नमूने (मड़ुआ, धान, मक्का)",
      "साग-सब्जियों के चित्र"
    ],
    "learning_outcomes": [
      "स्वच्छ व पौष्टिक आहार का महत्व जानेंगे"
    ],
    "duration_minutes": 40,
    "steps": [
      {
        "step_number": 1,
        "type": "भोजन व स्वच्छता चर्चा (Healthy Food & Handwash)",
        "time_mins": 15,
        "teacher_hindi": "खाना खाने से पहले साबुन से हाथ धोना चाहिए। भात (दाका) और साग (आड़ाः) खाकर हम मजबूत बनते हैं।",
        "dialogue_santhali": {
          "ol_chiki": "ᱡᱚᱢ ᱢᱟᱲᱟᱝ ᱨᱮ ᱥᱟᱵᱩᱱ ᱛᱮ ᱛᱤ ᱟᱹᱨᱩᱵ ᱯᱮ᱾ ᱫᱟᱠᱟ ᱟᱨ ᱟᱲᱟᱜ ᱡᱚᱢ ᱠᱟᱛᱮ ᱟᱵᱚ ᱵᱚᱱ ᱫᱟᱲᱮᱭᱟᱱᱟ᱾",
          "dev": "जोम माड़ांग रे साबुन ते ती आरुब पे। दाका आर आड़ाः जोम काते आबो बोन दाड़ेयाना।",
          "rom": "Jom marang re sabun te ti arub pe. Daka aar arag jom kate abo bon dareyana."
        },
        "dialogue_mundari": {
          "dev": "जोम सिदारे साबुन ते ती आबुन पे। मांडी आर आड़ाः जोम काते आबु केतेद बु बाई ओवा।",
          "rom": "Jom sidare sabun te ti abun pe. Mandi aar arah jom kate abu keted bu bai owa."
        },
        "dialogue_ho": {
          "dev": "जोम सिदारे साबुन ते ती आबुन पे। मंडी आर आड़ाः जोम काते आबु केतेद बु बाई ओवा।",
          "rom": "Jom sidare sabun te ti abun pe. Mandi aar arah jom kate abu keted bu bai owa."
        }
      }
    ]
  },
  {
    "id": "jcert-c1-eng01",
    "textbook": "Blooming Buds 1 (JCERT Class 1)",
    "chapter_number": 1,
    "title": "Unit 1: Greetings & Alphabet Fun (अक्षर ज्ञान व अभिवादन)",
    "grade": "Class 1",
    "subject": "English (Blooming Buds / Sunrise / Sunshine)",
    "subject_code": "english",
    "theme": "English Greetings, Alphabet & Phonics",
    "tribal_title": {
      "santhali_ol": "ᱤᱝᱞᱤᱥ ᱥᱮᱪᱮᱫ: ᱡᱚᱦᱟᱨ ᱟᱨ ᱟᱞᱯᱷᱟᱵᱮᱴ",
      "santhali_dev": "इंग्लिश सेचेद: जोहार आर अल्फाबेट",
      "mundari": "इंग्लिश इतु: जोहार आर अल्फाबेट",
      "ho": "इंग्लिश इतु: जोहार आर अल्फाबेट"
    },
    "topics": [
      "Greetings (Good Morning, Hello)",
      "Alphabet Letters A to H",
      "Letter Sounds"
    ],
    "subtopics": [
      "A for Apple (सेब / ᱥᱮᱵᱽ)",
      "B for Bird (चिड़िया / चेणे / ᱪᱮᱬᱮ)",
      "C for Cat (बिल्ली / पुसी / ᱯᱩᱥᱤ)",
      "D for Drum (मांदर / तुमदाः / ᱛᱩᱢᱫᱟᱜ)"
    ],
    "fln_milestones": [
      "Simple English greeting response",
      "Letter-sound recognition"
    ],
    "tlem_realia": [
      "Alphabet flashcards with tribal/Hindi pictures"
    ],
    "learning_outcomes": [
      "Respond to Good morning with Good morning and recognize initial letters"
    ],
    "duration_minutes": 35,
    "steps": [
      {
        "step_number": 1,
        "type": "Greeting & Hello Song (अभिवादन अभ्यास)",
        "time_mins": 15,
        "teacher_hindi": "Say Good Morning! संथाली में सगुन सेताः और अंग्रेजी में Good Morning कहते हैं।",
        "dialogue_santhali": {
          "ol_chiki": "ᱨᱚᱲ ᱯᱮ: ᱜᱩᱰ ᱢᱚᱨᱱᱤᱝ! ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ ᱥᱟᱹᱜᱩᱱ ᱥᱮᱛᱟᱜ ᱟᱨ ᱤᱝᱞᱤᱥ ᱛᱮ Good Morning.",
          "dev": "रोड़ पे: गुड मोर्निंग! सानताड़ी ते सगुन सेताः आर इंग्लिश ते Good Morning.",
          "rom": "Ror pe: Good Morning! Santali te sagun setah aar English te Good Morning."
        },
        "dialogue_mundari": {
          "dev": "काजी पे: गुड मोर्निंग! मुंडारी ते बोगि सेताः आर इंग्लिश ते Good Morning.",
          "rom": "Kaji pe: Good Morning! Mundari te bogi setah aar English te Good Morning."
        },
        "dialogue_ho": {
          "dev": "कजी पे: गुड मोर्निंग! हो ते बोगि सेताः आर इंग्लिश ते Good Morning.",
          "rom": "Kaji pe: Good Morning! Ho te bogi setah aar English te Good Morning."
        }
      }
    ]
  },
  {
    "id": "jcert-c1-eng02",
    "textbook": "Blooming Buds 1 (JCERT Class 1)",
    "chapter_number": 2,
    "title": "Unit 2: Animals, Birds and Sounds (पशु-पक्षी व ध्वनियाँ)",
    "grade": "Class 1",
    "subject": "English (Blooming Buds / Sunrise / Sunshine)",
    "subject_code": "english",
    "theme": "Animal Vocabulary, Sounds & Letters I to P",
    "tribal_title": {
      "santhali_ol": "ᱡᱟᱱᱣᱟᱨ ᱟᱨ ᱪᱮᱬᱮ ᱠᱚᱣᱟᱜ ᱨᱚᱲ",
      "santhali_dev": "जानवार आर चेणे कोवाः रोड़",
      "mundari": "जीब-जीयली आर चेड़े कोवाः कजी",
      "ho": "जीब-जीयली आर चेणे कोवाः कजी"
    },
    "topics": [
      "Pet Animals (Dog, Cow, Goat)",
      "Birds (Parrot, Crow, Peacock)",
      "Letters I to P"
    ],
    "subtopics": [
      "Dog says Bow-wow (सेता / ᱥᱮᱛᱟ)",
      "Cow says Moo-moo (गाई / ᱜᱟᱹᱭ)",
      "Peacock dances in rain (माराः / ᱢᱟᱨᱟᱜ)"
    ],
    "fln_milestones": [
      "Identifying animal pictures and mimicking English sounds",
      "Phonics for I to P"
    ],
    "tlem_realia": [
      "Animal flashcards",
      "Audio animal calls"
    ],
    "learning_outcomes": [
      "Children can name 5 common domestic animals in English and mimic their sounds"
    ],
    "duration_minutes": 35,
    "steps": [
      {
        "step_number": 1,
        "type": "Animal Phonics (पशु ध्वनि अभ्यास)",
        "time_mins": 15,
        "teacher_hindi": "Dog says Bow-wow! Cow says Moo! संथाली में गाय को गाई (ᱜᱟᱹᱭ) कहते हैं।",
        "dialogue_santhali": {
          "ol_chiki": "ᱥᱮᱛᱟ ᱫᱚ ᱵᱷᱚᱣ-ᱵᱷᱚᱣ ᱟᱨ ᱜᱟᱹᱭ ᱫᱚ ᱦᱟᱢᱵᱟᱭ ᱨᱚᱲᱟ᱾ ᱤᱝᱞᱤᱥ ᱛᱮ Cow ᱟᱨ Dog ᱵᱚᱱ ᱢᱮᱛᱟᱜ-ᱟ᱾",
          "dev": "सेता दो भौ-भौ आर गाई दो हाम्बाय रोड़ा। इंग्लिश ते Cow आर Dog बोन मेताः-आ।",
          "rom": "Seta do bhow-bhow aar gay do hambay rora. English te Cow aar Dog bon metah-a."
        },
        "dialogue_mundari": {
          "dev": "सेता भौ-भौ आर उरीः हाम्बा कजीये। इंग्लिश ते Cow आर Dog बु काजीये।",
          "rom": "Seta bhow-bhow aar urih hamba kajiye. English te Cow aar Dog bu kajiye."
        },
        "dialogue_ho": {
          "dev": "सेता भौ-भौ आर उरीः हाम्बा कजीये। इंग्लिश ते Cow आर Dog बु कजीये।",
          "rom": "Seta bhow-bhow aar urih hamba kajiye. English te Cow aar Dog bu kajiye."
        }
      }
    ]
  },
  {
    "id": "jcert-c1-eng03",
    "textbook": "Blooming Buds 1 (JCERT Class 1)",
    "chapter_number": 3,
    "title": "Unit 3: Colors and Shapes Around Us (रंग और आकृतियाँ)",
    "grade": "Class 1",
    "subject": "English (Blooming Buds / Sunrise / Sunshine)",
    "subject_code": "english",
    "theme": "Colors (Red, Green, Blue, Yellow) & Letters Q to Z",
    "tribal_title": {
      "santhali_ol": "ᱨᱚᱝ ᱟᱨ ᱜᱚᱲᱦᱚᱱ ᱪᱮᱫ",
      "santhali_dev": "रोंग आर गोड़होन चेद",
      "mundari": "रंग आर रूप इतु",
      "ho": "रंग आर रूप इतु"
    },
    "topics": [
      "Colors in nature (Red flower, Green leaf, Blue sky)",
      "Shapes (Circle, Square, Triangle)",
      "Letters Q to Z"
    ],
    "subtopics": [
      "Red (आराः / ᱟᱨᱟᱜ)",
      "Green (हारियाड़ / ᱦᱟᱹᱨᱤᱭᱟᱹᱲ)",
      "Circle like the Sun (सिंगी / ᱥᱤᱸᱜᱤ)"
    ],
    "fln_milestones": [
      "Naming basic colors in English",
      "Drawing circles and squares"
    ],
    "tlem_realia": [
      "Colored leaves and flowers",
      "Clay shape models"
    ],
    "learning_outcomes": [
      "Identify 4 primary colors in everyday classroom objects"
    ],
    "duration_minutes": 35,
    "steps": [
      {
        "step_number": 1,
        "type": "Color Rhyme (रंग पहचान)",
        "time_mins": 15,
        "teacher_hindi": "Red is the flower, Green is the leaf! लाल फूल और हरा पत्ता!",
        "dialogue_santhali": {
          "ol_chiki": "ᱟᱨᱟᱜ ᱵᱟᱦᱟ ᱟᱨ ᱦᱟᱹᱨᱤᱭᱟᱹᱲ ᱥᱟᱠᱟᱢ! Red flower, Green leaf!",
          "dev": "आराः बाहा आर हारियाड़ साकाम! Red flower, Green leaf!",
          "rom": "Arah baha aar hariyar sakam! Red flower, Green leaf!"
        },
        "dialogue_mundari": {
          "dev": "आराः बा आर हरियर साकाम! Red flower, Green leaf!",
          "rom": "Arah ba aar hariyar sakam! Red flower, Green leaf!"
        },
        "dialogue_ho": {
          "dev": "आराः बा आर हरियर साकाम! Red flower, Green leaf!",
          "rom": "Arah ba aar hariyar sakam! Red flower, Green leaf!"
        }
      }
    ]
  },
  {
    "id": "jcert-c2-h01",
    "textbook": "सखुआ भाग 2 (JCERT Class 2)",
    "chapter_number": 1,
    "title": "पाठ 1: सूरज चमका (The Sun Shines Bright)",
    "grade": "Class 2",
    "subject": "हिन्दी (मांदर / सखुआ / भाषांजलि)",
    "subject_code": "hindi",
    "theme": "प्रभात बेला, श्रम व कर्मशीलता",
    "tribal_title": {
      "santhali_ol": "ᱥᱤᱸᱜᱤ ᱪᱟᱸᱫᱚ ᱡᱩᱞ ᱮᱱᱟ (Singi Chando Jul Ena)",
      "santhali_dev": "सिंगी चान्दो जुल एना",
      "mundari": "सिंगी जुल जना",
      "ho": "सिंगी जुल यना"
    },
    "topics": [
      "प्रभात काल का सौंदर्य",
      "कर्मशीलता",
      "कविता गायन"
    ],
    "subtopics": [
      "सूरज की लालिमा व सवेरा",
      "खेतों में काम करने जाते किसान (चासी / ᱪᱟᱥᱤ)",
      "कविताओं का लयबद्ध सस्वर वाचन"
    ],
    "fln_milestones": [
      "कविता को हाव-भाव से गाना",
      "नए शब्दों का अर्थ समझना"
    ],
    "tlem_realia": [
      "प्रभात दृश्य चार्ट",
      "कविता पोस्टर"
    ],
    "learning_outcomes": [
      "सवेरे की ताजगी और मेहनत के महत्व को समझ सकेंगे"
    ],
    "duration_minutes": 40,
    "steps": [
      {
        "step_number": 1,
        "type": "कविता सस्वर पाठ (Poem Recitation)",
        "time_mins": 15,
        "teacher_hindi": "सूरज चमका, अंधियारा भागा! सब बच्चे मिलकर कविता गाएँगे।",
        "dialogue_santhali": {
          "ol_chiki": "ᱥᱤᱸᱜᱤ ᱪᱟᱸᱫᱚ ᱡᱩᱞ ᱮᱱᱟ, ᱧᱩᱛ ᱫᱚ ᱥᱟᱦᱟ ᱮᱱᱟ! ᱫᱮᱞᱟ ᱡᱚᱛᱚ ᱦᱚᱲ ᱢᱮᱥᱟ ᱠᱟᱛᱮ ᱵᱚᱱ ᱥᱮᱨᱮᱧᱟ᱾",
          "dev": "सिंगी चान्दो जुल एना, ञुत दो साहा एना! देला जोतो होड़ मेसा काते बोन सेरेञा।",
          "rom": "Singi chando jul ena, nyut do saha ena! Dela joto hor mesa kate bon serenya."
        },
        "dialogue_mundari": {
          "dev": "सिंगी जुल जना, नुत साहा जना! सोबेन को मिशा काते बु दुरंगे।",
          "rom": "Singi jul jana, nut saha jana! Soben ko misha kate bu durange."
        },
        "dialogue_ho": {
          "dev": "सिंगी जुल यना, नुत साहा यना! सोबेन को मिशा काते बु दुरंगे।",
          "rom": "Singi jul yana, nut saha yana! Soben ko misha kate bu durange."
        }
      }
    ]
  },
  {
    "id": "jcert-c2-h02",
    "textbook": "सखुआ भाग 2 (JCERT Class 2)",
    "chapter_number": 2,
    "title": "पाठ 2: चालाक सियार और बूढ़ा शेर (The Clever Jackal)",
    "grade": "Class 2",
    "subject": "हिन्दी (मांदर / सखुआ / भाषांजलि)",
    "subject_code": "hindi",
    "theme": "बुद्धिमत्ता, लोक कथा व संकट समाधान",
    "tribal_title": {
      "santhali_ol": "ᱪᱟᱞᱟᱠ ᱛᱩᱭᱩ ᱟᱨ ᱦᱟᱲᱟᱢ ᱠᱩᱞ (Chalak Tuyu)",
      "santhali_dev": "चालाक तुयु आर हाड़ाम कुल",
      "mundari": "चालाक तुयू आर हाड़ाम कुला",
      "ho": "चालाक तुयू आर हाड़ाम कुला"
    },
    "topics": [
      "लोक कथा वाचन",
      "पात्र अभिनय",
      "बुद्धिमत्ता का महत्व"
    ],
    "subtopics": [
      "जंगल का राजा शेर (कुल / ᱛᱟᱹᱨᱩᱵ)",
      "चालाक सियार (तुयु / ᱛᱩᱭᱩ)",
      "सूझबूझ से अपनी व दूसरों की जान बचाना"
    ],
    "fln_milestones": [
      "कहानी की घटनाओं का सही क्रम बताना",
      "पात्रों का अभिनय करना"
    ],
    "tlem_realia": [
      "शेर और सियार के मुखौटे",
      "कहानी चित्र पट्टिका"
    ],
    "learning_outcomes": [
      "मुसीबत के समय घबराने के बजाय बुद्धि से काम लेना सीखेंगे"
    ],
    "duration_minutes": 45,
    "steps": [
      {
        "step_number": 1,
        "type": "कहानी का वाचन (Story Narration)",
        "time_mins": 15,
        "teacher_hindi": "एक जंगल में बूढ़ा शेर रहता था। चालाक सियार ने अपनी बुद्धि से सबको बचाया।",
        "dialogue_santhali": {
          "ol_chiki": "ᱢᱤᱫ ᱵᱤᱨ ᱨᱮ ᱦᱟᱲᱟᱢ ᱠᱩᱞ ᱮ ᱛᱟᱦᱮᱸᱠᱟᱱᱟ᱾ ᱪᱟᱞᱟᱠ ᱛᱩᱭᱩ ᱟᱡᱟᱜ ᱵᱩᱫᱷᱤ ᱛᱮ ᱡᱚᱛᱚ ᱦᱚᱲ ᱮ ᱵᱟᱧᱪᱟᱣ ᱠᱮᱫ ᱠᱚᱣᱟ᱾",
          "dev": "मित् बीर रे हाड़ाम कुल ए ताहेकाना। चालाक तुयु आजाः बुद्धि ते जोतो होड़ ए बांचाव केद कोवा।",
          "rom": "Mit bir re haram kul e tahekana. Chalak tuyu ajah buddhi te joto hor e banchaw ked kowa."
        },
        "dialogue_mundari": {
          "dev": "मियाद बीर रे हाड़ाम कुला ताएकेना। चालाक तुयू अपना बुद्धि ते सोबेन को बांचाव केद कोवा।",
          "rom": "Miyad bir re haram kula taekena. Chalak tuyu apna buddhi te soben ko banchaw ked kowa."
        },
        "dialogue_ho": {
          "dev": "मोय बीर रे हाड़ाम कुला तयकेना। चालाक तुयू अपना बुद्धि ते सोबेन को बांचाव केद कोवा।",
          "rom": "Moy bir re haram kula taykena. Chalak tuyu apna buddhi te soben ko banchaw ked kowa."
        }
      }
    ]
  },
  {
    "id": "jcert-c2-h03",
    "textbook": "सखुआ भाग 2 (JCERT Class 2)",
    "chapter_number": 3,
    "title": "पाठ 3: सोहराय का पर्व और भित्ति चित्र (Sohrai Murals)",
    "grade": "Class 2",
    "subject": "हिन्दी (मांदर / सखुआ / भाषांजलि)",
    "subject_code": "hindi",
    "theme": "सोहराय कला, पशु पूजा व लोक संस्कृति",
    "tribal_title": {
      "santhali_ol": "ᱥᱚᱦᱨᱟᱭ ᱯᱚᱨᱚᱵᱽ ᱟᱨ ᱠᱷᱟᱸᱫᱽᱨᱤ ᱪᱤᱛᱟᱹᱨ",
      "santhali_dev": "सोहराय परोब आर खांदरी चितार",
      "mundari": "सोहराय परोब आर भित्ती चोबी",
      "ho": "सोहराय परोब आर भित्ती चोबी"
    },
    "topics": [
      "पशु धन की पूजा",
      "दीवारों पर मिट्टी व प्राकृतिक रंगों से चित्रकारी",
      "सोहराय गीत"
    ],
    "subtopics": [
      "गोवर्धन पूजा व गाय-बैलों को सजाना",
      "सोहराय व कोहबर कला (हाथी, मोर, हिरण के चित्र)",
      "मांदर की थाप पर सामूहिक नृत्य"
    ],
    "fln_milestones": [
      "स्थानीय कला के बारे में अपने विचार व्यक्त करना",
      "चित्र देखकर कहानी बनाना"
    ],
    "tlem_realia": [
      "सोहराय पेंटिंग के नमूने",
      "प्राकृतिक रंग (लाल, काली व सफेद मिट्टी)"
    ],
    "learning_outcomes": [
      "झारखंड की समृद्ध सोहराय चित्रकला और पशु प्रेम के प्रति गर्व महसूस करेंगे"
    ],
    "duration_minutes": 45,
    "steps": [
      {
        "step_number": 1,
        "type": "सोहराय कला परिचय (Sohrai Art Discussion)",
        "time_mins": 15,
        "teacher_hindi": "सोहराय में माताएँ और बहनें घर की दीवारों पर सुंदर चित्र बनाती हैं।",
        "dialogue_santhali": {
          "ol_chiki": "ᱥᱚᱦᱨᱟᱭ ᱨᱮ ᱟᱭᱳ ᱟᱨ ᱢᱤᱥᱤ ᱠᱚ ᱳᱲᱟᱜ ᱨᱮᱭᱟᱜ ᱵᱷᱤᱛ ᱨᱮ ᱟᱹᱰᱤ ᱱᱟᱯᱟᱭ ᱪᱤᱛᱟᱹᱨ ᱠᱚ ᱵᱮᱱᱟᱣᱟ᱾",
          "dev": "सोहराय रे आयो आर मिसि को ओड़ाः रेयाः भीत रे आडी नापाय चितार को बेनावा।",
          "rom": "Sohray re ayo aar misi ko orah reyah bhit re adi napay chitar ko benawa."
        },
        "dialogue_mundari": {
          "dev": "सोहराय रे एंगा आर मिसि को ओड़ाः भीत रे पुरो बोगि चोबी बई ये।",
          "rom": "Sohray re enga aar misi ko orah bhit re puro bogi chobi bai ye."
        },
        "dialogue_ho": {
          "dev": "सोहराय रे एंगा आर मिसि को ओड़ाः भीत रे पुरो बुगिन चोबी बाई ये।",
          "rom": "Sohray re enga aar misi ko orah bhit re puro bugin chobi bai ye."
        }
      }
    ]
  },
  {
    "id": "jcert-c2-m01",
    "textbook": "खेल-खेल में गणित 2 (JCERT Class 2)",
    "chapter_number": 1,
    "title": "पाठ 1: लम्बा क्या है, गोल क्या है? (Rolling & Sliding)",
    "grade": "Class 2",
    "subject": "गणित (संख्याओं का जादू / खेल-खेल में गणित / रोचक गणित)",
    "subject_code": "math",
    "theme": "आकृतियों की समझ, लुढ़कना व खिसकना",
    "tribal_title": {
      "santhali_ol": "ᱡᱤᱞᱤᱧ ᱪᱮᱫ ᱠᱟᱱᱟ, ᱜᱩᱞᱟᱹᱭ ᱪᱮᱫ ᱠᱟᱱᱟ?",
      "santhali_dev": "जिलिंञ चेद काना, गुलाय चेद काना?",
      "mundari": "जिलिंग चिनाः ताना, गोल चिनाः ताना?",
      "ho": "जिलिंग चिनाः तना, गोल चिनाः तना?"
    },
    "topics": [
      "लम्बी व गोल वस्तुएँ",
      "लुढ़कने वाली वस्तुएँ (Rolling)",
      "खिसकने वाली वस्तुएँ (Sliding)"
    ],
    "subtopics": [
      "गेंद, कंचा, मांदर - लुढ़कना (गुड़दौ / ᱜᱩᱲᱫᱟᱹᱣ)",
      "किताब, माचिस की डिब्बी - खिसकना (खिसकाव / ᱠᱷᱤᱥᱠᱟᱹᱣ)",
      "सिक्का - लुढ़कना और खिसकना दोनों"
    ],
    "fln_milestones": [
      "वस्तुओं के भौतिक गुणों की पहचान",
      "वर्गीकरण कौशल"
    ],
    "tlem_realia": [
      "माटी की गेंद",
      "बांस की बांसुरी",
      "किताब व माचिस बॉक्स"
    ],
    "learning_outcomes": [
      "छात्र अपने परिवेश की वस्तुओं को देखकर बता सकेंगे कि कौन लुढ़कती है और कौन खिसकती है"
    ],
    "duration_minutes": 40,
    "steps": [
      {
        "step_number": 1,
        "type": "लुढ़कने का प्रयोग (Rolling vs Sliding Experiment)",
        "time_mins": 15,
        "teacher_hindi": "देखो, गेंद लुढ़कती है (गुड़दौ) और किताब खिसकती है!",
        "dialogue_santhali": {
          "ol_chiki": "ᱧᱮᱞ ᱯᱮ, ᱵᱚᱞ ᱫᱚ ᱜᱩᱲᱫᱟᱹᱣᱜ-ᱟ ᱟᱨ ᱯᱚᱛᱚᱵ ᱫᱚ ᱠᱷᱤᱥᱠᱟᱹᱣᱜ-ᱟ!",
          "dev": "ञेल पे, बोल दो गुड़दौः-आ आर पोतोब दो खिसकौः-आ!",
          "rom": "Nyel pe, bol do gurdawh-a aar potob do khiskawh-a!"
        },
        "dialogue_mundari": {
          "dev": "नेले पे, गेंद रोलिंग ताना आर पुथी खिसकौ ताना!",
          "rom": "Nele pe, ball rolling tana aar puthi khiskow tana!"
        },
        "dialogue_ho": {
          "dev": "नेले पे, गेंद रोलिंग तना आर पुथी खिसकौ तना!",
          "rom": "Nele pe, ball rolling tana aar puthi khiskow tana!"
        }
      }
    ]
  },
  {
    "id": "jcert-c2-m02",
    "textbook": "खेल-खेल में गणित 2 (JCERT Class 2)",
    "chapter_number": 2,
    "title": "पाठ 2: दस-दस के समूह में गिनना (Counting in Groups of 10)",
    "grade": "Class 2",
    "subject": "गणित (संख्याओं का जादू / खेल-खेल में गणित / रोचक गणित)",
    "subject_code": "math",
    "theme": "इकाई-दहाई की समझ व बंडल-तीली विधि",
    "tribal_title": {
      "santhali_ol": "ᱜᱮᱞ-ᱜᱮᱞ ᱨᱮᱭᱟᱜ ᱜᱩᱴ ᱞᱮᱠᱷᱟ (Gel-Gel Guto Lekha)",
      "santhali_dev": "गेल-गेल रेयाः गुट लेखा",
      "mundari": "गेल-गेल रेयाः समूह लेका",
      "ho": "गेल-गेल रेयाः समूह लेका"
    },
    "topics": [
      "10-10 के बंडल बनाना",
      "इकाई और दहाई (Ones & Tens)",
      "संख्याएँ 10 से 99 तक"
    ],
    "subtopics": [
      "10 तीलियों का 1 बंडल = 1 दहाई (मित् गेल / ᱢᱤᱫ ᱜᱮᱞ)",
      "2 बंडल और 3 तीलियाँ = 23 (बार गेल पे / ᱵᱟᱨ ᱜᱮᱞ ᱯᱮ)",
      "स्थानीय मान की प्रारंभिक समझ"
    ],
    "fln_milestones": [
      "2-अंकीय संख्याओं को बंडल व खुली तीलियों में व्यक्त करना",
      "दहाई-इकाई पहचान"
    ],
    "tlem_realia": [
      "झाड़ू की तीलियाँ",
      "रबड़ बैंड",
      "कंकड़ व टोकन"
    ],
    "learning_outcomes": [
      "छात्र 10 से 99 तक संख्याओं को 10-10 के समूह बनाकर सरलता से समझ सकेंगे"
    ],
    "duration_minutes": 45,
    "steps": [
      {
        "step_number": 1,
        "type": "बंडल बनाने की गतिविधि (Bundle Making Activity)",
        "time_mins": 15,
        "teacher_hindi": "10 तीलियों को मिलाकर एक बंडल (गेल) बनाओ। 2 बंडल का मतलब 20!",
        "dialogue_santhali": {
          "ol_chiki": "᱑᱐ ᱜᱚᱴᱟᱝ ᱡᱷᱟᱲᱩ ᱠᱟᱹᱴᱷᱤ ᱢᱮᱥᱟ ᱠᱟᱛᱮ ᱢᱤᱫᱴᱟᱝ ᱜᱮᱞ (ᱵᱟᱱᱰᱤ) ᱵᱮᱱᱟᱣ ᱯᱮ᱾ ᱵᱟᱨᱭᱟ ᱜᱮᱞ ᱢᱮᱱᱮᱛ ᱫᱚ ᱒᱐!",
          "dev": "१० गोटांग झाड़ू काठी मेसा काते मिदटांग गेल (बान्डी) बेनाव पे। बारया गेल मेनेत दो २०!",
          "rom": "10 gotang jharu kathi mesa kate midtang gel (bandi) benaw pe. Barya gel menet do 20!"
        },
        "dialogue_mundari": {
          "dev": "१० टांग काठी मिशा काते मियाद बंडल बई पे। बारिया गेल मेनेते २० ताना!",
          "rom": "10 tang kathi misha kate miyad bundle bai pe. Bariya gel menete 20 tana!"
        },
        "dialogue_ho": {
          "dev": "१० टांग काठी मिशा काते मियाद बंडल बाई पे। बारिया गेल मेनेते २० तना!",
          "rom": "10 tang kathi misha kate miyad bundle bai pe. Bariya gel menete 20 tana!"
        }
      }
    ]
  },
  {
    "id": "jcert-c2-m03",
    "textbook": "खेल-खेल में गणित 2 (JCERT Class 2)",
    "chapter_number": 3,
    "title": "पाठ 3: बिन्दुओं का खेल व सोहराय पैटर्न (Shapes & Sohrai Art Patterns)",
    "grade": "Class 2",
    "subject": "गणित (संख्याओं का जादू / खेल-खेल में गणित / रोचक गणित)",
    "subject_code": "math",
    "theme": "बिन्दुओं की ग्रिड, ज्यामितीय आकृतियाँ व सोहराय कला",
    "tribal_title": {
      "santhali_ol": "ᱴᱩᱰᱟᱹᱜ ᱨᱮᱭᱟᱜ ᱮᱱᱮᱡ ᱟᱨ ᱥᱚᱦᱨᱟᱭ ᱪᱤᱛᱟᱹᱨ",
      "santhali_dev": "टुडाः रेयाः एनेज आर सोहराय चितार",
      "mundari": "टुडाः रेयाः खेल आर सोहराय चोबी",
      "ho": "टुडाः रेयाः खेल आर सोहराय चोबी"
    },
    "topics": [
      "बिन्दु ग्रिड पर रेखाएँ खींचना",
      "त्रिभुज, आयत, वर्ग व वृत्त",
      "सोहराय और कोहबर के पारंपरिक पैटर्न"
    ],
    "subtopics": [
      "सोहराय में ज्यामितीय रेखाएँ",
      "पैटर्न पहचान व आगे बढ़ाना (Repeating Patterns)",
      "रंगोली व भित्ति चित्र में गणित"
    ],
    "fln_milestones": [
      "2D आकृतियों के कोने और भुजाएँ गिनना",
      "पैटर्न को पहचानकर पूरा करना"
    ],
    "tlem_realia": [
      "डॉट ग्रिड पेपर",
      "सोहराय कला चार्ट",
      "रंगीन चाक"
    ],
    "learning_outcomes": [
      "छात्र स्थानीय लोककला और ज्यामितीय आकृतियों के संबंध को समझकर पैटर्न बना सकेंगे"
    ],
    "duration_minutes": 45,
    "steps": [
      {
        "step_number": 1,
        "type": "पैटर्न निर्माण गतिविधि (Pattern Creation Activity)",
        "time_mins": 15,
        "teacher_hindi": "बिन्दुओं को जोड़कर त्रिभुज और सोहराय का मछली पैटर्न बनाओ!",
        "dialogue_santhali": {
          "ol_chiki": "ᱴᱩᱰᱟᱹᱜ ᱡᱚᱲᱟᱣ ᱠᱟᱛᱮ ᱯᱮ ᱠᱳᱬ (Tribhuj) ᱟᱨ ᱦᱟᱹᱠᱩ ᱪᱤᱛᱟᱹᱨ ᱵᱮᱱᱟᱣ ᱯᱮ!",
          "dev": "टुडाः जोड़ाव काते पे कोण (त्रिभुज) आर हाकु चितार बेनाव पे!",
          "rom": "Tudah joraw kate pe kon (tribhuj) aar haku chitar benaw pe!"
        },
        "dialogue_mundari": {
          "dev": "टुडाः मिशा काते त्रिभुज आर हकु चोबी बई पे!",
          "rom": "Tudah misha kate tribhuj aar haku chobi bai pe!"
        },
        "dialogue_ho": {
          "dev": "टुडाः मिशा काते त्रिभुज आर हाकु चोबी बाई पे!",
          "rom": "Tudah misha kate tribhuj aar haku chobi bai pe!"
        }
      }
    ]
  },
  {
    "id": "jcert-c2-e01",
    "textbook": "हमारा परिवेश भाग 2 (JCERT Class 2)",
    "chapter_number": 1,
    "title": "पाठ 1: हमारे आस-पास के पेड़-पौधे व जड़ी-बूटियाँ (Flora & Herbs)",
    "grade": "Class 2",
    "subject": "पर्यावरण (हमारा परिवेश / हमारी दुनिया)",
    "subject_code": "evs",
    "theme": "स्थानीय वनस्पतियाँ, सखुआ, महुआ व नीम",
    "tribal_title": {
      "santhali_ol": "ᱟᱵᱚ ᱟᱰᱮ-ᱯᱟᱥᱮ ᱫᱟᱨᱮ-ᱱᱟᱹᱲᱤ ᱟᱨ ᱨᱟᱱ-ᱢᱩᱨᱜᱟᱹᱱ",
      "santhali_dev": "आबो आड़े-पासे दारे-नाड़ी आर रान-मुरगान",
      "mundari": "आबु सुर रिन दारू-नाड़ी आर रानू-दारू",
      "ho": "आबु सुर रिन दारू-नाड़ी आर रानू-दारू"
    },
    "topics": [
      "साल/सखुआ (सारजोम)",
      "महुआ (मातकोम)",
      "करंज ও नीम के औषधीय गुण"
    ],
    "subtopics": [
      "सखुआ - दातून, पत्ते की पत्तल व इमारती लकड़ी",
      "महुआ - फल, फूल व पारंपरिक व्यंजन",
      "तुलसी व नीम - बुखार व पेट दर्द में दवा"
    ],
    "fln_milestones": [
      "पेड़-पौधों के उपयोग बताना",
      "पत्तियों के आकार व गंध से पहचान"
    ],
    "tlem_realia": [
      "सखुआ, नीम व महुआ के ताजे पत्ते",
      "दतुवन"
    ],
    "learning_outcomes": [
      "बच्चे स्थानीय औषधीय पौधों की पहचान और संरक्षण सीखेंगे"
    ],
    "duration_minutes": 40,
    "steps": [
      {
        "step_number": 1,
        "type": "पेड़-पौधे अवलोकन (Plant Observation Talk)",
        "time_mins": 15,
        "teacher_hindi": "सखुआ (सारजोम) झारखंड का राज्य वृक्ष है। इसके पत्तों से दोना-पत्तल बनते हैं।",
        "dialogue_santhali": {
          "ol_chiki": "ᱥᱟᱨᱡᱚᱢ ᱫᱚ ᱟᱵᱚ ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱨᱮᱭᱟᱜ ᱨᱟᱡᱽ ᱫᱟᱨᱮ ᱠᱟᱱᱟ᱾ ᱱᱚᱣᱟ ᱨᱮᱭᱟᱜ ᱥᱟᱠᱟᱢ ᱛᱮ ᱠᱷᱟᱞᱟ-ᱯᱷᱩᱲᱩᱜ ᱵᱮᱱᱟᱣᱜ-ᱟ᱾",
          "dev": "सारजोम दो आबो झारखण्ड रेयाः राज दारे काना। नोवा रेयाः साकाम ते खाला-फुड़ुः बेनावः-आ।",
          "rom": "Sarjom do abo Jharkhand reyah raj dare kana. Nowa reyah sakam te khala-phuruh benawh-a."
        },
        "dialogue_mundari": {
          "dev": "सारजोम आबु झारखण्ड रेयाः राज दारू ताना। नेया साकाम ते पतर बई ये।",
          "rom": "Sarjom abu Jharkhand reyah raj daru tana. Neya sakam te patar bai ye."
        },
        "dialogue_ho": {
          "dev": "सारजोम आबु झारखण्ड रेयाः राज दारू तना। नेया साकाम ते पतर बाई ये।",
          "rom": "Sarjom abu Jharkhand reyah raj daru tana. Neya sakam te patar bai ye."
        }
      }
    ]
  },
  {
    "id": "jcert-c2-e02",
    "textbook": "हमारा परिवेश भाग 2 (JCERT Class 2)",
    "chapter_number": 2,
    "title": "पाठ 2: जल के स्रोत व संरक्षण (Water Sources & Conservation)",
    "grade": "Class 2",
    "subject": "पर्यावरण (हमारा परिवेश / हमारी दुनिया)",
    "subject_code": "evs",
    "theme": "कुआँ, नदी, जोरिया व जल स्वच्छता",
    "tribal_title": {
      "santhali_ol": "ᱫᱟᱜ ᱨᱮᱭᱟᱜ ᱡᱷᱟᱨᱱᱟ ᱟᱨ ᱵᱟᱧᱪᱟᱣ",
      "santhali_dev": "दाः रेयाः झारना आर बांचाव",
      "mundari": "दाः रेयाः झरना आर बांचाव",
      "ho": "दाः रेयाः झरना आर बांचाव"
    },
    "topics": [
      "जल के स्रोत (कुआँ, चापाकल, जोरिया, तालाब)",
      "पानी की बर्बादी रोकना"
    ],
    "subtopics": [
      "कुआँ (कुंई / ᱠᱩᱧᱤ) व चापाकल",
      "नदी (गाडा / ᱜᱟᱰᱟ) व झरना (जोरिया)"
    ],
    "fln_milestones": [
      "जल स्रोतों की सूची बनाना",
      "जल संरक्षण की अच्छी आदतें"
    ],
    "tlem_realia": [
      "जल चक्र पोस्टर",
      "पानी फिल्टर मॉडल"
    ],
    "learning_outcomes": [
      "पानी की एक-एक बूँद बचाने का महत्व समझेंगे"
    ],
    "duration_minutes": 40,
    "steps": [
      {
        "step_number": 1,
        "type": "जल स्रोत चर्चा (Water Sources Discussion)",
        "time_mins": 15,
        "teacher_hindi": "गाँव में कुआँ (कुंई) और नदी (गाडा) से पानी मिलता है। पानी कभी बर्बाद मत करो।",
        "dialogue_santhali": {
          "ol_chiki": "ᱟᱹᱛᱩ ᱨᱮ ᱠᱩᱧᱤ ᱟᱨ ᱜᱟᱰᱟ ᱠᱷᱚᱱ ᱫᱟᱜ ᱧᱟᱢᱚᱜ-ᱟ᱾ ᱫᱟᱜ ᱫᱚ ᱟᱞᱚᱯᱮ ᱵᱮᱠᱟᱨᱟ᱾",
          "dev": "आतु रे कुंई आर गाडा खोन दाः ञामोः-आ। दाः दो आलोपे बेकारा।",
          "rom": "Aatu re kunyi aar gada khon dah nyamoh-a. Dah do alope bekara."
        },
        "dialogue_mundari": {
          "dev": "हातूँ रे कुआँ आर गाडा एते दाः नमोः ताना। दाः आलोपे बेकारिया।",
          "rom": "Hatu re kuan aar gada ete dah namoh tana. Dah alope bekariya."
        },
        "dialogue_ho": {
          "dev": "हातूँ रे कुआँ आर गाडा एते दाः नमोः तना। दाः आलोपे बेकारिया।",
          "rom": "Hatu re kuan aar gada ete dah namoh tana. Dah alope bekariya."
        }
      }
    ]
  },
  {
    "id": "jcert-c2-e03",
    "textbook": "हमारा परिवेश भाग 2 (JCERT Class 2)",
    "chapter_number": 3,
    "title": "पाठ 3: हमारा प्यारा परिवार और पड़ोस (Family & Neighborhood)",
    "grade": "Class 2",
    "subject": "पर्यावरण (हमारा परिवेश / हमारी दुनिया)",
    "subject_code": "evs",
    "theme": "नाते-रिश्ते, संयुक्त परिवार व अखड़ा संस्कृति",
    "tribal_title": {
      "santhali_ol": "ᱟᱵᱚᱣᱟᱜ ᱜᱷᱟᱨᱚᱸᱡᱽ ᱟᱨ ᱴᱚᱞᱟ-ᱯᱟᱲᱟ",
      "santhali_dev": "आबोवाः घारोंज आर टोला-पाड़ा",
      "mundari": "आबुवाः घारोंज आर टोला-साई",
      "ho": "आबुवाः घारोंज आर टोला-साई"
    },
    "topics": [
      "दादा-दादी, नाना-नानी व रिश्ते",
      "पड़ोस व गाँव का अखड़ा",
      "एक-दूसरे की मदद"
    ],
    "subtopics": [
      "दादा (हाड़ाम बाबा / ᱦᱟᱲᱟᱢ ᱵᱟᱵᱟ)",
      "दादी (बुढी आयो / ᱵᱩᱰᱷᱤ ᱟᱭᱳ)",
      "गाँव की चौपाल व आपसी सहयोग"
    ],
    "fln_milestones": [
      "परिवार वृक्ष (Family Tree) बनाना",
      "पारिवारिक सहयोग पर बातचीत"
    ],
    "tlem_realia": [
      "परिवार वृक्ष चार्ट",
      "पारिवारिक मुखौटे"
    ],
    "learning_outcomes": [
      "बुजुर्गों के प्रति सम्मान और पड़ोसियों से मधुर संबंध बनाने के मूल्य सीखेंगे"
    ],
    "duration_minutes": 40,
    "steps": [
      {
        "step_number": 1,
        "type": "पारिवारिक आदर भाव (Family Values & Respect)",
        "time_mins": 15,
        "teacher_hindi": "दादा-दादी (हाड़ाम बाबा व बुढ़ी आयो) की सेवा करनी चाहिए और पड़ोसियों से मिलजुलकर रहना चाहिए।",
        "dialogue_santhali": {
          "ol_chiki": "ᱦᱟᱲᱟᱢ ᱵᱟᱵᱟ ᱟᱨ ᱵᱩᱰᱷᱤ ᱟᱭᱳ ᱦᱟᱜ ᱥᱮᱵᱟ ᱦᱩᱭᱩᱜ-ᱟ ᱟᱨ ᱴᱚᱞᱟ ᱨᱤᱱ ᱦᱚᱲ ᱥᱟᱶ ᱢᱤᱫ ᱛᱮ ᱛᱟᱦᱮᱸᱱ ᱦᱩᱭᱩᱜ-ᱟ᱾",
          "dev": "हाड़ाम बाबा आर बुढ़ी आयो हाः सेवा हुयुः-आ आर टोला रिन होड़ साव मिद ते ताहेन हुयुः-आ।",
          "rom": "Haram baba aar burhi ayo hah sewa huyuh-a aar tola rin hor saw mid te tahen huyuh-a."
        },
        "dialogue_mundari": {
          "dev": "हाड़ाम आपा आर बुढ़ी एंगा हाः सेवा लगातींग आर टोला रिन को लोः मिशा ताएना।",
          "rom": "Haram apa aar burhi enga hah sewa lagating aar tola rin ko loh misha taena."
        },
        "dialogue_ho": {
          "dev": "हाड़ाम आपा आर बुढ़ी एंगा हाः सेवा लगातींग आर टोला रिन को लोः मिशा तयना।",
          "rom": "Haram apa aar burhi enga hah sewa lagating aar tola rin ko loh misha tayna."
        }
      }
    ]
  },
  {
    "id": "jcert-c2-eng01",
    "textbook": "Sunrise 2 (JCERT Class 2)",
    "chapter_number": 1,
    "title": "Unit 1: Nature and Trees Around Us (प्रकृति और वृक्ष)",
    "grade": "Class 2",
    "subject": "English (Blooming Buds / Sunrise / Sunshine)",
    "subject_code": "english",
    "theme": "Nature Poetry & Action Words",
    "tribal_title": {
      "santhali_ol": "ᱥᱤᱨᱡᱚᱱ ᱟᱨ ᱫᱟᱨᱮ-ᱱᱟᱹᱲᱤ",
      "santhali_dev": "सिरजोन आर दारे-नाड़ी",
      "mundari": "सिरजोन आर दारू-नाड़ी",
      "ho": "सिरजोन आर दारू-नाड़ी"
    },
    "topics": [
      "Rhymes about Trees & Flowers",
      "Action Verbs (Run, Fly, Sing, Dance)"
    ],
    "subtopics": [
      "The tree gives us green leaves and sweet fruit",
      "Action word pairing: Run (दौड़ना), Fly (उड़ना), Sing (गाना)"
    ],
    "fln_milestones": [
      "Reciting 4-line English poem",
      "Identifying action words"
    ],
    "tlem_realia": [
      "Action cards",
      "Nature pictures"
    ],
    "learning_outcomes": [
      "Understand simple English instructions and action verbs"
    ],
    "duration_minutes": 40,
    "steps": [
      {
        "step_number": 1,
        "type": "Action Words Rhyme (क्रिया शब्द वाचन)",
        "time_mins": 15,
        "teacher_hindi": "Birds fly in the sky! Fly means उड़ना (उडाव / ᱩᱰᱟᱹᱣ). Action करके दिखाओ!",
        "dialogue_santhali": {
          "ol_chiki": "ᱪᱮᱬᱮ ᱠᱚ ᱥᱮᱨᱢᱟ ᱨᱮᱠᱚ ᱩᱰᱟᱹᱣᱜ-ᱟ! Fly ᱨᱮᱭᱟᱜ ᱢᱮᱱᱮᱛ ᱫᱚ ᱩᱰᱟᱹᱣ᱾ ᱫᱮᱠᱷᱟᱣ ᱯᱮ!",
          "dev": "चेणे को सेरमा रेको उडावः-आ! Fly रेयाः मेनेत दो उडाव। देखाव पे!",
          "rom": "Chene ko serma reko udawh-a! Fly reyah menet do udaw. Dekhaw pe!"
        },
        "dialogue_mundari": {
          "dev": "चेड़े को सेरमा रे उडौ ताना को! Fly मेनेते उडौ ताना। देखाव पे!",
          "rom": "Chere ko serma re udow tana ko! Fly menete udow tana. Dekhaw pe!"
        },
        "dialogue_ho": {
          "dev": "चेणे को सेरमा रे उडौ तना को! Fly मेनेते उडौ तना। देखाव पे!",
          "rom": "Chene ko serma re udow tana ko! Fly menete udow tana. Dekhaw pe!"
        }
      }
    ]
  },
  {
    "id": "jcert-c2-eng02",
    "textbook": "Sunrise 2 (JCERT Class 2)",
    "chapter_number": 2,
    "title": "Unit 2: Daily Routines & School Fun (दैनिक दिनचर्या व विद्यालय)",
    "grade": "Class 2",
    "subject": "English (Blooming Buds / Sunrise / Sunshine)",
    "subject_code": "english",
    "theme": "Time Expressions, Classroom Commands & Rhymes",
    "tribal_title": {
      "santhali_ol": "ᱫᱤᱱᱟᱹᱢ ᱠᱟᱹᱢᱤ ᱟᱨ ᱟᱥᱲᱟ ᱨᱟᱹᱥᱠᱟᱹ",
      "santhali_dev": "दिनम कामी आर आसड़ा रास्का",
      "mundari": "दिनम कामी आर इसकुल रासा",
      "ho": "दिनम कामी आर इसकुल रासा"
    },
    "topics": [
      "Daily Routine (Wake up, Brush teeth, Go to school)",
      "Classroom phrases (Open book, Sit down, Stand up)",
      "Morning poem"
    ],
    "subtopics": [
      "I wake up early in the morning",
      "I wash my hands and brush my teeth",
      "Teacher says: Please open your notebook"
    ],
    "fln_milestones": [
      "Following 2-step English classroom instructions",
      "Speaking 3 daily routine sentences in English"
    ],
    "tlem_realia": [
      "Routine clock flashcards",
      "Classroom action pictures"
    ],
    "learning_outcomes": [
      "Respond confidently to daily English classroom commands and talk about routine"
    ],
    "duration_minutes": 40,
    "steps": [
      {
        "step_number": 1,
        "type": "Classroom Commands Practice (कक्षा निर्देश अभ्यास)",
        "time_mins": 15,
        "teacher_hindi": "Please sit down and open your English book! अपनी किताब खोलो।",
        "dialogue_santhali": {
          "ol_chiki": "ᱫᱩᱲᱩᱵ ᱯᱮ ᱟᱨ ᱟᱯᱱᱟᱨ ᱯᱚᱛᱚᱵ ᱡᱷᱤᱡᱽ ᱯᱮ! Open your book!",
          "dev": "दुड़ब पे आर आपनार पोतोब झिज पे! Open your book!",
          "rom": "Durub pe aar apnar potob jhij pe! Open your book!"
        },
        "dialogue_mundari": {
          "dev": "दुब पे आर अपना पुथी खोलो पे! Open your book!",
          "rom": "Dub pe aar apna puthi kholo pe! Open your book!"
        },
        "dialogue_ho": {
          "dev": "दुब पे आर अपना पुथी खोलो पे! Open your book!",
          "rom": "Dub pe aar apna puthi kholo pe! Open your book!"
        }
      }
    ]
  },
  {
    "id": "jcert-c2-eng03",
    "textbook": "Sunrise 2 (JCERT Class 2)",
    "chapter_number": 3,
    "title": "Unit 3: Fruits, Vegetables and Market Fun (फल, सब्जियाँ व हाट बाज़ार)",
    "grade": "Class 2",
    "subject": "English (Blooming Buds / Sunrise / Sunshine)",
    "subject_code": "english",
    "theme": "Food Vocabulary, Market Roleplay & Numbers 11 to 20",
    "tribal_title": {
      "santhali_ol": "ᱡᱚ, ᱟᱲᱟᱜ-ᱩᱛᱩ ᱟᱨ ᱦᱟᱴ-ᱵᱟᱡᱟᱨ",
      "santhali_dev": "जो, आड़ाः-उतु आर हाट-बाजार",
      "mundari": "जो, उतु आर हाट-बजार",
      "ho": "जो, उतु आर हाट-बजार"
    },
    "topics": [
      "Fruits (Mango, Banana, Guava)",
      "Vegetables (Tomato, Potato, Spinach)",
      "Weekly Village Haat (हाट बाज़ार)"
    ],
    "subtopics": [
      "Mango is sweet (उल / ᱩᱞ)",
      "Potato and Brinjal (आलू आर बेंगोड़)",
      "Roleplay: Buying fruit in the village haat"
    ],
    "fln_milestones": [
      "Naming 6 fruits and 6 vegetables in English",
      "Participating in a simple buying roleplay"
    ],
    "tlem_realia": [
      "Real/clay fruits & vegetables",
      "Toy money for market roleplay"
    ],
    "learning_outcomes": [
      "Describe colors, tastes and names of common local produce in English"
    ],
    "duration_minutes": 40,
    "steps": [
      {
        "step_number": 1,
        "type": "Market Roleplay (हाट बाज़ार खेल)",
        "time_mins": 15,
        "teacher_hindi": "How much for the sweet mango? Mango means आम (उल / ᱩᱞ)!",
        "dialogue_santhali": {
          "ol_chiki": "ᱱᱚᱣᱟ ᱦᱮᱲᱮᱢ ᱩᱞ ᱫᱚ ᱛᱤᱱᱟᱹᱜ ᱫᱟᱢ? Mango ᱢᱮᱱᱮᱛ ᱫᱚ ᱩᱞ ᱠᱟᱱᱟ᱾",
          "dev": "नोवा हेड़ेम उल दो तीनाः दाम? Mango मेनेत दो उल काना।",
          "rom": "Nowa herem ul do tinah dam? Mango menet do ul kana."
        },
        "dialogue_mundari": {
          "dev": "नेया सिबिल उल चिमिन दाम? Mango मेनेते उल ताना।",
          "rom": "Neya sibil ul chimin dam? Mango menete ul tana."
        },
        "dialogue_ho": {
          "dev": "नेया सिबिल उल चिमिन दाम? Mango मेनेते उल तना।",
          "rom": "Neya sibil ul chimin dam? Mango menete ul tana."
        }
      }
    ]
  },
  {
    "id": "jcert-c3-h01",
    "textbook": "भाषांजलि भाग 3 (JCERT Class 3)",
    "chapter_number": 1,
    "title": "पाठ 1: प्रकृति की सीख (Lessons from Nature)",
    "grade": "Class 3",
    "subject": "हिन्दी (मांदर / सखुआ / भाषांजलि)",
    "subject_code": "hindi",
    "theme": "पर्वत, सागर और नभ से जीवन की सीख",
    "tribal_title": {
      "santhali_ol": "ᱥᱤᱨᱡᱚᱱ ᱠᱷᱚᱱ ᱪᱮᱫ (Sirjon Khon Ched)",
      "santhali_dev": "सिरजोन खोन चेद",
      "mundari": "सिरजोन एते इतु",
      "ho": "सिरजोन एते इतु"
    },
    "topics": [
      "पर्वत कहता शीश उठाकर",
      "सागर की गहराई",
      "नभ का विस्तार"
    ],
    "subtopics": [
      "धैर्य और ऊँचाई का संदेश (पर्वत / बुरु / ᱵᱩᱨᱩ)",
      "हृदय में गहराई लाना (सागर / समुद्र)",
      "सबको गले लगाना (नभ / सेरमा / ᱥᱮᱨᱢᱟ)"
    ],
    "fln_milestones": [
      "कविता का भावार्थ समझना",
      "सस्वर वाचन व कठिन शब्दों के अर्थ"
    ],
    "tlem_realia": [
      "पहाड़ व प्रकृति के चित्र",
      "कविता ऑडियो"
    ],
    "learning_outcomes": [
      "छात्र प्रकृति से धैर्य, प्रेम और विनम्रता के गुण सीखेंगे"
    ],
    "duration_minutes": 45,
    "steps": [
      {
        "step_number": 1,
        "type": "कविता का सस्वर पाठ (Poem Recitation)",
        "time_mins": 15,
        "teacher_hindi": "पर्वत कहता शीश उठाकर, तुम भी ऊँचे बन जाओ! सब बच्चे साथ बोलेंगे।",
        "dialogue_santhali": {
          "ol_chiki": "ᱵᱩᱨᱩ ᱢᱮᱱᱫᱟ ᱵᱚᱦᱚᱜ ᱛᱩᱞ ᱠᱟᱛᱮ, ᱟᱯᱮ ᱦᱚᱸ ᱢᱟᱨᱟᱝ ᱵᱮᱱᱟᱣᱜ ᱯᱮ! ᱫᱮᱞᱟ ᱢᱮᱥᱟ ᱠᱟᱛᱮ ᱵᱚᱱ ᱨᱚᱲᱟ᱾",
          "dev": "बुरु मेनदा बोहोः तुल काते, आपे हों मारांग बेनावः पे! देला मेसा काते बोन रोड़ा।",
          "rom": "Buru menda bohoh tul kate, ape hon marang benawh pe! Dela mesa kate bon rora."
        },
        "dialogue_mundari": {
          "dev": "बुरु काजीये बोहोः राकब काते, आपे हो मारांग बई येन पे! मिशा काते काजी पे।",
          "rom": "Buru kajiye bohoh rakab kate, ape ho marang bai yen pe! Misha kate kaji pe."
        },
        "dialogue_ho": {
          "dev": "बुरु कजीये बोहोः राकब काते, आपे हो मारांग बाई येन पे! मिशा काते कजी पे।",
          "rom": "Buru kajiye bohoh rakab kate, ape ho marang bai yen pe! Misha kate kaji pe."
        }
      }
    ]
  },
  {
    "id": "jcert-c3-h02",
    "textbook": "भाषांजलि भाग 3 (JCERT Class 3)",
    "chapter_number": 2,
    "title": "पाठ 2: धरती आबा - भगवान बिरसा मुंडा (Bhagwan Birsa Munda)",
    "grade": "Class 3",
    "subject": "हिन्दी (मांदर / सखुआ / भाषांजलि)",
    "subject_code": "hindi",
    "theme": "उलगुलान, स्वतंत्रता संग्राम व आदिवासी स्वाभिमान",
    "tribal_title": {
      "santhali_ol": "ᱫᱷᱟᱹᱨᱛᱤ ᱟᱵᱟ - ᱵᱤᱨᱥᱟᱹ ᱢᱩᱱᱰᱟ (Dharti Aaba Birsa Munda)",
      "santhali_dev": "धरती आबा - बिरसा मुंडा",
      "mundari": "धरती आबा - भगवान बिरसा मुंडा",
      "ho": "धरती आबा - भगवान बिरसा मुंडा"
    },
    "topics": [
      "बिरसा मुंडा का जीवन व उलिहातू",
      "जल, जंगल, ज़मीन की रक्षा",
      "उलगुलान आंदोलन"
    ],
    "subtopics": [
      "धरती आबा का बचपन व विचार",
      "अंग्रेजों व शोषकों के खिलाफ आंदोलन (उलगुलान)",
      "प्रकृति और आदिवासी संस्कृति का स्वाभिमान"
    ],
    "fln_milestones": [
      "ऐतिहासिक व्यक्तित्व पर 5-6 वाक्य बोलना",
      "गद्यांश पढ़कर उत्तर देना"
    ],
    "tlem_realia": [
      "भगवान बिरसा मुंडा का चित्र",
      "उलिहातू व डोंबारी बुरु का नक्शा"
    ],
    "learning_outcomes": [
      "छात्र भगवान बिरसा मुंडा के जीवन मूल्यों और स्वाभिमान से प्रेरणा लेंगे"
    ],
    "duration_minutes": 45,
    "steps": [
      {
        "step_number": 1,
        "type": "जीवनी परिचय व स्वाभिमान (Biography & Valor)",
        "time_mins": 15,
        "teacher_hindi": "भगवान बिरसा मुंडा ने हमारे जल, जंगल और ज़मीन की रक्षा के लिए उलगुलान किया।",
        "dialogue_santhali": {
          "ol_chiki": "ᱵᱷᱟᱜᱽᱣᱟᱱ ᱵᱤᱨᱥᱟᱹ ᱢᱩᱱᱰᱟ ᱫᱚ ᱟᱵᱚᱣᱟᱜ ᱫᱟᱜ, ᱵᱤᱨ ᱟᱨ ᱦᱟᱥᱟ ᱵᱟᱧᱪᱟᱣ ᱞᱟᱹᱜᱤᱫ ᱩᱞᱜᱩᱞᱟᱱ ᱮ ᱮᱦᱚᱵ ᱞᱮᱫᱟ᱾",
          "dev": "भगवान बिरसा मुंडा दो आबोवाः दाः, बीर आर हासा बांचाव लगिद उलगुलान ए एहोब लेदा।",
          "rom": "Bhagwan Birsa Munda do abowah dah, bir aar hasa banchaw lagid Ulgulan e ehob leda."
        },
        "dialogue_mundari": {
          "dev": "भगवान बिरसा मुंडा आबुवाः दाः, बीर आर हासा बांचाव लगिद उलगुलान केदा।",
          "rom": "Bhagwan Birsa Munda abuwah dah, bir aar hasa banchaw lagid Ulgulan keda."
        },
        "dialogue_ho": {
          "dev": "भगवान बिरसा मुंडा आबुवाः दाः, बीर आर हासा बांचाव लगिद उलगुलान केदा।",
          "rom": "Bhagwan Birsa Munda abuwah dah, bir aar hasa banchaw lagid Ulgulan keda."
        }
      }
    ]
  },
  {
    "id": "jcert-c3-h03",
    "textbook": "भाषांजलि भाग 3 (JCERT Class 3)",
    "chapter_number": 3,
    "title": "पाठ 3: जाहेर थान और सरहुल का संदेश (Sarhul & Sarna Grove)",
    "grade": "Class 3",
    "subject": "हिन्दी (मांदर / सखुआ / भाषांजलि)",
    "subject_code": "hindi",
    "theme": "जाहेर थान, सरना स्थल व प्रकृति संरक्षण",
    "tribal_title": {
      "santhali_ol": "ᱡᱟᱦᱮᱨ ᱛᱷᱟᱱ ᱟᱨ ᱵᱟᱦᱟ ᱯᱚᱨᱚᱵᱽ",
      "santhali_dev": "जाहेर थान आर बाहा परोब",
      "mundari": "जाहेर थान आर बाहा परोब",
      "ho": "जाहेर थान आर बाहा परोब"
    },
    "topics": [
      "जाहेर थान का महत्व",
      "नायके/पाहन की भूमिका",
      "सखुआ के फूल का संदेश"
    ],
    "subtopics": [
      "पवित्र उपवन (जाहेर थान / ᱡᱟᱦᱮᱨ ᱛᱷᱟᱱ)",
      "पेड़ों को न काटने का संकल्प",
      "बाहा परोब में भाईचारा व सौहार्द"
    ],
    "fln_milestones": [
      "पर्यावरण संरक्षण पर निबंध लिखना",
      "लोक संस्कृति के शब्दों का सही प्रयोग"
    ],
    "tlem_realia": [
      "जाहेर थान का रेखाचित्र",
      "सखुआ के फूल"
    ],
    "learning_outcomes": [
      "विद्यार्थी जंगलों को बचाने और प्रकृति के साथ समरसता से जीने का संकल्प लेंगे"
    ],
    "duration_minutes": 45,
    "steps": [
      {
        "step_number": 1,
        "type": "सरना संस्कृति पाठ (Sacred Grove Values)",
        "time_mins": 15,
        "teacher_hindi": "जाहेर थान हमारे पूर्वजों का पवित्र स्थल है जहाँ हम पेड़ों और प्रकृति को नमन करते हैं।",
        "dialogue_santhali": {
          "ol_chiki": "ᱡᱟᱦᱮᱨ ᱛᱷᱟᱱ ᱫᱚ ᱟᱵᱚ ᱦᱟᱯᱲᱟᱢ ᱠᱚᱣᱟᱜ ᱫᱷᱚᱨᱚᱢ ᱴᱷᱟᱶ ᱠᱟᱱᱟ ᱡᱟᱦᱟᱸ ᱨᱮ ᱟᱵᱚ ᱫᱟᱨᱮ-ᱱᱟᱹᱲᱤ ᱵᱚᱱ ᱡᱚᱦᱟᱨᱟᱜ-ᱟ᱾",
          "dev": "जाहेर थान दो आबो हापड़ाम कोवाः धोरोम ठांव काना जाहाँ रे आबो दारे-नाड़ी बोन जोहाराः-आ।",
          "rom": "Jaher than do abo hapram kowah dhorom thaw kana jahan re abo dare-nari bon joharah-a."
        },
        "dialogue_mundari": {
          "dev": "जाहेर थान आबु हापुड़ाम कोवाः पवित्र ठाँव ताना जा रे आबु दारू-नाड़ी जोहारा।",
          "rom": "Jaher than abu hapurham kowah pavitra thaw tana ja re abu daru-nari johara."
        },
        "dialogue_ho": {
          "dev": "जाहेर थान आबु हापुड़ाम कोवाः पवित्र ठाँव तना जा रे आबु दारू-नाड़ी जोहारा।",
          "rom": "Jaher than abu hapurham kowah pavitra thaw tana ja re abu daru-nari johara."
        }
      }
    ]
  },
  {
    "id": "jcert-c3-m01",
    "textbook": "रोचक गणित भाग 3 (JCERT Class 3)",
    "chapter_number": 1,
    "title": "पाठ 1: किधर से देखें? (Viewpoints - Top, Front, Side)",
    "grade": "Class 3",
    "subject": "गणित (संख्याओं का जादू / खेल-खेल में गणित / रोचक गणित)",
    "subject_code": "math",
    "theme": "दृष्टिकोण, 3D आकृतियों के विभिन्न दृश्य व सममिति",
    "tribal_title": {
      "santhali_ol": "ᱚᱠᱟ ᱥᱮᱫ ᱠᱷᱚᱱ ᱵᱚᱱ ᱧᱮᱞᱟ? (Oka Sed Khon Bon Nyela?)",
      "santhali_dev": "ओका सेद खोन बोन ञेला?",
      "mundari": "ओको सा एते बु नेले?",
      "ho": "ओको सा एते बु नेले?"
    },
    "topics": [
      "ऊपर से दृश्य (Top View)",
      "सामने से दृश्य (Front View)",
      "बगल से दृश्य (Side View)"
    ],
    "subtopics": [
      "कुकर, सीढ़ी, मेज के विभिन्न दृश्य",
      "दर्पण सममिति (Mirror Halves / ᱟᱹᱨᱥᱤ ᱥᱟᱢᱟᱝ)",
      "बिन्दुओं की ग्रिड पर तितली व तारे की सममिति"
    ],
    "fln_milestones": [
      "वस्तुओं के 3D दृश्यों को पहचानकर 2D में बनाना",
      "सममिति रेखा खींचना"
    ],
    "tlem_realia": [
      "दर्पण (आरसी / ᱟᱹᱨᱥᱤ)",
      "मिट्टी के बर्तन",
      "डॉट ग्रिड"
    ],
    "learning_outcomes": [
      "छात्र विभिन्न कोणों से वस्तुओं को देखकर उनके 2D चित्र बना सकेंगे"
    ],
    "duration_minutes": 45,
    "steps": [
      {
        "step_number": 1,
        "type": "दर्पण सममिति प्रयोग (Mirror Symmetry Experiment)",
        "time_mins": 15,
        "teacher_hindi": "दर्पण (आरसी) के सामने आधा चित्र रखो, वह पूरा दिखने लगेगा!",
        "dialogue_santhali": {
          "ol_chiki": "ᱟᱹᱨᱥᱤ ᱥᱟᱢᱟᱝ ᱨᱮ ᱛᱟᱞᱟ ᱪᱤᱛᱟᱹᱨ ᱫᱚᱦᱚᱭ ᱯᱮ, ᱯᱩᱨᱟᱹ ᱧᱮᱞᱚᱜ-ᱟ!",
          "dev": "आरसी सामांग रे ताला चितार दोहोय पे, पुरा ञेलोः-आ!",
          "rom": "Aarsi samang re tala chitar dohoy pe, pura nyeloh-a!"
        },
        "dialogue_mundari": {
          "dev": "आरसी समंग रे आधा चोबी दोहोये पे, सोबेन नेलोः ताना!",
          "rom": "Aarsi samang re aadha chobi dohoye pe, soben neloh tana!"
        },
        "dialogue_ho": {
          "dev": "आरसी समंग रे आधा चोबी दोहोये पे, सोबेन नेलोः तना!",
          "rom": "Aarsi samang re aadha chobi dohoye pe, soben neloh tana!"
        }
      }
    ]
  },
  {
    "id": "jcert-c3-m02",
    "textbook": "रोचक गणित भाग 3 (JCERT Class 3)",
    "chapter_number": 2,
    "title": "पाठ 2: संख्याओं की उछल-कूद (Numbers 100 to 1000)",
    "grade": "Class 3",
    "subject": "गणित (संख्याओं का जादू / खेल-खेल में गणित / रोचक गणित)",
    "subject_code": "math",
    "theme": "सैंकड़ा, दहाई व इकाई (स्थानिक मान व विस्तार रूप)",
    "tribal_title": {
      "santhali_ol": "ᱞᱮᱠᱷᱟ ᱨᱮᱭᱟᱜ ᱫᱚᱱ-ᱪᱷᱚᱞ (Lekha reyah Don-Chhol)",
      "santhali_dev": "लेखा रेयाः दोन-छोल",
      "mundari": "लेका रेयाः कूद-फान",
      "ho": "लेका रेयाः कूद-फान"
    },
    "topics": [
      "100 से 1000 तक संख्याएँ",
      "10 की छलांग व 50 की छलांग",
      "सेंचुरी (शतक) की समझ"
    ],
    "subtopics": [
      "100 = 10 दहाई = 1 सैंकड़ा (मित् साए / ᱢᱤᱫ ᱥᱟᱭ)",
      "धोनी का शतक (100 रन) और क्रिकेट स्कोर",
      "संख्याओं का विस्तारित रूप (245 = 200 + 40 + 5)"
    ],
    "fln_milestones": [
      "3-अंकीय संख्याओं का पठन व लेखन",
      "बड़ी और छोटी संख्या की तुलना"
    ],
    "tlem_realia": [
      "100 के नोटों के नमूने",
      "सेंचुरी कार्ड्स",
      "संख्या रेखा"
    ],
    "learning_outcomes": [
      "छात्र 1000 तक की संख्याओं में स्थानीय मान और छलांग लगाकर गिनती समझ सकेंगे"
    ],
    "duration_minutes": 45,
    "steps": [
      {
        "step_number": 1,
        "type": "शतक व छलांग खेल (Century & Skip Counting Game)",
        "time_mins": 15,
        "teacher_hindi": "100 को संथाली में मित् साए (ᱢᱤᱫ ᱥᱟᱭ) कहते हैं। 10-10 की छलांग लगाओ: 110, 120, 130!",
        "dialogue_santhali": {
          "ol_chiki": "᱑᱐᱐ ᱫᱚ ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ ᱢᱤᱫ ᱥᱟᱭ ᱵᱚᱱ ᱢᱮᱛᱟᱜ-ᱟ᱾ ᱑᱐-᱑᱐ ᱫᱚᱱ ᱯᱮ: ᱑᱑᱐, ᱑᱒᱐, ᱑᱓᱐!",
          "dev": "१०० दो सानताड़ी ते मिद साए बोन मेताः-आ। १०-१० दोन पे: ११०, १२०, १३०!",
          "rom": "100 do Santali te mid say bon metah-a. 10-10 don pe: 110, 120, 130!"
        },
        "dialogue_mundari": {
          "dev": "१०० मुंडारी ते मियाद साए बु काजीये। १०-१० कूद पे: ११०, १२०, १३०!",
          "rom": "100 Mundari te miyad say bu kajiye. 10-10 kud pe: 110, 120, 130!"
        },
        "dialogue_ho": {
          "dev": "१०० हो ते मियाद साए बु कजीये। १०-१० कूद पे: ११०, १२०, १३०!",
          "rom": "100 Ho te miyad say bu kajiye. 10-10 kud pe: 110, 120, 130!"
        }
      }
    ]
  },
  {
    "id": "jcert-c3-m03",
    "textbook": "रोचक गणित भाग 3 (JCERT Class 3)",
    "chapter_number": 3,
    "title": "पाठ 3: 3-अंकीय जोड़ और घटाव (3-Digit Addition & Subtraction)",
    "grade": "Class 3",
    "subject": "गणित (संख्याओं का जादू / खेल-खेल में गणित / रोचक गणित)",
    "subject_code": "math",
    "theme": "हासिल का जोड़ व उधार का घटाव (स्थानीय हाट बाज़ार संदर्भ)",
    "tribal_title": {
      "santhali_ol": "ᱯᱮ-ᱟᱝᱠ ᱨᱮᱭᱟᱜ ᱡᱚᱲᱟᱣ ᱟᱨ ᱜᱷᱟᱴᱟᱣ",
      "santhali_dev": "पे-आंक रेयाः जोड़ाव आर घाटाव",
      "mundari": "अपिया-अंक रेयाः मिशा आर हटिंग",
      "ho": "आपिया-अंक रेयाः मिशा आर हटिंग"
    },
    "topics": [
      "हासिल वाले 3-अंकीय जोड़",
      "उधार वाले 3-अंकीय घटाव",
      "दैनिक लेन-देन के शाब्दिक प्रश्न"
    ],
    "subtopics": [
      "हाट बाज़ार में धान व सब्जियों की बिक्री",
      "245 + 187 = 432 का चरणबद्ध समाधान",
      "उत्तर की जाँच घटाव से करना"
    ],
    "fln_milestones": [
      "3-अंकीय जोड़ व घटाव शुद्धता से करना",
      "दैनिक जीवन के शाब्दिक प्रश्न हल करना"
    ],
    "tlem_realia": [
      "डमी करेंसी नोट",
      "हाट बाज़ार मूल्य सूची चार्ट"
    ],
    "learning_outcomes": [
      "छात्र हाट बाज़ार के व्यावहारिक प्रश्नों में जोड़ और घटाव का सही प्रयोग कर सकेंगे"
    ],
    "duration_minutes": 45,
    "steps": [
      {
        "step_number": 1,
        "type": "हाट बाज़ार लेन-देन (Market Word Problem)",
        "time_mins": 15,
        "teacher_hindi": "हाट में बिरसा ने 250 रुपये का धान और 150 रुपये की सब्जियाँ बेचीं। कुल कितने रुपये हुए? 400 रुपये!",
        "dialogue_santhali": {
          "ol_chiki": "ᱦᱟᱴ ᱨᱮ ᱵᱤᱨᱥᱟᱹ ᱫᱚ ᱒᱕᱐ ᱴᱟᱠᱟ ᱨᱮᱭᱟᱜ ᱦᱳᱲᱳ ᱟᱨ ᱑᱕᱐ ᱴᱟᱠᱟ ᱨᱮᱭᱟᱜ ᱩᱛᱩ-ᱟᱲᱟᱜ ᱮ ᱟᱹᱠᱷᱨᱤᱧ ᱠᱮᱫᱟ᱾ ᱡᱚᱛᱚ ᱛᱮ ᱛᱤᱱᱟᱹᱜ ᱴᱟᱠᱟ ᱦᱩᱭᱮᱱᱟ? ᱔᱐᱐ ᱴᱟᱠᱟ!",
          "dev": "हाट रे बिरसा दो २५० टाका रेयाः होड़ो आर १५० टाका रेयाः उतु-आड़ाः ए आखरिञ केदा। जोतो ते तीनाः टाका हुयेना? ४०० टाका!",
          "rom": "Hat re Birsa do 250 taka reyah horo aar 150 taka reyah utu-arah e akhriny keda. Joto te tinah taka huyena? 400 taka!"
        },
        "dialogue_mundari": {
          "dev": "हाट रे बिरसा २५० टाका रेयाः बाबा आर १५० टाका रेयाः उतु अकिरिंग केदा। सोबेन मिशा ते चिमिन टाका जना? ४०० टाका!",
          "rom": "Hat re Birsa 250 taka reyah baba aar 150 taka reyah utu akiring keda. Soben misha te chimin taka jana? 400 taka!"
        },
        "dialogue_ho": {
          "dev": "हाट रे बिरसा २५० टाका रेयाः बाबा आर १५० टाका रेयाः उतु अकिरिंग केदा। सोबेन मिशा ते चिमिन टाका यना? ४०० टाका!",
          "rom": "Hat re Birsa 250 taka reyah baba aar 150 taka reyah utu akiring keda. Soben misha te chimin taka yana? 400 taka!"
        }
      }
    ]
  },
  {
    "id": "jcert-c3-e01",
    "textbook": "हमारी दुनिया भाग 3 (JCERT Class 3)",
    "chapter_number": 1,
    "title": "पाठ 1: पौधों की परी और पत्तियाँ (The Plant Fairy & Leaf Diversity)",
    "grade": "Class 3",
    "subject": "पर्यावरण (हमारा परिवेश / हमारी दुनिया)",
    "subject_code": "evs",
    "theme": "पत्तियों की विविधता, आकार, किनारे व छाप बनाना",
    "tribal_title": {
      "santhali_ol": "ᱫᱟᱨᱮ-ᱱᱟᱹᱲᱤ ᱨᱤᱱᱤᱡ ᱯᱟᱹᱨᱤ ᱟᱨ ᱥᱟᱠᱟᱢ",
      "santhali_dev": "दारे-नाड़ी रिनिज पारी आर साकाम",
      "mundari": "दारू-नाड़ी रिन परी आर साकाम",
      "ho": "दारू-नाड़ी रिन परी आर साकाम"
    },
    "topics": [
      "पत्तियों के विभिन्न आकार (गोल, लम्बे, तिकोने)",
      "पत्तियों के किनारे (आरेदार, चिकने)",
      "पत्तियों की छाप (Rubbing Print)"
    ],
    "subtopics": [
      "पीपल (हेसाः / ᱦᱮᱥᱟᱜ), बरगद (बारे / ᱵᱟᱨᱮ), सखुआ (सारजोम / ᱥᱟᱨᱡᱚᱢ)",
      "पत्तियों की महक (नीम, नींबू, तुलसी, पुदीना)",
      "कागज पर पत्तियों की छाप से कलाकारी"
    ],
    "fln_milestones": [
      "पत्तियों की विशेषताओं का वर्गीकरण",
      "स्पर्श व गंध द्वारा पौधों की पहचान"
    ],
    "tlem_realia": [
      "विभिन्न पेड़ों की गिरी हुई पत्तियाँ",
      "मोम के रंग (Crayons)",
      "ड्राइंग शीट"
    ],
    "learning_outcomes": [
      "विद्यार्थी पत्तियों के औषधीय गुणों और कलात्मक उपयोग को समझ सकेंगे"
    ],
    "duration_minutes": 45,
    "steps": [
      {
        "step_number": 1,
        "type": "पत्तियों की छाप गतिविधि (Leaf Rubbing Activity)",
        "time_mins": 15,
        "teacher_hindi": "पत्ते के ऊपर कागज रखो और मोम के रंग से रगड़ो। सुंदर छाप बनेगी!",
        "dialogue_santhali": {
          "ol_chiki": "ᱥᱟᱠᱟᱢ ᱪᱮᱛᱟᱱ ᱨᱮ ᱠᱟᱜᱚᱡᱽ ᱫᱚᱦᱚᱭ ᱯᱮ ᱟᱨ ᱨᱚᱝ ᱛᱮ ᱜᱟᱥᱟᱣ ᱯᱮ᱾ ᱟᱹᱰᱤ ᱱᱟᱯᱟᱭ ᱪᱷᱟᱯᱟ ᱵᱮᱱᱟᱣᱜ-ᱟ!",
          "dev": "साकाम चेतान रे कागोज दोहोय पे आर रोंग ते गासाव पे। आडी नापाय छापा बेनावः-आ!",
          "rom": "Sakam chetan re kagoj dohoy pe aar rong te gasaw pe. Adi napay chhapa benawh-a!"
        },
        "dialogue_mundari": {
          "dev": "साकाम चेतान रे कागोच दोहोये पे आर रंग ते घसाव पे। पुरो बोगि छापा बई ये!",
          "rom": "Sakam chetan re kagoj dohoye pe aar rang te ghasaw pe. Puro bogi chhapa bai ye!"
        },
        "dialogue_ho": {
          "dev": "साकाम चेतान रे कागोच दोहोये पे आर रंग ते घसाव पे। पुरो बुगिन छापा बाई ये!",
          "rom": "Sakam chetan re kagoj dohoye pe aar rang te ghasaw pe. Puro bugin chhapa bai ye!"
        }
      }
    ]
  },
  {
    "id": "jcert-c3-e02",
    "textbook": "हमारी दुनिया भाग 3 (JCERT Class 3)",
    "chapter_number": 2,
    "title": "पाठ 2: बूँद-बूँद से सागर - जल संचयन (Every Drop Counts)",
    "grade": "Class 3",
    "subject": "पर्यावरण (हमारा परिवेश / हमारी दुनिया)",
    "subject_code": "evs",
    "theme": "पारंपरिक जल संचयन (आहर-पाइन, डोभा, चेकडैम)",
    "tribal_title": {
      "santhali_ol": "ᱴᱷᱤᱯᱤ-ᱴᱷᱤᱯᱤ ᱫᱟᱜ ᱛᱮ ᱫᱚᱨᱭᱟ - ᱫᱟᱜ ᱥᱟᱺᱪᱟᱣ",
      "santhali_dev": "ठिपि-ठिपि दाः ते दोरया - दाः सांचाव",
      "mundari": "टोपा-टोपा दाः ते सागर - दाः सांचाव",
      "ho": "टोपा-टोपा दाः ते सागर - दाः सांचाव"
    },
    "topics": [
      "झारखंड के पारंपरिक जल स्रोत (डोभा, आहर-पाइन)",
      "वर्षा जल संचयन (Rainwater Harvesting)",
      "जल संकट व समाधान"
    ],
    "subtopics": [
      "खेत में डोभा बनाकर पानी रोकना",
      "घरेलू उपयोग के पानी का पुनः उपयोग (बगीचे में डालना)",
      "जल प्रदूषण के कारण व बचाव"
    ],
    "fln_milestones": [
      "जल संचयन के उपाय लिखना",
      "जल चेतना रैली व स्लोगन"
    ],
    "tlem_realia": [
      "डोभा व वर्षा जल संचयन मॉडल",
      "जल संरक्षण पोस्टर"
    ],
    "learning_outcomes": [
      "छात्र अपने घरों और खेतों में पानी बचाने के तरीकों को अपनाएँगे"
    ],
    "duration_minutes": 45,
    "steps": [
      {
        "step_number": 1,
        "type": "डोभा व जल संचयन परिचर्चा (Rainwater Harvesting Talk)",
        "time_mins": 15,
        "teacher_hindi": "बारिश के पानी को डोभा और खेत की मेड़ों में रोकना चाहिए ताकि कुओं का जलस्तर बढ़े।",
        "dialogue_santhali": {
          "ol_chiki": "ᱫᱟᱜ ᱡᱟᱹᱲᱤ ᱨᱮᱭᱟᱜ ᱫᱟᱜ ᱫᱚ ᱰᱳᱵᱷᱟ ᱟᱨ ᱵᱟᱹᱫᱽ ᱨᱮ ᱟᱴᱠᱟᱣ ᱦᱩᱭᱩᱜ-ᱟ ᱡᱮᱢᱚᱱ ᱠᱩᱧᱤ ᱨᱮ ᱫᱟᱜ ᱵᱟᱹᱲᱛᱤᱜ ᱢᱟ᱾",
          "dev": "दाः जाड़ी रेयाः दाः दो डोभा आर बाद रे आटकाव हुयुः-आ जेमोन कुंई रे दाः बाड़तीः मा।",
          "rom": "Dah jari reyah dah do dobha aar bad re atkaw huyuh-a jemon kunyi re dah bartih ma."
        },
        "dialogue_mundari": {
          "dev": "दाः गामा रेयाः दाः डोभा आर खेत रे अटकाव लगातींग जेते कुआँ रे दाः बड़ती ओवा।",
          "rom": "Dah gama reyah dah dobha aar khet re atkaw lagating jete kuan re dah barti owa."
        },
        "dialogue_ho": {
          "dev": "दाः गामा रेयाः दाः डोभा आर खेत रे अटकाव लगातींग जेते कुआँ रे दाः बड़ती ओवा।",
          "rom": "Dah gama reyah dah dobha aar khet re atkaw lagating jete kuan re dah barti owa."
        }
      }
    ]
  },
  {
    "id": "jcert-c3-e03",
    "textbook": "हमारी दुनिया भाग 3 (JCERT Class 3)",
    "chapter_number": 3,
    "title": "पाठ 3: हमारे त्यौहार - करमा और सरहुल (Festivals of Jharkhand)",
    "grade": "Class 3",
    "subject": "पर्यावरण (हमारा परिवेश / हमारी दुनिया)",
    "subject_code": "evs",
    "theme": "सरना संस्कृति, प्रकृति वंदना व लोक पर्व",
    "tribal_title": {
      "santhali_ol": "ᱠᱟᱨᱟᱢ ᱟᱨ ᱵᱟᱦᱟ ᱯᱚᱨᱚᱵᱽ (Karam aar Baha Porob)",
      "santhali_dev": "काराम आर बाहा परोब",
      "mundari": "करम आर बाहा परोब",
      "ho": "करम आर बाहा परोब"
    },
    "topics": [
      "सरहुल व बाहा पर्व (प्रकृति वंदना)",
      "करमा पर्व (भाई-बहन व करम डाल)",
      "मांदर, तुमदाः व अखड़ा नृत्य"
    ],
    "subtopics": [
      "सखुआ के फूलों (सारजोम बाहा) की पूजा",
      "सरना स्थल व पाहन/नायके का आशीर्वाद",
      "अखड़ा में सामूहिक पारंपरिक नृत्य"
    ],
    "fln_milestones": [
      "सांस्कृतिक पर्वों पर 5 वाक्य बोलना",
      "प्रकृति संरक्षण का संकल्प"
    ],
    "tlem_realia": [
      "सखुआ के फूल",
      "मांदर (तुमदाः व टामाक)",
      "करम डाली"
    ],
    "learning_outcomes": [
      "प्रकृति और पेड़ों की पूजा का महत्व समझकर पर्यावरण प्रेमी बनेंगे"
    ],
    "duration_minutes": 45,
    "steps": [
      {
        "step_number": 1,
        "type": "त्यौहारों की चर्चा (Cultural Discussion)",
        "time_mins": 15,
        "teacher_hindi": "करमा और सरहुल हमारे झारखंड के सबसे बड़े प्रकृति पर्व हैं। इनमें हम पेड़ों की पूजा करते हैं।",
        "dialogue_santhali": {
          "ol_chiki": "ᱠᱟᱨᱟᱢ ᱟᱨ ᱵᱟᱦᱟ ᱯᱚᱨᱚᱵᱽ ᱫᱚ ᱟᱵᱚ ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱨᱮᱭᱟᱜ ᱡᱚᱛᱚ ᱠᱷᱚᱱ ᱢᱟᱨᱟᱝ ᱯᱚᱨᱚᱵᱽ ᱠᱟᱱᱟ᱾ ᱱᱚᱣᱟ ᱨᱮ ᱟᱵᱚ ᱫᱟᱨᱮ ᱵᱚᱱ ᱵᱚᱝᱜᱟᱭᱟ᱾",
          "dev": "काराम आर बाहा परोब दो आबो झारखण्ड रेयाः जोतो खोन मारांग परोब काना। नोवा रे आबो दारे बोन बोंगाया।",
          "rom": "Karam aar Baha porob do abo Jharkhand reyah joto khon marang porob kana. Nowa re abo dare bon bongaya."
        },
        "dialogue_mundari": {
          "dev": "करम आर बाहा परोब दो आबु झारखण्ड रेयाः मारांग परोब ताना। नेया रे आबु दारू पूजाया।",
          "rom": "Karam aar Baha porob do abu Jharkhand reyah marang破rob tana. Neya re abu daru poojaya."
        },
        "dialogue_ho": {
          "dev": "करम आर बाहा परोब दो आबु झारखण्ड रेयाः मारांग परोब तना। नेया रे आबु दारू पूजाया।",
          "rom": "Karam aar Baha porob do abu Jharkhand reyah marang porob tana. Neya re abu daru poojaya."
        }
      }
    ]
  },
  {
    "id": "jcert-c3-eng01",
    "textbook": "Sunshine 3 (JCERT Class 3)",
    "chapter_number": 1,
    "title": "Unit 1: The Magic Garden (जादुई बगीचा)",
    "grade": "Class 3",
    "subject": "English (Blooming Buds / Sunrise / Sunshine)",
    "subject_code": "english",
    "theme": "Flowers, Nature & School Children Care",
    "tribal_title": {
      "santhali_ol": "ᱡᱟᱹᱫᱩᱣᱟᱱ ᱵᱟᱜᱟᱱ (Jaduwan Bagan)",
      "santhali_dev": "जादुवान बागान",
      "mundari": "जादू बागीचा",
      "ho": "जादू बागीचा"
    },
    "topics": [
      "Sunflowers, Roses, Marigolds",
      "Children watering the plants",
      "Birds talking in the garden"
    ],
    "subtopics": [
      "The sunflowers stood high against the wall",
      "The children brought their watering cans",
      "Vocabulary: Magic, Garden, Sunshine, Golden, Dreaming"
    ],
    "fln_milestones": [
      "Reading English paragraphs with comprehension",
      "Describing flowers in English"
    ],
    "tlem_realia": [
      "Real garden flowers",
      "Illustrated story cards"
    ],
    "learning_outcomes": [
      "Learn compassion towards plants and practice reading English narratives"
    ],
    "duration_minutes": 45,
    "steps": [
      {
        "step_number": 1,
        "type": "Story Reading & Vocabulary (कहानी वाचन व शब्दार्थ)",
        "time_mins": 15,
        "teacher_hindi": "The magic garden was in a school playground. All children loved the flowers.",
        "dialogue_santhali": {
          "ol_chiki": "ᱡᱟᱹᱫᱩᱣᱟᱱ ᱵᱟᱜᱟᱱ ᱫᱚ ᱟᱥᱲᱟ ᱨᱮᱭᱟᱜ ᱮᱱᱮᱡ ᱴᱟᱺᱰᱤ ᱨᱮ ᱛᱟᱦᱮᱸᱠᱟᱱᱟ᱾ ᱡᱚᱛᱚ ᱜᱤᱫᱽᱨᱟᱹ ᱵᱟᱦᱟ ᱠᱚ ᱠᱩᱥᱤᱭᱟᱜ ᱠᱟᱱ ᱛᱟᱦᱮᱸᱱᱟ᱾",
          "dev": "जादुवान बागान दो आसड़ा रेयाः एनेज टांडी रे ताहेकाना। जोतो गिदरा बाहा को कुसियाः कान ताहेना।",
          "rom": "Jaduwan bagan do asra reyah enej tandi re tahekana. Joto gidra baha ko kusiyah kan tahena."
        },
        "dialogue_mundari": {
          "dev": "जादू बागीचा इसकुल रेयाः एनेज पिड़ी रे ताएकेना। सोबेन होन को बा पुरो कुशी ताएकेना।",
          "rom": "Jadu bagicha iskul reyah enej piri re taekena. Soben hon ko ba puro kushi taekena."
        },
        "dialogue_ho": {
          "dev": "जादू बागीचा इसकुल रेयाः एनेज पिड़ी रे तयकेना। सोबेन होन को बा पुरो कुशी तयकेना।",
          "rom": "Jadu bagicha iskul reyah enej piri re taykena. Soben hon ko ba puro kushi taykena."
        }
      }
    ]
  },
  {
    "id": "jcert-c3-eng02",
    "textbook": "Sunshine 3 (JCERT Class 3)",
    "chapter_number": 2,
    "title": "Unit 2: Nina and the Baby Sparrows (नीना और गौरैया के बच्चे)",
    "grade": "Class 3",
    "subject": "English (Blooming Buds / Sunrise / Sunshine)",
    "subject_code": "english",
    "theme": "Empathy for Birds & Animal Protection",
    "tribal_title": {
      "santhali_ol": "ᱱᱤᱱᱟ ᱟᱨ ᱪᱮᱬᱮ ᱦᱚᱯᱚᱱ",
      "santhali_dev": "नीना आर चेणे होपोन",
      "mundari": "नीना आर चेड़े होन को",
      "ho": "नीना आर चेणे होन को"
    },
    "topics": [
      "Baby sparrows in the nest",
      "Leaving the window open",
      "Kindness to living beings"
    ],
    "subtopics": [
      "Nina was worried about baby birds",
      "The nest on the bookshelf",
      "Vocabulary: Wedding, Thrilled, Plump, Hungry"
    ],
    "fln_milestones": [
      "Expressing feelings and emotions in English",
      "Character understanding"
    ],
    "tlem_realia": [
      "Bird nest model",
      "Sparrow picture flashcards"
    ],
    "learning_outcomes": [
      "Develop empathy towards birds and animal habitats"
    ],
    "duration_minutes": 45,
    "steps": [
      {
        "step_number": 1,
        "type": "Empathy Discussion (संवेदना चर्चा)",
        "time_mins": 15,
        "teacher_hindi": "Nina cared for the baby sparrows. We should never harm birds and their nests.",
        "dialogue_santhali": {
          "ol_chiki": "ᱱᱤᱱᱟ ᱫᱚ ᱪᱮᱬᱮ ᱦᱚᱯᱚᱱ ᱟᱹᱰᱤ ᱫᱩᱞᱟᱹᱲ ᱮᱫ ᱠᱚ ᱛᱟᱦᱮᱸᱱᱟ᱾ ᱟᱵᱚ ᱪᱮᱬᱮ ᱛᱩᱠᱟᱹ ᱫᱚ ᱛᱤᱥ ᱦᱚᱸ ᱟᱞᱚᱵᱚᱱ ᱨᱟᱹᱯᱩᱫ ᱢᱟ᱾",
          "dev": "नीना दो चेणे होपोन आडी दुलौड़ एद को ताहेना। आबो चेणे तुका दो तिस हों आलोबोन रापुद मा।",
          "rom": "Nina do chene hopon adi dulowr ed ko tahena. Abo chene tuka do tis hon alobon rapud ma."
        },
        "dialogue_mundari": {
          "dev": "नीना चेड़े होन को पुरो दुलार तना। आबु चेड़े तुका तिस हो आलो बु रापुदे।",
          "rom": "Nina chere hon ko puro dular tana. Abu chere tuka tis ho alo bu rapude."
        },
        "dialogue_ho": {
          "dev": "नीना चेणे होन को पुरो दुलार तना। आबु चेणे तुका तिस हो आलो बु रापुदे।",
          "rom": "Nina chene hon ko puro dular tana. Abu chene tuka tis ho alo bu rapude."
        }
      }
    ]
  },
  {
    "id": "jcert-c3-eng03",
    "textbook": "Sunshine 3 (JCERT Class 3)",
    "chapter_number": 3,
    "title": "Unit 3: Little by Little - The Oak Tree (धीरे-धीरे बढ़ते पेड़)",
    "grade": "Class 3",
    "subject": "English (Blooming Buds / Sunrise / Sunshine)",
    "subject_code": "english",
    "theme": "Poetry, Plant Growth & Environmental Care",
    "tribal_title": {
      "santhali_ol": "ᱵᱟᱹᱭ-ᱵᱟᱹᱭ ᱛᱮ ᱦᱟᱨᱟᱜ ᱫᱟᱨᱮ (Little by Little)",
      "santhali_dev": "बाय-बाय ते हाराः दारे",
      "mundari": "बाए-बाए ते हारा दारू",
      "ho": "बाए-बाए ते हारा दारू"
    },
    "topics": [
      "Poem: Little by little said an acorn",
      "Stages of a seed growing into a huge tree",
      "Care for forests (Sarna & Bir)"
    ],
    "subtopics": [
      "Seed deep in the soil",
      "Roots go down, shoot goes up into the sunshine",
      "Mighty branches spreading wide"
    ],
    "fln_milestones": [
      "Reading English poem with correct rhythm and stress",
      "Writing 3 sentences on how trees grow"
    ],
    "tlem_realia": [
      "Sprouted seeds in cups",
      "Tree growth cycle poster"
    ],
    "learning_outcomes": [
      "Understand how small continuous efforts lead to greatness, just like a tiny seed becomes a giant tree"
    ],
    "duration_minutes": 45,
    "steps": [
      {
        "step_number": 1,
        "type": "Poem Recitation (कविता पाठ)",
        "time_mins": 15,
        "teacher_hindi": "Little by little, an acorn said! जैसे छोटा बीज बड़ा पेड़ बनता है, वैसे ही हर रोज पढ़ने से हम सब विद्वान बनेंगे।",
        "dialogue_santhali": {
          "ol_chiki": "ᱪᱮᱫ ᱞᱮᱠᱟ ᱢᱤᱫᱴᱟᱝ ᱦᱩᱰᱤᱧ ᱡᱟᱝ ᱢᱟᱨᱟᱝ ᱫᱟᱨᱮ ᱵᱮᱱᱟᱣᱜ-ᱟ, ᱚᱱᱠᱟ ᱜᱮ ᱫᱤᱱᱟᱹᱢ ᱯᱟᱲᱦᱟᱣ ᱠᱟᱛᱮ ᱟᱵᱚ ᱵᱚᱱ ᱢᱟᱨᱟᱝ-ᱟ᱾",
          "dev": "चेद लेका मिदटांग हुडिंग जांग मारांग दारे बेनावः-आ, ओन्का गे दिनम पाड़हाव काते आबो बोन मारांग-आ।",
          "rom": "Ched leka midtang huding jang marang dare benawh-a, onka ge dinam parhaw kate abo bon marang-a."
        },
        "dialogue_mundari": {
          "dev": "चिलेका मियाद हुडिंग जंग मारांग दारू बई ओवा, एनलेका गे दिनम पाड़हाव ते आबु बु मारांग ओवा।",
          "rom": "Chileka miyad huding jang marang daru bai owa, enleka ge dinam parhaw te abu bu marang owa."
        },
        "dialogue_ho": {
          "dev": "चिलेका मियाद हुडिंग जंग मारांग दारू बाई ओवा, एनलेका गे दिनम पाड़हाव ते आबु बु मारांग ओवा।",
          "rom": "Chileka miyad huding jang marang daru bai owa, enleka ge dinam parhaw te abu bu marang owa."
        }
      }
    ]
  },
  {
    "id": "jcert-bv-01",
    "textbook": "पलाश विद्याप्रवेश (JCERT Balvatika)",
    "chapter_number": 1,
    "title": "बालवाटिका 1: आओ मिलकर खेलें (Let Us Play Together)",
    "grade": "Balvatika",
    "subject": "हिन्दी (मांदर / सखुआ / भाषांजलि)",
    "subject_code": "hindi",
    "theme": "आनंदमयी खेल, मित्र व कक्षा समायोजन",
    "tribal_title": {
      "santhali_ol": "ᱫᱮᱞᱟ ᱵᱚᱱ ᱮᱱᱮᱡᱟ (Dela Bon Eneja)",
      "santhali_dev": "देला बोन एनेजा",
      "mundari": "देला बु एनेजे",
      "ho": "देला बु एनेजे"
    },
    "topics": [
      "वृत्त में बैठकर खेल",
      "हँसना व ताली बजाना",
      "कक्षा के खिलौने"
    ],
    "subtopics": [
      "ताली बजाओ (थैयाड़ी / ᱛᱷᱟᱹᱭᱟᱹᱲᱤ)",
      "हँसो (लांदा / ᱞᱟᱸᱫᱟ)",
      "कूदो (दोन / ᱫᱚᱱ)"
    ],
    "fln_milestones": [
      "कक्षा के वातावरण में सहज होना",
      "सरल मौखिक निर्देशों का पालन"
    ],
    "tlem_realia": [
      "माटी के खिलौने",
      "रंगीन गेंदें"
    ],
    "learning_outcomes": [
      "बच्चे आनंदपूर्वक विद्यालय आने और सहपाठियों से जुड़ने में सहज होंगे"
    ],
    "duration_minutes": 30,
    "steps": [
      {
        "step_number": 1,
        "type": "खेल व ताली (Action Rhyme)",
        "time_mins": 15,
        "teacher_hindi": "सब मिलकर ताली बजाओ और हँसो!",
        "dialogue_santhali": {
          "ol_chiki": "ᱡᱚᱛᱚ ᱦᱚᱲ ᱛᱷᱟᱹᱭᱟᱹᱲᱤ ᱯᱮ ᱟᱨ ᱞᱟᱸᱫᱟᱭ ᱯᱮ!",
          "dev": "जोतो होड़ थैयाड़ी पे आर लांदाय पे!",
          "rom": "Joto hor thaiyari pe aar landay pe!"
        },
        "dialogue_mundari": {
          "dev": "सोबेन को थाली पे आर लांदाए पे!",
          "rom": "Soben ko thali pe aar landaye pe!"
        },
        "dialogue_ho": {
          "dev": "सोबेन को थाली पे आर लांदाए पे!",
          "rom": "Soben ko thali pe aar landaye pe!"
        }
      }
    ]
  },
  {
    "id": "jcert-bv-02",
    "textbook": "पलाश विद्याप्रवेश (JCERT Balvatika)",
    "chapter_number": 2,
    "title": "बालवाटिका 2: कंकड़ और पत्तों की गिनती (Counting 1 to 5)",
    "grade": "Balvatika",
    "subject": "गणित (संख्याओं का जादू / खेल-खेल में गणित / रोचक गणित)",
    "subject_code": "math",
    "theme": "1 से 5 तक ठोस वस्तुओं से गिनती",
    "tribal_title": {
      "santhali_ol": "᱑ ᱠᱷᱚᱱ ᱕ ᱫᱷᱟᱹᱵᱤᱡ ᱞᱮᱠᱷᱟ",
      "santhali_dev": "१ खोन ५ धाबिज लेखा",
      "mundari": "मियाद एते मोनेया लेका",
      "ho": "मोय एते मोया लेका"
    },
    "topics": [
      "1 से 5 तक संख्या बोध",
      "कंकड़ छूकर गिनना",
      "उँगलियों का खेल"
    ],
    "subtopics": [
      "1 मित्, 2 बार, 3 पे, 4 पोन, 5 मोड़े",
      "ताली बजाकर गिनती"
    ],
    "fln_milestones": [
      "1 से 5 तक वस्तुओं को गिनना"
    ],
    "tlem_realia": [
      "सखुआ के पत्ते",
      "गोल कंकड़"
    ],
    "learning_outcomes": [
      "ठोस सामग्री के माध्यम से 1 से 5 तक गिनती करना सीखेंगे"
    ],
    "duration_minutes": 30,
    "steps": [
      {
        "step_number": 1,
        "type": "कंकड़ गिनती (Pebble Counting)",
        "time_mins": 15,
        "teacher_hindi": "कंकड़ गिनो: एक, दो, तीन, चार, पाँच!",
        "dialogue_santhali": {
          "ol_chiki": "ᱫᱷᱤᱨᱤ ᱞᱮᱠᱷᱟᱭ ᱯᱮ: ᱢᱤᱫ, ᱵᱟᱨ, ᱯᱮ, ᱯᱳᱱ, ᱢᱚᱬᱮ!",
          "dev": "धीरी लेखाया पे: मित्, बार, पे, पोन, मोड़े!",
          "rom": "Dhiri lekhaya pe: Mit, Bar, Pe, Pon, More!"
        },
        "dialogue_mundari": {
          "dev": "धीरी लेकाये पे: मियाद, बारिया, अपिया, उपूनिया, मोनेया!",
          "rom": "Dhiri lekaye pe: Miyad, Bariya, Apiya, Upuniya, Moneya!"
        },
        "dialogue_ho": {
          "dev": "धीरी लेकाये पे: मोय, बारिया, आपिया, उपून, मोया!",
          "rom": "Dhiri lekaye pe: Moy, Bariya, Apiya, Upun, Moya!"
        }
      }
    ]
  },
  {
    "id": "jcert-bv-03",
    "textbook": "पलाश विद्याप्रवेश (JCERT Balvatika)",
    "chapter_number": 3,
    "title": "बालवाटिका 3: हमारे रंग और परिवेश (Colors & Nature)",
    "grade": "Balvatika",
    "subject": "पर्यावरण (हमारा परिवेश / हमारी दुनिया)",
    "subject_code": "evs",
    "theme": "लाल, हरा, पीला व नीला रंग पहचान",
    "tribal_title": {
      "santhali_ol": "ᱟᱵᱚᱣᱟᱜ ᱨᱚᱝ ᱟᱨ ᱥᱤᱨᱡᱚᱱ",
      "santhali_dev": "आबोवाः रोंग आर सिरजोन",
      "mundari": "आबुवाः रंग आर सिरजोन",
      "ho": "आबुवाः रंग आर सिरजोन"
    },
    "topics": [
      "हरा पत्ता",
      "लाल फूल",
      "नीला आकाश"
    ],
    "subtopics": [
      "हरा (हारियाड़ / ᱦᱟᱹᱨᱤᱭᱟᱹᱲ)",
      "लाल (आराः / ᱟᱨᱟᱜ)"
    ],
    "fln_milestones": [
      "प्राकृतिक रंगों को पहचानना"
    ],
    "tlem_realia": [
      "रंगीन पत्ते व फूल"
    ],
    "learning_outcomes": [
      "आस-पास के वातावरण में रंगों की पहचान कर सकेंगे"
    ],
    "duration_minutes": 30,
    "steps": [
      {
        "step_number": 1,
        "type": "रंग पहचान खेल (Color Play)",
        "time_mins": 15,
        "teacher_hindi": "पत्ता हरा (हारियाड़) है और फूल लाल (आराः) है!",
        "dialogue_santhali": {
          "ol_chiki": "ᱥᱟᱠᱟᱢ ᱫᱚ ᱦᱟᱹᱨᱤᱭᱟᱹᱲ ᱜᱮᱭᱟ ᱟᱨ ᱵᱟᱦᱟ ᱫᱚ ᱟᱨᱟᱜ ᱜᱮᱭᱟ!",
          "dev": "साकाम दो हारियाड़ गेया आर बाहा दो आराः गेया।",
          "rom": "Sakam do hariyar geya aar baha do arah geya."
        },
        "dialogue_mundari": {
          "dev": "साकाम हरियर ताना आर बा आराः ताना।",
          "rom": "Sakam hariyar tana aar ba arah tana."
        },
        "dialogue_ho": {
          "dev": "साकाम हरियर तना आर बा आराः तना।",
          "rom": "Sakam hariyar tana aar ba arah tana."
        }
      }
    ]
  },
  {
    "id": "jcert-bv-04",
    "textbook": "पलाश विद्याप्रवेश (JCERT Balvatika)",
    "chapter_number": 4,
    "title": "बालवाटिका 4: English Fun Words (अंग्रेजी बालगीत)",
    "grade": "Balvatika",
    "subject": "English (Blooming Buds / Sunrise / Sunshine)",
    "subject_code": "english",
    "theme": "Action Songs & Simple Words",
    "tribal_title": {
      "santhali_ol": "ᱤᱝᱞᱤᱥ ᱥᱮᱨᱮᱧ ᱟᱨ ᱠᱷᱮᱞᱚᱸᱰ",
      "santhali_dev": "इंग्लिश सेरेञ आर खेलोंड",
      "mundari": "इंग्लिश दुरंग आर खेल",
      "ho": "इंग्लिश दुरंग आर खेल"
    },
    "topics": [
      "Clap your hands",
      "Jump and Run",
      "Hello & Bye"
    ],
    "subtopics": [
      "Clap (ताली बजाना / ᱛᱷᱟᱹᱭᱟᱹᱲᱤ)",
      "Smile (मुस्कुराना / ᱞᱟᱸᱫᱟ)"
    ],
    "fln_milestones": [
      "Simple action word comprehension"
    ],
    "tlem_realia": [
      "Rhyme chart",
      "Action gestures"
    ],
    "learning_outcomes": [
      "Enjoy singing simple English action songs"
    ],
    "duration_minutes": 30,
    "steps": [
      {
        "step_number": 1,
        "type": "Action Song (अभिनय गीत)",
        "time_mins": 15,
        "teacher_hindi": "Clap your hands! ताली बजाओ और मुस्कुराओ!",
        "dialogue_santhali": {
          "ol_chiki": "ᱛᱷᱟᱹᱭᱟᱹᱲᱤ ᱯᱮ ᱟᱨ ᱞᱟᱸᱫᱟᱭ ᱯᱮ! Clap your hands!",
          "dev": "थैयाड़ी पे आर लांदाय पे! Clap your hands!",
          "rom": "Thaiyari pe aar landay pe! Clap your hands!"
        },
        "dialogue_mundari": {
          "dev": "थाली पे आर लांदाए पे! Clap your hands!",
          "rom": "Thali pe aar landaye pe! Clap your hands!"
        },
        "dialogue_ho": {
          "dev": "थाली पे आर लांदाए पे! Clap your hands!",
          "rom": "Thali pe aar landaye pe! Clap your hands!"
        }
      }
    ]
  }
];
