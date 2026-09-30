import React, { useState, useEffect, useRef } from 'react';
import { TribalLanguage, TranslationResult } from '../types';
import { apiService } from '../services/apiService';
import { speechService } from '../services/speechService';
import { useLanguage } from '../context/LanguageContext';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  Clock, 
  Send, 
  Volume1,
  GraduationCap,
  History,
  Languages,
  CheckCircle2,
  Sparkles,
  ArrowRightLeft,
  Square,
  Play,
  RotateCcw,
  Sliders,
  Settings2,
  Radio
} from 'lucide-react';

interface VoiceBridgeProps {
  selectedLanguage: TribalLanguage;
  isOfflineMode: boolean;
}

export const VoiceBridge: React.FC<VoiceBridgeProps> = ({
  selectedLanguage,
  isOfflineMode
}) => {
  const { t, uiLanguage } = useLanguage();
  const [direction, setDirection] = useState<'hindi_to_tribal' | 'tribal_to_hindi'>('hindi_to_tribal');
  const [teacherVoiceLang, setTeacherVoiceLang] = useState<'english' | 'hindi'>('english');
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activePlayingId, setActivePlayingId] = useState<string | null>(null);
  const [activeResult, setActiveResult] = useState<TranslationResult | null>(null);
  const [history, setHistory] = useState<TranslationResult[]>([]);
  const [latencyCounter, setLatencyCounter] = useState<number | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [speechRate, setSpeechRate] = useState<number>(0.9); // 0.75x slow, 0.9x normal, 1.1x fast
  const [inputMode, setInputMode] = useState<'tap_toggle' | 'push_to_talk'>('tap_toggle');

  const isRecordingRef = useRef<boolean>(false);
  const recordedTextRef = useRef<string>('');
  const isPlayingAudioRef = useRef<boolean>(false);

  // Structured Classroom Quick Commands by Category (Dual Hindi & English)
  const categorizedCommands = [
    { cat: 'greetings', hi: 'नमस्ते', en: 'Hello', desc: 'Greeting (Johar)' },
    { cat: 'greetings', hi: 'सुप्रभात', en: 'Good morning', desc: 'Morning (Sagun Setah)' },
    { cat: 'greetings', hi: 'धन्यवाद', en: 'Thank you', desc: 'Thank you (Sarhaw)' },
    { cat: 'greetings', hi: 'आप कैसे हैं?', en: 'How are you?', desc: 'How are you?' },
    { cat: 'commands', hi: 'बैठ जाओ', en: 'Sit down', desc: 'Sit down (Durub me)' },
    { cat: 'commands', hi: 'सब बच्चे बैठ जाओ', en: 'All children sit down', desc: 'All children sit' },
    { cat: 'commands', hi: 'खड़े हो जाओ', en: 'Stand up', desc: 'Stand up (Tingu god me)' },
    { cat: 'commands', hi: 'किताब खोलो', en: 'Open book', desc: 'Open book (Puthi jhij me)' },
    { cat: 'commands', hi: 'किताब बंद करो', en: 'Close book', desc: 'Close book (Puthi bond me)' },
    { cat: 'commands', hi: 'लिखो', en: 'Write', desc: 'Write (Ol me)' },
    { cat: 'commands', hi: 'पढ़ो', en: 'Read', desc: 'Read (Parhaw me)' },
    { cat: 'commands', hi: 'शांत रहो', en: 'Keep quiet', desc: 'Keep quiet (Thir tahen me)' },
    { cat: 'commands', hi: 'ध्यान से सुनो', en: 'Listen carefully', desc: 'Listen (Dhyan te anjom me)' },
    { cat: 'commands', hi: 'हाथ उठाओ', en: 'Raise hand', desc: 'Raise hand (Ti tul me)' },
    { cat: 'commands', hi: 'ताली बजाओ', en: 'Clap hands', desc: 'Clap (Tahri me)' },
    { cat: 'numbers', hi: 'एक', en: 'One (1)', desc: '1 - Mid (ᱢᱤᱫ)' },
    { cat: 'numbers', hi: 'दो', en: 'Two (2)', desc: '2 - Bar (ᱵᱟᱨ)' },
    { cat: 'numbers', hi: 'तीन', en: 'Three (3)', desc: '3 - Pe (ᱯᱮ)' },
    { cat: 'numbers', hi: 'चार', en: 'Four (4)', desc: '4 - Pun (ᱯᱩᱱ)' },
    { cat: 'numbers', hi: 'पाँच', en: 'Five (5)', desc: '5 - Mone (ᱢᱚᱬᱮ)' },
    { cat: 'numbers', hi: 'छह', en: 'Six (6)', desc: '6 - Turuy (ᱛᱩᱨᱩᱭ)' },
    { cat: 'numbers', hi: 'सात', en: 'Seven (7)', desc: '7 - Eyay (ᱮᱭᱟᱭ)' },
    { cat: 'numbers', hi: 'आठ', en: 'Eight (8)', desc: '8 - Iral (ᱤᱨᱟᱹᱞ)' },
    { cat: 'numbers', hi: 'नौ', en: 'Nine (9)', desc: '9 - Are (ᱟᱨᱮ)' },
    { cat: 'numbers', hi: 'दस', en: 'Ten (10)', desc: '10 - Gel (ᱜᱮᱞ)' },
    { cat: 'realia', hi: 'पेड़', en: 'Tree', desc: 'Tree - Dare (ᱫᱟᱨᱮ)' },
    { cat: 'realia', hi: 'सखुआ', en: 'Sal tree', desc: 'Sal Tree - Sarjom (ᱥᱟᱨᱡᱚᱢ)' },
    { cat: 'realia', hi: 'महुआ', en: 'Mahua tree', desc: 'Mahua (ᱢᱟᱹᱦᱩᱣᱟᱹ)' },
    { cat: 'realia', hi: 'पत्ता', en: 'Leaf', desc: 'Sal Leaf - Sakam (ᱥᱟᱠᱟᱢ)' },
    { cat: 'realia', hi: 'मांदर', en: 'Madar drum', desc: 'Drum - Tumdah (ᱛᱩᱢᱫᱟᱜ)' },
    { cat: 'realia', hi: 'हाथी', en: 'Elephant', desc: 'Elephant - Hati (ᱦᱟᱹᱛᱤ)' },
    { cat: 'realia', hi: 'तीर-धनुष', en: 'Bow and arrow', desc: 'Bow & Arrow - Ag-sar (ᱟᱜ-ᱥᱟᱨ)' },
    { cat: 'praise', hi: 'शाबाश', en: 'Well done', desc: 'Well done! (Adi napay)' },
    { cat: 'praise', hi: 'बहुत अच्छा', en: 'Very good', desc: 'Very good' },
    { cat: 'praise', hi: 'सही है', en: 'Correct', desc: 'That is correct' },
    { cat: 'questions', hi: 'क्या कर रहे हो?', en: 'What are you doing? (Kya karta hai)', desc: 'Ched em chekayeda?' },
    { cat: 'questions', hi: 'कहाँ जा रहे हो?', en: 'Where are you going?', desc: 'Okateem chalak kana?' },
    { cat: 'questions', hi: 'क्या आप समझ गए?', en: 'Did you understand?', desc: 'Did you understand?' },
    { cat: 'questions', hi: 'यह क्या है?', en: 'What is this?', desc: 'What is this?' },
    { cat: 'daily', hi: 'यहाँ आओ', en: 'Come here', desc: 'Come here (Node hijuh me)' },
    { cat: 'daily', hi: 'पानी पियो', en: 'Drink water (Pani piyo)', desc: 'Water - Dah nuym' },
    { cat: 'daily', hi: 'खाना खाओ', en: 'Eat food (Khana khao)', desc: 'Eat - Daka jom me' },
    { cat: 'daily', hi: 'हाथ धो लो', en: 'Wash hands', desc: 'Wash hands - Ti arup me' },
    { cat: 'daily', hi: 'चित्र बनाओ', en: 'Draw picture', desc: 'Draw - Chobi benaw me' },
    { cat: 'daily', hi: 'पानी', en: 'Water', desc: 'Water - Dah (ᱫᱟᱜ)' },
    { cat: 'daily', hi: 'भात', en: 'Rice', desc: 'Cooked rice - Daka (ᱫᱟᱠᱟ)' },
    { cat: 'daily', hi: 'खाना', en: 'Eat food', desc: 'Eat - Jom (ᱡᱚᱢ)' }
  ];

  const filteredCommands = activeCategoryFilter === 'all'
    ? categorizedCommands
    : categorizedCommands.filter(c => c.cat === activeCategoryFilter);

  // Initial demo on mount or language change
  useEffect(() => {
    handleTranslateText("Open book", 'hindi_to_tribal', false);
  }, [selectedLanguage]);

  // Clean up speech when unmounting
  useEffect(() => {
    return () => {
      speechService.stopSpeaking();
      speechService.stopListening();
    };
  }, []);

  const handleTranslateText = async (text: string, currentDirection = direction, autoPlay = true) => {
    const clean = (text || '').trim();
    if (!clean) return;

    setIsTranslating(true);
    const start = performance.now();

    const hasOlChiki = /[\u1C50-\u1C7F]/.test(clean);
    const hasDevanagari = /[\u0900-\u097F]/.test(clean);
    const isLatin = /^[a-zA-Z0-9\s.,?!'\-]+$/.test(clean);

    // Dynamic resolution of source & target:
    let sourceLang: 'hindi' | 'english' | TribalLanguage = 'english';
    let targetLang: 'hindi' | TribalLanguage = selectedLanguage;

    if (hasOlChiki) {
      sourceLang = 'santhali';
      targetLang = 'hindi';
      setDirection('tribal_to_hindi');
    } else if (hasDevanagari) {
      sourceLang = 'hindi';
      targetLang = selectedLanguage;
      setDirection('hindi_to_tribal');
    } else if (isLatin) {
      const lower = clean.toLowerCase();
      const isSanthaliPhonetic = ['durub', 'puthi', 'tingu', 'jom', 'nuym', 'sarjom', 'baha', 'aatu', 'ayo', 'baba', 'johar', 'sarhaw'].some(w => lower.includes(w));
      if (isSanthaliPhonetic && currentDirection === 'tribal_to_hindi') {
        sourceLang = selectedLanguage;
        targetLang = 'hindi';
      } else {
        sourceLang = 'english';
        targetLang = selectedLanguage;
        setDirection('hindi_to_tribal');
      }
    }

    try {
      const result = await apiService.translate(clean, sourceLang, targetLang);
      const end = performance.now();
      const measuredLatency = Math.round((end - start) * 10) / 10;
      result.latency_ms = measuredLatency;

      setActiveResult(result);
      setLatencyCounter(measuredLatency);
      setHistory(prev => [result, ...prev.filter(h => h.source_text !== result.source_text).slice(0, 7)]);

      if (autoPlay) {
        handlePlayTribalAudio(result);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsTranslating(false);
    }
  };

  /**
   * 1-TAP MICROPHONE TOGGLE LOGIC:
   * Click 1 -> Starts Listening (mic on, sound wave visualizer active)
   * Click 2 -> Stops Listening & immediately Translates + Auto-plays
   */
  const handleToggleMic = () => {
    if (isRecording) {
      // Turn OFF
      handleStopMic();
    } else {
      // Turn ON
      handleStartMic();
    }
  };

  const handleStartMic = () => {
    if (isRecordingRef.current) return;
    
    // Stop any ongoing speaker playback before listening
    handleStopSpeaker();

    isRecordingRef.current = true;
    setIsRecording(true);
    setInputText('');
    recordedTextRef.current = '';

    // Play tactile sound cue
    speechService.playProceduralChime();

    const langCode = direction === 'hindi_to_tribal' 
      ? (teacherVoiceLang === 'english' ? 'en-IN' : 'hi-IN')
      : 'hi-IN';

    speechService.startListening(
      langCode,
      (transcript, isFinal) => {
        recordedTextRef.current = transcript;
        setInputText(transcript);
        if (isFinal) {
          isRecordingRef.current = false;
          setIsRecording(false);
          if (transcript.trim()) {
            handleTranslateText(transcript, direction, true);
          }
        }
      },
      (error) => {
        console.warn('Microphone error:', error);
        isRecordingRef.current = false;
        setIsRecording(false);
      },
      () => {
        isRecordingRef.current = false;
        setIsRecording(false);
        if (recordedTextRef.current.trim()) {
          handleTranslateText(recordedTextRef.current, direction, true);
        }
      }
    );
  };

  const handleStopMic = () => {
    if (!isRecordingRef.current) return;
    isRecordingRef.current = false;
    setIsRecording(false);
    speechService.stopListening();
    if (recordedTextRef.current.trim()) {
      handleTranslateText(recordedTextRef.current, direction, true);
    }
  };

  /**
   * 1-TAP SPEAKER AUDIO TOGGLE LOGIC:
   * Click 1 -> Plays audio
   * Click 2 -> Stops / Cancels audio immediately
   */
  const handleToggleTribalAudio = (res: TranslationResult) => {
    if (isPlayingAudio && activePlayingId === 'tribal_main') {
      handleStopSpeaker();
    } else {
      handlePlayTribalAudio(res);
    }
  };

  const handlePlayTribalAudio = (res: TranslationResult) => {
    speechService.stopSpeaking();
    setIsPlayingAudio(true);
    isPlayingAudioRef.current = true;
    setActivePlayingId('tribal_main');

    const spokenText = res.devanagari_text || res.translated_text;
    const phoneticFallback = res.romanized || res.audio_phonemes;
    const lang = res.target_lang === 'hindi' ? 'hindi' : selectedLanguage;

    speechService.speak(spokenText, lang, () => {
      setIsPlayingAudio(false);
      isPlayingAudioRef.current = false;
      setActivePlayingId(null);
    }, speechRate, phoneticFallback);
  };

  const handleToggleHindiAudio = (res: TranslationResult) => {
    if (isPlayingAudio && activePlayingId === 'hindi_main') {
      handleStopSpeaker();
    } else {
      speechService.stopSpeaking();
      setIsPlayingAudio(true);
      isPlayingAudioRef.current = true;
      setActivePlayingId('hindi_main');

      const isSourceEnglish = res.source_lang === 'english' || /^[a-zA-Z0-9\s.,?!'\-]+$/.test(res.source_text);
      const textToSpeak = isSourceEnglish ? res.source_text : (res.hindi_bridge || res.source_text);
      const langToUse = isSourceEnglish ? 'english' : 'hindi';

      speechService.speak(textToSpeak, langToUse, () => {
        setIsPlayingAudio(false);
        isPlayingAudioRef.current = false;
        setActivePlayingId(null);
      }, speechRate);
    }
  };

  const handleStopSpeaker = () => {
    speechService.stopSpeaking();
    setIsPlayingAudio(false);
    isPlayingAudioRef.current = false;
    setActivePlayingId(null);
  };

  const handleToggleTestSpeaker = () => {
    if (isPlayingAudio && activePlayingId === 'test_speaker') {
      handleStopSpeaker();
    } else {
      speechService.stopSpeaking();
      setIsPlayingAudio(true);
      isPlayingAudioRef.current = true;
      setActivePlayingId('test_speaker');

      const testDevanagari = selectedLanguage === 'santhali' ? 'जोहार माचेत आर गिद्रा को' :
                             selectedLanguage === 'mundari' ? 'जोहार होन को' : 'जोहार होन को';
      const testRomanized = selectedLanguage === 'santhali' ? 'Johar machet ar gidra ko' :
                            selectedLanguage === 'mundari' ? 'Johar hon ko' : 'Johar ho hon ko';

      speechService.speak(testDevanagari, selectedLanguage, () => {
        setIsPlayingAudio(false);
        isPlayingAudioRef.current = false;
        setActivePlayingId(null);
      }, speechRate, testRomanized);
    }
  };

  const tribalLanguageLabel = selectedLanguage === 'santhali' ? 'Santhali (ᱥᱟᱱᱛᱟᱲᱤ ᱚᱞ ᱪᱤᱠᱤ)' :
                               selectedLanguage === 'mundari' ? 'Mundari (ᱢᱩᱱᱰᱟᱨᱤ)' : 'Ho (ᱦᱳ)';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Module Title Header Bar */}
      <div className="bg-white rounded-2xl border border-gov-200 p-5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-forest-100 text-forest-800 border border-forest-200">
              ⚡ Real-Time Voice Bridge
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-gov-100 text-gov-800 border border-gov-200">
              Target: {tribalLanguageLabel}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
              1-Tap Mic & Speaker
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-gov-900">
            {uiLanguage === 'hindi' ? 'कक्षा द्विभाषी ध्वनि सेतु एवं अनुवादक' :
             uiLanguage === 'santhali' ? 'ᱠᱞᱟᱥ ᱨᱮᱭᱟᱜ ᱵᱟᱨ-ᱯᱟᱹᱨᱥᱤ ᱟᱲᱟᱝ ᱥᱮᱛᱩ' :
             uiLanguage === 'ho' ? 'ᱠᱞᱟᱥ ᱨᱮᱭᱟᱜ ᱵᱟᱨ-ᱯᱟᱹᱨᱥᱤ ᱟᱲᱟᱝ ᱥᱮᱛᱩ' :
             uiLanguage === 'mundari' ? 'ᱠᱞᱟᱥ ᱨᱮᱭᱟᱜ ᱵᱟᱨ-ᱯᱟᱹᱨᱥᱤ ᱟᱲᱟᱝ ᱥᱮᱛᱩ' :
             'Classroom Real-Time Voice Bridge'}
          </h2>
          <p className="text-xs sm:text-sm text-gov-600 max-w-2xl mt-0.5">
            {uiLanguage === 'hindi' ? 'शिक्षक हिन्दी में बोलते हैं ➔ 1.2 सेकंड के भीतर टैबलेट स्पीकर से वास्तविक जनजातीय मातृभाषा का उच्चारण होता है।' :
             'Teacher speaks in Hindi ➔ Instant on-device edge translation speaks native mother tongue over tablet speaker in sub-1.2 seconds.'}
          </p>
        </div>

        {/* Latency, Speed & Audio Diagnostic Box */}
        <div className="flex flex-wrap items-center gap-3 bg-gov-50 p-3 rounded-2xl border border-gov-200 self-start md:self-auto">
          {/* Speech Rate Controls */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-gov-200 text-xs font-bold">
            <span className="text-[10px] text-gov-500 pl-1.5">Speed:</span>
            {[
              { val: 0.75, label: '0.75x' },
              { val: 0.9, label: '1.0x' },
              { val: 1.1, label: '1.2x' }
            ].map(r => (
              <button
                key={r.val}
                onClick={() => setSpeechRate(r.val)}
                className={`px-2 py-0.5 rounded-lg transition-all ${
                  speechRate === r.val ? 'bg-forest-700 text-white shadow-xs' : 'text-gov-600 hover:text-gov-900'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          {/* 1-Tap Test Speaker Toggle */}
          <button
            onClick={handleToggleTestSpeaker}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all active:scale-95 ${
              isPlayingAudio && activePlayingId === 'test_speaker'
                ? 'bg-rose-600 text-white border-rose-700 animate-pulse'
                : 'bg-white hover:bg-gov-100 text-gov-800 border-gov-300'
            }`}
            title="1-Tap to Play or Stop Speaker"
          >
            {isPlayingAudio && activePlayingId === 'test_speaker' ? (
              <>
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>Stop Speaker</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-forest-700" />
                <span>🔊 Test Speaker</span>
              </>
            )}
          </button>

          {/* Latency Counter */}
          <div className="border-l border-gov-200 pl-3">
            <div className="text-[10px] text-gov-500 font-bold uppercase">Latency</div>
            <div className="text-sm font-black text-forest-700">
              {latencyCounter !== null ? `${latencyCounter} ms` : '< 1.2s'}
            </div>
          </div>
        </div>
      </div>

      {/* Main Two-Column Voice Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Mic Pad & Teleprompter (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Direction Toggle Card & Input Mode Switcher */}
          <div className="bg-white rounded-2xl p-3.5 border border-gov-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-gov-600 uppercase">Direction:</span>
              <div className="flex gap-1.5">
                <button
                  onClick={() => setDirection('hindi_to_tribal')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    direction === 'hindi_to_tribal'
                      ? 'bg-gov-900 text-white shadow-sm'
                      : 'bg-gov-100 text-gov-700 hover:bg-gov-200'
                  }`}
                >
                  Teacher (English / Hindi) ➔ Student ({selectedLanguage.toUpperCase()})
                </button>
                <button
                  onClick={() => setDirection('tribal_to_hindi')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    direction === 'tribal_to_hindi'
                      ? 'bg-gov-900 text-white shadow-sm'
                      : 'bg-gov-100 text-gov-700 hover:bg-gov-200'
                  }`}
                >
                  Student ({selectedLanguage.toUpperCase()}) ➔ Teacher
                </button>
              </div>
            </div>

            {/* Mic Interaction Mode Pill (Tap vs Hold) */}
            <div className="flex items-center gap-1 bg-gov-100 p-1 rounded-xl border border-gov-200 text-[11px] font-bold">
              <button
                onClick={() => setInputMode('tap_toggle')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  inputMode === 'tap_toggle' ? 'bg-white text-gov-900 shadow-xs' : 'text-gov-600 hover:text-gov-900'
                }`}
                title="1-Tap on / 1-Tap off"
              >
                👆 1-Tap Toggle
              </button>
              <button
                onClick={() => setInputMode('push_to_talk')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  inputMode === 'push_to_talk' ? 'bg-white text-gov-900 shadow-xs' : 'text-gov-600 hover:text-gov-900'
                }`}
                title="Hold while talking"
              >
                📻 Hold-to-Talk
              </button>
            </div>
          </div>

          {/* Interactive Microphone Tablet Pad */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-gov-200 shadow-sm text-center space-y-5 relative overflow-hidden">
            {/* Subtle background ambient pulse while recording */}
            {isRecording && (
              <div className="absolute inset-0 bg-red-500/5 animate-pulse pointer-events-none"></div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs font-black text-gov-600 uppercase tracking-wider flex items-center gap-2">
                <Radio className={`w-4 h-4 ${isRecording ? 'text-red-500 animate-pulse' : 'text-forest-600'}`} />
                <span>
                  {direction === 'hindi_to_tribal' 
                    ? `Teacher Spoken Input (${teacherVoiceLang === 'english' ? 'English' : 'Hindi'})`
                    : `Student Voice Input (${selectedLanguage.toUpperCase()})`}
                </span>
              </div>

              {/* 1-Tap Teacher Spoken Language Switcher (English vs Hindi) */}
              {direction === 'hindi_to_tribal' && (
                <div className="flex items-center bg-gov-100 p-1 rounded-xl border border-gov-200 text-xs font-black">
                  <button
                    onClick={() => setTeacherVoiceLang('english')}
                    className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                      teacherVoiceLang === 'english' ? 'bg-white text-gov-900 shadow-xs' : 'text-gov-600 hover:text-gov-900'
                    }`}
                  >
                    <span>🇬🇧 English</span>
                    {teacherVoiceLang === 'english' && <span className="w-1.5 h-1.5 rounded-full bg-forest-600"></span>}
                  </button>
                  <button
                    onClick={() => setTeacherVoiceLang('hindi')}
                    className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                      teacherVoiceLang === 'hindi' ? 'bg-white text-gov-900 shadow-xs' : 'text-gov-600 hover:text-gov-900'
                    }`}
                  >
                    <span>🇮🇳 हिन्दी</span>
                    {teacherVoiceLang === 'hindi' && <span className="w-1.5 h-1.5 rounded-full bg-forest-600"></span>}
                  </button>
                </div>
              )}
            </div>

            {/* Recording Visualizer Area */}
            <div className="py-2 flex flex-col items-center justify-center min-h-[140px]">
              {isRecording ? (
                <div className="space-y-3 w-full max-w-md">
                  {/* Animated Frequency Bars */}
                  <div className="flex items-center justify-center gap-1.5 h-12">
                    <div className="w-1.5 bg-red-500 rounded-full animate-bounce h-6"></div>
                    <div className="w-1.5 bg-red-600 rounded-full animate-bounce h-10 delay-75"></div>
                    <div className="w-1.5 bg-rose-500 rounded-full animate-bounce h-7 delay-150"></div>
                    <div className="w-1.5 bg-red-600 rounded-full animate-bounce h-12 delay-200"></div>
                    <div className="w-1.5 bg-rose-600 rounded-full animate-bounce h-8 delay-100"></div>
                    <div className="w-1.5 bg-red-500 rounded-full animate-bounce h-10 delay-300"></div>
                    <div className="w-1.5 bg-red-600 rounded-full animate-bounce h-5 delay-150"></div>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-black animate-pulse border border-red-200">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
                    <span>
                      {teacherVoiceLang === 'english'
                        ? 'Listening in English... (Tap again to stop & translate)'
                        : 'आवाज सुन रहे हैं... (रोकने के लिए दोबारा टैप करें)'}
                    </span>
                  </div>

                  {inputText && (
                    <div className="p-3 bg-red-50/70 border border-red-200 rounded-2xl text-sm font-black text-gov-900 shadow-xs">
                      "{inputText}"
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-1 max-w-md">
                  <p className="text-gov-800 font-extrabold text-sm">
                    {teacherVoiceLang === 'english'
                      ? 'Speak in English (Tap mic once to begin)'
                      : (uiLanguage === 'hindi' ? 'माइक चालू करने के लिए 1 बार दबाएं' : 'Click / Tap once to start speaking')}
                  </p>
                  <p className="text-gov-500 text-xs">
                    {teacherVoiceLang === 'english'
                      ? 'Speak English classroom commands (e.g. "Open book", "Sit down", "Good morning") — translates instantly to authentic tribal script.'
                      : (uiLanguage === 'hindi' 
                          ? 'बोलने के बाद रोकने के लिए दोबारा दबाएं — एआई स्वतः अनुवाद कर स्पीकर पर बोलेगा।' 
                          : 'Tap once to start, speak your lesson, then tap again to stop & translate automatically.')}
                  </p>
                </div>
              )}

              {/* Master 1-Tap Microphone Button */}
              <div className="relative mt-4">
                {/* Expanding Glowing Waves when Recording */}
                {isRecording && (
                  <>
                    <span className="absolute -inset-3 rounded-full bg-red-500/30 animate-ping"></span>
                    <span className="absolute -inset-6 rounded-full bg-red-500/20 animate-pulse"></span>
                  </>
                )}

                <button
                  onClick={inputMode === 'tap_toggle' ? handleToggleMic : undefined}
                  onMouseDown={inputMode === 'push_to_talk' ? handleStartMic : undefined}
                  onMouseUp={inputMode === 'push_to_talk' ? handleStopMic : undefined}
                  onTouchStart={inputMode === 'push_to_talk' ? handleStartMic : undefined}
                  onTouchEnd={inputMode === 'push_to_talk' ? handleStopMic : undefined}
                  className={`relative w-24 h-24 rounded-full flex flex-col items-center justify-center transition-all transform active:scale-95 shadow-xl cursor-pointer ${
                    isRecording
                      ? 'bg-red-600 text-white ring-8 ring-red-200 scale-105'
                      : 'bg-gov-900 text-white hover:bg-forest-800 hover:scale-105'
                  }`}
                  title={isRecording ? 'Click to Stop & Translate' : 'Click to Start Speaking'}
                  aria-label="Microphone Control"
                >
                  {isRecording ? (
                    <Square className="w-8 h-8 fill-current text-white animate-pulse" />
                  ) : (
                    <Mic className="w-9 h-9" />
                  )}
                  <span className="text-[10px] font-black mt-1 uppercase tracking-wider">
                    {isRecording ? 'STOP' : 'SPEAK'}
                  </span>
                </button>
              </div>
            </div>

            {/* Text Input Fallback Bar */}
            <div className="flex gap-2 pt-2 border-t border-gov-100">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleTranslateText(inputText, direction, true)}
                placeholder={
                  direction === 'hindi_to_tribal'
                    ? (teacherVoiceLang === 'english'
                        ? "e.g. Open the book, Sit down, Good morning, Water, Clap..."
                        : "उदा. किताब खोलो, बैठ जाओ, शाबाश, पानी पियो...")
                    : "Enter tribal sentence..."
                }
                className="flex-1 px-4 py-3 text-xs sm:text-sm rounded-2xl border-2 border-gov-200 focus:border-gov-900 focus:outline-none"
              />
              <button
                onClick={() => handleTranslateText(inputText, direction, true)}
                disabled={!inputText.trim() || isTranslating}
                className="px-5 py-3 rounded-2xl bg-gov-900 hover:bg-forest-800 text-white font-black text-xs flex items-center gap-2 disabled:opacity-40 transition-all shadow-sm shrink-0 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{uiLanguage === 'hindi' ? 'अनुवाद करें' : 'Translate & Speak'}</span>
              </button>
            </div>

            {/* Quick Helper Inquiries (1-Tap Prompts for Classroom Testing) */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2">
              <span className="text-[10px] font-black text-gov-500 uppercase tracking-wider">Quick Prompts:</span>
              {[
                { label: 'kya karta hai', text: 'kya karta hai' },
                { label: 'Open book', text: 'Open book' },
                { label: 'Sit down', text: 'Sit down' },
                { label: 'किताब खोलो', text: 'किताब खोलो' },
                { label: 'बैठ जाओ', text: 'बैठ जाओ' },
                { label: 'पानी पियो', text: 'पानी पियो' },
                { label: 'हाथ धो लो', text: 'हाथ धो लो' },
                { label: 'Good morning', text: 'Good morning' },
              ].map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInputText(p.text);
                    handleTranslateText(p.text, 'hindi_to_tribal', true);
                  }}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-gov-100 hover:bg-forest-100 text-gov-800 hover:text-forest-900 border border-gov-200 hover:border-forest-300 transition-colors cursor-pointer"
                >
                  "{p.label}"
                </button>
              ))}
            </div>
          </div>

          {/* Active Live Result Card (Classroom Teleprompter) */}
          {activeResult && (
            <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-forest-600 shadow-lg space-y-4 animate-fade-in">
              {/* Teacher Spoken Text Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gov-100 pb-4">
                <div className="space-y-1">
                  <div className="text-[10px] uppercase font-black text-gov-500">
                    {uiLanguage === 'hindi' ? 'इनपुट वाक्य (Input Speech):' : 'Input Speech (Teacher / Student):'}
                  </div>
                  <div className="text-base sm:text-lg font-black text-gov-900 flex items-center gap-2">
                    <span>"{activeResult.source_text}"</span>
                    <button
                      onClick={() => handleToggleHindiAudio(activeResult)}
                      className={`p-1.5 rounded-xl border transition-all ${
                        isPlayingAudio && activePlayingId === 'hindi_main'
                          ? 'bg-amber-100 text-amber-900 border-amber-300'
                          : 'bg-gov-100 text-gov-600 hover:text-gov-900 border-gov-200'
                      }`}
                      title="Play Input Audio"
                    >
                      {isPlayingAudio && activePlayingId === 'hindi_main' ? (
                        <Square className="w-3.5 h-3.5 fill-current" />
                      ) : (
                        <Volume1 className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                  {activeResult.hindi_bridge && activeResult.source_lang === 'english' && (
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded-lg border border-amber-200 mt-1">
                      <span>🇮🇳 हिन्दी सेतु (Hindi Bridge):</span>
                      <span className="font-black text-amber-950">{activeResult.hindi_bridge}</span>
                    </div>
                  )}
                  {((activeResult as any).engine_source === 'sqlite_fts5_local' || selectedLanguage === 'santhali') && (
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-forest-900 bg-forest-50 px-2.5 py-0.5 rounded-lg border border-forest-200 mt-1 ml-1.5">
                      <span>⚡ Local SQLite FTS5 DB</span>
                      <span className="text-forest-700 font-mono text-[10px]">({activeResult.latency_ms || '< 1'}ms)</span>
                    </div>
                  )}
                </div>

                {/* Primary 1-Tap Speaker Action Button */}
                <button
                  onClick={() => handleToggleTribalAudio(activeResult)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-black shadow-md transition-all active:scale-95 ${
                    isPlayingAudio && activePlayingId === 'tribal_main'
                      ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                      : 'bg-forest-700 hover:bg-forest-800 text-white'
                  }`}
                >
                  {isPlayingAudio && activePlayingId === 'tribal_main' ? (
                    <>
                      <Square className="w-4 h-4 fill-current" />
                      <span>{uiLanguage === 'hindi' ? 'ऑडियो रोकें (Stop)' : 'Stop Audio'}</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4" />
                      <span>{uiLanguage === 'hindi' ? 'मातृभाषा ऑडियो सुनें (Play)' : `Play ${selectedLanguage.toUpperCase()} Audio`}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Translated Tribal Output Display */}
              <div className="space-y-3">
                {/* 1. Santhali Ol Chiki Script */}
                {selectedLanguage === 'santhali' && activeResult.script_primary && (
                  <div className="bg-forest-50/70 p-4 sm:p-5 rounded-2xl border-2 border-forest-200">
                    <div className="text-[10px] font-black text-forest-800 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                      <span>Ol Chiki Script (ᱥᱟᱱᱛᱟᱲᱤ ᱚᱞ ᱪᱤᱠᱤ)</span>
                      <span className="text-[10px] text-forest-600 font-bold bg-white px-2 py-0.5 rounded-full border border-forest-200">
                        Authentic Script
                      </span>
                    </div>
                    <div className="text-2xl sm:text-4xl font-black text-gov-900 font-olchiki tracking-wide">
                      {activeResult.script_primary}
                    </div>
                  </div>
                )}

                {/* 2. Devanagari Tribal Pronunciation */}
                <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-gov-200">
                  <div className="text-[10px] font-black text-gov-700 uppercase tracking-wider mb-1 flex items-center justify-between">
                    <span>{selectedLanguage.toUpperCase()} Pronunciation (मातृभाषा उच्चारण)</span>
                    <span className="text-[10px] text-forest-700 font-bold">
                      Classroom Ready
                    </span>
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-forest-800">
                    {activeResult.devanagari_text || activeResult.translated_text}
                  </div>
                </div>

                {/* 3. Romanized Phonetics & Latency */}
                {activeResult.romanized && (
                  <div className="bg-gov-50 p-3 rounded-xl text-xs text-gov-600 flex items-center justify-between border border-gov-200">
                    <span><strong>Phonetic Guide:</strong> <em>{activeResult.romanized}</em></span>
                    <span className="text-[10px] text-forest-800 font-black bg-forest-100 px-2.5 py-0.5 rounded-full border border-forest-200">
                      ⚡ {activeResult.latency_ms} ms Latency
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Categorized 1-Tap Command Chips & History (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-gov-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-gov-900 text-sm flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-forest-700" />
                <span>1-Tap Classroom Commands</span>
              </h3>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-forest-100 text-forest-800 font-bold">
                Instant Audio
              </span>
            </div>

            {/* Category Filter Pills */}
            <div className="flex gap-1 overflow-x-auto no-scrollbar pb-1">
              {[
                { id: 'all', label: 'All' },
                { id: 'commands', label: '🏫 Commands' },
                { id: 'numbers', label: '🔢 Numbers (1-10)' },
                { id: 'realia', label: '🌳 Nature & Realia' },
                { id: 'greetings', label: '🤝 Greetings' },
                { id: 'praise', label: '🌟 Praise' },
                { id: 'daily', label: '🍚 Daily' },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategoryFilter(cat.id)}
                  className={`px-3 py-1 rounded-xl text-[11px] font-black whitespace-nowrap transition-all ${
                    activeCategoryFilter === cat.id
                      ? 'bg-gov-900 text-white'
                      : 'bg-gov-100 text-gov-700 hover:bg-gov-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Chips Grid */}
            <div className="grid grid-cols-2 gap-2 max-h-[340px] overflow-y-auto pr-1">
              {filteredCommands.map((cmd, idx) => (
                <button
                  key={idx}
                  onClick={() => handleTranslateText(teacherVoiceLang === 'english' ? (cmd as any).en || cmd.hi : cmd.hi, 'hindi_to_tribal', true)}
                  className="p-3 rounded-2xl border border-gov-200 bg-gov-50/60 hover:bg-forest-50 hover:border-forest-300 text-left transition-all active:scale-95 group cursor-pointer"
                >
                  <div className="font-black text-xs text-gov-900 group-hover:text-forest-800">
                    {teacherVoiceLang === 'english' ? (cmd as any).en || cmd.hi : cmd.hi}
                  </div>
                  <div className="text-[10px] text-gov-500 font-medium group-hover:text-forest-600">
                    {teacherVoiceLang === 'english' ? cmd.hi : cmd.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Dialogue History with 1-Tap Play / Stop */}
          {history.length > 0 && (
            <div className="bg-white rounded-3xl p-5 border-2 border-gov-200 shadow-sm space-y-3">
              <div className="text-xs font-black text-gov-600 uppercase tracking-wider flex items-center justify-between">
                <span>Recent Dialogue History</span>
                <button
                  onClick={() => setHistory([])}
                  className="text-gov-400 hover:text-gov-700 text-[10px] font-bold"
                >
                  Clear
                </button>
              </div>
              <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
                {history.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => { setActiveResult(item); handlePlayTribalAudio(item); }}
                    className="p-3 rounded-2xl bg-gov-50 hover:bg-forest-50 text-xs cursor-pointer flex items-center justify-between border border-gov-100 transition-all group"
                  >
                    <div>
                      <span className="font-black text-gov-900">{item.source_text}</span>
                      <span className="text-gov-400 mx-1.5">➔</span>
                      <span className="text-forest-800 font-bold">{item.devanagari_text}</span>
                    </div>
                    <Volume2 className="w-4 h-4 text-gov-400 group-hover:text-forest-700" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
