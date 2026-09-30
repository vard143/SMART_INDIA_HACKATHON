import sys
import os
import json

# Windows console UTF-8 support
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass

# Ensure backend path is accessible
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'backend'))

from database import db
from textbook_service import OfficialTextbookService
from ai_engine import ai_engine
from ai_router import ai_router

def test_official_textbooks():
    print("======================================================================")
    print("  TESTING OFFICIAL NCERT / JCERT TEXTBOOK INGESTION & DYNAMIC SUITE   ")
    print("======================================================================")

    service = OfficialTextbookService()
    
    # 1. Test fetching textbooks
    books = service.get_all_textbooks()
    print(f"\n[1] Official Textbooks Loaded from Corpus / SQLite: {len(books)} Books")
    for b in books:
        print(f"  [OK] [{b['grade'].upper()} - {b['subject'].upper()}] {b['title_official']} - {len(b.get('chapters', []))} Chapters (Code: {b.get('book_code')})")
    
    assert len(books) >= 10, f"Expected at least 10 official textbooks, got {len(books)}"
    
    # 2. Test fetching chapter by ID
    first_book = books[0]
    first_ch = first_book['chapters'][0]
    ch_details = service.get_chapter_by_id(first_ch['chapter_id'])
    print(f"\n[2] Detailed Chapter Lookup: {ch_details['title_hindi']} ({ch_details.get('title_tribal', '')})")
    print(f"  [OK] Book Title: {ch_details['book_title']}")
    print(f"  [OK] Theme: {ch_details['theme']}")
    print(f"  [OK] Teacher Hints: {ch_details.get('teacher_hints', '')[:60]}...")
    
    # 3. Test Dynamic Subject Assessment Generation
    print("\n[3] Testing Dynamic Subject Assessment Generation:")
    grades = ['class1', 'class2', 'class3']
    subjects = ['hindi', 'math', 'evs', 'english']
    
    for grade in grades:
        for subj in subjects:
            assessment = ai_router.generate_subject_assessment(grade, subj, chapter_id=None, language='santhali', script='ol_chiki')
            print(f"  [OK] [{grade.upper()} - {subj.upper()}] Exam '{assessment['title']}' | Chapter: '{assessment['chapter_title']}' | Qs: {len(assessment['questions'])}")
            assert len(assessment['questions']) == 5, f"Expected 5 questions for {grade} {subj}"
    
    # 4. Test Dynamic Subject Worksheet Generation
    print("\n[4] Testing Dynamic Subject Worksheet Generation:")
    for grade in ['class1', 'class2', 'class3']:
        for subj in ['hindi', 'math', 'evs', 'english']:
            ws = ai_router.generate_subject_worksheets(grade, subj, chapter_id=None, language='santhali', script='ol_chiki')
            print(f"  [OK] [{grade.upper()} - {subj.upper()}] Worksheet '{ws['title']}' | Chapter: '{ws['chapter_title']}'")
            print(f"       Match pairs: {len(ws['match_section'])}, Count items: {len(ws['count_section'])}, Trace: {len(ws['trace_section'])}, Fill: {len(ws['fill_section'])}")
            assert len(ws['match_section']) >= 3
            assert len(ws['count_section']) >= 3
    
    print("\n======================================================================")
    print("  ALL OFFICIAL TEXTBOOK & DYNAMIC GENERATION TESTS PASSED 100%!       ")
    print("======================================================================")

if __name__ == '__main__':
    test_official_textbooks()
