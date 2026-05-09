import { useState } from 'react';
import { colors, spacing, radius, font } from '../theme';

const lineNumbers = (count) => {
  const lines = [];
  for (let i = 1; i <= count; i++) lines.push(i);
  return lines;
};

export default function CodeBlock({ filename, code, lineCount }) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setError(false);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setError(true);
      setTimeout(() => setError(false), 1500);
    }
  }

  const btnText = error ? '[!] Error' : copied ? '[✓] Copied!' : '[⎘] Copy';

  return (
    <div style={{
      background: colors.surfaceDark,
      borderRadius: radius.sm,
      overflow: 'hidden',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 16px',
        borderBottom: `1px solid ${colors.hairlineStrong}`,
      }}>
        <span style={{ color: colors.ash, fontSize: '14px' }}>{filename}</span>
        <button
          style={{
            background: 'none', border: 'none', color: colors.mute, cursor: 'pointer',
            fontFamily: font, fontSize: '14px', padding: '2px 8px', borderRadius: radius.sm,
          }}
          onClick={handleCopy}
        >{btnText}</button>
      </div>
      <div style={{ display: 'flex', fontSize: '14px', lineHeight: 1.6 }}>
        <div style={{
          color: colors.ash,
          padding: spacing.lg,
          textAlign: 'right',
          borderRight: `1px solid ${colors.hairline}`,
          userSelect: 'none',
          minWidth: '32px',
        }}>
          {lineNumbers(lineCount || code.split('\n').length).map(n => (
            <div key={n}>{n}</div>
          ))}
        </div>
        <pre style={{
          flex: 1,
          color: colors.onDark,
          padding: spacing.lg,
          margin: 0,
          fontFamily: font,
          whiteSpace: 'pre',
          overflow: 'auto',
        }}>{code}</pre>
      </div>
    </div>
  );
}

export function InlineCode({ children }) {
  return (
    <code style={{
      background: colors.surfaceCard,
      color: colors.ink,
      borderRadius: radius.sm,
      padding: '2px 6px',
      fontFamily: font,
      fontSize: '14px',
    }}>{children}</code>
  );
}
