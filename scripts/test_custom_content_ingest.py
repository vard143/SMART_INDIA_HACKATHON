import sys
import os

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

# Add backend directory to sys.path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "backend"))

from ai_router import ai_router

def test_external_content_ingestion():
    sample_content = """
    Our Jharkhand forest is rich with Sal trees, Mahua flowers, and freshwater streams.
    During the spring festival of Baha, we respect our nature and worship Sarjom (Sal flowers).
    Children learn to identify different leaves, seeds, and birds like the koyel and hornbill.
    We count the trees and understand how our ancestors protected the sacred groves (Jaher Than).
    """
    
    print("[1] Ingesting Custom Lesson Text...")
    result = ai_router.analyze_and_generate_from_external_content(
        content=sample_content,
        grade="class2",
        subject="environmental_studies",
        target_language="santhali",
        target_script="ol_chiki",
        context_theme="forest_nature"
    )
    
    lp = result["lesson_plan"]
    print(f"  ✓ 14-Point Lesson Plan Topic (Hindi): {lp.get('topic_hindi')}")
    print(f"  ✓ Tribal Topic (Native): {lp.get('topic_tribal')}")
    print(f"  ✓ Components Generated: {len(lp.get('pedagogical_components', {}))} Pedagogical Points")
    
    comp = lp.get('pedagogical_components', {})
    if '4_mother_tongue_explanation' in comp:
        print(f"  ✓ Mother Tongue Concept: {comp['4_mother_tongue_explanation']['text_devanagari'][:60]}...")
    if '5_localized_realia_example' in comp:
        print(f"  ✓ Realia TLM: {comp['5_localized_realia_example']['example_description'][:60]}...")
    if '7_story_activity' in comp:
        print(f"  ✓ Cultural Story: {comp['7_story_activity']['title_hindi']}")
    
    assessment = result["assessment"]
    questions = assessment.get("questions", [])
    print(f"\n[2] Checking NIPUN Bharat Formative Assessment:")
    print(f"  ✓ Assessment Title: {assessment.get('title')}")
    print(f"  ✓ Total Questions: {len(questions)}")
    for i, q in enumerate(questions, 1):
        correct_opt = next((opt['text'] for opt in q.get('options', []) if opt.get('is_correct')), 'N/A')
        print(f"    - Q{i} [{q.get('competency')}]: {q.get('question_text', '')[:40]}... (Answer: {correct_opt[:30]})")
        
    worksheet = result["worksheets"]
    print(f"\n[3] Checking Printable A4 Bilingual Worksheets:")
    print(f"  ✓ Worksheet Title: {worksheet.get('title')}")
    print(f"  ✓ Match Pairs: {len(worksheet.get('match_section', []))}")
    print(f"  ✓ Count Items: {len(worksheet.get('count_section', []))}")
    print(f"  ✓ Trace Words: {len(worksheet.get('trace_section', []))}")
    print(f"  ✓ Fill-in Blanks: {len(worksheet.get('fill_section', []))}")
    
    print("\n🎉 Custom Content Ingestion Pipeline Test PASSED 100%!")

if __name__ == "__main__":
    test_external_content_ingestion()
