import React, { useState } from 'react';
import { 
  TribalLanguage, 
  PedagogicalLessonPlan, 
  RemediationPlan, 
  LessonPlan,
  ExternalContentIngestResult
} from '../types';
import { apiService } from '../services/apiService';
import { languagePackService } from '../services/languagePackService';
import { adaptiveService, FLN_COMPETENCIES_MAP } from '../services/adaptiveEngine';
import { speechService } from '../services/speechService';
import { useLanguage } from '../context/LanguageContext';
import { CurriculumCascadingSelector } from './CurriculumCascadingSelector';
import { CulturalGuide } from './CulturalGuide';
import { getTeacherTranslations, getLocalizedQuickTemplates } from '../data/teacherPortalTranslations';
import { 
  GraduationCap, 
  Sparkles, 
  BrainCircuit, 
  AlertTriangle, 
  CheckCircle2, 
  BookOpen, 
  Volume2, 
  Printer, 
  Users, 
  Target, 
  ShieldCheck, 
  Layers, 
  UploadCloud, 
  FileText, 
  FileSpreadsheet, 
  HelpCircle, 
  Check, 
  Save, 
  RefreshCw, 
  BookMarked, 
  FolderUp, 
  FileCheck2, 
  Video, 
  Play, 
  Clock, 
  Music, 
  PlayCircle,
  Lightbulb,
  Compass,
  ArrowRight
} from 'lucide-react';

interface TeacherPortalProps {
  selectedLanguage: TribalLanguage;
  isOfflineMode: boolean;
  onNavigateToWorksheets?: () => void;
  onNavigateToCurriculum?: () => void;
  onNavigateToCulturalGuide?: () => void;
}

