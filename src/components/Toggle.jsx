import { useState } from 'react';
import { colors, radius, font } from '../theme';

export function Toggle({ label, description, defaultOn, variant = 'ascii', onChange }) {
  const [on, setOn] = useState(defaultOn ?? false);

  const toggle = () => {
    setOn(!on);
    onChange?.(!on);
  };

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '12px 0', borderBottom: `1px solid ${colors.hairline}`,
    }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: '14px', color: colors.ink, fontWeight: 500 }}>{label}</span>
        {description && <span style={{ fontSize: '12px', color: colors.mute }}>{description}</span>}
      </div>
      {variant === 'ascii' ? (
        <button
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: font, fontSize: '14px', color: on ? colors.ink : colors.mute,
            padding: '4px 8px',
          }}
          onClick={toggle}
        >{on ? '[x]' : '[ ]'}</button>
      ) : (
        <button
          style={{
            width: '40px', height: '20px', borderRadius: radius.full,
            border: 'none', cursor: 'pointer', position: 'relative',
            background: on ? colors.ink : colors.surfaceCard,
            transition: 'background 0.2s',
          }}
          onClick={toggle}
        >
          <div style={{
            width: '16px', height: '16px', borderRadius: '50%',
            background: on ? colors.onDark : colors.mute,
            position: 'absolute', top: '2px',
            left: on ? '22px' : '2px',
            transition: 'left 0.2s',
          }} />
        </button>
      )}
    </div>
  );
}
