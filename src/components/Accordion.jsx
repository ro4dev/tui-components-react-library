import { useState } from 'react';
import { colors, spacing, radius, font } from '../theme';

export function AccordionItem({ title, children, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen || false);

  return (
    <div style={{
      borderBottom: `1px solid ${colors.hairline}`,
    }}>
      <button
        style={{
          width: '100%', padding: '12px 16px', background: 'none', border: 'none',
          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
          fontFamily: font, fontSize: '14px', fontWeight: 600, color: colors.ink,
          textAlign: 'left',
        }}
        onClick={() => setOpen(!open)}
      >
        <span style={{ fontSize: '14px', color: colors.mute }}>{open ? '−' : '+'}</span>
        <span>{title}</span>
      </button>
      <div style={{ display: open ? 'block' : 'none', padding: '0 16px 12px', color: colors.body, fontSize: '14px', lineHeight: 1.6 }}>
        {children}
      </div>
    </div>
  );
}

export function Accordion({ children }) {
  return <div>{children}</div>;
}
