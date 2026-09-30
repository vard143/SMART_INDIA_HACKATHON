import { RemediationPlan, TribalLanguage } from '../types';

export interface FLNCompetencyMeta {
  id: string;
  nameHindi: string;
  nameEnglish: string;
  domain: 'literacy' | 'numeracy';
  targetFlnLevel: string;
  benchmarkPct: number;
}

export const FLN_COMPETENCIES_MAP: Record<string, FLNCompetencyMeta> = {
  comp_phonics: {
    id: 'comp_phonics',
    nameHindi: 'ध्वनि एवं अक्षर पहचान (Phonemic Decoding)',
    nameEnglish: 'Phonemic Awareness & Decoding',
    domain: 'literacy',
    targetFlnLevel: 'Level 1',
    benchmarkPct: 75
  },
  comp_vocab: {
    id: 'comp_vocab',
    nameHindi: 'मातृभाषा मौखिक शब्दावली (Oral Vocabulary)',
    nameEnglish: 'Oral Vocabulary in Mother Tongue',
    domain: 'literacy',
    targetFlnLevel: 'Level 1',
    benchmarkPct: 75
  },
  comp_oral_fluency: {
    id: 'comp_oral_fluency',
    nameHindi: 'मौखिक पठन प्रवाह (Oral Reading Fluency)',
    nameEnglish: 'Oral Reading Fluency',
    domain: 'literacy',
    targetFlnLevel: 'Level 2',
    benchmarkPct: 75
  },
  comp_comprehension: {
    id: 'comp_comprehension',
    nameHindi: 'श्रवण एवं पाठ बोध (Comprehension)',
    nameEnglish: 'Listening & Text Comprehension',
    domain: 'literacy',
    targetFlnLevel: 'Level 2',
    benchmarkPct: 70
  },
  comp_counting: {
    id: 'comp_counting',
    nameHindi: '1 से 20 तक संख्या ज्ञान (Counting 1-20)',
    nameEnglish: 'Number Sense & Counting',
    domain: 'numeracy',
    targetFlnLevel: 'Level 1',
    benchmarkPct: 80
  },
  comp_addition: {
    id: 'comp_addition',
    nameHindi: 'एक अंकीय जोड़ (Single-digit Addition)',
    nameEnglish: 'Foundational Addition',
    domain: 'numeracy',
    targetFlnLevel: 'Level 2',
    benchmarkPct: 75
  },
  comp_subtraction: {
    id: 'comp_subtraction',
    nameHindi: 'एक अंकीय घटाव (Single-digit Subtraction)',
    nameEnglish: 'Foundational Subtraction',
    domain: 'numeracy',
    targetFlnLevel: 'Level 2',
    benchmarkPct: 70
  },
  comp_patterns: {
    id: 'comp_patterns',
    nameHindi: 'आकार एवं पैटर्न समझ (Shapes & Patterns)',
    nameEnglish: 'Spatial Patterns & Shapes',
    domain: 'numeracy',
    targetFlnLevel: 'Level 1',
    benchmarkPct: 75
  }
};

export interface StudentMasteryProfile {
  studentId: string;
  name: string;
  grade: string;
  language: TribalLanguage;
  school: string;
  masteryMatrix: Record<string, number>;
  lastAssessed: string;
}

export const INITIAL_STUDENTS_COHORT: StudentMasteryProfile[] = [
  {
    studentId: 'std-001',
    name: 'बिरबल मुर्मू (Birbal Murmu)',
    grade: 'Class 2',
    language: 'santhali',
    school: 'राजकीय प्राथमिक विद्यालय, दुमका (GPS Dumka)',
    masteryMatrix: {
      comp_phonics: 85.0,
      comp_vocab: 90.0,
      comp_oral_fluency: 78.0,
      comp_comprehension: 70.0,
      comp_counting: 95.0,
      comp_addition: 80.0,
      comp_subtraction: 45.0, // Struggling in subtraction
      comp_patterns: 82.0
    },
    lastAssessed: '2026-09-08'
  },
  {
    studentId: 'std-002',
    name: 'सोनी हेम्ब्रम (Soni Hembram)',
    grade: 'Class 2',
    language: 'santhali',
    school: 'राजकीय प्राथमिक विद्यालय, दुमका (GPS Dumka)',
    masteryMatrix: {
      comp_phonics: 92.0,
      comp_vocab: 94.0,
      comp_oral_fluency: 88.0,
      comp_comprehension: 85.0,
      comp_counting: 90.0,
      comp_addition: 85.0,
      comp_subtraction: 75.0,
      comp_patterns: 90.0
    },
    lastAssessed: '2026-09-08'
  },
  {
    studentId: 'std-003',
    name: 'मंगरा उरांव (Mangra Oraon)',
    grade: 'Class 2',
    language: 'kurukh',
    school: 'उत्क्रमित प्राथमिक विद्यालय, गुमला (UPS Gumla)',
    masteryMatrix: {
      comp_phonics: 52.0, // Struggling in phonics decoding
      comp_vocab: 80.0,
      comp_oral_fluency: 48.0, // Struggling in oral fluency
      comp_comprehension: 60.0,
      comp_counting: 85.0,
      comp_addition: 70.0,
      comp_subtraction: 65.0,
      comp_patterns: 70.0
    },
    lastAssessed: '2026-09-07'
  },
  {
    studentId: 'std-004',
    name: 'सलमा मुंडा (Salma Munda)',
    grade: 'Class 2',
    language: 'mundari',
    school: 'प्राथमिक विद्यालय, खूंटी (PS Khunti)',
    masteryMatrix: {
      comp_phonics: 88.0,
      comp_vocab: 92.0,
      comp_oral_fluency: 82.0,
      comp_comprehension: 78.0,
      comp_counting: 92.0,
      comp_addition: 88.0,
      comp_subtraction: 80.0,
      comp_patterns: 85.0
    },
    lastAssessed: '2026-09-08'
  }
];

