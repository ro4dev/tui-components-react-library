import { useState, useEffect, useRef } from 'react';
import { colors, spacing, radius, font } from '../theme';

export function SidebarNav({ groups, onNavigate }) {
  const [active, setActive] = useState(null);

  function handleClick(item) {
    setActive(item.id);
    onNavigate && onNavigate(item);
  }

  return (
    <nav style={{
      background: colors.canvas,
      borderRight: `1px solid ${colors.hairline}`,
      width: '240px',
      padding: spacing.sm,
    }}>
      {groups.map((group, gi) => (
        <div key={gi}>
          <div style={{
            color: colors.stone,
            fontSize: '12px',
            textTransform: 'uppercase',
            padding: '12px 16px 4px',
            letterSpacing: '1px',
          }}>{group.label}</div>
          {group.items.map((item, ii) => (
            <div
              key={ii}
              style={{
                padding: '8px 16px',
                fontSize: '14px',
                fontFamily: font,
                color: item.id === active ? colors.ink : colors.body,
                background: item.id === active ? colors.surfaceSoft : 'transparent',
                borderLeft: item.id === active ? `2px solid ${colors.ink}` : '2px solid transparent',
                cursor: 'pointer',
                paddingLeft: item.nested ? '32px' : '16px',
              }}
              onClick={() => handleClick(item)}
            >{item.nested ? '→ ' : ''}{item.label}</div>
          ))}
        </div>
      ))}
    </nav>
  );
}

export function Pagination({ totalPages, onPageChange }) {
  const [current, setCurrent] = useState(1);

  function goTo(page) {
    if (page < 1 || page > totalPages) return;
    setCurrent(page);
    onPageChange && onPageChange(page);
  }

  function renderPages() {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (current > 3) pages.push('...');
      for (let i = Math.max(2, current - 1); i <= Math.min(totalPages - 1, current + 1); i++) {
        pages.push(i);
      }
      if (current < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: font }}>
      <button
        style={{
          fontFamily: font, fontSize: '14px', padding: '4px 8px', borderRadius: radius.sm,
          cursor: current === 1 ? 'default' : 'pointer',
          border: 'none', background: 'none', color: current === 1 ? colors.stone : colors.body,
        }}
        disabled={current === 1}
        onClick={() => goTo(current - 1)}
      >[←]</button>
      {renderPages().map((p, i) => (
        p === '...' ? (
          <span key={i} style={{ color: colors.stone, fontSize: '14px', padding: '0 4px' }}>···</span>
        ) : (
          <button
            key={i}
            style={{
              fontFamily: font, fontSize: '14px', padding: '4px 8px', borderRadius: radius.sm,
              cursor: 'pointer', border: 'none',
              background: p === current ? colors.surfaceSoft : 'transparent',
              color: p === current ? colors.ink : colors.body,
            }}
            onClick={() => goTo(p)}
          >{p}</button>
        )
      ))}
      <button
        style={{
          fontFamily: font, fontSize: '14px', padding: '4px 8px', borderRadius: radius.sm,
          cursor: current === totalPages ? 'default' : 'pointer',
          border: 'none', background: 'none', color: current === totalPages ? colors.stone : colors.body,
        }}
        disabled={current === totalPages}
        onClick={() => goTo(current + 1)}
      >[→]</button>
    </div>
  );
}

export function DropdownMenu({ trigger, items, onAction }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <div onClick={() => setOpen(!open)}>{trigger}</div>
      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, zIndex: 50, marginTop: '4px',
          background: colors.canvas, border: `1px solid ${colors.hairlineStrong}`,
          borderRadius: radius.sm, minWidth: '200px', maxWidth: '320px',
        }}>
          {items.map((item, i) => (
            item.divider ? (
              <div key={i} style={{ height: '1px', background: colors.hairline, margin: '4px 0' }} />
            ) : (
              <div
                key={i}
                style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '8px 12px', cursor: 'pointer', fontSize: '14px', fontFamily: font,
                  color: item.danger ? colors.danger : colors.body,
                }}
                onClick={() => { setOpen(false); onAction && onAction(item); }}
              >
                <span>{item.label}</span>
                {item.shortcut && (
                  <span style={{ color: colors.stone, fontSize: '12px' }}>{item.shortcut}</span>
                )}
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
}

export function ContextMenu({ items, onAction }) {
  const [state, setState] = useState({ open: false, x: 0, y: 0 });
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setState(s => ({ ...s, open: false }));
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  function handleContext(e) {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    setState({ open: true, x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return (
    <div ref={ref} onContextMenu={handleContext} style={{ position: 'relative', display: 'inline-block' }}>
      {state.open && (
        <div style={{
          position: 'absolute', top: state.y, left: state.x, zIndex: 50,
          background: colors.canvas, border: `1px solid ${colors.hairlineStrong}`,
          borderRadius: radius.sm, minWidth: '200px',
        }}>
          {items.map((item, i) => (
            item.divider ? (
              <div key={i} style={{ height: '1px', background: colors.hairline, margin: '4px 0' }} />
            ) : (
              <div
                key={i}
                style={{
                  padding: '8px 12px', cursor: 'pointer', fontSize: '14px', fontFamily: font,
                  color: item.danger ? colors.danger : colors.body,
                }}
                onClick={() => { setState(s => ({ ...s, open: false })); onAction && onAction(item); }}
              >{item.label}</div>
            )
          ))}
        </div>
      )}
    </div>
  );
}
