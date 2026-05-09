import { useState } from 'react';
import { colors, spacing, radius, font } from '../theme';

export function ToggleAscii({ label, description, defaultActive, statusMessage, statusType = 'info' }) {
  const [active, setActive] = useState(defaultActive || false);

  const statusColors = {
    info: colors.accent,
    success: colors.success,
    warning: colors.warning,
  };

  return (
    <div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 0',
      }}>
        <div>
          <div style={{ fontSize: '14px', color: colors.ink, fontWeight: 500 }}>{label}</div>
          {description && <div style={{ fontSize: '12px', color: colors.mute }}>{description}</div>}
        </div>
        <button
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: font, fontSize: '14px', color: active ? colors.ink : colors.mute,
            padding: '4px 8px',
          }}
          onClick={() => setActive(!active)}
        >{active ? '[x]' : '[ ]'}</button>
      </div>
      {statusMessage && (
        <div style={{
          display: active ? 'block' : 'none',
          color: statusColors[statusType] || colors.mute,
          fontSize: '13px',
          padding: '4px 0',
        }}>{statusMessage}</div>
      )}
    </div>
  );
}

export function ToggleSwitch({ label, description, defaultActive, statusMessage, statusType = 'info' }) {
  const [active, setActive] = useState(defaultActive || false);

  const statusColors = {
    info: colors.accent,
    success: colors.success,
    warning: colors.warning,
  };

  return (
    <div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 0',
      }}>
        <div>
          <div style={{ fontSize: '14px', color: colors.ink, fontWeight: 500 }}>{label}</div>
          {description && <div style={{ fontSize: '12px', color: colors.mute }}>{description}</div>}
        </div>
        <button
          style={{
            width: '40px', height: '20px', borderRadius: radius.full,
            border: 'none', cursor: 'pointer', position: 'relative',
            background: active ? colors.ink : colors.surfaceCard,
            transition: 'background 0.2s',
          }}
          onClick={() => setActive(!active)}
        >
          <div style={{
            width: '16px', height: '16px', borderRadius: '50%',
            background: active ? colors.onDark : colors.mute,
            position: 'absolute',
            top: '2px',
            left: active ? '22px' : '2px',
            transition: 'left 0.2s',
          }} />
        </button>
      </div>
      {statusMessage && (
        <div style={{
          display: active ? 'block' : 'none',
          color: statusColors[statusType] || colors.mute,
          fontSize: '13px',
          padding: '4px 0',
        }}>{statusMessage}</div>
      )}
    </div>
  );
}
