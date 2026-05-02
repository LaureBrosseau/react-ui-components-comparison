import { useMemo } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import TechLabel from '../components/TechLabel'

const COLORS = {
  mui: '#007FFF',
  ag: '#2ecc71',
  bryntum: '#e67e22',
  inhouse: '#ec4899',
}

const rows = [
  {
    id: 1,
    dimension: 'Tagline',
    mono: true,
    mui: '"Performant advanced components for complex use cases"',
    ag: '"The best JavaScript Data Grid in the world"',
    bryntum: '"The Fastest JavaScript Data Grid"',
    inhouse: '"Full control, full responsibility"',
  },
  {
    id: 2,
    dimension: 'Strategic Angle',
    mui: 'UI Platform',
    ag: 'Best-in-class grid',
    bryntum: 'High-performance data grid',
    inhouse: 'Custom-built, fully owned',
  },
  {
    id: 3,
    dimension: 'Open Source',
    mui: '✅ Core MIT (open-core)',
    ag: '✅ Community MIT (Enterprise paid)',
    bryntum: '❌ 100% proprietary',
    inhouse: '✅ You own the code',
  },
  {
    id: 4,
    dimension: 'Pricing',
    mono: true,
    mui: 'Free / Pro $299/dev/yr / Premium $599 / Enterprise $1,399 (15 seats min)',
    ag: 'Free Community / Enterprise $999/dev (perpetual) / Bundle $1,498/dev',
    bryntum: 'No free tier / Small team $680/dev / Large team $600/dev / SaaS: contact',
    inhouse: '$0 license but dev time + maintenance costs',
  },
  {
    id: 5,
    dimension: 'License for commercial use',
    mui: '✅ Included in all plans',
    ag: '✅ Included in Enterprise',
    bryntum: '⚠️ Separate OEM license required',
    inhouse: '✅ No restriction',
  },
  {
    id: 6,
    dimension: 'Target Personas',
    mui: 'Frontend devs → Tech Lead (MUI ecosystem teams)',
    ag: 'Frontend devs → Engineering Manager (data-heavy apps)',
    bryntum: 'Frontend devs → Engineering Manager (feature-rich data apps)',
    inhouse: 'Tech Lead → Engineering Manager',
  },
  {
    id: 7,
    dimension: 'Ideal Use Cases',
    mui: 'Dashboards, SaaS B2B, CRUD apps, data tables in MUI ecosystems',
    ag: 'Trading platforms, analytics, massive datasets, pivot tables',
    bryntum: 'Data-heavy enterprise apps needing advanced grid interactions',
    inhouse: 'When the grid UX is the core product differentiator',
  },
  {
    id: 8,
    dimension: 'Wins when',
    mui: 'Existing MUI stack, multi-team standardization, TCO matters',
    ag: 'Raw performance needed, pivoting, 100k+ rows client-side',
    bryntum: 'Advanced grid interactions needed beyond standard sorting/filtering',
    inhouse: 'Truly unique grid UX, no market alternative covers the need',
  },
  {
    id: 9,
    dimension: 'Loses when',
    mui: 'Massive datasets, most advanced grid-specific features needed',
    ag: 'Design system coherence matters, platform approach preferred',
    bryntum: 'Use case is standard (CRUD/dashboard) — overkill and more expensive',
    inhouse: 'Real cost underestimated, time-to-market missed',
  },
  {
    id: 10,
    dimension: 'Notable Customers',
    mui: 'Tesla, Apple, Southwest Airlines, Siemens, Volvo, Deloitte',
    ag: 'J.P. Morgan, MongoDB, NASA',
    bryntum: 'Ferrari, Red Bull, HSBC, IMAX (5,000+ customers, 80+ countries)',
    inhouse: 'N/A',
  },
]

function cellColor(value) {
  if (value?.startsWith('❌')) return '#ef4444'
  if (value?.startsWith('⚠️')) return '#f59e0b'
  return '#d1d5db'
}

