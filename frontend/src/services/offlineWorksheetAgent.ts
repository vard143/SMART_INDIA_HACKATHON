import { TribalLanguage, CustomWorksheetData, CustomWorksheetMatchItem, CustomWorksheetCountItem, CustomWorksheetTraceItem, CustomWorksheetFillItem } from '../types';
import { devanagariToOlChiki } from './offlineNlpEngine';

export type StudentCompetencyLevel = 'balvatika' | 'class1' | 'class2' | 'class3';
export type WorksheetFocusType = 'combo' | 'match' | 'count' | 'trace' | 'fill' | 'story';

export interface StorySequenceStep {
  step_number: number;
  emoji: string;
  tribal_text: string;
  hindi_text: string;
  english_text: string;
  order_hint: string;
}

export interface AgentGeneratedWorksheet extends CustomWorksheetData {
  student_name: string;
  school_name: string;
  competency_level: StudentCompetencyLevel;
  focus_type: WorksheetFocusType;
  generated_timestamp: number;
  variation_seed: string;
  story_sequence_section?: StorySequenceStep[];
  phonics_oral_corner?: {
    prompt_hindi: string;
    prompt_tribal: string;
    practice_words: { word: string; script: string; phonetic: string; meaning: string }[];
  };
  pedagogical_notes: {
    fln_competencies: string[];
    teacher_tips: string;
    remedial_guide: string;
  };
}

export interface WorksheetGenerationOptions {
  studentName?: string;
  schoolName?: string;
  competencyLevel?: StudentCompetencyLevel;
  focusType?: WorksheetFocusType;
  subject?: string;
  seed?: string | number;
}

// =========================================================================
// CULTURALLY AUTHENTIC JHARKHAND TRIBAL REALIA & VOCABULARY REPOSITORY
// =========================================================================
interface RealiaItem {
  id: string;
  emoji: string;
  category: 'flora' | 'fauna' | 'instrument' | 'daily' | 'classroom';
  hindi: string;
  english: string;
  santhali: { dev: string; ol: string; rom: string };
  mundari: { dev: string; rom: string };
  ho: { dev: string; rom: string };
}

