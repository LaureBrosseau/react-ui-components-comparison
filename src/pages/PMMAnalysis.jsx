import { useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Chip from '@mui/material/Chip'
import Alert from '@mui/material/Alert'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import { DataGrid } from '@mui/x-data-grid'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import TechLabel from '../components/TechLabel'

// ─── Theme ────────────────────────────────────────────────────────────────────

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#007FFF' },
    error:   { main: '#ef4444' },
    warning: { main: '#f59e0b' },
    success: { main: '#2ecc71' },
    info:    { main: '#60a5fa' },
    background: { default: '#0a0a0a', paper: '#111111' },
  },
  typography: { fontFamily: "'DM Sans', sans-serif" },
  components: {
    MuiTabs: {
      styleOverrides: {
        root: {
          background: '#111111',
          borderBottom: '1px solid #1f1f1f',
          minHeight: '44px',
        },
        indicator: { background: '#007FFF', height: '2px' },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: '#6b7280',
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: '500',
          fontSize: '13px',
          textTransform: 'none',
          minHeight: '44px',
          padding: '0 20px',
          '&.Mui-selected': { color: '#f5f5f5', fontWeight: '600' },
          '&:hover': { color: '#d1d5db' },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          background: '#111111',
          border: '1px solid #1f1f1f',
          borderRadius: '8px !important',
          marginBottom: '8px',
          boxShadow: 'none',
          '&::before': { display: 'none' },
          '&.Mui-expanded': {
            borderLeft: '3px solid #007FFF',
            marginBottom: '8px',
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          padding: '0 20px',
          minHeight: '52px',
          '&.Mui-expanded': { minHeight: '52px' },
        },
        content: {
          margin: '14px 0',
          '&.Mui-expanded': { margin: '14px 0' },
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: '16px 20px 20px',
          borderTop: '1px solid #1f1f1f',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '13px',
          lineHeight: '1.65',
          borderRadius: '8px',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '11px',
          fontWeight: '600',
          height: '22px',
          letterSpacing: '0.02em',
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: 'none',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '13px',
          color: '#d1d5db',
          '& .MuiDataGrid-cell': { borderColor: '#1a1a1a', alignItems: 'flex-start', paddingTop: '12px', paddingBottom: '12px' },
          '& .MuiDataGrid-columnHeaders': { background: '#1e293b', borderColor: '#1f1f1f' },
          '& .MuiDataGrid-columnHeader': { background: '#1e293b' },
          '& .MuiDataGrid-columnSeparator': { color: '#2a3a50' },
          '& .MuiDataGrid-row': { background: '#111111' },
          '& .MuiDataGrid-row:nth-of-type(even)': { background: '#161616' },
          '& .MuiDataGrid-row:hover': { background: '#1a1a1a' },
          '& .MuiDataGrid-footerContainer': { display: 'none' },
          '& .MuiDataGrid-virtualScroller': { background: '#111111' },
          '& .MuiDataGrid-filler': { background: '#111111' },
          '& .MuiDataGrid-scrollbarFiller': { background: '#111111' },
        },
      },
    },
  },
})

// ─── Tab 1 data ───────────────────────────────────────────────────────────────

const COLORS = { mui: '#007FFF', ag: '#2ecc71', bryntum: '#e67e22', inhouse: '#ec4899' }

const strategyRows = [
  { id: 1,  dimension: 'Category Strategy',  mui: 'Broad UI platform (horizontal)',          ag: 'Category king — data grids',              bryntum: 'Niche specialist — scheduling',       inhouse: 'No category — full bespoke' },
  { id: 2,  dimension: 'Product Scope',       mui: 'Wide, moderate depth',                   ag: 'Narrow, extreme depth',                   bryntum: 'Medium scope, deep niche',            inhouse: 'Unlimited scope, zero speed' },
  { id: 3,  dimension: 'Buyer Perception',    mui: 'Default choice for React UI',            ag: 'Serious enterprise grid',                 bryntum: 'Advanced niche tools',                inhouse: '"We\'re different, our needs are unique"' },
  { id: 4,  dimension: 'Business Model',      mui: 'Open-core (land → expand)',              ag: 'Premium enterprise licensing',            bryntum: 'High-ticket specialized components',  inhouse: '$0 license, hidden FTE cost' },
  { id: 5,  dimension: 'OSS Strategy',        mui: 'Free Core + paid MUI X',                ag: 'Free Community + paid Enterprise',        bryntum: '100% proprietary, no free tier',      inhouse: 'You own everything — and maintain everything' },
  { id: 6,  dimension: 'Primary Strength',    mui: 'Developer mindshare + ecosystem',       ag: 'Feature depth + performance',             bryntum: 'Hard-to-replicate niche features',    inhouse: 'Full control, no vendor dependency' },
  { id: 7,  dimension: 'Primary Weakness',    mui: 'Positioning dilution (library vs platform)', ag: 'Narrow scope, expensive entry',       bryntum: 'Brand awareness + OEM complexity',    inhouse: 'Underestimates true cost — always' },
  { id: 8,  dimension: 'Key Proof Points',    mui: '5.8M weekly npm downloads, 93.9k GitHub stars', ag: 'Category leadership in finance/trading', bryntum: '5,000+ customers, 80+ countries', inhouse: '6–12 weeks to replicate basic grid features' },
  { id: 9,  dimension: 'Notable Customers',   mui: 'Spotify, Amazon, NASA, Netflix, Unity', ag: 'Financial services, trading platforms',   bryntum: 'Ferrari, Red Bull, HSBC, IMAX',       inhouse: 'Every team that regretted it later' },
  { id: 10, dimension: '2025 Market Signal',  mui: 'v9 launch — Material UI + MUI X unified', ag: 'Partnership announced with Bryntum',   bryntum: 'Partnership announced with AG Grid',  inhouse: 'AI-assisted dev makes this more tempting — and more risky' },
]

