import { useState, useEffect, useRef, useCallback } from 'react';
import { colors, spacing, radius, font } from '../theme';

const toastColors = {
  info: { left: colors.accent },
  success: { left: colors.success },
  error: { left: colors.danger },
  warning: { left: colors.warning },
};

export function Toast({ type = 'info', children, onDismiss, autoDismiss }) {
  const [removing, setRemoving] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (autoDismiss && (type === 'info' || type === 'success')) {
      timerRef.current = setTimeout(dismiss, 5000);
    }
    return () => clearTimeout(timerRef.current);
  }, []);

  function dismiss() {
    setRemoving(true);
    setTimeout(() => onDismiss && onDismiss(), 300);
  }

  return (
    <div style={{
      background: colors.surfaceDark,
      color: colors.onDark,
      borderRadius: radius.sm,
      padding: '12px 16px',
      maxWidth: '360px',
      borderLeft: `3px solid ${toastColors[type]?.left || colors.accent}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: spacing.sm,
      opacity: removing ? 0 : 1,
      transform: removing ? 'translateX(100%)' : 'none',
      transition: 'opacity 0.3s, transform 0.3s',
    }}>
      <span style={{ fontSize: '14px' }}>{children}</span>
      <button
        style={{
          background: 'none', border: 'none', color: colors.ash, cursor: 'pointer',
          fontFamily: font, fontSize: '14px', padding: 0, flexShrink: 0,
        }}
        onClick={dismiss}
      >[×]</button>
    </div>
  );
}

export function ToastContainer({ toasts, onDismiss }) {
  return (
    <div style={{
      position: 'fixed',
      bottom: spacing.lg,
      right: spacing.lg,
      display: 'flex',
      flexDirection: 'column',
      gap: spacing.sm,
      zIndex: 200,
    }}>
      {toasts.map((t, i) => (
        <Toast key={i} type={t.type} onDismiss={() => onDismiss(i)} autoDismiss={t.autoDismiss}>
          {t.message}
        </Toast>
      ))}
    </div>
  );
}

const skeletonKeys = {
  avatar: { width: '32px', height: '32px', borderRadius: radius.full },
  heading: { height: '16px', width: '60%' },
  line: { height: '12px', width: '100%' },
  lineShort: { height: '12px', width: '40%' },
  lineMedium: { height: '12px', width: '75%' },
  thumbnail: { height: '80px', width: '120px' },
};

export function Skeleton({ variant = 'line' }) {
  const shape = skeletonKeys[variant] || skeletonKeys.line;
  return (
    <div style={{
      background: colors.surfaceCard,
      borderRadius: radius.sm,
      ...shape,
      animation: 'skeletonPulse 1.2s ease-in-out infinite',
    }} />
  );
}

export function SkeletonCard() {
  const [loading, setLoading] = useState(true);

  return (
    <div>
      <button
        style={{
          fontFamily: font, fontSize: '14px', padding: '6px 12px',
          borderRadius: radius.sm, cursor: 'pointer',
          border: `1px solid ${colors.hairlineStrong}`, background: colors.canvas, color: colors.body,
          marginBottom: spacing.md,
        }}
        onClick={() => setLoading(!loading)}
      >[←] Toggle Skeleton</button>
      {loading ? (
        <div style={{
          padding: spacing.lg, border: `1px solid ${colors.hairline}`,
          borderRadius: radius.sm, background: colors.surfaceSoft,
        }}>
          <div style={{ display: 'flex', gap: spacing.md, marginBottom: spacing.md }}>
            <Skeleton variant="avatar" />
            <div style={{ flex: 1 }}>
              <Skeleton variant="heading" />
              <div style={{ marginTop: '4px' }}><Skeleton variant="lineMedium" /></div>
            </div>
          </div>
          <div style={{ marginBottom: spacing.sm }}><Skeleton variant="line" /></div>
          <div style={{ marginBottom: spacing.sm }}><Skeleton variant="lineShort" /></div>
          <Skeleton variant="thumbnail" />
        </div>
      ) : (
        <div style={{
          padding: spacing.lg, border: `1px solid ${colors.hairline}`,
          borderRadius: radius.sm, background: colors.canvas,
        }}>
          <div style={{ display: 'flex', gap: spacing.md, marginBottom: spacing.md }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: radius.full,
              background: colors.accent, display: 'flex', alignItems: 'center',
              justifyContent: 'center', color: colors.onDark, fontWeight: 700,
            }}>JD</div>
            <div>
              <div style={{ fontSize: '14px', color: colors.ink, fontWeight: 500 }}>Jane Doe</div>
              <div style={{ fontSize: '12px', color: colors.mute }}>Software Engineer</div>
            </div>
          </div>
          <p style={{ fontSize: '13px', color: colors.body, lineHeight: 1.6, margin: 0 }}>
            This is the loaded content after the skeleton animation completes. The user profile is now visible with all details.
          </p>
        </div>
      )}
    </div>
  );
}

export function InlineValidation({ type, value }) {
  const [touched, setTouched] = useState(false);

  let error = null;
  let success = null;

  if (touched && value) {
    if (type === 'email') {
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      if (valid) success = '[✓] Valid email address';
      else error = '[!] Please enter a valid email address';
    } else if (type === 'username') {
      if (value.length < 3) error = '[!] Username must be at least 3 characters';
      else if (value.length > 16) error = '[!] Username must be 16 characters or less';
      else success = '[✓] Username is available';
    } else if (type === 'password') {
      if (value.length < 8) error = '[!] Password must be at least 8 characters';
      else success = '[✓] Password strength: good';
    }
  }

  return { error, success, touched, setTouched };
}
