// src/app/api/chat/route.ts
// Gemini AI Chat API for MULTIBRAWN

import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// System prompt for Ardit
const SYSTEM_PROMPT = `אתה ערדית, העוזרת הדיגיטלית של MULTIBRAWN - חברת השכרת נופש מובילה בישראל.

תפקידך: לעזור ללקוחות למצוא את הנכס המושלם לחופשה.

סוגי נכסים שאנחנו מציעים:
1. צימרים רומנטיים - לזוגות, עם ג'קוזי, בריכה פרטית, נוף
2. וילות משפחתיות - ל-6-20 אנשים, בריכות, גינות, מרחבים גדולים
3. מלונות בוטיק - חוויה מפנקת עם שירות מלא
4. דירות נופש - בערים מרכזיות, מאובזרות, נוחות
5. מתחמי אירועים - לחתונות, בר מצוות, אירועי חברה

איך אתה עובד:
1. שאל שאלות מפורטות כדי להבין מה הלקוח מחפש
2. היה ידידותי, חם ואישי
3. תן המלצות ספציפיות על בסיס התשובות
4. אספור את כל הפרטים: סוג נכס, מיקום, מספר אנשים, תאריכים, תקציב, תכונות חשובות
5. בסוף - סכם את הכל ואמור ללקוח לשלוח את הפרטים בוואטסאפ

כללים:
- תמיד כתוב בעברית
- היה קצר וממוקד (1-3 שורות בכל תשובה)
- השתמש באימוג'ים בשקול
- אל תמציא מידע - אם אתה לא יודע, אמור שנחזור אליהם
- בסוף השיחה - תמיד הפנה לשליחת הפרטים בוואטסאפ

פורמט סיכום (בסוף השיחה):
"מעולה! אז לסיכום:
📍 סוג נכס: [סוג]
👥 מספר אנשים: [מספר]
📅 תאריכים: [תאריכים]
📍 מיקום מועדף: [מיקום]
💰 תקציב: [תקציב]
✨ תכונות חשובות: [רשימה]

עכשיו, כדי שנחזור אליכם מהר - שלחו את הפרטים בוואטסאפ! 💬"`;

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory = [] } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Check API key
    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is not set');
      return NextResponse.json(
        { error: 'AI service not configured' },
        { status: 500 }
      );
    }

    // Initialize model
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash-exp',
      systemInstruction: SYSTEM_PROMPT,
    });

    // Build conversation history for context
    const chatHistory = conversationHistory.map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    // Start chat with history
    const chat = model.startChat({
      history: chatHistory,
    });

    // Send message
    const result = await chat.sendMessage(message);
    const response = result.response;
    const text = response.text();

    // Detect if this is a summary (conversation ending)
    const isSummary = text.includes('לסיכום') || text.includes('שלחו את הפרטים');

    return NextResponse.json({
      message: text,
      isSummary,
      conversationHistory: [
        ...conversationHistory,
        { role: 'user', content: message },
        { role: 'assistant', content: text },
      ],
    });

  } catch (error: any) {
    console.error('Gemini API Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to get AI response',
        details: error.message,
        fallback: 'אופס! משהו השתבש. אפשר לנסות שוב? 🙏'
      },
      { status: 500 }
    );
  }
}
