import { useState } from 'react';
import { colors, spacing, radius, font } from '../theme';

const baseTd = {
  padding: '8px 12px',
  fontSize: '14px',
  borderBottom: `1px solid ${colors.hairline}`,
};

const baseTh = {
  ...baseTd,
  fontWeight: 600,
  color: colors.ink,
  borderBottom: `1px solid ${colors.hairlineStrong}`,
};

const headerBg = {
  background: colors.surfaceSoft,
};

export function Table({ variant = 'default', headers, rows }) {
  const [selectedRows, setSelectedRows] = useState(new Set());

  function toggleRow(id) {
    setSelectedRows(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function selectAll() {
    const all = new Set(rows.map((_, i) => i));
    setSelectedRows(all.size === selectedRows.size ? new Set() : all);
  }

  const isCompact = variant === 'compact';
  const isInteractive = variant === 'interactive';
  const isBordered = variant === 'bordered';

  const tdStyle = {
    ...baseTd,
    padding: isCompact ? '4px 12px' : '8px 12px',
    borderRight: isBordered ? `1px solid ${colors.hairline}` : 'none',
  };

  const thStyle = {
    ...baseTh,
    ...headerBg,
    padding: isCompact ? '4px 12px' : '8px 12px',
    borderRight: isBordered ? `1px solid ${colors.hairline}` : 'none',
  };

  return (
    <div>
      {isInteractive && (
        <div style={{ display: 'flex', gap: spacing.sm, marginBottom: spacing.md, alignItems: 'center' }}>
          <button
            style={{
              fontFamily: font, fontSize: '14px', padding: '4px 12px', borderRadius: radius.sm,
              cursor: 'pointer', border: `1px solid ${colors.hairlineStrong}`, background: colors.canvas, color: colors.body,
            }}
            onClick={selectAll}
          >{selectedRows.size === rows.length ? 'Deselect All' : 'Select All'}</button>
          <button
            style={{
              fontFamily: font, fontSize: '14px', padding: '4px 12px', borderRadius: radius.sm,
              cursor: 'pointer', border: 'none', background: colors.danger, color: colors.onDark,
            }}
            onClick={() => {
              if (selectedRows.size === 0) return;
              setSelectedRows(new Set());
            }}
          >[x] Delete Selected</button>
          <span style={{ color: colors.mute, fontSize: '14px' }}>{selectedRows.size} selected</span>
        </div>
      )}
      <table style={{
        width: '100%', borderCollapse: 'collapse', fontFamily: font, fontSize: '14px',
        border: !isBordered ? 'none' : `1px solid ${colors.hairline}`,
      }}>
        <thead>
          <tr>
            {isInteractive && <th style={{ ...thStyle, width: '40px' }}></th>}
            {headers.map((h, i) => (
              <th key={i} style={{ ...thStyle, textAlign: h.numeric ? 'right' : 'left' }}>{h.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={ri}
              style={{
                background: isInteractive && selectedRows.has(ri) ? colors.surfaceCard
                  : ri % 2 === 0 ? colors.canvas : colors.surfaceSoft,
                cursor: isInteractive ? 'pointer' : 'default',
                borderLeft: isInteractive && selectedRows.has(ri) ? `2px solid ${colors.ink}` : '2px solid transparent',
              }}
              onClick={() => isInteractive && toggleRow(ri)}
            >
              {isInteractive && (
                <td style={tdStyle}>{selectedRows.has(ri) ? '[x]' : '[ ]'}</td>
              )}
              {row.cells.map((cell, ci) => (
                <td key={ci} style={{
                  ...tdStyle,
                  textAlign: headers[ci]?.numeric ? 'right' : 'left',
                }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
