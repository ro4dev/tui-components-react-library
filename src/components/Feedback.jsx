import { useEffect, useState } from 'react';
import { colors, spacing, radius, font } from '../theme';

let toastId = 0;
const listeners = [];

export function toast(type, message) {
  const t = { id: ++toastId, type, message };
  listeners.forEach(fn => fn(t));
}

export function ToastContainer({ max = 5 }) {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handler = (t) => {
      setToasts(prev => {
        const next = [...prev, t];
        return next.length > max ? next.slice(next.length - max) : next;
      });
      if (t.type === 'info' || t.type === 'success') {
        setTimeout(() => {
          setToasts(prev => prev.filter(x => x.id !== t.id));
        }, 5000);
      }
    };
    listeners.push(handler);
    return () => {
      const idx = listeners.indexOf(handler);
      if (idx >= 0) listeners.splice(idx, 1);
    };
  }, [max]);

  const toastBorderColors = {
    info: colors.accent, success: colors.success, danger: colors.danger, warning: colors.warning,
  };

  return (
    <div style={{
      position: 'fixed', bottom: spacing.lg, right: spacing.lg,
      display: 'flex', flexDirection: 'column', gap: spacing.sm, zIndex: 200,
    }}>
      {toasts.map(t => (
        <div key={t.id} style={{
          background: colors.surfaceDark, color: colors.onDark,
          borderRadius: radius.sm, padding: '12px 16px', maxWidth: '360px',
          position: 'relative',
          borderLeft: `3px solid ${toastBorderColors[t.type] || colors.accent}`,
        }}>
          <button
            style={{
              position: 'absolute', top: '4px', right: '8px',
              background: 'none', border: 'none', color: colors.ash,
              cursor: 'pointer', fontFamily: font, fontSize: '14px',
            }}
            onClick={() => setToasts(prev => prev.filter(x => x.id !== t.id))}
          >[×]</button>
          {t.message}
        </div>
      ))}
    </div>
  );
}

const skeletonVariants = {
  text: { height: '16px', marginBottom: '8px' },
  avatar: { width: '32px', height: '32px', borderRadius: radius.full },
  thumbnail: { width: '120px', height: '80px' },
};

export function Skeleton({ variant = 'text', width }) {
  const shape = skeletonVariants[variant] || skeletonVariants.text;
  return (
    <div style={{
      background: colors.surfaceCard,
      borderRadius: radius.sm,
      animation: 'skeletonPulse 1.2s ease-in-out infinite',
      ...shape,
      ...(width ? { width } : {}),
    }} />
  );
}