const TRIBAL_REALIA_BANK: RealiaItem[] = [
  // --- Flora of Jharkhand ---
  {
    id: 'sal_tree',
    emoji: '🌳',
    category: 'flora',
    hindi: 'सखुआ (साल) पेड़',
    english: 'Sal Tree',
    santhali: { dev: 'सारजोम दारे', ol: 'ᱥᱟᱨᱡᱚᱢ ᱫᱟᱨᱮ', rom: 'Sarjom Dare' },
    mundari: { dev: 'सारजोम दारू', rom: 'Sarjom Daru' },
    ho: { dev: 'सारजोम दारू', rom: 'Sarjom Daru' }
  },
  {
    id: 'mahua_tree',
    emoji: '🥭',
    category: 'flora',
    hindi: 'महुआ पेड़ / फल',
    english: 'Mahua Tree / Fruit',
    santhali: { dev: 'मातकोम दारे', ol: 'ᱢᱟᱛᱠᱚᱢ ᱫᱟᱨᱮ', rom: 'Matkom Dare' },
    mundari: { dev: 'मादकम दारू', rom: 'Madkam Daru' },
    ho: { dev: 'मादकम दारू', rom: 'Madkam Daru' }
  },
  {
    id: 'palash_flower',
    emoji: '🌺',
    category: 'flora',
    hindi: 'पलाश (परस) फूल',
    english: 'Palash Flower',
    santhali: { dev: 'मुरुप बाहा', ol: 'ᱢᱩᱨᱩᱯ ᱵᱟᱦᱟ', rom: 'Murup Baha' },
    mundari: { dev: 'मुरुप बा', rom: 'Murup Ba' },
    ho: { dev: 'मुरुप बा', rom: 'Murup Ba' }
  },
  {
    id: 'sarhul_flower',
    emoji: '🌸',
    category: 'flora',
    hindi: 'सरहुल (बाहा) फूल',
    english: 'Sarhul Flower',
    santhali: { dev: 'बाहा', ol: 'ᱵᱟᱦᱟ', rom: 'Baha' },
    mundari: { dev: 'बाहा', rom: 'Baha' },
    ho: { dev: 'बा', rom: 'Ba' }
  },
  {
    id: 'sal_leaf',
    emoji: '🍃',
    category: 'flora',
    hindi: 'सखुआ पत्ता',
    english: 'Sal Leaf',
    santhali: { dev: 'साकाम', ol: 'ᱥᱟᱠᱟᱢ', rom: 'Sakam' },
    mundari: { dev: 'साकाम', rom: 'Sakam' },
    ho: { dev: 'साकाम', rom: 'Sakam' }
  },
  {
    id: 'mango_tree',
    emoji: '🥭',
    category: 'flora',
    hindi: 'आम का पेड़',
    english: 'Mango Tree',
    santhali: { dev: 'उल दारे', ol: 'ᱩᱞ ᱫᱟᱨᱮ', rom: 'Ul Dare' },
    mundari: { dev: 'उली दारू', rom: 'Uli Daru' },
    ho: { dev: 'उली दारू', rom: 'Uli Daru' }
  },

  // --- Fauna of Jharkhand Forests ---
  {
    id: 'elephant',
    emoji: '🐘',
    category: 'fauna',
    hindi: 'हाथी',
    english: 'Elephant',
    santhali: { dev: 'हाती', ol: 'ᱦᱟᱹᱛᱤ', rom: 'Hati' },
    mundari: { dev: 'हाती', rom: 'Hati' },
    ho: { dev: 'हाती', rom: 'Hati' }
  },
  {
    id: 'peacock',
    emoji: '🦚',
    category: 'fauna',
    hindi: 'मोर',
    english: 'Peacock',
    santhali: { dev: 'माराग', ol: 'ᱢᱟᱨᱟᱜ', rom: 'Marak' },
    mundari: { dev: 'मारा', rom: 'Mara' },
    ho: { dev: 'मारा', rom: 'Mara' }
  },
  {
    id: 'bird',
    emoji: '🐦',
    category: 'fauna',
    hindi: 'चिड़िया / पक्षी',
    english: 'Bird',
    santhali: { dev: 'चेणे', ol: 'ᱪᱮᱬᱮ', rom: 'Chene' },
    mundari: { dev: 'चेड़े', rom: 'Chede' },
    ho: { dev: 'चेड़े', rom: 'Chede' }
  },
  {
    id: 'deer',
    emoji: '🦌',
    category: 'fauna',
    hindi: 'हिरण',
    english: 'Deer',
    santhali: { dev: 'झिल', ol: 'ᱡᱷᱤᱞ', rom: 'Jhil' },
    mundari: { dev: 'जिल', rom: 'Jil' },
    ho: { dev: 'जिल', rom: 'Jil' }
  },
  {
    id: 'cow',
    emoji: '🐄',
    category: 'fauna',
    hindi: 'गाय',
    english: 'Cow',
    santhali: { dev: 'गय', ol: 'ᱜᱟᱹᱭ', rom: 'Gai' },
    mundari: { dev: 'उरीः', rom: 'Urih' },
    ho: { dev: 'उरीः', rom: 'Urih' }
  },
  {
    id: 'fish',
    emoji: '🐟',
    category: 'fauna',
    hindi: 'मछली',
    english: 'Fish',
    santhali: { dev: 'हाकु', ol: 'ᱦᱟᱹᱠᱩ', rom: 'Haku' },
    mundari: { dev: 'हाकु', rom: 'Haku' },
    ho: { dev: 'हाकु', rom: 'Haku' }
  },
  {
    id: 'squirrel',
    emoji: '🐿️',
    category: 'fauna',
    hindi: 'गिलहरी',
    english: 'Squirrel',
    santhali: { dev: 'तुड़', ol: 'ᱛᱩᱲ', rom: 'Tur' },
    mundari: { dev: 'तुडु', rom: 'Tudu' },
    ho: { dev: 'तुडु', rom: 'Tudu' }
  },
  {
    id: 'butterfly',
    emoji: '🦋',
    category: 'fauna',
    hindi: 'तितली',
    english: 'Butterfly',
    santhali: { dev: 'पिपिलियांग', ol: 'ᱯᱤᱯᱤᱲᱤᱭᱟᱹᱝ', rom: 'Pipiliyang' },
    mundari: { dev: 'पिपिरनी', rom: 'Pipirni' },
    ho: { dev: 'पिपिरनी', rom: 'Pipirni' }
  },

  // --- Traditional Instruments & Cultural Realia ---
  {
    id: 'mandar_drum',
    emoji: '🥁',
    category: 'instrument',
    hindi: 'मांदर ढोल',
    english: 'Mandar Folk Drum',
    santhali: { dev: 'तुमदाः', ol: 'ᱛᱩᱢᱫᱟᱜ', rom: 'Tumdak' },
    mundari: { dev: 'तुमदा', rom: 'Tumda' },
    ho: { dev: 'दमंग', rom: 'Damang' }
  },
  {
    id: 'tamak_drum',
    emoji: '🪘',
    category: 'instrument',
    hindi: 'टमाक (बड़ा नगाड़ा)',
    english: 'Tamak Nagada Drum',
    santhali: { dev: 'टामाक', ol: 'ᱴᱟᱢᱟᱠ', rom: 'Tamak' },
    mundari: { dev: 'टामाक', rom: 'Tamak' },
    ho: { dev: 'टामाक', rom: 'Tamak' }
  },
  {
    id: 'flute',
    emoji: '🪈',
    category: 'instrument',
    hindi: 'बाँसुरी (तिरयो)',
    english: 'Bamboo Flute',
    santhali: { dev: 'तिरयो', ol: 'ᱛᱤᱨᱭᱟᱹᱣ', rom: 'Tiryo' },
    mundari: { dev: 'रुरुतु', rom: 'Rututu' },
    ho: { dev: 'रुरुतु', rom: 'Rututu' }
  },
  {
    id: 'bow_arrow',
    emoji: '🏹',
    category: 'instrument',
    hindi: 'धनुष-बाण',
    english: 'Bow & Arrow',
    santhali: { dev: 'आग-सार', ol: 'ᱟᱜ-ᱥᱟᱨ', rom: 'Ag-Sar' },
    mundari: { dev: 'आग-सार', rom: 'Ag-Sar' },
    ho: { dev: 'आ-सार', rom: 'A-Sar' }
  },
  {
    id: 'clay_pot',
    emoji: '🏺',
    category: 'daily',
    hindi: 'मिट्टी की हांडी / घड़ा',
    english: 'Earthen Clay Pot',
    santhali: { dev: 'चुकाः / टुकी', ol: 'ᱪᱩᱠᱟᱹᱜ', rom: 'Chukah' },
    mundari: { dev: 'चेटे', rom: 'Chete' },
    ho: { dev: 'चेटे', rom: 'Chete' }
  },
  {
    id: 'basket',
    emoji: '🧺',
    category: 'daily',
    hindi: 'बाँस की टोकरी',
    english: 'Bamboo Basket',
    santhali: { dev: 'दाल्ला / खांची', ol: 'ᱫᱟᱞᱞᱟ', rom: 'Dalla' },
    mundari: { dev: 'टोकी', rom: 'Toki' },
    ho: { dev: 'टोकी', rom: 'Toki' }
  },

  // --- Classroom & Daily Environment ---
  {
    id: 'book',
    emoji: '📖',
    category: 'classroom',
    hindi: 'किताब / पुस्तक',
    english: 'Book',
    santhali: { dev: 'पोतोब', ol: 'ᱯᱚᱛᱚᱵ', rom: 'Potob' },
    mundari: { dev: 'पुथी', rom: 'Puthi' },
    ho: { dev: 'पुथी', rom: 'Puthi' }
  },
  {
    id: 'pencil',
    emoji: '✏️',
    category: 'classroom',
    hindi: 'कलम / लिखना',
    english: 'Pencil / Write',
    santhali: { dev: 'ओल', ol: 'ᱚᱞ', rom: 'Ol' },
    mundari: { dev: 'ओल', rom: 'Ol' },
    ho: { dev: 'ओल', rom: 'Ol' }
  },
  {
    id: 'school',
    emoji: '🏫',
    category: 'classroom',
    hindi: 'विद्यालय / स्कूल',
    english: 'School',
    santhali: { dev: 'आसड़ा', ol: 'ᱟᱥᱲᱟ', rom: 'Asra' },
    mundari: { dev: 'इस्कुल', rom: 'Iskul' },
    ho: { dev: 'इस्कुल', rom: 'Iskul' }
  },
  {
    id: 'teacher',
    emoji: '👩‍🏫',
    category: 'classroom',
    hindi: 'शिक्षक / गुरुजी',
    english: 'Teacher',
    santhali: { dev: 'माचेत', ol: 'ᱢᱟᱪᱮᱛ', rom: 'Machet' },
    mundari: { dev: 'माचेत', rom: 'Machet' },
    ho: { dev: 'माचेत', rom: 'Machet' }
  },
  {
    id: 'water',
    emoji: '💧',
    category: 'daily',
    hindi: 'पानी / जल',
    english: 'Water',
    santhali: { dev: 'दाः', ol: 'ᱫᱟᱜ', rom: 'Dak' },
    mundari: { dev: 'दाः', rom: 'Dah' },
    ho: { dev: 'दाः', rom: 'Dah' }
  },
  {
    id: 'sun',
    emoji: '☀️',
    category: 'daily',
    hindi: 'सूरज / दिन',
    english: 'Sun',
    santhali: { dev: 'सिंज चांदोल', ol: 'ᱥᱤᱧ ᱪᱟᱸᱫᱚ', rom: 'Sinj Chando' },
    mundari: { dev: 'सिंगी', rom: 'Singi' },
    ho: { dev: 'सिंगी', rom: 'Singi' }
  },
  {
    id: 'home',
    emoji: '🏡',
    category: 'daily',
    hindi: 'घर / परिवार',
    english: 'Home',
    santhali: { dev: 'ओड़ाः', ol: 'ᱳᱲᱟᱜ', rom: 'Orah' },
    mundari: { dev: 'ओड़ाः', rom: 'Orah' },
    ho: { dev: 'ओवाः', rom: 'Owah' }
  }
];

