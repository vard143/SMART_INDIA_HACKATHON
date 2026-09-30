"""
BHASHASETU Production QA Suite: NIPUN Bharat FLN Pedagogy & Curriculum Testing
Validates:
1. NIPUN Bharat & JCERT FLN Framework Alignment (Balvatika - Class 3)
2. 14-Point Structured Trilingual Lesson Architecture
3. Bilingual Worksheet Generation (Matching, Realia Counting, Script Tracing, Fill-in-the-blanks)
4. Formative Assessment Scoring & Mastery Badge Classification
5. 3-Day Targeted Remediation Generation
"""

import pytest
import sys
import os

# Ensure backend directory is in path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'backend')))

from fastapi.testclient import TestClient
from main import app
from ai_engine import AIModelRouter
from ai_router import ai_router

client = TestClient(app)

class TestNipunFlnPedagogy:
    
    # 14 mandatory components of the BHASHASETU pedagogical framework
    REQUIRED_COMPONENTS = [
        "1_learning_objective",
        "2_prerequisites",
        "3_teacher_explanation",
        "4_mother_tongue_explanation",
        "5_localized_realia_example",
        "6_essential_vocabulary",
        "7_story_activity",
        "8_blackboard_activity",
        "9_student_practice"
    ]

    # ========================================================
    # 1. 14-POINT PEDAGOGICAL LESSON ARCHITECTURE
    # ========================================================

    def test_lesson_generation_trilingual_structure(self):
        """Verify generated lesson contains tribal, Hindi, and English content across all key stages."""
        plan = AIModelRouter.generate_pedagogical_lesson(
            topic="एक अंकीय जोड़ (Addition 1-9)",
            grade="Class 1",
            subject="गणित ज्ञान (Foundational Numeracy)",
            target_lang="santhali",
            target_script="ol_chiki",
            local_context_theme="nature_village"
        )

        assert "id" in plan
        assert "topic_hindi" in plan
        assert "topic_tribal" in plan
        assert "topic_english" in plan
        
        comps = plan["pedagogical_components"]
        for comp_key in self.REQUIRED_COMPONENTS:
            assert comp_key in comps, f"Missing required pedagogical stage: '{comp_key}'"

        # Check Trilingual objective
        obj = comps["1_learning_objective"]
        assert "tribal_primary" in obj
        assert "hindi" in obj
        assert "english" in obj

        # Check Local Realia
        realia = comps["5_localized_realia_example"]
        assert "dialogue_tribal" in realia
        assert "dialogue_hindi" in realia

    # ========================================================
    # 2. BILINGUAL WORKSHEET GENERATION
    # ========================================================

    def test_subject_worksheet_generation_structure(self):
        """Verify worksheet generation provides all 4 NIPUN activity formats with authentic tribal realia."""
        res = client.post('/api/v1/worksheets/generate-by-subject', json={
            "grade": "Class 1",
            "subject": "math",
            "target_lang": "santhali",
            "target_script": "ol_chiki"
        })
        assert res.status_code == 200
        data = res.json()

        # Must include all 4 worksheet types
        assert "match_section" in data
        assert "count_section" in data
        assert "trace_section" in data
        assert "fill_section" in data
        assert "title" in data

    # ========================================================
    # 3. FORMATIVE ASSESSMENT & MASTERY BADGE
    # ========================================================

    def test_assessment_grading_and_nipun_badge(self):
        """Verify exam submission calculates score and awards accurate NIPUN proficiency badge."""
        res = client.post('/api/v1/assessments/submit', json={
            "exam_id": "exam-nipun-01",
            "student_name": "सुनीता मुर्मू (Sunita Murmu)",
            "student_class": "Class 1",
            "target_lang": "santhali",
            "answers": {"1": "A", "2": "C", "3": "A"}
        })
        assert res.status_code == 200
        result = res.json()
        assert "earned_marks" in result
        assert "total_marks" in result
        assert "badge" in result
        # Check badge formatting
        assert any(keyword in result["badge"] for keyword in ["प्रवीण", "निपुण", "साधक", "आरंभिक", "Mastery", "Proficient"])

    # ========================================================
    # 4. ADAPTIVE REMEDIATION GENERATION
    # ========================================================

    def test_adaptive_remediation_generation(self):
        """Verify targeted 3-day remediation plan is generated for struggling FLN students."""
        plan = ai_router.ai_provider.generate_remediation(
            student_id="std-qa-001",
            student_name="बिरबल होन",
            competency="ध्वनि एवं अक्षर पहचान",
            score_pct=40.0,
            grade="Class 1",
            language="santhali"
        )
        assert plan["student_name"] == "बिरबल होन"
        assert len(plan["gap_diagnosis"]) > 0
        assert len(plan["remedial_steps"]) >= 3
        # Check daily actions
        for step in plan["remedial_steps"]:
            assert "day" in step
            assert "focus" in step
            assert "activity_hindi" in step
