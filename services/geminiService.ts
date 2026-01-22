
import { GoogleGenAI, Type } from "@google/genai";
import { LFAData, QuestLevel, Feedback } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const validateStep = async (level: QuestLevel, data: LFAData): Promise<Feedback> => {
  const model = 'gemini-3-flash-preview';
  
  const prompts = {
    [QuestLevel.ANCHOR]: `You are a Program Design Expert. Validate this problem statement and target outcome:
      Problem: "${data.problem}"
      Outcome: "${data.targetOutcome}"
      Ensure it is specific, measurable, and logical.`,
    
    [QuestLevel.BLUEPRINT]: `Validate the methodology for the theme.
      Theme: "${data.theme}"
      Methodology: "${data.methodology}"
      Does this methodology effectively address the problem: "${data.problem}"?`,
    
    [QuestLevel.ALLIANCE]: `Review these stakeholders: [${data.stakeholders.join(', ')}].
      Are there any missing roles (e.g., mentors, government officials) necessary for ${data.methodology}?`,
    
    [QuestLevel.SHIFT]: `Convert these vague practice changes into "Observable Behaviors".
      Changes: ${JSON.stringify(data.practiceChanges)}
      Ensure they follow the Shikshagraha LFA language.`,
    
    [QuestLevel.PULSE]: `Suggest 3 verified indicators for this program.
      Outcome: "${data.targetOutcome}"
      Stakeholders: ${data.stakeholders.join(', ')}
      Theme: ${data.theme}`,
    
    [QuestLevel.EXPORT]: `Summarize the entire program logic and provide a final review.`
  };

  const response = await ai.models.generateContent({
    model,
    contents: prompts[level] || 'Review the program design progress.',
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          status: { type: Type.STRING, description: 'One of: valid, warning, error' },
          message: { type: Type.STRING, description: 'A short encouraging or corrective message.' },
          suggestions: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: 'Specific recommendations for improvement.'
          },
          logicBreak: { type: Type.BOOLEAN, description: 'Whether there is a logic inconsistency.' }
        },
        required: ['status', 'message']
      }
    }
  });

  try {
    return JSON.parse(response.text.trim()) as Feedback;
  } catch (e) {
    return {
      status: 'error',
      message: 'The AI companion is momentarily confused. Please continue, your logic looks solid!',
      logicBreak: false
    };
  }
};

export const parseVibe = async (input: string): Promise<Partial<LFAData>> => {
  const model = 'gemini-3-flash-preview';
  const response = await ai.models.generateContent({
    model,
    contents: `Extract program design components from this text: "${input}"`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          theme: { type: Type.STRING },
          problem: { type: Type.STRING },
          targetOutcome: { type: Type.STRING },
          geography: { type: Type.STRING }
        }
      }
    }
  });
  
  return JSON.parse(response.text.trim());
};
