import { useState } from 'react';
import { colors, spacing, radius, font } from '../theme';

const icons = {
  info: '[i]', warning: '[!]', danger: '[x]', success: '[✓]',
};

const alertColors = {
  info: colors.accent, warning: colors.warning, danger: colors.danger, success: colors.success,
};

export function Alert({ type = 'info', title, children, onDismiss, inline }) {
  const [removing, setRemoving] = useState(false);
  const [visible, setVisible] = useState(true);

  const handleDismiss = () => {
    setRemoving(true);
    setTimeout(() => { setVisible(false); onDismiss?.(); }, 300);
  };

  if (!visible) return null;

  const iconColor = alertColors[type] || alertColors.info;

  if (inline) {
    return (
      <span style={{ color: iconColor }}>
        <span>{icons[type]} </span>
        {children}
      </span>
    );
  }

  return (
    <div style={{
      background: colors.surfaceSoft,
      borderRadius: radius.sm,
      padding: `${spacing.md} ${spacing.lg}`,
      position: 'relative',
      borderLeft: `3px solid ${iconColor}`,
      opacity: removing ? 0 : 1,
      transform: removing ? 'translateX(100%)' : 'none',
      transition: 'opacity 0.3s, transform 0.3s',
      overflow: 'hidden',
    }}>
      <button
        style={{
          position: 'absolute', top: spacing.sm, right: spacing.md,
          background: 'none', border: 'none', color: colors.mute,
          cursor: 'pointer', fontSize: '14px', fontFamily: font,
          padding: 0, lineHeight: 1,
        }}
        onClick={handleDismiss}
      >[×]</button>
      <span style={{ marginRight: spacing.xs, color: iconColor }}>{icons[type]}</span>
      <span style={{ fontWeight: 700, color: colors.ink, display: 'block', marginBottom: spacing.xs }}>{title}</span>
      <span style={{ color: colors.body }}>{children}</span>
    </div>
  );
}