// Tracing character banks for Ol Chiki & Devanagari
const TRACING_CHAR_BANK = [
  { dev: 'अ', ol: 'ᱚ', rom: 'O', wordDev: 'ओल (लिखना)', wordOl: 'ᱚᱞ', wordEng: 'Write' },
  { dev: 'त', ol: 'ᱛ', rom: 'T', wordDev: 'तुमदाः (मांदर)', wordOl: 'ᱛᱩᱢᱫᱟᱜ', wordEng: 'Drum' },
  { dev: 'ग', ol: 'ᱜ', rom: 'G', wordDev: 'गय (गाय)', wordOl: 'ᱜᱟᱹᱭ', wordEng: 'Cow' },
  { dev: 'ल', ol: 'ᱞ', rom: 'L', wordDev: 'लेखा (गिनती)', wordOl: 'ᱞᱮᱠᱷᱟ', wordEng: 'Count' },
  { dev: 'आ', ol: 'ᱟ', rom: 'A', wordDev: 'आसड़ा (स्कूल)', wordOl: 'ᱟᱥᱲᱟ', wordEng: 'School' },
  { dev: 'क', ol: 'ᱠ', rom: 'K', wordDev: 'काहु (कौआ)', wordOl: 'ᱠᱟᱦᱩ', wordEng: 'Crow' },
  { dev: 'ज', ol: 'ᱡ', rom: 'J', wordDev: 'जोहार (नमस्ते)', wordOl: 'ᱡᱚᱦᱟᱨ', wordEng: 'Greeting' },
  { dev: 'म', ol: 'ᱢ', rom: 'M', wordDev: 'माचेत (शिक्षक)', wordOl: 'ᱢᱟᱪᱮᱛ', wordEng: 'Teacher' },
  { dev: 'स', ol: 'ᱥ', rom: 'S', wordDev: 'सारजोम (सखुआ)', wordOl: 'ᱥᱟᱨᱡᱚᱢ', wordEng: 'Sal Tree' },
  { dev: 'ह', ol: 'ᱦ', rom: 'H', wordDev: 'हाती (हाथी)', wordOl: 'ᱦᱟᱹᱛᱤ', wordEng: 'Elephant' },
  { dev: 'द', ol: 'ᱫ', rom: 'D', wordDev: 'दारे (पेड़)', wordOl: 'ᱫᱟᱨᱮ', wordEng: 'Tree' },
  { dev: 'प', ol: 'ᱯ', rom: 'P', wordDev: 'पोतोब (किताब)', wordOl: 'ᱯᱚᱛᱚᱵ', wordEng: 'Book' },
  { dev: 'ब', ol: 'ᱵ', rom: 'B', wordDev: 'बाहा (फूल)', wordOl: 'ᱵᱟᱦᱟ', wordEng: 'Flower' },
  { dev: 'च', ol: 'ᱪ', rom: 'Ch', wordDev: 'चेणे (चिड़िया)', wordOl: 'ᱪᱮᱬᱮ', wordEng: 'Bird' }
];

