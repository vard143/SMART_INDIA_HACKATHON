"""
BHASHASETU: Offline AI Worksheet Agent (Python Edge Server Implementation)
Generates natural, pedagogically simple, culturally authentic bilingual worksheets
with dynamic variations (zero repetition) for Jharkhand primary schools (Ho, Mundari, Santhali).
"""

import time
import random
import hashlib
from typing import Dict, List, Optional, Any

TRIBAL_REALIA_BANK = [
    {
        "id": "sal_tree",
        "emoji": "🌳",
        "category": "flora",
        "hindi": "सखुआ (साल) पेड़",
        "english": "Sal Tree",
        "santhali": {"dev": "सारजोम दारे", "ol": "ᱥᱟᱨᱡᱚᱢ ᱫᱟᱨᱮ", "rom": "Sarjom Dare"},
        "mundari": {"dev": "सारजोम दारू", "rom": "Sarjom Daru"},
        "ho": {"dev": "सारजोम दारू", "rom": "Sarjom Daru"}
    },
    {
        "id": "mahua_tree",
        "emoji": "🥭",
        "category": "flora",
        "hindi": "महुआ पेड़ / फल",
        "english": "Mahua Tree / Fruit",
        "santhali": {"dev": "मातकोम दारे", "ol": "ᱢᱟᱛᱠᱚᱢ ᱫᱟᱨᱮ", "rom": "Matkom Dare"},
        "mundari": {"dev": "मादकम दारू", "rom": "Madkam Daru"},
        "ho": {"dev": "मादकम दारू", "rom": "Madkam Daru"}
    },
    {
        "id": "palash_flower",
        "emoji": "🌺",
        "category": "flora",
        "hindi": "पलाश (परस) फूल",
        "english": "Palash Flower",
        "santhali": {"dev": "मुरुप बाहा", "ol": "ᱢᱩᱨᱩᱯ ᱵᱟᱦᱟ", "rom": "Murup Baha"},
        "mundari": {"dev": "मुरुप बा", "rom": "Murup Ba"},
        "ho": {"dev": "मुरुप बा", "rom": "Murup Ba"}
    },
    {
        "id": "mandar_drum",
        "emoji": "🥁",
        "category": "instrument",
        "hindi": "मांदर ढोल",
        "english": "Mandar Folk Drum",
        "santhali": {"dev": "तुमदाः", "ol": "ᱛᱩᱢᱫᱟᱜ", "rom": "Tumdak"},
        "mundari": {"dev": "तुमदा", "rom": "Tumda"},
        "ho": {"dev": "दमंग", "rom": "Damang"}
    },
    {
        "id": "elephant",
        "emoji": "🐘",
        "category": "fauna",
        "hindi": "हाथी",
        "english": "Elephant",
        "santhali": {"dev": "हाती", "ol": "ᱦᱟᱹᱛᱤ", "rom": "Hati"},
        "mundari": {"dev": "हाती", "rom": "Hati"},
        "ho": {"dev": "हाती", "rom": "Hati"}
    },
    {
        "id": "peacock",
        "emoji": "🦚",
        "category": "fauna",
        "hindi": "मोर",
        "english": "Peacock",
        "santhali": {"dev": "माराग", "ol": "ᱢᱟᱨᱟᱜ", "rom": "Marak"},
        "mundari": {"dev": "मारा", "rom": "Mara"},
        "ho": {"dev": "मारा", "rom": "Mara"}
    },
    {
        "id": "bird",
        "emoji": "🐦",
        "category": "fauna",
        "hindi": "चिड़िया / पक्षी",
        "english": "Bird",
        "santhali": {"dev": "चेणे", "ol": "ᱪᱮᱬᱮ", "rom": "Chene"},
        "mundari": {"dev": "चेड़े", "rom": "Chede"},
        "ho": {"dev": "चेड़े", "rom": "Chede"}
    },
    {
        "id": "bow_arrow",
        "emoji": "🏹",
        "category": "instrument",
        "hindi": "धनुष-बाण",
        "english": "Bow & Arrow",
        "santhali": {"dev": "आग-सार", "ol": "ᱟᱜ-ᱥᱟᱨ", "rom": "Ag-Sar"},
        "mundari": {"dev": "आग-सार", "rom": "Ag-Sar"},
        "ho": {"dev": "आ-सार", "rom": "A-Sar"}
    },
    {
        "id": "book",
        "emoji": "📖",
        "category": "classroom",
        "hindi": "किताब / पुस्तक",
        "english": "Book",
        "santhali": {"dev": "पोतोब", "ol": "ᱯᱚᱛᱚᱵ", "rom": "Potob"},
        "mundari": {"dev": "पुथी", "rom": "Puthi"},
        "ho": {"dev": "पुथी", "rom": "Puthi"}
    },
    {
        "id": "sal_leaf",
        "emoji": "🍃",
        "category": "flora",
        "hindi": "सखुआ पत्ता",
        "english": "Sal Leaf",
        "santhali": {"dev": "साकाम", "ol": "ᱥᱟᱠᱟᱢ", "rom": "Sakam"},
        "mundari": {"dev": "साकाम", "rom": "Sakam"},
        "ho": {"dev": "साकाम", "rom": "Sakam"}
    }
]

