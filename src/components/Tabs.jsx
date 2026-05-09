import { useState } from 'react';
import { colors, spacing, radius, font } from '../theme';

export function Tabs({ tabs, variant = 'strip', defaultTab, fullWidth }) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id);
  const isStrip = variant === 'strip';

  return (
    <div>
      <div style={{
        display: 'flex',
        gap: isStrip ? spacing.md : spacing.xs,
        flexWrap: isStrip ? 'nowrap' : 'wrap',
        borderBottom: isStrip ? `2px solid ${colors.hairlineStrong}` : 'none',
      }}>
        {tabs.map(tab => (
          <div
            key={tab.id}
            style={{
              flex: fullWidth ? 1 : undefined,
              textAlign: fullWidth ? 'center' : undefined,
              padding: isStrip ? '8px 16px' : '4px 12px',
              cursor: 'pointer',
              fontSize: isStrip ? '16px' : '14px',
              fontFamily: font,
              background: isStrip ? 'transparent' : (tab.id === active ? colors.ink : colors.surfaceSoft),
              color: isStrip ? (tab.id === active ? colors.ink : colors.mute) : (tab.id === active ? colors.canvas : colors.mute),
              borderRadius: isStrip ? 0 : radius.sm,
              borderBottom: isStrip ? (tab.id === active ? `2px solid ${colors.ink}` : '2px solid transparent') : 'none',
              marginBottom: isStrip ? '-2px' : 0,
            }}
            onClick={() => setActive(tab.id)}
          >{tab.label}</div>
        ))}
      </div>
      {tabs.map(tab => (
        <div key={tab.id} style={{ display: tab.id === active ? 'block' : 'none', padding: spacing.md, color: colors.body, fontSize: '14px' }}>
          {tab.content}
        </div>
      ))}
    </div>
  );
}
