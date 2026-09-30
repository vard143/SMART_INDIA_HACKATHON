"""
BHASHASETU: Community Language Vault & Ethical Data Governance
Preserves indigenous knowledge, safeguards cultural sovereignty, and manages human-in-the-loop review.
"""

from typing import Dict, List, Optional, Any
from pydantic import BaseModel, Field
import time
import uuid

class VaultItem(BaseModel):
    id: str
    language: str
    script: str
    term_or_phrase: str
    native_script_text: str
    devanagari_text: str
    meaning_hindi: str
    meaning_english: str
    domain: str # 'nature', 'folklore', 'agriculture', 'education', 'math'
    audio_phonemes: Optional[str] = None
    cultural_notes: Optional[str] = None
    contributor_name: str
    contributor_role: str # 'Village Elder', 'Native Teacher', 'Linguist', 'Student'
    region: str
    sovereignty_tier: str # 'PUBLIC', 'EDUCATIONAL', 'COMMUNITY_ONLY', 'RESTRICTED'
    validation_status: str # 'AI_GENERATED', 'TEACHER_REVIEWED', 'COMMUNITY_VALIDATED', 'PUBLISHED', 'REJECTED'
    validator_notes: Optional[str] = None
    created_at: int
    updated_at: int

# Initial repository of community-validated terms & oral heritage
COMMUNITY_VAULT_STORE: List[VaultItem] = [
    VaultItem(
        id="vault-sat-001",
        language="santhali",
        script="ol_chiki",
        term_or_phrase="ᱥᱟᱨᱡᱚᱢ ᱫᱟᱨᱮ (Sarjom Dare)",
        native_script_text="ᱥᱟᱨᱡᱚᱢ ᱫᱟᱨᱮ",
        devanagari_text="सारजोम दारे",
        meaning_hindi="सखुआ / साल का पवित्र वृक्ष",
        meaning_english="Sacred Sal Tree (Shorea robusta)",
        domain="nature",
        audio_phonemes="sarjom dare",
        cultural_notes="बाहा (Baha) परब में इसकी टहनियों और फूलों की पूजा की जाती है।",
        contributor_name="पं. चरण मुर्मू (Village Elder)",
        contributor_role="Village Elder",
        region="Dumka (Santhal Pargana)",
        sovereignty_tier="PUBLIC",
        validation_status="COMMUNITY_VALIDATED",
        validator_notes="सांस्कृतिक रूप से पूर्णतः प्रामाणिक और स्वीकृत।",
        created_at=1725600000,
        updated_at=1725700000
    ),
    VaultItem(
        id="vault-sat-002",
        language="santhali",
        script="ol_chiki",
        term_or_phrase="ᱛᱩᱢᱫᱟᱜ ᱟᱨ ᱴᱟᱢᱟᱠ (Tumdang & Tamak)",
        native_script_text="ᱛᱩᱢᱫᱟᱜ ᱟᱨ ᱴᱟᱢᱟᱠ",
        devanagari_text="तुमदाः आर टामाक",
        meaning_hindi="पारंपरिक मांदर और नगाड़ा",
        meaning_english="Traditional Santhal Drums",
        domain="folklore",
        audio_phonemes="tumdang ar tamak",
        cultural_notes="संथाली लोकनृत्य और संगीत का अभिन्न अंग।",
        contributor_name="सोमनाथ सोरेन (Linguist)",
        contributor_role="Linguist",
        region="Rairangpur / East Singhbhum",
        sovereignty_tier="PUBLIC",
        validation_status="COMMUNITY_VALIDATED",
        validator_notes="उच्चारण और वर्तनी दोनों सही हैं।",
        created_at=1725605000,
        updated_at=1725705000
    ),
    VaultItem(
        id="vault-mun-001",
        language="mundari",
        script="devanagari",
        term_or_phrase="धरती आबा (Dharti Aaba)",
        native_script_text="ᱫᱷᱟᱨᱛᱤ ᱟᱵᱟ",
        devanagari_text="धरती आबा / बिरसा मुंडा",
        meaning_hindi="धरती के पिता (भगवान बिरसा मुंडा)",
        meaning_english="Father of the Earth (Bhagwan Birsa Munda)",
        domain="folklore",
        audio_phonemes="dharti aaba",
        cultural_notes="मुंडा समुदाय के पूज्य स्वतंत्रता सेनानी एवं महानायक।",
        contributor_name="सुशील मुंडा (Native Teacher)",
        contributor_role="Native Teacher",
        region="Khunti",
        sovereignty_tier="PUBLIC",
        validation_status="COMMUNITY_VALIDATED",
        validator_notes="ऐतिहासिक रूप से अत्यंत महत्वपूर्ण।",
        created_at=1725610000,
        updated_at=1725710000
    ),
    VaultItem(
        id="vault-hoc-001",
        language="ho",
        script="warang_chiti",
        term_or_phrase="ᱢᱟᱜᱮ ᱯᱚᱨᱚᱵᱽ (Mage Parab)",
        native_script_text="𑢹𑣉𑣉 ᱢᱟᱜᱮ ᱯᱚᱨᱚᱵᱽ",
        devanagari_text="मागे परोब",
        meaning_hindi="हो समुदाय का प्रमुख कृषि नववर्ष उत्सव",
        meaning_english="Mage Festival (Harvest & New Year of Ho community)",
        domain="folklore",
        audio_phonemes="mage parab",
        cultural_notes="माघ माह में मनाया जाने वाला सबसे बड़ा उत्सव।",
        contributor_name="लको बोदरा फाउंडेशन (Cultural Society)",
        contributor_role="Linguist",
        region="West Singhbhum (Chaibasa)",
        sovereignty_tier="EDUCATIONAL",
        validation_status="COMMUNITY_VALIDATED",
        validator_notes="वारंग क्षिति लिपि में अनुमोदित।",
        created_at=1725620000,
        updated_at=1725720000
    ),
    VaultItem(
        id="vault-kru-001",
        language="kurukh",
        script="devanagari",
        term_or_phrase="धुमकुड़िया (Dhumkuria)",
        native_script_text="धुमकुड़िया",
        devanagari_text="धुमकुड़िया (पारंपरिक युवा शिक्षण केंद्र)",
        meaning_hindi="उरांव समुदाय का पारंपरिक युवा शिक्षण एवं संस्कार केंद्र",
        meaning_english="Traditional Youth Learning & Cultural Academy of Kurukh community",
        domain="education",
        audio_phonemes="dhumkuria",
        cultural_notes="जहाँ युवा सामाजिक, नैतिक और सामुदायिक जीवन कौशल सीखते हैं।",
        contributor_name="डॉ. शांति उरांव (Tribal Researcher)",
        contributor_role="Linguist",
        region="Gumla",
        sovereignty_tier="EDUCATIONAL",
        validation_status="COMMUNITY_VALIDATED",
        validator_notes="ऐतिहासिक शिक्षण परंपरा का उत्कृष्ट उदाहरण।",
        created_at=1725630000,
        updated_at=1725730000
    )
]