export const TeacherPortal: React.FC<TeacherPortalProps> = ({
  selectedLanguage,
  isOfflineMode,
  onNavigateToWorksheets,
  onNavigateToCurriculum,
  onNavigateToCulturalGuide
}) => {
  const { uiLanguage } = useLanguage();
  const pack = languagePackService.getPack(selectedLanguage);
  const st = getTeacherTranslations(uiLanguage, pack);
  const quickTemplates = getLocalizedQuickTemplates(uiLanguage);

  // Top Workspace Tab State: 'planner' | 'diagnostics' | 'media_worksheets' | 'cultural_guide'
  const [activeMainTab, setActiveMainTab] = useState<'planner' | 'diagnostics' | 'media_worksheets' | 'cultural_guide'>('planner');

  // Official JCERT Mode State (Lesson Planner)
  const [selectedGrade, setSelectedGrade] = useState<string>('Class 2');
  const [selectedSubjectId, setSelectedSubjectId] = useState<'hindi' | 'math' | 'evs' | 'english'>('math');
  const [selectedSubject, setSelectedSubject] = useState<string>(
    uiLanguage === 'english' ? 'Mathematics (Joyful Math 2)' : 'गणित (खेल-खेल में गणित 2)'
  );
  const [selectedChapter, setSelectedChapter] = useState<LessonPlan | null>(null);
  const [lessonTopic, setLessonTopic] = useState<string>(
    uiLanguage === 'english' ? 'Chapter 1: Fun with Numbers' : 'पाठ 1: संख्याओं का मेला'
  );
  const [contextTheme, setContextTheme] = useState<string>('village_nature');
  
  const [isGeneratingLesson, setIsGeneratingLesson] = useState<boolean>(false);
  const [generatedLesson, setGeneratedLesson] = useState<PedagogicalLessonPlan | null>(null);

  // Diagnostics & Remediation State
  const [selectedStudentForRemediation, setSelectedStudentForRemediation] = useState<string | null>(null);
  const [isGeneratingRemediation, setIsGeneratingRemediation] = useState<boolean>(false);
  const [generatedRemediation, setGeneratedRemediation] = useState<RemediationPlan | null>(null);

  // External Content & Media Ingestion State
  const [uploadSourceType, setUploadSourceType] = useState<'video' | 'pdf' | 'audio' | 'document' | 'text'>('video');
  const [uploadText, setUploadText] = useState<string>('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [mediaPreviewUrl, setMediaPreviewUrl] = useState<string | null>(null);
  const [detectedMediaType, setDetectedMediaType] = useState<'video' | 'pdf' | 'document' | 'audio' | 'image' | 'text'>('video');
  const [uploadGrade, setUploadGrade] = useState<string>('Class 1');
  const [uploadSubject, setUploadSubject] = useState<string>(
    uiLanguage === 'english' ? 'Language & Literacy' : 'भाषा एवं साक्षरता (Language & Literacy)'
  );
  const [uploadContextTheme, setUploadContextTheme] = useState<string>('festivals');
  const [isIngestingContent, setIsIngestingContent] = useState<boolean>(false);
  const [ingestResult, setIngestResult] = useState<ExternalContentIngestResult | null>(null);
  const [activeIngestTab, setActiveIngestTab] = useState<'video_intelligence' | 'plan' | 'assessment' | 'worksheets'>('video_intelligence');
  const [savedSuccessMsg, setSavedSuccessMsg] = useState<string>('');
  const videoPlayerRef = React.useRef<HTMLVideoElement>(null);

  // Interactive Quiz & Assessment State for Ingested Lesson
  const [userQuizAnswers, setUserQuizAnswers] = useState<Record<number, string>>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<{ earned: number; total: number; percentage: number } | null>(null);

  const [playingAudioKey, setPlayingAudioKey] = useState<string | null>(null);

  const handleToggleAudio = (text: string, lang: 'hindi' | TribalLanguage, key: string) => {
    if (playingAudioKey === key && speechService.isSpeakingNow()) {
      speechService.stopSpeaking();
      setPlayingAudioKey(null);
      return;
    }
    setPlayingAudioKey(key);
    speechService.toggleSpeak(
      text,
      lang,
      () => setPlayingAudioKey(key),
      () => setPlayingAudioKey(null)
    );
  };

  const cohortAverages = adaptiveService.getCompetencyAverages(selectedGrade);
  const students = adaptiveService.getCohort(selectedGrade);

  // Identify struggling students in cohort (<60% score)
  const strugglingStudents = students.filter(s => 
    Object.values(s.masteryMatrix).some(score => score < 60)
  );

  const handleChapterSelect = (chapter: LessonPlan | null) => {
    setSelectedChapter(chapter);
    if (chapter) {
      setLessonTopic(chapter.title);
      setSelectedSubject(chapter.subject || selectedSubject);
      if (chapter.theme) {
        if (chapter.theme.includes('कृषि') || chapter.theme.includes('खेती') || chapter.theme.includes('फसल') || chapter.theme.toLowerCase().includes('agri')) {
          setContextTheme('agriculture');
        } else if (chapter.theme.includes('हाट') || chapter.theme.includes('बाजार') || chapter.theme.includes('मेला') || chapter.theme.toLowerCase().includes('market')) {
          setContextTheme('weekly_market');
        } else if (chapter.theme.includes('पर्व') || chapter.theme.includes('त्योहार') || chapter.theme.includes('सोहराय') || chapter.theme.includes('सरहुल') || chapter.theme.toLowerCase().includes('festival')) {
          setContextTheme('festivals');
        } else {
          setContextTheme('village_nature');
        }
      }
    }
  };

  const handleGenerateLesson = async () => {
    setIsGeneratingLesson(true);
    try {
      const plan = await apiService.generatePedagogicalLesson(
        lessonTopic,
        selectedGrade,
        selectedSubject,
        selectedLanguage,
        'default',
        contextTheme
      );
      setGeneratedLesson(plan);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingLesson(false);
    }
  };

  const handleGenerateRemediation = async (studentId: string, studentName: string, compId: string) => {
    setIsGeneratingRemediation(true);
    setSelectedStudentForRemediation(studentId);
    try {
      const rem = await apiService.generateRemediation(
        studentId,
        studentName,
        compId,
        45.0,
        selectedGrade,
        selectedLanguage
      );
      setGeneratedRemediation(rem);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingRemediation(false);
    }
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
      setUploadText(uiLanguage === 'english'
        ? `[Video Lesson: ${file.name} (${(file.size / (1024 * 1024)).toFixed(1)} MB)]\nTitle: ${file.name.replace(/\.[^/.]+$/, "")}\nGrade: ${uploadGrade}\nSubject: ${uploadSubject}`
        : `[वीडियो शिक्षण पाठ: ${file.name} (${(file.size / (1024 * 1024)).toFixed(1)} MB)]\nशीर्षक: ${file.name.replace(/\.[^/.]+$/, "")}\nकक्षा: ${uploadGrade}\nविषय: ${uploadSubject}`
      );
    } else if (ext === 'pdf') {
      setDetectedMediaType('pdf');
      setUploadSourceType('pdf');
      const url = URL.createObjectURL(file);
      setMediaPreviewUrl(url);
      setUploadText(uiLanguage === 'english'
        ? `[PDF Textbook / Document: ${file.name} (${(file.size / 1024).toFixed(1)} KB)]`
        : `[PDF पाठ्यपुस्तक / दस्तावेज़: ${file.name} (${(file.size / 1024).toFixed(1)} KB)]`
      );
    } else if (['mp3', 'wav', 'm4a', 'ogg', 'aac'].includes(ext)) {
      setDetectedMediaType('audio');
      setUploadSourceType('audio');
      const url = URL.createObjectURL(file);
      setMediaPreviewUrl(url);
      setUploadText(uiLanguage === 'english'
        ? `[Oral Audio Lesson: ${file.name} (${(file.size / 1024).toFixed(1)} KB)]`
        : `[मौखिक ऑडियो पाठ: ${file.name} (${(file.size / 1024).toFixed(1)} KB)]`
      );
    } else if (['docx', 'doc', 'pptx', 'ppt'].includes(ext)) {
      setDetectedMediaType('document');
      setUploadSourceType('document');
      setMediaPreviewUrl(null);
      setUploadText(uiLanguage === 'english'
        ? `[Document Content: ${file.name}]`
        : `[दस्तावेज़ पाठ्य सामग्री: ${file.name}]`
      );
    } else {
      setDetectedMediaType('text');
      setUploadSourceType('text');
      setMediaPreviewUrl(null);
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (text) {
          setUploadText(text);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleSeekVideo = (seconds: number) => {
    if (videoPlayerRef.current) {
      videoPlayerRef.current.currentTime = seconds;
      videoPlayerRef.current.play().catch(() => {});
    }
  };

  const handleApplyTemplate = (tmpl: ReturnType<typeof getLocalizedQuickTemplates>[0]) => {
    setUploadedFile(null);
    setMediaPreviewUrl(null);
    setDetectedMediaType('text');
    setUploadSourceType('text');
    setUploadText(tmpl.content);
    setUploadedFileName(`${tmpl.id}.txt`);
    setUploadGrade(tmpl.grade);
    setUploadSubject(tmpl.subject);
    setUploadContextTheme(tmpl.theme);
  };

  const handleIngestContent = async () => {
    setIsIngestingContent(true);
    setUserQuizAnswers({});
    setIsQuizSubmitted(false);
    setQuizScore(null);
    setSavedSuccessMsg('');
    try {
      let result: ExternalContentIngestResult;
      if (uploadedFile && uploadSourceType !== 'text') {
        result = await apiService.uploadTeacherMedia(
          uploadedFile,
          uploadGrade,
          uploadSubject,
          selectedLanguage,
          'default',
          uploadContextTheme
        );
      } else {
        if (!uploadText.trim()) return;
        result = await apiService.ingestExternalLessonContent(
          uploadText,
          uploadedFileName,
          uploadGrade,
          uploadSubject,
          selectedLanguage,
          uploadContextTheme
        );
      }
      setIngestResult(result);
      if (result.media_info?.media_type === 'video' || result.media_info?.media_type === 'audio' || result.media_info?.media_type === 'pdf') {
        setActiveIngestTab('video_intelligence');
      } else {
        setActiveIngestTab('plan');
      }
    } catch (err) {
      console.error('Failed to ingest content:', err);
    } finally {
      setIsIngestingContent(false);
    }
  };

  const handleSaveCustomLesson = async () => {
    if (!ingestResult) return;
    try {
      await apiService.saveCustomLesson(
        ingestResult.id,
        ingestResult.original_topic,
        ingestResult.detected_grade,
        ingestResult.detected_subject,
        ingestResult.target_language,
        ingestResult.lesson_plan,
        ingestResult.assessment,
        ingestResult.worksheets
      );
      setSavedSuccessMsg(uiLanguage === 'english'
        ? '✅ Lesson and assessment quiz saved to local SQLite database!'
        : '✅ पाठ एवं मूल्यांकन प्रश्नोत्तरी स्थानीय SQLite डेटाबेस में सुरक्षित कर लिए गए हैं!'
      );
      setTimeout(() => setSavedSuccessMsg(''), 4000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleQuizOptionSelect = (qId: number, optionId: string) => {
    if (isQuizSubmitted) return;
    setUserQuizAnswers(prev => ({ ...prev, [qId]: optionId }));
  };

  const handleQuizSubmit = () => {
    if (!ingestResult?.assessment) return;
    let earned = 0;
    let total = ingestResult.assessment.questions.length * 5;
    ingestResult.assessment.questions.forEach((q) => {
      const selected = userQuizAnswers[q.id];
      const correctOpt = q.options.find(o => o.is_correct);
      if (correctOpt && selected === correctOpt.id) {
        earned += 5;
      }
    });
    const pct = Math.round((earned / Math.max(1, total)) * 100);
    setQuizScore({ earned, total, percentage: pct });
    setIsQuizSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8 animate-fade-in">
      {/* 1. Header with System Persona & Language Info */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-gov-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-forest-50 text-forest-800 text-xs font-black border border-forest-200">
            <GraduationCap className="w-4 h-4 text-forest-600" />
            <span>{st.workstationBadge}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gov-900 tracking-tight">
            {st.commandCenterTitle}
          </h1>
          <p className="text-sm font-semibold text-gov-600">
            {st.activeLanguageLabel} <span className="font-bold text-forest-700">{pack.nameEnglish} ({pack.nameNative})</span> • {st.primaryScriptLabel} <span className="font-bold text-gov-800">{pack.supportedScripts[0].nameEnglish}</span>
          </p>
        </div>

        {/* Quick Cohort Stats Pill */}
        <div className="flex items-center gap-4 bg-gov-50 p-4 rounded-2xl border border-gov-200 self-stretch sm:self-auto justify-around">
          <div className="text-center pr-4 border-r border-gov-200">
            <div className="text-xs text-gov-500 font-bold">{st.enrolledStudents}</div>
            <div className="text-xl font-black text-gov-900">{students.length}</div>
          </div>
          <div className="text-center pr-4 border-r border-gov-200">
            <div className="text-xs text-gov-500 font-bold">{st.flnMastery}</div>
            <div className="text-xl font-black text-emerald-600">78.4%</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-amber-600 font-bold">{st.supportNeeded}</div>
            <div className="text-xl font-black text-amber-700">{strugglingStudents.length} {st.studentsCount}</div>
          </div>
        </div>
      </div>

      {/* 2. Hero Quick-Intent Launcher (3 Fast Action Cards) */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-gov-600">
          <Compass className="w-4 h-4 text-forest-700" />
          <span>{st.quickIntentHeading}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Action Card 1: Lesson Planner */}
          <button
            onClick={() => setActiveMainTab('planner')}
            className={`p-5 rounded-3xl border-2 text-left transition-all cursor-pointer group flex flex-col justify-between ${
              activeMainTab === 'planner'
                ? 'bg-forest-900 text-white border-forest-900 shadow-md ring-2 ring-forest-500/50'
                : 'bg-white text-gov-900 border-gov-200 hover:border-forest-400 hover:bg-forest-50/40 shadow-xs'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                  activeMainTab === 'planner' ? 'bg-forest-700 text-white' : 'bg-forest-100 text-forest-800'
                }`}>
                  <BookOpen className="w-5 h-5" />
                </div>
                <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                  activeMainTab === 'planner' ? 'bg-emerald-500/30 text-emerald-200' : 'bg-forest-100 text-forest-900'
                }`}>
                  JCERT FLN
                </span>
              </div>
              <h3 className="text-base font-black">
                {st.quickCard1Title}
              </h3>
              <p className={`text-xs leading-relaxed font-medium ${
                activeMainTab === 'planner' ? 'text-forest-200' : 'text-gov-600'
              }`}>
                {st.quickCard1Desc}
              </p>
            </div>
            <div className={`mt-4 pt-3 border-t text-xs font-bold flex items-center justify-between ${
              activeMainTab === 'planner' ? 'border-forest-800 text-amber-300' : 'border-gov-100 text-forest-700 group-hover:text-forest-900'
            }`}>
              <span>{uiLanguage === 'english' ? 'Open Lesson Planner' : 'पाठ योजना खोलें'}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </button>

          {/* Action Card 2: FLN Diagnostics */}
          <button
            onClick={() => setActiveMainTab('diagnostics')}
            className={`p-5 rounded-3xl border-2 text-left transition-all cursor-pointer group flex flex-col justify-between ${
              activeMainTab === 'diagnostics'
                ? 'bg-amber-950 text-white border-amber-950 shadow-md ring-2 ring-amber-500/50'
                : 'bg-white text-gov-900 border-gov-200 hover:border-amber-400 hover:bg-amber-50/40 shadow-xs'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                  activeMainTab === 'diagnostics' ? 'bg-amber-800 text-white' : 'bg-amber-100 text-amber-900'
                }`}>
                  <Target className="w-5 h-5" />
                </div>
                <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                  activeMainTab === 'diagnostics' ? 'bg-amber-500/30 text-amber-200' : 'bg-rose-100 text-rose-800'
                }`}>
                  {strugglingStudents.length} {st.studentsCount}
                </span>
              </div>
              <h3 className="text-base font-black">
                {st.quickCard2Title}
              </h3>
              <p className={`text-xs leading-relaxed font-medium ${
                activeMainTab === 'diagnostics' ? 'text-amber-200' : 'text-gov-600'
              }`}>
                {st.quickCard2Desc}
              </p>
            </div>
            <div className={`mt-4 pt-3 border-t text-xs font-bold flex items-center justify-between ${
              activeMainTab === 'diagnostics' ? 'border-amber-900 text-amber-300' : 'border-gov-100 text-amber-800 group-hover:text-amber-950'
            }`}>
              <span>{uiLanguage === 'english' ? 'View Student Diagnostics' : 'छात्र दक्षता व उपचारात्मक'}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </button>

          {/* Action Card 3: Media & Worksheets */}
          <button
            onClick={() => setActiveMainTab('media_worksheets')}
            className={`p-5 rounded-3xl border-2 text-left transition-all cursor-pointer group flex flex-col justify-between ${
              activeMainTab === 'media_worksheets'
                ? 'bg-indigo-950 text-white border-indigo-950 shadow-md ring-2 ring-indigo-500/50'
                : 'bg-white text-gov-900 border-gov-200 hover:border-indigo-400 hover:bg-indigo-50/40 shadow-xs'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                  activeMainTab === 'media_worksheets' ? 'bg-indigo-800 text-white' : 'bg-indigo-100 text-indigo-900'
                }`}>
                  <UploadCloud className="w-5 h-5" />
                </div>
                <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                  activeMainTab === 'media_worksheets' ? 'bg-indigo-500/30 text-indigo-200' : 'bg-indigo-100 text-indigo-900'
                }`}>
                  AI Media
                </span>
              </div>
              <h3 className="text-base font-black">
                {st.quickCard3Title}
              </h3>
              <p className={`text-xs leading-relaxed font-medium ${
                activeMainTab === 'media_worksheets' ? 'text-indigo-200' : 'text-gov-600'
              }`}>
                {st.quickCard3Desc}
              </p>
            </div>
            <div className={`mt-4 pt-3 border-t text-xs font-bold flex items-center justify-between ${
              activeMainTab === 'media_worksheets' ? 'border-indigo-900 text-amber-300' : 'border-gov-100 text-indigo-800 group-hover:text-indigo-950'
            }`}>
              <span>{uiLanguage === 'english' ? 'Open Media Studio' : 'मीडिया व वर्कशीट खोलें'}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </button>
        </div>
      </div>

      {/* 3. Primary Segmented Tabs Navigation */}
      <div className="bg-gov-100 p-1.5 rounded-2xl flex flex-wrap items-center gap-1.5 border border-gov-200">
        <button
          onClick={() => setActiveMainTab('planner')}
          className={`flex-1 min-w-[200px] py-3 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeMainTab === 'planner'
              ? 'bg-forest-800 text-white shadow-sm'
              : 'text-gov-700 hover:text-gov-900 hover:bg-gov-200/60'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>{st.mainTabPlanner}</span>
        </button>

        <button
          onClick={() => setActiveMainTab('diagnostics')}
          className={`flex-1 min-w-[200px] py-3 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeMainTab === 'diagnostics'
              ? 'bg-amber-900 text-white shadow-sm'
              : 'text-gov-700 hover:text-gov-900 hover:bg-gov-200/60'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>{st.mainTabDiagnostics}</span>
        </button>

        <button
          onClick={() => setActiveMainTab('media_worksheets')}
          className={`flex-1 min-w-[200px] py-3 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeMainTab === 'media_worksheets'
              ? 'bg-indigo-900 text-white shadow-sm'
              : 'text-gov-700 hover:text-gov-900 hover:bg-gov-200/60'
          }`}
        >
          <UploadCloud className="w-4 h-4" />
          <span>{st.mainTabMediaWorksheets}</span>
        </button>

        <button
          onClick={() => setActiveMainTab('cultural_guide')}
          className={`flex-1 min-w-[200px] py-3 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeMainTab === 'cultural_guide'
              ? 'bg-emerald-900 text-white shadow-sm'
              : 'text-gov-700 hover:text-gov-900 hover:bg-gov-200/60'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>{uiLanguage === 'english' ? 'Cultural Guide' : '🌿 सांस्कृतिक दिग्दर्शिका'}</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: DAILY LESSON PLANNER (Step-by-Step Guided Wizard)                 */}
      {/* ========================================================================= */}
      {activeMainTab === 'planner' && (
        <div className="space-y-6 animate-fade-in">
          {/* Guidance Banner */}
          <div className="p-4 rounded-2xl bg-forest-50 border border-forest-200 text-xs font-bold text-forest-900 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-forest-700 shrink-0" />
            <span>{st.helperTipLesson}</span>
          </div>

          {/* STEP 1: Select Class, Subject & Chapter */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-gov-200 shadow-sm space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-gov-100">
              <span className="px-2.5 py-0.5 rounded-lg bg-forest-100 text-forest-900 text-xs font-black">
                {st.step1Badge}
              </span>
              <h2 className="text-base font-black text-gov-900">
                {st.step1Title}
              </h2>
            </div>

            <CurriculumCascadingSelector
              selectedLanguage={selectedLanguage}
              selectedGrade={selectedGrade}
              selectedSubjectId={selectedSubjectId}
              selectedChapterId={selectedChapter?.id}
              onGradeChange={(g) => setSelectedGrade(g)}
              onSubjectChange={(sId) => setSelectedSubjectId(sId)}
              onChapterSelect={handleChapterSelect}
              showDetailsCard={true}
            />
          </div>

          {/* STEP 2: Configure Local Context & Verify Topic */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-gov-200 shadow-sm space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-gov-100">
              <span className="px-2.5 py-0.5 rounded-lg bg-forest-100 text-forest-900 text-xs font-black">
                {st.step2Badge}
              </span>
              <h2 className="text-base font-black text-gov-900">
                {st.step2Title}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-black text-gov-700">{st.topicInputLabel}</label>
                <input
                  type="text"
                  value={lessonTopic}
                  onChange={(e) => setLessonTopic(e.target.value)}
                  placeholder={st.topicInputPlaceholder}
                  className="w-full px-3.5 py-2.5 bg-gov-50 border border-gov-300 rounded-xl text-xs font-bold text-gov-900 focus:ring-2 focus:ring-forest-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black text-gov-700">{st.themeSelectorLabel}</label>
                <select
                  value={contextTheme}
                  onChange={(e) => setContextTheme(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gov-50 border border-gov-300 rounded-xl text-xs font-bold text-gov-900 focus:ring-2 focus:ring-forest-500"
                >
                  <option value="village_nature">{st.themeForest}</option>
                  <option value="agriculture">{st.themeAgri}</option>
                  <option value="weekly_market">{st.themeMarket}</option>
                  <option value="festivals">{st.themeFestivals}</option>
                </select>
              </div>
            </div>

            {/* STEP 3: Trigger Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gov-100">
              <div className="text-xs font-bold text-gov-600">
                {st.selectedChapterLabel} <strong className="text-forest-800">{lessonTopic}</strong> ({selectedGrade} • {selectedSubject})
              </div>

              <button
                onClick={handleGenerateLesson}
                disabled={isGeneratingLesson || !lessonTopic.trim()}
                className="w-full sm:w-auto px-8 py-3.5 bg-forest-700 hover:bg-forest-800 disabled:opacity-50 text-white rounded-2xl text-xs font-black flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
              >
                {isGeneratingLesson ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{st.generatingPlan}</span>
                  </>
                ) : (
                  <>
                    <BrainCircuit className="w-4 h-4 text-amber-300" />
                    <span>{st.generatePlanBtn}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Rendered 14-Point Lesson Plan */}
          {generatedLesson && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-gov-200 shadow-sm space-y-6">
              {renderLessonPlanView(generatedLesson)}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: FLN DIAGNOSTICS & 3-DAY TARGETED REMEDIATION                      */}
      {/* ========================================================================= */}
      {activeMainTab === 'diagnostics' && (
        <div className="space-y-6 animate-fade-in">
          {/* Guidance Banner */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs font-bold text-amber-950 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-700 shrink-0" />
            <span>{st.helperTipRemediation}</span>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-gov-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gov-100">
              <div>
                <h2 className="text-lg font-black text-gov-900 flex items-center gap-2">
                  <Target className="w-5 h-5 text-forest-600" />
                  <span>{selectedGrade}: {st.competencyMatrixTitle}</span>
                </h2>
                <p className="text-xs font-semibold text-gov-500 mt-0.5">
                  {st.competencyMatrixSubtitle}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gov-500">{st.chooseGrade}</span>
                {['Class 1', 'Class 2', 'Class 3'].map(g => (
                  <button
                    key={g}
                    onClick={() => setSelectedGrade(g)}
                    className={`px-3 py-1 rounded-xl text-xs font-black transition-colors cursor-pointer ${
                      selectedGrade === g ? 'bg-forest-700 text-white' : 'bg-gov-100 text-gov-700 hover:bg-gov-200'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* 8 Competency Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {Object.entries(cohortAverages).map(([compId, data]) => {
                const meta = FLN_COMPETENCIES_MAP[compId];
                const isGap = data.avg < 60;
                const isProficient = data.avg >= 75;
                const compTitle = uiLanguage === 'english' ? meta.nameEnglish : meta.nameHindi;

                return (
                  <div
                    key={compId}
                    className={`p-4 rounded-2xl border-2 transition-all space-y-2 ${
                      isGap
                        ? 'bg-rose-50/50 border-rose-300 ring-1 ring-rose-400'
                        : (isProficient ? 'bg-emerald-50/40 border-emerald-200' : 'bg-gov-50 border-gov-200')
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase text-gov-500">
                        {meta.domain === 'literacy' ? st.domainLanguage : st.domainMath}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                        isGap ? 'bg-rose-200 text-rose-800' : (isProficient ? 'bg-emerald-200 text-emerald-800' : 'bg-amber-200 text-amber-800')
                      }`}>
                        {data.avg}%
                      </span>
                    </div>

                    <div className="text-xs font-black text-gov-900 line-clamp-2">
                      {compTitle}
                    </div>

                    <div className="w-full bg-gov-200 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          isGap ? 'bg-rose-500' : (isProficient ? 'bg-emerald-500' : 'bg-amber-500')
                        }`}
                        style={{ width: `${Math.min(100, data.avg)}%` }}
                      />
                    </div>

                    <div className="text-[11px] font-semibold text-gov-500 flex items-center justify-between pt-1">
                      <span>{st.targetGoal} {meta.benchmarkPct}%</span>
                      {data.belowBenchmark > 0 && (
                        <span className="text-rose-600 font-bold">{data.belowBenchmark} {st.strugglingLabel}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Struggling Students Alert Box */}
            {strugglingStudents.length > 0 && (
              <div className="p-5 rounded-2xl bg-amber-50 border-2 border-amber-300 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-amber-900 font-black text-sm">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                    <span>{st.learningGapsAlert}</span>
                  </div>
                  <span className="text-xs font-bold text-amber-800">
                    {strugglingStudents.length} {st.attentionListCount}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {strugglingStudents.map(student => (
                    <div
                      key={student.studentId}
                      className="bg-white p-4 rounded-xl border border-amber-200 flex items-center justify-between gap-3 shadow-sm"
                    >
                      <div>
                        <div className="font-extrabold text-sm text-gov-900">{student.name}</div>
                        <div className="text-xs font-semibold text-rose-600 mt-0.5">
                          {st.weaknessLabel} {uiLanguage === 'english' ? 'Single-digit Subtraction' : 'एक अंकीय घटाव (Subtraction)'} — {student.masteryMatrix.comp_subtraction || 45}%
                        </div>
                      </div>

                      <button
                        onClick={() => handleGenerateRemediation(student.studentId, student.name, 'comp_subtraction')}
                        disabled={isGeneratingRemediation && selectedStudentForRemediation === student.studentId}
                        className="px-4 py-2 bg-forest-700 hover:bg-forest-800 text-white rounded-xl text-xs font-black flex items-center gap-1.5 transition-all shadow-sm shrink-0 active:scale-95 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        <span>{isGeneratingRemediation && selectedStudentForRemediation === student.studentId ? st.generatingRemediation : st.generateRemediationBtn}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Generated Remediation Plan */}
            {generatedRemediation && (
              <div className="p-6 rounded-3xl bg-forest-50/80 border-2 border-forest-300 space-y-4 animate-fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-forest-200">
                  <div className="flex items-center gap-2">
                    <BrainCircuit className="w-5 h-5 text-forest-700" />
                    <h3 className="text-base font-black text-forest-900">
                      {st.remediationTitle} {generatedRemediation.student_name}
                    </h3>
                  </div>
                  <span className="px-3 py-1 bg-forest-200 text-forest-900 rounded-full text-xs font-black">
                    {st.competencyLabel} {generatedRemediation.target_competency}
                  </span>
                </div>

                <p className="text-xs font-bold text-forest-800">
                  {generatedRemediation.gap_diagnosis}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {generatedRemediation.remedial_steps.map(step => (
                    <div key={step.day} className="bg-white p-4 rounded-2xl border border-forest-200 space-y-2">
                      <div className="text-xs font-black text-forest-800">
                        {st.dayLabel} {step.day}: {step.focus}
                      </div>
                      <div className="text-xs font-semibold text-gov-700 leading-relaxed">
                        {step.activity}
                      </div>
                      <div className="text-[11px] font-bold text-gov-500 pt-1 border-t border-gov-100">
                        {st.tlmLabel} {step.tlem_material}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-amber-100/70 rounded-xl text-xs font-bold text-amber-900 flex items-center justify-between">
                  <span>{st.teacherTip} {generatedRemediation.teacher_monitoring_tip}</span>
                  <button
                    onClick={() => window.print()}
                    className="px-3 py-1 bg-white border border-amber-300 rounded-lg text-xs font-black text-gov-800 hover:bg-amber-50 flex items-center gap-1 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>{st.printBtn}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: SMART MEDIA, QUIZ & A4 WORKSHEETS                                 */}
      {/* ========================================================================= */}
      {activeMainTab === 'media_worksheets' && (
        <div className="space-y-6 animate-fade-in">
          {/* Guidance Banner */}
          <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-950 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-indigo-700 shrink-0" />
            <span>{st.helperTipMedia}</span>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-gov-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gov-100">
              <div>
                <h2 className="text-lg font-black text-gov-900 flex items-center gap-2">
                  <UploadCloud className="w-5 h-5 text-forest-700" />
                  <span>{st.uploadStudioTitle}</span>
                </h2>
                <p className="text-xs font-semibold text-gov-500 mt-0.5">
                  {st.uploadStudioDesc}
                </p>
              </div>

              <button
                onClick={handleIngestContent}
                disabled={isIngestingContent || (!uploadedFile && !uploadText.trim())}
                className="px-6 py-3 bg-forest-800 hover:bg-forest-900 disabled:opacity-50 text-white rounded-2xl text-xs font-black flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer shrink-0"
              >
                {isIngestingContent ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{st.analyzingMedia}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>{st.analyzeGenerateBtn}</span>
                  </>
                )}
              </button>
            </div>

            {/* STEP 1: Source Format & Presets */}
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="text-[11px] font-black uppercase tracking-wider text-gov-600 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-forest-700" />
                  <span>{st.selectSourceFormat}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {[
                    { 
                      id: 'video' as const, 
                      label: uiLanguage === 'english' ? '🎬 Video Lesson' : '🎬 वीडियो पाठ (Video)', 
                      desc: '.MP4, .WEBM, .MOV, .MKV', 
                      icon: Video, 
                      color: 'text-indigo-600' 
                    },
                    { 
                      id: 'pdf' as const, 
                      label: uiLanguage === 'english' ? '📄 PDF Textbook' : '📄 PDF पाठ्यपुस्तक (PDF)', 
                      desc: uiLanguage === 'english' ? '.PDF Multi-page Document' : '.PDF बहु-पृष्ठ दस्तावेज़', 
                      icon: FileText, 
                      color: 'text-rose-600' 
                    },
                    { 
                      id: 'audio' as const, 
                      label: uiLanguage === 'english' ? '🎙️ Audio Lesson' : '🎙️ ऑडियो / मौखिक (Audio)', 
                      desc: uiLanguage === 'english' ? '.MP3, .WAV, .M4A Audio' : '.MP3, .WAV, .M4A रिकॉर्डिंग', 
                      icon: Music, 
                      color: 'text-amber-600' 
                    },
                    { 
                      id: 'document' as const, 
                      label: uiLanguage === 'english' ? '📝 Word / PPTX' : '📝 वर्ड / PPTX (Doc)', 
                      desc: '.DOCX, .PPTX, .TXT', 
                      icon: FileSpreadsheet, 
                      color: 'text-blue-600' 
                    },
                    { 
                      id: 'text' as const, 
                      label: uiLanguage === 'english' ? '✍️ Direct Text' : '✍️ सीधा पाठ (Text Paste)', 
                      desc: uiLanguage === 'english' ? 'Custom Notes & Stories' : 'कस्टम नोट्स / कहानियाँ', 
                      icon: BookMarked, 
                      color: 'text-forest-700' 
                    }
                  ].map(src => {
                    const IconComp = src.icon;
                    return (
                      <button
                        key={src.id}
                        onClick={() => setUploadSourceType(src.id)}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer space-y-1 ${
                          uploadSourceType === src.id
                            ? 'border-forest-700 bg-forest-50/80 ring-2 ring-forest-700/30'
                            : 'border-gov-200 bg-gov-50/50 hover:bg-gov-100/70'
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <IconComp className={`w-4 h-4 ${src.color}`} />
                          <span className="text-xs font-black text-gov-900">{src.label}</span>
                        </div>
                        <div className="text-[10px] font-bold text-gov-500">{src.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quick Presets Bar */}
              <div className="space-y-2">
                <div className="text-[11px] font-black uppercase tracking-wider text-gov-600 flex items-center gap-1.5">
                  <BookMarked className="w-3.5 h-3.5 text-forest-700" />
                  <span>{st.quickTemplatesTitle}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  {quickTemplates.map((tmpl) => (
                    <button
                      key={tmpl.id}
                      onClick={() => handleApplyTemplate(tmpl)}
                      className="p-3 text-left rounded-xl border border-gov-200 bg-gov-50/70 hover:bg-forest-50 hover:border-forest-300 transition-all space-y-1 cursor-pointer group"
                    >
                      <div className="text-xs font-black text-gov-900 group-hover:text-forest-900">
                        {tmpl.title}
                      </div>
                      <div className="text-[10px] font-bold text-gov-500">
                        {tmpl.grade} • {tmpl.subject.split('(')[0]}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Drag and Drop File Upload Area & Media Preview */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-3">
                  <label className="text-xs font-black text-gov-800 uppercase tracking-wider block">
                    {uiLanguage === 'english' ? '1. Select or Drop Source File / Video / PDF:' : '1. फ़ाइल / वीडियो / PDF चुनें (Select or Drop Source):'}
                  </label>
                  <div className="relative border-2 border-dashed border-gov-300 hover:border-forest-500 rounded-2xl p-5 text-center bg-gov-50/50 hover:bg-forest-50/30 transition-all flex flex-col items-center justify-center min-h-[220px]">
                    <input
                      type="file"
                      accept="video/*,.mp4,.webm,.mov,.avi,.mkv,.pdf,audio/*,.mp3,.wav,.m4a,.ogg,.doc,.docx,.pptx,.ppt,.txt,.md,.json,.csv"
                      onChange={handleFileUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    {detectedMediaType === 'video' ? (
                      <Video className="w-10 h-10 text-indigo-600 mb-2" />
                    ) : (detectedMediaType === 'pdf' ? (
                      <FileText className="w-10 h-10 text-rose-600 mb-2" />
                    ) : (detectedMediaType === 'audio' ? (
                      <Music className="w-10 h-10 text-amber-600 mb-2" />
                    ) : (
                      <FolderUp className="w-10 h-10 text-gov-400 mb-2" />
                    )))}

                    <div className="text-xs font-black text-gov-800">
                      {uploadSourceType === 'video' ? st.dropzoneLabelVideo :
                       uploadSourceType === 'pdf' ? st.dropzoneLabelPdf :
                       uploadSourceType === 'audio' ? st.dropzoneLabelAudio : st.dropzoneLabelDoc}
                    </div>
                    <div className="text-[10px] text-gov-500 font-medium mt-1">
                      {st.dropzoneSupportedTypes}
                    </div>

                    {uploadedFileName && (
                      <div className="mt-3 px-3 py-1 bg-forest-100 text-forest-900 rounded-lg text-xs font-bold flex items-center gap-1.5 border border-forest-300">
                        <FileCheck2 className="w-3.5 h-3.5 text-forest-700" />
                        <span className="truncate max-w-[180px]">{uploadedFileName}</span>
                      </div>
                    )}
                  </div>

                  {/* Media Preview Box */}
                  {mediaPreviewUrl && detectedMediaType === 'video' && (
                    <div className="p-3 bg-gov-900 rounded-2xl space-y-2">
                      <div className="text-[10px] font-bold text-indigo-200 flex items-center gap-1.5">
                        <PlayCircle className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{st.videoPreviewTitle}</span>
                      </div>
                      <video
                        ref={videoPlayerRef}
                        src={mediaPreviewUrl}
                        controls
                        className="w-full max-h-48 rounded-xl bg-black"
                      />
                    </div>
                  )}

                  {mediaPreviewUrl && detectedMediaType === 'audio' && (
                    <div className="p-3 bg-gov-900 rounded-2xl space-y-2">
                      <div className="text-[10px] font-bold text-amber-200 flex items-center gap-1.5">
                        <Music className="w-3.5 h-3.5 text-amber-400" />
                        <span>{st.audioPreviewTitle}</span>
                      </div>
                      <audio src={mediaPreviewUrl} controls className="w-full" />
                    </div>
                  )}
                </div>

                {/* Text / Notes Input Area */}
                <div className="lg:col-span-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-black text-gov-800 uppercase tracking-wider">
                      {st.extractedNotesLabel}
                    </label>
                    <span className="text-[11px] font-bold text-gov-500">
                      {uploadText.length} {st.charCount} • {uploadText.split(/\s+/).filter(Boolean).length} {st.wordCount}
                    </span>
                  </div>
                  <textarea
                    value={uploadText}
                    onChange={(e) => setUploadText(e.target.value)}
                    placeholder={st.notesPlaceholder}
                    rows={9}
                    className="w-full p-4 rounded-2xl border border-gov-300 bg-gov-50/50 text-xs sm:text-sm text-gov-900 font-medium focus:ring-2 focus:ring-forest-500 focus:bg-white focus:outline-none leading-relaxed resize-y"
                  />
                </div>
              </div>

              {/* Target Settings Configuration Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-gov-100">
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-gov-700">{st.targetGradeLabel}</label>
                  <select
                    value={uploadGrade}
                    onChange={(e) => setUploadGrade(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gov-50 border border-gov-300 rounded-xl text-xs font-bold text-gov-900 focus:ring-2 focus:ring-forest-500"
                  >
                    <option value="Balvatika">{uiLanguage === 'english' ? 'Balvatika (Pre-Primary)' : 'बालवाटिका (Balvatika / Pre-Primary)'}</option>
                    <option value="Class 1">{uiLanguage === 'english' ? 'Class 1' : 'कक्षा 1 (Class 1)'}</option>
                    <option value="Class 2">{uiLanguage === 'english' ? 'Class 2' : 'कक्षा 2 (Class 2)'}</option>
                    <option value="Class 3">{uiLanguage === 'english' ? 'Class 3' : 'कक्षा 3 (Class 3)'}</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-black text-gov-700">{st.targetSubjectLabel}</label>
                  <select
                    value={uploadSubject}
                    onChange={(e) => setUploadSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gov-50 border border-gov-300 rounded-xl text-xs font-bold text-gov-900 focus:ring-2 focus:ring-forest-500"
                  >
                    <option value="भाषा एवं साक्षरता (Language & Literacy)">{uiLanguage === 'english' ? 'Language & Literacy' : 'भाषा एवं साक्षरता (Language & Literacy)'}</option>
                    <option value="गणित ज्ञान (Foundational Numeracy)">{uiLanguage === 'english' ? 'Foundational Numeracy' : 'गणित ज्ञान (Foundational Numeracy)'}</option>
                    <option value="पर्यावरण अध्ययन (EVS)">{uiLanguage === 'english' ? 'Environmental Studies (EVS)' : 'पर्यावरण अध्ययन (EVS)'}</option>
                    <option value="अंग्रेजी भाषा (English Language)">{uiLanguage === 'english' ? 'English Language' : 'अंग्रेजी भाषा (English Language)'}</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-black text-gov-700">{st.contextThemeLabel}</label>
                  <select
                    value={uploadContextTheme}
                    onChange={(e) => setUploadContextTheme(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gov-50 border border-gov-300 rounded-xl text-xs font-bold text-gov-900 focus:ring-2 focus:ring-forest-500"
                  >
                    <option value="festivals">{st.themeFestivals}</option>
                    <option value="village_nature">{st.themeForest}</option>
                    <option value="weekly_market">{st.themeMarket}</option>
                    <option value="agriculture">{st.themeAgri}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Ingestion Results Display */}
            {ingestResult && (
              <div className="space-y-6 pt-4 border-t border-gov-200 animate-fade-in">
                {/* Result Banner & Action Bar */}
                <div className="bg-white rounded-3xl p-6 border-2 border-gov-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-0.5 rounded-full text-xs font-black bg-forest-800 text-white">
                        {ingestResult.detected_grade} • {ingestResult.detected_subject}
                      </span>
                      <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                        🌿 {ingestResult.target_language.toUpperCase()}
                      </span>
                      {ingestResult.media_info && (
                        <span className="px-3 py-0.5 rounded-full text-xs font-black bg-indigo-100 text-indigo-900 border border-indigo-300 flex items-center gap-1">
                          {ingestResult.media_info.media_type === 'video' ? (uiLanguage === 'english' ? '🎬 Video Lesson Kit' : '🎬 वीडियो शिक्षण किट') :
                           ingestResult.media_info.media_type === 'pdf' ? (uiLanguage === 'english' ? '📄 PDF Lesson Kit' : '📄 PDF शिक्षण किट') :
                           ingestResult.media_info.media_type === 'audio' ? (uiLanguage === 'english' ? '🎙️ Audio Lesson Kit' : '🎙️ ऑडियो शिक्षण किट') : (uiLanguage === 'english' ? '📝 Document Kit' : '📝 दस्तावेज़ किट')}
                        </span>
                      )}
                      <span className="text-xs font-bold text-gov-500">
                        {uiLanguage === 'english' ? 'Auto-synthesized Trilingual Pedagogical Kit' : 'स्वतः-सृजित त्रिभाषी शिक्षण किट'}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-gov-900">
                      {ingestResult.original_topic}
                    </h3>
                    <p className="text-xs text-gov-600 max-w-2xl">
                      {uiLanguage === 'english' ? (ingestResult.summary_english || ingestResult.summary_hindi) : ingestResult.summary_hindi}
                    </p>
                    {savedSuccessMsg && (
                      <div className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-300 mt-2">
                        {savedSuccessMsg}
                      </div>
                    )}
                  </div>

                  {/* Direct Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                    <button
                      onClick={handleSaveCustomLesson}
                      className="px-4 py-2 bg-gov-900 hover:bg-forest-900 text-white rounded-xl text-xs font-black flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                    >
                      <Save className="w-4 h-4 text-emerald-300" />
                      <span>{st.saveToDbBtn}</span>
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="px-3.5 py-2 border border-gov-300 hover:bg-gov-100 text-gov-800 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Printer className="w-4 h-4" />
                      <span>{st.printA4Btn}</span>
                    </button>
                    {onNavigateToWorksheets && (
                      <button
                        onClick={onNavigateToWorksheets}
                        className="px-3.5 py-2 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <FileSpreadsheet className="w-4 h-4 text-amber-700" />
                        <span>{st.worksheetStudioBtn}</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* 4 Output Tabs Navigator */}
                <div className="flex flex-wrap items-center gap-2 border-b border-gov-200 pb-2">
                  {ingestResult.media_info && (
                    <button
                      onClick={() => setActiveIngestTab('video_intelligence')}
                      className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
                        activeIngestTab === 'video_intelligence'
                          ? 'bg-indigo-900 text-white shadow-sm ring-2 ring-indigo-900'
                          : 'bg-white text-gov-700 hover:bg-gov-100 border border-gov-200'
                      }`}
                    >
                      <Video className="w-4 h-4 text-indigo-300" />
                      <span>{st.tabVideoIntel}</span>
                    </button>
                  )}

                  <button
                    onClick={() => setActiveIngestTab('plan')}
                    className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
                      activeIngestTab === 'plan'
                        ? 'bg-gov-900 text-white shadow-sm ring-2 ring-gov-900'
                        : 'bg-white text-gov-700 hover:bg-gov-100 border border-gov-200'
                    }`}
                  >
                    <BrainCircuit className="w-4 h-4 text-amber-300" />
                    <span>{st.tabLessonPlan}</span>
                  </button>

                  <button
                    onClick={() => setActiveIngestTab('assessment')}
                    className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
                      activeIngestTab === 'assessment'
                        ? 'bg-gov-900 text-white shadow-sm ring-2 ring-gov-900'
                        : 'bg-white text-gov-700 hover:bg-gov-100 border border-gov-200'
                    }`}
                  >
                    <HelpCircle className="w-4 h-4 text-amber-300" />
                    <span>{st.tabAssessmentQuiz}</span>
                  </button>

                  <button
                    onClick={() => setActiveIngestTab('worksheets')}
                    className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
                      activeIngestTab === 'worksheets'
                        ? 'bg-gov-900 text-white shadow-sm ring-2 ring-gov-900'
                        : 'bg-white text-gov-700 hover:bg-gov-100 border border-gov-200'
                    }`}
                  >
                    <FileSpreadsheet className="w-4 h-4 text-amber-300" />
                    <span>{st.tabWorksheets}</span>
                  </button>
                </div>

                {/* TAB 0: Media Intelligence */}
                {activeIngestTab === 'video_intelligence' && ingestResult.media_info && (
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-gov-200 shadow-sm space-y-6 animate-fade-in">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gov-100">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded text-[10px] font-black bg-indigo-100 text-indigo-900 border border-indigo-300">
                            AI Media Pedagogical Analysis
                          </span>
                          <span className="text-xs font-bold text-gov-500">
                            {uiLanguage === 'english' ? 'File:' : 'फ़ाइल:'} {ingestResult.media_info.filename} • {uiLanguage === 'english' ? 'Type:' : 'प्रकार:'} {ingestResult.media_info.media_type.toUpperCase()}
                          </span>
                        </div>
                        <h3 className="text-base font-black text-gov-900 mt-1">
                          {st.videoTimelineTitle}
                        </h3>
                      </div>

                      <div className="flex items-center gap-3">
                        {ingestResult.media_info.duration_formatted && (
                          <div className="px-3 py-1 bg-indigo-50 border border-indigo-200 rounded-xl text-xs font-black text-indigo-900 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-indigo-600" />
                            <span>{st.durationLabel} {ingestResult.media_info.duration_formatted}</span>
                          </div>
                        )}
                        {ingestResult.media_info.total_pages && (
                          <div className="px-3 py-1 bg-rose-50 border border-rose-200 rounded-xl text-xs font-black text-rose-900">
                            {st.totalPagesLabel} {ingestResult.media_info.total_pages}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      <div className="lg:col-span-6 space-y-4">
                        {ingestResult.media_info.media_type === 'video' && (
                          <div className="bg-black rounded-2xl overflow-hidden shadow-md aspect-video flex items-center justify-center">
                            <video
                              ref={videoPlayerRef}
                              src={ingestResult.media_info.media_url || mediaPreviewUrl || undefined}
                              controls
                              className="w-full h-full object-contain"
                            />
                          </div>
                        )}

                        {ingestResult.media_info.media_type === 'audio' && (
                          <div className="bg-gov-900 p-6 rounded-2xl space-y-3">
                            <div className="text-xs font-black text-amber-200 flex items-center gap-2">
                              <Music className="w-4 h-4 text-amber-400" />
                              <span>{st.audioPlayerTitle}</span>
                            </div>
                            <audio
                              src={ingestResult.media_info.media_url || mediaPreviewUrl || undefined}
                              controls
                              className="w-full"
                            />
                          </div>
                        )}

                        <div className="p-4 bg-gov-50 rounded-2xl border border-gov-200 space-y-2.5">
                          <div className="text-xs font-black text-gov-800 uppercase tracking-wider">
                            {st.extractionMetricsTitle}
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="p-2 bg-white rounded-xl border border-gov-200">
                              <span className="text-gov-500 font-bold block text-[10px]">{st.sourceFormatLabel}</span>
                              <strong className="text-gov-900">{ingestResult.media_info.media_type.toUpperCase()}</strong>
                            </div>
                            <div className="p-2 bg-white rounded-xl border border-gov-200">
                              <span className="text-gov-500 font-bold block text-[10px]">{st.fileSizeLabel}</span>
                              <strong className="text-gov-900">{((ingestResult.media_info.file_size_bytes || 0) / (1024 * 1024)).toFixed(2)} MB</strong>
                            </div>
                            <div className="p-2 bg-white rounded-xl border border-gov-200">
                              <span className="text-gov-500 font-bold block text-[10px]">{st.motherTongueBridgeLabel}</span>
                              <strong className="text-forest-800 font-olchiki">{pack.nameEnglish} ({pack.nameNative})</strong>
                            </div>
                            <div className="p-2 bg-white rounded-xl border border-gov-200">
                              <span className="text-gov-500 font-bold block text-[10px]">{st.flnAlignmentLabel}</span>
                              <strong className="text-emerald-700">100% NIPUN Bharat</strong>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="lg:col-span-6 space-y-3">
                        <div className="text-xs font-black text-gov-800 uppercase tracking-wider flex items-center justify-between">
                          <span>{st.interactiveMilestonesTitle}</span>
                          <span className="text-[10px] text-gov-500 font-normal">{st.clickTimestampHint}</span>
                        </div>

                        <div className="space-y-2.5">
                          {(ingestResult.media_info.video_timestamps || [
                            { timestamp: '00:00', seconds: 0, title_hindi: 'परिचय एवं परिवेशीय मूर्त अवलोकन', title_tribal: 'ᱮᱛᱚᱦᱚᱵ ᱟᱨ ᱟᱹᱛᱩ ᱡᱤᱱᱤᱥ', title_english: 'Introduction & Realia Observation', concept: 'Classroom display of village objects and natural Sal leaves.' },
                            { timestamp: '01:15', seconds: 75, title_hindi: 'मातृभाषा शब्दावली सेतु', title_tribal: 'ᱡᱟᱱᱟᱢ ᱟᱲᱟᱝ ᱟᱹᱲᱟᱹ', title_english: 'Mother Tongue Bridge', concept: 'Core vocabulary pronunciation and multilingual concept mapping.' },
                            { timestamp: '02:30', seconds: 150, title_hindi: 'प्रत्यक्ष गतिविधि व अभ्यास', title_tribal: 'ᱠᱟᱹᱢᱤ ᱦᱚᱨᱟ', title_english: 'Guided Practice & Counting', concept: 'Counting and tracing activities using concrete local materials.' },
                            { timestamp: '04:00', seconds: 240, title_hindi: 'निपुण मूल्यांकन व सारांश', title_tribal: 'ᱵᱤᱰᱟᱹᱣ ᱟᱨ ᱥᱟᱨᱟᱝᱥ', title_english: 'NIPUN Assessment & Summary', concept: 'Formative comprehension check and bilingual worksheet distribution.' }
                          ]).map((ts, idx) => (
                            <div
                              key={idx}
                              className="p-3 rounded-2xl border border-gov-200 bg-gov-50/70 hover:bg-indigo-50/60 hover:border-indigo-300 transition-all space-y-1.5"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => handleSeekVideo(ts.seconds)}
                                    className="px-2.5 py-1 bg-indigo-700 hover:bg-indigo-800 text-white rounded-lg text-xs font-black flex items-center gap-1 cursor-pointer transition-all shadow-xs active:scale-95"
                                  >
                                    <Play className="w-3 h-3 text-amber-300 fill-amber-300" />
                                    <span>{ts.timestamp}</span>
                                  </button>
                                  <span className="text-xs font-black text-gov-900">
                                    {uiLanguage === 'english' ? (ts.title_english || ts.title_hindi) : ts.title_hindi}
                                  </span>
                                </div>
                                <span className="text-xs font-bold text-forest-800 font-olchiki">{ts.title_tribal}</span>
                              </div>
                              <p className="text-[11px] text-gov-600 font-medium pl-1">
                                {ts.concept}
                              </p>
                            </div>
                          ))}
                        </div>

                        {ingestResult.media_info.visual_concepts && (
                          <div className="pt-2 space-y-1.5">
                            <div className="text-[11px] font-black text-gov-700 uppercase">
                              {st.realiaTagsTitle}
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {ingestResult.media_info.visual_concepts.map((tag, i) => (
                                <span key={i} className="px-2.5 py-1 bg-forest-100 text-forest-900 border border-forest-300 rounded-lg text-xs font-bold">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 1: Lesson Plan */}
                {activeIngestTab === 'plan' && renderLessonPlanView(ingestResult.lesson_plan)}

                {/* TAB 2: Formative Quiz */}
                {activeIngestTab === 'assessment' && (
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-gov-200 shadow-sm space-y-6 animate-fade-in">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gov-100">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded text-[10px] font-black bg-amber-100 text-amber-900 border border-amber-300">
                            NIPUN FLN Formative Checkpoint
                          </span>
                          <span className="text-xs font-bold text-gov-500">
                            {st.quizTotalMarks} {ingestResult.assessment.total_marks} • {st.quizPassingMarks} {ingestResult.assessment.passing_marks}
                          </span>
                        </div>
                        <h3 className="text-lg font-black text-gov-900 mt-1">
                          {ingestResult.assessment.title}
                        </h3>
                        <p className="text-xs text-gov-600 mt-0.5">
                          {ingestResult.assessment.scoring_rubric}
                        </p>
                      </div>

                      <button
                        onClick={() => window.print()}
                        className="px-3.5 py-1.5 border border-gov-300 text-gov-700 hover:bg-gov-50 rounded-xl text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>{st.quizPrintBtn}</span>
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {ingestResult.assessment.competency_focus.map((comp, idx) => (
                        <span key={idx} className="px-3 py-1 rounded-lg text-[11px] font-bold bg-forest-50 text-forest-900 border border-forest-200 flex items-center gap-1">
                          <span>🎯</span> {comp}
                        </span>
                      ))}
                    </div>

                    <div className="space-y-4 pt-2">
                      {ingestResult.assessment.questions.map((q, qIdx) => {
                        const userAns = userQuizAnswers[q.id];
                        return (
                          <div key={q.id} className="p-5 rounded-2xl bg-gov-50/70 border-2 border-gov-200 space-y-3">
                            <div className="flex items-start justify-between gap-3">
                              <div className="space-y-1">
                                <span className="text-[10px] font-black uppercase text-gov-500">
                                  {uiLanguage === 'english' ? `Question ${qIdx + 1} • ${q.competency} (5 Marks)` : `प्रश्न ${qIdx + 1} • ${q.competency} (5 अंक)`}
                                </span>
                                <div className="text-sm font-bold text-gov-900">
                                  {uiLanguage === 'english' ? (q.question_english || q.question_text) : q.question_text}
                                </div>
                                {q.question_tribal && (
                                  <div className="text-xs font-black text-forest-800 font-olchiki">
                                    🌿 {q.question_tribal}
                                  </div>
                                )}
                                {uiLanguage !== 'english' && q.question_english && (
                                  <div className="text-[11px] font-semibold text-blue-900">
                                    🌐 {q.question_english}
                                  </div>
                                )}
                                {uiLanguage === 'english' && q.question_text && (
                                  <div className="text-[11px] font-semibold text-amber-900">
                                    🇮🇳 {q.question_text}
                                  </div>
                                )}
                              </div>

                              <button
                                onClick={() => handleToggleAudio(q.question_text, 'hindi', `quiz_q_${q.id}`)}
                                className={`p-2 rounded-xl border shrink-0 cursor-pointer transition-all active:scale-95 ${
                                  playingAudioKey === `quiz_q_${q.id}`
                                    ? 'bg-forest-700 text-white border-forest-700 ring-2 ring-forest-400 animate-pulse'
                                    : 'bg-white text-forest-700 border-gov-200 hover:bg-forest-50'
                                }`}
                                title="Listen Question (1-Tap Play/Stop)"
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                              {q.options.map((opt) => {
                                const isSelected = userAns === opt.id;
                                let optClass = 'bg-white hover:bg-gov-100 text-gov-800 border-gov-300';
                                if (isQuizSubmitted) {
                                  if (opt.is_correct) {
                                    optClass = 'bg-emerald-100 text-emerald-950 border-emerald-500 font-bold';
                                  } else if (isSelected) {
                                    optClass = 'bg-rose-100 text-rose-950 border-rose-400 line-through';
                                  }
                                } else if (isSelected) {
                                  optClass = 'bg-gov-900 text-white border-gov-900 font-bold';
                                }

                                return (
                                  <button
                                    key={opt.id}
                                    disabled={isQuizSubmitted}
                                    onClick={() => handleQuizOptionSelect(q.id, opt.id)}
                                    className={`p-3 rounded-xl text-xs border text-left flex items-center justify-between transition-all cursor-pointer ${optClass}`}
                                  >
                                    <span>{opt.id}) {opt.text}</span>
                                    {isQuizSubmitted && opt.is_correct && (
                                      <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                                    )}
                                  </button>
                                );
                              })}
                            </div>

                            {isQuizSubmitted && (
                              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-950">
                                💡 <strong>{st.quizExplanation}</strong> {q.explanation}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="p-5 rounded-2xl bg-gov-100 border border-gov-300 flex flex-col sm:flex-row items-center justify-between gap-4">
                      {!isQuizSubmitted ? (
                        <button
                          onClick={handleQuizSubmit}
                          disabled={Object.keys(userQuizAnswers).length === 0}
                          className="px-6 py-3 bg-forest-800 hover:bg-forest-900 disabled:opacity-50 text-white rounded-xl text-xs font-black flex items-center gap-2 shadow-xs transition-all cursor-pointer"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>{st.submitQuizBtn}</span>
                        </button>
                      ) : (
                        <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4">
                          <div className="space-y-0.5 text-center sm:text-left">
                            <div className="text-sm font-black text-gov-900">
                              {st.quizResultTitle} {quizScore?.earned} / {quizScore?.total} ({quizScore?.percentage}%)
                            </div>
                            <div className="text-xs font-bold text-forest-800">
                              {uiLanguage === 'english' ? (
                                quizScore && quizScore.percentage >= 80 
                                  ? '🌟 Mastery Level 3 (FLN Proficient)' 
                                  : (quizScore && quizScore.percentage >= 60 
                                      ? '🎯 Developing Level 2 (Competent)' 
                                      : '🌱 Early Learner Level 1 (Support Needed)')
                              ) : (
                                quizScore && quizScore.percentage >= 80 
                                  ? '🌟 निपुण प्रवीण (Mastery Level 3)' 
                                  : (quizScore && quizScore.percentage >= 60 
                                      ? '🎯 विकासशील (Proficient Level 2)' 
                                      : '🌱 प्रारंभिक सहयोग अपेक्षित (Level 1)')
                              )}
                            </div>
                          </div>

                          <button
                            onClick={() => { setUserQuizAnswers({}); setIsQuizSubmitted(false); setQuizScore(null); }}
                            className="px-4 py-2 border border-gov-300 bg-white hover:bg-gov-50 text-gov-800 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            <span>{st.tryAgainBtn}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* TAB 3: Printable A4 Worksheets */}
                {activeIngestTab === 'worksheets' && (
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-gov-200 shadow-sm space-y-8 animate-fade-in">
                    <div className="border-4 border-gov-900 p-6 rounded-2xl bg-white space-y-6 shadow-sm">
                      <div className="text-center border-b-2 border-gov-900 pb-4 space-y-1">
                        <div className="text-[11px] font-black uppercase tracking-widest text-gov-600">
                          {st.worksheetBannerTitle}
                        </div>
                        <h3 className="text-2xl font-black text-gov-900">
                          {ingestResult.worksheets.title}
                        </h3>
                        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-gov-700 pt-1">
                          <span>{uiLanguage === 'english' ? 'Class' : 'कक्षा'}: <strong>{ingestResult.worksheets.grade}</strong></span>
                          <span>•</span>
                          <span>{uiLanguage === 'english' ? 'Subject' : 'विषय'}: <strong>{ingestResult.worksheets.subject}</strong></span>
                          <span>•</span>
                          <span>{uiLanguage === 'english' ? 'Mother Tongue' : 'मातृभाषा'}: <strong>{ingestResult.worksheets.language.toUpperCase()}</strong></span>
                        </div>
                        <div className="flex items-center justify-between pt-3 text-xs font-semibold text-gov-600 border-t border-dashed border-gov-300 mt-2">
                          <span>{st.studentNameLabel}</span>
                          <span>{st.dateLabel}</span>
                          <span>{st.teacherSignLabel}</span>
                        </div>
                      </div>

                      {/* Section 1 */}
                      <div className="space-y-3">
                        <div className="text-xs font-black text-gov-900 uppercase tracking-wider bg-gov-100 p-2 rounded-lg border border-gov-300">
                          {st.wsSection1Title}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {ingestResult.worksheets.match_section.map((item) => (
                            <div key={item.id} className="p-3 rounded-xl border border-gov-300 bg-gov-50/50 flex items-center justify-between gap-3">
                              <div className="flex items-center gap-2.5">
                                <span className="text-2xl">{item.emoji}</span>
                                <div>
                                  <div className="text-xs font-black text-gov-900">{item.hindi_text}</div>
                                  <div className="text-[10px] text-gov-500">{item.english_text}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-black text-forest-900 font-olchiki">{item.tribal_text}</div>
                                <div className="text-[10px] text-gov-400">{st.wsMatchHint}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Section 2 */}
                      <div className="space-y-3">
                        <div className="text-xs font-black text-gov-900 uppercase tracking-wider bg-gov-100 p-2 rounded-lg border border-gov-300">
                          {st.wsSection2Title}
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {ingestResult.worksheets.count_section.map((item) => (
                            <div key={item.id} className="p-4 rounded-xl border border-gov-300 bg-gov-50/50 text-center space-y-2">
                              <div className="text-2xl tracking-widest">
                                {Array.from({ length: item.count }).map((_, i) => (
                                  <span key={i}>{item.emoji} </span>
                                ))}
                              </div>
                              <div className="text-xs font-bold text-gov-800">{item.name_hindi}</div>
                              <div className="text-xs font-black text-forest-800">{item.name_tribal}</div>
                              <div className="w-10 h-8 border-2 border-dashed border-gov-400 mx-auto rounded flex items-center justify-center text-xs font-black text-gov-400">
                                [ ? ]
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Section 3 */}
                      <div className="space-y-3">
                        <div className="text-xs font-black text-gov-900 uppercase tracking-wider bg-gov-100 p-2 rounded-lg border border-gov-300">
                          {st.wsSection3Title}
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {ingestResult.worksheets.trace_section.map((item) => (
                            <div key={item.id} className="p-3 rounded-xl border border-gov-300 bg-white text-center space-y-1.5">
                              <div className="text-3xl font-black text-forest-900 font-olchiki">
                                {item.char_native}
                              </div>
                              <div className="text-xs font-bold text-gov-600">
                                {uiLanguage === 'english' ? 'Devanagari:' : 'देवनागरी:'} {item.char_devanagari} ({item.sound_phonetic})
                              </div>
                              <div className="text-[11px] font-semibold text-gov-800">
                                {uiLanguage === 'english' ? 'Word:' : 'शब्द:'} {item.word_native}
                              </div>
                              <div className="h-6 border-b-2 border-dotted border-gov-400"></div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Section 4 */}
                      <div className="space-y-3">
                        <div className="text-xs font-black text-gov-900 uppercase tracking-wider bg-gov-100 p-2 rounded-lg border border-gov-300">
                          {st.wsSection4Title}
                        </div>
                        <div className="space-y-2.5">
                          {ingestResult.worksheets.fill_section.map((item, idx) => (
                            <div key={item.id} className="p-3.5 rounded-xl border border-gov-300 bg-gov-50/50 space-y-1">
                              <div className="text-xs font-bold text-gov-900">
                                {idx + 1}. {item.sentence_incomplete}
                              </div>
                              <div className="text-[11px] font-semibold text-forest-800">
                                🌿 {uiLanguage === 'english' ? 'Mother Tongue:' : 'मातृभाषा:'} {item.tribal_sentence}
                              </div>
                              <div className="text-[10px] text-gov-500 font-medium">
                                {uiLanguage === 'english' ? 'Hint:' : 'संकेत:'} {item.hint}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={() => window.print()}
                        className="px-5 py-2.5 bg-gov-900 hover:bg-forest-800 text-white rounded-xl text-xs font-black flex items-center gap-2 shadow-xs transition-all cursor-pointer"
                      >
                        <Printer className="w-4 h-4" />
                        <span>{st.wsPrintBtn}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: CULTURAL & PEDAGOGICAL COMPANION                                   */}
      {/* ========================================================================= */}
      {activeMainTab === 'cultural_guide' && (
        <div className="pt-2 animate-fade-in">
          <CulturalGuide selectedLanguage={selectedLanguage} />
        </div>
      )}
    </div>
  );

  function renderLessonPlanView(lesson: PedagogicalLessonPlan) {
    const isEng = uiLanguage === 'english';
    const mainTopicTitle = isEng ? (lesson.topic_english || lesson.topic_hindi) : lesson.topic_hindi;
    const secondaryTopicTitle = isEng ? lesson.topic_hindi : (lesson.topic_english || '');

    return (
      <div className="space-y-8 pt-4 animate-fade-in">
        {/* Header with Title & Metadata */}
        <div className="bg-gradient-to-r from-forest-900 via-forest-800 to-gov-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/30 text-emerald-200 text-xs font-black border border-emerald-400/30">
                {lesson.grade} • {lesson.subject}
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-500/30 text-amber-200 text-xs font-black border border-amber-400/30">
                {st.planTrilingualBadge}
              </span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-black mt-2 leading-tight">
              {mainTopicTitle}
              <span className="text-emerald-300 font-olchiki ml-3 text-2xl font-bold">
                ({lesson.topic_tribal})
              </span>
            </h3>

            <div className="flex flex-wrap items-center gap-4 text-xs text-emerald-100 font-semibold pt-1">
              <span>🌿 {isEng ? 'Mother Tongue:' : 'मातृभाषा:'} <strong className="text-white font-bold">{pack.nameEnglish} ({pack.nameNative})</strong></span>
              <span>✍️ {isEng ? 'Primary Script:' : 'प्राथमिक लिपि:'} <strong className="text-white font-bold">{lesson.script}</strong></span>
              {secondaryTopicTitle && (
                <span>🌐 {isEng ? 'Hindi Topic:' : 'English Topic:'} <strong className="text-white font-bold">{secondaryTopicTitle}</strong></span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => window.print()}
              className="px-5 py-2.5 bg-white/20 hover:bg-white/30 text-white rounded-xl text-xs font-black flex items-center gap-2 transition-all backdrop-blur-sm border border-white/20 shadow-sm active:scale-95 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>{st.printBtn} (A4)</span>
            </button>
          </div>
        </div>

        {/* Language Tier Explanatory Legend */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 bg-gov-50 rounded-2xl border border-gov-200 text-xs">
          <div className="flex items-center gap-2 px-3 py-2 bg-forest-100/70 border border-forest-300 rounded-xl text-forest-900 font-bold">
            <span className="text-base">🌿</span>
            <div>
              <div className="text-[10px] text-forest-700 uppercase font-black">{st.legendTier1}</div>
              <div>{st.legendTier1Desc}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-amber-100/70 border border-amber-300 rounded-xl text-amber-950 font-bold">
            <span className="text-base">🇮🇳</span>
            <div>
              <div className="text-[10px] text-amber-800 uppercase font-black">{st.legendTier2}</div>
              <div>{st.legendTier2Desc}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-blue-100/70 border border-blue-300 rounded-xl text-blue-950 font-bold">
            <span className="text-base">🌐</span>
            <div>
              <div className="text-[10px] text-blue-800 uppercase font-black">{st.legendTier3}</div>
              <div>{st.legendTier3Desc}</div>
            </div>
          </div>
        </div>

        {/* SECTION 1: CORE PEDAGOGICAL FOUNDATIONS (Items 1 to 5) */}
        <div className="space-y-4">
          <h4 className="text-xs font-black tracking-wider text-gov-500 uppercase flex items-center gap-2">
            <Layers className="w-4 h-4 text-forest-700" />
            <span>{st.part1Title}</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. Learning Objective */}
            {(() => {
              const comp = lesson.pedagogical_components['1_learning_objective'];
              const isObj = typeof comp === 'object' && comp !== null;
              const tribal = isObj ? comp.tribal_primary : '';
              const dev = isObj ? comp.tribal_devanagari : '';
              const hindi = isObj ? comp.hindi : (typeof comp === 'string' ? comp : '');
              const english = isObj ? comp.english : '';

              return (
                <div className="bg-white p-5 rounded-2xl border-2 border-gov-200 space-y-3 shadow-sm">
                  <div className="text-xs font-black text-forest-800 uppercase flex items-center justify-between pb-1 border-b border-gov-100">
                    <span>{st.point1Title}</span>
                    <Target className="w-4 h-4 text-forest-600" />
                  </div>
                  
                  <div className="space-y-2">
                    {tribal && (
                      <div className="p-3 bg-forest-50/80 rounded-xl border border-forest-200">
                        <div className="text-[10px] font-black uppercase text-forest-800">🌿 {pack.nameNative} ({pack.nameEnglish})</div>
                        <div className="text-sm font-black text-forest-950 font-olchiki mt-0.5">{tribal}</div>
                        {dev && <div className="text-xs font-semibold text-forest-700 mt-1">{isEng ? 'Pronunciation:' : 'उच्चारण:'} {dev}</div>}
                      </div>
                    )}
                    {isEng && english && (
                      <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200">
                        <div className="text-[10px] font-black uppercase text-blue-900">🌐 English</div>
                        <div className="text-xs font-semibold text-blue-950 mt-0.5 leading-relaxed">{english}</div>
                      </div>
                    )}
                    {hindi && (
                      <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200">
                        <div className="text-[10px] font-black uppercase text-amber-900">🇮🇳 हिन्दी (Hindi)</div>
                        <div className="text-xs font-bold text-amber-950 mt-0.5 leading-relaxed">{hindi}</div>
                      </div>
                    )}
                    {!isEng && english && (
                      <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200">
                        <div className="text-[10px] font-black uppercase text-blue-900">🌐 English</div>
                        <div className="text-xs font-semibold text-blue-950 mt-0.5 leading-relaxed">{english}</div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* 2. Prerequisites */}
            {(() => {
              const comp = lesson.pedagogical_components['2_prerequisites'];
              const isObj = typeof comp === 'object' && comp !== null;
              const tribal = isObj ? comp.tribal_primary : '';
              const dev = isObj ? comp.tribal_devanagari : '';
              const hindi = isObj ? comp.hindi : (typeof comp === 'string' ? comp : '');
              const english = isObj ? comp.english : '';

              return (
                <div className="bg-white p-5 rounded-2xl border-2 border-gov-200 space-y-3 shadow-sm">
                  <div className="text-xs font-black text-forest-800 uppercase flex items-center justify-between pb-1 border-b border-gov-100">
                    <span>{st.point2Title}</span>
                    <BookOpen className="w-4 h-4 text-forest-600" />
                  </div>
                  
                  <div className="space-y-2">
                    {tribal && (
                      <div className="p-3 bg-forest-50/80 rounded-xl border border-forest-200">
                        <div className="text-[10px] font-black uppercase text-forest-800">🌿 {pack.nameNative} ({pack.nameEnglish})</div>
                        <div className="text-sm font-black text-forest-950 font-olchiki mt-0.5">{tribal}</div>
                        {dev && <div className="text-xs font-semibold text-forest-700 mt-1">{isEng ? 'Pronunciation:' : 'उच्चारण:'} {dev}</div>}
                      </div>
                    )}
                    {isEng && english && (
                      <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200">
                        <div className="text-[10px] font-black uppercase text-blue-900">🌐 English</div>
                        <div className="text-xs font-semibold text-blue-950 mt-0.5 leading-relaxed">{english}</div>
                      </div>
                    )}
                    {hindi && (
                      <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200">
                        <div className="text-[10px] font-black uppercase text-amber-900">🇮🇳 हिन्दी (Hindi)</div>
                        <div className="text-xs font-bold text-amber-950 mt-0.5 leading-relaxed">{hindi}</div>
                      </div>
                    )}
                    {!isEng && english && (
                      <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200">
                        <div className="text-[10px] font-black uppercase text-blue-900">🌐 English</div>
                        <div className="text-xs font-semibold text-blue-950 mt-0.5 leading-relaxed">{english}</div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>

          {/* 3 & 4. Teacher Explanation & Mother Tongue Explanation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 3. Teacher Pedagogy */}
            {(() => {
              const comp = lesson.pedagogical_components['3_teacher_explanation'];
              const isObj = typeof comp === 'object' && comp !== null;
              const tribal = isObj ? comp.tribal_primary : '';
              const hindi = isObj ? comp.hindi : (lesson.pedagogical_components['3_teacher_explanation_hindi'] || (typeof comp === 'string' ? comp : ''));
              const english = isObj ? comp.english : '';

              return (
                <div className="bg-white p-5 rounded-2xl border-2 border-gov-200 space-y-3 shadow-sm">
                  <div className="text-xs font-black text-forest-800 uppercase pb-1 border-b border-gov-100">
                    {st.point3Title}
                  </div>
                  <div className="space-y-2">
                    {tribal && (
                      <div className="p-3 bg-forest-50/80 rounded-xl border border-forest-200">
                        <div className="text-[10px] font-black uppercase text-forest-800">🌿 {pack.nameNative} ({pack.nameEnglish})</div>
                        <div className="text-xs font-bold text-forest-950 font-olchiki mt-0.5">{tribal}</div>
                      </div>
                    )}
                    {isEng && english && (
                      <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200">
                        <div className="text-[10px] font-black uppercase text-blue-900">🌐 English</div>
                        <div className="text-xs font-semibold text-blue-950 mt-0.5 leading-relaxed">{english}</div>
                      </div>
                    )}
                    {hindi && (
                      <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200">
                        <div className="text-[10px] font-black uppercase text-amber-900">🇮🇳 हिन्दी (Hindi)</div>
                        <div className="text-xs font-bold text-amber-950 mt-0.5 leading-relaxed">{hindi}</div>
                      </div>
                    )}
                    {!isEng && english && (
                      <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200">
                        <div className="text-[10px] font-black uppercase text-blue-900">🌐 English</div>
                        <div className="text-xs font-semibold text-blue-950 mt-0.5 leading-relaxed">{english}</div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* 4. Mother Tongue Immersion */}
            {(() => {
              const comp = lesson.pedagogical_components['4_mother_tongue_explanation'];
              return (
                <div className="bg-forest-50/80 p-5 rounded-2xl border-2 border-forest-300 space-y-3 shadow-sm">
                  <div className="flex items-center justify-between pb-1 border-b border-forest-200">
                    <span className="text-xs font-black text-forest-900 uppercase">
                      {st.point4Title}
                    </span>
                    <button
                      onClick={() => handleToggleAudio(comp.text_primary, selectedLanguage, 'immersion_audio')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-xs cursor-pointer transition-all active:scale-95 ${
                        playingAudioKey === 'immersion_audio'
                          ? 'bg-amber-500 text-gov-950 font-black ring-2 ring-amber-300 animate-pulse'
                          : 'bg-forest-700 hover:bg-forest-800 text-white'
                      }`}
                      title="1-Tap Play/Stop Audio"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{playingAudioKey === 'immersion_audio' ? st.stopAudioBtn : st.listenAudioBtn}</span>
                    </button>
                  </div>
                  <div className="space-y-2">
                    <div className="text-base sm:text-lg font-black text-forest-950 font-olchiki leading-relaxed">
                      {comp.text_primary}
                    </div>
                    {comp.text_devanagari && (
                      <div className="text-xs font-bold text-forest-800 pt-1">
                        {isEng ? 'Pronunciation:' : 'उच्चारण:'} {comp.text_devanagari}
                      </div>
                    )}
                    {isEng && comp.english && (
                      <div className="p-2.5 bg-white/80 rounded-xl text-[11px] font-semibold text-blue-950 border border-blue-200">
                        🌐 English: {comp.english}
                      </div>
                    )}
                    {comp.hindi && (
                      <div className="p-2.5 bg-white/80 rounded-xl text-xs font-bold text-amber-950 border border-amber-200">
                        🇮🇳 हिन्दी: {comp.hindi}
                      </div>
                    )}
                    {!isEng && comp.english && (
                      <div className="p-2.5 bg-white/80 rounded-xl text-[11px] font-semibold text-blue-950 border border-blue-200">
                        🌐 English: {comp.english}
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>

          {/* 5. Localized Realia Example */}
          {(() => {
            const comp = lesson.pedagogical_components['5_localized_realia_example'];
            return (
              <div className="bg-white p-5 rounded-2xl border-2 border-gov-200 space-y-3 shadow-sm">
                <div className="text-xs font-black text-forest-800 uppercase pb-1 border-b border-gov-100 flex items-center justify-between">
                  <span>{st.point5Title}</span>
                  <span className="text-[10px] font-bold text-forest-700 bg-forest-50 px-2 py-0.5 rounded">
                    {isEng ? 'Context Theme:' : 'संदर्भ:'} {comp.context_theme}
                  </span>
                </div>
                
                {comp.example_description && (
                  <div className="text-xs font-bold text-gov-700 bg-gov-50 p-2.5 rounded-xl border border-gov-200">
                    🍃 {comp.example_description}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                  <div className="p-3 bg-forest-50 rounded-xl border border-forest-200">
                    <div className="text-[10px] font-black uppercase text-forest-800">{st.dialogueTribalLabel}</div>
                    <div className="text-xs font-bold text-forest-950 font-olchiki mt-1">{comp.dialogue_tribal}</div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="text-[10px] font-black uppercase text-blue-900">{st.dialogueEnglishLabel}</div>
                    <div className="text-xs font-semibold text-blue-950 mt-1">{comp.dialogue_english || comp.dialogue_hindi}</div>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                    <div className="text-[10px] font-black uppercase text-amber-900">{st.dialogueHindiLabel}</div>
                    <div className="text-xs font-bold text-amber-950 mt-1">{comp.dialogue_hindi}</div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* SECTION 2: VOCABULARY & CULTURAL IMMERSION (Items 6 and 7) */}
        <div className="space-y-4">
          <h4 className="text-xs font-black tracking-wider text-gov-500 uppercase flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-forest-700" />
            <span>{st.part2Title}</span>
          </h4>

          {/* 6. Essential Vocabulary Bridge */}
          <div className="space-y-2">
            <div className="text-xs font-black text-gov-700 uppercase">
              {st.point6Title}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {lesson.pedagogical_components['6_essential_vocabulary'].map((v, idx) => (
                <div key={idx} className="p-3.5 bg-white rounded-2xl border-2 border-gov-200 space-y-1.5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black text-forest-900 font-olchiki">{v.tribal}</span>
                    <button
                      onClick={() => handleToggleAudio(v.tribal, selectedLanguage, `vocab_${idx}`)}
                      className={`p-1.5 rounded-lg cursor-pointer transition-all active:scale-95 ${
                        playingAudioKey === `vocab_${idx}`
                          ? 'bg-forest-700 text-white animate-pulse'
                          : 'text-forest-700 hover:bg-forest-50'
                      }`}
                      title="1-Tap Play/Stop"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="text-xs font-bold text-gov-600">{isEng ? 'Sound:' : 'उच्चारण:'} {v.devanagari}</div>
                  {isEng ? (
                    <>
                      <div className="text-xs font-extrabold text-blue-900">🌐 {v.english}</div>
                      <div className="text-[11px] font-semibold text-amber-950">🇮🇳 {v.hindi}</div>
                    </>
                  ) : (
                    <>
                      <div className="text-xs font-extrabold text-amber-950">🇮🇳 {v.hindi}</div>
                      <div className="text-[11px] font-semibold text-blue-900">🌐 {v.english}</div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 7. Story Activity */}
          {(() => {
            const comp = lesson.pedagogical_components['7_story_activity'];
            return (
              <div className="bg-white p-5 rounded-2xl border-2 border-gov-200 space-y-3 shadow-sm">
                <div className="text-xs font-black text-forest-800 uppercase pb-1 border-b border-gov-100 flex items-center justify-between">
                  <span>{st.point7Title}</span>
                  <span className="text-xs font-bold text-amber-800">
                    {isEng ? (comp.title_english || comp.title_hindi || comp.title) : (comp.title_hindi || comp.title)}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3 bg-forest-50 rounded-xl border border-forest-200 space-y-1 text-xs">
                    <div className="text-[10px] font-black uppercase text-forest-800">🌿 {comp.title_tribal || (isEng ? 'Tribal Folklore' : 'लोककथा')}</div>
                    <div className="font-bold text-forest-950 font-olchiki leading-relaxed">{comp.narrative_tribal || comp.narrative}</div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 space-y-1 text-xs">
                    <div className="text-[10px] font-black uppercase text-blue-900">🌐 English Narrative</div>
                    <div className="font-semibold text-blue-950 leading-relaxed">{comp.narrative_english || comp.narrative}</div>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 space-y-1 text-xs">
                    <div className="text-[10px] font-black uppercase text-amber-900">🇮🇳 हिन्दी कथा</div>
                    <div className="font-bold text-amber-950 leading-relaxed">{comp.narrative_hindi || comp.narrative}</div>
                  </div>
                </div>

                <div className="p-3 bg-amber-100/70 rounded-xl text-xs font-bold text-amber-950 flex items-center justify-between">
                  <span>{st.storyMoralLabel} {isEng ? (comp.moral_english || comp.moral_hindi || comp.moral) : (comp.moral_hindi || comp.moral)}</span>
                  {comp.moral_tribal && <span className="font-olchiki text-forest-900">({comp.moral_tribal})</span>}
                </div>
              </div>
            );
          })()}
        </div>

        {/* SECTION 3: CLASSROOM ENGAGEMENT & EVALUATION (Items 8 to 11) */}
        <div className="space-y-4">
          <h4 className="text-xs font-black tracking-wider text-gov-500 uppercase flex items-center gap-2">
            <Target className="w-4 h-4 text-forest-700" />
            <span>{st.part3Title}</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 8. Blackboard Activity */}
            {(() => {
              const comp = lesson.pedagogical_components['8_blackboard_activity'];
              const isObj = typeof comp === 'object' && comp !== null;
              const tribal = isObj ? (comp as any).tribal : '';
              const hindi = isObj ? (comp as any).hindi : (typeof comp === 'string' ? comp : '');
              const english = isObj ? (comp as any).english : '';

              return (
                <div className="bg-white p-5 rounded-2xl border-2 border-gov-200 space-y-3 shadow-sm">
                  <div className="text-xs font-black text-forest-800 uppercase pb-1 border-b border-gov-100">
                    {st.point8Title}
                  </div>
                  <div className="space-y-2 text-xs">
                    {tribal && <div className="p-2.5 bg-forest-50 rounded-xl border border-forest-200 font-bold text-forest-950 font-olchiki">🌿 {tribal}</div>}
                    {isEng && english && <div className="p-2.5 bg-blue-50 rounded-xl border border-blue-200 text-[11px] font-semibold text-blue-950">🌐 {english}</div>}
                    {hindi && <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 font-bold text-amber-950">🇮🇳 {hindi}</div>}
                    {!isEng && english && <div className="p-2.5 bg-blue-50 rounded-xl border border-blue-200 text-[11px] font-semibold text-blue-950">🌐 {english}</div>}
                  </div>
                </div>
              );
            })()}

            {/* 9. Student Practice */}
            <div className="bg-white p-5 rounded-2xl border-2 border-gov-200 space-y-3 shadow-sm">
              <div className="text-xs font-black text-forest-800 uppercase pb-1 border-b border-gov-100">
                {st.point9Title}
              </div>
              <div className="space-y-2">
                {lesson.pedagogical_components['9_student_practice'].map((item, idx) => {
                  const isObj = typeof item === 'object' && item !== null;
                  const tribal = isObj ? (item as any).tribal : '';
                  const hindi = isObj ? (item as any).hindi : (typeof item === 'string' ? item : '');
                  const english = isObj ? (item as any).english : '';

                  return (
                    <div key={idx} className="p-2.5 bg-gov-50 rounded-xl border border-gov-200 text-xs space-y-1">
                      {tribal && <div className="font-bold text-forest-950 font-olchiki">🌿 {tribal}</div>}
                      {isEng && english && <div className="text-[11px] font-semibold text-blue-900">🌐 {english}</div>}
                      {hindi && <div className="font-bold text-amber-950">🇮🇳 {hindi}</div>}
                      {!isEng && english && <div className="text-[11px] font-semibold text-blue-900">🌐 {english}</div>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 10. Comprehension Questions */}
            <div className="bg-white p-5 rounded-2xl border-2 border-gov-200 space-y-3 shadow-sm">
              <div className="text-xs font-black text-forest-800 uppercase pb-1 border-b border-gov-100">
                {st.point10Title}
              </div>
              <div className="space-y-2">
                {lesson.pedagogical_components['10_comprehension_questions'].map((q, idx) => (
                  <div key={idx} className="p-3 bg-gov-50 rounded-xl border border-gov-200 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-gov-500 uppercase">
                        {isEng ? `Question ${idx + 1} (${q.type || 'Oral'})` : `प्रश्न ${idx + 1} (${q.type || 'मौखिक'})`}
                      </span>
                      <button
                        onClick={() => handleToggleAudio(q.q_tribal || q.q_hindi || (q as any).q, selectedLanguage, `comp_q_${idx}`)}
                        className={`p-1.5 rounded-lg cursor-pointer transition-all active:scale-95 ${
                          playingAudioKey === `comp_q_${idx}`
                            ? 'bg-forest-700 text-white animate-pulse'
                            : 'bg-forest-100 text-forest-800 hover:bg-forest-200'
                        }`}
                        title="1-Tap Play/Stop"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    {q.q_tribal && <div className="font-bold text-forest-950 font-olchiki">🌿 {q.q_tribal}</div>}
                    {isEng && q.q_english && <div className="text-[11px] font-semibold text-blue-900">🌐 {q.q_english}</div>}
                    {q.q_hindi && <div className="font-bold text-amber-950">🇮🇳 {q.q_hindi || (q as any).q}</div>}
                    {!isEng && q.q_english && <div className="text-[11px] font-semibold text-blue-900">🌐 {q.q_english}</div>}
                  </div>
                ))}
              </div>
            </div>

            {/* 11. Formative Evaluation */}
            {(() => {
              const comp = lesson.pedagogical_components['11_formative_assessment'];
              return (
                <div className="bg-white p-5 rounded-2xl border-2 border-gov-200 space-y-3 shadow-sm">
                  <div className="text-xs font-black text-forest-800 uppercase pb-1 border-b border-gov-100">
                    {st.point11Title}
                  </div>
                  <div className="space-y-2">
                    <div className="p-3 bg-gov-50 rounded-xl border border-gov-200 space-y-1 text-xs">
                      {comp.task_tribal && <div className="font-bold text-forest-950 font-olchiki">🌿 {comp.task_tribal}</div>}
                      {isEng && comp.task_english && <div className="text-[11px] font-semibold text-blue-900">🌐 {comp.task_english}</div>}
                      {comp.task_hindi && <div className="font-bold text-amber-950">🇮🇳 {comp.task_hindi || comp.task}</div>}
                      {!isEng && comp.task_english && <div className="text-[11px] font-semibold text-blue-900">🌐 {comp.task_english}</div>}
                    </div>
                    <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs font-bold text-emerald-900">
                      {isEng ? '🎯 Passing Benchmark:' : '🎯 उत्तीर्ण मानदंड:'} {comp.passing_criteria}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>

        {/* SECTION 4: BEYOND CLASSROOM & INCLUSIVE SUPPORT (Items 12 to 14) */}
        <div className="space-y-4">
          <h4 className="text-xs font-black tracking-wider text-gov-500 uppercase flex items-center gap-2">
            <Users className="w-4 h-4 text-forest-700" />
            <span>{st.part4Title}</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 12. Homework Connection */}
            {(() => {
              const comp = lesson.pedagogical_components['12_homework_connection'];
              const isObj = typeof comp === 'object' && comp !== null;
              const tribal = isObj ? (comp as any).tribal : '';
              const hindi = isObj ? (comp as any).hindi : (typeof comp === 'string' ? comp : '');
              const english = isObj ? (comp as any).english : '';

              return (
                <div className="bg-white p-5 rounded-2xl border-2 border-gov-200 space-y-2.5 shadow-sm">
                  <div className="text-xs font-black text-forest-800 uppercase pb-1 border-b border-gov-100">
                    {st.point12Title}
                  </div>
                  <div className="space-y-1.5 text-xs">
                    {tribal && <div className="p-2.5 bg-forest-50 rounded-xl border border-forest-200 font-bold text-forest-950 font-olchiki">🌿 {tribal}</div>}
                    {isEng && english && <div className="p-2.5 bg-blue-50 rounded-xl border border-blue-200 text-[11px] font-semibold text-blue-950">🌐 {english}</div>}
                    {hindi && <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 font-bold text-amber-950">🇮🇳 {hindi}</div>}
                    {!isEng && english && <div className="p-2.5 bg-blue-50 rounded-xl border border-blue-200 text-[11px] font-semibold text-blue-950">🌐 {english}</div>}
                  </div>
                </div>
              );
            })()}

            {/* 13. Remedial Support */}
            {(() => {
              const comp = lesson.pedagogical_components['13_remedial_activity'];
              const isObj = typeof comp === 'object' && comp !== null;
              const tribal = isObj ? (comp as any).tribal : '';
              const hindi = isObj ? (comp as any).hindi : (typeof comp === 'string' ? comp : '');
              const english = isObj ? (comp as any).english : '';

              return (
                <div className="bg-white p-5 rounded-2xl border-2 border-rose-200 space-y-2.5 shadow-sm">
                  <div className="text-xs font-black text-rose-800 uppercase pb-1 border-rose-100 flex items-center justify-between">
                    <span>{st.point13Title}</span>
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  </div>
                  <div className="space-y-1.5 text-xs">
                    {tribal && <div className="p-2.5 bg-forest-50 rounded-xl border border-forest-200 font-bold text-forest-950 font-olchiki">🌿 {tribal}</div>}
                    {isEng && english && <div className="p-2.5 bg-blue-50 rounded-xl border border-blue-200 text-[11px] font-semibold text-blue-950">🌐 {english}</div>}
                    {hindi && <div className="p-2.5 bg-rose-50 rounded-xl border border-rose-200 font-bold text-rose-950">🇮🇳 {hindi}</div>}
                    {!isEng && english && <div className="p-2.5 bg-blue-50 rounded-xl border border-blue-200 text-[11px] font-semibold text-blue-950">🌐 {english}</div>}
                  </div>
                </div>
              );
            })()}

            {/* 14. Extension Activity */}
            {(() => {
              const comp = lesson.pedagogical_components['14_extension_activity'];
              const isObj = typeof comp === 'object' && comp !== null;
              const tribal = isObj ? (comp as any).tribal : '';
              const hindi = isObj ? (comp as any).hindi : (typeof comp === 'string' ? comp : '');
              const english = isObj ? (comp as any).english : '';

              return (
                <div className="bg-white p-5 rounded-2xl border-2 border-emerald-200 space-y-2.5 shadow-sm">
                  <div className="text-xs font-black text-emerald-800 uppercase pb-1 border-emerald-100 flex items-center justify-between">
                    <span>{st.point14Title}</span>
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div className="space-y-1.5 text-xs">
                    {tribal && <div className="p-2.5 bg-forest-50 rounded-xl border border-forest-200 font-bold text-forest-950 font-olchiki">🌿 {tribal}</div>}
                    {isEng && english && <div className="p-2.5 bg-blue-50 rounded-xl border border-blue-200 text-[11px] font-semibold text-blue-950">🌐 {english}</div>}
                    {hindi && <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 font-bold text-emerald-950">🇮🇳 {hindi}</div>}
                    {!isEng && english && <div className="p-2.5 bg-blue-50 rounded-xl border border-blue-200 text-[11px] font-semibold text-blue-950">🌐 {english}</div>}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>

        {/* Provenance & Hallucination Defense Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-gov-500 px-3 py-3 rounded-xl bg-gov-50 border border-gov-200">
          <span className="flex items-center gap-1.5 font-bold text-gov-700">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            {st.provenanceSource}
          </span>
          <span className="font-semibold">
            {isEng ? 'Verification Status:' : 'सत्यापन स्थिति:'} <span className="text-emerald-700 font-black">{st.provenanceStatus}</span>
          </span>
        </div>
      </div>
    );
  }
};
