import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const beneficiaries = pgTable('beneficiaries', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  phone: text('phone'),
  language: text('language').notNull(),
  state: text('state'),
  district: text('district'),
  education: text('education'),
  currentOccupation: text('current_occupation'),
  interests: text('interests'),
  mobility: text('mobility'),
  employmentPreference: text('employment_preference'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
