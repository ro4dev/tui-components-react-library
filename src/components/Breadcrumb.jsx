import { useState } from 'react';
import { colors, spacing, font } from '../theme';

const sItem = (active) => ({
  color: active ? colors.ink : colors.stone,
  cursor: 'pointer',
  textDecoration: 'none',
  fontSize: '14px',
});

export default function Breadcrumb({ items }) {
  const [active, setActive] = useState(items.length - 1);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm, fontSize: '14px' }}>
      {items.map((item, i) => (
        <span key={i} style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
          <span
            style={sItem(i === active)}
            onClick={() => setActive(i)}
          >{item}</span>
          {i < items.length - 1 && <span style={{ color: colors.stone, fontSize: '14px' }}>/</span>}
        </span>
      ))}
    </div>
  );
}
