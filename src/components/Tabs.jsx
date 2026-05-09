import { useState } from 'react';
import { colors, spacing, radius, font } from '../theme';

export function TabStrip({ tabs, activeTab, onChange }) {
  const [active, setActive] = useState(activeTab || (tabs[0]?.id));

  function handleClick(id) {
    setActive(id);
    onChange && onChange(id);
  }

  return (
    <div>
      <div style={{
        display: 'flex',
        gap: spacing.md,
        borderBottom: `2px solid ${colors.hairlineStrong}`,
      }}>
        {tabs.map(tab => (
          <div
            key={tab.id}
            style={{
              padding: '8px 16px',
              cursor: 'pointer',
              fontSize: '14px',
              fontFamily: font,
              color: tab.id === active ? colors.ink : colors.mute,
              borderBottom: tab.id === active ? `2px solid ${colors.ink}` : '2px solid transparent',
              marginBottom: '-2px',
            }}
            onClick={() => handleClick(tab.id)}
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

export function TabPills({ pills, activePill, onChange }) {
  const [active, setActive] = useState(activePill || (pills[0]?.id));

  function handleClick(id) {
    setActive(id);
    onChange && onChange(id);
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: '4px' }}>
        {pills.map(pill => (
          <div
            key={pill.id}
            style={{
              padding: '4px 12px',
              borderRadius: radius.sm,
              cursor: 'pointer',
              fontSize: '14px',
              fontFamily: font,
              background: pill.id === active ? colors.ink : colors.surfaceSoft,
              color: pill.id === active ? colors.onDark : colors.mute,
            }}
            onClick={() => handleClick(pill.id)}
          >{pill.label}</div>
        ))}
      </div>
      {pills.map(pill => (
        <div key={pill.id} style={{ display: pill.id === active ? 'block' : 'none', padding: spacing.md, color: colors.body, fontSize: '14px' }}>
          {pill.content}
        </div>
      ))}
    </div>
  );
}
