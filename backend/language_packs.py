"""
BHASHASETU: Scalable Language Pack & Script Intelligence Architecture
Decouples Language, Script, Orthography, and Pronunciation.
Supports Santhali, Mundari, Ho, Kurukh, and Kharia with native scripts and Devanagari/Roman bridges.
"""

from typing import Dict, List, Optional, Any
from pydantic import BaseModel, Field

class ScriptDefinition(BaseModel):
    id: str
    name_native: str
    name_english: str
    script_type: str # 'alphabet', 'abugida', 'latin'
    unicode_range: Optional[str] = None
    sample_text: str
    is_native: bool
    direction: str = "ltr"

class LanguagePack(BaseModel):
    id: str # e.g. 'santhali', 'mundari', 'ho', 'kurukh', 'kharia'
    iso_code: str
    name_english: str
    name_native: str
    family: str # 'Austroasiatic (Munda)' or 'Dravidian'
    default_script: str
    supported_scripts: List[ScriptDefinition]
    primary_regions: List[str]
    sample_greeting: Dict[str, str]
    cultural_context: Dict[str, Any]
    phonetic_rules: Dict[str, Any]
    vocabulary_glossary_count: int
    validation_status: str = "COMMUNITY_VALIDATED"
    license: str = "Open Educational & Indigenous Community Protected (CC-BY-NC-SA 4.0)"

# =========================================================================
# LANGUAGE PACKS REPOSITORY (Extensible Configuration)
# =========================================================================

