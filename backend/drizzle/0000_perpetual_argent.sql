CREATE TABLE "beneficiaries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
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
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
