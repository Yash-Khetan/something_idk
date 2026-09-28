import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

dotenv.config();

const runMigration = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set');
  }
  
  const sql = neon(process.env.DATABASE_URL);

  console.log('Running robust database schema migration...');

  // Create beneficiaries table
  await sql`
    CREATE TABLE IF NOT EXISTS "beneficiaries" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "name" text NOT NULL,
      "phone" text,
      "language" text NOT NULL,
      "state" text,
      "district" text,
      "education" text,
      "current_occupation" text,
      "interests" text,
      "mobility" text,
      "employment_preference" text,
      "category" text DEFAULT 'SC',
      "gender" text,
      "annual_income_tier" text,
      "conversation_state" jsonb,
      "notes" text,
      "created_at" timestamp DEFAULT now() NOT NULL,
      "updated_at" timestamp DEFAULT now() NOT NULL
    );
  `;

  // Add missing columns to beneficiaries if table already existed
  await sql`ALTER TABLE "beneficiaries" ADD COLUMN IF NOT EXISTS "category" text DEFAULT 'SC';`;
  await sql`ALTER TABLE "beneficiaries" ADD COLUMN IF NOT EXISTS "gender" text;`;
  await sql`ALTER TABLE "beneficiaries" ADD COLUMN IF NOT EXISTS "annual_income_tier" text;`;
  await sql`ALTER TABLE "beneficiaries" ADD COLUMN IF NOT EXISTS "conversation_state" jsonb;`;
  await sql`ALTER TABLE "beneficiaries" ADD COLUMN IF NOT EXISTS "notes" text;`;

  // Create nsqf_courses table
  await sql`
    CREATE TABLE IF NOT EXISTS "nsqf_courses" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "qp_code" text NOT NULL UNIQUE,
      "title" text NOT NULL,
      "title_hi" text,
      "title_mr" text,
      "sector" text NOT NULL,
      "nsqf_level" integer NOT NULL,
      "min_education" text NOT NULL,
      "duration_hours" integer NOT NULL,
      "description" text NOT NULL,
      "description_hi" text,
      "description_mr" text,
      "key_skills" text NOT NULL,
      "wage_estimate" text NOT NULL,
      "self_employment_potential" text NOT NULL,
      "pm_ajay_grant_details" text NOT NULL,
      "career_progression" text,
      "created_at" timestamp DEFAULT now() NOT NULL
    );
  `;

  // Create training_centers table
  await sql`
    CREATE TABLE IF NOT EXISTS "training_centers" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "name" text NOT NULL,
      "state" text NOT NULL,
      "district" text NOT NULL,
      "address" text NOT NULL,
      "contact_phone" text NOT NULL,
      "contact_email" text,
      "affiliated_courses" text NOT NULL,
      "is_pm_ajay_empanelled" boolean DEFAULT true NOT NULL,
      "is_demo" boolean DEFAULT false NOT NULL,
      "created_at" timestamp DEFAULT now() NOT NULL
    );
  `;

  // Create opportunities table
  await sql`
    CREATE TABLE IF NOT EXISTS "opportunities" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "title" text NOT NULL,
      "title_hi" text,
      "title_mr" text,
      "type" text NOT NULL,
      "sector" text NOT NULL,
      "organization" text NOT NULL,
      "state" text NOT NULL,
      "district" text NOT NULL,
      "salary_or_stipend" text NOT NULL,
      "required_education" text,
      "required_skills" text,
      "description" text NOT NULL,
      "description_hi" text,
      "description_mr" text,
      "contact_info" text NOT NULL,
      "is_demo" boolean DEFAULT false NOT NULL,
      "created_at" timestamp DEFAULT now() NOT NULL
    );
  `;

  // Create recommendations table
  await sql`
    CREATE TABLE IF NOT EXISTS "recommendations" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "beneficiary_id" uuid REFERENCES "beneficiaries"("id") ON DELETE CASCADE NOT NULL,
      "course_id" uuid REFERENCES "nsqf_courses"("id"),
      "match_score" integer NOT NULL,
      "matched_reasons" jsonb NOT NULL,
      "matched_reasons_hi" jsonb,
      "matched_reasons_mr" jsonb,
      "skill_gaps" jsonb NOT NULL,
      "skill_gaps_hi" jsonb,
      "skill_gaps_mr" jsonb,
      "wage_pathway" jsonb NOT NULL,
      "self_employment_pathway" jsonb NOT NULL,
      "created_at" timestamp DEFAULT now() NOT NULL
    );
  `;

  console.log('Database tables verified and migrated successfully!');
};

runMigration().catch((err) => {
  console.error('Migration failed!', err);
  process.exit(1);
});
