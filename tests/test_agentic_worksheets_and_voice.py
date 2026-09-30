"""
BHASHASETU (भाषा सेतु) Production Test Suite:
1. Offline AI Worksheet Agent (Dynamic generation, non-duplication, personalization, FLN competency)
2. English Spoken VoiceBridge & NLP Translation Bridge (English-to-Tribal with Hindi Bridge)
3. Ol Chiki / Tribal Script Phonemization for Universal Audio Speech Synthesis
"""

import sys
import os
import pytest
import time

# Ensure backend directory is in path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'backend')))

from fastapi.testclient import TestClient
from main import app
from worksheet_agent import worksheet_agent
from tribal_nlp_engine import TribalNLPEngine, olchiki_to_devanagari_phonetic

client = TestClient(app)
nlp = TribalNLPEngine()

class TestAgenticWorksheetStudio:
    """Rigorous tests for the Offline AI Worksheet Generator Agent."""

    def test_worksheet_agent_personalization(self):
        """Verify student name, school name, and unique serial ID are stamped on generated worksheets."""
        ws = worksheet_agent.generate(
            language="santhali",
            student_name="सुमित्रा मुर्मू",
            school_name="उत्क्रमित प्राथमिक विद्यालय, शिकारीपाड़ा",
            competency_level="class1",
            focus_type="combo",
            seed="seed_42"
        )

        assert ws["student_name"] == "सुमित्रा मुर्मू"
        assert ws["school_name"] == "उत्क्रमित प्राथमिक विद्यालय, शिकारीपाड़ा"
        assert ws["language"] == "santhali"
        assert ws["worksheet_id"].startswith("WS-SAN-CLASS1-")
        assert len(ws["match_section"]) == 4
        assert len(ws["count_section"]) == 4
        assert len(ws["trace_section"]) == 4
        assert len(ws["fill_section"]) == 3
        assert "संथाल" in ws["instructions_tribal"] or len(ws["instructions_tribal"]) > 0

    def test_non_duplication_across_seeds(self):
        """Verify that different seeds produce distinct, varied worksheets for different students."""
        ws_a = worksheet_agent.generate(
            language="santhali",
            student_name="बिरसा हांसदा",
            competency_level="class1",
            focus_type="combo",
            seed="seed_student_101"
        )
        ws_b = worksheet_agent.generate(
            language="santhali",
            student_name="सोम मुर्मू",
            competency_level="class1",
            focus_type="combo",
            seed="seed_student_202"
        )

        # Worksheet IDs must be distinct
        assert ws_a["worksheet_id"] != ws_b["worksheet_id"]
        
        # Extracted activity items should differ due to seeded randomization
        items_a = [item["tribal_text"] for item in ws_a["match_section"]]
        items_b = [item["tribal_text"] for item in ws_b["match_section"]]
        assert items_a != items_b, "Worksheets for different students must not be identical clones!"

    def test_competency_levels_scaling(self):
        """Verify all 4 FLN competency levels (balvatika, class1, class2, class3) generate valid pedagogical tasks."""
        levels = ["balvatika", "class1", "class2", "class3"]
        
        for lvl in levels:
            ws = worksheet_agent.generate(
                language="mundari",
                competency_level=lvl,
                focus_type="combo",
                seed=f"seed_test_{lvl}"
            )
            assert ws["competency_level"] == lvl
            assert len(ws["match_section"]) > 0
            assert len(ws["count_section"]) > 0
            assert ws["title"] is not None
            assert ws["instructions_hindi"] is not None

    def test_fastapi_agentic_endpoint(self):
        """Verify HTTP POST /api/v1/worksheets/generate-agentic edge contract and sub-150ms execution speed."""
        payload = {
            "language": "santhali",
            "student_name": "जया मरांडी",
            "school_name": "राजकीय प्राथमिक विद्यालय, दुमका",
            "competency_level": "class1",
            "focus_type": "combo",
            "seed": "agentic_test_999"
        }
        t0 = time.perf_counter()
        response = client.post("/api/v1/worksheets/generate-agentic", json=payload)
        t_delta = time.perf_counter() - t0

        assert response.status_code == 200
        data = response.json()
        assert data["student_name"] == "जया मरांडी"
        assert data["language"] == "santhali"
        assert len(data["match_section"]) == 4
        assert len(data["count_section"]) == 4
        # Offline edge latency check: must be practically instantaneous (< 150ms)
        assert t_delta < 0.15, f"Worksheet generation took too long: {t_delta}s"


class TestEnglishVoiceBridgeAndNlp:
    """Rigorous tests for English spoken input translation with Hindi Bridge."""

    def test_english_classroom_phrases_to_santhali(self):
        """Verify English classroom commands accurately translate to Santhali with Hindi bridge."""
        test_phrases = [
            ("sit down", "बैठ जाओ", "दुड़ुब"),
            ("stand up", "खड़े हो जाओ", "तिंगु"),
            ("open your book", "किताब खोलो", "पोतोब"),
            ("drink water", "पानी पियो", "दाः"),
            ("very good", "बहुत अच्छा", "आडी नापाय"),
            ("wash your hands", "हाथ धो लो", "ती")
        ]

        for en_text, exp_hindi, exp_santhali_dev in test_phrases:
            res = nlp.translate(text=en_text, source_lang="english", target_lang="santhali")
            assert res["source_lang"] == "english"
            assert res["hindi_bridge"] == exp_hindi
            if exp_santhali_dev == "पोतोब":
                assert any(w in res["devanagari_text"] for w in ["पोतोब", "पुथी"])
            else:
                assert exp_santhali_dev in res["devanagari_text"]
            assert len(res["script_primary"]) > 0  # Ol Chiki text present
            assert res["confidence"] >= 0.9

    def test_english_to_mundari_and_ho(self):
        """Verify English classroom phrases accurately translate to Mundari and Ho."""
        res_mun = nlp.translate(text="good morning", source_lang="english", target_lang="mundari")
        assert res_mun["source_lang"] == "english"
        assert "सुप्रभात" in res_mun["hindi_bridge"]
        assert "बोगि सेताः" in res_mun["devanagari_text"]

        res_ho = nlp.translate(text="come here", source_lang="english", target_lang="ho")
        assert res_ho["source_lang"] == "english"
        assert res_ho["hindi_bridge"] == "यहाँ आओ"
        assert "नेन्ता हिजुः मे" in res_ho["devanagari_text"]

    def test_english_numbers_translation(self):
        """Verify English number queries map properly."""
        for num_word in ["one", "two", "three", "four", "five"]:
            res = nlp.translate(text=num_word, source_lang="english", target_lang="santhali")
            assert res["source_lang"] == "english"
            assert len(res["translated_text"]) > 0

    def test_olchiki_phonetization_for_speech_synthesis(self):
        """Verify Ol Chiki Unicode characters map to Devanagari phonetic syllables for browser TTS."""
        # Santhali: 'ᱡᱚᱦᱟᱨ' (Johar)
        ol_johar = "ᱡᱚᱦᱟᱨ"
        dev_phonetic = olchiki_to_devanagari_phonetic(ol_johar)
        assert len(dev_phonetic) > 0
        assert "ज" in dev_phonetic
        assert "ह" in dev_phonetic
        assert "र" in dev_phonetic
