import { UILanguage, LanguagePack } from '../types';

export interface TeacherPortalStrings {
  workstationBadge: string;
  commandCenterTitle: string;
  activeLanguageLabel: string;
  primaryScriptLabel: string;
  enrolledStudents: string;
  flnMastery: string;
  supportNeeded: string;
  studentsCount: string;
  // Main Studio Navigation Tabs
  mainTabPlanner: string;
  mainTabDiagnostics: string;
  mainTabMediaWorksheets: string;
  // Quick Intent Hero Launcher Cards
  quickIntentHeading: string;
  quickCard1Title: string;
  quickCard1Desc: string;
  quickCard2Title: string;
  quickCard2Desc: string;
  quickCard3Title: string;
  quickCard3Desc: string;
  // Step Wizard Badges & Titles
  step1Badge: string;
  step2Badge: string;
  step3Badge: string;
  step1Title: string;
  step2Title: string;
  step3Title: string;
  step1MediaTitle: string;
  step2MediaTitle: string;
  step3MediaTitle: string;
  helperTipLesson: string;
  helperTipRemediation: string;
  helperTipMedia: string;
  // Competency & Diagnostic Matrix
  competencyMatrixTitle: string;
  competencyMatrixSubtitle: string;
  chooseGrade: string;
  domainLanguage: string;
  domainMath: string;
  targetGoal: string;
  strugglingLabel: string;
  learningGapsAlert: string;
  attentionListCount: string;
  weaknessLabel: string;
  generateRemediationBtn: string;
  generatingRemediation: string;
  remediationTitle: string;
  competencyLabel: string;
  dayLabel: string;
  tlmLabel: string;
  teacherTip: string;
  printBtn: string;
  modeOfficialTitle: string;
  modeUploadTitle: string;
  modeOfficialDesc: string;
  modeUploadDesc: string;
  modeOfficialTab: string;
  modeUploadTab: string;
  lessonStudioTitle: string;
  selectedChapterLabel: string;
  generatePlanBtn: string;
  generatingPlan: string;
  topicInputLabel: string;
  topicInputPlaceholder: string;
  themeSelectorLabel: string;
  themeForest: string;
  themeAgri: string;
  themeMarket: string;
  themeFestivals: string;
  uploadStudioTitle: string;
  uploadStudioDesc: string;
  analyzeGenerateBtn: string;
  analyzingMedia: string;
  selectSourceFormat: string;
  quickTemplatesTitle: string;
  dropzoneLabelVideo: string;
  dropzoneLabelPdf: string;
  dropzoneLabelAudio: string;
  dropzoneLabelDoc: string;
  dropzoneSupportedTypes: string;
  videoPreviewTitle: string;
  audioPreviewTitle: string;
  extractedNotesLabel: string;
  notesPlaceholder: string;
  charCount: string;
  wordCount: string;
  targetGradeLabel: string;
  targetSubjectLabel: string;
  contextThemeLabel: string;
  saveToDbBtn: string;
  printA4Btn: string;
  worksheetStudioBtn: string;
  tabVideoIntel: string;
  tabLessonPlan: string;
  tabAssessmentQuiz: string;
  tabWorksheets: string;
  videoTimelineTitle: string;
  durationLabel: string;
  totalPagesLabel: string;
  audioPlayerTitle: string;
  extractionMetricsTitle: string;
  sourceFormatLabel: string;
  fileSizeLabel: string;
  motherTongueBridgeLabel: string;
  flnAlignmentLabel: string;
  interactiveMilestonesTitle: string;
  clickTimestampHint: string;
  realiaTagsTitle: string;
  quizTotalMarks: string;
  quizPassingMarks: string;
  quizPrintBtn: string;
  quizExplanation: string;
  submitQuizBtn: string;
  quizResultTitle: string;
  tryAgainBtn: string;
  worksheetBannerTitle: string;
  studentNameLabel: string;
  dateLabel: string;
  teacherSignLabel: string;
  wsSection1Title: string;
  wsSection2Title: string;
  wsSection3Title: string;
  wsSection4Title: string;
  wsMatchHint: string;
  wsPrintBtn: string;
  // 14-Point Titles & Sections
  planHeaderBadge: string;
  planTrilingualBadge: string;
  legendTier1: string;
  legendTier1Desc: string;
  legendTier2: string;
  legendTier2Desc: string;
  legendTier3: string;
  legendTier3Desc: string;
  part1Title: string;
  part2Title: string;
  part3Title: string;
  part4Title: string;
  point1Title: string;
  point2Title: string;
  point3Title: string;
  point4Title: string;
  point5Title: string;
  point6Title: string;
  point7Title: string;
  point8Title: string;
  point9Title: string;
  point10Title: string;
  point11Title: string;
  point12Title: string;
  point13Title: string;
  point14Title: string;
  listenAudioBtn: string;
  stopAudioBtn: string;
  dialogueTribalLabel: string;
  dialogueHindiLabel: string;
  dialogueEnglishLabel: string;
  storyMoralLabel: string;
  provenanceSource: string;
  provenanceStatus: string;
}

