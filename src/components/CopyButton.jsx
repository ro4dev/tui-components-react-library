import { useState } from 'react';
import { colors, radius, font } from '../theme';

export function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  }

  return (
    <button
      style={{
        background: 'none', border: 'none', cursor: 'pointer',
        fontFamily: font, fontSize: '14px', color: copied ? colors.success : colors.mute,
        padding: '4px 8px', borderRadius: radius.sm,
      }}
      onClick={handleCopy}
    >{copied ? '[✓]' : '[⎘]'}</button>
  );
}
