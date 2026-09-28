import { db } from '../db';
import { beneficiaries, nsqfCourses, trainingCenters, opportunities, recommendations } from '../db/schema';
import { eq } from 'drizzle-orm';
import { translations, SupportedLanguage } from '../i18n/translations';

interface SkillGapItem {
  en: string;
  hi: string;
  mr: string;
}

interface MatchReasonItem {
  en: string;
  hi: string;
  mr: string;
}

export class RecommendationService {
  async generateRecommendationsForBeneficiary(beneficiaryId: string) {
    const [beneficiary] = await db.select().from(beneficiaries).where(eq(beneficiaries.id, beneficiaryId));
    if (!beneficiary) {
      throw new Error(`Beneficiary with ID ${beneficiaryId} not found`);
    }

    // Delete any existing old recommendations for this beneficiary to refresh
    await db.delete(recommendations).where(eq(recommendations.beneficiaryId, beneficiaryId));

    const allCourses = await db.select().from(nsqfCourses);
    const lang = (beneficiary.language as SupportedLanguage) || 'English';

    const scoredCourses = allCourses.map((course) => {
      let score = 50; // base score
      const reasonsEn: string[] = [];
      const reasonsHi: string[] = [];
      const reasonsMr: string[] = [];
      const skillGapsEn: string[] = [];
      const skillGapsHi: string[] = [];
      const skillGapsMr: string[] = [];

      const interestsLower = (beneficiary.interests || '').toLowerCase();
      const occupationLower = (beneficiary.currentOccupation || '').toLowerCase();
      const sectorLower = course.sector.toLowerCase();
      const courseTitleLower = course.title.toLowerCase();

      // Sector-specific keyword matching
      const sectorKeywords: Record<string, string[]> = {
        apparel: ['tailor', 'sew', 'stitching', 'cloth', 'garment', 'fashion', 'सिलाई', 'दर्जी', 'कापड', 'शिलाई'],
        electronics: ['solar', 'electric', 'wire', 'energy', 'battery', 'panel', 'सोलर', 'बिजली', 'सौर ऊर्जा', 'विद्युत'],
        plumbing: ['plumb', 'pipe', 'water', 'tap', 'drain', 'sanitation', 'नल', 'प्लंबर', 'पाणी', 'पाईप'],
        automotive: ['bike', 'motorcycle', 'scooter', 'vehicle', 'mechanic', 'auto', 'garage', 'गाड़ी', 'मोटरसाइकिल', 'मेकैनिक', 'दुचाकी', 'दुरुस्ती'],
        'it-ites': ['computer', 'data', 'typing', 'office', 'excel', 'internet', 'digital', 'कंप्यूटर', 'डेटा', 'टायपिंग', 'संगणक'],
        healthcare: ['nurse', 'hospital', 'patient', 'health', 'medical', 'care', 'डॉक्टर', 'मरीज', 'अस्पताल', 'आरोग्य', 'रुग्णालय'],
        agriculture: ['farm', 'crop', 'irrigation', 'water', 'organic', 'soil', 'कृषि', 'खेती', 'सिंचाई', 'जैविक', 'शेतकरी', 'सिंचन'],
        construction: ['electrician', 'building', 'mason', 'house wiring', 'construction', 'इलेक्ट्रीशियन', 'वायरिंग', 'इलेक्ट्रिशियन'],
        'food processing': ['bakery', 'food', 'baking', 'cake', 'bread', 'cooking', 'बेकरी', 'खाद्य', 'अन्न'],
        handicrafts: ['embroidery', 'handicraft', 'craft', 'artisan', 'zari', 'कढ़ाई', 'हस्तशिल्प', 'जरी', 'भरतकाम', 'हस्तकला']
      };

      const keywords = sectorKeywords[sectorLower] || [];
      const matchedKeyword = keywords.find(kw => interestsLower.includes(kw) || occupationLower.includes(kw));

      if (matchedKeyword) {
        score += 35;
        reasonsEn.push(`Strong alignment with your interest and experience in ${course.sector} and ${matchedKeyword}.`);
        reasonsHi.push(`${course.titleHi || course.title} में आपकी रुचि और अनुभव से उत्तम मेल।`);
        reasonsMr.push(`${course.titleMr || course.title} मधील तुमची आवड आणि कौशल्याशी उत्तम सुसंगत.`);
      } else if (interestsLower.length > 0) {
        score += 10;
        reasonsEn.push(`Broad career suitability based on your profile preferences.`);
        reasonsHi.push(`आपकी प्रोफ़ाइल प्राथमिकताओं के आधार पर उपयुक्त आजीविका विकल्प।`);
        reasonsMr.push(`तुमच्या प्रोफाइल आणि पसंतीनुसार योग्य उपजीविका पर्याय.`);
      }

      // Education Matching
      const edu = beneficiary.education || '';
      if (edu.includes('10th') || edu.includes('12th') || edu.includes('Graduate') || edu.includes('ITI')) {
        score += 10;
        reasonsEn.push(`Your education level (${edu}) meets the NSQF Level ${course.nsqfLevel} entry criteria.`);
        reasonsHi.push(`आपकी शैक्षणिक योग्यता (${edu}) NSQF स्तर ${course.nsqfLevel} के लिए पूर्णतः उपयुक्त है।`);
        reasonsMr.push(`तुमची शैक्षणिक पात्रता (${edu}) NSQF स्तर ${course.nsqfLevel} च्या निकषांनुसार योग्य आहे.`);
      } else if (course.minEducation.includes('8th') || course.minEducation.includes('Below 8th')) {
        score += 10;
        reasonsEn.push(`No formal higher education required (minimum ${course.minEducation}).`);
        reasonsHi.push(`उच्च शिक्षा की अनिवार्यता नहीं है (न्यूनतम ${course.minEducation})।`);
        reasonsMr.push(`उच्च शिक्षणाची सक्ती नाही (किमान ${course.minEducation}).`);
      }

      // Employment Preference Alignment
      const pref = (beneficiary.employmentPreference || 'Either').toLowerCase();
      if (pref.includes('self') || pref.includes('business')) {
        score += 5;
        reasonsEn.push(`Eligible for ₹50,000 PM-AJAY capital subsidy for micro-enterprise setup.`);
        reasonsHi.push(`स्वरोजगार के लिए ₹50,000 की पीएम-अजय पूंजीगत अनुदान सब्सिडी हेतु पात्र।`);
        reasonsMr.push(`स्वतःचा व्यवसाय सुरू करण्यासाठी ₹५०,००० च्या पीएम-अजय अनुदानासाठी पात्र.`);
      } else if (pref.includes('job')) {
        score += 5;
        reasonsEn.push(`High wage employment placement demand with estimated salary of ${course.wageEstimate}.`);
        reasonsHi.push(`उच्च वेतन रोजगार मांग, अनुमानित वेतन: ${course.wageEstimate}।`);
        reasonsMr.push(`चांगल्या पगाराची नोकरी उपलब्ध, अंदाजे वेतन: ${course.wageEstimate}.`);
      }

      // Skill Gaps Calculation
      skillGapsEn.push(`Needs formal ${course.durationHours}-hour NSQF Level ${course.nsqfLevel} practical certification.`);
      skillGapsHi.push(`औपचारिक ${course.durationHours} घंटे का NSQF स्तर ${course.nsqfLevel} व्यावहारिक प्रमाणन आवश्यक।`);
      skillGapsMr.push(`अधिकृत ${course.durationHours} तासांचे NSQF स्तर ${course.nsqfLevel} प्रात्यक्षिक प्रमाणपत्र आवश्यक.`);

      if (course.sector === 'Electronics' || course.sector === 'Construction') {
        skillGapsEn.push('Requires safety protocol compliance, earthing standards, and hazard gear training.');
        skillGapsHi.push('विद्युत सुरक्षा मानक, अर्थिंग और सुरक्षा उपकरणों का प्रशिक्षण आवश्यक।');
        skillGapsMr.push('सुरक्षा नियमावली, अर्थिंग आणि सेफ्टी गियरचे प्रशिक्षण आवश्यक.');
      } else if (course.sector === 'IT-ITeS') {
        skillGapsEn.push('Requires touch typing speed enhancement (30+ WPM) and spreadsheet formulas practice.');
        skillGapsHi.push('टाइपिंग स्पीड (30+ शब्द/मिनट) और स्प्रेडशीट का अभ्यास आवश्यक।');
        skillGapsMr.push('टायपिंग गती वाढवणे (३०+ शब्द/मिनिट) आणि स्प्रेडशीट सूत्रांचा सराव आवश्यक.');
      } else if (course.sector === 'Apparel' || course.sector === 'Handicrafts') {
        skillGapsEn.push('Needs advanced industrial lockstitch and digital measurement precision training.');
        skillGapsHi.push('औद्योगिक सिलाई मशीन और डिजिटल माप सटीकता का प्रशिक्षण आवश्यक।');
        skillGapsMr.push('औद्योगिक शिलाई मशीन आणि अचूक मापांचे प्रगत प्रशिक्षण आवश्यक.');
      } else {
        skillGapsEn.push('Needs digital transactions (UPI/POS), customer handling, and inventory bookkeeping training.');
        skillGapsHi.push('डिजिटल भुगतान (UPI), ग्राहक संवाद और खाता-बही प्रबंधन का प्रशिक्षण।');
        skillGapsMr.push('डिजिटल पेमेंट (UPI), ग्राहक संवाद आणि हिशोब व्यवस्थापनाचे प्रशिक्षण.');
      }

      // Pathways Data
      const wagePathway = {
        entrySalary: course.wageEstimate,
        trainingDuration: `${course.durationHours} Hours (100% Free under PM-AJAY GIA)`,
        placementAssistance: 'Direct placement support with verified regional MSME / industry partners',
        careerLadder: course.careerProgression || 'Entry Assistant → Certified Technician → Team Lead → Workshop Incharge'
      };

      const selfEmploymentPathway = {
        estimatedProjectCost: '₹80,000 - ₹1,20,000',
        pmAjaySubsidy: '₹50,000 Capital Subsidy (Non-repayable Grant under PM-AJAY GIA)',
        nsfdcLoanSupport: 'Subsidized loan at 4% - 6% p.a. from NSFDC / NBCFDC',
        expectedMonthlyNetRevenue: '₹20,000 - ₹38,000 / month',
        businessPotential: course.selfEmploymentPotential
      };

      return {
        course,
        matchScore: Math.min(score, 98),
        matchedReasons: reasonsEn,
        matchedReasonsHi: reasonsHi,
        matchedReasonsMr: reasonsMr,
        skillGaps: skillGapsEn,
        skillGapsHi: skillGapsHi,
        skillGapsMr: skillGapsMr,
        wagePathway,
        selfEmploymentPathway
      };
    });

    // Sort by match score descending and take top 4
    scoredCourses.sort((a, b) => b.matchScore - a.matchScore);
    const topMatches = scoredCourses.slice(0, 4);

    const savedRecs = [];
    for (const match of topMatches) {
      const [inserted] = await db.insert(recommendations).values({
        beneficiaryId: beneficiary.id,
        courseId: match.course.id,
        matchScore: match.matchScore,
        matchedReasons: match.matchedReasons,
        matchedReasonsHi: match.matchedReasonsHi,
        matchedReasonsMr: match.matchedReasonsMr,
        skillGaps: match.skillGaps,
        skillGapsHi: match.skillGapsHi,
        skillGapsMr: match.skillGapsMr,
        wagePathway: match.wagePathway,
        selfEmploymentPathway: match.selfEmploymentPathway
      }).returning();

      savedRecs.push({
        ...inserted,
        course: match.course
      });
    }

    // Also fetch nearby training centers and opportunities
    const nearbyCenters = await db.select().from(trainingCenters);
    nearbyCenters.sort((a, b) => {
      const aMatch = (beneficiary.district && a.district.toLowerCase() === beneficiary.district.toLowerCase()) ? 2 : (beneficiary.state && a.state.toLowerCase() === beneficiary.state.toLowerCase()) ? 1 : 0;
      const bMatch = (beneficiary.district && b.district.toLowerCase() === beneficiary.district.toLowerCase()) ? 2 : (beneficiary.state && b.state.toLowerCase() === beneficiary.state.toLowerCase()) ? 1 : 0;
      return bMatch - aMatch;
    });

    const relevantOpportunities = await db.select().from(opportunities);
    relevantOpportunities.sort((a, b) => {
      const aMatch = (beneficiary.district && a.district.toLowerCase() === beneficiary.district.toLowerCase()) ? 2 : (beneficiary.state && a.state.toLowerCase() === beneficiary.state.toLowerCase()) ? 1 : 0;
      const bMatch = (beneficiary.district && b.district.toLowerCase() === beneficiary.district.toLowerCase()) ? 2 : (beneficiary.state && b.state.toLowerCase() === beneficiary.state.toLowerCase()) ? 1 : 0;
      return bMatch - aMatch;
    });


    return {
      beneficiary,
      recommendations: savedRecs,
      trainingCenters: nearbyCenters,
      opportunities: relevantOpportunities
    };
  }

  async getRecommendationsByBeneficiaryId(beneficiaryId: string) {
    const recList = await db.select().from(recommendations).where(eq(recommendations.beneficiaryId, beneficiaryId));
    if (recList.length === 0) {
      // If no recommendations generated yet, generate them on the fly
      return this.generateRecommendationsForBeneficiary(beneficiaryId);
    }

    const allCourses = await db.select().from(nsqfCourses);
    const courseMap = new Map(allCourses.map(c => [c.id, c]));
    const [beneficiary] = await db.select().from(beneficiaries).where(eq(beneficiaries.id, beneficiaryId));
    const nearbyCenters = await db.select().from(trainingCenters);
    const relevantOpportunities = await db.select().from(opportunities);

    const enrichedRecs = recList.map(rec => ({
      ...rec,
      course: courseMap.get(rec.courseId || '') || null
    })).sort((a, b) => b.matchScore - a.matchScore);

    return {
      beneficiary,
      recommendations: enrichedRecs,
      trainingCenters: nearbyCenters,
      opportunities: relevantOpportunities
    };
  }
}

export const recommendationService = new RecommendationService();
