import { db } from './index';
import { beneficiaries, nsqfCourses, trainingCenters, opportunities } from './schema';

export const verifiedNsqfCourses = [
  {
    qpCode: 'AMH/Q0301',
    title: 'Sewing Machine Operator (Apparel & Garments)',
    titleHi: 'सिलाई मशीन ऑपरेटर (परिधान एवं वस्त्र)',
    titleMr: 'शिलाई मशीन ऑपरेटर (वस्त्रोद्योग व गारमेंट्स)',
    sector: 'Apparel',
    nsqfLevel: 4,
    minEducation: '8th Pass',
    durationHours: 300,
    description: 'Operates commercial sewing machines to stitch fabric components into finished garments as per technical specifications.',
    descriptionHi: 'तकनीकी विनिर्देशों के अनुसार कपड़ों के घटकों को तैयार वस्त्रों में सिलने के लिए वाणिज्यिक सिलाई मशीनों का संचालन करता है।',
    descriptionMr: 'विविध कपड्यांचे भाग व्यावसायिक शिलाई मशीनवर जोडून तयार कपडे शिवण्याचे काम पार पाडतो.',
    keySkills: 'Garment construction, Lockstitch machine operation, Overlock stitching, Seam finishing, Quality inspection',
    wageEstimate: '₹12,000 - ₹16,000 / month',
    selfEmploymentPotential: 'High (Home tailoring shop, boutique, garment alteration micro-unit)',
    pmAjayGrantDetails: '100% free PM-AJAY training. Eligible for ₹50,000 capital subsidy for industrial sewing machine & startup cloth inventory.',
    careerProgression: 'Sewing Machine Operator → Line Supervisor → Sampling Tailor → Boutique Owner / Master Tailor'
  },
  {
    qpCode: 'ELE/Q5901',
    title: 'Solar PV Installer (Suryamitra Technician)',
    titleHi: 'सोलर पीवी इंस्टॉलर (सूर्यमित्र तकनीशियन)',
    titleMr: 'सोलर पीव्ही इन्स्टॉलर (सूर्यमित्र तंत्रज्ञ)',
    sector: 'Electronics',
    nsqfLevel: 4,
    minEducation: '10th Pass',
    durationHours: 350,
    description: 'Installs, tests, and commissions rooftop and ground-mounted solar photovoltaic panels, inverters, and battery storage units.',
    descriptionHi: 'रूफटॉप और ग्राउंड-माउंटेड सोलर पैनल, इन्वर्टर और बैटरी स्टोरेज यूनिट स्थापित, परीक्षण और चालू करता है।',
    descriptionMr: 'घरांच्या छतावर व जमिनीवर सौर ऊर्जा पॅनेल्स, इन्व्हर्टर आणि बॅटरीची जोडणी व देखभाल करतो.',
    keySkills: 'Solar panel mounting, DC wiring, Inverter setup, Earthing & lightning protection, Grid sync testing',
    wageEstimate: '₹15,000 - ₹22,000 / month',
    selfEmploymentPotential: 'High (Rooftop solar installation agency, maintenance & cleaning contractor)',
    pmAjayGrantDetails: '100% grant funded PM-AJAY course. Eligible for ₹50,000 grant subsidy + NSFDC term loan for solar installation toolkit.',
    careerProgression: 'Solar Technician → Site Lead Engineer → Solar EPC Contractor / Renewable Energy Entrepreneur'
  },
  {
    qpCode: 'PSC/Q0104',
    title: 'General Plumber (Sanitation & Water Systems)',
    titleHi: 'जनरल प्लंबर (स्वच्छता एवं जल प्रणाली)',
    titleMr: 'जनरल प्लंबर (पाणीपुरवठा व स्वच्छता तंत्रज्ञ)',
    sector: 'Plumbing',
    nsqfLevel: 3,
    minEducation: '8th Pass',
    durationHours: 360,
    description: 'Installs, repairs, and maintains pipes, valves, sanitary fixtures, and drainage systems in residential and commercial buildings.',
    descriptionHi: 'आवासीय और वाणिज्यिक भवनों में पाइप, वाल्व, सेनेटरी जुड़नार और जल निकासी प्रणालियों की मरम्मत और रखरखाव करता है।',
    descriptionMr: 'घरे आणि व्यावसायिक इमारतींमध्ये पाईपलाईन, नळ, ड्रेनेज व सॅनिटरी फिटिंग्ज बसवणे व दुरुस्त करणे.',
    keySkills: 'PVC/GI pipe cutting & jointing, Fixture installation, Leakage diagnosis, Water pump hookup, Drainage testing',
    wageEstimate: '₹14,000 - ₹20,000 / month',
    selfEmploymentPotential: 'Very High (Independent plumbing contractor, sanitary hardware service provider)',
    pmAjayGrantDetails: 'Free PM-AJAY residential training. Eligible for ₹50,000 capital subsidy for power tools, pipe threading kits, and testing instruments.',
    careerProgression: 'Assistant Plumber → Master Plumber → Plumbing Supervisor → Sanitation Contractor'
  },
  {
    qpCode: 'ASC/Q1411',
    title: 'Two-Wheeler Service Technician',
    titleHi: 'दोपहिया वाहन सर्विस तकनीशियन',
    titleMr: 'दुचाकी सर्व्हिस तंत्रज्ञ (मोटारसायकल मेकॅनिक)',
    sector: 'Automotive',
    nsqfLevel: 4,
    minEducation: '10th Pass',
    durationHours: 400,
    description: 'Diagnoses, repairs, and services mechanical, electrical, and electronic subsystems of motorcycles, scooters, and electric two-wheelers.',
    descriptionHi: 'मोटरसाइकिल, स्कूटर और इलेक्ट्रिक दोपहिया वाहनों के यांत्रिक और विद्युत उप-प्रणालियों का निदान और मरम्मत करता है।',
    descriptionMr: 'मोटारसायकल, स्कूटर आणि ई-बाईक्सची देखभाल, इंजिन ट्युनिंग, ब्रेक आणि इलेक्ट्रिकल दुरुस्ती करतो.',
    keySkills: 'Engine overhaul, Fuel injection diagnostics, EV battery maintenance, Brake servicing, Suspension tuning',
    wageEstimate: '₹14,000 - ₹22,000 / month',
    selfEmploymentPotential: 'Very High (Two-wheeler garage, EV service center, spare parts retail shop)',
    pmAjayGrantDetails: '100% PM-AJAY subsidized training. Up to ₹50,000 capital grant + ₹1,00,000 NSFDC loan for garage diagnostic tools & ramp equipment.',
    careerProgression: 'Service Mechanic → Workshop Supervisor → Dealership Master Technician → Independent Garage Owner'
  },
  {
    qpCode: 'SSC/Q2212',
    title: 'Domestic Data Entry Operator',
    titleHi: 'घरेलू डेटा एंट्री ऑपरेटर',
    titleMr: 'डोमेस्टिक डेटा एंट्री ऑपरेटर (संगणक डेटा नोंदणी)',
    sector: 'IT-ITeS',
    nsqfLevel: 4,
    minEducation: '10th Pass',
    durationHours: 400,
    description: 'Maintains databases, transcribes digital and paper records, enters customer details, and generates business spreadsheets accurately.',
    descriptionHi: 'डेटाबेस का रखरखाव करता है, डिजिटल रिकॉर्ड प्रविष्ट करता है और सटीक व्यावसायिक स्प्रेडशीट तैयार करता है।',
    descriptionMr: 'संगणकावर डेटा नोंदणी करणे, सरकारी व व्यावसायिक कागदपत्रांचे डिजिटलायझेशन आणि स्प्रेडशीट तयार करणे.',
    keySkills: 'Touch typing (35+ wpm), MS Office & Google Workspace, Data validation, Document scanning, MIS reporting',
    wageEstimate: '₹13,000 - ₹18,000 / month',
    selfEmploymentPotential: 'Medium to High (Common Service Centre / CSC operator, cyber café, freelance data processing unit)',
    pmAjayGrantDetails: 'Free PM-AJAY IT skills course. Grant subsidy of ₹50,000 for purchasing laptop/desktop, scanner-printer, and biometric device.',
    careerProgression: 'Data Entry Operator → Senior MIS Executive → Office Administrator → IT Support Specialist'
  },
  {
    qpCode: 'HSS/Q5101',
    title: 'General Duty Assistant (Healthcare Nursing Aide)',
    titleHi: 'जनरल ड्यूटी असिस्टेंट (स्वास्थ्य सेवा नर्सिंग सहायक)',
    titleMr: 'जनरल ड्युटी असिस्टंट (आरोग्य सेवा सहाय्यक)',
    sector: 'Healthcare',
    nsqfLevel: 4,
    minEducation: '10th Pass',
    durationHours: 420,
    description: 'Provides direct patient care, assists doctors and nurses with daily vital checks, patient hygiene, mobility, and hospital housekeeping.',
    descriptionHi: 'रोगियों की सीधी देखभाल करता है, डॉक्टरों और नर्सों की सहायता करता है और रोगी के महत्वपूर्ण संकेतों की जाँच करता है।',
    descriptionMr: 'रुग्णालयात रुग्णांची काळजी घेणे, रक्तदाब/तापमान तपासणे आणि डॉक्टरांना व परिचारिकांना मदत करणे.',
    keySkills: 'Vital signs recording, Patient hygiene & repositioning, First aid & CPR, Infection control, Medication assistance',
    wageEstimate: '₹14,000 - ₹20,000 / month',
    selfEmploymentPotential: 'Medium (Home healthcare agency, elder care service provider, patient attendant cooperative)',
    pmAjayGrantDetails: '100% free government hospital training with clinical internship and stipend under PM-AJAY GIA.',
    careerProgression: 'General Duty Assistant → Senior Patient Care Executive → Hospital Ward Coordinator'
  },
  {
    qpCode: 'AGR/Q1002',
    title: 'Micro Irrigation Technician & Organic Grower',
    titleHi: 'सूक्ष्म सिंचाई तकनीशियन एवं जैविक उत्पादक',
    titleMr: 'सूक्ष्म सिंचन तंत्रज्ञ आणि सेंद्रिय शेती उत्पादक',
    sector: 'Agriculture',
    nsqfLevel: 4,
    minEducation: '10th Pass',
    durationHours: 250,
    description: 'Designs, installs, and manages drip and sprinkler micro-irrigation systems and sustainable organic crop production practices.',
    descriptionHi: 'ड्रिप और स्प्रिंकलर सूक्ष्म सिंचाई प्रणाली और टिकाऊ जैविक फसल उत्पादन का प्रबंधन करता है।',
    descriptionMr: 'ठिबक व तुषार सिंचन यंत्रणेची उभारणी, सेंद्रिय खते व कीटकनाशकांची निर्मिती आणि पीक व्यवस्थापन.',
    keySkills: 'Drip & sprinkler layout, Soil testing, Bio-fertilizer composting, Integrated pest management, Water conservation',
    wageEstimate: '₹13,000 - ₹19,000 / month',
    selfEmploymentPotential: 'Very High (Micro-irrigation service agency, organic vegetable/fruit farming, vermicompost unit)',
    pmAjayGrantDetails: 'Free PM-AJAY Agri-skilling grant. Up to ₹50,000 capital subsidy for setting up drip kits and organic nursery beds.',
    careerProgression: 'Field Technician → Farm Supervisor → Agri-Entrepreneur / FPO Producer Director'
  },
  {
    qpCode: 'CON/Q0602',
    title: 'Assistant Electrician (House Wiring & Power)',
    titleHi: 'सहायक इलेक्ट्रीशियन (गृह वायरिंग एवं विद्युत)',
    titleMr: 'सहाय्यक इलेक्ट्रिशियन (घरगुती वायरिंग व विद्युत उपकरणे)',
    sector: 'Construction',
    nsqfLevel: 3,
    minEducation: '8th Pass',
    durationHours: 350,
    description: 'Installs, connects, tests, and repairs electrical wiring, conduits, switches, distribution boards, and domestic appliances safely.',
    descriptionHi: 'विद्युत वायरिंग, कंड्यूट, स्विच, वितरण बोर्ड और घरेलू उपकरणों को सुरक्षित रूप से स्थापित और मरम्मत करता है।',
    descriptionMr: 'घरे व दुकानांमध्ये विद्युत वायरिंग, एमसीबी बोर्ड, फिटिंग्ज आणि पंखे-उपकरणांची सुरक्षित दुरुस्ती.',
    keySkills: 'Single-phase wiring, Conduit bending & laying, MCB/ELCB installation, Multimeter testing, Electrical safety compliance',
    wageEstimate: '₹14,000 - ₹21,000 / month',
    selfEmploymentPotential: 'Very High (Licensed electrical contractor, appliance repair shop, electrical goods store)',
    pmAjayGrantDetails: '100% free NSQF Level 3 training under PM-AJAY. ₹50,000 subsidy for industrial multimeter, drilling tools, and toolkits.',
    careerProgression: 'Assistant Electrician → Certified Wireman → Electrical Contractor → Maintenance In-charge'
  },
  {
    qpCode: 'FIC/Q5003',
    title: 'Baking Technician & Food Processing Specialist',
    titleHi: 'बेकिंग तकनीशियन एवं खाद्य प्रसंस्करण विशेषज्ञ',
    titleMr: 'बेकिंग तंत्रज्ञ आणि अन्न प्रक्रिया विशेषज्ञ',
    sector: 'Food Processing',
    nsqfLevel: 4,
    minEducation: '10th Pass',
    durationHours: 240,
    description: 'Produces breads, biscuits, cakes, and regional packaged snack foods while maintaining strict FSSAI hygiene and quality standards.',
    descriptionHi: 'FSSAI स्वच्छता और गुणवत्ता मानकों को बनाए रखते हुए ब्रेड, बिस्कुट, केक और क्षेत्रीय स्नैक्स का उत्पादन करता है।',
    descriptionMr: 'ब्रेड, बिस्किटे, केक आणि स्थानिक खाद्यपदार्थांची निर्मिती, पॅकेजिंग आणि अन्न सुरक्षा मानकांचे पालन.',
    keySkills: 'Dough mixing & fermentation, Oven operation & baking curves, Food hygiene & FSSAI standards, Packaging & labeling',
    wageEstimate: '₹12,000 - ₹18,000 / month',
    selfEmploymentPotential: 'Very High (Home bakery, bakery cafe, packaged snacks micro-enterprise)',
    pmAjayGrantDetails: 'PM-AJAY grant funding. ₹50,000 subsidy for commercial baking oven, planetary mixer, and airtight packing machine.',
    careerProgression: 'Bakery Assistant → Head Baker → Food Processing Unit Incharge → Bakery Business Owner'
  },
  {
    qpCode: 'HCS/Q7301',
    title: 'Hand Embroiderer & Traditional Handicrafts Artisan',
    titleHi: 'हस्त कढ़ाई कारीगर एवं पारंपरिक हस्तशिल्प',
    titleMr: 'हात भरतकाम कारागीर आणि पारंपरिक हस्तकला',
    sector: 'Handicrafts',
    nsqfLevel: 4,
    minEducation: 'Below 8th Standard',
    durationHours: 240,
    description: 'Creates exquisite traditional hand embroidery, zari work, chikankari, mirror work, and artisanal fabric embellishments for markets.',
    descriptionHi: 'पारंपरिक हस्त कढ़ाई, जरी का काम, चिकनकारी, और वस्त्र सज्जा का निर्माण करता है।',
    descriptionMr: 'पारंपरिक हात भरतकाम, जरी काम, आरसा काम आणि कापडी हस्तकला उत्पादने तयार करतो.',
    keySkills: 'Tracing motifs, Zari & thread work, Mirror & bead stitching, Frame mounting, Finishing & price estimation',
    wageEstimate: '₹11,000 - ₹16,000 / month',
    selfEmploymentPotential: 'Very High (Self-help group enterprise, artisanal export supplier, boutique partner)',
    pmAjayGrantDetails: 'Special 15% PM-AJAY SC Women allocation. ₹50,000 capital subsidy for embroidery frames, raw silk/zari material, and exhibition stall setup.',
    careerProgression: 'Artisan Embroiderer → Master Craftsman → Self Help Group Cluster Leader → Handicraft Exporter'
  }
];

