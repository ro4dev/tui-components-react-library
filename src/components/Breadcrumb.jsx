import { colors, spacing, font } from '../theme';

export function Breadcrumb({ items, onNavigate }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm, fontSize: '14px' }}>
      {items.map((item, i) => (
        <span key={i} style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
          {i > 0 && <span style={{ color: colors.stone }}>/</span>}
          <span
            style={{ color: item.active ? colors.ink : colors.stone, cursor: 'pointer', textDecoration: 'none', fontSize: '14px' }}
            onClick={() => onNavigate?.(item)}
          >{item.label}</span>
        </span>
      ))}
    </div>
  );
}
