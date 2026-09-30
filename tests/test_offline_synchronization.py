"""
BHASHASETU (भाषा सेतु) Production QA Suite:
Offline-First Persistence, Sync Queue & Bidirectional Synchronization Verification
"""

import sys
import os
import time
import json
import pytest

# Ensure backend directory is in path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'backend')))

from fastapi.testclient import TestClient
from main import app
from database import db

client = TestClient(app)

class TestOfflineSynchronizationEngine:
    """Rigorous tests for Offline-to-Online Batch Synchronization."""

    def test_sync_upload_endpoint_contract(self):
        """Verify POST /api/v1/sync/upload accepts batch offline mutations and processes them atomically."""
        test_ts = int(time.time())
        unique_suffix = f"test-{test_ts}"

        payload = {
            "device_id": "school-tablet-dumka-01",
            "events": [
                {
                    "event_id": f"ev-attempt-{unique_suffix}",
                    "entity_type": "attempt",
                    "entity_id": f"att-{unique_suffix}",
                    "operation": "INSERT",
                    "timestamp": test_ts,
                    "payload": {
                        "exam_id": "exam-nipun-01",
                        "student_id": f"std-{unique_suffix}",
                        "student_name": "सिदो मुर्मू",
                        "student_class": "Class 1",
                        "target_lang": "santhali",
                        "answers": {"1": "opt-1", "2": "opt-2"},
                        "oral_text_recorded": "दारे",
                        "earned_marks": 25,
                        "percentage": 100.0,
                        "badge": "🌟 निपुण प्रवीण",
                        "proficiency_level": "PROFICIENT",
                        "teacher_remark": "उत्कृष्ट प्रदर्शन",
                        "competency_breakdown": {"Vocabulary": {"earned": 5, "total": 5}},
                        "question_results": [{"q_id": 1, "is_correct": True}]
                    }
                },
                {
                    "event_id": f"ev-vault-{unique_suffix}",
                    "entity_type": "vault_item",
                    "entity_id": f"vlt-{unique_suffix}",
                    "operation": "INSERT",
                    "timestamp": test_ts,
                    "payload": {
                        "language": "santhali",
                        "script": "Ol Chiki",
                        "term_or_phrase": "ᱫᱟᱨᱮ",
                        "native_script_text": "ᱫᱟᱨᱮ",
                        "devanagari_text": "दारे",
                        "meaning_hindi": "पेड़ / वृक्ष",
                        "meaning_english": "Tree",
                        "domain": "Flora",
                        "contributor_name": "मांझी हड़ाम",
                        "contributor_role": "community_elder",
                        "region": "संथाल परगना",
                        "sovereignty_tier": "PUBLIC"
                    }
                },
                {
                    "event_id": f"ev-lesson-{unique_suffix}",
                    "entity_type": "custom_lesson",
                    "entity_id": f"les-{unique_suffix}",
                    "operation": "INSERT",
                    "timestamp": test_ts,
                    "payload": {
                        "lesson_id": f"les-{unique_suffix}",
                        "title": "गाँव के पेड़-पौधे और हमारी प्रकृति",
                        "grade": "Class 1",
                        "subject": "hindi",
                        "target_lang": "santhali",
                        "lesson_plan": {
                            "topic_tribal": "ᱥᱟᱨᱡᱚᱢ ᱫᱟᱨᱮ",
                            "topic_devanagari": "सारजोम दारे",
                            "pedagogical_components": {
                                "9_student_practice": ["पेड़ के पत्तों को गिनना", "सारजोम शब्द लिखना"]
                            }
                        }
                    }
                }
            ]
        }

        response = client.post("/api/v1/sync/upload", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "success"
        assert data["synced_count"] == 3
        assert data["failed_count"] == 0
        assert f"ev-attempt-{unique_suffix}" in data["synced_event_ids"]

        # Verify persistence in SQLite tables
        with db.session() as conn:
            # 1. Exam attempt
            att = conn.execute("SELECT * FROM exam_attempts WHERE id = ?;", (f"att-{unique_suffix}",)).fetchone()
            assert att is not None
            assert att["student_name"] == "सिदो मुर्मू"
            assert att["sync_status"] == "SYNCED"

            # 2. Vault item
            vlt = conn.execute("SELECT * FROM community_vault WHERE id = ?;", (f"vlt-{unique_suffix}",)).fetchone()
            assert vlt is not None
            assert vlt["meaning_hindi"] == "पेड़ / वृक्ष"

            # 3. Custom lesson
            les = conn.execute("SELECT * FROM curriculum_lessons WHERE id = ?;", (f"les-{unique_suffix}",)).fetchone()
            assert les is not None
            assert les["title"] == "गाँव के पेड़-पौधे और हमारी प्रकृति"

            # 4. Sync queue logging
            sq = conn.execute("SELECT * FROM sync_queue WHERE event_id = ?;", (f"ev-attempt-{unique_suffix}",)).fetchone()
            assert sq is not None
            assert sq["sync_status"] == "SYNCED"

    def test_idempotency_prevents_duplicate_records(self):
        """Verify duplicate sync payloads are idempotent and do not create duplicate records."""
        test_ts = int(time.time())
        idempotent_ev = f"ev-idemp-{test_ts}"

        payload = {
            "device_id": "school-tablet-02",
            "events": [
                {
                    "event_id": idempotent_ev,
                    "entity_type": "attempt",
                    "entity_id": f"att-idemp-{test_ts}",
                    "operation": "INSERT",
                    "timestamp": test_ts,
                    "payload": {
                        "exam_id": "exam-nipun-01",
                        "student_name": "कन्हू मुर्मू",
                        "student_class": "Class 2",
                        "target_lang": "mundari",
                        "earned_marks": 20,
                        "total_marks": 25,
                        "percentage": 80.0
                    }
                }
            ]
        }

        # First upload
        res1 = client.post("/api/v1/sync/upload", json=payload)
        assert res1.status_code == 200
        assert res1.json()["synced_count"] == 1

        # Second upload (same event_id)
        res2 = client.post("/api/v1/sync/upload", json=payload)
        assert res2.status_code == 200
        assert res2.json()["synced_count"] == 1
        assert res2.json()["failed_count"] == 0

        # Verify only 1 record exists in SQLite
        with db.session() as conn:
            attempts = conn.execute("SELECT COUNT(*) as cnt FROM exam_attempts WHERE id = ?;", (f"att-idemp-{test_ts}",)).fetchone()
            assert attempts["cnt"] == 1

    def test_sync_bundle_download_contract(self):
        """Verify GET /api/v1/sync/bundle returns all required offline packs, lessons, and vocab."""
        t0 = time.perf_counter()
        res = client.get("/api/v1/sync/bundle")
        t_delta = time.perf_counter() - t0

        assert res.status_code == 200
        data = res.json()
        assert "version" in data
        assert "lessons_bank" in data
        assert len(data["lessons_bank"]) > 0
        assert "language_packs" in data
        assert len(data["language_packs"]) >= 3
        assert "vocabulary_bank" in data
        assert len(data["vocabulary_bank"]) > 0
        assert "community_vault_bank" in data

        # Must execute swiftly on edge localhost (< 100ms)
        assert t_delta < 0.1, f"Sync bundle took too long: {t_delta}s"
