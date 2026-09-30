import React from 'react';
import { TribalLanguage } from '../types';
import { 
  Compass, 
  BookOpen, 
  ShieldCheck, 
  Sun
} from 'lucide-react';

interface CulturalGuideProps {
  selectedLanguage: TribalLanguage;
}

export const CulturalGuide: React.FC<CulturalGuideProps> = ({ selectedLanguage }) => {
  const festivals = [
    {
      name: "सरहुल / बाहा परोब (Sarhul / Baha Parab)",
      tribalName: "ᱵᱟᱦᱟ ᱯᱚᱨᱚᱵᱽ (Baha)",
      season: "वसंत ऋतु (Chaitra Month)",
      desc: "The festival of nature and sal blossoms (Sarjom). Worshipping trees, sacred grove (Jaher Than / Sarna Sthal), and spring renewal.",
      classroomTip: "Engage children with drawing Sal flowers and singing traditional Baha songs."
    },
    {
      name: "करमा (Karma / Karam)",
      tribalName: "ᱠᱟᱨᱟᱢ (Karam)",
      season: "भाद्रपद (Monsoon Harvest)",
      desc: "Celebration of sibling bonds, youth vitality, and reverence for the sacred Karam branch planted in the Akhra.",
      classroomTip: "Discuss nature conservation and agriculture through Karam storytelling."
    },
    {
      name: "सोहराय / बांदना (Sohrai / Bandna)",
      tribalName: "ᱥᱚᱦᱨᱟᱭ (Sohrai)",
      season: "कार्तिक (Post-Harvest Winter)",
      desc: "Thanksgiving for cattle, nature, and harvest. Famous for stunning wall art with natural soil pigments.",
      classroomTip: "Incorporate Sohrai geometric art patterns into basic geometry & art activities."
    },
    {
      name: "माघे परब (Maghe Parab)",
      tribalName: "ᱢᱟᱜᱷᱮ (Maghe)",
      season: "माघ माह (Winter)",
      desc: "Grand annual festival of the Ho and Munda communities celebrating ancestral heritage and labor renewal.",
      classroomTip: "Great opportunity for counting days on indigenous seasonal calendars."
    }
  ];

  const dosAndDonts = [
    {
      type: "do",
      title: "Value the child's home language as an asset (मातृभाषा को सम्मान दें)",
      desc: "Allow children to freely mix tribal words with Hindi during the initial bridge phase (trans-languaging)."
    },
    {
      type: "do",
      title: "Use local realia from nature (प्राकृतिक वस्तुओं का प्रयोग)",
      desc: "Count with pebbles (Dhiri), Sal leaves (Sakam), and flowers (Baha) rather than abstract plastic counters."
    },
    {
      type: "dont",
      title: "Never scold a child for speaking their mother tongue",
      desc: "Linguistic suppression creates psychological barriers and causes early primary school dropouts."
    },
    {
      type: "dont",
      title: "Do not impose forced Hindi translation prematurely",
      desc: "First strengthen conceptual foundational literacy in the home language before expecting fluent Hindi syntax."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Module Title Header Bar */}
      <div className="bg-white rounded-xl border border-gov-200 p-5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-forest-100 text-forest-800 border border-forest-200">
              Teacher Cultural Companion
            </span>
            <span className="text-xs text-gov-500 font-medium">Jharkhand SCERT MTB-MLE</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-gov-900">
            Tribal Pedagogy & Cultural Ethos Handbook (सांस्कृतिक मार्गदर्शिका)
          </h2>
          <p className="text-xs sm:text-sm text-gov-600 max-w-2xl mt-0.5">
            A comprehensive linguistic and cultural handbook for non-native Hindi teachers to build empathy, trust, and effective learning bridges in tribal classrooms.
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Indigenous Seasonal Festivals (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-xl border border-gov-200 p-5 shadow-sm space-y-4">
            <h3 className="font-extrabold text-gov-900 text-sm flex items-center gap-2">
              <Sun className="w-4 h-4 text-amber-600" />
              Indigenous Seasonal Festivals & Pedagogical Entry-Points
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {festivals.map((fest, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-gov-200 bg-gov-50/50 space-y-2 hover:border-gov-300 transition-all"
                >
                  <span className="text-[10px] font-bold text-gov-700 bg-gov-200 px-2 py-0.5 rounded">
                    {fest.season}
                  </span>
                  <h4 className="font-bold text-xs text-gov-900">{fest.name}</h4>
                  <div className="text-xs font-bold text-forest-800 font-sans">{fest.tribalName}</div>
                  <p className="text-[11px] text-gov-600 leading-relaxed">{fest.desc}</p>
                  <div className="bg-white p-2 rounded-lg border border-gov-200 text-[10px] text-forest-800 font-semibold">
                    💡 <strong>Classroom Tip:</strong> {fest.classroomTip}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Do's and Don'ts & Heritage (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-xl border border-gov-200 p-5 shadow-sm space-y-4">
            <h3 className="font-extrabold text-gov-900 text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-forest-700" />
              Teacher Pedagogical Do's and Don'ts
            </h3>
            <div className="space-y-2.5">
              {dosAndDonts.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border text-xs space-y-1 ${
                    item.type === 'do'
                      ? 'bg-forest-50/70 border-forest-200 text-forest-950'
                      : 'bg-red-50/70 border-red-200 text-red-950'
                  }`}
                >
                  <div className="font-bold flex items-center gap-1.5">
                    {item.type === 'do' ? '✅ DO:' : '❌ AVOID:'} {item.title}
                  </div>
                  <p className="text-[11px] opacity-90 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Linguistic Heritage Box */}
          <div className="bg-gov-50 p-5 rounded-xl border border-gov-200 space-y-2">
            <h4 className="text-xs font-extrabold text-gov-900 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-forest-700" />
              About the Austroasiatic (Munda) Language Family
            </h4>
            <p className="text-xs text-gov-700 leading-relaxed">
              Santhali, Mundari, and Ho belong to the ancient Austroasiatic (Munda) linguistic family, with rich oral literature spanning thousands of years. Santhali uses the <strong>Ol Chiki</strong> script created by Guru Gomke Pt. Raghunath Murmu, while Ho utilizes <strong>Warang Chiti</strong> created by Lako Bodra.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
