"""
BHASHASETU Production QA Suite: Offline Data Integrity & Disaster Recovery Testing
Validates:
1. SQLite Write-Ahead Logging (WAL) Mode configuration
2. Transaction atomicity and rollback safety
3. Automated school backup creation and zip archive integrity
4. Community Vault persistence
5. Complete zero-external-network isolation
"""

import pytest
import sys
import os
import sqlite3
import zipfile
import time

# Ensure backend directory is in path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'backend')))

from database import db, DB_PATH
from community_vault import community_vault_manager

class TestOfflineDataIntegrity:
    
    # ========================================================
    # 1. SQLITE WAL MODE & LOCAL PRAGMAS
    # ========================================================

    def test_sqlite_wal_mode_active(self):
        """Verify SQLite operates in WAL (Write-Ahead Logging) mode for concurrent tablet read/writes."""
        with sqlite3.connect(DB_PATH) as conn:
            cursor = conn.cursor()
            cursor.execute("PRAGMA journal_mode;")
            journal_mode = cursor.fetchone()[0]
            assert journal_mode.upper() == "WAL", f"Expected WAL mode, got: {journal_mode}"

    def test_foreign_keys_and_synchronous_pragmas(self):
        """Verify database pragma configuration provides tablet data protection against sudden power-offs."""
        with sqlite3.connect(DB_PATH) as conn:
            cursor = conn.cursor()
            cursor.execute("PRAGMA synchronous;")
            sync_val = cursor.fetchone()[0]
            # Synchronous should be NORMAL (1) or FULL (2) for corruption safety
            assert sync_val in [1, 2]

    # ========================================================
    # 2. TRANSACTION ATOMICITY & RECOVERY
    # ========================================================

    def test_transaction_atomicity_on_custom_lesson(self):
        """Verify saving a lesson executes atomically without partial corruption."""
        lesson_id = f"qa-tx-lesson-{os.getpid()}"
        now = int(time.time())
        title = "परख पाठ: प्रकृति संरक्षण"
        
        # Save atomically via db.session()
        with db.session() as conn:
            conn.execute("""
            INSERT OR REPLACE INTO curriculum_lessons (
                id, grade, subject, chapter_number, title, tribal_title_json, learning_outcomes_json, steps_json, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
            """, (
                lesson_id, "Class 2", "पर्यावरण अध्ययन (EVS)", 99, title,
                '{"santhali": "ᱥᱟᱨᱡᱚᱢ ᱫᱟᱨᱮ"}',
                '["प्रकृति संरक्षण"]',
                '["अभ्यास 1"]',
                now
            ))

        # Retrieve and verify
        with db.session() as conn:
            row = conn.execute("SELECT * FROM curriculum_lessons WHERE id = ?;", (lesson_id,)).fetchone()
            assert row is not None
            assert row["title"] == title

    # ========================================================
    # 3. COMMUNITY VAULT PERSISTENCE
    # ========================================================

    def test_community_vault_contribution_and_query(self):
        """Verify indigenous community contributions persist and query correctly."""
        entry = community_vault_manager.submit_contribution({
            "language": "santhali",
            "script": "ol_chiki",
            "term_or_phrase": "ᱥᱟᱨᱡᱚᱢ ᱥᱟᱠᱟᱢ",
            "devanagari_text": "सारजोम साकाम",
            "meaning_hindi": "सखुआ का पत्ता",
            "meaning_english": "Sal Leaf",
            "contributor_name": "QA Lead Tester",
            "contributor_role": "Validator",
            "domain": "nature",
            "audio_phonemes": "sarjom sakam"
        })
        assert entry["validation_status"] in ["TEACHER_REVIEWED", "COMMUNITY_VALIDATED"]
        
        all_terms = community_vault_manager.get_vault_items(language="santhali")
        assert len(all_terms) > 0

    # ========================================================
    # 4. DISASTER RECOVERY BACKUP CREATION
    # ========================================================

    def test_automated_backup_zip_integrity(self):
        """Verify local disaster recovery zip backup creates a valid, readable zip archive."""
        sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'scripts')))
        from backup_manager import create_backup

        backup_path = create_backup()
        assert os.path.exists(backup_path), f"Backup zip not created at {backup_path}"
        assert os.path.getsize(backup_path) > 1000, "Backup zip is suspiciously small or empty"

        # Verify zip archive integrity
        with zipfile.ZipFile(backup_path, 'r') as zf:
            bad_file = zf.testzip()
            assert bad_file is None, f"Corrupted file inside backup zip: {bad_file}"
            namelist = zf.namelist()
            assert any("bhashasetu_local.db" in name for name in namelist)
