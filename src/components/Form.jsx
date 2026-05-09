import { useState, useEffect, useRef } from 'react';
import { colors, spacing, radius, font } from '../theme';

export function SearchInput({ placeholder = 'Type to search...', onChange }) {
  const [value, setValue] = useState('');

  function handleChange(v) {
    setValue(v);
    onChange && onChange(v);
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${colors.hairline}`, borderRadius: radius.sm, background: colors.canvas, padding: '0 12px' }}>
      <span style={{ color: colors.mute, marginRight: '8px' }}>[⌕]</span>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        style={{
          flex: 1, border: 'none', background: 'none', outline: 'none',
          fontFamily: font, fontSize: '14px', color: colors.body,
          padding: '8px 0',
        }}
        onChange={e => handleChange(e.target.value)}
      />
      {value && (
        <button
          style={{
            background: 'none', border: 'none', color: colors.mute, cursor: 'pointer',
            fontFamily: font, fontSize: '14px', padding: 0,
          }}
          onClick={() => handleChange('')}
        >[×]</button>
      )}
    </div>
  );
}

export function Select({ options, placeholder = 'Select an option...', onChange }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', padding: '8px 12px', border: `1px solid ${colors.hairline}`,
          borderRadius: radius.sm, background: colors.canvas, color: colors.body,
          fontFamily: font, fontSize: '14px', cursor: 'pointer',
        }}
        onClick={() => setOpen(!open)}
      >
        <span>{selected || placeholder}</span>
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
                padding: '8px 12px', cursor: 'pointer', fontSize: '14px',
                fontFamily: font, color: colors.body, display: 'flex', alignItems: 'center', gap: '8px',
                background: opt === selected ? colors.surfaceSoft : 'transparent',
              }}
              onClick={() => { setSelected(opt); setOpen(false); onChange && onChange(opt); }}
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

export function RadioGroup({ options, value, onChange, name }) {
  return (
    <div>
      {options.map((opt, i) => {
        const selected = opt.value === value;
        return (
          <div
            key={i}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '4px 0', cursor: 'pointer', fontFamily: font, fontSize: '14px',
            }}
            onClick={() => onChange && onChange(opt.value)}
          >
            <span style={{ color: selected ? colors.ink : colors.mute }}>
              {selected ? '(•)' : '( )'}
            </span>
            <span style={{ color: colors.body }}>{opt.label}</span>
          </div>
        );
      })}
    </div>
  );
}

export function FileUpload({ onFileAdd, onFileRemove, files }) {
  const [fileList, setFileList] = useState(files || []);
  const [dragover, setDragover] = useState(false);

  const sampleFiles = ['config.json', 'README.md', 'index.ts', 'package.json', 'styles.css'];
  const countRef = useRef(0);

  function addFile() {
    const file = sampleFiles[countRef.current % sampleFiles.length];
    countRef.current++;
    const next = [...fileList, file];
    setFileList(next);
    onFileAdd && onFileAdd(file);
  }

  function removeFile(i) {
    const next = fileList.filter((_, idx) => idx !== i);
    setFileList(next);
    onFileRemove && onFileRemove(i);
  }

  return (
    <div>
      <div
        style={{
          border: `1px dashed ${dragover ? colors.ink : colors.hairlineStrong}`,
          borderRadius: radius.sm, padding: spacing.xxl, textAlign: 'center', cursor: 'pointer',
          background: dragover ? colors.surfaceSoft : 'transparent',
          borderWidth: dragover ? '2px' : '1px',
        }}
        onDragOver={e => { e.preventDefault(); setDragover(true); }}
        onDragLeave={() => setDragover(false)}
        onDrop={e => { e.preventDefault(); setDragover(false); addFile(); }}
        onClick={() => addFile()}
      >
        <div style={{ color: colors.mute, fontSize: '24px', marginBottom: spacing.sm }}>[↑]</div>
        <div style={{ color: colors.body, fontSize: '14px', fontFamily: font }}>Drop files or click to upload</div>
      </div>
      <div style={{ marginTop: spacing.md }}>
        {fileList.map((f, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '4px 0', borderBottom: `1px solid ${colors.hairline}`,
            fontFamily: font, fontSize: '14px', color: colors.body,
          }}>
            <span>{f}</span>
            <button
              style={{
                background: 'none', border: 'none', color: colors.stone, cursor: 'pointer',
                fontFamily: font, fontSize: '14px', padding: '0 4px',
              }}
              onClick={() => removeFile(i)}
            >[×]</button>
          </div>
        ))}
      </div>
    </div>
  );
}
