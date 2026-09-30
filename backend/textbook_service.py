"""
Official Government Textbook & Curriculum Service
Provides fast offline access to official NCERT / JCERT primary textbooks (Classes 1, 2, 3),
extracted chapter texts, teacher pedagogical notes (शिक्षण-संकेत), and exercises.
"""

import os
import json
import sqlite3
from typing import List, Dict, Any, Optional

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CORPUS_PATH = os.path.join(BASE_DIR, "data", "curriculum_official", "official_textbooks_data.json")

class OfficialTextbookService:
    def __init__(self):
        self._cached_catalog: List[Dict[str, Any]] = []
        self._load_catalog()

    def _load_catalog(self):
        """Loads official textbook JSON corpus from disk."""
        if os.path.exists(CORPUS_PATH):
            try:
                with open(CORPUS_PATH, "r", encoding="utf-8") as f:
                    self._cached_catalog = json.load(f)
            except Exception as e:
                print(f"[TextbookService] Error reading {CORPUS_PATH}: {e}")
                self._cached_catalog = []
        else:
            self._cached_catalog = []

    def get_all_textbooks(self, grade_key: Optional[str] = None, subject: Optional[str] = None) -> List[Dict[str, Any]]:
        """Filters official textbooks by grade and subject."""
        if not self._cached_catalog:
            self._load_catalog()
            
        results = self._cached_catalog
        if grade_key:
            results = [b for b in results if b.get("grade_key") == grade_key or b.get("grade", "").lower().replace(" ", "") == grade_key.lower().replace(" ", "")]
        if subject:
            results = [b for b in results if b.get("subject", "").lower() == subject.lower()]
        return results

    def get_textbook_by_id(self, book_id: str) -> Optional[Dict[str, Any]]:
        """Retrieves single textbook metadata and chapters by book ID."""
        if not self._cached_catalog:
            self._load_catalog()
        for b in self._cached_catalog:
            if b.get("id") == book_id:
                return b
        return None

    def get_chapter_by_id(self, chapter_id: str) -> Optional[Dict[str, Any]]:
        """Finds specific chapter across all textbooks."""
        if not self._cached_catalog:
            self._load_catalog()
        for b in self._cached_catalog:
            for ch in b.get("chapters", []):
                if ch.get("chapter_id") == chapter_id:
                    return {
                        **ch,
                        "book_title": b.get("title_official"),
                        "state_equivalent": b.get("state_equivalent"),
                        "grade": b.get("grade"),
                        "grade_key": b.get("grade_key"),
                        "subject": b.get("subject"),
                        "subject_name_hindi": b.get("subject_name_hindi")
                    }
        return None

    def get_chapters_for_subject(self, grade_key: str, subject: str) -> List[Dict[str, Any]]:
        """Returns all chapters for given grade and subject."""
        books = self.get_all_textbooks(grade_key, subject)
        all_chapters = []
        for b in books:
            for ch in b.get("chapters", []):
                all_chapters.append({
                    **ch,
                    "book_id": b.get("id"),
                    "book_title": b.get("title_official"),
                    "state_equivalent": b.get("state_equivalent"),
                    "grade": b.get("grade"),
                    "subject": b.get("subject")
                })
        return all_chapters

textbook_service = OfficialTextbookService()