function makeProductColumn(field, label, color) {
  return {
    field,
    headerName: label,
    flex: 1,
    minWidth: 220,
    sortable: false,
    filterable: false,
    renderHeader: () => (
      <span style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: color, display: 'inline-block', flexShrink: 0 }} />
        <span style={{ fontWeight: '700', color, fontSize: '13px', letterSpacing: '-0.01em' }}>{label}</span>
      </span>
    ),
    renderCell: ({ row, value }) => (
      <span style={{
        fontSize: row.mono ? '11px' : '13px',
        fontFamily: row.mono ? "'JetBrains Mono', monospace" : "'DM Sans', sans-serif",
        color: cellColor(value),
        lineHeight: '1.5',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
      }}>
        {value}
      </span>
    ),
  }
}

const columns = [
  {
    field: 'dimension',
    headerName: 'Dimension',
    width: 160,
    sortable: false,
    filterable: false,
    renderCell: ({ value }) => (
      <span style={{
        fontSize: '11px',
        fontWeight: '600',
        color: '#9ca3af',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
      }}>
        {value}
      </span>
    ),
  },
  makeProductColumn('mui',     'MUI X',          COLORS.mui),
  makeProductColumn('ag',      'AG Grid',         COLORS.ag),
  makeProductColumn('bryntum', 'Bryntum',         COLORS.bryntum),
  makeProductColumn('inhouse', 'Build in-house',  COLORS.inhouse),
]

const darkTheme = createTheme({
  palette: { mode: 'dark', primary: { main: '#007FFF' } },
  typography: { fontFamily: "'DM Sans', sans-serif" },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: 'none',
          fontFamily: "'DM Sans', sans-serif",
          '& .MuiDataGrid-columnHeaders': { background: '#0d0d0d', borderColor: '#1f1f1f' },
          '& .MuiDataGrid-columnHeader': { background: '#0d0d0d' },
          '& .MuiDataGrid-cell': { borderColor: '#1a1a1a', alignItems: 'flex-start', paddingTop: '12px', paddingBottom: '12px' },
          '& .MuiDataGrid-row': { background: '#111111' },
          '& .MuiDataGrid-row:nth-of-type(even)': { background: '#0f0f0f' },
          '& .MuiDataGrid-row:hover': { background: '#161616' },
          '& .MuiDataGrid-footerContainer': { display: 'none' },
          '& .MuiDataGrid-virtualScroller': { background: '#111111' },
          '& .MuiDataGrid-filler': { background: '#111111' },
          '& .MuiDataGrid-scrollbarFiller': { background: '#111111' },
          '& .MuiDataGrid-columnSeparator': { color: '#2a2a2a' },
        },
      },
    },
  },
})

export default function ProductOverview() {
  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 24px 60px' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: '600', color: '#f5f5f5', marginBottom: '8px', letterSpacing: '-0.02em' }}>
          Data Grid Comparison
        </h1>
        <p style={{ fontSize: '14px', color: '#6b7280' }}>
          MUI X, AG Grid, Bryntum, and the build in-house alternative compared, across 10 dimensions
        </p>
      </div>

      <div>
        <ThemeProvider theme={darkTheme}>
          <div style={{
            background: '#111111',
            border: '1px solid #1f1f1f',
            borderRadius: '10px',
            overflow: 'hidden',
            marginBottom: '8px',
          }}>
            <DataGrid
              rows={rows}
              columns={columns}
              hideFooter
              disableColumnMenu
              disableRowSelectionOnClick
              getRowHeight={() => 'auto'}
              style={{ minHeight: 600 }}
            />
          </div>
        </ThemeProvider>
        <TechLabel tags={['MUI X — DataGrid', '@mui/material — ThemeProvider', 'Inline styles']} />
      </div>

      <div style={{ marginTop: '24px' }}>
        <div style={{
          background: '#131820',
          border: '1px solid #1e2a3a',
          borderLeft: '4px solid #007FFF',
          borderRadius: '8px',
          padding: '18px 22px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
        }}>
          <span style={{ fontSize: '16px', marginTop: '1px' }}>💡</span>
          <div>
            <span style={{ fontSize: '11px', fontWeight: '700', color: '#007FFF', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '6px' }}>
              PMM Insight
            </span>
            <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '1.65' }}>
              In most Enterprise evaluations, the real question isn't which grid has more features, it's <strong style={{ color: '#f5f5f5' }}>which solution fits best into the team's existing stack and workflow</strong>. That's where MUI X has a {' '}
              <em style={{ color: '#93c5fd' }}>structural advantage</em>  for teams already building on Material UI.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
