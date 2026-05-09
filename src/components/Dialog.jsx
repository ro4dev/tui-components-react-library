import { useEffect } from 'react';
import { colors, spacing, radius, font } from '../theme';

const overlayStyle = (active) => ({
  position: 'fixed',
  inset: 0,
  background: colors.inkDeep,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 100,
  opacity: active ? 1 : 0,
  pointerEvents: active ? 'all' : 'none',
  transition: 'opacity 0.2s',
});

const dialogStyle = (dark) => ({
  background: dark ? colors.surfaceDark : colors.canvas,
  border: `1px solid ${colors.hairlineStrong}`,
  borderRadius: radius.sm,
  width: '100%',
  maxWidth: '480px',
});

const btnBase = {
  fontFamily: font,
  fontSize: '14px',
  padding: '8px 16px',
  borderRadius: radius.sm,
  cursor: 'pointer',
  border: `1px solid ${colors.hairlineStrong}`,
};

export default function Dialog({ open, onClose, dark, title, children, footer }) {
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
    }
    if (open) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  const dStyle = dialogStyle(dark);

  return (
    <div style={overlayStyle(true)} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={dStyle}>
        <div style={{
          padding: '16px 20px',
          borderBottom: `1px solid ${colors.hairline}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span style={{ fontWeight: 700, color: dark ? colors.onDark : colors.ink }}>{title}</span>
          <button
            style={{
              background: 'none', border: 'none', color: colors.mute, cursor: 'pointer',
              fontSize: '18px', fontFamily: font, width: '36px', height: '36px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
            onClick={onClose}
          >[×]</button>
        </div>
        <div style={{ padding: '20px', color: dark ? colors.onDark : colors.body }}>{children}</div>
        {footer && (
          <div style={{
            padding: '12px 20px',
            borderTop: `1px solid ${colors.hairline}`,
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '8px',
          }}>
            {footer.map((btn, i) => (
              <button
                key={i}
                style={{
                  ...btnBase,
                  background: btn.variant === 'primary' ? colors.ink
                    : btn.variant === 'danger' ? colors.danger
                    : 'transparent',
                  color: btn.variant ? colors.onDark : colors.body,
                  borderColor: btn.variant ? 'transparent' : colors.hairlineStrong,
                }}
                onClick={btn.onClick}
              >{btn.label}</button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
