export type UserRole = 'student' | 'teacher' | 'admin' | 'validator';

export type TribalLanguage = 'santhali' | 'mundari' | 'ho' | 'kurukh' | 'kharia';

export type UILanguage = 'english' | 'hindi' | 'santhali' | 'ho' | 'mundari';

export type ScriptId = 'ol_chiki' | 'mundari_bani' | 'warang_chiti' | 'tolong_siki' | 'devanagari' | 'roman';

export interface ScriptDefinition {
  id: ScriptId;
  nameNative: string;
  nameEnglish: string;
  scriptType: 'alphabet' | 'abugida' | 'latin';
  unicodeRange?: string;
  sampleText: string;
  isNative: boolean;
}

export interface LanguagePack {
  id: TribalLanguage;
  isoCode: string;
  nameEnglish: string;
  nameNative: string;
  family: string;
  defaultScript: ScriptId;
  supportedScripts: ScriptDefinition[];
  primaryRegions: string[];
  sampleGreeting: {
    nativeText: string;
    devanagari: string;
    roman: string;
    meaningHindi: string;
    meaningEnglish: string;
  };
  culturalContext: {
    majorFestivals: string[];
    folkInstruments: string[];
    natureReverence?: string;
    communityRealia: string[];
    historicLeaders?: string[];
  };
  vocabularyCount: number;
  validationStatus: string;
}

export interface TranslationResult {
  source_text: string;
  source_lang: string;
  target_lang: string;
  translated_text: string;
  script_primary: string;
  devanagari_text: string;
  romanized: string;
  audio_phonemes: string;
  category: string;
  confidence: number;
  latency_ms: number;
  hindi_bridge?: string;
}

export interface VocabularyItem {
  hindi: string;
  santhali_dev: string;
  santhali_ol: string;
  santhali_rom: string;
  mundari_dev: string;
  mundari_rom: string;
  ho_dev: string;
  ho_rom: string;
  category: string;
  audio_phonemes: string;
}

export interface LessonStep {
  step_number: number;
  type: string;
  time_mins: number;
  teacher_hindi: string;
  dialogue_santhali?: {
    ol_chiki: string;
    dev: string;
    rom: string;
  };
  dialogue_mundari?: {
    dev: string;
    rom: string;
  };
  dialogue_ho?: {
    dev: string;
    rom: string;
  };
  dialogue?: Record<string, string>;
}

export interface LessonPlan {
  id: string;
  textbook?: string;
  chapter_number?: number;
  title: string;
  grade: string;
  subject?: string;
  subject_code?: 'hindi' | 'math' | 'evs' | 'english';
  theme?: string;
  domain?: string;
  tribal_title?: {
    santhali_ol: string;
    santhali_dev: string;
    mundari: string;
    ho: string;
  };
  topics?: string[];
  subtopics?: string[];
  fln_milestones?: string[];
  tlem_realia?: string[];
  learning_outcomes: string[];
  duration_minutes: number;
  teacher_guide?: string;
  steps: LessonStep[];
}

export interface StoryPage {
  page_num: number;
  hindi_text: string;
  santhali_text_ol: string;
  santhali_text_dev: string;
  santhali_rom: string;
  mundari_text: string;
  ho_text: string;
  image_prompt?: string;
}

export interface BilingualStory {
  id: string;
  title_hindi: string;
  title_santhali: string;
  title_mundari: string;
  title_ho: string;
  category: string;
  moral: string;
  pages: StoryPage[];
}

export interface ExamOption {
  id: string;
  text: string;
  is_correct: boolean;
}

export interface ExamQuestion {
  q_id: number;
  type: string;
  competency: string;
  marks: number;
  question_hindi: string;
  question_tribal?: {
    santhali_ol?: string;
    santhali_dev?: string;
    mundari?: string;
    ho?: string;
  };
  question_english?: string;
  audio_prompt?: string;
  target_phrase?: string;
  target_ol?: string;
  options: ExamOption[];
}

export interface AssessmentExam {
  id: string;
  title: string;
  grade: string;
  exam_type?: string;
  subject?: string;
  chapter_id?: string;
  chapter_title?: string;
  theme?: string;
  language?: string;
  passing_marks?: number;
  total_marks: number;
  time_minutes: number;
  competencies: string[];
  questions: ExamQuestion[];
  created_at?: number;
}

