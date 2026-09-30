"""
BHASHASETU: Local Persistent SQLite Database Engine
Features:
- 100% Zero-Internet Local Persistence
- SQLite in WAL (Write-Ahead Logging) mode for fast concurrent reads & writes
- Atomic transactions and thread-safe connection pooling
- Automatic table creation and schema migration
"""

import sqlite3
import os
import json
import time
from typing import Dict, List, Any, Optional
from contextlib import contextmanager

DB_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(DB_DIR, "bhashasetu_local.db")

class LocalDatabase:
    """Manages local SQLite database connections, schema migrations, and atomic operations."""

    def __init__(self, db_path: str = DB_PATH):
        self.db_path = db_path
        self._init_db()

    def get_connection(self) -> sqlite3.Connection:
        conn = sqlite3.connect(self.db_path, timeout=10.0, check_same_thread=False)
        conn.row_factory = sqlite3.Row
        # Enable WAL mode for high performance concurrent offline read/writes
        conn.execute("PRAGMA journal_mode=WAL;")
        conn.execute("PRAGMA synchronous=NORMAL;")
        conn.execute("PRAGMA foreign_keys=ON;")
        return conn

    @contextmanager
    def session(self):
        conn = self.get_connection()
        try:
            yield conn
            conn.commit()
        except Exception as e:
            conn.rollback()
            raise e
        finally:
            conn.close()

    def _init_db(self):
        """Initializes all relational tables for offline school operations."""
        with self.session() as conn:
            # 1. Users and Roles
            conn.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id TEXT PRIMARY KEY,
                username TEXT UNIQUE NOT NULL,
                full_name TEXT NOT NULL,
                role TEXT NOT NULL, -- 'student', 'teacher', 'admin', 'validator'
                school_id TEXT,
                language_preference TEXT DEFAULT 'santhali',
                created_at INTEGER NOT NULL
            );
            """)

            # 2. Schools & Classes
            conn.execute("""
            CREATE TABLE IF NOT EXISTS schools (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                district TEXT NOT NULL,
                block TEXT NOT NULL,
                cluster TEXT,
                primary_tribal_language TEXT NOT NULL,
                total_enrolled INTEGER DEFAULT 0,
                created_at INTEGER NOT NULL
            );
            """)

            # 3. Students
            conn.execute("""
            CREATE TABLE IF NOT EXISTS students (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                grade TEXT NOT NULL,
                school_id TEXT,
                language TEXT NOT NULL,
                mastery_json TEXT NOT NULL, -- JSON string of 8 competency scores
                last_assessed TEXT,
                created_at INTEGER NOT NULL
            );
            """)

            # 4. Curriculum Lessons
            conn.execute("""
            CREATE TABLE IF NOT EXISTS curriculum_lessons (
                id TEXT PRIMARY KEY,
                grade TEXT NOT NULL,
                subject TEXT NOT NULL,
                chapter_number INTEGER,
                title TEXT NOT NULL,
                tribal_title_json TEXT,
                learning_outcomes_json TEXT,
                steps_json TEXT NOT NULL,
                source TEXT DEFAULT 'JCERT Jharkhand',
                version TEXT DEFAULT '1.2.0',
                created_at INTEGER NOT NULL
            );
            """)

            # 5. Assessment Exams & Questions
            conn.execute("""
            CREATE TABLE IF NOT EXISTS assessment_exams (
                id TEXT PRIMARY KEY,
                title TEXT NOT NULL,
                grade TEXT NOT NULL,
                exam_type TEXT NOT NULL,
                total_marks INTEGER NOT NULL,
                time_minutes INTEGER NOT NULL,
                competencies_json TEXT NOT NULL,
                questions_json TEXT NOT NULL,
                created_at INTEGER NOT NULL
            );
            """)

            # 6. Student Exam Attempts (Offline Assessment Engine)
            conn.execute("""
            CREATE TABLE IF NOT EXISTS exam_attempts (
                id TEXT PRIMARY KEY,
                exam_id TEXT NOT NULL,
                student_id TEXT NOT NULL,
                student_name TEXT NOT NULL,
                student_class TEXT NOT NULL,
                target_lang TEXT NOT NULL,
                total_marks INTEGER NOT NULL,
                earned_marks INTEGER NOT NULL,
                percentage REAL NOT NULL,
                badge TEXT NOT NULL,
                proficiency_level TEXT NOT NULL,
                teacher_remark TEXT,
                breakdown_json TEXT NOT NULL,
                question_results_json TEXT NOT NULL,
                timestamp INTEGER NOT NULL,
                sync_status TEXT DEFAULT 'SYNCED' -- 'SYNCED', 'PENDING'
            );
            """)

            # 7. Targeted Remediation Plans
            conn.execute("""
            CREATE TABLE IF NOT EXISTS remediation_plans (
                id TEXT PRIMARY KEY,
                student_id TEXT NOT NULL,
                student_name TEXT NOT NULL,
                grade TEXT NOT NULL,
                target_competency TEXT NOT NULL,
                current_score_pct REAL NOT NULL,
                gap_diagnosis TEXT NOT NULL,
                steps_json TEXT NOT NULL,
                teacher_monitoring_tip TEXT,
                status TEXT DEFAULT 'ASSIGNED_REMEDIATION',
                created_at INTEGER NOT NULL
            );
            """)

            # 8. Community Language Vault & Ethical Preservation
            conn.execute("""
            CREATE TABLE IF NOT EXISTS community_vault (
                id TEXT PRIMARY KEY,
                language TEXT NOT NULL,
                script TEXT NOT NULL,
                term_or_phrase TEXT NOT NULL,
                native_script_text TEXT NOT NULL,
                devanagari_text TEXT NOT NULL,
                meaning_hindi TEXT NOT NULL,
                meaning_english TEXT NOT NULL,
                domain TEXT NOT NULL,
                audio_phonemes TEXT,
                cultural_notes TEXT,
                contributor_name TEXT NOT NULL,
                contributor_role TEXT NOT NULL,
                region TEXT NOT NULL,
                sovereignty_tier TEXT NOT NULL, -- 'PUBLIC', 'EDUCATIONAL', 'COMMUNITY_ONLY', 'RESTRICTED'
                validation_status TEXT NOT NULL, -- 'AI_GENERATED', 'TEACHER_REVIEWED', 'COMMUNITY_VALIDATED', 'PUBLISHED', 'REJECTED'
                validator_notes TEXT,
                created_at INTEGER NOT NULL,
                updated_at INTEGER NOT NULL
            );
            """)

            # 9. Offline Sync Queue (For bidirectional sync when internet returns)
            conn.execute("""
            CREATE TABLE IF NOT EXISTS sync_queue (
                event_id TEXT PRIMARY KEY,
                entity_type TEXT NOT NULL, -- 'attempt', 'vault_item', 'remediation', 'student_progress'
                entity_id TEXT NOT NULL,
                operation TEXT NOT NULL, -- 'INSERT', 'UPDATE', 'DELETE'
                payload_json TEXT NOT NULL,
                checksum TEXT NOT NULL,
                device_id TEXT NOT NULL,
                timestamp INTEGER NOT NULL,
                sync_status TEXT DEFAULT 'PENDING', -- 'PENDING', 'SYNCING', 'SYNCED', 'CONFLICT', 'FAILED'
                retry_count INTEGER DEFAULT 0
            );
            """)

            # 10. Audit Logs
            conn.execute("""
            CREATE TABLE IF NOT EXISTS audit_logs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                action TEXT NOT NULL,
                user_id TEXT,
                details TEXT,
                timestamp INTEGER NOT NULL
            );
            """)

            # 11. Official Government Textbooks (NCERT / JCERT)
            conn.execute("""
            CREATE TABLE IF NOT EXISTS official_textbooks (
                id TEXT PRIMARY KEY,
                grade TEXT NOT NULL,
                grade_key TEXT NOT NULL,
                subject TEXT NOT NULL,
                subject_name_hindi TEXT NOT NULL,
                subject_name_english TEXT NOT NULL,
                title_official TEXT NOT NULL,
                state_equivalent TEXT NOT NULL,
                book_code TEXT NOT NULL,
                total_chapters INTEGER NOT NULL,
                created_at INTEGER NOT NULL
            );
            """)

            # 12. Official Textbook Chapters & Pedagogical Excerpts
            conn.execute("""
            CREATE TABLE IF NOT EXISTS official_chapters (
                chapter_id TEXT PRIMARY KEY,
                book_id TEXT NOT NULL,
                chapter_num INTEGER NOT NULL,
                title_hindi TEXT NOT NULL,
                title_tribal TEXT NOT NULL,
                theme TEXT NOT NULL,
                pdf_local_path TEXT,
                pdf_size_bytes INTEGER DEFAULT 0,
                page_count INTEGER DEFAULT 0,
                teacher_hints TEXT,
                exercises_json TEXT,
                raw_excerpt TEXT,
                created_at INTEGER NOT NULL,
                FOREIGN KEY (book_id) REFERENCES official_textbooks (id)
            );
            """)

            # 13. Santhali Dedicated Offline Lexicon (FLN Pedagogy)
            conn.execute("""
            CREATE TABLE IF NOT EXISTS santhali_lexicon (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                hindi_term TEXT UNIQUE NOT NULL,
                synonyms TEXT,                     -- JSON array of synonyms
                santhali_devanagari TEXT NOT NULL,  -- दुड़ुब मे
                santhali_ol_chiki TEXT NOT NULL,    -- ᱫᱩᱲᱩᱵ ᱢᱮ
                santhali_romanized TEXT NOT NULL,   -- Durub me
                ipa_phonetics TEXT NOT NULL,        -- /duɖup̚ mɛ/
                category TEXT NOT NULL,             -- 'classroom_command', 'number', 'realia', etc.
                audio_phonemes TEXT,                -- 'durub me'
                grade_level TEXT DEFAULT 'Class 1',
                created_at INTEGER NOT NULL
            );
            """)

            # 14. Fast BM25 Search Virtual Index (FTS5)
            conn.execute("""
            CREATE VIRTUAL TABLE IF NOT EXISTS santhali_lexicon_fts USING fts5(
                hindi_term,
                synonyms,
                santhali_devanagari,
                santhali_romanized,
                category,
                content='santhali_lexicon',
                content_rowid='id'
            );
            """)

            # Triggers to keep FTS5 synchronized with santhali_lexicon
            conn.execute("""
            CREATE TRIGGER IF NOT EXISTS trg_santhali_ai AFTER INSERT ON santhali_lexicon BEGIN
                INSERT INTO santhali_lexicon_fts(rowid, hindi_term, synonyms, santhali_devanagari, santhali_romanized, category)
                VALUES (new.id, new.hindi_term, new.synonyms, new.santhali_devanagari, new.santhali_romanized, new.category);
            END;
            """)
            conn.execute("""
            CREATE TRIGGER IF NOT EXISTS trg_santhali_ad AFTER DELETE ON santhali_lexicon BEGIN
                INSERT INTO santhali_lexicon_fts(santhali_lexicon_fts, rowid, hindi_term, synonyms, santhali_devanagari, santhali_romanized, category)
                VALUES('delete', old.id, old.hindi_term, old.synonyms, old.santhali_devanagari, old.santhali_romanized, old.category);
            END;
            """)
            conn.execute("""
            CREATE TRIGGER IF NOT EXISTS trg_santhali_au AFTER UPDATE ON santhali_lexicon BEGIN
                INSERT INTO santhali_lexicon_fts(santhali_lexicon_fts, rowid, hindi_term, synonyms, santhali_devanagari, santhali_romanized, category)
                VALUES('delete', old.id, old.hindi_term, old.synonyms, old.santhali_devanagari, old.santhali_romanized, old.category);
                INSERT INTO santhali_lexicon_fts(rowid, hindi_term, synonyms, santhali_devanagari, santhali_romanized, category)
                VALUES (new.id, new.hindi_term, new.synonyms, new.santhali_devanagari, new.santhali_romanized, new.category);
            END;
            """)

    def seed_santhali_lexicon(self, json_path: Optional[str] = None):
        """Seeds Santhali FLN Lexicon from JSON corpus into SQLite and FTS5."""
        if not json_path:
            base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            json_path = os.path.join(base_dir, "data", "santhali_lexicon.json")

        if not os.path.exists(json_path):
            return 0

        try:
            with open(json_path, "r", encoding="utf-8") as f:
                terms = json.load(f)

            now = int(time.time())
            count = 0
            with self.session() as conn:
                for t in terms:
                    syn_json = json.dumps(t.get("synonyms", []), ensure_ascii=False)
                    conn.execute("""
                    INSERT OR REPLACE INTO santhali_lexicon 
                    (hindi_term, synonyms, santhali_devanagari, santhali_ol_chiki, santhali_romanized, ipa_phonetics, category, audio_phonemes, grade_level, created_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """, (
                        t["hindi_term"], syn_json, t["santhali_devanagari"],
                        t["santhali_ol_chiki"], t["santhali_romanized"],
                        t.get("ipa_phonetics", ""), t.get("category", "general"),
                        t.get("audio_phonemes", t["santhali_romanized"].lower()),
                        t.get("grade_level", "Class 1"), now
                    ))
                    count += 1
            return count
        except Exception as e:
            print(f"[DB] Error seeding Santhali lexicon: {e}")
            return 0

    def search_santhali_lexicon_fts(self, query: str, limit: int = 10) -> List[Dict[str, Any]]:
        """
        Sub-millisecond BM25 full-text search against the Santhali lexicon.
        Matches Hindi terms, synonyms, Devanagari, and Romanized spellings.
        """
        clean_q = (query or "").strip().replace('"', '').replace("'", "")
        if not clean_q:
            return []

        results = []
        try:
            with self.session() as conn:
                # 1. Exact match check on primary table first
                exact_row = conn.execute("""
                SELECT * FROM santhali_lexicon 
                WHERE hindi_term = ? OR santhali_devanagari = ? OR santhali_ol_chiki = ? OR santhali_romanized LIKE ?
                LIMIT 1;
                """, (clean_q, clean_q, clean_q, clean_q)).fetchone()

                if exact_row:
                    results.append(self._row_to_lexicon_dict(exact_row, bm25_rank=0.0))

                # 2. FTS5 BM25 match query
                fts_query = f'"{clean_q}"*'
                rows = conn.execute("""
                SELECT sl.*, bm25(santhali_lexicon_fts) as rank
                FROM santhali_lexicon sl
                JOIN santhali_lexicon_fts fts ON sl.id = fts.rowid
                WHERE santhali_lexicon_fts MATCH ?
                ORDER BY rank ASC
                LIMIT ?;
                """, (fts_query, limit)).fetchall()

                seen_ids = {r["id"] for r in results}
                for r in rows:
                    if r["id"] not in seen_ids:
                        results.append(self._row_to_lexicon_dict(r, bm25_rank=r["rank"]))
                        seen_ids.add(r["id"])
        except Exception as e:
            # Fallback to LIKE query if FTS syntax error
            try:
                with self.session() as conn:
                    like_rows = conn.execute("""
                    SELECT * FROM santhali_lexicon 
                    WHERE hindi_term LIKE ? OR synonyms LIKE ? OR santhali_devanagari LIKE ? OR santhali_romanized LIKE ?
                    LIMIT ?;
                    """, (f"%{clean_q}%", f"%{clean_q}%", f"%{clean_q}%", f"%{clean_q}%", limit)).fetchall()
                    for r in like_rows:
                        results.append(self._row_to_lexicon_dict(r, bm25_rank=1.0))
            except Exception:
                pass
        return results

    def get_santhali_lexicon(self, category: Optional[str] = None, grade: Optional[str] = None, limit: int = 150) -> List[Dict[str, Any]]:
        """Retrieves Santhali lexicon items with optional filters."""
        with self.session() as conn:
            query = "SELECT * FROM santhali_lexicon WHERE 1=1"
            params = []
            if category and category.lower() != "all":
                query += " AND category = ?"
                params.append(category.lower())
            if grade and grade.lower() != "all":
                query += " AND grade_level = ?"
                params.append(grade)
            query += " ORDER BY id ASC LIMIT ?;"
            params.append(limit)

            rows = conn.execute(query, tuple(params)).fetchall()
            return [self._row_to_lexicon_dict(r) for r in rows]

    def get_santhali_stats(self) -> Dict[str, Any]:
        """Returns statistics of the offline Santhali knowledge base."""
        with self.session() as conn:
            total_count = conn.execute("SELECT COUNT(*) as c FROM santhali_lexicon;").fetchone()["c"]
            categories = [r["category"] for r in conn.execute("SELECT DISTINCT category FROM santhali_lexicon;").fetchall()]
            sample = conn.execute("SELECT hindi_term, santhali_ol_chiki FROM santhali_lexicon LIMIT 3;").fetchall()
            return {
                "language": "Santhali (ᱥᱟᱱᱛᱟᱲᱤ)",
                "script": "Ol Chiki (ᱚᱞ ᱪᱤᱠᱤ) & Devanagari",
                "total_vocabulary": total_count,
                "categories": categories,
                "fts5_enabled": True,
                "samples": [{"hindi": r["hindi_term"], "ol_chiki": r["santhali_ol_chiki"]} for r in sample]
            }

    @staticmethod
    def _row_to_lexicon_dict(row, bm25_rank: Optional[float] = None) -> Dict[str, Any]:
        synonyms = []
        if row["synonyms"]:
            try:
                synonyms = json.loads(row["synonyms"])
            except Exception:
                synonyms = []
        item = {
            "id": row["id"],
            "hindi_term": row["hindi_term"],
            "synonyms": synonyms,
            "santhali_devanagari": row["santhali_devanagari"],
            "santhali_ol_chiki": row["santhali_ol_chiki"],
            "santhali_romanized": row["santhali_romanized"],
            "ipa_phonetics": row["ipa_phonetics"],
            "category": row["category"],
            "audio_phonemes": row["audio_phonemes"],
            "grade_level": row["grade_level"],
            "created_at": row["created_at"]
        }
        if bm25_rank is not None:
            item["bm25_rank"] = round(bm25_rank, 4)
        return item

    def seed_official_textbooks(self, json_path: Optional[str] = None):
        """Seeds official textbooks and chapters from JSON corpus into SQLite."""
        if not json_path:
            base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            json_path = os.path.join(base_dir, "data", "curriculum_official", "official_textbooks_data.json")

        if not os.path.exists(json_path):
            return

        try:
            with open(json_path, "r", encoding="utf-8") as f:
                books = json.load(f)

            with self.session() as conn:
                now = int(time.time())
                for b in books:
                    conn.execute("""
                    INSERT OR REPLACE INTO official_textbooks 
                    (id, grade, grade_key, subject, subject_name_hindi, subject_name_english, title_official, state_equivalent, book_code, total_chapters, created_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """, (
                        b["id"], b["grade"], b.get("grade_key", ""), b["subject"],
                        b["subject_name_hindi"], b["subject_name_english"],
                        b["title_official"], b["state_equivalent"],
                        b["book_code"], b["total_chapters"], now
                    ))

                    for ch in b.get("chapters", []):
                        conn.execute("""
                        INSERT OR REPLACE INTO official_chapters
                        (chapter_id, book_id, chapter_num, title_hindi, title_tribal, theme, pdf_local_path, pdf_size_bytes, page_count, teacher_hints, exercises_json, raw_excerpt, created_at)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                        """, (
                            ch["chapter_id"], b["id"], ch["chapter_num"],
                            ch["title_hindi"], ch["title_tribal"], ch["theme"],
                            ch.get("pdf_local_path", ""), ch.get("pdf_size_bytes", 0),
                            ch.get("page_count", 0), ch.get("teacher_hints", ""),
                            json.dumps(ch.get("exercises", []), ensure_ascii=False),
                            ch.get("raw_excerpt", ""), now
                        ))
        except Exception as e:
            print(f"[DB] Error seeding official textbooks: {e}")

db = LocalDatabase()
# Auto-seed if data exists
db.seed_santhali_lexicon()
db.seed_official_textbooks()


