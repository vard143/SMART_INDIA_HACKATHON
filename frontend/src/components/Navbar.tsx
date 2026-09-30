import React, { useState, useEffect } from 'react';
import { TribalLanguage, UserRole, UILanguage } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { OfflineHealthModal } from './OfflineHealthModal';
import { syncService, SyncStatus } from '../services/syncService';
import { 
  Home,
  Radio, 
  BookOpen, 
  Award, 
  FileSpreadsheet, 
  Trophy, 
  HardDriveDownload, 
  Wifi, 
  WifiOff, 
  Languages, 
  School,
  GraduationCap,
  Sparkles,
  Shield,
  Building2,
  UserCheck,
  Activity,
  Volume2,
  RefreshCw,
  Globe,
  Database
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedLanguage: TribalLanguage;
  setSelectedLanguage: (lang: TribalLanguage) => void;
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  isOfflineMode: boolean;
  setIsOfflineMode: (offline: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedLanguage,
  setSelectedLanguage,
  activeRole,
  setActiveRole,
  isOfflineMode,
  setIsOfflineMode
}) => {
  const [isHealthModalOpen, setIsHealthModalOpen] = useState<boolean>(false);
  const { uiLanguage, setUiLanguage, t, speakText, setTargetTribalLanguage } = useLanguage();
  const [syncStatus, setSyncStatus] = useState<SyncStatus>(() => syncService.getStatus());

  useEffect(() => {
    const unsubscribe = syncService.subscribe((status) => {
      setSyncStatus(status);
    });
    return unsubscribe;
  }, []);

  const navItems = [
    { id: 'home', labelEn: 'Overview', labelHi: 'अवलोकन', icon: Home },
    { id: 'student', labelEn: 'Student Studio', labelHi: 'छात्र कक्ष', icon: Sparkles },
    { id: 'teacher', labelEn: 'Teacher Studio', labelHi: 'शिक्षक मंच', icon: GraduationCap },
    { id: 'voice-bridge', labelEn: 'Voice Bridge', labelHi: 'ध्वनि सेतु', icon: Radio },
    { id: 'practice', labelEn: 'Practice', labelHi: 'अभ्यास व खेल', icon: Trophy },
    { id: 'curriculum', labelEn: 'Curriculum', labelHi: 'पाठ्यचर्या', icon: BookOpen },
    { id: 'assessments', labelEn: 'Assessments', labelHi: 'मूल्यांकन', icon: Award },
    { id: 'worksheets', labelEn: 'Worksheets', labelHi: 'कार्यपत्रिका', icon: FileSpreadsheet },
    { id: 'vault', labelEn: 'Tribal Vault', labelHi: 'ज्ञान कोष', icon: Shield },
    { id: 'analytics', labelEn: 'Administration', labelHi: 'प्रशासन', icon: Building2 },
    { id: 'sync', labelEn: 'Data Sync', labelHi: 'डेटा सिंक', icon: HardDriveDownload },
  ];

  const tribalLanguages: { id: TribalLanguage; name: string; script: string; flag: string; tag: string }[] = [
    { id: 'santhali', name: 'Santhali', script: 'ᱚᱞ ᱪᱤᱠᱤ (Ol Chiki)', flag: '🌿', tag: 'Primary Offline MVP' },
    { id: 'mundari', name: 'Mundari', script: 'ᱢᱩᱱᱰᱟᱨᱤ / देवनागरी', flag: '🌾', tag: 'Offline Pack' },
    { id: 'ho', name: 'Ho', script: 'ᱦᱳ / Warang Chiti', flag: '🏹', tag: 'Offline Pack' },
    { id: 'kurukh', name: 'Kurukh', script: 'कुड़ुख़ / Tolong Siki', flag: '🏔️', tag: 'Offline Pack' },
    { id: 'kharia', name: 'Kharia', script: 'खड़िया / Devanagari', flag: '🌲', tag: 'Offline Pack' },
  ];

  const handleTribalLanguageChange = (lang: TribalLanguage) => {
    setSelectedLanguage(lang);
    setTargetTribalLanguage(lang);
  };

  return (
    <header className="bg-white border-b border-gov-200 sticky top-0 z-50 shadow-xs">
      {/* 1. Official National Tri-Color Accent Ribbon */}
      <div className="h-1.5 w-full bg-gradient-to-r from-amber-600 via-white to-forest-700"></div>

      {/* 2. Official Government of Jharkhand & JCERT Portal Bar */}
      <div className="bg-[#1b2533] text-white border-b border-gov-800 text-[11px] py-1 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Official Seals & Ministry Subtext */}
          <div className="flex items-center gap-2.5">
            <span className="font-extrabold text-amber-400 tracking-wide">झारखण्ड सरकार</span>
            <span className="text-gov-400">|</span>
            <span className="text-gov-200 font-semibold hidden sm:inline">Government of Jharkhand</span>
            <span className="text-gov-400 hidden md:inline">•</span>
            <span className="text-gov-300 hidden md:inline">Department of School Education & Literacy</span>
            <span className="text-gov-400 hidden lg:inline">•</span>
            <span className="text-emerald-400 font-black tracking-wider hidden lg:inline">JCERT RANCHI (NIPUN BHARAT)</span>
          </div>

          {/* Accessibility, Local Database Status & Portal UI Language Switcher */}
          <div className="flex items-center gap-3">
            {/* Database Offline Status Pill */}
            <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-600/50 text-[10px] text-emerald-300 font-mono font-bold">
              <Database className="w-3 h-3 text-emerald-400" />
              <span>OFFLINE SQLITE: 137 FLN TERMS</span>
            </div>

            {/* Gov Portal Bilingual UI Switcher (strictly English / Hindi) */}
            <div className="flex items-center bg-gov-900 rounded border border-gov-700 p-0.5 font-bold text-[10px]">
              <button
                onClick={() => setUiLanguage('english')}
                className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                  uiLanguage === 'english'
                    ? 'bg-amber-500 text-gov-950 font-black'
                    : 'text-gov-300 hover:text-white'
                }`}
                title="Switch Portal Interface to English"
              >
                English
              </button>
              <button
                onClick={() => setUiLanguage('hindi')}
                className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                  uiLanguage === 'hindi'
                    ? 'bg-amber-500 text-gov-950 font-black'
                    : 'text-gov-300 hover:text-white'
                }`}
                title="पोर्टल की भाषा हिन्दी में बदलें"
              >
                हिन्दी
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Brand & Classroom Target Language Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Brand & Identity */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 cursor-pointer select-none group"
          role="banner"
        >
          <div className="w-11 h-11 rounded-xl bg-forest-800 text-white flex items-center justify-center font-black shadow-sm group-hover:bg-forest-900 transition-colors border border-forest-600">
            <School className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-xl text-gov-950 tracking-tight">
                भाषा सेतु
              </span>
              <span className="font-bold text-sm text-gov-700 tracking-normal hidden xs:inline">
                (BHASHASETU)
              </span>
              <span className="text-[10px] font-black px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center gap-1">
                <span>FLN 100% OFFLINE</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
              </span>
            </div>
            <p className="text-[11px] text-gov-600 font-semibold hidden sm:block">
              {uiLanguage === 'hindi' 
                ? 'निपुण भारत जनजातीय मातृभाषा शिक्षण एवं वास्तविक समय ध्वनि सेतु' 
                : 'NIPUN Bharat Tribal Mother-Tongue Learning & Real-Time Classroom Bridge'}
            </p>
          </div>
        </div>

        {/* Global Controls: Classroom Tribal Language Selector, Persona Switcher & Network */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Target Classroom Tribal Language Selector */}
          <div className="flex items-center bg-amber-50/80 px-2 py-1 rounded-xl border-2 border-amber-400 shadow-xs">
            <div className="flex flex-col pr-2 border-r border-amber-200">
              <span className="text-[9px] font-black text-amber-900 uppercase tracking-wider">
                {uiLanguage === 'hindi' ? 'मातृभाषा सेतु' : 'Classroom Mother Tongue'}
              </span>
              <span className="text-[11px] font-black text-gov-900">
                {selectedLanguage === 'santhali' ? 'Santhali (ᱥᱟᱱᱛᱟᱲᱤ)' :
                 selectedLanguage === 'mundari' ? 'Mundari (ᱢᱩᱱᱰᱟᱨᱤ)' :
                 selectedLanguage === 'ho' ? 'Ho (ᱦᱳ)' : selectedLanguage.toUpperCase()}
              </span>
            </div>
            <select
              value={selectedLanguage}
              onChange={(e) => handleTribalLanguageChange(e.target.value as TribalLanguage)}
              className="bg-transparent text-xs font-black text-gov-900 focus:outline-none cursor-pointer pl-1.5 py-0.5"
              aria-label="Choose Classroom Tribal Language"
            >
              {tribalLanguages.map((l) => (
                <option key={l.id} value={l.id} className="font-bold text-gov-900 bg-white">
                  {l.flag} {l.name} — {l.script}
                </option>
              ))}
            </select>
            <button
              onClick={() => speakText("ᱡᱚᱦᱟᱨ", selectedLanguage)}
              className="p-1 text-amber-800 hover:text-amber-950 hover:bg-amber-100 rounded-md transition-colors ml-1"
              title="Hear Native Greeting Audio"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          {/* User Persona Switcher */}
          <div className="flex items-center bg-gov-100 p-1 rounded-xl border border-gov-200 text-xs font-bold">
            <UserCheck className="w-3.5 h-3.5 text-gov-600 ml-1.5 mr-1 hidden md:block" />
            {[
              { role: 'teacher', labelEn: 'Teacher', labelHi: 'शिक्षक', tab: 'teacher' },
              { role: 'student', labelEn: 'Student', labelHi: 'छात्र', tab: 'student' },
              { role: 'validator', labelEn: 'Evaluator', labelHi: 'समीक्षक', tab: 'vault' },
              { role: 'admin', labelEn: 'Admin', labelHi: 'प्रशासन', tab: 'analytics' }
            ].map(({ role, labelEn, labelHi, tab }) => (
              <button
                key={role}
                onClick={() => {
                  setActiveRole(role as UserRole);
                  setActiveTab(tab);
                }}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  activeRole === role
                    ? 'bg-gov-900 text-white shadow-xs font-black'
                    : 'text-gov-700 hover:text-gov-950 hover:bg-gov-200/60'
                }`}
              >
                {uiLanguage === 'hindi' ? labelHi : labelEn}
              </button>
            ))}
          </div>

          {/* Offline System Diagnostics Health Modal Trigger */}
          <button
            onClick={() => setIsHealthModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gov-100 hover:bg-gov-200 text-gov-800 rounded-xl text-xs font-bold border border-gov-300 transition-colors shadow-2xs"
            title="Open 100% Offline System Health & Local Diagnostics"
          >
            <Activity className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">
              {uiLanguage === 'hindi' ? 'प्रणाली स्वास्थ्य' : 'Diagnostics'}
            </span>
          </button>

          {/* Network-Aware Status Indicator & Offline Mode Toggle */}
          <button
            onClick={() => {
              if (syncStatus.state === 'syncing') return;
              setIsOfflineMode(!isOfflineMode);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              syncStatus.state === 'syncing'
                ? 'bg-amber-100 text-amber-900 border-amber-400'
                : isOfflineMode || !syncStatus.isOnline
                ? 'bg-amber-50 text-amber-900 border-amber-300'
                : 'bg-emerald-50 text-emerald-900 border-emerald-300'
            }`}
            title={
              isOfflineMode
                ? '100% Offline School Tablet Mode active. Zero cloud dependencies.'
                : 'Connected to Edge Server.'
            }
          >
            {syncStatus.state === 'syncing' ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 text-amber-700 animate-spin" />
                <span>Syncing...</span>
              </>
            ) : isOfflineMode || !syncStatus.isOnline ? (
              <>
                <WifiOff className="w-3.5 h-3.5 text-amber-700" />
                <span>100% Offline</span>
              </>
            ) : (
              <>
                <Wifi className="w-3.5 h-3.5 text-emerald-700" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                <span>Online Synced</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 4. Accessible Module Navigation Bar (Clear, Readable Government Tabs) */}
      <nav 
        className="bg-gov-50 border-t border-gov-200 px-2 sm:px-6 flex overflow-x-auto no-scrollbar gap-1 py-1"
        role="tablist"
        aria-label="Application Modules Navigation"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const label = uiLanguage === 'hindi' ? item.labelHi : item.labelEn;
          return (
            <button
              key={item.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                isActive
                  ? 'bg-gov-900 text-white shadow-sm ring-1 ring-gov-950 font-black scale-[1.01]'
                  : 'text-gov-700 hover:text-gov-950 hover:bg-gov-200/80'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 transition-transform ${isActive ? 'text-amber-400' : 'text-gov-500'}`} />
              <span>{label}</span>
            </button>
          );
        })}
      </nav>

      {/* Offline System Health Diagnostic Modal */}
      <OfflineHealthModal
        isOpen={isHealthModalOpen}
        onClose={() => setIsHealthModalOpen(false)}
      />
    </header>
  );
};
