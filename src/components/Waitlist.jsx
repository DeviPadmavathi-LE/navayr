import React, { useState } from 'react';
import { useMascot } from '../context/MascotContext';

export default function Waitlist() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [experience, setExperience] = useState(null); // 'IMPRESSED' | 'INTERESTED' | null
  const [feedback, setFeedback] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'error' | 'success'
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    triggerTypingStart,
    triggerTypingPause,
    triggerProcessing,
    triggerRequestFailed,
    triggerTaskCompleted,
    resetToIdle,
  } = useMascot();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    triggerTypingStart();
    triggerTypingPause();
    if (status === 'error') {
      setStatus('idle');
      setErrorMessage('');
      resetToIdle();
    }
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    triggerTypingStart();
    triggerTypingPause();
    if (status === 'error') {
      setStatus('idle');
      setErrorMessage('');
      resetToIdle();
    }
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
    triggerTypingStart();
    triggerTypingPause();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    // Validate required email
    if (!email || !email.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your email address.');
      triggerRequestFailed('Please enter your email 🧐');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setStatus('error');
      setErrorMessage('Please enter a valid email.');
      triggerRequestFailed('Check the email format 🧐');
      return;
    }

    // Validate optional mobile number format (if provided)
    if (phone && phone.trim()) {
      const cleanPhone = phone.trim().replace(/[\s\-\(\)]/g, '');
      if (!/^\+?[0-9]{7,15}$/.test(cleanPhone)) {
        setStatus('error');
        setErrorMessage('Please enter a valid mobile number (e.g. +91 98201 45892).');
        triggerRequestFailed('Check phone format 🧐');
        return;
      }
    }

    // AI/Request is processing: working
    setIsSubmitting(true);
    triggerProcessing('working');

    // Unified payload
    const submissionPayload = {
      email: email.trim(),
      phone: phone.trim(),
      experience: experience || null,
      feedback: feedback.trim() || null
    };

    console.log('NAVAYR Waitlist Submission:', submissionPayload);

    // Smooth transition to confirmed success state and celebrate animation: celebrate -> happy -> idle
    setTimeout(() => {
      setIsSubmitting(false);
      setStatus('success');
      triggerTaskCompleted('Awesome! VIP Confirmed 🎉');
    }, 700);
  };

  return (
    <section 
      id="waitlist" 
      className="relative py-28 md:py-40 px-6 bg-theme-surface text-theme-text overflow-hidden flex flex-col items-center justify-center transition-colors duration-200 border-t border-theme-border"
    >
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FF6B02]/10 via-transparent to-transparent opacity-60 pointer-events-none" />

      <div className="relative z-10 w-full max-w-xl mx-auto text-center">
        
        {/* Destination Pre-Launch Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B02]/10 border border-[#FF6B02]/30 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B02] animate-pulse"></span>
          <span className="text-[11px] font-mono tracking-widest text-[#FF6B02] uppercase font-bold">
            10 — PRE-LAUNCH VIP ACCESS
          </span>
        </div>

        {/* Section Heading & Subheading */}
        <h2 className="text-5xl sm:text-6xl md:text-7xl font-display font-black tracking-tight text-theme-text uppercase mb-3">
          JOIN NAVAYR
        </h2>

        <p className="text-base sm:text-lg text-theme-muted font-normal mb-10 max-w-md mx-auto">
          Be first to discover your next fit.
        </p>

        {/* SINGLE UNIFIED FORM OR SUCCESS STATE */}
        {status !== 'success' ? (
          <form 
            onSubmit={handleSubmit}
            className="w-full bg-theme-card border border-theme-border-strong rounded-3xl p-6 sm:p-8 shadow-2xl text-left space-y-6 transition-colors"
          >
            {/* 1. Contact Information: Email & Mobile Number Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label 
                  htmlFor="waitlist-email" 
                  className="block text-xs font-mono uppercase tracking-wider text-theme-muted font-bold"
                >
                  EMAIL ADDRESS <span className="text-[#FF6B02]">*</span>
                </label>
                
                <input
                  id="waitlist-email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={handleEmailChange}
                  className={`w-full h-13 px-4 rounded-2xl bg-theme-surface border ${
                    status === 'error' && (!email || !/^\S+@\S+\.\S+$/.test(email.trim())) 
                      ? 'border-red-500/80 focus:border-red-500' 
                      : 'border-theme-border focus:border-[#FF6B02]'
                  } text-sm text-theme-text placeholder:text-theme-muted focus:outline-none focus:ring-1 focus:ring-[#FF6B02]/30 transition-all`}
                  aria-required="true"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label 
                    htmlFor="waitlist-phone" 
                    className="block text-xs font-mono uppercase tracking-wider text-theme-muted font-bold"
                  >
                    MOBILE NUMBER
                  </label>
                  <span className="text-[10px] font-mono text-theme-muted uppercase">
                    OPTIONAL
                  </span>
                </div>
                
                <input
                  id="waitlist-phone"
                  type="tel"
                  placeholder="+91 98201 45892"
                  value={phone}
                  onChange={handlePhoneChange}
                  className={`w-full h-13 px-4 rounded-2xl bg-theme-surface border ${
                    status === 'error' && phone && !/^\+?[0-9]{7,15}$/.test(phone.trim().replace(/[\s\-\(\)]/g, ''))
                      ? 'border-red-500/80 focus:border-red-500' 
                      : 'border-theme-border focus:border-[#FF6B02]'
                  } text-sm text-theme-text placeholder:text-theme-muted focus:outline-none focus:ring-1 focus:ring-[#FF6B02]/30 transition-all`}
                />
              </div>
            </div>

            {status === 'error' && (
              <p className="text-xs font-mono text-red-400 font-bold -mt-2">
                {errorMessage}
              </p>
            )}

            {/* 2. Feedback Selection: EXACTLY TWO OPTIONS */}
            <div className="space-y-2.5 pt-2 border-t border-theme-border">
              <span className="block text-xs font-mono uppercase tracking-wider text-theme-muted font-bold">
                HOW DID NAVAYR FEEL?
              </span>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setExperience(prev => prev === 'IMPRESSED' ? null : 'IMPRESSED')}
                  className={`h-12 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all border ${
                    experience === 'IMPRESSED'
                      ? 'border-[#FF6B02] bg-[#FF6B02]/15 text-[#FF6B02] shadow-sm'
                      : 'border-theme-border bg-theme-surface text-theme-muted hover:text-theme-text hover:border-theme-border-strong'
                  }`}
                  aria-pressed={experience === 'IMPRESSED'}
                >
                  IMPRESSED
                </button>

                <button
                  type="button"
                  onClick={() => setExperience(prev => prev === 'INTERESTED' ? null : 'INTERESTED')}
                  className={`h-12 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all border ${
                    experience === 'INTERESTED'
                      ? 'border-[#FF6B02] bg-[#FF6B02]/15 text-[#FF6B02] shadow-sm'
                      : 'border-theme-border bg-theme-surface text-theme-muted hover:text-theme-text hover:border-theme-border-strong'
                  }`}
                  aria-pressed={experience === 'INTERESTED'}
                >
                  INTERESTED
                </button>
              </div>
            </div>

            {/* 3. Optional Manual Feedback Textarea */}
            <div className="space-y-2 pt-2 border-t border-theme-border">
              <div className="flex items-center justify-between">
                <label 
                  htmlFor="waitlist-feedback"
                  className="block text-xs font-mono uppercase tracking-wider text-theme-muted font-bold"
                >
                  TELL US MORE
                </label>
                <span className="text-[10px] font-mono text-theme-muted uppercase">
                  OPTIONAL
                </span>
              </div>

              <textarea
                id="waitlist-feedback"
                rows={3}
                placeholder="What should we know?"
                value={feedback}
                onChange={handleFeedbackChange}
                className="w-full p-3.5 rounded-2xl bg-theme-surface border border-theme-border text-xs sm:text-sm text-theme-text placeholder:text-theme-muted focus:outline-none focus:border-[#FF6B02] focus:ring-1 focus:ring-[#FF6B02]/30 resize-none transition-all"
              />
            </div>

            {/* 4. Exactly ONE Submission Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-13 rounded-2xl bg-[#FF6B02] text-[#020108] font-mono font-black text-xs uppercase tracking-wider hover:bg-[#FF852E] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-lg shadow-[#FF6B02]/25 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isSubmitting ? 'PROCESSING...' : 'SEND'}</span>
                <span className="text-base">{isSubmitting ? '✦' : '→'}</span>
              </button>
            </div>
          </form>
        ) : (
          /* MINIMAL ELEGANT SUCCESS STATE */
          <div className="w-full bg-theme-card border border-[#FF6B02]/40 rounded-3xl p-8 sm:p-12 shadow-2xl text-center space-y-4 animate-in fade-in duration-300">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#FF6B02]/15 text-[#FF6B02] text-xl font-bold mb-2">
              ●
            </div>

            <h3 className="font-display font-black text-2xl sm:text-3xl text-theme-text tracking-tight uppercase">
              YOU&apos;RE IN.
            </h3>

            <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#FF6B02] font-bold">
              THANK YOU FOR HELPING SHAPE NAVAYR.
            </p>

            <p className="text-xs sm:text-sm text-theme-muted max-w-sm mx-auto font-normal pt-1">
              Priority invitation reserved for <strong className="text-theme-text">{email}</strong>{phone ? <> (<strong className="text-theme-text">{phone}</strong>)</> : ''}. We will reach out when early access unlocks.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}