export interface CompetencyScore {
  earned: number;
  total: number;
}

export interface ExamSubmissionResponse {
  exam_id: string;
  exam_title: string;
  student_name: string;
  student_class: string;
  target_lang: string;
  total_marks: number;
  earned_marks: number;
  percentage: number;
  badge: string;
  proficiency_level: string;
  teacher_remark: string;
  competency_breakdown: Record<string, CompetencyScore>;
  question_results: {
    q_id: number;
    competency: string;
    is_correct: boolean;
    marks_awarded: number;
    max_marks: number;
  }[];
  updated_mastery_matrix?: Record<string, number>;
  evaluation_timestamp: number;
  verified_by: string;
  attempt_id?: string;
  sync_status?: string;
}

export interface TrilingualContent {
  tribal_primary: string;
  tribal_devanagari?: string;
  hindi: string;
  english: string;
}

export interface PedagogicalLessonPlan {
  id: string;
  topic_hindi: string;
  topic_tribal: string;
  topic_devanagari: string;
  topic_english?: string;
  grade: string;
  subject: string;
  language: TribalLanguage;
  script: string;
  pedagogical_components: {
    '1_learning_objective': TrilingualContent | string;
    '2_prerequisites': TrilingualContent | string;
    '3_teacher_explanation'?: TrilingualContent | string;
    '3_teacher_explanation_hindi'?: string;
    '4_mother_tongue_explanation': {
      text_primary: string;
      text_devanagari: string;
      hindi?: string;
      english?: string;
      audio_phonemes?: string;
    };
    '5_localized_realia_example': {
      context_theme: string;
      example_description?: string;
      dialogue_tribal: string;
      dialogue_devanagari?: string;
      dialogue_hindi: string;
      dialogue_english?: string;
    };
    '6_essential_vocabulary': {
      tribal: string;
      devanagari: string;
      hindi: string;
      english: string;
    }[];
    '7_story_activity': {
      title_tribal?: string;
      title_hindi: string;
      title_english?: string;
      title?: string;
      narrative_tribal?: string;
      narrative_hindi?: string;
      narrative_english?: string;
      narrative?: string;
      moral_tribal?: string;
      moral_hindi?: string;
      moral_english?: string;
      moral?: string;
    };
    '8_blackboard_activity': {
      tribal?: string;
      hindi: string;
      english?: string;
    } | string;
    '9_student_practice': ({
      tribal?: string;
      hindi: string;
      english?: string;
    } | string)[];
    '10_comprehension_questions': {
      q_tribal?: string;
      q_hindi?: string;
      q_english?: string;
      q?: string;
      type?: string;
    }[];
    '11_formative_assessment': {
      task_tribal?: string;
      task_hindi?: string;
      task_english?: string;
      task?: string;
      passing_criteria: string;
    };
    '12_homework_connection': {
      tribal?: string;
      hindi: string;
      english?: string;
    } | string;
    '13_remedial_activity': {
      tribal?: string;
      hindi: string;
      english?: string;
    } | string;
    '14_extension_activity': {
      tribal?: string;
      hindi: string;
      english?: string;
    } | string;
  };
  validation_metadata?: {
    source: string;
    status: string;
    model_adapter: string;
    hallucination_score: number;
  };
}

export interface RemediationPlan {
  remediation_id: string;
  student_name: string;
  grade: string;
  target_competency: string;
  current_score_pct: number;
  gap_diagnosis: string;
  recommended_duration_days: number;
  daily_minutes: number;
  remedial_steps: {
    day: number;
    focus: string;
    activity?: string;
    activity_tribal?: string;
    activity_hindi?: string;
    activity_english?: string;
    tlem_material: string;
  }[];
  teacher_monitoring_tip: string;
  status: string;
}

export interface ChildTutorResponse {
  is_safe: boolean;
  question?: string;
  explanation_hindi?: string;
  explanation_tribal_primary?: string;
  explanation_tribal_devanagari?: string;
  explanation_english?: string;
  visual_concept?: string;
  audio_phonemes?: string;
  suggested_followups?: string[];
  refusal_message_hindi?: string;
  refusal_message_tribal?: string;
  refusal_message_english?: string;
}