export const getTeacherTranslations = (uiLanguage: UILanguage, pack: LanguagePack): TeacherPortalStrings => {
  if (uiLanguage === 'english') {
    return {
      workstationBadge: 'Teacher Pedagogy Studio',
      commandCenterTitle: 'Mother Tongue-Based Vernacular Pedagogy & NIPUN FLN Command Center',
      activeLanguageLabel: 'Active Language:',
      primaryScriptLabel: 'Primary Script:',
      enrolledStudents: 'Enrolled Students',
      flnMastery: 'FLN Mastery',
      supportNeeded: 'Support Needed',
      studentsCount: 'students',
      // Main Studio Navigation Tabs
      mainTabPlanner: '📖 Daily Lesson Planner',
      mainTabDiagnostics: '📊 FLN Student Diagnostics & Remediation',
      mainTabMediaWorksheets: '🎬 Smart Media, Quiz & A4 Worksheets',
      // Quick Intent Hero Launcher Cards
      quickIntentHeading: 'What would you like to prepare today?',
      quickCard1Title: 'Plan Today\'s Lesson',
      quickCard1Desc: 'Pick standard textbook chapter & get 14-point bilingual lesson plan with audio',
      quickCard2Title: 'Check Student FLN Gaps',
      quickCard2Desc: 'Identify struggling learners & generate 3-day targeted recovery plans',
      quickCard3Title: 'Create Worksheets & Quiz',
      quickCard3Desc: 'Convert video, PDF or notes into printable A4 worksheets and 5-question quizzes',
      // Step Wizard Badges & Titles
      step1Badge: 'Step 1',
      step2Badge: 'Step 2',
      step3Badge: 'Step 3',
      step1Title: 'Select Class, Subject & Chapter',
      step2Title: 'Choose Realia Context & Verify Topic',
      step3Title: 'Generate Ready-to-Teach 14-Point Lesson Plan',
      step1MediaTitle: 'Upload Media File or Select Template',
      step2MediaTitle: 'Set Grade, Subject & Realia Context',
      step3MediaTitle: 'Analyze Media & Generate Complete Teaching Kit',
      helperTipLesson: '💡 Tip: Selecting a chapter automatically sets the verified topic and aligned village context theme.',
      helperTipRemediation: '💡 Tip: Click "Create Remediation Plan" to get customized 3-day activities using local objects (TLM).',
      helperTipMedia: '💡 Tip: You can paste any story or upload school video lessons to auto-synthesize worksheets and quizzes.',
      competencyMatrixTitle: 'NIPUN Bharat FLN Competency Mastery Matrix',
      competencyMatrixSubtitle: 'Student performance across 8 core foundational literacy and numeracy competencies',
      chooseGrade: 'Choose Class:',
      domainLanguage: '📖 Language',
      domainMath: '🔢 Mathematics',
      targetGoal: 'Target:',
      strugglingLabel: 'Struggling',
      learningGapsAlert: 'Identified Learning Gaps — Immediate Remediation Required',
      attentionListCount: 'students on attention list',
      weaknessLabel: 'Gap:',
      generateRemediationBtn: 'Create Remediation Plan',
      generatingRemediation: 'Generating Plan...',
      remediationTitle: '3-Day Targeted Remediation Plan:',
      competencyLabel: 'Competency:',
      dayLabel: 'Day',
      tlmLabel: '🛠️ TLM Material:',
      teacherTip: '💡 Teacher Monitoring Tip:',
      printBtn: 'Print',
      modeOfficialTitle: 'Official JCERT / NCERT Primary Curriculum Studio',
      modeUploadTitle: 'Custom Educational Media & Ingestion Studio',
      modeOfficialDesc: 'Select official textbook chapters from JCERT (Sarangi, Joyful Math, Mridang, Veena).',
      modeUploadDesc: 'Upload external video lessons, PDF chapters, audio, or notes — AI synthesizes 14-point lesson kits.',
      modeOfficialTab: 'JCERT Curriculum',
      modeUploadTab: 'Upload Media / Create',
      lessonStudioTitle: 'AI Lesson Plan Studio (14-Point Grounded Pedagogical Framework)',
      selectedChapterLabel: 'Selected Chapter:',
      generatePlanBtn: '✨ Generate 14-Point Lesson Plan',
      generatingPlan: 'Generating Lesson Plan...',
      topicInputLabel: 'Verified Topic / Chapter:',
      topicInputPlaceholder: 'e.g. Chapter 1: Sunrise & Nature in Village',
      themeSelectorLabel: 'Localized Realia & Context Theme:',
      themeForest: 'Forest & Nature (Sal Trees & Sacred Grove)',
      themeAgri: 'Agriculture & Crops (Paddy & Millets)',
      themeMarket: 'Weekly Village Haat (Mahua & Baskets)',
      themeFestivals: 'Traditional Festivals (Sohrai & Sarhul)',
      uploadStudioTitle: 'Multimodal Educational Ingestion Studio (Video, PDF, Audio & Doc Suite)',
      uploadStudioDesc: 'Upload educational videos (.mp4/.webm), PDF textbooks, audio recordings, or docs — AI generates video intelligence, 14-point lesson plan, formative quiz, and A4 worksheets.',
      analyzeGenerateBtn: '✨ Analyze Media & Generate Lesson Kit',
      analyzingMedia: 'Deep Analyzing Media & Content...',
      selectSourceFormat: 'Select Source Format:',
      quickTemplatesTitle: 'Jharkhand Localized Quick Teaching Templates:',
      dropzoneLabelVideo: 'Select or drag Video file (.mp4, .webm)',
      dropzoneLabelPdf: 'Select or drag PDF textbook or notes',
      dropzoneLabelAudio: 'Select or drag Audio recording (.mp3, .wav)',
      dropzoneLabelDoc: 'Select or drag File here',
      dropzoneSupportedTypes: '🎬 Video, 📄 PDF, 🎙️ Audio, 📝 Doc, ✍️ Text supported',
      videoPreviewTitle: 'Video Player Preview',
      audioPreviewTitle: 'Audio Player Preview',
      extractedNotesLabel: 'Extracted Content / Video Description & Notes:',
      notesPlaceholder: 'Paste lesson transcript, story, or teaching notes here... e.g. "Lesson: Sohrai Harvest Festival and Cattle Puja in Santhal and Munda villages..."',
      charCount: 'characters',
      wordCount: 'words',
      targetGradeLabel: 'Target Grade / Class:',
      targetSubjectLabel: 'Target Subject:',
      contextThemeLabel: 'Realia Context Theme:',
      saveToDbBtn: 'Save to Local School Database',
      printA4Btn: 'Print A4 PDF',
      worksheetStudioBtn: 'Worksheet Studio',
      tabVideoIntel: '0. Media & Video Intelligence',
      tabLessonPlan: '1. 14-Point Lesson Plan',
      tabAssessmentQuiz: '2. Formative Quiz (5 Questions)',
      tabWorksheets: '3. Printable A4 Worksheets',
      videoTimelineTitle: 'Video & Audio Pedagogical Timeline Intelligence',
      durationLabel: 'Duration:',
      totalPagesLabel: 'Total Pages:',
      audioPlayerTitle: 'Audio Lesson Player',
      extractionMetricsTitle: '📊 Media Extraction Metrics',
      sourceFormatLabel: 'Source Format',
      fileSizeLabel: 'File Size',
      motherTongueBridgeLabel: 'Mother Tongue Bridge',
      flnAlignmentLabel: 'FLN Alignment',
      interactiveMilestonesTitle: '⏱️ Interactive Chapter Milestones:',
      clickTimestampHint: 'Click timestamp to seek video/audio directly',
      realiaTagsTitle: '🌿 Detected Local Realia & TLM Tags:',
      quizTotalMarks: 'Total Marks:',
      quizPassingMarks: 'Passing:',
      quizPrintBtn: 'Print Quiz',
      quizExplanation: 'Explanation:',
      submitQuizBtn: 'Submit Answers & Calculate Score',
      quizResultTitle: '🎉 Assessment Result:',
      tryAgainBtn: 'Try Again',
      worksheetBannerTitle: 'JHARKHAND PRIMARY SCHOOL NIPUN BILINGUAL WORKSHEET',
      studentNameLabel: 'Student Name: ______________________',
      dateLabel: 'Date: ____________',
      teacherSignLabel: 'Teacher Sign: ____________',
      wsSection1Title: 'Exercise 1: Match Pictures with Mother Tongue Words',
      wsSection2Title: 'Exercise 2: Count Local Objects & Write Numbers',
      wsSection3Title: 'Exercise 3: Letter Tracing & Phoneme Writing',
      wsSection4Title: 'Exercise 4: Fill in the Missing Words in Sentences',
      wsMatchHint: 'Match ⚪',
      wsPrintBtn: 'Print A4 Worksheet',
      planHeaderBadge: 'Trilingual Pedagogical Plan',
      planTrilingualBadge: 'Trilingual Pedagogical Plan',
      legendTier1: 'Tier 1 (Mother Tongue)',
      legendTier1Desc: `Native Script (${pack.nameNative})`,
      legendTier2: 'Tier 2 (State Bridge)',
      legendTier2Desc: 'Hindi Bridge (Devanagari)',
      legendTier3: 'Tier 3 (Global Medium)',
      legendTier3Desc: 'English (Global Medium)',
      part1Title: 'Part 1: Core Pedagogical Foundations',
      part2Title: 'Part 2: Essential Vocabulary & Cultural Immersion',
      part3Title: 'Part 3: Classroom Engagement & Formative Assessment',
      part4Title: 'Part 4: Inclusive Support, Remediation & Extension',
      point1Title: '1. Learning Objective (FLN Focus)',
      point2Title: '2. Prerequisites & Classroom Preparation',
      point3Title: '3. Teacher Instruction & Pedagogy',
      point4Title: '4. Mother Tongue Immersion & Explanation',
      point5Title: '5. Localized Realia Example & Classroom Dialogue',
      point6Title: '6. Essential Vocabulary Bridge',
      point7Title: '7. Local Folklore & Storytelling Activity',
      point8Title: '8. Blackboard Activity & Concept Mapping',
      point9Title: '9. Student Practice & Guided Exercises',
      point10Title: '10. Comprehension Questions (Socratic Checks)',
      point11Title: '11. Formative Evaluation & Rubric',
      point12Title: '12. Homework & Community Connection',
      point13Title: '13. Remedial Support for Diverse Learners',
      point14Title: '14. Extension Activity & Advanced Enrichment',
      listenAudioBtn: 'Listen',
      stopAudioBtn: 'Stop',
      dialogueTribalLabel: `🌿 ${pack.nameNative} Dialogue`,
      dialogueHindiLabel: '🇮🇳 Hindi Dialogue',
      dialogueEnglishLabel: '🌐 English Dialogue',
      storyMoralLabel: '💡 Moral of the Story:',
      provenanceSource: 'Source: Official JCERT Primary Curriculum & NIPUN Bharat FLN Guidelines (RAG-Grounded)',
      provenanceStatus: 'CURRICULUM_ALIGNED (0.0 Hallucination)'
    };
  }

  // Default / Hindi
  return {
    workstationBadge: 'शिक्षक कार्यशाला (Teacher Pedagogy Studio)',
    commandCenterTitle: 'मातृभाषा आधारित शिक्षण एवं निपुण FLN नियंत्रण कक्ष',
    activeLanguageLabel: 'सक्रिय भाषा:',
    primaryScriptLabel: 'प्राथमिक लिपि:',
    enrolledStudents: 'नामांकित छात्र',
    flnMastery: 'FLN निपुणता',
    supportNeeded: 'सहयोग अपेक्षित',
    studentsCount: 'छात्र',
    // Main Studio Navigation Tabs
    mainTabPlanner: '📖 दैनिक पाठ योजना (Lesson Planner)',
    mainTabDiagnostics: '📊 छात्र FLN दक्षता एवं उपचारात्मक (Diagnostics & Remediation)',
    mainTabMediaWorksheets: '🎬 स्मार्ट मीडिया, क्विज़ व वर्कशीट (Media & Worksheets)',
    // Quick Intent Hero Launcher Cards
    quickIntentHeading: 'त्वरित कार्य केंद्र — आज आप क्या तैयार करना चाहते हैं?',
    quickCard1Title: 'आज का पाठ तैयार करें',
    quickCard1Desc: 'मानक JCERT अध्याय चुनें और 14-सूत्रीय त्रिभाषी पाठ योजना व ऑडियो प्राप्त करें',
    quickCard2Title: 'कमजोर बच्चों की पहचान करें',
    quickCard2Desc: 'FLN दक्षताओं में पिछड़े बच्चों को देखें और 1-क्लिक में 3-दिवसीय उपचारात्मक योजना बनाएँ',
    quickCard3Title: 'वर्कशीट व क्विज़ बनाएँ',
    quickCard3Desc: 'वीडियो, PDF या नोट्स से प्रिंटेबल A4 अभ्यास पत्रक व 5-प्रश्नों की क्विज़ तैयार करें',
    // Step Wizard Badges & Titles
    step1Badge: 'चरण 1',
    step2Badge: 'चरण 2',
    step3Badge: 'चरण 3',
    step1Title: 'कक्षा, विषय एवं अध्याय चुनें',
    step2Title: 'स्थानीय परिवेशीय संदर्भ एवं पाठ विषय चुनें',
    step3Title: '14-सूत्रीय शिक्षण योजना तैयार करें',
    step1MediaTitle: 'मीडिया फ़ाइल अपलोड करें या टेम्पलेट चुनें',
    step2MediaTitle: 'कक्षा, विषय व परिवेशीय संदर्भ निर्धारित करें',
    step3MediaTitle: 'मीडिया का विश्लेषण करें और शिक्षण किट प्राप्त करें',
    helperTipLesson: '💡 सुझाव: अध्याय चुनते ही सत्यापित विषय और स्थानीय परिवेशीय संदर्भ स्वतः सेट हो जाते हैं।',
    helperTipRemediation: '💡 सुझाव: "उपचारात्मक पाठ बनाएँ" पर क्लिक करके स्थानीय वस्तुओं (TLM) आधारित 3-दिवसीय गतिविधि प्राप्त करें।',
    helperTipMedia: '💡 सुझाव: आप कोई भी कहानी पेस्ट कर सकते हैं या स्कूल वीडियो अपलोड करके स्वतः वर्कशीट व क्विज़ बना सकते हैं।',
    competencyMatrixTitle: 'निपुण भारत FLN दक्षता हीटमैप (Competency Mastery Matrix)',
    competencyMatrixSubtitle: '8 मुख्य भाषा एवं गणित दक्षताओं में बच्चों का प्रदर्शन',
    chooseGrade: 'कक्षा चुनें:',
    domainLanguage: '📖 भाषा',
    domainMath: '🔢 गणित',
    targetGoal: 'लक्ष्य:',
    strugglingLabel: 'कमजोर',
    learningGapsAlert: 'सीखने में अंतर — तत्काल सुधारात्मक अभ्यास आवश्यक',
    attentionListCount: 'छात्र ध्यानाकर्षण सूची में',
    weaknessLabel: 'कमी:',
    generateRemediationBtn: 'उपचारात्मक पाठ बनाएँ',
    generatingRemediation: 'बनाया जा रहा है...',
    remediationTitle: '3-दिवसीय उपचारात्मक योजना:',
    competencyLabel: 'दक्षता:',
    dayLabel: 'दिन',
    tlmLabel: '🛠️ TLM सामग्री:',
    teacherTip: '💡 शिक्षक सलाह:',
    printBtn: 'प्रिंट करें',
    modeOfficialTitle: 'मानक JCERT पाठ्यपुस्तक आधारित शिक्षण स्टूडियो (Official JCERT Curriculum)',
    modeUploadTitle: 'बाह्य पाठ व सामग्री अपलोड एवं स्वतः-सृजन स्टूडियो (External Media Ingestion)',
    modeOfficialDesc: 'झारखंड सरकार की मानक प्राथमिक पाठ्यपुस्तकों (मांदर, सखुआ, सारंगी, गणित) से अध्याय चुनें।',
    modeUploadDesc: 'कोई भी बाहरी पाठ, वीडियो, PDF या नोट्स अपलोड करें — AI स्वतः 14-सूत्रीय पाठ, क्विज़ व A4 वर्कशीट बनाएगा।',
    modeOfficialTab: 'JCERT पाठ्यपुस्तक',
    modeUploadTab: 'बाहरी पाठ अपलोड / निर्माण',
    lessonStudioTitle: 'AI पाठ योजना निर्माता (14-Point Grounded Pedagogical Studio)',
    selectedChapterLabel: 'चयनित अध्याय:',
    generatePlanBtn: '✨ 14-सूत्रीय पाठ योजना बनाएँ (Generate Plan)',
    generatingPlan: 'पाठ तैयार हो रहा है...',
    topicInputLabel: 'सत्यापित पाठ / प्रकरण (Topic):',
    topicInputPlaceholder: 'उदा: पाठ 1: सवेरा और सरना',
    themeSelectorLabel: 'स्थानीय परिवेशीय संदर्भ (Realia Theme):',
    themeForest: 'गाँव एवं प्रकृति (Forest & Trees - सरना/साल)',
    themeAgri: 'खेती एवं फसल (Agriculture & Harvest - धान/मड़ुआ)',
    themeMarket: 'साप्ताहिक हाट / बाजार (Weekly Haat - महुआ/टोकरी)',
    themeFestivals: 'पारंपरिक परब / त्योहार (Festivals - सोहराय/सरहुल)',
    uploadStudioTitle: 'मल्टी-मीडिया व बाह्य सामग्री अपलोड शिक्षण स्टूडियो (Video, PDF, Audio & Doc Suite)',
    uploadStudioDesc: 'शिक्षण वीडियो (.MP4/.WEBM), पाठ्यपुस्तक PDF, ऑडियो नोट्स या कोई भी दस्तावेज़ अपलोड करें — AI स्वतः वीडियो विश्लेषण, 14-सूत्रीय त्रिभाषी पाठ, NIPUN क्विज़ व A4 वर्कशीट तैयार करेगा।',
    analyzeGenerateBtn: '✨ शिक्षण किट बनाएँ (Analyze Media & Generate)',
    analyzingMedia: 'मीडिया का गहन विश्लेषण हो रहा है...',
    selectSourceFormat: 'अपलोड स्रोत का प्रकार चुनें (Select Source Format):',
    quickTemplatesTitle: 'झारखंडी स्थानीय परिवेशीय त्वरित टेम्पलेट (Quick Templates):',
    dropzoneLabelVideo: 'वीडियो फ़ाइल (.mp4, .webm) चुनें या ड्रैग करें',
    dropzoneLabelPdf: 'PDF पाठ्यपुस्तक या नोट्स चुनें',
    dropzoneLabelAudio: 'ऑडियो रिकॉर्डिंग (.mp3, .wav) चुनें',
    dropzoneLabelDoc: 'फ़ाइल चुनें या यहाँ ड्रैग करें',
    dropzoneSupportedTypes: '🎬 Video, 📄 PDF, 🎙️ Audio, 📝 Doc, ✍️ Text समर्थित',
    videoPreviewTitle: 'वीडियो पूर्वावलोकन (Video Player Preview)',
    audioPreviewTitle: 'ऑडियो पूर्वावलोकन (Audio Player)',
    extractedNotesLabel: '2. पाठ्य सामग्री / वीडियो विवरण (Extracted Content / Notes):',
    notesPlaceholder: 'यहाँ अपने पाठ का विवरण, कहानी, वीडियो नोट्स या शिक्षण सामग्री पेस्ट करें... जैसे: "पाठ 1: सोहराय और पशु मेला। हमारे संथाल और मुंडा गाँवों में कार्तिक अमावस्या पर सोहराय का भव्य पर्व मनाया जाता है..."',
    charCount: 'वर्ण',
    wordCount: 'शब्द',
    targetGradeLabel: 'लक्षित कक्षा (Grade):',
    targetSubjectLabel: 'विषय (Subject):',
    contextThemeLabel: 'परिवेशीय संदर्भ (Context Theme):',
    saveToDbBtn: 'स्कूल डेटाबेस में सुरक्षित करें',
    printA4Btn: 'प्रिंट करें (A4)',
    worksheetStudioBtn: 'वर्कशीट स्टूडियो',
    tabVideoIntel: '0. वीडियो / मीडिया विश्लेषण',
    tabLessonPlan: '1. 14-सूत्रीय पाठ योजना',
    tabAssessmentQuiz: '2. सतत मूल्यांकन क्विज़ (5 प्रश्न)',
    tabWorksheets: '3. प्रिंटेबल A4 द्विभाषी वर्कशीट',
    videoTimelineTitle: 'दृश्य-श्रव्य शिक्षण विश्लेषण एवं समय-चिह्न (Video Timeline Intelligence)',
    durationLabel: 'अवधि:',
    totalPagesLabel: 'कुल पृष्ठ:',
    audioPlayerTitle: 'ऑडियो पाठ प्लेयर (Audio Listening Player)',
    extractionMetricsTitle: '📊 मीडिया निष्कर्षण मेट्रिक्स (Media Extraction Metrics)',
    sourceFormatLabel: 'स्रोत प्रारूप',
    fileSizeLabel: 'फ़ाइल आकार',
    motherTongueBridgeLabel: 'मातृभाषा सेतु',
    flnAlignmentLabel: 'FLN संरेखण',
    interactiveMilestonesTitle: '⏱️ अध्याय समय-चिह्न (Interactive Milestones):',
    clickTimestampHint: 'समय पर क्लिक करके सीधे उस भाग पर जाएँ',
    realiaTagsTitle: '🌿 पहचाने गए स्थानीय शिक्षण उपादान (Realia TLM Tags):',
    quizTotalMarks: 'कुल अंक:',
    quizPassingMarks: 'उत्तीर्ण:',
    quizPrintBtn: 'प्रश्नोत्तरी प्रिंट करें',
    quizExplanation: 'स्पष्टीकरण:',
    submitQuizBtn: 'उत्तर सबमिट करें व परिणाम देखें (Submit Answers)',
    quizResultTitle: '🎉 मूल्यांकन परिणाम:',
    tryAgainBtn: 'पुनः प्रयास करें (Try Again)',
    worksheetBannerTitle: 'झारखंड प्राथमिक विद्यालय द्विभाषी अभ्यास पत्रक (NIPUN BILINGUAL WORKSHEET)',
    studentNameLabel: 'छात्र का नाम: ______________________',
    dateLabel: 'दिनांक: ____________',
    teacherSignLabel: 'हस्ताक्षर: ____________',
    wsSection1Title: 'अभ्यास 1: चित्र एवं मातृभाषा शब्द मिलान (Match Realia with Tribal Words)',
    wsSection2Title: 'अभ्यास 2: मूर्त वस्तुएँ गिनें और मातृभाषा संख्या लिखें (Count Objects)',
    wsSection3Title: 'अभ्यास 3: वर्ण एवं शब्द सुलेखन अभ्यास (Letter Tracing & Sound)',
    wsSection4Title: 'अभ्यास 4: छूटे हुए शब्द भरें (Fill in the Missing Words)',
    wsMatchHint: 'मिलान करें ⚪',
    wsPrintBtn: 'वर्कशीट प्रिंट करें (A4 Print Ready)',
    planHeaderBadge: 'त्रैभाषिक शिक्षण योजना (Trilingual Pedagogical Plan)',
    planTrilingualBadge: 'त्रैभाषिक शिक्षण योजना',
    legendTier1: 'प्राथमिक स्तर (Tier 1)',
    legendTier1Desc: `मातृभाषा (${pack.nameNative}) — Native Script`,
    legendTier2: 'राज्य संपर्क सेतु (Tier 2)',
    legendTier2Desc: 'हिन्दी (Hindi Bridge)',
    legendTier3: 'वैश्विक माध्यम (Tier 3)',
    legendTier3Desc: 'English (Global Medium)',
    part1Title: 'भाग 1: आधारभूत शैक्षणिक संकल्पना (Core Pedagogical Foundations)',
    part2Title: 'भाग 2: मुख्य शब्दावली एवं लोककथा (Vocabulary Bridge & Cultural Immersion)',
    part3Title: 'भाग 3: कक्षा गतिविधि एवं सतत मूल्यांकन (Engagement & Assessment)',
    part4Title: 'भाग 4: गृहकार्य, उपचारात्मक एवं संवर्धन शिक्षण (Inclusive Support & Extension)',
    point1Title: '1. शिक्षण उद्देश्य (Learning Objective)',
    point2Title: '2. पूर्व-ज्ञान एवं तैयारी (Prerequisites)',
    point3Title: '3. शिक्षक शिक्षण विधि (Teacher Pedagogy)',
    point4Title: '4. मातृभाषा में मुख्य व्याख्या (Immersion)',
    point5Title: '5. परिवेशीय मूर्त उदाहरण एवं कक्षा संवाद (Localized Realia)',
    point6Title: '6. मुख्य शब्दावली सेतु (Essential Vocabulary Bridge)',
    point7Title: '7. स्थानीय लोककथा एवं गतिविधि (Story & Activity)',
    point8Title: '8. श्यामपट्ट कार्य (Blackboard Activity)',
    point9Title: '9. छात्र अभ्यास कार्य (Student Practice)',
    point10Title: '10. समझ परख प्रश्न (Comprehension Questions)',
    point11Title: '11. सतत मूल्यांकन (Formative Evaluation)',
    point12Title: '12. गृहकार्य एवं समुदाय जुड़ाव (Homework)',
    point13Title: '13. उपचारात्मक शिक्षण (Remedial)',
    point14Title: '14. संवर्धन गतिविधि (Extension)',
    listenAudioBtn: 'सुनें',
    stopAudioBtn: 'रोकें',
    dialogueTribalLabel: `🌿 ${pack.nameNative} संवाद`,
    dialogueHindiLabel: '🇮🇳 हिन्दी संवाद',
    dialogueEnglishLabel: '🌐 English Dialogue',
    storyMoralLabel: '💡 कहानी की सीख (Moral):',
    provenanceSource: 'स्रोत: JCERT झारखंड प्राथमिक पाठ्यक्रम एवं निपुण भारत दिशानिर्देश (Trilingual RAG-Grounded Engine)',
    provenanceStatus: 'CURRICULUM_ALIGNED (0.0 Hallucination)'
  };
};

