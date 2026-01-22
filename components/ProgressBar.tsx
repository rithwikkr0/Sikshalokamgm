
import React from 'react';
import { QuestLevel } from '../types';

interface ProgressBarProps {
  currentLevel: QuestLevel;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentLevel }) => {
  const steps = [
    { id: QuestLevel.ANCHOR, name: 'Anchor', icon: 'fa-anchor' },
    { id: QuestLevel.BLUEPRINT, name: 'Blueprint', icon: 'fa-map' },
    { id: QuestLevel.ALLIANCE, name: 'Alliance', icon: 'fa-users' },
    { id: QuestLevel.SHIFT, name: 'Shift', icon: 'fa-bolt' },
    { id: QuestLevel.PULSE, name: 'Pulse', icon: 'fa-heartbeat' },
    { id: QuestLevel.EXPORT, name: 'Finish', icon: 'fa-flag-checkered' }
  ];

  return (
    <div className="w-full mb-12">
      <div className="flex justify-between items-center relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-800 -translate-y-1/2 z-0"></div>
        <div 
          className="absolute top-1/2 left-0 h-1 quest-gradient -translate-y-1/2 z-0 transition-all duration-500 ease-out"
          style={{ width: `${((currentLevel - 1) / (steps.length - 1)) * 100}%` }}
        ></div>
        
        {steps.map((step) => {
          const isActive = step.id === currentLevel;
          const isCompleted = step.id < currentLevel;
          
          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                isActive ? 'bg-blue-600 scale-110 ring-4 ring-blue-500/20 step-active' : 
                isCompleted ? 'bg-green-600' : 'bg-slate-800 border-2 border-slate-700'
              }`}>
                <i className={`fas ${step.icon} ${isActive || isCompleted ? 'text-white' : 'text-slate-500'}`}></i>
              </div>
              <span className={`mt-3 text-xs font-bold uppercase tracking-widest ${
                isActive ? 'text-blue-400' : isCompleted ? 'text-green-400' : 'text-slate-500'
              }`}>
                {step.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;
