# -*- coding: utf-8 -*-
"""
Official Government Textbook & Curriculum Ingestion Engine
Extracts, parses, and catalogs all official JCERT/NCERT Class 1, 2, 3 textbooks
from ZIP archives into offline PDFs, JSON corpus, and SQLite local database.
"""

import sys
import os
import shutil
import zipfile
import re
import json
import time

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

import pymupdf

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SUBJECTS_DIR = os.path.join(BASE_DIR, "subjects")
DATA_DIR = os.path.join(BASE_DIR, "data")
TEXTBOOKS_PDF_DIR = os.path.join(DATA_DIR, "textbooks_pdf")
CORPUS_OUTPUT_PATH = os.path.join(DATA_DIR, "curriculum_official", "official_textbooks_data.json")

TEXTBOOK_SPECS = [
    {
        "id": "tb-c1-hindi-sarangi",
        "zip_names": ["ahsr1dd.zip"],
        "grade": "Class 1",
        "grade_key": "class1",
        "subject": "hindi",
        "subject_name_hindi": "भाषा एवं साक्षरता (Hindi)",
        "subject_name_english": "Language and Literacy",
        "title_official": "सारंगी भाग 1 (Sarangi Part 1)",
        "state_equivalent": "मांदर भाग 1 (Mandar Part 1 - JCERT)",
        "book_code": "ahsr1",
        "dest_subdir": os.path.join("class1", "hindi"),
        "default_titles": {
            1: ("मीना का परिवार", "ᱢᱤᱱᱟ ᱨᱮᱱ ᱜᱷᱟᱨᱚᱸᱡᱽ (Meena Ren Gharonj)", "Family and Household Realia"),
            2: ("दादा-दादी", "ᱦᱟᱲᱟᱢ ᱵᱩᱰᱷᱤ (Haram Budhi)", "Elders and Respect"),
            3: ("रीना का दिन", "ᱨᱤᱱᱟ ᱟᱜ ᱢᱟᱦᱟᱸ (Reena Ag Maha)", "Daily Routine and Hygiene"),
            4: ("रानी भी", "ᱨᱟᱱᱤ ᱦᱚᱸ (Rani Ho)", "Inclusivity and Sibling Bonds"),
            5: ("मिठाई", "ᱞᱟᱹᱰᱩ (Ladu / Sweets)", "Sharing and Joy"),
            6: ("तीन साथी", "ᱯᱮ ᱡᱚᱴᱟᱣ (Pe Jotao)", "Friendship and Nature"),
            7: ("वाह! मेरे घोड़े", "ᱵᱟᱦ! ᱤᱧᱨᱮᱱ ᱥᱟᱫᱚᱢ (Vah Inyren Sadom)", "Animals and Imagination"),
            8: ("खतरे में साँप", "ᱵᱚᱛᱚᱨ ᱨᱮ ᱵᱤᱧ (Botor re Binj)", "Animal Empathy and Nature"),
            9: ("आलू की सड़क", "ᱟᱹᱞᱩ ᱨᱮᱭᱟᱜ ᱰᱟᱦᱟᱨ (Alu reyag Dahar)", "Humor and Creativity"),
            10: ("झूला", "ᱦᱤᱞᱟᱹᱣ / ᱡᱷᱩᱞᱟ (Jhulaw / Jhula)", "Play and Joy"),
            11: ("गुड़", "ᱜᱩᱲ (Gur / Jaggery)", "Village Life and Sweetness"),
            12: ("चाँद का बच्चा", "ᱪᱟᱸᱫᱚ ᱨᱮᱱ ᱜᱤᱫᱽᱨᱟᱹ (Chando ren Gidra)", "Night Sky and Wonder"),
            13: ("मेला", "ᱯᱟᱛᱟ / ᱢᱮᱞᱟ (Pata / Mela)", "Local Tribal Fairs and Joy"),
            14: ("बरसात", "ᱫᱟᱜ ᱡᱟᱹᱲᱤ (Dag Jari / Rain)", "Monsoon and Environment"),
            15: ("होली", "ᱵᱟᱦᱟ ᱯᱚᱨᱚᱵᱽ / ᱦᱚᱞᱤ (Baha Porob / Holi)", "Festivals of Colors and Nature"),
            16: ("जन्मदिन", "ᱡᱟᱱᱟᱢ ᱢᱟᱦᱟᱸ (Janam Maha)", "Celebration and Community"),
            17: ("गेंद", "ᱵᱚᱞ / ᱜᱮᱸᱫᱽ (Bol / Ball)", "Sports and Outdoor Play"),
            18: ("कौआ और लोमड़ी", "ᱠᱟᱣᱟ ᱟᱨ ᱛᱩᱭᱩ (Kawa ar Tuyu)", "Folk Tales and Wisdom"),
            19: ("आनंदमयी कविता", "ᱨᱟᱹᱥᱠᱟᱹ ᱚᱱᱚᱬᱦᱮ (Raska Onorhe)", "Poetry and Rhythm")
        }
    },
    {
        "id": "tb-c1-math-joyful",
        "zip_names": ["ahjm1dd.zip"],
        "grade": "Class 1",
        "grade_key": "class1",
        "subject": "math",
        "subject_name_hindi": "आनंदमय गणित (Mathematics)",
        "subject_name_english": "Foundational Numeracy",
        "title_official": "आनंदमय गणित भाग 1 (Joyful Mathematics Part 1)",
        "state_equivalent": "गणित खेल 1 (JCERT Jharkhand)",
        "book_code": "ahjm1",
        "dest_subdir": os.path.join("class1", "math"),
        "default_titles": {
            1: ("खोजें अपने आस-पास (आकृतियाँ)", "ᱟᱵᱚ ᱟᱰᱮ-ᱯᱟᱥᱮ ᱥᱮᱸᱫᱽᱨᱟ (Shapes and Space)", "Spatial Sense and Shapes"),
            2: ("गिनती 1 से 9 तक", "᱑ ᱠᱷᱚᱱ ᱙ ᱫᱷᱟᱹᱵᱤᱡ ᱞᱮᱠᱷᱟ (Counting 1 to 9)", "Numbers 1-9 and Quantity"),
            3: ("कंचे और आम (जोड़)", "ᱜᱩᱞᱤ ᱟᱨ ᱩᱞ (Addition with Realia)", "Concept of Addition (1-9)"),
            4: ("कितने बचे? (घटाव)", "ᱛᱤᱱᱟᱹᱜ ᱥᱟᱨᱮᱡ ᱮᱱᱟ? (Subtraction)", "Concept of Subtraction (1-9)"),
            5: ("10 से 20 तक की संख्याएँ", "᱑᱐ ᱠᱷᱚᱱ ᱒᱐ ᱫᱷᱟᱹᱵᱤᱡ ᱮᱞ (Numbers 10 to 20)", "Grouping in Tens and Ones"),
            6: ("समय और दिन", "ᱚᱠᱛᱚ ᱟᱨ ᱢᱟᱦᱟᱸ (Time and Daily Rhythm)", "Time and Daily Routine"),
            7: ("माप और तौल", "ᱡᱚᱠᱷᱟ ᱟᱨ ᱦᱟᱢᱟᱞ (Measurement and Comparison)", "Non-standard Units"),
            8: ("21 से 50 तक की संख्याएँ", "᱒᱑ ᱠᱷᱚᱱ ᱕᱐ ᱫᱷᱟᱹᱵᱤᱡ ᱮᱞ (Numbers 21 to 50)", "Extended Counting"),
            9: ("पैटर्न और डिज़ाइन", "ᱨᱩᱯ ᱟᱨ ᱪᱤᱛᱟᱹᱨ (Patterns and Symmetry)", "Visual Patterns in Nature"),
            10: ("पैसे और सिक्के", "ᱴᱟᱠᱟ ᱟᱨ ᱯᱩᱭᱥᱟᱹ (Money and Coins)", "Currency Recognition"),
            11: ("51 से 99 तक की संख्याएँ", "᱕᱑ ᱠᱷᱚᱱ ᱙᱙ ᱫᱷᱟᱹᱵᱤᱡ ᱮᱞ (Numbers 51 to 99)", "Tens and Place Value"),
            12: ("आँकड़े और सूची", "ᱞᱮᱠᱷᱟ ᱡᱟᱣᱨᱟ (Data and List)", "Foundational Data Handling"),
            13: ("कितने कितना?", "ᱛᱤᱱᱟᱹᱜ ᱪᱚ? (How Many / Estimation)", "Problem Solving")
        }
    },
    {
        "id": "tb-c1-english-mridang",
        "zip_names": ["aemr1dd (1).zip", "aemr1dd.zip"],
        "grade": "Class 1",
        "grade_key": "class1",
        "subject": "english",
        "subject_name_hindi": "अंग्रेजी (English - Mridang)",
        "subject_name_english": "English Foundational Literacy",
        "title_official": "Mridang Book 1 (मृदंग भाग 1)",
        "state_equivalent": "Sunrise Part 1 (JCERT Jharkhand)",
        "book_code": "aemr1",
        "dest_subdir": os.path.join("class1", "english"),
        "default_titles": {
            1: ("My Family and Me", "ᱤᱧ ᱟᱨ ᱤᱧᱟᱜ ᱜᱷᱟᱨᱚᱸᱡᱽ (My Family & Me)", "Identity, Self and Family"),
            2: ("Life Around Us", "ᱟᱵᱚ ᱟᱰᱮ-ᱯᱟᱥᱮ ᱡᱤᱭᱚᱱ (Nature & Animals)", "Surroundings and Animals"),
            3: ("Food and Health", "ᱡᱚᱢ ᱟᱨ ᱦᱚᱲᱢᱚ (Food & Good Habits)", "Nutrition and Health"),
            4: ("Seasons and Weather", "ᱨᱤᱛᱩ ᱟᱨ ᱦᱚᱭ-ᱦᱤᱥᱤᱫ (Seasons)", "Seasons and Nature"),
            5: ("Let us Play", "ᱫᱮᱞᱟᱵᱚᱱ ᱮᱱᱮᱡ-ᱟ (Games & Play)", "Physical Play and Cooperation"),
            6: ("Fun with Words", "ᱥᱟᱵᱟᱫᱽ ᱨᱮ ᱨᱟᱹᱥᱠᱟᱹ (Phonics & Rhymes)", "Phonemic Awareness"),
            7: ("Animal Friends", "ᱡᱤᱭᱟᱹᱞᱤ ᱜᱟᱛᱮ (Animal Sounds & Care)", "Empathy and Biodiversity"),
            8: ("Little Birdie", "ᱠᱟᱹᱴᱤᱡ ᱪᱮᱬᱮ (Little Bird)", "Nature Poetry"),
            9: ("Colours Everywhere", "ᱥᱟᱱᱟᱢ ᱴᱷᱟᱶ ᱨᱚᱝ (Colours in Nature)", "Colour Recognition")
        }
    },
    {
        "id": "tb-c1-math-santhali",
        "zip_names": ["asnjm1dd.zip"],
        "grade": "Class 1",
        "grade_key": "class1",
        "subject": "math",
        "subject_name_hindi": "आनंदमय गणित संथाली (Joyful Math Santhali)",
        "subject_name_english": "Santhali Foundational Numeracy",
        "title_official": "ᱨᱟᱹᱥᱠᱟᱹ ᱮᱞᱠᱷᱟ ᱑ (Joyful Mathematics Santhali 1)",
        "state_equivalent": "संथाली गणित 1 (JCERT)",
        "book_code": "asnjm1",
        "dest_subdir": os.path.join("class1", "math_santhali"),
        "default_titles": {
            1: ("ᱫᱮᱞᱟᱵᱚᱱ ᱥᱮᱸᱫᱽᱨᱟᱭᱟ (Shapes & Location)", "ᱫᱮᱞᱟᱵᱚᱱ ᱥᱮᱸᱫᱽᱨᱟᱭᱟ (Find Around Us)", "Spatial Awareness"),
            2: ("᱑ ᱠᱷᱚᱱ ᱙ ᱫᱷᱟᱹᱵᱤᱡ ᱮᱞ (Counting 1-9)", "᱑ ᱠᱷᱚᱱ ᱙ ᱫᱷᱟᱹᱵᱤᱡ ᱮᱞ (Numbers 1 to 9)", "Foundational Numbers"),
            3: ("ᱢᱮᱥᱟ / ᱡᱚᱲᱟᱣ (Addition)", "ᱢᱮᱥᱟ / ᱡᱚᱲᱟᱣ (Addition with Local Realia)", "Hands-on Addition"),
            4: ("ᱵᱷᱮᱜᱟᱨ / ᱚᱪᱚᱜ (Subtraction)", "ᱵᱷᱮᱜᱟᱨ / ᱚᱪᱚᱜ (Subtraction)", "Take-away Concept"),
            5: ("᱑᱐ ᱠᱷᱚᱱ ᱒᱐ ᱮᱞ (Numbers 10-20)", "᱑᱐ ᱠᱷᱚᱱ ᱒᱐ ᱮᱞ (Numbers 10 to 20)", "Tens Concept"),
            6: ("ᱚᱠᱛᱚ ᱟᱨ ᱫᱤᱱ (Time & Routines)", "ᱚᱠᱛᱚ ᱟᱨ ᱫᱤᱱ (Time)", "Daily Time"),
            7: ("ᱡᱚᱠᱷᱟ (Measurement)", "ᱡᱚᱠᱷᱟ (Measurement with Spans)", "Non-standard Lengths"),
            8: ("᱒᱑ ᱠᱷᱚᱱ ᱕᱐ ᱮᱞ (Numbers 21-50)", "᱒᱑ ᱠᱷᱚᱱ ᱕᱐ ᱮᱞ (Numbers 21-50)", "Counting 21-50"),
            9: ("ᱯᱮᱴᱚᱨᱱ (Patterns)", "ᱯᱮᱴᱚᱨᱱ (Patterns & Nature)", "Geometric Patterns"),
            10: ("ᱴᱟᱠᱟ ᱯᱩᱭᱥᱟᱹ (Money)", "ᱴᱟᱠᱟ ᱯᱩᱭᱥᱟᱹ (Coins & Notes)", "Currency Value"),
            11: ("᱕᱑ ᱠᱷᱚᱱ ᱙᱙ ᱮᱞ (Numbers 51-99)", "᱕᱑ ᱠᱷᱚᱱ ᱙᱙ ᱮᱞ (Numbers 51-99)", "Numbers to 99"),
            12: ("ᱞᱮᱠᱷᱟ ᱡᱟᱣᱨᱟ (Data)", "ᱞᱮᱠᱷᱟ ᱡᱟᱣᱨᱟ (Data Collection)", "Tally & Data"),
            13: ("ᱛᱤᱱᱟᱹᱜ ᱪᱚ? (Estimation)", "ᱛᱤᱱᱟᱹᱜ ᱪᱚ? (Estimation & Story Math)", "Real World Math")
        }
    },
    {
        "id": "tb-c2-hindi-sarangi",
        "zip_names": ["bhsr1dd.zip"],
        "grade": "Class 2",
        "grade_key": "class2",
        "subject": "hindi",
        "subject_name_hindi": "भाषा एवं साक्षरता (Hindi Class 2)",
        "subject_name_english": "Language & Literacy 2",
        "title_official": "सारंगी भाग 2 (Sarangi Part 2)",
        "state_equivalent": "सखुआ भाग 2 (Sakhua Part 2 - JCERT)",
        "book_code": "bhsr1",
        "dest_subdir": os.path.join("class2", "hindi"),
        "default_titles": {
            1: ("नीम की सीख", "ᱱᱤᱢ ᱫᱟᱨᱮ ᱥᱤᱠᱷᱱᱟᱹᱛ (Neem Tree Wisdom)", "Traditional Medicine and Ecology"),
            2: ("चित्र और बातचीत", "ᱪᱤᱛᱟᱹᱨ ᱟᱨ ᱨᱚᱯᱚᱲ (Picture Talk)", "Oral Language Development"),
            3: ("भालू की चालाकी", "ᱵᱟᱱᱟ ᱨᱮᱭᱟᱜ ᱪᱟᱞᱟᱠᱤ (Clever Bear)", "Folk Tales and Wit"),
            4: ("तितली और कली", "ᱯᱤᱯᱤᱲᱤᱭᱟᱹᱝ ᱟᱨ ᱵᱟᱦᱟ (Butterfly & Bud)", "Nature and Growth"),
            5: ("बुलबुल और कोयल", "ᱪᱮᱬᱮ ᱟᱨ ᱠᱩᱦᱩ (Bulbul & Koel)", "Bird Songs and Rhythm"),
            6: ("हम सब सुमन एक उपवन के", "ᱟᱵᱚ ᱡᱚᱛᱚ ᱢᱤᱫ ᱵᱟᱜᱟᱱ ᱨᱮᱱ (Unity in Diversity)", "Harmony and Coexistence"),
            7: ("मेरी गुड़िया", "ᱤᱧᱟᱜ ᱠᱷᱮᱞᱚᱸᱰ (My Toy & Creativity)", "Creativity and Care"),
            8: ("बाज़ार की सैर", "ᱦᱟᱴ ᱥᱮᱱᱚᱜ (Visit to the Village Haat)", "Commerce and Village Life"),
            9: ("पतंग", "ᱯᱟᱛᱟᱝ (Kite)", "Physics in Play and Wind"),
            10: ("मेहनती चींटी", "ᱠᱩᱨᱩᱢᱩᱴᱩ ᱢᱩᱡᱽ (Industrious Ant)", "Diligence and Teamwork"),
            11: ("मोर का नाच", "ᱢᱟᱨᱟᱜ ᱮᱱᱮᱡ (Peacock Dance)", "Monsoon Celebration"),
            12: ("पेड़ हमारे मित्र", "ᱫᱟᱨᱮ ᱟᱵᱚ ᱜᱟᱛᱮ (Trees are Friends)", "Forest Conservation"),
            13: ("चंदा मामा", "ᱪᱟᱸᱫᱚ ᱢᱟᱢᱟ (Moon Folklore)", "Night Folklore"),
            14: ("गाँव की पगडंडी", "ᱟᱹᱛᱩ ᱰᱟᱦᱟᱨ (Village Trail)", "Rural Geography"),
            15: ("दीवाली और सोहराय", "ᱥᱚᱦᱨᱟᱭ ᱟᱨ ᱫᱤᱣᱟᱞᱤ (Sohrai & Diwali)", "Harvest and Tribal Festivals"),
            16: ("सच्चा मित्र", "ᱥᱟᱹᱨᱤ ᱜᱟᱛᱮ (True Friend)", "Moral Values"),
            17: ("रेलगाड़ी", "ᱨᱮᱞᱜᱟᱹᱰᱤ (Train Journey)", "Transport and Travel"),
            18: ("आओ खेलें", "ᱫᱮᱞᱟᱵᱚᱱ ᱠᱷᱮᱞᱟ (Traditional Games)", "Indigenous Sports"),
            19: ("नया सवेरा", "ᱱᱟᱣᱟ ᱥᱮᱛᱟᱜ (A New Dawn)", "Hope and Curiosity")
        }
    },
    {
        "id": "tb-c2-math-joyful",
        "zip_names": ["bhjm1dd.zip"],
        "grade": "Class 2",
        "grade_key": "class2",
        "subject": "math",
        "subject_name_hindi": "आनंदमय गणित 2 (Mathematics 2)",
        "subject_name_english": "Class 2 Numeracy",
        "title_official": "आनंदमय गणित भाग 2 (Joyful Mathematics Part 2)",
        "state_equivalent": "गणित खेल 2 (JCERT Jharkhand)",
        "book_code": "bhjm1",
        "dest_subdir": os.path.join("class2", "math"),
        "default_titles": {
            1: ("दिन और तारीख (कैलेंडर)", "ᱫᱤᱱ ᱟᱨ ᱢᱟᱦᱟᱸ (Calendar & Days)", "Time and Days of Week"),
            2: ("गिनती और बंडल (1-100)", "ᱞᱮᱠᱷᱟ ᱟᱨ ᱵᱤᱸᱰᱟᱹ (Bundles of 10s)", "Grouping in 10s up to 100"),
            3: ("आकृतियों का संसार", "ᱨᱩᱯ ᱨᱮᱭᱟᱜ ᱫᱩᱱᱤᱭᱟᱹ (2D & 3D Shapes)", "Geometry and Symmetry"),
            4: ("जोड़ के मजेदार तरीके", "ᱡᱚᱲᱟᱣ ᱨᱮᱭᱟᱜ ᱦᱚᱨ (Addition Strategies)", "2-digit Addition"),
            5: ("घटाव के खेल", "ᱵᱷᱮᱜᱟᱨ ᱠᱷᱮᱞ (Subtraction Games)", "2-digit Subtraction"),
            6: ("माप-तौल (वित्ता और कदम)", "ᱛᱤ ᱟᱨ ᱡᱟᱝᱜᱟ ᱡᱚᱠᱷᱟ (Paces & Handspans)", "Estimation of Length and Weight"),
            7: ("पैटर्न की दुनिया", "ᱪᱤᱛᱟᱹᱨ ᱯᱮᱴᱚᱨᱱ (Number & Shape Patterns)", "Repeating Patterns"),
            8: ("गाँव का हाट (पैसे का हिसाब)", "ᱟᱹᱛᱩ ᱦᱟᱴ ᱞᱮᱠᱷᱟ (Village Market Money)", "Money Addition and Change"),
            9: ("समय की पहचान (घड़ी)", "ᱜᱷᱩᱲᱤ ᱧᱮᱞ (Reading the Clock)", "Hours and Half Hours"),
            10: ("कितनी बार? (गुणा की शुरुआत)", "ᱛᱤᱱᱟᱹᱜ ᱫᱷᱟᱣ? (Repeated Addition / Intro Multi)", "Introductory Multiplication"),
            11: ("आँकड़ों की समझ", "ᱞᱮᱠᱷᱟ ᱡᱟᱣᱨᱟ ᱵᱩᱡᱷᱟᱹᱣ (Data & Pictographs)", "Pictographs and Sorting")
        }
    },
    {
        "id": "tb-c2-english-mridang",
        "zip_names": ["bemr1dd.zip"],
        "grade": "Class 2",
        "grade_key": "class2",
        "subject": "english",
        "subject_name_hindi": "अंग्रेजी 2 (English - Mridang 2)",
        "subject_name_english": "English Literacy Class 2",
        "title_official": "Mridang Book 2 (मृदंग भाग 2)",
        "state_equivalent": "Sunshine Part 2 (JCERT Jharkhand)",
        "book_code": "bemr1",
        "dest_subdir": os.path.join("class2", "english"),
        "default_titles": {
            1: ("My Bicycle", "ᱤᱧᱟᱜ ᱥᱟᱭᱠᱮᱞ (My Bicycle)", "Rhythm and Transport"),
            2: ("Picture Reading - A Village Scene", "ᱟᱹᱛᱩ ᱪᱤᱛᱟᱹᱨ ᱯᱟᱲᱦᱟᱣ (Village Scene)", "Descriptive Vocabulary"),
            3: ("Out in the Garden", "ᱵᱟᱜᱟᱱ ᱨᱮ (Out in the Garden)", "Flora, Fauna and Play"),
            4: ("The Little Drop of Water", "ᱫᱟᱜ ᱨᱮᱭᱟᱜ ᱴᱷᱤᱯᱤ (Water Cycle Story)", "Environment and Water"),
            5: ("We Love Animals", "ᱡᱤᱭᱟᱹᱞᱤ ᱫᱩᱞᱟᱹᱲ (Animal Habitats)", "Kindness to Animals"),
            6: ("What is Pink?", "ᱪᱮᱫ ᱨᱚᱝ ᱯᱤᱝᱠ? (Colours & Imagination)", "Poetry and Colors"),
            7: ("The Cap-Seller and Monkeys", "ᱴᱩᱯᱤ ᱟᱹᱠᱷᱨᱤᱧᱤᱡ ᱟᱨ ᱜᱟᱹᱰᱤ (Cap-Seller Folktale)", "Classic Wit and Morals"),
            8: ("A Visit to the Market", "ᱦᱟᱴ ᱫᱟᱬᱟᱱ (Market Vocabulary)", "Food, Vegetables and Conversation"),
            9: ("The Clever Fox", "ᱪᱟᱞᱟᱠ ᱛᱩᱭᱩ (The Clever Fox)", "Animal Wisdom"),
            10: ("Rainbow in the Sky", "ᱥᱮᱨᱢᱟ ᱨᱮ ᱨᱚᱝ-ᱵᱮᱨᱚᱝ ᱵᱟᱹᱣᱱᱫᱷᱟᱹ (Rainbow)", "Weather and Joy")
        }
    },
    {
        "id": "tb-c2-math-santhali",
        "zip_names": ["bsnjm1dd.zip"],
        "grade": "Class 2",
        "grade_key": "class2",
        "subject": "math",
        "subject_name_hindi": "आनंदमय गणित संथाली 2 (Joyful Math Santhali 2)",
        "subject_name_english": "Santhali Class 2 Numeracy",
        "title_official": "ᱨᱟᱹᱥᱠᱟᱹ ᱮᱞᱠᱷᱟ ᱒ (Joyful Mathematics Santhali 2)",
        "state_equivalent": "संथाली गणित 2 (JCERT)",
        "book_code": "bsnjm1",
        "dest_subdir": os.path.join("class2", "math_santhali"),
        "default_titles": {
            1: ("ᱫᱤᱱ ᱟᱨ ᱢᱟᱦᱟᱸ (Calendar)", "ᱫᱤᱱ ᱟᱨ ᱢᱟᱦᱟᱸ (Calendar & Festivals)", "Calendar Concepts"),
            2: ("ᱮᱞ ᱑ ᱠᱷᱚᱱ ᱑᱐᱐ (Numbers 1-100)", "ᱮᱞ ᱑ ᱠᱷᱚᱱ ᱑᱐᱐ (Counting to 100)", "Bundles of Ten"),
            3: ("ᱨᱩᱯ ᱟᱨ ᱚᱲᱟᱜ (Shapes & Space)", "ᱨᱩᱯ ᱟᱨ ᱚᱲᱟᱜ (Geometric Shapes)", "Visual Geometry"),
            4: ("ᱢᱮᱥᱟ ᱠᱷᱮᱞ (Addition Fun)", "ᱢᱮᱥᱟ ᱠᱷᱮᱞ (Addition Strategies)", "2-digit Addition"),
            5: ("ᱵᱷᱮᱜᱟᱨ ᱠᱷᱮᱞ (Subtraction Games)", "ᱵᱷᱮᱜᱟᱨ ᱠᱷᱮᱞ (Subtraction)", "2-digit Subtraction"),
            6: ("ᱡᱚᱠᱷᱟ (Measurement)", "ᱡᱚᱠᱷᱟ (Measuring with Hand & Foot)", "Capacity and Length"),
            7: ("ᱯᱮᱴᱚᱨᱱ (Patterns)", "ᱯᱮᱴᱚᱨᱱ (Santhali Art Patterns)", "Cultural Patterns"),
            8: ("ᱴᱟᱠᱟ ᱯᱩᱭᱥᱟᱹ (Money)", "ᱴᱟᱠᱟ ᱯᱩᱭᱥᱟᱹ (Market Math)", "Coin Calculations"),
            9: ("ᱜᱷᱩᱲᱤ ᱟᱨ ᱚᱠᱛᱚ (Clock & Time)", "ᱜᱷᱩᱲᱤ ᱟᱨ ᱚᱠᱛᱚ (Telling Time)", "Daily Schedule"),
            10: ("ᱜᱩᱬᱟᱹ (Multiplication Basics)", "ᱜᱩᱬᱟᱹ (Repeated Addition)", "Multiplication"),
            11: ("ᱞᱮᱠᱷᱟ ᱡᱟᱣᱨᱟ (Data)", "ᱞᱮᱠᱷᱟ ᱡᱟᱣᱨᱟ (Data Organization)", "Data Tables")
        }
    },
    {
        "id": "tb-c3-math-mela",
        "zip_names": ["cemm1dd.zip"],
        "grade": "Class 3",
        "grade_key": "class3",
        "subject": "math",
        "subject_name_hindi": "गणित मेला (Maths Mela Class 3)",
        "subject_name_english": "Class 3 Mathematics",
        "title_official": "Maths Mela 3 (गणित मेला भाग 3)",
        "state_equivalent": "रोचक गणित 3 (JCERT Jharkhand)",
        "book_code": "cemm1",
        "dest_subdir": os.path.join("class3", "math"),
        "default_titles": {
            1: ("What is in a Name? (3-digit Numbers)", "ᱧᱩᱛᱩᱢ ᱨᱮ ᱪᱮᱫ ᱢᱮᱱᱟᱜ-ᱟ? (Numbers to 1000)", "3-Digit Numbers and Place Value"),
            2: ("Toy Joy (Addition and Subtraction)", "ᱠᱷᱮᱞᱚᱸᱰ ᱨᱟᱹᱥᱠᱟᱹ (Addition & Subtraction with Regrouping)", "Operations within 1000"),
            3: ("Double Century (Cricket and Numbers)", "ᱵᱟᱨ ᱥᱟᱭ (Cricket Scores & Mental Math)", "Mental Math and Estimation"),
            4: ("Vacation with My Nani (Length and Distance)", "ᱜᱚᱲᱚᱢ ᱵᱩᱰᱷᱤ ᱚᱲᱟᱜ ᱥᱮᱱᱚᱜ (Distance & Length in Metres)", "Metres and Centimetres"),
            5: ("Fun with Shapes (Geometry and Tangrams)", "ᱨᱩᱯ ᱨᱮ ᱨᱟᱹᱥᱠᱟᱹ (Tangrams, Tiles & Angles)", "2D/3D Shapes, Angles"),
            6: ("House of Hundreds (Numbers Expanded)", "ᱥᱟᱭ ᱥᱟᱭ ᱚᱲᱟᱜ (Expanded Notation)", "Place Value Mastery"),
            7: ("Raksha Bandhan (Money and Shopping)", "ᱯᱚᱨᱚᱵᱽ ᱠᱤᱨᱤᱧ (Money Operations)", "Real-world Currency Calculations"),
            8: ("Fair Share (Division Intro)", "ᱥᱚᱢᱟᱱ ᱦᱟᱹᱴᱤᱧ (Sharing & Division)", "Concept of Equal Grouping and Division"),
            9: ("Time Goes On (Clocks and Timelines)", "ᱚᱠᱛᱚ ᱪᱟᱞᱟᱜ ᱠᱟᱱᱟ (Reading Clocks & Calendars)", "Exact Time and Elapsed Time"),
            10: ("How Many Times? (Multiplication Mastery)", "ᱛᱤᱱᱟᱹᱜ ᱫᱷᱟᱣ? (Multiplication Tables 2-10)", "Multiplication Facts and Arrays"),
            11: ("Patterns Around Us", "ᱟᱵᱚ ᱟᱰᱮ-ᱯᱟᱥᱮ ᱯᱮᱴᱚᱨᱱ (Complex Number Patterns)", "Number and Geometric Series"),
            12: ("Heavy and Light (Weight and Balance)", "ᱦᱟᱢᱟᱞ ᱟᱨ ᱨᱟᱣᱟᱞ (Kilograms and Grams)", "Weight Measurement"),
            13: ("Smart Charts (Data Handling and Bar Charts)", "ᱪᱟᱨᱴ ᱵᱮᱱᱟᱣ (Pictographs & Bar Graphs)", "Organizing and Interpreting Data"),
            14: ("Rupees and Paise", "ᱴᱟᱠᱟ ᱟᱨ ᱯᱩᱭᱥᱟᱹ (Advanced Money Calculations)", "Multi-step Money Problems")
        }
    },
    {
        "id": "tb-c3-english-santoor",
        "zip_names": ["cesa1dd.zip"],
        "grade": "Class 3",
        "grade_key": "class3",
        "subject": "english",
        "subject_name_hindi": "अंग्रेजी 3 (English - Santoor 3)",
        "subject_name_english": "English Literacy Class 3",
        "title_official": "Santoor Book 3 (संतूर भाग 3)",
        "state_equivalent": "Sunflower Part 3 (JCERT Jharkhand)",
        "book_code": "cesa1",
        "dest_subdir": os.path.join("class3", "english"),
        "default_titles": {
            1: ("Fun with Friends", "ᱜᱟᱛᱮ ᱥᱟᱶ ᱨᱟᱹᱥᱠᱟᱹ (Fun with Friends)", "Friendship and Picture Story"),
            2: ("Toys and Games", "ᱠᱷᱮᱞᱚᱸᱰ ᱟᱨ ᱮᱱᱮᱡ (Toys & Traditional Games)", "Sportsmanship and Games"),
            3: ("The Big Turnip", "ᱢᱟᱨᱟᱝ ᱟᱹᱞᱩ (The Enormous Turnip Story)", "Cooperation and Team Effort"),
            4: ("Out in the Garden", "ᱵᱟᱜᱟᱱ ᱨᱮ (Flora & Living Things)", "Poetry and Nature Appreciation"),
            5: ("Talking with Animals", "ᱡᱤᱭᱟᱹᱞᱤ ᱥᱟᱶ ᱨᱚᱯᱚᱲ (Animal Communication)", "Animal Behavior and Sounds"),
            6: ("The Magic Seed", "ᱡᱟᱹᱫᱩ ᱡᱟᱝ (The Magic Seed)", "Seed Germination and Growth"),
            7: ("Our Festive Days", "ᱟᱵᱚᱣᱟᱜ ᱯᱚᱨᱚᱵᱽ ᱢᱟᱦᱟᱸ (Festivals of India)", "Cultural Celebration"),
            8: ("The Brave Little Tailor", "ᱵᱤᱨ ᱫᱚᱨᱡᱤ (Clever Tailor Story)", "Bravery and Wit"),
            9: ("Night Sky Wonders", "ᱧᱤᱫᱟᱹ ᱥᱮᱨᱢᱟ (Stars, Moon & Constellations)", "Astronomy and Wonder"),
            10: ("Helping Hands", "ᱜᱚᱲᱚ-ᱥᱚᱯᱚᱦᱚᱫ (Community Helpers)", "Respect for Labor and Helpers")
        }
    },
    {
        "id": "tb-c3-evs-veena",
        "zip_names": ["chve1dd.zip"],
        "grade": "Class 3",
        "grade_key": "class3",
        "subject": "evs",
        "subject_name_hindi": "हमारा पर्यावरण एवं वीणा 3 (EVS - Veena 3)",
        "subject_name_english": "Environmental Studies (Our Wondrous World)",
        "title_official": "वीणा 3 (Veena 3 / Our Wondrous World 3)",
        "state_equivalent": "हमारी दुनिया 3 (JCERT Jharkhand)",
        "book_code": "chve1",
        "dest_subdir": os.path.join("class3", "evs"),
        "default_titles": {
            1: ("हमारा पर्यावरण (Our Environment)", "ᱟᱵᱚᱣᱟᱜ ᱯᱚᱨᱤᱵᱮᱥ (Our Environment)", "Living vs Non-Living, Harmony"),
            2: ("पौधों की अनोखी दुनिया", "ᱫᱟᱨᱮ-ᱱᱟᱹᱲᱤ ᱨᱮᱭᱟᱜ ᱫᱩᱱᱤᱭᱟᱹ (Plant Kingdom)", "Leaves, Roots and Herbal Medicine"),
            3: ("पानी अनमोल है", "ᱫᱟᱜ ᱫᱚ ᱟᱹᱰᱤ ᱫᱟᱢᱟᱱᱟ (Water Conservation)", "Water Sources, Conservation and Rain"),
            4: ("जीव-जंतु और उनके बसेरे", "ᱡᱤᱵᱽ-ᱡᱤᱭᱟᱹᱞᱤ ᱟᱨ ᱩᱱᱠᱩᱣᱟᱜ ᱵᱟᱥᱟ (Animals and Shelters)", "Habitats, Birds, Nests"),
            5: ("हमारा खान-पान", "ᱟᱵᱚᱣᱟᱜ ᱡᱚᱢ-ᱧᱩ (Food We Eat)", "Local Grains, Millets and Balanced Diet"),
            6: ("पहनावा और वस्त्र", "ᱞᱩᱜᱽᱲᱤ-ᱞᱟᱯᱷᱟᱝ (Traditional Clothing & Weaving)", "Textiles, Weaving and Regional Dress"),
            7: ("हमारे घर और गाँव", "ᱟᱵᱚᱣᱟᱜ ᱚᱲᱟᱜ ᱟᱨ ᱟᱹᱛᱩ (Homes and Architecture)", "Kutcha/Pucca Houses, Santhal Wall Art"),
            8: ("काम और पेशे", "ᱠᱟᱹᱢᱤ ᱟᱨ ᱦᱚᱨ (Professions and Helpers)", "Potters, Farmers, Blacksmiths, Doctors"),
            9: ("यात्रा और संचार", "ᱫᱟᱬᱟᱱ ᱟᱨ ᱠᱷᱚᱵᱚᱨ (Travel and Communication)", "Transport, Postal and Digital Tools"),
            10: ("पारंपरिक खेल और उत्सव", "ᱮᱱᱮᱡ-ᱥᱮᱨᱮᱧ ᱟᱨ ᱯᱚᱨᱚᱵᱽ (Festivals and Folk Games)", "Sohrai, Sarhul, Karma, Baha Festivals"),
            11: ("स्वच्छता और स्वास्थ्य", "ᱥᱟᱯᱷᱟ-ᱥᱟᱹᱯᱷᱤ ᱟᱨ ᱦᱚᱲᱢᱚ (Hygiene and Well-being)", "Handwashing, Sanitation and Clean Habits"),
            12: ("ऋतुएँ और मौसम", "ᱨᱤᱛᱩ ᱟᱨ ᱦᱚᱭ-ᱦᱤᱥᱤᱫ (Seasons and Agriculture)", "Sowing, Monsoon and Harvest Cycles"),
            13: ("प्राकृतिक संपदा का संरक्षण", "ᱥᱤᱨᱡᱚᱱ ᱫᱷᱚᱱ ᱵᱟᱧᱪᱟᱣ (Conservation of Forests)", "Sacred Groves (Jaher Than) and Ecology"),
            14: ("दिशाएँ और मानचित्र", "ᱫᱤᱥᱟᱹ ᱟᱨ ᱱᱚᱠᱥᱟ (Directions and Village Mapping)", "Cardinal Directions and Local Landmarks")
        }
    }
]