TRACING_CHAR_BANK = [
    {"dev": "अ", "ol": "ᱚ", "rom": "O", "word_dev": "ओल (लिखना)", "word_ol": "ᱚᱞ", "word_eng": "Write"},
    {"dev": "त", "ol": "ᱛ", "rom": "T", "word_dev": "तुमदाः (मांदर)", "word_ol": "ᱛᱩᱢᱫᱟᱜ", "word_eng": "Drum"},
    {"dev": "ग", "ol": "ᱜ", "rom": "G", "word_dev": "गय (गाय)", "word_ol": "ᱜᱟᱹᱭ", "word_eng": "Cow"},
    {"dev": "ल", "ol": "ᱞ", "rom": "L", "word_dev": "लेखा (गिनती)", "word_ol": "ᱞᱮᱠᱷᱟ", "word_eng": "Count"},
    {"dev": "क", "ol": "ᱠ", "rom": "K", "word_dev": "काहु (कौआ)", "word_ol": "ᱠᱟᱦᱩ", "word_eng": "Crow"},
    {"dev": "द", "ol": "ᱫ", "rom": "D", "word_dev": "दारे (पेड़)", "word_ol": "ᱫᱟᱨᱮ", "word_eng": "Tree"},
    {"dev": "प", "ol": "ᱯ", "rom": "P", "word_dev": "पोतोब (किताब)", "word_ol": "ᱯᱚᱛᱚᱵ", "word_eng": "Book"},
    {"dev": "ब", "ol": "ᱵ", "rom": "B", "word_dev": "बाहा (फूल)", "word_ol": "ᱵᱟᱦᱟ", "word_eng": "Flower"}
]

FILL_BANK = [
    {
        "sentence_incomplete": "हमारे गाँव के जंगल में ___ का पेड़ बहुत पूजनीय है।",
        "missing_word": "सखुआ (ᱫᱟᱨᱮ)",
        "tribal_sentence": "ᱟᱞᱮ ᱟᱹᱛᱩ ᱵᱤᱨ ᱨᱮ ᱥᱟᱨᱡᱚᱢ ᱫᱟᱨᱮ ᱟᱹᱰᱤ ᱢᱟᱱᱟᱣ-ᱟ᱾",
        "hint": "🌳 सखुआ पेड़ / ᱥᱟᱨᱡᱚᱢ ᱫᱟᱨᱮ"
    },
    {
        "sentence_incomplete": "सुबह पाठशाला आकर हम गुरुजी को ___ कहते हैं।",
        "missing_word": "जोहार (ᱡᱚᱦᱟᱨ)",
        "tribal_sentence": "ᱥᱮᱛᱟᱜ ᱟᱥᱲᱟ ᱦᱮᱡ ᱠᱟᱛᱮ ᱢᱟᱪᱮᱛ ᱵᱚᱱ ᱡᱚᱦᱟᱨ ᱟᱭᱟ᱾",
        "hint": "🌿 जोहार / ᱡᱚᱦᱟᱨ"
    },
    {
        "sentence_incomplete": "सरहुल के त्योहार में बच्चे ___ बजाते हैं।",
        "missing_word": "मांदर (ᱛᱩᱢᱫᱟᱜ)",
        "tribal_sentence": "ᱵᱟᱦᱟ ᱯᱟᱨᱟᱵᱽ ᱨᱮ ᱜᱤᱫᱽᱨᱟᱹ ᱛᱩᱢᱫᱟᱜ ᱠᱚ ᱨᱩᱭ-ᱟ᱾",
        "hint": "🥁 मांदर / ᱛᱩᱢᱫᱟᱜ"
    }
]

