'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './Contact.module.css';

type MessageType = {
  type: 'bot' | 'user';
  text: string;
  options?: string[];
};

export default function ContactPage() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [chatData, setChatData] = useState<any>({});
  const [currentStep, setCurrentStep] = useState('start');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Start chat on mount
    addBotMessage('היי! 👋 אני הבוט החכם של מולטיבראון. בוא נמצא לך את המקום המושלם. מה אתה מחפש?', [
      '🏡 צימר',
      '🏛️ וילה',
      '🏨 מלון',
      '🏙️ דירת נופש',
      '💍 מתחם אירועים',
    ]);
  }, []);

  const addBotMessage = (text: string, options?: string[]) => {
    setMessages(prev => [...prev, { type: 'bot', text, options }]);
  };

  const addUserMessage = (text: string) => {
    setMessages(prev => [...prev, { type: 'user', text }]);
  };

  const handleOptionClick = (option: string) => {
    addUserMessage(option);
    processAnswer(option);
  };

  const handleInputSubmit = () => {
    if (!inputValue.trim()) return;
    addUserMessage(inputValue);
    processAnswer(inputValue);
    setInputValue('');
  };

  const processAnswer = (answer: string) => {
    const newData = { ...chatData };

    if (currentStep === 'start') {
      newData.type = answer;
      setChatData(newData);
      setCurrentStep('composition');
      setTimeout(() => {
        addBotMessage('מעולה! עבור מי הנופש?', ['💑 זוג', '👨‍👩‍👧‍👦 משפחה', '🎉 קבוצת חברים']);
      }, 500);
    } else if (currentStep === 'composition') {
      newData.composition = answer;
      setChatData(newData);
      setCurrentStep('pax');
      setTimeout(() => {
        addBotMessage('כמה אנשים תהיו?', ['עד 5', '5-10', '10-20', '20+']);
      }, 500);
    } else if (currentStep === 'pax') {
      newData.pax = answer;
      setChatData(newData);
      setCurrentStep('date');
      setTimeout(() => {
        addBotMessage('מתי תרצו להגיע? (הקלד תאריך או "גמיש")');
      }, 500);
    } else if (currentStep === 'date') {
      newData.date = answer;
      setChatData(newData);
      setCurrentStep('budget');
      setTimeout(() => {
        addBotMessage('מה התקציב המשוער שלכם?', ['עד 1,500 ₪', '1,500-3,000 ₪', '3,000-5,000 ₪', '5,000+ (יוקרה)', 'גמיש']);
      }, 500);
    } else if (currentStep === 'budget') {
      newData.budget = answer;
      setChatData(newData);
      setCurrentStep('name');
      setTimeout(() => {
        addBotMessage('מעולה! אני מכין את ההצעה. מה השם המלא?');
      }, 500);
    } else if (currentStep === 'name') {
      newData.name = answer;
      setChatData(newData);
      setCurrentStep('phone');
      setTimeout(() => {
        addBotMessage('מה המספר לוואטסאפ?');
      }, 500);
    } else if (currentStep === 'phone') {
      newData.phone = answer;
      setChatData(newData);
      setCurrentStep('finish');
      setTimeout(() => {
        addBotMessage('זהו! סיימנו. אני שולח אותך לוואטסאפ עם כל הפרטים מוכנים.');
        generateWhatsAppLink(newData);
      }, 500);
    }
  };

  const generateWhatsAppLink = (data: any) => {
    let text = `*היי מולטיבראון, אשמח לעזרה במציאת לוקיישן!* 👋%0A`;
    text += `-----------------------%0A`;
    if (data.type) text += `🏠 *סוג:* ${data.type}%0A`;
    if (data.composition) text += `👥 *הרכב:* ${data.composition}%0A`;
    if (data.pax) text += `🔢 *מספר אנשים:* ${data.pax}%0A`;
    if (data.date) text += `📅 *תאריך:* ${data.date}%0A`;
    if (data.budget) text += `💰 *תקציב:* ${data.budget}%0A`;
    text += `-----------------------%0A`;
    if (data.name) text += `👤 *שם:* ${data.name}%0A`;
    if (data.phone) text += `📞 *טלפון:* ${data.phone}%0A`;

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          type: 'bot',
          text: `<a href="https://wa.me/972523983394?text=${text}" target="_blank" class="${styles.whatsappButton}"><i class="fab fa-whatsapp"></i> שלח כרטיס לקוח בוואטסאפ</a>`,
        },
      ]);
    }, 1000);
  };

  return (
    <div className={styles.contactPage}>
      <div className={styles.contentSection}>
        <h1 className={styles.pageTitle}>הבוט החכם של Multibrawn</h1>
        <p className={styles.pageSubtitle}>ענו על מספר שאלות קצרות ואמצא לכם את הלוקיישן המושלם</p>

        <div className={styles.chatContainer}>
          <div className={styles.chatHeader}>
            <div className={styles.chatBotAvatar}>
              <i className="fas fa-robot"></i>
            </div>
            <div>
              <h3 className={styles.chatBotName}>Multi-Agent</h3>
              <span className={styles.chatStatus}>● מחובר</span>
            </div>
          </div>

          <div className={styles.chatMessages}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`${styles.message} ${msg.type === 'bot' ? styles.bot : styles.user}`}>
                <div className={styles.bubble} dangerouslySetInnerHTML={{ __html: msg.text }} />
                {msg.options && (
                  <div className={styles.chatOptions}>
                    {msg.options.map((option, optIdx) => (
                      <button
                        key={optIdx}
                        className={styles.chatOptionBtn}
                        onClick={() => handleOptionClick(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className={styles.chatInputArea}>
            <input
              type="text"
              className={styles.chatInput}
              placeholder="הקלידו תשובה..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleInputSubmit()}
            />
            <button className={styles.chatSendBtn} onClick={handleInputSubmit}>
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
