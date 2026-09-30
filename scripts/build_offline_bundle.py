"""
BHASHASETU: Offline Content Pack Bundle Builder
Packages local database, curriculum, language packs, assessment exams, and metadata into content-pack-v1.2.0.zip
for physical USB / offline distribution to remote Jharkhand schools without internet.
"""

import os
import zipfile
import json
import time

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BUNDLE_DIR = os.path.join(ROOT_DIR, "bundles")
BUNDLE_FILE = os.path.join(BUNDLE_DIR, "content-pack-v1.2.0.zip")

def build_offline_bundle():
    os.makedirs(BUNDLE_DIR, exist_ok=True)
    print(f"Building offline content pack bundle: {BUNDLE_FILE}...")

    manifest = {
        "bundle_name": "BHASHASETU_JHARKHAND_PRIMARY_CONTENT_PACK",
        "version": "1.2.0-offline",
        "created_at": int(time.time()),
        "target_board": "JCERT / SCERT Jharkhand",
        "target_framework": "NEP 2020 MTB-MLE & NIPUN Bharat FLN",
        "languages_included": ["Santhali", "Mundari", "Ho", "Kurukh", "Kharia"],
        "curriculum_lessons_count": 40,
        "assessment_exams_count": 1,
        "vocabulary_terms_count": 450
    }

    files_to_pack = [
        ("backend/bhashasetu_local.db", "bhashasetu_local.db"),
        ("backend/curriculum_data.json", "curriculum_data.json"),
        ("backend/tribal_nlp_engine.py", "tribal_nlp_engine.py"),
        ("backend/language_packs.py", "language_packs.py")
    ]

    with zipfile.ZipFile(BUNDLE_FILE, 'w', zipfile.ZIP_DEFLATED) as zf:
        zf.writestr("manifest.json", json.dumps(manifest, indent=2, ensure_ascii=False))
        for rel_src, arc_name in files_to_pack:
            src_path = os.path.join(ROOT_DIR, rel_src)
            if os.path.exists(src_path):
                zf.write(src_path, arc_name)
                print(f"  + Added {arc_name}")

    size_kb = round(os.path.getsize(BUNDLE_FILE) / 1024, 2)
    print(f"Offline content bundle created successfully! Size: {size_kb} KB at {BUNDLE_FILE}")

if __name__ == "__main__":
    build_offline_bundle()
