import React, { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';
import { useLanguage } from '../context/LanguageContext';
import { 
  Building2, 
  Users, 
  GraduationCap, 
  TrendingUp, 
  CheckCircle2, 
  Wifi, 
  Server, 
  ShieldCheck, 
  Activity, 
  Layers, 
  MapPin, 
  Download
} from 'lucide-react';

export const AdminAnalytics: React.FC = () => {
  const { t, uiLanguage } = useLanguage();
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    const data = await apiService.fetchDistrictAnalytics();
    setAnalyticsData(data);
  };

  if (!analyticsData) {
    return (
      <div className="max-w-7xl mx-auto p-12 text-center text-gov-500 font-bold">
        प्रशासनिक आंकड़े लोड हो रहे हैं...
      </div>
    );
  }

  const districts = analyticsData.pilot_districts || [];
  const filteredDistricts = selectedDistrict === 'all' 
    ? districts 
    : districts.filter((d: any) => d.district === selectedDistrict);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8 animate-fade-in">
      {/* Admin Command Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-gov-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gov-100 text-gov-800 text-xs font-black">
            <Building2 className="w-4 h-4 text-gov-700" />
            <span>राज्य एवं जिला प्रशासनिक डैशबोर्ड (State & District FLN Console)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gov-900 tracking-tight">
            झारखंड प्राथमिक शिक्षा: निपुण भारत FLN प्रगति निगरानी
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-gov-600">
            मातृभाषा आधारित बहुभाषी शिक्षण (MTB-MLE) कार्यान्वयन • पायलट जिले: दुमका, खूंटी, प. सिंहभूम, गुमला
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-5 py-2.5 bg-gov-900 hover:bg-gov-800 text-white font-black rounded-2xl text-xs flex items-center gap-2 shadow-md transition-transform active:scale-95"
        >
          <Download className="w-4 h-4" />
          <span>FLN रिपोर्ट डाउनलोड (PDF)</span>
        </button>
      </div>

      {/* 4 State-Wide Executive Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-6 rounded-3xl border-2 border-gov-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-gov-500 uppercase">सक्रिय विद्यालय</span>
            <Building2 className="w-5 h-5 text-forest-600" />
          </div>
          <div className="text-3xl font-black text-gov-900">{analyticsData.total_active_schools}</div>
          <div className="text-xs font-bold text-emerald-600">100% ग्रामीण क्लस्टर कवरेज</div>
        </div>

        <div className="bg-white p-6 rounded-3xl border-2 border-gov-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-gov-500 uppercase">सक्रिय शिक्षक</span>
            <GraduationCap className="w-5 h-5 text-teal-600" />
          </div>
          <div className="text-3xl font-black text-gov-900">{analyticsData.total_active_teachers}</div>
          <div className="text-xs font-bold text-teal-600">प्रशिक्षित MTB-MLE शिक्षक</div>
        </div>

        <div className="bg-white p-6 rounded-3xl border-2 border-gov-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-gov-500 uppercase">नामांकित जनजातीय छात्र</span>
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-3xl font-black text-gov-900">{analyticsData.total_enrolled_students}</div>
          <div className="text-xs font-bold text-blue-600">कक्षा 1 से 3 (बालवाटिका सहित)</div>
        </div>

        <div className="bg-white p-6 rounded-3xl border-2 border-emerald-200 shadow-sm space-y-2 bg-emerald-50/30">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-emerald-800 uppercase">राज्य औसत FLN निपुणता</span>
            <TrendingUp className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-emerald-900">{analyticsData.overall_fln_mastery_pct}%</div>
          <div className="text-xs font-bold text-emerald-700">लक्ष्य: 85% (NIPUN 2026)</div>
        </div>
      </div>

      {/* District-Level Comparison Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-gov-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gov-100">
          <div>
            <h2 className="text-lg font-black text-gov-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-forest-600" />
              <span>पायलट जिलावार प्रगति विश्लेषण (Pilot District Breakdown)</span>
            </h2>
            <p className="text-xs font-semibold text-gov-500 mt-0.5">
              जनजातीय बहुल प्राथमिक विद्यालयों में भाषा एवं गणित उपलब्धि दर
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gov-500">जिला चुनें:</span>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="px-3 py-1.5 bg-gov-50 border border-gov-300 rounded-xl text-xs font-bold text-gov-900"
            >
              <option value="all">सभी जिले (All Districts)</option>
              {districts.map((d: any) => (
                <option key={d.district} value={d.district}>{d.district}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-gov-50 text-gov-700 font-black border-b border-gov-200">
                <th className="py-3 px-4 rounded-l-xl">जिला (District)</th>
                <th className="py-3 px-4">प्राथमिक जनजातीय भाषा</th>
                <th className="py-3 px-4">सक्रिय विद्यालय</th>
                <th className="py-3 px-4">कुल छात्र</th>
                <th className="py-3 px-4">FLN निपुणता दर</th>
                <th className="py-3 px-4 rounded-r-xl">स्थिति</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gov-100 font-bold text-gov-800">
              {filteredDistricts.map((d: any) => (
                <tr key={d.district} className="hover:bg-gov-50/80 transition-colors">
                  <td className="py-3 px-4 font-black text-gov-900 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-forest-600" />
                    <span>{d.district}</span>
                  </td>
                  <td className="py-3 px-4">{d.primary_lang}</td>
                  <td className="py-3 px-4">{d.schools} स्कूल</td>
                  <td className="py-3 px-4">{d.students} छात्र</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gov-200 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-600 h-full rounded-full"
                          style={{ width: `${d.avg_fln_mastery}%` }}
                        />
                      </div>
                      <span>{d.avg_fln_mastery}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
                      ✓ प्रगतिशील
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Health & Edge Sync Telemetry */}
      <div className="bg-gov-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-gov-800">
          <div className="flex items-center gap-2">
            <Server className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-black">सिस्टम स्वास्थ्य एवं ऑफलाइन सिंक टेलीमेट्री (System Health)</h3>
          </div>
          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-black border border-emerald-400/30">
            अपटाइम: {analyticsData.offline_sync_uptime_pct}%
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="bg-gov-800/80 p-4 rounded-2xl space-y-1">
            <div className="text-gov-400 font-bold">API Gateway</div>
            <div className="text-sm font-black text-emerald-400">{analyticsData.system_health.api_gateway}</div>
          </div>
          <div className="bg-gov-800/80 p-4 rounded-2xl space-y-1">
            <div className="text-gov-400 font-bold">AI Model Router</div>
            <div className="text-sm font-black text-emerald-400">{analyticsData.system_health.model_router}</div>
          </div>
          <div className="bg-gov-800/80 p-4 rounded-2xl space-y-1">
            <div className="text-gov-400 font-bold">Edge Local Cache</div>
            <div className="text-sm font-black text-emerald-400">{analyticsData.system_health.local_cache_integrity}</div>
          </div>
          <div className="bg-gov-800/80 p-4 rounded-2xl space-y-1">
            <div className="text-gov-400 font-bold">डेटा एन्क्रिप्शन</div>
            <div className="text-sm font-black text-emerald-400">AES-256 (At Rest)</div>
          </div>
        </div>
      </div>
    </div>
  );
};