export const getLocalizedQuickTemplates = (uiLanguage: UILanguage) => {
  if (uiLanguage === 'english') {
    return [
      {
        id: 'sohrai',
        title: '🌾 Sohrai Harvest & Cattle Festival',
        grade: 'Class 1',
        subject: 'Language & Literacy',
        theme: 'festivals',
        content: `Lesson: Sohrai Harvest and Cattle Celebration\nGrade: Class 1\nSubject: Language & Literacy\nIn our Santhal and Munda villages, Sohrai is celebrated during the month of Kartik after the autumn harvest. Beautiful geometric Sohrai murals are painted on clay walls. Farmers wash their cattle, apply vermilion and mustard oil on their horns, and show gratitude. In the evening, the rhythmic beats of the Mandar drum echo across the Akhra as villagers dance together in harmony.`
      },
      {
        id: 'sal_forest',
        title: '🌳 Sacred Sal Forest & Rivers',
        grade: 'Class 2',
        subject: 'Environmental Studies (EVS)',
        theme: 'village_nature',
        content: `Lesson: The Sacred Sal Forest and Clean Rivers\nGrade: Class 2\nSubject: Environmental Studies\nAcross the hills of Jharkhand, tall Sal (Sakhua / Sarjom) trees protect the earth. Sal leaves are used to make traditional leaf plates, and sacred white blossoms (Baha) are offered during the Sarhul spring festival. Clear streams flow through the grove where birds and forest animals gather. Protecting our natural environment is our sacred shared duty.`
      },
      {
        id: 'weekly_haat',
        title: '🧺 Weekly Village Haat & Fruit Counting',
        grade: 'Class 1',
        subject: 'Foundational Numeracy (Mathematics)',
        theme: 'weekly_market',
        content: `Lesson: Shopping and Counting at the Village Haat\nGrade: Class 1\nSubject: Foundational Numeracy\nBirsa and Singo visited the bustling weekly haat with their mother. There were 5 woven bamboo baskets filled with Mahua fruits. They bought 3 guavas and 4 bananas. The vendor used small river pebbles to count and gave them 7 fruits in total. Children learned counting from 1 to 10 using natural village objects.`
      },
      {
        id: 'karam_dance',
        title: '🥁 Traditional Mandar & Karam Dance',
        grade: 'Class 3',
        subject: 'Arts & Cultural Heritage',
        theme: 'festivals',
        content: `Lesson: The Mandar Rhythm and Karam Puja\nGrade: Class 3\nSubject: Arts & Cultural Heritage\nDuring the monsoon month of Bhado, youth plant a sacred Karam branch in the village Akhra. Dressed in traditional handwoven attire, boys play the Mandar and flute while girls hold hands and move in graceful circular steps. Elders narrate ancient folktales about brotherhood and nature harmony.`
      }
    ];
  }

  // Default Hindi
  return [
    {
      id: 'sohrai',
      title: '🌾 सोहराय पर्व व पशु पूजा',
      grade: 'Class 1',
      subject: 'भाषा एवं साक्षरता (Language & Literacy)',
      theme: 'festivals',
      content: `पाठ: सोहराय और पशु मेला\nकक्षा: 1\nविषय: भाषा एवं साक्षरता\nहमारे संथाल और मुंडा गाँवों में कार्तिक मास में सोहराय का भव्य पारंपरिक पर्व मनाया जाता है। इस दिन घर की दीवारों पर सुंदर सोहराय चित्रकला उकेरी जाती है। किसान अपने गाय, बैल और बछड़ों को नहलाकर उनके सींगों पर तेल व सिंदूर लगाते हैं और उनकी पूजा करते हैं। शाम को अखड़ा में मांदर बजता है और सभी लोग पारंपरिक गीत गाकर नृत्य करते हैं।`
    },
    {
      id: 'sal_forest',
      title: '🌳 सखुआ का जंगल व नदियाँ',
      grade: 'Class 2',
      subject: 'पर्यावरण अध्ययन (EVS)',
      theme: 'village_nature',
      content: `पाठ: सखुआ का जंगल और निर्मल नदियाँ\nकक्षा: 2\nविषय: पर्यावरण अध्ययन\nझारखंड के जंगलों में सखुआ (साल) के ऊंचे-ऊंचे पवित्र पेड़ पाए जाते हैं। सखुआ के पत्तों से दोना-पत्तल बनाए जाते हैं और इसके फूल (बाहा) सरहुल पर्व में पूजे जाते हैं। जंगल के पास से बहने वाली नदी में निर्मल जल बहता है जहाँ रंग-बिरंगी चिड़ियाँ और जानवर पानी पीने आते हैं। प्रकृति की रक्षा करना हम सबका कर्तव्य है।`
    },
    {
      id: 'weekly_haat',
      title: '🧺 साप्ताहिक हाट व फल गिनती',
      grade: 'Class 1',
      subject: 'गणित ज्ञान (Foundational Numeracy)',
      theme: 'weekly_market',
      content: `पाठ: साप्ताहिक हाट में खरीदारी और गिनती\nकक्षा: 1\nविषय: गणित ज्ञान\nगाँव के साप्ताहिक हाट में बिरसा और सिंगो अपनी माँ के साथ गए। हाट में 5 टोकरियाँ थीं जिनमें महुआ के फल रखे थे। उन्होंने 3 अमरूद और 4 केले खरीदे। दुकानदार ने मिट्टी की गोलियों और कंकड़ों से गिनती करके कुल 7 फल दिए। बच्चों ने खेल-खेल में 1 से 10 तक गिनती सीखी।`
    },
    {
      id: 'karam_dance',
      title: '🥁 पारंपरिक मांदर व करम नृत्य',
      grade: 'Class 3',
      subject: 'भाषा एवं संस्कृति (Arts & Culture)',
      theme: 'festivals',
      content: `पाठ: मांदर की थाप और करम पूजा\nकक्षा: 3\nविषय: भाषा एवं संस्कृति\nभादो मास में करम का त्योहार हर्षोल्लास से मनाया जाता है। करम डाल को गाँव के अखड़ा में गाड़कर पूजा की जाती है। सभी बच्चे और बड़े पारंपरिक वेशभूषा में मांदर और रुतु की धुन पर गोल घेरा बनाकर नृत्य करते हैं। बड़े-बुजुर्ग पारंपरिक लोककथाएँ सुनाते हैं और प्रकृति के प्रति आभार व्यक्त करते हैं।`
    }
  ];
};
