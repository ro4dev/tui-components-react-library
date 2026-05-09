import { colors, spacing, radius, font } from '../theme';

export function EmptyState({ icon, title, description, action }) {
  return (
    <div style={{ textAlign: 'center', padding: spacing.xxl }}>
      <div style={{ color: colors.stone, fontSize: '24px', marginBottom: spacing.md }}>
        {icon || '[∅]'}
      </div>
      <h3 style={{ color: colors.ink, fontSize: '16px', fontWeight: 600, margin: '0 0 8px' }}>{title}</h3>
      <p style={{ color: colors.mute, fontSize: '14px', maxWidth: '320px', margin: '0 auto 16px' }}>{description}</p>
      {action}
    </div>
  );
}
