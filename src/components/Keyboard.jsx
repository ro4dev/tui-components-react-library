import { colors, radius, font } from '../theme';

export function Kbd({ children, active }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      background: active ? colors.ink : colors.surfaceCard,
      color: active ? colors.onDark : colors.mute,
      border: `1px solid ${colors.hairline}`, borderRadius: radius.sm,
      padding: '2px 6px', fontFamily: font, fontSize: '12px', lineHeight: 1.4,
    }}>{children}</span>
  );
}
