import React, { useState } from 'react';
import { TribalLanguage, ChildTutorResponse } from '../types';
import { apiService } from '../services/apiService';
import { speechService } from '../services/speechService';
import { languagePackService } from '../services/languagePackService';
import { 
  Bot, 
  Sparkles, 
  Volume2, 
  Send, 
  X, 
  ShieldCheck, 
  HelpCircle,
  VolumeX,
  Lightbulb,
  BookOpen
} from 'lucide-react';

interface AITutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLanguage: TribalLanguage;
  grade: string;
}

export const AITutorModal: React.FC<AITutorModalProps> = ({
  isOpen,
  onClose,
  selectedLanguage,
  grade
}) => {
  const [question, setQuestion] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<ChildTutorResponse | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  if (!isOpen) return null;

  const pack = languagePackService.getPack(selectedLanguage);

  const sampleQuestions = [
    '5 + 3 कितना होता है?',
    'पेड़ हमारे लिए क्यों जरूरी हैं?',
    'संथाली में नमस्ते कैसे कहते हैं?',
    'पक्षी आकाश में कैसे उड़ते हैं?'
  ];

  const handleAsk = async (qText?: string) => {
    const qToAsk = qText || question;
    if (!qToAsk.trim()) return;

    setIsLoading(true);
    setResponse(null);

    try {
      const res = await apiService.askChildTutor(qToAsk, grade, selectedLanguage);
      setResponse(res);
      if (qText) setQuestion(qText);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeak = (text: string) => {
    setIsPlayingAudio(true);
    speechService.speak(text, 'hindi', () => {
      setIsPlayingAudio(false);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border-4 border-emerald-500 max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Playful Child-Safe Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-inner">
              <Bot className="w-7 h-7 text-amber-300 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black tracking-tight">भाषा सेतु मित्र (AI Tutor)</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-400/30 text-emerald-100 text-xs font-bold border border-emerald-300/30">
                  बाल सुरक्षित (Child Safe)
                </span>
              </div>
              <p className="text-xs text-emerald-100 font-medium">
                आपकी भाषा ({pack.nameNative}) में सरल और ज्ञानवर्धक उत्तर
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content & Dialogue Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5 bg-emerald-50/30">
          {/* Quick Question Prompts for Children */}
          {!response && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-gov-700 uppercase tracking-wider">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>मित्र से कोई भी सवाल पूछें (Ask any question):</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {sampleQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAsk(q)}
                    className="p-3 bg-white rounded-2xl border-2 border-emerald-100 hover:border-emerald-400 hover:bg-emerald-50 text-left text-xs font-bold text-gov-800 transition-all flex items-center justify-between group shadow-sm"
                  >
                    <span>{q}</span>
                    <Sparkles className="w-4 h-4 text-emerald-400 group-hover:text-emerald-600 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Loading Animation */}
          {isLoading && (
            <div className="p-8 text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full border-4 border-emerald-500 border-t-transparent animate-spin" />
              <p className="text-sm font-bold text-emerald-800">
                भाषा सेतु मित्र आपकी भाषा में उत्तर तैयार कर रहा है... 🌿
              </p>
            </div>
          )}

          {/* AI Response Card */}
          {response && (
            <div className="space-y-4 animate-fade-in">
              {/* Question Asked Bubble */}
              <div className="flex justify-end">
                <div className="bg-emerald-600 text-white font-bold text-sm px-4 py-2.5 rounded-2xl rounded-tr-none shadow-md max-w-[85%]">
                  {response.question || question}
                </div>
              </div>

              {/* Tutor Explanation Bubble */}
              <div className="bg-white rounded-3xl p-5 border-2 border-emerald-200 shadow-md space-y-4">
                {/* Mother Tongue Primary Explanation */}
                <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-emerald-800 uppercase tracking-wide">
                      मातृभाषा ({pack.nameNative})
                    </span>
                    <button
                      onClick={() => handleSpeak(response.explanation_tribal_devanagari || response.explanation_hindi || '')}
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>सुनो (Listen)</span>
                    </button>
                  </div>
                  <div className="text-base font-black text-gov-900 leading-relaxed font-olchiki">
                    {response.explanation_tribal_primary}
                  </div>
                  {response.explanation_tribal_devanagari && (
                    <div className="text-xs font-semibold text-emerald-800/80 pt-1 border-t border-emerald-200/60">
                      उच्चारण: {response.explanation_tribal_devanagari}
                    </div>
                  )}
                </div>

                {/* Hindi Bridge Explanation */}
                {response.explanation_hindi && (
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-gov-500 uppercase">
                      हिन्दी अनुवाद (Hindi Bridge)
                    </span>
                    <p className="text-sm font-bold text-gov-800 leading-relaxed">
                      {response.explanation_hindi}
                    </p>
                  </div>
                )}

                {/* Visual Concept */}
                {response.visual_concept && (
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-center font-black text-lg text-amber-900">
                    {response.visual_concept}
                  </div>
                )}

                {/* Suggested Followups */}
                {response.suggested_followups && response.suggested_followups.length > 0 && (
                  <div className="pt-2 border-t border-gov-100 flex flex-wrap gap-2">
                    {response.suggested_followups.map((f, i) => (
                      <span key={i} className="px-2.5 py-1 bg-gov-100 rounded-full text-[11px] font-bold text-gov-700">
                        {f}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-emerald-100">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAsk();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="यहाँ अपना प्रश्न लिखें... (उदा: 5 + 3 = ?)"
              className="flex-1 px-4 py-3 bg-gov-50 border-2 border-emerald-200 rounded-2xl text-sm font-bold text-gov-900 focus:outline-none focus:border-emerald-600 transition-colors"
            />
            <button
              type="submit"
              disabled={isLoading || !question.trim()}
              className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-2xl font-black text-sm flex items-center gap-2 transition-all shadow-md active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>पूछें</span>
            </button>
          </form>
          <div className="flex items-center justify-between mt-2 px-1 text-[11px] text-gov-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              100% बाल सुरक्षा और पाठ्यक्रम से सत्यापित AI
            </span>
            <span>कक्षा: {grade}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
