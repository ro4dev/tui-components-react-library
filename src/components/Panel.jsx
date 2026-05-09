import { colors, spacing, radius, font } from '../theme';

export function Panel({ header, children, footer }) {
  return (
    <div style={{ border: `1px solid ${colors.hairline}`, borderRadius: radius.sm }}>
      {header && (
        <div style={{
          background: colors.surfaceSoft, padding: '8px 16px', fontWeight: 600,
          color: colors.ink, borderBottom: `1px solid ${colors.hairline}`, fontSize: '14px',
        }}>{header}</div>
      )}
      <div style={{ padding: spacing.lg, color: colors.body, fontSize: '14px' }}>{children}</div>
      {footer && (
        <div style={{
          padding: '8px 16px', borderTop: `1px solid ${colors.hairline}`,
          fontSize: '14px', color: colors.mute, display: 'flex', justifyContent: 'space-between',
        }}>{footer}</div>
      )}
    </div>
  );
}