export const verifiedTrainingCenters = [
  {
    name: 'Pradhan Mantri Kaushal Kendra (PMKK) - Pune District',
    state: 'Maharashtra',
    district: 'Pune',
    address: 'Plot 42, Shivajinagar Industrial Area, Near Station, Pune, Maharashtra 411005',
    contactPhone: '+91 20 2553 4401',
    contactEmail: 'pmkk.pune@pmjay-skills.gov.in',
    affiliatedCourses: 'AMH/Q0301, ELE/Q5901, ASC/Q1411, SSC/Q2212, CON/Q0602',
    isPmAajayEmpanelled: true,
    isDemo: false
  },
  {
    name: 'Government ITI & PM-AJAY Skill Hub - Varanasi',
    state: 'Uttar Pradesh',
    district: 'Varanasi',
    address: 'Chowkaghat Industrial Estate, Varanasi, Uttar Pradesh 221002',
    contactPhone: '+91 542 222 6780',
    contactEmail: 'giti.varanasi@pmjay-skills.gov.in',
    affiliatedCourses: 'AMH/Q0301, PSC/Q0104, CON/Q0602, HCS/Q7301, ELE/Q5901',
    isPmAajayEmpanelled: true,
    isDemo: false
  },
  {
    name: 'NSDC Model Skill Centre - Nagpur East',
    state: 'Maharashtra',
    district: 'Nagpur',
    address: 'MIDC Butibori Skill Complex, Nagpur, Maharashtra 441108',
    contactPhone: '+91 712 289 1234',
    contactEmail: 'nagpur.msc@pmjay-skills.gov.in',
    affiliatedCourses: 'ELE/Q5901, ASC/Q1411, AGR/Q1002, FIC/Q5003',
    isPmAajayEmpanelled: true,
    isDemo: false
  },
  {
    name: 'Dr. B.R. Ambedkar Skill & Livelihood Center - Lucknow',
    state: 'Uttar Pradesh',
    district: 'Lucknow',
    address: 'Alambagh Transport Nagar Hub, Lucknow, Uttar Pradesh 226005',
    contactPhone: '+91 522 245 9911',
    contactEmail: 'ambedkar.skills@pmjay-skills.gov.in',
    affiliatedCourses: 'SSC/Q2212, HSS/Q5101, AMH/Q0301, HCS/Q7301',
    isPmAajayEmpanelled: true,
    isDemo: false
  },
  {
    name: 'PM-AJAY Multi-Skill Development Institute - Patna',
    state: 'Bihar',
    district: 'Patna',
    address: 'Digha Ghat Road, Industrial Zone, Patna, Bihar 800011',
    contactPhone: '+91 612 254 7890',
    contactEmail: 'patna.skills@pmjay-skills.gov.in',
    affiliatedCourses: 'PSC/Q0104, CON/Q0602, AGR/Q1002, SSC/Q2212',
    isPmAajayEmpanelled: true,
    isDemo: false
  },
  {
    name: 'District Livelihood Mission Training Centre - Nashik',
    state: 'Maharashtra',
    district: 'Nashik',
    address: 'Ambad MIDC, Near Water Tank, Nashik, Maharashtra 422010',
    contactPhone: '+91 253 238 7766',
    contactEmail: 'nashik.dlm@pmjay-skills.gov.in',
    affiliatedCourses: 'ELE/Q5901, AGR/Q1002, FIC/Q5003, AMH/Q0301',
    isPmAajayEmpanelled: true,
    isDemo: false
  }
];