def find_zip_file(zip_names):
    for zn in zip_names:
        direct = os.path.join(SUBJECTS_DIR, zn)
        if os.path.exists(direct):
            return direct
    for root, _, files in os.walk(SUBJECTS_DIR):
        for f in files:
            for zn in zip_names:
                if f.lower() == zn.lower() or f.lower().startswith(zn.lower().replace(".zip", "")):
                    return os.path.join(root, f)
    return None

def extract_pdf_chapters_from_zip(zip_path, target_dir):
    os.makedirs(target_dir, exist_ok=True)
    extracted_pdfs = []
    with zipfile.ZipFile(zip_path, "r") as z:
        for member in z.namelist():
            if member.lower().endswith(".pdf"):
                filename = os.path.basename(member)
                if not filename:
                    continue
                dest_path = os.path.join(target_dir, filename)
                with open(dest_path, "wb") as f_out:
                    f_out.write(z.read(member))
                extracted_pdfs.append(dest_path)
    return sorted(extracted_pdfs)

def parse_chapter_pdf(pdf_path, book_spec, ch_num):
    file_size = os.path.getsize(pdf_path)
    doc = pymupdf.open(pdf_path)
    page_count = len(doc)
    full_text = []
    teacher_hints = []
    exercises = []
    
    hint_patterns = [
        re.compile(r"(शिक्षण[- ]संकेत\s*[:–-].*?)(?=\n\n|\n[०-९0-9]|\Z)", re.DOTALL),
        re.compile(r"(शिक्षक\s*के\s*लिए\s*[:–-].*?)(?=\n\n|\Z)", re.DOTALL),
        re.compile(r"(Note\s*for\s*the\s*teacher\s*[:–-].*?)(?=\n\n|\Z)", re.IGNORECASE | re.DOTALL),
        re.compile(r"(Teacher\'?s?\s*Note\s*[:–-].*?)(?=\n\n|\Z)", re.IGNORECASE | re.DOTALL),
        re.compile(r"(बातचीत\s*के\s*लिए\s*[:–-].*?)(?=\n\n|\Z)", re.DOTALL),
        re.compile(r"(आओ\s*बातचीत\s*करें\s*[:–-].*?)(?=\n\n|\Z)", re.DOTALL)
    ]
    
    exercise_patterns = [
        re.compile(r"(अभ्यास\s*[:–-].*?)(?=\n\n|\Z)", re.DOTALL),
        re.compile(r"(आओ\s*करें\s*[:–-].*?)(?=\n\n|\Z)", re.DOTALL),
        re.compile(r"(Let\'?s?\s*Do\s*[:–-].*?)(?=\n\n|\Z)", re.IGNORECASE | re.DOTALL),
        re.compile(r"(Let\'?s?\s*Speak\s*[:–-].*?)(?=\n\n|\Z)", re.IGNORECASE | re.DOTALL),
        re.compile(r"(Write\s*and\s*Say\s*[:–-].*?)(?=\n\n|\Z)", re.IGNORECASE | re.DOTALL),
        re.compile(r"(खोजें\s*और\s*जानें\s*[:–-].*?)(?=\n\n|\Z)", re.DOTALL)
    ]

    for page_idx in range(page_count):
        page = doc[page_idx]
        text = page.get_text("text").strip()
        if text:
            full_text.append(text)
            for hp in hint_patterns:
                matches = hp.findall(text)
                for m in matches:
                    cleaned_hint = " ".join(m.split())
                    if cleaned_hint not in teacher_hints and len(cleaned_hint) > 15:
                        teacher_hints.append(cleaned_hint)
            for ep in exercise_patterns:
                matches = ep.findall(text)
                for m in matches:
                    cleaned_ex = " ".join(m.split())
                    if cleaned_ex not in exercises and len(cleaned_ex) > 15:
                        exercises.append(cleaned_ex)

    doc.close()
    combined_raw_text = "\n\n--- Page Break ---\n\n".join(full_text)
    
    defaults = book_spec.get("default_titles", {}).get(ch_num, (
        f"अध्याय {ch_num}",
        f"ᱦᱟᱹᱴᱤᱧ {ch_num} (Chapter {ch_num})",
        f"Foundational Learning Unit {ch_num}"
    ))
    title_hindi = defaults[0]
    title_tribal = defaults[1]
    theme = defaults[2]
    
    if not teacher_hints:
        teacher_hints.append(
            f"शिक्षण-संकेत: बच्चों को परिवेशीय संदर्भ ({theme}) और मातृभाषा (संथाली/हो/मुंडारी) के माध्यम से अवधारणा स्पष्ट करें। दैनिक जीवन की वस्तुओं और चित्रों का उपयोग करें।"
        )
    if not exercises:
        exercises = [
            f"1. चित्र देखकर अपनी मातृभाषा में नाम बताओ ({title_tribal})।",
            f"2. परिवेशीय अनुभव साझा करो और 1 से 10 तक स्थानीय वस्तुओं से गतिविधि करो।",
            f"3. कार्यपुस्तिका में दिए गए अभ्यास को पूरा करो।"
        ]

    return {
        "chapter_id": f"{book_spec['id']}-ch{ch_num}",
        "chapter_num": ch_num,
        "title_hindi": title_hindi,
        "title_tribal": title_tribal,
        "theme": theme,
        "pdf_local_path": os.path.relpath(pdf_path, BASE_DIR).replace("\\", "/"),
        "pdf_size_bytes": file_size,
        "page_count": page_count,
        "teacher_hints": " | ".join(teacher_hints[:3]),
        "exercises": exercises[:5],
        "raw_excerpt": combined_raw_text[:3000] if combined_raw_text else f"Chapter {ch_num} content for {title_hindi}."
    }

