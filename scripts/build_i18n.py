# -*- coding: utf-8 -*-
import os

i18n_content = '''import { UILanguage } from '../types';

export interface TranslationDictionary {
  nav: {
    brand: string;
    tagline: string;
    overview: string;
    student_studio: string;
    teacher_studio: string;
    curriculum: string;
    voice_bridge: string;
    assessments: string;
    worksheets: string;
    practice: string;
    vault: string;
    admin: string;
    sync: string;
    role: string;
    role_student: string;
    role_teacher: string;
    role_validator: string;
    role_admin: string;
    language_select: string;
    offline_status: string;
    diagnostics: string;
    offline_mode_label: string;
  };
  common: {
    save: string;
    download: string;
    print: string;
    play_audio: string;
    record_oral: string;
    submit: string;
    next: string;
    previous: string;
    cancel: string;
    loading: string;
    verified: string;
    search: string;
    filter: string;
    class_label: string;
    subject_label: string;
    chapter_label: string;
    refresh: string;
    close: string;
    all: string;
    select_prompt: string;
    success: string;
    error: string;
  };
  home: {
    hero_title: string;
    hero_subtitle: string;
    badge_offline: string;
    badge_nipun: string;
    quick_launch: string;
    metric_lessons: string;
    metric_languages: string;
    metric_schools: string;
    metric_fln: string;
    cta_student: string;
    cta_teacher: string;
    cta_curriculum: string;
    cta_assessment: string;
    cta_worksheets: string;
  };
  student: {
    greeting: string;
    choose_grade: string;
    tutor_title: string;
    tutor_desc: string;
    ask_tutor: string;
    story_title: string;
    story_desc: string;
    start_story: string;
    take_assessment: string;
    practice_phonics: string;
    audio_listen: string;
    score_badge: string;
  };
  teacher: {
    studio_title: string;
    studio_desc: string;
    tab_video: string;
    tab_lesson: string;
    tab_quiz: string;
    tab_worksheets: string;
    upload_title: string;
    upload_desc: string;
    generate_suite: string;
    milestones_title: string;
    save_lesson_local: string;
    pedagogical_14_points: string;
    realia_guideline: string;
  };
  curriculum: {
    title: string;
    desc: string;
    select_class: string;
    select_subject: string;
    textbook_catalog: string;
    learning_outcomes: string;
    pedagogical_hints: string;
    view_chapters: string;
  };
  assessments: {
    title: string;
    desc: string;
    mode_official: string;
    mode_upload: string;
    start_exam: string;
    time_left: string;
    question: string;
    oral_reading_prompt: string;
    record_speech: string;
    submit_exam: string;
    report_card_title: string;
    download_report: string;
    nipun_mastery: string;
  };
  worksheets: {
    title: string;
    desc: string;
    mode_official: string;
    mode_upload: string;
    type_match: string;
    type_count: string;
    type_trace: string;
    type_fill: string;
    download_pdf: string;
    print_ready_badge: string;
    student_name: string;
    date: string;
    teacher_sign: string;
  };
  voice: {
    title: string;
    desc: string;
    speak_button: string;
    listening: string;
    translating: string;
    detected_speech: string;
    pronunciation_guide: string;
  };
  vault: {
    title: string;
    desc: string;
    submit_contribution: string;
    audio_sample: string;
    dialect_label: string;
    verified_entries: string;
  };
  admin: {
    title: string;
    desc: string;
    total_assessments: string;
    avg_score: string;
    fln_mastery: string;
    school_coverage: string;
  };
}

export const UI_TRANSLATIONS: Record<UILanguage, TranslationDictionary> = {
  english: {
    nav: {
      brand: 'BHASHASETU',
      tagline: 'Jharkhand 100% Self-Contained MTB-MLE Operating System • JCERT & NIPUN FLN',
      overview: 'Overview',
      student_studio: 'Student Studio',
      teacher_studio: 'Teacher Studio',
      curriculum: 'JCERT Curriculum',
      voice_bridge: 'Voice Bridge',
      assessments: 'Assessments & FLN',
      worksheets: 'Worksheet Studio',
      practice: 'Phonics Arena',
      vault: 'Community Vault',
      admin: 'District Analytics',
      sync: 'Offline Sync',
      role: 'Role:',
      role_student: 'Student',
      role_teacher: 'Teacher',
      role_validator: 'Validator',
      role_admin: 'Admin',
      language_select: 'UI Language',
      offline_status: '100% Offline Active',
      diagnostics: 'System Health',
      offline_mode_label: 'Offline Mode'
    },
    common: {
      save: 'Save',
      download: 'Download',
      print: 'Print A4 PDF',
      play_audio: 'Listen Pronunciation',
      record_oral: 'Record Voice',
      submit: 'Submit',
      next: 'Next',
      previous: 'Previous',
      cancel: 'Cancel',
      loading: 'Loading...',
      verified: 'Verified',
      search: 'Search...',
      filter: 'Filter',
      class_label: 'Class',
      subject_label: 'Subject',
      chapter_label: 'Chapter',
      refresh: 'Refresh',
      close: 'Close',
      all: 'All',
      select_prompt: 'Select an option',
      success: 'Success',
      error: 'Error'
    },
    home: {
      hero_title: 'Mother Tongue Based Multilingual Education (MTB-MLE)',
      hero_subtitle: 'Empowering Jharkhand tribal children to learn in their native languages with 100% offline edge AI, official JCERT curriculum, and NIPUN Bharat FLN mastery.',
      badge_offline: '100% Edge Offline (Zero Internet)',
      badge_nipun: 'NIPUN Bharat FLN Aligned',
      quick_launch: 'Quick Learning Portals',
      metric_lessons: 'JCERT Lessons',
      metric_languages: 'Tribal Languages',
      metric_schools: 'Rural Schools Ready',
      metric_fln: 'FLN Foundational Targets',
      cta_student: 'Launch Student Studio',
      cta_teacher: 'Open Teacher Pedagogy Studio',
      cta_curriculum: 'Explore JCERT Textbooks',
      cta_assessment: 'Start NIPUN Assessments',
      cta_worksheets: 'Generate Printable Worksheets'
    },
    student: {
      greeting: 'Welcome, Little Learner!',
      choose_grade: 'Choose Your Class',
      tutor_title: 'Socratic Child AI Tutor',
      tutor_desc: 'Ask any question in your mother tongue and learn step-by-step with localized village examples!',
      ask_tutor: 'Ask a Question in Mother Tongue',
      story_title: 'Bilingual Folklore & Stories',
      story_desc: 'Read and listen to traditional tribal stories with line-by-line translations and audio pronunciation.',
      start_story: 'Read Story',
      take_assessment: 'Take 5-Question Quiz',
      practice_phonics: 'Practice Letter Sounds',
      audio_listen: 'Listen to Voice',
      score_badge: 'Mastery Star'
    },
    teacher: {
      studio_title: 'Teacher Pedagogy Studio & Lesson Suite',
      studio_desc: 'Generate comprehensive 14-point trilingual lesson plans, video intelligence milestones, formative quizzes, and printable worksheets.',
      tab_video: 'Video Intelligence',
      tab_lesson: '14-Point Lesson Plan',
      tab_quiz: 'NIPUN Formative Quiz',
      tab_worksheets: 'Printable Worksheets',
      upload_title: 'Upload External Educational Media',
      upload_desc: 'Upload Videos (.mp4), PDF Textbooks (.pdf), Audio Lessons (.mp3), or Notes (.docx/.txt) to generate authentic trilingual lesson suites.',
      generate_suite: 'Generate Complete Lesson Suite from Media',
      milestones_title: 'Pedagogical Video Milestones',
      save_lesson_local: 'Save Lesson to Local SQLite',
      pedagogical_14_points: '14-Point Pedagogical Framework',
      realia_guideline: 'Local Realia & Concrete TLM'
    },
    curriculum: {
      title: 'JCERT Official Textbook Curriculum Hub',
      desc: 'Browse official Jharkhand state textbooks for Classes 1, 2, and 3 with trilingual lesson maps, audio recordings, and competencies.',
      select_class: 'Select Class',
      select_subject: 'Select Subject',
      textbook_catalog: 'Official Textbooks Catalog',
      learning_outcomes: 'Key Learning Outcomes',
      pedagogical_hints: 'Teacher Instructions & Local Realia Hints',
      view_chapters: 'View Chapter Suite'
    },
    assessments: {
      title: 'NIPUN Bharat FLN Assessment & Evaluation Center',
      desc: 'Formative trilingual assessments measuring vocabulary, realia recognition, reading fluency, and foundational numeracy.',
      mode_official: '📚 Official JCERT Chapters',
      mode_upload: '📤 Upload Media for Dynamic Quiz',
      start_exam: 'Start CBT Assessment',
      time_left: 'Time Remaining',
      question: 'Question',
      oral_reading_prompt: 'Oral Reading Fluency Test',
      record_speech: 'Record Oral Response',
      submit_exam: 'Submit Assessment',
      report_card_title: 'Official NIPUN Bharat Progress Report Card',
      download_report: 'Download Report Card PDF',
      nipun_mastery: 'NIPUN Mastery Level'
    },
    worksheets: {
      title: 'NIPUN Bharat Bilingual Worksheet & Flashcard Studio',
      desc: 'Auto-generate printable high-resolution A4 worksheets (Match, Count, Trace, Fill) and interactive visual flashcards.',
      mode_official: '📚 Official JCERT / NCERT Chapters',
      mode_upload: '📤 Upload Video / PDF / Doc for Dynamic Worksheets',
      type_match: '1. Picture-to-Word Matching (मिलान करो)',
      type_count: '2. FLN Number Counting (गिनो और लिखो)',
      type_trace: '3. Letter Tracing & Writing (अक्षर अभ्यास)',
      type_fill: '4. Sentence & Word Construction (खाली स्थान भरो)',
      download_pdf: 'Download Printable A4 PDF',
      print_ready_badge: 'High-Contrast Village Printer Ready',
      student_name: 'Student Name',
      date: 'Date',
      teacher_sign: 'Teacher Sign'
    },
    voice: {
      title: 'Real-Time Trilingual Voice Bridge Studio',
      desc: 'Speak naturally in Hindi or Tribal mother tongues with offline phonetics, pronunciation feedback, and audio playback.',
      speak_button: 'Hold to Speak',
      listening: 'Listening...',
      translating: 'Translating with 0ms Offline NLP...',
      detected_speech: 'Detected Speech',
      pronunciation_guide: 'Phonetic Pronunciation Guide'
    },
    vault: {
      title: 'Community Language & Folklore Preservation Vault',
      desc: 'Contribute and preserve indigenous tribal vocabulary, folklore, proverbs, and audio recordings with multi-tier validation.',
      submit_contribution: 'Contribute Native Words / Stories',
      audio_sample: 'Native Audio Sample',
      dialect_label: 'Regional Dialect',
      verified_entries: 'Verified Community Heritage Entries'
    },
    admin: {
      title: 'District Education & FLN Analytics Dashboard',
      desc: 'Real-time offline tracking of tribal student learning progress, competency mastery rates, and school adoption across Jharkhand.',
      total_assessments: 'Total Assessments Evaluated',
      avg_score: 'Average FLN Proficiency Score',
      fln_mastery: 'NIPUN Mastery Ratio',
      school_coverage: 'Participating Primary Schools'
    }
  },

  hindi: {
    nav: {
      brand: 'भाषा सेतु (BHASHASETU)',
      tagline: 'झारखण्ड 100% स्व-निहित मातृभाषा आधारित बहुभाषी शिक्षण ऑपरेटिंग सिस्टम • JCERT एवं NIPUN FLN',
      overview: 'अवलोकन (Overview)',
      student_studio: 'विद्यार्थी मंच (Student)',
      teacher_studio: 'शिक्षक स्टूडियो (Teacher)',
      curriculum: 'JCERT पाठ्यक्रम (Curriculum)',
      voice_bridge: 'ध्वनि सेतु (Voice Bridge)',
      assessments: 'आकलन एवं FLN (Assessments)',
      worksheets: 'कार्यपत्रक स्टूडियो (Worksheets)',
      practice: 'ध्वनि अभ्यास (Phonics)',
      vault: 'भाषा तिजोरी (Vault)',
      admin: 'जिला एनालिटिक्स (Admin)',
      sync: 'ऑफलाइन सिंक (Sync)',
      role: 'भूमिका:',
      role_student: 'विद्यार्थी',
      role_teacher: 'शिक्षक',
      role_validator: 'सत्यापनकर्ता',
      role_admin: 'प्रशासक',
      language_select: 'भाषा (Language)',
      offline_status: '100% ऑफलाइन सक्रिय',
      diagnostics: 'सिस्टम स्वास्थ्य',
      offline_mode_label: 'ऑफलाइन मोड'
    },
    common: {
      save: 'सुरक्षित करें',
      download: 'डाउनलोड करें',
      print: 'प्रिंट A4 PDF',
      play_audio: 'उच्चारण सुनें',
      record_oral: 'आवाज़ रिकॉर्ड करें',
      submit: 'जमा करें',
      next: 'अगला',
      previous: 'पिछला',
      cancel: 'रद्द करें',
      loading: 'लोड हो रहा है...',
      verified: 'सत्यापित',
      search: 'खोजें...',
      filter: 'फ़िल्टर',
      class_label: 'कक्षा',
      subject_label: 'विषय',
      chapter_label: 'अध्याय',
      refresh: 'ताज़ा करें',
      close: 'बंद करें',
      all: 'सभी',
      select_prompt: 'विकल्प चुनें',
      success: 'सफलता',
      error: 'त्रुटि'
    },
    home: {
      hero_title: 'मातृभाषा-आधारित बहुभाषी शिक्षण मंच (MTB-MLE)',
      hero_subtitle: 'झारखण्ड के जनजातीय बच्चों को उनकी मातृभाषा में 100% ऑफलाइन AI, आधिकारिक JCERT पाठ्यक्रम और NIPUN भारत FLN दक्षता के साथ सशक्त बनाना।',
      badge_offline: '100% एज ऑफलाइन (शून्य इंटरनेट)',
      badge_nipun: 'NIPUN भारत FLN आधारित',
      quick_launch: 'त्वरित शिक्षण पोर्टल',
      metric_lessons: 'JCERT पाठ',
      metric_languages: 'जनजातीय भाषाएँ',
      metric_schools: 'ग्रामीण विद्यालय तैयार',
      metric_fln: 'FLN बुनियादी लक्ष्य',
      cta_student: 'विद्यार्थी मंच खोलें',
      cta_teacher: 'शिक्षक स्टूडियो खोलें',
      cta_curriculum: 'JCERT पाठ्यपुस्तकें देखें',
      cta_assessment: 'NIPUN आकलन शुरू करें',
      cta_worksheets: 'कार्यपत्रक तैयार करें'
    },
    student: {
      greeting: 'स्वागत है, नन्हे विद्यार्थी!',
      choose_grade: 'अपनी कक्षा चुनें',
      tutor_title: 'सॉक्रेटीक बाल AI गुरु',
      tutor_desc: 'अपनी मातृभाषा में कोई भी सवाल पूछें और स्थानीय परिवेशीय उदाहरणों के साथ आसानी से सीखें!',
      ask_tutor: 'मातृभाषा में प्रश्न पूछें',
      story_title: 'द्विभाषी लोककथाएँ एवं कहानियाँ',
      story_desc: 'पारंपरिक जनजातीय कहानियों को पंक्ति-दर-पंक्ति अनुवाद और उच्चारण के साथ पढ़ें और सुनें।',
      start_story: 'कहानी पढ़ें',
      take_assessment: '5-प्रश्नों की प्रश्नोत्तरी दें',
      practice_phonics: 'अक्षर ध्वनि अभ्यास करें',
      audio_listen: 'आवाज़ सुनें',
      score_badge: 'निपुण सितारा'
    },
    teacher: {
      studio_title: 'शिक्षक शिक्षाशास्त्र स्टूडियो एवं पाठ निर्माण',
      studio_desc: '14-सूत्रीय त्रैभाषिक पाठ योजना, वीडियो विश्लेषण, निपुण प्रश्नोत्तरी और मुद्रण योग्य कार्यपत्रक बनाएँ।',
      tab_video: 'वीडियो विश्लेषण',
      tab_lesson: '14-सूत्रीय पाठ योजना',
      tab_quiz: 'निपुण प्रश्नोत्तरी',
      tab_worksheets: 'प्रिंट योग्य कार्यपत्रक',
      upload_title: 'शैक्षणिक वीडियो / PDF / सामग्री अपलोड करें',
      upload_desc: 'वीडियो (.mp4), PDF (.pdf), ऑडियो (.mp3) या दस्तावेज़ (.docx) अपलोड करके तुरंत त्रैभाषिक पाठ्य सामग्री बनाएँ।',
      generate_suite: 'अपलोड से संपूर्ण पाठ सामग्री तैयार करें',
      milestones_title: 'वीडियो शिक्षण चरण (Milestones)',
      save_lesson_local: 'पाठ को स्थानीय SQLite में सहेजें',
      pedagogical_14_points: '14-सूत्रीय शिक्षण संरचना',
      realia_guideline: 'स्थानीय मूर्त शिक्षण सामग्री (TLM)'
    },
    curriculum: {
      title: 'JCERT आधिकारिक पाठ्यपुस्तक पाठ्यक्रम हब',
      desc: 'कक्षा 1, 2 और 3 हेतु झारखण्ड राज्य पाठ्यपुस्तकों के त्रैभाषिक पाठ, ऑडियो उच्चारण और दक्षताओं का अन्वेषण करें।',
      select_class: 'कक्षा चुनें',
      select_subject: 'विषय चुनें',
      textbook_catalog: 'आधिकारिक पाठ्यपुस्तक सूची',
      learning_outcomes: 'मुख्य शिक्षण प्रतिफल (Outcomes)',
      pedagogical_hints: 'शिक्षक निर्देश एवं स्थानीय संदर्भ',
      view_chapters: 'अध्याय देखें'
    },
    assessments: {
      title: 'NIPUN भारत FLN मूल्यांकन एवं आकलन केंद्र',
      desc: 'मातृभाषा शब्दावली, मूर्त वस्तु पहचान, वाचन प्रवाह और बुनियादी संख्या ज्ञान का समग्र रचनात्मक मूल्यांकन।',
      mode_official: '📚 आधिकारिक JCERT अध्याय',
      mode_upload: '📤 सामग्री अपलोड से गतिशील प्रश्नोत्तरी',
      start_exam: 'CBT परीक्षा शुरू करें',
      time_left: 'शेष समय',
      question: 'प्रश्न',
      oral_reading_prompt: 'मौखिक पठन प्रवाह परीक्षा',
      record_speech: 'मौखिक उत्तर रिकॉर्ड करें',
      submit_exam: 'मूल्यांकन जमा करें',
      report_card_title: 'आधिकारिक NIPUN भारत प्रगति रिपोर्ट कार्ड',
      download_report: 'रिपोर्ट कार्ड PDF डाउनलोड करें',
      nipun_mastery: 'निपुण दक्षता स्तर'
    },
    worksheets: {
      title: 'NIPUN भारत द्विभाषी कार्यपत्रक एवं फ्लैशकार्ड स्टूडियो',
      desc: 'प्रिंट योग्य उच्च-कंट्रास्ट A4 कार्यपत्रक (मिलान, गिनती, अक्षर अभ्यास, वाक्य पूर्ति) और दृश्य फ्लैशकार्ड बनाएँ।',
      mode_official: '📚 आधिकारिक JCERT / NCERT अध्याय',
      mode_upload: '📤 वीडियो / PDF / दस्तावेज़ अपलोड से कार्यपत्रक',
      type_match: '1. Picture-to-Word Matching (चित्र-शब्द मिलान)',
      type_count: '2. FLN Number Counting (गिनो और लिखो)',
      type_trace: '3. Letter Tracing & Writing (अक्षर अभ्यास)',
      type_fill: '4. Sentence & Word Construction (खाली स्थान भरो)',
      download_pdf: 'प्रिंट हेतु PDF डाउनलोड करें (A4 Print)',
      print_ready_badge: 'ग्रामीण विद्यालय मुद्रण अनुकूल',
      student_name: 'छात्र का नाम',
      date: 'दिनांक',
      teacher_sign: 'अध्यापक हस्ताक्षर'
    },
    voice: {
      title: 'रीयल-टाइम त्रैभाषिक ध्वनि सेतु स्टूडियो',
      desc: 'हिन्दी या जनजातीय मातृभाषा में बोलें और तुरंत ऑफलाइन सटीक अनुवाद, उच्चारण एवं ध्वनि सुनें।',
      speak_button: 'बोलने हेतु दबाए रखें',
      listening: 'सुन रहा है...',
      translating: '0ms ऑफलाइन NLP द्वारा अनुवाद हो रहा है...',
      detected_speech: 'पहचाना गया वाचन',
      pronunciation_guide: 'उच्चारण मार्गदर्शिका'
    },
    vault: {
      title: 'सामुदायिक भाषा एवं लोक-संस्कृति संरक्षण तिजोरी',
      desc: 'जनजातीय शब्दावली, लोककथाओं, मुहावरों और ऑडियो रिकॉर्डिंग को संरक्षित करें और बहु-स्तरीय सत्यापन में योगदान दें।',
      submit_contribution: 'मातृभाषा शब्द / कथा साझा करें',
      audio_sample: 'मातृभाषा ऑडियो नमूना',
      dialect_label: 'क्षेत्रीय बोली / उपभाषा',
      verified_entries: 'सत्यापित सांस्कृतिक प्रविष्टियाँ'
    },
    admin: {
      title: 'जिला शिक्षा एवं FLN विश्लेषिकी डैशबोर्ड',
      desc: 'झारखण्ड भर में जनजातीय बच्चों की सीखने की प्रगति, दक्षता प्राप्ति दर और विद्यालयों की स्थिति का वास्तविक समय अवलोकन।',
      total_assessments: 'कुल मूल्यांकित परीक्षाएँ',
      avg_score: 'औसत FLN दक्षता स्कोर',
      fln_mastery: 'निपुण प्रवीणता अनुपात',
      school_coverage: 'सहभागी प्राथमिक विद्यालय'
    }
  },

  santhali: {
    nav: {
      brand: 'ᱵᱷᱟᱥᱟ ᱥᱮᱛᱩ (BHASHASETU)',
      tagline: 'ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱑᱐᱐% ᱟᱯᱱᱟᱨ ᱡᱟᱱᱟᱢ ᱟᱲᱟᱝ ᱥᱮᱪᱮᱫ ᱥᱤᱥᱴᱚᱢ • JCERT ᱟᱨ NIPUN FLN',
      overview: 'ᱢᱩᱬᱩᱛ ᱧᱮᱞ (Overview)',
      student_studio: 'ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱛᱷᱟᱱ (Student)',
      teacher_studio: 'ᱢᱟᱪᱮᱛ ᱥᱴᱩᱰᱤᱭᱳ (Teacher)',
      curriculum: 'JCERT ᱯᱟᱲᱦᱟᱣ (Curriculum)',
      voice_bridge: 'ᱟᱲᱟᱝ ᱥᱮᱛᱩ (Voice Bridge)',
      assessments: 'ᱵᱤᱰᱟᱹᱣ ᱟᱨ FLN (Assessments)',
      worksheets: 'ᱠᱟᱹᱢᱤ ᱥᱟᱠᱟᱢ (Worksheets)',
      practice: 'ᱨᱟᱦᱟ ᱟᱲᱟᱝ (Phonics)',
      vault: 'ᱯᱟᱹᱨᱥᱤ ᱵᱟᱠᱷᱳᱞ (Vault)',
      admin: 'ᱡᱤᱞᱟᱹ ᱞᱮᱠᱷᱟ (Admin)',
      sync: 'ᱚᱯᱷᱞᱟᱭᱤᱱ ᱥᱤᱝᱠ (Sync)',
      role: 'ᱴᱷᱟᱶ (Role):',
      role_student: 'ᱯᱟᱹᱴᱷᱩᱣᱟᱹ',
      role_teacher: 'ᱢᱟᱪᱮᱛ',
      role_validator: 'ᱯᱚᱨᱠᱷᱟᱣᱤᱡ',
      role_admin: 'ᱥᱟᱥᱚᱱᱤᱭᱟᱹ',
      language_select: 'ᱯᱟᱹᱨᱥᱤ (Language)',
      offline_status: '᱑᱐᱐% ᱚᱯᱷᱞᱟᱭᱤᱱ ᱪᱟᱹᱞᱩ',
      diagnostics: 'ᱥᱤᱥᱴᱚᱢ ᱦᱚᱲᱢᱚ',
      offline_mode_label: 'ᱚᱯᱷᱞᱟᱭᱤᱱ ᱨᱩᱯ'
    },
    common: {
      save: 'ᱫᱚᱦᱚᱭ ᱢᱮ (Save)',
      download: 'ᱰᱟᱣᱩᱱᱞᱳᱰ ᱢᱮ (Download)',
      print: 'A4 PDF ᱪᱷᱟᱯᱟ ᱢᱮ (Print)',
      play_audio: 'ᱟᱲᱟᱝ ᱟᱸᱡᱚᱢ ᱢᱮ (Listen)',
      record_oral: 'ᱟᱲᱟᱝ ᱨᱮᱠᱳᱨᱰ ᱢᱮ (Record)',
      submit: 'ᱡᱚᱢᱟ ᱢᱮ (Submit)',
      next: 'ᱞᱟᱦᱟ ᱛᱮ (Next)',
      previous: 'ᱛᱟᱭᱚᱢ ᱛᱮ (Previous)',
      cancel: 'ᱵᱟᱹᱜᱤ ᱢᱮ (Cancel)',
      loading: 'ᱞᱟᱦᱟᱜ ᱠᱟᱱᱟ...',
      verified: 'ᱥᱟᱹᱨᱤ ᱟᱠᱟᱱ (Verified)',
      search: 'ᱥᱮᱸᱫᱽᱨᱟᱭ ᱢᱮ...',
      filter: 'ᱵᱟᱪᱷᱟᱣ (Filter)',
      class_label: 'ᱪᱟᱱᱟᱪ (Class)',
      subject_label: 'ᱥᱟᱛᱟᱢ (Subject)',
      chapter_label: 'ᱯᱟᱲᱦᱟᱣ (Chapter)',
      refresh: 'ᱱᱟᱣᱟᱭ ᱢᱮ (Refresh)',
      close: 'ᱵᱚᱸᱫᱽ ᱢᱮ (Close)',
      all: 'ᱥᱟᱱᱟᱢ (All)',
      select_prompt: 'ᱢᱤᱫᱴᱟᱝ ᱵᱟᱪᱷᱟᱣ ᱢᱮ',
      success: 'ᱥᱟᱹᱛ ᱮᱱᱟ',
      error: 'ᱵᱷᱩᱞ ᱮᱱᱟ'
    },
    home: {
      hero_title: 'ᱡᱟᱱᱟᱢ ᱟᱲᱟᱝ ᱛᱮ ᱥᱮᱪᱮᱫ ᱦᱚᱨᱟ (MTB-MLE)',
      hero_subtitle: 'ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱨᱤᱱ ᱥᱟᱱᱛᱟᱲ ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ ᱟᱠᱚᱣᱟᱜ ᱡᱟᱱᱟᱢ ᱟᱲᱟᱝ ᱛᱮ ᱑᱐᱐% ᱚᱯᱷᱞᱟᱭᱤᱱ AI, JCERT ᱯᱚᱛᱚᱵ ᱟᱨ NIPUN FLN ᱫᱟᱲᱮ ᱮᱢ ᱞᱟᱹᱜᱤᱫ᱾',
      badge_offline: '᱑᱐᱐% ᱮᱡᱽ ᱚᱯᱷᱞᱟᱭᱤᱱ (Zero Internet)',
      badge_nipun: 'NIPUN Bharat FLN ᱥᱟᱶ ᱡᱚᱲᱟᱣ',
      quick_launch: 'ᱞᱚᱜᱚᱱ ᱥᱮᱪᱮᱫ ᱛᱷᱟᱱ ᱠᱚ',
      metric_lessons: 'JCERT ᱯᱟᱲᱦᱟᱣ ᱠᱚ',
      metric_languages: 'ᱡᱟᱱᱟᱢ ᱟᱲᱟᱝ ᱠᱚ',
      metric_schools: 'ᱟᱹᱛᱩ ᱤᱛᱩᱱ ᱟᱥᱲᱟ',
      metric_fln: 'FLN ᱢᱩᱬᱩᱛ ᱴᱟᱨᱜᱮᱴ',
      cta_student: 'ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱛᱷᱟᱱ ᱡᱷᱤᱡ ᱢᱮ',
      cta_teacher: 'ᱢᱟᱪᱮᱛ ᱥᱴᱩᱰᱤᱭᱳ ᱡᱷᱤᱡ ᱢᱮ',
      cta_curriculum: 'JCERT ᱯᱚᱛᱚᱵ ᱧᱮᱞ ᱢᱮ',
      cta_assessment: 'NIPUN ᱵᱤᱰᱟᱹᱣ ᱮᱦᱚᱵ ᱢᱮ',
      cta_worksheets: 'ᱠᱟᱹᱢᱤ ᱥᱟᱠᱟᱢ ᱵᱮᱱᱟᱣ ᱢᱮ'
    },
    student: {
      greeting: 'ᱥᱟᱜᱩᱱ ᱫᱟᱨᱟᱢ, ᱠᱟᱹᱴᱤᱡ ᱯᱟᱹᱴᱷᱩᱣᱟᱹ!',
      choose_grade: 'ᱟᱢᱟᱜ ᱪᱟᱱᱟᱪ (Class) ᱵᱟᱪᱷᱟᱣ ᱢᱮ',
      tutor_title: 'ᱥᱚᱠᱨᱮᱴᱤᱠ ᱜᱤᱫᱽᱨᱟᱹ AI ᱜᱩᱨᱩ',
      tutor_desc: 'ᱡᱟᱱᱟᱢ ᱟᱲᱟᱝ ᱛᱮ ᱡᱟᱦᱟᱸᱱᱟᱜ ᱠᱩᱠᱞᱤ ᱠᱩᱞᱤᱭ ᱢᱮ ᱟᱨ ᱟᱹᱛᱩ ᱡᱤᱱᱤᱥ ᱨᱮᱱᱟᱜ ᱫᱟᱹᱭᱠᱟᱹ ᱛᱮ ᱪᱮᱫᱚᱜ ᱢᱮ!',
      ask_tutor: 'ᱡᱟᱱᱟᱢ ᱟᱲᱟᱝ ᱛᱮ ᱠᱩᱠᱞᱤ ᱠᱩᱞᱤᱭ ᱢᱮ',
      story_title: 'ᱵᱟᱨ-ᱯᱟᱹᱨᱥᱤ ᱠᱟᱹᱦᱱᱤ ᱟᱨ ᱥᱮᱨᱮᱧ',
      story_desc: 'ᱟᱹᱛᱩ ᱠᱟᱹᱦᱱᱤ ᱠᱚ ᱥᱟᱱᱛᱟᱲᱤ ᱟᱨ ᱦᱤᱱᱫᱤ ᱛᱮ ᱯᱟᱲᱦᱟᱣ ᱢᱮ ᱟᱨ ᱟᱸᱡᱚᱢ ᱢᱮ᱾',
      start_story: 'ᱠᱟᱹᱦᱱᱤ ᱯᱟᱲᱦᱟᱣ ᱢᱮ',
      take_assessment: '᱕-ᱠᱩᱠᱞᱤ ᱵᱤᱰᱟᱹᱣ ᱮᱦᱚᱵ ᱢᱮ',
      practice_phonics: 'ᱚᱞ ᱪᱤᱠᱤ ᱨᱟᱦᱟ ᱟᱲᱟᱝ ᱪᱮᱫᱚᱜ ᱢᱮ',
      audio_listen: 'ᱟᱲᱟᱝ ᱟᱸᱡᱚᱢ ᱢᱮ',
      score_badge: 'ᱱᱤᱯᱩᱱ ᱤᱯᱤᱞ (Star)'
    },
    teacher: {
      studio_title: 'ᱢᱟᱪᱮᱛ ᱥᱮᱪᱮᱫ ᱥᱴᱩᱰᱤᱭᱳ ᱟᱨ ᱯᱟᱲᱦᱟᱣ ᱵᱮᱱᱟᱣ',
      studio_desc: '᱑᱔-ᱴᱩᱰᱟᱹᱜ ᱯᱮ-ᱯᱟᱹᱨᱥᱤ ᱞᱮᱥᱚᱱ ᱯᱞᱟᱱ, ᱵᱷᱤᱰᱤᱭᱳ ᱵᱤᱰᱟᱹᱣ, ᱠᱩᱠᱞᱤ ᱠᱩᱭᱤᱡᱽ ᱟᱨ ᱪᱷᱟᱯᱟ ᱠᱟᱹᱢᱤ ᱥᱟᱠᱟᱢ ᱵᱮᱱᱟᱣ ᱢᱮ᱾',
      tab_video: 'ᱵᱷᱤᱰᱤᱭᱳ ᱵᱤᱰᱟᱹᱣ (Video)',
      tab_lesson: '᱑᱔-ᱴᱩᱰᱟᱹᱜ ᱞᱮᱥᱚᱱ ᱯᱞᱟᱱ',
      tab_quiz: 'ᱱᱤᱯᱩᱱ ᱠᱩᱠᱞᱤ ᱵᱤᱰᱟᱹᱣ',
      tab_worksheets: 'ᱪᱷᱟᱯᱟ ᱠᱟᱹᱢᱤ ᱥᱟᱠᱟᱢ',
      upload_title: 'ᱵᱷᱤᱰᱤᱭᱳ / PDF / ᱥᱟᱛᱟᱢ ᱞᱟᱫᱮ (Upload) ᱢᱮ',
      upload_desc: 'ᱵᱷᱤᱰᱤᱭᱳ (.mp4), PDF (.pdf), ᱚᱰᱤᱭᱳ (.mp3) ᱥᱮ ᱚᱞ (.docx) ᱞᱟᱫᱮ ᱠᱟᱛᱮ ᱡᱟᱱᱟᱢ ᱟᱲᱟᱝ ᱞᱮᱥᱚᱱ ᱵᱮᱱᱟᱣ ᱢᱮ᱾',
      generate_suite: 'ᱞᱟᱫᱮ ᱡᱤᱱᱤᱥ ᱠᱷᱚᱱ ᱯᱩᱨᱟᱹ ᱯᱟᱲᱦᱟᱣ ᱵᱮᱱᱟᱣ ᱢᱮ',
      milestones_title: 'ᱵᱷᱤᱰᱤᱭᱳ ᱥᱮᱪᱮᱫ ᱴᱟᱭᱤᱢ-ᱞᱟᱭᱤᱱ (Milestones)',
      save_lesson_local: 'ᱯᱟᱲᱦᱟᱣ ᱞᱚᱠᱟᱞ SQLite ᱨᱮ ᱫᱚᱦᱚᱭ ᱢᱮ',
      pedagogical_14_points: '᱑᱔-ᱴᱩᱰᱟᱹᱜ ᱥᱮᱪᱮᱫ ᱜᱟᱲᱦᱚᱱ',
      realia_guideline: 'ᱟᱹᱛᱩ ᱨᱮᱱᱟᱜ ᱢᱩᱨᱛ ᱡᱤᱱᱤᱥ (Concrete TLM)'
    },
    curriculum: {
      title: 'JCERT ᱥᱚᱨᱠᱟᱨᱤ ᱯᱚᱛᱚᱵ ᱯᱟᱲᱦᱟᱣ ᱛᱷᱟᱱ',
      desc: 'ᱪᱟᱱᱟᱪ ᱑, ᱒ ᱟᱨ ᱓ ᱞᱟᱹᱜᱤᱫ ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱥᱚᱨᱠᱟᱨᱟᱜ ᱯᱚᱛᱚᱵ, ᱟᱲᱟᱝ ᱥᱟᱰᱮ ᱟᱨ ᱫᱟᱲᱮ ᱠᱚ ᱧᱮᱞ ᱢᱮ᱾',
      select_class: 'ᱪᱟᱱᱟᱪ ᱵᱟᱪᱷᱟᱣ ᱢᱮ',
      select_subject: 'ᱥᱟᱛᱟᱢ ᱵᱟᱪᱷᱟᱣ ᱢᱮ',
      textbook_catalog: 'ᱥᱚᱨᱠᱟᱨᱤ ᱯᱚᱛᱚᱵ ᱛᱟᱹᱞᱠᱟᱹ',
      learning_outcomes: 'ᱢᱩᱬᱩᱛ ᱪᱮᱫᱚᱜ ᱠᱟᱛᱷᱟ (Outcomes)',
      pedagogical_hints: 'ᱢᱟᱪᱮᱛ ᱫᱤᱥᱟᱹ ᱟᱨ ᱟᱹᱛᱩ ᱡᱤᱱᱤᱥ ᱩᱫᱩᱜ',
      view_chapters: 'ᱯᱟᱲᱦᱟᱣ ᱠᱚ ᱧᱮᱞ ᱢᱮ'
    },
    assessments: {
      title: 'NIPUN Bharat FLN ᱵᱤᱰᱟᱹᱣ ᱟᱨ ᱯᱚᱨᱠᱷᱟ ᱛᱷᱟᱱ',
      desc: 'ᱡᱟᱱᱟᱢ ᱟᱲᱟᱝ ᱟᱹᱲᱟᱹ ᱵᱟᱰᱟᱭ, ᱡᱤᱱᱤᱥ ᱪᱤᱱᱦᱟᱹᱣ, ᱯᱟᱲᱦᱟᱣ ᱨᱟᱦᱟ ᱟᱨ ᱮᱞ ᱞᱮᱠᱷᱟ ᱨᱮᱱᱟᱜ ᱥᱟᱹᱨᱤ ᱵᱤᱰᱟᱹᱣ᱾',
      mode_official: '📚 JCERT ᱥᱚᱨᱠᱟᱨᱤ ᱯᱟᱲᱦᱟᱣ',
      mode_upload: '📤 ᱞᱟᱫᱮ ᱡᱤᱱᱤᱥ ᱠᱷᱚᱱ ᱵᱤᱰᱟᱹᱣ ᱵᱮᱱᱟᱣ',
      start_exam: 'CBT ᱵᱤᱰᱟᱹᱣ ᱮᱦᱚᱵ ᱢᱮ',
      time_left: 'ᱥᱟᱨᱮᱡ ᱚᱠᱛᱚ',
      question: 'ᱠᱩᱠᱞᱤ',
      oral_reading_prompt: 'ᱢᱚᱪᱟ ᱛᱮ ᱯᱟᱲᱦᱟᱣ ᱨᱟᱦᱟ ᱵᱤᱰᱟᱹᱣ',
      record_speech: 'ᱟᱢᱟᱜ ᱟᱲᱟᱝ ᱨᱮᱠᱳᱨᱰ ᱢᱮ',
      submit_exam: 'ᱵᱤᱰᱟᱹᱣ ᱡᱚᱢᱟ ᱢᱮ',
      report_card_title: 'ᱥᱚᱨᱠᱟᱨᱤ NIPUN Bharat ᱨᱤᱯᱳᱨᱴ ᱠᱟᱨᱰ',
      download_report: 'ᱨᱤᱯᱳᱨᱴ ᱠᱟᱨᱰ PDF ᱰᱟᱣᱩᱱᱞᱳᱰ ᱢᱮ',
      nipun_mastery: 'ᱱᱤᱯᱩᱱ ᱯᱟᱹᱨᱩᱠᱷᱤᱭᱟᱹ ᱴᱷᱟᱶ'
    },
    worksheets: {
      title: 'NIPUN Bharat ᱵᱟᱨ-ᱯᱟᱹᱨᱥᱤ ᱠᱟᱹᱢᱤ ᱥᱟᱠᱟᱢ ᱟᱨ ᱯᱷᱞᱮᱥᱠᱟᱨᱰ',
      desc: 'ᱪᱷᱟᱯᱟ ᱞᱟᱹᱜᱤᱫ A4 ᱠᱟᱹᱢᱤ ᱥᱟᱠᱟᱢ (ᱡᱚᱲᱟᱣ, ᱞᱮᱠᱷᱟ, ᱚᱞ ᱪᱤᱠᱤ ᱪᱮᱫᱚᱜ, ᱯᱮᱨᱮᱡ) ᱟᱨ ᱪᱤᱛᱟᱹᱨ ᱠᱟᱨᱰ ᱵᱮᱱᱟᱣ ᱢᱮ᱾',
      mode_official: '📚 JCERT ᱥᱚᱨᱠᱟᱨᱤ ᱯᱟᱲᱦᱟᱣ ᱠᱚ',
      mode_upload: '📤 ᱵᱷᱤᱰᱤᱭᱳ / PDF ᱠᱷᱚᱱ ᱠᱟᱹᱢᱤ ᱥᱟᱠᱟᱢ',
      type_match: '1. Picture-to-Word Matching (ᱪᱤᱛᱟᱹᱨ ᱥᱟᱶ ᱟᱹᱲᱟᱹ ᱡᱚᱲᱟᱣ)',
      type_count: '2. FLN Number Counting (ᱞᱮᱠᱷᱟᱭ ᱢᱮ ᱟᱨ ᱚᱞ ᱢᱮ)',
      type_trace: '3. Letter Tracing & Writing (ᱚᱞ ᱪᱤᱠᱤ ᱟᱨ ᱫᱮᱵᱽᱱᱟᱜᱽᱨᱤ ᱚᱞ)',
      type_fill: '4. Sentence & Word Construction (ᱟᱹᱭᱟᱹᱛ ᱯᱮᱨᱮᱡ ᱢᱮ)',
      download_pdf: 'A4 ᱪᱷᱟᱯᱟ PDF ᱰᱟᱣᱩᱱᱞᱳᱰ ᱢᱮ',
      print_ready_badge: 'ᱟᱹᱛᱩ ᱟᱥᱲᱟ ᱯᱨᱤᱱᱴᱚᱨ ᱞᱟᱹᱜᱤᱫ ᱥᱟᱯᱲᱟᱣ',
      student_name: 'ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱧᱩᱛᱩᱢ',
      date: 'ᱢᱟᱹᱦᱤᱛ (Date)',
      teacher_sign: 'ᱢᱟᱪᱮᱛ ᱥᱩᱦᱤ (Sign)'
    },
    voice: {
      title: 'ᱞᱟᱭᱤᱵᱽ ᱯᱮ-ᱯᱟᱹᱨᱥᱤ ᱟᱲᱟᱝ ᱥᱮᱛᱩ (Voice Bridge)',
      desc: 'ᱦᱤᱱᱫᱤ ᱥᱮ ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ ᱨᱚᱲ ᱢᱮ ᱟᱨ ᱐ms ᱚᱯᱷᱞᱟᱭᱤᱱ ᱛᱮ ᱥᱟᱹᱨᱤ ᱛᱚᱨᱡᱚᱢᱟ ᱟᱨ ᱟᱲᱟᱝ ᱟᱸᱡᱚᱢ ᱢᱮ᱾',
      speak_button: 'ᱨᱚᱲ ᱞᱟᱹᱜᱤᱫ ᱚᱛᱟᱭ ᱢᱮ',
      listening: 'ᱟᱸᱡᱚᱢᱮᱫ-ᱟᱭ...',
      translating: '᱐ms ᱚᱯᱷᱞᱟᱭᱤᱱ NLP ᱛᱮ ᱛᱚᱨᱡᱚᱢᱟᱜ ᱠᱟᱱᱟ...',
      detected_speech: 'ᱧᱟᱢ ᱟᱠᱟᱱ ᱨᱚᱲ',
      pronunciation_guide: 'ᱨᱟᱦᱟ ᱟᱲᱟᱝ ᱩᱫᱩᱜ'
    },
    vault: {
      title: 'ᱥᱟᱶᱛᱟ ᱯᱟᱹᱨᱥᱤ ᱟᱨ ᱞᱟᱠᱪᱟᱨ ᱫᱚᱦᱚ ᱵᱟᱠᱷᱳᱞ',
      desc: 'ᱥᱟᱱᱛᱟᱲᱤ ᱟᱹᱲᱟᱹ, ᱠᱟᱹᱦᱱᱤ, ᱵᱷᱮᱱᱛᱟ ᱠᱟᱛᱷᱟ ᱟᱨ ᱟᱲᱟᱝ ᱨᱮᱠᱳᱨᱰ ᱠᱚ ᱡᱚᱜᱟᱣ ᱫᱚᱦᱚᱭ ᱢᱮ᱾',
      submit_contribution: 'ᱟᱹᱲᱟᱹ / ᱠᱟᱹᱦᱱᱤ ᱥᱮᱞᱮᱫ ᱢᱮ',
      audio_sample: 'ᱡᱟᱱᱟᱢ ᱟᱲᱟᱝ ᱨᱮᱠᱳᱨᱰ',
      dialect_label: 'ᱴᱚᱴᱷᱟᱠᱤᱭᱟᱹ ᱨᱚᱲ (Dialect)',
      verified_entries: 'ᱥᱟᱹᱨᱤ ᱟᱠᱟᱱ ᱞᱟᱠᱪᱟᱨ ᱚᱞ ᱠᱚ'
    },
    admin: {
      title: 'ᱡᱤᱞᱟᱹ ᱥᱮᱪᱮᱫ ᱟᱨ FLN ᱞᱮᱠᱷᱟ ᱰᱮᱥᱵᱳᱨᱰ',
      desc: 'ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱨᱤᱱ ᱥᱟᱱᱛᱟᱲ ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚᱣᱟᱜ ᱪᱮᱫᱚᱜ ᱞᱟᱦᱟᱱᱛᱤ ᱟᱨ ᱟᱥᱲᱟ ᱠᱚᱣᱟᱜ ᱦᱟᱞᱚᱛ ᱞᱟᱭᱤᱵᱽ ᱧᱮᱞ ᱢᱮ᱾',
      total_assessments: 'ᱡᱚᱛᱚ ᱵᱤᱰᱟᱹᱣ ᱠᱚ',
      avg_score: 'ᱮᱵᱷᱨᱮᱡᱽ FLN ᱥᱠᱳᱨ',
      fln_mastery: 'ᱱᱤᱯᱩᱱ ᱯᱟᱹᱨᱩᱠᱷᱤᱭᱟᱹ ᱦᱟᱹᱴᱤᱧ',
      school_coverage: 'ᱥᱮᱞᱮᱫ ᱟᱠᱟᱱ ᱤᱛᱩᱱ ᱟᱥᱲᱟ ᱠᱚ'
    }
  },

  ho: {
    nav: {
      brand: 'ᱦᱳ ᱥᱮᱛᱩ (BHASHASETU)',
      tagline: 'ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱑᱐᱐% ᱟᱯᱱᱟᱨ ᱦᱳ ᱡᱟᱱᱟᱢ ᱟᱲᱟᱝ ᱥᱮᱪᱮᱫ ᱥᱤᱥᱴᱚᱢ • JCERT ᱟᱨ NIPUN FLN',
      overview: 'ᱢᱩᱬᱩᱛ (Overview)',
      student_studio: 'ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱛᱷᱟᱱ (Student)',
      teacher_studio: 'ᱤᱛᱩ ᱢᱟᱪᱮᱛ (Teacher)',
      curriculum: 'JCERT ᱯᱟᱲᱦᱟᱣ (Curriculum)',
      voice_bridge: 'ᱟᱲᱟᱝ ᱥᱮᱛᱩ (Voice Bridge)',
      assessments: 'ᱵᱤᱰᱟᱹᱣ ᱟᱨ FLN (Assessments)',
      worksheets: 'ᱠᱟᱹᱢᱤ ᱥᱟᱠᱟᱢ (Worksheets)',
      practice: 'ᱟᱲᱟᱝ ᱮᱱᱮᱡ (Phonics)',
      vault: 'ᱯᱟᱹᱨᱥᱤ ᱵᱟᱠᱷᱳᱞ (Vault)',
      admin: 'ᱡᱤᱞᱟᱹ ᱞᱮᱠᱷᱟ (Admin)',
      sync: 'ᱚᱯᱷᱞᱟᱭᱤᱱ (Sync)',
      role: 'ᱴᱷᱟᱶ (Role):',
      role_student: 'ᱯᱟᱹᱴᱷᱩᱣᱟᱹ',
      role_teacher: 'ᱢᱟᱪᱮᱛ',
      role_validator: 'ᱯᱚᱨᱠᱷᱟᱣᱤᱡ',
      role_admin: 'ᱥᱟᱥᱚᱱᱤᱭᱟᱹ',
      language_select: 'ᱯᱟᱹᱨᱥᱤ (Language)',
      offline_status: '᱑᱐᱐% ᱚᱯᱷᱞᱟᱭᱤᱱ ᱪᱟᱹᱞᱩ',
      diagnostics: 'ᱥᱤᱥᱴᱚᱢ ᱦᱚᱲᱢᱚ',
      offline_mode_label: 'ᱚᱯᱷᱞᱟᱭᱤᱱ ᱨᱩᱯ'
    },
    common: {
      save: 'ᱫᱚᱦᱚᱭ ᱢᱮ (Save)',
      download: 'ᱰᱟᱣᱩᱱᱞᱳᱰ ᱢᱮ (Download)',
      print: 'A4 PDF ᱪᱷᱟᱯᱟ ᱢᱮ (Print)',
      play_audio: 'ᱟᱲᱟᱝ ᱟᱸᱡᱚᱢ ᱢᱮ (Listen)',
      record_oral: 'ᱟᱲᱟᱝ ᱨᱮᱠᱳᱨᱰ ᱢᱮ (Record)',
      submit: 'ᱡᱚᱢᱟ ᱢᱮ (Submit)',
      next: 'ᱞᱟᱦᱟ ᱛᱮ (Next)',
      previous: 'ᱛᱟᱭᱚᱢ ᱛᱮ (Previous)',
      cancel: 'ᱵᱟᱹᱜᱤ ᱢᱮ (Cancel)',
      loading: 'ᱞᱟᱦᱟᱜ ᱠᱟᱱᱟ...',
      verified: 'ᱥᱟᱹᱨᱤ ᱟᱠᱟᱱ (Verified)',
      search: 'ᱥᱮᱸᱫᱽᱨᱟᱭ ᱢᱮ...',
      filter: 'ᱵᱟᱪᱷᱟᱣ (Filter)',
      class_label: 'ᱪᱟᱱᱟᱪ (Class)',
      subject_label: 'ᱥᱟᱛᱟᱢ (Subject)',
      chapter_label: 'ᱯᱟᱲᱦᱟᱣ (Chapter)',
      refresh: 'ᱱᱟᱣᱟᱭ ᱢᱮ (Refresh)',
      close: 'ᱵᱚᱸᱫᱽ ᱢᱮ (Close)',
      all: 'ᱥᱟᱱᱟᱢ (All)',
      select_prompt: 'ᱢᱤᱫᱴᱟᱝ ᱵᱟᱪᱷᱟᱣ ᱢᱮ',
      success: 'ᱥᱟᱹᱛ ᱮᱱᱟ',
      error: 'ᱵᱷᱩᱞ ᱮᱱᱟ'
    },
    home: {
      hero_title: 'ᱦᱳ ᱡᱟᱱᱟᱢ ᱟᱲᱟᱝ ᱥᱮᱪᱮᱫ ᱦᱚᱨᱟ (Ho MTB-MLE)',
      hero_subtitle: 'ᱠᱚᱞᱦᱟᱱ ᱟᱨ ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱨᱤᱱ ᱦᱳ ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ ᱟᱠᱚᱣᱟᱜ ᱡᱟᱱᱟᱢ ᱟᱲᱟᱝ ᱛᱮ ᱑᱐᱐% ᱚᱯᱷᱞᱟᱭᱤᱱ AI, JCERT ᱯᱚᱛᱚᱵ ᱟᱨ NIPUN FLN ᱫᱟᱲᱮ ᱮᱢ ᱞᱟᱹᱜᱤᱫ᱾',
      badge_offline: '᱑᱐᱐% ᱮᱡᱽ ᱚᱯᱷᱞᱟᱭᱤᱱ (Zero Internet)',
      badge_nipun: 'NIPUN Bharat FLN ᱥᱟᱶ ᱡᱚᱲᱟᱣ',
      quick_launch: 'ᱞᱚᱜᱚᱱ ᱥᱮᱪᱮᱫ ᱛᱷᱟᱱ ᱠᱚ',
      metric_lessons: 'JCERT ᱯᱟᱲᱦᱟᱣ ᱠᱚ',
      metric_languages: 'ᱡᱟᱱᱟᱢ ᱟᱲᱟᱝ ᱠᱚ',
      metric_schools: 'ᱠᱚᱞᱦᱟᱱ ᱟᱹᱛᱩ ᱟᱥᱲᱟ ᱠᱚ',
      metric_fln: 'FLN ᱢᱩᱬᱩᱛ ᱴᱟᱨᱜᱮᱴ',
      cta_student: 'ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱛᱷᱟᱱ ᱡᱷᱤᱡ ᱢᱮ',
      cta_teacher: 'ᱢᱟᱪᱮᱛ ᱥᱴᱩᱰᱤᱭᱳ ᱡᱷᱤᱡ ᱢᱮ',
      cta_curriculum: 'JCERT ᱯᱚᱛᱚᱵ ᱧᱮᱞ ᱢᱮ',
      cta_assessment: 'NIPUN ᱵᱤᱰᱟᱹᱣ ᱮᱦᱚᱵ ᱢᱮ',
      cta_worksheets: 'ᱠᱟᱹᱢᱤ ᱥᱟᱠᱟᱢ ᱵᱮᱱᱟᱣ ᱢᱮ'
    },
    student: {
      greeting: 'ᱡᱚᱦᱟᱨ, ᱦᱳ ᱯᱟᱹᱴᱷᱩᱣᱟᱹ!',
      choose_grade: 'ᱟᱢᱟᱜ ᱪᱟᱱᱟᱪ (Class) ᱵᱟᱪᱷᱟᱣ ᱢᱮ',
      tutor_title: 'ᱦᱳ ᱜᱤᱫᱽᱨᱟᱹ AI ᱜᱩᱨᱩ',
      tutor_desc: 'ᱦᱳ ᱡᱟᱱᱟᱢ ᱟᱲᱟᱝ ᱛᱮ ᱠᱩᱠᱞᱤ ᱠᱩᱞᱤᱭ ᱢᱮ ᱟᱨ ᱟᱹᱛᱩ ᱡᱤᱱᱤᱥ ᱨᱮᱱᱟᱜ ᱫᱟᱹᱭᱠᱟᱹ ᱛᱮ ᱪᱮᱫᱚᱜ ᱢᱮ!',
      ask_tutor: 'ᱦᱳ ᱟᱲᱟᱝ ᱛᱮ ᱠᱩᱠᱞᱤ ᱠᱩᱞᱤᱭ ᱢᱮ',
      story_title: 'ᱦᱳ ᱠᱟᱹᱦᱱᱤ ᱟᱨ ᱥᱮᱨᱮᱧ',
      story_desc: 'ᱦᱳ ᱟᱹᱛᱩ ᱠᱟᱹᱦᱱᱤ ᱠᱚ ᱦᱳ ᱟᱨ ᱦᱤᱱᱫᱤ ᱛᱮ ᱯᱟᱲᱦᱟᱣ ᱢᱮ ᱟᱨ ᱟᱸᱡᱚᱢ ᱢᱮ᱾',
      start_story: 'ᱠᱟᱹᱦᱱᱤ ᱯᱟᱲᱦᱟᱣ ᱢᱮ',
      take_assessment: '᱕-ᱠᱩᱠᱞᱤ ᱵᱤᱰᱟᱹᱣ ᱮᱦᱚᱵ ᱢᱮ',
      practice_phonics: 'ᱣᱟᱨᱟᱝ ᱪᱤᱛᱤ ᱟᱨ ᱫᱮᱵᱽᱱᱟᱜᱽᱨᱤ ᱪᱮᱫᱚᱜ ᱢᱮ',
      audio_listen: 'ᱟᱲᱟᱝ ᱟᱸᱡᱚᱢ ᱢᱮ',
      score_badge: 'ᱱᱤᱯᱩᱱ ᱤᱯᱤᱞ (Star)'
    },
    teacher: {
      studio_title: 'ᱦᱳ ᱢᱟᱪᱮᱛ ᱥᱮᱪᱮᱫ ᱥᱴᱩᱰᱤᱭᱳ ᱟᱨ ᱯᱟᱲᱦᱟᱣ ᱵᱮᱱᱟᱣ',
      studio_desc: '᱑᱔-ᱴᱩᱰᱟᱹᱜ ᱯᱮ-ᱯᱟᱹᱨᱥᱤ ᱞᱮᱥᱚᱱ ᱯᱞᱟᱱ, ᱵᱷᱤᱰᱤᱭᱳ ᱵᱤᱰᱟᱹᱣ, ᱠᱩᱠᱞᱤ ᱠᱩᱭᱤᱡᱽ ᱟᱨ ᱪᱷᱟᱯᱟ ᱠᱟᱹᱢᱤ ᱥᱟᱠᱟᱢ ᱵᱮᱱᱟᱣ ᱢᱮ᱾',
      tab_video: 'ᱵᱷᱤᱰᱤᱭᱳ ᱵᱤᱰᱟᱹᱣ (Video)',
      tab_lesson: '᱑᱔-ᱴᱩᱰᱟᱹᱜ ᱞᱮᱥᱚᱱ ᱯᱞᱟᱱ',
      tab_quiz: 'ᱱᱤᱯᱩᱱ ᱠᱩᱠᱞᱤ ᱵᱤᱰᱟᱹᱣ',
      tab_worksheets: 'ᱪᱷᱟᱯᱟ ᱠᱟᱹᱢᱤ ᱥᱟᱠᱟᱢ',
      upload_title: 'ᱵᱷᱤᱰᱤᱭᱳ / PDF / ᱥᱟᱛᱟᱢ ᱞᱟᱫᱮ (Upload) ᱢᱮ',
      upload_desc: 'ᱵᱷᱤᱰᱤᱭᱳ (.mp4), PDF (.pdf), ᱚᱰᱤᱭᱳ (.mp3) ᱥᱮ ᱚᱞ (.docx) ᱞᱟᱫᱮ ᱠᱟᱛᱮ ᱦᱳ ᱡᱟᱱᱟᱢ ᱟᱲᱟᱝ ᱞᱮᱥᱚᱱ ᱵᱮᱱᱟᱣ ᱢᱮ᱾',
      generate_suite: 'ᱞᱟᱫᱮ ᱡᱤᱱᱤᱥ ᱠᱷᱚᱱ ᱯᱩᱨᱟᱹ ᱯᱟᱲᱦᱟᱣ ᱵᱮᱱᱟᱣ ᱢᱮ',
      milestones_title: 'ᱵᱷᱤᱰᱤᱭᱳ ᱥᱮᱪᱮᱫ ᱴᱟᱭᱤᱢ-ᱞᱟᱭᱤᱱ (Milestones)',
      save_lesson_local: 'ᱯᱟᱲᱦᱟᱣ ᱞᱚᱠᱟᱞ SQLite ᱨᱮ ᱫᱚᱦᱚᱭ ᱢᱮ',
      pedagogical_14_points: '᱑᱔-ᱴᱩᱰᱟᱹᱜ ᱥᱮᱪᱮᱫ ᱜᱟᱲᱦᱚᱱ',
      realia_guideline: 'ᱠᱚᱞᱦᱟᱱ ᱟᱹᱛᱩ ᱢᱩᱨᱛ ᱡᱤᱱᱤᱥ (Concrete TLM)'
    },
    curriculum: {
      title: 'JCERT ᱦᱳ ᱯᱚᱛᱚᱵ ᱯᱟᱲᱦᱟᱣ ᱛᱷᱟᱱ',
      desc: 'ᱪᱟᱱᱟᱪ ᱑, ᱒ ᱟᱨ ᱓ ᱞᱟᱹᱜᱤᱫ ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱥᱚᱨᱠᱟᱨᱟᱜ ᱯᱚᱛᱚᱵ ᱟᱨ ᱦᱳ ᱫᱟᱲᱮ ᱠᱚ ᱧᱮᱞ ᱢᱮ᱾',
      select_class: 'ᱪᱟᱱᱟᱪ ᱵᱟᱪᱷᱟᱣ ᱢᱮ',
      select_subject: 'ᱥᱟᱛᱟᱢ ᱵᱟᱪᱷᱟᱣ ᱢᱮ',
      textbook_catalog: 'ᱥᱚᱨᱠᱟᱨᱤ ᱯᱚᱛᱚᱵ ᱛᱟᱹᱞᱠᱟᱹ',
      learning_outcomes: 'ᱢᱩᱬᱩᱛ ᱪᱮᱫᱚᱜ ᱠᱟᱛᱷᱟ (Outcomes)',
      pedagogical_hints: 'ᱢᱟᱪᱮᱛ ᱫᱤᱥᱟᱹ ᱟᱨ ᱟᱹᱛᱩ ᱡᱤᱱᱤᱥ ᱩᱫᱩᱜ',
      view_chapters: 'ᱯᱟᱲᱦᱟᱣ ᱠᱚ ᱧᱮᱞ ᱢᱮ'
    },
    assessments: {
      title: 'NIPUN Bharat FLN ᱦᱳ ᱵᱤᱰᱟᱹᱣ ᱛᱷᱟᱱ',
      desc: 'ᱦᱳ ᱡᱟᱱᱟᱢ ᱟᱲᱟᱝ ᱟᱹᱲᱟᱹ ᱵᱟᱰᱟᱭ, ᱡᱤᱱᱤᱥ ᱪᱤᱱᱦᱟᱹᱣ, ᱯᱟᱲᱦᱟᱣ ᱨᱟᱦᱟ ᱟᱨ ᱮᱞ ᱞᱮᱠᱷᱟ ᱵᱤᱰᱟᱹᱣ᱾',
      mode_official: '📚 JCERT ᱥᱚᱨᱠᱟᱨᱤ ᱯᱟᱲᱦᱟᱣ',
      mode_upload: '📤 ᱞᱟᱫᱮ ᱡᱤᱱᱤᱥ ᱠᱷᱚᱱ ᱵᱤᱰᱟᱹᱣ ᱵᱮᱱᱟᱣ',
      start_exam: 'CBT ᱵᱤᱰᱟᱹᱣ ᱮᱦᱚᱵ ᱢᱮ',
      time_left: 'ᱥᱟᱨᱮᱡ ᱚᱠᱛᱚ',
      question: 'ᱠᱩᱠᱞᱤ',
      oral_reading_prompt: 'ᱢᱚᱪᱟ ᱛᱮ ᱯᱟᱲᱦᱟᱣ ᱨᱟᱦᱟ ᱵᱤᱰᱟᱹᱣ',
      record_speech: 'ᱟᱢᱟᱜ ᱟᱲᱟᱝ ᱨᱮᱠᱳᱨᱰ ᱢᱮ',
      submit_exam: 'ᱵᱤᱰᱟᱹᱣ ᱡᱚᱢᱟ ᱢᱮ',
      report_card_title: 'ᱥᱚᱨᱠᱟᱨᱤ NIPUN Bharat ᱨᱤᱯᱳᱨᱴ ᱠᱟᱨᱰ',
      download_report: 'ᱨᱤᱯᱳᱨᱴ ᱠᱟᱨᱰ PDF ᱰᱟᱣᱩᱱᱞᱳᱰ ᱢᱮ',
      nipun_mastery: 'ᱱᱤᱯᱩᱱ ᱯᱟᱹᱨᱩᱠᱷᱤᱭᱟᱹ ᱴᱷᱟᱶ'
    },
    worksheets: {
      title: 'NIPUN Bharat ᱦᱳ ᱵᱟᱨ-ᱯᱟᱹᱨᱥᱤ ᱠᱟᱹᱢᱤ ᱥᱟᱠᱟᱢ ᱥᱴᱩᱰᱤᱭᱳ',
      desc: 'ᱪᱷᱟᱯᱟ ᱞᱟᱹᱜᱤᱫ A4 ᱠᱟᱹᱢᱤ ᱥᱟᱠᱟᱢ (ᱡᱚᱲᱟᱣ, ᱞᱮᱠᱷᱟ, ᱚᱞ ᱪᱮᱫᱚᱜ, ᱯᱮᱨᱮᱡ) ᱟᱨ ᱪᱤᱛᱟᱹᱨ ᱠᱟᱨᱰ ᱵᱮᱱᱟᱣ ᱢᱮ᱾',
      mode_official: '📚 JCERT ᱥᱚᱨᱠᱟᱨᱤ ᱯᱟᱲᱦᱟᱣ ᱠᱚ',
      mode_upload: '📤 ᱵᱷᱤᱰᱤᱭᱳ / PDF ᱠᱷᱚᱱ ᱠᱟᱹᱢᱤ ᱥᱟᱠᱟᱢ',
      type_match: '1. Picture-to-Word Matching (ᱪᱤᱛᱟᱹᱨ ᱥᱟᱶ ᱟᱹᱲᱟᱹ ᱡᱚᱲᱟᱣ)',
      type_count: '2. FLN Number Counting (ᱞᱮᱠᱷᱟᱭ ᱢᱮ ᱟᱨ ᱚᱞ ᱢᱮ)',
      type_trace: '3. Letter Tracing & Writing (ᱟᱠᱷᱚᱨ ᱟᱨ ᱫᱮᱵᱽᱱᱟᱜᱽᱨᱤ ᱚᱞ)',
      type_fill: '4. Sentence & Word Construction (ᱟᱹᱭᱟᱹᱛ ᱯᱮᱨᱮᱡ ᱢᱮ)',
      download_pdf: 'A4 ᱪᱷᱟᱯᱟ PDF ᱰᱟᱣᱩᱱᱞᱳᱰ ᱢᱮ',
      print_ready_badge: 'ᱟᱹᱛᱩ ᱟᱥᱲᱟ ᱯᱨᱤᱱᱴᱚᱨ ᱞᱟᱹᱜᱤᱫ ᱥᱟᱯᱲᱟᱣ',
      student_name: 'ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱧᱩᱛᱩᱢ',
      date: 'ᱢᱟᱹᱦᱤᱛ (Date)',
      teacher_sign: 'ᱢᱟᱪᱮᱛ ᱥᱩᱦᱤ (Sign)'
    },
    voice: {
      title: 'ᱞᱟᱭᱤᱵᱽ ᱦᱳ ᱟᱲᱟᱝ ᱥᱮᱛᱩ (Ho Voice Bridge)',
      desc: 'ᱦᱤᱱᱫᱤ ᱥᱮ ᱦᱳ ᱛᱮ ᱨᱚᱲ ᱢᱮ ᱟᱨ ᱐ms ᱚᱯᱷᱞᱟᱭᱤᱱ ᱛᱮ ᱥᱟᱹᱨᱤ ᱛᱚᱨᱡᱚᱢᱟ ᱟᱨ ᱟᱲᱟᱝ ᱟᱸᱡᱚᱢ ᱢᱮ᱾',
      speak_button: 'ᱨᱚᱲ ᱞᱟᱹᱜᱤᱫ ᱚᱛᱟᱭ ᱢᱮ',
      listening: 'ᱟᱸᱡᱚᱢᱮᱫ-ᱟᱭ...',
      translating: '᱐ms ᱚᱯᱷᱞᱟᱭᱤᱱ NLP ᱛᱮ ᱛᱚᱨᱡᱚᱢᱟᱜ ᱠᱟᱱᱟ...',
      detected_speech: 'ᱧᱟᱢ ᱟᱠᱟᱱ ᱨᱚᱲ',
      pronunciation_guide: 'ᱨᱟᱦᱟ ᱟᱲᱟᱝ ᱩᱫᱩᱜ'
    },
    vault: {
      title: 'ᱦᱳ ᱯᱟᱹᱨᱥᱤ ᱟᱨ ᱞᱟᱠᱪᱟᱨ ᱫᱚᱦᱚ ᱵᱟᱠᱷᱳᱞ',
      desc: 'ᱦᱳ ᱟᱹᱲᱟᱹ, ᱠᱟᱹᱦᱱᱤ, ᱢᱟᱜᱮ ᱯᱟᱨᱟᱵᱽ ᱥᱮᱨᱮᱧ ᱟᱨ ᱟᱲᱟᱝ ᱨᱮᱠᱳᱨᱰ ᱠᱚ ᱡᱚᱜᱟᱣ ᱫᱚᱦᱚᱭ ᱢᱮ᱾',
      submit_contribution: 'ᱦᱳ ᱟᱹᱲᱟᱹ / ᱠᱟᱹᱦᱱᱤ ᱥᱮᱞᱮᱫ ᱢᱮ',
      audio_sample: 'ᱡᱟᱱᱟᱢ ᱟᱲᱟᱝ ᱨᱮᱠᱳᱨᱰ',
      dialect_label: 'ᱠᱚᱞᱦᱟᱱ ᱴᱚᱴᱷᱟᱠᱤᱭᱟᱹ ᱨᱚᱲ',
      verified_entries: 'ᱥᱟᱹᱨᱤ ᱟᱠᱟᱱ ᱞᱟᱠᱪᱟᱨ ᱚᱞ ᱠᱚ'
    },
    admin: {
      title: 'ᱠᱚᱞᱦᱟᱱ ᱡᱤᱞᱟᱹ ᱥᱮᱪᱮᱫ ᱟᱨ FLN ᱞᱮᱠᱷᱟ ᱰᱮᱥᱵᱳᱨᱰ',
      desc: 'ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱨᱤᱱ ᱦᱳ ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚᱣᱟᱜ ᱪᱮᱫᱚᱜ ᱞᱟᱦᱟᱱᱛᱤ ᱟᱨ ᱟᱥᱲᱟ ᱠᱚᱣᱟᱜ ᱦᱟᱞᱚᱛ ᱞᱟᱭᱤᱵᱽ ᱧᱮᱞ ᱢᱮ᱾',
      total_assessments: 'ᱡᱚᱛᱚ ᱵᱤᱰᱟᱹᱣ ᱠᱚ',
      avg_score: 'ᱮᱵᱷᱨᱮᱡᱽ FLN ᱥᱠᱳᱨ',
      fln_mastery: 'ᱱᱤᱯᱩᱱ ᱯᱟᱹᱨᱩᱠᱷᱤᱭᱟᱹ ᱦᱟᱹᱴᱤᱧ',
      school_coverage: 'ᱥᱮᱞᱮᱫ ᱟᱠᱟᱱ ᱤᱛᱩᱱ ᱟᱥᱲᱟ ᱠᱚ'
    }
  },

  mundari: {
    nav: {
      brand: 'ᱢᱩᱱᱰᱟᱨᱤ ᱥᱮᱛᱩ (BHASHASETU)',
      tagline: 'ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱑᱐᱐% ᱟᱯᱱᱟᱨ ᱢᱩᱱᱰᱟᱨᱤ ᱡᱟᱱᱟᱢ ᱟᱲᱟᱝ ᱥᱮᱪᱮᱫ ᱥᱤᱥᱴᱚᱢ • JCERT ᱟᱨ NIPUN FLN',
      overview: 'ᱢᱩᱬᱩᱛ (Overview)',
      student_studio: 'ᱪᱮᱞᱟ ᱢᱟᱹᱧᱪ (Student)',
      teacher_studio: 'ᱢᱟᱪᱮᱛ ᱛᱷᱟᱱ (Teacher)',
      curriculum: 'JCERT ᱯᱟᱲᱦᱟᱣ (Curriculum)',
      voice_bridge: 'ᱟᱲᱟᱝ ᱥᱮᱛᱩ (Voice Bridge)',
      assessments: 'ᱯᱚᱨᱠᱷᱟ ᱟᱨ FLN (Assessments)',
      worksheets: 'ᱠᱟᱹᱢᱤ ᱥᱟᱠᱟᱢ (Worksheets)',
      practice: 'ᱥᱟᱹᱲᱤ ᱮᱱᱮᱡ (Phonics)',
      vault: 'ᱡᱟᱹᱛᱤ ᱵᱟᱠᱷᱳᱞ (Vault)',
      admin: 'ᱡᱤᱞᱟᱹ ᱞᱮᱠᱷᱟ (Admin)',
      sync: 'ᱚᱯᱷᱞᱟᱭᱤᱱ (Sync)',
      role: 'ᱴᱷᱟᱶ (Role):',
      role_student: 'ᱪᱮᱞᱟ',
      role_teacher: 'ᱢᱟᱪᱮᱛ',
      role_validator: 'ᱯᱚᱨᱠᱷᱟᱣᱤᱡ',
      role_admin: 'ᱥᱟᱥᱚᱱᱤᱭᱟᱹ',
      language_select: 'ᱯᱟᱹᱨᱥᱤ (Language)',
      offline_status: '᱑᱐᱐% ᱚᱯᱷᱞᱟᱭᱤᱱ ᱪᱟᱹᱞᱩ',
      diagnostics: 'ᱥᱤᱥᱴᱚᱢ ᱦᱚᱲᱢᱚ',
      offline_mode_label: 'ᱚᱯᱷᱞᱟᱭᱤᱱ ᱨᱩᱯ'
    },
    common: {
      save: 'ᱫᱚᱦᱚᱭ ᱢᱮ (Save)',
      download: 'ᱰᱟᱣᱩᱱᱞᱳᱰ ᱢᱮ (Download)',
      print: 'A4 PDF ᱪᱷᱟᱯᱟ ᱢᱮ (Print)',
      play_audio: 'ᱟᱲᱟᱝ ᱟᱸᱡᱚᱢ ᱢᱮ (Listen)',
      record_oral: 'ᱟᱲᱟᱝ ᱨᱮᱠᱳᱨᱰ ᱢᱮ (Record)',
      submit: 'ᱡᱚᱢᱟ ᱢᱮ (Submit)',
      next: 'ᱞᱟᱦᱟ ᱛᱮ (Next)',
      previous: 'ᱛᱟᱭᱚᱢ ᱛᱮ (Previous)',
      cancel: 'ᱵᱟᱹᱜᱤ ᱢᱮ (Cancel)',
      loading: 'ᱞᱟᱦᱟᱜ ᱠᱟᱱᱟ...',
      verified: 'ᱥᱟᱹᱨᱤ ᱟᱠᱟᱱ (Verified)',
      search: 'ᱥᱮᱸᱫᱽᱨᱟᱭ ᱢᱮ...',
      filter: 'ᱵᱟᱪᱷᱟᱣ (Filter)',
      class_label: 'ᱪᱟᱱᱟᱪ (Class)',
      subject_label: 'ᱥᱟᱛᱟᱢ (Subject)',
      chapter_label: 'ᱯᱟᱲᱦᱟᱣ (Chapter)',
      refresh: 'ᱱᱟᱣᱟᱭ ᱢᱮ (Refresh)',
      close: 'ᱵᱚᱸᱫᱽ ᱢᱮ (Close)',
      all: 'ᱥᱟᱱᱟᱢ (All)',
      select_prompt: 'ᱢᱤᱫᱴᱟᱝ ᱵᱟᱪᱷᱟᱣ ᱢᱮ',
      success: 'ᱥᱟᱹᱛ ᱮᱱᱟ',
      error: 'ᱵᱷᱩᱞ ᱮᱱᱟ'
    },
    home: {
      hero_title: 'ᱢᱩᱱᱰᱟᱨᱤ ᱡᱟᱱᱟᱢ ᱟᱲᱟᱝ ᱥᱮᱪᱮᱫ ᱦᱚᱨᱟ (Mundari MTB-MLE)',
      hero_subtitle: 'ᱠᱷᱩᱸᱴᱤ ᱟᱨ ᱨᱟᱺᱪᱤ ᱨᱤᱱ ᱢᱩᱱᱰᱟᱹ ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ ᱟᱠᱚᱣᱟᱜ ᱡᱟᱱᱟᱢ ᱟᱲᱟᱝ ᱛᱮ ᱑᱐᱐% ᱚᱯᱷᱞᱟᱭᱤᱱ AI, JCERT ᱯᱚᱛᱚᱵ ᱟᱨ NIPUN FLN ᱫᱟᱲᱮ ᱮᱢ ᱞᱟᱹᱜᱤᱫ᱾',
      badge_offline: '᱑᱐᱐% ᱮᱡᱽ ᱚᱯᱷᱞᱟᱭᱤᱱ (Zero Internet)',
      badge_nipun: 'NIPUN Bharat FLN ᱥᱟᱶ ᱡᱚᱲᱟᱣ',
      quick_launch: 'ᱞᱚᱜᱚᱱ ᱥᱮᱪᱮᱫ ᱛᱷᱟᱱ ᱠᱚ',
      metric_lessons: 'JCERT ᱯᱟᱲᱦᱟᱣ ᱠᱚ',
      metric_languages: 'ᱡᱟᱱᱟᱢ ᱟᱲᱟᱝ ᱠᱚ',
      metric_schools: 'ᱠᱷᱩᱸᱴᱤ-ᱨᱟᱺᱪᱤ ᱟᱹᱛᱩ ᱟᱥᱲᱟ',
      metric_fln: 'FLN ᱢᱩᱬᱩᱛ ᱴᱟᱨᱜᱮᱴ',
      cta_student: 'ᱪᱮᱞᱟ ᱢᱟᱹᱧᱪ ᱡᱷᱤᱡ ᱢᱮ',
      cta_teacher: 'ᱢᱟᱪᱮᱛ ᱥᱴᱩᱰᱤᱭᱳ ᱡᱷᱤᱡ ᱢᱮ',
      cta_curriculum: 'JCERT ᱯᱚᱛᱚᱵ ᱧᱮᱞ ᱢᱮ',
      cta_assessment: 'NIPUN ᱵᱤᱰᱟᱹᱣ ᱮᱦᱚᱵ ᱢᱮ',
      cta_worksheets: 'ᱠᱟᱹᱢᱤ ᱥᱟᱠᱟᱢ ᱵᱮᱱᱟᱣ ᱢᱮ'
    },
    student: {
      greeting: 'ᱡᱚᱦᱟᱨ, ᱠᱟᱹᱴᱤᱡ ᱪᱮᱞᱟ!',
      choose_grade: 'ᱟᱢᱟᱜ ᱪᱟᱱᱟᱪ (Class) ᱵᱟᱪᱷᱟᱣ ᱢᱮ',
      tutor_title: 'ᱢᱩᱱᱰᱟᱨᱤ ᱜᱤᱫᱽᱨᱟᱹ AI ᱜᱩᱨᱩ',
      tutor_desc: 'ᱢᱩᱱᱰᱟᱨᱤ ᱡᱟᱱᱟᱢ ᱟᱲᱟᱝ ᱛᱮ ᱠᱩᱠᱞᱤ ᱠᱩᱞᱤᱭ ᱢᱮ ᱟᱨ ᱟᱹᱛᱩ ᱡᱤᱱᱤᱥ ᱨᱮᱱᱟᱜ ᱫᱟᱹᱭᱠᱟᱹ ᱛᱮ ᱪᱮᱫᱚᱜ ᱢᱮ!',
      ask_tutor: 'ᱢᱩᱱᱰᱟᱨᱤ ᱟᱲᱟᱝ ᱛᱮ ᱠᱩᱠᱞᱤ ᱠᱩᱞᱤᱭ ᱢᱮ',
      story_title: 'ᱢᱩᱱᱰᱟᱨᱤ ᱠᱟᱹᱦᱱᱤ ᱟᱨ ᱥᱮᱨᱮᱧ',
      story_desc: 'ᱢᱩᱱᱰᱟᱹ ᱟᱹᱛᱩ ᱠᱟᱹᱦᱱᱤ ᱠᱚ ᱢᱩᱱᱰᱟᱨᱤ ᱟᱨ ᱦᱤᱱᱫᱤ ᱛᱮ ᱯᱟᱲᱦᱟᱣ ᱢᱮ ᱟᱨ ᱟᱸᱡᱚᱢ ᱢᱮ᱾',
      start_story: 'ᱠᱟᱹᱦᱱᱤ ᱯᱟᱲᱦᱟᱣ ᱢᱮ',
      take_assessment: '᱕-ᱠᱩᱠᱞᱤ ᱵᱤᱰᱟᱹᱣ ᱮᱦᱚᱵ ᱢᱮ',
      practice_phonics: 'ᱢᱩᱱᱰᱟᱨᱤ ᱵᱟᱱᱤ ᱟᱨ ᱫᱮᱵᱽᱱᱟᱜᱽᱨᱤ ᱪᱮᱫᱚᱜ ᱢᱮ',
      audio_listen: 'ᱟᱲᱟᱝ ᱟᱸᱡᱚᱢ ᱢᱮ',
      score_badge: 'ᱱᱤᱯᱩᱱ ᱤᱯᱤᱞ (Star)'
    },
    teacher: {
      studio_title: 'ᱢᱩᱱᱰᱟᱨᱤ ᱢᱟᱪᱮᱛ ᱥᱮᱪᱮᱫ ᱥᱴᱩᱰᱤᱭᱳ ᱟᱨ ᱯᱟᱲᱦᱟᱣ ᱵᱮᱱᱟᱣ',
      studio_desc: '᱑᱔-ᱴᱩᱰᱟᱹᱜ ᱯᱮ-ᱯᱟᱹᱨᱥᱤ ᱞᱮᱥᱚᱱ ᱯᱞᱟᱱ, ᱵᱷᱤᱰᱤᱭᱳ ᱵᱤᱰᱟᱹᱣ, ᱠᱩᱠᱞᱤ ᱠᱩᱭᱤᱡᱽ ᱟᱨ ᱪᱷᱟᱯᱟ ᱠᱟᱹᱢᱤ ᱥᱟᱠᱟᱢ ᱵᱮᱱᱟᱣ ᱢᱮ᱾',
      tab_video: 'ᱵᱷᱤᱰᱤᱭᱳ ᱵᱤᱰᱟᱹᱣ (Video)',
      tab_lesson: '᱑᱔-ᱴᱩᱰᱟᱹᱜ ᱞᱮᱥᱚᱱ ᱯᱞᱟᱱ',
      tab_quiz: 'ᱱᱤᱯᱩᱱ ᱠᱩᱠᱞᱤ ᱵᱤᱰᱟᱹᱣ',
      tab_worksheets: 'ᱪᱷᱟᱯᱟ ᱠᱟᱹᱢᱤ ᱥᱟᱠᱟᱢ',
      upload_title: 'ᱵᱷᱤᱰᱤᱭᱳ / PDF / ᱥᱟᱛᱟᱢ ᱞᱟᱫᱮ (Upload) ᱢᱮ',
      upload_desc: 'ᱵᱷᱤᱰᱤᱭᱳ (.mp4), PDF (.pdf), ᱚᱰᱤᱭᱳ (.mp3) ᱥᱮ ᱚᱞ (.docx) ᱞᱟᱫᱮ ᱠᱟᱛᱮ ᱢᱩᱱᱰᱟᱨᱤ ᱡᱟᱱᱟᱢ ᱟᱲᱟᱝ ᱞᱮᱥᱚᱱ ᱵᱮᱱᱟᱣ ᱢᱮ᱾',
      generate_suite: 'ᱞᱟᱫᱮ ᱡᱤᱱᱤᱥ ᱠᱷᱚᱱ ᱯᱩᱨᱟᱹ ᱯᱟᱲᱦᱟᱣ ᱵᱮᱱᱟᱣ ᱢᱮ',
      milestones_title: 'ᱵᱷᱤᱰᱤᱭᱳ ᱥᱮᱪᱮᱫ ᱴᱟᱭᱤᱢ-ᱞᱟᱭᱤᱱ (Milestones)',
      save_lesson_local: 'ᱯᱟᱲᱦᱟᱣ ᱞᱚᱠᱟᱞ SQLite ᱨᱮ ᱫᱚᱦᱚᱭ ᱢᱮ',
      pedagogical_14_points: '᱑᱔-ᱴᱩᱰᱟᱹᱜ ᱥᱮᱪᱮᱫ ᱜᱟᱲᱦᱚᱱ',
      realia_guideline: 'ᱠᱷᱩᱸᱴᱤ ᱟᱹᱛᱩ ᱢᱩᱨᱛ ᱡᱤᱱᱤᱥ (Concrete TLM)'
    },
    curriculum: {
      title: 'JCERT ᱢᱩᱱᱰᱟᱨᱤ ᱯᱚᱛᱚᱵ ᱯᱟᱲᱦᱟᱣ ᱛᱷᱟᱱ',
      desc: 'ᱪᱟᱱᱟᱪ ᱑, ᱒ ᱟᱨ ᱓ ᱞᱟᱹᱜᱤᱫ ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱥᱚᱨᱠᱟᱨᱟᱜ ᱯᱚᱛᱚᱵ ᱟᱨ ᱢᱩᱱᱰᱟᱨᱤ ᱫᱟᱲᱮ ᱠᱚ ᱧᱮᱞ ᱢᱮ᱾',
      select_class: 'ᱪᱟᱱᱟᱪ ᱵᱟᱪᱷᱟᱣ ᱢᱮ',
      select_subject: 'ᱥᱟᱛᱟᱢ ᱵᱟᱪᱷᱟᱣ ᱢᱮ',
      textbook_catalog: 'ᱥᱚᱨᱠᱟᱨᱤ ᱯᱚᱛᱚᱵ ᱛᱟᱹᱞᱠᱟᱹ',
      learning_outcomes: 'ᱢᱩᱬᱩᱛ ᱪᱮᱫᱚᱜ ᱠᱟᱛᱷᱟ (Outcomes)',
      pedagogical_hints: 'ᱢᱟᱪᱮᱛ ᱫᱤᱥᱟᱹ ᱟᱨ ᱟᱹᱛᱩ ᱡᱤᱱᱤᱥ ᱩᱫᱩᱜ',
      view_chapters: 'ᱯᱟᱲᱦᱟᱣ ᱠᱚ ᱧᱮᱞ ᱢᱮ'
    },
    assessments: {
      title: 'NIPUN Bharat FLN ᱢᱩᱱᱰᱟᱨᱤ ᱯᱚᱨᱠᱷᱟ ᱛᱷᱟᱱ',
      desc: 'ᱢᱩᱱᱰᱟᱨᱤ ᱡᱟᱱᱟᱢ ᱟᱲᱟᱝ ᱟᱹᱲᱟᱹ ᱵᱟᱰᱟᱭ, ᱡᱤᱱᱤᱥ ᱪᱤᱱᱦᱟᱹᱣ, ᱯᱟᱲᱦᱟᱣ ᱨᱟᱦᱟ ᱟᱨ ᱮᱞ ᱞᱮᱠᱷᱟ ᱵᱤᱰᱟᱹᱣ᱾',
      mode_official: '📚 JCERT ᱥᱚᱨᱠᱟᱨᱤ ᱯᱟᱲᱦᱟᱣ',
      mode_upload: '📤 ᱞᱟᱫᱮ ᱡᱤᱱᱤᱥ ᱠᱷᱚᱱ ᱵᱤᱰᱟᱹᱣ ᱵᱮᱱᱟᱣ',
      start_exam: 'CBT ᱵᱤᱰᱟᱹᱣ ᱮᱦᱚᱵ ᱢᱮ',
      time_left: 'ᱥᱟᱨᱮᱡ ᱚᱠᱛᱚ',
      question: 'ᱠᱩᱠᱞᱤ',
      oral_reading_prompt: 'ᱢᱚᱪᱟ ᱛᱮ ᱯᱟᱲᱦᱟᱣ ᱨᱟᱦᱟ ᱵᱤᱰᱟᱹᱣ',
      record_speech: 'ᱟᱢᱟᱜ ᱟᱲᱟᱝ ᱨᱮᱠᱳᱨᱰ ᱢᱮ',
      submit_exam: 'ᱵᱤᱰᱟᱹᱣ ᱡᱚᱢᱟ ᱢᱮ',
      report_card_title: 'ᱥᱚᱨᱠᱟᱨᱤ NIPUN Bharat ᱨᱤᱯᱳᱨᱴ ᱠᱟᱨᱰ',
      download_report: 'ᱨᱤᱯᱳᱨᱴ ᱠᱟᱨᱰ PDF ᱰᱟᱣᱩᱱᱞᱳᱰ ᱢᱮ',
      nipun_mastery: 'ᱱᱤᱯᱩᱱ ᱯᱟᱹᱨᱩᱠᱷᱤᱭᱟᱹ ᱴᱷᱟᱶ'
    },
    worksheets: {
      title: 'NIPUN Bharat ᱢᱩᱱᱰᱟᱨᱤ ᱵᱟᱨ-ᱯᱟᱹᱨᱥᱤ ᱠᱟᱹᱢᱤ ᱥᱟᱠᱟᱢ ᱥᱴᱩᱰᱤᱭᱳ',
      desc: 'ᱪᱷᱟᱯᱟ ᱞᱟᱹᱜᱤᱫ A4 ᱠᱟᱹᱢᱤ ᱥᱟᱠᱟᱢ (ᱡᱚᱲᱟᱣ, ᱞᱮᱠᱷᱟ, ᱚᱞ ᱪᱮᱫᱚᱜ, ᱯᱮᱨᱮᱡ) ᱟᱨ ᱪᱤᱛᱟᱹᱨ ᱠᱟᱨᱰ ᱵᱮᱱᱟᱣ ᱢᱮ᱾',
      mode_official: '📚 JCERT ᱥᱚᱨᱠᱟᱨᱤ ᱯᱟᱲᱦᱟᱣ ᱠᱚ',
      mode_upload: '📤 ᱵᱷᱤᱰᱤᱭᱳ / PDF ᱠᱷᱚᱱ ᱠᱟᱹᱢᱤ ᱥᱟᱠᱟᱢ',
      type_match: '1. Picture-to-Word Matching (ᱪᱤᱛᱟᱹᱨ ᱥᱟᱶ ᱟᱹᱲᱟᱹ ᱡᱚᱲᱟᱣ)',
      type_count: '2. FLN Number Counting (ᱞᱮᱠᱷᱟᱭ ᱢᱮ ᱟᱨ ᱚᱞ ᱢᱮ)',
      type_trace: '3. Letter Tracing & Writing (ᱟᱠᱷᱚᱨ ᱟᱨ ᱫᱮᱵᱽᱱᱟᱜᱽᱨᱤ ᱚᱞ)',
      type_fill: '4. Sentence & Word Construction (ᱟᱹᱭᱟᱹᱛ ᱯᱮᱨᱮᱡ ᱢᱮ)',
      download_pdf: 'A4 ᱪᱷᱟᱯᱟ PDF ᱰᱟᱣᱩᱱᱞᱳᱰ ᱢᱮ',
      print_ready_badge: 'ᱟᱹᱛᱩ ᱟᱥᱲᱟ ᱯᱨᱤᱱᱴᱚᱨ ᱞᱟᱹᱜᱤᱫ ᱥᱟᱯᱲᱟᱣ',
      student_name: 'ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱧᱩᱛᱩᱢ',
      date: 'ᱢᱟᱹᱦᱤᱛ (Date)',
      teacher_sign: 'ᱢᱟᱪᱮᱛ ᱥᱩᱦᱤ (Sign)'
    },
    voice: {
      title: 'ᱞᱟᱭᱤᱵᱽ ᱢᱩᱱᱰᱟᱨᱤ ᱟᱲᱟᱝ ᱥᱮᱛᱩ (Mundari Voice Bridge)',
      desc: 'ᱦᱤᱱᱫᱤ ᱥᱮ ᱢᱩᱱᱰᱟᱨᱤ ᱛᱮ ᱨᱚᱲ ᱢᱮ ᱟᱨ ᱐ms ᱚᱯᱷᱞᱟᱭᱤᱱ ᱛᱮ ᱥᱟᱹᱨᱤ ᱛᱚᱨᱡᱚᱢᱟ ᱟᱨ ᱟᱲᱟᱝ ᱟᱸᱡᱚᱢ ᱢᱮ᱾',
      speak_button: 'ᱨᱚᱲ ᱞᱟᱹᱜᱤᱫ ᱚᱛᱟᱭ ᱢᱮ',
      listening: 'ᱟᱸᱡᱚᱢᱮᱫ-ᱟᱭ...',
      translating: '᱐ms ᱚᱯᱷᱞᱟᱭᱤᱱ NLP ᱛᱮ ᱛᱚᱨᱡᱚᱢᱟᱜ ᱠᱟᱱᱟ...',
      detected_speech: 'ᱧᱟᱢ ᱟᱠᱟᱱ ᱨᱚᱲ',
      pronunciation_guide: 'ᱨᱟᱦᱟ ᱟᱲᱟᱝ ᱩᱫᱩᱜ'
    },
    vault: {
      title: 'ᱢᱩᱱᱰᱟᱨᱤ ᱯᱟᱹᱨᱥᱤ ᱟᱨ ᱞᱟᱠᱪᱟᱨ ᱫᱚᱦᱚ ᱵᱟᱠᱷᱳᱞ',
      desc: 'ᱢᱩᱱᱰᱟᱨᱤ ᱟᱹᱲᱟᱹ, ᱠᱟᱹᱦᱱᱤ, ᱵᱟ ᱯᱟᱨᱟᱵᱽ ᱥᱮᱨᱮᱧ ᱟᱨ ᱟᱲᱟᱝ ᱨᱮᱠᱳᱨᱰ ᱠᱚ ᱡᱚᱜᱟᱣ ᱫᱚᱦᱚᱭ ᱢᱮ᱾',
      submit_contribution: 'ᱢᱩᱱᱰᱟᱨᱤ ᱟᱹᱲᱟᱹ / ᱠᱟᱹᱦᱱᱤ ᱥᱮᱞᱮᱫ ᱢᱮ',
      audio_sample: 'ᱡᱟᱱᱟᱢ ᱟᱲᱟᱝ ᱨᱮᱠᱳᱨᱰ',
      dialect_label: 'ᱠᱷᱩᱸᱴᱤ-ᱨᱟᱺᱪᱤ ᱴᱚᱴᱷᱟᱠᱤᱭᱟᱹ ᱨᱚᱲ',
      verified_entries: 'ᱥᱟᱹᱨᱤ ᱟᱠᱟᱱ ᱞᱟᱠᱪᱟᱨ ᱚᱞ ᱠᱚ'
    },
    admin: {
      title: 'ᱠᱷᱩᱸᱴᱤ ᱡᱤᱞᱟᱹ ᱥᱮᱪᱮᱫ ᱟᱨ FLN ᱞᱮᱠᱷᱟ ᱰᱮᱥᱵᱳᱨᱰ',
      desc: 'ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱨᱤᱱ ᱢᱩᱱᱰᱟᱹ ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚᱣᱟᱜ ᱪᱮᱫᱚᱜ ᱞᱟᱦᱟᱱᱛᱤ ᱟᱨ ᱟᱥᱲᱟ ᱠᱚᱣᱟᱜ ᱦᱟᱞᱚᱛ ᱞᱟᱭᱤᱵᱽ ᱧᱮᱞ ᱢᱮ᱾',
      total_assessments: 'ᱡᱚᱛᱚ ᱵᱤᱰᱟᱹᱣ ᱠᱚ',
      avg_score: 'ᱮᱵᱷᱨᱮᱡᱽ FLN ᱥᱠᱳᱨ',
      fln_mastery: 'ᱱᱤᱯᱩᱱ ᱯᱟᱹᱨᱩᱠᱷᱤᱭᱟᱹ ᱦᱟᱹᱴᱤᱧ',
      school_coverage: 'ᱥᱮᱞᱮᱫ ᱟᱠᱟᱱ ᱤᱛᱩᱱ ᱟᱥᱲᱟ ᱠᱚ'
    }
  }
};

class I18nService {
  private currentLanguage: UILanguage = 'english';

  constructor() {
    try {
      const saved = localStorage.getItem('bhashasetu_ui_lang') as UILanguage;
      if (saved && UI_TRANSLATIONS[saved]) {
        this.currentLanguage = saved;
      }
    } catch (e) {}
  }

  getLanguage(): UILanguage {
    return this.currentLanguage;
  }

  setLanguage(lang: UILanguage) {
    if (UI_TRANSLATIONS[lang]) {
      this.currentLanguage = lang;
      try {
        localStorage.setItem('bhashasetu_ui_lang', lang);
      } catch (e) {}
    }
  }

  t(path: string, lang?: UILanguage): string {
    const targetLang = lang || this.currentLanguage;
    const parts = path.split('.');
    let cur: any = UI_TRANSLATIONS[targetLang] || UI_TRANSLATIONS['english'];

    for (const p of parts) {
      if (cur && typeof cur === 'object' && p in cur) {
        cur = cur[p];
      } else {
        // Fallback to English
        let fallback: any = UI_TRANSLATIONS['english'];
        for (const fp of parts) {
          if (fallback && typeof fallback === 'object' && fp in fallback) {
            fallback = fallback[fp];
          } else {
            return path;
          }
        }
        return typeof fallback === 'string' ? fallback : path;
      }
    }

    return typeof cur === 'string' ? cur : path;
  }

  getAvailableLanguages(): { id: UILanguage; name: string; nativeName: string; flag: string }[] {
    return [
      { id: 'english', name: 'English', nativeName: 'English', flag: '🌐' },
      { id: 'hindi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
      { id: 'santhali', name: 'Santhali', nativeName: 'ᱥᱟᱱᱛᱟᱲᱤ', flag: '🌿' },
      { id: 'ho', name: 'Ho', nativeName: 'ᱦᱳ', flag: '🏹' },
      { id: 'mundari', name: 'Mundari', nativeName: 'ᱢᱩᱱᱰᱟᱨᱤ', flag: '🌾' },
    ];
  }
}

export const i18n = new I18nService();
'''

