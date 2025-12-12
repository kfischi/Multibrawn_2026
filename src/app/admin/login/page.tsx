// src/app/admin/login/page.tsx
'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

// CRITICAL: Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetMode, setResetMode] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { supabase } = await import('@/lib/supabase/client');
      
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (signInError) {
        setError('אימייל או סיסמה שגויים');
        setLoading(false);
        return;
      }

      router.push('/admin');
    } catch (err) {
      setError('שגיאה בהתחברות. נסה שוב.');
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { supabase } = await import('@/lib/supabase/client');
      
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin/reset-password`,
      });
      
      if (resetError) {
        setError('שגיאה בשליחת אימייל לאיפוס סיסמה');
        setLoading(false);
        return;
      }

      setResetSent(true);
      setLoading(false);
    } catch (err) {
      setError('שגיאה בשליחת אימייל. נסה שוב.');
      setLoading(false);
    }
  };

  if (resetSent) {
    return (
      <div className={styles.container}>
        <div className={styles.background}>
          <div className={styles.gradientOrb1}></div>
          <div className={styles.gradientOrb2}></div>
          <div className={styles.gradientOrb3}></div>
        </div>

        <div className={styles.card}>
          <div className={styles.logoContainer}>
            <img 
              src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1733583123/multibrawn-logo_wvmkbd.png"
              alt="MULTIBRAWN"
              className={styles.logo}
            />
          </div>

          <h1 className={styles.title}>אימייל נשלח!</h1>
          <p className={styles.subtitle}>בדוק את תיבת הדואר שלך</p>

          <div className={styles.successBox}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            <p>שלחנו לך קישור לאיפוס סיסמה לכתובת:</p>
            <strong>{email}</strong>
            <p style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '16px' }}>
              לחץ על הקישור באימייל כדי לאפס את הסיסמה שלך
            </p>
          </div>

          <button
            onClick={() => {
              setResetSent(false);
              setResetMode(false);
            }}
            className={styles.backButton}
          >
            חזרה למסך התחברות
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div className={styles.gradientOrb1}></div>
        <div className={styles.gradientOrb2}></div>
        <div className={styles.gradientOrb3}></div>
      </div>

      <div className={styles.card}>
        <div className={styles.logoContainer}>
          <img 
            src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1733583123/multibrawn-logo_wvmkbd.png"
            alt="MULTIBRAWN"
            className={styles.logo}
          />
        </div>

        <h1 className={styles.title}>
          {resetMode ? 'איפוס סיסמה' : 'כניסה למערכת ניהול'}
        </h1>
        <p className={styles.subtitle}>
          {resetMode ? 'הזן את האימייל שלך לאיפוס סיסמה' : 'MULTIBRAWN Admin Panel'}
        </p>

        {error && (
          <div className={styles.error}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={resetMode ? handleResetPassword : handleLogin} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              אימייל
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              placeholder="your@email.com"
              required
              disabled={loading}
            />
          </div>

          {!resetMode && (
            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>
                סיסמה
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                placeholder="••••••••"
                required
                disabled={loading}
              />
            </div>
          )}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? (
              <div className={styles.spinner}></div>
            ) : resetMode ? (
              'שלח קישור לאיפוס'
            ) : (
              'כניסה למערכת'
            )}
          </button>
        </form>

        <div className={styles.footer}>
          <button
            onClick={() => {
              setResetMode(!resetMode);
              setError('');
            }}
            className={styles.linkButton}
          >
            {resetMode ? '← חזרה להתחברות' : 'שכחת סיסמה?'}
          </button>
        </div>
      </div>
    </div>
  );
}
