"""
BHASHASETU: Database Initializer & Seed Script
Pre-loads 40 JCERT Primary Lessons, NIPUN FLN Assessment Bank, Language Vault, and Default Cohort
into the local persistent SQLite database for 100% offline self-contained operation.
"""

import os
import json
import time
from database import db
from language_packs import LANGUAGE_PACKS_REGISTRY
from community_vault import COMMUNITY_VAULT_STORE
from adaptive_learning import STUDENT_COHORT, FLN_COMPETENCIES
from curriculum_generator import _load_curriculum_lessons, ASSESSMENT_EXAMS_BANK

def seed_database():
    """Seeds initial data into local SQLite database if empty."""
    with db.session() as conn:
        # Check if already seeded
        row = conn.execute("SELECT COUNT(*) as cnt FROM curriculum_lessons;").fetchone()
        if row and row["cnt"] >= 40:
            return  # Already seeded

        print("Initializing & seeding local SQLite database (bhashasetu_local.db)...")
        now = int(time.time())

        # 1. Seed Schools
        schools = [
            ("sch-dumka-01", "राजकीय प्राथमिक विद्यालय, दुमका (GPS Dumka)", "Dumka", "Dumka Sadar", "Cluster 1", "santhali", 120, now),
            ("sch-khunti-01", "प्राथमिक विद्यालय, खूंटी (PS Khunti)", "Khunti", "Murhu", "Cluster 2", "mundari", 95, now),
            ("sch-chaibasa-01", "उत्क्रमित प्राथमिक विद्यालय, चाईबासा (UPS Chaibasa)", "West Singhbhum", "Chaibasa", "Cluster 3", "ho", 140, now),
            ("sch-gumla-01", "उत्क्रमित प्राथमिक विद्यालय, गुमला (UPS Gumla)", "Gumla", "Gumla Sadar", "Cluster 4", "kurukh", 85, now)
        ]
        for sch in schools:
            conn.execute("""
            INSERT OR IGNORE INTO schools (id, name, district, block, cluster, primary_tribal_language, total_enrolled, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?);
            """, sch)

        # 2. Seed Default Users
        users = [
            ("usr-teacher-01", "teacher_dumka", "सुनीता सोरेन (Sunita Soren)", "teacher", "sch-dumka-01", "santhali", now),
            ("usr-student-01", "student_birbal", "बिरबल मुर्मू (Birbal Murmu)", "student", "sch-dumka-01", "santhali", now),
            ("usr-validator-01", "validator_murmu", "पं. चरण मुर्मू (Pt. Charan Murmu)", "validator", "sch-dumka-01", "santhali", now),
            ("usr-admin-01", "admin_jharkhand", "प्रशासनिक अधिकारी (District Officer)", "admin", "sch-dumka-01", "santhali", now)
        ]
        for u in users:
            conn.execute("""
            INSERT OR IGNORE INTO users (id, username, full_name, role, school_id, language_preference, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?);
            """, u)

        # 3. Seed 40 JCERT Lessons
        lessons = _load_curriculum_lessons()
        for l in lessons:
            conn.execute("""
            INSERT OR REPLACE INTO curriculum_lessons (
                id, grade, subject, chapter_number, title, tribal_title_json,
                learning_outcomes_json, steps_json, source, version, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
            """, (
                l.get("id"),
                l.get("grade", "Class 1"),
                l.get("subject", "भाषा अंजलि"),
                l.get("chapter_number", 1),
                l.get("title", "पाठ"),
                json.dumps(l.get("tribal_title", {}), ensure_ascii=False),
                json.dumps(l.get("learning_outcomes", []), ensure_ascii=False),
                json.dumps(l.get("steps", []), ensure_ascii=False),
                "JCERT Jharkhand Primary Curriculum",
                "1.2.0",
                now
            ))

        # 4. Seed Assessment Exams
        for ex in ASSESSMENT_EXAMS_BANK:
            conn.execute("""
            INSERT OR REPLACE INTO assessment_exams (
                id, title, grade, exam_type, total_marks, time_minutes,
                competencies_json, questions_json, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
            """, (
                ex.get("id"),
                ex.get("title"),
                ex.get("grade"),
                ex.get("exam_type"),
                ex.get("total_marks"),
                ex.get("time_minutes"),
                json.dumps(ex.get("competencies", []), ensure_ascii=False),
                json.dumps(ex.get("questions", []), ensure_ascii=False),
                now
            ))

        # 5. Seed Students Cohort
        for s in STUDENT_COHORT:
            conn.execute("""
            INSERT OR REPLACE INTO students (
                id, name, grade, school_id, language, mastery_json, last_assessed, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?);
            """, (
                s.get("student_id"),
                s.get("name"),
                s.get("grade"),
                "sch-dumka-01",
                s.get("language"),
                json.dumps(s.get("mastery_matrix", {}), ensure_ascii=False),
                s.get("last_assessed"),
                now
            ))

        # 6. Seed Community Vault
        for v in COMMUNITY_VAULT_STORE:
            conn.execute("""
            INSERT OR REPLACE INTO community_vault (
                id, language, script, term_or_phrase, native_script_text, devanagari_text,
                meaning_hindi, meaning_english, domain, audio_phonemes, cultural_notes,
                contributor_name, contributor_role, region, sovereignty_tier,
                validation_status, validator_notes, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
            """, (
                v.id, v.language, v.script, v.term_or_phrase, v.native_script_text, v.devanagari_text,
                v.meaning_hindi, v.meaning_english, v.domain, v.audio_phonemes, v.cultural_notes,
                v.contributor_name, v.contributor_role, v.region, v.sovereignty_tier,
                v.validation_status, v.validator_notes, v.created_at, v.updated_at
            ))

        print("Local SQLite database seeded successfully with 40 JCERT lessons, assessments, and community vault.")

if __name__ == "__main__":
    seed_database()
