"""
BHASHASETU: NIPUN Bharat FLN Curriculum & Assessment Engine
Integrated with Jharkhand Council of Educational Research & Training (JCERT/SCERT) Textbooks:
- 'भाषा अंजलि' (Bhasha Anjali - Primary Language)
- 'गणित ज्ञान' (Ganit Gyaan - Foundational Numeracy)
- 'हमारा परिवेश' (Hamara Parivesh - Environmental Studies)
- 'Sunshine' (Primary English Reader)
- 'पलाश MTB-MLE' Bilingual Readers & NIPUN Assessment Exam Bank
"""

from typing import Dict, List, Optional
import uuid
import json
import os

# Load Official JCERT Government Curriculum Lessons Bank (Balvatika to Class 3, All Subjects)
def _load_curriculum_lessons() -> List[Dict]:
    json_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "curriculum_data.json")
    if os.path.exists(json_path):
        try:
            with open(json_path, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            print(f"Error loading curriculum_data.json: {e}")
    return []

GOVERNMENT_CURRICULUM = _load_curriculum_lessons()

# Official NIPUN Bharat FLN Assessments & Exams Bank
ASSESSMENT_EXAMS_BANK = [
    {
        "id": "exam-nipun-01",
        "title": "साप्ताहिक FLN दक्षता मूल्यांकन (Weekly Formative Assessment)",
        "grade": "Balvatika / Class 1",
        "exam_type": "Periodic Formative",
        "total_marks": 25,
        "time_minutes": 20,
        "competencies": [
            "ध्वनि एवं अक्षर पहचान (Phonological Awareness)",
            "मौखिक शब्दावली (Oral Vocabulary in Mother Tongue)",
            "1 से 10 तक संख्या बोध (Counting 1 to 10)"
        ],
        "questions": [
            {
                "q_id": 1,
                "type": "audio_word_identification",
                "competency": "अक्षर एवं ध्वनि पहचान (Decoding)",
                "marks": 5,
                "question_hindi": "ऑडियो सुनो: संथाली/मातृभाषा में 'पेड़' को क्या कहते हैं? सही विकल्प चुनो।",
                "question_tribal": {
                    "santhali_ol": "ᱟᱸᱡᱚᱢ ᱢᱮ: 'Tree' (ᱯᱮᱲ) ᱫᱚ ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ ᱪᱮᱫ ᱠᱚ ᱢᱮᱛᱟᱜ-ᱟ? ᱴᱷᱤᱠ ᱛᱮᱞᱟ ᱵᱟᱪᱷᱟᱣ ᱢᱮ᱾",
                    "santhali_dev": "आंजोम मे: 'पेड़' (Tree) दो सांताड़ी ते चेद को मेताग-आ? ठीक तेला बाछाव मे।",
                    "mundari": "आयुम मे: 'पेड़' (Tree) के मुंडारी ते चिनाः मेनेया? ठीक तेला बाछाव मे।",
                    "ho": "आयुम मे: 'पेड़' (Tree) के हो ते चिनाः मेनेया? ठीक तेला बाछाव मे।",
                    "kurukh": "मेना: 'पेड़' (Tree) गही कुड़ुख़ नु एन्दा बाअनार? ठीक उत्तर बिछा बा।",
                    "kharia": "अंजोम: 'पेड़' (Tree) खे खड़िया ते जेने मेनेर? ठीक तेला चुनो।"
                },
                "question_english": "Listen to the audio: What is 'Tree' called in tribal mother tongue? Choose the correct option.",
                "audio_prompt": "ᱫᱟᱨᱮ (दारे - Dare)",
                "options": [
                    {"id": "A", "text": "दारे / ᱫᱟᱨᱮ (Tree)", "is_correct": True},
                    {"id": "B", "text": "दाः / ᱫᱟᱜ (Water)", "is_correct": False},
                    {"id": "C", "text": "बाहा / ᱵᱟᱦᱟ (Flower)", "is_correct": False},
                    {"id": "D", "text": "ओड़ाः / ᱳᱲᱟᱜ (House)", "is_correct": False}
                ]
            },
            {
                "q_id": 2,
                "type": "counting_numeracy",
                "competency": "संख्या ज्ञान (Numeracy)",
                "marks": 5,
                "question_hindi": "चित्र में कितने मांदर (Madar Drums) हैं? 🥁 🥁 🥁",
                "question_tribal": {
                    "santhali_ol": "ᱪᱤᱛᱟᱹᱨ ᱨᱮ ᱛᱤᱱᱟᱹᱜ ᱜᱚᱴᱟᱝ ᱛᱩᱢᱫᱟᱜ (ᱢᱟᱸᱫᱚᱨ) ᱢᱮᱱᱟᱜ-ᱟ? 🥁 🥁 🥁",
                    "santhali_dev": "चितार रे तीनाः गोटांग तुमदाः (मांदर) मेनाः-आ? 🥁 🥁 🥁",
                    "mundari": "चोबी रे चिमिन तुमदा/दुलुंग मेनाः? 🥁 🥁 🥁",
                    "ho": "चोबी रे चिमिन दमंग मेनाः? 🥁 🥁 🥁",
                    "kurukh": "नक्शा नु एओंदा मांदर रही? 🥁 🥁 🥁",
                    "kharia": "चित्र ते अमुंग मांदर अइ? 🥁 🥁 🥁"
                },
                "question_english": "How many tribal drums (Madar) are there in the picture? 🥁 🥁 🥁",
                "audio_prompt": "ᱯᱮᱭᱟ (तीन - Three)",
                "options": [
                    {"id": "A", "text": "1 (एक / मित् / ᱢᱤᱫ)", "is_correct": False},
                    {"id": "B", "text": "2 (दो / बार / ᱵᱟᱨ)", "is_correct": False},
                    {"id": "C", "text": "3 (तीन / पे / ᱯᱮ)", "is_correct": True},
                    {"id": "D", "text": "5 (पाँच / मोड़े / ᱢᱚᱬᱮ)", "is_correct": False}
                ]
            },
            {
                "q_id": 3,
                "type": "listening_comprehension",
                "competency": "श्रवण बोध (Listening Comprehension)",
                "marks": 5,
                "question_hindi": "बाहा (सरहुल) पर्व में किस पेड़ के फूलों की पूजा की जाती है?",
                "question_tribal": {
                    "santhali_ol": "ᱵᱟᱦᱟ ᱯᱚᱨᱚᱵᱽ ᱨᱮ ᱚᱠᱟ ᱫᱟᱨᱮ ᱵᱟᱦᱟ ᱵᱚᱝᱜᱟᱭᱟ (ᱯᱩᱡᱟᱹᱭᱟ)?",
                    "santhali_dev": "बाहा परोब रे ओका दारे बाहा बोंगाया (पूजाया)?",
                    "mundari": "बाहा परोब रे ओको दारू बा पूजाया?",
                    "ho": "बाहा परोब रे ओको दारू बा पूजाया?",
                    "kurukh": "खद्दी (सरहुल) परब नु एका मन गही पूप पूजा मननर?",
                    "kharia": "जाकोर (सरहुल) परोब ते कोने दारू बा पूजा करबा?"
                },
                "question_english": "In the Baha/Sarhul festival, flowers of which sacred tree are worshipped?",
                "audio_prompt": "ᱥᱟᱨᱡᱚᱢ ᱫᱟᱨᱮ (सखुआ - Sal Tree)",
                "options": [
                    {"id": "A", "text": "सखुआ / साल (सारजोम / ᱥᱟᱨᱡᱚᱢ)", "is_correct": True},
                    {"id": "B", "text": "आम (उल / ᱩᱞ)", "is_correct": False},
                    {"id": "C", "text": "केला (काइरा / ᱠᱟᱭᱨᱟ)", "is_correct": False},
                    {"id": "D", "text": "नीम (नीम दारे / ᱱᱤᱢ ᱫᱟᱨᱮ)", "is_correct": False}
                ]
            },
            {
                "q_id": 4,
                "type": "oral_reading_fluency",
                "competency": "मौखिक पठन व उच्चारण (Oral Fluency)",
                "marks": 10,
                "question_hindi": "माइक दबाकर बोलें: 'सुप्रभात बच्चों' (संथाली में: ᱥᱟᱹᱜᱩᱱ ᱥᱮᱛᱟᱜ / सगुन सेताः)",
                "question_tribal": {
                    "santhali_ol": "ᱢᱟᱭᱤᱠ ᱚᱛᱟ ᱠᱟᱛᱮ ᱨᱚᱲ ᱢᱮ: 'ᱥᱟᱹᱜᱩᱱ ᱥᱮᱛᱟᱜ' (Good Morning)",
                    "santhali_dev": "माइक ओता काते रोड़ मे: 'सगुन सेताः' (सुप्रभात)",
                    "mundari": "माइक रोब काते जगरा मे: 'बोगि सेताः'",
                    "ho": "माइक रोब काते जगरा मे: 'बोगि सेताः'",
                    "kurukh": "माइक नडिका बा: 'दव पैरी'",
                    "kharia": "माइक तिबा बा: 'सुप्रभात'"
                },
                "question_english": "Press the microphone and speak aloud: 'Good Morning' in tribal mother tongue.",
                "target_phrase": "सगुन सेताः (Sagun Setah)",
                "target_ol": "ᱥᱟᱹᱜᱩᱱ ᱥᱮᱛᱟᱜ",
                "options": []
            }
        ]
    }
]

class CurriculumGenerator:
    def get_lessons(self, grade: Optional[str] = None, subject: Optional[str] = None) -> List[Dict]:
        lessons = GOVERNMENT_CURRICULUM
        if grade and grade.lower() != 'all':
            lessons = [l for l in lessons if grade.lower() in l.get("grade", "").lower()]
        if subject and subject.lower() != 'all':
            lessons = [l for l in lessons if subject.lower() in l.get("subject_code", "").lower() or subject.lower() in l.get("subject", "").lower()]
        return lessons

    def get_stories(self) -> List[Dict]:
        from curriculum_generator_stories import STORIES_BANK_DATA
        return STORIES_BANK_DATA

    def get_assessment_exams(self, grade: Optional[str] = None) -> List[Dict]:
        if grade:
            return [e for e in ASSESSMENT_EXAMS_BANK if grade.lower() in e["grade"].lower()]
        return ASSESSMENT_EXAMS_BANK

    def get_exam_by_id(self, exam_id: str) -> Optional[Dict]:
        for e in ASSESSMENT_EXAMS_BANK:
            if e["id"] == exam_id:
                return e
        return None

    def generate_custom_lesson(self, topic_hindi: str, grade: str, target_lang: str) -> Dict:
        """Dynamically builds an FLN pedagogical lesson plan based on teacher's topic."""
        target_lang = target_lang.lower()
        lesson_id = f"custom-{uuid.uuid4().hex[:6]}"
        
        return {
            "id": lesson_id,
            "textbook": f"पलाश विशेष पाठ योजना (Custom FLN Plan) - {grade}",
            "chapter_number": 99,
            "title": f"{topic_hindi} ({target_lang.capitalize()} Bilingual Plan)",
            "grade": grade,
            "subject": "Foundational Literacy & Numeracy (NIPUN Bharat)",
            "theme": "Local Ecology & Mother Tongue Bridge",
            "learning_outcomes": [
                f"Children learn key concepts of '{topic_hindi}' in their mother tongue ({target_lang.capitalize()})",
                "Bilingual vocabulary transition to Hindi",
                "Active classroom participation and peer dialogue"
            ],
            "duration_minutes": 40,
            "teacher_guide": f"Begin with local realia and ask questions in {target_lang.capitalize()}.",
            "steps": [
                {
                    "step_number": 1,
                    "type": "Classroom Opening & Warm-up (प्रस्तावना)",
                    "time_mins": 5,
                    "teacher_hindi": f"बच्चों, आज हम '{topic_hindi}' के बारे में बातचीत करेंगे। क्या आप तैयार हैं?",
                    "dialogue_santhali": {
                        "ol_chiki": "ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱛᱮᱦᱮᱧ ᱫᱚ ᱟᱵᱚ ᱱᱚᱣᱟ ᱵᱟᱵᱚᱛ ᱵᱚᱱ ᱨᱚᱯᱚᱲᱟ᱾ ᱥᱟᱯᱲᱟᱣ ᱢᱮᱱᱟᱜ ᱯᱮᱭᱟ?",
                        "dev": "गिदरा को, तेहेञ दो आबो नोवा बाबोत बोन रोपोड़ा। सापड़ाव मेनाः पेया?",
                        "rom": "Gidra ko, teheny do abo nowa babot bon ropora. Sapraw menah peya?"
                    },
                    "dialogue_mundari": {
                        "dev": "होन को, तिशिंग आबु नेया बाबोत बु जगरा। तइयार मेनाः पेया?",
                        "rom": "Hon ko, tishing abu neya babot bu jagara. Taiyar menah peya?"
                    },
                    "dialogue_ho": {
                        "dev": "होन को, तिशिंग आबु नेया बाबोत बु जगरा। तइयार मेनाः पेया?",
                        "rom": "Hon ko, tishing abu neya babot bu jagara. Taiyar menah peya?"
                    }
                },
                {
                    "step_number": 2,
                    "type": "Concept Exploration with Local Realia (विषय प्रवेश)",
                    "time_mins": 15,
                    "teacher_hindi": "ध्यान से सुनो और समझो। यह हमारी प्रकृति और जीवन से जुड़ा है।",
                    "dialogue_santhali": {
                        "ol_chiki": "ᱢᱚᱱ ᱞᱟᱜᱟᱣ ᱠᱟᱛᱮ ᱟᱧᱡᱚᱢ ᱢᱮ ᱟᱨ ᱵᱩᱡᱷᱟᱹᱣ ᱢᱮ᱾",
                        "dev": "मोन लागाव काते आन्जोम मे आर बुझौ मे।",
                        "rom": "Mon lagaw kate anjom me aar bujhow me."
                    },
                    "dialogue_mundari": {
                        "dev": "अयुम मे मोन लगाते आर बुझौ मे।",
                        "rom": "Ayum me mon lagate aar bujhow me."
                    },
                    "dialogue_ho": {
                        "dev": "आयुम मे बुगिन लेका आर बुझौ मे।",
                        "rom": "Ayum me bugin leka aar bujhow me."
                    }
                },
                {
                    "step_number": 3,
                    "type": "Hands-on Activity & Flashcards (गतिविधि)",
                    "time_mins": 12,
                    "teacher_hindi": "सब बच्चे मिलकर चित्र बनाएंगे और अपनी मातृभाषा में बोलेंगे।",
                    "dialogue_santhali": {
                        "ol_chiki": "ᱡᱚᱛᱚ ᱜᱤᱫᱽᱨᱟᱹ ᱢᱮᱥᱟ ᱠᱟᱛᱮ ᱪᱤᱛᱟᱹᱨ ᱵᱮᱱᱟᱣ ᱯᱮ ᱟᱨ ᱟᱯᱱᱟᱨ ᱯᱟᱹᱨᱥᱤ ᱛᱮ ᱨᱚᱲ ᱯᱮ᱾",
                        "dev": "जोतो गिदरा मेसा काते चितार बेनाव पे आर आपनार पारसी ते रोड़ पे।",
                        "rom": "Joto gidra mesa kate chitar benaw pe aar apnar parsi te ror pe."
                    },
                    "dialogue_mundari": {
                        "dev": "सोबेन होन को चोबी बई पे आर अपनर जगरा ते काजी पे।",
                        "rom": "Soben hon ko chobi bai pe aar apnar jagara te kaji pe."
                    },
                    "dialogue_ho": {
                        "dev": "सोबेन होन को चोबी बाई पे आर अपनर जगरा ते कजी पे।",
                        "rom": "Soben hon ko chobi bai pe aar apnar jagara te kaji pe."
                    }
                },
                {
                    "step_number": 4,
                    "type": "NIPUN Assessment & Feedback (मूल्यांकन व शाबाशी)",
                    "time_mins": 8,
                    "teacher_hindi": "बहुत बढ़िया! आप सब ने बहुत अच्छा सीखा।",
                    "dialogue_santhali": {
                        "ol_chiki": "ᱟᱹᱰᱤ ᱱᱟᱯᱟᱭ! ᱟᱯᱮ ᱡᱚᱛᱚ ᱦᱚᱲ ᱟᱹᱰᱤ ᱢᱚᱡᱽ ᱯᱮ ᱪᱮᱫ ᱠᱮᱫᱟ᱾",
                        "dev": "आडी नापाय! आपे जोतो होड़ आडी मोज पे चेद केदा।",
                        "rom": "Adi napay! Ape joto hor adi moj pe ched keda."
                    },
                    "dialogue_mundari": {
                        "dev": "पुरो बोगि! पे सोबेन पुरो बोगि पे इतु जना।",
                        "rom": "Puro bogi! Pe soben puro bogi pe itu jana."
                    },
                    "dialogue_ho": {
                        "dev": "पुरो बुगिन! पे सोबेन पुरो बुगिन पे इतु यना।",
                        "rom": "Puro bugin! Pe soben puro bugin pe itu yana."
                    }
                }
            ]
        }

curriculum_engine = CurriculumGenerator()
