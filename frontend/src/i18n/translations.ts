export type SupportedLanguage = 'English' | 'Hindi' | 'Marathi';

export interface FrontendTranslations {
  portalTitle: string;
  portalSubtitle: string;
  navHome: string;
  navVoiceAssistant: string;
  navManualForm: string;
  navOpportunities: string;
  navWhatsApp: string;
  navAdmin: string;
  heroBadge: string;
  heroTitle: string;
  heroDesc: string;
  btnStartVoice: string;
  btnStartForm: string;
  btnWhatsAppBot: string;
  btnListenAudio: string;
  btnStopAudio: string;
  howItWorksTitle: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  pmAjayHighlightTitle: string;
  pmAjayHighlightDesc: string;
  grantSubsidyPill: string;
  freeTrainingPill: string;
  nsfdcLoanPill: string;
  voiceAssistantTitle: string;
  voiceAssistantSubtitle: string;
  micClickToSpeak: string;
  micListening: string;
  micProcessing: string;
  typeMessagePlaceholder: string;
  btnSend: string;
  btnNext: string;
  btnSkip: string;
  liveProfileTitle: string;
  generatingRecommendations: string;
  recDashboardTitle: string;
  matchScore: string;
  skillGapTitle: string;
  wagePathwayTitle: string;
  selfEmploymentPathwayTitle: string;
  whyMatchTitle: string;
  trainingCentersTitle: string;
  localJobsTitle: string;
  capitalSubsidyLabel: string;
  freeSkillingLabel: string;
  contactCenter: string;
  viewAllOpportunities: string;
  filterBySector: string;
  filterByState: string;
  filterByType: string;
  verifiedPartner: string;
  demoOpportunity: string;
}

