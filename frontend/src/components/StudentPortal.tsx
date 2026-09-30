import React, { useState } from 'react';
import { TribalLanguage, LessonPlan, BilingualStory } from '../types';
import { JCERT_CURRICULUM_DATA } from '../data/jcertCurriculum';
import { languagePackService } from '../services/languagePackService';
import { speechService } from '../services/speechService';
import { useLanguage } from '../context/LanguageContext';
import { AITutorModal } from './AITutorModal';
import { 
  Sparkles, 
  Volume2, 
  Mic, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Star, 
  Play, 
  Bot,
  Flame,
  Check,
  Trophy,
  Heart
} from 'lucide-react';

interface StudentPortalProps {
  selectedLanguage: TribalLanguage;
  isOfflineMode: boolean;
  onNavigateToCurriculum?: () => void;
  onNavigateToAssessment?: () => void;
  onNavigateToPractice?: () => void;
}

export const StudentPortal: React.FC<StudentPortalProps> = ({
  selectedLanguage,
  isOfflineMode,
  onNavigateToCurriculum,
  onNavigateToAssessment,
  onNavigateToPractice
}) => {
  const { t, uiLanguage } = useLanguage();
  const [selectedGrade, setSelectedGrade] = useState<string>('Class 1');
  const [activeLessonIndex, setActiveLessonIndex] = useState<number>(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [isAITutorOpen, setIsAITutorOpen] = useState<boolean>(false);
  const [starsCount, setStarsCount] = useState<number>(14);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1, 2]);

  const pack = languagePackService.getPack(selectedLanguage);
  
  // Filter lessons for student's selected grade
  const gradeLessons = JCERT_CURRICULUM_DATA.filter(l => l.grade.toLowerCase().includes(selectedGrade.toLowerCase()));
  const currentLesson = gradeLessons[activeLessonIndex] || gradeLessons[0] || JCERT_CURRICULUM_DATA[0];

  const handleSpeak = (text: string) => {
    setIsPlayingAudio(true);
    speechService.speak(text, 'hindi', () => {
      setIsPlayingAudio(false);
    });
  };

  const handleCompleteStep = (stepNum: number) => {
    if (!completedSteps.includes(stepNum)) {
      setCompletedSteps(prev => [...prev, stepNum]);
      setStarsCount(prev => prev + 1);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8 animate-fade-in">
      {/* Friendly Student Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-forest-700 text-white p-6 sm:p-8 shadow-xl border-4 border-emerald-400/40">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-emerald-100 text-xs font-black border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{t('nav.student_studio')}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              {pack.sampleGreeting.nativeText} 👋
            </h1>
            <p className="text-sm font-semibold text-emerald-100 max-w-xl">
              {t('student.greeting')} <span className="underline font-black text-amber-300">{pack.nameNative} ({pack.nameEnglish})</span>
            </p>

            {/* Quick Class Grade Pills */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-2">
              {['Balvatika', 'Class 1', 'Class 2', 'Class 3'].map((g) => (
                <button
                  key={g}
                  onClick={() => {
                    setSelectedGrade(g);
                    setActiveLessonIndex(0);
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs font-black transition-all ${
                    selectedGrade === g
                      ? 'bg-amber-400 text-gov-900 shadow-md scale-105 border-2 border-amber-300'
                      : 'bg-white/20 text-white hover:bg-white/30 border border-white/20'
                  }`}
                >
                  {g === 'Balvatika' ? 'Balvatika' : `${t('common.class_label')} ${g.replace('Class ', '')} (${g})`}
                </button>
              ))}
            </div>
          </div>

          {/* Gamified Star Counter & AI Tutor Button */}
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/20">
            <div className="flex items-center gap-3 bg-amber-400 text-gov-900 px-4 py-2.5 rounded-2xl font-black text-sm shadow-md">
              <Star className="w-5 h-5 text-amber-700 fill-amber-700 animate-spin-slow" />
              <span>{starsCount} {t('student.score_badge')}</span>
            </div>
            <button
              onClick={() => setIsAITutorOpen(true)}
              className="px-5 py-2.5 bg-white text-emerald-800 hover:bg-emerald-50 rounded-2xl font-black text-sm flex items-center gap-2 shadow-lg transition-transform active:scale-95"
            >
              <Bot className="w-5 h-5 text-emerald-600 animate-bounce" />
              <span>{t('student.ask_tutor')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 6-Step Visual Student Journey (Listen -> Speak -> Read -> Practice -> Assess -> Star) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { step: 1, title: '1. ' + t('common.play_audio'), desc: 'Audio', icon: Volume2, color: 'bg-blue-50 text-blue-700 border-blue-200' },
          { step: 2, title: '2. ' + (uiLanguage === 'hindi' ? 'समझो' : uiLanguage === 'santhali' ? 'ᱵᱩᱡᱷᱟᱹᱣ' : 'Understand'), desc: 'Visual', icon: BookOpen, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
          { step: 3, title: '3. ' + (uiLanguage === 'hindi' ? 'बोलो' : uiLanguage === 'santhali' ? 'ᱨᱚᱲ ᱢᱮ' : 'Speak'), desc: 'Phonics', icon: Mic, color: 'bg-purple-50 text-purple-700 border-purple-200' },
          { step: 4, title: '4. ' + (uiLanguage === 'hindi' ? 'पढ़ो' : uiLanguage === 'santhali' ? 'ᱯᱟᱲᱦᱟᱣ' : 'Read'), desc: 'Script', icon: BookOpen, color: 'bg-amber-50 text-amber-700 border-amber-200' },
          { step: 5, title: '5. ' + (uiLanguage === 'hindi' ? 'अभ्यास' : uiLanguage === 'santhali' ? 'ᱨᱤᱦᱟᱨᱥᱟᱞ' : 'Practice'), desc: 'Activities', icon: Sparkles, color: 'bg-rose-50 text-rose-700 border-rose-200' },
          { step: 6, title: '6. ' + (uiLanguage === 'hindi' ? 'प्रगति' : uiLanguage === 'santhali' ? 'ᱞᱟᱦᱟᱱᱛᱤ' : 'Progress'), desc: 'FLN Badge', icon: Award, color: 'bg-teal-50 text-teal-700 border-teal-200' },
        ].map((item) => {
          const isDone = completedSteps.includes(item.step);
          return (
            <div
              key={item.step}
              className={`p-4 rounded-2xl border-2 flex flex-col items-center text-center transition-all ${item.color} ${
                isDone ? 'ring-2 ring-emerald-500 ring-offset-2' : ''
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center mb-2">
                <item.icon className="w-5 h-5" />
              </div>
              <div className="text-xs font-black text-gov-900">{item.title}</div>
              <div className="text-[10px] text-gov-600 font-semibold">{item.desc}</div>
              {isDone && (
                <div className="mt-2 flex items-center gap-1 text-[10px] font-bold text-emerald-700">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>{t('common.verified')}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Main Today's Lesson Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Lesson Content & Oral Dialogue */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-gov-200 shadow-sm space-y-6">
            {/* Lesson Title Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gov-100">
              <div>
                <span className="text-xs font-black text-emerald-700 uppercase tracking-wide">
                  {currentLesson.textbook} • {currentLesson.grade}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-gov-900 mt-1">
                  {t('common.chapter_label')} {currentLesson.chapter_number || 1}: {currentLesson.title}
                </h2>
                {currentLesson.tribal_title && (
                  <div className="text-sm font-bold text-emerald-800 font-olchiki mt-0.5">
                    {currentLesson.tribal_title.santhali_ol || currentLesson.tribal_title.mundari}
                  </div>
                )}
              </div>

              <button
                onClick={() => handleSpeak(currentLesson.title)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold flex items-center gap-2 transition-colors shadow-md self-start sm:self-auto"
              >
                <Volume2 className="w-4 h-4" />
                <span>{t('student.audio_listen')}</span>
              </button>
            </div>

            {/* Interactive Lesson Steps */}
            <div className="space-y-4">
              <h3 className="text-sm font-black text-gov-800 flex items-center gap-2 uppercase tracking-wide">
                <Flame className="w-4 h-4 text-amber-500" />
                <span>{uiLanguage === 'hindi' ? 'कक्षा की बातचीत और गतिविधि:' : 'Classroom Dialogue & Activity:'}</span>
              </h3>

              {currentLesson.steps.map((step, idx) => {
                const dialogueText = step.dialogue_santhali?.ol_chiki || step.dialogue_mundari?.dev || step.teacher_hindi;
                const dialogueDev = step.dialogue_santhali?.dev || step.dialogue_mundari?.dev || '';

                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-gov-50 border border-gov-200 hover:border-emerald-300 transition-all space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-black">
                        {step.step_number}: {step.type}
                      </span>
                      <span className="text-[11px] font-bold text-gov-500">
                        ⏱️ {step.time_mins} min
                      </span>
                    </div>

                    {/* Teacher Hindi Prompt */}
                    <div className="text-sm font-bold text-gov-800">
                      👨‍🏫 {t('nav.role_teacher')}: <span className="font-semibold">{step.teacher_hindi}</span>
                    </div>

                    {/* Mother Tongue Dialogue Box */}
                    <div className="bg-white p-4 rounded-xl border border-emerald-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-emerald-800">
                          🗣️ {pack.nameNative} ({pack.nameEnglish}):
                        </span>
                        <button
                          onClick={() => handleSpeak(dialogueDev || step.teacher_hindi)}
                          className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors"
                          title="Audio"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-base font-black text-gov-900 font-olchiki leading-relaxed">
                        {dialogueText}
                      </div>
                      {dialogueDev && (
                        <div className="text-xs font-semibold text-emerald-800/80">
                          {dialogueDev}
                        </div>
                      )}
                    </div>

                    {/* Mark Complete Checkbox */}
                    <div className="flex justify-end pt-1">
                      <button
                        onClick={() => handleCompleteStep(step.step_number)}
                        className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                          completedSteps.includes(step.step_number)
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-gov-200 text-gov-700 hover:bg-emerald-600 hover:text-white'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>{completedSteps.includes(step.step_number) ? t('common.verified') : t('common.submit')}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Action Navigation Cards */}
            <div className="pt-4 border-t border-gov-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={onNavigateToCurriculum}
                  className="px-5 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl text-xs font-black flex items-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>{t('home.cta_curriculum')}</span>
                </button>

                {onNavigateToPractice && (
                  <button
                    onClick={onNavigateToPractice}
                    className="px-5 py-3 bg-amber-500 hover:bg-amber-600 text-gov-950 rounded-2xl text-xs font-black flex items-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
                  >
                    <Trophy className="w-4 h-4 text-gov-950" />
                    <span>🎯 {t('nav.practice')}</span>
                  </button>
                )}
              </div>

              <button
                onClick={onNavigateToAssessment}
                className="px-5 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl text-xs font-black flex items-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <Award className="w-4 h-4 text-amber-300" />
                <span>{t('student.take_assessment')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Lesson Selector & Cultural Folklore Story & Phonics Arena */}
        <div className="space-y-6">
          {/* Bolo Aur Jeeto Phonics Arena Card */}
          {onNavigateToPractice && (
            <div className="bg-gradient-to-br from-amber-400 via-orange-400 to-amber-500 rounded-3xl p-6 text-gov-950 shadow-md space-y-3 border-2 border-amber-300">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-white/40 text-xs font-black flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-gov-900" />
                  <span>{t('nav.practice')}</span>
                </span>
                <span className="text-xs font-black px-2 py-0.5 rounded-full bg-gov-900 text-amber-300">
                  ⚡ 4 Streak
                </span>
              </div>
              <h4 className="text-lg font-black text-gov-950">
                🎯 बोलो और जीतो (Bolo Aur Jeeto)
              </h4>
              <p className="text-xs font-semibold text-gov-900/90 leading-relaxed">
                मातृभाषा के शब्द सुनें, माइक दबाकर बोलें और AI से सटीक उच्चारण जांचकर 3 स्टार जीतें!
              </p>
              <button
                onClick={onNavigateToPractice}
                className="w-full py-2.5 bg-gov-900 hover:bg-forest-900 text-white rounded-xl font-black text-xs flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-95 cursor-pointer"
              >
                <Mic className="w-4 h-4 text-emerald-400" />
                <span>अभ्यास शुरू करें (Start Phonics)</span>
              </button>
            </div>
          )}

          {/* Lessons List in This Grade */}
          <div className="bg-white rounded-3xl p-6 border-2 border-gov-200 shadow-sm space-y-4">
            <h3 className="text-sm font-black text-gov-900 uppercase tracking-wide flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>{t('curriculum.view_chapters')} ({gradeLessons.length})</span>
            </h3>

            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {gradeLessons.map((lesson, idx) => (
                <button
                  key={lesson.id}
                  onClick={() => setActiveLessonIndex(idx)}
                  className={`w-full p-3 rounded-2xl text-left text-xs font-bold transition-all flex items-center justify-between ${
                    idx === activeLessonIndex
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-gov-50 text-gov-800 hover:bg-emerald-50 hover:text-emerald-900 border border-gov-200'
                  }`}
                >
                  <div className="truncate pr-2">
                    <div className="font-extrabold truncate">
                      {idx + 1}. {lesson.title}
                    </div>
                    <div className={`text-[10px] truncate ${idx === activeLessonIndex ? 'text-emerald-100' : 'text-gov-500'}`}>
                      {lesson.subject || 'JCERT'}
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Folk Story Mini-Card */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-6 border-2 border-amber-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-black text-amber-900 uppercase">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span>{t('student.story_title')}</span>
            </div>
            <h4 className="text-base font-black text-amber-950">
              बिरसा और नटखट बंदर (ᱵᱤᱨᱥᱟ ᱟᱨ ᱦᱟᱹᱬᱩ)
            </h4>
            <p className="text-xs font-semibold text-amber-900/80 leading-relaxed">
              {t('student.story_desc')}
            </p>
            <button
              onClick={() => handleSpeak('सारजोम गाँव में बिरसा सखुआ के पेड़ों के नीचे खेलता था और पशु पक्षियों से प्यार करता था।')}
              className="w-full py-2.5 bg-amber-400 hover:bg-amber-500 text-amber-950 rounded-xl font-black text-xs flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>{t('student.start_story')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grounded Child AI Tutor Modal */}
      <AITutorModal
        isOpen={isAITutorOpen}
        onClose={() => setIsAITutorOpen(false)}
        selectedLanguage={selectedLanguage}
        grade={selectedGrade}
      />
    </div>
  );
};
