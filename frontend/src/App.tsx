import React, { useState } from 'react';
import { TribalLanguage, UserRole } from './types';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { HomeOverview } from './components/HomeOverview';
import { StudentPortal } from './components/StudentPortal';
import { TeacherPortal } from './components/TeacherPortal';
import { VoiceBridge } from './components/VoiceBridge';
import { CurriculumHub } from './components/CurriculumHub';
import { AssessmentCenter } from './components/AssessmentCenter';
import { WorksheetStudio } from './components/WorksheetStudio';
import { OfflineSyncManager } from './components/OfflineSyncManager';
import { PracticeArena } from './components/PracticeArena';
import { CulturalGuide } from './components/CulturalGuide';
import { CommunityVault } from './components/CommunityVault';
import { AdminAnalytics } from './components/AdminAnalytics';
import { apiService } from './services/apiService';
import { School, ShieldCheck } from 'lucide-react';

const MainLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const { targetTribalLanguage, setTargetTribalLanguage, t } = useLanguage();
  const [activeRole, setActiveRole] = useState<UserRole>('teacher');
  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(false);

  const handleOfflineModeChange = (offline: boolean) => {
    setIsOfflineMode(offline);
    apiService.setSimulatedOffline(offline);
  };

  return (
    <div className="min-h-screen bg-gov-50 text-gov-900 flex flex-col font-sans selection:bg-forest-100 selection:text-forest-900">
      {/* Top Government-Grade Navigation with Persona Switcher & 5-Language Selector */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedLanguage={targetTribalLanguage}
        setSelectedLanguage={setTargetTribalLanguage}
        activeRole={activeRole}
        setActiveRole={setActiveRole}
        isOfflineMode={isOfflineMode}
        setIsOfflineMode={handleOfflineModeChange}
      />

      {/* Main Dynamic Workspace Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'home' && (
          <HomeOverview
            setActiveTab={setActiveTab}
            selectedLanguage={targetTribalLanguage}
            setSelectedLanguage={setTargetTribalLanguage}
          />
        )}

        {activeTab === 'student' && (
          <StudentPortal
            selectedLanguage={targetTribalLanguage}
            isOfflineMode={isOfflineMode}
            onNavigateToCurriculum={() => setActiveTab('curriculum')}
            onNavigateToAssessment={() => setActiveTab('assessments')}
            onNavigateToPractice={() => setActiveTab('practice')}
          />
        )}

        {activeTab === 'practice' && (
          <PracticeArena
            selectedLanguage={targetTribalLanguage}
            isOfflineMode={isOfflineMode}
          />
        )}

        {activeTab === 'teacher' && (
          <TeacherPortal
            selectedLanguage={targetTribalLanguage}
            isOfflineMode={isOfflineMode}
            onNavigateToWorksheets={() => setActiveTab('worksheets')}
            onNavigateToCurriculum={() => setActiveTab('curriculum')}
            onNavigateToCulturalGuide={() => setActiveTab('cultural-guide')}
          />
        )}

        {activeTab === 'cultural-guide' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
            <CulturalGuide
              selectedLanguage={targetTribalLanguage}
            />
          </div>
        )}

        {activeTab === 'curriculum' && (
          <CurriculumHub
            selectedLanguage={targetTribalLanguage}
            isOfflineMode={isOfflineMode}
          />
        )}

        {activeTab === 'voice-bridge' && (
          <VoiceBridge
            selectedLanguage={targetTribalLanguage}
            isOfflineMode={isOfflineMode}
          />
        )}

        {activeTab === 'assessments' && (
          <AssessmentCenter
            selectedLanguage={targetTribalLanguage}
            isOfflineMode={isOfflineMode}
          />
        )}

        {activeTab === 'worksheets' && (
          <WorksheetStudio
            selectedLanguage={targetTribalLanguage}
            isOfflineMode={isOfflineMode}
          />
        )}

        {activeTab === 'vault' && (
          <CommunityVault
            selectedLanguage={targetTribalLanguage}
            isOfflineMode={isOfflineMode}
          />
        )}

        {activeTab === 'analytics' && (
          <AdminAnalytics />
        )}

        {activeTab === 'sync' && (
          <OfflineSyncManager
            selectedLanguage={targetTribalLanguage}
            isOfflineMode={isOfflineMode}
            setIsOfflineMode={handleOfflineModeChange}
          />
        )}
      </main>

      {/* Institutional Public Service Footer */}
      <footer className="bg-white border-t border-gov-200 py-8 px-4 sm:px-6 text-xs text-gov-600 space-y-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gov-900 text-white flex items-center justify-center font-black">
              <School className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="font-extrabold text-gov-900 text-sm">
                {t('nav.brand')}
              </div>
              <div className="text-[11px] text-gov-500">
                Department of School Education & Literacy • Government of Jharkhand
              </div>
            </div>
          </div>

          {/* Quick Module Navigation Links in Footer */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-gov-700">
            <button onClick={() => setActiveTab('home')} className="hover:text-gov-900 cursor-pointer">{t('nav.overview')}</button>
            <button onClick={() => setActiveTab('student')} className="hover:text-gov-900 cursor-pointer">{t('nav.student_studio')}</button>
            <button onClick={() => setActiveTab('practice')} className="hover:text-gov-900 cursor-pointer">{t('nav.practice')}</button>
            <button onClick={() => setActiveTab('teacher')} className="hover:text-gov-900 cursor-pointer">{t('nav.teacher_studio')}</button>
            <button onClick={() => setActiveTab('curriculum')} className="hover:text-gov-900 cursor-pointer">{t('nav.curriculum')}</button>
            <button onClick={() => setActiveTab('voice-bridge')} className="hover:text-gov-900 cursor-pointer">{t('nav.voice_bridge')}</button>
            <button onClick={() => setActiveTab('assessments')} className="hover:text-gov-900 cursor-pointer">{t('nav.assessments')}</button>
            <button onClick={() => setActiveTab('worksheets')} className="hover:text-gov-900 cursor-pointer">{t('nav.worksheets')}</button>
            <button onClick={() => setActiveTab('vault')} className="hover:text-gov-900 cursor-pointer">{t('nav.vault')}</button>
            <button onClick={() => setActiveTab('analytics')} className="hover:text-gov-900 cursor-pointer">{t('nav.admin')}</button>
            <button onClick={() => setActiveTab('sync')} className="hover:text-gov-900 cursor-pointer">{t('nav.sync')}</button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-gov-100 pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gov-500 gap-2">
          <div>
            Tribal Mother Tongue-Based Multilingual Education (MTB-MLE) Operating System • NEP 2020 & NIPUN Bharat FLN
          </div>
          <div className="flex items-center gap-1 text-gov-400 font-bold">
            <span>BHASHASETU (Offline OS)</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <MainLayout />
    </LanguageProvider>
  );
};

export default App;

