
import React, { useState, useEffect } from 'react';
import { QuestLevel, LFAData, AIState } from './types';
import ProgressBar from './components/ProgressBar';
import QuestStep from './components/QuestStep';
import AICompanion from './components/AICompanion';
import LFAViewer from './components/LFAViewer';
import { validateStep } from './services/geminiService';

const INITIAL_DATA: LFAData = {
  problem: '',
  targetOutcome: '',
  theme: '',
  methodology: '',
  stakeholders: [],
  practiceChanges: [],
  indicators: []
};

const App: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState<QuestLevel>(QuestLevel.ANCHOR);
  const [data, setData] = useState<LFAData>(INITIAL_DATA);
  const [aiState, setAiState] = useState<AIState>({ isThinking: false, feedback: null });
  const [showWelcome, setShowWelcome] = useState(true);

  const updateData = (newData: Partial<LFAData>) => {
    setData(prev => ({ ...prev, ...newData }));
  };

  const handleNext = async () => {
    setAiState({ isThinking: true, feedback: null });
    
    try {
      const feedback = await validateStep(currentLevel, data);
      setAiState({ isThinking: false, feedback });
      
      if (feedback.status !== 'error') {
        // Automatically progress if valid, otherwise let them see feedback
        if (feedback.status === 'valid' || feedback.status === 'warning') {
          setTimeout(() => {
            if (currentLevel < QuestLevel.EXPORT) {
              setCurrentLevel(prev => prev + 1);
              setAiState(p => ({ ...p, feedback: null }));
            }
          }, 1500);
        }
      }
    } catch (error) {
      console.error("Validation error", error);
      setAiState({ isThinking: false, feedback: { status: 'error', message: "The logic engine hit a snag. Let's push forward anyway!" } });
      setCurrentLevel(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentLevel > QuestLevel.ANCHOR) {
      setCurrentLevel(prev => prev - 1);
      setAiState({ isThinking: false, feedback: null });
    }
  };

  if (showWelcome) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">
        <div className="max-w-2xl w-full glass-card p-10 rounded-3xl text-center space-y-8 animate-in zoom-in duration-700">
          <div className="w-24 h-24 quest-gradient rounded-3xl mx-auto flex items-center justify-center shadow-2xl rotate-3">
            <i className="fas fa-scroll text-white text-4xl"></i>
          </div>
          <div className="space-y-4">
            <h1 className="text-5xl font-heading font-black tracking-tighter text-white">IMPACT<span className="text-blue-500 font-light">QUEST</span></h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              The "TurboTax for Program Design". Turn your complex NGO initiatives into structured, 
              AI-validated Logical Frameworks in just 5 levels.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm font-bold text-slate-500 uppercase tracking-widest">
            <div className="flex flex-col gap-2">
              <i className="fas fa-brain text-blue-500 text-xl"></i>
              Logic Validation
            </div>
            <div className="flex flex-col gap-2">
              <i className="fas fa-gamepad text-purple-500 text-xl"></i>
              Gamified Flow
            </div>
            <div className="flex flex-col gap-2">
              <i className="fas fa-file-code text-pink-500 text-xl"></i>
              Export LFA
            </div>
          </div>
          <button 
            onClick={() => setShowWelcome(false)}
            className="w-full py-5 rounded-2xl quest-gradient text-xl font-black text-white shadow-xl hover:scale-[1.02] transition-transform active:scale-95"
          >
            START THE QUEST
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col max-w-7xl mx-auto">
      <header className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 quest-gradient rounded-lg flex items-center justify-center">
            <i className="fas fa-scroll text-white"></i>
          </div>
          <h1 className="text-2xl font-heading font-bold">ImpactQuest</h1>
        </div>
        <div className="text-xs font-bold text-slate-500 uppercase tracking-widest bg-slate-800 px-4 py-2 rounded-full border border-slate-700">
          Program Engine <span className="text-blue-500">v1.0-alpha</span>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Quest Area */}
        <div className="lg:col-span-8 space-y-8">
          <ProgressBar currentLevel={currentLevel} />
          
          <div className="glass-card rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <i className="fas fa-shield-alt text-9xl"></i>
            </div>
            
            {currentLevel === QuestLevel.EXPORT ? (
              <LFAViewer data={data} />
            ) : (
              <>
                <div className="mb-8">
                  <h2 className="text-4xl font-heading font-bold text-white mb-2">
                    Level {currentLevel}: {
                      {
                        [QuestLevel.ANCHOR]: 'The Anchor',
                        [QuestLevel.BLUEPRINT]: 'The Blueprint',
                        [QuestLevel.ALLIANCE]: 'The Alliance',
                        [QuestLevel.SHIFT]: 'The Shift',
                        [QuestLevel.PULSE]: 'The Pulse',
                      }[currentLevel as number]
                    }
                  </h2>
                  <p className="text-slate-400">
                    {
                      {
                        [QuestLevel.ANCHOR]: 'Define the core problem and the target student outcome.',
                        [QuestLevel.BLUEPRINT]: 'Select a theme and the primary methodology.',
                        [QuestLevel.ALLIANCE]: 'Map stakeholders across the system ecosystem.',
                        [QuestLevel.SHIFT]: 'Define practice changes - observable behaviors.',
                        [QuestLevel.PULSE]: 'Select indicators to measure success.',
                      }[currentLevel as number]
                    }
                  </p>
                </div>

                <QuestStep level={currentLevel} data={data} updateData={updateData} />

                <div className="mt-12 flex gap-4">
                  {currentLevel > QuestLevel.ANCHOR && (
                    <button 
                      onClick={handleBack}
                      className="px-8 py-4 rounded-xl border border-slate-700 text-slate-400 font-bold hover:bg-slate-800 transition-colors"
                    >
                      <i className="fas fa-arrow-left mr-2"></i> Previous Level
                    </button>
                  )}
                  <button 
                    onClick={handleNext}
                    disabled={aiState.isThinking}
                    className={`flex-1 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                      aiState.isThinking ? 'bg-slate-700 cursor-not-allowed' : 'quest-gradient hover:shadow-lg'
                    }`}
                  >
                    {aiState.isThinking ? (
                      <i className="fas fa-spinner fa-spin"></i>
                    ) : (
                      <>Next Level <i className="fas fa-arrow-right"></i></>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* AI Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <AICompanion state={aiState} />
          
          <div className="glass-card rounded-2xl p-6 border-l-4 border-slate-700">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">LFA Summary (Auto-Drafting)</h4>
            <div className="space-y-4">
              <div className="flex gap-3">
                <i className="fas fa-dot-circle text-blue-500 mt-1"></i>
                <div className="text-xs">
                  <p className="font-bold text-slate-400 uppercase">Outcome</p>
                  <p className="text-slate-200 mt-1">{data.targetOutcome || 'Awaiting definition...'}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <i className="fas fa-dot-circle text-purple-500 mt-1"></i>
                <div className="text-xs">
                  <p className="font-bold text-slate-400 uppercase">System Map</p>
                  <p className="text-slate-200 mt-1">{data.stakeholders.length} Stakeholders identified</p>
                </div>
              </div>
              <div className="flex gap-3">
                <i className="fas fa-dot-circle text-pink-500 mt-1"></i>
                <div className="text-xs">
                  <p className="font-bold text-slate-400 uppercase">Shifts</p>
                  <p className="text-slate-200 mt-1">{data.practiceChanges.length} Behavioral changes defined</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 bg-blue-900/10 rounded-2xl border border-blue-500/20 text-xs text-blue-300">
            <p className="flex items-center gap-2 font-bold mb-2">
              <i className="fas fa-info-circle"></i> PRO TIP
            </p>
            Be as specific as possible. Instead of "Improving Literacy", try "Improving oral reading fluency for Grade 3 students from 15 words per minute to 45 words per minute."
          </div>
        </div>
      </div>
      
      <footer className="mt-12 py-8 border-t border-slate-800 text-center text-slate-500 text-xs uppercase tracking-widest">
        &copy; {new Date().getFullYear()} ImpactQuest Program Design Engine. Powered by Gemini Flash 1.5.
      </footer>
    </div>
  );
};

export default App;