LANGUAGE_PACKS_REGISTRY: Dict[str, LanguagePack] = {
    "santhali": LanguagePack(
        id="santhali",
        iso_code="sat",
        name_english="Santhali",
        name_native="ᱥᱟᱱᱛᱟᱲᱤ",
        family="Austroasiatic (Munda)",
        default_script="ol_chiki",
        supported_scripts=[
            ScriptDefinition(
                id="ol_chiki",
                name_native="ᱚᱞ ᱪᱤᱠᱤ",
                name_english="Ol Chiki",
                script_type="alphabet",
                unicode_range="U+1C50 - U+1C7F",
                sample_text="ᱥᱟᱜᱩᱱ ᱫᱟᱨᱟᱢ",
                is_native=True
            ),
            ScriptDefinition(
                id="devanagari",
                name_native="देवनागरी",
                name_english="Devanagari (Hindi Bridge)",
                script_type="abugida",
                unicode_range="U+0900 - U+097F",
                sample_text="सगुन दाराम",
                is_native=False
            ),
            ScriptDefinition(
                id="roman",
                name_native="Roman",
                name_english="Roman Transliteration",
                script_type="latin",
                sample_text="Sagun Daram",
                is_native=False
            )
        ],
        primary_regions=["Santhal Pargana (Dumka, Deoghar, Godda, Pakur, Sahibganj, Jamtara)", "East Singhbhum", "Giridih"],
        sample_greeting={
            "ol_chiki": "ᱥᱟᱜᱩᱱ ᱥᱮᱛᱟᱜ (Sagun Setah)",
            "devanagari": "सगुन सेताः",
            "roman": "Sagun Setah",
            "meaning_hindi": "शुभ प्रभात / नमस्कार",
            "meaning_english": "Good Morning / Greetings"
        },
        cultural_context={
            "major_festivals": ["Sohrai (ᱥᱚᱦᱨᱟᱭ)", "Baha Parab (ᱵᱟᱦᱟ)", "Karam (ᱠᱟᱨᱟᱢ)", "Erok Sim"],
            "folk_instruments": ["Tumdang (ᱛᱩᱢᱫᱟᱜ)", "Tamak (ᱴᱟᱢᱟᱠ)", "Banam (ᱵᱟᱱᱟᱢ)", "Tirio (ᱛᱤᱨᱤᱭᱚ)"],
            "nature_reverence": "Jaherthan (Sacred Grove / ᱡᱟᱦᱮᱨ ᱛᱷᱟᱱ)",
            "community_realia": ["Sarjom (Sal Tree / ᱥᱟᱨᱡᱚᱢ)", "Dare (Tree / ᱫᱟᱨᱮ)", "Gada (River / ᱜᱟᱰᱟ)"]
        },
        phonetic_rules={
            "checked_consonants": ["k'", "c'", "t'", "p'"],
            "glottal_stop_char": "ः / ᱜ/ᱫ/ᱵ/ᱡ",
            "vowel_neutralizer": "Ahd (ᱹ)"
        },
        vocabulary_glossary_count=450
    ),
    "mundari": LanguagePack(
        id="mundari",
        iso_code="unr",
        name_english="Mundari",
        name_native="मुण्डारी",
        family="Austroasiatic (Munda)",
        default_script="devanagari",
        supported_scripts=[
            ScriptDefinition(
                id="devanagari",
                name_native="देवनागरी (JCERT Standard)",
                name_english="Devanagari (Diacritic-Enriched)",
                script_type="abugida",
                unicode_range="U+0900 - U+097F",
                sample_text="जोहार / सेताः जोहार",
                is_native=False
            ),
            ScriptDefinition(
                id="mundari_bani",
                name_native="मुंडारी बानी / हिसीर",
                name_english="Mundari Bani (Native Hisir)",
                script_type="alphabet",
                unicode_range="U+1E5D0 - U+1E5FF",
                sample_text="ᱢᱩᱱᱰᱟᱨᱤ ᱵᱟᱱᱤ",
                is_native=True
            ),
            ScriptDefinition(
                id="roman",
                name_native="Roman",
                name_english="Roman Transliteration",
                script_type="latin",
                sample_text="Johar / Setah Johar",
                is_native=False
            )
        ],
        primary_regions=["Khunti", "Ranchi (Tamar, Bundu)", "Torpa", "Murhu", "West Singhbhum", "Simdega"],
        sample_greeting={
            "devanagari": "जोहार / सेताः जोहार",
            "mundari_bani": "ᱡᱚᱦᱟᱨ",
            "roman": "Johar / Setah Johar",
            "meaning_hindi": "प्रणाम / शुभ प्रभात",
            "meaning_english": "Respectful Greetings / Good Morning"
        },
        cultural_context={
            "major_festivals": ["Mage Parab", "Ba Parab (Flower Festival)", "Hero Parab", "Karam"],
            "folk_instruments": ["Duluk / Dama", "Madal", "Rutur (Flute)"],
            "historic_leaders": ["Bhagwan Birsa Munda (Dharti Aaba)"],
            "community_realia": ["Daru (Tree)", "Gada (River)", "Orah (Home)", "Hatu (Village)"]
        },
        phonetic_rules={
            "checked_stops": True,
            "glottal_diacritic": "ः"
        },
        vocabulary_glossary_count=380
    ),
    "ho": LanguagePack(
        id="ho",
        iso_code="hoc",
        name_english="Ho",
        name_native="ᱦᱳ ᱡᱚᱜᱚᱨ",
        family="Austroasiatic (Munda)",
        default_script="devanagari",
        supported_scripts=[
            ScriptDefinition(
                id="devanagari",
                name_native="देवनागरी (JCERT Standard)",
                name_english="Devanagari (Classroom Standard)",
                script_type="abugida",
                unicode_range="U+0900 - U+097F",
                sample_text="जोहार / सेताः जोहार",
                is_native=False
            ),
            ScriptDefinition(
                id="warang_chiti",
                name_native="ᱣᱟᱨᱟᱝ ᱪᱤᱛᱤ",
                name_english="Warang Chiti (Native Lako Bodra)",
                script_type="abugida",
                unicode_range="U+118A0 - U+118FF",
                sample_text="𑢹𑣉𑣉 ᱡᱚᱜᱚᱨ",
                is_native=True
            ),
            ScriptDefinition(
                id="roman",
                name_native="Roman",
                name_english="Roman Transliteration",
                script_type="latin",
                sample_text="Johar / Setah Johar",
                is_native=False
            )
        ],
        primary_regions=["Kolhan Division (Chaibasa, West Singhbhum, East Singhbhum, Seraikela-Kharsawan)"],
        sample_greeting={
            "devanagari": "जोहार / सेताः जोहार",
            "warang_chiti": "ᱣᱟᱨᱟᱝ ᱪᱤᱛᱤ ᱡᱚᱦᱟᱨ",
            "roman": "Johar / Setah Johar",
            "meaning_hindi": "जोहार / नमस्कार",
            "meaning_english": "Greetings / Hello"
        },
        cultural_context={
            "major_festivals": ["Mage Parab", "Ba Parab", "Damurai Parab", "Kolom Parab"],
            "folk_instruments": ["Damang", "Duma", "Rutur"],
            "script_creator": "Ot Guru Kol Lako Bodra (1940s)",
            "community_realia": ["Daru (Tree)", "Daa (Water)", "Owa (Home)", "Hatu (Village)"]
        },
        phonetic_rules={
            "checked_stops": True,
            "tonal_modulations": ["High", "Level", "Glottal"]
        },
        vocabulary_glossary_count=350
    ),
    "kurukh": LanguagePack(
        id="kurukh",
        iso_code="kru",
        name_english="Kurukh (Oraon)",
        name_native="कुड़ुख़",
        family="Dravidian (Northern Branch)",
        default_script="devanagari",
        supported_scripts=[
            ScriptDefinition(
                id="devanagari",
                name_native="देवनागरी",
                name_english="Devanagari (Primary)",
                script_type="abugida",
                unicode_range="U+0900 - U+097F",
                sample_text="गोड़े / जय जोहार",
                is_native=False
            ),
            ScriptDefinition(
                id="tolong_siki",
                name_native="तोलोङ सिकी",
                name_english="Tolong Siki (Native Dr. Oraon)",
                script_type="alphabet",
                sample_text="तोलोङ सिकी कुड़ुख़",
                is_native=True
            ),
            ScriptDefinition(
                id="roman",
                name_native="Roman",
                name_english="Roman Transliteration",
                script_type="latin",
                sample_text="Gode / Jai Johar",
                is_native=False
            )
        ],
        primary_regions=["Gumla", "Lohardaga", "Ranchi", "Latehar", "Palamu", "Simdega"],
        sample_greeting={
            "devanagari": "गोड़े / जय जोहार (Gode / Jai Johar)",
            "tolong_siki": "गोड़े",
            "roman": "Gode / Jai Johar",
            "meaning_hindi": "नमस्कार / प्रणाम",
            "meaning_english": "Greetings / Respectful Salute"
        },
        cultural_context={
            "major_festivals": ["Karam", "Sarhul (Khaddi)", "Jitiya", "Fagua"],
            "symbol": "Dhumkuria (Traditional Youth Learning Academy)",
            "script_creator": "Dr. Narayan Oraon (1989)",
            "community_realia": ["Mann (Tree / मन्न)", "Amma (Water / अम्म)", "Erpa (House / एर्पा)"]
        },
        phonetic_rules={
            "retroflex_stops": True,
            "dravidian_vowel_harmony": True
        },
        vocabulary_glossary_count=280
    ),
    "kharia": LanguagePack(
        id="kharia",
        iso_code="khr",
        name_english="Kharia",
        name_native="खड़िया",
        family="Austroasiatic (Munda)",
        default_script="devanagari",
        supported_scripts=[
            ScriptDefinition(
                id="devanagari",
                name_native="देवनागरी",
                name_english="Devanagari (Standard)",
                script_type="abugida",
                sample_text="जोहार / सेताः जोहार",
                is_native=False
            ),
            ScriptDefinition(
                id="roman",
                name_native="Roman",
                name_english="Roman Transliteration",
                script_type="latin",
                sample_text="Johar",
                is_native=False
            )
        ],
        primary_regions=["Simdega", "Gumla", "West Singhbhum"],
        sample_greeting={
            "devanagari": "जोहार / सेताः जोहार",
            "roman": "Johar",
            "meaning_hindi": "जोहार / नमस्कार",
            "meaning_english": "Greetings"
        },
        cultural_context={
            "major_festivals": ["Jankor (Flower Festival)", "Karam", "Kadleta"],
            "community_realia": ["Daru (Tree)", "Da (Water)", "U (House)"]
        },
        phonetic_rules={
            "checked_stops": True
        },
        vocabulary_glossary_count=220
    )
}