context_content = '''import React, { createContext, useContext, useState, useEffect } from 'react';
import { UILanguage, TribalLanguage } from '../types';
import { i18n } from '../services/i18nService';
import { speechService } from '../services/speechService';

interface LanguageContextType {
  uiLanguage: UILanguage;
  setUiLanguage: (lang: UILanguage) => void;
  targetTribalLanguage: TribalLanguage;
  setTargetTribalLanguage: (lang: TribalLanguage) => void;
  t: (key: string, lang?: UILanguage) => string;
  speakText: (text: string, lang?: TribalLanguage | UILanguage) => void;
  availableLanguages: { id: UILanguage; name: string; nativeName: string; flag: string }[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [uiLanguage, setUiLanguageState] = useState<UILanguage>(i18n.getLanguage());
  const [targetTribalLanguage, setTargetTribalLanguage] = useState<TribalLanguage>(
    (uiLanguage === 'santhali' || uiLanguage === 'ho' || uiLanguage === 'mundari')
      ? (uiLanguage as TribalLanguage)
      : 'santhali'
  );

  useEffect(() => {
    i18n.setLanguage(uiLanguage);
    if (uiLanguage === 'santhali' || uiLanguage === 'ho' || uiLanguage === 'mundari') {
      setTargetTribalLanguage(uiLanguage as TribalLanguage);
    }
  }, [uiLanguage]);

  const setUiLanguage = (lang: UILanguage) => {
    setUiLanguageState(lang);
    i18n.setLanguage(lang);
    if (lang === 'santhali' || lang === 'ho' || lang === 'mundari') {
      setTargetTribalLanguage(lang as TribalLanguage);
    }
  };

  const t = (key: string, lang?: UILanguage) => {
    return i18n.t(key, lang || uiLanguage);
  };

  const speakText = (text: string, lang?: TribalLanguage | UILanguage) => {
    const speakLang = (lang && ['santhali', 'ho', 'mundari', 'kurukh', 'kharia'].includes(lang))
      ? (lang as TribalLanguage)
      : targetTribalLanguage;
    speechService.speak(text, speakLang);
  };

  return (
    <LanguageContext.Provider
      value={{
        uiLanguage,
        setUiLanguage,
        targetTribalLanguage,
        setTargetTribalLanguage,
        t,
        speakText,
        availableLanguages: i18n.getAvailableLanguages()
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
'''

with open('frontend/src/services/i18nService.ts', 'w', encoding='utf-8') as f:
    f.write(i18n_content)

os.makedirs('frontend/src/context', exist_ok=True)
with open('frontend/src/context/LanguageContext.tsx', 'w', encoding='utf-8') as f:
    f.write(context_content)

print('Generated frontend/src/services/i18nService.ts and frontend/src/context/LanguageContext.tsx successfully!')
