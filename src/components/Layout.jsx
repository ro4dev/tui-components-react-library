import { colors } from '../theme';

export function HorizontalDivider({ strong }) {
  return (
    <hr style={{ border: 'none', borderTop: `1px solid ${strong ? colors.hairlineStrong : colors.hairline}`, margin: 0 }} />
  );
}

export function VerticalDivider() {
  return (
    <span style={{ display: 'inline-block', width: '1px', height: '1em', background: colors.hairline, margin: '0 8px', verticalAlign: 'middle' }} />
  );
}
