import { useState, useRef, useEffect, useCallback } from 'react';
import { colors, spacing, radius, font } from '../theme';

export function Panel({ header, children, footer }) {
  return (
    <div style={{
      border: `1px solid ${colors.hairline}`,
      borderRadius: radius.sm,
    }}>
      {header && (
        <div style={{
          background: colors.surfaceSoft,
          padding: '8px 16px',
          fontWeight: 600,
          color: colors.ink,
          borderBottom: `1px solid ${colors.hairline}`,
          fontSize: '14px',
        }}>{header}</div>
      )}
      <div style={{ padding: spacing.lg }}>{children}</div>
      {footer && (
        <div style={{
          padding: '8px 16px',
          borderTop: `1px solid ${colors.hairline}`,
          fontSize: '14px',
          color: colors.body,
          display: 'flex',
          justifyContent: 'space-between',
        }}>{footer}</div>
      )}
    </div>
  );
}

export function SplitPanel({ left, right, defaultRatio = 50 }) {
  const [ratio, setRatio] = useState(defaultRatio);
  const isDragging = useRef(false);
  const panelRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging.current || !panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = (x / rect.width) * 100;
    setRatio(Math.max(20, Math.min(80, pct)));
  }, []);

  const handleMouseUp = useCallback(() => {
    if (isDragging.current) {
      isDragging.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div>
      <div ref={panelRef} style={{ display: 'flex', border: `1px solid ${colors.hairline}`, borderRadius: radius.sm, overflow: 'hidden' }}>
        <div style={{ flex: `0 0 ${ratio}%`, padding: spacing.lg }}>{left}</div>
        <div
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: colors.hairlineStrong, cursor: 'col-resize',
            userSelect: 'none', padding: '0 4px',
            background: colors.canvas,
          }}
          onMouseDown={() => {
            isDragging.current = true;
            document.body.style.cursor = 'col-resize';
            document.body.style.userSelect = 'none';
          }}
        >│</div>
        <div style={{ flex: `0 0 ${100 - ratio}%`, padding: spacing.lg }}>{right}</div>
      </div>
      <button
        style={{
          fontFamily: font, fontSize: '14px', padding: '6px 12px', borderRadius: radius.sm,
          cursor: 'pointer', border: `1px solid ${colors.hairlineStrong}`, background: colors.canvas,
          color: colors.body, marginTop: spacing.sm,
        }}
        onClick={() => setRatio(50)}
      >Reset Split to 50/50</button>
    </div>
  );
}

export function ScrollArea({ children, height = '200px' }) {
  const ref = useRef(null);
  const [showScroll, setShowScroll] = useState(false);
  const timeoutRef = useRef(null);

  const handleScroll = useCallback(() => {
    setShowScroll(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setShowScroll(false), 2000);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll);
    return () => {
      el.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutRef.current);
    };
  }, [handleScroll]);

  return (
    <div ref={ref} style={{
      height,
      overflow: 'auto',
      padding: spacing.lg,
      border: `1px solid ${colors.hairline}`,
      borderRadius: radius.sm,
      fontFamily: font,
      fontSize: '14px',
      color: colors.body,
      lineHeight: 1.8,
    }}>
      {children}
      <style>{`
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${colors.surfaceCard}; }
        ::-webkit-scrollbar-thumb { background: ${showScroll ? colors.mute : colors.ash}; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: ${colors.mute}; }
      `}</style>
    </div>
  );
}
