import React, { useState, useEffect, useMemo } from 'react';
import { TribalLanguage, LessonPlan, BilingualStory } from '../types';
import { apiService } from '../services/apiService';
import { speechService } from '../services/speechService';
import { useLanguage } from '../context/LanguageContext';
import { JCERT_SUBJECTS, OFFICIAL_TEXTBOOKS_CATALOG, OfficialBookCatalogItem } from '../data/jcertCurriculum';
import { CurriculumCascadingSelector } from './CurriculumCascadingSelector';
import { 
  BookOpen, 
  Sparkles, 
  Volume2, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Layers,
  School,
  FileText,
  Search,
  Filter,
  Compass,
  Award,
  Leaf,
  Palette,
  BookMarked,
  Copy,
  Printer,
  HelpCircle,
  Check,
  X,
  RefreshCw,
  Download,
  ExternalLink,
  Library,
  GraduationCap,
  ListOrdered,
  FileCheck,
  CheckSquare,
  Bookmark,
  Share2,
  Sparkle,
  Radio,
  BookCheck,
  ArrowRight
} from 'lucide-react';

interface CurriculumHubProps {
  selectedLanguage: TribalLanguage;
  isOfflineMode: boolean;
}

type TabType = 'textbooks' | 'chapters' | 'stories' | 'standards' | 'generator';