class CommunityVaultManager:
    """Handles community submissions, validator approval workflows, and audit logging."""
    
    @staticmethod
    def get_vault_items(
        language: Optional[str] = None,
        sovereignty_tier: Optional[str] = None,
        status: Optional[str] = None
    ) -> List[Dict[str, Any]]:
        items = COMMUNITY_VAULT_STORE
        if language and language != "all":
            items = [i for i in items if i.language.lower() == language.lower()]
        if sovereignty_tier and sovereignty_tier != "all":
            items = [i for i in items if i.sovereignty_tier == sovereignty_tier]
        if status and status != "all":
            items = [i for i in items if i.validation_status == status]
            
        return [i.dict() for i in items]

    @staticmethod
    def submit_contribution(data: Dict[str, Any]) -> Dict[str, Any]:
        item_id = f"vault-{data.get('language', 'tribal')[:3]}-{uuid.uuid4().hex[:6]}"
        now = int(time.time())
        
        new_item = VaultItem(
            id=item_id,
            language=data.get("language", "santhali"),
            script=data.get("script", "ol_chiki"),
            term_or_phrase=data.get("term_or_phrase", ""),
            native_script_text=data.get("native_script_text", data.get("term_or_phrase", "")),
            devanagari_text=data.get("devanagari_text", ""),
            meaning_hindi=data.get("meaning_hindi", ""),
            meaning_english=data.get("meaning_english", ""),
            domain=data.get("domain", "general"),
            audio_phonemes=data.get("audio_phonemes", ""),
            cultural_notes=data.get("cultural_notes", ""),
            contributor_name=data.get("contributor_name", "Community Contributor"),
            contributor_role=data.get("contributor_role", "Native Speaker"),
            region=data.get("region", "Jharkhand"),
            sovereignty_tier=data.get("sovereignty_tier", "PUBLIC"),
            validation_status="TEACHER_REVIEWED", # Initial status pending validator review
            validator_notes="प्रारंभिक समीक्षा हेतु समुदाय सत्यापनकर्ता के पास प्रस्तुत।",
            created_at=now,
            updated_at=now
        )
        COMMUNITY_VAULT_STORE.insert(0, new_item)
        return new_item.dict()

    @staticmethod
    def update_validation_status(
        item_id: str,
        new_status: str,
        validator_notes: str,
        validator_name: str
    ) -> Dict[str, Any]:
        for item in COMMUNITY_VAULT_STORE:
            if item.id == item_id:
                item.validation_status = new_status
                item.validator_notes = f"{validator_notes} (सत्यापित कर्ता: {validator_name})"
                item.updated_at = int(time.time())
                return item.dict()
        raise ValueError("Item not found")

community_vault_manager = CommunityVaultManager()
