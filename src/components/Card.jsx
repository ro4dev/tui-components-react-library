import { colors, spacing, radius, font } from '../theme';

export function CardFlat({ title, children }) {
  return (
    <div style={{
      background: colors.canvas, border: `1px solid ${colors.hairline}`,
      borderRadius: radius.sm, padding: spacing.lg,
    }}>
      <h4 style={{ color: colors.ink, fontSize: '16px', margin: 0, marginBottom: spacing.sm }}>{title}</h4>
      <p style={{ color: colors.body, fontSize: '14px', margin: 0 }}>{children}</p>
    </div>
  );
}

export function CardHeader({ title, actions, children }) {
  return (
    <div style={{
      background: colors.canvas, border: `1px solid ${colors.hairline}`, borderRadius: radius.sm,
    }}>
      <div style={{
        padding: '8px 16px', borderBottom: `1px solid ${colors.hairline}`,
        fontWeight: 700, color: colors.ink, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span>{title}</span>
        {actions && <span>{actions}</span>}
      </div>
      <div style={{ padding: spacing.lg }}>{children}</div>
    </div>
  );
}

export function CardDark({ command, children }) {
  return (
    <div style={{
      background: colors.surfaceDark, color: colors.onDark,
      borderRadius: radius.sm, padding: spacing.lg,
    }}>
      {command && <div style={{ color: colors.ash, fontSize: '14px', marginBottom: spacing.sm }}>{command}</div>}
      <div>{children}</div>
    </div>
  );
}

export function CardStats({ cells }) {
  return (
    <div style={{
      background: colors.canvas, border: `1px solid ${colors.hairline}`,
      borderRadius: radius.sm, display: 'flex',
    }}>
      {cells.map((cell, i) => (
        <div key={i} style={{
          flex: 1, padding: spacing.xl, textAlign: 'center',
          borderRight: i < cells.length - 1 ? `1px solid ${colors.hairline}` : 'none',
        }}>
          <div style={{ fontSize: '38px', fontWeight: 700, color: colors.ink, lineHeight: 1 }}>{cell.number}</div>
          <div style={{ fontSize: '14px', color: colors.mute, marginTop: '4px' }}>{cell.label}</div>
        </div>
      ))}
    </div>
  );
}