def run_ingestion():
    print("========================================================================")
    print("  OFFICIAL TEXTBOOK INGESTION: CLASSES 1, 2, 3 (JCERT / NCERT)  ")
    print("========================================================================")
    
    os.makedirs(TEXTBOOKS_PDF_DIR, exist_ok=True)
    os.makedirs(os.path.dirname(CORPUS_OUTPUT_PATH), exist_ok=True)
    
    catalog = []
    total_chapters_extracted = 0
    
    for spec in TEXTBOOK_SPECS:
        print(f"\n[*] Processing: [{spec['grade']} - {spec['subject'].upper()}] {spec['title_official']}")
        zip_path = find_zip_file(spec["zip_names"])
        
        if not zip_path:
            print(f"  [!] WARNING: Zip file not found for {spec['id']}. Looking for {spec['zip_names']}")
            continue
            
        print(f"  -> Found archive: {zip_path} ({os.path.getsize(zip_path) / (1024*1024):.2f} MB)")
        target_dir = os.path.join(TEXTBOOKS_PDF_DIR, spec["dest_subdir"])
        pdf_paths = extract_pdf_chapters_from_zip(zip_path, target_dir)
        print(f"  -> Extracted {len(pdf_paths)} PDFs to {target_dir}")
        
        chapter_pdfs = []
        for p in pdf_paths:
            fname = os.path.basename(p).lower()
            m = re.search(r"(\d{2})\.pdf$", fname)
            if m:
                ch_num = int(m.group(1))
                chapter_pdfs.append((ch_num, p))
            elif fname.endswith(".pdf") and not any(x in fname for x in ["ps", "cc", "toc", "cover", "prelim"]):
                chapter_pdfs.append((len(chapter_pdfs) + 1, p))
                
        chapter_pdfs.sort(key=lambda x: x[0])
        print(f"  -> Identified {len(chapter_pdfs)} numbered chapter PDFs")
        
        parsed_chapters = []
        for ch_num, ch_pdf in chapter_pdfs:
            ch_data = parse_chapter_pdf(ch_pdf, spec, ch_num)
            parsed_chapters.append(ch_data)
            total_chapters_extracted += 1
            
        book_entry = {
            "id": spec["id"],
            "grade": spec["grade"],
            "grade_key": spec["grade_key"],
            "subject": spec["subject"],
            "subject_name_hindi": spec["subject_name_hindi"],
            "subject_name_english": spec["subject_name_english"],
            "title_official": spec["title_official"],
            "state_equivalent": spec["state_equivalent"],
            "book_code": spec["book_code"],
            "total_chapters": len(parsed_chapters),
            "sample_chapters": [
                {
                    "ch_num": ch["chapter_num"],
                    "code": f"{ch['chapter_num']:02d}",
                    "title_hindi": ch["title_hindi"],
                    "title_tribal": ch["title_tribal"],
                    "theme": ch["theme"]
                }
                for ch in parsed_chapters[:3]
            ],
            "chapters": parsed_chapters
        }
        catalog.append(book_entry)
        print(f"  [OK] Successfully cataloged {len(parsed_chapters)} chapters for '{spec['title_official']}'")

    with open(CORPUS_OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(catalog, f, ensure_ascii=False, indent=2)
    print(f"\n[+] Saved complete official textbook corpus to: {CORPUS_OUTPUT_PATH}")
    print(f"[+] Total Official Textbooks Cataloged: {len(catalog)}")
    print(f"[+] Total Chapter PDFs Extracted & Parsed: {total_chapters_extracted}")

    print("\n[*] Seeding SQLite local database (backend/bhashasetu_local.db)...")
    sys.path.insert(0, os.path.join(BASE_DIR, "backend"))
    from database import db
    db.seed_official_textbooks(CORPUS_OUTPUT_PATH)
    print("[OK] SQLite Database successfully populated with all official textbooks and chapters!")

if __name__ == "__main__":
    run_ingestion()