export const CurriculumHub: React.FC<CurriculumHubProps> = ({
  selectedLanguage,
  isOfflineMode
}) => {
  const { t, uiLanguage } = useLanguage();
  const isHi = uiLanguage === 'hindi';

  const [activeTab, setActiveTab] = useState<TabType>('textbooks');
  const [lessons, setLessons] = useState<LessonPlan[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<LessonPlan | null>(null);
  
  // Grade and Subject Filters
  const [selectedGrade, setSelectedGrade] = useState<string>('Class 1');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Stories State
  const [stories, setStories] = useState<BilingualStory[]>([]);
  const [selectedStory, setSelectedStory] = useState<BilingualStory | null>(null);
  const [activeStoryPage, setActiveStoryPage] = useState<number>(0);
  const [playingStepIndex, setPlayingStepIndex] = useState<number | null>(null);
  const [copiedPlan, setCopiedPlan] = useState(false);

  // Interactive Quick Quiz / Worksheet State
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<number, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // A4 Printable Worksheet Modal State
  const [showWorksheetModal, setShowWorksheetModal] = useState(false);

  // Lesson Generator State
  const [genTopic, setGenTopic] = useState('');
  const [genGrade, setGenGrade] = useState('Class 1');
  const [isGenerating, setIsGenerating] = useState(false);

  // Selected Textbook for Filtering
  const [selectedTextbookId, setSelectedTextbookId] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, [selectedLanguage]);

  const loadData = async () => {
    try {
      const fetchedLessons = await apiService.fetchLessons();
      setLessons(fetchedLessons);
      if (fetchedLessons.length > 0 && !selectedLesson) {
        const defaultL = fetchedLessons.find(l => l.grade === 'Class 1') || fetchedLessons[0];
        setSelectedLesson(defaultL);
      }

      const fetchedStories = await apiService.fetchStories();
      setStories(fetchedStories);
      if (fetchedStories.length > 0 && !selectedStory) {
        setSelectedStory(fetchedStories[0]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Reset quiz when selectedLesson changes
  useEffect(() => {
    setSelectedQuizAnswers({});
    setQuizSubmitted(false);
    setShowQuiz(false);
  }, [selectedLesson?.id]);

  // Filter lessons based on grade, subject, textbook, and search query
  const filteredLessons = useMemo(() => {
    return lessons.filter(lesson => {
      // Grade filter
      const matchesGrade = selectedGrade === 'all' || 
        lesson.grade.toLowerCase().includes(selectedGrade.toLowerCase()) ||
        (selectedGrade === 'Balvatika' && lesson.grade.toLowerCase().includes('balvatika'));
      
      if (!matchesGrade) return false;

      // Subject filter
      if (selectedSubject !== 'all') {
        const matchesSubject = lesson.subject_code === selectedSubject || 
          lesson.subject?.toLowerCase().includes(selectedSubject.toLowerCase());
        if (!matchesSubject) return false;
      }

      // Search Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = lesson.title.toLowerCase().includes(q);
        const inTheme = lesson.theme?.toLowerCase().includes(q) || false;
        const inTopics = lesson.topics?.some(t => t.toLowerCase().includes(q)) || false;
        const inSubtopics = lesson.subtopics?.some(st => st.toLowerCase().includes(q)) || false;
        const inTextbook = lesson.textbook?.toLowerCase().includes(q) || false;
        const inTribal = (
          lesson.tribal_title?.santhali_dev?.toLowerCase().includes(q) ||
          lesson.tribal_title?.santhali_ol?.toLowerCase().includes(q) ||
          lesson.tribal_title?.mundari?.toLowerCase().includes(q) ||
          lesson.tribal_title?.ho?.toLowerCase().includes(q)
        ) || false;

        if (!inTitle && !inTheme && !inTopics && !inSubtopics && !inTextbook && !inTribal) {
          return false;
        }
      }

      return true;
    });
  }, [lessons, selectedGrade, selectedSubject, searchQuery]);

  // Keep selectedLesson in sync when filteredLessons changes
  useEffect(() => {
    if (filteredLessons.length > 0) {
      const exists = filteredLessons.find(l => l.id === selectedLesson?.id);
      if (!exists) {
        setSelectedLesson(filteredLessons[0]);
      }
    } else {
      setSelectedLesson(null);
    }
  }, [filteredLessons]);

  const handleGenerateLesson = async () => {
    if (!genTopic.trim()) return;
    setIsGenerating(true);
    try {
      const newPlan = await apiService.generateLesson(genTopic, genGrade, selectedLanguage);
      setLessons(prev => [newPlan, ...prev]);
      setSelectedLesson(newPlan);
      setSelectedGrade(genGrade);
      setActiveTab('chapters');
      setGenTopic('');
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePlayDialogue = (spokenText: string, lang: 'hindi' | TribalLanguage, stepIdx?: number) => {
    if (playingStepIndex === stepIdx && speechService.isSpeakingNow()) {
      speechService.stopSpeaking();
      setPlayingStepIndex(null);
      return;
    }
    if (stepIdx !== undefined) setPlayingStepIndex(stepIdx);
    speechService.toggleSpeak(
      spokenText, 
      lang, 
      () => { if (stepIdx !== undefined) setPlayingStepIndex(stepIdx); },
      () => { setPlayingStepIndex(null); }
    );
  };

  const handleCopyPlan = () => {
    if (!selectedLesson) return;
    const text = `JCERT / NCERT Jharkhand Multilingual Primary Lesson Plan
Title: ${selectedLesson.title}
Grade: ${selectedLesson.grade}
Subject: ${selectedLesson.subject}
Textbook: ${selectedLesson.textbook}
Theme: ${selectedLesson.theme}
NIPUN Bharat FLN Learning Outcomes:
${selectedLesson.learning_outcomes.map(o => '- ' + o).join('\n')}

Core Topics:
${(selectedLesson.topics || []).map(t => '- ' + t).join('\n')}

Subtopics:
${(selectedLesson.subtopics || []).map(st => '- ' + st).join('\n')}

Localized Realia TLM:
${(selectedLesson.tlem_realia || []).map(r => '- ' + r).join('\n')}

Instructional Steps:
${selectedLesson.steps.map(s => `Step ${s.step_number} (${s.time_mins} mins): ${s.type}\nTeacher (Hindi): ${s.teacher_hindi}\nMother Tongue (${selectedLanguage}): ${selectedLanguage === 'santhali' ? s.dialogue_santhali?.dev + ' (' + s.dialogue_santhali?.ol_chiki + ')' : selectedLanguage === 'mundari' ? s.dialogue_mundari?.dev : s.dialogue_ho?.dev || ''}`).join('\n\n')}`;

    navigator.clipboard.writeText(text);
    setCopiedPlan(true);
    setTimeout(() => setCopiedPlan(false), 2000);
  };

  const handlePrintPlan = () => {
    window.print();
  };

  // Helper to count lessons per subject in current grade
  const getSubjectCount = (subId: string) => {
    return lessons.filter(l => {
      const matchesGrade = selectedGrade === 'all' || l.grade.toLowerCase().includes(selectedGrade.toLowerCase());
      return matchesGrade && (l.subject_code === subId || l.subject?.toLowerCase().includes(subId));
    }).length;
  };

  // Filter Official Textbooks Catalog by Grade and Subject
  const filteredTextbooks = useMemo(() => {
    return OFFICIAL_TEXTBOOKS_CATALOG.filter(book => {
      const matchesGrade = selectedGrade === 'all' || 
        book.grade.toLowerCase().includes(selectedGrade.toLowerCase()) ||
        (selectedGrade === 'Balvatika' && book.gradeKey === 'balvatika');
      if (!matchesGrade) return false;

      if (selectedSubject !== 'all') {
        const matchesSub = book.subject === selectedSubject || 
          (selectedSubject === 'hindi' && book.subject === 'hindi') ||
          (selectedSubject === 'math' && (book.subject === 'math' || book.subject === 'math_santhali')) ||
          (selectedSubject === 'evs' && book.subject === 'evs') ||
          (selectedSubject === 'english' && book.subject === 'english');
        if (!matchesSub) return false;
      }
      return true;
    });
  }, [selectedGrade, selectedSubject]);

  // Jump from Textbook Card to Chapter Explorer with that Grade/Subject
  const handleExploreTextbook = (book: OfficialBookCatalogItem) => {
    setSelectedGrade(book.grade);
    if (book.subject === 'math_santhali') {
      setSelectedSubject('math');
    } else {
      setSelectedSubject(book.subject);
    }
    setSelectedTextbookId(book.id);
    setActiveTab('chapters');
  };

  // Dynamic quiz questions for the selected lesson
  const quizQuestions = useMemo(() => {
    if (!selectedLesson) return [];
    const tTitle = selectedLesson.tribal_title;
    const sOl = tTitle?.santhali_ol || 'ᱫᱟᱨᱮ';
    const sDev = tTitle?.santhali_dev || 'दारे';

    return [
      {
        id: 1,
        question: `अध्याय शीर्षक का मातृभाषा (${selectedLanguage.toUpperCase()}) रूप क्या है? / What is the primary Mother Tongue title for this chapter?`,
        options: [
          { id: 'A', text: `${sDev} ${sOl ? `(${sOl})` : ''}`, isCorrect: true },
          { id: 'B', text: 'दाः आर गाडा (ᱫᱟᱜ ᱟᱨ ᱜᱟᱰᱟ) - जल एवं नदी (Water & River)', isCorrect: false },
          { id: 'C', text: 'ओड़ाः आर घारोंज (ᱳᱲᱟᱜ ᱟᱨ ᱜᱷᱟᱨᱚᱸᱡᱽ) - घर एवं परिवार (Home & Family)', isCorrect: false }
        ]
      },
      {
        id: 2,
        question: `इस पाठ के शिक्षण हेतु सबसे उपयुक्त स्थानीय टीएलएम (Realia TLM) कौन सा है?`,
        options: [
          { id: 'A', text: selectedLesson.tlem_realia?.[0] || 'सखुआ (साल) के पत्ते, बीज एवं कंकड़ (Sal leaves & counting pebbles)', isCorrect: true },
          { id: 'B', text: 'कंप्यूटर लैब एवं इलेक्ट्रॉनिक वीडियो गेम (Electronic games)', isCorrect: false },
          { id: 'C', text: 'बिना किसी गतिविधि के केवल श्यामपट्ट (Only blackboard without objects)', isCorrect: false }
        ]
      },
      {
        id: 3,
        question: `निपुण भारत FLN के तहत इस पाठ का मुख्य अधिगम प्रतिफल (Learning Outcome) क्या है?`,
        options: [
          { id: 'A', text: selectedLesson.learning_outcomes[0] || 'मातृभाषा से मानक भाषा का सहज सेतु एवं बुनियादी अवधारणा की समझ', isCorrect: true },
          { id: 'B', text: 'कठिन विदेशी व्याकरण नियमों का रटना (Rote memorization)', isCorrect: false },
          { id: 'C', text: 'जटिल त्रिकोणमितीय गणनाएं (Complex calculations)', isCorrect: false }
        ]
      }
    ];
  }, [selectedLesson, selectedLanguage]);

  // NIPUN Bharat FLN Competency Grid Data
  const FLN_STANDARDS_DATA = [
    {
      grade: 'Balvatika (Age 5-6)',
      gradeHindi: 'बालवाटिका (आयु 5-6 वर्ष)',
      literacy: [
        'मातृभाषा में सरल संवाद एवं अपनी भावनाओं की मौखिक अभिव्यक्ति (Oral Expression)',
        'ध्वनि पहचान (Phonological Awareness) एवं तुकांत कविताओं का सस्वर गान',
        'चित्र पठन (Picture Reading) एवं बाएं से दाएं पुस्तक पृष्ठ पलटना'
      ],
      numeracy: [
        '1 से 10 तक मूर्त वस्तुओं (पत्तों, कंकड़ों) के साथ गिनती (Concrete Counting)',
        'बड़ा-छोटा, भारी-हल्का, दूर-पास की स्थानिक समझ (Spatial Concepts)',
        'मूलभूत ज्यामितीय आकृतियों (गोल, चौकोर, तिकोना) की पहचान'
      ],
      relevantBooks: ['मांदर 1 (प्रारंभिक)', 'आनंदमय गणित 1 (खिलौने)']
    },
    {
      grade: 'Class 1 (Grade 1 / Age 6-7)',
      gradeHindi: 'कक्षा 1 (ग्रेड 1 / आयु 6-7 वर्ष)',
      literacy: [
        'मातृभाषा व हिन्दी वर्णमाला पहचान एवं 2-3 वर्णों के सरल शब्दों का पठन',
        'चित्र देखकर 3-4 वाक्यों में कहानी या घटना का वर्णन करना',
        'सरल अपठित गद्यांश के छोटे वाक्यों को समझकर पढ़ना'
      ],
      numeracy: [
        '1 से 99 तक संख्याओं का ज्ञान, स्थान-मान एवं तुलना',
        '1 से 9 तक जोड़ एवं घटाव की संक्रियाएं मूर्त टीएलएम के साथ',
        'आकृतियों एवं दैनिक वस्तुओं का वर्गीकरण व पैटर्न पहचान'
      ],
      relevantBooks: ['सारंगी भाग 1 (ahsr1)', 'आनंदमय गणित भाग 1 (ahjm1)', 'Mridang Book 1 (aemr1)', 'ᱨᱟᱹᱥᱠᱟᱹ ᱮᱞᱠᱷᱟ ᱑ (asnjm1)']
    },
    {
      grade: 'Class 2 (Grade 2 / Age 7-8)',
      gradeHindi: 'कक्षा 2 (ग्रेड 2 / आयु 7-8 वर्ष)',
      literacy: [
        '45-60 शब्द प्रति मिनट की गति से सही उच्चारण व प्रवाह के साथ पठन',
        'कहानियों से निष्कर्ष निकालना एवं "कौन", "कहाँ", "क्यों" प्रश्नों के उत्तर देना',
        'मातृभाषा (संथाली/मुंडारी/हो) एवं हिन्दी में लघु वाक्य लेखन'
      ],
      numeracy: [
        '1 से 999 तक संख्याओं का ज्ञान एवं 2-अंकीय संख्याओं का जोड़-घटाव',
        'कैलेंडर, दिन, सप्ताह, महीने एवं स्थानीय मुद्रा (रुपए-पैसे) की समझ',
        'लंबाई एवं वजन की अमानक व मानक इकाइयों से प्राथमिक माप'
      ],
      relevantBooks: ['सारंगी भाग 2 (bhsr1)', 'आनंदमय गणित भाग 2 (bhjm1)', 'Mridang Book 2 (bemr1)', 'ᱨᱟᱹᱥᱠᱟᱹ ᱮᱞᱠᱷᱟ ᱒ (bsnjm1)']
    },
    {
      grade: 'Class 3 (Grade 3 / Age 8-9)',
      gradeHindi: 'कक्षा 3 (ग्रेड 3 / आयु 8-9 वर्ष)',
      literacy: [
        '60+ शब्द प्रति मिनट की गति से धाराप्रवाह पठन एवं जटिल गद्यांशों का भाव ग्रहण',
        'समूह चर्चा में सक्रिय भागीदारी एवं अपने विचारों को तर्कसम्मत रूप से प्रस्तुत करना',
        'अनुच्छेद लेखन, पत्र लेखन एवं लोककथाओं का पुनर्लेखन'
      ],
      numeracy: [
        '3-अंकीय संख्याओं का गुणा (Multiplication) एवं समान वितरण (Division) की समझ',
        'भिन्नों की प्राथमिक अवधारणा (आधा, एक-चौथाई) एवं 2-चरणीय इबारती प्रश्न',
        'डाटा हैंडलिंग (तालिका व चित्रलेख से जानकारी प्राप्त करना)'
      ],
      relevantBooks: ['Maths Mela 3 (cemm1)', 'Santoor Book 3 (cesa1)', 'वीणा 3 / Our Wondrous World (chve1)', 'भाषांजलि 3 (JCERT)']
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 space-y-6">
      {/* 1. Official Government Department Branding & Accreditation Header */}
      <div className="bg-gradient-to-r from-gov-900 via-gov-800 to-forest-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gov-700 relative overflow-hidden">
        {/* Subtle background seal pattern */}
        <div className="absolute right-0 top-0 bottom-0 opacity-10 flex items-center pr-8 pointer-events-none select-none text-9xl">
          🏛️
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            {/* Accreditation Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-black bg-amber-400 text-gov-950 shadow-xs flex items-center gap-1.5">
                <span>🏛️</span>
                <span>{isHi ? 'झारखंड सरकार' : 'Govt. of Jharkhand'}</span>
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-white/20 backdrop-blur-md text-white border border-white/30">
                JCERT रांची • NCERT नई दिल्ली
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-forest-500/80 text-white border border-forest-400">
                🎯 {isHi ? 'निपुण भारत FLN' : 'NIPUN Bharat FLN'}
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-blue-500/70 text-white border border-blue-400">
                📖 {isHi ? 'समग्र शिक्षा' : 'Samagra Shiksha'}
              </span>
              {isOfflineMode && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-500 text-white animate-pulse">
                  ⚡ OFFLINE READY
                </span>
              )}
            </div>

            {/* Portal Main Title */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white flex items-center gap-3">
                <Library className="w-8 h-8 text-amber-300 shrink-0" />
                <span>
                  {isHi 
                    ? 'झारखंड ई-पाठ्यपुस्तक एवं प्राथमिक पाठ्यक्रम पोर्टल' 
                    : 'Jharkhand Digital e-Textbooks & Primary Curriculum Portal'}
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-gov-100 max-w-4xl mt-2 leading-relaxed">
                {isHi
                  ? 'झारखंड शैक्षिक अनुसंधान एवं प्रशिक्षण परिषद् (JCERT) एवं NCERT की आधिकारिक प्राथमिक पाठ्यपुस्तकें (सारंगी, आनंदमय गणित, संथाली गणित, मृदंग, संतूर, वीणा, मांदर, सखुआ, भाषांजलि) - 159 अध्याय, शिक्षण-संकेत, स्थानीय TLM, एवं बहुभाषी मातृभाषा संवाद (संथाली, मुंडारी, हो)।'
                  : 'Official Jharkhand Council of Educational Research & Training (JCERT) & NCERT primary textbooks (Sarangi, Joyful Math, Santhali Math, Mridang, Santoor, Veena, Mandar, Sakhua, Bhashanjali) with 159 extracted chapters, teacher hints (शिक्षण-संकेत), localized Realia TLM, and mother-tongue pedagogical scripts.'}
              </p>
            </div>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/15">
                <div className="text-lg font-black text-amber-300">11 {isHi ? 'पाठ्यपुस्तकें' : 'Books'}</div>
                <div className="text-[11px] text-gov-200 font-semibold">{isHi ? 'आधिकारिक डिजिटल ई-बुक्स' : 'Official Digital Textbooks'}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/15">
                <div className="text-lg font-black text-emerald-300">159 {isHi ? 'अध्याय' : 'Chapters'}</div>
                <div className="text-[11px] text-gov-200 font-semibold">{isHi ? 'शिक्षण-संकेत एवं अभ्यास' : 'With Teacher Hints & TLM'}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/15">
                <div className="text-lg font-black text-sky-300">3 {isHi ? 'मातृभाषाएं' : 'Tribal Tongues'}</div>
                <div className="text-[11px] text-gov-200 font-semibold">Santali • Mundari • Ho (Ol Chiki)</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/15">
                <div className="text-lg font-black text-purple-300">100% {isHi ? 'निपुण FLN' : 'NIPUN FLN'}</div>
                <div className="text-[11px] text-gov-200 font-semibold">{isHi ? 'कक्षा 1-3 बुनियादी दक्षता' : 'Foundational Competencies'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Top-Level Portal Navigation Tabs */}
      <div className="bg-white rounded-2xl border border-gov-200 p-2 shadow-sm flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {/* Tab 1: Textbooks */}
          <button
            onClick={() => setActiveTab('textbooks')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'textbooks'
                ? 'bg-gov-900 text-white shadow-sm'
                : 'text-gov-700 hover:bg-gov-100 hover:text-gov-950'
            }`}
          >
            <Library className="w-4 h-4 text-amber-400" />
            <span>{isHi ? '📚 आधिकारिक पाठ्यपुस्तकें (11)' : '📚 Official Textbooks (11)'}</span>
          </button>

          {/* Tab 2: Chapters */}
          <button
            onClick={() => setActiveTab('chapters')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'chapters'
                ? 'bg-gov-900 text-white shadow-sm'
                : 'text-gov-700 hover:bg-gov-100 hover:text-gov-950'
            }`}
          >
            <BookOpen className="w-4 h-4 text-forest-400" />
            <span>{isHi ? '📖 अध्याय अन्वेषक (159)' : '📖 Chapter Explorer (159)'}</span>
          </button>

          {/* Tab 3: Folktales */}
          <button
            onClick={() => setActiveTab('stories')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'stories'
                ? 'bg-gov-900 text-white shadow-sm'
                : 'text-gov-700 hover:bg-gov-100 hover:text-gov-950'
            }`}
          >
            <BookMarked className="w-4 h-4 text-amber-500" />
            <span>{isHi ? '📜 बहुभाषी लोककथाएं' : '📜 Multilingual Folktales'}</span>
          </button>

          {/* Tab 4: FLN Standards */}
          <button
            onClick={() => setActiveTab('standards')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'standards'
                ? 'bg-gov-900 text-white shadow-sm'
                : 'text-gov-700 hover:bg-gov-100 hover:text-gov-950'
            }`}
          >
            <Award className="w-4 h-4 text-blue-400" />
            <span>{isHi ? '📊 निपुण FLN मानक' : '📊 NIPUN FLN Standards'}</span>
          </button>
        </div>

        {/* AI Lesson Generator Action */}
        <button
          onClick={() => setActiveTab('generator')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'generator'
              ? 'bg-forest-800 text-white shadow-sm ring-2 ring-forest-600'
              : 'bg-forest-50 text-forest-900 border border-forest-300 hover:bg-forest-100'
          }`}
        >
          <Sparkles className="w-4 h-4 text-forest-700" />
          <span>{isHi ? '✨ AI पाठ योजनाकार' : '✨ AI Lesson Planner'}</span>
        </button>
      </div>

      {/* 3. Global Filter & Search Bar for Textbooks & Chapters */}
      {(activeTab === 'textbooks' || activeTab === 'chapters') && (
        <div className="bg-white rounded-2xl border border-gov-200 p-4 shadow-sm space-y-3.5">
          {/* Grade Selector Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gov-100 pb-3">
            <div className="flex items-center gap-2">
              <School className="w-4 h-4 text-forest-700 shrink-0" />
              <span className="text-xs font-black text-gov-900 uppercase tracking-wider">
                {isHi ? 'कक्षा / ग्रेड चुनें:' : 'Select Grade / Class:'}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'Class 1', label: isHi ? 'कक्षा 1 (Class 1)' : 'Class 1', sub: 'Sarangi, Joyful Math, Mridang, Ol Chiki' },
                { id: 'Class 2', label: isHi ? 'कक्षा 2 (Class 2)' : 'Class 2', sub: 'Sarangi 2, Joyful Math 2, Mridang 2' },
                { id: 'Class 3', label: isHi ? 'कक्षा 3 (Class 3)' : 'Class 3', sub: 'Maths Mela, Santoor, Veena, Bhashanjali' },
                { id: 'Balvatika', label: isHi ? 'बालवाटिका (Balvatika)' : 'Balvatika', sub: 'Vidya Pravesh' },
                { id: 'all', label: isHi ? 'सभी कक्षाएं (All Grades)' : 'All Grades', sub: 'Complete Catalog' }
              ].map((g) => (
                <button
                  key={g.id}
                  onClick={() => setSelectedGrade(g.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    selectedGrade === g.id
                      ? 'bg-gov-900 text-white shadow-sm ring-2 ring-gov-900 ring-offset-1'
                      : 'bg-gov-100 text-gov-700 hover:bg-gov-200 hover:text-gov-900'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* Subject Filter Row & Search Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-0.5">
            {/* Subject Tabs */}
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => setSelectedSubject('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedSubject === 'all'
                    ? 'bg-forest-800 text-white shadow-xs'
                    : 'bg-gov-50 text-gov-700 hover:bg-gov-100 border border-gov-200'
                }`}
              >
                📚 {isHi ? 'सभी विषय' : 'All Subjects'}
              </button>

              {JCERT_SUBJECTS.map((sub) => {
                const count = getSubjectCount(sub.id);
                const isSelected = selectedSubject === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSubject(sub.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 border cursor-pointer ${
                      isSelected
                        ? 'bg-gov-900 text-white border-gov-900 shadow-xs'
                        : 'bg-white text-gov-800 hover:bg-gov-50 border-gov-200'
                    }`}
                  >
                    <span>{sub.icon}</span>
                    <span>{isHi ? sub.nameHindi.split('(')[0] : sub.nameEnglish}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-gov-100 text-gov-600'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[260px] md:w-80">
              <Search className="w-4 h-4 text-gov-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isHi ? "पाठ, विषय, शिक्षण-संकेत या ओल चिकी खोजें..." : "Search chapters, hints, or Ol Chiki..."}
                className="w-full pl-9 pr-8 py-2 text-xs rounded-xl border border-gov-300 focus:outline-none focus:ring-2 focus:ring-gov-900 bg-gov-50/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gov-400 hover:text-gov-700 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 1: 📚 OFFICIAL DIGITAL TEXTBOOKS LIBRARY (Digital Bookshelf)          */}
      {/* ========================================================================= */}
      {activeTab === 'textbooks' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-gov-900 flex items-center gap-2">
                <span>📚</span>
                <span>{isHi ? 'आधिकारिक डिजिटल ई-पाठ्यपुस्तक संग्रह' : 'Official Digital e-Textbooks Collection'}</span>
              </h2>
              <p className="text-xs text-gov-600 mt-0.5">
                {isHi 
                  ? 'JCERT एवं NCERT द्वारा अनुमोदित प्राथमिक कक्षा 1, 2, 3 एवं बालवाटिका की संपूर्ण पाठ्यपुस्तकें'
                  : 'Complete primary textbooks approved by JCERT & NCERT for Class 1, 2, 3 & Balvatika with chapter breakdowns'}
              </p>
            </div>
            <div className="text-xs font-bold text-gov-600 bg-gov-100 px-3 py-1.5 rounded-xl border border-gov-200">
              {filteredTextbooks.length} {isHi ? 'पाठ्यपुस्तकें प्रदर्शित' : 'Textbooks Displayed'}
            </div>
          </div>

          {/* Digital Bookshelf Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTextbooks.map((book) => (
              <div
                key={book.id}
                className={`bg-white rounded-2xl border-2 transition-all duration-200 hover:shadow-lg flex flex-col overflow-hidden group ${book.borderColor}`}
              >
                {/* Book Cover Spine Header */}
                <div className={`p-5 bg-gradient-to-r ${book.accentGradient} text-white relative`}>
                  <div className="flex items-start justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/30">
                      Code: {book.bookCode}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-black bg-white text-gov-900 shadow-xs">
                      {book.grade}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <span className="text-3xl filter drop-shadow-md">{book.icon}</span>
                    <div>
                      <h3 className="text-lg font-black text-white leading-tight">
                        {book.titleOfficial}
                      </h3>
                      <p className="text-xs text-white/90 font-medium mt-0.5">
                        {book.subjectNameHindi}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Book Metadata & State Equivalent */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="p-2.5 rounded-xl bg-gov-50 border border-gov-200 flex items-center justify-between text-xs">
                      <span className="text-gov-600 font-semibold">{isHi ? 'राज्य समकक्ष पुस्तक:' : 'State Equivalent:'}</span>
                      <span className="font-extrabold text-gov-900">{book.stateEquivalent}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs font-bold text-gov-700">
                      <span className="flex items-center gap-1.5">
                        <ListOrdered className="w-4 h-4 text-forest-700" />
                        <span>{isHi ? 'कुल अध्याय:' : 'Total Chapters:'}</span>
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md font-black bg-forest-100 text-forest-900 border border-forest-200">
                        {book.totalChapters} {isHi ? 'पाठ' : 'Chapters'}
                      </span>
                    </div>

                    {/* Featured Chapters Preview */}
                    <div className="space-y-1.5 pt-1">
                      <div className="text-[10px] font-black uppercase text-gov-500 tracking-wider">
                        {isHi ? 'प्रमुख अध्याय एवं विषय:' : 'Key Chapters & Themes:'}
                      </div>
                      <div className="space-y-1">
                        {book.featuredChapters.map((ch, idx) => (
                          <div
                            key={idx}
                            className="p-2 rounded-lg bg-gov-50/70 border border-gov-100 flex items-center justify-between text-xs text-gov-800"
                          >
                            <div className="flex items-center gap-2">
                              <span className="w-4 h-4 rounded-full bg-gov-200 text-gov-700 text-[10px] font-black flex items-center justify-center shrink-0">
                                {ch.chNum}
                              </span>
                              <span className="font-bold text-gov-900 truncate max-w-[180px] sm:max-w-[200px]">
                                {ch.titleHindi}
                              </span>
                            </div>
                            <span className="text-[10px] font-semibold text-forest-800 bg-white px-1.5 py-0.5 rounded border border-forest-100">
                              {ch.titleTribal}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Explore Book CTA */}
                  <button
                    onClick={() => handleExploreTextbook(book)}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-black text-white bg-gradient-to-r ${book.accentGradient} hover:opacity-95 shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer`}
                  >
                    <span>{isHi ? 'अध्याय एवं पाठ योजनाएं देखें' : 'Explore Chapters & Plans'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: 📖 CHAPTER-BY-CHAPTER CURRICULUM EXPLORER                          */}
      {/* ========================================================================= */}
      {activeTab === 'chapters' && (
        <div className="space-y-6">
          {/* Official Cascading Curriculum Selector for Quick Filtering */}
          <CurriculumCascadingSelector
            selectedLanguage={selectedLanguage}
            selectedGrade={selectedGrade === 'all' ? 'Class 1' : selectedGrade}
            selectedSubjectId={selectedSubject === 'all' ? 'hindi' : (selectedSubject as any)}
            selectedChapterId={selectedLesson?.id}
            onGradeChange={(g) => {
              setSelectedGrade(g);
            }}
            onSubjectChange={(sId) => {
              setSelectedSubject(sId);
            }}
            onChapterSelect={(ch) => {
              if (ch) setSelectedLesson(ch);
            }}
            showDetailsCard={false}
          />

          {/* 2-Column Catalog & Comprehensive Dossier View */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Searchable Chapter Directory (4 cols) */}
            <div className="lg:col-span-4 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-gov-600 px-1">
                <span>
                  {isHi ? 'अध्याय सूची' : 'Chapter Catalog'} ({filteredLessons.length} {isHi ? 'उपलब्ध' : 'available'})
                </span>
                <span className="text-forest-700 font-extrabold uppercase text-[11px] bg-forest-50 px-2 py-0.5 rounded border border-forest-200">
                  {selectedLanguage} Bridge
                </span>
              </div>

              {/* Lessons List Scrollbox */}
              <div className="space-y-3 max-h-[750px] overflow-y-auto pr-1">
                {filteredLessons.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-dashed border-gov-300 p-8 text-center text-gov-500 space-y-2">
                    <p className="text-sm font-semibold">{isHi ? 'कोई अध्याय नहीं मिला' : 'No Chapters Found'}</p>
                    <p className="text-xs text-gov-400">{isHi ? 'कृपया कक्षा या विषय फिल्टर बदलें।' : 'Please adjust your filter settings.'}</p>
                    <button
                      onClick={() => { setSelectedGrade('Class 1'); setSelectedSubject('all'); setSearchQuery(''); }}
                      className="px-3.5 py-1.5 rounded-xl bg-gov-900 text-white text-xs font-bold mt-2 cursor-pointer"
                    >
                      {isHi ? 'फ़िल्टर रीसेट करें' : 'Reset Filters'}
                    </button>
                  </div>
                ) : (
                  filteredLessons.map((lesson) => {
                    const isSelected = selectedLesson?.id === lesson.id;
                    const subMetadata = JCERT_SUBJECTS.find(s => s.id === lesson.subject_code);

                    return (
                      <div
                        key={lesson.id}
                        onClick={() => setSelectedLesson(lesson)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all space-y-2.5 ${
                          isSelected
                            ? 'bg-forest-50/90 border-forest-600 shadow-sm ring-2 ring-forest-500/30'
                            : 'bg-white border-gov-200 hover:border-gov-300 hover:bg-gov-50/70'
                        }`}
                      >
                        {/* Header Badges */}
                        <div className="flex items-center justify-between gap-1">
                          <div className="flex items-center gap-1.5">
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-gov-900 text-white">
                              {lesson.grade}
                            </span>
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                              subMetadata?.badgeBg || 'bg-gov-100 text-gov-800 border-gov-200'
                            }`}>
                              {lesson.subject || 'JCERT'}
                            </span>
                          </div>
                          <span className="text-[11px] text-gov-500 font-semibold flex items-center gap-1">
                            <Clock className="w-3 h-3 text-gov-400" /> {lesson.duration_minutes || 40}m
                          </span>
                        </div>

                        {/* Chapter Title */}
                        <div>
                          <div className="text-[10px] font-bold text-forest-800">
                            {lesson.textbook || 'JCERT / NCERT Textbook'}
                          </div>
                          <h4 className="font-extrabold text-sm text-gov-900 leading-snug mt-0.5">
                            {lesson.title}
                          </h4>
                          
                          {/* Tribal Title Preview */}
                          {lesson.tribal_title && (
                            <div className="mt-1 text-xs font-bold text-forest-900">
                              {selectedLanguage === 'santhali' ? (
                                <div className="space-y-0.5">
                                  {lesson.tribal_title.santhali_ol && (
                                    <div className="text-xs font-black text-gov-900">
                                      {lesson.tribal_title.santhali_ol}
                                    </div>
                                  )}
                                  <div className="text-[11px] text-forest-800 font-semibold">
                                    {lesson.tribal_title.santhali_dev}
                                  </div>
                                </div>
                              ) : selectedLanguage === 'mundari' ? (
                                <div className="text-xs text-forest-800 font-semibold">
                                  {lesson.tribal_title.mundari}
                                </div>
                              ) : (
                                <div className="text-xs text-forest-800 font-semibold">
                                  {lesson.tribal_title.ho}
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Topics Preview Badges */}
                        {lesson.topics && lesson.topics.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-0.5">
                            {lesson.topics.slice(0, 2).map((t, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white border border-gov-200 text-gov-700"
                              >
                                📌 {t}
                              </span>
                            ))}
                            {lesson.topics.length > 2 && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-gov-100 text-gov-600">
                                +{lesson.topics.length - 2} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Right Column: Full Interactive Chapter Dossier (8 cols) */}
            <div className="lg:col-span-8">
              {selectedLesson ? (
                <div className="bg-white rounded-2xl border border-gov-200 p-6 sm:p-7 shadow-sm space-y-6">
                  {/* 1. Chapter Banner Header */}
                  <div className="border-b border-gov-100 pb-5 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-lg text-xs font-black bg-gov-900 text-white">
                          {selectedLesson.grade}
                        </span>
                        <span className="px-3 py-1 rounded-lg text-xs font-bold bg-forest-100 text-forest-900 border border-forest-200">
                          {selectedLesson.subject || 'JCERT Textbook'}
                        </span>
                        <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200">
                          {selectedLesson.textbook || 'JCERT Jharkhand'}
                        </span>
                      </div>
                      
                      {/* Action buttons: Copy, Print, Quiz, Worksheet */}
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          onClick={handleCopyPlan}
                          className="px-2.5 py-1.5 rounded-lg text-xs font-bold border border-gov-200 text-gov-700 hover:bg-gov-50 flex items-center gap-1 transition-all cursor-pointer"
                          title="Copy Lesson Plan"
                        >
                          {copiedPlan ? <Check className="w-3.5 h-3.5 text-forest-700" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedPlan ? (isHi ? 'कॉपी किया गया' : 'Copied') : (isHi ? 'कॉपी' : 'Copy')}</span>
                        </button>
                        <button
                          onClick={handlePrintPlan}
                          className="px-2.5 py-1.5 rounded-lg text-xs font-bold border border-gov-200 text-gov-700 hover:bg-gov-50 flex items-center gap-1 transition-all cursor-pointer"
                          title="Print Plan"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>{isHi ? 'प्रिंट' : 'Print'}</span>
                        </button>
                        <button
                          onClick={() => setShowWorksheetModal(true)}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-50 text-blue-900 border border-blue-200 hover:bg-blue-100 flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5 text-blue-700" />
                          <span>{isHi ? 'A4 कार्यपत्रक' : 'A4 Worksheet'}</span>
                        </button>
                        <button
                          onClick={() => setShowQuiz(prev => !prev)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                            showQuiz 
                              ? 'bg-amber-600 text-white ring-2 ring-amber-500' 
                              : 'bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100'
                          }`}
                        >
                          <HelpCircle className="w-3.5 h-3.5" />
                          <span>{showQuiz ? (isHi ? 'क्विज़ छिपाएं' : 'Hide Quiz') : (isHi ? 'निपुण क्विज़' : 'NIPUN Quiz')}</span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-gov-900 tracking-tight">
                        {selectedLesson.title}
                      </h3>

                      {/* Multilingual Tribal Names */}
                      {selectedLesson.tribal_title && (
                        <div className="mt-2 p-3 bg-forest-50/80 rounded-xl border border-forest-200 space-y-1">
                          <div className="text-[10px] font-black uppercase text-forest-800 tracking-wider">
                            {isHi ? 'मातृभाषा शीर्षक रूप:' : 'Mother Tongue Title Equivalents:'}
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs">
                            <div className="bg-white p-2 rounded-lg border border-forest-100">
                              <span className="text-[10px] font-bold text-gov-500 block">Santali (Ol Chiki & Devanagari):</span>
                              {selectedLesson.tribal_title.santhali_ol && (
                                <span className="font-bold text-gov-900 block text-xs font-sans">
                                  {selectedLesson.tribal_title.santhali_ol}
                                </span>
                              )}
                              <span className="font-semibold text-forest-900 text-[11px]">
                                {selectedLesson.tribal_title.santhali_dev}
                              </span>
                            </div>

                            <div className="bg-white p-2 rounded-lg border border-forest-100">
                              <span className="text-[10px] font-bold text-gov-500 block">Mundari:</span>
                              <span className="font-semibold text-forest-900 text-xs">
                                {selectedLesson.tribal_title.mundari}
                              </span>
                            </div>

                            <div className="bg-white p-2 rounded-lg border border-forest-100">
                              <span className="text-[10px] font-bold text-gov-500 block">Ho Language:</span>
                              <span className="font-semibold text-forest-900 text-xs">
                                {selectedLesson.tribal_title.ho}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Official Teacher Pedagogical Guide / Hints (शिक्षण-संकेत) */}
                    {(selectedLesson.teacher_guide || selectedLesson.theme) && (
                      <div className="p-3.5 bg-amber-50/90 rounded-xl border border-amber-200 text-xs text-amber-950 font-medium space-y-1">
                        <div className="font-black flex items-center gap-1.5 text-amber-900">
                          <span>💡</span>
                          <span>{isHi ? 'आधिकारिक शिक्षण-संकेत (Teacher Pedagogical Hints):' : 'Official Teacher Pedagogical Hints:'}</span>
                        </div>
                        <p className="leading-relaxed">
                          {selectedLesson.teacher_guide || `विद्यार्थियों को परिवेशीय वस्तुओं (सखुआ के पत्ते, स्थानीय खिलौनों) की सहायता से अवधारणा को मातृभाषा (${selectedLanguage}) में समझाएं तथा मानक भाषा से सहज सेतु बनाएं।`}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Interactive Quick Quiz / Formative Checkpoint Section */}
                  {showQuiz && (
                    <div className="bg-amber-50/60 p-5 rounded-2xl border-2 border-amber-300 space-y-4 shadow-sm animate-fade-in">
                      <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                        <div className="flex items-center gap-2">
                          <HelpCircle className="w-5 h-5 text-amber-700" />
                          <h4 className="font-black text-sm text-amber-950">
                            {isHi ? 'निपुण भारत बुनियादी दक्षता त्वरित मूल्यांकन' : 'NIPUN Bharat FLN Formative Checkpoint'}
                          </h4>
                        </div>
                        <span className="text-xs font-bold text-amber-800">
                          3 Questions • Auto-Evaluated
                        </span>
                      </div>

                      <div className="space-y-4">
                        {quizQuestions.map((q, qIdx) => {
                          const userAns = selectedQuizAnswers[q.id];
                          return (
                            <div key={q.id} className="bg-white p-3.5 rounded-xl border border-amber-200 space-y-2">
                              <p className="text-xs font-bold text-gov-900">
                                {qIdx + 1}. {q.question}
                              </p>
                              <div className="space-y-1.5">
                                {q.options.map((opt) => {
                                  const isSelected = userAns === opt.id;
                                  let optClass = 'bg-gov-50 hover:bg-gov-100 text-gov-800 border-gov-200';
                                  if (quizSubmitted) {
                                    if (opt.isCorrect) optClass = 'bg-forest-100 text-forest-900 border-forest-400 font-bold';
                                    else if (isSelected) optClass = 'bg-red-100 text-red-900 border-red-300 line-through';
                                  } else if (isSelected) {
                                    optClass = 'bg-gov-900 text-white border-gov-900 font-bold';
                                  }

                                  return (
                                    <button
                                      key={opt.id}
                                      disabled={quizSubmitted}
                                      onClick={() => setSelectedQuizAnswers(prev => ({ ...prev, [q.id]: opt.id }))}
                                      className={`w-full text-left px-3 py-2 rounded-lg text-xs border transition-all flex items-center justify-between cursor-pointer ${optClass}`}
                                    >
                                      <span>{opt.id}) {opt.text}</span>
                                      {quizSubmitted && opt.isCorrect && <Check className="w-4 h-4 text-forest-700" />}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        {!quizSubmitted ? (
                          <button
                            onClick={() => setQuizSubmitted(true)}
                            disabled={Object.keys(selectedQuizAnswers).length === 0}
                            className="px-4 py-2 rounded-xl bg-forest-800 hover:bg-forest-900 text-white text-xs font-bold shadow-xs disabled:opacity-50 cursor-pointer"
                          >
                            {isHi ? 'उत्तर सबमिट करें' : 'Submit Answers'}
                          </button>
                        ) : (
                          <div className="flex items-center justify-between w-full">
                            <span className="text-xs font-black text-forest-900">
                              🎉 {isHi ? 'मूल्यांकन पूर्ण! उत्कृष्ट प्रयास।' : 'Evaluation Completed! Great job.'}
                            </span>
                            <button
                              onClick={() => { setSelectedQuizAnswers({}); setQuizSubmitted(false); }}
                              className="px-3 py-1.5 rounded-lg border border-amber-400 text-amber-900 text-xs font-bold flex items-center gap-1 hover:bg-amber-100 cursor-pointer"
                            >
                              <RefreshCw className="w-3 h-3" /> {isHi ? 'पुनः प्रयास करें' : 'Try Again'}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* 2. Structured Curriculum Topics & Subtopics Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Topics Card */}
                    <div className="bg-gov-50 p-4 rounded-xl border border-gov-200 space-y-2">
                      <div className="text-xs font-black text-gov-800 uppercase tracking-wider flex items-center gap-1.5">
                        <Compass className="w-4 h-4 text-forest-700" />
                        <span>{isHi ? 'प्रमुख पाठ्यक्रम विषय (Core Topics):' : 'Core Curriculum Topics:'}</span>
                      </div>
                      <div className="space-y-1.5">
                        {(selectedLesson.topics && selectedLesson.topics.length > 0
                          ? selectedLesson.topics
                          : [selectedLesson.theme || 'Curriculum Theme']
                        ).map((topic, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs font-semibold text-gov-900">
                            <span className="w-1.5 h-1.5 rounded-full bg-forest-700 mt-1.5 shrink-0"></span>
                            <span>{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Subtopics Card */}
                    <div className="bg-gov-50 p-4 rounded-xl border border-gov-200 space-y-2">
                      <div className="text-xs font-black text-gov-800 uppercase tracking-wider flex items-center gap-1.5">
                        <Layers className="w-4 h-4 text-blue-700" />
                        <span>{isHi ? 'उप-विषय एवं शिक्षण बिंदु:' : 'Subtopics & Pedagogical Points:'}</span>
                      </div>
                      <div className="space-y-1.5">
                        {(selectedLesson.subtopics && selectedLesson.subtopics.length > 0
                          ? selectedLesson.subtopics
                          : ['मातृभाषा शब्दावली अन्वेषण (Vocabulary)', 'ध्वनि पहचान एवं उच्चारण अभ्यास (Phonics)', 'चित्र पठन एवं विचार विमर्श (Picture Reading)']
                        ).map((subtopic, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-gov-800">
                            <span className="text-blue-700 font-bold shrink-0">▸</span>
                            <span className="font-medium">{subtopic}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 3. FLN Milestones & Local Realia / TLM Activities */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Learning Outcomes Checklist */}
                    <div className="bg-white p-4 rounded-xl border border-gov-200 space-y-2">
                      <div className="text-xs font-black text-gov-800 uppercase tracking-wider flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-amber-600" />
                        <span>{isHi ? 'निपुण भारत FLN अधिगम प्रतिफल:' : 'NIPUN Bharat FLN Learning Outcomes:'}</span>
                      </div>
                      <div className="space-y-1.5">
                        {selectedLesson.learning_outcomes.map((outcome, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-gov-800">
                            <CheckCircle2 className="w-4 h-4 text-forest-700 shrink-0 mt-0.5" />
                            <span>{outcome}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Local Realia & TLM Guide */}
                    <div className="bg-white p-4 rounded-xl border border-gov-200 space-y-2">
                      <div className="text-xs font-black text-gov-800 uppercase tracking-wider flex items-center gap-1.5">
                        <Leaf className="w-4 h-4 text-forest-700" />
                        <span>{isHi ? 'स्थानीय शिक्षण अधिगम सामग्री (Realia TLM):' : 'Localized Teaching Materials (Realia TLM):'}</span>
                      </div>
                      <div className="space-y-1.5">
                        {(selectedLesson.tlem_realia && selectedLesson.tlem_realia.length > 0
                          ? selectedLesson.tlem_realia
                          : ['सखुआ (साल) के पत्ते एवं वन फूल', 'कंकड़, बीज एवं गिनती के पत्थर', 'मिट्टी के खिलौने एवं स्थानीय चित्र चार्ट']
                        ).map((realia, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-forest-900 font-medium bg-forest-50/60 p-2 rounded-lg border border-forest-100">
                            <span>🍃</span>
                            <span>{realia}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 4. Step-by-Step Classroom Instructional Script */}
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-between border-b border-gov-200 pb-2">
                      <h4 className="font-black text-sm text-gov-900 flex items-center gap-2">
                        <Layers className="w-4 h-4 text-forest-700" />
                        <span>{isHi ? 'द्विभाषी कक्षा शिक्षण संवाद पटकथा' : 'Bilingual Classroom Instructional Dialogue Script'}</span>
                      </h4>
                      <span className="text-[11px] font-bold text-gov-500">
                        {selectedLesson.steps.length} {isHi ? 'चरणीय शिक्षण योजना' : 'Pedagogical Steps'}
                      </span>
                    </div>

                    {selectedLesson.steps.length === 0 ? (
                      <div className="p-6 bg-gov-50 rounded-xl border border-gov-200 text-center text-xs text-gov-600">
                        {isHi ? 'कक्षा संवाद लोड हो रहा है...' : 'Loading classroom dialogue script for this chapter...'}
                      </div>
                    ) : (
                      selectedLesson.steps.map((step, idx) => {
                        let tribalDev = '';
                        let tribalOl = '';
                        let tribalRom = '';

                        if (selectedLanguage === 'santhali' && step.dialogue_santhali) {
                          tribalDev = step.dialogue_santhali.dev;
                          tribalOl = step.dialogue_santhali.ol_chiki;
                          tribalRom = step.dialogue_santhali.rom;
                        } else if (selectedLanguage === 'mundari' && step.dialogue_mundari) {
                          tribalDev = step.dialogue_mundari.dev;
                          tribalRom = step.dialogue_mundari.rom;
                        } else if (selectedLanguage === 'ho' && step.dialogue_ho) {
                          tribalDev = step.dialogue_ho.dev;
                          tribalRom = step.dialogue_ho.rom;
                        } else if (step.dialogue && step.dialogue[selectedLanguage]) {
                          tribalDev = step.dialogue[selectedLanguage];
                        }

                        const isPlaying = playingStepIndex === idx;

                        return (
                          <div
                            key={idx}
                            className={`p-4 rounded-xl border transition-all space-y-3 shadow-xs ${
                              isPlaying ? 'border-forest-500 bg-forest-50/40 ring-1 ring-forest-400' : 'border-gov-200 bg-gov-50/50'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="px-2.5 py-0.5 rounded-md text-xs font-black bg-gov-900 text-white">
                                {isHi ? `चरण ${step.step_number}: ${step.type}` : `Step ${step.step_number}: ${step.type}`}
                              </span>
                              <span className="text-xs text-gov-500 font-bold flex items-center gap-1">
                                <Clock className="w-3 h-3 text-gov-400" /> {step.time_mins} mins
                              </span>
                            </div>

                            {/* Teacher Hindi Script */}
                            <div className="bg-white p-3.5 rounded-xl border border-gov-200 space-y-1">
                              <div className="flex items-center justify-between text-[10px] font-black text-gov-500 uppercase tracking-wider">
                                <span>{isHi ? 'शिक्षक संवाद (हिन्दी संपर्क भाषा):' : 'Teacher Prompt (Hindi Link Language):'}</span>
                                <button
                                  onClick={() => handlePlayDialogue(step.teacher_hindi, 'hindi', idx)}
                                  className="p-1 text-gov-500 hover:text-gov-900 rounded hover:bg-gov-100 flex items-center gap-1 text-[11px] font-bold cursor-pointer"
                                  title="Listen in Hindi"
                                >
                                  <Volume2 className="w-3.5 h-3.5 text-forest-700" />
                                  <span>{isHi ? 'सुनें' : 'Listen'}</span>
                                </button>
                              </div>
                              <div className="text-sm font-semibold text-gov-900 leading-relaxed">
                                {step.teacher_hindi}
                              </div>
                            </div>

                            {/* Tribal Language Translation Dialogue */}
                            <div className="bg-forest-50/80 p-4 rounded-xl border border-forest-200 space-y-2">
                              <div className="flex items-center justify-between text-[10px] font-black text-forest-800 uppercase tracking-wider">
                                <span>{isHi ? `मातृभाषा संवाद (${selectedLanguage.toUpperCase()}):` : `Mother Tongue Translation (${selectedLanguage.toUpperCase()}):`}</span>
                                <button
                                  onClick={() => handlePlayDialogue(tribalDev || tribalOl, selectedLanguage, idx)}
                                  className="px-2.5 py-1 rounded-lg bg-forest-700 text-white text-xs font-bold flex items-center gap-1.5 hover:bg-forest-800 shadow-xs transition-all cursor-pointer"
                                >
                                  <Volume2 className="w-3.5 h-3.5" />
                                  <span>{isHi ? 'ऑडियो सुनें' : 'Listen Audio'}</span>
                                </button>
                              </div>

                              {selectedLanguage === 'santhali' && tribalOl && (
                                <div className="text-base sm:text-lg font-black text-gov-900 font-sans tracking-wide leading-relaxed">
                                  {tribalOl}
                                </div>
                              )}

                              {tribalDev && (
                                <div className="text-sm sm:text-base font-bold text-forest-950 leading-relaxed">
                                  {tribalDev}
                                </div>
                              )}

                              {tribalRom && (
                                <div className="text-xs text-gov-500 italic">
                                  Phonetic: {tribalRom}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-dashed border-gov-300 p-12 text-center text-gov-500 space-y-2">
                  <BookOpen className="w-8 h-8 text-gov-400 mx-auto mb-2" />
                  <p className="text-sm font-bold text-gov-800">{isHi ? 'कृपया एक अध्याय चुनें' : 'Select a Chapter'}</p>
                  <p className="text-xs text-gov-500">
                    {isHi 
                      ? 'बाएं पैनल से किसी भी अध्याय पर क्लिक करके संपूर्ण शिक्षण-संकेत, टीएलएम एवं द्विभाषी संवाद देखें।' 
                      : 'Click any chapter from the left directory to view structured topics, teacher hints, realia TLM, and instructional dialogue scripts.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: 📜 MULTILINGUAL FOLKTALES & MORAL READER                           */}
      {/* ========================================================================= */}
      {activeTab === 'stories' && selectedStory && (
        <div className="bg-white rounded-2xl border border-gov-200 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-gov-900 flex items-center gap-2">
                <span>📜</span>
                <span>{isHi ? 'झारखंड की लोककथाएं एवं नैतिक कहानियां' : 'Jharkhand Cultural Folktales & Moral Reader'}</span>
              </h2>
              <p className="text-xs text-gov-600 mt-0.5">
                {isHi ? 'मातृभाषा एवं हिन्दी में सचित्र लोककथाएं - नैतिक शिक्षा एवं सांस्कृतिक संरक्षण' : 'Illustrated folktales in tribal mother tongues & Hindi link language with audio narration'}
              </p>
            </div>
          </div>

          {/* Story Selector Pills */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {stories.map((story) => (
              <button
                key={story.id}
                onClick={() => { setSelectedStory(story); setActiveStoryPage(0); }}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedStory.id === story.id
                    ? 'bg-gov-900 text-white shadow-sm ring-2 ring-gov-900'
                    : 'bg-gov-100 text-gov-700 hover:bg-gov-200'
                }`}
              >
                {story.title_hindi}
              </button>
            ))}
          </div>

          {/* Story Reader Box */}
          <div className="bg-gov-50/70 rounded-2xl border border-gov-200 p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-gov-200 pb-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-gov-800 bg-gov-200 px-2.5 py-0.5 rounded">
                  {selectedStory.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-gov-900 mt-1">
                  {selectedStory.title_hindi}
                </h3>
                <p className="text-sm font-bold text-forest-800 mt-0.5">
                  {selectedLanguage === 'santhali' ? selectedStory.title_santhali :
                   selectedLanguage === 'mundari' ? selectedStory.title_mundari :
                   selectedStory.title_ho}
                </p>
              </div>

              <div className="text-xs font-black text-gov-600 bg-white px-3 py-1 rounded-lg border border-gov-200 shadow-xs">
                {isHi ? `पृष्ठ ${activeStoryPage + 1} / ${selectedStory.pages.length}` : `Page ${activeStoryPage + 1} of ${selectedStory.pages.length}`}
              </div>
            </div>

            {/* Current Page Content */}
            {selectedStory.pages[activeStoryPage] && (() => {
              const page = selectedStory.pages[activeStoryPage];
              const tribalTextDev = selectedLanguage === 'santhali' ? page.santhali_text_dev :
                                    selectedLanguage === 'mundari' ? page.mundari_text : page.ho_text;
              const tribalTextOl = selectedLanguage === 'santhali' ? page.santhali_text_ol : null;

              return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  {/* Visual Illustration Card */}
                  <div className="bg-white rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[220px] border border-gov-200 shadow-sm">
                    <div className="text-6xl mb-3">
                      {page.image_prompt?.includes('Sal') ? '🌳' :
                       page.image_prompt?.includes('drum') ? '🥁' :
                       page.image_prompt?.includes('pot') ? '🏺' : '🌸'}
                    </div>
                    <p className="text-xs font-bold text-gov-700 max-w-xs">
                      {page.image_prompt || 'Cultural Classroom Illustration'}
                    </p>
                  </div>

                  {/* Dual Language Narration */}
                  <div className="space-y-3">
                    {/* Hindi Line */}
                    <div className="p-4 rounded-xl bg-white border border-gov-200 space-y-1 shadow-xs">
                      <div className="flex items-center justify-between text-[10px] font-black text-gov-500 uppercase tracking-wider">
                        <span>{isHi ? 'हिन्दी वाचन:' : 'Hindi Link Narration:'}</span>
                        <button
                          onClick={() => handlePlayDialogue(page.hindi_text, 'hindi')}
                          className="text-forest-700 hover:text-forest-900 flex items-center gap-1 font-bold text-xs cursor-pointer"
                        >
                          <Volume2 className="w-4 h-4" />
                          <span>{isHi ? 'सुनें' : 'Listen'}</span>
                        </button>
                      </div>
                      <p className="text-sm font-semibold text-gov-900 leading-relaxed">
                        {page.hindi_text}
                      </p>
                    </div>

                    {/* Tribal Mother Tongue Line */}
                    <div className="p-4 rounded-xl bg-forest-50 border border-forest-200 space-y-2 shadow-xs">
                      <div className="flex items-center justify-between text-[10px] font-black text-forest-800 uppercase tracking-wider">
                        <span>{isHi ? `मातृभाषा वाचन (${selectedLanguage.toUpperCase()}):` : `Mother Tongue Narration (${selectedLanguage.toUpperCase()}):`}</span>
                        <button
                          onClick={() => handlePlayDialogue(tribalTextDev, selectedLanguage)}
                          className="px-3 py-1 rounded-lg bg-forest-700 text-white text-xs font-bold flex items-center gap-1 hover:bg-forest-800 shadow-xs cursor-pointer"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>{isHi ? 'ऑडियो सुनें' : 'Listen Audio'}</span>
                        </button>
                      </div>

                      {tribalTextOl && (
                        <p className="text-xl font-black text-gov-900 font-sans tracking-wide">
                          {tribalTextOl}
                        </p>
                      )}

                      <p className="text-base font-bold text-forest-950">
                        {tribalTextDev}
                      </p>

                      {page.santhali_rom && selectedLanguage === 'santhali' && (
                        <p className="text-xs text-gov-500 italic">
                          {page.santhali_rom}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Page Navigation & Moral */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-gov-200 pt-4">
              <div className="text-xs text-gov-800 font-semibold bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                💡 <strong>{isHi ? 'कहानी की सीख / नैतिक संदेश:' : 'Moral / Cultural Takeaway:'}</strong> {selectedStory.moral}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveStoryPage(prev => Math.max(0, prev - 1))}
                  disabled={activeStoryPage === 0}
                  className="px-3.5 py-1.5 rounded-lg border border-gov-300 text-xs font-bold text-gov-700 hover:bg-gov-100 disabled:opacity-40 flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" /> {isHi ? 'पिछला पृष्ठ' : 'Previous Page'}
                </button>
                <button
                  onClick={() => setActiveStoryPage(prev => Math.min(selectedStory.pages.length - 1, prev + 1))}
                  disabled={activeStoryPage === selectedStory.pages.length - 1}
                  className="px-4 py-1.5 rounded-lg bg-gov-900 text-white text-xs font-bold hover:bg-forest-800 disabled:opacity-40 flex items-center gap-1 shadow-xs cursor-pointer"
                >
                  {isHi ? 'अगला पृष्ठ' : 'Next Page'} <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: 📊 NIPUN BHARAT FLN COMPETENCY STANDARDS                           */}
      {/* ========================================================================= */}
      {activeTab === 'standards' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gov-200 p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-gov-100 pb-4">
              <div>
                <h2 className="text-xl font-black text-gov-900 flex items-center gap-2">
                  <Award className="w-6 h-6 text-amber-600" />
                  <span>{isHi ? 'निपुण भारत मिशन - प्राथमिक कक्षा FLN दक्षता मानक' : 'NIPUN Bharat Mission - Foundational Learning Standards (FLN)'}</span>
                </h2>
                <p className="text-xs text-gov-600 mt-1">
                  {isHi
                    ? 'राष्ट्रीय शिक्षा नीति (NEP 2020) एवं निपुण भारत के तहत कक्षा 1 से 3 तथा बालवाटिका हेतु बुनियादी साक्षरता एवं संख्याज्ञान (FLN) के लक्ष्य'
                    : 'Foundational Literacy and Numeracy (FLN) Lakshyas for Balvatika and Grades 1-3 under NEP 2020 & NIPUN Bharat'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              {FLN_STANDARDS_DATA.map((std, idx) => (
                <div key={idx} className="bg-gov-50/70 rounded-2xl border border-gov-200 p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-gov-200 pb-2.5">
                    <span className="text-sm font-black text-gov-900 flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-forest-700" />
                      <span>{isHi ? std.gradeHindi : std.grade}</span>
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-forest-100 text-forest-900 border border-forest-200">
                      FLN Lakshya
                    </span>
                  </div>

                  {/* Literacy Section */}
                  <div className="space-y-2">
                    <div className="text-xs font-black text-forest-800 uppercase tracking-wider flex items-center gap-1">
                      <span>📖</span>
                      <span>{isHi ? 'बुनियादी साक्षरता (Foundational Literacy):' : 'Foundational Literacy:'}</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-gov-800">
                      {std.literacy.map((item, iIdx) => (
                        <li key={iIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-forest-700 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Numeracy Section */}
                  <div className="space-y-2 pt-1 border-t border-gov-200">
                    <div className="text-xs font-black text-blue-800 uppercase tracking-wider flex items-center gap-1">
                      <span>🔢</span>
                      <span>{isHi ? 'बुनियादी संख्याज्ञान (Foundational Numeracy):' : 'Foundational Numeracy:'}</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-gov-800">
                      {std.numeracy.map((item, iIdx) => (
                        <li key={iIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-700 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Recommended Textbooks */}
                  <div className="pt-2 border-t border-gov-200 flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-bold text-gov-500">{isHi ? 'संबद्ध पुस्तकें:' : 'Aligned Books:'}</span>
                    {std.relevantBooks.map((bName, bIdx) => (
                      <span key={bIdx} className="px-2 py-0.5 rounded text-[10px] font-bold bg-white text-gov-800 border border-gov-200">
                        {bName}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: ✨ AI MOTHER TONGUE LESSON GENERATOR                               */}
      {/* ========================================================================= */}
      {activeTab === 'generator' && (
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-gov-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-1.5">
            <h3 className="text-xl font-black text-gov-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-forest-700" />
              <span>{isHi ? 'AI मातृभाषा पाठ योजना निर्माता' : 'AI Mother Tongue Lesson Plan Generator'}</span>
            </h3>
            <p className="text-xs sm:text-sm text-gov-600 leading-relaxed">
              {isHi
                ? `किसी भी विषय पर शिक्षक संकेत, ${selectedLanguage.toUpperCase()} मातृभाषा अनुवाद, स्थानीय रियलिया TLM, एवं निपुण भारत FLN अधिगम प्रतिफल से युक्त 40-मिनट की चरणबद्ध पाठ योजना तैयार करें।`
                : `Enter any curriculum topic or theme. The AI engine generates a 40-minute step-by-step lesson plan with teacher prompts, ${selectedLanguage.toUpperCase()} translation, local realia TLM, and NIPUN Bharat FLN competencies.`}
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-black text-gov-800 uppercase tracking-wider mb-1.5">
                {isHi ? 'पाठ का विषय / प्रसंग (हिन्दी या अंग्रेजी में):' : 'Lesson Topic / Theme (in English or Hindi):'}
              </label>
              <input
                type="text"
                value={genTopic}
                onChange={(e) => setGenTopic(e.target.value)}
                placeholder={isHi ? "उदा. 'जल संरक्षण एवं नदी', 'सखुआ के पत्ते एवं गिनती', 'सोहराय चित्रकला'..." : "e.g. 'Water Conservation & Forest Rivers', 'Counting with Sal Seeds', 'Sohrai Art'..."}
                className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-gov-300 focus:ring-2 focus:ring-gov-900 focus:outline-none bg-gov-50/50"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-gov-800 uppercase tracking-wider mb-1.5">
                  {isHi ? 'लक्षित कक्षा:' : 'Target Grade / Class:'}
                </label>
                <select
                  value={genGrade}
                  onChange={(e) => setGenGrade(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs font-bold rounded-xl border border-gov-300 bg-white focus:outline-none focus:ring-2 focus:ring-gov-900"
                >
                  <option value="Balvatika">Balvatika (Pre-Primary Foundational Stage)</option>
                  <option value="Class 1">Class 1 (Grade 1)</option>
                  <option value="Class 2">Class 2 (Grade 2)</option>
                  <option value="Class 3">Class 3 (Grade 3)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black text-gov-800 uppercase tracking-wider mb-1.5">
                  {isHi ? 'लक्षित मातृभाषा:' : 'Target Mother Tongue:'}
                </label>
                <input
                  type="text"
                  disabled
                  value={`${selectedLanguage.toUpperCase()} (Jharkhand Mother Tongue)`}
                  className="w-full px-3.5 py-2 text-xs font-bold text-gov-800 bg-gov-100 rounded-xl border border-gov-200"
                />
              </div>
            </div>

            <button
              onClick={handleGenerateLesson}
              disabled={!genTopic.trim() || isGenerating}
              className="w-full py-3.5 rounded-xl bg-gov-900 hover:bg-forest-800 text-white font-black text-xs sm:text-sm shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 transition-all cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{isHi ? 'निपुण पाठ योजना तैयार हो रही है...' : 'Generating Structured NIPUN Lesson Plan...'}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>{isHi ? 'द्विभाषी पाठ योजना बनाएं' : 'Generate Bilingual Lesson Plan'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: PRINTABLE A4 BILINGUAL WORKSHEET                                    */}
      {/* ========================================================================= */}
      {showWorksheetModal && selectedLesson && (
        <div className="fixed inset-0 z-50 bg-gov-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-gov-300 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gov-200 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-forest-700" />
                <h3 className="font-black text-lg text-gov-900">
                  {isHi ? 'A4 मुद्रण योग्य छात्र अभ्यास कार्यपत्रक' : 'Printable A4 Student Practice Worksheet'}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-lg bg-gov-900 text-white text-xs font-bold flex items-center gap-1.5 hover:bg-forest-800 cursor-pointer shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{isHi ? 'प्रिंट करें' : 'Print Worksheet'}</span>
                </button>
                <button
                  onClick={() => setShowWorksheetModal(false)}
                  className="p-1.5 rounded-lg text-gov-500 hover:bg-gov-100 hover:text-gov-900 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable Sheet Frame */}
            <div className="p-6 border-2 border-dashed border-gov-300 rounded-xl space-y-6 bg-gov-50/30">
              {/* Official Heading */}
              <div className="text-center space-y-1 border-b-2 border-gov-900 pb-4">
                <div className="text-xs font-black text-gov-700 uppercase tracking-wider">
                  झारखंड शैक्षिक अनुसंधान एवं प्रशिक्षण परिषद् (JCERT) • समग्र शिक्षा
                </div>
                <h2 className="text-xl font-black text-gov-900">
                  प्राथमिक अभ्यास कार्यपत्रक (Primary Student Worksheet)
                </h2>
                <div className="flex justify-center gap-4 text-xs font-bold text-gov-600 pt-1">
                  <span>कक्षा (Grade): {selectedLesson.grade}</span>
                  <span>•</span>
                  <span>विषय (Subject): {selectedLesson.subject}</span>
                  <span>•</span>
                  <span>मातृभाषा: {selectedLanguage.toUpperCase()}</span>
                </div>
              </div>

              {/* Student Details Fields */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-white p-3 rounded-lg border border-gov-200">
                <div><strong>विद्यार्थी का नाम:</strong> ____________</div>
                <div><strong>अनुक्रमांक (Roll No):</strong> _____</div>
                <div><strong>दिनांक:</strong> ____________</div>
                <div><strong>प्राप्तांक:</strong> _____ / 20</div>
              </div>

              {/* Worksheet Activities */}
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-xl border border-gov-200 space-y-2">
                  <h4 className="font-bold text-xs text-gov-900">
                    1. मातृभाषा शब्द को सही हिन्दी अर्थ से मिलान करें (Match the words):
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-xs pt-1">
                    <div className="space-y-1">
                      <div>(क) {selectedLesson.tribal_title?.santhali_ol || 'ᱫᱟᱨᱮ'} ({selectedLesson.tribal_title?.santhali_dev || 'दारे'})</div>
                      <div>(ख) ᱥᱟᱹᱜᱩᱱ ᱥᱮᱛᱟᱜ (सगुन सेताः)</div>
                      <div>(ग) ᱪᱮᱬᱮ (चेणे)</div>
                    </div>
                    <div className="space-y-1 text-gov-700">
                      <div>[   ] शुभ प्रभात (Good Morning)</div>
                      <div>[   ] चिड़िया / पक्षी (Bird)</div>
                      <div>[   ] वृक्ष / पेड़ (Tree)</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gov-200 space-y-2">
                  <h4 className="font-bold text-xs text-gov-900">
                    2. स्थानीय टीएलएम एवं चित्र देखकर सही संख्या लिखें (Counting & Realia):
                  </h4>
                  <p className="text-xs text-gov-600">
                    नीचे दिए गए सखुआ के पत्तों / कंकड़ों को गिनें और मातृभाषा तथा अंकों में लिखें:
                  </p>
                  <div className="text-2xl tracking-widest text-forest-800 pt-1">
                    🍃 🍃 🍃 🍃 🍃 🍃 🍃
                  </div>
                  <div className="text-xs text-gov-700 pt-1">
                    कुल पत्ते = _________ (संख्या) | मातृभाषा नाम = _______________
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gov-200 space-y-2">
                  <h4 className="font-bold text-xs text-gov-900">
                    3. रचनात्मक अभिव्यक्ति (Creative Drawing & Realia Connection):
                  </h4>
                  <p className="text-xs text-gov-600">
                    अपने घर या विद्यालय के आस-पास पाए जाने वाले किसी एक पेड़ या पक्षी का चित्र बनाएं:
                  </p>
                  <div className="w-full h-28 border-2 border-dashed border-gov-300 rounded-lg flex items-center justify-center text-xs text-gov-400">
                    चित्र बनाने का स्थान (Drawing Box)
                  </div>
                </div>
              </div>

              {/* Teacher Signature */}
              <div className="flex justify-between items-end pt-4 border-t border-gov-200 text-xs text-gov-700 font-bold">
                <div>शिक्षक टिप्पणी: ___________________________</div>
                <div>शिक्षक हस्ताक्षर: ___________________</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
