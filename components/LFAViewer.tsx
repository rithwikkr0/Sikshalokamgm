
import React from 'react';
import { LFAData } from '../types';

interface LFAViewerProps {
  data: LFAData;
}

const LFAViewer: React.FC<LFAViewerProps> = ({ data }) => {
  const downloadJSON = () => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `impact_quest_design_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  return (
    <div className="animate-in zoom-in duration-500 space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-heading font-bold text-white">Quest Completed!</h2>
        <button 
          onClick={downloadJSON}
          className="px-6 py-3 quest-gradient rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-transform"
        >
          <i className="fas fa-download"></i> Export JSON
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-lg font-bold text-blue-400 mb-4 border-b border-slate-700 pb-2">Level 1: The Anchor</h3>
          <p className="text-slate-300 mb-3"><span className="font-bold text-slate-500">Problem:</span> {data.problem}</p>
          <p className="text-slate-300"><span className="font-bold text-slate-500">Outcome:</span> {data.targetOutcome}</p>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-lg font-bold text-purple-400 mb-4 border-b border-slate-700 pb-2">Level 2: The Blueprint</h3>
          <p className="text-slate-300 mb-3"><span className="font-bold text-slate-500">Theme:</span> {data.theme}</p>
          <p className="text-slate-300"><span className="font-bold text-slate-500">Methodology:</span> {data.methodology}</p>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-lg font-bold text-pink-400 mb-4 border-b border-slate-700 pb-2">Level 3 & 4: System & Shifts</h3>
          <div className="space-y-4">
            {data.practiceChanges.map((pc, i) => (
              <div key={i} className="text-sm">
                <span className="font-bold text-blue-400">{pc.stakeholder}:</span>
                <p className="text-slate-400 italic mt-1">"{pc.behavior}"</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-lg font-bold text-orange-400 mb-4 border-b border-slate-700 pb-2">Level 5: The Pulse</h3>
          <ul className="list-disc list-inside space-y-2 text-slate-300">
            {data.indicators.map((ind, i) => (
              <li key={i}>{ind}</li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl text-center">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="fas fa-rocket text-green-500 text-2xl"></i>
        </div>
        <h4 className="text-xl font-bold mb-2">Program Ready for Implementation</h4>
        <p className="text-slate-400 max-w-md mx-auto">This design has been validated by Gemini AI. You can now use this logic for funding proposals, implementation blueprints, or baseline studies.</p>
      </div>
    </div>
  );
};

export default LFAViewer;
