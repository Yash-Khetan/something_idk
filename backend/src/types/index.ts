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
});

export type CreateBeneficiaryInput = z.infer<typeof createBeneficiarySchema>;
