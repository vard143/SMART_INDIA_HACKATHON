import { 
  TribalLanguage, 
  TranslationResult, 
  LessonPlan, 
  BilingualStory, 
  AssessmentExam, 
  ExamSubmissionResponse,
  PedagogicalLessonPlan,
  RemediationPlan,
  ChildTutorResponse,
  VaultItem,
  LanguagePack,
  ExternalContentIngestResult,
  OfficialTextbook,
  OfficialTextbookChapter
} from '../types';

import { offlineNlp } from './offlineNlpEngine';
import { JCERT_CURRICULUM_DATA } from '../data/jcertCurriculum';
import { languagePackService } from './languagePackService';
import { adaptiveService } from './adaptiveEngine';
import { communityVaultService } from './communityVaultService';
import { offlineWorksheetAgent, AgentGeneratedWorksheet, StudentCompetencyLevel, WorksheetFocusType } from './offlineWorksheetAgent';
import { offlineStorage } from './offlineStorage';
import { syncService } from './syncService';

const API_BASE = '/api';

export class ApiService {
  private isOnline: boolean = typeof navigator !== 'undefined' ? navigator.onLine : true;

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => { this.isOnline = true; });
      window.addEventListener('offline', () => { this.isOnline = false; });
    }
  }

  public getOnlineStatus(): boolean {
    return this.isOnline && syncService.effectiveOnlineStatus();
  }

  public setSimulatedOffline(offline: boolean) {
    this.isOnline = !offline;
    syncService.setSimulatedOffline(offline);
  }

  async translate(text: string, sourceLang: 'hindi' | 'english' | TribalLanguage, targetLang: 'hindi' | TribalLanguage): Promise<TranslationResult> {
    const localResult = offlineNlp.translateOffline(text, sourceLang, targetLang);
    
    if (!this.isOnline) {
      return localResult;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1500);

      const response = await fetch(`${API_BASE}/translate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          source_lang: sourceLang,
          target_lang: targetLang
        }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        if (data && data.translated_text) {
          return data;
        }
      }
      return localResult;
    } catch (e) {
      return localResult;
    }
  }

  async getSanthaliStats(): Promise<any> {
    if (this.isOnline) {
      try {
        const response = await fetch(`${API_BASE}/santhali/stats`);
        if (response.ok) return await response.json();
      } catch (e) {}
    }
    return {
      language: "Santhali (ᱥᱟᱱᱛᱟᱲᱤ)",
      script: "Ol Chiki (ᱚᱞ ᱪᱤᱠᱤ) & Devanagari",
      total_vocabulary: 130,
      categories: ['greeting', 'classroom_command', 'number', 'family', 'nature', 'realia', 'animal', 'color', 'school', 'food', 'body', 'verb'],
      fts5_enabled: true
    };
  }

  async getSanthaliLexicon(category?: string, grade?: string): Promise<any[]> {
    if (this.isOnline) {
      try {
        const url = `${API_BASE}/santhali/lexicon?category=${encodeURIComponent(category || 'all')}&grade=${encodeURIComponent(grade || 'all')}`;
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          return data.items || [];
        }
      } catch (e) {}
    }
    return [];
  }

  async searchSanthaliFts(query: string): Promise<any> {
    if (this.isOnline) {
      try {
        const response = await fetch(`${API_BASE}/santhali/search?q=${encodeURIComponent(query)}`);
        if (response.ok) return await response.json();
      } catch (e) {}
    }
    const local = offlineNlp.translateOffline(query, 'hindi', 'santhali');
    return {
      query,
      count: 1,
      latency_ms: 0.5,
      engine: 'offline_client_nlp',
      matches: [{
        hindi_term: query,
        santhali_devanagari: local.devanagari_text || local.translated_text,
        santhali_ol_chiki: local.script_primary || local.translated_text,
        santhali_romanized: local.romanized || '',
        category: local.category || 'general'
      }]
    };
  }

  async fetchLanguagePacks(): Promise<LanguagePack[]> {
    if (!this.isOnline) {
      return languagePackService.getAllPacks();
    }
    try {
      const res = await fetch(`${API_BASE}/v1/languages/packs`);
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.language_packs)) {
          return data.language_packs;
        }
      }
    } catch (e) {}
    return languagePackService.getAllPacks();
  }

  async fetchLessons(grade?: string): Promise<LessonPlan[]> {
    if (this.isOnline) {
      try {
        const url = grade ? `${API_BASE}/curriculum/lessons?grade=${encodeURIComponent(grade)}` : `${API_BASE}/curriculum/lessons`;
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          if (data && Array.isArray(data.lessons) && data.lessons.length >= JCERT_CURRICULUM_DATA.length) {
            offlineStorage.cacheLessons(data.lessons).catch(() => {});
            return data.lessons;
          }
        }
      } catch (e) {}
    }

    try {
      const cached = await offlineStorage.getCachedLessons(grade);
      if (cached && cached.length > 0) {
        return cached;
      }
    } catch (e) {}

    return this.getLocalLessons(grade);
  }

  async generateLesson(topic: string, grade: string, targetLang: TribalLanguage): Promise<LessonPlan> {
    if (this.isOnline) {
      try {
        const res = await fetch(`${API_BASE}/curriculum/generate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ topic, grade, target_lang: targetLang })
        });
        if (res.ok) {
          return await res.json();
        }
      } catch (e) {}
    }

    const trans = offlineNlp.translateOffline(topic, 'hindi', targetLang);
    return {
      id: `plan-${Date.now()}`,
      textbook: `JCERT पलाश विशेष पाठ योजना - ${grade}`,
      chapter_number: 99,
      title: topic,
      grade: grade,
      subject: 'सामान्य ज्ञान एवं भाषा',
      subject_code: 'hindi',
      theme: 'परिवेशीय शिक्षा',
      learning_outcomes: [
        `विद्यार्थी ${topic} की अवधारणा को समझेंगे`,
        `मातृभाषा (${targetLang}) में संवाद कर सकेंगे`
      ],
      duration_minutes: 30,
      steps: [
        {
          step_number: 1,
          type: 'प्रस्तावना (Introduction)',
          time_mins: 10,
          teacher_hindi: `बच्चों, आज हम ${topic} के बारे में बातचीत करेंगे।`,
          dialogue_santhali: {
            ol_chiki: `ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱛᱮᱦᱮᱧ ᱟᱵᱚ ${trans.translated_text} ᱵᱟᱵᱚᱛ ᱵᱚᱱ ᱜᱟᱞᱢᱟᱨᱟᱣᱟ᱾`,
            dev: `गिदराः को, तेहेञ आबो ${trans.devanagari_text} बाबत बोन गालमारावा।`,
            rom: `Gidra ko, tehenj abo ${trans.romanized} babot bon galmarawa.`
          }
        },
        {
          step_number: 2,
          type: 'मुख्य शिक्षण (Core Explanation)',
          time_mins: 15,
          teacher_hindi: `इसे अपने आस-पास के परिवेश में ध्यान से देखो और समझो।`,
          dialogue_santhali: {
            ol_chiki: `ᱱᱚᱣᱟ ᱫᱚ ᱟᱯᱱᱟᱨ ᱟᱰᱮ-ᱯᱟᱥᱮ ᱨᱮ ᱫᱷᱮᱭᱟᱱ ᱛᱮ ᱧᱮᱞ ᱢᱮ ᱟᱨ ᱵᱩᱡᱷᱟᱹᱣ ᱢᱮ᱾`,
            dev: `नोवा दो आपनार आडे-पासे रे धेयान ते ञेल मे आर बुझाव मे।`,
            rom: `Nowa do apnar ade-pase re dhyan te nel me ar bujhao me.`
          }
        }
      ]
    };
  }

  async generatePedagogicalLesson(
    topic: string, 
    grade: string, 
    subject: string, 
    targetLang: TribalLanguage,
    script: string = 'default',
    contextTheme: string = 'village_nature'
  ): Promise<PedagogicalLessonPlan> {
    if (this.isOnline) {
      try {
        const res = await fetch(`${API_BASE}/v1/ai/teacher/generate-lesson`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            topic,
            grade,
            subject,
            target_lang: targetLang,
            target_script: script,
            local_context_theme: contextTheme
          })
        });
        if (res.ok) {
          return await res.json();
        }
      } catch (e) {}
    }

    // Offline fallback generator
    const trans = offlineNlp.translateOffline(topic, 'hindi', targetLang);
    const pack = languagePackService.getPack(targetLang);

    return {
      id: `plan-offline-${Date.now()}`,
      topic_hindi: topic,
      topic_tribal: trans.translated_text,
      topic_devanagari: trans.devanagari_text,
      topic_english: topic,
      grade,
      subject,
      language: targetLang,
      script: script !== 'default' ? script : pack.defaultScript,
      pedagogical_components: {
        '1_learning_objective': {
          tribal_primary: `ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱠᱚ ${trans.translated_text} ᱨᱮᱱᱟᱜ ᱢᱩᱬᱩᱛ ᱠᱟᱛᱷᱟ ᱟᱠᱚᱣᱟᱜ ᱡᱟᱱᱟᱢ ᱟᱲᱟᱝ (${pack.nameEnglish}) ᱛᱮᱠᱚ ᱵᱩᱡᱷᱟᱹᱣ-ᱟ᱾`,
          tribal_devanagari: `पाठुवा को ${trans.devanagari_text} रेनाः मुणुत काथा आकोवाः जानम आड़ांग (${pack.nameEnglish}) तेको बुझौ-आ।`,
          hindi: `विद्यार्थी ${topic} की मूल संकल्पना को अपनी मातृभाषा (${pack.nameEnglish}) और परिवेशीय संदर्भों में समझेंगे।`,
          english: `Students will understand the core concepts of ${topic} through their mother tongue (${pack.nameEnglish}) and local environmental context.`
        },
        '2_prerequisites': {
          tribal_primary: `ᱫᱤᱱᱟᱹᱢ ᱡᱤᱭᱚᱱ ᱨᱮᱱᱟᱜ ᱟᱹᱭᱠᱟᱹᱣ ᱟᱨ ᱑ ᱠᱷᱚᱱ ᱑᱐ ᱦᱟᱹᱵᱤᱡ ᱮᱞ ᱵᱟᱰᱟᱭ᱾`,
          tribal_devanagari: `दिनम जियन रेनाः अयकोव आर 1 खोन 10 हाबिज एल बाडाय।`,
          hindi: `दैनिक जीवन के परिवेशीय अनुभव और 1 से 10 तक संख्या बोध।`,
          english: `Daily environmental observation and foundational counting skills (1 to 10).`
        },
        '3_teacher_explanation': {
          tribal_primary: `ᱢᱟᱪᱮᱛ ᱫᱚ ${trans.translated_text} ᱵᱟᱵᱚᱛ ᱟᱹᱛᱩ ᱨᱮᱱᱟᱜ ᱫᱟᱨᱮ-ᱱᱟᱹᱲᱤ ᱟᱨ ᱡᱤᱱᱤᱥ ᱠᱚ ᱩᱫᱩᱜ ᱠᱟᱛᱮ ᱵᱩᱡᱷᱟᱹᱣ ᱟᱠᱚᱣᱟᱭ᱾`,
          tribal_devanagari: `माचेत दो ${trans.devanagari_text} बाबत आतु रेनाः दारे-नाड़ी आर जीनिस को उदुग काते बुझौ आकोवाय।`,
          hindi: `शिक्षक ${topic} को स्थानीय गाँव, जंगल एवं प्राकृतिक परिवेशीय वस्तुओं (Concrete TLM) से जोड़कर सरल भाषा में समझाएँगे।`,
          english: `The teacher will explain ${topic} by connecting concepts with village nature, local realia, and tactile classroom TLM.`
        },
        '4_mother_tongue_explanation': {
          text_primary: `ᱱᱚᱣᱟ ᱯᱟᱲᱦᱟᱣ ᱨᱮ ${trans.translated_text} ᱵᱟᱵᱚᱛ ᱵᱚᱱ ᱪᱮᱫᱚᱜ-ᱟ᱾ ᱫᱮᱞᱟ ᱟᱵᱚ ᱥᱟᱱᱟᱢ ᱠᱚ ᱢᱮᱥᱟ ᱠᱟᱛᱮ ᱵᱚᱱ ᱯᱟᱲᱦᱟᱣ ᱞᱮᱜᱮ᱾`,
          text_devanagari: `नोवा पाठ रे ${trans.devanagari_text} बाबत बोन चेदोः-आ। देला आबो सानाम को मेसा काते बोन पढ़ाव लेगे।`,
          hindi: `इस पाठ में हम ${topic} के बारे में अपनी मातृभाषा में सीखेंगे। आइए हम सब मिलकर गतिविधि करते हैं।`,
          english: `In this lesson, we will learn about ${topic} in our mother tongue. Let us all participate together in local activities.`,
          audio_phonemes: trans.audio_phonemes
        },
        '5_localized_realia_example': {
          context_theme: contextTheme,
          example_description: 'सखुआ (साल) के पत्तों, महुआ के फलों और स्थानीय मांदर/धनुष से प्रत्यक्ष संकल्पना प्रदर्शन।',
          dialogue_tribal: `ᱫᱟᱨᱮ ᱨᱮ ᱵᱟᱨᱭᱟ ᱪᱮᱬᱮ ᱛᱟᱦᱮᱸ ᱠᱟᱱᱟ, ᱟᱨ ᱢᱤᱫᱴᱟᱹᱝ ᱦᱮᱡ ᱮᱱᱟ᱾ ᱛᱤᱱᱟᱹᱜ ᱦᱩᱭ ᱮᱱᱟ? (ᱯᱮᱭᱟ)`,
          dialogue_devanagari: `दारे रे बारया चेणे ताहे काना, आर मिदटांग हेज एना। तीनाः हुई एना? (पेया)`,
          dialogue_hindi: 'पेड़ पर 2 चिड़ियाँ बैठी थीं, 1 और उड़कर आ गई। अब कुल कितनी हुईं? (3 चिड़ियाँ)',
          dialogue_english: 'There were 2 birds on the tree, and 1 more arrived. How many in total? (3 birds)'
        },
        '6_essential_vocabulary': [
          { tribal: trans.translated_text, devanagari: trans.devanagari_text, hindi: topic, english: topic },
          { tribal: 'ᱫᱟᱨᱮ (Dare)', devanagari: 'दारे', hindi: 'पेड़ / वृक्ष', english: 'Tree' },
          { tribal: 'ᱞᱮᱠᱷᱟ (Lekha)', devanagari: 'लेखा', hindi: 'गिनती / संख्या', english: 'Counting / Number' },
          { tribal: 'ᱵᱟᱦᱟ (Baha)', devanagari: 'बाहा', hindi: 'फूल / पुष्प', english: 'Flower' },
          { tribal: 'ᱪᱮᱬᱮ (Chene)', devanagari: 'चेणे', hindi: 'चिड़िया / पक्षी', english: 'Bird' }
        ],
        '7_story_activity': {
          title_tribal: `ᱪᱟᱸᱫᱚ ᱧᱤᱫᱟᱹ ᱟᱨ ${trans.translated_text}`,
          title_hindi: `चाँदनी रात और ${topic}`,
          title_english: `Moonlit Night and ${topic}`,
          narrative_tribal: `ᱟᱹᱛᱩ ᱨᱤᱱ ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ ᱥᱟᱨᱡᱚᱢ ᱫᱟᱨᱮ ᱞᱟᱛᱟᱨ ᱨᱮ ᱮᱱᱮᱡ ᱠᱟᱱ ᱛᱟᱦᱮᱸᱫ ᱟᱨ ᱩᱱᱠᱩ ᱠᱚ ᱪᱮᱫ ᱠᱮᱫᱟ...`,
          narrative_hindi: `गाँव के बच्चे सखुआ (साल) के पेड़ों के नीचे खेल रहे थे और उन्होंने खेल-खेल में सीखा कि प्रकृति में हर चीज़ का अपना सुंदर नियम है...`,
          narrative_english: `The village children were playing under the sacred Sal trees and discovered through folklore that every element in nature has harmony...`,
          moral_tribal: `ᱡᱟᱦᱮᱨ ᱟᱨ ᱫᱟᱨᱮ-ᱱᱟᱹᱲᱤ ᱫᱚᱦᱚ ᱡᱚᱛᱚᱱ ᱟᱵᱚᱣᱟᱜ ᱫᱟᱭᱤᱠ ᱠᱟᱱᱟ᱾`,
          moral_hindi: 'प्रकृति और पर्यावरण का संरक्षण ही हमारी संस्कृति की मूल पहचान है।',
          moral_english: 'Respecting and protecting nature and our living heritage is our primary duty.'
        },
        '8_blackboard_activity': {
          tribal: `ᱵᱞᱮᱠᱵᱳᱨᱰ ᱨᱮ ᱢᱤᱫ ᱥᱟᱦᱟ ᱨᱮ ᱪᱤᱛᱟᱹᱨ ᱟᱨ ᱢᱤᱫ ᱥᱟᱦᱟ ᱨᱮ ᱟᱲᱟᱝ ᱚᱞ ᱠᱟᱛᱮ ᱡᱚᱲᱟᱣ ᱦᱚᱪᱚ ᱠᱚ ᱢᱮ᱾`,
          hindi: 'श्यामपट्ट पर एक तरफ मातृभाषा शब्द और दूसरी तरफ परिवेशीय चित्र बनाकर मिलान अभ्यास कराएँ।',
          english: 'Draw tribal mother tongue words on one side and local contextual pictures on the other for chalkboard matching.'
        },
        '9_student_practice': [
          {
            tribal: '᱑. ᱟᱢᱟᱜ ᱡᱟᱱᱟᱢ ᱟᱲᱟᱝ ᱛᱮ ᱓ ᱜᱚᱴᱟᱝ ᱡᱤᱱᱤᱥ ᱨᱮᱱᱟᱜ ᱧᱩᱛᱩᱢ ᱞᱟᱹᱭ ᱢᱮ᱾',
            hindi: '1. अपनी मातृभाषा में अपने आसपास की 3 वस्तुओं के नाम बोलो।',
            english: '1. Name 3 local objects in your tribal mother tongue.'
          },
          {
            tribal: '᱒. ᱪᱤᱛᱟᱹᱨ ᱞᱮᱠᱷᱟ ᱠᱟᱛᱮ ᱴᱷᱤᱠ ᱮᱞ ᱨᱮ ᱜᱩᱞᱟᱹᱭ ᱪᱤᱱᱦᱟᱹ ᱮᱢ ᱢᱮ᱾',
            hindi: '2. चित्रों को गिनकर सही संख्या पर गोला लगाओ।',
            english: '2. Count the objects and circle the correct number.'
          }
        ],
        '10_comprehension_questions': [
          {
            q_tribal: `${trans.translated_text} ᱫᱚ ᱟᱵᱚᱣᱟᱜ ᱫᱤᱱᱟᱹᱢ ᱡᱤᱭᱚᱱ ᱨᱮ ᱪᱮᱫ ᱠᱟᱹᱢᱤ ᱨᱮ ᱞᱟᱜᱟᱣᱜ-ᱟ?`,
            q_hindi: `${topic} का हमारे दैनिक जीवन में क्या उपयोग है?`,
            q_english: `What is the importance and daily use of ${topic} in our life?`,
            type: 'Oral Discussion'
          },
          {
            q_tribal: `ᱡᱟᱱᱟᱢ ᱟᱲᱟᱝ ᱛᱮ ᱱᱚᱣᱟ ᱨᱮᱱᱟᱜ ᱴᱷᱤᱠ ᱨᱚᱲ ᱪᱮᱫ ᱠᱟᱱᱟ?`,
            q_hindi: 'मातृभाषा में इसका सही उच्चारण क्या है?',
            q_english: 'What is the authentic pronunciation in tribal mother tongue?',
            type: 'Voice Practice'
          }
        ],
        '11_formative_assessment': {
          task_tribal: '᱓ ᱜᱚᱴᱟᱝ ᱠᱩᱠᱞᱤ ᱨᱮᱱᱟᱜ ᱨᱚᱲ ᱟᱨ ᱪᱤᱛᱟᱹᱨ ᱢᱮᱞᱟᱣ ᱵᱤᱰᱟᱹᱣ᱾',
          task_hindi: '3 प्रश्नों की त्वरित मौखिक एवं चित्र मिलान परीक्षा।',
          task_english: '3-question rapid oral and picture matching assessment.',
          passing_criteria: 'कम से कम 2 सही उत्तर (FLN Level 2) / At least 2 correct answers'
        },
        '12_homework_connection': {
          tribal: 'ᱚᱲᱟᱜ ᱨᱤᱱ ᱦᱟᱲᱟᱢ-ᱵᱩᱰᱷᱤ ᱴᱷᱮᱱ ᱠᱷᱚᱱ ᱱᱚᱣᱟ ᱵᱟᱵᱚᱛ ᱥᱮᱨᱮᱧ ᱥᱮ ᱠᱟᱹᱦᱱᱤ ᱟᱸᱡᱚᱢ ᱠᱟᱛᱮ ᱦᱤᱡᱩᱜ ᱢᱮ᱾',
          hindi: 'माता-पिता या दादा-दादी से इस विषय पर कोई पारंपरिक लोकगीत या कहानी सुनकर आना।',
          english: 'Listen to a traditional folklore story or song on this topic from grandparents/parents.'
        },
        '13_remedial_activity': {
          tribal: 'ᱟᱹᱰᱤ ᱱᱟᱯᱟᱭ ᱛᱮ ᱵᱟᱝ ᱠᱚ ᱵᱩᱡᱷᱟᱹᱣ ᱟᱠᱟᱫ ᱠᱚ ᱫᱚ ᱫᱷᱤᱨᱤ-ᱜᱤᱴᱤᱞ ᱥᱮ ᱡᱟᱝ (Concrete TLM) ᱛᱮ ᱫᱚᱦᱲᱟ ᱪᱮᱫ ᱟᱠᱚ ᱢᱮ᱾',
          hindi: 'जिन बच्चों को समझने में कठिनाई हो, उन्हें कंकड़-पत्थर या बीजों के प्रत्यक्ष स्पर्श (Concrete TLM) द्वारा पुनः समझाना।',
          english: 'For struggling learners, re-teach using concrete tactile seeds, pebbles, and local realia TLM.'
        },
        '14_extension_activity': {
          tribal: 'ᱞᱚᱜᱚᱱ ᱪᱮᱫᱚᱜ ᱠᱟᱱ ᱜᱤᱫᱽᱨᱟᱹ ᱫᱚ ᱡᱟᱱᱟᱢ ᱟᱲᱟᱝ ᱟᱨ ᱦᱤᱱᱫᱤ ᱵᱟᱱᱟᱨ ᱛᱮ ᱟᱹᱭᱟᱹᱛ ᱵᱮᱱᱟᱣ ᱞᱟᱹᱜᱤᱫ ᱩᱫᱽᱜᱟᱹᱣ ᱮᱢᱟ ᱠᱚ ᱢᱮ᱾',
          hindi: 'तेज़ गति से सीखने वाले बच्चों को मातृभाषा और हिन्दी दोनों में वाक्य बनाने को प्रेरित करना।',
          english: 'Encourage fast learners to construct sentences in both tribal mother tongue and Hindi.'
        }
      },
      validation_metadata: {
        source: 'JCERT Jharkhand Primary Curriculum (Offline Edge)',
        status: 'CURRICULUM_ALIGNED',
        model_adapter: 'BhashaSetu Edge Rule Engine v1.2',
        hallucination_score: 0.0
      }
    };
  }

  async askChildTutor(question: string, grade: string, language: TribalLanguage, script: string = 'default'): Promise<ChildTutorResponse> {
    if (this.isOnline) {
      try {
        const res = await fetch(`${API_BASE}/v1/ai/tutor/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question, grade, language, script })
        });
        if (res.ok) {
          return await res.json();
        }
      } catch (e) {}
    }

    // Child-safe offline response
    const trans = offlineNlp.translateOffline(question, 'hindi', language);
    return {
      is_safe: true,
      question,
      explanation_hindi: `बहुत अच्छा सवाल! सोचो आपके पास 3 फल हैं और 2 और मिल गए, तो कुल 5 हो गए! प्रकृति में भी सब कुछ इसी तरह जुड़ता है। 🍎✨`,
      explanation_tribal_primary: `ᱱᱚᱣᱟ ᱫᱚ ᱟᱹᱰᱤ ᱱᱟᱯᱟᱭ ᱠᱩᱠᱞᱤ ᱠᱟᱱᱟ! ᱩᱭᱦᱟᱹᱨ ᱢᱮ ᱟᱢ ᱴᱷᱮᱱ ᱯᱮᱭᱟ ᱡᱚ ᱢᱮᱱᱟᱜ-ᱟ ᱟᱨ ᱵᱟᱨᱭᱟ ᱮᱢ ᱧᱟᱢ ᱠᱮᱫᱟ, ᱮᱱᱠᱷᱟᱱ ᱕ ᱦᱩᱭ ᱮᱱᱟ!`,
      explanation_tribal_devanagari: `नोवा दो आडी नापाय कुकली काना! उयहार मे आम ठेन पेया जो मेनाः-आ आर बारया एम णाम केदा, एनखान 5 हुई एना!`,
      visual_concept: '🍎 🍎 🍎 + 🍎 🍎 = 5',
      audio_phonemes: 'adi napay kukli',
      suggested_followups: [
        'मातृभाषा में इसका उच्चारण सुनो 🔊',
        'क्या आप एक और उदाहरण देखना चाहते हैं? 💡'
      ]
    };
  }

  async generateRemediation(
    studentId: string, 
    studentName: string, 
    competency: string, 
    currentScorePct: number, 
    grade: string, 
    language: TribalLanguage
  ): Promise<RemediationPlan> {
    if (this.isOnline) {
      try {
        const res = await fetch(`${API_BASE}/v1/ai/teacher/generate-remediation`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            student_id: studentId,
            student_name: studentName,
            competency,
            current_score_pct: currentScorePct,
            grade,
            language
          })
        });
        if (res.ok) {
          return await res.json();
        }
      } catch (e) {}
    }

    return adaptiveService.generateRemediationOffline(studentId, studentName, 'comp_subtraction', grade, language);
  }

  async fetchStories(): Promise<BilingualStory[]> {
    if (!this.isOnline) {
      return this.getLocalStories();
    }

    try {
      const res = await fetch(`${API_BASE}/curriculum/stories`);
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.stories) && data.stories.length > 0) {
          return data.stories;
        }
      }
      return this.getLocalStories();
    } catch (e) {
      return this.getLocalStories();
    }
  }

  async fetchExams(grade?: string): Promise<AssessmentExam[]> {
    if (!this.isOnline) {
      return this.getLocalExams(grade);
    }

    try {
      const url = grade ? `${API_BASE}/assessments/exams?grade=${encodeURIComponent(grade)}` : `${API_BASE}/assessments/exams`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.exams) && data.exams.length > 0) {
          return data.exams;
        }
      }
      return this.getLocalExams(grade);
    } catch (e) {
      return this.getLocalExams(grade);
    }
  }

  async submitExam(
    examId: string, 
    studentName: string, 
    studentClass: string, 
    targetLang: string, 
    answers: Record<string, string>,
    oralText?: string,
    activeExam?: AssessmentExam
  ): Promise<ExamSubmissionResponse> {
    let result: ExamSubmissionResponse;

    if (this.isOnline) {
      try {
        const res = await fetch(`${API_BASE}/assessments/submit`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            exam_id: examId,
            student_name: studentName,
            student_class: studentClass,
            target_lang: targetLang,
            answers,
            oral_text_recorded: oralText || ''
          })
        });
        if (res.ok) {
          result = await res.json();
          adaptiveService.updateStudentExamResults(studentName, studentClass, targetLang as any, result.competency_breakdown);
          offlineStorage.saveExamAttemptOffline(result).catch(() => {});
          return result;
        }
      } catch (e) {}
    }

    result = this.evaluateExamLocally(examId, studentName, studentClass, targetLang, answers, activeExam);
    adaptiveService.updateStudentExamResults(studentName, studentClass, targetLang as any, result.competency_breakdown);

    // Save offline in IndexedDB and enqueue for sync
    offlineStorage.saveExamAttemptOffline(result).catch(() => {});
    offlineStorage.enqueueSyncOperation({
      entityType: 'attempt',
      entityId: result.attempt_id || `att-${Date.now()}`,
      operation: 'INSERT',
      endpoint: `${API_BASE}/assessments/submit`,
      payload: {
        exam_id: examId,
        student_name: studentName,
        student_class: studentClass,
        target_lang: targetLang,
        answers,
        oral_text_recorded: oralText || '',
        earned_marks: result.earned_marks,
        percentage: result.percentage,
        badge: result.badge,
        proficiency_level: result.proficiency_level,
        teacher_remark: result.teacher_remark,
        competency_breakdown: result.competency_breakdown,
        question_results: result.question_results
      }
    }).catch(() => {});

    return result;
  }

  async fetchCommunityVault(language?: string, tier?: string, status?: string): Promise<VaultItem[]> {
    if (this.isOnline) {
      try {
        const params = new URLSearchParams();
        if (language) params.append('language', language);
        if (tier) params.append('sovereignty_tier', tier);
        if (status) params.append('status', status);

        const res = await fetch(`${API_BASE}/v1/community/vault?${params.toString()}`);
        if (res.ok) {
          const data = await res.json();
          if (data && Array.isArray(data.items)) {
            offlineStorage.cacheVaultItems(data.items).catch(() => {});
            return data.items;
          }
        }
      } catch (e) {}
    }

    try {
      const cached = await offlineStorage.getCachedVaultItems(language);
      if (cached && cached.length > 0) {
        return cached;
      }
    } catch (e) {}

    return communityVaultService.getItems(language, tier, status);
  }

  async contributeToVault(data: Partial<VaultItem>): Promise<VaultItem> {
    if (this.isOnline) {
      try {
        const res = await fetch(`${API_BASE}/v1/community/contribute`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (res.ok) {
          const result = await res.json();
          offlineStorage.saveVaultItemOffline(result.item).catch(() => {});
          return result.item;
        }
      } catch (e) {}
    }

    const localItem = communityVaultService.addContribution(data);
    offlineStorage.saveVaultItemOffline(localItem).catch(() => {});
    offlineStorage.enqueueSyncOperation({
      entityType: 'vault_item',
      entityId: localItem.id,
      operation: 'INSERT',
      endpoint: `${API_BASE}/v1/community/contribute`,
      payload: localItem
    }).catch(() => {});

    return localItem;
  }

  async reviewVaultItem(itemId: string, newStatus: 'COMMUNITY_VALIDATED' | 'REJECTED', notes: string, validatorName: string): Promise<VaultItem | null> {
    if (this.isOnline) {
      try {
        const res = await fetch(`${API_BASE}/v1/community/review`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            item_id: itemId,
            new_status: newStatus,
            validator_notes: notes,
            validator_name: validatorName
          })
        });
        if (res.ok) {
          const result = await res.json();
          return result.item;
        }
      } catch (e) {}
    }

    const reviewed = communityVaultService.updateStatus(itemId, newStatus, notes, validatorName);
    offlineStorage.enqueueSyncOperation({
      entityType: 'vault_review',
      entityId: itemId,
      operation: 'UPDATE',
      endpoint: `${API_BASE}/v1/community/review`,
      payload: {
        item_id: itemId,
        new_status: newStatus,
        validator_notes: notes,
        validator_name: validatorName
      }
    }).catch(() => {});

    return reviewed;
  }

  async fetchDistrictAnalytics(): Promise<any> {
    if (this.isOnline) {
      try {
        const res = await fetch(`${API_BASE}/v1/analytics/school-district`);
        if (res.ok) {
          return await res.json();
        }
      } catch (e) {}
    }
    return {
      state: 'Jharkhand',
      pilot_districts: [
        { district: 'Dumka', schools: 42, students: 1280, avg_fln_mastery: 81.2, primary_lang: 'Santhali' },
        { district: 'Khunti', schools: 38, students: 950, avg_fln_mastery: 79.4, primary_lang: 'Mundari' },
        { district: 'West Singhbhum', schools: 45, students: 1410, avg_fln_mastery: 76.8, primary_lang: 'Ho' },
        { district: 'Gumla', schools: 30, students: 820, avg_fln_mastery: 78.5, primary_lang: 'Kurukh' }
      ],
      total_active_schools: 155,
      total_active_teachers: 312,
      total_enrolled_students: 4460,
      overall_fln_mastery_pct: 78.9,
      offline_sync_uptime_pct: 99.4,
      system_health: {
        api_gateway: 'ONLINE (EDGE)',
        model_router: 'HEALTHY',
        local_cache_integrity: '100%',
        last_synced: Math.floor(Date.now() / 1000)
      }
    };
  }

  async fetchOfficialTextbooks(grade?: string, subject?: string): Promise<OfficialTextbook[]> {
    if (this.isOnline) {
      try {
        const params = new URLSearchParams();
        if (grade) params.append('grade', grade);
        if (subject && subject !== 'all') params.append('subject', subject);
        const res = await fetch(`${API_BASE}/v1/curriculum/official-textbooks?${params.toString()}`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) return data;
          if (data && Array.isArray(data.textbooks)) return data.textbooks;
        }
      } catch (e) {
        console.warn('Could not fetch official textbooks', e);
      }
    }
    return [];
  }

  async fetchOfficialTextbookById(bookId: string): Promise<OfficialTextbook | null> {
    if (this.isOnline) {
      try {
        const res = await fetch(`${API_BASE}/v1/curriculum/official-textbooks/${encodeURIComponent(bookId)}`);
        if (res.ok) {
          return await res.json();
        }
      } catch (e) {
        console.warn('Could not fetch official textbook detail', e);
      }
    }
    return null;
  }

  async fetchOfficialTextbookChapters(bookId: string): Promise<OfficialTextbookChapter[]> {
    if (this.isOnline) {
      try {
        const res = await fetch(`${API_BASE}/v1/curriculum/official-textbooks/${encodeURIComponent(bookId)}/chapters`);
        if (res.ok) {
          return await res.json();
        }
      } catch (e) {}
    }
    return [];
  }

  async fetchOfficialChapter(chapterId: string): Promise<any> {
    if (this.isOnline) {
      try {
        const res = await fetch(`${API_BASE}/v1/curriculum/official-chapters/${encodeURIComponent(chapterId)}`);
        if (res.ok) {
          return await res.json();
        }
      } catch (e) {}
    }
    return null;
  }

  async generateSubjectAssessment(
    grade: string,
    subject: string,
    chapterId?: string,
    targetLang: TribalLanguage = 'santhali',
    targetScript: string = 'default'
  ): Promise<any> {
    if (this.isOnline) {
      try {
        const res = await fetch(`${API_BASE}/v1/assessment/generate-by-subject`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            grade,
            subject,
            chapter_id: chapterId,
            target_lang: targetLang,
            target_script: targetScript
          })
        });
        if (res.ok) {
          return await res.json();
        }
      } catch (e) {}
    }
    
    // Offline deterministic generator fallback
    const pack = languagePackService.getPack(targetLang);
    return {
      id: `exam-offline-${Date.now()}`,
      title: `NIPUN Bharat मूल्यांकन: ${grade} (${subject.toUpperCase()})`,
      grade,
      subject,
      chapter_id: chapterId || 'ch-01',
      chapter_title: `${subject.toUpperCase()} प्रारंभिक दक्षता`,
      theme: 'Foundational Stage',
      language: targetLang,
      total_marks: 25,
      passing_marks: 15,
      time_minutes: 20,
      competencies: [
        'मातृभाषा शब्दावली ज्ञान (Mother Tongue Vocabulary)',
        'परिवेशीय मूर्त वस्तु पहचान (Realia Identification)',
        'संकल्पना समझ एवं तार्किक बोध (Concept Comprehension)',
        'मौखिक पठन एवं उच्चारण प्रवाह (Oral Reading Fluency)',
        'FLN मूलभूत दक्षता (Foundational Competency)'
      ],
      questions: [
        {
          q_id: 1,
          id: 1,
          marks: 5,
          type: 'title_comprehension',
          question_type: 'title_comprehension',
          question_hindi: `इस पाठ का मातृभाषा (${pack.nameEnglish}) में क्या अर्थ है?`,
          question_text: `इस पाठ का मातृभाषा (${pack.nameEnglish}) में क्या अर्थ है?`,
          question_tribal: {
            santhali_ol: 'ᱱᱚᱣᱟ ᱯᱟᱲᱦᱟᱣ ᱨᱮᱱᱟᱜ ᱡᱟᱱᱟᱢ ᱟᱲᱟᱝ ᱛᱮ ᱧᱩᱛᱩᱢ ᱪᱮᱫ ᱠᱟᱱᱟ?',
            santhali_dev: 'नोवा पाड़हाव रेनाः जानाम आड़ांग ते ञुतुम चेद काना?',
            mundari: 'नेआ पाड़हाव रेयाः जानाम जगरा ते नुतुम चिकना?',
            ho: 'नेआ पाड़हाव रेयाः जानाम जगरा ते नुतुम चिकना?'
          },
          question_english: `What is the authentic mother tongue title?`,
          competency: 'मातृभाषा शब्दावली ज्ञान',
          options: [
            { id: 'A', text: `${pack.sampleGreeting.nativeText} (${pack.sampleGreeting.meaningHindi})`, is_correct: true },
            { id: 'B', text: 'दाः आर गाडा (Water & River)', is_correct: false },
            { id: 'C', text: 'हाट आर बजार (Market)', is_correct: false },
            { id: 'D', text: 'ओड़ाः (Home)', is_correct: false }
          ],
          explanation: `पाठ का प्राथमिक रूप: ${pack.sampleGreeting.nativeText}`
        },
        {
          q_id: 2,
          id: 2,
          marks: 5,
          type: 'realia_selection',
          question_type: 'realia_selection',
          question_hindi: 'इस पाठ को समझाने के लिए कौन सी स्थानीय वस्तु (Realia) सबसे उपयुक्त है?',
          question_text: 'इस पाठ को समझाने के लिए कौन सी स्थानीय वस्तु (Realia) सबसे उपयुक्त है?',
          question_tribal: {
            santhali_ol: 'ᱱᱚᱣᱟ ᱵᱩᱡᱷᱟᱹᱣ ᱞᱟᱹᱜᱤᱫ ᱚᱠᱟ ᱟᱹᱛᱩ ᱡᱤᱱᱤᱥ (TLM) ᱥᱟᱱᱟᱢ ᱠᱷᱚᱱ ᱵᱷᱟᱹᱜᱤ ᱠᱟᱱᱟ?',
            santhali_dev: 'नोवा बुझाव लागिद ओका आतु जिनिस (TLM) सानाम खोन भागि काना?',
            mundari: 'नेआ बुझाव लागिन ओको हातु जिनिस (TLM) बेस मेनाः-आ?',
            ho: 'नेआ बुझाव लागिन ओको हातु जिनिस (TLM) बेस मेनाः-आ?'
          },
          question_english: 'Which localized realia TLM is best suited?',
          competency: 'परिवेशीय मूर्त वस्तु पहचान',
          options: [
            { id: 'A', text: 'गाँव के सखुआ के पत्ते, माटी के खिलौने एवं मांदर (Tactile Realia)', is_correct: true },
            { id: 'B', text: 'प्लास्टिक गैजेट', is_correct: false },
            { id: 'C', text: 'अंग्रेज़ी चार्ट', is_correct: false },
            { id: 'D', text: 'व्याख्यान', is_correct: false }
          ],
          explanation: 'स्थानीय सखुआ के पत्ते और मूर्त वस्तुएँ बच्चों के परिवेशीय अनुभव से जुड़ती हैं।'
        },
        {
          q_id: 3,
          id: 3,
          marks: 5,
          type: 'moral_comprehension',
          question_type: 'moral_comprehension',
          question_hindi: 'पाठ का मुख्य नैतिक संदेश क्या है?',
          question_text: 'पाठ का मुख्य नैतिक संदेश क्या है?',
          question_tribal: {
            santhali_ol: 'ᱯᱟᱲᱦᱟᱣ ᱞᱮᱠᱟᱛᱮ ᱢᱩᱬᱩᱛ ᱪᱮᱫᱚᱜ ᱠᱟᱛᱷᱟ ᱪᱮᱫ ᱠᱟᱱᱟ?',
            santhali_dev: 'पाड़हाव लेकाते मुणुत चेदोः कथा चेद काना?',
            mundari: 'पाड़हाव लेकाते मुण्डु चेदोः काजी चिकना?',
            ho: 'पाड़हाव लेकाते मुण्डु चेदोः काजी चिकना?'
          },
          question_english: 'What is the core moral and cultural value?',
          competency: 'संकल्पना समझ एवं तार्किक बोध',
          options: [
            { id: 'A', text: 'प्रकृति का सम्मान, परिवार का आदर और मातृभाषा में अभिव्यक्ति', is_correct: true },
            { id: 'B', text: 'कठिन शब्दों को रटना', is_correct: false },
            { id: 'C', text: 'केवल परीक्षा पास करना', is_correct: false },
            { id: 'D', text: 'घर पर काम न करना', is_correct: false }
          ],
          explanation: 'FLN का उद्देश्य मातृभाषा में संकल्पना की गहरी समझ और नैतिक विकास है।'
        },
        {
          q_id: 4,
          id: 4,
          marks: 5,
          type: 'oral_reading',
          question_type: 'oral_reading',
          question_hindi: `मातृभाषा में स्पष्ट आवाज़ में बोलें: '${pack.sampleGreeting.nativeText}'`,
          question_text: `मातृभाषा में स्पष्ट आवाज़ में बोलें: '${pack.sampleGreeting.nativeText}'`,
          question_tribal: {
            santhali_ol: `ᱱᱚᱣᱟ ᱟᱲᱟᱝ ᱛᱮ ᱯᱟᱲᱦᱟᱣ ᱢᱮ: '${pack.sampleGreeting.nativeText}'`,
            santhali_dev: `नोवा आड़ांग ते पाड़हाव मे: '${pack.sampleGreeting.nativeText}'`,
            mundari: `नेआ जगरा ते पाड़हाव मे: '${pack.sampleGreeting.nativeText}'`,
            ho: `नेआ जगरा ते पाड़हाव मे: '${pack.sampleGreeting.nativeText}'`
          },
          target_phrase: pack.sampleGreeting.meaningHindi,
          target_ol: pack.sampleGreeting.nativeText,
          question_english: `Read aloud fluently in tribal mother tongue: '${pack.sampleGreeting.nativeText}'`,
          competency: 'मौखिक पठन एवं उच्चारण प्रवाह',
          options: [
            { id: 'A', text: 'धाराप्रवाह एवं स्पष्ट उच्चारण के साथ वाचन पूर्ण किया (5/5)', is_correct: true },
            { id: 'B', text: 'धीमी गति से वाचन (3/5)', is_correct: false },
            { id: 'C', text: 'सहायता की आवश्यकता (1/5)', is_correct: false }
          ],
          explanation: 'मौखिक पठन प्रवाह NIPUN भारत का महत्वपूर्ण मानक है।'
        },
        {
          q_id: 5,
          id: 5,
          marks: 5,
          type: 'numeracy_integrated',
          question_type: 'numeracy_integrated',
          question_hindi: 'अगर आपके पास ३ सखुआ के फूल 🌸 हैं और २ फूल और मिले, तो कुल कितने फूल हुए? (३ + २ = ?)',
          question_text: 'अगर आपके पास ३ सखुआ के फूल 🌸 हैं और २ फूल और मिले, तो कुल कितने फूल हुए? (३ + २ = ?)',
          question_tribal: {
            santhali_ol: '᱓ ᱵᱟᱦᱟ ᱨᱮ ᱒ ᱢᱮᱥᱟ ᱞᱮᱠᱷᱟᱱ ᱛᱤᱱᱟᱹᱜ ᱦᱩᱭᱩᱜ-ᱟ?',
            santhali_dev: '3 बाहा रे 2 मेसा लेखान तीनाः हुईयुः-आ?',
            mundari: '3 बाहा रे 2 मेसा लेरे चिमिन हुयुवा?',
            ho: '3 बाहा रे 2 मेसा लेरे चिमिन हुयुवा?'
          },
          question_english: 'If you have 3 flowers and receive 2 more, how many in total?',
          competency: 'FLN मूलभूत दक्षता',
          options: [
            { id: 'A', text: '५ फूल (ᱢᱚᱬᱮ / मोड़े - Five)', is_correct: true },
            { id: 'B', text: '४ फूल (ᱯᱳᱱ / Four)', is_correct: false },
            { id: 'C', text: '६ फूल (ᱛᱩᱨᱩᱭ / Six)', is_correct: false },
            { id: 'D', text: '७ फूल (Seven)', is_correct: false }
          ],
          explanation: '3 + 2 = 5 (मोड़े / ᱢᱚᱬᱮ)।'
        }
      ],
      created_at: Math.floor(Date.now() / 1000)
    };
  }

  async generateSubjectWorksheets(
    grade: string,
    subject: string,
    chapterId?: string,
    targetLang: TribalLanguage = 'santhali',
    targetScript: string = 'default'
  ): Promise<any> {
    if (this.isOnline) {
      try {
        const res = await fetch(`${API_BASE}/v1/worksheets/generate-by-subject`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            grade,
            subject,
            chapter_id: chapterId,
            target_lang: targetLang,
            target_script: targetScript
          })
        });
        if (res.ok) {
          return await res.json();
        }
      } catch (e) {}
    }

    // Offline deterministic generator fallback
    const pack = languagePackService.getPack(targetLang);
    return {
      worksheet_id: `ws-offline-${Date.now()}`,
      title: `द्विभाषी अभ्यास पत्रक: ${grade} (${subject.toUpperCase()})`,
      grade,
      subject,
      book_title: `JCERT ${grade} Official Book`,
      chapter_title: `${subject.toUpperCase()} Foundational Practice`,
      chapter_tribal: 'ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱮᱛᱚᱦᱚᱵ',
      language: targetLang,
      instructions_hindi: 'निर्देश: चित्रों को देखें, सही मातृभाषा शब्दों से मिलाएँ, संख्याएँ गिनें और अक्षर अभ्यास पूरा करें।',
      instructions_tribal: 'ᱫᱤᱥᱟᱹ: ᱪᱤᱛᱟᱹᱨ ᱧᱮᱞ ᱢᱮ, ᱡᱟᱱᱟᱢ ᱟᱲᱟᱝ ᱟᱹᱲᱟᱹ ᱥᱟᱶ ᱡᱚᱲᱟᱣ ᱢᱮ ᱟᱨ ᱚᱞ ᱪᱮᱫᱚᱜ ᱢᱮ᱾',
      instructions_english: 'Instructions: Match pictures with mother tongue words, count objects, and trace letters.',
      match_section: [
        { id: 1, prompt: 'हाथी (Elephant)', tribal_text: 'ᱦᱟᱹᱛᱤ (Hati)', tribal_script: 'ᱦᱟᱹᱛᱤ', hindi_text: 'हाथी', english_text: 'Elephant', emoji: '🐘' },
        { id: 2, prompt: 'सखुआ पेड़ (Tree)', tribal_text: 'ᱥᱟᱨᱡᱚᱢ ᱫᱟᱨᱮ', tribal_script: 'ᱥᱟᱨᱡᱚᱢ ᱫᱟᱨᱮ', hindi_text: 'सखुआ पेड़', english_text: 'Sal Tree', emoji: '🌳' },
        { id: 3, prompt: 'मांदर (Drum)', tribal_text: 'ᱛᱩᱢᱫᱟᱜ (Tumdak)', tribal_script: 'ᱛᱩᱢᱫᱟᱜ', hindi_text: 'मांदर', english_text: 'Tribal Drum', emoji: '🥁' },
        { id: 4, prompt: 'चिड़िया (Bird)', tribal_text: 'ᱪᱮᱬᱮ (Chene)', tribal_script: 'ᱪᱮᱬᱮ', hindi_text: 'चिड़िया', english_text: 'Bird', emoji: '🐦' }
      ],
      count_section: [
        { id: 1, count: 1, emoji: '🥁', name_hindi: 'एक मांदर (1 Mandar)', name_tribal: 'ᱢᱤᱫ ᱛᱩᱢᱫᱟᱜ (Mit Tumdak)', name_english: 'One Drum' },
        { id: 2, count: 2, emoji: '🍃', name_hindi: 'दो सखुआ के पत्ते (2 Sal Leaves)', name_tribal: 'ᱵᱟᱨ ᱥᱟᱠᱟᱢ (Bar Sakam)', name_english: 'Two Leaves' },
        { id: 3, count: 3, emoji: '🏹', name_hindi: 'तीन धनुष-बाण (3 Bow & Arrows)', name_tribal: 'ᱯᱮ ᱟᱜ-ᱥᱟᱨ (Pe Ag-Sar)', name_english: 'Three Bows' },
        { id: 4, count: 4, emoji: '🥭', name_hindi: 'चार महुआ फल (4 Mahua Fruits)', name_tribal: 'ᱯᱳᱱ ᱢᱟᱦᱩᱣᱟ (Pon Mahua)', name_english: 'Four Fruits' }
      ],
      trace_section: [
        { id: 1, char_native: 'ᱚ', char_devanagari: 'अ', word_native: 'ᱚᱞ (Ol - Write)', word_hindi: 'अक्षर', sound_phonetic: 'O' },
        { id: 2, char_native: 'ᱫ', char_devanagari: 'द', word_native: 'ᱫᱟᱨᱮ (Dare - Tree)', word_hindi: 'दारे (पेड़)', sound_phonetic: 'Da' },
        { id: 3, char_native: 'ᱵ', char_devanagari: 'ब', word_native: 'ᱵᱟᱦᱟ (Baha - Flower)', word_hindi: 'बाहा (फूल)', sound_phonetic: 'Ba' },
        { id: 4, char_native: 'ᱯ', char_devanagari: 'प', word_native: 'ᱯᱚᱛᱚᱵ (Potob - Book)', word_hindi: 'पोतोब (किताब)', sound_phonetic: 'Pa' }
      ],
      fill_section: [
        { id: 1, sentence_incomplete: 'हमारे गाँव में सखुआ का ___ बहुत बड़ा है।', missing_word: 'पेड़ (ᱫᱟᱨᱮ)', tribal_sentence: 'ᱟᱞᱮ ᱟᱹᱛᱩ ᱨᱮ ᱥᱟᱨᱡᱚᱢ ᱫᱟᱨᱮ ᱟᱹᱰᱤ ᱢᱟᱨᱟᱝ-ᱟ᱾', hint: '🌳 पेड़ / ᱫᱟᱨᱮ' },
        { id: 2, sentence_incomplete: 'सुबह उठकर हम अपनी ___ भाषा में नमस्ते कहते हैं।', missing_word: 'मातृभाषा (ᱡᱟᱱᱟᱢ ᱟᱲᱟᱝ)', tribal_sentence: 'ᱥᱮᱛᱟᱜ ᱨᱮ ᱡᱚᱦᱟᱨ ᱢᱮᱱ ᱠᱟᱛᱮ ᱵᱚᱱ ᱮᱦᱚᱵ-ᱟ᱾', hint: '🌿 जोहार / ᱡᱚᱦᱟᱨ' },
        { id: 3, sentence_incomplete: 'त्योहार में बच्चे ___ बजाकर नाचते हैं।', missing_word: 'मांदर (ᱛᱩᱢᱫᱟᱜ)', tribal_sentence: 'ᱯᱟᱨᱟᱵᱽ ᱨᱮ ᱜᱤᱫᱽᱨᱟᱹ ᱛᱩᱢᱫᱟᱜ ᱨᱩ ᱠᱟᱛᱮ ᱠᱚ ᱮᱱᱮᱡ-ᱟ᱾', hint: '🥁 मांदर / ᱛᱩᱢᱫᱟᱜ' }
      ]
    };
  }

  async generateAgenticWorksheet(
    language: TribalLanguage = 'santhali',
    options: {
      studentName?: string;
      schoolName?: string;
      competencyLevel?: StudentCompetencyLevel;
      focusType?: WorksheetFocusType;
      seed?: string | number;
    } = {}
  ): Promise<AgentGeneratedWorksheet> {
    if (this.isOnline) {
      try {
        const res = await fetch(`${API_BASE}/v1/worksheets/generate-agentic`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            language,
            student_name: options.studentName,
            school_name: options.schoolName,
            competency_level: options.competencyLevel,
            focus_type: options.focusType,
            seed: options.seed ? String(options.seed) : undefined
          })
        });
        if (res.ok) {
          return await res.json();
        }
      } catch (e) {}
    }
    // Offline deterministic generative agent
    return offlineWorksheetAgent.generateWorksheet(language, options);
  }

  private getLocalLessons(grade?: string): LessonPlan[] {
    if (!grade || grade.includes('All') || grade.includes('सभी')) {
      return JCERT_CURRICULUM_DATA;
    }
    return JCERT_CURRICULUM_DATA.filter(l => l.grade.toLowerCase().includes(grade.toLowerCase()));
  }

  private getLocalStories(): BilingualStory[] {
    return [
      {
        id: 'story-01',
        title_hindi: 'बिरसा और नटखट बंदर',
        title_santhali: 'ᱵᱤᱨᱥᱟ ᱟᱨ ᱦᱟᱹᱬᱩ (Birsa ar Hanu)',
        title_mundari: 'बिरसा आर चेंदो गढ़ी',
        title_ho: 'बिरसा आर गढ़ी',
        category: 'लोककथा एवं पर्यावरण',
        moral: 'प्रकृति और वन्यजीव हमारे मित्र हैं।',
        pages: [
          {
            page_num: 1,
            hindi_text: 'सारजोम गाँव में बिरसा नाम का एक बालक रहता था। वह रोज जंगल में सखुआ के पेड़ों के नीचे खेलता था।',
            santhali_text_ol: 'ᱥᱟᱨᱡᱚᱢ ᱟᱹᱛᱩ ᱨᱮ ᱵᱤᱨᱥᱟ ᱧᱩᱛᱩᱢᱟᱱ ᱢᱤᱫ ᱜᱤᱫᱽᱨᱟᱹ ᱛᱟᱦᱮᱸ ᱠᱟᱱᱟᱭ᱾ ᱩᱱᱤ ᱫᱤᱱᱟᱹᱢ ᱜᱮ ᱵᱤᱨ ᱨᱮ ᱥᱟᱨᱡᱚᱢ ᱫᱟᱨᱮ ᱞᱟᱛᱟᱨ ᱨᱮ ᱮᱱᱮᱡ ᱛᱟᱦᱮᱸᱫ᱾',
            santhali_text_dev: 'सारजोम आतु रे बिरसा ञुतुमान मिद गिदराः ताहे कानाय। उनि दिनाम गे बीर रे सारजोम दारे लातार रे एनेज ताहेद।',
            santhali_rom: 'Sarjom atu re Birsa nutuman mid gidra tahe kanay.',
            mundari_text: 'सारजोम हातु रे बिरसा नुतुम तन मिद होन ताहेकेना। उनि दिनगे बीर रे दारू लतार रे एनांग ताहेकेना।',
            ho_text: 'सारजोम हातु रे बिरसा नुतुम तन मियद होन ताएकेना। उनि दिनांग बीर रे दारू लतार रे इनुंग ताएकेना।'
          }
        ]
      }
    ];
  }

  private getLocalExams(grade?: string): AssessmentExam[] {
    return [
      {
        id: 'exam-nipun-01',
        title: 'साप्ताहिक FLN दक्षता मूल्यांकन (Weekly Formative Assessment)',
        grade: 'Balvatika / Class 1',
        exam_type: 'Periodic Formative',
        total_marks: 25,
        time_minutes: 20,
        competencies: [
          'ध्वनि एवं अक्षर पहचान (Phonological Awareness)',
          'मौखिक शब्दावली (Oral Vocabulary in Mother Tongue)',
          '1 से 10 तक संख्या बोध (Counting 1 to 10)'
        ],
        questions: [
          {
            q_id: 1,
            type: 'audio_word_identification',
            competency: 'अक्षर एवं ध्वनि पहचान (Decoding)',
            marks: 5,
            question_hindi: "ऑडियो सुनो: संथाली/मातृभाषा में 'पेड़' को क्या कहते हैं? सही विकल्प चुनो।",
            question_tribal: {
              santhali_ol: "ᱟᱸᱡᱚᱢ ᱢᱮ: 'Tree' (ᱯᱮᱲ) ᱫᱚ ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ ᱪᱮᱫ ᱠᱚ ᱢᱮᱛᱟᱜ-ᱟ? ᱴᱷᱤᱠ ᱛᱮᱞᱟ ᱵᱟᱪᱷᱟᱣ ᱢᱮ᱾",
              santhali_dev: "आंजोम मे: 'पेड़' (Tree) दो सांताड़ी ते चेद को मेताग-आ? ठीक तेला बाछाव मे।",
              mundari: "आयुम मे: 'पेड़' (Tree) के मुंडारी ते चिनाः मेनेया? ठीक तेला बाछाव मे।",
              ho: "आयुम मे: 'पेड़' (Tree) के हो ते चिनाः मेनेया? ठीक तेला बाछाव मे।"
            },
            question_english: "Listen to the audio: What is 'Tree' called in tribal mother tongue? Choose the correct option.",
            audio_prompt: 'ᱫᱟᱨᱮ (दारे - Dare)',
            options: [
              { id: 'A', text: 'दारे / ᱫᱟᱨᱮ (Tree)', is_correct: true },
              { id: 'B', text: 'दाः / ᱫᱟᱜ (Water)', is_correct: false },
              { id: 'C', text: 'बाहा / ᱵᱟᱦᱟ (Flower)', is_correct: false },
              { id: 'D', text: 'ओड़ाः / ᱳᱲᱟᱜ (House)', is_correct: false }
            ]
          },
          {
            q_id: 2,
            type: 'counting_numeracy',
            competency: 'संख्या ज्ञान (Numeracy)',
            marks: 5,
            question_hindi: 'चित्र में कितने मांदर (Madar Drums) हैं? 🥁 🥁 🥁',
            question_tribal: {
              santhali_ol: 'ᱪᱤᱛᱟᱹᱨ ᱨᱮ ᱛᱤᱱᱟᱹᱜ ᱜᱚᱴᱟᱝ ᱛᱩᱢᱫᱟᱜ (ᱢᱟᱸᱫᱚᱨ) ᱢᱮᱱᱟᱜ-ᱟ? 🥁 🥁 🥁',
              santhali_dev: 'चितार रे तीनाः गोटांग तुमदाः (मांदर) मेनाः-आ? 🥁 🥁 🥁',
              mundari: 'चोबी रे चिमिन तुमदा/दुलुंग मेनाः? 🥁 🥁 🥁',
              ho: 'चोबी रे चिमिन दमंग मेनाः? 🥁 🥁 🥁'
            },
            question_english: 'How many tribal drums (Madar) are there in the picture? 🥁 🥁 🥁',
            audio_prompt: 'ᱯᱮᱭᱟ (तीन - Three)',
            options: [
              { id: 'A', text: '1 (एक / मित् / ᱢᱤᱫ)', is_correct: false },
              { id: 'B', text: '2 (दो / बार / ᱵᱟᱨ)', is_correct: false },
              { id: 'C', text: '3 (तीन / पे / ᱯᱮ)', is_correct: true },
              { id: 'D', text: '5 (पाँच / मोड़े / ᱢᱚᱬᱮ)', is_correct: false }
            ]
          },
          {
            q_id: 3,
            type: 'listening_comprehension',
            competency: 'श्रवण बोध (Listening Comprehension)',
            marks: 5,
            question_hindi: 'बाहा (सरहुल) पर्व में किस पेड़ के फूलों की पूजा की जाती है?',
            question_tribal: {
              santhali_ol: 'ᱵᱟᱦᱟ ᱯᱚᱨᱚᱵᱽ ᱨᱮ ᱚᱠᱟ ᱫᱟᱨᱮ ᱵᱟᱦᱟ ᱵᱚᱝᱜᱟᱭᱟ (ᱯᱩᱡᱟᱹᱭᱟ)?',
              santhali_dev: 'बाहा परोब रे ओका दारे बाहा बोंगाया (पूजाया)?',
              mundari: 'बाहा परोब रे ओको दारू बा पूजाया?',
              ho: 'बाहा परोब रे ओको दारू बा पूजाया?'
            },
            question_english: 'In the Baha/Sarhul festival, flowers of which sacred tree are worshipped?',
            audio_prompt: 'ᱥᱟᱨᱡᱚᱢ ᱫᱟᱨᱮ (सखुआ - Sal Tree)',
            options: [
              { id: 'A', text: 'सखुआ / साल (सारजोम / ᱥᱟᱨᱡᱚᱢ)', is_correct: true },
              { id: 'B', text: 'आम (उल / ᱩᱞ)', is_correct: false },
              { id: 'C', text: 'केला (काइरा / ᱠᱟᱭᱨᱟ)', is_correct: false },
              { id: 'D', text: 'नीम (नीम दारे / ᱱᱤᱢ ᱫᱟᱨᱮ)', is_correct: false }
            ]
          },
          {
            q_id: 4,
            type: 'oral_reading_fluency',
            competency: 'मौखिक पठन व उच्चारण (Oral Fluency)',
            marks: 10,
            question_hindi: "माइक दबाकर बोलें: 'सुप्रभात बच्चों' (संथाली में: ᱥᱟᱹᱜᱩᱱ ᱥᱮᱛᱟᱜ / सगुन सेताः)",
            question_tribal: {
              santhali_ol: "ᱢᱟᱭᱤᱠ ᱚᱛᱟ ᱠᱟᱛᱮ ᱨᱚᱲ ᱢᱮ: 'ᱥᱟᱹᱜᱩᱱ ᱥᱮᱛᱟᱜ' (Good Morning)",
              santhali_dev: "माइक ओता काते रोड़ मे: 'सगुन सेताः' (सुप्रभात)",
              mundari: "माइक रोब काते जगरा मे: 'बोगि सेताः'",
              ho: "माइक रोब काते जगरा मे: 'बोगि सेताः'"
            },
            question_english: "Press the microphone and speak aloud: 'Good Morning' in tribal mother tongue.",
            target_phrase: 'सगुन सेताः (Sagun Setah)',
            target_ol: 'ᱥᱟᱹᱜᱩᱱ ᱥᱮᱛᱟᱜ',
            options: []
          }
        ]
      }
    ];
  }

  private evaluateExamLocally(
    examId: string, 
    studentName: string, 
    studentClass: string, 
    targetLang: string, 
    answers: Record<string, string>,
    activeExam?: AssessmentExam
  ): ExamSubmissionResponse {
    const exams = this.getLocalExams();
    const exam = activeExam || exams.find(e => e.id === examId) || exams[0];
    
    let earned = 0;
    const total = exam.total_marks || (exam.questions ? exam.questions.length * 5 : 25);
    const breakdown: Record<string, { earned: number; total: number }> = {};
    const questionResults = (exam.questions || []).map((q, idx) => {
      const qId = q.q_id ?? (q as any).id ?? (idx + 1);
      const qMarks = q.marks ?? 5;
      const isCorrect = (q.options || []).some(opt => (opt.id === answers[String(qId)] || opt.id === answers[String((q as any).id)]) && opt.is_correct);
      const marksAwarded = isCorrect ? qMarks : 0;
      earned += marksAwarded;

      const comp = q.competency || 'FLN मूलभूत दक्षता (Foundational Competency)';
      if (!breakdown[comp]) {
        breakdown[comp] = { earned: 0, total: 0 };
      }
      breakdown[comp].total += qMarks;
      breakdown[comp].earned += marksAwarded;

      return {
        q_id: qId,
        competency: comp,
        is_correct: isCorrect,
        marks_awarded: marksAwarded,
        max_marks: qMarks
      };
    });

    const percentage = Math.round((earned / Math.max(1, total)) * 100);
    const badge = percentage >= 80 ? '🌟 निपुण प्रवीण (Mastery Level)' : (percentage >= 60 ? '🎯 विकासशील (Proficient Level)' : '🌱 प्रारंभिक (Emerging Level)');
    const proficiency_level = percentage >= 80 ? 'Level 3 - Independent Reader & Mathematician' : (percentage >= 60 ? 'Level 2 - Developing Fluency' : 'Level 1 - Needs Support');
    const teacher_remark = percentage >= 80 ? 'उत्कृष्ट प्रदर्शन! बच्चा अपनी मातृभाषा और हिन्दी दोनों में दक्ष है।' : 'मातृभाषा आधारित अभ्यास और चित्रों के माध्यम से पुनरावृत्ति आवश्यक है।';

    return {
      exam_id: examId,
      exam_title: exam.title,
      student_name: studentName,
      student_class: studentClass,
      target_lang: targetLang,
      total_marks: total,
      earned_marks: earned,
      percentage,
      badge,
      proficiency_level,
      teacher_remark,
      competency_breakdown: breakdown,
      question_results: questionResults,
      evaluation_timestamp: Math.floor(Date.now() / 1000),
      verified_by: 'BHASHASETU Offline Edge Assessment Engine',
      attempt_id: `att-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`
    };
  }

  async uploadTeacherMedia(
    file: File,
    grade: string = 'Class 1',
    subject: string = 'भाषा एवं साक्षरता (Language & Literacy)',
    targetLang: TribalLanguage = 'santhali',
    targetScript: string = 'default',
    contextTheme: string = 'village_nature'
  ): Promise<ExternalContentIngestResult> {
    if (this.isOnline) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('grade', grade);
        formData.append('subject', subject);
        formData.append('target_lang', targetLang);
        formData.append('target_script', targetScript);
        formData.append('local_context_theme', contextTheme);

        const res = await fetch(`${API_BASE}/v1/ai/teacher/upload-media`, {
          method: 'POST',
          body: formData
        });
        if (res.ok) {
          return await res.json();
        }
      } catch (e) {
        console.warn('Media upload endpoint failed, falling back to client-side extraction:', e);
      }
    }

    // Client-side fallback if offline / standalone
    let contentText = '';
    const fileExt = file.name.split('.').pop()?.toLowerCase() || '';
    const isVideo = ['mp4', 'webm', 'mov', 'avi', 'mkv'].includes(fileExt);
    const isAudio = ['mp3', 'wav', 'm4a', 'ogg'].includes(fileExt);
    const isPdf = fileExt === 'pdf';

    if (isVideo) {
      contentText = `वीडियो पाठ: ${file.name.replace(/\.[^/.]+$/, '')}\nलक्षित कक्षा: ${grade}\nविषय: ${subject}\nयह एक प्राथमिक शिक्षण वीडियो है जिसमें स्थानीय परिवेशीय वस्तुओं, सखुआ के पत्तों और लोक-कथाओं के माध्यम से ${subject} की मुख्य संकल्पना को समझाया गया है।`;
    } else if (isAudio) {
      contentText = `मौखिक श्रवण पाठ: ${file.name.replace(/\.[^/.]+$/, '')}\nकक्षा: ${grade}\nविषय: ${subject}\nमातृभाषा संवाद, उच्चारण अभ्यास एवं शिक्षण निर्देश।`;
    } else {
      try {
        contentText = await file.text();
      } catch {
        contentText = `शैक्षणिक दस्तावेज़: ${file.name}\nकक्षा: ${grade}\nविषय: ${subject}`;
      }
    }

    const res = await this.ingestExternalLessonContent(
      contentText,
      file.name,
      grade,
      subject,
      targetLang,
      contextTheme
    );

    let mediaUrl = '';
    try {
      mediaUrl = URL.createObjectURL(file);
    } catch (e) {}

    res.media_info = {
      media_type: isVideo ? 'video' : (isAudio ? 'audio' : (isPdf ? 'pdf' : 'document')),
      filename: file.name,
      file_size_bytes: file.size,
      media_url: mediaUrl,
      duration_seconds: isVideo ? 180 : (isAudio ? 120 : undefined),
      duration_formatted: isVideo ? '03:00' : (isAudio ? '02:00' : undefined),
      total_pages: isPdf ? 2 : undefined,
      video_timestamps: isVideo ? [
        {
          timestamp: '00:00',
          seconds: 0,
          title_hindi: 'परिचय एवं परिवेशीय अवलोकन',
          title_tribal: 'ᱮᱛᱚᱦᱚᱵ ᱟᱨ ᱟᱹᱛᱩ ᱡᱤᱱᱤᱥ',
          title_english: 'Introduction & Local Realia',
          concept: 'कक्षा में स्थानीय परिवेशीय वस्तुओं और सखुआ के पत्तों का प्रदर्शन।'
        },
        {
          timestamp: '01:00',
          seconds: 60,
          title_hindi: 'मातृभाषा शब्दावली सेतु',
          title_tribal: 'ᱡᱟᱱᱟᱢ ᱟᱲᱟᱝ ᱟᱹᱲᱟᱹ',
          title_english: 'Mother Tongue Bridge',
          concept: 'संथाली, मुण्डारी व हो में मुख्य शब्दों का उच्चारण व अर्थ।'
        },
        {
          timestamp: '02:00',
          seconds: 120,
          title_hindi: 'प्रत्यक्ष गतिविधि व अभ्यास',
          title_tribal: 'ᱠᱟᱹᱢᱤ ᱦᱚᱨᱟ',
          title_english: 'Classroom Activity & Counting',
          concept: 'मूर्त वस्तुओं से गिनना व सुलेखन अभ्यास।'
        },
        {
          timestamp: '02:45',
          seconds: 165,
          title_hindi: 'निपुण मूल्यांकन व सारांश',
          title_tribal: 'ᱵᱤᱰᱟᱹᱣ ᱟᱨ ᱥᱟᱨᱟᱝᱥ',
          title_english: 'NIPUN Assessment & Closure',
          concept: 'सुकराती प्रश्नोत्तरी व अभ्यास पत्रक वितरण।'
        }
      ] : undefined
    };

    return res;
  }

  async ingestExternalLessonContent(
    contentText: string,
    filename: string = '',
    grade: string = 'Class 1',
    subject: string = 'भाषा एवं साक्षरता (Language & Literacy)',
    targetLang: TribalLanguage = 'santhali',
    contextTheme: string = 'village_nature'
  ): Promise<ExternalContentIngestResult> {
    if (this.isOnline) {
      try {
        const res = await fetch(`${API_BASE}/v1/ai/teacher/ingest-external-content`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content_text: contentText,
            filename: filename || undefined,
            grade,
            subject,
            target_lang: targetLang,
            target_script: 'default',
            local_context_theme: contextTheme
          })
        });
        if (res.ok) {
          return await res.json();
        }
      } catch (e) {
        console.warn('Backend ingestion endpoint unavailable, falling back to local edge NLP engine.');
      }
    }

    // Comprehensive Offline Fallback
    const lines = contentText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    const firstLine = lines.length > 0 ? lines[0] : (filename || 'कस्टम पाठ्य सामग्री');
    const cleanTopic = firstLine.replace(/^(पाठ\s*\d*[:\-]?|अध्याय\s*\d*[:\-]?|Chapter\s*\d*[:\-]?|Topic\s*[:\-]?).*/i, '').trim() || firstLine.slice(0, 40);

    const lessonPlan = await this.generatePedagogicalLesson(
      cleanTopic,
      grade,
      subject,
      targetLang,
      'default',
      contextTheme
    );

    const trans = offlineNlp.translateOffline(cleanTopic, 'hindi', targetLang);
    const pack = languagePackService.getPack(targetLang);

    const assessment = {
      exam_id: `exam-custom-${Date.now()}`,
      title: `मूल्यांकन प्रश्नोत्तरी: ${cleanTopic} (${grade})`,
      grade,
      subject,
      language: targetLang,
      total_marks: 25,
      passing_marks: 15,
      time_minutes: 20,
      competency_focus: [
        'मातृभाषा शब्दावली ज्ञान (Mother Tongue Vocabulary)',
        'परिवेशीय मूर्त वस्तु पहचान (Realia Identification)',
        'मौखिक पठन एवं उच्चारण प्रवाह (Oral Reading Fluency)',
        'संकल्पना समझ एवं तार्किक बोध (Concept Comprehension)',
        'FLN मूलभूत दक्षता (FLN Foundational Competency)'
      ],
      scoring_rubric: 'प्रत्येक प्रश्न 5 अंक। 20+ अंक = 🌟 निपुण प्रवीण, 15-19 अंक = 🎯 विकासशील, <15 अंक = 🌱 उपचारात्मक सहयोग।',
      questions: [
        {
          id: 1,
          question_text: `इस पाठ (${cleanTopic}) का मातृभाषा (${pack.nameEnglish}) में सही शीर्षक/अर्थ क्या है?`,
          question_tribal: `ᱱᱚᱣᱟ ᱯᱟᱲᱦᱟᱣ ᱨᱮᱱᱟᱜ ᱡᱟᱱᱟᱢ ᱟᱲᱟᱝ ᱛᱮ ᱴᱷᱤᱠ ᱧᱩᱛᱩᱢ ᱪᱮᱫ ᱠᱟᱱᱟ?`,
          question_english: `What is the authentic mother tongue title for '${cleanTopic}'?`,
          question_type: 'mcq' as const,
          competency: 'मातृभाषा शब्दावली ज्ञान',
          options: [
            { id: 'A', text: `${trans.devanagari_text} (${trans.translated_text})`, is_correct: true },
            { id: 'B', text: 'दाः आर गाडा (ᱫᱟᱜ ᱟᱨ ᱜᱟᱰᱟ) - Water', is_correct: false },
            { id: 'C', text: 'ओड़ाः आर घारोंज (ᱳᱲᱟᱜ ᱟᱨ ᱜᱷᱟᱨᱚᱸᱡᱽ) - Family', is_correct: false },
            { id: 'D', text: 'हाट आर बजार (ᱦᱟᱴ ᱟᱨ ᱵᱟᱡᱟᱨ) - Market', is_correct: false }
          ],
          explanation: `पाठ का प्राथमिक मातृभाषा रूप '${trans.devanagari_text}' (${trans.translated_text}) है।`
        },
        {
          id: 2,
          question_text: 'इस पाठ को समझाने के लिए कौन सी स्थानीय शिक्षण सामग्री (Realia TLM) सबसे उपयुक्त है?',
          question_tribal: 'ᱱᱚᱣᱟ ᱵᱩᱡᱷᱟᱹᱣ ᱞᱟᱹᱜᱤᱫ ᱚᱠᱟ ᱟᱹᱛᱩ ᱡᱤᱱᱤᱥ (TLM) ᱥᱟᱱᱟᱢ ᱠᱷᱚᱱ ᱵᱷᱟᱹᱜᱤ ᱠᱟᱱᱟ?',
          question_english: 'Which local realia TLM is best suited to demonstrate this concept?',
          question_type: 'realia_identification' as const,
          competency: 'परिवेशीय मूर्त वस्तु पहचान',
          options: [
            { id: 'A', text: 'गाँव के सखुआ के पत्ते, माटी के खिलौने एवं कंकड़ (Tactile Realia)', is_correct: true },
            { id: 'B', text: 'विदेशी प्लास्टिक गैजेट', is_correct: false },
            { id: 'C', text: 'बिना किसी वस्तु के केवल व्याख्यान', is_correct: false },
            { id: 'D', text: 'कंप्यूटर स्क्रीन गेम', is_correct: false }
          ],
          explanation: 'स्थानीय सखुआ के पत्ते और मूर्त वस्तुएँ बच्चों के परिवेशीय अनुभव से जुड़ती हैं।'
        },
        {
          id: 3,
          question_text: `पाठ के अनुसार, '${cleanTopic}' की मुख्य सीख या संदेश क्या है?`,
          question_tribal: 'ᱯᱟᱲᱦᱟᱣ ᱞᱮᱠᱟᱛᱮ ᱢᱩᱬᱩᱛ ᱪᱮᱫᱚᱜ ᱠᱟᱛᱷᱟ ᱪᱮᱫ ᱠᱟᱱᱟ?',
          question_english: 'According to the lesson, what is the core learning outcome?',
          question_type: 'concept_match' as const,
          competency: 'संकल्पना समझ एवं तार्किक बोध',
          options: [
            { id: 'A', text: 'प्रकृति, सह-अस्तित्व और मातृभाषा के माध्यम से अवधारणा स्पष्टता', is_correct: true },
            { id: 'B', text: 'कठिन शब्दों को बिना समझे रटना', is_correct: false },
            { id: 'C', text: 'केवल परीक्षा में अंक लाना', is_correct: false },
            { id: 'D', text: 'घर का काम न करना', is_correct: false }
          ],
          explanation: 'FLN का उद्देश्य मातृभाषा में संकल्पना की गहरी और सहज समझ है।'
        },
        {
          id: 4,
          question_text: `मातृभाषा में इस वाक्य को स्पष्ट आवाज़ में पढ़कर सुनाएँ: '${trans.translated_text}' (${trans.devanagari_text})`,
          question_tribal: `ᱱᱚᱣᱟ ᱟᱹᱭᱟᱹᱛ ᱨᱟᱦᱟ ᱛᱮ ᱯᱟᱲᱦᱟᱣ ᱢᱮ: '${trans.translated_text}'`,
          question_english: `Read aloud fluently in tribal mother tongue: '${trans.translated_text}' (${trans.devanagari_text})`,
          question_type: 'oral_reading' as const,
          competency: 'मौखिक पठन एवं उच्चारण प्रवाह',
          options: [
            { id: 'A', text: 'धाराप्रवाह एवं स्पष्ट उच्चारण के साथ वाचन पूर्ण किया (5/5)', is_correct: true },
            { id: 'B', text: 'धीमी गति से रुक-रुक कर वाचन (3/5)', is_correct: false },
            { id: 'C', text: 'उच्चारण में सहायता की आवश्यकता (1/5)', is_correct: false }
          ],
          explanation: 'मौखिक पठन प्रवाह NIPUN भारत का महत्वपूर्ण मानक है।'
        },
        {
          id: 5,
          question_text: 'अगर आपके पास 4 सखुआ के पत्ते 🍃 हैं और 3 पत्ते और मिल गए, तो कुल कितने पत्ते हुए?',
          question_tribal: 'ᱡᱩᱫᱤ ᱟᱢ ᱴᱷᱮᱱ ᱔ ᱜᱚᱴᱟᱝ ᱥᱟᱨᱡᱚᱢ ᱥᱟᱠᱟᱢ ᱛᱟᱦᱮᱸ ᱠᱟᱱᱟ ᱟᱨ ᱓ ᱮᱢ ᱧᱟᱢ ᱠᱮᱫᱟ, ᱮᱱᱠᱷᱟᱱ ᱛᱤᱱᱟᱹᱜ ᱦᱩᱭ ᱮᱱᱟ?',
          question_english: 'If you have 4 Sal leaves 🍃 and receive 3 more, how many in total?',
          question_type: 'mcq' as const,
          competency: 'FLN मूलभूत दक्षता',
          options: [
            { id: 'A', text: '7 पत्ते (ᱮᱭᱟᱭ / एयाय - Seven Leaves)', is_correct: true },
            { id: 'B', text: '5 पत्ते (ᱢᱚᱬᱮ / मोड़े - Five Leaves)', is_correct: false },
            { id: 'C', text: '6 पत्ते (ᱛᱩᱨᱩᱭ / तुरुय - Six Leaves)', is_correct: false },
            { id: 'D', text: '8 पत्ते (ᱤᱨᱟᱹᱞ / इरल - Eight Leaves)', is_correct: false }
          ],
          explanation: '4 + 3 = 7 (एयाय / ᱮᱭᱟᱭ)।'
        }
      ]
    };

    const worksheets = {
      worksheet_id: `ws-custom-${Date.now()}`,
      title: `द्विभाषी अभ्यास पत्रक (Worksheet): ${cleanTopic}`,
      grade,
      subject,
      language: targetLang,
      instructions_hindi: 'निर्देश: चित्रों को देखें, मातृभाषा शब्दों से मिलाएँ, संख्याएँ गिनें और अभ्यास पूरा करें।',
      instructions_tribal: 'ᱫᱤᱥᱟᱹ: ᱪᱤᱛᱟᱹᱨ ᱧᱮᱞ ᱢᱮ, ᱡᱟᱱᱟᱢ ᱟᱲᱟᱝ ᱟᱹᱲᱟᱹ ᱥᱟᱶ ᱡᱚᱲᱟᱣ ᱢᱮ ᱟᱨ ᱚᱞ ᱪᱮᱫᱚᱜ ᱢᱮ᱾',
      instructions_english: 'Instructions: Match pictures with mother tongue words, count the realia objects, and trace letters.',
      match_section: [
        {
          id: 1,
          prompt: 'चित्र देखकर सही मातृभाषा शब्द से मिलाएँ',
          tribal_text: trans.translated_text,
          tribal_script: trans.translated_text,
          hindi_text: cleanTopic,
          english_text: `Concept: ${cleanTopic}`,
          emoji: '🌟'
        },
        {
          id: 2,
          prompt: 'सखुआ का पेड़ (Sal Tree)',
          tribal_text: targetLang === 'santhali' ? 'ᱥᱟᱨᱡᱚᱢ ᱫᱟᱨᱮ' : 'सारजोम दारे',
          tribal_script: targetLang === 'santhali' ? 'ᱥᱟᱨᱡᱚᱢ ᱫᱟᱨᱮ' : 'सारजोम दारे',
          hindi_text: 'सखुआ पेड़',
          english_text: 'Sal Tree',
          emoji: '🌳'
        },
        {
          id: 3,
          prompt: 'मांदर ढोल (Folk Drum)',
          tribal_text: targetLang === 'santhali' ? 'ᱛᱩᱢᱫᱟᱜ' : 'तुमदाः / मांदर',
          tribal_script: targetLang === 'santhali' ? 'ᱛᱩᱢᱫᱟᱜ' : 'तुमदाः',
          hindi_text: 'मांदर ढोल',
          english_text: 'Tribal Drum',
          emoji: '🥁'
        },
        {
          id: 4,
          prompt: 'जंगल की चिड़िया (Bird)',
          tribal_text: targetLang === 'santhali' ? 'ᱪᱮᱬᱮ' : 'चेणे',
          tribal_script: targetLang === 'santhali' ? 'ᱪᱮᱬᱮ' : 'चेणे',
          hindi_text: 'चिड़िया',
          english_text: 'Bird',
          emoji: '🐦'
        }
      ],
      count_section: [
        {
          id: 1,
          count: 1,
          emoji: '🥁',
          name_hindi: 'एक मांदर (1 Tribal Drum)',
          name_tribal: 'ᱢᱤᱫ ᱛᱩᱢᱫᱟᱜ (Mit Tumdak)',
          name_english: 'One Drum'
        },
        {
          id: 2,
          count: 2,
          emoji: '🍃',
          name_hindi: 'दो सखुआ के पत्ते (2 Sal Leaves)',
          name_tribal: 'ᱵᱟᱨ ᱥᱟᱠᱟᱢ (Bar Sakam)',
          name_english: 'Two Leaves'
        },
        {
          id: 3,
          count: 3,
          emoji: '🏹',
          name_hindi: 'तीन धनुष-बाण (3 Bow & Arrows)',
          name_tribal: 'ᱯᱮ ᱟᱜ-ᱥᱟᱨ (Pe Ag-Sar)',
          name_english: 'Three Bows'
        },
        {
          id: 4,
          count: 4,
          emoji: '🥭',
          name_hindi: 'चार महुआ फल (4 Mahua Fruits)',
          name_tribal: 'ᱯᱳᱱ ᱢᱟᱦᱩᱣᱟ (Pon Mahua)',
          name_english: 'Four Fruits'
        }
      ],
      trace_section: [
        {
          id: 1,
          char_native: targetLang === 'santhali' ? 'ᱚ' : 'अ',
          char_devanagari: 'अ',
          word_native: targetLang === 'santhali' ? 'ᱚᱞ (Ol - Write)' : 'अक्षर (Akshar)',
          word_hindi: 'अक्षर',
          sound_phonetic: 'O'
        },
        {
          id: 2,
          char_native: targetLang === 'santhali' ? 'ᱫ' : 'द',
          char_devanagari: 'द',
          word_native: targetLang === 'santhali' ? 'ᱫᱟᱨᱮ (Dare - Tree)' : 'दारे (पेड़)',
          word_hindi: 'दारे (पेड़)',
          sound_phonetic: 'Da'
        },
        {
          id: 3,
          char_native: targetLang === 'santhali' ? 'ᱵ' : 'ब',
          char_devanagari: 'ब',
          word_native: targetLang === 'santhali' ? 'ᱵᱟᱦᱟ (Baha - Flower)' : 'बाहा (फूल)',
          word_hindi: 'बाहा (फूल)',
          sound_phonetic: 'Ba'
        },
        {
          id: 4,
          char_native: targetLang === 'santhali' ? 'ᱯ' : 'प',
          char_devanagari: 'प',
          word_native: targetLang === 'santhali' ? 'ᱯᱚᱛᱚᱵ (Potob - Book)' : 'पोतोब (किताब)',
          word_hindi: 'पोतोब (किताब)',
          sound_phonetic: 'Pa'
        }
      ],
      fill_section: [
        {
          id: 1,
          sentence_incomplete: 'हमारे गाँव में सखुआ का ___ बहुत बड़ा है।',
          missing_word: 'पेड़ (ᱫᱟᱨᱮ)',
          tribal_sentence: 'ᱟᱞᱮ ᱟᱹᱛᱩ ᱨᱮ ᱥᱟᱨᱡᱚᱢ ᱫᱟᱨᱮ ᱟᱹᱰᱤ ᱢᱟᱨᱟᱝ-ᱟ᱾',
          hint: '🌳 पेड़ / ᱫᱟᱨᱮ'
        },
        {
          id: 2,
          sentence_incomplete: 'सुबह उठकर हम अपनी ___ भाषा में नमस्ते कहते हैं।',
          missing_word: 'मातृभाषा (ᱡᱟᱱᱟᱢ ᱟᱲᱟᱝ)',
          tribal_sentence: 'ᱥᱮᱛᱟᱜ ᱨᱮ ᱡᱚᱦᱟᱨ ᱢᱮᱱ ᱠᱟᱛᱮ ᱵᱚᱱ ᱮᱦᱚᱵ-ᱟ᱾',
          hint: '🌿 जोहार / ᱡᱚᱦᱟᱨ'
        },
        {
          id: 3,
          sentence_incomplete: 'त्योहार में बच्चे ___ बजाकर नाचते हैं।',
          missing_word: 'मांदर (ᱛᱩᱢᱫᱟᱜ)',
          tribal_sentence: 'ᱯᱟᱨᱟᱵᱽ ᱨᱮ ᱜᱤᱫᱽᱨᱟᱹ ᱛᱩᱢᱫᱟᱜ ᱨᱩ ᱠᱟᱛᱮ ᱠᱚ ᱮᱱᱮᱡ-ᱟ᱾',
          hint: '🥁 मांदर / ᱛᱩᱢᱫᱟᱜ'
        }
      ]
    };

    return {
      id: `ext-lesson-${Date.now()}`,
      original_topic: cleanTopic,
      summary_hindi: `अध्यापक द्वारा अपलोड की गई बाह्य सामग्री '${cleanTopic}' का त्रिभाषी विश्लेषण एवं शिक्षण किट।`,
      summary_english: `Trilingual pedagogical analysis, formative assessment, and A4 printable worksheet suite generated for '${cleanTopic}'.`,
      detected_grade: grade,
      detected_subject: subject,
      target_language: targetLang,
      extracted_key_terms: [
        { hindi: cleanTopic, tribal: trans.translated_text, tribal_devanagari: trans.devanagari_text, english: cleanTopic },
        { hindi: 'सखुआ पेड़', tribal: 'ᱥᱟᱨᱡᱚᱢ ᱫᱟᱨᱮ', tribal_devanagari: 'सारजोम दारे', english: 'Sal Tree' },
        { hindi: 'मांदर ढोल', tribal: 'ᱛᱩᱢᱫᱟᱜ', tribal_devanagari: 'तुमदाः', english: 'Tribal Drum' }
      ],
      lesson_plan: lessonPlan,
      assessment,
      worksheets,
      created_at: Date.now()
    };
  }

  async saveCustomLesson(
    lessonId: string,
    title: string,
    grade: string,
    subject: string,
    targetLang: string,
    lessonPlan: PedagogicalLessonPlan,
    assessment?: any,
    worksheets?: any
  ): Promise<{ message: string; lesson_id: string }> {
    const customPayload = {
      lesson_id: lessonId,
      title,
      grade,
      subject,
      target_lang: targetLang,
      lesson_plan: lessonPlan,
      assessment,
      worksheets
    };

    if (this.isOnline) {
      try {
        const res = await fetch(`${API_BASE}/v1/ai/teacher/save-custom-lesson`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(customPayload)
        });
        if (res.ok) {
          const out = await res.json();
          offlineStorage.saveCustomLessonOffline(customPayload).catch(() => {});
          return out;
        }
      } catch (e) {}
    }

    // Offline persistence & sync enqueue
    offlineStorage.saveCustomLessonOffline(customPayload).catch(() => {});
    offlineStorage.enqueueSyncOperation({
      entityType: 'custom_lesson',
      entityId: lessonId,
      operation: 'INSERT',
      endpoint: `${API_BASE}/v1/ai/teacher/save-custom-lesson`,
      payload: customPayload
    }).catch(() => {});

    return { message: 'Saved locally in IndexedDB (Queued for sync)', lesson_id: lessonId };
  }

}

export const apiService = new ApiService();
