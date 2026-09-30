"""
BHASHASETU: Adaptive Learning & FLN Competency Mastery Engine
Calculates student mastery across foundational competencies, diagnoses learning gaps,
and drives automated teacher interventions.
"""

from typing import Dict, List, Optional, Any
from pydantic import BaseModel, Field
import time

class CompetencyDef(BaseModel):
    id: str
    name_hindi: str
    name_english: str
    domain: str # 'literacy' or 'numeracy'
    target_fln_level: str
    benchmark_mastery_pct: float = 75.0

# 8 Core FLN Competencies defined by NIPUN Bharat & JCERT
FLN_COMPETENCIES: Dict[str, CompetencyDef] = {
    "comp_phonics": CompetencyDef(
        id="comp_phonics",
        name_hindi="ध्वनि एवं अक्षर पहचान (Phonemic Decoding)",
        name_english="Phonemic Awareness & Decoding",
        domain="literacy",
        target_fln_level="Level 1"
    ),
    "comp_vocab": CompetencyDef(
        id="comp_vocab",
        name_hindi="मातृभाषा मौखिक शब्दावली (Oral Vocabulary)",
        name_english="Oral Vocabulary in Mother Tongue",
        domain="literacy",
        target_fln_level="Level 1"
    ),
    "comp_oral_fluency": CompetencyDef(
        id="comp_oral_fluency",
        name_hindi="मौखिक पठन प्रवाह (Oral Reading Fluency)",
        name_english="Oral Reading Fluency",
        domain="literacy",
        target_fln_level="Level 2"
    ),
    "comp_comprehension": CompetencyDef(
        id="comp_comprehension",
        name_hindi="श्रवण एवं पाठ बोध (Comprehension)",
        name_english="Listening & Text Comprehension",
        domain="literacy",
        target_fln_level="Level 2"
    ),
    "comp_counting": CompetencyDef(
        id="comp_counting",
        name_hindi="1 से 20 तक संख्या ज्ञान (Counting 1-20)",
        name_english="Number Sense & Counting",
        domain="numeracy",
        target_fln_level="Level 1"
    ),
    "comp_addition": CompetencyDef(
        id="comp_addition",
        name_hindi="एक अंकीय जोड़ (Single-digit Addition)",
        name_english="Foundational Addition",
        domain="numeracy",
        target_fln_level="Level 2"
    ),
    "comp_subtraction": CompetencyDef(
        id="comp_subtraction",
        name_hindi="एक अंकीय घटाव (Single-digit Subtraction)",
        name_english="Foundational Subtraction",
        domain="numeracy",
        target_fln_level="Level 2"
    ),
    "comp_patterns": CompetencyDef(
        id="comp_patterns",
        name_hindi="आकार एवं पैटर्न समझ (Shapes & Patterns)",
        name_english="Spatial Patterns & Shapes",
        domain="numeracy",
        target_fln_level="Level 1"
    )
}

# Simulated in-memory cohort for demonstration
STUDENT_COHORT = [
    {
        "student_id": "std-001",
        "name": "बिरबल मुर्मू (Birbal Murmu)",
        "grade": "Class 2",
        "language": "santhali",
        "school": "राजकीय प्राथमिक विद्यालय, दुमका (GPS Dumka)",
        "mastery_matrix": {
            "comp_phonics": 85.0,
            "comp_vocab": 90.0,
            "comp_oral_fluency": 78.0,
            "comp_comprehension": 70.0,
            "comp_counting": 95.0,
            "comp_addition": 80.0,
            "comp_subtraction": 45.0, # Gap identified
            "comp_patterns": 82.0
        },
        "last_assessed": "2026-09-08"
    },
    {
        "student_id": "std-002",
        "name": "सोनी हेम्ब्रम (Soni Hembram)",
        "grade": "Class 2",
        "language": "santhali",
        "school": "राजकीय प्राथमिक विद्यालय, दुमका (GPS Dumka)",
        "mastery_matrix": {
            "comp_phonics": 92.0,
            "comp_vocab": 94.0,
            "comp_oral_fluency": 88.0,
            "comp_comprehension": 85.0,
            "comp_counting": 90.0,
            "comp_addition": 85.0,
            "comp_subtraction": 75.0,
            "comp_patterns": 90.0
        },
        "last_assessed": "2026-09-08"
    },
    {
        "student_id": "std-003",
        "name": "मंगरा उरांव (Mangra Oraon)",
        "grade": "Class 2",
        "language": "kurukh",
        "school": "उत्क्रमित प्राथमिक विद्यालय, गुमला (UPS Gumla)",
        "mastery_matrix": {
            "comp_phonics": 55.0, # Gap identified
            "comp_vocab": 80.0,
            "comp_oral_fluency": 50.0, # Gap identified
            "comp_comprehension": 60.0,
            "comp_counting": 85.0,
            "comp_addition": 70.0,
            "comp_subtraction": 65.0,
            "comp_patterns": 70.0
        },
        "last_assessed": "2026-09-07"
    },
    {
        "student_id": "std-004",
        "name": "सलमा मुंडा (Salma Munda)",
        "grade": "Class 2",
        "language": "mundari",
        "school": "प्राथमिक विद्यालय, खूंटी (PS Khunti)",
        "mastery_matrix": {
            "comp_phonics": 88.0,
            "comp_vocab": 92.0,
            "comp_oral_fluency": 82.0,
            "comp_comprehension": 78.0,
            "comp_counting": 92.0,
            "comp_addition": 88.0,
            "comp_subtraction": 80.0,
            "comp_patterns": 85.0
        },
        "last_assessed": "2026-09-08"
    }
]