export const sampleOpportunities = [
  {
    title: 'PM-AJAY Micro-Enterprise Capital Grant Subsidy',
    titleHi: 'पीएम-अजय सूक्ष्म-उद्यम पूंजीगत अनुदान सब्सिडी',
    titleMr: 'पीएम-अजय सूक्ष्म-व्यवसाय भांडवली अनुदान योजना',
    type: 'pm_ajay_grant',
    sector: 'All Sectors',
    organization: 'Ministry of Social Justice & Empowerment, GoI',
    state: 'National',
    district: 'All Districts',
    salaryOrStipend: '₹50,000 Direct Grant Subsidy + NSFDC Loan',
    requiredEducation: 'Any qualification / 8th Pass preferred',
    requiredSkills: 'NSQF certificate or prior trade experience',
    description: 'Government non-repayable grant of 50% project cost (up to ₹50,000) for SC beneficiaries setting up individual micro-enterprises (tailoring shop, electrical repair, solar installation, mobile repair, food cart).',
    descriptionHi: 'अनुसूचित जाति के लाभार्थियों को व्यक्तिगत सूक्ष्म व्यवसाय शुरू करने के लिए 50% परियोजना लागत (₹50,000 तक) का गैर-वापसी योग्य सरकारी अनुदान।',
    descriptionMr: 'अनुसूचित जातीच्या लाभार्थ्यांना स्वतःचा सूक्ष्म व्यवसाय सुरू करण्यासाठी ५०% प्रकल्प खर्च (₹५०,००० पर्यंत) सरकारी बिनपरतावा अनुदान.',
    contactInfo: 'District Social Welfare Officer (DSWO) or PM-AJAY Portal',
    isDemo: false
  },
  {
    title: 'Solar Rooftop Installation Technician (Wage Employment)',
    titleHi: 'सोलर रूफटॉप इंस्टॉलेशन तकनीशियन (वेतन रोजगार)',
    titleMr: 'सोलर रूफटॉप इन्स्टॉलेशन तंत्रज्ञ (पगाराची नोकरी)',
    type: 'job',
    sector: 'Electronics',
    organization: 'Tata Power Solar / Green Energy Empanelled Partner',
    state: 'Maharashtra',
    district: 'Pune',
    salaryOrStipend: '₹18,000 - ₹24,000 / month + PF + ESI',
    requiredEducation: '10th Pass / ITI Electrical',
    requiredSkills: 'Solar panel mounting, DC wiring, basic electrical safety',
    description: 'Full-time field technician position installing commercial & residential rooftop solar arrays across Pune district.',
    descriptionHi: 'पुणे जिले में वाणिज्यिक और आवासीय सोलर पैनल स्थापित करने के लिए पूर्णकालिक तकनीशियन पद।',
    descriptionMr: 'पुणे जिल्ह्यात निवासी व व्यावसायिक इमारतींवर सोलर पॅनेल बसवण्यासाठी पूर्णवेळ नोकरी.',
    contactInfo: 'Pune Solar Hub: +91 20 6677 8899',
    isDemo: true
  },
  {
    title: 'Garment Sewing Quality Checker & Line Operator',
    titleHi: 'परिधान सिलाई क्वालिटी चेकर एवं लाइन ऑपरेटर',
    titleMr: 'गारमेंट शिलाई क्वालिटी चेकर व ऑपरेटर',
    type: 'job',
    sector: 'Apparel',
    organization: 'Shahi Exports / Raymond Apparel Cluster',
    state: 'Uttar Pradesh',
    district: 'Varanasi',
    salaryOrStipend: '₹14,500 - ₹17,000 / month + Attendance Bonus',
    requiredEducation: '8th Pass',
    requiredSkills: 'Single needle lockstitch, fabric measurement, defect checking',
    description: 'Apparel manufacturing unit looking for trained machine operators. Training completion certificate preferred.',
    descriptionHi: 'वस्त्र निर्माण इकाई को प्रशिक्षित सिलाई मशीन ऑपरेटरों की आवश्यकता है।',
    descriptionMr: 'वस्त्रोद्योग कारखान्यासाठी प्रशिक्षित शिलाई मशीन ऑपरेटर व क्वालिटी तपासनीस हवे आहेत.',
    contactInfo: 'Varanasi Textile Park HR: +91 542 277 4411',
    isDemo: true
  },
  {
    title: 'Automotive Multi-Brand Two-Wheeler Service Unit (Self-Employment)',
    titleHi: 'मल्टी-ब्रांड दोपहिया सर्विस यूनिट (स्व-रोजगार)',
    titleMr: 'मल्टी-ब्रँड दुचाकी सर्व्हिस सेंटर (स्वयंरोजगार)',
    type: 'self_employment',
    sector: 'Automotive',
    organization: 'PM-AJAY Livelihood Project + Castrol Auto Service Scheme',
    state: 'Maharashtra',
    district: 'Nagpur',
    salaryOrStipend: '₹25,000 - ₹40,000 estimated net monthly income',
    requiredEducation: '10th Pass',
    requiredSkills: 'Two-wheeler engine repair, electrical troubleshooting, oil change',
    description: 'Turnkey self-employment package: ₹50,000 PM-AJAY capital subsidy + ₹1,00,000 NSFDC subsidized loan for hydraulic ramp, compressor, and diagnostic tools.',
    descriptionHi: '₹50,000 पीएम-अजय सब्सिडी और ₹1,00,000 रियायती ऋण के साथ दोपहिया सर्विस वर्कशॉप शुरू करें।',
    descriptionMr: '₹५०,००० सरकारी अनुदान आणि ₹१,००,००० सवलतीच्या कर्जासह दुचाकी रिपेअरिंग वर्कशॉप सुरू करा.',
    contactInfo: 'Nagpur District Social Welfare Office: 0712-2561234',
    isDemo: true
  },
  {
    title: 'Hospital Ward General Duty Assistant (GDA)',
    titleHi: 'अस्पताल वार्ड जनरल ड्यूटी असिस्टेंट (जीडीए)',
    titleMr: 'रुग्णालय वॉर्ड जनरल ड्युटी असिस्टंट',
    type: 'job',
    sector: 'Healthcare',
    organization: 'Sahyadri Specialty Hospitals / Apollo Clinic Network',
    state: 'Maharashtra',
    district: 'Pune',
    salaryOrStipend: '₹16,000 - ₹20,000 / month + Uniform + Health Insurance',
    requiredEducation: '10th Pass',
    requiredSkills: 'Patient vital signs, basic nursing assistance, infection control',
    description: 'Immediate opening for certified General Duty Assistants for inpatient wards and emergency care assistance.',
    descriptionHi: 'प्रमाणित जीडीए सहाय्यकों के लिए अस्पताल वार्ड में तत्काल भर्ती।',
    descriptionMr: 'रुग्णालय वॉर्ड आणि इमर्जन्सी केअरमध्ये रुग्णांच्या देखभालीसाठी तातडीची नोकरी.',
    contactInfo: 'Hospital HR Desk: +91 20 6721 3000',
    isDemo: true
  },
  {
    title: 'Digital Seva Kendra & Cyber Cafe Enterprise',
    titleHi: 'डिजिटल सेवा केंद्र एवं सीएससी उद्यमिता',
    titleMr: 'डिजिटल सेवा केंद्र आणि संगणक व्यवसाय',
    type: 'self_employment',
    sector: 'IT-ITeS',
    organization: 'CSC e-Governance Services + PM-AJAY GIA Linkage',
    state: 'Uttar Pradesh',
    district: 'Lucknow',
    salaryOrStipend: '₹20,000 - ₹35,000 estimated net monthly earnings',
    requiredEducation: '10th / 12th Pass',
    requiredSkills: 'Computer typing, online forms, Aadhaar/Pan card services, printouts',
    description: 'Start your village/ward Digital Seva Kendra with PM-AJAY ₹50,000 computer subsidy + CSC operator license.',
    descriptionHi: '₹50,000 कंप्यूटर सब्सिडी के साथ अपना डिजिटल सेवा केंद्र शुरू करें।',
    descriptionMr: '₹५०,००० संगणक अनुदानासह आपले स्वतःचे ग्राहक सेवा केंद्र सुरू करा.',
    contactInfo: 'Lucknow DSWO Office: 0522-2621000',
    isDemo: true
  }
];

