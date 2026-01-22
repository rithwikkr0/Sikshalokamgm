
import React, { useState } from 'react';
import { QuestLevel, LFAData } from '../types';

interface QuestStepProps {
  level: QuestLevel;
  data: LFAData;
  updateData: (newData: Partial<LFAData>) => void;
}

const QuestStep: React.FC<QuestStepProps> = ({ level, data, updateData }) => {
  const [newStakeholder, setNewStakeholder] = useState('');
  const [newIndicator, setNewIndicator] = useState('');

  const renderAnchor = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom duration-500">
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider">The Core Problem</label>
        <textarea 
          className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
          placeholder="What is the systemic issue you're tackling? (e.g., Grade 3 students in rural areas lack basic literacy skills...)"
          rows={4}
          value={data.problem}
          onChange={(e) => updateData({ problem: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Target Student Outcome</label>
        <input 
          className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
          placeholder="e.g., At least 70% of students achieve Grade-appropriate reading fluency."
          type="text"
          value={data.targetOutcome}
          onChange={(e) => updateData({ targetOutcome: e.target.value })}
        />
      </div>
    </div>
  );

  const renderBlueprint = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom duration-500">
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Strategic Theme</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['FLN', 'Career Readiness', 'Life Skills', 'STEM'].map(theme => (
            <button
              key={theme}
              onClick={() => updateData({ theme })}
              className={`p-4 rounded-xl border text-sm font-medium transition-all ${
                data.theme === theme 
                  ? 'bg-blue-600 border-blue-500 text-white' 
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'
              }`}
            >
              {theme}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Primary Methodology</label>
        <textarea 
          className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
          placeholder="How will you solve the problem? (e.g., In-service teacher training and provision of contextualized learning kits.)"
          rows={3}
          value={data.methodology}
          onChange={(e) => updateData({ methodology: e.target.value })}
        />
      </div>
    </div>
  );

  const renderAlliance = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom duration-500">
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Map Stakeholders</label>
        <div className="flex gap-2">
          <input 
            className="flex-1 bg-slate-900/50 border border-slate-700 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
            placeholder="Add stakeholder (e.g., CRP, Teacher, Headmaster)"
            type="text"
            value={newStakeholder}
            onChange={(e) => setNewStakeholder(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && newStakeholder.trim()) {
                updateData({ stakeholders: [...data.stakeholders, newStakeholder.trim()] });
                setNewStakeholder('');
              }
            }}
          />
          <button 
            onClick={() => {
              if (newStakeholder.trim()) {
                updateData({ stakeholders: [...data.stakeholders, newStakeholder.trim()] });
                setNewStakeholder('');
              }
            }}
            className="px-6 bg-slate-800 border border-slate-700 hover:bg-slate-700 rounded-xl"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {data.stakeholders.map((s, idx) => (
            <div key={idx} className="bg-blue-900/30 border border-blue-800 px-3 py-1.5 rounded-full flex items-center gap-2">
              <span className="text-sm font-medium">{s}</span>
              <button 
                onClick={() => updateData({ stakeholders: data.stakeholders.filter((_, i) => i !== idx) })}
                className="text-blue-400 hover:text-white"
              >
                <i className="fas fa-times text-xs"></i>
              </button>
            </div>
          ))}
          {data.stakeholders.length === 0 && <p className="text-slate-500 text-sm italic">No stakeholders added yet.</p>}
        </div>
      </div>
    </div>
  );

  const renderShift = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom duration-500">
      <p className="text-slate-400 text-sm mb-4">What will these people *actually do* differently? Define observable behaviors.</p>
      {data.stakeholders.map((s, idx) => {
        const currentChange = data.practiceChanges.find(pc => pc.stakeholder === s);
        return (
          <div key={idx} className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl space-y-3">
            <h4 className="font-bold text-blue-400 flex items-center gap-2">
              <i className="fas fa-user-circle"></i> {s}
            </h4>
            <textarea 
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
              placeholder={`Describe the behavioral shift for ${s}...`}
              value={currentChange?.behavior || ''}
              onChange={(e) => {
                const updated = data.practiceChanges.filter(pc => pc.stakeholder !== s);
                updated.push({ stakeholder: s, behavior: e.target.value });
                updateData({ practiceChanges: updated });
              }}
            />
          </div>
        );
      })}
    </div>
  );

  const renderPulse = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom duration-500">
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Success Indicators</label>
        <div className="flex gap-2">
          <input 
            className="flex-1 bg-slate-900/50 border border-slate-700 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
            placeholder="e.g., % of teachers using ORF tools correctly"
            type="text"
            value={newIndicator}
            onChange={(e) => setNewIndicator(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && newIndicator.trim()) {
                updateData({ indicators: [...data.indicators, newIndicator.trim()] });
                setNewIndicator('');
              }
            }}
          />
          <button 
            onClick={() => {
              if (newIndicator.trim()) {
                updateData({ indicators: [...data.indicators, newIndicator.trim()] });
                setNewIndicator('');
              }
            }}
            className="px-6 bg-slate-800 border border-slate-700 hover:bg-slate-700 rounded-xl"
          >
            Add
          </button>
        </div>
        <div className="space-y-2 mt-4">
          {data.indicators.map((ind, idx) => (
            <div key={idx} className="bg-slate-800/50 border border-slate-700 p-3 rounded-lg flex justify-between items-center">
              <span className="text-sm">{ind}</span>
              <button 
                onClick={() => updateData({ indicators: data.indicators.filter((_, i) => i !== idx) })}
                className="text-slate-500 hover:text-red-400"
              >
                <i className="fas fa-trash-alt text-sm"></i>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const contentMap = {
    [QuestLevel.ANCHOR]: renderAnchor,
    [QuestLevel.BLUEPRINT]: renderBlueprint,
    [QuestLevel.ALLIANCE]: renderAlliance,
    [QuestLevel.SHIFT]: renderShift,
    [QuestLevel.PULSE]: renderPulse,
    [QuestLevel.EXPORT]: () => <div className="p-8 text-center text-slate-400 italic">Reviewing your masterpiece...</div>
  };

  return <div className="mt-8">{contentMap[level]()}</div>;
};

export default QuestStep;
