import React, { useState, useEffect, useMemo } from 'react';
import { TribalLanguage, LessonPlan } from '../types';
import { 
  getAvailableGrades, 
  getSubjectsForGrade, 
  getChaptersForSubject, 
  JCERT_CURRICULUM_DATA 
} from '../data/jcertCurriculum';
import { speechService } from '../services/speechService';
import { useLanguage } from '../context/LanguageContext';
import { 
  BookOpen, 
  Layers, 
  GraduationCap, 
  CheckCircle2, 
  Sparkles, 
  ChevronRight, 
  Volume2, 
  Compass, 
  Filter, 
  Check,
  Tag,
  Bookmark,
  Boxes
} from 'lucide-react';

export interface CurriculumCascadingSelectorProps {
  selectedLanguage: TribalLanguage;
  selectedGrade: string;
  selectedSubjectId: 'hindi' | 'math' | 'evs' | 'english' | 'all';
  selectedChapterId?: string | null;
  onGradeChange: (grade: string) => void;
  onSubjectChange: (subjectId: 'hindi' | 'math' | 'evs' | 'english') => void;
  onChapterSelect?: (chapter: LessonPlan | null) => void;
  compact?: boolean;
  showDetailsCard?: boolean;
}

export const CurriculumCascadingSelector: React.FC<CurriculumCascadingSelectorProps> = ({
  selectedLanguage,
  selectedGrade,
  selectedSubjectId,
  selectedChapterId,
  onGradeChange,
  onSubjectChange,
  onChapterSelect,
  compact = false,
  showDetailsCard = true
}) => {
  const { uiLanguage } = useLanguage();
  const grades = getAvailableGrades();
  const availableSubjects = getSubjectsForGrade(selectedGrade);
  
  const isEn = uiLanguage === 'english';
  const isHi = uiLanguage === 'hindi';

  // Ensure subject is valid for the grade
  const effectiveSubjectId: 'hindi' | 'math' | 'evs' | 'english' = 
    selectedSubjectId === 'all' || !availableSubjects.some(s => s.id === selectedSubjectId)
      ? 'hindi'
      : (selectedSubjectId as 'hindi' | 'math' | 'evs' | 'english');

  const chapters = useMemo(() => {
    return getChaptersForSubject(selectedGrade, effectiveSubjectId);
  }, [selectedGrade, effectiveSubjectId]);

  const activeChapter = useMemo(() => {
    if (selectedChapterId) {
      return chapters.find(c => c.id === selectedChapterId) || chapters[0] || null;
    }
    return chapters[0] || null;
  }, [chapters, selectedChapterId]);

  // Sync active chapter on initial mount or when grade/subject changes
  useEffect(() => {
    if (onChapterSelect && chapters.length > 0) {
      if (!selectedChapterId || !chapters.some(c => c.id === selectedChapterId)) {
        onChapterSelect(chapters[0]);
      }
    }
  }, [selectedGrade, effectiveSubjectId]);

  const currentSubjectMeta = availableSubjects.find(s => s.id === effectiveSubjectId) || availableSubjects[0];

  const handlePlayAudio = (text: string) => {
    speechService.speak(text, selectedLanguage);
  };

  if (compact) {
    return (
      <div className="bg-white rounded-2xl p-4 border border-gov-200 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          {/* Grade Selector */}
          <div className="flex items-center gap-1 bg-gov-100 p-1 rounded-xl">
            {grades.map(g => (
              <button
                key={g}
                onClick={() => onGradeChange(g)}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                  selectedGrade === g
                    ? 'bg-forest-700 text-white shadow-sm'
                    : 'text-gov-700 hover:bg-gov-200'
                }`}
              >
                {g}
              </button>
            ))}
          </div>

          {/* Subject Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {availableSubjects.map(sub => (
              <button
                key={sub.id}
                onClick={() => onSubjectChange(sub.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5 transition-all border ${
                  effectiveSubjectId === sub.id
                    ? `${sub.badgeBg} ring-2 ring-forest-500 shadow-sm font-black`
                    : 'bg-white text-gov-700 border-gov-200 hover:bg-gov-50'
                }`}
              >
                <span>{sub.icon}</span>
                <span>{isEn ? sub.nameEnglish.split(' ')[0] : sub.nameHindi.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* Chapter Selector Dropdown */}
          <div className="flex-1 min-w-[200px]">
            <select
              value={activeChapter?.id || ''}
              onChange={(e) => {
                const found = chapters.find(c => c.id === e.target.value);
                if (found && onChapterSelect) onChapterSelect(found);
              }}
              className="w-full px-3 py-2 bg-gov-50 border border-gov-300 rounded-xl text-xs font-bold text-gov-900 focus:ring-2 focus:ring-forest-500"
            >
              {chapters.map(ch => (
                <option key={ch.id} value={ch.id}>
                  {ch.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-gov-200 shadow-sm space-y-6">
      {/* Step 1: Grade Selection */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-black text-gov-800 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-forest-700 text-white flex items-center justify-center text-[11px]">1</span>
            <span>{isEn ? 'Step 1: Select Grade / Class' : (isHi ? 'चरण 1: कक्षा चुनें' : 'ᱦᱟᱹᱴᱤᱧ ᱑: ᱪᱟᱱᱟᱪ ᱵᱟᱪᱷᱟᱣ')}</span>
          </label>
          <span className="text-[11px] font-bold text-forest-700 bg-forest-50 px-2.5 py-0.5 rounded-md border border-forest-200">
            {isEn ? 'Official JCERT / NCERT Curriculum' : 'आधिकारिक JCERT / NCERT पाठ्यचर्या'}
          </span>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {grades.map(g => {
            const isSelected = selectedGrade === g;
            return (
              <button
                key={g}
                onClick={() => onGradeChange(g)}
                className={`p-3.5 rounded-2xl border-2 text-left transition-all relative overflow-hidden ${
                  isSelected
                    ? 'border-forest-600 bg-forest-50/70 shadow-md ring-2 ring-forest-500/20'
                    : 'border-gov-200 bg-white hover:border-gov-300 hover:bg-gov-50/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-black text-gov-900">{g}</span>
                  {isSelected && <Check className="w-4 h-4 text-forest-700" />}
                </div>
                <div className="text-[11px] font-semibold text-gov-500">
                  {isEn
                    ? (g === 'Balvatika' ? 'Pre-Primary Foundational Stage (Age 5-6)' : `Primary Level (FLN Stage ${g.replace('Class ', '')})`)
                    : (g === 'Balvatika' ? 'पूर्व-प्राथमिक बुनियादी स्तर (आयु 5-6)' : `प्राथमिक स्तर (निपुण FLN ${g})`)}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Subject Selection with Official Textbook Name */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-black text-gov-800 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-forest-700 text-white flex items-center justify-center text-[11px]">2</span>
            <span>{isEn ? 'Step 2: Select Subject & Official Textbook' : (isHi ? 'चरण 2: विषय एवं आधिकारिक पाठ्यपुस्तक चुनें' : 'ᱦᱟᱹᱴᱤᱧ ᱒: ᱥᱟᱛᱟᱢ ᱟᱨ ᱯᱩᱛᱷᱤ ᱵᱟᱪᱷᱟᱣ')}</span>
          </label>
          <span className="text-[11px] font-bold text-gov-500">
            {isEn ? 'Selected Grade:' : 'चयनित कक्षा:'} <strong className="text-forest-800">{selectedGrade}</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {availableSubjects.map(sub => {
            const isSelected = effectiveSubjectId === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => onSubjectChange(sub.id)}
                className={`p-4 rounded-2xl border-2 text-left transition-all ${
                  isSelected
                    ? `${sub.badgeBg} border-forest-600 shadow-md ring-2 ring-forest-500/20`
                    : 'border-gov-200 bg-white hover:border-gov-300 hover:bg-gov-50/50'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xl">{sub.icon}</span>
                  <span className="text-xs font-black text-gov-900 line-clamp-1">{isEn ? sub.nameEnglish : sub.nameHindi}</span>
                </div>
                <div className="text-[11px] font-bold text-gov-600 line-clamp-1">
                  📖 {sub.textbookName}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 3: Chapter / Lesson Selection */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-black text-gov-800 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-forest-700 text-white flex items-center justify-center text-[11px]">3</span>
            <span>{isEn ? 'Step 3: Select Official Chapter' : (isHi ? 'चरण 3: आधिकारिक अध्याय चुनें' : 'ᱦᱟᱹᱴᱤᱧ ᱓: ᱚᱯᱷᱤᱥᱤᱭᱟᱞ ᱯᱟᱴᱷ ᱵᱟᱪᱷᱟᱣ')}</span>
          </label>
          <span className="text-[11px] font-bold text-gov-500">
            {isEn ? 'Available Chapters:' : 'उपलब्ध अध्याय:'} <strong className="text-forest-800">{chapters.length} {isEn ? 'Lessons' : 'पाठ'}</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {chapters.map(ch => {
            const isSelected = activeChapter?.id === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => onChapterSelect && onChapterSelect(ch)}
                className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-forest-600 bg-forest-50/80 shadow-md ring-2 ring-forest-500/20'
                    : 'border-gov-200 bg-white hover:border-gov-300 hover:bg-gov-50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-gov-100 text-gov-700">
                      {isEn ? `Chapter ${ch.chapter_number || 1}` : `अध्याय ${ch.chapter_number || 1}`}
                    </span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-forest-700 shrink-0" />}
                  </div>

                  <h4 className="text-xs font-black text-gov-900 line-clamp-2 mt-1">
                    {ch.title}
                  </h4>

                  {ch.tribal_title && (
                    <div className="text-[11px] font-semibold text-forest-700 mt-1 line-clamp-1">
                      {selectedLanguage === 'santhali'
                        ? (ch.tribal_title.santhali_ol || ch.tribal_title.santhali_dev)
                        : selectedLanguage === 'mundari'
                        ? ch.tribal_title.mundari
                        : ch.tribal_title.ho}
                    </div>
                  )}
                </div>

                <div className="mt-3 pt-2 border-t border-gov-100 flex items-center justify-between text-[10px] text-gov-500 font-bold">
                  <span>{isEn ? 'Theme:' : 'संदर्भ:'} {ch.theme || (isEn ? 'Nature & Environment' : 'प्रकृति एवं पर्यावरण')}</span>
                  <span>{ch.steps?.length || 5} {isEn ? 'Steps' : 'चरण'}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Chapter Metadata Grounding Badge Card */}
      {showDetailsCard && activeChapter && (
        <div className="p-5 rounded-3xl bg-gradient-to-br from-gov-50 via-forest-50/40 to-amber-50/30 border-2 border-forest-200 space-y-4 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-forest-100">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-forest-100 text-forest-800 border border-forest-300">
                  {isEn ? 'Official Textbook:' : 'आधिकारिक पाठ्यपुस्तक:'} {activeChapter.textbook}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-800 border border-amber-300">
                  {activeChapter.grade}
                </span>
              </div>
              <h3 className="text-base font-black text-gov-900">
                {activeChapter.title}
              </h3>
            </div>

            {activeChapter.tribal_title && (
              <div className="bg-white px-4 py-2 rounded-2xl border border-forest-200 shadow-sm flex items-center gap-2">
                <div>
                  <div className="text-[10px] font-bold text-gov-500 uppercase">
                    {isEn ? `Mother Tongue Title (${selectedLanguage})` : `मातृभाषा शीर्षक (${selectedLanguage})`}
                  </div>
                  <div className="text-xs font-black text-forest-800">
                    {selectedLanguage === 'santhali'
                      ? activeChapter.tribal_title.santhali_ol
                      : selectedLanguage === 'mundari'
                      ? activeChapter.tribal_title.mundari
                      : activeChapter.tribal_title.ho}
                  </div>
                </div>
                <button
                  onClick={() => handlePlayAudio(
                    selectedLanguage === 'santhali'
                      ? activeChapter.tribal_title?.santhali_dev || ''
                      : selectedLanguage === 'mundari'
                      ? activeChapter.tribal_title?.mundari || ''
                      : activeChapter.tribal_title?.ho || ''
                  )}
                  className="p-1.5 rounded-lg bg-forest-50 hover:bg-forest-100 text-forest-700 transition-colors"
                  title="Listen to Mother Tongue Pronunciation"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Topics, Subtopics & FLN Milestones */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Key Topics */}
            <div className="bg-white p-3.5 rounded-2xl border border-gov-200 space-y-1.5">
              <div className="text-[11px] font-black text-gov-700 flex items-center gap-1">
                <Bookmark className="w-3.5 h-3.5 text-forest-600" />
                <span>{isEn ? 'Core Curriculum Topics' : 'प्रमुख पाठ्यक्रम विषय'}</span>
              </div>
              <ul className="text-xs font-medium text-gov-800 space-y-1">
                {(activeChapter.topics || []).map((t, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-forest-600 font-bold">•</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* FLN Milestones */}
            <div className="bg-white p-3.5 rounded-2xl border border-gov-200 space-y-1.5">
              <div className="text-[11px] font-black text-gov-700 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>{isEn ? 'NIPUN Bharat FLN Milestones' : 'NIPUN भारत FLN दक्षता लक्ष्य'}</span>
              </div>
              <ul className="text-xs font-medium text-gov-800 space-y-1">
                {(activeChapter.fln_milestones || []).map((m, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-amber-600 font-bold">✓</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* TLM Realia & Local Artefacts */}
            <div className="bg-white p-3.5 rounded-2xl border border-gov-200 space-y-1.5">
              <div className="text-[11px] font-black text-gov-700 flex items-center gap-1">
                <Boxes className="w-3.5 h-3.5 text-blue-600" />
                <span>{isEn ? 'Localized Teaching Materials (Realia TLM)' : 'स्थानीय मूर्त शिक्षण सामग्री (TLM)'}</span>
              </div>
              <ul className="text-xs font-medium text-gov-800 space-y-1">
                {(activeChapter.tlem_realia || []).map((r, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-blue-600 font-bold">🌿</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
