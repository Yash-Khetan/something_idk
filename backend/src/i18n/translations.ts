export type SupportedLanguage = 'English' | 'Hindi' | 'Marathi';

export interface TranslationDict {
  systemGreeting: string;
  askName: string;
  askLocation: string;
  askEducation: string;
  askOccupation: string;
  askInterests: string;
  askMobility: string;
  askEmploymentPreference: string;
  profileComplete: string;
  whatsAppWelcome: string;
  whatsAppVoicePrompt: string;
  whatsAppRecommendationIntro: string;
  pmAjayGrantHighlight: string;
  freeTrainingWithStipend: string;
  capitalSubsidy: string;
  nsfdcLoanSupport: string;
}

export const translations: Record<SupportedLanguage, TranslationDict> = {
  English: {
    systemGreeting: "Namaste! I am your PM-AJAY Livelihood and Skill Assistant. I will help you find free government-certified NSQF skill training, grants up to ₹50,000, and local employment opportunities. What is your full name?",
    askName: "What is your full name?",
    askLocation: "Which state and district do you live in? (e.g., Maharashtra, Pune or Uttar Pradesh, Varanasi)",
    askEducation: "What is your highest education level? (e.g., 8th pass, 10th pass, 12th pass, ITI/Diploma, Graduate)",
    askOccupation: "What is your current work or occupation? (e.g., Daily wage worker, Homemaker, Student, Farmer, Unemployed)",
    askInterests: "What skills, trades, or work interests you? (e.g., Sewing & Tailoring, Solar Panel Technician, Electrician, Data Entry, Plumbing, Two-Wheeler repair, Healthcare Assistant)",
    askMobility: "How far are you willing to travel for work or training? (Within district, within state, or cannot travel far)",
    askEmploymentPreference: "Do you prefer a monthly salary Job, starting your own Self-Employment business, or Either?",
    profileComplete: "Thank you! I have created your personalized PM-AJAY livelihood profile. Based on your inputs, we have matched high-demand NSQF courses, local training centres, and government grant subsidies.",
    whatsAppWelcome: "Namaste! Welcome to PM-AJAY (Pradhan Mantri Anusuchit Jaati Abhyuday Yojana) Livelihood Helpdesk. You can send a voice note in Hindi, Marathi, or English sharing your name, location, education, and interests.",
    whatsAppVoicePrompt: "Voice note received and processed successfully via Speech-to-Text.",
    whatsAppRecommendationIntro: "Here are your recommended PM-AJAY NSQF certified pathways and grant opportunities:",
    pmAjayGrantHighlight: "Under PM-AJAY Grant-in-Aid, you are eligible for 100% free NSQF skill training + boarding stipend, and up to ₹50,000 capital subsidy for self-employment enterprises.",
    freeTrainingWithStipend: "100% Free Govt-Sponsored NSQF Training + Daily Boarding Stipend",
    capitalSubsidy: "PM-AJAY Capital Grant Subsidy: Up to ₹50,000 (50% of project cost)",
    nsfdcLoanSupport: "NSFDC / NBCFDC Subsidized Credit Linkage at 4% - 6% interest",
  },
  Hindi: {
    systemGreeting: "नमस्ते! मैं आपका पीएम-अजय (PM-AJAY) आजीविका और कौशल सहायक हूँ। मैं आपको सरकारी प्रमाणित NSQF कौशल प्रशिक्षण, ₹50,000 तक की सरकारी अनुदान सब्सिडी और स्थानीय रोजगार के अवसर खोजने में मदद करूँगा। आपका पूरा नाम क्या है?",
    askName: "आपका पूरा नाम क्या है?",
    askLocation: "आप किस राज्य और जिले में रहते हैं? (जैसे: उत्तर प्रदेश, वाराणसी या महाराष्ट्र, पुणे)",
    askEducation: "आपकी उच्चतम शिक्षा क्या है? (जैसे: 8वीं पास, 10वीं पास, 12वीं पास, आईटीआई/डिप्लोमा, स्नातक)",
    askOccupation: "वर्तमान में आप क्या काम करते हैं? (जैसे: दैनिक मजदूरी, गृहिणी, छात्र, किसान, बेरोजगार)",
    askInterests: "आपको किस काम या कौशल में रुचि है? (जैसे: सिलाई और कटाई, सोलर पैनल तकनीशियन, बिजली मिस्त्री, डेटा एंट्री, प्लंबिंग, बाइक रिपेयरिंग, स्वास्थ्य सहायक)",
    askMobility: "प्रशिक्षण या नौकरी के लिए आप कितनी दूर जा सकते हैं? (जिले के अंदर, राज्य के अंदर, या दूर नहीं जा सकते)",
    askEmploymentPreference: "आप क्या पसंद करेंगे: मासिक वेतन वाली नौकरी, अपना खुद का व्यवसाय (स्व-रोजगार), या दोनों?",
    profileComplete: "धन्यवाद! आपका पीएम-अजय आजीविका प्रोफ़ाइल तैयार हो गया है। आपके अनुसार हमने NSQF प्रमाणित पाठ्यक्रम, नजदीकी प्रशिक्षण केंद्र और सरकारी अनुदान सब्सिडी चुनी है।",
    whatsAppWelcome: "नमस्ते! पीएम-अजय आजीविका हेल्पडेस्क में आपका स्वागत है। आप हिंदी, मराठी या अंग्रेजी में वॉइस नोट भेजकर अपना नाम, जिला, शिक्षा और पसंदीदा काम बता सकते हैं।",
    whatsAppVoicePrompt: "आपका वॉइस नोट सफलतापूर्वक प्राप्त और प्रोसेस कर लिया गया है।",
    whatsAppRecommendationIntro: "आपके लिए अनुशंसित पीएम-अजय NSQF कौशल और अनुदान अवसर:",
    pmAjayGrantHighlight: "पीएम-अजय योजना के तहत आपको 100% मुफ्त NSQF प्रशिक्षण + दैनिक भत्ता, और स्वरोजगार के लिए ₹50,000 तक की पूंजीगत सब्सिडी मिलती है।",
    freeTrainingWithStipend: "100% निःशुल्क सरकारी NSQF प्रशिक्षण + दैनिक भोजन व आवास भत्ता",
    capitalSubsidy: "पीएम-अजय पूंजीगत अनुदान: ₹50,000 तक (परियोजना लागत का 50%)",
    nsfdcLoanSupport: "NSFDC रियायती ऋण सहायता (4% से 6% ब्याज दर)",
  },
  Marathi: {
    systemGreeting: "नमस्ते! मी तुमचा पीएम-अजय (PM-AJAY) उपजीविका व कौशल्य सहाय्यक आहे. मी तुम्हाला मोफत शासकीय NSQF कौशल्य प्रशिक्षण, ₹५०,००० पर्यंतचे सरकारी अनुदान आणि स्थानिक रोजगाराच्या संधी शोधण्यात मदत करेन. आपले पूर्ण नाव काय आहे?",
    askName: "आपले पूर्ण नाव काय आहे?",
    askLocation: "तुम्ही कोणत्या राज्यात आणि जिल्ह्यात राहता? (उदा. महाराष्ट्र, पुणे किंवा नाशिक)",
    askEducation: "आपले सर्वोच्च शिक्षण काय झाले आहे? (उदा. ८ वी पास, १० वी पास, १२ वी पास, आयटीआय/डिप्लोमा, पदवीधर)",
    askOccupation: "सध्या तुम्ही कोणते काम करता? (उदा. रोजंदारी, गृहिणी, विद्यार्थी, शेतकरी, बेरोजगार)",
    askInterests: "तुम्हाला कोणत्या कामामध्ये किंवा कौशल्यामध्ये रस आहे? (उदा. शिलाई काम, सोलर पॅनल तंत्रज्ञ, इलेक्ट्रिशियन, डेटा एंट्री, प्लंबिंग, दुचाकी दुरुस्ती, आरोग्य सहाय्यक)",
    askMobility: "प्रशिक्षण किंवा कामासाठी तुम्ही किती लांब प्रवास करू शकता? (जिल्ह्यांतर्गत, राज्यांतर्गत किंवा लांब जाऊ शकत नाही)",
    askEmploymentPreference: "तुम्हाला काय आवडेल: दरमहा पगाराची नोकरी, स्वतःचा व्यवसाय (स्वयंरोजगार) किंवा दोन्ही?",
    profileComplete: "धन्यवाद! आपले पीएम-अजय उपजीविका प्रोफाइल तयार झाले आहे. आपल्या माहितीनुसार आम्ही NSQF प्रमाणित अभ्यासक्रम, स्थानिक प्रशिक्षण केंद्र आणि सरकारी अनुदानाची माहिती जोडली आहे.",
    whatsAppWelcome: "नमस्ते! पीएम-अजय उपजीविका हेल्पडेस्कमध्ये आपले स्वागत आहे. आपण मराठी, हिंदी किंवा इंग्रजीत व्हॉइस नोट पाठवून आपले नाव, जिल्हा, शिक्षण व पसंतीचे काम सांगू शकता.",
    whatsAppVoicePrompt: "आपली व्हॉइस नोट यशस्वीरीत्या प्राप्त झाली आणि प्रोसेस करण्यात आली आहे.",
    whatsAppRecommendationIntro: "आपल्यासाठी शिफारस केलेले पीएम-अजय NSQF कौशल्य आणि अनुदान पर्याय:",
    pmAjayGrantHighlight: "पीएम-अजय योजनेंतर्गत आपल्याला १००% मोफत NSQF प्रशिक्षण + दैनिक भत्ता आणि स्वयंरोजगारासाठी ₹५०,००० पर्यंतचे भांडवली अनुदान मिळते.",
    freeTrainingWithStipend: "१००% मोफत शासकीय NSQF प्रशिक्षण + दैनिक निवास व भोजन भत्ता",
    capitalSubsidy: "पीएम-अजय भांडवली अनुदान: ₹५०,००० पर्यंत (प्रकल्प खर्चाच्या ५०%)",
    nsfdcLoanSupport: "NSFDC सवलतीच्या दरातील कर्ज सहाय्य (४% ते ६% व्याज दर)",
  }
};