// Story sequence storylines
const STORY_SEQUENCES = [
  {
    title_hindi: 'सखुआ (साल) के पौधे का बढ़ना',
    title_tribal: 'ᱥᱟᱨᱡᱚᱢ ᱫᱟᱨᱮ ᱦᱟᱨᱟᱜ ᱠᱟᱹᱦᱱᱤ',
    steps: [
      {
        step_number: 1,
        emoji: '🌱',
        tribal_text: 'ᱢᱟᱪᱮᱛ ᱟᱨ ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ ᱦᱟᱥᱟ ᱨᱮ ᱡᱟᱝ ᱠᱚ ᱨᱚᱦᱚᱭ ᱠᱮᱫᱟ᱾',
        hindi_text: 'बच्चों ने मिट्टी में सखुआ का बीज बोया।',
        english_text: 'Children planted the sacred Sal seed in soil.',
        order_hint: 'चरण १ (First)'
      },
      {
        step_number: 2,
        emoji: '💧',
        tribal_text: 'ᱫᱤᱱᱟᱹᱢ ᱥᱮᱛᱟᱜ ᱨᱮ ᱫᱟᱜ ᱠᱚ ᱫᱩᱞ ᱠᱮᱫᱟ ᱟᱨ ᱠᱩᱧ ᱧᱮᱞ ᱠᱮᱫᱟ᱾',
        hindi_text: 'रोज़ सुबह पौधे में पानी डाला और देखभाल की।',
        english_text: 'They watered the sprout every morning.',
        order_hint: 'चरण २ (Second)'
      },
      {
        step_number: 3,
        emoji: '🌳',
        tribal_text: 'ᱠᱤᱪᱷᱩ ᱫᱤᱱ ᱛᱟᱭᱚᱢ ᱦᱟᱹᱨᱭᱟᱹᱲ ᱥᱟᱠᱟᱢ ᱥᱟᱶ ᱢᱟᱨᱟᱝ ᱫᱟᱨᱮ ᱵᱮᱱᱟᱣ ᱮᱱᱟ᱾',
        hindi_text: 'कुछ दिनों बाद सुंदर सखुआ का वृक्ष बन गया और छाँव दी।',
        english_text: 'It grew into a grand green tree giving cool shade.',
        order_hint: 'चरण ३ (Third)'
      }
    ]
  },
  {
    title_hindi: 'गाँव में बाहा (सरहुल) पर्व की खुशी',
    title_tribal: 'ᱟᱹᱛᱩ ᱨᱮ ᱵᱟᱦᱟ ᱯᱚᱨᱚᱵᱽ',
    steps: [
      {
        step_number: 1,
        emoji: '🌸',
        tribal_text: 'ᱵᱤᱨ ᱠᱷᱚᱱ ᱥᱟᱨᱡᱚᱢ ᱵᱟᱦᱟ ᱠᱚ ᱛᱩᱢᱟᱹᱞ ᱟᱹᱜᱩ ᱠᱮᱫᱟ᱾',
        hindi_text: 'जंगल से ताज़े सखुआ के बाहा (फूल) चुनकर लाए।',
        english_text: 'Gathered fresh Sal blossoms from forest.',
        order_hint: 'चरण १ (First)'
      },
      {
        step_number: 2,
        emoji: '🥁',
        tribal_text: 'ᱟᱹᱛᱩ ᱟᱠᱷᱲᱟ ᱨᱮ ᱛᱩᱢᱫᱟᱜ-ᱴᱟᱢᱟᱠ ᱨᱩ ᱮᱦᱚᱵ ᱮᱱᱟ᱾',
        hindi_text: 'गाँव के अखाड़े में मांदर और टमाक गूँजने लगे।',
        english_text: 'Mandar drums started playing in the village ground.',
        order_hint: 'चरण २ (Second)'
      },
      {
        step_number: 3,
        emoji: '💃',
        tribal_text: 'ᱥᱟᱱᱟᱢ ᱜᱤᱫᱽᱨᱟᱹ ᱟᱨ ᱢᱟᱪᱮᱛ ᱢᱮᱥᱟ ᱠᱟᱛᱮ ᱠᱚ ᱮᱱᱮᱡ ᱥᱮᱨᱮᱧ ᱠᱮᱫᱟ᱾',
        hindi_text: 'सब बच्चे और गुरुजी मिलकर खुशी से नाचे और गाए।',
        english_text: 'Everyone sang and danced together happily.',
        order_hint: 'चरण ३ (Third)'
      }
    ]
  }
];

