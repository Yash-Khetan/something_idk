import { db } from '../db';
import { beneficiaries } from '../db/schema';
import { eq, desc } from 'drizzle-orm';
import { CreateBeneficiaryInput } from '../types';

export class BeneficiaryService {
  async createBeneficiary(data: CreateBeneficiaryInput) {
    const [result] = await db.insert(beneficiaries).values(data).returning();
    return result;
  }

  async getBeneficiaryById(id: string) {
    const [result] = await db.select().from(beneficiaries).where(eq(beneficiaries.id, id));
    return result || null;
  }

  async getAllBeneficiaries() {
    return db.select().from(beneficiaries).orderBy(desc(beneficiaries.createdAt));
  }
}

export const beneficiaryService = new BeneficiaryService();
