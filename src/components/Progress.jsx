import { colors, spacing, radius, font } from '../theme';

export function ProgressBar({ value = 0 }) {
  return (
    <div style={{ background: colors.surfaceCard, height: '4px', borderRadius: radius.sm, width: '100%' }}>
      <div style={{ background: colors.accent, height: '4px', borderRadius: radius.sm, width: `${value}%`, transition: 'width 0.1s' }} />
    </div>
  );
}

export function Spinner({ label = 'Loading...' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px', animation: 'spin 0.6s linear infinite', color: colors.mute, fontSize: '16px' }}>⟳</span>
      <span style={{ color: colors.mute, fontSize: '14px', fontFamily: font }}>{label}</span>
    </div>
  );
}

export function ProgressSteps({ steps }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        {steps.map((step, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {i > 0 && (
              <span style={{ color: step.completed || step.active ? colors.success : colors.hairline }}>──</span>
            )}
            <span style={{
              color: step.completed ? colors.success : step.active ? colors.ink : colors.mute,
              fontSize: '14px',
            }}>{step.completed ? '[x]' : `[${i + 1}]`}</span>
          </span>
        ))}
      </div>
      <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', padding: '0 8px' }}>
        {steps.map((step, i) => (
          <span key={i} style={{ color: colors.mute, fontSize: '12px' }}>{step.label}</span>
        ))}
      </div>
    </div>
  );
}