class LanguagePackManager:
    """Manages language pack registration, script conversion, and linguistic metadata."""
    
    @staticmethod
    def get_all_packs() -> List[Dict[str, Any]]:
        return [pack.dict() for pack in LANGUAGE_PACKS_REGISTRY.values()]
    
    @staticmethod
    def get_pack(lang_id: str) -> Optional[LanguagePack]:
        return LANGUAGE_PACKS_REGISTRY.get(lang_id.lower())
    
    @staticmethod
    def get_supported_scripts(lang_id: str) -> List[ScriptDefinition]:
        pack = LANGUAGE_PACKS_REGISTRY.get(lang_id.lower())
        return pack.supported_scripts if pack else []

    @staticmethod
    def detect_script(text: str) -> str:
        """Detects whether text is in Ol Chiki, Devanagari, Warang Chiti, or Latin."""
        for char in text:
            code = ord(char)
            if 0x1C50 <= code <= 0x1C7F:
                return "ol_chiki"
            elif 0x0900 <= code <= 0x097F:
                return "devanagari"
            elif 0x118A0 <= code <= 0x118FF:
                return "warang_chiti"
            elif 0x1E5D0 <= code <= 0x1E5FF:
                return "mundari_bani"
        return "roman"

language_pack_manager = LanguagePackManager()
