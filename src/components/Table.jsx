import { colors, radius, font } from '../theme';

const baseCell = {
  padding: '8px 12px', fontSize: '14px', borderBottom: `1px solid ${colors.hairline}`,
};

export function Table({ columns, rows, compact, bordered }) {
  const tdStyle = {
    ...baseCell,
    padding: compact ? '4px 12px' : '8px 12px',
    borderRight: bordered ? `1px solid ${colors.hairline}` : 'none',
  };

  const thStyle = {
    ...baseCell,
    ...{ background: colors.surfaceSoft },
    fontWeight: 600, color: colors.ink,
    borderBottom: `1px solid ${colors.hairlineStrong}`,
    padding: compact ? '4px 12px' : '8px 12px',
    borderRight: bordered ? `1px solid ${colors.hairline}` : 'none',
  };

  return (
    <table style={{
      width: '100%', borderCollapse: 'collapse', fontFamily: font, fontSize: '14px',
      border: bordered ? `1px solid ${colors.hairline}` : 'none',
    }}>
      <thead>
        <tr>
          {columns.map(col => (
            <th key={col.key} style={{ ...thStyle, textAlign: col.numeric ? 'right' : 'left' }}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {columns.map(col => (
              <td key={col.key} style={{ ...tdStyle, textAlign: col.numeric ? 'right' : 'left' }}>
                {row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