class OfflineWorksheetAgent:
    """Agent that creates varied, simple, child-friendly bilingual worksheets."""

    def generate(
        self,
        language: str = "santhali",
        student_name: str = "बिरसा मुंडा",
        school_name: str = "राजकीय प्राथमिक विद्यालय, दुमका",
        competency_level: str = "class1",
        focus_type: str = "combo",
        seed: Optional[str] = None
    ) -> Dict[str, Any]:
        rng = random.Random(seed or f"{time.time()}_{student_name}_{random.random()}")
        lang = language.lower()

        # 1. Matching Section
        realia_pool = list(TRIBAL_REALIA_BANK)
        rng.shuffle(realia_pool)
        selected_realia = realia_pool[:4]

        match_section = []
        for idx, item in enumerate(selected_realia):
            t_data = item.get(lang, item["santhali"])
            match_section.append({
                "id": idx + 1,
                "prompt": f"चित्र देखकर सही {lang.upper()} शब्द से मिलाएँ",
                "hindi_text": item["hindi"],
                "tribal_text": f"{t_data.get('dev', '')} ({t_data.get('rom', '')})",
                "tribal_script": t_data.get("ol", t_data.get("dev", "")),
                "english_text": item["english"],
                "emoji": item["emoji"]
            })

        # 2. Counting Section
        santhali_numbers = ["ᱢᱤᱫ", "ᱵᱟᱨ", "ᱯᱮ", "ᱯᱳᱱ", "ᱢᱚᱬᱮ", "ᱛᱩᱨᱩᱭ", "ᱮᱭᱟᱭ", "ᱤᱨᱟᱹᱞ", "ᱟᱨᱮ", "ᱜᱮᱞ"]
        hindi_numbers = ["एक", "दो", "तीन", "चार", "पाँच", "छह", "सात", "आठ", "नौ", "दस"]
        eng_numbers = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"]

        used_counts = set()
        count_section = []
        for i in range(4):
            c = rng.randint(1, 10 if competency_level != "balvatika" else 5)
            while c in used_counts:
                c = (c % (10 if competency_level != "balvatika" else 5)) + 1
            used_counts.add(c)

            realia = selected_realia[i]
            t_data = realia.get(lang, realia["santhali"])
            num_tribal = santhali_numbers[c - 1] if lang == "santhali" else hindi_numbers[c - 1]

            count_section.append({
                "id": i + 1,
                "count": c,
                "emoji": realia["emoji"],
                "name_hindi": f"{hindi_numbers[c - 1]} {realia['hindi']} ({c})",
                "name_tribal": f"{num_tribal} {t_data.get('dev', '')}",
                "name_english": f"{eng_numbers[c - 1]} {realia['english']}"
            })

        # 3. Tracing Section
        trace_pool = list(TRACING_CHAR_BANK)
        rng.shuffle(trace_pool)
        trace_section = [
            {
                "id": idx + 1,
                "char_native": item["ol"] if lang == "santhali" else item["dev"],
                "char_devanagari": item["dev"],
                "word_native": f"{item['word_ol']} ({item['word_dev']})" if lang == "santhali" else item["word_dev"],
                "word_hindi": item["word_dev"],
                "sound_phonetic": item["rom"]
            }
            for idx, item in enumerate(trace_pool[:4])
        ]

        # 4. Fill-in-the-blank Section
        fill_pool = list(FILL_BANK)
        rng.shuffle(fill_pool)
        fill_section = [
            {
                "id": idx + 1,
                "sentence_incomplete": item["sentence_incomplete"],
                "missing_word": item["missing_word"],
                "tribal_sentence": item["tribal_sentence"],
                "hint": item["hint"]
            }
            for idx, item in enumerate(fill_pool[:3])
        ]

        worksheet_code = f"WS-{lang[:3].upper()}-{competency_level.upper()}-{rng.randint(1000, 9999)}"

        return {
            "worksheet_id": worksheet_code,
            "student_name": student_name,
            "school_name": school_name,
            "competency_level": competency_level,
            "focus_type": focus_type,
            "title": f"NIPUN भारत बालवाटिका एवं प्राथमिक अभ्यास पत्रक: {competency_level.upper()}",
            "grade": f"Class {competency_level[-1]}" if competency_level != "balvatika" else "Balvatika",
            "subject": "भाषा एवं परिवेशीय साक्षरता (FLN MTB-MLE)",
            "language": language,
            "match_section": match_section,
            "count_section": count_section,
            "trace_section": trace_section,
            "fill_section": fill_section,
            "generated_timestamp": time.time(),
            "instructions_hindi": "निर्देश: चित्रों को देखें, सही मातृभाषा शब्दों से मिलाएँ, परिवेशीय वस्तुएँ गिनें और अभ्यास पूरा करें।",
            "instructions_tribal": "ᱫᱤᱥᱟᱹ: ᱪᱤᱛᱟᱹᱨ ᱧᱮᱞ ᱢᱮ, ᱡᱟᱱᱟᱢ ᱟᱲᱟᱝ ᱟᱹᱲᱟᱹ ᱥᱟᱶ ᱡᱚᱲᱟᱣ ᱢᱮ ᱟᱨ ᱚᱞ ᱪᱮᱫᱚᱜ ᱢᱮ᱾" if lang == "santhali" else "दिसुम: चितार नेल मे, जानाम जगरा ते जोड़ाव मे।"
        }

worksheet_agent = OfflineWorksheetAgent()
