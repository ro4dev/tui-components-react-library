import { colors, radius, font } from '../theme';

const statusLabels = { active: 'Active', warning: 'Warning', error: 'Error', idle: 'Idle' };
const statusStyles = {
  active: { bg: colors.success, color: colors.onDark },
  warning: { bg: colors.warning, color: colors.ink },
  error: { bg: colors.danger, color: colors.onDark },
  idle: { bg: colors.surfaceCard, color: colors.mute },
};

export function StatusBadge({ state, label }) {
  const s = statusStyles[state] || statusStyles.idle;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '4px',
      padding: '2px 8px', fontSize: '14px', fontFamily: font,
      borderRadius: radius.full, border: '1px solid transparent',
      background: s.bg, color: s.color,
    }}>{'●'} {label ?? statusLabels[state]}</span>
  );
}

export function LabelBadge({ children, accent }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', padding: '2px 8px',
      fontSize: '14px', fontFamily: font,
      borderRadius: accent ? radius.full : radius.sm,
      background: accent ? colors.accent : colors.surfaceCard,
      color: accent ? colors.onDark : colors.mute,
      border: `1px solid ${accent ? colors.accent : colors.hairline}`,
    }}>{children}</span>
  );
}

export function CounterBadge({ count }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      background: colors.danger, color: colors.onDark, fontSize: '14px',
      fontFamily: font, borderRadius: radius.full, minWidth: '20px',
      height: '20px', padding: '0 6px',
    }}>{count}</span>
  );
}
