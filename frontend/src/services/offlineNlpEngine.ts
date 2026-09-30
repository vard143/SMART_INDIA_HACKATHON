import { TribalLanguage, TranslationResult, VocabularyItem } from '../types';

// =========================================================================
// DEVANAGARI TO OL CHIKI SCRIPT CONVERTER (AUTHENTIC UNICODE U+1C50 - U+1C7F)
// =========================================================================
const DEV_TO_OL_CHIKI_MAP: Record<string, string> = {
  'अ': 'ᱚ', 'आ': 'ᱟ', 'इ': 'ᱤ', 'ई': 'ᱤ', 'उ': 'ᱩ', 'ऊ': 'ᱩ', 'ए': 'ᱮ', 'ऐ': 'ᱮ', 'ओ': 'ᱳ', 'औ': 'ᱳ',
  'क': 'ᱠ', 'ख': 'ᱠᱷ', 'ग': 'ᱜ', 'घ': 'ᱜᱷ', 'ङ': 'ᱝ',
  'च': 'ᱪ', 'छ': 'ᱪᱷ', 'ज': 'ᱡ', 'झ': 'ᱡᱷ', 'ञ': 'ᱧ',
  'ट': 'ᱴ', 'ठ': 'ᱴᱷ', 'ड': 'ᱰ', 'ढ': 'ᱰᱷ', 'ण': 'ᱬ',
  'त': 'ᱛ', 'थ': 'ᱛᱷ', 'द': 'ᱫ', 'ध': 'ᱫᱷ', 'न': 'ᱱ',
  'प': 'ᱯ', 'फ': 'ᱯᱷ', 'ब': 'ᱵ', 'भ': 'ᱵᱷ', 'म': 'ᱢ',
  'य': 'ᱭ', 'र': 'ᱨ', 'ल': 'ᱞ', 'व': 'ᱣ', 'श': 'ᱥ', 'ष': 'ᱥ', 'स': 'ᱥ', 'ह': 'ᱦ',
  'ा': 'ᱟ', 'ि': 'ᱤ', 'ी': 'ᱤ', 'ु': 'ᱩ', 'ू': 'ᱩ', 'े': 'ᱮ', 'ै': 'ᱮ', 'ो': 'ᱳ', 'ौ': 'ᱳ',
  'ं': 'ᱝ', 'ँ': 'ᱸ', '्': 'ᱽ', '़': 'ᱹ', 'ः': 'ᱜ',
  '०': '᱐', '१': '᱑', '२': '᱒', '३': '᱓', '४': '᱔', '५': '᱕', '६': '᱖', '७': '᱗', '८': '᱘', '९': '᱙',
  ' ': ' ', '.': '᱾', '।': '᱾', '?': '?', '!': '!'
};

export function devanagariToOlChiki(text: string): string {
  if (!text) return '';
  let result = '';
  let i = 0;
  while (i < text.length) {
    if (i + 1 < text.length && DEV_TO_OL_CHIKI_MAP[text.substring(i, i + 2)]) {
      result += DEV_TO_OL_CHIKI_MAP[text.substring(i, i + 2)];
      i += 2;
    } else if (DEV_TO_OL_CHIKI_MAP[text[i]]) {
      result += DEV_TO_OL_CHIKI_MAP[text[i]];
      i += 1;
    } else {
      result += text[i];
      i += 1;
    }
  }
  return result;
}

export interface DictEntry {
  santhali: { dev: string; ol: string; rom: string };
  mundari: { dev: string; rom: string };
  ho: { dev: string; rom: string };
  category: string;
  phonemes: string;
  synonyms?: string[];
}

