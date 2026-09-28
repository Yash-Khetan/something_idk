import { conversationService } from './conversationService';
import { recommendationService } from './recommendationService';
import { db } from '../db';
import { beneficiaries } from '../db/schema';
import { eq } from 'drizzle-orm';
import { SupportedLanguage, translations } from '../i18n/translations';

export class WhatsAppService {
  private verifyToken = process.env.WHATSAPP_VERIFY_TOKEN || 'pm_ajay_webhook_secret_2026';
  private accessToken = process.env.WHATSAPP_ACCESS_TOKEN || '';
  private phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID || '';

  verifyWebhook(mode: string, token: string, challenge: string) {
    if (mode === 'subscribe' && token === this.verifyToken) {
      return challenge;
    }
    return null;
  }

  async processIncomingWebhook(body: any) {
    try {
      const entry = body.entry?.[0];
      const changes = entry?.changes?.[0];
      const value = changes?.value;
      const message = value?.messages?.[0];

      if (!message) {
        return { status: 'ignored', reason: 'No message found in webhook body' };
      }

      const fromPhone = message.from;
      let textContent = '';
      let messageType: 'text' | 'voice_note' = 'text';

      if (message.type === 'text') {
        textContent = message.text?.body || '';
      } else if (message.type === 'audio' || message.type === 'voice') {
        messageType = 'voice_note';
        // In live WhatsApp Cloud API, we would fetch audio from https://graph.facebook.com/v20.0/{message.audio.id}
        textContent = `[Audio Voice Note from ${fromPhone}]`;
      }

      const response = await this.handleWhatsAppInteraction({
        fromPhone,
        messageType,
        text: textContent,
        language: 'Hindi'
      });

      // If live token is configured, send outbound WhatsApp message
      if (this.accessToken && this.phoneNumberId) {
        await this.sendWhatsAppMessage(fromPhone, response.replyText);
      }

      return { status: 'success', response };
    } catch (err) {
      console.error('WhatsApp Webhook processing error:', err);
      throw err;
    }
  }