class AdaptiveLearningEngine:
    """Computes classroom mastery aggregates and diagnoses individual student learning gaps."""
    
    @staticmethod
    def get_class_analytics(grade: str = "Class 2") -> Dict[str, Any]:
        """Calculates cohort-level competency heatmaps and identifies struggling students."""
        students = [s for s in STUDENT_COHORT if s["grade"] == grade]
        if not students:
            students = STUDENT_COHORT

        competency_aggregates: Dict[str, Dict[str, Any]] = {}
        struggling_students: List[Dict[str, Any]] = []

        for comp_id, comp_def in FLN_COMPETENCIES.items():
            scores = [s["mastery_matrix"].get(comp_id, 0.0) for s in students]
            avg_score = round(sum(scores) / max(1, len(scores)), 1)
            below_benchmark = sum(1 for score in scores if score < comp_def.benchmark_mastery_pct)
            
            competency_aggregates[comp_id] = {
                "id": comp_id,
                "name_hindi": comp_def.name_hindi,
                "name_english": comp_def.name_english,
                "domain": comp_def.domain,
                "average_mastery_pct": avg_score,
                "benchmark_pct": comp_def.benchmark_mastery_pct,
                "students_below_benchmark": below_benchmark,
                "status": "proficient" if avg_score >= 75 else ("developing" if avg_score >= 60 else "needs_support")
            }

        # Identify individual gaps
        for s in students:
            gaps = []
            for comp_id, score in s["mastery_matrix"].items():
                comp_def = FLN_COMPETENCIES.get(comp_id)
                if comp_def and score < 60.0:
                    gaps.append({
                        "competency_id": comp_id,
                        "competency_name": comp_def.name_hindi,
                        "score_pct": score
                    })
            if gaps:
                struggling_students.append({
                    "student_id": s["student_id"],
                    "name": s["name"],
                    "language": s["language"],
                    "school": s["school"],
                    "gaps": gaps,
                    "recommended_action": "Generate Targeted Remediation"
                })

        return {
            "grade": grade,
            "total_students_enrolled": len(students),
            "nipun_fln_compliance_pct": 78.4,
            "competency_heatmaps": competency_aggregates,
            "struggling_students": struggling_students,
            "generated_at": int(time.time())
        }

    @staticmethod
    def update_student_mastery(
        student_name: str,
        grade: str,
        exam_competency_scores: Dict[str, Dict[str, Any]]
    ) -> Dict[str, Any]:
        """Updates mastery scores after an assessment submission."""
        # Find or create student
        matching = [s for s in STUDENT_COHORT if s["name"] == student_name]
        if matching:
            student = matching[0]
        else:
            student = {
                "student_id": f"std-{int(time.time())}",
                "name": student_name,
                "grade": grade,
                "language": "santhali",
                "school": "GPS Dumka",
                "mastery_matrix": {k: 70.0 for k in FLN_COMPETENCIES.keys()},
                "last_assessed": "Just now"
            }
            STUDENT_COHORT.append(student)

        # Update mastery scores with moving average
        for comp_name, score_data in exam_competency_scores.items():
            earned = score_data.get("earned", 0)
            total = max(1, score_data.get("total", 1))
            pct = (earned / total) * 100.0
            
            # Map exam competency to FLN competency ID
            for comp_id, comp_def in FLN_COMPETENCIES.items():
                if comp_def.name_hindi in comp_name or comp_def.name_english in comp_name:
                    current = student["mastery_matrix"].get(comp_id, 65.0)
                    student["mastery_matrix"][comp_id] = round((current * 0.4) + (pct * 0.6), 1)

        return student

adaptive_engine = AdaptiveLearningEngine()
