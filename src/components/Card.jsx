import { useState, useEffect, useRef } from 'react';
import { colors, spacing, radius, font } from '../theme';

export function CardFlat({ title, children, defaultLikes = 0 }) {
  const [likes, setLikes] = useState(defaultLikes);
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{
      background: colors.canvas,
      border: `1px solid ${colors.hairline}`,
      borderRadius: radius.sm,
      padding: spacing.lg,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: spacing.sm }}>
        <h4 style={{ color: colors.ink, fontSize: '16px', margin: 0 }}>{title}</h4>
        <span style={{ color: colors.mute, fontSize: '14px' }}>{expanded ? '[-]' : '[+]'}</span>
      </div>
      <p style={{ color: colors.body, fontSize: '16px', margin: 0 }}>{children}</p>
      {expanded && (
        <p style={{ marginTop: '8px', color: colors.mute, fontSize: '14px' }}>
          Expanded: Full feature details with metrics and configuration options.
        </p>
      )}
      <div style={{ marginTop: spacing.md, display: 'flex', gap: spacing.sm }}>
        <button
          style={{
            fontFamily: font, fontSize: '14px', padding: '6px 12px', borderRadius: radius.sm,
            cursor: 'pointer', border: `1px solid ${colors.hairlineStrong}`, background: colors.canvas, color: colors.body,
          }}
          onClick={() => setLikes(l => l + 1)}
        >[+] Like ({likes})</button>
        <button
          style={{
            fontFamily: font, fontSize: '14px', padding: '6px 12px', borderRadius: radius.sm,
            cursor: 'pointer', border: `1px solid ${colors.hairlineStrong}`, background: colors.canvas, color: colors.body,
          }}
          onClick={() => setExpanded(!expanded)}
        >{expanded ? '[-] Collapse' : '[+] Details'}</button>
      </div>
    </div>
  );
}

export function CardHeader({ title, children }) {
  return (
    <div style={{
      background: colors.canvas,
      border: `1px solid ${colors.hairline}`,
      borderRadius: radius.sm,
    }}>
      <div style={{
        padding: '8px 16px',
        borderBottom: `1px solid ${colors.hairline}`,
        fontWeight: 700,
        color: colors.ink,
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <span>{title}</span>
      </div>
      <div style={{ padding: spacing.lg }}>{children}</div>
    </div>
  );
}

export function CardDark({ cmd, children }) {
  return (
    <div style={{
      background: colors.surfaceDark,
      color: colors.onDark,
      borderRadius: radius.sm,
      padding: spacing.lg,
    }}>
      <div style={{ color: colors.ash, fontSize: '14px', marginBottom: spacing.sm }}>{cmd}</div>
      <div>{children}</div>
    </div>
  );
}

export function CardStats({ cells }) {
  const [counts, setCounts] = useState(cells.map(() => 0));
  const observerRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    const el = observerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          cells.forEach((cell, idx) => {
            const target = cell.value;
            let current = 0;
            const step = Math.ceil(target / 40);
            const interval = setInterval(() => {
              current += step;
              if (current >= target) { current = target; clearInterval(interval); }
              setCounts(c => {
                const next = [...c];
                next[idx] = current;
                return next;
              });
            }, 30);
          });
          obs.unobserve(el);
        }
      });
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={observerRef} style={{
      background: colors.canvas,
      border: `1px solid ${colors.hairline}`,
      borderRadius: radius.sm,
      display: 'flex',
    }}>
      {cells.map((cell, i) => (
        <div key={i} style={{
          flex: 1, padding: spacing.xl, textAlign: 'center',
          borderRight: i < cells.length - 1 ? `1px solid ${colors.hairline}` : 'none',
        }}>
          <div style={{ fontSize: '38px', fontWeight: 700, color: colors.ink, lineHeight: 1 }}>
            {counts[i] >= 1000 ? (counts[i] / 1000).toFixed(1) + 'K' : counts[i]}
          </div>
          <div style={{ fontSize: '14px', color: colors.mute, marginTop: '4px' }}>{cell.label}</div>
        </div>
      ))}
    </div>
  );
}