// Fill-in-the-blank sentences bank
const FILL_SENTENCES_BANK = [
  {
    sentence_incomplete: 'हमारे गाँव के जंगल में ___ का पेड़ बहुत पूजनीय है।',
    missing_word: 'सखुआ (ᱫᱟᱨᱮ)',
    tribal_sentence: 'ᱟᱞᱮ ᱟᱹᱛᱩ ᱵᱤᱨ ᱨᱮ ᱥᱟᱨᱡᱚᱢ ᱫᱟᱨᱮ ᱟᱹᱰᱤ ᱢᱟᱱᱟᱣ-ᱟ᱾',
    hint: '🌳 सखुआ पेड़ / ᱥᱟᱨᱡᱚᱢ ᱫᱟᱨᱮ'
  },
  {
    sentence_incomplete: 'सुबह पाठशाला आकर हम गुरुजी को ___ कहते हैं।',
    missing_word: 'जोहार (ᱡᱚᱦᱟᱨ)',
    tribal_sentence: 'ᱥᱮᱛᱟᱜ ᱟᱥᱲᱟ ᱦᱮᱡ ᱠᱟᱛᱮ ᱢᱟᱪᱮᱛ ᱵᱚᱱ ᱡᱚᱦᱟᱨ ᱟᱭᱟ᱾',
    hint: '🌿 जोहार / ᱡᱚᱦᱟᱨ'
  },
  {
    sentence_incomplete: 'सरहुल के त्योहार में बच्चे ___ बजाते हैं।',
    missing_word: 'मांदर (ᱛᱩᱢᱫᱟᱜ)',
    tribal_sentence: 'ᱵᱟᱦᱟ ᱯᱟᱨᱟᱵᱽ ᱨᱮ ᱜᱤᱫᱽᱨᱟᱹ ᱛᱩᱢᱫᱟᱜ ᱠᱚ ᱨᱩᱭ-ᱟ᱾',
    hint: '🥁 मांदर / ᱛᱩᱢᱫᱟᱜ'
  },
  {
    sentence_incomplete: 'पेड़ की हरी डाली पर सुंदर ___ गाती है।',
    missing_word: 'चिड़िया (ᱪᱮᱬᱮ)',
    tribal_sentence: 'ᱫᱟᱨᱮ ᱰᱟᱹᱨ ᱨᱮ ᱪᱮᱬᱮ ᱨᱟᱜ ᱮᱫ-ᱟᱭ᱾',
    hint: '🐦 चिड़िया / ᱪᱮᱬᱮ'
  },
  {
    sentence_incomplete: 'हम पाठशाला में अपनी ___ से वर्णमाला लिखते हैं।',
    missing_word: 'कलम (ᱚᱞ / ᱠᱟᱞᱟᱢ)',
    tribal_sentence: 'ᱟᱵᱚ ᱟᱥᱲᱟ ᱨᱮ ᱚᱞ ᱛᱮ ᱪᱤᱠᱤ ᱵᱚᱱ ᱚᱞ-ᱟ᱾',
    hint: '✏️ कलम / ᱚᱞ'
  },
  {
    sentence_incomplete: 'जंगल से मीठे ___ के फल गिरते हैं।',
    missing_word: 'महुआ (ᱢᱟᱦᱩᱣᱟ)',
    tribal_sentence: 'ᱵᱤᱨ ᱨᱮ ᱢᱟᱦᱩᱣᱟ ᱡᱚ ᱧᱩᱨᱩᱜ-ᱟ᱾',
    hint: '🥭 महुआ / ᱢᱟᱦᱩᱣᱟ'
  }
];

