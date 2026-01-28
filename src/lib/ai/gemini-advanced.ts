/**
 * Gemini Advanced AI Engine
 * מנוע AI מתקדם עם הבנת שפה טבעית, זיכרון הקשר והמלצות חכמות
 */

import { Property } from '@/types/property';

// Types
interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface UserContext {
  preferences: {
    propertyType?: string;
    area?: string;
    guests?: number;
    budget?: string;
    amenities?: string[];
  };
  conversationHistory: ConversationMessage[];
  viewedProperties: string[];
  stage: string;
}

interface AIResponse {
  message: string;
  suggestions?: string[];
  recommendedProperties?: Property[];
  nextAction?: 'ask_details' | 'show_properties' | 'send_whatsapp' | 'continue';
}

/**
 * GeminiAdvanced Class
 * מחלקה לניהול אינטראקציות AI מתקדמות
 */
export class GeminiAdvanced {
  private apiKey: string;
  private baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
  
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * analyzeIntent - מנתח את כוונת המשתמש מתוך הטקסט
   */
  private async analyzeIntent(userMessage: string, context: UserContext): Promise<{
    intent: string;
    entities: Record<string, any>;
    confidence: number;
  }> {
    // Intent patterns
    const intentPatterns = {
      search: /מחפש|רוצה|צריך|מעוניין|אשמח/i,
      budget: /מחיר|תקציב|כמה עולה|₪|שקל/i,
      amenities: /ג'קוזי|בריכה|מנגל|נוף|גינה|מרפסת/i,
      location: /צפון|דרום|מרכז|ירושלים|גליל|כנרת|ים המלח/i,
      availability: /זמין|תאריכים|פנוי|תפוס/i,
      details: /פרטים|מידע|תמונות|וידאו/i,
      greeting: /שלום|היי|הלו|בוקר טוב|ערב טוב/i,
    };

    let detectedIntent = 'unknown';
    let confidence = 0.5;

    // בדיקת patterns
    for (const [intent, pattern] of Object.entries(intentPatterns)) {
      if (pattern.test(userMessage)) {
        detectedIntent = intent;
        confidence = 0.8;
        break;
      }
    }

    // חילוץ entities
    const entities: Record<string, any> = {};

    // סוג נכס
    if (/צימר|זימר/i.test(userMessage)) entities.propertyType = 'צימר';
    if (/וילה/i.test(userMessage)) entities.propertyType = 'וילה';
    if (/דירה/i.test(userMessage)) entities.propertyType = 'דירת נופש';
    if (/מלון/i.test(userMessage)) entities.propertyType = 'מלון בוטיק';
    if (/אירוע/i.test(userMessage)) entities.propertyType = 'מתחם אירועים';

    // אזור
    if (/צפון|גליל|כנרת|גולן/i.test(userMessage)) entities.area = 'צפון';
    if (/דרום|נגב|אילת|ים המלח/i.test(userMessage)) entities.area = 'דרום';
    if (/מרכז|תל אביב|הרצליה/i.test(userMessage)) entities.area = 'מרכז';
    if (/ירושלים/i.test(userMessage)) entities.area = 'ירושלים';

    // מספר אורחים
    const guestsMatch = userMessage.match(/(\d+)\s*(איש|אנשים|זוג|משפחה)/i);
    if (guestsMatch) {
      entities.guests = parseInt(guestsMatch[1]);
    }

    // תקציב
    const budgetMatch = userMessage.match(/(\d+)\s*(שקל|₪)/i);
    if (budgetMatch) {
      entities.budget = budgetMatch[1];
    }

    // שירותים
    const amenities = [];
    if (/ג'קוזי|ג׳קוזי/i.test(userMessage)) amenities.push('ג\'קוזי');
    if (/בריכה/i.test(userMessage)) amenities.push('בריכה');
    if (/מנגל/i.test(userMessage)) amenities.push('מנגל');
    if (/נוף/i.test(userMessage)) amenities.push('נוף');
    if (amenities.length > 0) entities.amenities = amenities;

    return { intent: detectedIntent, entities, confidence };
  }

  /**
   * generateContextualResponse - יוצר תשובה מותאמת על בסיס הקשר
   */
  private generateContextualResponse(
    intent: string,
    entities: Record<string, any>,
    context: UserContext
  ): string {
    const { preferences } = context;

    switch (intent) {
      case 'greeting':
        return `שלום! 👋 אני ערדית, העוזרת הדיגיטלית של MULTIBRAWN.\nאני כאן כדי לעזור לך למצוא את המקום המושלם לחופשה או לאירוע.\n\nספר לי, מה אתה מחפש?`;

      case 'search':
        let response = 'מעולה! ';
        if (entities.propertyType) {
          response += `אני רואה שאתה מחפש ${entities.propertyType}. `;
        }
        if (entities.area) {
          response += `ב${entities.area} - בחירה נהדרת! `;
        }
        if (entities.guests) {
          response += `ל-${entities.guests} אורחים. `;
        }
        response += '\n\nכדי שאוכל למצוא לך את האפשרויות הכי מתאימות, ספר לי עוד קצת:';
        return response;

      case 'budget':
        if (entities.budget) {
          return `תקציב של ${entities.budget}₪ ללילה - מצוין!\nיש לנו אפשרויות מעולות בטווח המחירים הזה. 💰`;
        }
        return 'מה התקציב שלך ללילה? זה יעזור לי להציע לך את המקומות המתאימים ביותר.';

      case 'amenities':
        const requestedAmenities = entities.amenities || [];
        return `${requestedAmenities.join(', ')} - שירותים מעולים! 🌟\nאני מחפש לך נכסים עם בדיוק מה שאתה צריך.`;

      case 'location':
        return `${entities.area} זה אזור מקסים! 🏞️\nיש לנו שם מבחר נכסים מעולים.\nמה חשוב לך במקום? (נוף, שקט, קרבה לאטרקציות?)`;

      default:
        return 'אני כאן לעזור! 😊 תוכל לספר לי קצת יותר על מה שאתה מחפש?';
    }
  }

