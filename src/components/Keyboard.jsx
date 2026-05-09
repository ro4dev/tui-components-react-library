import { useState, useEffect, useCallback } from 'react';
import { colors, spacing, radius, font } from '../theme';

export function Kbd({ children, active }) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: active ? colors.ink : colors.surfaceCard,
      color: active ? colors.onDark : colors.mute,
      border: `1px solid ${colors.hairline}`,
      borderRadius: radius.sm,
      padding: '2px 6px',
      fontFamily: font,
      fontSize: '12px',
      lineHeight: 1.4,
    }}>{children}</span>
  );
}

export function KbdSequence({ keys }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
      {keys.map((key, i) => (
        <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
          <Kbd>{key}</Kbd>
          {i < keys.length - 1 && <span style={{ color: colors.mute, fontSize: '12px' }}>+</span>}
        </span>
      ))}
    </span>
  );
}

export function CommandPalette({ commands, onSelect, triggerKey = 'k' }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filtered = commands.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = useCallback((e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === triggerKey) {
      e.preventDefault();
      setOpen(prev => !prev);
      setQuery('');
      setSelectedIndex(0);
    }
    if (!open) return;
    if (e.key === 'Escape') { setOpen(false); return; }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(i => Math.min(i + 1, filtered.length - 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(i => Math.max(i - 1, 0));
    }
    if (e.key === 'Enter' && filtered[selectedIndex]) {
      e.preventDefault();
      onSelect && onSelect(filtered[selectedIndex]);
      setOpen(false);
    }
  }, [open, filtered, selectedIndex, triggerKey]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  return (
    <div>
      {open && (
        <div
          style={{
            position: 'fixed', inset: 0, background: colors.inkDeep, zIndex: 300,
            display: 'flex', justifyContent: 'center', paddingTop: '20vh',
          }}
          onClick={e => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div style={{
            background: colors.canvas, borderRadius: radius.sm,
            maxWidth: '560px', width: '100%', maxHeight: '400px',
            display: 'flex', flexDirection: 'column',
          }}>
            <div style={{ padding: spacing.md, borderBottom: `1px solid ${colors.hairline}` }}>
              <input
                type="text"
                placeholder="Type a command..."
                value={query}
                autoFocus
                style={{
                  width: '100%', border: 'none', background: 'none', outline: 'none',
                  fontFamily: font, fontSize: '14px', color: colors.body,
                }}
                onChange={e => setQuery(e.target.value)}
              />
            </div>
            <div style={{ flex: 1, overflow: 'auto', maxHeight: '400px' }}>
              {filtered.map((cmd, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '8px 12px', cursor: 'pointer', fontSize: '14px', fontFamily: font,
                    background: i === selectedIndex ? colors.surfaceSoft : 'transparent',
                    borderLeft: i === selectedIndex ? `2px solid ${colors.ink}` : '2px solid transparent',
                    color: colors.body,
                  }}
                  onClick={() => { onSelect && onSelect(cmd); setOpen(false); }}
                  onMouseEnter={() => setSelectedIndex(i)}
                >
                  <span>{cmd.name}</span>
                  {cmd.hint && <span style={{ color: colors.stone, fontSize: '12px' }}>{cmd.hint}</span>}
                </div>
              ))}
            </div>
            <div style={{
              padding: '8px 12px', borderTop: `1px solid ${colors.hairline}`,
              display: 'flex', gap: spacing.md, fontSize: '12px', color: colors.stone,
            }}>
              <span><Kbd>↑↓</Kbd> navigate</span>
              <span>·</span>
              <span><Kbd>↵</Kbd> select</span>
              <span>·</span>
              <span><Kbd>esc</Kbd> close</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
