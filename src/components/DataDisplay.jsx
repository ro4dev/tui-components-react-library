import { colors, spacing, radius, font } from '../theme';

export function ListItem({ bullet, numbered, index, children }) {
  return (
    <div style={{
      padding: '4px 0', color: colors.body, fontSize: '14px',
      borderBottom: `1px solid ${colors.hairline}`,
      display: 'flex', gap: '8px',
    }}>
      {bullet && <span style={{ color: colors.mute, width: 16 }}>[•]</span>}
      {numbered && <span style={{ color: colors.mute, width: 16 }}>{index}.</span>}
      <span>{children}</span>
    </div>
  );
}

export function DefinitionList({ items }) {
  return (
    <div>
      {items.map((item, i) => (
        <div key={i} style={{ borderBottom: `1px solid ${colors.hairline}` }}>
          <div style={{ fontWeight: 600, color: colors.ink, padding: '8px 0 0', fontSize: '14px' }}>{item.term}</div>
          <div style={{ color: colors.body, padding: '0 0 8px 16px', fontSize: '14px' }}>{item.description}</div>
        </div>
      ))}
    </div>
  );
}

export function Tag({ children, onRemove }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '4px',
      background: colors.surfaceSoft, color: colors.mute,
      borderRadius: radius.sm, padding: '2px 8px', fontSize: '14px', fontFamily: font,
    }}>
      {children}
      {onRemove && (
        <span style={{ color: colors.stone, cursor: 'pointer', marginLeft: '2px' }} onClick={onRemove}>[×]</span>
      )}
    </span>
  );
}