  /**
   * getPropertyRecommendations - מחזיר המלצות מותאמות אישית
   */
  private getPropertyRecommendations(
    properties: Property[],
    context: UserContext
  ): Property[] {
    const { preferences } = context;
    let scored = properties.map(property => {
      let score = 0;

      // התאמה לסוג נכס
      if (preferences.propertyType && property.type === preferences.propertyType) {
        score += 30;
      }

      // התאמה לאזור
      if (preferences.area && property.area === preferences.area) {
        score += 25;
      }

      // התאמה למספר אורחים
      if (preferences.guests && property.capacity >= preferences.guests) {
        score += 20;
      }

      // התאמה לשירותים
      if (preferences.amenities) {
        const matchingAmenities = preferences.amenities.filter(amenity =>
          property.amenities.some(a => a.includes(amenity))
        );
        score += matchingAmenities.length * 10;
      }

      // בונוס לנכסים מומלצים
      if (property.featured) {
        score += 15;
      }

      return { property, score };
    });

    // מיון לפי ציון
    scored.sort((a, b) => b.score - a.score);

    // החזרת top 3
    return scored.slice(0, 3).map(item => item.property);
  }

  /**
   * chat - הפונקציה הראשית לשיחה עם AI
   */
  async chat(
    userMessage: string,
    context: UserContext,
    availableProperties: Property[]
  ): Promise<AIResponse> {
    try {
      // 1. נתח intent
      const { intent, entities, confidence } = await this.analyzeIntent(userMessage, context);

      // 2. עדכן preferences
      Object.keys(entities).forEach(key => {
        if (key === 'amenities') {
          context.preferences.amenities = [
            ...(context.preferences.amenities || []),
            ...entities.amenities
          ];
        } else {
          (context.preferences as any)[key] = entities[key];
        }
      });

      // 3. יצר תשובה מותאמת
      let responseMessage = this.generateContextualResponse(intent, entities, context);

      // 4. קבל המלצות אם יש מספיק מידע
      let recommendedProperties: Property[] = [];
      if (
        context.preferences.propertyType ||
        context.preferences.area ||
        (context.preferences.amenities && context.preferences.amenities.length > 0)
      ) {
        recommendedProperties = this.getPropertyRecommendations(
          availableProperties,
          context
        );

        if (recommendedProperties.length > 0) {
          responseMessage += '\n\n🏠 מצאתי כמה אפשרויות מעולים בשבילך!';
        }
      }

      // 5. הצע תשובות מהירות
      const suggestions = this.generateQuickReplies(intent, context);

      // 6. קבע פעולה הבאה
      let nextAction: AIResponse['nextAction'] = 'continue';
      if (recommendedProperties.length > 0) {
        nextAction = 'show_properties';
      } else if (Object.keys(context.preferences).length >= 3) {
        nextAction = 'ask_details';
      }

      return {
        message: responseMessage,
        suggestions,
        recommendedProperties,
        nextAction,
      };
    } catch (error) {
      console.error('Gemini AI Error:', error);
      return {
        message: 'אופס! משהו השתבש. אבל אל תדאגי, אני כאן לעזור! נסה שוב או פנה אליי דרך WhatsApp.',
        nextAction: 'continue',
      };
    }
  }

  /**
   * generateQuickReplies - יוצר תשובות מהירות מוצעות
   */
  private generateQuickReplies(intent: string, context: UserContext): string[] {
    const replies: string[] = [];

    if (!context.preferences.propertyType) {
      replies.push('צימר רומנטי', 'וילה משפחתית', 'מתחם אירועים');
    } else if (!context.preferences.area) {
      replies.push('צפון', 'מרכז', 'דרום', 'ירושלים');
    } else if (!context.preferences.guests) {
      replies.push('זוג', '2-4 אורחים', '5-8 אורחים', '8+ אורחים');
    } else {
      replies.push('תראה לי נכסים', 'שלח ל-WhatsApp', 'אפשרויות נוספות');
    }

    return replies.slice(0, 3);
  }

  /**
   * formatPropertyForChat - מעצב נכס להצגה בצ'אט
   */
  formatPropertyForChat(property: Property): string {
    return `
🏠 **${property.name}**
📍 ${property.location}, ${property.area}
👥 עד ${property.capacity} אורחים
✨ ${property.amenities.slice(0, 3).join(', ')}
💰 ${property.priceRange}

${property.description.slice(0, 100)}...
    `.trim();
  }
}

// Export singleton instance
let geminiInstance: GeminiAdvanced | null = null;

export function getGeminiAdvanced(): GeminiAdvanced {
  if (!geminiInstance) {
    const apiKey = process.env.GEMINI_API_KEY || '';
    geminiInstance = new GeminiAdvanced(apiKey);
  }
  return geminiInstance;
}

export type { ConversationMessage, UserContext, AIResponse };
