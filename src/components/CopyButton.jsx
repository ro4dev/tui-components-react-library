import { useState } from 'react';
import { colors, radius, font } from '../theme';

export default function CopyButton({ text }) {
  const [state, setState] = useState('idle');

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setState('copied');
      setTimeout(() => setState('idle'), 1500);
    } catch {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(str) {
    const ta = document.createElement('textarea');
    ta.value = str;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      setState('copied');
      setTimeout(() => setState('idle'), 1500);
    } catch {}
    document.body.removeChild(ta);
  }

  const label = state === 'copied' ? '[✓]' : '[⎘]';

  return (
    <button
      style={{
        background: 'none', border: 'none', cursor: 'pointer',
        fontFamily: font, fontSize: '14px', color: state === 'copied' ? colors.success : colors.mute,
        padding: '4px 8px', borderRadius: radius.sm,
      }}
      onClick={handleCopy}
    >{label}</button>
  );
}
