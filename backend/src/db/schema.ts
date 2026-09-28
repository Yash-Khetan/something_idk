import { pgTable, text, timestamp, uuid, integer, boolean, jsonb } from 'drizzle-orm/pg-core';

export const beneficiaries = pgTable('beneficiaries', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  phone: text('phone'),
  language: text('language').notNull(), // 'English' | 'Hindi' | 'Marathi'
  state: text('state'),
  district: text('district'),
  education: text('education'),
  currentOccupation: text('current_occupation'),
  interests: text('interests'),
  mobility: text('mobility'), // 'Cannot travel far' | 'Willing to travel within district' | 'Willing to travel within state' | 'Willing to relocate anywhere'
  employmentPreference: text('employment_preference'), // 'Job' | 'Self-employment' | 'Either'
  category: text('category').default('SC'), // 'SC' | 'ST' | 'OBC' | 'General'
  gender: text('gender'), // 'Female' | 'Male' | 'Other'
  annualIncomeTier: text('annual_income_tier'), // '< 1 Lakh' | '1-2.5 Lakhs' | '> 2.5 Lakhs'
  conversationState: jsonb('conversation_state'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const nsqfCourses = pgTable('nsqf_courses', {
  id: uuid('id').primaryKey().defaultRandom(),
  qpCode: text('qp_code').notNull().unique(), // e.g. 'AMH/Q0301'
  title: text('title').notNull(),
  titleHi: text('title_hi'),
  titleMr: text('title_mr'),
  sector: text('sector').notNull(), // 'Apparel' | 'Electronics' | 'Plumbing' | 'Automotive' | 'IT-ITeS' | 'Healthcare' | 'Agriculture' | 'Construction' | 'Food Processing' | 'Handicrafts'
  nsqfLevel: integer('nsqf_level').notNull(), // 3, 4, 5
  minEducation: text('min_education').notNull(), // 'Below 8th Standard' | '8th Pass' | '10th Pass' | '12th Pass' | 'Graduate'
  durationHours: integer('duration_hours').notNull(),
  description: text('description').notNull(),
  descriptionHi: text('description_hi'),
  descriptionMr: text('description_mr'),
  keySkills: text('key_skills').notNull(), // Comma-separated or description
  wageEstimate: text('wage_estimate').notNull(), // e.g. '₹12,000 - ₹18,000 / month'
  selfEmploymentPotential: text('self_employment_potential').notNull(),
  pmAjayGrantDetails: text('pm_ajay_grant_details').notNull(), // Official PM-AJAY GIA subsidy info
  careerProgression: text('career_progression'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const trainingCenters = pgTable('training_centers', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  state: text('state').notNull(),
  district: text('district').notNull(),
  address: text('address').notNull(),
  contactPhone: text('contact_phone').notNull(),
  contactEmail: text('contact_email'),
  affiliatedCourses: text('affiliated_courses').notNull(), // JSON string or comma-separated QP codes
  isPmAajayEmpanelled: boolean('is_pm_ajay_empanelled').default(true).notNull(),
  isDemo: boolean('is_demo').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const opportunities = pgTable('opportunities', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  titleHi: text('title_hi'),
  titleMr: text('title_mr'),
  type: text('type').notNull(), // 'job' | 'training' | 'self_employment' | 'pm_ajay_grant'
  sector: text('sector').notNull(),
  organization: text('organization').notNull(),
  state: text('state').notNull(),
  district: text('district').notNull(),
  salaryOrStipend: text('salary_or_stipend').notNull(),
  requiredEducation: text('required_education'),
  requiredSkills: text('required_skills'),
  description: text('description').notNull(),
  descriptionHi: text('description_hi'),
  descriptionMr: text('description_mr'),
  contactInfo: text('contact_info').notNull(),
  isDemo: boolean('is_demo').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const recommendations = pgTable('recommendations', {
  id: uuid('id').primaryKey().defaultRandom(),
  beneficiaryId: uuid('beneficiary_id').references(() => beneficiaries.id).notNull(),
  courseId: uuid('course_id').references(() => nsqfCourses.id),
  matchScore: integer('match_score').notNull(), // 0 - 100
  matchedReasons: jsonb('matched_reasons').notNull(), // string[]
  matchedReasonsHi: jsonb('matched_reasons_hi'),
  matchedReasonsMr: jsonb('matched_reasons_mr'),
  skillGaps: jsonb('skill_gaps').notNull(), // string[]
  skillGapsHi: jsonb('skill_gaps_hi'),
  skillGapsMr: jsonb('skill_gaps_mr'),
  wagePathway: jsonb('wage_pathway').notNull(), // { entrySalary, hiringPartners, careerGrowth }
  selfEmploymentPathway: jsonb('self_employment_pathway').notNull(), // { projectCost, pmAjaySubsidy, nsfdcLoan, expectedRevenue }
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

