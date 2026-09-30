import { VaultItem, TribalLanguage } from '../types';

export const INITIAL_VAULT_ITEMS: VaultItem[] = [
  {
    id: 'vault-sat-001',
    language: 'santhali',
    script: 'ol_chiki',
    term_or_phrase: 'ᱥᱟᱨᱡᱚᱢ ᱫᱟᱨᱮ (Sarjom Dare)',
    native_script_text: 'ᱥᱟᱨᱡᱚᱢ ᱫᱟᱨᱮ',
    devanagari_text: 'सारजोम दारे',
    meaning_hindi: 'सखुआ / साल का पवित्र वृक्ष',
    meaning_english: 'Sacred Sal Tree (Shorea robusta)',
    domain: 'nature',
    audio_phonemes: 'sarjom dare',
    cultural_notes: 'बाहा (Baha) परब में इसकी टहनियों और फूलों की पूजा की जाती है।',
    contributor_name: 'पं. चरण मुर्मू (Village Elder)',
    contributor_role: 'Village Elder',
    region: 'Dumka (Santhal Pargana)',
    sovereignty_tier: 'PUBLIC',
    validation_status: 'COMMUNITY_VALIDATED',
    validator_notes: 'सांस्कृतिक रूप से पूर्णतः प्रामाणिक और स्वीकृत।',
    created_at: 1725600000,
    updated_at: 1725700000
  },
  {
    id: 'vault-sat-002',
    language: 'santhali',
    script: 'ol_chiki',
    term_or_phrase: 'ᱛᱩᱢᱫᱟᱜ ᱟᱨ ᱴᱟᱢᱟᱠ (Tumdang & Tamak)',
    native_script_text: 'ᱛᱩᱢᱫᱟᱜ ᱟᱨ ᱴᱟᱢᱟᱠ',
    devanagari_text: 'तुमदाः आर टामाक',
    meaning_hindi: 'पारंपरिक मांदर और नगाड़ा',
    meaning_english: 'Traditional Santhal Drums',
    domain: 'folklore',
    audio_phonemes: 'tumdang ar tamak',
    cultural_notes: 'संथाली लोकनृत्य और संगीत का अभिन्न अंग।',
    contributor_name: 'सोमनाथ सोरेन (Linguist)',
    contributor_role: 'Linguist',
    region: 'Rairangpur / East Singhbhum',
    sovereignty_tier: 'PUBLIC',
    validation_status: 'COMMUNITY_VALIDATED',
    validator_notes: 'उच्चारण और वर्तनी दोनों सही हैं।',
    created_at: 1725605000,
    updated_at: 1725705000
  },
  {
    id: 'vault-mun-001',
    language: 'mundari',
    script: 'devanagari',
    term_or_phrase: 'धरती आबा (Dharti Aaba)',
    native_script_text: 'ᱫᱷᱟᱨᱛᱤ ᱟᱵᱟ',
    devanagari_text: 'धरती आबा / बिरसा मुंडा',
    meaning_hindi: 'धरती के पिता (भगवान बिरसा मुंडा)',
    meaning_english: 'Father of the Earth (Bhagwan Birsa Munda)',
    domain: 'folklore',
    audio_phonemes: 'dharti aaba',
    cultural_notes: 'मुंडा समुदाय के पूज्य स्वतंत्रता सेनानी एवं महानायक।',
    contributor_name: 'सुशील मुंडा (Native Teacher)',
    contributor_role: 'Native Teacher',
    region: 'Khunti',
    sovereignty_tier: 'PUBLIC',
    validation_status: 'COMMUNITY_VALIDATED',
    validator_notes: 'ऐतिहासिक रूप से अत्यंत महत्वपूर्ण।',
    created_at: 1725610000,
    updated_at: 1725710000
  },
  {
    id: 'vault-hoc-001',
    language: 'ho',
    script: 'warang_chiti',
    term_or_phrase: 'ᱢᱟᱜᱮ ᱯᱚᱨᱚᱵᱽ (Mage Parab)',
    native_script_text: '𑢹𑣉𑣉 ᱢᱟᱜᱮ ᱯᱚᱨᱚᱵᱽ',
    devanagari_text: 'मागे परोब',
    meaning_hindi: 'हो समुदाय का प्रमुख कृषि नववर्ष उत्सव',
    meaning_english: 'Mage Festival (Harvest & New Year of Ho community)',
    domain: 'folklore',
    audio_phonemes: 'mage parab',
    cultural_notes: 'माघ माह में मनाया जाने वाला सबसे बड़ा उत्सव।',
    contributor_name: 'लको बोदरा फाउंडेशन (Cultural Society)',
    contributor_role: 'Linguist',
    region: 'West Singhbhum (Chaibasa)',
    sovereignty_tier: 'EDUCATIONAL',
    validation_status: 'COMMUNITY_VALIDATED',
    validator_notes: 'वारंग क्षिति लिपि में अनुमोदित।',
    created_at: 1725620000,
    updated_at: 1725720000
  },
  {
    id: 'vault-kru-001',
    language: 'kurukh',
    script: 'devanagari',
    term_or_phrase: 'धुमकुड़िया (Dhumkuria)',
    native_script_text: 'धुमकुड़िया',
    devanagari_text: 'धुमकुड़िया (पारंपरिक युवा शिक्षण केंद्र)',
    meaning_hindi: 'उरांव समुदाय का पारंपरिक युवा शिक्षण एवं संस्कार केंद्र',
    meaning_english: 'Traditional Youth Learning & Cultural Academy of Kurukh community',
    domain: 'education',
    audio_phonemes: 'dhumkuria',
    cultural_notes: 'जहाँ युवा सामाजिक, नैतिक और सामुदायिक जीवन कौशल सीखते हैं।',
    contributor_name: 'डॉ. शांति उरांव (Tribal Researcher)',
    contributor_role: 'Linguist',
    region: 'Gumla',
    sovereignty_tier: 'EDUCATIONAL',
    validation_status: 'COMMUNITY_VALIDATED',
    validator_notes: 'ऐतिहासिक शिक्षण परंपरा का उत्कृष्ट उदाहरण।',
    created_at: 1725630000,
    updated_at: 1725730000
  }
];