function makeCol(field, label, color) {
  return {
    field,
    headerName: label,
    flex: 1,
    minWidth: 190,
    sortable: false,
    filterable: false,
    renderHeader: () => (
      <span style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
        <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: color, display: 'inline-block', flexShrink: 0 }} />
        <span style={{ fontWeight: '700', color, fontSize: '12px', letterSpacing: '-0.01em' }}>{label}</span>
      </span>
    ),
    renderCell: ({ value }) => (
      <span style={{ fontSize: '12.5px', color: '#d1d5db', lineHeight: '1.55', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
        {value}
      </span>
    ),
  }
}

const strategyColumns = [
  {
    field: 'dimension',
    headerName: 'Dimension',
    width: 185,
    sortable: false,
    filterable: false,
    renderCell: ({ value }) => (
      <span style={{ fontSize: '11px', fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {value}
      </span>
    ),
  },
  makeCol('mui',     'MUI X',         COLORS.mui),
  makeCol('ag',      'AG Grid',       COLORS.ag),
  makeCol('bryntum', 'Bryntum',       COLORS.bryntum),
  makeCol('inhouse', 'Build in-house', COLORS.inhouse),
]

// ─── Tab 2 data ───────────────────────────────────────────────────────────────

const accordions = [
  {
    id: 'gap1',
    type: 'gap',
    title: 'Gap #1 — No sharp category definition',
    summary: 'MUI oscillates between library, design system, and platform',
    chip: { label: 'High Priority', color: 'error' },
    body: `MUI's positioning today sits uncomfortably between three different categories:

• UI component library (what most developers think it is)
• Design system platform (what it's evolving toward)
• Enterprise UI infrastructure (what MUI X could become)

This ambiguity is manageable when you're the default choice for developers. It becomes a liability when you're trying to close Enterprise deals against specialists like AG Grid who have razor-sharp positioning.`,
  },
  {
    id: 'gap2',
    type: 'gap',
    title: 'Gap #2 — Enterprise narrative underdeveloped',
    summary: 'MUI X is undersold to CTOs and VPs',
    chip: { label: 'High Priority', color: 'error' },
    body: `MUI's messaging is dev-first, which makes sense for adoption — but it creates a gap at the enterprise buying stage. When a CTO evaluates MUI X against AG Grid, they need to hear about SLAs, support tiers, security, governance, and TCO. These narratives exist in the product but not in the marketing.

AG Grid's positioning is explicitly enterprise-grade. MUI X has the substance — it's missing the story.`,
  },
  {
    id: 'gap3',
    type: 'gap',
    title: 'Gap #3 — Data Grid perceived as "good enough"',
    summary: 'Not winning on grid depth vs. specialists',
    chip: { label: 'Medium Priority', color: 'warning' },
    body: `MUI X Data Grid is production-ready and capable for most use cases. But the market perception — especially in data-heavy industries like finance and analytics — is that AG Grid is the "serious" choice and MUI X is "good enough."

This perception gap is hard to close by adding features alone. It requires a deliberate repositioning: MUI X doesn't need to win on grid depth — it needs to win on integration value and total platform coherence.`,
  },
  {
    id: 'opp1',
    type: 'opportunity',
    title: 'Opportunity #1 — Own "React UI Platform"',
    summary: 'Define a category MUI can win outright',
    chip: { label: 'Strategic', color: 'success' },
    body: `Instead of competing with AG Grid on feature depth (a losing battle) or with design system tools on design governance (a crowded space), MUI can define and own a new category:

"The end-to-end UI platform for React product teams"

This positions MUI not as a component library that also has a grid — but as the system that helps product teams design, build, and scale consistent interfaces across their entire product lifecycle. It shifts the conversation from "which grid is best?" to "which platform do we build on?"`,
  },
  {
    id: 'opp2',
    type: 'opportunity',
    title: 'Opportunity #2 — Reframe MUI X for Enterprise',
    summary: 'Position MUI X as Enterprise UI infrastructure',
    chip: { label: 'Strategic', color: 'success' },
    body: `Current framing: "Advanced components for complex use cases"
Proposed framing: "Enterprise UI infrastructure for React apps"

This reframe does three things:
• Elevates the conversation from components to infrastructure (infrastructure = budget, not discretionary spend)
• Signals Enterprise-grade intent to CTOs and VPs
• Creates distance from the "just a library" perception

The product already supports this narrative. The marketing doesn't yet.`,
  },
  {
    id: 'opp3',
    type: 'opportunity',
    title: 'Opportunity #3 — The Design+Dev convergence play',
    summary: 'Bridge designers and developers — no one owns this yet',
    chip: { label: 'Untapped', color: 'info' },
    body: `MUI offers Design Kits for Figma alongside its component library — a natural bridge between design and development. No competitor in this space owns this narrative convincingly.

AG Grid has no design story.
Bryntum has no design story.

MUI has the assets to position itself as the tool that eliminates the designer-developer gap in product teams. This is a messaging opportunity that hasn't been activated.`,
  },
]

// ─── Subcomponents ────────────────────────────────────────────────────────────

function ExpandIcon() {
  return <span style={{ color: '#6b7280', fontSize: '16px', lineHeight: 1 }}>▾</span>
}

function GapBadge({ type }) {
  return (
    <span style={{
      fontSize: '10px', fontWeight: '700', textTransform: 'uppercase',
      letterSpacing: '0.08em', padding: '2px 7px', borderRadius: '4px',
      background: type === 'gap' ? 'rgba(239,68,68,0.1)' : 'rgba(46,204,113,0.1)',
      color: type === 'gap' ? '#f87171' : '#4ade80',
      border: `1px solid ${type === 'gap' ? 'rgba(239,68,68,0.25)' : 'rgba(46,204,113,0.25)'}`,
      flexShrink: 0,
    }}>
      {type === 'gap' ? 'Gap' : 'Opportunity'}
    </span>
  )
}

// ─── Tab panels ───────────────────────────────────────────────────────────────

function Tab1() {
  return (
    <div style={{ paddingTop: '28px' }}>
      <div>
        <div style={{
          background: '#111111', border: '1px solid #1f1f1f',
          borderRadius: '10px', overflow: 'hidden', marginBottom: '8px',
        }}>
          <DataGrid
            rows={strategyRows}
            columns={strategyColumns}
            hideFooter
            disableColumnMenu
            disableRowSelectionOnClick
            getRowHeight={() => 'auto'}
            autoHeight
          />
        </div>
        <TechLabel tags={['MUI X — DataGrid', '@mui/material — ThemeProvider']} />
      </div>

      <div style={{ marginTop: '20px' }}>
        <Alert
          severity="info"
          sx={{
            background: '#0a1628',
            border: '1px solid #1e3a5f',
            '& .MuiAlert-icon': { color: '#60a5fa' },
            '& .MuiAlert-message': { color: '#cbd5e1', fontSize: '13px', lineHeight: '1.65' },
          }}
        >
          <strong style={{ color: '#93c5fd' }}>AG Grid and Bryntum announced a strategic partnership in 2025</strong> — two competitors choosing to integrate rather than fight. This signals market maturation and puts pressure on MUI to sharpen its differentiation beyond "we do everything."
        </Alert>
        <TechLabel tags={['MUI — Alert']} />
      </div>
    </div>
  )
}

function Tab2() {
  return (
    <div style={{ paddingTop: '28px' }}>
      <div style={{ marginBottom: '20px' }}>
        <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.6' }}>
          Six areas where MUI's current positioning leaves room — assessed by priority.
        </p>
      </div>

      {accordions.map((acc, i) => (
        <Accordion key={acc.id} defaultExpanded={i === 0}>
          <AccordionSummary expandIcon={<ExpandIcon />}>
            <GapBadge type={acc.type} />
            <span style={{ fontSize: '14px', fontWeight: '600', color: '#f5f5f5' }}>
              {acc.title}
            </span>
          </AccordionSummary>
          <AccordionDetails>
            <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '10px', fontStyle: 'italic' }}>
              {acc.summary}
            </p>
            <div style={{ fontSize: '13px', color: '#9ca3af', lineHeight: '1.75', whiteSpace: 'pre-line', marginBottom: '14px' }}>
              {acc.body}
            </div>
            <Chip label={acc.chip.label} color={acc.chip.color} size="small" />
          </AccordionDetails>
        </Accordion>
      ))}

      <div style={{ marginTop: '12px' }}>
        <TechLabel tags={['MUI — Accordion', 'MUI — Chip']} />
      </div>
    </div>
  )
}