export const sampleBeneficiaries = [
  {
    name: 'Ramesh Kumar',
    phone: '9876543210',
    language: 'Hindi',
    state: 'Uttar Pradesh',
    district: 'Varanasi',
    education: '10th Pass',
    currentOccupation: 'Daily Wage Helper',
    interests: 'Electrician, Solar Panel Technician',
    mobility: 'Willing to travel within state',
    employmentPreference: 'Job',
    category: 'SC',
    gender: 'Male',
    annualIncomeTier: '< 1 Lakh'
  },
  {
    name: 'Sunita Devi',
    phone: '9876543211',
    language: 'Hindi',
    state: 'Bihar',
    district: 'Patna',
    education: '8th Pass',
    currentOccupation: 'Homemaker',
    interests: 'Tailoring, Garment Stitching, Handicrafts',
    mobility: 'Cannot travel far',
    employmentPreference: 'Self-employment',
    category: 'SC',
    gender: 'Female',
    annualIncomeTier: '< 1 Lakh'
  },
  {
    name: 'Aniket Jadhav',
    phone: '9876543212',
    language: 'Marathi',
    state: 'Maharashtra',
    district: 'Pune',
    education: '10th Pass',
    currentOccupation: 'Unemployed Youth',
    interests: 'Bike Repair, Two-Wheeler Mechanic, Solar',
    mobility: 'Willing to travel within district',
    employmentPreference: 'Either',
    category: 'SC',
    gender: 'Male',
    annualIncomeTier: '1-2.5 Lakhs'
  }
];