export const COMPREHENSIVE_DICTIONARY: Record<string, DictEntry> = {
  // --- GREETINGS & SOCIAL DIALOGUE ---
  "नमस्ते": {
    santhali: { dev: "जोहार", ol: "ᱡᱚᱦᱟᱨ", rom: "Johar" },
    mundari: { dev: "जोहार", rom: "Johar" },
    ho: { dev: "जोहार", rom: "Johar" },
    category: "greeting",
    phonemes: "johar",
    synonyms: ["प्रणाम", "नमस्कार", "जोहार", "हेलो", "हाय"]
  },
  "सुप्रभात": {
    santhali: { dev: "सगुन सेताः", ol: "ᱥᱟᱹᱜᱩᱱ ᱥᱮᱛᱟᱜ", rom: "Sagun Setah" },
    mundari: { dev: "बोगि सेताः", rom: "Bogi Setah" },
    ho: { dev: "बोगि सेताः", rom: "Bogi Setah" },
    category: "greeting",
    phonemes: "sagun setah",
    synonyms: ["शुभ प्रभात", "गुड मॉर्निंग", "सवेरा"]
  },
  "शुभ संध्या": {
    santhali: { dev: "सगुन आयूब", ol: "ᱥᱟᱹᱜᱩᱱ ᱟᱹᱭᱩᱵ", rom: "Sagun Ayub" },
    mundari: { dev: "बोगि आयूब", rom: "Bogi Ayub" },
    ho: { dev: "बोगि आयूब", rom: "Bogi Ayub" },
    category: "greeting",
    phonemes: "sagun ayub",
    synonyms: ["गुड इवनिंग", "शाम"]
  },
  "शुभ रात्रि": {
    santhali: { dev: "सगुन ञिन्दा", ol: "ᱥᱟᱹᱜᱩᱱ ᱧᱤᱫᱟᱹ", rom: "Sagun Nyinda" },
    mundari: { dev: "बोगि निदा", rom: "Bogi Nida" },
    ho: { dev: "बोगि निदा", rom: "Bogi Nida" },
    category: "greeting",
    phonemes: "sagun nyinda",
    synonyms: ["गुड नाईट"]
  },
  "धन्यवाद": {
    santhali: { dev: "सराहना", ol: "ᱥᱟᱨᱦᱟᱣ", rom: "Sarhaw" },
    mundari: { dev: "सराहना", rom: "Sarahna" },
    ho: { dev: "सराहना", rom: "Sarahna" },
    category: "greeting",
    phonemes: "sarhaw",
    synonyms: ["शुक्रिया", "थैंक यू", "आभार"]
  },
  "आप कैसे हैं?": {
    santhali: { dev: "चेदलेका मेनामा?", ol: "ᱪᱮᱫᱞᱮᱠᱟ ᱢᱮᱱᱟᱢᱟ?", rom: "Chedleka menama?" },
    mundari: { dev: "चिलेका मेनामा?", rom: "Chileka menama?" },
    ho: { dev: "चिलेका मेनामा?", rom: "Chileka menama?" },
    category: "question",
    phonemes: "chedleka menama",
    synonyms: ["आप कैसे हैं", "तुम कैसे हो", "कैसे हो", "कैसी हो", "kaise ho", "kese ho", "kya haal hai"]
  },
  "क्या कर रहे हो": {
    santhali: { dev: "चेद एम चेकायेद-आ?", ol: "ᱪᱮᱫ ᱮᱢ ᱪᱮᱠᱟᱭᱮᱫ-ᱟ?", rom: "Ched em chekayeda?" },
    mundari: { dev: "चिना चिकाताना?", rom: "China chikatana?" },
    ho: { dev: "चिना चिकाताना?", rom: "China chikatana?" },
    category: "question",
    phonemes: "ched em chekayeda",
    synonyms: ["क्या करता है", "क्या करते हो", "क्या कर रहा है", "क्या कर रही हो", "क्या करते", "kya karta hai", "kya karte", "kya kar rahe ho", "kya kar raha hai", "what are you doing"]
  },
  "कहाँ जा रहे हो": {
    santhali: { dev: "ओका तेम सेनोः काना?", ol: "ᱚᱠᱟ ᱛᱮᱢ ᱥᱮᱱᱚᱜ ᱠᱟᱱᱟ?", rom: "Oka tem senoh kana?" },
    mundari: { dev: "ओकोते सेनोःताना?", rom: "Okote senohtana?" },
    ho: { dev: "ओकोते सेनोःताना?", rom: "Okote senohtana?" },
    category: "question",
    phonemes: "oka tem senoh kana",
    synonyms: ["कहाँ जा रहे", "कहाँ जाते हो", "kaha ja rahe ho", "kahan ja rahe ho", "where are you going"]
  },
  "क्या बात है": {
    santhali: { dev: "चेद काथा काना?", ol: "ᱪᱮᱫ ᱠᱟᱛᱷᱟ ᱠᱟᱱᱟ?", rom: "Ched katha kana?" },
    mundari: { dev: "चिना काजी?", rom: "China kaji?" },
    ho: { dev: "चिना काजी?", rom: "China kaji?" },
    category: "question",
    phonemes: "ched katha kana",
    synonyms: ["क्या हुआ", "kya baat hai", "kya hua", "what happened", "what is the matter"]
  },
  "पानी पियो": {
    santhali: { dev: "दाः ञुय मे", ol: "ᱫᱟᱜ ᱧᱩᱭ ᱢᱮ", rom: "Dah nyuy me" },
    mundari: { dev: "दाः नुई मे", rom: "Dah nui me" },
    ho: { dev: "दाः नुई मे", rom: "Dah nui me" },
    category: "command",
    phonemes: "dah nyuy me",
    synonyms: ["पानी पी लो", "जल पियो", "pani piyo", "drink water"]
  },
  "खाना खाओ": {
    santhali: { dev: "दाका जोम मे", ol: "ᱫᱟᱠᱟ ᱡᱚᱢ ᱢᱮ", rom: "Daka jom me" },
    mundari: { dev: "मांडी जोम मे", rom: "Mandi jom me" },
    ho: { dev: "मांडी जोम मे", rom: "Mandi jom me" },
    category: "command",
    phonemes: "daka jom me",
    synonyms: ["खाना खा लो", "भोजन करो", "khana khao", "eat food"]
  },
  "मैं ठीक हूँ": {
    santhali: { dev: "इञ दो नापाय गे मेनाञा", ol: "ᱤᱧ ᱫᱚ ᱱᱟᱯᱟᱭ ᱜᱮ ᱢᱮᱱᱟᱹᱧᱟ", rom: "Iny do napay ge menanya" },
    mundari: { dev: "अइञ बोगि गे मेनाञा", rom: "Ainy bogi ge menanya" },
    ho: { dev: "अयिञ बुगिन गे मेनाञा", rom: "Ayiny bugin ge menanya" },
    category: "response",
    phonemes: "iny do napay ge menanya",
    synonyms: ["सब ठीक है", "मैं बढ़िया हूँ"]
  },
  "आपका नाम क्या है?": {
    santhali: { dev: "आमाः ञुतूम चेद?", ol: "ᱟᱢᱟᱜ ᱧᱩᱛᱩᱢ ᱪᱮᱫ?", rom: "Aamah nyutum ched?" },
    mundari: { dev: "अमअः नुतूम चिना?", rom: "Amah nutum china?" },
    ho: { dev: "अमअः नुतूम चिना?", rom: "Amah nutum china?" },
    category: "question",
    phonemes: "aamah nyutum ched",
    synonyms: ["आपका नाम क्या है", "तुम्हारा नाम क्या है?", "तुम्हारा नाम क्या है", "नाम क्या है"]
  },
  "मेरा नाम": {
    santhali: { dev: "इञाः ञुतूम", ol: "ᱤᱧᱟᱜ ᱧᱩᱛᱩᱢ", rom: "Inyah nyutum" },
    mundari: { dev: "अइञअः नुतूम", rom: "Ainyah nutum" },
    ho: { dev: "अयिञअः नुतूम", rom: "Ayinyah nutum" },
    category: "identity",
    phonemes: "inyah nyutum"
  },

  // --- CLASSROOM COMMANDS & INSTRUCTIONS ---
  "बैठ जाओ": {
    santhali: { dev: "दुड़ुब मे", ol: "ᱫᱩᱲᱩᱵ ᱢᱮ", rom: "Durub me" },
    mundari: { dev: "दुबुं मे", rom: "Dubung me" },
    ho: { dev: "दुब मे", rom: "Dub me" },
    category: "command",
    phonemes: "durub me",
    synonyms: ["बैठो", "बैठ जाइए", "बैठिए", "बैठ"]
  },
  "सब बच्चे बैठ जाओ": {
    santhali: { dev: "जोतो गिदरा दुड़ुब पे", ol: "ᱡᱚᱛᱚ ᱜᱤᱫᱽᱨᱟᱹ ᱫᱩᱲᱩᱵ ᱯᱮ", rom: "Joto gidra durub pe" },
    mundari: { dev: "सोबेन होन को दुबुं पे", rom: "Soben hon ko dubung pe" },
    ho: { dev: "सोबेन होन को दुब पे", rom: "Soben hon ko dub pe" },
    category: "command",
    phonemes: "joto gidra durub pe",
    synonyms: ["सब बच्चे बैठो", "सभी बैठ जाओ", "बच्चे बैठ जाओ"]
  },
  "खड़े हो जाओ": {
    santhali: { dev: "तिंगु गोद् मे", ol: "ᱛᱤᱝᱜᱩ ᱜᱚᱫ ᱢᱮ", rom: "Tingu god me" },
    mundari: { dev: "तिंगुन् मे", rom: "Tingun me" },
    ho: { dev: "तिंगुन् मे", rom: "Tingun me" },
    category: "command",
    phonemes: "tingu god me",
    synonyms: ["खड़े हो", "खड़े होइए", "उठो", "खड़े हो जाना"]
  },
  "सब खड़े हो जाओ": {
    santhali: { dev: "जोतो तिंगु पे", ol: "ᱡᱚᱛᱚ ᱛᱤᱝᱜᱩ ᱯᱮ", rom: "Joto tingu pe" },
    mundari: { dev: "सोबेन तिंगुन् पे", rom: "Soben tingun pe" },
    ho: { dev: "सोबेन तिंगुन् पे", rom: "Soben tingun pe" },
    category: "command",
    phonemes: "joto tingu pe",
    synonyms: ["सभी खड़े हो जाओ", "सब बच्चे खड़े हो जाओ"]
  },
  "किताब खोलो": {
    santhali: { dev: "पोतोब झिज मे", ol: "ᱯᱚᱛᱚᱵ ᱡᱷᱤᱡᱽ ᱢᱮ", rom: "Potob jhij me" },
    mundari: { dev: "पुथी उग्लाइ मे", rom: "Puthi uglai me" },
    ho: { dev: "पुथी खोलाय मे", rom: "Puthi kholay me" },
    category: "command",
    phonemes: "potob jhij me",
    synonyms: ["किताबें खोलो", "पुस्तक खोलो", "अपनी किताब खोलो", "किताब खोलिए", "किताब खोलना"]
  },
  "बच्चों अपनी किताबें खोलो": {
    santhali: { dev: "गिदरा को, आपनार पोतोब झिज पे", ol: "ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱟᱯᱱᱟᱨᱟᱜ ᱯᱚᱛᱚᱵ ᱠᱚ ᱡᱷᱤᱡᱽ ᱯᱮ", rom: "Gidra ko, apnarag potob jhij pe" },
    mundari: { dev: "होन को, अपना पुथी उग्लाइ पे", rom: "Hon ko, apna puthi uglai pe" },
    ho: { dev: "होन को, अपना पुथी खोलाय पे", rom: "Hon ko, apna puthi kholay pe" },
    category: "command",
    phonemes: "gidra ko apnarag potob jhij pe",
    synonyms: ["बच्चे अपनी किताब खोलो", "सब अपनी किताबें खोलो"]
  },
  "किताब बंद करो": {
    santhali: { dev: "पोतोब पोटम मे", ol: "ᱯᱚᱛᱚᱵ ᱯᱚᱴᱚᱢ ᱢᱮ", rom: "Potob potom me" },
    mundari: { dev: "पुथी बोंद मे", rom: "Puthi bond me" },
    ho: { dev: "पुथी पोतोम मे", rom: "Puthi potom me" },
    category: "command",
    phonemes: "potob potom me",
    synonyms: ["किताबें बंद करो", "अपनी किताब बंद करो", "किताब बंद कीजिए"]
  },
  "कॉपी निकालो": {
    santhali: { dev: "खाता ओडोक मे", ol: "ᱠᱷᱟᱛᱟ ᱚᱰᱚᱠ ᱢᱮ", rom: "Khata odok me" },
    mundari: { dev: "खाता ओलंग मे", rom: "Khata olang me" },
    ho: { dev: "खाता ओलंग मे", rom: "Khata olang me" },
    category: "command",
    phonemes: "khata odok me",
    synonyms: ["अपनी कॉपी निकालो", "पुस्तिका निकालो"]
  },
  "चुप रहो": {
    santhali: { dev: "थिर कोः पे", ol: "ᱛᱷᱤᱨ ᱠᱚᱜ ᱯᱮ", rom: "Thir koh pe" },
    mundari: { dev: "थिर तइकेन् मे", rom: "Thir taiken me" },
    ho: { dev: "थिर तईन मे", rom: "Thir tain me" },
    category: "command",
    phonemes: "thir koh pe",
    synonyms: ["शांति बनाए रखो", "आवाज मत करो", "शांत रहो", "हल्ला मत करो"]
  },
  "ध्यान से सुनो": {
    santhali: { dev: "मोन लागाव काते आन्जोम मे", ol: "ᱢᱚᱱ ᱞᱟᱜᱟᱣ ᱠᱟᱛᱮ ᱟᱧᱡᱚᱢ ᱢᱮ", rom: "Mon lagaw kate anjom me" },
    mundari: { dev: "अयुम मे मोन लगाते", rom: "Ayum me mon lagate" },
    ho: { dev: "आयुम मे बुगिन लेका", rom: "Ayum me bugin leka" },
    category: "command",
    phonemes: "mon lagaw kate anjom me",
    synonyms: ["मेरी बात सुनो", "सुनो", "सुनिए", "ध्यान दो"]
  },
  "हाथ उठाओ": {
    santhali: { dev: "ती तुले मे", ol: "ᱛᱤ ᱛᱩᱞᱮ ᱢᱮ", rom: "Ti tule me" },
    mundari: { dev: "ती राकब मे", rom: "Ti rakab me" },
    ho: { dev: "ती राकब मे", rom: "Ti rakab me" },
    category: "command",
    phonemes: "ti tule me",
    synonyms: ["हाथ ऊपर करो", "अपना हाथ उठाओ", "हाथ उठाइए"]
  },
  "ताली बजाओ": {
    santhali: { dev: "ताड़ी चापाड़ मे", ol: "ᱛᱟᱲᱤ ᱪᱟᱯᱟᱲ ᱢᱮ", rom: "Tari chapar me" },
    mundari: { dev: "थाली तायु मे", rom: "Thali tayu me" },
    ho: { dev: "तायु मे", rom: "Tayu me" },
    category: "command",
    phonemes: "tari chapar me",
    synonyms: ["तालियां बजाओ", "ताली मारो"]
  },
  "गाना गाओ": {
    santhali: { dev: "सेरेञ मे", ol: "ᱥᱮᱨᱮᱧ ᱢᱮ", rom: "Seren me" },
    mundari: { dev: "दुरंग मे", rom: "Durang me" },
    ho: { dev: "दुरंग मे", rom: "Durang me" },
    category: "command",
    phonemes: "seren me",
    synonyms: ["गाओ", "गीत गाओ"]
  },
  "नाचो": {
    santhali: { dev: "एनेज मे", ol: "ᱮᱱᱮᱡ ᱢᱮ", rom: "Enej me" },
    mundari: { dev: "सुसुन मे", rom: "Susun me" },
    ho: { dev: "सुसुन मे", rom: "Susun me" },
    category: "command",
    phonemes: "enej me",
    synonyms: ["नाच करो", "नृत्य करो"]
  },
  "लिखो": {
    santhali: { dev: "ओल मे", ol: "ᱚᱞ ᱢᱮ", rom: "Ol me" },
    mundari: { dev: "ओल मे", rom: "Ol me" },
    ho: { dev: "ओल मे", rom: "Ol me" },
    category: "command",
    phonemes: "ol me",
    synonyms: ["लिखिए", "लिखना", "कॉपी में लिखो", "लिखना शुरू करो"]
  },
  "पढ़ो": {
    santhali: { dev: "पाड़हाव मे", ol: "ᱯᱟᱲᱦᱟᱣ ᱢᱮ", rom: "Parhaw me" },
    mundari: { dev: "पड़ाव मे", rom: "Paraw me" },
    ho: { dev: "पड़ाव मे", rom: "Paraw me" },
    category: "command",
    phonemes: "parhaw me",
    synonyms: ["पढ़िए", "पढ़ना", "जोर से पढ़ो", "पाठ पढ़ो"]
  },
  "यहाँ आओ": {
    santhali: { dev: "नोंडे हिजुः मे", ol: "ᱱᱚᱰᱮ ᱦᱤᱡᱩᱜ ᱢᱮ", rom: "Nonde hijuh me" },
    mundari: { dev: "नेन्ता हिजुः मे", rom: "Nenta hijuh me" },
    ho: { dev: "नेन्ता हिजुः मे", rom: "Nenta hijuh me" },
    category: "command",
    phonemes: "nonde hijuh me",
    synonyms: ["इधर आओ", "आगे आओ", "पास आओ"]
  },
  "वहाँ जाओ": {
    santhali: { dev: "हॉन्डे सेन मे", ol: "ᱦᱟᱱᱰᱮ ᱥᱮᱱ ᱢᱮ", rom: "Hande sen me" },
    mundari: { dev: "एन्ता सेनोः मे", rom: "Enta senoh me" },
    ho: { dev: "एन्ता सेनोः मे", rom: "Enta senoh me" },
    category: "command",
    phonemes: "hande sen me",
    synonyms: ["उधर जाओ", "अपनी जगह जाओ", "बैठने जाओ"]
  },
  "हाथ धो लो": {
    santhali: { dev: "ती अबुग मे", ol: "ᱛᱤ ᱟᱹᱵᱩᱜ ᱢᱮ", rom: "Ti abug me" },
    mundari: { dev: "ती अबा मे", rom: "Ti aba me" },
    ho: { dev: "ती अबा मे", rom: "Ti aba me" },
    category: "command",
    phonemes: "ti abug me",
    synonyms: ["हाथ धोओ", "हाथ साफ करो"]
  },
  "चित्र बनाओ": {
    santhali: { dev: "चितार बेनाव मे", ol: "ᱪᱤᱛᱟᱹᱨ ᱵᱮᱱᱟᱣ ᱢᱮ", rom: "Chitar benaw me" },
    mundari: { dev: "चोबी बई मे", rom: "Chobi bai me" },
    ho: { dev: "चोबी बाई मे", rom: "Chobi bai me" },
    category: "command",
    phonemes: "chitar benaw me",
    synonyms: ["ड्राइंग बनाओ", "चित्र बनाइए"]
  },
  "गिनती करो": {
    santhali: { dev: "लेखा मे", ol: "ᱞᱮᱠᱷᱟᱭ ᱢᱮ", rom: "Lekha me" },
    mundari: { dev: "लेका मे", rom: "Leka me" },
    ho: { dev: "लेका मे", rom: "Leka me" },
    category: "command",
    phonemes: "lekha me",
    synonyms: ["गिनो", "संख्या गिनो"]
  },

  // --- PRAISE & FEEDBACK ---
  "शाबाश": {
    santhali: { dev: "आडी मोज", ol: "ᱟᱹᱰᱤ ᱢᱚᱡᱽ", rom: "Adi moj" },
    mundari: { dev: "बेश / बोगि", rom: "Besh / Bogi" },
    ho: { dev: "बेश / बुगिन", rom: "Besh / Bugin" },
    category: "praise",
    phonemes: "adi moj",
    synonyms: ["वेरी गुड", "उत्कृष्ट", "शाबाशी"]
  },
  "बहुत अच्छा": {
    santhali: { dev: "आडी नापाय", ol: "ᱟᱹᱰᱤ ᱱᱟᱯᱟᱭ", rom: "Adi napay" },
    mundari: { dev: "पुरो बोगि", rom: "Puro bogi" },
    ho: { dev: "पुरो बुगिन", rom: "Puro bugin" },
    category: "praise",
    phonemes: "adi napay",
    synonyms: ["बहुत बढ़िया", "सुंदर", "अति उत्तम", "बहुत खूब"]
  },
  "सही है": {
    santhali: { dev: "सॉरी गेया", ol: "ᱥᱟᱹᱨᱤ ᱜᱮᱭᱟ", rom: "Sari geya" },
    mundari: { dev: "सॉरी गे", rom: "Sari ge" },
    ho: { dev: "सॉरी गे", rom: "Sari ge" },
    category: "praise",
    phonemes: "sari geya",
    synonyms: ["बिल्कुल सही", "ठीक है"]
  },

  // --- QUESTIONS & RESPONSES ---
  "क्या आप समझ गए?": {
    santhali: { dev: "चेद आम बुझौ केदा?", ol: "ᱪᱮᱫ ᱟᱢ ᱵᱩᱡᱷᱟᱹᱣ ᱠᱮᱫᱟ?", rom: "Ched aam bujhow keda?" },
    mundari: { dev: "चिना आम बुझौ केदा?", rom: "China aam bujhow keda?" },
    ho: { dev: "चिना अम बुझौ केदा?", rom: "China am bujhow keda?" },
    category: "question",
    phonemes: "ched aam bujhow keda",
    synonyms: ["क्या समझे?", "समझ में आया?", "समझ गए?", "क्या आप समझ गए"]
  },
  "यह क्या है?": {
    santhali: { dev: "नोवा दो चेद काना?", ol: "ᱱᱚᱣᱟ ᱫᱚ ᱪᱮᱫ ᱠᱟᱱᱟ?", rom: "Nowa do ched kana?" },
    mundari: { dev: "नेया दो चिना ताना?", rom: "Neya do china tana?" },
    ho: { dev: "नेया दो चिना तना?", rom: "Neya do china tana?" },
    category: "question",
    phonemes: "nowa do ched kana",
    synonyms: ["यह क्या है", "ये क्या है?", "ये क्या है"]
  },
  "वह क्या है?": {
    santhali: { dev: "ओना दो चेद काना?", ol: "ᱚᱱᱟ ᱫᱚ ᱪᱮᱫ ᱠᱟᱱᱟ?", rom: "Ona do ched kana?" },
    mundari: { dev: "एना दो चिना ताना?", rom: "Ena do china tana?" },
    ho: { dev: "एना दो चिना तना?", rom: "Ena do china tana?" },
    category: "question",
    phonemes: "ona do ched kana",
    synonyms: ["वह क्या है", "वो क्या है?", "वो क्या है"]
  },
  "हाँ": {
    santhali: { dev: "हेँ", ol: "ᱦᱮᱸ", rom: "Heh" },
    mundari: { dev: "हेँ", rom: "Heh" },
    ho: { dev: "हेँ", rom: "Heh" },
    category: "response",
    phonemes: "heh",
    synonyms: ["हाँ जी", "जी हाँ", "यस"]
  },
  "नहीं": {
    santhali: { dev: "बाङ", ol: "ᱵᱟᱝ", rom: "Bang" },
    mundari: { dev: "का", rom: "Ka" },
    ho: { dev: "का", rom: "Ka" },
    category: "response",
    phonemes: "bang",
    synonyms: ["नहीं जी", "ना", "नो"]
  },

  // --- PRONOUNS & PARTICLES ---
  "मैं": {
    santhali: { dev: "इञ", ol: "ᱤᱧ", rom: "Iny" },
    mundari: { dev: "अइञ", rom: "Ainy" },
    ho: { dev: "अयिञ", rom: "Ayiny" },
    category: "pronoun",
    phonemes: "iny",
    synonyms: ["मुझे"]
  },
  "मेरा": {
    santhali: { dev: "इञाः", ol: "ᱤᱧᱟᱜ", rom: "Inyah" },
    mundari: { dev: "अइञअः", rom: "Ainyah" },
    ho: { dev: "अयिञअः", rom: "Ayinyah" },
    category: "pronoun",
    phonemes: "inyah",
    synonyms: ["मेरी", "मेरे"]
  },
  "हम": {
    santhali: { dev: "आबो", ol: "ᱟᱵᱚ", rom: "Abo" },
    mundari: { dev: "आबु", rom: "Abu" },
    ho: { dev: "आबु", rom: "Abu" },
    category: "pronoun",
    phonemes: "abo",
    synonyms: ["हम सब", "हमलोग"]
  },
  "हमारा": {
    santhali: { dev: "आबोवाः", ol: "ᱟᱵᱚᱣᱟᱜ", rom: "Abowah" },
    mundari: { dev: "आबुआः", rom: "Abuah" },
    ho: { dev: "आबुआः", rom: "Abuah" },
    category: "pronoun",
    phonemes: "abowah",
    synonyms: ["हमारी", "हमारे"]
  },
  "तुम": {
    santhali: { dev: "आम", ol: "ᱟᱢ", rom: "Aam" },
    mundari: { dev: "अम", rom: "Am" },
    ho: { dev: "अम", rom: "Am" },
    category: "pronoun",
    phonemes: "aam",
    synonyms: ["आप", "तू"]
  },
  "तुम्हारा": {
    santhali: { dev: "आमाः", ol: "ᱟᱢᱟᱜ", rom: "Aamah" },
    mundari: { dev: "अमअः", rom: "Amah" },
    ho: { dev: "अमअः", rom: "Amah" },
    category: "pronoun",
    phonemes: "aamah",
    synonyms: ["तुम्हारी", "तुम्हारे", "आपका", "आपकी"]
  },
  "यह": {
    santhali: { dev: "नोवा", ol: "ᱱᱚᱣᱟ", rom: "Nowa" },
    mundari: { dev: "नेया", rom: "Neya" },
    ho: { dev: "नेया", rom: "Neya" },
    category: "pronoun",
    phonemes: "nowa",
    synonyms: ["ये", "इसे", "इस"]
  },
  "वह": {
    santhali: { dev: "ओना", ol: "ᱚᱱᱟ", rom: "Ona" },
    mundari: { dev: "एना", rom: "Ena" },
    ho: { dev: "एना", rom: "Ena" },
    category: "pronoun",
    phonemes: "ona",
    synonyms: ["वो", "उसे", "उस"]
  },
  "अपना": {
    santhali: { dev: "आपनार", ol: "ᱟᱯᱱᱟᱨ", rom: "Apnar" },
    mundari: { dev: "अपना", rom: "Apna" },
    ho: { dev: "अपना", rom: "Apna" },
    category: "pronoun",
    phonemes: "apnar",
    synonyms: ["अपनी", "अपने"]
  },
  "सब": {
    santhali: { dev: "जोतो", ol: "ᱡᱚᱛᱚ", rom: "Joto" },
    mundari: { dev: "सोबेन", rom: "Soben" },
    ho: { dev: "सोबेन", rom: "Soben" },
    category: "pronoun",
    phonemes: "joto",
    synonyms: ["सभी", "सारे"]
  },
  "क्या": {
    santhali: { dev: "चेद", ol: "ᱪᱮᱫ", rom: "Ched" },
    mundari: { dev: "चिना", rom: "China" },
    ho: { dev: "चिना", rom: "China" },
    category: "question",
    phonemes: "ched"
  },
  "कहाँ": {
    santhali: { dev: "ओकारे", ol: "ᱚᱠᱟᱨᱮ", rom: "Okare" },
    mundari: { dev: "ओकोरे", rom: "Okore" },
    ho: { dev: "ओकोरे", rom: "Okore" },
    category: "question",
    phonemes: "okare",
    synonyms: ["किधर"]
  },
  "कब": {
    santhali: { dev: "तिस", ol: "ᱛᱤᱥ", rom: "Tis" },
    mundari: { dev: "चिमता", rom: "Chimta" },
    ho: { dev: "चिमता", rom: "Chimta" },
    category: "question",
    phonemes: "tis"
  },
  "क्यों": {
    santhali: { dev: "चेदाः", ol: "ᱪᱮᱫᱟᱜ", rom: "Chedah" },
    mundari: { dev: "चिना लगिद", rom: "China lagid" },
    ho: { dev: "चिना लगिद", rom: "China lagid" },
    category: "question",
    phonemes: "chedah"
  },
  "कैसे": {
    santhali: { dev: "चेदलेका", ol: "ᱪᱮᱫᱞᱮᱠᱟ", rom: "Chedleka" },
    mundari: { dev: "चिलेका", rom: "Chileka" },
    ho: { dev: "चिलेका", rom: "Chileka" },
    category: "question",
    phonemes: "chedleka"
  },
  "कौन": {
    santhali: { dev: "ओकोय", ol: "ᱚᱠᱚᱭ", rom: "Okoy" },
    mundari: { dev: "ओकोय", rom: "Okoy" },
    ho: { dev: "ओकोय", rom: "Okoy" },
    category: "question",
    phonemes: "okoy"
  },
  "है": {
    santhali: { dev: "काना", ol: "ᱠᱟᱱᱟ", rom: "Kana" },
    mundari: { dev: "ताना", rom: "Tana" },
    ho: { dev: "तना", rom: "Tana" },
    category: "verb",
    phonemes: "kana",
    synonyms: ["हैं", "हो"]
  },
  "था": {
    santhali: { dev: "ताहेकाना", ol: "ᱛᱟᱦᱮᱸᱠᱟᱱᱟ", rom: "Tahekana" },
    mundari: { dev: "ताएकेना", rom: "Taekena" },
    ho: { dev: "तयकेना", rom: "Taykena" },
    category: "verb",
    phonemes: "tahekana",
    synonyms: ["थी", "थे"]
  },
  "आज": {
    santhali: { dev: "तेहेञ", ol: "ᱛᱮᱦᱮᱧ", rom: "Teheny" },
    mundari: { dev: "तिशिंग", rom: "Tishing" },
    ho: { dev: "तिशिंग", rom: "Tishing" },
    category: "time",
    phonemes: "teheny"
  },
  "कल": {
    santhali: { dev: "गापा", ol: "ᱜᱟᱯᱟ", rom: "Gapa" },
    mundari: { dev: "गापा", rom: "Gapa" },
    ho: { dev: "गापा", rom: "Gapa" },
    category: "time",
    phonemes: "gapa"
  },

  // --- CORE NOUNS & PEOPLE ---
  "बच्चा": {
    santhali: { dev: "गिदरा", ol: "ᱜᱤᱫᱽᱨᱟᱹ", rom: "Gidra" },
    mundari: { dev: "होन", rom: "Hon" },
    ho: { dev: "होन", rom: "Hon" },
    category: "nouns",
    phonemes: "gidra",
    synonyms: ["बच्चे", "बच्चों", "बालक", "शिशु"]
  },
  "शिक्षक": {
    santhali: { dev: "माचेत", ol: "ᱢᱟᱪᱮᱛ", rom: "Machet" },
    mundari: { dev: "माहाशय", rom: "Mahashay" },
    ho: { dev: "माहाशय", rom: "Mahashay" },
    category: "nouns",
    phonemes: "machet",
    synonyms: ["सर", "गुरुजी", "अध्यापक"]
  },
  "शिक्षिका": {
    santhali: { dev: "माचेतानी", ol: "ᱢᱟᱪᱮᱛᱟᱱᱤ", rom: "Machetani" },
    mundari: { dev: "गुरुमा", rom: "Guruma" },
    ho: { dev: "गुरुमा", rom: "Guruma" },
    category: "nouns",
    phonemes: "machetani",
    synonyms: ["मैडम", "अध्यापिका"]
  },
  "स्कूल": {
    santhali: { dev: "आसड़ा", ol: "ᱟᱥᱲᱟ", rom: "Ashra" },
    mundari: { dev: "इस्कुल", rom: "Iskul" },
    ho: { dev: "इस्कुल", rom: "Iskul" },
    category: "nouns",
    phonemes: "ashra",
    synonyms: ["विद्यालय", "पाठशाला"]
  },
  "किताब": {
    santhali: { dev: "पोतोब", ol: "ᱯᱚᱛᱚᱵ", rom: "Potob" },
    mundari: { dev: "पुथी", rom: "Puthi" },
    ho: { dev: "पुथी", rom: "Puthi" },
    category: "nouns",
    phonemes: "potob",
    synonyms: ["किताबें", "पुस्तक", "किताबों"]
  },
  "कलम": {
    santhali: { dev: "कॉलम", ol: "ᱠᱚᱞᱚᱢ", rom: "Kolom" },
    mundari: { dev: "कलम", rom: "Kalam" },
    ho: { dev: "कलम", rom: "Kalam" },
    category: "nouns",
    phonemes: "kolom",
    synonyms: ["पेन", "पेंसिल"]
  },
  "कॉपी": {
    santhali: { dev: "खाता", ol: "ᱠᱷᱟᱛᱟ", rom: "Khata" },
    mundari: { dev: "खाता", rom: "Khata" },
    ho: { dev: "खाता", rom: "Khata" },
    category: "nouns",
    phonemes: "khata",
    synonyms: ["पुस्तिका", "नोटबुक"]
  },
  "दोस्त": {
    santhali: { dev: "गाती", ol: "ᱜᱟᱛᱮ", rom: "Gate" },
    mundari: { dev: "जोड़ी", rom: "Jori" },
    ho: { dev: "संगी", rom: "Sangi" },
    category: "nouns",
    phonemes: "gate",
    synonyms: ["मित्र", "साथी"]
  },
  "घर": {
    santhali: { dev: "ओड़ाः", ol: "ᱳᱲᱟᱜ", rom: "Orah" },
    mundari: { dev: "ओड़ाः", rom: "Orah" },
    ho: { dev: "ओवाः", rom: "Owah" },
    category: "family",
    phonemes: "orah",
    synonyms: ["मकान", "गृह"]
  },
  "गाँव": {
    santhali: { dev: "आतु", ol: "ᱟᱹᱛᱩ", rom: "Aatu" },
    mundari: { dev: "हातू", rom: "Hatu" },
    ho: { dev: "हातू", rom: "Hatu" },
    category: "family",
    phonemes: "aatu",
    synonyms: ["ग्राम"]
  },
  "माँ": {
    santhali: { dev: "आयो", ol: "ᱟᱭᱳ", rom: "Ayo" },
    mundari: { dev: "इंगा", rom: "Enga" },
    ho: { dev: "इंगा", rom: "Enga" },
    category: "family",
    phonemes: "ayo",
    synonyms: ["माता", "मम्मी", "अम्मा"]
  },
  "पिता": {
    santhali: { dev: "बाबा", ol: "ᱵᱟᱵᱟ", rom: "Baba" },
    mundari: { dev: "आपा", rom: "Apa" },
    ho: { dev: "आपा", rom: "Apa" },
    category: "family",
    phonemes: "baba",
    synonyms: ["बाप", "पापा", "पिताजी"]
  },
  "भाई": {
    santhali: { dev: "बोयहा", ol: "ᱵᱚᱭᱦᱟ", rom: "Boyha" },
    mundari: { dev: "हागा", rom: "Haga" },
    ho: { dev: "हागा", rom: "Haga" },
    category: "family",
    phonemes: "boyha",
    synonyms: ["भैया"]
  },
  "बहन": {
    santhali: { dev: "मिसि", ol: "ᱢᱤᱥᱤ", rom: "Misi" },
    mundari: { dev: "मिसि", rom: "Misi" },
    ho: { dev: "मिसि", rom: "Misi" },
    category: "family",
    phonemes: "misi",
    synonyms: ["दीदी"]
  },

  // --- NATURE & ENVIRONMENT ---
  "पेड़": {
    santhali: { dev: "दारे", ol: "ᱫᱟᱨᱮ", rom: "Dare" },
    mundari: { dev: "दारू", rom: "Daru" },
    ho: { dev: "दारू", rom: "Daru" },
    category: "nature",
    phonemes: "dare",
    synonyms: ["पेड़ों", "वृक्ष", "तरु"]
  },
  "पत्ता": {
    santhali: { dev: "साकाम", ol: "ᱥᱟᱠᱟᱢ", rom: "Sakam" },
    mundari: { dev: "साकाम", rom: "Sakam" },
    ho: { dev: "साकाम", rom: "Sakam" },
    category: "nature",
    phonemes: "sakam",
    synonyms: ["पत्ते", "पात"]
  },
  "फूल": {
    santhali: { dev: "बाहा", ol: "ᱵᱟᱦᱟ", rom: "Baha" },
    mundari: { dev: "बा", rom: "Ba" },
    ho: { dev: "बा", rom: "Ba" },
    category: "nature",
    phonemes: "baha",
    synonyms: ["पुष्प", "फूलों"]
  },
  "फल": {
    santhali: { dev: "जो", ol: "ᱡᱳ", rom: "Jo" },
    mundari: { dev: "जो", rom: "Jo" },
    ho: { dev: "जो", rom: "Jo" },
    category: "nature",
    phonemes: "jo",
    synonyms: ["फलों"]
  },
  "पानी": {
    santhali: { dev: "दाः", ol: "ᱫᱟᱜ", rom: "Dah" },
    mundari: { dev: "दाः", rom: "Dah" },
    ho: { dev: "दाः", rom: "Dah" },
    category: "nature",
    phonemes: "dah",
    synonyms: ["जल", "नीर"]
  },
  "सूरज": {
    santhali: { dev: "सिंगी", ol: "ᱥᱤᱸᱜᱤ", rom: "Singi" },
    mundari: { dev: "सिंगी", rom: "Singi" },
    ho: { dev: "सिंगी", rom: "Singi" },
    category: "nature",
    phonemes: "singi",
    synonyms: ["सूर्य", "रवि"]
  },
  "चाँद": {
    santhali: { dev: "चान्दो", ol: "ᱪᱟᱸᱫᱚ", rom: "Chando" },
    mundari: { dev: "चान्दू", rom: "Chandu" },
    ho: { dev: "चान्दू", rom: "Chandu" },
    category: "nature",
    phonemes: "chando",
    synonyms: ["चन्द्रमा", "चाँदनी"]
  },
  "तारे": {
    santhali: { dev: "इपिल", ol: "ᱤᱯᱤᱞ", rom: "Ipil" },
    mundari: { dev: "इपिल", rom: "Ipil" },
    ho: { dev: "इपिल", rom: "Ipil" },
    category: "nature",
    phonemes: "ipil",
    synonyms: ["तारा", "सितारे"]
  },
  "जंगल": {
    santhali: { dev: "बीर", ol: "ᱵᱤᱨ", rom: "Bir" },
    mundari: { dev: "बीर", rom: "Bir" },
    ho: { dev: "बीर", rom: "Bir" },
    category: "nature",
    phonemes: "bir",
    synonyms: ["वन", "अरण्य"]
  },
  "नदी": {
    santhali: { dev: "गाडा", ol: "ᱜᱟᱰᱟ", rom: "Gada" },
    mundari: { dev: "गाड़ा", rom: "Gara" },
    ho: { dev: "गाड़ा", rom: "Gara" },
    category: "nature",
    phonemes: "gada",
    synonyms: ["सरिता"]
  },
  "पहाड़": {
    santhali: { dev: "बुरु", ol: "ᱵᱩᱨᱩ", rom: "Buru" },
    mundari: { dev: "बुरु", rom: "Buru" },
    ho: { dev: "बुरु", rom: "Buru" },
    category: "nature",
    phonemes: "buru",
    synonyms: ["पर्वत"]
  },
  "कंकड़": {
    santhali: { dev: "धीरी", ol: "ᱫᱷᱤᱨᱤ", rom: "Dhiri" },
    mundari: { dev: "दिरि", rom: "Diri" },
    ho: { dev: "दिरि", rom: "Diri" },
    category: "nature",
    phonemes: "dhiri",
    synonyms: ["पत्थर", "कंकड़ों"]
  },

  // --- ANIMALS ---
  "हाथी": {
    santhali: { dev: "हाती", ol: "ᱦᱟᱹᱛᱤ", rom: "Hati" },
    mundari: { dev: "हाती", rom: "Hati" },
    ho: { dev: "हाती", rom: "Hati" },
    category: "animals",
    phonemes: "hati",
    synonyms: ["गज"]
  },
  "शेर": {
    santhali: { dev: "कुल", ol: "ᱠᱩᱞ", rom: "Kul" },
    mundari: { dev: "कुला", rom: "Kula" },
    ho: { dev: "कुला", rom: "Kula" },
    category: "animals",
    phonemes: "kul",
    synonyms: ["बाघ", "सिंह"]
  },
  "चिड़िया": {
    santhali: { dev: "चेणे", ol: "ᱪᱮᱬᱮ", rom: "Chene" },
    mundari: { dev: "चेड़े", rom: "Chere" },
    ho: { dev: "चेणे", rom: "Chene" },
    category: "nature",
    phonemes: "chene",
    synonyms: ["पक्षी", "पंछी", "चिड़ियाँ"]
  },
  "कौवा": {
    santhali: { dev: "काहु", ol: "ᱠᱟᱦᱩ", rom: "Kahu" },
    mundari: { dev: "काउ", rom: "Kau" },
    ho: { dev: "कउवा", rom: "Kauwa" },
    category: "animals",
    phonemes: "kahu",
    synonyms: ["कौवे", "काग"]
  },
  "सियार": {
    santhali: { dev: "तुयु", ol: "ᱛᱩᱭᱩ", rom: "Tuyu" },
    mundari: { dev: "तुयू", rom: "Tuyu" },
    ho: { dev: "तुयू", rom: "Tuyu" },
    category: "animals",
    phonemes: "tuyu",
    synonyms: ["लोमड़ी", "गीदड़"]
  },
  "गाय": {
    santhali: { dev: "गाई", ol: "ᱜᱟᱹᱭ", rom: "Gai" },
    mundari: { dev: "उरीः", rom: "Urih" },
    ho: { dev: "उरीः", rom: "Urih" },
    category: "animals",
    phonemes: "gai",
    synonyms: ["गौ"]
  },
  "बैल": {
    santhali: { dev: "डांगरा", ol: "ᱰᱟᱝᱜᱽᱨᱟ", rom: "Dangra" },
    mundari: { dev: "काड़ा", rom: "Kara" },
    ho: { dev: "डांगरा", rom: "Dangra" },
    category: "animals",
    phonemes: "dangra"
  },
  "बकरी": {
    santhali: { dev: "मेरोम", ol: "ᱢᱮᱨᱚᱢ", rom: "Merom" },
    mundari: { dev: "मेरोम", rom: "Merom" },
    ho: { dev: "मेरोम", rom: "Merom" },
    category: "animals",
    phonemes: "merom"
  },
  "कुत्ता": {
    santhali: { dev: "सेता", ol: "ᱥᱮᱛᱟ", rom: "Seta" },
    mundari: { dev: "सेता", rom: "Seta" },
    ho: { dev: "सेता", rom: "Seta" },
    category: "animals",
    phonemes: "seta",
    synonyms: ["श्वान"]
  },
  "बिल्ली": {
    santhali: { dev: "पुसी", ol: "ᱯᱩᱥᱤ", rom: "Pusi" },
    mundari: { dev: "पुसी", rom: "Pusi" },
    ho: { dev: "पुसी", rom: "Pusi" },
    category: "animals",
    phonemes: "pusi"
  },

  // --- NUMBERS 1 TO 10 ---
  "एक": {
    santhali: { dev: "मित्", ol: "ᱢᱤᱫ", rom: "Mit" },
    mundari: { dev: "मियाद", rom: "Miyad" },
    ho: { dev: "मोय", rom: "Moy" },
    category: "number",
    phonemes: "mit",
    synonyms: ["1", "१"]
  },
  "दो": {
    santhali: { dev: "बार", ol: "ᱵᱟᱨ", rom: "Bar" },
    mundari: { dev: "बारिया", rom: "Bariya" },
    ho: { dev: "बारिया", rom: "Bariya" },
    category: "number",
    phonemes: "bar",
    synonyms: ["2", "२"]
  },
  "तीन": {
    santhali: { dev: "पे", ol: "ᱯᱮ", rom: "Pe" },
    mundari: { dev: "अपिया", rom: "Apiya" },
    ho: { dev: "आपिया", rom: "Apiya" },
    category: "number",
    phonemes: "pe",
    synonyms: ["3", "३"]
  },
  "चार": {
    santhali: { dev: "पोन", ol: "ᱯᱳᱱ", rom: "Pon" },
    mundari: { dev: "उपूनिया", rom: "Upuniya" },
    ho: { dev: "उपून", rom: "Upun" },
    category: "number",
    phonemes: "pon",
    synonyms: ["4", "४"]
  },
  "पाँच": {
    santhali: { dev: "मोड़े", ol: "ᱢᱚᱬᱮ", rom: "More" },
    mundari: { dev: "मोनेया", rom: "Moneya" },
    ho: { dev: "मोया", rom: "Moya" },
    category: "number",
    phonemes: "more",
    synonyms: ["5", "५", "पांच"]
  },
  "छह": {
    santhali: { dev: "तुरुय", ol: "ᱛᱩᱨᱩᱭ", rom: "Turuy" },
    mundari: { dev: "तुरुइया", rom: "Turuiya" },
    ho: { dev: "तुरुया", rom: "Turuya" },
    category: "number",
    phonemes: "turuy",
    synonyms: ["6", "६", "छः"]
  },
  "सात": {
    santhali: { dev: "एयाय", ol: "ᱮᱭᱟᱭ", rom: "Eyay" },
    mundari: { dev: "एया", rom: "Eya" },
    ho: { dev: "एया", rom: "Eya" },
    category: "number",
    phonemes: "eyay",
    synonyms: ["7", "७"]
  },
  "आठ": {
    santhali: { dev: "इराल", ol: "ᱤᱨᱟᱹᱞ", rom: "Iral" },
    mundari: { dev: "इरालिया", rom: "Iraliya" },
    ho: { dev: "इरालिया", rom: "Iraliya" },
    category: "number",
    phonemes: "iral",
    synonyms: ["8", "८"]
  },
  "नौ": {
    santhali: { dev: "आरे", ol: "ᱟᱨᱮ", rom: "Are" },
    mundari: { dev: "अरेया", rom: "Areya" },
    ho: { dev: "अरेया", rom: "Areya" },
    category: "number",
    phonemes: "are",
    synonyms: ["9", "९"]
  },
  "दस": {
    santhali: { dev: "गेल", ol: "ᱜᱮᱞ", rom: "Gel" },
    mundari: { dev: "गेलेया", rom: "Geleya" },
    ho: { dev: "गेल", rom: "Gel" },
    category: "number",
    phonemes: "gel",
    synonyms: ["10", "१०"]
  }
};

