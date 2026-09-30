import React, { useState, useEffect, useRef } from 'react';
import { TribalLanguage, VocabularyItem, LessonPlan, MediaAnalysisInfo } from '../types';
import { offlineNlp } from '../services/offlineNlpEngine';
import { speechService } from '../services/speechService';
import { apiService } from '../services/apiService';
import { useLanguage } from '../context/LanguageContext';
import { CurriculumCascadingSelector } from './CurriculumCascadingSelector';
import { 
  offlineWorksheetAgent, 
  AgentGeneratedWorksheet, 
  StudentCompetencyLevel, 
  WorksheetFocusType 
} from '../services/offlineWorksheetAgent';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { 
  FileSpreadsheet, 
  Download, 
  Sparkles, 
  Volume2, 
  Layers, 
  BookOpen, 
  Calculator, 
  Compass, 
  Languages, 
  Check, 
  Zap, 
  UploadCloud, 
  Video, 
  FileText, 
  Music, 
  FolderUp, 
  PlayCircle, 
  FileCheck2, 
  RefreshCw, 
  Printer,
  Bot,
  Dices,
  CheckCircle2,
  Award,
  User,
  School,
  GraduationCap
} from 'lucide-react';

interface WorksheetStudioProps {
  selectedLanguage: TribalLanguage;
  isOfflineMode: boolean;
}

