import React, { useState, useEffect, useRef } from 'react';
import { 
  TribalLanguage, 
  AssessmentExam, 
  ExamQuestion, 
  ExamSubmissionResponse,
  OfficialTextbook,
  OfficialTextbookChapter
} from '../types';
import { apiService } from '../services/apiService';
import { speechService } from '../services/speechService';
import { languagePackService } from '../services/languagePackService';
import { offlineNlp } from '../services/offlineNlpEngine';
import { useLanguage } from '../context/LanguageContext';
import confetti from 'canvas-confetti';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { 
  Award, 
  Clock, 
  CheckCircle2, 
  Volume2, 
  Mic, 
  MicOff, 
  Download, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  GraduationCap,
  BookOpen,
  Calculator,
  Compass,
  Languages,
  Zap,
  Check,
  UploadCloud,
  Video,
  FileText,
  Music,
  FolderUp,
  PlayCircle,
  FileCheck2,
  RefreshCw,
  Layers
} from 'lucide-react';

interface AssessmentCenterProps {
  selectedLanguage: TribalLanguage;
  isOfflineMode: boolean;
}

export const AssessmentCenter: React.FC<AssessmentCenterProps> = ({
  selectedLanguage,
  isOfflineMode
}) => {
  const { t, uiLanguage } = useLanguage();
  const [exams, setExams] = useState<AssessmentExam[]>([]);
  const [activeExam, setActiveExam] = useState<AssessmentExam | null>(null);
  const [examState, setExamState] = useState<'list' | 'taking' | 'result'>('list');
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [studentName, setStudentName] = useState<string>('बीरबल मुर्मू (Birbal Murmu)');
  const [studentClass, setStudentClass] = useState<string>('Class 1');
  const [selectedSubject, setSelectedSubject] = useState<'hindi' | 'math' | 'evs' | 'english'>('hindi');
  const [officialBooks, setOfficialBooks] = useState<OfficialTextbook[]>([]);
  const [selectedChapterId, setSelectedChapterId] = useState<string>('');
  const [isGeneratingDynamic, setIsGeneratingDynamic] = useState<boolean>(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isRecordingOral, setIsRecordingOral] = useState<boolean>(false);
  const [oralText, setOralText] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<number>(1200); // 20 mins
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [examResult, setExamResult] = useState<ExamSubmissionResponse | null>(null);
  const [isExportingReportPdf, setIsExportingReportPdf] = useState<boolean>(false);

  // Media / Custom Upload State for Assessment Center
  const [assessmentSourceMode, setAssessmentSourceMode] = useState<'official_curriculum' | 'custom_upload'>('official_curriculum');
  const [uploadSourceType, setUploadSourceType] = useState<'video' | 'pdf' | 'audio' | 'document' | 'text'>('video');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [mediaPreviewUrl, setMediaPreviewUrl] = useState<string | null>(null);
  const [detectedMediaType, setDetectedMediaType] = useState<'video' | 'pdf' | 'document' | 'audio' | 'image' | 'text'>('video');
  const [customContentText, setCustomContentText] = useState<string>('');
  const [isGeneratingFromUpload, setIsGeneratingFromUpload] = useState<boolean>(false);

  const reportCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadExams();
  }, []);

  useEffect(() => {
    loadOfficialTextbooks();
  }, [studentClass, selectedSubject]);

  const loadOfficialTextbooks = async () => {
    try {
      const books = await apiService.fetchOfficialTextbooks(studentClass, selectedSubject);
      setOfficialBooks(books);
      if (books.length > 0 && books[0].chapters.length > 0) {
        setSelectedChapterId(books[0].chapters[0].chapter_id);
      } else {
        setSelectedChapterId('');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const loadExams = async () => {
    try {
      const list = await apiService.fetchExams();
      setExams(list);
    } catch (e) {
      console.error(e);
    }
  };

  const handleGenerateAndStartDynamicExam = async () => {
    setIsGeneratingDynamic(true);
    try {
      const dynExam = await apiService.generateSubjectAssessment(
        studentClass,
        selectedSubject,
        selectedChapterId || undefined,
        selectedLanguage
      );
      if (dynExam) {
        handleStartExam(dynExam);
      }
    } catch (e) {
      console.error('Failed to generate dynamic assessment:', e);
    } finally {
      setIsGeneratingDynamic(false);
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
      setCustomContentText(`[वीडियो पाठ: ${file.name}]\nकक्षा: ${studentClass}\nविषय: ${selectedSubject}\nइस वीडियो के आधार पर NIPUN Bharat मूल्यांकन प्रश्नोत्तरी।`);
    } else if (ext === 'pdf') {
      setDetectedMediaType('pdf');
      setUploadSourceType('pdf');
      const url = URL.createObjectURL(file);
      setMediaPreviewUrl(url);
      setCustomContentText(`[PDF पाठ्यपुस्तक: ${file.name}]\nकक्षा: ${studentClass}\nविषय: ${selectedSubject}`);
    } else if (['mp3', 'wav', 'm4a', 'ogg', 'aac'].includes(ext)) {
      setDetectedMediaType('audio');
      setUploadSourceType('audio');
      const url = URL.createObjectURL(file);
      setMediaPreviewUrl(url);
      setCustomContentText(`[ऑडियो पाठ: ${file.name}]\nकक्षा: ${studentClass}\nविषय: ${selectedSubject}`);
    } else if (['docx', 'doc', 'pptx', 'ppt'].includes(ext)) {
      setDetectedMediaType('document');
      setUploadSourceType('document');
      setMediaPreviewUrl(null);
      setCustomContentText(`[दस्तावेज़ पाठ: ${file.name}]`);
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

  const handleUploadMediaAndGenerateAssessment = async () => {
    setIsGeneratingFromUpload(true);
    try {
      let result: any;
      if (uploadedFile && uploadSourceType !== 'text') {
        result = await apiService.uploadTeacherMedia(
          uploadedFile,
          studentClass,
          selectedSubject,
          selectedLanguage
        );
      } else {
        if (!customContentText.trim()) return;
        result = await apiService.ingestExternalLessonContent(
          customContentText,
          uploadedFileName,
          studentClass,
          selectedSubject,
          selectedLanguage
        );
      }

      if (result && result.assessment) {
        const customExam: AssessmentExam = {
          id: result.assessment.exam_id || `exam-custom-${Date.now()}`,
          title: result.assessment.title || `NIPUN Bharat मूल्यांकन: ${studentClass} (${selectedSubject})`,
          grade: studentClass,
          subject: selectedSubject,
          chapter_id: 'custom-ch',
          total_marks: result.assessment.total_marks || 25,
          passing_marks: result.assessment.passing_marks || 15,
          time_minutes: result.assessment.time_minutes || 20,
          competencies: result.assessment.competency_focus || [
            'मातृभाषा शब्दावली ज्ञान (Mother Tongue Vocabulary)',
            'परिवेशीय मूर्त वस्तु पहचान (Realia Identification)',
            'संकल्पना समझ एवं तार्किक बोध (Concept Comprehension)',
            'मौखिक पठन एवं उच्चारण प्रवाह (Oral Reading Fluency)',
            'FLN मूलभूत दक्षता (Foundational Competency)'
          ],
          questions: (result.assessment.questions || []).map((q: any, idx: number) => ({
            q_id: q.q_id ?? q.id ?? (idx + 1),
            type: q.type || q.question_type || 'mcq',
            competency: q.competency || 'FLN मूलभूत दक्षता',
            marks: q.marks ?? 5,
            question_hindi: q.question_hindi || q.question_text || '',
            question_tribal: q.question_tribal,
            question_english: q.question_english || '',
            options: (q.options || []).map((opt: any) => ({
              id: opt.id,
              text: opt.text,
              is_correct: !!opt.is_correct
            })),
            explanation: q.explanation
          })),
          created_at: Math.floor(Date.now() / 1000)
        };
        handleStartExam(customExam);
      }
    } catch (e) {
      console.error('Failed to generate custom assessment from media:', e);
    } finally {
      setIsGeneratingFromUpload(false);
    }
  };

  const handleStartExam = (exam: AssessmentExam) => {
    // Robust question normalization for seamless execution
    const normalizedQuestions: ExamQuestion[] = (exam.questions || []).map((q: any, idx: number) => {
      const qId = q.q_id ?? q.id ?? (idx + 1);
      const qMarks = q.marks ?? 5;
      const qType = q.type || q.question_type || 'mcq';
      const questionHindi = q.question_hindi || q.question_text || '';
      const questionEnglish = q.question_english || '';
      const options = (q.options || []).map((opt: any) => ({
        id: opt.id,
        text: opt.text,
        is_correct: !!opt.is_correct
      }));

      return {
        q_id: qId,
        type: qType,
        competency: q.competency || 'FLN मूलभूत दक्षता (Foundational Competency)',
        marks: qMarks,
        question_hindi: questionHindi,
        question_tribal: q.question_tribal,
        question_english: questionEnglish,
        audio_prompt: q.audio_prompt,
        target_phrase: q.target_phrase,
        target_ol: q.target_ol,
        options
      };
    });

    const normalizedExam: AssessmentExam = {
      ...exam,
      id: exam.id || `exam-dyn-${Date.now()}`,
      title: exam.title || `NIPUN Bharat मूल्यांकन: ${studentClass} (${selectedSubject})`,
      grade: exam.grade || studentClass,
      total_marks: exam.total_marks || (normalizedQuestions.length * 5) || 25,
      time_minutes: exam.time_minutes || 20,
      questions: normalizedQuestions
    };

    setActiveExam(normalizedExam);
    setCurrentQIndex(0);
    setAnswers({});
    setOralText('');
    setTimeLeft((normalizedExam.time_minutes || 20) * 60);
    setExamResult(null);
    setExamState('taking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectOption = (qId: number, optId: string) => {
    setAnswers(prev => ({ ...prev, [String(qId)]: optId }));
  };

  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  const handlePlayQuestionAudio = (promptText: string) => {
    if (isPlayingAudio && speechService.isSpeakingNow()) {
      speechService.stopSpeaking();
      setIsPlayingAudio(false);
      return;
    }
    setIsPlayingAudio(true);
    speechService.toggleSpeak(
      promptText,
      selectedLanguage,
      () => setIsPlayingAudio(true),
      () => setIsPlayingAudio(false)
    );
  };

  const handleStartOralRecording = () => {
    setIsRecordingOral(true);
    setOralText('');
    speechService.startListening(
      'hi-IN',
      (transcript, isFinal) => {
        setOralText(transcript);
        if (isFinal) {
          setIsRecordingOral(false);
        }
      },
      () => setIsRecordingOral(false),
      () => setIsRecordingOral(false)
    );
  };

  const handleStopOralRecording = () => {
    speechService.stopListening();
    setIsRecordingOral(false);
  };

  const handleToggleOralRecording = () => {
    if (isRecordingOral) {
      handleStopOralRecording();
    } else {
      handleStartOralRecording();
    }
  };

  const handleSubmitExam = async () => {
    if (!activeExam) return;
    setIsSubmitting(true);

    try {
      const result = await apiService.submitExam(
        activeExam.id,
        studentName,
        studentClass,
        selectedLanguage,
        answers,
        oralText,
        activeExam
      );
      setExamResult(result);
      setExamState('result');

      if (result.percentage >= 60) {
        speechService.playCelebrationChime();
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadReportCardPdf = async () => {
    if (!reportCardRef.current) return;
    setIsExportingReportPdf(true);

    try {
      const element = reportCardRef.current;
      const canvas = await html2canvas(element, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`JCERT-NIPUN-ReportCard-${studentName.replace(/\s+/g, '_')}.pdf`);
    } catch (e) {
      console.error(e);
    } finally {
      setIsExportingReportPdf(false);
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins}:${rem < 10 ? '0' : ''}${rem}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-gov-200 p-5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
              NIPUN Bharat FLN Evaluation Suite
            </span>
            <span className="text-xs text-gov-500 font-medium">
              JCERT / SCERT Jharkhand Standards
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-gov-900">
            आकलन एवं परीक्षा केंद्र (Vernacular Assessment & Examination Hub)
          </h2>
          <p className="text-xs sm:text-sm text-gov-600 max-w-2xl mt-0.5">
            Periodic formative & summative competency evaluations measuring oral reading fluency, mother-tongue vocabulary, and foundational numeracy.
          </p>
        </div>

        {examState === 'taking' && (
          <div className="bg-gov-900 text-white px-4 py-2.5 rounded-xl flex items-center gap-3 self-start sm:self-auto">
            <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
            <div>
              <div className="text-[10px] uppercase font-bold text-gov-400">Time Left</div>
              <div className="text-sm font-black text-amber-300">{formatTime(timeLeft)}</div>
            </div>
          </div>
        )}
      </div>

      {/* VIEW 1: EXAM DIRECTORY LIST */}
      {examState === 'list' && (
        <div className="space-y-6">
          {/* Student Profile Registration Card */}
          <div className="bg-white rounded-xl border border-gov-200 p-5 shadow-sm space-y-3">
            <h3 className="font-extrabold text-sm text-gov-900 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-forest-700" />
              Student Examination Registration (परीक्षार्थी विवरण)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gov-700 mb-1">Student Name (छात्र का नाम):</label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-gov-300 focus:ring-2 focus:ring-gov-900 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gov-700 mb-1">Grade / Class (कक्षा):</label>
                <select
                  value={studentClass}
                  onChange={(e) => setStudentClass(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-gov-300 bg-white"
                >
                  <option value="Class 1">Class 1 (Grade 1)</option>
                  <option value="Class 2">Class 2 (Grade 2)</option>
                  <option value="Class 3">Class 3 (Grade 3)</option>
                  <option value="Balvatika">Balvatika (Foundational)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gov-700 mb-1">Mother Tongue (मातृभाषा):</label>
                <input
                  type="text"
                  disabled
                  value={`${selectedLanguage.toUpperCase()} (Jharkhand)`}
                  className="w-full px-3 py-2 text-xs font-bold text-gov-700 bg-gov-100 rounded-xl border border-gov-200"
                />
              </div>
            </div>
          </div>

          {/* SOURCE MODE SWITCHER: OFFICIAL CURRICULUM VS CUSTOM UPLOAD */}
          <div className="bg-white rounded-2xl p-4 border border-gov-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-forest-800 text-white flex items-center justify-center text-lg shrink-0">
                {assessmentSourceMode === 'official_curriculum' ? '📚' : '🎬'}
              </div>
              <div>
                <h4 className="text-xs font-black text-gov-900">
                  {assessmentSourceMode === 'official_curriculum'
                    ? 'मानक JCERT/NCERT पाठ्यपुस्तक आधारित मूल्यांकन'
                    : 'कस्टम वीडियो / PDF / दस्तावेज़ अपलोड आधारित मूल्यांकन'}
                </h4>
                <p className="text-[11px] text-gov-500 font-semibold">
                  {assessmentSourceMode === 'official_curriculum'
                    ? 'झारखंड सरकार की मानक पाठ्यपुस्तकों से अध्याय चुनें।'
                    : 'कोई भी शैक्षणिक वीडियो, PDF, ऑडियो या पाठ अपलोड करें — AI स्वतः NIPUN मूल्यांकन बनाएगा।'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 bg-gov-100 p-1 rounded-xl border border-gov-200 shrink-0">
              <button
                onClick={() => setAssessmentSourceMode('official_curriculum')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                  assessmentSourceMode === 'official_curriculum'
                    ? 'bg-gov-900 text-white shadow-xs'
                    : 'text-gov-700 hover:text-gov-900'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                <span>JCERT पाठ्यपुस्तक</span>
              </button>

              <button
                onClick={() => setAssessmentSourceMode('custom_upload')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                  assessmentSourceMode === 'custom_upload'
                    ? 'bg-forest-800 text-white shadow-xs'
                    : 'text-gov-700 hover:text-gov-900'
                }`}
              >
                <UploadCloud className="w-3.5 h-3.5 text-amber-300" />
                <span>वीडियो / PDF अपलोड</span>
              </button>
            </div>
          </div>

          {/* MODE A: OFFICIAL SYLLABUS ASSESSMENT */}
          {assessmentSourceMode === 'official_curriculum' && (
            <div className="bg-gradient-to-br from-forest-50 via-white to-amber-50 rounded-2xl border-2 border-forest-300 p-6 shadow-md space-y-5 animate-fade-in">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-forest-100 text-forest-900 text-xs font-black mb-1 border border-forest-300">
                    <Zap className="w-3.5 h-3.5 text-forest-700 animate-bounce" />
                    <span>Real-Time Official Syllabus Assessment Engine</span>
                  </div>
                  <h3 className="text-lg font-black text-gov-900">
                    कक्षा एवं विषय आधारित गतिशील मूल्यांकन (Generate FLN Assessment by Subject)
                  </h3>
                  <p className="text-xs text-gov-600">
                    Select your Class and Subject below. Our AI engine dynamically loads official NCERT / JCERT textbook chapters and creates trilingual NIPUN Bharat assessments.
                  </p>
                </div>
              </div>

              {/* Step 1: Grade Selection Pills */}
              <div>
                <label className="block text-xs font-bold text-gov-700 mb-2 uppercase tracking-wider">
                  Step 1: Select Class / Grade (कक्षा चुनें)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'Class 1', label: 'Class 1', desc: 'Mandar / Sarangi 1' },
                    { id: 'Class 2', label: 'Class 2', desc: 'Sakhua / Sarangi 2' },
                    { id: 'Class 3', label: 'Class 3', desc: 'Bhashanjali / Veena' },
                    { id: 'Balvatika', label: 'Balvatika', desc: 'Pre-Primary Foundational' }
                  ].map((g) => (
                    <button
                      key={g.id}
                      onClick={() => setStudentClass(g.id)}
                      className={`px-4 py-3 rounded-xl text-left border transition-all ${
                        studentClass === g.id
                          ? 'bg-gov-900 text-white border-gov-900 shadow-md scale-[1.02]'
                          : 'bg-white text-gov-800 border-gov-200 hover:border-gov-400 hover:bg-gov-50'
                      }`}
                    >
                      <div className="font-extrabold text-sm flex items-center justify-between">
                        <span>{g.label}</span>
                        {studentClass === g.id && <Check className="w-4 h-4 text-amber-400" />}
                      </div>
                      <div className={`text-[11px] font-medium mt-0.5 ${studentClass === g.id ? 'text-gov-300' : 'text-gov-500'}`}>
                        {g.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Subject Selection Cards */}
              <div>
                <label className="block text-xs font-bold text-gov-700 mb-2 uppercase tracking-wider">
                  Step 2: Select Subject (विषय चुनें)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'hindi', name: 'भाषा एवं साक्षरता', eng: 'Language & Literacy (Hindi)', icon: BookOpen, color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200' },
                    { id: 'math', name: 'गणित ज्ञान', eng: 'Foundational Numeracy (Math)', icon: Calculator, color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200' },
                    { id: 'evs', name: 'पर्यावरण अध्ययन', eng: 'Environmental Studies (EVS)', icon: Compass, color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200' },
                    { id: 'english', name: 'अंग्रेजी भाषा', eng: 'English Language', icon: Languages, color: 'text-purple-700', bg: 'bg-purple-50', border: 'border-purple-200' }
                  ].map((s) => {
                    const Icon = s.icon;
                    const isSelected = selectedSubject === s.id;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setSelectedSubject(s.id as any)}
                        className={`p-3.5 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'bg-white border-2 border-forest-700 shadow-md ring-2 ring-forest-500/20 scale-[1.02]'
                            : 'bg-white border-gov-200 hover:border-gov-400 hover:bg-gov-50'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          <div className={`p-1.5 rounded-lg ${s.bg} ${s.color}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-black text-gov-900">{s.name}</span>
                        </div>
                        <p className="text-[11px] text-gov-600 font-medium line-clamp-1">{s.eng}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Official Textbook Chapter Dropdown & Generator Button */}
              <div className="bg-white p-4 rounded-xl border border-gov-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-bold text-gov-700 mb-1">
                    Official Textbook & Chapter (पाठ्यपुस्तक अध्याय):
                  </label>
                  {officialBooks.length > 0 && officialBooks[0].chapters.length > 0 ? (
                    <select
                      value={selectedChapterId}
                      onChange={(e) => setSelectedChapterId(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-bold text-gov-900 rounded-xl border border-gov-300 bg-gov-50"
                    >
                      {officialBooks[0].chapters.map((ch) => (
                        <option key={ch.chapter_id} value={ch.chapter_id}>
                          {`पाठ ${ch.chapter_num}: ${ch.title_hindi} • ${ch.title_tribal}`}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="text-xs text-gov-600 font-semibold px-3 py-2 bg-gov-50 rounded-xl border border-gov-200">
                      {`Official ${studentClass} ${selectedSubject.toUpperCase()} Curriculum`}
                    </div>
                  )}
                </div>

                <button
                  onClick={handleGenerateAndStartDynamicExam}
                  disabled={isGeneratingDynamic}
                  className="px-6 py-3.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-black text-xs sm:text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 transition-all duration-200 active:scale-95 disabled:opacity-60 cursor-pointer border border-forest-600/50"
                  title="Click to launch interactive trilingual assessment based on selected official textbook"
                >
                  {isGeneratingDynamic ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin text-amber-300" />
                      <span>Generating Assessment from Official Book...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 text-amber-300 animate-pulse" />
                      <span>Launch Live Subject Assessment ({studentClass})</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* MODE B: CUSTOM VIDEO / PDF / CONTENT UPLOAD ASSESSMENT */}
          {assessmentSourceMode === 'custom_upload' && (
            <div className="bg-gradient-to-br from-indigo-50 via-white to-forest-50 rounded-2xl border-2 border-indigo-300 p-6 shadow-md space-y-5 animate-fade-in">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-900 text-xs font-black mb-1 border border-indigo-300">
                    <UploadCloud className="w-3.5 h-3.5 text-indigo-700" />
                    <span>Multi-Media AI Assessment Engine</span>
                  </div>
                  <h3 className="text-lg font-black text-gov-900">
                    वीडियो, PDF अथवा नोट्स अपलोड कर गतिशील परीक्षा बनाएँ (Generate Assessment from Uploaded Media)
                  </h3>
                  <p className="text-xs text-gov-600">
                    शिक्षण वीडियो, PDF कार्यपत्रक, ऑडियो या कस्टम नोट्स अपलोड करें — AI सीधे उस सामग्री के आधार पर 5 प्रश्नों की NIPUN परीक्षा तैयार करेगा।
                  </p>
                </div>
              </div>

              {/* Source Type Selector */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {[
                  { id: 'video' as const, label: '🎬 वीडियो (.MP4)', icon: Video, color: 'text-indigo-600' },
                  { id: 'pdf' as const, label: '📄 PDF दस्तावेज़', icon: FileText, color: 'text-rose-600' },
                  { id: 'audio' as const, label: '🎙️ ऑडियो (.MP3)', icon: Music, color: 'text-amber-600' },
                  { id: 'document' as const, label: '📝 वर्ड / PPT', icon: FolderUp, color: 'text-blue-600' },
                  { id: 'text' as const, label: '✍️ सीधा पाठ', icon: BookOpen, color: 'text-forest-700' }
                ].map((s) => {
                  const Icon = s.icon;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setUploadSourceType(s.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        uploadSourceType === s.id
                          ? 'border-indigo-700 bg-indigo-50/80 ring-2 ring-indigo-500/30'
                          : 'border-gov-200 bg-white hover:bg-gov-50'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <Icon className={`w-3.5 h-3.5 ${s.color}`} />
                        <span className="text-xs font-black text-gov-900">{s.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Upload Dropzone & Media Preview */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                <div className="lg:col-span-5 space-y-3">
                  <div className="relative border-2 border-dashed border-indigo-300 hover:border-indigo-500 rounded-2xl p-5 text-center bg-indigo-50/30 hover:bg-indigo-50/60 transition-all flex flex-col items-center justify-center min-h-[170px]">
                    <input
                      type="file"
                      accept="video/*,.mp4,.webm,.mov,.pdf,audio/*,.mp3,.wav,.docx,.txt"
                      onChange={handleFileUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <UploadCloud className="w-8 h-8 text-indigo-600 mb-1.5" />
                    <div className="text-xs font-black text-gov-900">
                      {uploadedFileName ? uploadedFileName : 'फ़ाइल चुनें या यहाँ ड्रैग करें'}
                    </div>
                    <div className="text-[10px] text-gov-500 font-semibold mt-0.5">
                      .MP4, .PDF, .MP3, .DOCX, .TXT समर्थित
                    </div>
                  </div>

                  {/* Video/Audio player preview */}
                  {mediaPreviewUrl && detectedMediaType === 'video' && (
                    <div className="p-2 bg-black rounded-xl">
                      <video src={mediaPreviewUrl} controls className="w-full max-h-36 rounded-lg" />
                    </div>
                  )}
                  {mediaPreviewUrl && detectedMediaType === 'audio' && (
                    <div className="p-2 bg-gov-900 rounded-xl">
                      <audio src={mediaPreviewUrl} controls className="w-full" />
                    </div>
                  )}
                </div>

                <div className="lg:col-span-7 space-y-2">
                  <label className="text-xs font-bold text-gov-800 block">
                    पाठ्य विवरण / नोट्स (Custom Content / Transcript):
                  </label>
                  <textarea
                    value={customContentText}
                    onChange={(e) => setCustomContentText(e.target.value)}
                    placeholder="अपलोड किए गए वीडियो या पाठ के मुख्य बिंदु यहाँ लिखें या पेस्ट करें..."
                    rows={6}
                    className="w-full p-3 text-xs font-medium rounded-xl border border-gov-300 bg-white focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Target Class & Subject + Trigger Button */}
              <div className="bg-white p-4 rounded-xl border border-indigo-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gov-600 block">कक्षा (Class):</label>
                    <select
                      value={studentClass}
                      onChange={(e) => setStudentClass(e.target.value)}
                      className="px-3 py-1.5 text-xs font-bold rounded-lg border border-gov-300 bg-gov-50"
                    >
                      <option value="Class 1">Class 1</option>
                      <option value="Class 2">Class 2</option>
                      <option value="Class 3">Class 3</option>
                      <option value="Balvatika">Balvatika</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gov-600 block">विषय (Subject):</label>
                    <select
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value as any)}
                      className="px-3 py-1.5 text-xs font-bold rounded-lg border border-gov-300 bg-gov-50"
                    >
                      <option value="hindi">भाषा एवं साक्षरता (Hindi)</option>
                      <option value="math">गणित ज्ञान (Math)</option>
                      <option value="evs">पर्यावरण अध्ययन (EVS)</option>
                      <option value="english">अंग्रेजी भाषा (English)</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleUploadMediaAndGenerateAssessment}
                  disabled={isGeneratingFromUpload || (!uploadedFile && !customContentText.trim())}
                  className="w-full sm:w-auto px-6 py-3 bg-indigo-700 hover:bg-indigo-800 disabled:opacity-50 text-white rounded-xl text-xs font-black flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all active:scale-95"
                >
                  {isGeneratingFromUpload ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin text-amber-300" />
                      <span>मीडिया से परीक्षा तैयार हो रही है...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>कस्टम सामग्री से परीक्षा शुरू करें (Generate & Start Exam)</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          <div className="pt-2">
            <h3 className="text-sm font-extrabold text-gov-700 mb-3 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-forest-700" />
              Pre-Configured NIPUN Bharat Standard Exams (मानकीकृत परीक्षाएँ)
            </h3>
          </div>


          {/* Exams List Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {exams.map((exam) => (
              <div
                key={exam.id}
                className="bg-white rounded-xl border border-gov-200 hover:border-gov-400 p-6 shadow-sm flex flex-col justify-between space-y-4 transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-gov-100 text-gov-800">
                      {exam.exam_type}
                    </span>
                    <span className="text-xs text-gov-500 font-semibold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {exam.time_minutes} mins • {exam.total_marks} Marks
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-gov-900">
                    {exam.title}
                  </h3>
                  <div className="text-xs font-bold text-forest-700">Target: {exam.grade}</div>

                  {/* Competencies */}
                  <div className="bg-gov-50 p-3.5 rounded-xl border border-gov-200 space-y-1 mt-2">
                    <div className="text-[10px] font-bold text-gov-500 uppercase tracking-wider">
                      Tested NIPUN Competencies:
                    </div>
                    {exam.competencies.map((c, i) => (
                      <div key={i} className="text-xs text-gov-800 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-forest-700 flex-shrink-0" />
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleStartExam(exam)}
                  className="w-full py-3 rounded-xl bg-gov-900 hover:bg-forest-800 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Start Live Assessment Exam</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 2: LIVE INTERACTIVE EXAM TAKER */}
      {examState === 'taking' && activeExam && (
        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-gov-200 p-6 sm:p-8 shadow-sm space-y-6">
          {/* Progress Header */}
          <div className="flex items-center justify-between border-b border-gov-100 pb-4">
            <div>
              <span className="text-xs font-bold text-gov-500 uppercase tracking-wider">
                {activeExam.title}
              </span>
              <h3 className="text-base font-extrabold text-gov-900">
                Question {currentQIndex + 1} of {activeExam.questions.length}
              </h3>
            </div>
            <div className="text-xs font-bold text-gov-600 bg-gov-100 px-2.5 py-1 rounded">
              Marks: {activeExam.questions[currentQIndex]?.marks}
            </div>
          </div>

          {/* Current Question Body */}
          {(() => {
            const q: ExamQuestion = activeExam.questions[currentQIndex];
            if (!q) return null;
            const pack = languagePackService.getPack(selectedLanguage);
            
            const qId = q.q_id ?? (q as any).id ?? (currentQIndex + 1);
            const qMarks = q.marks ?? 5;
            const qType = (q.type || (q as any).question_type || 'mcq').toLowerCase();
            const questionHindi = q.question_hindi || (q as any).question_text || '';
            const questionEnglish = q.question_english || '';

            // Extract tribal question details
            let qTribalOl = '';
            let qTribalDev = '';
            
            if (q.question_tribal) {
              if (typeof q.question_tribal === 'string') {
                if (selectedLanguage === 'santhali') {
                  qTribalOl = q.question_tribal;
                } else {
                  qTribalDev = q.question_tribal;
                }
              } else if (typeof q.question_tribal === 'object') {
                if (selectedLanguage === 'santhali') {
                  qTribalOl = q.question_tribal.santhali_ol || '';
                  qTribalDev = q.question_tribal.santhali_dev || '';
                } else if (selectedLanguage === 'mundari') {
                  qTribalDev = (q.question_tribal as any).mundari || '';
                } else if (selectedLanguage === 'ho') {
                  qTribalDev = (q.question_tribal as any).ho || '';
                } else if (selectedLanguage === 'kurukh') {
                  qTribalDev = (q.question_tribal as any).kurukh || '';
                } else if (selectedLanguage === 'kharia') {
                  qTribalDev = (q.question_tribal as any).kharia || '';
                }
              }
            }

            // If empty, translate dynamically from questionHindi using offline NLP engine
            if (!qTribalOl && !qTribalDev && questionHindi) {
              const trans = offlineNlp.translateOffline(questionHindi, 'hindi', selectedLanguage);
              qTribalOl = selectedLanguage === 'santhali' ? trans.translated_text : '';
              qTribalDev = trans.devanagari_text;
            }

            const audioSpeakText = qTribalDev || qTribalOl || questionHindi;

            return (
              <div className="space-y-5">
                {/* Question Prompt Card */}
                <div className="bg-gov-50 p-5 sm:p-6 rounded-3xl border-2 border-gov-200 space-y-4 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-1 border-b border-gov-200/80">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-gov-200 text-gov-800 text-[10px] font-black uppercase tracking-wider">
                        दक्षता: {q.competency}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-forest-100 text-forest-800 text-[10px] font-black">
                        मातृभाषा: {pack.nameEnglish} ({pack.nameNative})
                      </span>
                    </div>

                    <button
                      onClick={() => handlePlayQuestionAudio(audioSpeakText)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-2 transition-all shadow-sm active:scale-95 cursor-pointer ${
                        isPlayingAudio
                          ? 'bg-amber-500 text-gov-950 font-black ring-2 ring-amber-300 animate-pulse'
                          : 'bg-forest-700 hover:bg-forest-800 text-white'
                      }`}
                      title="1-Tap Play/Stop Audio"
                    >
                      <Volume2 className="w-4 h-4 text-amber-300" />
                      <span>{isPlayingAudio ? 'रोकें (Stop Audio)' : 'मातृभाषा में प्रश्न सुनें (Listen Audio)'}</span>
                    </button>
                  </div>

                  {/* Primary Tribal Question Display */}
                  <div className="p-4 bg-forest-50/90 rounded-2xl border-2 border-forest-300 space-y-1.5 ring-1 ring-forest-400/30">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase text-forest-800 flex items-center gap-1.5">
                        🌿 मातृभाषा में प्रश्न ({pack.nameNative} / Primary Question)
                      </span>
                      <span className="text-[10px] text-forest-600 font-bold">
                        🔊 ऑडियो उपलब्ध
                      </span>
                    </div>

                    {qTribalOl ? (
                      <div className="text-xl sm:text-2xl font-black text-gov-950 font-olchiki leading-relaxed">
                        {qTribalOl}
                      </div>
                    ) : (
                      <div className="text-base sm:text-lg font-black text-forest-950 leading-relaxed">
                        {qTribalDev}
                      </div>
                    )}

                    {qTribalDev && qTribalOl && (
                      <div className="text-xs font-bold text-forest-800 pt-1 border-t border-forest-200">
                        उच्चारण (Devanagari): {qTribalDev}
                      </div>
                    )}
                  </div>

                  {/* Secondary Hindi Bridge Question */}
                  <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200 space-y-0.5">
                    <div className="text-[10px] font-black uppercase text-amber-900">
                      🇮🇳 हिन्दी प्रश्न (Hindi Translation Bridge)
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-amber-950 leading-relaxed">
                      {questionHindi}
                    </div>
                  </div>

                  {/* Tertiary English Translation */}
                  {questionEnglish && (
                    <div className="p-3 bg-blue-50/80 rounded-xl border border-blue-200 space-y-0.5">
                      <div className="text-[10px] font-black uppercase text-blue-900">
                        🌐 English Question
                      </div>
                      <div className="text-xs font-semibold text-blue-950 leading-relaxed">
                        {questionEnglish}
                      </div>
                    </div>
                  )}
                </div>

                {/* Multiple Choice Options */}
                {q.options && q.options.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {q.options.map((opt) => {
                      const isSelected = answers[String(qId)] === opt.id;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => handleSelectOption(qId, opt.id)}
                          className={`p-4 rounded-xl border-2 text-left font-semibold text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? 'border-gov-900 bg-gov-50 text-gov-900 shadow-sm ring-2 ring-gov-900/10'
                              : 'border-gov-200 hover:border-gov-300 bg-white text-gov-700'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                              isSelected ? 'bg-gov-900 text-white' : 'bg-gov-100 text-gov-700'
                            }`}>
                              {opt.id}
                            </span>
                            <span>{opt.text}</span>
                          </div>
                          {isSelected && <CheckCircle2 className="w-5 h-5 text-gov-900" />}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Oral Voice Speech Test Area */}
                {qType.includes('oral') && (
                  <div className="p-6 rounded-xl bg-amber-50/70 border border-amber-200 text-center space-y-4">
                    <div className="text-xs font-bold text-amber-900 uppercase">
                      🎙️ Oral Fluency & Pronunciation Assessment
                    </div>
                    {q.target_ol && (
                      <div className="text-2xl sm:text-3xl font-extrabold text-gov-900 font-sans">
                        {q.target_ol}
                      </div>
                    )}
                    {q.target_phrase && (
                      <div className="text-lg font-bold text-forest-900">
                        "{q.target_phrase}"
                      </div>
                    )}

                    <button
                      onClick={handleToggleOralRecording}
                      onMouseDown={handleStartOralRecording}
                      onMouseUp={handleStopOralRecording}
                      onTouchStart={handleStartOralRecording}
                      onTouchEnd={handleStopOralRecording}
                      className={`mx-auto w-20 h-20 rounded-full flex flex-col items-center justify-center transition-all transform active:scale-95 shadow-md cursor-pointer ${
                        isRecordingOral
                          ? 'bg-red-600 text-white ring-8 ring-red-100 animate-pulse'
                          : 'bg-gov-900 text-white hover:bg-forest-800'
                      }`}
                    >
                      {isRecordingOral ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
                      <span className="text-[10px] font-bold uppercase mt-0.5">
                        {isRecordingOral ? 'Listening...' : 'Tap to Speak'}
                      </span>
                    </button>

                    {oralText && (
                      <div className="p-2.5 bg-white rounded-xl border border-amber-200 text-xs text-gov-800 font-semibold inline-block">
                        Recorded Voice: <em>"{oralText}"</em> ✅
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })()}

          {/* Navigator Footer */}
          <div className="flex items-center justify-between border-t border-gov-100 pt-4">
            <button
              onClick={() => setCurrentQIndex(prev => Math.max(0, prev - 1))}
              disabled={currentQIndex === 0}
              className="px-4 py-2 rounded-xl border border-gov-300 text-xs font-bold text-gov-700 hover:bg-gov-100 disabled:opacity-40 flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>

            {currentQIndex < activeExam.questions.length - 1 ? (
              <button
                onClick={() => setCurrentQIndex(prev => prev + 1)}
                className="px-5 py-2.5 rounded-xl bg-gov-900 text-white text-xs font-bold hover:bg-forest-800 flex items-center gap-1"
              >
                Next Question <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmitExam}
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-forest-700 hover:bg-forest-800 text-white text-xs font-bold shadow-sm flex items-center gap-1.5"
              >
                <Award className="w-4 h-4" />
                <span>{isSubmitting ? 'Evaluating Assessment...' : 'Submit & Grade Exam'}</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* VIEW 3: NIPUN ASSESSMENT RESULT & REPORT CARD */}
      {examState === 'result' && examResult && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <button
              onClick={() => setExamState('list')}
              className="px-4 py-2 rounded-xl border border-gov-300 text-xs font-bold text-gov-700 hover:bg-gov-100 self-start sm:self-auto"
            >
              ← Back to Assessment Directory
            </button>

            <button
              onClick={handleDownloadReportCardPdf}
              disabled={isExportingReportPdf}
              className="px-5 py-2.5 rounded-xl bg-gov-900 hover:bg-forest-800 text-white text-xs font-bold shadow-sm flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>{isExportingReportPdf ? 'Generating PDF...' : 'Download Official Report Card (A4)'}</span>
            </button>
          </div>

          {/* Printable Official JCERT/NIPUN Student Report Card Sheet */}
          <div className="bg-gov-100 p-4 rounded-xl border border-gov-200 overflow-x-auto">
            <div
              ref={reportCardRef}
              className="bg-white mx-auto p-8 rounded-lg shadow-md border-2 border-gov-900 min-w-[620px] max-w-[720px] text-gov-900 space-y-6"
            >
              {/* Report Header */}
              <div className="border-b-2 border-gov-900 pb-4 text-center space-y-1">
                <div className="text-[10px] font-bold tracking-widest text-gov-600 uppercase">
                  Department of Higher & Technical Education • Govt. of Jharkhand
                </div>
                <h3 className="text-xl font-black text-gov-900">
                  NIPUN BHARAT FLN COMPETENCY REPORT CARD
                </h3>
                <div className="text-xs font-bold text-forest-800">
                  {examResult.exam_title}
                </div>

                {/* Student Info Box */}
                <div className="grid grid-cols-3 gap-2 text-xs font-semibold pt-3 text-left border-t border-gov-200 mt-2">
                  <div><strong>छात्र का नाम:</strong> {examResult.student_name}</div>
                  <div><strong>कक्षा:</strong> {examResult.student_class}</div>
                  <div><strong>मातृभाषा:</strong> {examResult.target_lang.toUpperCase()}</div>
                </div>
              </div>

              {/* Score & Badge Highlight Box */}
              <div className="grid grid-cols-3 gap-4 bg-gov-50 p-4 rounded-xl border border-gov-200 text-center">
                <div>
                  <div className="text-[10px] font-bold uppercase text-gov-500">Total Score</div>
                  <div className="text-2xl font-black text-gov-900">
                    {examResult.earned_marks} / {examResult.total_marks}
                  </div>
                  <div className="text-xs font-bold text-forest-800">({examResult.percentage}%)</div>
                </div>

                <div>
                  <div className="text-[10px] font-bold uppercase text-gov-500">NIPUN Badge</div>
                  <div className="text-xs font-extrabold text-emerald-900 bg-emerald-100 py-1 px-2 rounded-lg mt-1">
                    {examResult.badge}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-bold uppercase text-gov-500">Proficiency Level</div>
                  <div className="text-xs font-extrabold text-gov-800 mt-1">
                    {examResult.proficiency_level}
                  </div>
                </div>
              </div>

              {/* Competencies Breakdown Table */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gov-700">
                  FLN Competency-wise Performance (दक्षता मूल्यांकन तालिका)
                </h4>
                <div className="border border-gov-300 rounded-lg overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-gov-100 border-b border-gov-300">
                      <tr>
                        <th className="p-2.5">FLN Competency Domain</th>
                        <th className="p-2.5 text-center">Max Marks</th>
                        <th className="p-2.5 text-center">Earned Marks</th>
                        <th className="p-2.5 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(examResult.competency_breakdown).map(([compName, score], idx) => {
                        const isPass = score.earned >= score.total * 0.5;
                        return (
                          <tr key={idx} className="border-b border-gov-200 last:border-0">
                            <td className="p-2.5 font-semibold">{compName}</td>
                            <td className="p-2.5 text-center font-bold">{score.total}</td>
                            <td className="p-2.5 text-center font-bold text-forest-800">{score.earned}</td>
                            <td className="p-2.5 text-right">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                isPass ? 'bg-emerald-100 text-emerald-900' : 'bg-amber-100 text-amber-900'
                              }`}>
                                {isPass ? 'COMPETENT (दक्ष)' : 'DEVELOPING (प्रगति पर)'}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Teacher Remarks Box */}
              <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200 space-y-1">
                <div className="text-[10px] font-bold uppercase text-amber-900">
                  अध्यापक टिप्पणी (Teacher Pedagogical Remarks):
                </div>
                <p className="text-xs font-semibold text-gov-800">
                  "{examResult.teacher_remark}"
                </p>
              </div>

              {/* Signatures Footer */}
              <div className="pt-6 border-t border-gov-300 flex items-center justify-between text-[11px] text-gov-600 font-semibold">
                <div>मूल्यांकनकर्ता हस्ताक्षर (Evaluator Sign): _________________</div>
                <div>विद्यालय मुहर (School Seal): [ PALASH MTB-MLE ]</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
