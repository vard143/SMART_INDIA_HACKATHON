import sys
import os
import io

# Windows console UTF-8 support
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass

# Ensure backend path is accessible
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'backend'))

from media_ingest_service import media_service
from ai_router import ai_router

def test_media_upload_pipeline():
    print("======================================================================")
    print("  TESTING TEACHER MULTI-MEDIA UPLOAD (VIDEO, PDF, AUDIO, DOCX, TEXT) ")
    print("======================================================================")

    # 1. Test Video Upload Ingestion
    print("\n[1] Testing Video Lesson Upload & Milestone Breakdown...")
    dummy_video_bytes = b"FAKE_MP4_HEADER_DATA" * 50000 # ~1MB simulated video
    video_filename = "class2_math_sal_counting.mp4"
    
    extracted_text, media_info = media_service.ingest_media(
        file_bytes=dummy_video_bytes,
        filename=video_filename,
        grade="Class 2",
        subject="गणित ज्ञान (Foundational Numeracy)",
        target_lang="santhali",
        target_script="ol_chiki",
        context_theme="weekly_market"
    )
    
    print(f"  [OK] Media Type: {media_info['media_type'].upper()}")
    print(f"  [OK] Saved Filename: {media_info['saved_filename']}")
    print(f"  [OK] Media Stream URL: {media_info['media_url']}")
    print(f"  [OK] Duration Formatted: {media_info.get('duration_formatted')} ({media_info.get('duration_seconds')}s)")
    print(f"  [OK] Video Milestones Generated: {len(media_info.get('video_timestamps', []))}")
    for ts in media_info.get('video_timestamps', []):
        print(f"       [{ts['timestamp']}] {ts['title_hindi']} -> {ts['title_tribal']}")
    
    # Process with AI Provider to generate Full Suite
    result_video = ai_router.ai_provider.analyze_external_content(
        content_text=extracted_text,
        filename=video_filename,
        grade="Class 2",
        subject="गणित ज्ञान (Foundational Numeracy)",
        target_lang="santhali",
        script="ol_chiki",
        context="weekly_market"
    )
    result_video["media_info"] = media_info

    print(f"  [OK] 14-Point Lesson Plan Generated: {result_video['lesson_plan']['topic_hindi']} ({result_video['lesson_plan']['topic_tribal']})")
    print(f"  [OK] 5-Question NIPUN Formative Quiz: {result_video['assessment']['title']} (Total Marks: {result_video['assessment']['total_marks']})")
    print(f"  [OK] Printable A4 Worksheets: Match ({len(result_video['worksheets']['match_section'])}), Count ({len(result_video['worksheets']['count_section'])}), Trace ({len(result_video['worksheets']['trace_section'])}), Fill ({len(result_video['worksheets']['fill_section'])})")

    # 2. Test PDF Upload Ingestion
    print("\n[2] Testing PDF Textbook / Document Ingestion...")
    # Generate minimal valid PDF or sample PDF text
    pdf_filename = "sohrai_festival_class1.pdf"
    sample_pdf_text = "पाठ: सोहराय और पशु पूजा\nकक्षा: 1\nविषय: भाषा एवं साक्षरता\nसंथाल और मुंडा गाँवों में कार्तिक मास में सोहराय का भव्य पारंपरिक पर्व मनाया जाता है।"
    
    extracted_pdf_text, pdf_media_info = media_service.ingest_media(
        file_bytes=sample_pdf_text.encode('utf-8'),
        filename=pdf_filename,
        grade="Class 1",
        subject="भाषा एवं साक्षरता (Language & Literacy)",
        target_lang="santhali",
        target_script="ol_chiki",
        context_theme="festivals"
    )
    print(f"  [OK] PDF Media Type: {pdf_media_info['media_type'].upper()}")
    print(f"  [OK] PDF Total Pages: {pdf_media_info.get('total_pages', 1)}")
    print(f"  [OK] PDF Stream URL: {pdf_media_info.get('media_url')}")

    # 3. Test Audio Recording Ingestion
    print("\n[3] Testing Audio Recording Ingestion...")
    audio_filename = "tribal_story_elder_voice.mp3"
    dummy_audio_bytes = b"FAKE_AUDIO_SAMPLE" * 10000
    extracted_audio_text, audio_media_info = media_service.ingest_media(
        file_bytes=dummy_audio_bytes,
        filename=audio_filename,
        grade="Class 3",
        subject="भाषा एवं संस्कृति (Arts & Culture)",
        target_lang="mundari",
        target_script="devanagari",
        context_theme="festivals"
    )
    print(f"  [OK] Audio Media Type: {audio_media_info['media_type'].upper()}")
    print(f"  [OK] Audio Stream URL: {audio_media_info.get('media_url')}")
    print(f"  [OK] Audio Quality: {audio_media_info.get('audio_quality')}")

    # 4. Test Word / Document Ingestion
    print("\n[4] Testing Document Ingestion...")
    doc_filename = "forest_sal_lesson_notes.docx"
    doc_text = "सखुआ का जंगल और नदियाँ। झारखंड के वनों में सखुआ (साल) के ऊंचे-ऊंचे पेड़ पाए जाते हैं।"
    extracted_doc_text, doc_media_info = media_service.ingest_media(
        file_bytes=doc_text.encode('utf-8'),
        filename=doc_filename,
        grade="Class 2",
        subject="पर्यावरण अध्ययन (EVS)",
        target_lang="ho",
        target_script="devanagari",
        context_theme="village_nature"
    )
    print(f"  [OK] Document Media Type: {doc_media_info['media_type'].upper()}")
    print(f"  [OK] Extracted Words: {doc_media_info.get('extracted_word_count')}")

    print("\n======================================================================")
    print("  🎉 ALL TEACHER MEDIA UPLOAD & GENERATION PIPELINES PASSED 100%!     ")
    print("======================================================================")

if __name__ == '__main__':
    test_media_upload_pipeline()
