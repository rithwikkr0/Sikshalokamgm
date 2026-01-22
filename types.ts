
export enum QuestLevel {
  ANCHOR = 1,
  BLUEPRINT = 2,
  ALLIANCE = 3,
  SHIFT = 4,
  PULSE = 5,
  EXPORT = 6
}

export interface LFAData {
  problem: string;
  targetOutcome: string;
  theme: string;
  methodology: string;
  stakeholders: string[];
  practiceChanges: { stakeholder: string; behavior: string }[];
  indicators: string[];
}

export interface Feedback {
  status: 'valid' | 'warning' | 'error';
  message: string;
  suggestions?: string[];
  logicBreak?: boolean;
}

export interface AIState {
  isThinking: boolean;
  feedback: Feedback | null;
}
