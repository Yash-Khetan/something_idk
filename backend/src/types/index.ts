import { z } from 'zod';

export const createBeneficiarySchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().optional(),
  language: z.string().min(1, "Language is required"),
  state: z.string().optional(),
  district: z.string().optional(),
  education: z.string().optional(),
  currentOccupation: z.string().optional(),
  interests: z.string().optional(),
  mobility: z.string().optional(),
  employmentPreference: z.string().optional(),
  category: z.string().optional(),
  gender: z.string().optional(),
  annualIncomeTier: z.string().optional(),
  conversationState: z.record(z.any()).optional(),
  notes: z.string().optional(),
});

export type CreateBeneficiaryInput = z.infer<typeof createBeneficiarySchema>;

export const conversationMessageSchema = z.object({
  beneficiaryId: z.string().optional(),
  language: z.enum(['English', 'Hindi', 'Marathi']).default('English'),
  message: z.string().min(1, "Message is required"),
  currentState: z.record(z.any()).optional(),
  extractedProfile: z.record(z.any()).optional(),
});

export type ConversationMessageInput = z.infer<typeof conversationMessageSchema>;

export const whatsappSimulationSchema = z.object({
  fromPhone: z.string().default('919876543210'),
  messageType: z.enum(['text', 'audio', 'voice_note']).default('text'),
  text: z.string().optional(),
  audioUrl: z.string().optional(),
  language: z.enum(['English', 'Hindi', 'Marathi']).default('English'),
});

export type WhatsAppSimulationInput = z.infer<typeof whatsappSimulationSchema>;

export const opportunityFilterSchema = z.object({
  state: z.string().optional(),
  district: z.string().optional(),
  sector: z.string().optional(),
  type: z.enum(['all', 'job', 'training', 'self_employment', 'pm_ajay_grant']).optional(),
  search: z.string().optional(),
});

export type OpportunityFilterInput = z.infer<typeof opportunityFilterSchema>;

