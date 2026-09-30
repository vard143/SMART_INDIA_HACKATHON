import { LanguagePack, TribalLanguage, ScriptId, ScriptDefinition } from '../types';

export const LANGUAGE_PACKS: Record<TribalLanguage, LanguagePack> = {
  santhali: {
    id: 'santhali',
    isoCode: 'sat',
    nameEnglish: 'Santhali',
    nameNative: 'ᱥᱟᱱᱛᱟᱲᱤ',
    family: 'Austroasiatic (Munda)',
    defaultScript: 'ol_chiki',
    supportedScripts: [
      {
        id: 'ol_chiki',
        nameNative: 'ᱚᱞ ᱪᱤᱠᱤ',
        nameEnglish: 'Ol Chiki (Official)',
        scriptType: 'alphabet',
        unicodeRange: 'U+1C50 - U+1C7F',
        sampleText: 'ᱥᱟᱜᱩᱱ ᱫᱟᱨᱟᱢ',
        isNative: true
      },
      {
        id: 'devanagari',
        nameNative: 'देवनागरी (JCERT Bridge)',
        nameEnglish: 'Devanagari',
        scriptType: 'abugida',
        unicodeRange: 'U+0900 - U+097F',
        sampleText: 'सगुन दाराम',
        isNative: false
      },
      {
        id: 'roman',
        nameNative: 'Roman',
        nameEnglish: 'Roman Transliteration',
        scriptType: 'latin',
        sampleText: 'Sagun Daram',
        isNative: false
      }
    ],
    primaryRegions: ['Santhal Pargana (Dumka, Deoghar, Godda, Pakur, Sahibganj, Jamtara)', 'East Singhbhum'],
    sampleGreeting: {
      nativeText: 'ᱥᱟᱜᱩᱱ ᱥᱮᱛᱟᱜ (Sagun Setah)',
      devanagari: 'सगुन सेताः',
      roman: 'Sagun Setah',
      meaningHindi: 'शुभ प्रभात / नमस्कार',
      meaningEnglish: 'Good Morning / Greetings'
    },
    culturalContext: {
      majorFestivals: ['Sohrai (ᱥᱚᱦᱨᱟᱭ)', 'Baha Parab (ᱵᱟᱦᱟ)', 'Karam (ᱠᱟᱨᱟᱢ)', 'Erok Sim'],
      folkInstruments: ['Tumdang (ᱛᱩᱢᱫᱟᱜ)', 'Tamak (ᱴᱟᱢᱟᱠ)', 'Banam (ᱵᱟᱱᱟᱢ)', 'Tirio (ᱛᱤᱨᱤᱭᱚ)'],
      natureReverence: 'Jaherthan (Sacred Grove / ᱡᱟᱦᱮᱨ ᱛᱷᱟᱱ)',
      communityRealia: ['Sarjom (Sal Tree / ᱥᱟᱨᱡᱚᱢ)', 'Dare (Tree / ᱫᱟᱨᱮ)', 'Gada (River / ᱜᱟᱰᱟ)']
    },
    vocabularyCount: 450,
    validationStatus: 'COMMUNITY_VALIDATED'
  },
  mundari: {
    id: 'mundari',
    isoCode: 'unr',
    nameEnglish: 'Mundari',
    nameNative: 'मुण्डारी',
    family: 'Austroasiatic (Munda)',
    defaultScript: 'devanagari',
    supportedScripts: [
      {
        id: 'devanagari',
        nameNative: 'देवनागरी (JCERT Standard)',
        nameEnglish: 'Devanagari (Diacritic-Enriched)',
        scriptType: 'abugida',
        sampleText: 'जोहार / सेताः जोहार',
        isNative: false
      },
      {
        id: 'mundari_bani',
        nameNative: 'मुंडारी बानी / हिसीर',
        nameEnglish: 'Mundari Bani (Native Hisir)',
        scriptType: 'alphabet',
        unicodeRange: 'U+1E5D0 - U+1E5FF',
        sampleText: 'ᱢᱩᱱᱰᱟᱨᱤ ᱵᱟᱱᱤ',
        isNative: true
      },
      {
        id: 'roman',
        nameNative: 'Roman',
        nameEnglish: 'Roman Transliteration',
        scriptType: 'latin',
        sampleText: 'Johar / Setah Johar',
        isNative: false
      }
    ],
    primaryRegions: ['Khunti', 'Ranchi (Tamar, Bundu)', 'Torpa', 'Murhu', 'West Singhbhum'],
    sampleGreeting: {
      nativeText: 'जोहार / सेताः जोहार',
      devanagari: 'जोहार / सेताः जोहार',
      roman: 'Johar / Setah Johar',
      meaningHindi: 'प्रणाम / शुभ प्रभात',
      meaningEnglish: 'Respectful Greetings / Good Morning'
    },
    culturalContext: {
      majorFestivals: ['Mage Parab', 'Ba Parab', 'Hero Parab', 'Karam'],
      folkInstruments: ['Duluk / Dama', 'Madal', 'Rutur (Flute)'],
      historicLeaders: ['Bhagwan Birsa Munda (Dharti Aaba)'],
      communityRealia: ['Daru (Tree)', 'Gada (River)', 'Orah (Home)', 'Hatu (Village)']
    },
    vocabularyCount: 380,
    validationStatus: 'COMMUNITY_VALIDATED'
  },
  ho: {
    id: 'ho',
    isoCode: 'hoc',
    nameEnglish: 'Ho',
    nameNative: 'ᱦᱳ ᱡᱚᱜᱚᱨ',
    family: 'Austroasiatic (Munda)',
    defaultScript: 'devanagari',
    supportedScripts: [
      {
        id: 'devanagari',
        nameNative: 'देवनागरी (JCERT Standard)',
        nameEnglish: 'Devanagari (Classroom Standard)',
        scriptType: 'abugida',
        sampleText: 'जोहार / सेताः जोहार',
        isNative: false
      },
      {
        id: 'warang_chiti',
        nameNative: 'ᱣᱟᱨᱟᱝ ᱪᱤᱛᱤ',
        nameEnglish: 'Warang Chiti (Native Lako Bodra)',
        scriptType: 'abugida',
        unicodeRange: 'U+118A0 - U+118FF',
        sampleText: '𑢹𑣉𑣉 ᱡᱚᱜᱚᱨ',
        isNative: true
      },
      {
        id: 'roman',
        nameNative: 'Roman',
        nameEnglish: 'Roman Transliteration',
        scriptType: 'latin',
        sampleText: 'Johar / Setah Johar',
        isNative: false
      }
    ],
    primaryRegions: ['Kolhan Division (Chaibasa, West Singhbhum, East Singhbhum, Seraikela-Kharsawan)'],
    sampleGreeting: {
      nativeText: 'जोहार / सेताः जोहार',
      devanagari: 'जोहार / सेताः जोहार',
      roman: 'Johar / Setah Johar',
      meaningHindi: 'जोहार / नमस्कार',
      meaningEnglish: 'Greetings / Hello'
    },
    culturalContext: {
      majorFestivals: ['Mage Parab', 'Ba Parab', 'Damurai Parab', 'Kolom Parab'],
      folkInstruments: ['Damang', 'Duma', 'Rutur'],
      communityRealia: ['Daru (Tree)', 'Daa (Water)', 'Owa (Home)', 'Hatu (Village)']
    },
    vocabularyCount: 350,
    validationStatus: 'COMMUNITY_VALIDATED'
  },
  kurukh: {
    id: 'kurukh',
    isoCode: 'kru',
    nameEnglish: 'Kurukh (Oraon)',
    nameNative: 'कुड़ुख़',
    family: 'Dravidian (Northern Branch)',
    defaultScript: 'devanagari',
    supportedScripts: [
      {
        id: 'devanagari',
        nameNative: 'देवनागरी',
        nameEnglish: 'Devanagari (Primary)',
        scriptType: 'abugida',
        sampleText: 'गोड़े / जय जोहार',
        isNative: false
      },
      {
        id: 'tolong_siki',
        nameNative: 'तोलोङ सिकी',
        nameEnglish: 'Tolong Siki (Native Dr. Oraon)',
        scriptType: 'alphabet',
        sampleText: 'तोलोङ सिकी कुड़ुख़',
        isNative: true
      },
      {
        id: 'roman',
        nameNative: 'Roman',
        nameEnglish: 'Roman Transliteration',
        scriptType: 'latin',
        sampleText: 'Gode / Jai Johar',
        isNative: false
      }
    ],
    primaryRegions: ['Gumla', 'Lohardaga', 'Ranchi', 'Latehar', 'Palamu', 'Simdega'],
    sampleGreeting: {
      nativeText: 'गोड़े / जय जोहार',
      devanagari: 'गोड़े / जय जोहार',
      roman: 'Gode / Jai Johar',
      meaningHindi: 'नमस्कार / प्रणाम',
      meaningEnglish: 'Greetings / Respectful Salute'
    },
    culturalContext: {
      majorFestivals: ['Karam', 'Sarhul (Khaddi)', 'Jitiya', 'Fagua'],
      folkInstruments: ['Madal', 'Nagara', 'Flute'],
      communityRealia: ['Mann (Tree / मन्न)', 'Amma (Water / अम्म)', 'Erpa (House / एर्पा)']
    },
    vocabularyCount: 280,
    validationStatus: 'COMMUNITY_VALIDATED'
  },
  kharia: {
    id: 'kharia',
    isoCode: 'khr',
    nameEnglish: 'Kharia',
    nameNative: 'खड़िया',
    family: 'Austroasiatic (Munda)',
    defaultScript: 'devanagari',
    supportedScripts: [
      {
        id: 'devanagari',
        nameNative: 'देवनागरी',
        nameEnglish: 'Devanagari (Standard)',
        scriptType: 'abugida',
        sampleText: 'जोहार / सेताः जोहार',
        isNative: false
      },
      {
        id: 'roman',
        nameNative: 'Roman',
        nameEnglish: 'Roman Transliteration',
        scriptType: 'latin',
        sampleText: 'Johar',
        isNative: false
      }
    ],
    primaryRegions: ['Simdega', 'Gumla', 'West Singhbhum'],
    sampleGreeting: {
      nativeText: 'जोहार / सेताः जोहार',
      devanagari: 'जोहार / सेताः जोहार',
      roman: 'Johar',
      meaningHindi: 'जोहार / नमस्कार',
      meaningEnglish: 'Greetings'
    },
    culturalContext: {
      majorFestivals: ['Jankor (Flower Festival)', 'Karam', 'Kadleta'],
      folkInstruments: ['Madal', 'Nagara'],
      communityRealia: ['Daru (Tree)', 'Da (Water)', 'U (House)']
    },
    vocabularyCount: 220,
    validationStatus: 'COMMUNITY_VALIDATED'
  }
};

class LanguagePackService {
  getAllPacks(): LanguagePack[] {
    return Object.values(LANGUAGE_PACKS);
  }

  getPack(lang: TribalLanguage): LanguagePack {
    return LANGUAGE_PACKS[lang] || LANGUAGE_PACKS.santhali;
  }

  getSupportedScripts(lang: TribalLanguage): ScriptDefinition[] {
    return this.getPack(lang).supportedScripts;
  }

  getDefaultScript(lang: TribalLanguage): ScriptId {
    return this.getPack(lang).defaultScript;
  }
}

export const languagePackService = new LanguagePackService();
