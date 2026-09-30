from fastapi.testclient import TestClient
from main import app
import time, json, sys

# Ensure UTF-8 output on Windows consoles
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

client = TestClient(app)

print("--- Running End-to-End Verification Suite ---")

# 1. Health
r = client.get('/health')
assert r.status_code == 200, f'Health failed: {r.text}'
print('[PASS] Health check OK')

# 2. Offline Diagnostics
r = client.get('/api/v1/offline/health')
assert r.status_code == 200, f'Offline health failed: {r.text}'
diag = r.json()
assert diag['overall_status'] == 'HEALTHY', 'Overall status not healthy'
print(f'[PASS] Offline Health: {diag["overall_status"]}, DB: {diag["diagnostics"]["database"]["lessons_stored"]} lessons')

# 3. Save Custom Lesson
r = client.post('/api/v1/ai/teacher/save-custom-lesson', json={
    'lesson_id': 'verif-lesson-01',
    'title': 'सखुआ का पेड़ और प्रकृति',
    'grade': 'Class 1',
    'subject': 'भाषा अंजलि',
    'target_lang': 'santhali',
    'lesson_plan': {
        'topic_tribal': 'ᱥᱟᱨᱡᱚᱢ ᱫᱟᱨᱮ',
        'topic_devanagari': 'सारजोम दारे',
        'pedagogical_components': {
            '9_student_practice': ['अभ्यास 1', 'अभ्यास 2']
        }
    }
})
assert r.status_code == 200, f'Save custom lesson failed: {r.text}'
print('[PASS] Save Custom Lesson to SQLite OK')

# 4. Generate Remediation
r = client.post('/api/v1/ai/teacher/generate-remediation', json={
    'student_id': 'std-verif-001',
    'student_name': 'सुनीता मुर्मू',
    'competency': 'ध्वनि एवं अक्षर पहचान',
    'current_score_pct': 50.0,
    'grade': 'Class 1',
    'language': 'santhali'
})
assert r.status_code == 200, f'Remediation failed: {r.text}'
print('[PASS] Generate Remediation OK')

# 5. Community Vault
r = client.get('/api/v1/community/vault')
assert r.status_code == 200, f'Vault failed: {r.text}'
print(f'[PASS] Community Vault: {r.json()["count"]} terms available')

# 6. Contribute to Vault
r = client.post('/api/v1/community/contribute', json={
    'language': 'santhali',
    'script': 'ol_chiki',
    'term_or_phrase': 'ᱵᱟᱦᱟ',
    'devanagari_text': 'बाहा',
    'meaning_hindi': 'फूल',
    'meaning_english': 'Flower',
    'contributor_name': 'बिरबल शिक्षक'
})
assert r.status_code == 200, f'Vault contribute failed: {r.text}'
print('[PASS] Contribute to Vault OK')

# 7. Translation Bridge
r = client.post('/api/translate', json={
    'text': 'बैठ जाओ',
    'source_lang': 'hindi',
    'target_lang': 'santhali'
})
assert r.status_code == 200, f'Translation failed: {r.text}'
tr = r.json()
print(f'[PASS] Translate: "{tr["source_text"]}" -> "{tr["translated_text"]}" ({tr["devanagari_text"]}) [{tr["latency_ms"]}ms]')

# 8. District Analytics
r = client.get('/api/v1/analytics/school-district')
assert r.status_code == 200, f'Analytics failed: {r.text}'
print(f'[PASS] District Analytics: {len(r.json()["pilot_districts"])} pilot districts, {r.json()["overall_fln_mastery_pct"]}% FLN mastery')

# 9. Offline Sync Bundle
r = client.get('/api/sync/bundle')
assert r.status_code == 200, f'Sync bundle failed: {r.text}'
print(f'[PASS] Offline Sync Bundle: {len(r.json()["language_packs"])} language packs, {len(r.json()["vocabulary_bank"])} terms')

print('--- ALL 9 TEST SUITES PASSED CLEANLY! ---')
