import { colors, radius, font } from '../theme';

export function ImageBlock({ children, caption }) {
  return (
    <div>
      <div style={{
        background: colors.surfaceSoft, borderRadius: radius.sm, overflow: 'hidden',
        padding: '40px', textAlign: 'center', color: colors.mute, fontFamily: font, fontSize: '14px',
      }}>
        {children}
      </div>
      {caption && <p style={{ color: colors.mute, fontSize: '14px', padding: '8px 0', margin: 0 }}>{caption}</p>}
    </div>
  );
}

export function VideoEmbed() {
  return (
    <div>
      <div style={{
        background: colors.surfaceSoft, borderRadius: radius.sm, overflow: 'hidden',
        aspectRatio: '16 / 9', display: 'flex', alignItems: 'center',
        justifyContent: 'center', color: colors.onDark, opacity: 0.5, fontSize: '48px',
      }}>
        <span>[▶]</span>
      </div>
    </div>
  );
}

export function Blockquote({ children, cite }) {
  return (
    <blockquote style={{ margin: 0, padding: '0 0 0 16px', borderLeft: `3px solid ${colors.hairlineStrong}` }}>
      <p style={{ color: colors.mute, fontSize: '14px', margin: '0 0 4px', lineHeight: 1.6 }}>{children}</p>
      {cite && <cite style={{ color: colors.stone, fontSize: '14px', fontStyle: 'normal' }}>— {cite}</cite>}
    </blockquote>
  );
}
