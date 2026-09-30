import React, { useState, useEffect } from 'react';
import { TribalLanguage, VaultItem } from '../types';
import { apiService } from '../services/apiService';
import { languagePackService } from '../services/languagePackService';
import { speechService } from '../services/speechService';
import { useLanguage } from '../context/LanguageContext';
import { 
  Shield, 
  CheckCircle2, 
  XCircle, 
  Plus, 
  Volume2, 
  Lock, 
  Globe, 
  BookOpen, 
  Filter, 
  Sparkles,
  Search,
  Users,
  Award
} from 'lucide-react';

interface CommunityVaultProps {
  selectedLanguage: TribalLanguage;
  isOfflineMode: boolean;
}

export const CommunityVault: React.FC<CommunityVaultProps> = ({
  selectedLanguage,
  isOfflineMode
}) => {
  const { t, uiLanguage } = useLanguage();
  const [items, setItems] = useState<VaultItem[]>([]);
  const [activeFilterTier, setActiveFilterTier] = useState<string>('all');
  const [activeFilterStatus, setActiveFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // Contribution modal state
  const [isContributeModalOpen, setIsContributeModalOpen] = useState<boolean>(false);
  const [newTerm, setNewTerm] = useState<string>('');
  const [newNativeScript, setNewNativeScript] = useState<string>('');
  const [newDevanagari, setNewDevanagari] = useState<string>('');
  const [newHindi, setNewHindi] = useState<string>('');
  const [newEnglish, setNewEnglish] = useState<string>('');
  const [newDomain, setNewDomain] = useState<string>('nature');
  const [newNotes, setNewNotes] = useState<string>('');
  const [newTier, setNewTier] = useState<'PUBLIC' | 'EDUCATIONAL' | 'COMMUNITY_ONLY' | 'RESTRICTED'>('PUBLIC');
  const [contributorName, setContributorName] = useState<string>('सुनीता सोरेन (भाषा शिक्षक)');

  // Review modal state
  const [reviewItem, setReviewItem] = useState<VaultItem | null>(null);
  const [reviewNotes, setReviewNotes] = useState<string>('सांस्कृतिक रूप से पूर्णतः प्रामाणिक और व्याकरण सम्मत।');

  const pack = languagePackService.getPack(selectedLanguage);

  useEffect(() => {
    loadItems();
  }, [selectedLanguage, activeFilterTier, activeFilterStatus]);

  const loadItems = async () => {
    const data = await apiService.fetchCommunityVault(
      selectedLanguage,
      activeFilterTier !== 'all' ? activeFilterTier : undefined,
      activeFilterStatus !== 'all' ? activeFilterStatus : undefined
    );
    setItems(data);
  };

  const handleContribute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTerm.trim() || !newHindi.trim()) return;

    await apiService.contributeToVault({
      language: selectedLanguage,
      script: pack.defaultScript,
      term_or_phrase: newTerm,
      native_script_text: newNativeScript || newTerm,
      devanagari_text: newDevanagari || newTerm,
      meaning_hindi: newHindi,
      meaning_english: newEnglish,
      domain: newDomain,
      cultural_notes: newNotes,
      sovereignty_tier: newTier,
      contributor_name: contributorName,
      contributor_role: 'Native Teacher',
      region: pack.primaryRegions[0] || 'Jharkhand'
    });

    setIsContributeModalOpen(false);
    // Reset form
    setNewTerm('');
    setNewNativeScript('');
    setNewDevanagari('');
    setNewHindi('');
    setNewEnglish('');
    setNewNotes('');
    loadItems();
  };

  const handleReview = async (status: 'COMMUNITY_VALIDATED' | 'REJECTED') => {
    if (!reviewItem) return;

    await apiService.reviewVaultItem(
      reviewItem.id,
      status,
      reviewNotes,
      'पं. चरण मुर्मू (वरिष्ठ समुदाय सत्यापनकर्ता)'
    );

    setReviewItem(null);
    loadItems();
  };

  const [playingVaultId, setPlayingVaultId] = useState<string | null>(null);

  const handleSpeak = (text: string, id: string) => {
    if (playingVaultId === id && speechService.isSpeakingNow()) {
      speechService.stopSpeaking();
      setPlayingVaultId(null);
      return;
    }
    setPlayingVaultId(id);
    speechService.toggleSpeak(
      text,
      'hindi',
      () => setPlayingVaultId(id),
      () => setPlayingVaultId(null)
    );
  };

  const filteredItems = items.filter(item => 
    item.term_or_phrase.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.meaning_hindi.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.devanagari_text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-gov-900 via-forest-900 to-emerald-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-2 border-emerald-500/30">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-200 text-xs font-black border border-emerald-400/30">
            <Shield className="w-4 h-4 text-amber-300" />
            <span>जनजातीय भाषा संरक्षण एवं संप्रभुता तिजोरी (Community Language Vault)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            मातृभाषा संरक्षण एवं समुदाय सत्यापन पोर्टल
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-emerald-100/90 max-w-2xl">
            जनजातीय मौखिक धरोहर, पारंपरिक ज्ञान और सांस्कृतिक शब्दावली का नैतिक संरक्षण। सभी शब्द समुदाय के वयोवृद्धों और भाषाविदों द्वारा सत्यापित हैं।
          </p>
        </div>

        <button
          onClick={() => setIsContributeModalOpen(true)}
          className="px-5 py-3 bg-emerald-500 hover:bg-emerald-600 text-gov-950 font-black rounded-2xl text-xs flex items-center gap-2 shadow-lg transition-transform active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>नया शब्द / मुहावरा जोड़ें (Contribute)</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border-2 border-gov-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gov-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="शब्द, अर्थ या संदर्भ खोजें..."
            className="w-full pl-10 pr-4 py-2 bg-gov-50 border border-gov-300 rounded-xl text-xs font-bold text-gov-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Sovereignty & Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-bold text-gov-500 mr-1">संप्रभुता स्तर:</span>
          {['all', 'PUBLIC', 'EDUCATIONAL', 'COMMUNITY_ONLY'].map((tier) => (
            <button
              key={tier}
              onClick={() => setActiveFilterTier(tier)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-colors ${
                activeFilterTier === tier
                  ? 'bg-gov-900 text-white'
                  : 'bg-gov-100 text-gov-700 hover:bg-gov-200'
              }`}
            >
              {tier === 'all' ? 'सभी (All)' : tier}
            </button>
          ))}
        </div>
      </div>

      {/* Vault Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const isValidated = item.validation_status === 'COMMUNITY_VALIDATED';
          const isPending = item.validation_status === 'TEACHER_REVIEWED' || item.validation_status === 'AI_GENERATED';

          return (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 border-2 border-gov-200 hover:border-emerald-300 shadow-sm transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Status & Tier Header */}
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                    isValidated ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {isValidated ? '✓ समुदाय सत्यापित' : '⏳ समीक्षाधीन (Pending)'}
                  </span>

                  <span className="flex items-center gap-1 text-[11px] font-bold text-gov-500">
                    <Lock className="w-3 h-3 text-gov-400" />
                    <span>{item.sovereignty_tier}</span>
                  </span>
                </div>

                {/* Primary Term in Native Script */}
                <div>
                  <div className="text-xl font-black text-gov-900 font-olchiki">
                    {item.native_script_text}
                  </div>
                  <div className="text-xs font-bold text-emerald-800 mt-0.5">
                    उच्चारण / देवनागरी: {item.devanagari_text}
                  </div>
                </div>

                {/* Meanings */}
                <div className="space-y-1 bg-gov-50 p-3 rounded-2xl border border-gov-100">
                  <div className="text-xs font-bold text-gov-800">
                    🇮🇳 हिन्दी अर्थ: <span className="font-semibold">{item.meaning_hindi}</span>
                  </div>
                  <div className="text-xs font-semibold text-gov-600">
                    🌐 English: {item.meaning_english}
                  </div>
                </div>

                {/* Cultural Context Note */}
                {item.cultural_notes && (
                  <p className="text-xs font-semibold text-gov-600 bg-amber-50/50 p-2.5 rounded-xl border border-amber-200/50 leading-relaxed">
                    🌿 <span className="font-bold">सांस्कृतिक महत्व:</span> {item.cultural_notes}
                  </p>
                )}
              </div>

              {/* Card Footer: Contributor & Audio Actions */}
              <div className="pt-3 border-t border-gov-100 flex items-center justify-between text-xs">
                <div className="text-[11px] text-gov-500 font-semibold truncate pr-2">
                  योगदानकर्ता: {item.contributor_name} ({item.region})
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleSpeak(item.devanagari_text || item.meaning_hindi, item.id)}
                    className={`p-2 rounded-xl transition-all cursor-pointer active:scale-95 ${
                      playingVaultId === item.id
                        ? 'bg-emerald-600 text-white ring-2 ring-emerald-300 animate-pulse'
                        : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800'
                    }`}
                    title="1-Tap Play/Stop Audio"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>

                  {isPending && (
                    <button
                      onClick={() => setReviewItem(item)}
                      className="px-2.5 py-1 bg-forest-700 hover:bg-forest-800 text-white rounded-lg text-[11px] font-black transition-colors cursor-pointer active:scale-95"
                    >
                      समीक्षा करें
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Contribution Modal */}
      {isContributeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl border-2 border-gov-200 max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-black text-gov-900 flex items-center gap-2">
              <Plus className="w-5 h-5 text-emerald-600" />
              <span>नया जनजातीय शब्द / अभिव्यक्ति जोड़ें</span>
            </h3>

            <form onSubmit={handleContribute} className="space-y-3 text-xs">
              <div>
                <label className="font-black text-gov-700 block mb-1">मूल शब्द / मुहावरा (Native Script):</label>
                <input
                  type="text"
                  value={newTerm}
                  onChange={(e) => setNewTerm(e.target.value)}
                  placeholder="उदा: ᱥᱟᱨᱡᱚᱢ ᱵᱟᱦᱟ / सारजोम बाहा"
                  required
                  className="w-full px-3 py-2 bg-gov-50 border border-gov-300 rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="font-black text-gov-700 block mb-1">देवनागरी उच्चारण लिप्यंतरण:</label>
                <input
                  type="text"
                  value={newDevanagari}
                  onChange={(e) => setNewDevanagari(e.target.value)}
                  placeholder="उदा: सारजोम बाहा"
                  className="w-full px-3 py-2 bg-gov-50 border border-gov-300 rounded-xl font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-black text-gov-700 block mb-1">हिन्दी अर्थ:</label>
                  <input
                    type="text"
                    value={newHindi}
                    onChange={(e) => setNewHindi(e.target.value)}
                    placeholder="उदा: सखुआ का फूल"
                    required
                    className="w-full px-3 py-2 bg-gov-50 border border-gov-300 rounded-xl font-bold"
                  />
                </div>
                <div>
                  <label className="font-black text-gov-700 block mb-1">English Meaning:</label>
                  <input
                    type="text"
                    value={newEnglish}
                    onChange={(e) => setNewEnglish(e.target.value)}
                    placeholder="e.g. Sal Tree Flower"
                    className="w-full px-3 py-2 bg-gov-50 border border-gov-300 rounded-xl font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="font-black text-gov-700 block mb-1">सांस्कृतिक विवरण एवं परंपरा:</label>
                <textarea
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="इस शब्द का पारंपरिक महत्व या लोककथा में उपयोग..."
                  rows={2}
                  className="w-full px-3 py-2 bg-gov-50 border border-gov-300 rounded-xl font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-black text-gov-700 block mb-1">संप्रभुता स्तर (Tier):</label>
                  <select
                    value={newTier}
                    onChange={(e) => setNewTier(e.target.value as any)}
                    className="w-full px-3 py-2 bg-gov-50 border border-gov-300 rounded-xl font-bold"
                  >
                    <option value="PUBLIC">PUBLIC (सार्वजनिक)</option>
                    <option value="EDUCATIONAL">EDUCATIONAL (केवल शिक्षा हेतु)</option>
                    <option value="COMMUNITY_ONLY">COMMUNITY_ONLY (सामुदायिक)</option>
                  </select>
                </div>
                <div>
                  <label className="font-black text-gov-700 block mb-1">योगदानकर्ता का नाम:</label>
                  <input
                    type="text"
                    value={contributorName}
                    onChange={(e) => setContributorName(e.target.value)}
                    className="w-full px-3 py-2 bg-gov-50 border border-gov-300 rounded-xl font-bold"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-gov-100">
                <button
                  type="button"
                  onClick={() => setIsContributeModalOpen(false)}
                  className="px-4 py-2 bg-gov-100 hover:bg-gov-200 text-gov-800 rounded-xl font-black"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black shadow-md"
                >
                  तिजोरी में जमा करें
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Validator Review Modal */}
      {reviewItem && (
        <div 
          onClick={() => setReviewItem(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl shadow-2xl border-2 border-gov-200 max-w-md w-full p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-gov-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-forest-700" />
                <span>सत्यापनकर्ता समीक्षा (Linguistic Review)</span>
              </h3>
              <button
                onClick={() => setReviewItem(null)}
                className="p-1 rounded-xl text-gov-400 hover:text-gov-700 hover:bg-gov-100 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="bg-gov-50 p-4 rounded-2xl space-y-2 text-xs font-bold">
              <div className="text-base font-black text-gov-900">{reviewItem.term_or_phrase}</div>
              <div>हिन्दी अर्थ: {reviewItem.meaning_hindi}</div>
              <div>योगदानकर्ता: {reviewItem.contributor_name}</div>
            </div>

            <div>
              <label className="text-xs font-black text-gov-700 block mb-1">सत्यापन टिप्पणी:</label>
              <textarea
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-gov-50 border border-gov-300 rounded-xl text-xs font-bold"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setReviewItem(null)}
                className="px-3.5 py-2 bg-gov-100 hover:bg-gov-200 text-gov-800 rounded-xl text-xs font-black cursor-pointer"
              >
                रद्द करें (Cancel)
              </button>
              <button
                onClick={() => handleReview('REJECTED')}
                className="px-4 py-2 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-xl text-xs font-black cursor-pointer active:scale-95"
              >
                अस्वीकार करें
              </button>
              <button
                onClick={() => handleReview('COMMUNITY_VALIDATED')}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-md cursor-pointer active:scale-95"
              >
                स्वीकृत करें (Approve)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