const seed = async () => {
  console.log('Seeding PM-AJAY NSQF database...');

  // 1. Seed NSQF Courses
  console.log('Upserting verified NSQF courses...');
  for (const course of verifiedNsqfCourses) {
    try {
      await db.insert(nsqfCourses).values(course).onConflictDoNothing();
    } catch (e) {
      console.warn(`Could not insert course ${course.qpCode}:`, e);
    }
  }

  // 2. Seed Training Centers
  console.log('Upserting verified Training Centers...');
  for (const center of verifiedTrainingCenters) {
    try {
      await db.insert(trainingCenters).values(center);
    } catch (e) {
      console.warn(`Could not insert center ${center.name}:`, e);
    }
  }

  // 3. Seed Opportunities
  console.log('Upserting sample and verified Opportunities...');
  for (const opp of sampleOpportunities) {
    try {
      await db.insert(opportunities).values(opp);
    } catch (e) {
      console.warn(`Could not insert opportunity ${opp.title}:`, e);
    }
  }

  // 4. Seed Beneficiaries
  console.log('Upserting sample Beneficiaries...');
  for (const b of sampleBeneficiaries) {
    try {
      await db.insert(beneficiaries).values(b);
    } catch (e) {
      console.warn(`Could not insert beneficiary ${b.name}:`, e);
    }
  }

  console.log('Database seeded successfully with verified NSQF & PM-AJAY GIA data!');
};

seed().catch((err) => {
  console.error('Seeding failed!', err);
  process.exit(1);
});