function Tab3() {
  return (
    <div style={{ paddingTop: '32px', maxWidth: '780px' }}>
      {/* Opening statement */}
      <p style={{
        fontSize: '22px',
        fontWeight: '700',
        color: '#f5f5f5',
        lineHeight: '1.35',
        letterSpacing: '-0.02em',
        marginBottom: '32px',
        paddingBottom: '24px',
        borderBottom: '1px solid #1f1f1f',
      }}>
        "MUI has built remarkable traction in the React ecosystem, millions of developers, a thriving open-source community, and enterprise adoption across some of the world's leading companies.The positioning opportunity is not about fixing something broken. It's about giving clearer language to what MUI X already is, so the narrative can match the product's real capabilities."
      </p>

      {/* Body paragraphs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '36px' }}>
        {[
          `MUI wins on adoption and breadth, and that foundation is what makes the opportunity real. The opportunity isn't to change who MUI speaks to, but to extend the narrative upward along the buying chain.`
          `Developers are already the champions. What's missing is giving them the language to sell MUI X internally — a story that resonates with the tech lead who recommends, and the Engineering Manager or CTO who approves the budget. That story exists in the product: platform coherence, reduced integration overhead, consistent design system across teams, lower TCO than building in-house or stitching together point solutions.`
          `The positioning opportunity is not a category shift. It's about making the Enterprise value of MUI X as clear and compelling as its developer experience already is.`,
        ].map((text, i) => (
          <p key={i} style={{ fontSize: '15px', color: '#d1d5db', lineHeight: '1.8' }}>
            {text}
          </p>
        ))}
      </div>

      {/* Closing alert */}
      <Alert
        severity="success"
        sx={{
          background: '#091a0f',
          border: '1px solid #1a3a24',
          marginBottom: '12px',
          '& .MuiAlert-icon': { color: '#4ade80' },
          '& .MuiAlert-message': { color: '#bbf7d0', fontSize: '14px', lineHeight: '1.7' },
        }}
      >
        The product is there. The community is there. The opportunity is to make the Enterprise value proposition as clear and compelling as the developer experience already is.{' '}
      </Alert>
      <TechLabel tags={['MUI — Alert']} />

      <p style={{ fontSize: '12px', color: '#4b5563', marginTop: '20px', lineHeight: '1.6', fontStyle: 'italic' }}>
        Analysis based on public positioning, pricing pages, and product documentation as of May 2026.
        Built with MUI X.
      </p>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PMMAnalysis() {
  const [tab, setTab] = useState(0)

  return (
    <ThemeProvider theme={darkTheme}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 24px 80px' }}>

        {/* Header */}
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: '600', color: '#f5f5f5', marginBottom: '8px', letterSpacing: '-0.02em' }}>
            PMM Analysis — My Take on the Market
          </h1>
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '10px' }}>
            A product marketer's read on positioning, gaps, and opportunities in the React enterprise UI space.
          </p>
          <p style={{
            fontSize: '12px', color: '#4b5563', fontStyle: 'italic',
            padding: '8px 14px',
            background: '#0d0d0d',
            border: '1px solid #1f1f1f',
            borderRadius: '6px',
            display: 'inline-block',
          }}>
            This analysis is built with MUI components: Data Grid, Tabs, Accordion, Alert, and Chip.
            The tool reflects the product.
          </p>
        </div>

        {/* Tabs */}
        <div style={{ background: '#111111', border: '1px solid #1f1f1f', borderRadius: '10px', overflow: 'hidden' }}>
          <Tabs value={tab} onChange={(_, v) => setTab(v)}>
            <Tab label="Strategic Comparison" />
            <Tab label="Positioning Gaps & Opportunities" />
            <Tab label="My Take" />
          </Tabs>

          <div style={{ padding: '0 24px 36px' }}>
            {tab === 0 && <Tab1 />}
            {tab === 1 && <Tab2 />}
            {tab === 2 && <Tab3 />}
          </div>
        </div>

        {/* Bottom tech label */}
        <div style={{ marginTop: '8px' }}>
          <TechLabel tags={['MUI — Tabs + Tab', 'MUI — Accordion', 'MUI — Alert', 'MUI — Chip', 'MUI X — DataGrid']} />
        </div>

      </div>
    </ThemeProvider>
  )
}
