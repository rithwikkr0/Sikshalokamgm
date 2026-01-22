
import React from 'react';
import { AIState } from '../types';

interface AICompanionProps {
  state: AIState;
}

const AICompanion: React.FC<AICompanionProps> = ({ state }) => {
  if (state.isThinking) {
    return (
      <div className="glass-card rounded-2xl p-6 border-l-4 border-blue-500 animate-pulse">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
            <i className="fas fa-robot text-white"></i>
          </div>
          <h3 className="font-bold text-lg text-blue-400">Logic Validator is Thinking...</h3>
        </div>
        <div className="h-4 bg-slate-700 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-slate-700 rounded w-1/2"></div>
      </div>
    );
  }

  if (!state.feedback) {
    return (
      <div className="glass-card rounded-2xl p-6 border-l-4 border-slate-700 opacity-60">
        <div className="flex items-center gap-4 mb-3">
          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
            <i className="fas fa-brain text-slate-400"></i>
          </div>
          <h3 className="font-bold text-lg text-slate-400">AI Sidekick</h3>
        </div>
        <p className="text-slate-500 italic text-sm">Complete the current level to receive logic validation.</p>
      </div>
    );
  }

  const { status, message, suggestions, logicBreak } = state.feedback;

  const styles = {
    valid: { border: 'border-green-500', icon: 'fa-check-circle', iconBg: 'bg-green-600', text: 'text-green-400' },
    warning: { border: 'border-yellow-500', icon: 'fa-exclamation-triangle', iconBg: 'bg-yellow-600', text: 'text-yellow-400' },
    error: { border: 'border-red-500', icon: 'fa-times-circle', iconBg: 'bg-red-600', text: 'text-red-400' }
  }[status];

  return (
    <div className={`glass-card rounded-2xl p-6 border-l-4 ${styles.border} transition-all duration-500`}>
      <div className="flex items-center gap-4 mb-4">
        <div className={`w-10 h-10 rounded-full ${styles.iconBg} flex items-center justify-center shadow-lg`}>
          <i className={`fas ${styles.icon} text-white`}></i>
        </div>
        <div>
          <h3 className={`font-bold text-lg ${styles.text}`}>
            {status === 'valid' ? 'Logic Secure' : status === 'warning' ? 'Logic Alert' : 'Logic Break'}
          </h3>
          {logicBreak && <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded font-bold uppercase tracking-widest">Critical</span>}
        </div>
      </div>
      
      <p className="text-slate-200 leading-relaxed mb-4">{message}</p>
      
      {suggestions && suggestions.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Recommendations</p>
          <ul className="space-y-2">
            {suggestions.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                <i className="fas fa-chevron-right text-[10px] mt-1 text-blue-500"></i>
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AICompanion;
