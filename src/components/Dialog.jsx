import { useEffect } from 'react';
import { colors, radius, font } from '../theme';

const overlayActive = {
  position: 'fixed', inset: 0, background: 'var(--ink-deep)',
  display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100,
  opacity: 1, pointerEvents: 'all', transition: 'opacity 0.2s',
};

const overlayHidden = {
  ...overlayActive,
  opacity: 0, pointerEvents: 'none',
};

const dialogBase = {
  background: colors.canvas,
  border: `1px solid ${colors.hairlineStrong}`,
  borderRadius: radius.sm,
  width: '100%',
  maxWidth: '480px',
};

export function Dialog({ open, onClose, title, children, footer, variant = 'default' }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape' && open) onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const isDark = variant === 'dark';

  return (
    <div style={open ? overlayActive : overlayHidden} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{
        ...dialogBase,
        background: isDark ? colors.surfaceDark : colors.canvas,
      }}>
        <div style={{
          padding: '16px 20px', borderBottom: `1px solid ${colors.hairline}`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{ fontWeight: 700, color: isDark ? colors.onDark : colors.ink }}>{title}</span>
          <button
            style={{
              background: 'none', border: 'none', color: colors.mute, cursor: 'pointer',
              fontSize: '18px', fontFamily: font, width: '36px', height: '36px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
            onClick={onClose}
          >[×]</button>
        </div>
        <div style={{ padding: '20px', color: isDark ? colors.onDark : colors.body }}>{children}</div>
        {footer && (
          <div style={{
            padding: '12px 20px', borderTop: `1px solid ${colors.hairline}`,
            display: 'flex', justifyContent: 'flex-end', gap: '8px',
          }}>{footer}</div>
        )}
      </div>
    </div>
  );
}
