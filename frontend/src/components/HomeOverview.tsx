import React from 'react';
import { TribalLanguage } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { 
  Radio, 
  BookOpen, 
  Award, 
  FileSpreadsheet, 
  Trophy, 
  Compass, 
  HardDriveDownload, 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  School,
  Languages,
  Users,
  Cpu,
  Sparkles,
  Volume2,
  Shield,
  Building2
} from 'lucide-react';

interface HomeOverviewProps {
  setActiveTab: (tab: string) => void;
  selectedLanguage: TribalLanguage;
  setSelectedLanguage: (lang: TribalLanguage) => void;
}

export const HomeOverview: React.FC<HomeOverviewProps> = ({
  setActiveTab,
  selectedLanguage,
  setSelectedLanguage
}) => {
  const { t, uiLanguage, targetTribalLanguage, setTargetTribalLanguage, availableLanguages } = useLanguage();

  const languageNames: Record<TribalLanguage, { name: string; native: string; script: string }> = {
    santhali: { name: 'Santhali', native: 'ᱥᱟᱱᱛᱟᱲᱤ', script: 'Ol Chiki & Devanagari' },
    mundari: { name: 'Mundari', native: 'ᱢᱩᱱᱰᱟᱨᱤ', script: 'Mundari Bani & Devanagari' },
    ho: { name: 'Ho', native: 'ᱦᱳ', script: 'Warang Chiti & Devanagari' },
    kurukh: { name: 'Kurukh (Oraon)', native: 'कुड़ुख़', script: 'Tolong Siki & Devanagari' },
    kharia: { name: 'Kharia', native: 'खड़िया', script: 'Devanagari' }
  };

  const capabilities = [
    {
      id: 'voice-bridge',
      title: t('nav.voice_bridge'),
      badge: 'Sub-1.2s Real-Time',
      badgeColor: 'bg-forest-100 text-forest-800 border-forest-200',
      icon: Radio,
      desc: t('voice.desc') || 'Push-to-talk Walkie-Talkie translating teacher\'s Hindi speech into native tribal audio & authentic Ol Chiki script in real-time.',
      action: t('home.cta_student') || 'Launch Voice Bridge',
      popular: true
    },
    {
      id: 'curriculum',
      title: t('nav.curriculum'),
      badge: 'State Textbooks',
      badgeColor: 'bg-gov-100 text-gov-800 border-gov-200',
      icon: BookOpen,
      desc: t('curriculum.desc') || 'Official Jharkhand primary textbooks (\'भाषा अंजलि\', \'गणित ज्ञान\') with side-by-side bilingual instructional scripts and audio folklore.',
      action: t('home.cta_curriculum') || 'Explore Curriculum'
    },
    {
      id: 'assessments',
      title: t('nav.assessments'),
      badge: 'Printable A4 Cards',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      icon: Award,
      desc: t('assessments.desc') || 'Formative & summative competency evaluations with oral speech reading assessment and 1-Click Printable Student Diagnostic Report Cards.',
      action: t('home.cta_assessment') || 'Run Assessments'
    },
    {
      id: 'worksheets',
      title: t('nav.worksheets'),
      badge: 'A4 Activity PDFs',
      badgeColor: 'bg-gov-100 text-gov-800 border-gov-200',
      icon: FileSpreadsheet,
      desc: t('worksheets.desc') || 'High-contrast, printer-friendly matching, counting, and tracing worksheets formatted for low-cost village school printers.',
      action: t('home.cta_worksheets') || 'Generate Worksheets'
    },
    {
      id: 'student',
      title: t('nav.student_studio'),
      badge: 'Interactive Learning',
      badgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
      icon: Sparkles,
      desc: t('student.tutor_desc') || 'Child-friendly visual learning studio with audio narration, step-by-step chapter stories, and safe Socratic AI Tutor in tribal languages.',
      action: t('home.cta_student') || 'Open Student Studio'
    },
    {
      id: 'teacher',
      title: t('teacher.studio_title'),
      badge: 'Pedagogy Guide',
      badgeColor: 'bg-gov-100 text-gov-800 border-gov-200',
      icon: Compass,
      desc: t('teacher.studio_desc') || 'Essential pedagogical handbook for non-native Hindi teachers covering indigenous seasonal festivals, customs, and classroom Do\'s & Don\'ts.',
      action: t('home.cta_teacher') || 'Open Teacher Studio'
    },
    {
      id: 'practice',
      title: t('nav.practice') || 'बोलो और जीतो (Phonics Arena)',
      badge: 'AI Speech Scoring',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      icon: Trophy,
      desc: 'Gamified tribal speech & phonemic pronunciation arena with live microphone evaluation, 1-3 stars, celebratory confetti, and streaks.',
      action: 'Launch Phonics Arena'
    },
    {
      id: 'vault',
      title: t('nav.vault') || 'समुदाय भाषा कोष (Community Vault)',
      badge: 'Data Sovereignty',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      icon: Shield,
      desc: 'Indigenous tribal knowledge crowdsourcing, elder curation, ethical privacy tiers (Public, Educational, Restricted), and pronunciation archives.',
      action: 'Explore Community Vault'
    },
    {
      id: 'analytics',
      title: t('nav.admin') || 'प्रशासनिक FLN कंसोल (Admin Console)',
      badge: 'District Telemetry',
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
      icon: Building2,
      desc: 'Real-time telemetry and FLN learning outcomes across Jharkhand pilot districts (Dumka, Khunti, West Singhbhum, Gumla) with zero cloud dependency.',
      action: 'Open Admin Console'
    }
  ];

  return (
    <div className="space-y-10 py-6">
      {/* 1. HERO BANNER: Institutional Authority & Clear Purpose Statement */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gov-900 rounded-2xl p-6 sm:p-10 text-white shadow-md border border-gov-800 relative overflow-hidden">
          {/* Subtle Decorative Background Accent */}
          <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-forest-600/10 blur-3xl pointer-events-none"></div>
          
          <div className="max-w-3xl space-y-4 relative z-10">
            {/* Government Initiative Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-gov-800 border border-gov-700 text-gov-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Government of Jharkhand • MTB-MLE BhashaSetu Initiative</span>
            </div>

            {/* Headline */}
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              {t('home.hero_title')}
            </h1>

            {/* Subtitle / Plain-Language Purpose */}
            <p className="text-sm sm:text-base text-gov-300 leading-relaxed">
              {t('home.hero_subtitle')}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setActiveTab('voice-bridge')}
                className="px-5 py-3 rounded-xl bg-forest-600 hover:bg-forest-500 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-white"
              >
                <Radio className="w-4 h-4" />
                <span>{t('home.cta_student')}</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </button>

              <button
                onClick={() => setActiveTab('curriculum')}
                className="px-4 py-3 rounded-xl bg-gov-800 hover:bg-gov-700 text-gov-100 text-xs sm:text-sm font-semibold border border-gov-700 transition-all"
              >
                <span>{t('home.cta_curriculum')}</span>
              </button>
            </div>
          </div>

          {/* Key Metric Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gov-800 text-xs">
            <div>
              <div className="text-gov-400 font-medium">{t('home.metric_languages')}</div>
              <div className="text-base font-bold text-white mt-0.5">Santhali, Mundari, Ho</div>
            </div>
            <div>
              <div className="text-gov-400 font-medium">Classroom Latency</div>
              <div className="text-base font-bold text-emerald-400 mt-0.5">&lt; 1.2 Seconds</div>
            </div>
            <div>
              <div className="text-gov-400 font-medium">{t('home.badge_offline')}</div>
              <div className="text-base font-bold text-white mt-0.5">100% Offline Edge</div>
            </div>
            <div>
              <div className="text-gov-400 font-medium">{t('home.metric_fln')}</div>
              <div className="text-base font-bold text-white mt-0.5">JCERT & NIPUN Bharat</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THREE-STEP PROCESS: "How It Works" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-6">
          <h2 className="text-lg sm:text-xl font-extrabold text-gov-900">
            {uiLanguage === 'hindi' ? 'कक्षा में भाषासेतु कैसे काम करता है' :
             uiLanguage === 'santhali' ? 'ᱠᱞᱟᱥ ᱨᱮ ᱵᱷᱟᱥᱟᱥᱮᱛᱩ ᱪᱮᱫ ᱞᱮᱠᱟ ᱠᱟᱹᱢᱤᱭᱟ' :
             uiLanguage === 'ho' ? 'ᱠᱞᱟᱥ ᱨᱮ ᱵᱷᱟᱥᱟᱥᱮᱛᱩ ᱪᱤᱞᱠᱮ ᱠᱟᱹᱢᱤᱭᱟ' :
             uiLanguage === 'mundari' ? 'ᱠᱞᱟᱥ ᱨᱮ ᱵᱷᱟᱥᱟᱥᱮᱛᱩ ᱪᱤᱞᱠᱮ ᱠᱟᱹᱢᱤᱭᱟ' :
             'How BhashaSetu Works in the Classroom'}
          </h2>
          <p className="text-xs sm:text-sm text-gov-600 mt-1">
            {uiLanguage === 'hindi' ? 'गैर-जनजातीय शिक्षकों के लिए शून्य कठिनाई के साथ निर्मित 3-चरणीय सेतु।' :
             uiLanguage === 'santhali' ? 'ᱱᱚᱣᱟ ᱫᱚ ᱢᱟᱪᱮᱛ ᱠᱚ ᱞᱟᱹᱜᱤᱫ ᱟᱞᱜᱟ ᱓ ᱦᱟᱹᱴᱤᱧ ᱥᱮᱛᱩ ᱠᱟᱱᱟ᱾' :
             'A seamless 3-step bridge designed for non-tribal teachers with zero learning curve.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-xl border border-gov-200 shadow-sm relative">
            <div className="w-8 h-8 rounded-lg bg-gov-100 text-gov-900 font-extrabold flex items-center justify-center text-sm mb-3">
              1
            </div>
            <h3 className="font-bold text-sm text-gov-900 mb-1">
              {uiLanguage === 'hindi' ? 'शिक्षक हिन्दी में बोलते हैं' :
               uiLanguage === 'santhali' ? 'ᱢᱟᱪᱮᱛ ᱦᱤᱱᱫᱤ ᱛᱮ ᱨᱚᱲ ᱢᱮ' :
               uiLanguage === 'ho' ? 'ᱢᱟᱪᱮᱛ ᱦᱤᱱᱫᱤ ᱛᱮ ᱡᱚᱜᱟᱨ' :
               uiLanguage === 'mundari' ? 'ᱢᱟᱪᱮᱛ ᱦᱤᱱᱫᱤ ᱛᱮ ᱠᱟᱡᱤ' :
               'Teacher Speaks in Hindi'}
            </h3>
            <p className="text-xs text-gov-600 leading-relaxed">
              {uiLanguage === 'hindi' ? 'शिक्षक स्वाभाविक रूप से टैबलेट या फोन माइक्रोफोन में कक्षा निर्देश देते हैं।' :
               'Teacher speaks classroom instructions or questions naturally into the tablet or phone microphone.'}
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gov-200 shadow-sm relative">
            <div className="w-8 h-8 rounded-lg bg-forest-100 text-forest-900 font-extrabold flex items-center justify-center text-sm mb-3">
              2
            </div>
            <h3 className="font-bold text-sm text-gov-900 mb-1">
              {uiLanguage === 'hindi' ? 'त्वरित एज-एआई अनुवाद' :
               uiLanguage === 'santhali' ? 'ᱞᱚᱜᱚᱱ ᱮᱡᱽ-ᱮᱟᱭᱤ ᱛᱚᱨᱡᱚᱢᱟ' :
               uiLanguage === 'ho' ? 'ᱞᱚᱜᱚᱱ ᱮᱡᱽ-ᱮᱟᱭᱤ ᱛᱚᱨᱡᱚᱢᱟ' :
               uiLanguage === 'mundari' ? 'ᱞᱚᱜᱚᱱ ᱮᱡᱽ-ᱮᱟᱭᱤ ᱛᱚᱨᱡᱚᱢᱟ' :
               'Instant Edge-AI Translation'}
            </h3>
            <p className="text-xs text-gov-600 leading-relaxed">
              {uiLanguage === 'hindi' ? 'डिवाइस पर इंजन वास्तविक मातृभाषा में अनुवाद करता है: ओल चिकी (ᱚᱞ ᱪᱤᱠᱤ) एवं देवनागरी।' :
               'On-device engine translates into authentic tribal mother tongue with dual scripts: Ol Chiki (ᱚᱞ ᱪᱤᱠᱤ) & Devanagari.'}
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gov-200 shadow-sm relative">
            <div className="w-8 h-8 rounded-lg bg-terracotta-100 text-terracotta-900 font-extrabold flex items-center justify-center text-sm mb-3">
              3
            </div>
            <h3 className="font-bold text-sm text-gov-900 mb-1">
              {uiLanguage === 'hindi' ? 'बच्चे समझते और सीखते हैं' :
               uiLanguage === 'santhali' ? 'ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ ᱵᱩᱡᱷᱟᱹᱣ ᱟᱨ ᱪᱮᱫᱚᱜ' :
               uiLanguage === 'ho' ? 'ᱦᱚᱱ ᱠᱚ ᱵᱩᱡᱷᱟᱹᱣ ᱟᱨ ᱥᱮᱬᱟ' :
               uiLanguage === 'mundari' ? 'ᱦᱚᱱ ᱠᱚ ᱵᱩᱡᱷᱟᱹᱣ ᱟᱨ ᱤᱛᱩ' :
               'Children Understand & Engage'}
            </h3>
            <p className="text-xs text-gov-600 leading-relaxed">
              {uiLanguage === 'hindi' ? 'बच्चे स्पीकर से स्थानीय भाषा सुनते हैं, लिपि पढ़ते हैं और बिना भाषा बाधा के सीखते हैं।' :
               'Children hear native speech over speaker, read local script, and practice foundational literacy without language barriers.'}
            </p>
          </div>
        </div>
      </section>

      {/* 2.5 RECOMMENDED ACTIONS: "What Should I Do Next?" Command Center */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-gov-100 via-forest-50/50 to-amber-50/30 rounded-2xl border border-gov-200 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-forest-700" />
              <h2 className="text-base sm:text-lg font-black text-gov-900">
                {uiLanguage === 'hindi' ? 'आज का अनुशंसित कार्य (What to do next?)' : 'Recommended Quick Actions'}
              </h2>
            </div>
            <span className="text-xs font-bold text-gov-500 bg-white px-2.5 py-1 rounded-full border border-gov-200 shadow-2xs">
              ⚡ 1-Tap Entry
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              {
                title: uiLanguage === 'hindi' ? '14-सूत्रीय पाठ योजना बनाएं' : 'Build 14-Point Lesson Plan',
                sub: uiLanguage === 'hindi' ? 'सारंगी / गणित खेल पाठ चुनें' : 'JCERT Textbook Aligned',
                icon: '🎓',
                tab: 'teacher',
                badge: 'Teacher Prep',
                bg: 'bg-white hover:border-forest-400'
              },
              {
                title: uiLanguage === 'hindi' ? 'लाइव क्लासरूम वॉइस ट्रांसलेशन' : 'Start Live Voice Bridge',
                sub: uiLanguage === 'hindi' ? 'हिन्दी से संथाली / मुंडारी / हो' : 'Sub-1.2s Walkie-Talkie',
                icon: '📻',
                tab: 'voice-bridge',
                badge: 'Classroom',
                bg: 'bg-white hover:border-blue-400'
              },
              {
                title: uiLanguage === 'hindi' ? '11 ई-पाठ्यपुस्तकें एवं 159 अध्याय' : 'Explore 11 e-Textbooks',
                sub: uiLanguage === 'hindi' ? 'शिक्षण-संकेत एवं टीएलएम' : '159 Extracted Chapters',
                icon: '📚',
                tab: 'curriculum',
                badge: 'Curriculum',
                bg: 'bg-white hover:border-amber-400'
              },
              {
                title: uiLanguage === 'hindi' ? 'निपुण FLN दक्षता मूल्यांकन' : 'NIPUN FLN Diagnostic',
                sub: uiLanguage === 'hindi' ? 'A4 रिपोर्ट कार्ड जनरेटर' : 'Oral & MCQ Assessment',
                icon: '🏆',
                tab: 'assessments',
                badge: 'Evaluation',
                bg: 'bg-white hover:border-emerald-400'
              }
            ].map((rec, rIdx) => (
              <button
                key={rIdx}
                onClick={() => setActiveTab(rec.tab)}
                className={`p-4 rounded-xl border border-gov-200 ${rec.bg} text-left transition-all duration-150 hover:shadow-card-hover hover:-translate-y-0.5 flex flex-col justify-between group cursor-pointer`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{rec.icon}</span>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-gov-100 text-gov-700">
                      {rec.badge}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-xs sm:text-sm text-gov-900 group-hover:text-forest-700 transition-colors">
                    {rec.title}
                  </h3>
                  <p className="text-[11px] text-gov-500 font-medium mt-0.5">
                    {rec.sub}
                  </p>
                </div>
                <div className="pt-3 mt-2 border-t border-gov-100 flex items-center justify-between text-[11px] font-bold text-forest-700">
                  <span>{uiLanguage === 'hindi' ? 'शुरू करें' : 'Launch'}</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CORE MODULE LAUNCHPADS (6 Standardized Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-gov-900">
              {t('home.quick_launch')}
            </h2>
            <p className="text-xs text-gov-600">
              {uiLanguage === 'hindi' ? 'कक्षा निर्देश, पाठ्यक्रम योजना, या मूल्यांकन शुरू करने के लिए मॉड्यूल चुनें।' :
               uiLanguage === 'santhali' ? 'ᱠᱞᱟᱥ ᱪᱮᱪᱮᱫ, ᱯᱟᱲᱦᱟᱣ ᱯᱞᱟᱱ, ᱵᱤᱱᱤᱰ ᱮᱛᱚᱦᱚᱵ ᱞᱟᱹᱜᱤᱫ ᱢᱚᱰᱩᱞ ᱵᱟᱪᱷᱟᱣ ᱢᱮ᱾' :
               'Select a tool to begin classroom instruction, curriculum planning, or assessment.'}
            </p>
          </div>

          {/* Quick Language Context Switcher */}
          <div className="flex items-center gap-2 self-start sm:self-auto bg-gov-100 p-1 rounded-xl border border-gov-200">
            <span className="text-[11px] font-bold text-gov-600 px-2">{t('nav.language_select')}:</span>
            {(['santhali', 'mundari', 'ho'] as TribalLanguage[]).map(lang => (
              <button
                key={lang}
                onClick={() => {
                  setSelectedLanguage(lang);
                  setTargetTribalLanguage(lang);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedLanguage === lang
                    ? 'bg-white text-gov-900 shadow-sm font-black'
                    : 'text-gov-600 hover:text-gov-900'
                }`}
              >
                {languageNames[lang].name} ({languageNames[lang].native})
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {capabilities.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="bg-white rounded-2xl border border-gov-200 p-5 sm:p-6 shadow-sm hover:shadow-card-hover hover:border-forest-500 hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl bg-gov-100 text-gov-800 flex items-center justify-center group-hover:bg-gov-900 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-base text-gov-900 group-hover:text-forest-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gov-600 mt-1.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-gov-100 flex items-center justify-between text-xs font-black text-gov-700 group-hover:text-forest-700">
                  <span>{item.action}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. TRUST & POLICY COMPLIANCE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl border border-gov-200 p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-forest-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-gov-900">
                {uiLanguage === 'hindi' ? 'राष्ट्रीय शिक्षा नीति (NEP 2020) एवं निपुण भारत दिशानिर्देशों के अनुरूप' :
                 uiLanguage === 'santhali' ? 'ᱡᱟᱹᱛᱤᱭᱟᱹᱨᱤ ᱥᱮᱪᱮᱫ ᱱᱤᱛᱤ (NEP 2020) ᱟᱨ ᱱᱤᱯᱩᱱ ᱵᱷᱟᱨᱚᱛ ᱥᱟᱶ ᱡᱚᱲᱟᱣ' :
                 'Aligned with National Education Policy (NEP 2020) & NIPUN Bharat Guidelines'}
              </h4>
              <p className="text-xs text-gov-600 mt-0.5">
                {uiLanguage === 'hindi' ? 'मातृभाषा आधारित शिक्षण द्वारा बुनियादी साक्षरता और संख्या ज्ञान लक्ष्यों को प्राप्त करने हेतु निर्मित।' :
                 uiLanguage === 'santhali' ? 'ᱟᱭᱳ ᱟᱲᱟᱝ ᱛᱮ ᱥᱮᱪᱮᱫ ᱮᱢ ᱠᱟᱛᱮ ᱮᱛᱚᱦᱚᱵ ᱥᱮᱪᱮᱫ ᱞᱟᱦᱟᱭ ᱞᱟᱹᱜᱤᱫ ᱵᱮᱱᱟᱣ ᱟᱠᱟᱱᱟ᱾' :
                 'Designed to fulfill foundational literacy and numeracy targets through mother tongue-based instruction, ensuring no tribal child is left behind due to linguistic barriers.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-gov-800 bg-gov-50 px-3.5 py-2 rounded-xl border border-gov-200 whitespace-nowrap self-start sm:self-auto">
            <span>🔒 100% {t('home.badge_offline')}</span>
          </div>
        </div>
      </section>
    </div>
  );
};