export class OfflineWorksheetAgent {
  /**
   * Deterministic Pseudo-Random Number Generator based on seed
   */
  private createRandom(seedStr: string) {
    let hash = 0;
    for (let i = 0; i < seedStr.length; i++) {
      hash = (hash << 5) - hash + seedStr.charCodeAt(i);
      hash |= 0;
    }
    return () => {
      hash = (hash * 9301 + 49297) % 233280;
      return Math.abs(hash / 233280);
    };
  }

  /**
   * Shuffles an array immutably using the seeded random function
   */
  private shuffle<T>(array: T[], rand: () => number): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  /**
   * Generates a dynamic, completely unique bilingual worksheet for the given student
   * Tailored for MTB-MLE tribal pedagogy and 100% offline edge execution.
   */
  public generateWorksheet(
    lang: TribalLanguage = 'santhali',
    options: WorksheetGenerationOptions = {}
  ): AgentGeneratedWorksheet {
    const studentName = options.studentName?.trim() || 'बिरसा मुंडा (Birsa Munda)';
    const schoolName = options.schoolName?.trim() || 'राजकीय प्राथमिक विद्यालय, दुमका (Jharkhand)';
    const level = options.competencyLevel || 'class1';
    const focus = options.focusType || 'combo';
    const subject = options.subject || 'भाषा एवं परिवेशीय साक्षरता (FLN MTB-MLE)';
    const now = Date.now();

    // Unique Seed for non-repetition
    const seed = options.seed !== undefined ? String(options.seed) : `${now}-${studentName}-${Math.random()}`;
    const rand = this.createRandom(seed);

    // 1. DYNAMIC MATCH SECTION (Randomized Realia Pairs)
    const shuffledRealia = this.shuffle(TRIBAL_REALIA_BANK, rand);
    const matchCount = level === 'balvatika' ? 4 : (level === 'class1' ? 4 : 5);
    const selectedMatchRealia = shuffledRealia.slice(0, matchCount);

    const match_section: CustomWorksheetMatchItem[] = selectedMatchRealia.map((item, idx) => {
      const tribalData = lang === 'santhali' ? item.santhali :
                         lang === 'mundari' ? item.mundari : item.ho;

      const tribalScript = lang === 'santhali' ? (tribalData as any).ol : tribalData.dev;

      return {
        id: idx + 1,
        prompt: `चित्र देखकर सही ${lang.toUpperCase()} शब्द से रेखा खींचकर मिलाएँ`,
        hindi_text: item.hindi,
        tribal_text: `${tribalData.dev} (${tribalData.rom})`,
        tribal_script: tribalScript,
        english_text: item.english,
        emoji: item.emoji
      };
    });

    // 2. DYNAMIC COUNT SECTION (Randomized Objects and Counts 1-10)
    const countItemsPool = this.shuffle(TRIBAL_REALIA_BANK, rand);
    const countQty = level === 'balvatika' ? 4 : 4;
    const maxNumber = level === 'balvatika' ? 5 : 10;
    
    // Generate distinct count numbers (e.g. [2, 4, 1, 5])
    const usedCounts = new Set<number>();
    const count_section: CustomWorksheetCountItem[] = [];

    for (let i = 0; i < countQty; i++) {
      let c = Math.floor(rand() * maxNumber) + 1;
      while (usedCounts.has(c)) {
        c = (c % maxNumber) + 1;
      }
      usedCounts.add(c);

      const realia = countItemsPool[i % countItemsPool.length];
      const tribalName = lang === 'santhali' ? realia.santhali.dev :
                         lang === 'mundari' ? realia.mundari.dev : realia.ho.dev;

      const santhaliNumbers = ['ᱢᱤᱫ', 'ᱵᱟᱨ', 'ᱯᱮ', 'ᱯᱳᱱ', 'ᱢᱚᱬᱮ', 'ᱛᱩᱨᱩᱭ', 'ᱮᱭᱟᱭ', 'ᱤᱨᱟᱹᱞ', 'ᱟᱨᱮ', 'ᱜᱮᱞ'];
      const hindiNumbers = ['एक', 'दो', 'तीन', 'चार', 'पाँच', 'छह', 'सात', 'आठ', 'नौ', 'दस'];
      const engNumbers = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];

      const numTribal = lang === 'santhali' ? santhaliNumbers[c - 1] : hindiNumbers[c - 1];
      const numHindi = hindiNumbers[c - 1];
      const numEng = engNumbers[c - 1];

      count_section.push({
        id: i + 1,
        count: c,
        emoji: realia.emoji,
        name_hindi: `${numHindi} ${realia.hindi} (${c})`,
        name_tribal: `${numTribal} ${tribalName}`,
        name_english: `${numEng} ${realia.english}`
      });
    }

