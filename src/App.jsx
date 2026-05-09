import React from 'react';
import {
  Accordion, Alert, AvatarCircle, UserPill, StatusBadge, LabelBadge,
  CounterBadge, InteractiveCounter, Breadcrumb, CardFlat, CardHeader,
  CardDark, CardStats, CodeBlock, InlineCode, CopyButton, BulletList,
  NumberedList, DefinitionList, Tag, TagGroup, Dialog, EmptyState,
  ToastContainer, SkeletonCard, SearchInput, Select, RadioGroup, FileUpload,
  Kbd, KbdSequence, CommandPalette, DividerHorizontal, DividerVertical,
  Spacer, Container, ImageBlock, VideoEmbed, Blockquote, SidebarNav,
  Pagination, DropdownMenu, ContextMenu, Panel, SplitPanel, ScrollArea,
  ProgressBarControls, Spinner, ProgressSteps, Table, TabStrip, TabPills,
  ToggleAscii, ToggleSwitch, Tooltip,
  colors, spacing, radius, font,
} from './index';

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

export default function App() {
  const [toasts, setToasts] = React.useState([]);

  function addToast(type, message) {
    setToasts(prev => [...prev, { type, message, autoDismiss: type === 'info' || type === 'success' }]);
  }

  function dismissToast(i) {
    setToasts(prev => prev.filter((_, idx) => idx !== i));
  }

  return (
    <div style={fontStyle}>
      <h1 style={{ fontSize: '24px', color: colors.ink, marginBottom: '8px' }}>TUI Components React</h1>
      <p style={{ color: colors.mute, fontSize: '14px', marginBottom: '32px', paddingBottom: '16px', borderBottom: `1px solid ${colors.hairlineStrong}` }}>
        All 23 components ported from vanilla HTML/CSS/JS to React with inline styles
      </p>

      {/* Accordion */}
      <div style={sectionStyle}>
        <div style={sectionTitle}>Accordion</div>
        <Accordion items={[
          {
            title: 'Getting Started', defaultOpen: true,
            content: <>Welcome to the TUI design system. This accordion demonstrates the expand/collapse functionality.<br /><br /></>,
            children: [
              { title: 'Installation Steps', content: '1. Clone the repo\n2. Install dependencies\n3. Run dev server' },
              { title: 'Configuration', content: 'Configure your design tokens in the root config file.' },
            ],
          },
          { title: 'Component API', content: 'Each component exports a standard API with props and events.' },
          { title: 'Design Tokens', content: 'Colors, Spacing, Radius — all customizable.' },
        ]} />
      </div>

      {/* Alerts */}
      <div style={sectionStyle}>
        <div style={sectionTitle}>Alerts</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Alert type="info" title="New version available">OpenCode 2.4.0 is ready to install.</Alert>
          <Alert type="warning" title="Low disk space">Less than 2 GB remaining.</Alert>
          <Alert type="danger" title="Build failed">TypeScript error in src/agent.ts:42</Alert>
          <Alert type="success" title="Deploy complete">Production updated successfully.</Alert>
          <p>
            <Alert type="warning" inline>[!] This action cannot be undone.</Alert>
          </p>
        </div>
      </div>

      {/* Avatars */}
      <div style={sectionStyle}>
        <div style={sectionTitle}>Avatars</div>
        <div style={{ display: 'flex', gap: spacing.xl, alignItems: 'center', marginBottom: spacing.md }}>
          <AvatarCircle>J</AvatarCircle>
          <AvatarCircle compact>A</AvatarCircle>
        </div>
        <UserPill name="Jane Doe" role="Designer" />
        <UserPill name="Alex Kim" role="Developer" />
      </div>

      {/* Badges */}
      <div style={sectionStyle}>
        <div style={sectionTitle}>Badges</div>
        <div style={{ display: 'flex', gap: spacing.md, flexWrap: 'wrap', marginBottom: spacing.md }}>
          <StatusBadge />
          <LabelBadge>Draft</LabelBadge>
          <LabelBadge accent>Feature</LabelBadge>
          <CounterBadge count={3} />
        </div>
        <InteractiveCounter label="Tasks" />
      </div>

      {/* Breadcrumbs */}
      <div style={sectionStyle}>
        <div style={sectionTitle}>Breadcrumbs</div>
        <Breadcrumb items={['home', 'docs', 'agents', 'configuration']} />
      </div>

      {/* Cards */}
      <div style={sectionStyle}>
        <div style={sectionTitle}>Cards</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '16px' }}>
          <CardFlat title="Fast Indexing">Agents navigate your codebase in milliseconds.</CardFlat>
          <CardFlat title="Local-First">Everything runs on your machine.</CardFlat>
        </div>
        <CardHeader title="Session Activity">
          <p>3 active agents processing 12 files.</p>
        </CardHeader>
        <div style={{ marginTop: '16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          <CardDark cmd="$ opencode serve"><div>Initializing server...</div></CardDark>
          <CardDark cmd="$ opencode status"><div>Fetching status...</div></CardDark>
        </div>
        <div style={{ marginTop: '16px' }}>
          <CardStats cells={[
            { label: 'Files Indexed', value: 12847 },
            { label: 'Active Agents', value: 4 },
            { label: 'Uptime %', value: 99 },
          ]} />
        </div>
      </div>

      {/* CodeBlock */}
      <div style={sectionStyle}>
        <div style={sectionTitle}>Code Block</div>
        <CodeBlock filename="example.js" code={'function greetUser(name) {\n  const message = `Hello, ${name}!`;\n  return message;\n}\n\nconst result = greetUser("World");\nconsole.log(result); // Hello, World!'} />
        <div style={{ marginTop: spacing.md }}>
          <InlineCode>const count = 42;</InlineCode>
        </div>
      </div>

      {/* Copy Button */}
      <div style={sectionStyle}>
        <div style={sectionTitle}>Copy Button</div>
        <CopyButton text="npm install @opencode/core" />
      </div>

      {/* Data Display */}
      <div style={sectionStyle}>
        <div style={sectionTitle}>Data Display</div>
        <BulletList items={['Enable syntax highlighting', 'Auto-save on change', 'Show line numbers']} />
        <NumberedList items={['Initialize project', 'Configure build tools', 'Write tests']} />
        <DefinitionList items={[
          { term: 'Model', definition: 'opencode/big-pickle' },
          { term: 'Context Window', definition: '200,000 tokens' },
        ]} />
        <TagGroup tags={['frontend', 'react', 'typescript']} removable />
      </div>

      {/* Dialog */}
      <div style={sectionStyle}>
        <div style={sectionTitle}>Dialog</div>
        <DialogDemo />
      </div>

      {/* Empty State */}
      <div style={sectionStyle}>
        <div style={sectionTitle}>Empty State</div>
        <EmptyState
          title="No files found"
          description="Drop files here or click to upload"
          populateLabel="Populate Files"
          clearLabel="Clear All"
          populatedContent={
            <div>
              <h3 style={{ color: colors.ink }}>Project Files</h3>
              <ul style={{ color: colors.body }}>
                <li>src/index.ts</li>
                <li>src/App.tsx</li>
              </ul>
            </div>
          }
        />
      </div>

      {/* Feedback */}
      <div style={sectionStyle}>
        <div style={sectionTitle}>Feedback (Toasts, Skeleton)</div>
        <div style={{ display: 'flex', gap: spacing.sm, marginBottom: spacing.md }}>
          {['info', 'success', 'error', 'warning'].map(t => (
            <button key={t} style={{
              fontFamily: font, fontSize: '14px', padding: '4px 12px', borderRadius: radius.sm,
              cursor: 'pointer', border: `1px solid ${colors.hairlineStrong}`, background: colors.canvas, color: colors.body,
            }} onClick={() => addToast(t, `[${t === 'info' ? 'i' : t === 'success' ? '✓' : '!'}] ${t.charAt(0).toUpperCase() + t.slice(1)}: Operation completed.`)}
            >{t.charAt(0).toUpperCase() + t.slice(1)}</button>
          ))}
        </div>
        <SkeletonCard />
        <ToastContainer toasts={toasts} onDismiss={dismissToast} />
      </div>

      {/* Form */}
      <div style={sectionStyle}>
        <div style={sectionTitle}>Form Elements</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
          <SearchInput />
          <Select options={['React', 'Vue', 'Svelte', 'Angular', 'Solid']} />
          <RadioGroup options={[
            { label: 'Development', value: 'dev' },
            { label: 'Production', value: 'prod' },
            { label: 'Test', value: 'test' },
          ]} />
          <FileUpload />
        </div>
      </div>

      {/* Keyboard */}
      <div style={sectionStyle}>
        <div style={sectionTitle}>Keyboard</div>
        <p><Kbd>⌘</Kbd> + <Kbd>K</Kbd> Open command palette</p>
        <div style={{ marginTop: spacing.sm }}>
          <CommandPalette commands={[
            { name: 'Create New File', hint: '⌘N' },
            { name: 'Open Settings', hint: '⌘,' },
            { name: 'Toggle Sidebar', hint: '⌘B' },
          ]} onSelect={cmd => alert(`Selected: ${cmd.name}`)} />
          <p style={{ color: colors.mute, fontSize: '13px' }}>Press ⌘K to open the command palette</p>
        </div>
      </div>

      {/* Layout */}
      <div style={sectionStyle}>
        <div style={sectionTitle}>Layout</div>
        <DividerHorizontal />
        <Spacer size="md" />
        <DividerHorizontal strong />
        <Spacer />
        <div>
          <span>Home</span><DividerVertical /><span>Docs</span><DividerVertical /><span>API</span>
        </div>
        <Container>
          <p>Content inside container (max-width: 960px)</p>
        </Container>
      </div>

      {/* Media */}
      <div style={sectionStyle}>
        <div style={sectionTitle}>Media</div>
        <ImageBlock placeholder="[image: agent-architecture.png]" caption="Figure 1: Agent pool architecture" />
        <VideoEmbed caption="Demo: Setting up your first agent pool" />
        <Blockquote attribution="OpenCode Design System">
          "The constraint is the identity."
        </Blockquote>
      </div>

      {/* Navigation */}
      <div style={sectionStyle}>
        <div style={sectionTitle}>Navigation</div>
        <div style={{ display: 'flex', gap: spacing.md, marginBottom: spacing.md }}>
          <SidebarNav groups={[
            {
              label: 'Getting Started',
              items: [
                { id: 'install', label: 'Installation' },
                { id: 'config', label: 'Configuration' },
                { id: 'pool', label: 'agent.pool_size', nested: true },
              ],
            },
          ]} />
        </div>
        <Pagination totalPages={5} />
        <div style={{ marginTop: spacing.md }}>
          <DropdownMenu
            trigger={<button style={{ fontFamily: font, fontSize: '14px', padding: '4px 12px', borderRadius: radius.sm, cursor: 'pointer', border: `1px solid ${colors.hairlineStrong}`, background: colors.canvas, color: colors.body }}>[▾] File Menu</button>}
            items={[
              { label: 'Open File', shortcut: '⌘O' },
              { label: 'Save', shortcut: '⌘S' },
              { label: 'Save As...', shortcut: '⇧⌘S' },
              { divider: true },
              { label: 'Preferences', shortcut: '⌘,' },
            ]}
          />
        </div>
      </div>

      {/* Panel */}
      <div style={sectionStyle}>
        <div style={sectionTitle}>Panels</div>
        <Panel header="Agent Status" footer={<><span>3 tasks pending</span><span>[i] Auto-refresh: 30s</span></>}>
          <p>The agent is currently active and processing requests.</p>
        </Panel>
        <div style={{ marginTop: spacing.md }}>
          <SplitPanel
            left={<><strong>Files</strong><div style={{ marginTop: spacing.md, color: colors.mute, fontSize: '12px' }}>src/main.ts<br />src/App.tsx<br />src/styles.css</div></>}
            right={<><strong>Preview</strong><div style={{ marginTop: spacing.md, color: colors.mute, fontSize: '12px' }}>Select a file to preview.</div></>}
          />
        </div>
        <div style={{ marginTop: spacing.md }}>
          <ScrollArea height="150px">
            <p>Line 1: import { defineConfig } from 'vite';</p>
            <p>Line 2: import react from '@vitejs/plugin-react';</p>
            <p>Line 3: export default defineConfig({'{'}</p>
            <p>Line 4:   plugins: [react()],</p>
            <p>Line 5:   server: {'{'} port: 3000 {'}'}</p>
            <p>Line 6: {'}'});</p>
          </ScrollArea>
        </div>
      </div>

      {/* Progress */}
      <div style={sectionStyle}>
        <div style={sectionTitle}>Progress</div>
        <ProgressBarControls />
        <div style={{ marginTop: spacing.md }}>
          <Spinner label="Building..." />
        </div>
        <div style={{ marginTop: spacing.md }}>
          <ProgressSteps />
        </div>
      </div>

      {/* Table */}
      <div style={sectionStyle}>
        <div style={sectionTitle}>Table</div>
        <Table
          headers={[
            { label: 'Component' },
            { label: 'Status' },
            { label: 'Version' },
            { label: 'Size', numeric: true },
          ]}
          rows={[
            { cells: ['button-primary', 'stable', '2.1.0', '4.2 KB'] },
            { cells: ['card-flat', 'stable', '1.8.3', '2.1 KB'] },
            { cells: ['dialog-default', 'beta', '0.9.0', '3.5 KB'] },
          ]}
        />
        <div style={{ marginTop: spacing.md }}>
          <Table variant="interactive"
            headers={[
              { label: 'File' },
              { label: 'Modified' },
              { label: 'Size', numeric: true },
            ]}
            rows={[
              { cells: ['config.yaml', '2026-05-04 14:22', '12 KB'] },
              { cells: ['package.json', '2026-05-03 09:15', '4.2 KB'] },
              { cells: ['README.md', '2026-05-02 18:30', '8.1 KB'] },
            ]}
          />
        </div>
      </div>

      {/* Tabs */}
      <div style={sectionStyle}>
        <div style={sectionTitle}>Tabs</div>
        <TabStrip tabs={[
          { id: 'files', label: 'Files', content: 'File explorer: 12,847 files indexed.' },
          { id: 'search', label: 'Search', content: 'Search: Type to find across all files.' },
          { id: 'terminal', label: 'Terminal', content: 'Terminal: $ opencode serve — running on :3000' },
        ]} />
        <div style={{ marginTop: spacing.md }}>
          <TabPills pills={[
            { id: 'all', label: 'All', content: 'Showing all 12,847 files.' },
            { id: 'ts', label: 'TypeScript', content: 'Found 8,421 TypeScript files.' },
            { id: 'js', label: 'JavaScript', content: 'Found 1,203 JavaScript files.' },
          ]} />
        </div>
      </div>

      {/* Toggles */}
      <div style={sectionStyle}>
        <div style={sectionTitle}>Toggles</div>
        <ToggleAscii label="Enable indexing" description="Search through your codebase faster" statusMessage="[i] Indexing is enabled." statusType="info" defaultActive />
        <ToggleSwitch label="Dark mode" description="Switch to dark theme" statusMessage="[i] Dark mode is off." />
      </div>

      {/* Tooltip */}
      <div style={sectionStyle}>
        <div style={sectionTitle}>Tooltip</div>
        <Tooltip label="Save current changes">[⌕] Save</Tooltip>
      </div>
    </div>
  );
}

function DialogDemo() {
  const [open, setOpen] = React.useState(false);
  const [result, setResult] = React.useState('');

  return (
    <div>
      <button style={{
        fontFamily: font, fontSize: '14px', padding: '8px 16px', borderRadius: radius.sm,
        cursor: 'pointer', border: `1px solid ${colors.hairlineStrong}`, background: colors.canvas, color: colors.body,
      }} onClick={() => setOpen(true)}>Open Dialog</button>
      <div style={{ marginTop: spacing.sm, color: result ? colors.ink : colors.mute, fontSize: '14px', padding: spacing.md, background: colors.surfaceSoft, borderRadius: radius.sm }}>
        {result || 'Click to open a dialog.'}
      </div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Save Changes"
        footer={[
          { label: 'Discard', onClick: () => { setResult('Changes discarded.'); setOpen(false); } },
          { label: 'Save', variant: 'primary', onClick: () => { setResult('Changes saved successfully.'); setOpen(false); } },
        ]}
      >
        You have unsaved changes. Would you like to save them before closing?
      </Dialog>
    </div>
  );
}
