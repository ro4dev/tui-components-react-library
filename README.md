# TUI Components React

A library of terminal/CLI-themed UI components built with React and inline styles.

## Features

- **Dark/Light mode** — toggleable theme with `localStorage` persistence
- **23 components** — Accordion through Tooltip
- **Inline styles** — zero external CSS dependencies per component
- **CSS custom properties** — theming via `var(--token)` references

## Components

| Category | Components |
|----------|-----------|
| Layout | Container, HorizontalDivider, VerticalDivider |
| Navigation | SidebarNav, Breadcrumb, Pagination |
| Feedback | Alert, ToastContainer, Skeleton, Spinner, ProgressBar, ProgressSteps |
| Display | Accordion, CardFlat, CardHeader, CardDark, CardStats, Table, Tabs |
| Form | SearchInput, Select, RadioGroup, Dropzone, Toggle |
| Data | ListItem, DefinitionList, Tag, EmptyState |
| Media | ImageBlock, VideoEmbed, Blockquote |
| Misc | Avatar, UserPill, StatusBadge, LabelBadge, CounterBadge, CodeBlock, InlineCode, CopyButton, Dialog, Panel, Kbd, Tooltip |

## Usage

```bash
npm install
npm run dev
```

## Theming

Add `data-theme="dark"` to `<html>` to enable dark mode:

```js
document.documentElement.setAttribute('data-theme', 'dark');
```

Design tokens are defined in `src/styles/tokens.css` and imported via `src/theme.js`:

```jsx
import { colors, spacing } from './index';
// colors.ink → 'var(--ink)' — resolves to current theme
```
