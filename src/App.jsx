import { useState, useCallback, useEffect } from 'react';
import {
  Accordion, AccordionItem,
  Alert,
  Avatar, UserPill,
  StatusBadge, LabelBadge, CounterBadge,
  Breadcrumb,
  CardFlat, CardHeader, CardDark, CardStats,
  CodeBlock, InlineCode,
  CopyButton,
  ListItem, DefinitionList, Tag,
  Dialog,
  EmptyState,
  ToastContainer, Skeleton, toast,
  SearchInput, Select, RadioGroup, Dropzone,
  Kbd,
  HorizontalDivider,
  ImageBlock, VideoEmbed, Blockquote,
  SidebarNav, Pagination,
  Panel,
  ProgressBar, Spinner, ProgressSteps,
  Table,
  Tabs,
  Toggle,
  Tooltip,
  colors, spacing, radius, font,
} from './index';

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  const showToast = useCallback((type, msg) => { toast(type, msg); }, []);

  const sidebarGroups = [
    { header: 'Main', items: [{ label: 'Dashboard', active: true }, { label: 'Files' }, { label: 'Settings', nested: true }] },
    { header: 'Agents', items: [{ label: 'Active Agents' }, { label: 'Pool Config', nested: true }] },
  ];

  const steps = [
    { label: 'Init', completed: true }, { label: 'Build', active: true },
    { label: 'Test' }, { label: 'Done' },
  ];

  const fontStyle = {
    fontFamily: font,
    background: colors.canvas,
    color: colors.body,
    padding: '32px',
    maxWidth: '900px',
    margin: '0 auto',
    lineHeight: 1.6,
  };

  const sectionStyle = { marginBottom: '48px' };
  const sectionTitle = {
    fontSize: '14px', color: colors.stone, textTransform: 'uppercase',
    letterSpacing: '1px', marginBottom: '12px',
  };

  return (
    <div style={fontStyle}>
      <div style={{
        marginBottom: '32px', paddingBottom: '16px',
        borderBottom: `1px solid ${colors.hairlineStrong}`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
      }}>
        <div>
          <h1 style={{ fontSize: '24px', color: colors.ink, marginBottom: '4px' }}>TUI Components React</h1>
          <p style={{ color: colors.mute, fontSize: '14px' }}>All components ported from vanilla HTML/CSS/JS to React with inline styles</p>
        </div>
        <button
          onClick={toggleTheme}
          style={{
            fontFamily: font, fontSize: '13px', padding: '6px 12px',
            border: `1px solid ${colors.hairlineStrong}`, borderRadius: radius.sm,
            background: colors.surfaceSoft, color: colors.ink, cursor: 'pointer',
          }}
        >{theme === 'light' ? '[🌙] Dark' : '[☀️] Light'}</button>
      </div>

      <ToastContainer />

      {/* Accordion */}
      <div style={sectionStyle}>
        <div style={sectionTitle}>Accordion</div>
        <Accordion>
          <AccordionItem title="Getting Started">
            Welcome to the TUI design system. This accordion demonstrates expand/collapse functionality.
          </AccordionItem>
          <AccordionItem title="Component API">
            Each component exports a standard API with props for configuration.
          </AccordionItem>
          <AccordionItem title="Design Tokens" defaultOpen>
            Colors: canvas, ink, body, mute. Spacing: xs through xxl.
          </AccordionItem>
        </Accordion>
      </div>

      <HorizontalDivider />

      {/* Alerts */}
      <div style={sectionStyle}>
        <div style={sectionTitle}>Alerts</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Alert type="info" title="New version available">OpenCode 2.4.0 is ready to install.</Alert>
          <Alert type="warning" title="Low disk space">Less than 2 GB remaining.</Alert>
          <Alert type="danger" title="Build failed">TypeScript error in src/agent.ts:42</Alert>
          <Alert type="success" title="Deploy complete">Production updated successfully.</Alert>
          <p><Alert type="warning" inline>[!] This action cannot be undone.</Alert></p>
        </div>
      </div>

      <HorizontalDivider />

      {/* Avatars */}
      <div style={sectionStyle}>
        <div style={sectionTitle}>Avatars</div>
        <div style={{ display: 'flex', gap: spacing.xl, alignItems: 'center', marginBottom: spacing.md }}>
          <Avatar>J</Avatar>
          <Avatar size="compact">A</Avatar>
        </div>
        <UserPill name="Jane Doe" role="Designer" />
        <UserPill name="Alex Kim" role="Developer" />
        <UserPill name="Sara Miles" role="Manager" onRemove={() => {}} />
      </div>

      <HorizontalDivider />

      {/* Badges */}
      <div style={sectionStyle}>
        <div style={sectionTitle}>Badges</div>
        <div style={{ display: 'flex', gap: spacing.md, marginBottom: spacing.md, alignItems: 'center' }}>
          <StatusBadge state="active" />
          <StatusBadge state="warning" />
          <StatusBadge state="error" />
          <StatusBadge state="idle" />
        </div>
        <div style={{ display: 'flex', gap: spacing.md, marginBottom: spacing.md, alignItems: 'center' }}>
          <LabelBadge>Draft</LabelBadge>
          <LabelBadge accent>Feature</LabelBadge>
        </div>
        <div style={{ display: 'flex', gap: spacing.md, alignItems: 'center' }}>
          <CounterBadge count={3} />
          <CounterBadge count="99+" />
        </div>
      </div>

      <HorizontalDivider />

      {/* Breadcrumbs */}
      <div style={sectionStyle}>
        <div style={sectionTitle}>Breadcrumbs</div>
        <Breadcrumb items={[
          { label: 'home' }, { label: 'docs' }, { label: 'agents' }, { label: 'configuration', active: true },
        ]} />
      </div>

      <HorizontalDivider />

      {/* Cards */}
      <div style={sectionStyle}>
        <div style={sectionTitle}>Cards</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: spacing.lg }}>
          <CardFlat title="Fast Indexing">Agents navigate your codebase in milliseconds.</CardFlat>
          <CardFlat title="Local-First">Everything runs on your machine.</CardFlat>
        </div>
        <div style={{ marginBottom: spacing.lg }}>
          <CardHeader title="Session Activity" actions={<span style={{ fontSize: 12, color: colors.mute }}>Live</span>}>
            <p>3 active agents processing 12 files.</p>
          </CardHeader>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: spacing.lg }}>
          <CardDark command="$ opencode serve"><div>Initializing server...</div></CardDark>
          <CardDark command="$ opencode status"><div>Fetching status...</div></CardDark>
        </div>
        <CardStats cells={[
          { number: '12.8K', label: 'Files Indexed' },
          { number: 4, label: 'Active Agents' },
          { number: '99%', label: 'Uptime' },
        ]} />
      </div>

      <HorizontalDivider />

      {/* Code Blocks */}
      <div style={sectionStyle}>
        <div style={sectionTitle}>Code Blocks</div>
        <CodeBlock filename="example.js" code={'function greetUser(name) {\n  const message = `Hello, ${name}!`;\n  return message;\n}\n\nconst result = greetUser("World");\nconsole.log(result); // Hello, World!'} />
        <div style={{ display: 'flex', gap: spacing.md, flexWrap: 'wrap', marginTop: spacing.md }}>
          <InlineCode>const count = 42;</InlineCode>
          <CopyButton text="npm install @opencode/core" />
        </div>
      </div>

      <HorizontalDivider />

      {/* Dialog */}
      <div style={sectionStyle}>
        <div style={sectionTitle}>Dialog</div>
        <button
          style={{
            fontFamily: font, fontSize: '14px', padding: '8px 16px', borderRadius: radius.sm,
            cursor: 'pointer', border: `1px solid ${colors.hairlineStrong}`, background: colors.canvas, color: colors.body,
          }}
          onClick={() => setDialogOpen(true)}
        >Open Dialog</button>
        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          title="Save Changes"
          footer={
            <>
              <button
                style={{
                  fontFamily: font, fontSize: '14px', padding: '8px 16px', borderRadius: radius.sm,
                  cursor: 'pointer', border: `1px solid ${colors.hairlineStrong}`,
                  background: 'transparent', color: colors.body,
                }}
                onClick={() => setDialogOpen(false)}
              >Cancel</button>
              <button
                style={{
                  fontFamily: font, fontSize: '14px', padding: '8px 16px', borderRadius: radius.sm,
                  cursor: 'pointer', border: 'none', background: colors.ink, color: colors.onDark,
                }}
                onClick={() => { setDialogOpen(false); showToast('success', 'Changes saved successfully.'); }}
              >Save</button>
            </>
          }
        >
          You have unsaved changes. Would you like to save them?
        </Dialog>
      </div>

      <HorizontalDivider />

      {/* Empty State */}
      <div style={sectionStyle}>
        <div style={sectionTitle}>Empty State</div>
        <EmptyState
          title="No files found"
          description="There are no files matching your search criteria."
        />
      </div>

      <HorizontalDivider />

      {/* Forms */}
      <div style={sectionStyle}>
        <div style={sectionTitle}>Forms</div>
        <div style={{ marginBottom: spacing.lg }}>
          <div style={{ fontSize: 13, color: colors.ink, marginBottom: 8, fontWeight: 500 }}>Search</div>
          <SearchInput />
        </div>
        <div style={{ marginBottom: spacing.lg }}>
          <div style={{ fontSize: 13, color: colors.ink, marginBottom: 8, fontWeight: 500 }}>Select Framework</div>
          <Select options={['React', 'Vue', 'Svelte', 'Angular', 'Solid']} />
        </div>
        <div style={{ marginBottom: spacing.lg }}>
          <div style={{ fontSize: 13, color: colors.ink, marginBottom: 8, fontWeight: 500 }}>Build Target</div>
          <RadioGroup options={[
            { value: 'dev', label: 'Development (debug)' },
            { value: 'prod', label: 'Production (optimized)' },
            { value: 'test', label: 'Test (with coverage)' },
          ]} />
        </div>
        <div>
          <div style={{ fontSize: 13, color: colors.ink, marginBottom: 8, fontWeight: 500 }}>File Upload</div>
          <Dropzone />
        </div>
      </div>

      <HorizontalDivider />

      {/* Keyboard */}
      <div style={sectionStyle}>
        <div style={sectionTitle}>Keyboard</div>
        <div style={{ display: 'flex', gap: spacing.sm, alignItems: 'center' }}>
          <Kbd>⌘</Kbd><span style={{ color: colors.body }}>+</span><Kbd>K</Kbd>
          <span style={{ color: colors.mute, margin: '0 8px' }}>·</span>
          <Kbd>↑↓</Kbd><span style={{ color: colors.mute }}> navigate</span>
        </div>
      </div>

      <HorizontalDivider />

      {/* Media */}
      <div style={sectionStyle}>
        <div style={sectionTitle}>Media</div>
        <div style={{ marginBottom: spacing.lg }}>
          <ImageBlock caption="Terminal screenshot placeholder">
            <div style={{ padding: 40, textAlign: 'center', color: colors.mute }}>[image placeholder]</div>
          </ImageBlock>
        </div>
        <div style={{ marginBottom: spacing.lg, maxWidth: 480 }}>
          <VideoEmbed />
        </div>
        <Blockquote cite="OpenCode Team">
          The terminal is not just an interface—it is the interface.
        </Blockquote>
      </div>

      <HorizontalDivider />

      {/* Navigation */}
      <div style={sectionStyle}>
        <div style={sectionTitle}>Navigation</div>
        <div style={{ display: 'flex', gap: spacing.xl, flexWrap: 'wrap' }}>
          <SidebarNav groups={sidebarGroups} />
          <div>
            <div style={{ marginBottom: spacing.md }}>
              <Pagination current={page} total={10} onChange={setPage} pageSize={20} pageSizeOptions={[10, 20, 50]} onPageSizeChange={s => console.log('page size:', s)} totalItems={200} />
            </div>
          </div>
        </div>
      </div>

      <HorizontalDivider />

      {/* Panel */}
      <div style={sectionStyle}>
        <div style={sectionTitle}>Panel</div>
        <Panel header="Build Output" footer="3 warnings">
          <p>Compiled 847 modules in 4.2s.</p>
          <p style={{ color: colors.mute }}>0 errors, 3 warnings.</p>
        </Panel>
      </div>

      <HorizontalDivider />

      {/* Progress */}
      <div style={sectionStyle}>
        <div style={sectionTitle}>Progress</div>
        <div style={{ marginBottom: spacing.lg }}>
          <ProgressBar value={65} />
        </div>
        <div style={{ marginBottom: spacing.lg }}>
          <Spinner label="Building..." />
        </div>
        <ProgressSteps steps={steps} />
      </div>

      <HorizontalDivider />

      {/* Table */}
      <div style={sectionStyle}>
        <div style={sectionTitle}>Table</div>
        <Table
          columns={[{ key: 'name', label: 'Name' }, { key: 'type', label: 'Type' }, { key: 'size', label: 'Size', numeric: true }]}
          rows={[
            { name: 'index.ts', type: 'TypeScript', size: '2.4 KB' },
            { name: 'style.css', type: 'CSS', size: '1.1 KB' },
            { name: 'config.json', type: 'JSON', size: '0.5 KB' },
          ]}
        />
      </div>

      <HorizontalDivider />

      {/* Tabs */}
      <div style={sectionStyle}>
        <div style={sectionTitle}>Tabs</div>
        <div style={{ marginBottom: spacing.lg }}>
          <div style={{ fontSize: 13, color: colors.ink, marginBottom: 8, fontWeight: 500 }}>Strip</div>
          <Tabs tabs={[
            { id: 'files', label: 'Files', content: <p>File explorer: 12,847 files indexed.</p> },
            { id: 'search', label: 'Search', content: <p>Search: Type to find across all files.</p> },
            { id: 'terminal', label: 'Terminal', content: <p>$ opencode serve — running on :3000</p> },
          ]} />
        </div>
        <div style={{ marginBottom: spacing.lg }}>
          <div style={{ fontSize: 13, color: colors.ink, marginBottom: 8, fontWeight: 500 }}>Strip · Full width</div>
          <Tabs fullWidth tabs={[
            { id: 'files', label: 'Files', content: <p>File explorer: 12,847 files indexed.</p> },
            { id: 'search', label: 'Search', content: <p>Search: Type to find across all files.</p> },
            { id: 'terminal', label: 'Terminal', content: <p>$ opencode serve — running on :3000</p> },
          ]} />
        </div>
        <div style={{ marginBottom: spacing.lg }}>
          <div style={{ fontSize: 13, color: colors.ink, marginBottom: 8, fontWeight: 500 }}>Pills</div>
          <Tabs variant="pills" tabs={[
            { id: 'all', label: 'All', content: <p>Showing all 12,847 files.</p> },
            { id: 'ts', label: 'TypeScript', content: <p>Found 8,421 TypeScript files.</p> },
            { id: 'js', label: 'JavaScript', content: <p>Found 1,203 JavaScript files.</p> },
          ]} />
        </div>
        <div>
          <div style={{ fontSize: 13, color: colors.ink, marginBottom: 8, fontWeight: 500 }}>Pills · Full width</div>
          <Tabs variant="pills" fullWidth tabs={[
            { id: 'all', label: 'All', content: <p>Showing all 12,847 files.</p> },
            { id: 'ts', label: 'TypeScript', content: <p>Found 8,421 TypeScript files.</p> },
            { id: 'js', label: 'JavaScript', content: <p>Found 1,203 JavaScript files.</p> },
          ]} />
        </div>
      </div>

      <HorizontalDivider />

      {/* Toggles */}
      <div style={sectionStyle}>
        <div style={sectionTitle}>Toggles</div>
        <div style={{
          background: colors.surfaceSoft, borderRadius: radius.sm,
          border: `1px solid ${colors.hairline}`, padding: `${spacing.md} ${spacing.lg}`,
        }}>
          <Toggle label="Enable indexing" description="Search through your codebase faster" />
          <Toggle label="Auto-save changes" defaultOn />
          <Toggle label="Dark mode" variant="switch" />
          <Toggle label="Live reload" variant="switch" defaultOn />
        </div>
      </div>

      <HorizontalDivider />

      {/* Tooltips */}
      <div style={sectionStyle}>
        <div style={sectionTitle}>Tooltips</div>
        <div style={{ display: 'flex', gap: spacing.md, flexWrap: 'wrap' }}>
          <Tooltip label="Save current changes">
            <button style={{
              fontFamily: font, fontSize: '14px', padding: '8px 16px', borderRadius: radius.sm,
              cursor: 'pointer', border: `1px solid ${colors.hairlineStrong}`,
              background: colors.canvas, color: colors.body,
            }}>[⌕] Save</button>
          </Tooltip>
          <Tooltip label="Copy to clipboard">
            <button style={{
              fontFamily: font, fontSize: '14px', padding: '8px 16px', borderRadius: radius.sm,
              cursor: 'pointer', border: `1px solid ${colors.hairlineStrong}`,
              background: colors.canvas, color: colors.body,
            }}>[⎘] Copy</button>
          </Tooltip>
          <Tooltip label="Permanently delete item">
            <button style={{
              fontFamily: font, fontSize: '14px', padding: '8px 16px', borderRadius: radius.sm,
              cursor: 'pointer', border: `1px solid ${colors.hairlineStrong}`,
              background: colors.canvas, color: colors.body,
            }}>[×] Delete</button>
          </Tooltip>
        </div>
      </div>

      <HorizontalDivider />

      {/* Data Display */}
      <div style={sectionStyle}>
        <div style={sectionTitle}>Data Display</div>
        <div style={{ marginBottom: spacing.lg }}>
          <ListItem bullet>Bullet item one</ListItem>
          <ListItem bullet>Bullet item two</ListItem>
          <ListItem numbered index={1}>Numbered item</ListItem>
          <ListItem numbered index={2}>Numbered item two</ListItem>
        </div>
        <div style={{ marginBottom: spacing.lg }}>
          <DefinitionList items={[
            { term: 'Agent', description: 'A worker process that performs tasks' },
            { term: 'Pool', description: 'A group of available agent processes' },
          ]} />
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          <Tag>React</Tag>
          <Tag>TypeScript</Tag>
          <Tag onRemove={() => {}}>Dismissible</Tag>
        </div>
      </div>

      <HorizontalDivider />

      {/* Skeleton */}
      <div style={sectionStyle}>
        <div style={sectionTitle}>Skeleton Loading</div>
        <div style={{ display: 'flex', gap: spacing.md, alignItems: 'center', marginBottom: spacing.md }}>
          <Skeleton variant="avatar" />
          <div style={{ flex: 1 }}>
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="40%" />
          </div>
        </div>
        <Skeleton variant="thumbnail" width="100%" />
      </div>

      <HorizontalDivider />

      {/* Toast triggers */}
      <div style={sectionStyle}>
        <div style={sectionTitle}>Toast Notifications</div>
        <div style={{ display: 'flex', gap: spacing.sm, flexWrap: 'wrap' }}>
          <button
            style={{ fontFamily: font, fontSize: '14px', padding: '8px 16px', borderRadius: radius.sm, cursor: 'pointer', border: `1px solid ${colors.hairlineStrong}`, background: colors.canvas, color: colors.body }}
            onClick={() => showToast('info', 'Operation completed successfully.')}
          >[i] Info Toast</button>
          <button
            style={{ fontFamily: font, fontSize: '14px', padding: '8px 16px', borderRadius: radius.sm, cursor: 'pointer', border: `1px solid ${colors.hairlineStrong}`, background: colors.canvas, color: colors.success }}
            onClick={() => showToast('success', 'Deploy complete. Production updated.')}
          >[✓] Success Toast</button>
          <button
            style={{ fontFamily: font, fontSize: '14px', padding: '8px 16px', borderRadius: radius.sm, cursor: 'pointer', border: `1px solid ${colors.hairlineStrong}`, background: colors.canvas, color: colors.danger }}
            onClick={() => showToast('danger', 'Build failed. Check output.')}
          >[x] Error Toast</button>
          <button
            style={{ fontFamily: font, fontSize: '14px', padding: '8px 16px', borderRadius: radius.sm, cursor: 'pointer', border: `1px solid ${colors.hairlineStrong}`, background: colors.canvas, color: colors.warning }}
            onClick={() => showToast('warning', 'Low disk space.')}
          >[!] Warning Toast</button>
        </div>
      </div>
    </div>
  );
}

export default App;
