import { useState } from 'react';
import { colors, spacing, radius, font } from '../theme';

export function BulletList({ items }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {items.map((item, i) => (
        <li key={i} style={{
          padding: '4px 0',
          color: colors.body,
          fontSize: '14px',
          borderBottom: `1px solid ${colors.hairline}`,
        }}>
          <span style={{ color: colors.mute, marginRight: '8px' }}>[•]</span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function NumberedList({ items }) {
  return (
    <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {items.map((item, i) => (
        <li key={i} style={{
          padding: '4px 0',
          color: colors.body,
          fontSize: '14px',
          borderBottom: `1px solid ${colors.hairline}`,
        }}>
          <span style={{ color: colors.mute, marginRight: '8px' }}>{i + 1}.</span>
          {item}
        </li>
      ))}
    </ol>
  );
}

export function DefinitionList({ items }) {
  return (
    <dl style={{ margin: 0 }}>
      {items.map((item, i) => (
        <div key={i} style={{ borderBottom: `1px solid ${colors.hairline}` }}>
          <dt style={{ fontWeight: 600, color: colors.ink, padding: '8px 0 0', fontSize: '14px' }}>{item.term}</dt>
          <dd style={{ color: colors.body, padding: '0 0 8px 16px', fontSize: '14px', margin: 0 }}>{item.definition}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Tag({ children, removable, onRemove }) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      background: colors.surfaceSoft,
      color: colors.mute,
      borderRadius: radius.sm,
      padding: '2px 8px',
      fontSize: '14px',
      fontFamily: font,
    }}>
      {children}
      {removable && onRemove && (
        <span
          style={{ color: colors.stone, cursor: 'pointer', marginLeft: '2px' }}
          onClick={onRemove}
        >[×]</span>
      )}
    </span>
  );
}

export function TagGroup({ tags, removable, onRemove }) {
  const [tagList, setTagList] = useState(tags);

  function handleRemove(i) {
    if (onRemove) onRemove(i);
    const next = tagList.filter((_, idx) => idx !== i);
    setTagList(next);
  }

  function handleAdd(value) {
    if (value.trim()) {
      setTagList([...tagList, value.trim()]);
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: spacing.md }}>
        {tagList.map((tag, i) => (
          <Tag key={i} removable={removable} onRemove={removable ? () => handleRemove(i) : undefined}>
            {tag}
          </Tag>
        ))}
      </div>
      {removable && (
        <div style={{ display: 'flex', gap: spacing.sm }}>
          <input
            placeholder="Add new tag..."
            style={{
              flex: 1, padding: '8px 12px', border: `1px solid ${colors.hairline}`,
              borderRadius: radius.sm, fontFamily: font, fontSize: '13px',
              background: colors.canvas, color: colors.body,
            }}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleAdd(e.target.value);
                e.target.value = '';
              }
            }}
          />
          <button
            style={{
              fontFamily: font, fontSize: '14px', padding: '8px 16px',
              borderRadius: radius.sm, cursor: 'pointer',
              border: `1px solid ${colors.hairlineStrong}`, background: colors.canvas, color: colors.body,
            }}
            onClick={() => {
              const input = document.querySelector('[data-tag-input]');
              if (input) { handleAdd(input.value); input.value = ''; }
            }}
          >[+] Add Tag</button>
        </div>
      )}
    </div>
  );
}
