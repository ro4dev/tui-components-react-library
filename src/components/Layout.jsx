import { colors, spacing, font } from '../theme';

export function DividerHorizontal({ strong }) {
  return (
    <hr style={{
      border: 'none',
      borderTop: `1px solid ${strong ? colors.hairlineStrong : colors.hairline}`,
      margin: 0,
    }} />
  );
}

export function DividerVertical() {
  return (
    <span style={{
      display: 'inline-block',
      width: '1px',
      height: '1em',
      background: colors.hairline,
      margin: '0 8px',
      verticalAlign: 'middle',
    }} />
  );
}

const spacerSizes = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  xxl: '32px',
  section: '96px',
};

export function Spacer({ size = 'md', horizontal }) {
  const px = spacerSizes[size] || spacerSizes.md;
  return (
    <div style={{
      width: horizontal ? px : '100%',
      height: horizontal ? '1px' : px,
      flexShrink: 0,
    }} />
  );
}

export function Container({ children, maxWidth = '960px', fullBleed }) {
  return (
    <div style={{
      maxWidth: fullBleed ? 'none' : maxWidth,
      margin: fullBleed ? 0 : '0 auto',
      padding: '16px',
      '@media (min-width: 768px)': { padding: '24px' },
    }}>
      {children}
    </div>
  );
}
