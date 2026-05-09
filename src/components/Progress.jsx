import { useState, useRef } from 'react';
import { colors, spacing, radius, font } from '../theme';

export function ProgressBar({ value = 0, animate }) {
  const [width, setWidth] = useState(value);

  if (animate && width < 100) {
    setTimeout(() => {
      const next = Math.min(width + 2, 100);
      setWidth(next);
    }, 50);
  }

  return (
    <div style={{
      background: colors.surfaceCard,
      height: '4px',
      borderRadius: radius.sm,
      width: '100%',
    }}>
      <div style={{
        background: colors.accent,
        height: '4px',
        borderRadius: radius.sm,
        width: `${width}%`,
        transition: 'width 0.1s',
      }} />
    </div>
  );
}

export function ProgressBarControls() {
  const [value, setValue] = useState(0);
  const animRef = useRef(null);

  function animateToFull() {
    let v = 0;
    clearInterval(animRef.current);
    animRef.current = setInterval(() => {
      v += 2;
      if (v > 100) { clearInterval(animRef.current); return; }
      setValue(v);
    }, 50);
  }

  return (
    <div>
      <div style={{ background: colors.surfaceCard, height: '4px', borderRadius: radius.sm, width: '100%', marginBottom: spacing.md }}>
        <div style={{ background: colors.accent, height: '4px', borderRadius: radius.sm, width: `${value}%`, transition: 'width 0.1s' }} />
      </div>
      <div style={{ display: 'flex', gap: spacing.sm, flexWrap: 'wrap' }}>
        {[0, 25, 50, 75, 100].map(v => (
          <button key={v}
            style={{
              fontFamily: font, fontSize: '14px', padding: '4px 12px', borderRadius: radius.sm,
              cursor: 'pointer', border: `1px solid ${colors.hairlineStrong}`, background: colors.canvas, color: colors.body,
            }}
            onClick={() => { clearInterval(animRef.current); setValue(v); }}
          >{v === 0 ? '[∅]' : v + '%'}</button>
        ))}
        <button
          style={{
            fontFamily: font, fontSize: '14px', padding: '4px 12px', borderRadius: radius.sm,
            cursor: 'pointer', border: `1px solid ${colors.hairlineStrong}`, background: colors.ink, color: colors.onDark,
          }}
          onClick={animateToFull}
        >[↑] Animate</button>
      </div>
    </div>
  );
}

export function Spinner({ label = 'Loading...', speed = '0.6s' }) {
  const [paused, setPaused] = useState(false);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
      <span style={{
        display: 'inline-block',
        animation: paused ? 'none' : `spin ${speed} linear infinite`,
        color: colors.mute,
        fontSize: '16px',
      }}>⟳</span>
      <span style={{ color: colors.mute, fontSize: '14px', fontFamily: font }}>{label}</span>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export function ProgressSteps({ steps, currentStep }) {
  const [step, setStep] = useState(currentStep || 2);

  const labels = ['Init', 'Build', 'Test', 'Done'];

  function renderSteps() {
    const els = [];
    for (let i = 0; i < 4; i++) {
      if (i > 0) {
        els.push(
          <span key={`conn-${i}`} style={{
            color: i <= step ? colors.success : colors.hairline,
          }}>──</span>
        );
      }
      const isCompleted = i < step;
      const isActive = i === step;
      els.push(
        <span key={`step-${i}`} style={{
          color: isCompleted ? colors.success : isActive ? colors.ink : colors.mute,
          fontSize: '14px',
        }}>
          {isCompleted ? '[x]' : `[${i + 1}]`}
        </span>
      );
    }
    return els;
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
        {renderSteps()}
      </div>
      <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', padding: '0 8px' }}>
        {labels.map((l, i) => (
          <span key={i} style={{ color: colors.mute, fontSize: '12px' }}>{l}</span>
        ))}
      </div>
      <div style={{ display: 'flex', gap: spacing.sm, marginTop: spacing.md }}>
        <button
          style={{
            fontFamily: font, fontSize: '14px', padding: '4px 12px', borderRadius: radius.sm,
            cursor: 'pointer', border: 'none', background: colors.ink, color: colors.onDark,
          }}
          onClick={() => setStep(s => Math.min(s + 1, 3))}
        >[→] Next Step</button>
        <button
          style={{
            fontFamily: font, fontSize: '14px', padding: '4px 12px', borderRadius: radius.sm,
            cursor: 'pointer', border: `1px solid ${colors.hairlineStrong}`, background: colors.canvas, color: colors.body,
          }}
          onClick={() => setStep(1)}
        >[∅] Reset</button>
      </div>
    </div>
  );
}