export const ENGLISH_TO_HINDI_MAP: Record<string, string> = {
  // Greetings
  "hello": "नमस्ते",
  "hi": "नमस्ते",
  "greetings": "नमस्ते",
  "namaste": "नमस्ते",
  "johar": "नमस्ते",
  "good morning": "सुप्रभात",
  "morning": "सुप्रभात",
  "good evening": "शुभ संध्या",
  "evening": "शुभ संध्या",
  "good night": "शुभ रात्रि",
  "night": "शुभ रात्रि",
  "thank you": "धन्यवाद",
  "thanks": "धन्यवाद",
  "thank you very much": "धन्यवाद",
  "how are you": "आप कैसे हैं?",
  "how are you doing": "आप कैसे हैं?",
  "how do you do": "आप कैसे हैं?",
  "i am fine": "मैं ठीक हूँ",
  "i am good": "मैं ठीक हूँ",
  "what is your name": "आपका नाम क्या है?",
  "what's your name": "आपका नाम क्या है?",
  "your name": "आपका नाम क्या है?",
  "my name": "मेरा नाम",
  "my name is": "मेरा नाम",

  // Classroom Commands
  "sit down": "बैठ जाओ",
  "sit": "बैठ जाओ",
  "please sit down": "बैठ जाओ",
  "sit down please": "बैठ जाओ",
  "be seated": "बैठ जाओ",
  "all children sit down": "सब बच्चे बैठ जाओ",
  "everyone sit down": "सब बच्चे बैठ जाओ",
  "children sit down": "सब बच्चे बैठ जाओ",
  "all students sit down": "सब बच्चे बैठ जाओ",
  "stand up": "खड़े हो जाओ",
  "stand": "खड़े हो जाओ",
  "please stand up": "खड़े हो जाओ",
  "open book": "किताब खोलो",
  "open the book": "किताब खोलो",
  "open your book": "किताब खोलो",
  "open books": "किताब खोलो",
  "open your books": "किताब खोलो",
  "please open book": "किताब खोलो",
  "please open the book": "किताब खोलो",
  "please open your book": "किताब खोलो",
  "children open your books": "बच्चों अपनी किताबें खोलो",
  "students open your books": "बच्चों अपनी किताबें खोलो",
  "open your books children": "बच्चों अपनी किताबें खोलो",
  "close book": "किताब बंद करो",
  "close the book": "किताब बंद करो",
  "close your book": "किताब बंद करो",
  "take out notebook": "कॉपी निकालो",
  "take out copy": "कॉपी निकालो",
  "take out your notebook": "कॉपी निकालो",
  "write": "लिखो",
  "write down": "लिखो",
  "start writing": "लिखो",
  "please write": "लिखो",
  "read": "पढ़ो",
  "read aloud": "पढ़ो",
  "start reading": "पढ़ो",
  "please read": "पढ़ो",
  "read this": "पढ़ो",
  "keep quiet": "चुप रहो",
  "silence": "चुप रहो",
  "be quiet": "चुप रहो",
  "quiet": "चुप रहो",
  "don't talk": "चुप रहो",
  "stop talking": "चुप रहो",
  "listen carefully": "ध्यान से सुनो",
  "listen": "ध्यान से सुनो",
  "pay attention": "ध्यान से सुनो",
  "listen to me": "ध्यान से सुनो",
  "raise hand": "हाथ उठाओ",
  "raise your hand": "हाथ उठाओ",
  "raise hands": "हाथ उठाओ",
  "raise your hands": "हाथ उठाओ",
  "hands up": "हाथ उठाओ",
  "clap": "ताली बजाओ",
  "clap hands": "ताली बजाओ",
  "clap your hands": "ताली बजाओ",

  // Praise
  "well done": "शाबाश",
  "good job": "शाबाश",
  "bravo": "शाबाश",
  "very good": "बहुत अच्छा",
  "excellent": "बहुत अच्छा",
  "great": "बहुत अच्छा",
  "correct": "सही है",
  "that is correct": "सही है",
  "right": "सही है",
  "you are right": "सही है",

  // Questions & Inquiries (English & Hinglish)
  "did you understand": "क्या आप समझ गए?",
  "what are you doing": "क्या कर रहे हो",
  "what are you doing?": "क्या कर रहे हो",
  "what do you do": "क्या कर रहे हो",
  "where are you going": "कहाँ जा रहे हो",
  "where are you going?": "कहाँ जा रहे हो",
  "what happened": "क्या बात है",
  "what is the matter": "क्या बात है",
  "what is this": "यह क्या है?",
  "what's this": "यह क्या है?",
  "what is that": "वह क्या है?",
  "what's that": "वह क्या है?",

  // Common Hinglish Teacher Utterances
  "kya karta hai": "क्या कर रहे हो",
  "kya karte": "क्या कर रहे हो",
  "kya karte ho": "क्या कर रहे हो",
  "kya kar rahe ho": "क्या कर रहे हो",
  "kya kar raha hai": "क्या कर रहे हो",
  "kya kar rahi ho": "क्या कर रहे हो",
  "kaha ja rahe ho": "कहाँ जा रहे हो",
  "kahan ja rahe ho": "कहाँ जा रहे हो",
  "kya hua": "क्या बात है",
  "kya baat hai": "क्या बात है",
  "pani piyo": "पानी पियो",
  "khana khao": "खाना खाओ",
  "baith jao": "बैठ जाओ",
  "kitab kholo": "किताब खोलो",
  "kitab band karo": "किताब बंद करो",
  "shant raho": "शांत रहो",
  "chup raho": "शांत रहो",
  "dhyan se suno": "ध्यान से सुनो",
  "haath uthao": "हाथ उठाओ",
  "hath uthao": "हाथ उठाओ",
  "taali bajao": "ताली बजाओ",
  "tali bajao": "ताली बजाओ",
  "kaise ho": "आप कैसे हैं",
  "aap kaise ho": "आप कैसे हैं",
  "naam kya hai": "आपका नाम क्या है",

  // Daily
  "come here": "यहाँ आओ",
  "come": "यहाँ आओ",
  "drink water": "पानी पियो",
  "drink": "पानी पियो",
  "eat food": "खाना खाओ",
  "eat": "खाना खाओ",
  "food": "खाना खाओ",
  "have food": "खाना खाओ",
  "wash hands": "हाथ धो लो",
  "wash your hands": "हाथ धो लो",
  "draw picture": "चित्र बनाओ",
  "draw": "चित्र बनाओ",
  "draw a picture": "चित्र बनाओ",

  // Realia & Objects
  "tree": "पेड़",
  "trees": "पेड़",
  "sal tree": "पेड़",
  "sakhua tree": "पेड़",
  "leaf": "पत्ता",
  "leaves": "पत्ता",
  "flower": "फूल",
  "flowers": "फूल",
  "fruit": "फल",
  "fruits": "फल",
  "bird": "चिड़िया",
  "birds": "चिड़िया",
  "elephant": "हाथी",
  "elephants": "हाथी",
  "drum": "मांदर",
  "drums": "मांदर",
  "tribal drum": "मांदर",
  "mandar": "मांदर",
  "bow": "धनुष-बाण",
  "arrow": "धनुष-बाण",
  "bow and arrow": "धनुष-बाण",
  "house": "घर",
  "home": "घर",
  "school": "स्कूल",
  "teacher": "शिक्षक",
  "student": "बच्चे",
  "students": "बच्चे",
  "children": "बच्चे",
  "child": "बच्चे",
  "water": "पानी",
  "sun": "सूरज",
  "moon": "चाँद",
  "river": "नदी",
  "forest": "जंगल",
  "jungle": "जंगल",
  "mountain": "पहाड़",
  "hill": "पहाड़",

  // Numbers
  "one": "एक", "1": "एक",
  "two": "दो", "2": "दो",
  "three": "तीन", "3": "तीन",
  "four": "चार", "4": "चार",
  "five": "पाँच", "5": "पाँच",
  "six": "छह", "6": "छह",
  "seven": "सात", "7": "सात",
  "eight": "आठ", "8": "आठ",
  "nine": "नौ", "9": "नौ",
  "ten": "दस", "10": "दस"
};

