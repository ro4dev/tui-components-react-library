import { useState } from 'react';
import { colors, radius, font } from '../theme';

const statusOrder = ['active', 'warning', 'error', 'idle'];
const statusConfig = {
  active: { bg: colors.success, color: colors.onDark },
  warning: { bg: colors.warning, color: colors.ink },
  error: { bg: colors.danger, color: colors.onDark },
  idle: { bg: colors.surfaceCard, color: colors.mute },
};

export function StatusBadge({ initial = 'active' }) {
  const [state, setState] = useState(initial);
  const cfg = statusConfig[state];

  function cycle() {
    const idx = statusOrder.indexOf(state);
    setState(statusOrder[(idx + 1) % statusOrder.length]);
  }

  return (
    <span
      onClick={cycle}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding: '2px 8px',
        fontSize: '14px',
        fontFamily: font,
        borderRadius: radius.full,
        border: '1px solid transparent',
        background: cfg.bg,
        color: cfg.color,
        cursor: 'pointer',
      }}
    >{'●'} {state.charAt(0).toUpperCase() + state.slice(1)}</span>
  );
}

export function LabelBadge({ children, accent }) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '2px 8px',
      fontSize: '14px',
      fontFamily: font,
      borderRadius: accent ? radius.full : radius.sm,
      background: accent ? colors.accent : colors.surfaceCard,
      color: accent ? colors.onDark : colors.mute,
      border: `1px solid ${accent ? colors.accent : colors.hairline}`,
    }}>
      {children}
    </span>
  );
}

export function CounterBadge({ count }) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: colors.danger,
      color: colors.onDark,
      fontSize: '14px',
      fontFamily: font,
      borderRadius: radius.full,
      minWidth: '20px',
      height: '20px',
      padding: '0 6px',
    }}>
      {count}
    </span>
  );
}

export function InteractiveCounter({ label, initial = 0 }) {
  const [value, setValue] = useState(initial);

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      padding: '4px 8px',
      background: colors.surfaceCard,
      border: `1px solid ${colors.hairline}`,
      borderRadius: radius.full,
      fontFamily: font,
      fontSize: '12px',
    }}>
      <button
        style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: font, fontSize: '14px', color: colors.accent, padding: '0 4px', lineHeight: 1 }}
        onClick={() => setValue(Math.max(0, value - 1))}
      >[-]</button>
      <span style={{ minWidth: '24px', textAlign: 'center', color: colors.ink, fontWeight: 600 }}>{value}</span>
      <button
        style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: font, fontSize: '14px', color: colors.accent, padding: '0 4px', lineHeight: 1 }}
        onClick={() => setValue(value + 1)}
      >[+]</button>
      <span style={{ marginLeft: '4px', color: colors.body }}>{label}</span>
    </span>
  );
}
