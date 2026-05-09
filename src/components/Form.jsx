import { useState, useEffect, useRef } from 'react';
import { colors, spacing, radius, font } from '../theme';

export function SearchInput({ placeholder = 'Type to search...', onSearch }) {
  const [value, setValue] = useState('');
  return (
    <div style={{
      display: 'flex', alignItems: 'center', border: `1px solid ${colors.hairline}`,
      borderRadius: radius.sm, background: colors.canvas, padding: '0 12px',
    }}>
      <span style={{ color: colors.mute, marginRight: '8px' }}>[⌕]</span>
      <input
        type="text" value={value} placeholder={placeholder}
        style={{
          flex: 1, border: 'none', background: 'none', outline: 'none',
          fontFamily: font, fontSize: '14px', color: colors.body, padding: '8px 0',
        }}
        onChange={e => { const v = e.target.value; setValue(v); onSearch?.(v); }}
      />
      {value && (
        <button
          style={{ background: 'none', border: 'none', color: colors.mute, cursor: 'pointer', fontFamily: font, fontSize: '14px', padding: 0 }}
          onClick={() => { setValue(''); onSearch?.(''); }}
        >[×]</button>
      )}
    </div>
  );
}

export function Select({ options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(value ?? '');
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '8px 12px', border: `1px solid ${colors.hairline}`, borderRadius: radius.sm,
          background: colors.canvas, color: colors.body, fontFamily: font, fontSize: '14px', cursor: 'pointer',
        }}
        onClick={() => setOpen(!open)}
      >
        <span>{selected || 'Select an option...'}</span>
        <span style={{ color: colors.mute }}>[▾]</span>
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 50,
          marginTop: '4px', background: colors.canvas, border: `1px solid ${colors.hairlineStrong}`,
          borderRadius: radius.sm, maxHeight: '200px', overflow: 'auto',
        }}>
          {options.map((opt, i) => (
            <div
              key={i}
              style={{
                padding: '8px 12px', cursor: 'pointer', fontSize: '14px', fontFamily: font,
                color: colors.body, display: 'flex', alignItems: 'center', gap: '8px',
                background: opt === selected ? colors.surfaceSoft : 'transparent',
              }}
              onClick={() => { setSelected(opt); setOpen(false); onChange?.(opt); }}
            >
              <span style={{ color: selected === opt ? colors.ink : 'transparent' }}>{selected === opt ? '[•]' : ''}</span>
              <span>{opt}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function RadioGroup({ options, value, onChange }) {
  const [selected, setSelected] = useState(value ?? options[0]?.value);
  return (
    <div>
      {options.map(opt => (
        <div
          key={opt.value}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '4px 0', cursor: 'pointer', fontFamily: font, fontSize: '14px',
          }}
          onClick={() => { setSelected(opt.value); onChange?.(opt.value); }}
        >
          <span style={{ color: selected === opt.value ? colors.ink : colors.mute }}>
            {selected === opt.value ? '(•)' : '( )'}
          </span>
          <span style={{ color: colors.body }}>{opt.label}</span>
        </div>
      ))}
    </div>
  );
}

const sampleFiles = ['config.json', 'README.md', 'index.ts'];

export function Dropzone({ onAddFile }) {
  const [files, setFiles] = useState([]);
  const [dragover, setDragover] = useState(false);
  const [count, setCount] = useState(0);

  const addFile = () => {
    const name = sampleFiles[count % sampleFiles.length];
    setFiles([...files, name]);
    setCount(count + 1);
    onAddFile?.(name);
  };

  return (
    <div>
      <div
        style={{
          border: `1px dashed ${dragover ? colors.ink : colors.hairlineStrong}`,
          borderRadius: radius.sm, padding: spacing.xxl, textAlign: 'center', cursor: 'pointer',
          background: dragover ? colors.surfaceSoft : 'transparent',
        }}
        onDragOver={e => { e.preventDefault(); setDragover(true); }}
        onDragLeave={() => setDragover(false)}
        onDrop={e => { e.preventDefault(); setDragover(false); addFile(); }}
        onClick={addFile}
      >
        <div style={{ color: colors.mute, fontSize: '24px', marginBottom: spacing.sm }}>[↑]</div>
        <div style={{ color: colors.body, fontSize: '14px', fontFamily: font }}>Drop files or click to upload</div>
      </div>
      {files.length > 0 && (
        <div style={{ marginTop: spacing.md }}>
          {files.map((f, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '4px 0', borderBottom: `1px solid ${colors.hairline}`,
              fontFamily: font, fontSize: '14px', color: colors.body,
            }}>
              <span>{f}</span>
              <button
                style={{ background: 'none', border: 'none', color: colors.stone, cursor: 'pointer', fontFamily: font, fontSize: '14px', padding: '0 4px' }}
                onClick={() => setFiles(files.filter((_, j) => j !== i))}
              >[×]</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
