"""
BHASHASETU: Local AI Abstraction Layer & Model Router (v1.2.0-Trilingual)
Features:
- Decouples application logic from specific AI models / cloud APIs
- Trilingual output generation: Tribal Mother Tongue (Native Script + Devanagari), Hindi, English
- Standalone offline providers for LLM, Translation, Speech, OCR, and Embeddings
- Explicit capability states: SUPPORTED, LIMITED, NOT_AVAILABLE
- Zero external internet requirement for core educational reasoning
"""

from typing import Dict, List, Optional, Any
from abc import ABC, abstractmethod
import time
import os
import re

from language_packs import language_pack_manager
from tribal_nlp_engine import nlp_engine
from ai_engine import ai_engine

class CapabilityState:
    SUPPORTED = "SUPPORTED"
    LIMITED = "LIMITED"
    NOT_AVAILABLE = "NOT_AVAILABLE"

class AIProvider(ABC):
    @abstractmethod
    def generate_lesson_plan(self, topic: str, grade: str, subject: str, target_lang: str, script: str, context: str) -> Dict[str, Any]:
        pass

    @abstractmethod
    def ask_child_tutor(self, question: str, grade: str, language: str, script: str) -> Dict[str, Any]:
        pass

    @abstractmethod
    def generate_remediation(self, student_id: str, student_name: str, competency: str, score_pct: float, grade: str, language: str) -> Dict[str, Any]:
        pass

    @abstractmethod
    def analyze_external_content(self, content_text: str, filename: Optional[str], grade: str, subject: str, target_lang: str, script: str, context: str) -> Dict[str, Any]:
        pass

class TranslationProvider(ABC):
    @abstractmethod
    def translate(self, text: str, source_lang: str, target_lang: str) -> Dict[str, Any]:
        pass

class SpeechProvider(ABC):
    @abstractmethod
    def get_tts_status(self, language: str) -> str:
        pass

    @abstractmethod
    def get_asr_status(self, language: str) -> str:
        pass

class OCRProvider(ABC):
    @abstractmethod
    def extract_text(self, image_bytes: bytes) -> Dict[str, Any]:
        pass

class LocalDeterministicAIProvider(AIProvider):
    def generate_lesson_plan(self, topic: str, grade: str, subject: str, target_lang: str, script: str = "default", context: str = "village_nature") -> Dict[str, Any]:
        return ai_engine.generate_pedagogical_lesson(topic, grade, subject, target_lang, script, context)

    def ask_child_tutor(self, question: str, grade: str, language: str, script: str = "default") -> Dict[str, Any]:
        return ai_engine.answer_student_tutor(question, grade, language, script)

    def generate_remediation(self, student_id: str, student_name: str, competency: str, score_pct: float, grade: str, language: str) -> Dict[str, Any]:
        return ai_engine.generate_targeted_remediation(student_id, student_name, competency, score_pct, grade, language)

    def analyze_external_content(self, content_text: str, filename: Optional[str] = None, grade: str = "Class 1", subject: str = "भाषा एवं साक्षरता (Language & Literacy)", target_lang: str = "santhali", script: str = "default", context: str = "village_nature") -> Dict[str, Any]:
        return ai_engine.analyze_and_generate_from_external_content(content_text, filename, grade, subject, target_lang, script, context)

    def generate_subject_assessment(self, grade: str, subject: str, chapter_id: Optional[str] = None, language: str = "santhali", script: str = "default") -> Dict[str, Any]:
        return ai_engine.generate_subject_assessment(grade, subject, chapter_id, language, script)

    def generate_subject_worksheets(self, grade: str, subject: str, chapter_id: Optional[str] = None, language: str = "santhali", script: str = "default") -> Dict[str, Any]:
        return ai_engine.generate_subject_worksheets(grade, subject, chapter_id, language, script)


class LocalTranslationProvider(TranslationProvider):
    def translate(self, text: str, source_lang: str, target_lang: str) -> Dict[str, Any]:
        return nlp_engine.translate(text, source_lang, target_lang)

class LocalSpeechProvider(SpeechProvider):
    def get_tts_status(self, language: str) -> str:
        return CapabilityState.SUPPORTED

    def get_asr_status(self, language: str) -> str:
        return CapabilityState.SUPPORTED

class LocalOCRProvider(OCRProvider):
    def extract_text(self, image_bytes: bytes) -> Dict[str, Any]:
        return {
            "status": CapabilityState.LIMITED,
            "extracted_text": "",
            "confidence": 0.0,
            "notice": "Offline OCR Adapter is ready for local Tesseract/EasyOCR models."
        }

class AIModelRouter:
    def __init__(self):
        self.ai_provider: AIProvider = LocalDeterministicAIProvider()
        self.translation_provider: TranslationProvider = LocalTranslationProvider()
        self.speech_provider: SpeechProvider = LocalSpeechProvider()
        self.ocr_provider: OCRProvider = LocalOCRProvider()

    def generate_lesson_plan(self, topic: str, grade: str, subject: str, target_lang: str, script: str = "default", context: str = "village_nature") -> Dict[str, Any]:
        return self.ai_provider.generate_lesson_plan(topic, grade, subject, target_lang, script, context)

    def analyze_and_generate_from_external_content(self, content: str, grade: str = "Class 1", subject: str = "भाषा एवं साक्षरता (Language & Literacy)", target_language: str = "santhali", target_script: str = "default", context_theme: str = "village_nature", filename: Optional[str] = None) -> Any:
        return self.ai_provider.analyze_external_content(content, filename, grade, subject, target_language, target_script, context_theme)

    def analyze_external_content(self, content_text: str, filename: Optional[str] = None, grade: str = "Class 1", subject: str = "भाषा एवं साक्षरता (Language & Literacy)", target_lang: str = "santhali", script: str = "default", context: str = "village_nature") -> Any:
        return self.ai_provider.analyze_external_content(content_text, filename, grade, subject, target_lang, script, context)

    def generate_subject_assessment(self, grade: str, subject: str, chapter_id: Optional[str] = None, language: str = "santhali", script: str = "default") -> Dict[str, Any]:
        return self.ai_provider.generate_subject_assessment(grade, subject, chapter_id, language, script)

    def generate_subject_worksheets(self, grade: str, subject: str, chapter_id: Optional[str] = None, language: str = "santhali", script: str = "default") -> Dict[str, Any]:
        return self.ai_provider.generate_subject_worksheets(grade, subject, chapter_id, language, script)

    def get_system_capabilities(self) -> Dict[str, Any]:
        return {
            "deployment_mode": os.getenv("DEPLOYMENT_MODE", "offline"),
            "llm_provider": "Local Trilingual Pedagogical RAG (Zero Cloud)",
            "translation_provider": "Local 450+ Rule & Phonetic Matrix",
            "speech_tts": CapabilityState.SUPPORTED,
            "speech_asr": CapabilityState.SUPPORTED,
            "ocr_status": CapabilityState.LIMITED,
            "languages_supported": ["santhali", "mundari", "ho", "kurukh", "kharia"]
        }

ai_router = AIModelRouter()