    // 3. DYNAMIC TRACE SECTION (Randomized Stroke Characters & Words)
    const shuffledTraceBank = this.shuffle(TRACING_CHAR_BANK, rand);
    const trace_section: CustomWorksheetTraceItem[] = shuffledTraceBank.slice(0, 4).map((item, idx) => ({
      id: idx + 1,
      char_native: lang === 'santhali' ? item.ol : item.dev,
      char_devanagari: item.dev,
      word_native: lang === 'santhali' ? `${item.wordOl} (${item.wordDev})` : item.wordDev,
      word_hindi: item.wordDev,
      sound_phonetic: item.rom
    }));

    // 4. DYNAMIC FILL SECTION (Randomized Sentence Fill-in-the-Blanks)
    const shuffledFills = this.shuffle(FILL_SENTENCES_BANK, rand);
    const fill_section: CustomWorksheetFillItem[] = shuffledFills.slice(0, 3).map((item, idx) => ({
      id: idx + 1,
      sentence_incomplete: item.sentence_incomplete,
      missing_word: item.missing_word,
      tribal_sentence: item.tribal_sentence,
      hint: item.hint
    }));

    // 5. DYNAMIC STORY SEQUENCE (Culturally Grounded 3-Step Illustrated Sequence)
    const selectedStory = STORY_SEQUENCES[Math.floor(rand() * STORY_SEQUENCES.length)];
    const story_sequence_section: StorySequenceStep[] = selectedStory.steps;