export interface VaultItem {
  id: string;
  language: TribalLanguage;
  script: string;
  term_or_phrase: string;
  native_script_text: string;
  devanagari_text: string;
  meaning_hindi: string;
  meaning_english: string;
  domain: string;
  audio_phonemes?: string;
  cultural_notes?: string;
  contributor_name: string;
  contributor_role: string;
  region: string;
  sovereignty_tier: 'PUBLIC' | 'EDUCATIONAL' | 'COMMUNITY_ONLY' | 'RESTRICTED';
  validation_status: 'AI_GENERATED' | 'TEACHER_REVIEWED' | 'COMMUNITY_VALIDATED' | 'PUBLISHED' | 'REJECTED';
  validator_notes?: string;
  created_at: number;
  updated_at: number;
}

export interface CustomAssessmentQuestion {
  id: number;
  question_text: string;
  question_tribal?: string;
  question_english?: string;
  question_type: 'mcq' | 'oral_reading' | 'realia_identification' | 'concept_match';
  competency: string;
  options: {
    id: string;
    text: string;
    is_correct: boolean;
  }[];
  explanation: string;
  audio_prompt?: string;
}

export interface CustomAssessmentData {
  exam_id: string;
  title: string;
  grade: string;
  subject: string;
  language: TribalLanguage;
  total_marks: number;
  passing_marks: number;
  time_minutes: number;
  competency_focus: string[];
  questions: CustomAssessmentQuestion[];
  scoring_rubric: string;
}

export interface CustomWorksheetMatchItem {
  id: number;
  prompt: string;
  tribal_text: string;
  tribal_script: string;
  hindi_text: string;
  english_text: string;
  emoji: string;
}

export interface CustomWorksheetCountItem {
  id: number;
  count: number;
  emoji: string;
  name_hindi: string;
  name_tribal: string;
  name_english: string;
}

export interface CustomWorksheetTraceItem {
  id: number;
  char_native: string;
  char_devanagari: string;
  word_native: string;
  word_hindi: string;
  sound_phonetic: string;
}

export interface CustomWorksheetFillItem {
  id: number;
  sentence_incomplete: string;
  missing_word: string;
  tribal_sentence: string;
  hint: string;
}

export interface CustomWorksheetData {
  worksheet_id: string;
  title: string;
  grade: string;
  subject: string;
  language: TribalLanguage;
  instructions_hindi: string;
  instructions_tribal: string;
  instructions_english: string;
  match_section: CustomWorksheetMatchItem[];
  count_section: CustomWorksheetCountItem[];
  trace_section: CustomWorksheetTraceItem[];
  fill_section: CustomWorksheetFillItem[];
}

export interface MediaVideoTimestamp {
  timestamp: string;
  seconds: number;
  title_hindi: string;
  title_tribal: string;
  title_english: string;
  concept: string;
}

export interface MediaAnalysisInfo {
  media_type: 'video' | 'pdf' | 'document' | 'audio' | 'image' | 'text';
  filename: string;
  saved_filename?: string;
  file_size_bytes?: number;
  media_url?: string;
  duration_seconds?: number;
  duration_formatted?: string;
  total_pages?: number;
  extracted_word_count?: number;
  video_timestamps?: MediaVideoTimestamp[];
  visual_concepts?: string[];
  audio_quality?: string;
  ocr_status?: string;
}

export interface ExternalContentIngestResult {
  id: string;
  original_topic: string;
  summary_hindi: string;
  summary_english: string;
  detected_grade: string;
  detected_subject: string;
  target_language: TribalLanguage;
  extracted_key_terms: {
    hindi: string;
    tribal: string;
    tribal_devanagari: string;
    english: string;
  }[];
  lesson_plan: PedagogicalLessonPlan;
  assessment: CustomAssessmentData;
  worksheets: CustomWorksheetData;
  media_info?: MediaAnalysisInfo;
  created_at: number;
}

export interface OfficialTextbookChapter {
  chapter_id: string;
  chapter_num: number;
  title_hindi: string;
  title_tribal: string;
  theme: string;
  pdf_local_path: string;
  pdf_size_bytes: number;
  page_count: number;
  teacher_hints: string;
  exercises: string[];
  raw_excerpt: string;
}

export interface OfficialTextbook {
  id: string;
  grade: string;
  grade_key: string;
  subject: string;
  subject_name_hindi: string;
  subject_name_english: string;
  title_official: string;
  state_equivalent: string;
  book_code: string;
  total_chapters: number;
  chapters: OfficialTextbookChapter[];
}