class CommunityVaultService {
  private items: VaultItem[] = [...INITIAL_VAULT_ITEMS];

  getItems(language?: string, tier?: string, status?: string): VaultItem[] {
    let filtered = this.items;
    if (language && language !== 'all') {
      filtered = filtered.filter(i => i.language.toLowerCase() === language.toLowerCase());
    }
    if (tier && tier !== 'all') {
      filtered = filtered.filter(i => i.sovereignty_tier === tier);
    }
    if (status && status !== 'all') {
      filtered = filtered.filter(i => i.validation_status === status);
    }
    return filtered;
  }

  addContribution(data: Partial<VaultItem>): VaultItem {
    const newItem: VaultItem = {
      id: `vault-${(data.language || 'sat').slice(0, 3)}-${Date.now()}`,
      language: (data.language as TribalLanguage) || 'santhali',
      script: data.script || 'ol_chiki',
      term_or_phrase: data.term_or_phrase || '',
      native_script_text: data.native_script_text || data.term_or_phrase || '',
      devanagari_text: data.devanagari_text || '',
      meaning_hindi: data.meaning_hindi || '',
      meaning_english: data.meaning_english || '',
      domain: data.domain || 'general',
      audio_phonemes: data.audio_phonemes || '',
      cultural_notes: data.cultural_notes || '',
      contributor_name: data.contributor_name || 'Community Member',
      contributor_role: data.contributor_role || 'Native Speaker',
      region: data.region || 'Jharkhand',
      sovereignty_tier: data.sovereignty_tier || 'PUBLIC',
      validation_status: 'TEACHER_REVIEWED',
      validator_notes: 'प्रारंभिक समीक्षा हेतु समुदाय सत्यापनकर्ता के पास प्रस्तुत।',
      created_at: Date.now(),
      updated_at: Date.now()
    };
    this.items.unshift(newItem);
    return newItem;
  }

  updateStatus(id: string, newStatus: 'COMMUNITY_VALIDATED' | 'REJECTED', notes: string, validator: string): VaultItem | null {
    const item = this.items.find(i => i.id === id);
    if (item) {
      item.validation_status = newStatus;
      item.validator_notes = `${notes} (सत्यापित कर्ता: ${validator})`;
      item.updated_at = Date.now();
      return item;
    }
    return null;
  }
}

export const communityVaultService = new CommunityVaultService();
