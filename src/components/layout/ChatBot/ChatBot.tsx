'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ChatBot.module.css';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  options?: string[];
  isMultiSelect?: boolean;
}

interface UserData {
  name?: string;
  phone?: string;
  propertyType?: string;
  location?: string;
  guestCount?: string;
  dates?: string;
  specificDate?: string;
  budget?: string;
  shabbat?: string;
  mangal?: string;
  eventGuests?: string;
  eventVenue?: string;
  eventProduction?: string;
  // Shabbat Hatan specific
  shabbatHatanGuests?: string;
  shabbatHatanDate?: string;
  kashrut?: string;
  supervisor?: string;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userData, setUserData] = useState<UserData>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputType, setInputType] = useState<'text' | 'tel' | 'date'>('text');
  const [showInput, setShowInput] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addBotMessage(
          'שלום! 👋 אני ערדית, העוזרת הדיגיטלית של MULTIBRAWN!\nאעזור לך למצוא את המקום המושלם לחופשה. 🏖️',
          ['בואי נתחיל! 🚀']
        );
      }, 500);
    }
  }, [isOpen]);

  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);

  const addBotMessage = (content: string, options?: string[]) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'assistant',
          content,
          timestamp: new Date(),
          options,
        },
      ]);
      setIsTyping(false);
    }, 800);
  };

  const addUserMessage = (content: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        role: 'user',
        content,
        timestamp: new Date(),
      },
    ]);
  };

  const handleInputSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    if (currentStep === 1) {
      // Name
      addUserMessage(inputValue);
      setUserData((prev) => ({ ...prev, name: inputValue }));
      setInputValue('');
      setShowInput(false);
      setCurrentStep(2);
      setTimeout(() => {
        addBotMessage('נעים מאוד! 😊\nמה מספר הטלפון/WhatsApp שלך?');
        setInputType('tel');
        setShowInput(true);
      }, 1000);
    } else if (currentStep === 2) {
      // Phone
      if (!/^05\d{8}$/.test(inputValue.replace(/[-\s]/g, ''))) {
        addBotMessage('אופס! נראה שהמספר לא תקין. אנא הזן מספר טלפון ישראלי תקין (05XXXXXXXX)');
        setInputValue('');
        return;
      }
      addUserMessage(inputValue);
      setUserData((prev) => ({ ...prev, phone: inputValue }));
      setInputValue('');
      setShowInput(false);
      setCurrentStep(3);
      setTimeout(() => {
        addBotMessage(
          'מעולה! 👌\nאיזה סוג שירות מעניין אותך?',
          [
            'צימר רומנטי 💕', 
            'וילה משפחתית 🏡', 
            'דירת נופש 🏖️', 
            'מלון בוטיק 🏨',
            'שבת חתן 🕍',  // ← 🆕 חדש!
            'מתחם אירועים 🎉'
          ]
        );
      }, 1000);
    } else if (currentStep === 6 && userData.dates === 'תאריך מסוים 📅') {
      // Specific date
      addUserMessage(inputValue);
      setUserData((prev) => ({ ...prev, specificDate: inputValue }));
      setInputValue('');
      setShowInput(false);
      setCurrentStep(7);
      setTimeout(() => {
        addBotMessage(
          'נהדר! 💰\nמה התקציב שלך ללילה?',
          ['עד 500 ₪', '500-1000 ₪', '1000-2000 ₪', '2000+ ₪', 'גמיש 💪']
        );
      }, 1000);
    } else if (currentStep === 21) {
      // Shabbat Hatan date
      addUserMessage(inputValue);
      setUserData((prev) => ({ ...prev, shabbatHatanDate: inputValue }));
      setInputValue('');
      setShowInput(false);
      setCurrentStep(22);
      setTimeout(() => {
        addBotMessage(
          'מעולה! 💰\nמה התקציב שלכם לשבת חתן?',
          ['עד 10,000 ₪', '10,000-20,000 ₪', '20,000-40,000 ₪', '40,000+ ₪', 'גמיש 💪']
        );
      }, 1000);
    }
  };

  const handleNextStep = (option: string) => {
    addUserMessage(option);

    switch (currentStep) {
      case 0: // Start
        setCurrentStep(1);
        setTimeout(() => {
          addBotMessage('בואי נתחיל! 🎯\nמה השם שלך?');
          setInputType('text');
          setShowInput(true);
        }, 1000);
        break;

      case 3: // Property type
        setUserData((prev) => ({ ...prev, propertyType: option }));
        
        if (option === 'מתחם אירועים 🎉') {
          setCurrentStep(10); // Event flow
          setTimeout(() => {
            addBotMessage(
              'אירוע! איזה כיף! 🎊\nכמה אנשים צפויים?',
              ['עד 50 אורחים', '50-100 אורחים', '100-200 אורחים', '200+ אורחים']
            );
          }, 1000);
        } else if (option === 'שבת חתן 🕍') {
          setCurrentStep(20); // ← 🆕 Shabbat Hatan flow
          setTimeout(() => {
            addBotMessage(
              'שבת חתן! מזל טוב! 🎉💍\nבאיזה אזור אתם מחפשים?',
              ['צפון 🏔️', 'מרכז 🌆', 'דרום 🏜️', 'ירושלים והסביבה 🕍']
            );
          }, 1000);
        } else {
          setCurrentStep(4);
          setTimeout(() => {
            addBotMessage(
              'מעולה! 👌\nבאיזה אזור אתה מחפש?',
              ['צפון 🏔️', 'מרכז 🌆', 'דרום 🏜️', 'ירושלים והסביבה 🕍', 'לא משנה לי 🌍']
            );
          }, 1000);
        }
        break;

      case 4: // Location
        setUserData((prev) => ({ ...prev, location: option }));
        setCurrentStep(5);
        setTimeout(() => {
          addBotMessage(
            'נהדר! 🎊\nלכמה אורחים אתה צריך?',
            ['2 אורחים 👫', '2-4 אורחים 👨‍👩‍👧', '4-8 אורחים 👨‍👩‍👧‍👦', '8+ אורחים 👨‍👩‍👧‍👦👨‍👩‍👧‍👦']
          );
        }, 1000);
        break;

      case 5: // Guest count
        setUserData((prev) => ({ ...prev, guestCount: option }));
        setCurrentStep(6);
        setTimeout(() => {
          addBotMessage(
            'מצוין! 📅\nמתי אתה מתכנן להגיע?',
            ['סופ״ש הקרוב 🎯', 'תוך חודש 📆', 'תאריך מסוים 📅', 'עדיין לא החלטתי 🤔']
          );
        }, 1000);
        break;

      case 6: // Dates
        setUserData((prev) => ({ ...prev, dates: option }));
        
        if (option === 'תאריך מסוים 📅') {
          setTimeout(() => {
            addBotMessage('איזה תאריך? (לדוגמה: 15/01/2025)');
            setInputType('text');
            setShowInput(true);
          }, 1000);
        } else {
          setCurrentStep(7);
          setTimeout(() => {
            addBotMessage(
              'נהדר! 💰\nמה התקציב שלך ללילה?',
              ['עד 500 ₪', '500-1000 ₪', '1000-2000 ₪', '2000+ ₪', 'גמיש 💪']
            );
          }, 1000);
        }
        break;

      case 7: // Budget
        setUserData((prev) => ({ ...prev, budget: option }));
        setCurrentStep(8);
        setTimeout(() => {
          addBotMessage(
            'שומרים שבת? ⛪',
            ['כן, שומרים שבת 🕯️', 'לא שומרים ✨']
          );
        }, 1000);
        break;

      case 8: // Shabbat
        setUserData((prev) => ({ ...prev, shabbat: option }));
        setCurrentStep(9);
        setTimeout(() => {
          addBotMessage(
            'צריכים מנגל/גריל? 🔥',
            ['כן, חייבים מנגל! 🍖', 'לא צריך 😊']
          );
        }, 1000);
        break;

      case 9: // Mangal
        setUserData((prev) => ({ ...prev, mangal: option }));
        setCurrentStep(99);
        setTimeout(() => {
          finishConversation();
        }, 1000);
        break;

      // Event flow (10-13)
      case 10: // Event guests
        setUserData((prev) => ({ ...prev, eventGuests: option }));
        setCurrentStep(11);
        setTimeout(() => {
          addBotMessage(
            'יש לכם מקום לאירוע או צריכים מתחם? 🎪',
            ['יש לנו מקום ✅', 'צריכים מתחם 🏛️']
          );
        }, 1000);
        break;

      case 11: // Event venue
        setUserData((prev) => ({ ...prev, eventVenue: option }));
        setCurrentStep(12);
        setTimeout(() => {
          addBotMessage(
            'צריכים שירות הפקת אירועים מלא? 🎬',
            ['כן, הפקה מלאה! 🎉', 'לא, רק המקום 📍']
          );
        }, 1000);
        break;

      case 12: // Event production
        setUserData((prev) => ({ ...prev, eventProduction: option }));
        setCurrentStep(13);
        setTimeout(() => {
          addBotMessage(
            'מעולה! 💰\nמה התקציב שלכם לאירוע?',
            ['עד 50,000 ₪', '50,000-100,000 ₪', '100,000-200,000 ₪', '200,000+ ₪', 'גמיש 💪']
          );
        }, 1000);
        break;

      case 13: // Event budget
        setUserData((prev) => ({ ...prev, budget: option }));
        setCurrentStep(99);
        setTimeout(() => {
          finishConversation();
        }, 1000);
        break;

      // ← 🆕 Shabbat Hatan flow (20-24)
      case 20: // Shabbat Hatan location
        setUserData((prev) => ({ ...prev, location: option }));
        setCurrentStep(21);
        setTimeout(() => {
          addBotMessage('באיזה תאריך תתקיים שבת החתן? (לדוגמה: 15/01/2025)');
          setInputType('text');
          setShowInput(true);
        }, 1000);
        break;

      case 21: // Handled in handleInputSubmit

      case 22: // Shabbat Hatan budget
        setUserData((prev) => ({ ...prev, budget: option }));
        setCurrentStep(23);
        setTimeout(() => {
          addBotMessage(
            'כמה אורחים צפויים לשבת החתן? 👥',
            ['עד 30 אורחים', '30-50 אורחים', '50-100 אורחים', '100+ אורחים']
          );
        }, 1000);
        break;

      case 23: // Shabbat Hatan guests
        setUserData((prev) => ({ ...prev, shabbatHatanGuests: option }));
        setCurrentStep(24);
        setTimeout(() => {
          addBotMessage(
            'איזו רמת כשרות אתם צריכים? 🍽️',
            ['רבנות רגילה ✅', 'רבנות מהדרין ⭐', 'בד"ץ ⭐⭐', 'לא משנה 🤷‍♂️']
          );
        }, 1000);
        break;

      case 24: // Kashrut
        setUserData((prev) => ({ ...prev, kashrut: option }));
        setCurrentStep(25);
        setTimeout(() => {
          addBotMessage(
            'צריכים משגיח צמוד לשבת? 👨‍🍳',
            ['כן, חובה! ✅', 'לא צריך 🙅']
          );
        }, 1000);
        break;

      case 25: // Supervisor
        setUserData((prev) => ({ ...prev, supervisor: option }));
        setCurrentStep(99);
        setTimeout(() => {
          finishShabbatHatanConversation();
        }, 1000);
        break;
    }
  };

  const finishConversation = () => {
    addBotMessage(
      'מושלם! 🎉\n\nקיבלתי את כל הפרטים.\nעכשיו אשלח את הכל ל-WhatsApp ונחזור אליך במהרה עם הצעות מדויקות! 📱',
      ['שלח ל-WhatsApp ✅']
    );
  };

  const finishShabbatHatanConversation = () => {
    addBotMessage(
      'מושלם! 🎉💍\n\nקיבלתי את כל הפרטים לשבת החתן.\nעכשיו אשלח את הכל ל-WhatsApp ונחזור אליך במהרה עם הצעות מתאימות!\n\n📖 בינתיים, מוזמנים לקרוא עוד על שבת חתן בדף המיוחד שלנו:',
      ['שלח ל-WhatsApp ✅', 'קרא עוד על שבת חתן 📖']
    );
  };

  const sendToWhatsApp = () => {
    const responses = [];
    
    if (userData.name) responses.push(`👤 שם: ${userData.name}`);
    if (userData.phone) responses.push(`📱 טלפון: ${userData.phone}`);
    if (userData.propertyType) responses.push(`🏠 סוג שירות: ${userData.propertyType}`);
    
    if (userData.propertyType === 'מתחם אירועים 🎉') {
      if (userData.eventGuests) responses.push(`👥 מספר אורחים: ${userData.eventGuests}`);
      if (userData.eventVenue) responses.push(`📍 מקום: ${userData.eventVenue}`);
      if (userData.eventProduction) responses.push(`🎬 הפקה: ${userData.eventProduction}`);
      if (userData.budget) responses.push(`💰 תקציב: ${userData.budget}`);
    } else if (userData.propertyType === 'שבת חתן 🕍') {
      // ← 🆕 Shabbat Hatan data
      if (userData.location) responses.push(`📍 אזור: ${userData.location}`);
      if (userData.shabbatHatanDate) responses.push(`📅 תאריך: ${userData.shabbatHatanDate}`);
      if (userData.budget) responses.push(`💰 תקציב: ${userData.budget}`);
      if (userData.shabbatHatanGuests) responses.push(`👥 אורחים: ${userData.shabbatHatanGuests}`);
      if (userData.kashrut) responses.push(`🍽️ כשרות: ${userData.kashrut}`);
      if (userData.supervisor) responses.push(`👨‍🍳 משגיח: ${userData.supervisor}`);
    } else {
      if (userData.location) responses.push(`📍 אזור: ${userData.location}`);
      if (userData.guestCount) responses.push(`👥 אורחים: ${userData.guestCount}`);
      if (userData.dates) responses.push(`📅 תאריכים: ${userData.dates}`);
      if (userData.specificDate) responses.push(`📆 תאריך מדויק: ${userData.specificDate}`);
      if (userData.budget) responses.push(`💰 תקציב: ${userData.budget}`);
      if (userData.shabbat) responses.push(`⛪ שבת: ${userData.shabbat}`);
      if (userData.mangal) responses.push(`🔥 מנגל: ${userData.mangal}`);
    }

    const message = encodeURIComponent(
      `היי MULTIBRAWN! 👋\n\nזה סיכום התשובות שלי מהצ'אט:\n\n${responses.join('\n')}\n\nאשמח לקבל הצעות מתאימות!`
    );

    window.open(`https://wa.me/972523983394?text=${message}`, '_blank');
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Chat Button */}
      <div className={styles.chatButtonWrapper}>
        <button
          onClick={toggleChat}
          className={`${styles.chatButton} ${isVisible ? styles.visible : ''}`}
          data-chatbot
          aria-label="פתח צ'אט עם ערדית"
        >
          {isOpen ? (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            <img 
              src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1764669572/%D7%AA%D7%9E%D7%95%D7%A0%D7%94_%D7%9C%D7%91%D7%95%D7%98_dl5w3z.png"
              alt="ערדית"
              className={styles.avatarImage}
            />
          )}
        </button>
        {!isOpen && <div className={styles.chatLabel}>צ'אט עם ערדית</div>}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <div className={styles.headerInfo}>
              <h3>ערדית - העוזרת שלכם</h3>
              <p>🟢 אונליין עכשיו</p>
            </div>
          </div>

          <div className={styles.messages}>
            {messages.map((message) => (
              <div key={message.id} className={styles.messageWrapper}>
                <div className={`${styles.message} ${styles[message.role]}`}>
                  <div className={styles.messageContent}>{message.content}</div>
                  
                  {message.options && (
                    <div className={styles.options}>
                      {message.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            if (currentStep === 99 && option === 'שלח ל-WhatsApp ✅') {
                              sendToWhatsApp();
                            } else if (currentStep === 99 && option === 'קרא עוד על שבת חתן 📖') {
                              window.open('/shabbat-hatan', '_blank');
                            } else {
                              handleNextStep(option);
                            }
                          }}
                          className={styles.optionButton}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className={styles.messageWrapper}>
                <div className={`${styles.message} ${styles.assistant}`}>
                  <div className={styles.typingIndicator}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {showInput && (
            <form onSubmit={handleInputSubmit} className={styles.inputArea}>
              <input
                ref={inputRef}
                type={inputType}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={
                  inputType === 'tel' 
                    ? '05XXXXXXXX' 
                    : inputType === 'date'
                    ? 'DD/MM/YYYY'
                    : 'הקלד כאן...'
                }
                className={styles.input}
              />
              <button type="submit" className={styles.sendButton}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                </svg>
              </button>
            </form>
          )}
        </div>
      )}
    </>
  );
}
