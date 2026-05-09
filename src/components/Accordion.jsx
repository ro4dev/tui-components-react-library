import { useState } from 'react';
import { colors, spacing, radius, font } from '../theme';

const s = {
  accordion: {
    background: colors.canvas,
    borderBottom: `1px solid ${colors.hairline}`,
  },
  header: {
    width: '100%',
    padding: '12px 16px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontFamily: font,
    fontSize: '14px',
    fontWeight: 600,
    color: colors.ink,
    textAlign: 'left',
  },
  headerHover: {
    background: colors.surfaceSoft,
  },
  marker: {
    fontSize: '14px',
    color: colors.mute,
  },
  content: {
    display: 'none',
  },
  contentOpen: {
    display: 'block',
  },
  body: {
    padding: '0 16px 12px',
    color: colors.body,
    fontSize: '14px',
    lineHeight: 1.6,
  },
  nested: {
    margin: '12px 0',
  },
  nestedHeader: {
    padding: '12px 16px 12px 32px',
    fontSize: '13px',
  },
  nestedBody: {
    padding: '0 16px 12px',
    fontSize: '13px',
  },
};

function AccordionItem({ title, children, defaultOpen, nested }) {
  const [open, setOpen] = useState(defaultOpen || false);

  const marker = nested
    ? open ? '↓' : '→'
    : open ? '−' : '+';

  return (
    <div style={nested ? { ...s.accordion, ...s.nested } : s.accordion}>
      <button
        style={nested ? { ...s.header, ...s.nestedHeader } : s.header}
        onMouseEnter={e => Object.assign(e.currentTarget.style, s.headerHover)}
        onMouseLeave={e => e.currentTarget.style.background = 'none'}
        onClick={() => setOpen(!open)}
      >
        <span style={s.marker}>{marker}</span>
        <span>{title}</span>
      </button>
      <div style={open ? s.contentOpen : s.content}>
        <div style={nested ? { ...s.body, ...s.nestedBody } : s.body}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default function Accordion({ items, nested }) {
  return (
    <div>
      {items.map((item, i) => (
        <AccordionItem key={i} title={item.title} defaultOpen={item.defaultOpen} nested={nested}>
          {item.content}
          {item.children && (
            <div>
              {item.children.map((child, j) => (
                <AccordionItem key={j} title={child.title} nested>
                  {child.content}
                </AccordionItem>
              ))}
            </div>
          )}
        </AccordionItem>
      ))}
    </div>
  );
}