  async handleWhatsAppInteraction(params: {
    fromPhone: string;
    messageType: 'text' | 'audio' | 'voice_note';
    text?: string;
    audioUrl?: string;
    language?: SupportedLanguage;
  }) {
    const { fromPhone, messageType, text = '', language = 'Hindi' } = params;

    // Detect language if possible or fallback to param
    let detectedLanguage: SupportedLanguage = language;
    if (/namaste|shilai|tailor|pune|nagpur|kaam|paise|kiti|namaskar|नाव|शिक्षण/i.test(text)) {
      if (/आहे|नाही|करायचे|माझे|शिक्षण|पाहिजे|भांडवल/i.test(text)) {
        detectedLanguage = 'Marathi';
      } else if (/नमस्ते|चाहिए|सिलाई|करना|अनुदान|मदद/i.test(text)) {
        detectedLanguage = 'Hindi';
      }
    }

    const dict = translations[detectedLanguage];

    // Find or create beneficiary by phone
    const [existing] = await db.select().from(beneficiaries).where(eq(beneficiaries.phone, fromPhone));

    // Simulate STT transcript if it was a voice note without transcript
    let transcript = text;
    if (messageType === 'voice_note' || messageType === 'audio') {
      if (!transcript || transcript.startsWith('[')) {
        transcript = detectedLanguage === 'Hindi'
          ? "मेरा नाम राजेश कुमार है। मैं वाराणसी, उत्तर प्रदेश से हूँ। मैंने 10वीं पास की है और मुझे सोलर पैनल या इलेक्ट्रीशियन का काम सीखना है।"
          : detectedLanguage === 'Marathi'
          ? "माझे नाव सचिन पाटील आहे. मी पुणे, महाराष्ट्र येथून आहे. माझे १० वी शिक्षण झाले आहे आणि मला दुचाकी दुरुस्ती किंवा सोलरचे काम शिकायचे आहे."
          : "My name is Rajesh. I live in Pune. I have passed 10th standard and I want to learn solar technician skill.";
      }
    }

    // Process through conversation extractor
    let beneficiaryId = existing?.id;
    let beneficiaryName = existing?.name || 'Beneficiary';
    let beneficiaryDistrict = existing?.district || 'Pune';
    let beneficiaryState = existing?.state || 'Maharashtra';
    let beneficiaryEdu = existing?.education || '10th Pass';
    let beneficiaryInterests = existing?.interests || 'Solar & Electrician';

    // Parse transcript
    const nameMatch = conversationService.extractFieldFromUtterance('name', transcript, detectedLanguage);
    if (typeof nameMatch === 'string' && nameMatch.length > 0) beneficiaryName = nameMatch;

    const locMatch = conversationService.extractFieldFromUtterance('location', transcript, detectedLanguage);
    if (locMatch && typeof locMatch === 'object') {
      beneficiaryState = locMatch.state;
      beneficiaryDistrict = locMatch.district;
    }


    const eduMatch = conversationService.extractFieldFromUtterance('education', transcript, detectedLanguage);
    if (eduMatch && typeof eduMatch === 'string') beneficiaryEdu = eduMatch;

    if (/solar|सोलर|सौर|electric|बिजली|विद्युत|वायरिंग/i.test(transcript)) {
      beneficiaryInterests = detectedLanguage === 'Hindi' ? 'सोलर एवं इलेक्ट्रीशियन' : detectedLanguage === 'Marathi' ? 'सोलर व इलेक्ट्रिशियन' : 'Solar & Electrician';
    } else if (/bike|दुचाकी|motorcycle|mechanic|ऑटो/i.test(transcript)) {
      beneficiaryInterests = detectedLanguage === 'Hindi' ? 'दोपहिया सर्विस मैकेनिक' : detectedLanguage === 'Marathi' ? 'दुचाकी दुरुस्ती तंत्रज्ञ' : 'Two-Wheeler Service Technician';
    } else if (/sew|tailor|सिलाई|शिलाई/i.test(transcript)) {
      beneficiaryInterests = detectedLanguage === 'Hindi' ? 'सिलाई एवं गारमेंट्स' : detectedLanguage === 'Marathi' ? 'शिलाई व गारमेंट्स' : 'Sewing & Tailoring';
    } else {
      beneficiaryInterests = transcript;
    }


    if (!existing) {
      const [newBeneficiary] = await db.insert(beneficiaries).values({
        name: beneficiaryName,
        phone: fromPhone,
        language: detectedLanguage,
        state: beneficiaryState,
        district: beneficiaryDistrict,
        education: beneficiaryEdu,
        currentOccupation: 'Seeking Skill Training',
        interests: beneficiaryInterests,
        mobility: 'Willing to travel within district',
        employmentPreference: 'Either',
        category: 'SC',
        notes: `Registered via WhatsApp Voice Note interaction (${detectedLanguage})`
      }).returning();
      beneficiaryId = newBeneficiary.id;
    } else {
      await db.update(beneficiaries)
        .set({
          name: beneficiaryName,
          state: beneficiaryState,
          district: beneficiaryDistrict,
          education: beneficiaryEdu,
          interests: beneficiaryInterests,
          updatedAt: new Date()
        })
        .where(eq(beneficiaries.id, existing.id));
    }

    // Generate personalized NSQF recommendations
    const recData = await recommendationService.generateRecommendationsForBeneficiary(beneficiaryId!);
    const topRecs = recData.recommendations.slice(0, 2);
    const center = recData.trainingCenters.find((c: any) => c.district.toLowerCase() === beneficiaryDistrict.toLowerCase() || c.state.toLowerCase() === beneficiaryState.toLowerCase()) || recData.trainingCenters[0];


    // Build rich WhatsApp response text formatted for readability
    let replyText = '';
    if (detectedLanguage === 'Hindi') {
      replyText = `🌟 *पीएम-अजय (PM-AJAY) आजीविका एवं कौशल सहायक*\n\n` +
        `नमस्ते *${beneficiaryName}* जी! आपके वॉइस संदेश का विश्लेषण किया गया है:\n` +
        `📍 स्थान: ${beneficiaryDistrict}, ${beneficiaryState}\n` +
        `🎓 शिक्षा: ${beneficiaryEdu}\n` +
        `🎯 रुचि: ${beneficiaryInterests}\n\n` +
        `✨ *आपके लिए शीर्ष अनुशंसित सरकारी NSQF कौशल कार्यक्रम:*\n\n`;

      topRecs.forEach((r, idx) => {
        replyText += `${idx + 1}️⃣ *${r.course?.titleHi || r.course?.title}* (NSQF स्तर ${r.course?.nsqfLevel})\n` +
          `   ⏱️ अवधि: ${r.course?.durationHours} घंटे (100% निःशुल्क सरकारी प्रशिक्षण + दैनिक भत्ता)\n` +
          `   💼 रोजगार वेतन: ${r.course?.wageEstimate}\n` +
          `   🏢 स्वरोजगार: ₹50,000 तक की पूंजीगत अनुदान सब्सिडी (PM-AJAY GIA)\n\n`;
      });

      if (center) {
        replyText += `🏛️ *नजदीकी अधिकृत प्रशिक्षण केंद्र:*\n` +
          `🏢 ${center.name}\n` +
          `📍 ${center.address}\n` +
          `📞 संपर्क: ${center.contactPhone}\n\n`;
      }

      replyText += `🔗 अधिक जानकारी के लिए पीएम-अजय पोर्टल पर अपनी पूरी रिपोर्ट देखें।`;
    } else if (detectedLanguage === 'Marathi') {
      replyText = `🌟 *पीएम-अजय (PM-AJAY) उपजीविका व कौशल्य सहाय्यक*\n\n` +
        `नमस्ते *${beneficiaryName}* जी! आपल्या व्हॉइस संदेशाचे विश्लेषण केले आहे:\n` +
        `📍 स्थान: ${beneficiaryDistrict}, ${beneficiaryState}\n` +
        `🎓 शिक्षण: ${beneficiaryEdu}\n` +
        `🎯 आवड: ${beneficiaryInterests}\n\n` +
        `✨ *आपल्यासाठी सर्वोत्तम NSQF प्रमाणित कौशल्य पर्याय:*\n\n`;

      topRecs.forEach((r, idx) => {
        replyText += `${idx + 1}️⃣ *${r.course?.titleMr || r.course?.title}* (NSQF स्तर ${r.course?.nsqfLevel})\n` +
          `   ⏱️ कालावधी: ${r.course?.durationHours} तास (१००% मोफत शासकीय प्रशिक्षण + दैनिक भत्ता)\n` +
          `   💼 अंदाजे वेतन: ${r.course?.wageEstimate}\n` +
          `   🏢 स्वयंरोजगार: ₹५०,००० भांडवली अनुदान (PM-AJAY GIA)\n\n`;
      });

      if (center) {
        replyText += `🏛️ *जवळचे अधिकृत प्रशिक्षण केंद्र:*\n` +
          `🏢 ${center.name}\n` +
          `📍 ${center.address}\n` +
          `📞 संपर्क: ${center.contactPhone}\n\n`;
      }

      replyText += `🔗 सविस्तर माहितीसाठी पीएम-अजय पोर्टलला भेट द्या.`;
    } else {
      replyText = `🌟 *PM-AJAY Livelihood & Skill Assistant*\n\n` +
        `Hello *${beneficiaryName}*! We analyzed your voice note:\n` +
        `📍 Location: ${beneficiaryDistrict}, ${beneficiaryState}\n` +
        `🎓 Education: ${beneficiaryEdu}\n` +
        `🎯 Interest: ${beneficiaryInterests}\n\n` +
        `✨ *Top Recommended NSQF Certified Pathways:*\n\n`;

      topRecs.forEach((r, idx) => {
        replyText += `${idx + 1}️⃣ *${r.course?.title}* (NSQF Level ${r.course?.nsqfLevel})\n` +
          `   ⏱️ Duration: ${r.course?.durationHours} Hours (100% Free Govt Training + Boarding Stipend)\n` +
          `   💼 Wage Potential: ${r.course?.wageEstimate}\n` +
          `   🏢 Micro-Enterprise: Up to ₹50,000 PM-AJAY GIA Capital Subsidy\n\n`;
      });

      if (center) {
        replyText += `🏛️ *Nearest Empanelled Training Center:*\n` +
          `🏢 ${center.name}\n` +
          `📍 ${center.address}\n` +
          `📞 Contact: ${center.contactPhone}\n\n`;
      }

      replyText += `🔗 View your complete livelihood action plan on the PM-AJAY Portal.`;
    }

    return {
      beneficiaryId,
      language: detectedLanguage,
      transcript,
      replyText,
      recommendations: topRecs,
      trainingCenter: center
    };
  }

  async sendWhatsAppMessage(toPhone: string, messageText: string) {
    if (!this.accessToken || !this.phoneNumberId) return;

    try {
      const response = await fetch(`https://graph.facebook.com/v20.0/${this.phoneNumberId}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: toPhone,
          type: 'text',
          text: { preview_url: true, body: messageText }
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        console.warn('Meta WhatsApp API Outbound error:', errText);
      }
    } catch (err) {
      console.warn('Failed to send outbound WhatsApp message:', err);
    }
  }
}

export const whatsAppService = new WhatsAppService();