class AdaptiveLearningService {
  private cohort: StudentMasteryProfile[] = [...INITIAL_STUDENTS_COHORT];

  getCohort(grade: string = 'Class 2'): StudentMasteryProfile[] {
    return this.cohort.filter(s => s.grade === grade);
  }

  getStudent(id: string): StudentMasteryProfile | undefined {
    return this.cohort.find(s => s.studentId === id);
  }

  getCompetencyAverages(grade: string = 'Class 2'): Record<string, { avg: number; belowBenchmark: number; status: string }> {
    const students = this.getCohort(grade);
    const result: Record<string, { avg: number; belowBenchmark: number; status: string }> = {};

    Object.keys(FLN_COMPETENCIES_MAP).forEach(compId => {
      const scores = students.map(s => s.masteryMatrix[compId] || 0);
      const avg = Math.round((scores.reduce((a, b) => a + b, 0) / Math.max(1, scores.length)) * 10) / 10;
      const benchmark = FLN_COMPETENCIES_MAP[compId].benchmarkPct;
      const belowBenchmark = scores.filter(score => score < benchmark).length;
      
      let status = 'proficient';
      if (avg < 60) status = 'needs_support';
      else if (avg < 75) status = 'developing';

      result[compId] = { avg, belowBenchmark, status };
    });

    return result;
  }

  updateStudentExamResults(
    studentName: string, 
    grade: string, 
    language: TribalLanguage, 
    competencyScores: Record<string, { earned: number; total: number }>
  ): StudentMasteryProfile {
    let student = this.cohort.find(s => s.name.toLowerCase() === studentName.toLowerCase());
    
    if (!student) {
      student = {
        studentId: `std-live-${Date.now().toString().slice(-4)}`,
        name: studentName,
        grade: grade || 'Class 2',
        language: language || 'santhali',
        school: 'राजकीय प्राथमिक विद्यालय (Live School Evaluated)',
        masteryMatrix: {
          comp_phonics: 75,
          comp_vocab: 75,
          comp_oral_fluency: 75,
          comp_comprehension: 70,
          comp_counting: 80,
          comp_addition: 75,
          comp_subtraction: 70,
          comp_patterns: 75
        },
        lastAssessed: new Date().toISOString().split('T')[0]
      };
      this.cohort.unshift(student);
    }

    // Map and update each evaluated competency score
    Object.entries(competencyScores).forEach(([compName, score]) => {
      const pct = Math.round((score.earned / Math.max(1, score.total)) * 100);
      
      for (const [key, meta] of Object.entries(FLN_COMPETENCIES_MAP)) {
        if (
          compName.toLowerCase().includes(meta.nameHindi.toLowerCase()) || 
          compName.toLowerCase().includes(meta.nameEnglish.toLowerCase()) ||
          meta.nameHindi.toLowerCase().includes(compName.toLowerCase()) ||
          meta.nameEnglish.toLowerCase().includes(compName.toLowerCase())
        ) {
          student!.masteryMatrix[key] = pct;
        }
      }
    });

    student.lastAssessed = new Date().toISOString().split('T')[0];
    return student;
  }

  generateRemediationOffline(
    studentId: string,
    studentName: string,
    competencyId: string,
    grade: string,
    language: TribalLanguage
  ): RemediationPlan {
    const compMeta = FLN_COMPETENCIES_MAP[competencyId] || { nameHindi: 'बुनियादी दक्षता', benchmarkPct: 75 };
    const student = this.getStudent(studentId);
    const currentScore = student ? (student.masteryMatrix[competencyId] || 50) : 50;

    return {
      remediation_id: `rem-${studentId}-${Date.now()}`,
      student_name: studentName,
      grade: grade,
      target_competency: compMeta.nameHindi,
      current_score_pct: currentScore,
      gap_diagnosis: `छात्र को '${compMeta.nameHindi}' में विशेष सहयोग की आवश्यकता है (वर्तमान दक्षता स्तर: ${currentScore}%)।`,
      recommended_duration_days: 3,
      daily_minutes: 15,
      remedial_steps: [
        {
          day: 1,
          focus: 'ध्वनि एवं मौखिक पहचान (Auditory & Oral Familiarization)',
          activity: 'मातृभाषा में ऑडियो शब्दों को 3 बार सुनना और दोहराना।',
          tlem_material: 'चित्र कार्ड (Flashcards) और वास्तविक परिवेशीय वस्तुएँ'
        },
        {
          day: 2,
          focus: 'चित्र आधारित मिलान एवं स्पर्श (Tactile & Visual Association)',
          activity: 'कंकड़, पत्तों या बीजों के प्रत्यक्ष स्पर्श द्वारा संख्या/अक्षर बोध।',
          tlem_material: 'माटी की गोलियाँ, बीज, इमली के दाने'
        },
        {
          day: 3,
          focus: 'सकारात्मक पुनरावृत्ति एवं सूक्ष्म मूल्यांकन (Micro-Assessment)',
          activity: '2 सरल प्रश्नों की खेल-आधारित मौखिक प्रश्नोत्तरी।',
          tlem_material: 'प्रशंसा बैज और स्टार स्टीकर'
        }
      ],
      teacher_monitoring_tip: "बच्चे को हतोत्साहित न करें; प्रत्येक सही प्रयास पर मातृभाषा में 'नापाय' (शाबाश) कहकर प्रोत्साहित करें।",
      status: 'ASSIGNED_REMEDIATION'
    };
  }
}

export const adaptiveService = new AdaptiveLearningService();
