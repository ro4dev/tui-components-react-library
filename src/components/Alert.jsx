import { useState, useEffect, useRef } from 'react';
import { colors, spacing, radius, font } from '../theme';

const typeConfig = {
  info: { icon: '[i]', borderColor: colors.accent, iconColor: colors.accent },
  warning: { icon: '[!]', borderColor: colors.warning, iconColor: colors.warning },
  danger: { icon: '[x]', borderColor: colors.danger, iconColor: colors.danger },
  success: { icon: '[✓]', borderColor: colors.success, iconColor: colors.success },
};

function alertStyle(type, removing) {
  return {
    background: colors.surfaceSoft,
    borderRadius: radius.sm,
    padding: `${spacing.md} ${spacing.lg}`,
    position: 'relative',
    borderLeft: `3px solid ${typeConfig[type].borderColor}`,
    animation: removing ? 'none' : undefined,
    opacity: removing ? 0 : 1,
    transform: removing ? 'translateX(100%)' : 'none',
    transition: 'opacity 0.3s, transform 0.3s',
    overflow: 'hidden',
  };
}

export function AlertBlock({ type, title, children, onDismiss, autoDismiss }) {
  const [removing, setRemoving] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (autoDismiss && (type === 'info' || type === 'success')) {
      timerRef.current = setTimeout(() => handleDismiss(), 5000);
    }
    return () => clearTimeout(timerRef.current);
  }, []);

  function handleDismiss() {
    setRemoving(true);
    setTimeout(() => onDismiss && onDismiss(), 300);
  }

  const cfg = typeConfig[type] || typeConfig.info;

  return (
    <div style={alertStyle(type, removing)}>
      <button
        style={{
          position: 'absolute',
          top: spacing.sm,
          right: spacing.md,
          background: 'none',
          border: 'none',
          color: colors.mute,
          cursor: 'pointer',
          fontSize: '14px',
          fontFamily: font,
          padding: 0,
          lineHeight: 1,
        }}
        onClick={handleDismiss}
      >[×]</button>
      <span style={{ marginRight: spacing.xs, color: cfg.iconColor }}>{cfg.icon}</span>
      <span style={{ fontWeight: 700, color: colors.ink, display: 'block', marginBottom: spacing.xs }}>{title}</span>
      <span style={{ color: colors.body }}>{children}</span>
    </div>
  );
}

export function AlertInline({ type, children }) {
  const cfg = typeConfig[type] || typeConfig.info;
  return (
    <span style={{ color: cfg.iconColor }}>
      <span>{cfg.icon} </span>
      {children}
    </span>
  );
}

export default function Alert({ type = 'info', inline, children, ...props }) {
  if (inline) return <AlertInline type={type}>{children}</AlertInline>;
  return <AlertBlock type={type} {...props}>{children}</AlertBlock>;
}
