import { colors, radius, font } from '../theme';

export function Tooltip({ label, children }) {
  return (
    <span style={{ position: 'relative', display: 'inline-block', cursor: 'pointer' }} tabIndex={0}>
      <span style={{ fontFamily: font, fontSize: '14px' }}>{children}</span>
      <span style={{
        position: 'absolute', bottom: 'calc(100% + 4px)', left: '50%',
        transform: 'translateX(-50%)', background: colors.surfaceDark, color: colors.onDark,
        fontSize: '14px', padding: '4px 8px', borderRadius: radius.sm,
        maxWidth: '240px', whiteSpace: 'nowrap', pointerEvents: 'none', zIndex: 10,
        visibility: 'hidden', opacity: 0, transition: 'opacity 0.2s',
      }} className="tooltip-label">{label}</span>
      <style>{`
        .tooltip-label {
          visibility: visible;
          opacity: 0;
        }
        :hover > .tooltip-label,
        :focus > .tooltip-label {
          opacity: 1;
        }
      `}</style>
    </span>
  );
}
