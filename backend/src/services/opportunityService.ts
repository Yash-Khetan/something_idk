import { db } from '../db';
import { opportunities, trainingCenters, nsqfCourses } from '../db/schema';
import { eq, or, ilike, and } from 'drizzle-orm';
import { OpportunityFilterInput } from '../types';

export class OpportunityService {
  async getOpportunities(filters: OpportunityFilterInput) {
    const conditions = [];

    if (filters.state && filters.state !== 'All') {
      conditions.push(or(eq(opportunities.state, filters.state), eq(opportunities.state, 'National')));
    }

    if (filters.district && filters.district !== 'All') {
      conditions.push(or(eq(opportunities.district, filters.district), eq(opportunities.district, 'All Districts')));
    }

    if (filters.sector && filters.sector !== 'All') {
      conditions.push(or(eq(opportunities.sector, filters.sector), eq(opportunities.sector, 'All Sectors')));
    }

    if (filters.type && filters.type !== 'all') {
      conditions.push(eq(opportunities.type, filters.type));
    }

    let query = db.select().from(opportunities);
    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as any;
    }

    const results = await query;

    if (filters.search && filters.search.trim()) {
      const q = filters.search.toLowerCase();
      return results.filter(item =>
        item.title.toLowerCase().includes(q) ||
        (item.titleHi && item.titleHi.includes(q)) ||
        (item.titleMr && item.titleMr.includes(q)) ||
        item.description.toLowerCase().includes(q) ||
        item.sector.toLowerCase().includes(q) ||
        item.organization.toLowerCase().includes(q)
      );
    }

    return results;
  }

  async getTrainingCenters(filters: { state?: string; district?: string; courseQpCode?: string }) {
    let query = db.select().from(trainingCenters);
    const conditions = [];

    if (filters.state && filters.state !== 'All') {
      conditions.push(eq(trainingCenters.state, filters.state));
    }

    if (filters.district && filters.district !== 'All') {
      conditions.push(eq(trainingCenters.district, filters.district));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as any;
    }

    const centers = await query;

    if (filters.courseQpCode) {
      return centers.filter(c => c.affiliatedCourses.includes(filters.courseQpCode!));
    }

    return centers;
  }

  async getAllNsqfCourses() {
    return db.select().from(nsqfCourses);
  }
}

export const opportunityService = new OpportunityService();
