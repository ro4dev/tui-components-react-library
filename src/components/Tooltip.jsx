import { useState } from 'react';
import { colors, radius, font } from '../theme';

export default function Tooltip({ label, children }) {
  const [visible, setVisible] = useState(false);

  return (
    <span
      style={{ position: 'relative', display: 'inline-block', cursor: 'pointer' }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
      tabIndex={0}
    >
      <span style={{ fontFamily: font, fontSize: '14px' }}>{children}</span>
      {visible && (
        <span style={{
          position: 'absolute',
          bottom: 'calc(100% + 4px)',
          left: '50%',
          transform: 'translateX(-50%)',
          background: colors.surfaceDark,
          color: colors.onDark,
          fontSize: '14px',
          padding: '4px 8px',
          borderRadius: radius.sm,
          maxWidth: '240px',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          zIndex: 10,
        }}>{label}</span>
      )}
    </span>
  );
}
