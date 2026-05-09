import { useState } from 'react';
import { colors, spacing, radius, font } from '../theme';

export default function EmptyState({ title, description, icon, populateLabel, clearLabel, populatedContent }) {
  const [hasContent, setHasContent] = useState(false);

  if (hasContent) {
    return (
      <div>
        {populatedContent}
        <button
          style={{
            fontFamily: font, fontSize: '14px', padding: '8px 16px',
            borderRadius: radius.sm, cursor: 'pointer', border: 'none',
            background: colors.danger, color: colors.onDark,
            marginTop: spacing.md,
          }}
          onClick={() => setHasContent(false)}
        >[×] {clearLabel || 'Clear All'}</button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', padding: spacing.xxl }}>
      <div style={{ color: colors.stone, fontSize: '24px', marginBottom: spacing.md }}>
        {icon || '[∅]'}
      </div>
      <h3 style={{ color: colors.ink, fontSize: '16px', fontWeight: 600, margin: '0 0 8px' }}>{title}</h3>
      <p style={{ color: colors.mute, fontSize: '14px', maxWidth: '320px', margin: '0 auto 16px' }}>{description}</p>
      <button
        style={{
          fontFamily: font, fontSize: '14px', padding: '8px 16px',
          borderRadius: radius.sm, cursor: 'pointer', border: 'none',
          background: colors.ink, color: colors.onDark,
        }}
        onClick={() => setHasContent(true)}
      >[+] {populateLabel || 'Populate'}</button>
    </div>
  );
}