    // 6. PHONICS CORNER (Oral Reading & Pronunciation Guide)
    const phonicsWords = selectedMatchRealia.slice(0, 3).map(r => {
      const t = lang === 'santhali' ? r.santhali : (lang === 'mundari' ? r.mundari : r.ho);
      return {
        word: t.dev,
        script: lang === 'santhali' ? (t as any).ol : t.dev,
        phonetic: t.rom,
        meaning: r.hindi
      };
    });

    const worksheetCode = `WS-${lang.substring(0, 3).toUpperCase()}-${level.toUpperCase()}-${Math.floor(rand() * 9000 + 1000)}`;

    return {
      worksheet_id: worksheetCode,
      variation_seed: seed.substring(0, 12),
      student_name: studentName,
      school_name: schoolName,
      competency_level: level,
      focus_type: focus,
      title: `NIPUN भारत बालवाटिका एवं प्राथमिक अभ्यास पत्रक: ${level.toUpperCase()}`,
      grade: level === 'balvatika' ? 'Balvatika (बालवाटिका)' : (level === 'class1' ? 'Class 1' : (level === 'class2' ? 'Class 2' : 'Class 3')),
      subject,
      language: lang,
      generated_timestamp: now,
      instructions_hindi: 'निर्देश: चित्रों को देखें, सही मातृभाषा शब्दों से मिलाएँ, परिवेशीय वस्तुएँ गिनें और सुंदर अक्षरों में अभ्यास पूरा करें।',
      instructions_tribal: lang === 'santhali' 
        ? 'ᱫᱤᱥᱟᱹ: ᱪᱤᱛᱟᱹᱨ ᱧᱮᱞ ᱢᱮ, ᱡᱟᱱᱟᱢ ᱟᱲᱟᱝ ᱟᱹᱲᱟᱹ ᱥᱟᱶ ᱡᱚᱲᱟᱣ ᱢᱮ ᱟᱨ ᱚᱞ ᱪᱮᱫᱚᱜ ᱢᱮ᱾'
        : 'दिसुम: चितार नेल मे, जानाम जगरा ते जोड़ाव मे आर ओल चेदोः मे।',
      instructions_english: 'Instructions: Look at pictures, match with authentic tribal words, count local realia objects, and complete the tracing.',
      match_section,
      count_section,
      trace_section,
      fill_section,
      story_sequence_section,
      phonics_oral_corner: {
        prompt_hindi: 'मौखिक उच्चारण कोना: शिक्षक के साथ स्पष्ट आवाज़ में दोहराएँ 🗣️',
        prompt_tribal: 'ᱨᱟᱦᱟ ᱛᱮ ᱨᱚᱲ ᱢᱮ:',
        practice_words: phonicsWords
      },
      pedagogical_notes: {
        fln_competencies: [
          'मातृभाषा शब्दावली ज्ञान (L1 Vocabulary Identification)',
          'मूर्त परिवेशीय गणना बोध (Concrete Counting with Realia 1-10)',
          'ध्वनि-प्रतीक सुलेखन एवं लिपि अभ्यास (Phoneme-Grapheme Tracing)',
          'परिवेशीय कथा क्रम बोध (Story Sequence Comprehension)'
        ],
        teacher_tips: 'कक्षा में सखुआ (साल) के पत्तों और मांदर का प्रत्यक्ष स्पर्श कराकर अभ्यास पत्रक हल कराएँ।',
        remedial_guide: 'कठिनाई होने पर कंकड़ों से गिनकर 1-to-1 मिलान गतिविधि कराएँ।'
      }
    };
  }
}

export const offlineWorksheetAgent = new OfflineWorksheetAgent();