export const WorksheetStudio: React.FC<WorksheetStudioProps> = ({
  selectedLanguage,
  isOfflineMode
}) => {
  const { t, uiLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState<'worksheets' | 'flashcards'>('worksheets');
  const [worksheetType, setWorksheetType] = useState<'match' | 'count' | 'trace' | 'fill'>('match');
  const [grade, setGrade] = useState<string>('Class 1');
  const [selectedSubjectId, setSelectedSubjectId] = useState<'hindi' | 'math' | 'evs' | 'english'>('hindi');
  const [selectedChapter, setSelectedChapter] = useState<LessonPlan | null>(null);
  const [dynamicWorksheet, setDynamicWorksheet] = useState<any | null>(null);
  const [isLoadingWorksheet, setIsLoadingWorksheet] = useState<boolean>(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [activeFlippedCard, setActiveFlippedCard] = useState<number | null>(null);

  // -------------------------------------------------------------------------
  // OFFLINE AI WORKSHEET AGENT STATE (DYNAMIC, PERSONALIZED, ZERO REPETITION)
  // -------------------------------------------------------------------------
  const [worksheetSourceMode, setWorksheetSourceMode] = useState<'ai_agent' | 'official_curriculum' | 'custom_upload'>('ai_agent');
  const [agentStudentName, setAgentStudentName] = useState<string>('बिरसा मुंडा (Birsa Munda)');
  const [agentSchoolName, setAgentSchoolName] = useState<string>('राजकीय प्राथमिक विद्यालय, दुमका (Jharkhand)');
  const [agentLevel, setAgentLevel] = useState<StudentCompetencyLevel>('class1');
  const [agentFocus, setAgentFocus] = useState<WorksheetFocusType>('combo');
  const [agentWorksheet, setAgentWorksheet] = useState<AgentGeneratedWorksheet | null>(null);
  const [variationCounter, setVariationCounter] = useState<number>(1);

  // Media / Custom Upload State for Worksheet Studio
  const [uploadSourceType, setUploadSourceType] = useState<'video' | 'pdf' | 'audio' | 'document' | 'text'>('video');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [mediaPreviewUrl, setMediaPreviewUrl] = useState<string | null>(null);
  const [detectedMediaType, setDetectedMediaType] = useState<'video' | 'pdf' | 'document' | 'audio' | 'image' | 'text'>('video');
  const [customContentText, setCustomContentText] = useState<string>('');
  const [isGeneratingFromUpload, setIsGeneratingFromUpload] = useState<boolean>(false);
  const [uploadedMediaInfo, setUploadedMediaInfo] = useState<MediaAnalysisInfo | null>(null);

  const printableRef = useRef<HTMLDivElement>(null);
  const vocabList: VocabularyItem[] = offlineNlp.getAllVocabulary();

  // Load worksheet dynamically depending on selected mode
  useEffect(() => {
    if (worksheetSourceMode === 'ai_agent') {
      loadAgentWorksheet();
    } else if (worksheetSourceMode === 'official_curriculum') {
      loadOfficialWorksheet();
    }
  }, [worksheetSourceMode, agentLevel, agentFocus, selectedLanguage, grade, selectedSubjectId, selectedChapter]);

  const loadAgentWorksheet = async (seedOverride?: string) => {
    setIsLoadingWorksheet(true);
    try {
      const seed = seedOverride || `${Date.now()}-${agentStudentName}-${variationCounter}`;
      const ws = await apiService.generateAgenticWorksheet(selectedLanguage, {
        studentName: agentStudentName,
        schoolName: agentSchoolName,
        competencyLevel: agentLevel,
        focusType: agentFocus,
        seed
      });
      setAgentWorksheet(ws);
    } catch (e) {
      console.error('Failed to generate agent worksheet:', e);
      // Edge in-memory fallback
      const fallbackWs = offlineWorksheetAgent.generateWorksheet(selectedLanguage, {
        studentName: agentStudentName,
        schoolName: agentSchoolName,
        competencyLevel: agentLevel,
        focusType: agentFocus
      });
      setAgentWorksheet(fallbackWs);
    } finally {
      setIsLoadingWorksheet(false);
    }
  };

  const loadOfficialWorksheet = async () => {
    setIsLoadingWorksheet(true);
    try {
      const data = await apiService.generateSubjectWorksheets(
        grade,
        selectedSubjectId,
        selectedChapter?.id,
        selectedLanguage
      );
      if (data) {
        setDynamicWorksheet(data);
      }
    } catch (e) {
      console.error('Failed to load dynamic worksheet:', e);
    } finally {
      setIsLoadingWorksheet(false);
    }
  };

  /**
   * Generates a completely new unique variation with dynamic seed
   */
  const handleRegenerateAgentVariation = () => {
    const nextCount = variationCounter + 1;
    setVariationCounter(nextCount);
    speechService.playProceduralChime();
    const newSeed = `${Date.now()}-${agentStudentName}-${nextCount}`;
    loadAgentWorksheet(newSeed);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedFile(file);
    setUploadedFileName(file.name);

    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    if (['mp4', 'webm', 'mov', 'avi', 'mkv', 'm4v'].includes(ext)) {
      setDetectedMediaType('video');
      setUploadSourceType('video');
      const url = URL.createObjectURL(file);
      setMediaPreviewUrl(url);
      setCustomContentText(`[वीडियो पाठ: ${file.name}]\nकक्षा: ${grade}\nविषय: ${selectedSubjectId}\nइस वीडियो आधारित शिक्षण सामग्री हेतु द्विभाषी A4 कार्यपत्रक।`);
    } else if (ext === 'pdf') {
      setDetectedMediaType('pdf');
      setUploadSourceType('pdf');
      const url = URL.createObjectURL(file);
      setMediaPreviewUrl(url);
      setCustomContentText(`[PDF पाठ्य सामग्री: ${file.name}]\nकक्षा: ${grade}\nविषय: ${selectedSubjectId}`);
    } else if (['mp3', 'wav', 'm4a', 'ogg', 'aac'].includes(ext)) {
      setDetectedMediaType('audio');
      setUploadSourceType('audio');
      const url = URL.createObjectURL(file);
      setMediaPreviewUrl(url);
      setCustomContentText(`[ऑडियो पाठ: ${file.name}]\nकक्षा: ${grade}\nविषय: ${selectedSubjectId}`);
    } else if (['docx', 'doc', 'pptx', 'ppt'].includes(ext)) {
      setDetectedMediaType('document');
      setUploadSourceType('document');
      setMediaPreviewUrl(null);
      setCustomContentText(`[दस्तावेज़ पाठ: ${file.name}]\nकक्षा: ${grade}\nविषय: ${selectedSubjectId}`);
    } else {
      setDetectedMediaType('text');
      setUploadSourceType('text');
      setMediaPreviewUrl(null);
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (text) {
          setCustomContentText(text);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleUploadMediaAndGenerateWorksheets = async () => {
    setIsGeneratingFromUpload(true);
    try {
      let result: any;
      if (uploadedFile && uploadSourceType !== 'text') {
        result = await apiService.uploadTeacherMedia(
          uploadedFile,
          grade,
          selectedSubjectId,
          selectedLanguage
        );
      } else {
        if (!customContentText.trim()) return;
        result = await apiService.ingestExternalLessonContent(
          customContentText,
          uploadedFileName || 'Custom Content',
          grade,
          selectedSubjectId,
          selectedLanguage
        );
      }

      if (result && result.worksheet) {
        setDynamicWorksheet(result.worksheet);
        if (result.media_info) {
          setUploadedMediaInfo(result.media_info);
        }
      }
    } catch (e) {
      console.error('Failed to generate dynamic worksheets from uploaded media:', e);
    } finally {
      setIsGeneratingFromUpload(false);
    }
  };

  const handleDownloadPdf = async () => {
    if (!printableRef.current) return;
    setIsExportingPdf(true);

    try {
      const element = printableRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      const fileId = worksheetSourceMode === 'ai_agent' && agentWorksheet 
        ? agentWorksheet.worksheet_id 
        : `${selectedLanguage}-${worksheetType}`;
      pdf.save(`NIPUN-Bilingual-Worksheet-${fileId}.pdf`);
    } catch (e) {
      console.error('PDF export failed:', e);
    } finally {
      setIsExportingPdf(false);
    }
  };

  const [playingCardIdx, setPlayingCardIdx] = useState<number | null>(null);

  const handlePlayCardAudio = (text: string, idx: number) => {
    if (playingCardIdx === idx && speechService.isSpeakingNow()) {
      speechService.stopSpeaking();
      setPlayingCardIdx(null);
      return;
    }
    setPlayingCardIdx(idx);
    speechService.toggleSpeak(
      text,
      selectedLanguage,
      () => setPlayingCardIdx(idx),
      () => setPlayingCardIdx(null)
    );
  };

  // Determine active lists for rendering (AI Agent has first priority)
  const activeMatchList = worksheetSourceMode === 'ai_agent' && agentWorksheet
    ? agentWorksheet.match_section
    : (dynamicWorksheet?.match_section && dynamicWorksheet.match_section.length > 0
      ? dynamicWorksheet.match_section
      : [
          { id: 1, prompt: 'चित्र देखकर मिलाएँ', hindi_text: "हाथी", tribal_text: "हाती", tribal_script: "ᱦᱟᱹᱛᱤ", emoji: "🐘", english_text: "Elephant" },
          { id: 2, prompt: 'चित्र देखकर मिलाएँ', hindi_text: "सखुआ पेड़", tribal_text: selectedLanguage === 'santhali' ? "ᱫᱟᱨᱮ" : "दारू", tribal_script: "ᱫᱟᱨᱮ", emoji: "🌳", english_text: "Sal Tree" },
          { id: 3, prompt: 'चित्र देखकर मिलाएँ', hindi_text: "चिड़िया", tribal_text: selectedLanguage === 'mundari' ? "चेड़े" : "चेणे", tribal_script: "ᱪᱮᱬᱮ", emoji: "🐦", english_text: "Bird" },
          { id: 4, prompt: 'चित्र देखकर मिलाएँ', hindi_text: "मांदर ढोल", tribal_text: selectedLanguage === 'santhali' ? "ᱛᱩᱢᱫᱟᱜ" : "मांदर", tribal_script: "ᱛᱩᱢᱫᱟᱜ", emoji: "🥁", english_text: "Tribal Drum" }
        ]);

  const activeCountList = worksheetSourceMode === 'ai_agent' && agentWorksheet
    ? agentWorksheet.count_section
    : (dynamicWorksheet?.count_section && dynamicWorksheet.count_section.length > 0
      ? dynamicWorksheet.count_section
      : [
          { id: 1, count: 1, name_hindi: "एक मांदर", name_tribal: selectedLanguage === 'santhali' ? "ᱢᱤᱫ ᱛᱩᱢᱫᱟᱜ" : "मियाद मांदर", emoji: "🥁", name_english: "One Tribal Drum" },
          { id: 2, count: 2, name_hindi: "दो सखुआ पत्ते", name_tribal: selectedLanguage === 'santhali' ? "ᱵᱟᱨ ᱥᱟᱠᱟᱢ" : "बारिया साकाम", emoji: "🍃", name_english: "Two Sal Leaves" },
          { id: 3, count: 3, name_hindi: "तीन धनुष-बाण", name_tribal: selectedLanguage === 'santhali' ? "ᱯᱮ ᱟᱜ-ᱥᱟᱨ" : "अपिया आग-सार", emoji: "🏹", name_english: "Three Bows" },
          { id: 4, count: 4, name_hindi: "चार महुआ फल", name_tribal: selectedLanguage === 'santhali' ? "ᱯᱳᱱ ᱢᱟᱦᱩᱣᱟ" : "उपूनिया महुआ", emoji: "🥭", name_english: "Four Mahua Fruits" }
        ]);

  const activeTraceList = worksheetSourceMode === 'ai_agent' && agentWorksheet
    ? agentWorksheet.trace_section
    : (dynamicWorksheet?.trace_section && dynamicWorksheet.trace_section.length > 0
      ? dynamicWorksheet.trace_section
      : [
          { id: 1, char_devanagari: "अ", char_native: "ᱚ", word_hindi: "अक्षर", word_native: "ᱚᱞ (Ol - Write)", sound_phonetic: "O" },
          { id: 2, char_devanagari: "त", char_native: "ᱛ", word_hindi: "तुमदाः", word_native: "ᱛᱩᱢᱫᱟᱜ (Tumdak)", sound_phonetic: "T" },
          { id: 3, char_devanagari: "द", char_native: "ᱫ", word_hindi: "दारे (पेड़)", word_native: "ᱫᱟᱨᱮ (Dare - Tree)", sound_phonetic: "Da" },
          { id: 4, char_devanagari: "प", char_native: "ᱯ", word_hindi: "पोतोब (किताब)", word_native: "ᱯᱚᱛᱚᱵ (Potob - Book)", sound_phonetic: "Pa" }
        ]);

  const activeFillList = worksheetSourceMode === 'ai_agent' && agentWorksheet
    ? agentWorksheet.fill_section
    : (dynamicWorksheet?.fill_section && dynamicWorksheet.fill_section.length > 0
      ? dynamicWorksheet.fill_section
      : [
          { id: 1, sentence_incomplete: 'हमारे गाँव में सखुआ का ___ बहुत बड़ा है।', missing_word: 'पेड़ (ᱫᱟᱨᱮ)', tribal_sentence: 'ᱟᱞᱮ ᱟᱹᱛᱩ ᱨᱮ ᱥᱟᱨᱡᱚᱢ ᱫᱟᱨᱮ ᱟᱹᱰᱤ ᱢᱟᱨᱟᱝ-ᱟ᱾', hint: '🌳 पेड़ / ᱫᱟᱨᱮ' },
          { id: 2, sentence_incomplete: 'सुबह उठकर हम अपनी ___ भाषा में नमस्ते कहते हैं।', missing_word: 'जोहार (ᱡᱚᱦᱟᱨ)', tribal_sentence: 'ᱥᱮᱛᱟᱜ ᱨᱮ ᱡᱚᱦᱟᱨ ᱢᱮᱱ ᱠᱟᱛᱮ ᱵᱚᱱ ᱮᱦᱚᱵ-ᱟ᱾', hint: '🌿 जोहार / ᱡᱚᱦᱟᱨ' },
          { id: 3, sentence_incomplete: 'त्योहार में बच्चे ___ बजाकर नाचते हैं।', missing_word: 'मांदर (ᱛᱩᱢᱫᱟᱜ)', tribal_sentence: 'ᱯᱟᱨᱟᱵᱽ ᱨᱮ ᱜᱤᱫᱽᱨᱟᱹ ᱛᱩᱢᱫᱟᱜ ᱨᱩ ᱠᱟᱛᱮ ᱠᱚ ᱮᱱᱮᱡ-ᱟ᱾', hint: '🥁 मांदर / ᱛᱩᱢᱫᱟᱜ' }
        ]);

  const activeStorySteps = worksheetSourceMode === 'ai_agent' && agentWorksheet?.story_sequence_section
    ? agentWorksheet.story_sequence_section
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Studio Header Bar */}
      <div className="bg-white rounded-xl border border-gov-200 p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-gov-100 text-gov-800 border border-gov-200 flex items-center gap-1">
              <Bot className="w-3.5 h-3.5 text-forest-700" />
              <span>AI Agent Powered MTB-MLE Studio</span>
            </span>
            <span className="text-xs text-forest-700 font-bold bg-forest-50 px-2 py-0.5 rounded-full border border-forest-200">
              ⚡ 100% Offline Edge Generation (Zero Internet)
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-gov-900">
            NIPUN Bharat Bilingual Worksheet & Flashcard Studio
          </h2>
          <p className="text-xs sm:text-sm text-gov-600 max-w-2xl mt-0.5">
            Dedicated Offline AI Agent generates personalized, dynamic, non-repeating bilingual worksheets for tribal primary students in {selectedLanguage.toUpperCase()}.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center bg-gov-100 p-1 rounded-xl border border-gov-200 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('worksheets')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'worksheets' ? 'bg-white text-gov-900 shadow-sm' : 'text-gov-700 hover:text-gov-900'
            }`}
          >
            Worksheet PDF Generator
          </button>
          <button
            onClick={() => setActiveTab('flashcards')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'flashcards' ? 'bg-white text-gov-900 shadow-sm' : 'text-gov-700 hover:text-gov-900'
            }`}
          >
            Interactive Flashcards
          </button>
        </div>
      </div>

      {/* Mode Switcher: 3 Modes (AI Agent, Official JCERT, Custom Upload) */}
      <div className="bg-white p-3 rounded-2xl border-2 border-gov-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-black text-gov-800 uppercase tracking-wider">
            कार्यपत्रक निर्माण विधि (Generation Mode):
          </span>
          <div className="flex flex-wrap items-center bg-gov-100 p-1 rounded-xl border border-gov-200 gap-1">
            <button
              onClick={() => setWorksheetSourceMode('ai_agent')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                worksheetSourceMode === 'ai_agent'
                  ? 'bg-forest-800 text-white shadow-sm'
                  : 'text-gov-700 hover:text-gov-900'
              }`}
            >
              <Bot className="w-3.5 h-3.5 text-forest-300" />
              <span>🤖 AI Worksheet Agent (Personalized & Dynamic)</span>
            </button>
            <button
              onClick={() => setWorksheetSourceMode('official_curriculum')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                worksheetSourceMode === 'official_curriculum'
                  ? 'bg-white text-gov-900 shadow-sm'
                  : 'text-gov-600 hover:text-gov-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-forest-700" />
              <span>📚 Official JCERT Chapters</span>
            </button>
            <button
              onClick={() => setWorksheetSourceMode('custom_upload')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                worksheetSourceMode === 'custom_upload'
                  ? 'bg-white text-amber-900 shadow-sm'
                  : 'text-gov-600 hover:text-gov-900'
              }`}
            >
              <UploadCloud className="w-3.5 h-3.5 text-amber-700" />
              <span>📤 Upload Video / PDF / Doc</span>
            </button>
          </div>
        </div>

        {worksheetSourceMode === 'ai_agent' && agentWorksheet && (
          <div className="flex items-center gap-2 text-xs bg-forest-50 text-forest-900 border border-forest-200 px-3 py-1 rounded-full font-bold">
            <span className="w-2 h-2 rounded-full bg-forest-600 animate-pulse"></span>
            <span>विशिष्ट कोड: {agentWorksheet.worksheet_id} (सीड: {agentWorksheet.variation_seed})</span>
          </div>
        )}
      </div>

      {/* Mode 1: DEDICATED AI WORKSHEET AGENT CONTROL PANEL */}
      {worksheetSourceMode === 'ai_agent' && (
        <div className="bg-gradient-to-br from-forest-50/70 via-white to-gov-50 p-5 rounded-2xl border-2 border-forest-300 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-forest-200 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-black bg-forest-700 text-white uppercase tracking-wider">
                  FLN MTB-MLE Generative Agent
                </span>
                <span className="text-xs font-bold text-forest-800">
                  झारखण्ड जनजातीय परिवेशीय शिक्षण सामग्री बैंक
                </span>
              </div>
              <h3 className="text-base font-black text-gov-900 mt-1 flex items-center gap-2">
                <span>विद्यार्थी स्तर अनुसार सरल, प्राकृतिक एवं विविधता-युक्त द्विभाषी अभ्यास पत्रक</span>
              </h3>
              <p className="text-xs text-gov-600 mt-0.5">
                Each worksheet is dynamically randomized from 40+ authentic tribal realia (Sal trees, Mandar drums, Mahua fruits, birds). Zero repetition between students!
              </p>
            </div>

            {/* Quick Regenerate Action Button */}
            <button
              onClick={handleRegenerateAgentVariation}
              disabled={isLoadingWorksheet}
              className="px-4 py-2 rounded-xl bg-forest-700 hover:bg-forest-800 text-white font-black text-xs flex items-center gap-2 shadow-sm transition-all active:scale-95 shrink-0 cursor-pointer"
            >
              <Dices className="w-4 h-4 text-forest-200" />
              <span>🎲 Generate New AI Variation (नया रूपांतरण)</span>
            </button>
          </div>

          {/* Student Personalization & Difficulty Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {/* 1. Student Name */}
            <div className="bg-white p-3 rounded-xl border border-gov-200 space-y-1">
              <label className="font-bold text-gov-700 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-forest-700" />
                <span>विद्यार्थी का नाम (Student Name):</span>
              </label>
              <input
                type="text"
                value={agentStudentName}
                onChange={(e) => setAgentStudentName(e.target.value)}
                placeholder="उदा. बिरसा मुंडा / सुनीता मुर्मू"
                className="w-full px-2.5 py-1.5 rounded-lg border border-gov-300 font-bold text-gov-900 focus:outline-none focus:border-forest-700"
              />
            </div>

            {/* 2. School Name */}
            <div className="bg-white p-3 rounded-xl border border-gov-200 space-y-1">
              <label className="font-bold text-gov-700 flex items-center gap-1.5">
                <School className="w-3.5 h-3.5 text-forest-700" />
                <span>विद्यालय (School / Village):</span>
              </label>
              <input
                type="text"
                value={agentSchoolName}
                onChange={(e) => setAgentSchoolName(e.target.value)}
                placeholder="उदा. राजकीय प्रा. विद्यालय, दुमका"
                className="w-full px-2.5 py-1.5 rounded-lg border border-gov-300 font-bold text-gov-900 focus:outline-none focus:border-forest-700"
              />
            </div>

            {/* 3. Competency Level */}
            <div className="bg-white p-3 rounded-xl border border-gov-200 space-y-1">
              <label className="font-bold text-gov-700 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-forest-700" />
                <span>दक्षता स्तर (Competency Level):</span>
              </label>
              <select
                value={agentLevel}
                onChange={(e) => setAgentLevel(e.target.value as StudentCompetencyLevel)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-gov-300 font-bold text-gov-900 bg-white focus:outline-none focus:border-forest-700 cursor-pointer"
              >
                <option value="balvatika">🐣 Balvatika (4-6 yrs, Pre-Literacy)</option>
                <option value="class1">🎒 Class 1 (6-7 yrs, Foundational)</option>
                <option value="class2">📘 Class 2 (7-8 yrs, Intermediate)</option>
                <option value="class3">🚀 Class 3 (8-9 yrs, Advanced FLN)</option>
              </select>
            </div>

            {/* 4. Activity Format Focus */}
            <div className="bg-white p-3 rounded-xl border border-gov-200 space-y-1">
              <label className="font-bold text-gov-700 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-forest-700" />
                <span>गतिविधि प्रारूप (Focus Type):</span>
              </label>
              <select
                value={agentFocus}
                onChange={(e) => setAgentFocus(e.target.value as WorksheetFocusType)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-gov-300 font-bold text-gov-900 bg-white focus:outline-none focus:border-forest-700 cursor-pointer"
              >
                <option value="combo">🌟 All-in-One NIPUN Combo (Complete Sheet)</option>
                <option value="match">🎯 Realia Picture-to-Word Matching</option>
                <option value="count">🔢 Realia Counting & Math (1-10)</option>
                <option value="trace">✍️ Script Tracing (Ol Chiki / Dev)</option>
                <option value="fill">📝 Sentence Fill-in-the-Blanks</option>
                <option value="story">📖 3-Step Story Sequence</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: Official JCERT Cascading Curriculum Selector */}
      {worksheetSourceMode === 'official_curriculum' && (
        <CurriculumCascadingSelector
          selectedLanguage={selectedLanguage}
          selectedGrade={grade}
          selectedSubjectId={selectedSubjectId}
          selectedChapterId={selectedChapter?.id}
          onGradeChange={(g) => setGrade(g)}
          onSubjectChange={(sId) => setSelectedSubjectId(sId)}
          onChapterSelect={(ch) => setSelectedChapter(ch)}
          showDetailsCard={true}
        />
      )}

      {/* Mode 3: Multi-Media Upload Drawer for Worksheet Studio */}
      {worksheetSourceMode === 'custom_upload' && (
        <div className="bg-gradient-to-br from-amber-50/50 via-white to-gov-50 p-5 rounded-2xl border-2 border-dashed border-amber-300 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-200 pb-3">
            <div>
              <h3 className="text-base font-black text-gov-900 flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-amber-700" />
                <span>शैक्षणिक सामग्री / वीडियो / PDF अपलोड से गतिशील कार्यपत्रक निर्माण</span>
              </h3>
              <p className="text-xs text-gov-600 mt-0.5">
                Upload educational videos (.mp4), textbook PDFs (.pdf), audio lessons (.mp3), or notes (.docx/.txt) to generate authentic trilingual worksheets instantly.
              </p>
            </div>

            {/* Target Class & Subject in Upload Mode */}
            <div className="flex items-center gap-2 text-xs">
              <div className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-gov-200">
                <span className="font-bold text-gov-600">कक्षा:</span>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="font-bold text-gov-900 bg-transparent focus:outline-none cursor-pointer"
                >
                  <option value="Class 1">Class 1</option>
                  <option value="Class 2">Class 2</option>
                  <option value="Class 3">Class 3</option>
                </select>
              </div>

              <div className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-gov-200">
                <span className="font-bold text-gov-600">विषय:</span>
                <select
                  value={selectedSubjectId}
                  onChange={(e) => setSelectedSubjectId(e.target.value as any)}
                  className="font-bold text-gov-900 bg-transparent focus:outline-none cursor-pointer"
                >
                  <option value="hindi">हिन्दी भाषा</option>
                  <option value="math">गणित</option>
                  <option value="evs">पर्यावरण</option>
                  <option value="english">अंग्रेज़ी</option>
                </select>
              </div>
            </div>
          </div>

          {/* Upload Dropzone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-2 border-dashed border-gov-300 rounded-xl p-6 text-center hover:border-amber-500 bg-white transition-all flex flex-col items-center justify-center space-y-2 cursor-pointer relative">
              <input
                type="file"
                onChange={handleFileUpload}
                accept="video/*,audio/*,.pdf,.docx,.doc,.txt"
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center">
                <FolderUp className="w-6 h-6" />
              </div>
              <div className="text-xs font-black text-gov-900">
                फ़ाइल चुनें या यहाँ ड्रैग करें
              </div>
              <div className="text-[11px] text-gov-500">
                समर्थित: Video (MP4), Textbook (PDF), Audio (MP3), Document (DOCX)
              </div>
              {uploadedFileName && (
                <div className="mt-2 text-xs font-bold text-forest-700 bg-forest-50 px-3 py-1 rounded-full border border-forest-200 flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <span>चयनित: {uploadedFileName}</span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-bold text-gov-700">
                या पाठ्य सामग्री सीधे यहाँ लिखें / पेस्ट करें:
              </label>
              <textarea
                value={customContentText}
                onChange={(e) => setCustomContentText(e.target.value)}
                placeholder="यहाँ पाठ्य सामग्री, कहानी या शिक्षण निर्देश दर्ज करें..."
                className="w-full h-28 p-3 text-xs rounded-xl border border-gov-300 focus:outline-none focus:border-amber-600 font-mono"
              />
              <button
                onClick={handleUploadMediaAndGenerateWorksheets}
                disabled={isGeneratingFromUpload || (!uploadedFile && !customContentText.trim())}
                className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-black text-xs flex items-center justify-center gap-2 disabled:opacity-50 transition-all shadow-sm"
              >
                {isGeneratingFromUpload ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>सामग्री का विश्लेषण एवं कार्यपत्रक निर्माण हो रहा है...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    <span>⚡ कार्यपत्रक व शिक्षण किट तैयार करें</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 1: BILINGUAL WORKSHEET GENERATOR */}
      {activeTab === 'worksheets' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Settings Column (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-xl border border-gov-200 p-5 shadow-sm space-y-4">
              <h3 className="font-extrabold text-gov-900 text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-forest-700" />
                <span>कार्यपत्रक प्रारूप एवं नियंत्रण (Controls)</span>
              </h3>

              {/* If in AI Agent Mode */}
              {worksheetSourceMode === 'ai_agent' && (
                <div className="space-y-3">
                  <div className="p-3 bg-forest-50 border border-forest-200 rounded-xl space-y-1 text-xs">
                    <div className="font-black text-forest-900 flex items-center gap-1.5">
                      <Bot className="w-4 h-4 text-forest-700" />
                      <span>AI Agent Active (स्वचालित विविधता)</span>
                    </div>
                    <div className="text-[11px] text-forest-700">
                      प्रत्येक छात्र को विशिष्ट व गैर-दोहराव वाला कार्यपत्रक मिलेगा।
                    </div>
                  </div>

                  <button
                    onClick={handleRegenerateAgentVariation}
                    disabled={isLoadingWorksheet}
                    className="w-full py-2.5 rounded-xl bg-forest-700 hover:bg-forest-800 text-white font-black text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer"
                  >
                    <Dices className="w-4 h-4 text-forest-200" />
                    <span>⚡ Generate New AI Variation</span>
                  </button>
                </div>
              )}

              {/* Worksheet Type Selector (if official mode or specific focus) */}
              {worksheetSourceMode !== 'ai_agent' && (
                <div>
                  <label className="block text-xs font-bold text-gov-700 mb-1.5">
                    गतिविधि प्रारूप (Activity Format):
                  </label>
                  <div className="space-y-1.5">
                    {[
                      { id: 'match', title: '1. Picture-to-Word Matching (मिलान करो)', desc: 'स्थानीय चित्रों और मातृभाषा शब्दों का मिलान' },
                      { id: 'count', title: '2. FLN Number Counting (गिनो और लिखो)', desc: 'स्थानीय सांस्कृतिक वस्तुओं की गिनती (1-5/1-10)' },
                      { id: 'trace', title: '3. Letter Tracing & Writing (अक्षर अभ्यास)', desc: 'ओल चिकी एवं देवनागरी वर्ण अनुरेखण' },
                      { id: 'fill', title: '4. Sentence & Word Construction (खाली स्थान भरो)', desc: 'ध्वनि, वर्तनी और वाक्य निर्माण' },
                    ].map(t => (
                      <button
                        key={t.id}
                        onClick={() => setWorksheetType(t.id as any)}
                        className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all ${
                          worksheetType === t.id
                            ? 'border-gov-900 bg-gov-50 font-bold text-gov-900 shadow-sm'
                            : 'border-gov-200 bg-white text-gov-700 hover:bg-gov-50'
                        }`}
                      >
                        <div className="font-bold">{t.title}</div>
                        <div className="text-[10px] text-gov-500 font-normal">{t.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 space-y-2">
                <button
                  onClick={handleDownloadPdf}
                  disabled={isExportingPdf}
                  className="w-full py-3 rounded-xl bg-gov-900 hover:bg-forest-900 text-white font-black text-xs shadow-sm flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
                >
                  {isExportingPdf ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>PDF तैयार हो रहा है...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>प्रिंट हेतु A4 PDF डाउनलोड करें (Print PDF)</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Print Tips Note */}
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                🖨️ ग्रामीण विद्यालय मुद्रण अनुकूल (Classroom Ready)
              </div>
              <p className="text-[11px] text-amber-800">
                ग्रामीण प्राथमिक विद्यालयों के ब्लैक-एंड-व्हाइट एवं रंगीन प्रिंटर हेतु उच्च-कंट्रास्ट एवं स्पष्ट लिपी में संरचित।
              </p>
            </div>
          </div>

          {/* Worksheet Live Preview Column (8 cols) */}
          <div className="lg:col-span-8">
            <div className="bg-gov-100 p-4 rounded-xl border border-gov-200 overflow-x-auto">
              {isLoadingWorksheet ? (
                <div className="bg-white mx-auto p-12 rounded-lg shadow-md border border-gov-300 min-w-[580px] max-w-[680px] text-center space-y-3">
                  <RefreshCw className="w-8 h-8 animate-spin text-forest-700 mx-auto" />
                  <div className="text-sm font-bold text-gov-800">
                    एआई द्वारा विशिष्ट कार्यपत्रक तैयार हो रहा है...
                  </div>
                </div>
              ) : (
                /* Actual Printable A4 Sheet Component */
                <div
                  ref={printableRef}
                  className="bg-white mx-auto p-8 rounded-lg shadow-md border border-gov-300 min-w-[580px] max-w-[680px] text-gov-900 space-y-5"
                >
                  {/* School & NIPUN Header */}
                  <div className="border-b-2 border-gov-900 pb-3 text-center space-y-1">
                    <div className="text-[10px] font-bold tracking-widest text-gov-600 uppercase">
                      स्कूली शिक्षा एवं साक्षरता विभाग • झारखण्ड सरकार • NIPUN BHARAT MTB-MLE
                    </div>
                    <h3 className="text-base sm:text-lg font-black tracking-tight text-gov-900">
                      भाषा सेतु मातृभाषा-आधारित बहुभाषी शिक्षण कार्यपत्रक
                    </h3>
                    <div className="text-xs font-black text-forest-800">
                      {worksheetSourceMode === 'ai_agent' && agentWorksheet 
                        ? `${agentWorksheet.title} (${selectedLanguage.toUpperCase()})`
                        : `${dynamicWorksheet?.book_title || selectedChapter?.textbook || 'JCERT प्राथमिक पाठ्यपुस्तक'} • ${dynamicWorksheet?.title || selectedChapter?.title || 'FLN कार्यपत्रक'}`}
                    </div>

                    {/* Student Details Fields */}
                    <div className="grid grid-cols-3 gap-2 text-xs font-semibold pt-2 text-left border-t border-gov-200 mt-2">
                      <div>
                        छात्र (Student): <strong>{worksheetSourceMode === 'ai_agent' && agentWorksheet ? agentWorksheet.student_name : '_________________'}</strong>
                      </div>
                      <div>
                        कक्षा (Class): <strong>{worksheetSourceMode === 'ai_agent' && agentWorksheet ? agentWorksheet.grade : grade}</strong>
                      </div>
                      <div>
                        दिनांक (Date): <strong>{new Date().toLocaleDateString('hi-IN')}</strong>
                      </div>
                    </div>

                    {worksheetSourceMode === 'ai_agent' && agentWorksheet && (
                      <div className="flex items-center justify-between text-[10px] text-gov-500 font-mono pt-1">
                        <span>पत्रक कोड: {agentWorksheet.worksheet_id}</span>
                        <span>सीड: {agentWorksheet.variation_seed} • 100% Offline AI Agent</span>
                      </div>
                    )}
                  </div>

                  {/* PART 1: PICTURE TO WORD MATCH */}
                  {(worksheetSourceMode !== 'ai_agent' ? worksheetType === 'match' : (agentFocus === 'combo' || agentFocus === 'match')) && (
                    <div className="space-y-3 border-b border-gov-200 pb-4">
                      <div className="bg-gov-50 p-2.5 rounded-xl border border-gov-200 space-y-0.5 text-xs">
                        <div className="font-black text-forest-900 flex items-center gap-1.5">
                          <span className="px-1.5 py-0.5 rounded bg-forest-200 text-forest-900 text-[10px] font-bold">भाग १ (Part A)</span>
                          <span>चित्र देखकर सही मातृभाषा शब्द से रेखा खींचकर मिलाएँ (Match Pictures with Words)</span>
                        </div>
                        <div className="text-[11px] text-gov-600 font-semibold">
                          ᱫᱤᱥᱟᱹ: ᱪᱤᱛᱟᱹᱨ ᱧᱮᱞ ᱠᱟᱛᱮ ᱴᱷᱤᱠ ᱟᱹᱲᱟᱹ ᱥᱟᱶ ᱡᱚᱲᱟᱣ ᱢᱮ᱾
                        </div>
                      </div>

                      <div className="space-y-2.5 pt-1">
                        {activeMatchList.map((item: any, idx: number) => (
                          <div key={idx} className="flex items-center justify-between border-b border-dashed border-gov-300 pb-1.5">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{item.emoji || '🌿'}</span>
                              <span className="text-xs font-bold text-gov-800">
                                [{item.english_text || 'Item'} / {item.hindi_text || 'शब्द'}]
                              </span>
                              <span className="w-4 h-4 rounded-full border-2 border-gov-400 inline-block ml-3"></span>
                            </div>

                            <div className="flex items-center gap-3">
                              <span className="w-4 h-4 rounded-full border-2 border-gov-400 inline-block mr-3"></span>
                              <div className="text-right">
                                {selectedLanguage === 'santhali' && (
                                  <span className="text-sm font-bold text-gov-900 font-sans mr-2">
                                    {item.tribal_script || item.tribal_text}
                                  </span>
                                )}
                                <span className="text-xs font-bold text-forest-800 mr-2">
                                  ({item.tribal_text})
                                </span>
                                <span className="text-xs font-semibold text-gov-600">
                                  / {item.hindi_text}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* PART 2: COUNTING & MATH */}
                  {(worksheetSourceMode !== 'ai_agent' ? worksheetType === 'count' : (agentFocus === 'combo' || agentFocus === 'count')) && (
                    <div className="space-y-3 border-b border-gov-200 pb-4">
                      <div className="bg-gov-50 p-2.5 rounded-xl border border-gov-200 space-y-0.5 text-xs">
                        <div className="font-black text-forest-900 flex items-center gap-1.5">
                          <span className="px-1.5 py-0.5 rounded bg-forest-200 text-forest-900 text-[10px] font-bold">भाग २ (Part B)</span>
                          <span>परिवेशीय वस्तुओं को गिनें और संख्या लिखें (Count Realia Objects 1-10)</span>
                        </div>
                        <div className="text-[11px] text-gov-600 font-semibold">
                          ᱫᱤᱥᱟᱹ: ᱪᱤᱛᱟᱹᱨ ᱞᱮᱠᱷᱟ ᱠᱟᱛᱮ ᱴᱷᱤᱠ ᱮᱞ ᱚᱞ ᱢᱮ᱾
                        </div>
                      </div>

                      <div className="space-y-2 pt-1">
                        {activeCountList.map((item: any, idx: number) => (
                          <div key={idx} className="flex items-center justify-between border-b border-dashed border-gov-300 pb-1.5">
                            <div className="flex items-center gap-1.5 text-xl flex-wrap">
                              {Array.from({ length: item.count || 1 }).map((_, i) => (
                                <span key={i}>{item.emoji || '🌿'}</span>
                              ))}
                              <span className="text-[11px] font-semibold text-gov-700 ml-2">
                                ({item.name_hindi || item.name_english})
                              </span>
                            </div>

                            <div className="flex items-center gap-2 text-xs shrink-0">
                              <span className="font-bold text-gov-700">
                                {item.name_tribal}:
                              </span>
                              <div className="w-14 h-7 border-2 border-gov-900 rounded flex items-center justify-center font-bold text-sm bg-gov-50">
                                [ &nbsp;&nbsp;&nbsp; ]
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* PART 3: LETTER & WORD TRACING */}
                  {(worksheetSourceMode !== 'ai_agent' ? worksheetType === 'trace' : (agentFocus === 'combo' || agentFocus === 'trace')) && (
                    <div className="space-y-3 border-b border-gov-200 pb-4">
                      <div className="bg-gov-50 p-2.5 rounded-xl border border-gov-200 space-y-0.5 text-xs">
                        <div className="font-black text-forest-900 flex items-center gap-1.5">
                          <span className="px-1.5 py-0.5 rounded bg-forest-200 text-forest-900 text-[10px] font-bold">भाग ३ (Part C)</span>
                          <span>मातृभाषा लिपि एवं देवनागरी अक्षर अनुरेखण (Script Tracing)</span>
                        </div>
                        <div className="text-[11px] text-gov-600 font-semibold">
                          ᱫᱤᱥᱟᱹ: ᱴᱩᱰᱟᱹᱜ ᱡᱚᱲᱟᱣ ᱠᱟᱛᱮ ᱚᱞ ᱪᱮᱫᱚᱜ ᱢᱮ (Connect dots to write)
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-1">
                        {activeTraceList.map((item: any, idx: number) => (
                          <div key={idx} className="p-2.5 border border-gov-300 rounded space-y-1.5">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold text-gov-800">
                                {item.char_devanagari} • {item.word_native}
                              </span>
                              <span className="text-[10px] text-gov-500 font-bold">
                                ध्वनि: {item.sound_phonetic}
                              </span>
                            </div>
                            {selectedLanguage === 'santhali' && (
                              <div className="text-2xl font-black text-center text-gov-300 font-sans tracking-widest border border-dashed border-gov-300 py-1 rounded">
                                {item.char_native} &nbsp; {item.char_native} &nbsp; {item.char_native}
                              </div>
                            )}
                            <div className="text-xl font-bold text-center text-gov-300 tracking-widest border border-dashed border-gov-300 py-1 rounded">
                              {item.char_devanagari} &nbsp;&nbsp; {item.char_devanagari} &nbsp;&nbsp; {item.char_devanagari}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* PART 4: SENTENCE FILL-IN-THE-BLANKS */}
                  {(worksheetSourceMode !== 'ai_agent' ? worksheetType === 'fill' : (agentFocus === 'combo' || agentFocus === 'fill')) && (
                    <div className="space-y-3 border-b border-gov-200 pb-4">
                      <div className="bg-gov-50 p-2.5 rounded-xl border border-gov-200 space-y-0.5 text-xs">
                        <div className="font-black text-forest-900 flex items-center gap-1.5">
                          <span className="px-1.5 py-0.5 rounded bg-forest-200 text-forest-900 text-[10px] font-bold">भाग ४ (Part D)</span>
                          <span>रिक्त स्थान भरें (Sentence Construction & Contextual Fill)</span>
                        </div>
                        <div className="text-[11px] text-gov-600 font-semibold">
                          ᱫᱤᱥᱟᱹ: ᱠᱷᱟᱹᱞᱤ ᱡᱟᱭᱜᱟ ᱯᱮᱨᱮᱡᱽ ᱢᱮ᱾
                        </div>
                      </div>

                      <div className="space-y-2 pt-1 text-xs">
                        {activeFillList.map((item: any, idx: number) => (
                          <div key={idx} className="p-2 border border-gov-300 rounded bg-white space-y-1">
                            <div className="font-bold text-gov-900">{idx + 1}. {item.sentence_incomplete}</div>
                            {item.tribal_sentence && (
                              <div className="text-forest-800 text-[11px] font-semibold">{item.tribal_sentence}</div>
                            )}
                            <div className="text-amber-800 text-[10px] font-bold">संकेत (Hint): {item.hint}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* PART 5: 3-STEP ILLUSTRATED STORY SEQUENCE (AI Agent Mode) */}
                  {worksheetSourceMode === 'ai_agent' && (agentFocus === 'combo' || agentFocus === 'story') && activeStorySteps.length > 0 && (
                    <div className="space-y-3 border-b border-gov-200 pb-4">
                      <div className="bg-gov-50 p-2.5 rounded-xl border border-gov-200 space-y-0.5 text-xs">
                        <div className="font-black text-forest-900 flex items-center gap-1.5">
                          <span className="px-1.5 py-0.5 rounded bg-forest-200 text-forest-900 text-[10px] font-bold">भाग ५ (Part E)</span>
                          <span>चित्र कथा क्रम पहचानें (Order the Story Steps: 1, 2, 3)</span>
                        </div>
                        <div className="text-[11px] text-gov-600 font-semibold">
                          ᱫᱤᱥᱟᱹ: ᱠᱟᱹᱦᱱᱤ ᱨᱮᱱᱟᱜ ᱴᱷᱤᱠ ᱫᱷᱟᱯ (᱑, ᱒, ᱓) ᱵᱟᱪᱷᱟᱣ ᱢᱮ᱾
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 pt-1 text-xs text-center">
                        {activeStorySteps.map((step, idx) => (
                          <div key={idx} className="p-2.5 border-2 border-gov-300 rounded-xl space-y-1.5 bg-gov-50/50">
                            <div className="text-3xl">{step.emoji}</div>
                            <div className="font-black text-gov-900 text-[11px]">{step.hindi_text}</div>
                            <div className="text-[10px] text-forest-800 font-semibold">{step.tribal_text}</div>
                            <div className="w-8 h-8 mx-auto border-2 border-gov-900 rounded-full flex items-center justify-center font-bold text-sm bg-white mt-1">
                              [ &nbsp; ]
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* PART 6: PHONICS & ORAL CORNER */}
                  {worksheetSourceMode === 'ai_agent' && agentWorksheet?.phonics_oral_corner && (
                    <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1.5 text-xs">
                      <div className="font-black text-amber-950 flex items-center justify-between">
                        <span>🗣️ {agentWorksheet.phonics_oral_corner.prompt_hindi}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 font-bold">
                          Oral Practice
                        </span>
                      </div>
                      <div className="flex items-center gap-3 pt-1 flex-wrap">
                        {agentWorksheet.phonics_oral_corner.practice_words.map((pw, i) => (
                          <div key={i} className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg border border-amber-200">
                            <span className="font-black text-gov-900">{pw.word}</span>
                            <span className="text-forest-700 font-bold">({pw.phonetic})</span>
                            <span className="text-gov-500 text-[10px]">= {pw.meaning}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Teacher Assessment Stars & Signature Block */}
                  <div className="pt-3 border-t-2 border-gov-300 flex items-center justify-between text-xs text-gov-700 font-bold">
                    <div>
                      अध्यापक हस्ताक्षर (Teacher Sign): _________________
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span>निपुण मूल्यांकन (Score):</span>
                      <span className="text-amber-500 text-sm tracking-widest">⭐ ⭐ ⭐ ⭐ ⭐</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INTERACTIVE VISUAL FLASHCARDS */}
      {activeTab === 'flashcards' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-gov-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-gov-600 font-medium">
              Tap any flashcard to reveal bilingual translations, Devanagari script, Ol Chiki, and listen to authentic native pronunciation.
            </p>
            <span className="px-2.5 py-1 rounded-full bg-gov-100 text-gov-800 text-xs font-bold">
              Total Cards: {vocabList.length}
            </span>
          </div>

          {/* Flashcard Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {vocabList.map((item, idx) => {
              const isFlipped = activeFlippedCard === idx;
              const tribalDev = selectedLanguage === 'santhali' ? item.santhali_dev :
                                selectedLanguage === 'mundari' ? item.mundari_dev : item.ho_dev;
              const tribalRom = selectedLanguage === 'santhali' ? item.santhali_rom :
                                selectedLanguage === 'mundari' ? item.mundari_rom : item.ho_rom;
              const tribalOl = selectedLanguage === 'santhali' ? item.santhali_ol : null;

              return (
                <div
                  key={idx}
                  onClick={() => setActiveFlippedCard(isFlipped ? null : idx)}
                  className="bg-white rounded-xl border border-gov-200 hover:border-gov-400 p-5 shadow-sm cursor-pointer transition-all hover:shadow-md min-h-[180px] flex flex-col justify-between"
                >
                  {/* Top Bar */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-gov-100 text-gov-700">
                      {item.category}
                    </span>
                    <button
                      onClick={(e) => { e.stopPropagation(); handlePlayCardAudio(tribalDev, idx); }}
                      className={`p-1.5 rounded-lg transition-all active:scale-95 cursor-pointer ${
                        playingCardIdx === idx
                          ? 'bg-forest-700 text-white ring-2 ring-forest-400 animate-pulse'
                          : 'bg-gov-100 text-gov-700 hover:bg-gov-900 hover:text-white'
                      }`}
                      title="1-Tap Play/Stop Pronunciation"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Card Center Content */}
                  <div className="text-center py-2 space-y-1">
                    <div className="text-xl font-extrabold text-gov-900">
                      {item.hindi}
                    </div>

                    {tribalOl && (
                      <div className="text-2xl font-bold text-gov-900 font-sans tracking-wide">
                        {tribalOl}
                      </div>
                    )}

                    <div className="text-base font-bold text-forest-800">
                      {tribalDev}
                    </div>

                    {tribalRom && (
                      <div className="text-xs text-gov-400 italic">
                        {tribalRom}
                      </div>
                    )}
                  </div>

                  {/* Footer hint */}
                  <div className="text-[10px] text-center text-gov-400 font-medium">
                    Tap to hear pronunciation
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
