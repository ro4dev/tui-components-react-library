import { colors, spacing, radius, font } from '../theme';

export function SidebarNav({ groups }) {
  return (
    <nav style={{
      background: colors.canvas,
      borderRight: `1px solid ${colors.hairline}`,
      width: '240px',
      padding: spacing.sm,
    }}>
      {groups.map((group, gi) => (
        <div key={gi}>
          <div style={{
            color: colors.stone,
            fontSize: '12px',
            textTransform: 'uppercase',
            padding: '12px 16px 4px',
            letterSpacing: '1px',
          }}>{group.header}</div>
          {group.items.map((item, ii) => (
            <div
              key={ii}
              style={{
                padding: item.nested ? '8px 16px 8px 32px' : '8px 16px',
                fontSize: '14px',
                fontFamily: font,
                color: item.active ? colors.ink : colors.body,
                background: item.active ? colors.surfaceSoft : 'transparent',
                borderLeft: item.active ? `2px solid ${colors.ink}` : '2px solid transparent',
                cursor: 'pointer',
              }}
            >{item.nested ? '→ ' : ''}{item.label}</div>
          ))}
        </div>
      ))}
    </nav>
  );
}

export function Pagination({ current, total, onChange, pageSize, pageSizeOptions, onPageSizeChange, totalItems }) {
  const pages = [];
  const addPage = (n) => {
    pages.push(
      <button key={n} style={{
        fontFamily: font, fontSize: '14px', padding: '4px 8px', borderRadius: radius.sm,
        cursor: 'pointer', border: 'none',
        background: n === current ? colors.surfaceSoft : 'transparent',
        color: n === current ? colors.ink : colors.body,
      }} onClick={() => onChange?.(n)}>{n}</button>
    );
  };

  addPage(1);
  if (current > 3) pages.push(<span key="e1" style={{ color: colors.stone, padding: '0 4px' }}>···</span>);
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) addPage(i);
  if (current < total - 2) pages.push(<span key="e2" style={{ color: colors.stone, padding: '0 4px' }}>···</span>);
  if (total > 1) addPage(total);

  return (
    <div style={{ display: 'flex', gap: spacing.xs, alignItems: 'center', fontFamily: font }}>
      {pageSizeOptions && onPageSizeChange && (
        <div style={{ marginRight: spacing.sm }}>
          <select
            value={pageSize ?? pageSizeOptions[0]}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            style={{
              fontFamily: font, fontSize: '13px', padding: '4px 6px',
              border: `1px solid ${colors.hairline}`, borderRadius: radius.sm,
              background: colors.canvas, color: colors.body, cursor: 'pointer',
            }}
          >
            {pageSizeOptions.map((opt) => (
              <option key={opt} value={opt}>{opt} / page</option>
            ))}
          </select>
        </div>
      )}
      {totalItems != null && pageSize && (
        <span style={{ fontSize: '13px', color: colors.mute, marginRight: spacing.sm, whiteSpace: 'nowrap' }}>
          {(current - 1) * pageSize + 1}–{Math.min(current * pageSize, totalItems)} of {totalItems}
        </span>
      )}
      <button
        style={{
          fontFamily: font, fontSize: '14px', padding: '4px 8px', borderRadius: radius.sm,
          cursor: current === 1 ? 'default' : 'pointer',
          border: 'none', background: 'none', color: current === 1 ? colors.stone : colors.mute,
        }}
        disabled={current === 1}
        onClick={() => onChange?.(Math.max(1, current - 1))}
      >[←]</button>
      {pages}
      <button
        style={{
          fontFamily: font, fontSize: '14px', padding: '4px 8px', borderRadius: radius.sm,
          cursor: current === total ? 'default' : 'pointer',
          border: 'none', background: 'none', color: current === total ? colors.stone : colors.mute,
        }}
        disabled={current === total}
        onClick={() => onChange?.(Math.min(total, current + 1))}
      >[→]</button>
    </div>
  );
}
