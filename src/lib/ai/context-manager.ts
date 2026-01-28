/**
 * Context Manager
 * מנהל את הקשר השיחה, זיכרון ומצב המשתמש
 */

import { UserContext, ConversationMessage } from './gemini-advanced';

interface StoredContext {
  userId: string;
  context: UserContext;
  lastUpdated: Date;
}

/**
 * ContextManager Class
 * מנהל זיכרון שיחה ומצב משתמש
 */
export class ContextManager {
  private contexts: Map<string, StoredContext> = new Map();
  private readonly MAX_HISTORY = 50; // מקסימום הודעות בהיסטוריה
  private readonly CONTEXT_TIMEOUT = 30 * 60 * 1000; // 30 דקות

  /**
   * getUserContext - מחזיר או יוצר context למשתמש
   */
  getUserContext(userId: string): UserContext {
    const stored = this.contexts.get(userId);

    // בדוק אם ה-context תקף
    if (stored && this.isContextValid(stored)) {
      return stored.context;
    }

    // צור context חדש
    const newContext: UserContext = {
      preferences: {},
      conversationHistory: [],
      viewedProperties: [],
      stage: 'greeting',
    };

    this.contexts.set(userId, {
      userId,
      context: newContext,
      lastUpdated: new Date(),
    });

    return newContext;
  }

  /**
   * updateContext - מעדכן context של משתמש
   */
  updateContext(userId: string, updates: Partial<UserContext>): void {
    const stored = this.contexts.get(userId);
    if (!stored) return;

    stored.context = {
      ...stored.context,
      ...updates,
    };
    stored.lastUpdated = new Date();

    this.contexts.set(userId, stored);
  }

  /**
   * addMessage - מוסיף הודעה להיסטוריה
   */
  addMessage(
    userId: string,
    role: 'user' | 'assistant',
    content: string
  ): void {
    const context = this.getUserContext(userId);

    const message: ConversationMessage = {
      role,
      content,
      timestamp: new Date(),
    };

    context.conversationHistory.push(message);

    // שמור רק X הודעות אחרונות
    if (context.conversationHistory.length > this.MAX_HISTORY) {
      context.conversationHistory = context.conversationHistory.slice(-this.MAX_HISTORY);
    }

    this.updateContext(userId, { conversationHistory: context.conversationHistory });
  }

  /**
   * addViewedProperty - מוסיף נכס שהמשתמש צפה בו
   */
  addViewedProperty(userId: string, propertyId: string): void {
    const context = this.getUserContext(userId);

    if (!context.viewedProperties.includes(propertyId)) {
      context.viewedProperties.push(propertyId);
      this.updateContext(userId, { viewedProperties: context.viewedProperties });
    }
  }

  /**
   * updatePreferences - מעדכן העדפות משתמש
   */
  updatePreferences(
    userId: string,
    preferences: Partial<UserContext['preferences']>
  ): void {
    const context = this.getUserContext(userId);

    context.preferences = {
      ...context.preferences,
      ...preferences,
    };

    this.updateContext(userId, { preferences: context.preferences });
  }

  /**
   * updateStage - מעדכן שלב בשיחה
   */
  updateStage(userId: string, stage: string): void {
    this.updateContext(userId, { stage });
  }

  /**
   * getConversationSummary - מחזיר סיכום השיחה
   */
  getConversationSummary(userId: string): string {
    const context = this.getUserContext(userId);
    const { preferences, conversationHistory, viewedProperties } = context;

    let summary = '📋 **סיכום השיחה:**\n\n';

    // העדפות
    if (Object.keys(preferences).length > 0) {
      summary += '**מה שחיפשת:**\n';
      if (preferences.propertyType) summary += `• סוג: ${preferences.propertyType}\n`;
      if (preferences.area) summary += `• אזור: ${preferences.area}\n`;
      if (preferences.guests) summary += `• מספר אורחים: ${preferences.guests}\n`;
      if (preferences.budget) summary += `• תקציב: ${preferences.budget}₪ ללילה\n`;
      if (preferences.amenities && preferences.amenities.length > 0) {
        summary += `• שירותים: ${preferences.amenities.join(', ')}\n`;
      }
      summary += '\n';
    }

    // נכסים שנצפו
    if (viewedProperties.length > 0) {
      summary += `**נכסים שראית:** ${viewedProperties.length}\n\n`;
    }

    // מספר הודעות
    summary += `**הודעות בשיחה:** ${conversationHistory.length}\n`;

    return summary;
  }

  /**
   * resetContext - מאפס context של משתמש
   */
  resetContext(userId: string): void {
    this.contexts.delete(userId);
  }

  /**
   * isContextValid - בודק אם context עדיין תקף
   */
  private isContextValid(stored: StoredContext): boolean {
    const now = new Date().getTime();
    const lastUpdate = stored.lastUpdated.getTime();
    return (now - lastUpdate) < this.CONTEXT_TIMEOUT;
  }

  /**
   * cleanExpiredContexts - מנקה contexts שפג תוקפם
   */
  cleanExpiredContexts(): void {
    const now = new Date().getTime();

    for (const [userId, stored] of this.contexts.entries()) {
      const lastUpdate = stored.lastUpdated.getTime();
      if ((now - lastUpdate) >= this.CONTEXT_TIMEOUT) {
        this.contexts.delete(userId);
      }
    }
  }

  /**
   * exportContext - מייצא context לשמירה חיצונית
   */
  exportContext(userId: string): string {
    const stored = this.contexts.get(userId);
    if (!stored) return '';

    return JSON.stringify(stored, null, 2);
  }

  /**
   * importContext - מייבא context משמור
   */
  importContext(userId: string, contextJson: string): void {
    try {
      const stored: StoredContext = JSON.parse(contextJson);
      stored.lastUpdated = new Date(stored.lastUpdated);
      this.contexts.set(userId, stored);
    } catch (error) {
      console.error('Failed to import context:', error);
    }
  }
}

// Export singleton instance
let contextManagerInstance: ContextManager | null = null;

export function getContextManager(): ContextManager {
  if (!contextManagerInstance) {
    contextManagerInstance = new ContextManager();

    // נקה contexts כל 15 דקות
    setInterval(() => {
      contextManagerInstance?.cleanExpiredContexts();
    }, 15 * 60 * 1000);
  }

  return contextManagerInstance;
}
