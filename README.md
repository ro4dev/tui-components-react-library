# TUI Components React

A library of 23 terminal/CLI-themed UI components built with React and inline styles.

## Components

| Category | Components |
|----------|-----------|
| Layout | Container, DividerHorizontal, DividerVertical, Spacer |
| Navigation | SidebarNav, Breadcrumb, Pagination, DropdownMenu, ContextMenu |
| Feedback | Alert, ToastContainer, SkeletonCard, Spinner, ProgressBarControls, ProgressSteps |
| Display | Accordion, CardFlat, CardHeader, CardDark, CardStats, Table, TabStrip, TabPills |
| Form | SearchInput, Select, RadioGroup, FileUpload, ToggleAscii, ToggleSwitch |
| Data | BulletList, NumberedList, DefinitionList, TagGroup, EmptyState |
| Media | ImageBlock, VideoEmbed, Blockquote |
| Misc | AvatarCircle, UserPill, StatusBadge, LabelBadge, CounterBadge, InteractiveCounter, CodeBlock, InlineCode, CopyButton, Dialog, Panel, SplitPanel, ScrollArea, Kbd, CommandPalette, Tooltip |

## Usage

```bash
npm install
npm run dev
```

All components use inline styles and import design tokens from the theme:

```jsx
import { Button, colors, spacing } from 'tui-components-react';
```

## Theme

Design tokens are defined in `src/theme.js` and include colors, spacing, radius, and font family.
