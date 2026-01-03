'use client';

import { useState } from 'react';
import { Send, Loader2, CheckCircle } from 'lucide-react';

export default function SmartLeadForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // הכתובת של ה-Webhook שלך (נמלא את זה עוד רגע)
  const WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || ''; 

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      eventType: formData.get('eventType'),
      guests: formData.get('guests'),
      date: new Date().toISOString(),
      source: 'Multibrawn Website'
    };

    try {
      // שליחה ל-n8n
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSuccess(true);
        // איפוס הטופס אחרי 3 שניות
        setTimeout(() => setSuccess(false), 3000);
        (e.target as HTMLFormElement).reset();
      } else {
        alert('הייתה בעיה בשליחת הטופס, נסה שוב.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('שגיאת תקשורת.');
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="p-8 bg-green-50 border border-green-200 rounded-xl text-center animate-in fade-in zoom-in">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-green-800">הפרטים התקבלו!</h3>
        <p className="text-green-600">הצוות שלנו כבר מחפש לך את המקום המושלם.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-6 bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-100">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">שם מלא</label>
        <input 
          name="name" 
          required 
          className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          placeholder="ישראל ישראלי" 
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">טלפון</label>
        <input 
          name="phone" 
          type="tel" 
          required 
          className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          placeholder="050-0000000" 
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">סוג אירוע</label>
          <select name="eventType" className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none bg-white">
            <option value="vacation">חופשה / וילה</option>
            <option value="wedding">חתונה / אירוע</option>
            <option value="corporate">אירוע עסקי</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">כמות אורחים</label>
          <input 
            name="guests" 
            type="number" 
            className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="50" 
          />
        </div>
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {loading ? <Loader2 className="animate-spin" /> : <Send className="w-4 h-4" />}
        {loading ? 'שולח...' : 'מצא לי את המקום המושלם'}
      </button>
    </form>
  );
}
