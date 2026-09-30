"""
BHASHASETU Production QA Suite: Linguistic & Script Conformance Testing
Validates:
1. Ol Chiki Unicode Range (U+1C50 - U+1C7F) compliance for Santhali
2. Dual-script generation (Ol Chiki + Devanagari) for Hindi-speaking teachers
3. Austroasiatic language coverage: Santhali, Mundari, and Ho
4. Bidirectional translation consistency (Hindi <-> Tribal)
5. Phonetic audio transcription integrity
"""

import pytest
import sys
import os

# Ensure backend directory is in path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'backend')))

from tribal_nlp_engine import nlp_engine, devanagari_to_ol_chiki, DEV_TO_OL_CHIKI_MAP
from language_packs import language_pack_manager

class TestLinguisticAndScripts:
    
    # Official Unicode Consortium Block for Ol Chiki: U+1C50 to U+1C7F
    OL_CHIKI_CODEPOINT_START = 0x1C50
    OL_CHIKI_CODEPOINT_END = 0x1C7F

    def is_ol_chiki_char(self, char: str) -> bool:
        """Check if character falls within the Ol Chiki Unicode range or is standard punctuation/whitespace."""
        if char in " \t\n\r.,!?:;-()'\"":
            return True
        cp = ord(char)
        return self.OL_CHIKI_CODEPOINT_START <= cp <= self.OL_CHIKI_CODEPOINT_END

    # ========================================================
    # 1. OL CHIKI UNICODE CONFORMANCE
    # ========================================================

    def test_devanagari_to_ol_chiki_unicode_range(self):
        """Verify that devanagari_to_ol_chiki produces valid Ol Chiki characters in the U+1C50-U+1C7F block."""
        dev_sample = "पोतोब झिज मे"
        ol_text = devanagari_to_ol_chiki(dev_sample)
        assert len(ol_text) > 0
        
        ol_chiki_chars_found = 0
        for char in ol_text:
            if self.is_ol_chiki_char(char):
                if ord(char) >= self.OL_CHIKI_CODEPOINT_START:
                    ol_chiki_chars_found += 1
            else:
                pytest.fail(f"Invalid character in Ol Chiki output: '{char}' (U+{ord(char):04X})")

        assert ol_chiki_chars_found > 0, "No Ol Chiki codepoints detected in output!"

    def test_ol_chiki_numerals_unicode_block(self):
        """Verify Ol Chiki numerals (᱐ ᱑ ᱒ ᱓ ᱔ ᱕ ᱖ ᱗ ᱘ ᱙) map correctly to codepoints U+1C50 to U+1C59."""
        dev_digits = "०१२३४५६७८९"
        ol_digits = devanagari_to_ol_chiki(dev_digits)
        assert len(ol_digits) == 10
        for idx, char in enumerate(ol_digits):
            expected_codepoint = 0x1C50 + idx
            assert ord(char) == expected_codepoint, f"Numeral {idx} mapped to U+{ord(char):04X}, expected U+{expected_codepoint:04X}"

    # ========================================================
    # 2. MULTILINGUAL TRIBAL COVERAGE (SANTHALI, MUNDARI, HO)
    # ========================================================

    @pytest.mark.parametrize("command_hindi", [
        "नमस्ते",
        "बैठ जाओ",
        "खड़े हो जाओ",
        "किताब खोलो",
        "किताब बंद करो",
        "चुप रहो",
        "हाथ उठाओ",
        "ताली बजाओ",
        "गाना गाओ"
    ])
    def test_all_three_tribal_languages_populated(self, command_hindi):
        """Verify every classroom command has verified translations in Santhali, Mundari, and Ho."""
        for lang in ["santhali", "mundari", "ho"]:
            res = nlp_engine.translate(command_hindi, "hindi", lang)
            assert len(res["translated_text"]) > 0, f"Empty translation for '{command_hindi}' in {lang}"
            assert len(res["devanagari_text"]) > 0, f"Missing Devanagari guide for '{command_hindi}' in {lang}"
            assert "audio_phonemes" in res

    def test_santhali_dual_script_fidelity(self):
        """Verify Santhali outputs BOTH authentic Ol Chiki AND Devanagari for teacher readability."""
        res = nlp_engine.translate("किताब खोलो", "hindi", "santhali")
        # Primary script in script_primary must be Ol Chiki
        assert any(ord(c) >= self.OL_CHIKI_CODEPOINT_START for c in res.get("script_primary", "")), "script_primary missing Ol Chiki script"
        # Devanagari guide must be provided for non-native Hindi teachers
        assert any(0x0900 <= ord(c) <= 0x097F for c in res["devanagari_text"]), "Devanagari pronunciation guide missing"

    # ========================================================
    # 3. BIDIRECTIONAL TRANSLATION (TRIBAL -> HINDI)
    # ========================================================

    def test_tribal_to_hindi_student_mode(self):
        """Verify Student Mode: tribal input translates into clear Hindi for the teacher."""
        # Santhali greeting -> Hindi
        res = nlp_engine.translate("जोहार", "santhali", "hindi")
        assert "नमस्ते" in res["translated_text"] or "जोहार" in res["translated_text"] or "प्रणाम" in res["translated_text"]

        # Santhali Ol Chiki -> Hindi
        res_ol = nlp_engine.translate("ᱫᱩᱲᱩᱵ ᱢᱮ", "santhali", "hindi")
        assert len(res_ol["translated_text"]) > 0
        assert any(0x0900 <= ord(c) <= 0x097F for c in res_ol["translated_text"])

    # ========================================================
    # 4. LANGUAGE PACK METADATA INTEGRITY
    # ========================================================

    def test_language_packs_cultural_context(self):
        """Verify language packs contain authentic cultural realia for Jharkhand."""
        packs = language_pack_manager.get_all_packs()
        assert len(packs) >= 3
        
        santhali_pack = language_pack_manager.get_pack("santhali")
        assert santhali_pack is not None
        assert santhali_pack.default_script == "ol_chiki"
        # Must have cultural context
        ctx = santhali_pack.cultural_context
        assert "major_festivals" in ctx
        assert any("sarhul" in f.lower() or "baha" in f.lower() or "sohrai" in f.lower() for f in ctx["major_festivals"])