export const frontendTranslations: Record<SupportedLanguage, FrontendTranslations> = {
  English: {
    portalTitle: "PM-AJAY Livelihood Assistant",
    portalSubtitle: "Pradhan Mantri Anusuchit Jaati Abhyuday Yojana",
    navHome: "Home",
    navVoiceAssistant: "Voice Assistant 🎙️",
    navManualForm: "Form 📝",
    navOpportunities: "Opportunities 💼",
    navWhatsApp: "WhatsApp Bot 💬",
    navAdmin: "Dashboard 📊",
    heroBadge: "Official NSQF & PM-AJAY GIA Skilling Portal",
    heroTitle: "Empowering Livelihoods Through Voice & Verified Skills",
    heroDesc: "Speak in your own language (Hindi, Marathi, or English) to discover 100% free government-sponsored NSQF certified training, ₹50,000 enterprise grant subsidies, and local jobs.",
    btnStartVoice: "Talk to Voice Assistant 🎙️",
    btnStartForm: "Fill Simple Form 📝",
    btnWhatsAppBot: "WhatsApp Voice Note 💬",
    btnListenAudio: "Listen in Voice 🔊",
    btnStopAudio: "Stop Voice ⏹️",
    howItWorksTitle: "How PM-AJAY Livelihood Assistant Works",
    step1Title: "1. Speak Naturally in Regional Language",
    step1Desc: "Use real-time voice in Hindi, Marathi, or English to share your background, skills, and goals without typing.",
    step2Title: "2. NSQF & Skill-Gap Analysis",
    step2Desc: "Our AI matches your profile with official National Skill Qualification Framework (NSQF) courses and identifies exact skill gaps.",
    step3Title: "3. Direct Grant & Job Pathways",
    step3Desc: "Get connected with empanelled training centers, ₹50,000 PM-AJAY GIA startup capital subsidies, and local jobs.",
    pmAjayHighlightTitle: "Key PM-AJAY Grants-in-Aid (GIA) Benefits",
    pmAjayHighlightDesc: "Under the Ministry of Social Justice & Empowerment, PM-AJAY empowers Scheduled Caste beneficiaries with end-to-end livelihood support.",
    grantSubsidyPill: "₹50,000 Capital Subsidy (Non-repayable Grant)",
    freeTrainingPill: "100% Free NSQF Skilling + Boarding Allowance",
    nsfdcLoanPill: "4%-6% Subsidized NSFDC / NBCFDC Credit Linkage",
    voiceAssistantTitle: "Voice-First Livelihood Profiler",
    voiceAssistantSubtitle: "Press the microphone and speak freely in English, Hindi, or Marathi.",
    micClickToSpeak: "Tap to Speak",
    micListening: "Listening... Speak now",
    micProcessing: "Analyzing your voice...",
    typeMessagePlaceholder: "Or type your response here...",
    btnSend: "Send",
    btnNext: "Next Question",
    btnSkip: "Skip / Continue",
    liveProfileTitle: "Live Extracted Profile",
    generatingRecommendations: "Matching official NSQF courses and grant opportunities...",
    recDashboardTitle: "Your Personalized PM-AJAY Livelihood Roadmap",
    matchScore: "Match Score",
    skillGapTitle: "Skill Gap & Bridge Training Required",
    wagePathwayTitle: "Wage Employment Pathway",
    selfEmploymentPathwayTitle: "PM-AJAY Self-Employment & Grant Pathway",
    whyMatchTitle: "Why This Recommendation Matches You",
    trainingCentersTitle: "Empanelled PM-AJAY / NSDC Training Centres Near You",
    localJobsTitle: "Local Wage Jobs & Micro-Enterprise Grants",
    capitalSubsidyLabel: "PM-AJAY Capital Subsidy",
    freeSkillingLabel: "Government Funded Skilling",
    contactCenter: "Contact Center",
    viewAllOpportunities: "Explore All Opportunities",
    filterBySector: "Filter by Sector",
    filterByState: "Filter by State",
    filterByType: "Filter by Type",
    verifiedPartner: "Verified Official Scheme / Partner",
    demoOpportunity: "Demo / Prototype Opportunity"
  },
  Hindi: {
    portalTitle: "पीएम-अजय आजीविका सहायक",
    portalSubtitle: "प्रधानमंत्री अनुसूचित जाति अभ्युदय योजना (PM-AJAY)",
    navHome: "मुख्य पृष्ठ",
    navVoiceAssistant: "वॉइस सहायक 🎙️",
    navManualForm: "फ़ॉर्म 📝",
    navOpportunities: "अवसर 💼",
    navWhatsApp: "व्हाट्सएप बॉट 💬",
    navAdmin: "डैशबोर्ड 📊",
    heroBadge: "आधिकारिक NSQF एवं पीएम-अजय कौशल व अनुदान पोर्टल",
    heroTitle: "आवाज से पाएं सरकारी कौशल, ₹50,000 अनुदान और रोजगार",
    heroDesc: "अपनी मातृभाषा (हिंदी, मराठी या अंग्रेजी) में बोलकर 100% निःशुल्क सरकारी NSQF प्रशिक्षण, ₹50,000 तक की उद्यम अनुदान सब्सिडी और नजदीकी नौकरियां खोजें।",
    btnStartVoice: "वॉइस सहायक से बात करें 🎙️",
    btnStartForm: "सरल फ़ॉर्म भरें 📝",
    btnWhatsAppBot: "व्हाट्सएप वॉइस नोट 💬",
    btnListenAudio: "आवाज में सुनें 🔊",
    btnStopAudio: "आवाज रोकें ⏹️",
    howItWorksTitle: "पीएम-अजय आजीविका सहायक कैसे कार्य करता है",
    step1Title: "१. अपनी भाषा में खुलकर बोलें",
    step1Desc: "हिंदी, मराठी या अंग्रेजी में बिना टाइप किए अपनी शिक्षा, अनुभव और पसंदीदा काम बोलकर बताएं।",
    step2Title: "२. NSQF कौशल और स्किल-गैप मिलान",
    step2Desc: "हमारा एआई आधिकारिक राष्ट्रीय कौशल योग्यता फ्रेमवर्क (NSQF) के अनुसार आपके कौशल अंतर की पहचान करता है।",
    step3Title: "३. सीधा अनुदान और रोजगार का मार्ग",
    step3Desc: "नजदीकी अधिकृत प्रशिक्षण केंद्रों, ₹50,000 पीएम-अजय अनुदान सब्सिडी और नौकरियों से सीधे जुड़ें।",
    pmAjayHighlightTitle: "पीएम-अजय (PM-AJAY) योजना के प्रमुख लाभ",
    pmAjayHighlightDesc: "सामाजिक न्याय और अधिकारिता मंत्रालय द्वारा अनुसूचित जाति के भाई-बहनों के सशक्तिकरण हेतु संपूर्ण सहायता।",
    grantSubsidyPill: "₹50,000 तक की गैर-वापसी योग्य पूंजीगत अनुदान सब्सिडी",
    freeTrainingPill: "100% मुफ्त NSQF प्रशिक्षण + दैनिक भोजन व आवास भत्ता",
    nsfdcLoanPill: "4% से 6% रियायती NSFDC / NBCFDC ऋण लिंकेज",
    voiceAssistantTitle: "वॉइस-फर्स्ट आजीविका सहायक",
    voiceAssistantSubtitle: "माइक बटन दबाएं और हिंदी, मराठी या अंग्रेजी में बोलें।",
    micClickToSpeak: "बोलने के लिए दबाएं",
    micListening: "सुन रहा हूँ... कृपया बोलें",
    micProcessing: "आपकी आवाज प्रोसेस हो रही है...",
    typeMessagePlaceholder: "या यहाँ लिखकर उत्तर दें...",
    btnSend: "भेजें",
    btnNext: "अगला प्रश्न",
    btnSkip: "छोड़ें / आगे बढ़ें",
    liveProfileTitle: "लाइव प्रोफ़ाइल सारांश",
    generatingRecommendations: "NSQF पाठ्यक्रम और सरकारी अनुदान मिलाए जा रहे हैं...",
    recDashboardTitle: "आपकी व्यक्तिगत पीएम-अजय आजीविका योजना",
    matchScore: "मेल स्कोर",
    skillGapTitle: "कौशल अंतर एवं आवश्यक प्रशिक्षण (Skill Gap)",
    wagePathwayTitle: "मासिक वेतन रोजगार मार्ग",
    selfEmploymentPathwayTitle: "पीएम-अजय स्वरोजगार एवं ₹50,000 अनुदान मार्ग",
    whyMatchTitle: "यह विकल्प आपके लिए सर्वोत्तम क्यों है",
    trainingCentersTitle: "आपके नजदीकी पीएम-अजय / NSDC अधिकृत प्रशिक्षण केंद्र",
    localJobsTitle: "स्थानीय नौकरियां एवं सूक्ष्म-व्यवसाय अनुदान",
    capitalSubsidyLabel: "पीएम-अजय पूंजीगत सब्सिडी",
    freeSkillingLabel: "100% सरकारी वित्तपोषित प्रशिक्षण",
    contactCenter: "केंद्र से संपर्क करें",
    viewAllOpportunities: "सभी अवसर देखें",
    filterBySector: "क्षेत्र (Sector) अनुसार चुनें",
    filterByState: "राज्य अनुसार चुनें",
    filterByType: "प्रकार अनुसार चुनें",
    verifiedPartner: "सत्यापित सरकारी योजना / केंद्र",
    demoOpportunity: "डेमो / प्रोटोटाइप अवसर"
  },
  Marathi: {
    portalTitle: "पीएम-अजय उपजीविका सहाय्यक",
    portalSubtitle: "प्रधानमंत्री अनुसूचित जाती अभ्युदय योजना (PM-AJAY)",
    navHome: "मुख्य पृष्ठ",
    navVoiceAssistant: "व्हॉइस सहाय्यक 🎙️",
    navManualForm: "अर्ज 📝",
    navOpportunities: "संधी 💼",
    navWhatsApp: "व्हॉट्सॲप बॉट 💬",
    navAdmin: "डॅशबोर्ड 📊",
    heroBadge: "अधिकृत NSQF व पीएम-अजय कौशल्य व अनुदान पोर्टल",
    heroTitle: "आपल्या आवाजातून मिळवा मोफत कौशल्य, ₹५०,००० अनुदान आणि नोकरी",
    heroDesc: "आपल्या स्वतःच्या भाषेत (मराठी, हिंदी किंवा इंग्रजी) बोलून १००% मोफत शासकीय NSQF प्रशिक्षण, ₹५०,००० व्यवसाय भांडवली अनुदान आणि स्थानिक रोजगाराच्या संधी शोधा.",
    btnStartVoice: "व्हॉइस सहाय्यकाशी बोला 🎙️",
    btnStartForm: "साधा फॉर्म भरा 📝",
    btnWhatsAppBot: "व्हॉट्सॲप व्हॉइस नोट 💬",
    btnListenAudio: "आवाजात ऐका 🔊",
    btnStopAudio: "आवाज थांबवा ⏹️",
    howItWorksTitle: "पीएम-अजय उपजीविका सहाय्यक कसे काम करतो",
    step1Title: "१. आपल्या भाषेत मोकळेपणाने बोला",
    step1Desc: "मराठी, हिंदी किंवा इंग्रजीत टाईप न करता तुमचे शिक्षण, आवड आणि अनुभव आवाजातून सांगा.",
    step2Title: "२. NSQF कौशल्य व स्किल गॅप विश्लेषण",
    step2Desc: "आमची प्रणाली अधिकृत राष्ट्रीय कौशल्य पात्रता आराखड्यानुसार (NSQF) तुमच्या कौशल्याची पडताळणी करते.",
    step3Title: "३. थेट अनुदान आणि रोजगाराचा मार्ग",
    step3Desc: "जवळचे अधिकृत प्रशिक्षण केंद्र, ₹५०,००० पीएम-अजय भांडवली अनुदान आणि नोकरीच्या संधींशी थेट जोडा.",
    pmAjayHighlightTitle: "पीएम-अजय (PM-AJAY) योजनेचे मुख्य फायदे",
    pmAjayHighlightDesc: "सामाजिक न्याय व सक्षमीकरण मंत्रालयामार्फत अनुसूचित जातीच्या बांधवांसाठी सर्वसमावेशक उपजीविका पाठबळ.",
    grantSubsidyPill: "₹५०,००० पर्यंतचे बिनपरतावा भांडवली अनुदान (PM-AJAY GIA)",
    freeTrainingPill: "१००% मोफत NSQF प्रशिक्षण + दैनिक निवास व भोजन भत्ता",
    nsfdcLoanPill: "४% ते ६% सवलतीच्या दरातील NSFDC / NBCFDC कर्ज",
    voiceAssistantTitle: "व्हॉइस-फर्स्ट उपजीविका सहाय्यक",
    voiceAssistantSubtitle: "माइक बटन दाबा आणि मराठी, हिंदी किंवा इंग्रजीत बोला.",
    micClickToSpeak: "बोलण्यासाठी दाबा",
    micListening: "ऐकत आहे... कृपया बोला",
    micProcessing: "तुमचा आवाज तपासत आहे...",
    typeMessagePlaceholder: "किंवा येथे लिहून उत्तर द्या...",
    btnSend: "पाठवा",
    btnNext: "पुढील प्रश्न",
    btnSkip: "पुढे जा",
    liveProfileTitle: "थेट तयार झालेले प्रोफाइल",
    generatingRecommendations: "NSQF अभ्यासक्रम आणि सरकारी अनुदान शोधत आहे...",
    recDashboardTitle: "तुमची वैयक्तिक पीएम-अजय उपजीविका कृती योजना",
    matchScore: "सुसंगतता स्कोर",
    skillGapTitle: "कौशल्यातील तफावत आणि आवश्यक प्रशिक्षण (Skill Gap)",
    wagePathwayTitle: "मासिक पगाराच्या नोकरीचा मार्ग",
    selfEmploymentPathwayTitle: "पीएम-अजय स्वयंरोजगार व ₹५०,००० अनुदान मार्ग",
    whyMatchTitle: "हा पर्याय तुमच्यासाठी योग्य का आहे",
    trainingCentersTitle: "तुमच्या जवळील पीएम-अजय / NSDC अधिकृत प्रशिक्षण केंद्रे",
    localJobsTitle: "स्थानिक नोकऱ्या आणि सूक्ष्म व्यवसाय अनुदान",
    capitalSubsidyLabel: "पीएम-अजय भांडवली अनुदान",
    freeSkillingLabel: "१००% मोफत शासकीय प्रशिक्षण",
    contactCenter: "केंद्राशी संपर्क साधा",
    viewAllOpportunities: "सर्व संधी पहा",
    filterBySector: "क्षेत्रानुसार निवडा",
    filterByState: "राज्यानुसार निवडा",
    filterByType: "प्रकारानुसार निवडा",
    verifiedPartner: "अधिकृत शासकीय योजना / केंद्र",
    demoOpportunity: "डेमो / प्रोटोटाइप संधी"
  }
};