function cleanWord(w: string): string {
  return w.replace(/[.,?!;:।॥\"\'\(\)]/g, '').trim().toLowerCase();
}

export class OfflineNlpEngine {
  public translateOffline(
    rawText: string,
    sourceLang: 'hindi' | 'english' | TribalLanguage,
    targetLang: 'hindi' | TribalLanguage
  ): TranslationResult {
    const startTime = performance.now();
    const text = (rawText || '').trim();

    if (!text) {
      return {
        source_text: '',
        source_lang: sourceLang,
        target_lang: targetLang,
        translated_text: '',
        script_primary: '',
        devanagari_text: '',
        romanized: '',
        audio_phonemes: '',
        category: 'general',
        confidence: 1.0,
        latency_ms: 0.1
      };
    }

    const cleanInput = text.replace(/[.,?!;:।॥\"\'\(\)]/g, '').trim();
    const lowerClean = cleanInput.toLowerCase();
    const hasOlChiki = /[\u1C50-\u1C7F]/.test(cleanInput);
    const hasDevanagari = /[\u0900-\u097F]/.test(cleanInput);

    // Check for English / Hinglish phrase or subphrase mapping early
    let mappedHindi: string | undefined = ENGLISH_TO_HINDI_MAP[lowerClean];
    if (!mappedHindi) {
      for (const [enKey, hiVal] of Object.entries(ENGLISH_TO_HINDI_MAP)) {
        if (lowerClean === enKey || lowerClean.startsWith(enKey + ' ') || lowerClean.endsWith(' ' + enKey) || lowerClean.includes(' ' + enKey + ' ')) {
          mappedHindi = hiVal;
          break;
        }
      }
    }

    // Check if input is a Romanized or Devanagari Santhali native phrase
    let isSanthaliRoman = false;
    let isSanthaliDev = false;
    for (const [hiWord, entry] of Object.entries(COMPREHENSIVE_DICTIONARY)) {
      const rom = (entry.santhali?.rom || '').trim().toLowerCase();
      if (rom && rom === lowerClean) {
        isSanthaliRoman = true;
      }
      if (entry.santhali?.dev && cleanInput === entry.santhali.dev) {
        isSanthaliDev = true;
      }
    }

    // Dynamic direction auto-detection:
    let effectiveTarget = targetLang;
    let effectiveSource = sourceLang;

    if (hasOlChiki || isSanthaliRoman || isSanthaliDev) {
      effectiveTarget = 'hindi';
      effectiveSource = 'santhali';
    } else if (targetLang === 'hindi' && (hasDevanagari || mappedHindi)) {
      // User entered Hindi or English in Student->Teacher mode by mistake
      effectiveTarget = 'santhali';
      effectiveSource = hasDevanagari ? 'hindi' : 'english';
    }

    // 0. English & Hinglish Direct & Phrase Match
    if (mappedHindi && COMPREHENSIVE_DICTIONARY[mappedHindi]) {
      const entry = COMPREHENSIVE_DICTIONARY[mappedHindi];
      const tData = effectiveTarget === 'santhali' ? entry.santhali :
                    effectiveTarget === 'mundari' ? entry.mundari :
                    effectiveTarget === 'ho' ? entry.ho : null;

      const devText = tData ? tData.dev : mappedHindi;
      const olText = effectiveTarget === 'santhali' ? (tData as any).ol : devText;
      const romText = tData ? tData.rom : cleanInput;
      const latency = Math.max(0.2, Math.round((performance.now() - startTime) * 10) / 10);

      return {
        source_text: text,
        source_lang: hasDevanagari ? 'hindi' : 'english',
        target_lang: effectiveTarget,
        translated_text: devText,
        script_primary: effectiveTarget === 'santhali' ? olText : devText,
        devanagari_text: devText,
        romanized: romText,
        audio_phonemes: entry.phonemes,
        category: entry.category,
        confidence: 0.99,
        latency_ms: latency,
        hindi_bridge: mappedHindi
      };
    }

    // 1. Direct or Synonym Match in Dictionary (Hindi / Hinglish -> Tribal)
    for (const [key, entry] of Object.entries(COMPREHENSIVE_DICTIONARY)) {
      const keyMatch = cleanInput === key || key.toLowerCase() === lowerClean;
      const synMatch = entry.synonyms && entry.synonyms.some(s => s.toLowerCase() === lowerClean || s === cleanInput);
      if (keyMatch || synMatch) {
        const tData = effectiveTarget === 'santhali' ? entry.santhali :
                      effectiveTarget === 'mundari' ? entry.mundari :
                      effectiveTarget === 'ho' ? entry.ho : null;

        const devText = tData ? tData.dev : cleanInput;
        const olText = effectiveTarget === 'santhali' ? (tData as any).ol : devText;
        const romText = tData ? tData.rom : cleanInput;
        const latency = Math.max(0.2, Math.round((performance.now() - startTime) * 10) / 10);

        return {
          source_text: text,
          source_lang: hasDevanagari ? 'hindi' : 'english',
          target_lang: effectiveTarget,
          translated_text: devText,
          script_primary: effectiveTarget === 'santhali' ? olText : devText,
          devanagari_text: devText,
          romanized: romText,
          audio_phonemes: entry.phonemes,
          category: entry.category,
          confidence: 0.99,
          latency_ms: latency,
          hindi_bridge: key
        };
      }
    }

    // 2. Reverse Match (Tribal -> Hindi)
    if (effectiveTarget === 'hindi' || hasOlChiki) {
      for (const [hiWord, entry] of Object.entries(COMPREHENSIVE_DICTIONARY)) {
        const tData = entry.santhali || entry.mundari || entry.ho;
        if (tData) {
          if (cleanInput === tData.dev || cleanInput === (tData as any).ol || cleanInput.toLowerCase() === (tData.rom || '').toLowerCase()) {
            const latency = Math.max(0.2, Math.round((performance.now() - startTime) * 10) / 10);
            return {
              source_text: text,
              source_lang: 'santhali',
              target_lang: 'hindi',
              translated_text: hiWord,
              script_primary: hiWord,
              devanagari_text: hiWord,
              romanized: hiWord,
              audio_phonemes: hiWord,
              category: entry.category,
              confidence: 0.98,
              latency_ms: latency
            };
          }
        }
      }
    }

    // 3. Subphrase matching in ENGLISH_TO_HINDI_MAP
    for (const [enKey, hiVal] of Object.entries(ENGLISH_TO_HINDI_MAP)) {
      if (lowerClean === enKey || lowerClean.startsWith(enKey + ' ') || lowerClean.endsWith(' ' + enKey) || lowerClean.includes(' ' + enKey + ' ')) {
        if (COMPREHENSIVE_DICTIONARY[hiVal]) {
          const entry = COMPREHENSIVE_DICTIONARY[hiVal];
          const tData = effectiveTarget === 'santhali' ? entry.santhali :
                        effectiveTarget === 'mundari' ? entry.mundari :
                        effectiveTarget === 'ho' ? entry.ho : null;

          const devText = tData ? tData.dev : hiVal;
          const olText = effectiveTarget === 'santhali' ? (tData as any).ol : devText;
          const romText = tData ? tData.rom : cleanInput;
          const latency = Math.max(0.2, Math.round((performance.now() - startTime) * 10) / 10);

          return {
            source_text: text,
            source_lang: 'english',
            target_lang: effectiveTarget,
            translated_text: devText,
            script_primary: effectiveTarget === 'santhali' ? olText : devText,
            devanagari_text: devText,
            romanized: romText,
            audio_phonemes: entry.phonemes,
            category: entry.category,
            confidence: 0.96,
            latency_ms: latency,
            hindi_bridge: hiVal
          };
        }
      }
    }

    // 3. Multi-word Intelligent N-gram & Stemming Phrase Matcher
    const words = text.split(/\s+/);
    const devTokens: string[] = [];
    const olTokens: string[] = [];
    const romTokens: string[] = [];
    const audioTokens: string[] = [];
    let matchedCount = 0;

    let i = 0;
    while (i < words.length) {
      let matched = false;

      // Try 3-word phrase, then 2-word phrase, then 1-word
      for (let len = Math.min(3, words.length - i); len >= 1; len--) {
        const phrase = words.slice(i, i + len).map(cleanWord).join(' ');
        
        // 1. Direct or synonym match in Hindi dictionary
        let matchedKey = '';
        for (const [key, entry] of Object.entries(COMPREHENSIVE_DICTIONARY)) {
          if (phrase === key || (entry.synonyms && entry.synonyms.includes(phrase))) {
            matchedKey = key;
            break;
          }
        }

        // 2. Check English phrase map
        if (!matchedKey && ENGLISH_TO_HINDI_MAP[phrase]) {
          matchedKey = ENGLISH_TO_HINDI_MAP[phrase];
        }

        if (matchedKey && COMPREHENSIVE_DICTIONARY[matchedKey]) {
          const entry = COMPREHENSIVE_DICTIONARY[matchedKey];
          const tData = targetLang === 'santhali' ? entry.santhali :
                        targetLang === 'mundari' ? entry.mundari :
                        targetLang === 'ho' ? entry.ho : null;

          if (tData) {
            devTokens.push(tData.dev);
            olTokens.push(targetLang === 'santhali' ? (tData as any).ol : tData.dev);
            romTokens.push(tData.rom);
            audioTokens.push(entry.phonemes);
            matchedCount += len;
            i += len;
            matched = true;
            break;
          }
        }
      }

      if (!matched) {
        const w = cleanWord(words[i]);
        let foundWord = false;

        let matchedKey = '';
        for (const [key, entry] of Object.entries(COMPREHENSIVE_DICTIONARY)) {
          if (key === w || (entry.synonyms && entry.synonyms.includes(w))) {
            matchedKey = key;
            break;
          }
        }

        if (!matchedKey && ENGLISH_TO_HINDI_MAP[w]) {
          matchedKey = ENGLISH_TO_HINDI_MAP[w];
        }

        if (matchedKey && COMPREHENSIVE_DICTIONARY[matchedKey]) {
          const entry = COMPREHENSIVE_DICTIONARY[matchedKey];
          const tData = targetLang === 'santhali' ? entry.santhali :
                        targetLang === 'mundari' ? entry.mundari :
                        targetLang === 'ho' ? entry.ho : null;

          if (tData) {
            devTokens.push(tData.dev);
            olTokens.push(targetLang === 'santhali' ? (tData as any).ol : tData.dev);
            romTokens.push(tData.rom);
            audioTokens.push(entry.phonemes);
            matchedCount++;
            foundWord = true;
          }
        }

        if (!foundWord) {
          devTokens.push(words[i]);
          olTokens.push(targetLang === 'santhali' ? devanagariToOlChiki(words[i]) : words[i]);
          romTokens.push(words[i]);
          audioTokens.push(words[i]);
        }

        i++;
      }
    }

    const devResult = devTokens.join(' ');
    const olResult = targetLang === 'santhali' ? olTokens.join(' ') : devResult;
    const romResult = romTokens.join(' ');
    const latency = Math.max(0.3, Math.round((performance.now() - startTime) * 10) / 10);
    const confidence = Math.max(0.6, Math.round((matchedCount / Math.max(1, words.length)) * 100) / 100);

    return {
      source_text: text,
      source_lang: sourceLang,
      target_lang: targetLang,
      translated_text: devResult,
      script_primary: olResult,
      devanagari_text: devResult,
      romanized: romResult,
      audio_phonemes: audioTokens.join(' '),
      category: 'vernacular_sentence',
      confidence,
      latency_ms: latency
    };
  }

  public getAllVocabulary(category?: string): VocabularyItem[] {
    const list: VocabularyItem[] = [];
    for (const [hindi, item] of Object.entries(COMPREHENSIVE_DICTIONARY)) {
      if (category && item.category !== category) continue;
      list.push({
        hindi,
        santhali_dev: item.santhali.dev,
        santhali_ol: item.santhali.ol,
        santhali_rom: item.santhali.rom,
        mundari_dev: item.mundari.dev,
        mundari_rom: item.mundari.rom,
        ho_dev: item.ho.dev,
        ho_rom: item.ho.rom,
        category: item.category,
        audio_phonemes: item.phonemes
      });
    }
    return list;
  }
}

export const offlineNlp = new OfflineNlpEngine();
