import { db } from '../db';
import { beneficiaries } from '../db/schema';
import { eq } from 'drizzle-orm';
import { translations, SupportedLanguage } from '../i18n/translations';
import { recommendationService } from './recommendationService';

export interface ConversationStepInfo {
  stepIndex: number;
  field: string;
  question: string;
  isComplete: boolean;
}

const STEPS = [
  { field: 'name', key: 'askName' },
  { field: 'location', key: 'askLocation' },
  { field: 'education', key: 'askEducation' },
  { field: 'currentOccupation', key: 'askOccupation' },
  { field: 'interests', key: 'askInterests' },
  { field: 'mobility', key: 'askMobility' },
  { field: 'employmentPreference', key: 'askEmploymentPreference' },
] as const;

export class ConversationService {
  getPromptForStep(stepIndex: number, language: SupportedLanguage = 'English'): ConversationStepInfo {
    const dict = translations[language] || translations.English;
    if (stepIndex >= STEPS.length) {
      return {
        stepIndex,
        field: 'complete',
        question: dict.profileComplete,
        isComplete: true
      };
    }

    const step = STEPS[stepIndex];
    return {
      stepIndex,
      field: step.field,
      question: (dict as any)[step.key] || dict.askName,
      isComplete: false
    };
  }

  // Parses user utterance and extracts structured attributes based on context
  extractFieldFromUtterance(field: string, utterance: string, language: SupportedLanguage = 'English') {
    const clean = utterance.trim();
    if (!clean) return null;

    if (field === 'name') {
      // Regex match specific name phrases in Hindi/Marathi/English
      const namePattern = /(?:mera naam|naam hai|my name is|i am|maze naav|माझे नाव|नाव|मेरा नाम)\s+([A-Za-z\u0900-\u097F\s]{2,25})(?:\s+hai|\s+ahe|\s+ahai|\s+आहे|\s+है|[.,]|$)/i;
      const match = clean.match(namePattern);
      if (match && match[1]) {
        return match[1].replace(/\s+(hai|ahe|ahai|आहे|है)$/i, '').trim();
      }

      // Clean up common conversational prefixes
      const stripped = clean
        .replace(/^(namaste|namaskar|hello|hi|my name is|i am|mera naam|naam hai|naav ahe|maze naav|माझे नाव|मेरा नाम|me|this is)\s+/i, '')
        .replace(/\s+(hai|ahe|ahai|आहे|है)$/i, '')
        .replace(/[.,!]/g, '')
        .trim();
      return stripped || clean;
    }

    if (field === 'location') {
      // Look for known states/districts
      let state = 'Maharashtra';
      let district = 'Pune';

      if (/delhi|दिल्ली/i.test(clean)) { state = 'Delhi'; district = 'Delhi'; }
      else if (/uttar pradesh|varanasi|lucknow|kanpur|बनारस|वाराणसी|लखनऊ|उत्तर प्रदेश/i.test(clean)) {
        state = 'Uttar Pradesh';
        if (/varanasi|बनारस|काशी|वाराणसी/i.test(clean)) district = 'Varanasi';
        else if (/lucknow|लखनऊ/i.test(clean)) district = 'Lucknow';
        else district = 'Varanasi';
      }
      else if (/bihar|patna|gaya|बिहार|पटना/i.test(clean)) {
        state = 'Bihar';
        district = 'Patna';
      }
      else if (/maharashtra|pune|nagpur|nashik|mumbai|महाराष्ट्र|पुणे|नागपूर|नाशिक|मुंबई/i.test(clean)) {
        state = 'Maharashtra';
        if (/nagpur|नागपूर/i.test(clean)) district = 'Nagpur';
        else if (/nashik|नासिक|नाशिक/i.test(clean)) district = 'Nashik';
        else if (/mumbai|मुंबई/i.test(clean)) district = 'Mumbai';
        else district = 'Pune';
      } else {
        const parts = clean.split(/[,–\s]+/);
        if (parts.length >= 2) {
          district = parts[0];
          state = parts[1];
        } else {
          district = clean;
        }
      }
      return { state, district };
    }

    if (field === 'education') {
      if (/graduate|degree|ba|bcom|bsc|b\.tech|bachelor|पदवी|स्नातक/i.test(clean)) return 'Graduate';
      if (/iti|diploma|polytechnic|आयटीआय|आईटीआई/i.test(clean)) return 'ITI / Diploma';
      if (/12th|12|twelfth|barahvi|hsc|बारावी|बारहवीं|१२/i.test(clean)) return '12th Pass';
      if (/10th|10|tenth|dasvi|ssc|दहावी|दसवीं|१०/i.test(clean)) return '10th Pass';
      if (/8th|8|eighth|aathvi|आठवी|आठवीं|८/i.test(clean)) return '8th Pass';
      if (/below 8th|uneducated|literate|primary|5th|५/i.test(clean)) return 'Below 8th Standard';
      return clean;
    }


    if (field === 'mobility') {
      if (/cannot|can't|nearby only|no travel|ghar|home|घर|जवळ/i.test(clean)) return 'Cannot travel far';
      if (/state|anywhere in state|राज्य/i.test(clean)) return 'Willing to travel within state';
      if (/anywhere|all india|kahi bhi|कुठेही/i.test(clean)) return 'Willing to relocate anywhere';
      return 'Willing to travel within district';
    }

    if (field === 'employmentPreference') {
      if (/both|either|dono|काहीही/i.test(clean)) return 'Either';
      if (/self|business|dukaan|shop|enterprise|vyavasay|उद्योग|स्वरोजगार|व्यवसाय/i.test(clean)) return 'Self-employment';
      if (/job|salary|naukri|service|काम|नोकरी/i.test(clean)) return 'Job';
      return 'Either';
    }

    return clean;
  }

  async processMessage(params: {
    beneficiaryId?: string;
    language: SupportedLanguage;
    message: string;
    currentState?: { stepIndex?: number; profile?: Record<string, any> };
  }) {
    const { language = 'English', message, currentState } = params;
    let stepIndex = currentState?.stepIndex ?? 0;
    const profile: Record<string, any> = { ...(currentState?.profile || {}) };
    profile.language = language;

    if (stepIndex < STEPS.length) {
      const currentStep = STEPS[stepIndex];
      const extractedValue = this.extractFieldFromUtterance(currentStep.field, message, language);

      if (currentStep.field === 'location' && typeof extractedValue === 'object' && extractedValue !== null) {
        profile.state = extractedValue.state;
        profile.district = extractedValue.district;
      } else {
        profile[currentStep.field] = extractedValue;
      }

      stepIndex += 1;
    }

    const nextPrompt = this.getPromptForStep(stepIndex, language);
    let createdBeneficiary = null;
    let recommendationsData = null;

    if (nextPrompt.isComplete || stepIndex >= STEPS.length) {
      // Save or update beneficiary in DB
      const safeData = {
        name: profile.name || 'Beneficiary',
        phone: profile.phone || '',
        language: language,
        state: profile.state || 'Maharashtra',
        district: profile.district || 'Pune',
        education: profile.education || '10th Pass',
        currentOccupation: profile.currentOccupation || 'Daily Worker',
        interests: profile.interests || 'Skill Training',
        mobility: profile.mobility || 'Willing to travel within district',
        employmentPreference: profile.employmentPreference || 'Either',
        category: profile.category || 'SC',
        gender: profile.gender || 'Female',
        annualIncomeTier: profile.annualIncomeTier || '< 1 Lakh',
        conversationState: { stepIndex, isComplete: true }
      };

      if (params.beneficiaryId) {
        const [updated] = await db.update(beneficiaries)
          .set(safeData)
          .where(eq(beneficiaries.id, params.beneficiaryId))
          .returning();
        createdBeneficiary = updated;
      } else {
        const [inserted] = await db.insert(beneficiaries).values(safeData).returning();
        createdBeneficiary = inserted;
      }

      // Generate recommendations
      if (createdBeneficiary) {
        recommendationsData = await recommendationService.generateRecommendationsForBeneficiary(createdBeneficiary.id);
      }
    }

    return {
      stepIndex,
      nextPrompt: nextPrompt.question,
      isComplete: nextPrompt.isComplete,
      updatedProfile: profile,
      beneficiary: createdBeneficiary,
      recommendations: recommendationsData
    };
  }
}

export const conversationService = new ConversationService();
