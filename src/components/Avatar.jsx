import { colors, radius, font } from '../theme';

export function Avatar({ children, size = 'default', src, alt }) {
  const compact = size === 'compact';
  const circleS = {
    borderRadius: radius.full, background: colors.surfaceCard, color: colors.ink,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontWeight: 600, flexShrink: 0, textTransform: 'uppercase',
    width: compact ? '24px' : '32px', height: compact ? '24px' : '32px',
    fontSize: compact ? '12px' : '14px',
  };

  if (src) {
    return (
      <div style={{ ...circleS, overflow: 'hidden' }}>
        <img src={src} alt={alt || ''} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: radius.full }} />
      </div>
    );
  }
  const initial = typeof children === 'string' ? children.charAt(0).toUpperCase() : children;
  return <div style={circleS}>{initial}</div>;
}

export function UserPill({ name, role, onRemove }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '8px',
      padding: '4px 0', margin: '4px',
    }}>
      <Avatar size="compact">{name}</Avatar>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: '14px', color: colors.ink, fontWeight: 500 }}>{name}</span>
        <span style={{ fontSize: '12px', color: colors.mute }}>{role}</span>
      </div>
      {onRemove && (
        <button
          style={{
            background: 'none', border: 'none', color: colors.stone, cursor: 'pointer',
            fontFamily: font, fontSize: '14px', padding: 0, width: '20px', height: '20px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: radius.sm,
          }}
          onClick={onRemove}
        >[×]</button>
      )}
    </div>
  );
}
