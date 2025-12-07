'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './ChatBot.module.css';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: '1',
        role: 'assistant',
        content: `היי! 👋 אני ערדית, העוזרת הדיגיטלית של MULTIBRAWN!

אני כאן לעזור לך למצוא את הנכס המושלם לנופש או לאירוע שלך 🏡✨

ספר/י לי - מה את/ה מחפש/ת?`,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [messages.length]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Delayed visibility
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Call Gemini API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input.trim(),
          conversationHistory,
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setConversationHistory(data.history);

      // Check if conversation is ready for WhatsApp
      if (data.isSummary) {
        setShowWhatsApp(true);
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'אופס! משהו השתבש. נסה/י שוב או פנה/י אלינו בוואטסאפ 🙏',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickReply = async (text: string) => {
    setInput(text);
    // Auto-send after a short delay
    setTimeout(() => {
      handleSend();
    }, 100);
  };

  const exportToWhatsApp = () => {
    const conversationText = messages
      .map((msg) => {
        const time = msg.timestamp.toLocaleTimeString('he-IL', {
          hour: '2-digit',
          minute: '2-digit',
        });
        const speaker = msg.role === 'user' ? 'אני' : 'ערדית';
        return `[${time}] ${speaker}: ${msg.content}`;
      })
      .join('\n\n');

    const whatsappMessage = `היי! הנה סיכום השיחה שלי עם ערדית:

${conversationText}

אשמח לקבל עזרה להמשך 🙏`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/972523983394?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  // Quick reply suggestions based on conversation state
  const getQuickReplies = () => {
    if (messages.length <= 1) {
      return [
        '🏡 צימר רומנטי',
        '🏛️ וילה משפחתית',
        '🏙️ דירת נופש',
        '💍 מתחם לאירוע',
      ];
    }
    return [];
  };

  const quickReplies = getQuickReplies();

  return (
    <>
      {/* Floating Button */}
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
        {!isOpen && <span className={styles.badge}>ערדית</span>}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className={styles.chatWindow}>
          {/* Header */}
          <div className={styles.chatHeader}>
            <div className={styles.headerInfo}>
              <div className={styles.avatar}>
                <img 
                  src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1764669572/%D7%AA%D7%9E%D7%95%D7%A0%D7%94_%D7%9C%D7%91%D7%95%D7%98_dl5w3z.png" 
                  alt="ערדית"
                  className={styles.avatarImg}
                />
              </div>
              <div>
                <h3>ערדית - AI Assistant</h3>
                <p className={styles.status}>
                  <span className={styles.statusDot}></span>
                  מופעלת ע"י Gemini AI
                </p>
              </div>
            </div>
            <button onClick={toggleChat} className={styles.closeBtn} aria-label="סגור">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6L18 18"/>
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className={styles.messagesArea}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={msg.role === 'user' ? styles.userMessage : styles.assistantMessage}
              >
                {msg.role === 'assistant' && (
                  <div className={styles.messageAvatar}>
                    <img 
                      src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1764669572/%D7%AA%D7%9E%D7%95%D7%A0%D7%94_%D7%9C%D7%91%D7%95%D7%98_dl5w3z.png" 
                      alt="ערדית"
                      className={styles.avatarSmall}
                    />
                  </div>
                )}
                <div className={styles.messageBubble}>
                  <div className={styles.messageContent}>{msg.content}</div>
                  <div className={styles.messageTime}>
                    {msg.timestamp.toLocaleTimeString('he-IL', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isLoading && (
              <div className={styles.assistantMessage}>
                <div className={styles.messageAvatar}>
                  <img 
                    src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1764669572/%D7%AA%D7%9E%D7%95%D7%A0%D7%94_%D7%9C%D7%91%D7%95%D7%98_dl5w3z.png" 
                    alt="ערדית"
                    className={styles.avatarSmall}
                  />
                </div>
                <div className={styles.typingIndicator}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}

            {/* WhatsApp CTA */}
            {showWhatsApp && (
              <div className={styles.whatsappCTA}>
                <button onClick={exportToWhatsApp} className={styles.whatsappButton}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  שלח לערדית בוואטסאפ
                </button>
                <p className={styles.whatsappHint}>
                  כל השיחה שלנו תישלח אוטומטית 📱
                </p>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {quickReplies.length > 0 && !isLoading && (
            <div className={styles.quickReplies}>
              {quickReplies.map((reply, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickReply(reply)}
                  className={styles.quickReplyBtn}
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div className={styles.inputArea}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="כתבי הודעה לערדית..."
              className={styles.input}
              rows={1}
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className={styles.sendButton}
              aria-label="שלח"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
              </svg>
            </button>
          </div>

          {/* Powered by */}
          <div className={styles.poweredBy}>
            <span>Powered by</span>
            <svg width="60" height="20" viewBox="0 0 320 88" fill="currentColor">
              <path d="M41.5 28.5h9v31h-9v-31zm78.5 0h-9v31h9v-31zm-39.3 0v31h9V44.4l9.7 15.1h8.4V28.5h-9v15.1l-9.7-15.1h-8.4zm31.8 0v31h27v-7h-18v-6h16v-7h-16v-4h18v-7h-27zm-62.5 0v31h27v-7h-18v-6h16v-7h-16v-4h18v-7h-27z"/>
            </svg>
          </div>
        </div>
      )}
    </>
  );
}
