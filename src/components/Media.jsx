import { useState } from 'react';
import { colors, spacing, radius, font } from '../theme';

export function ImageBlock({ src, caption, placeholder }) {
  return (
    <div>
      <div style={{
        background: colors.surfaceSoft,
        borderRadius: radius.sm,
        overflow: 'hidden',
        padding: '40px',
        textAlign: 'center',
        color: colors.mute,
        fontFamily: font,
        fontSize: '14px',
      }}>
        {src ? <img src={src} alt={caption} style={{ maxWidth: '100%' }} /> : (placeholder || '[image: placeholder.png]')}
      </div>
      {caption && (
        <p style={{ color: colors.mute, fontSize: '14px', padding: '8px 0', margin: 0 }}>{caption}</p>
      )}
    </div>
  );
}

export function VideoEmbed({ caption }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div>
      <div
        style={{
          background: colors.surfaceSoft,
          borderRadius: radius.sm,
          overflow: 'hidden',
          aspectRatio: '16 / 9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          position: 'relative',
        }}
        onClick={() => setPlaying(!playing)}
      >
        <span style={{
          fontSize: '48px',
          color: playing ? colors.success : colors.onDark,
          opacity: 0.5,
        }}>[▶]</span>
      </div>
      {caption && (
        <p style={{ color: colors.mute, fontSize: '14px', padding: '8px 0', margin: 0 }}>{caption}</p>
      )}
    </div>
  );
}

export function Blockquote({ children, attribution, italic }) {
  return (
    <blockquote style={{
      margin: 0,
      padding: '0 0 0 16px',
      borderLeft: `3px solid ${colors.hairlineStrong}`,
    }}>
      <p style={{
        color: colors.mute,
        fontSize: '14px',
        fontStyle: italic ? 'italic' : 'normal',
        margin: '0 0 4px',
        lineHeight: 1.6,
      }}>{children}</p>
      {attribution && (
        <cite style={{
          color: colors.stone,
          fontSize: '14px',
          fontStyle: 'normal',
        }}>— {attribution}</cite>
      )}
    </blockquote>
  );
}
