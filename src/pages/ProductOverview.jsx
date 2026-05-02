import { createTheme, ThemeProvider } from '@mui/material/styles'
import { DataGrid } from '@mui/x-data-grid'
import Alert from '@mui/material/Alert'
import TechLabel from '../components/TechLabel'

const COLORS = {
  mui: '#007FFF',
  ag: '#2ecc71',
  bryntum: '#e67e22',
  inhouse: '#ec4899',
}

// ─── Section 1 data: Company Overview (3 cols) ───────────────────────────────

const companyRows = [
  { id: 1,  dimension: 'Founded',
    mui: '2014', ag: '2015', bryntum: '2009' },
  { id: 2,  dimension: 'Headquarters',
    mui: 'Remote (globally distributed)', ag: 'London, UK', bryntum: 'Stockholm, Sweden' },
  { id: 3,  dimension: 'Team size',
    mui: '40+', ag: '60+', bryntum: '11–50' },
  { id: 4,  dimension: 'Funding & Backing',
    mui: 'Bootstrapped, open-core model funded by MUI X commercial revenue + open-source sponsors',
    ag: 'Bootstrapped, self-funded and profitable',
    bryntum: 'PE-backed, Adelis Equity Partners became majority shareholder in June 2025' },
  { id: 5,  dimension: 'Revenue (last known)',
    mui: 'Not publicly disclosed', ag: '£16M+ (last public figure, 2022)', bryntum: 'Not publicly disclosed' },
  { id: 6,  dimension: 'Strategic Angle',
    mui: 'React UI platform, advanced components integrated into a unified ecosystem',
    ag: 'Data grid specialist, expanding into charts and embedded analytics',
    bryntum: 'Scheduling & planning specialist, expanding via PE-backed growth strategy' },
  { id: 7,  dimension: 'Full Component Suite',
    mui: 'Data Grid · Charts · Date & Time Pickers · Tree View',
    ag: 'AG Grid · AG Charts · AG Studio (embedded analytics dashboard)',
    bryntum: 'Grid · Scheduler · Gantt · Calendar · Task Board' },
  { id: 8,  dimension: 'Framework Support',
    mui: 'React only',
    ag: 'React · Angular · Vue · Vanilla JS',
    bryntum: 'React · Angular · Vue · Vanilla JS' },
  { id: 9,  dimension: 'OSS Model',
    mui: 'Open-core, MIT Core (Material UI) + paid MUI X',
    ag: 'Open-core, MIT Community + paid Enterprise',
    bryntum: '100% proprietary, no free tier' },
  { id: 10, dimension: 'Pricing (entry point)',
    mono: true,
    mui: 'Free community tier / Pro $299/dev/year',
    ag: 'Free community tier / Enterprise $999/dev (perpetual)',
    bryntum: 'From $680/dev (small team, 3+ devs), no free tier' },
  { id: 11, dimension: 'Commercial/SaaS Use',
    mui: '✅ Included in all paid plans',
    ag: '✅ Included in Enterprise license',
    bryntum: '⚠️ Requires separate OEM license for SaaS/commercial products' },
  { id: 12, dimension: 'Notable Customers',
    mui: 'Tesla · Apple · Southwest Airlines · Siemens · Volvo · Deloitte',
    ag: 'J.P. Morgan · MongoDB · NASA',
    bryntum: 'Ferrari · Red Bull · HSBC · IMAX · United Nations · Apple · Samsung (5,000+ customers, 80+ countries)' },
  { id: 13, dimension: '2025 Market Signal',
    mui: 'v9 launch, Material UI + MUI X unified release',
    ag: 'Strategic partnership with Bryntum, backed by Adelis Equity, forming a combined group',
    bryntum: 'PE acquisition by Adelis Equity (June 2025) + strategic partnership with AG Grid (November 2025)' },
]

// ─── Section 2 data: Data Grid Head to Head (4 cols) ─────────────────────────

const gridRows = [
  { id: 1, dimension: 'Strategic Angle',
    mui: 'Integrated grid within a broader UI platform',
    ag: 'Best-in-class data grid',
    bryntum: 'High-performance data grid',
    inhouse: 'Full control, full ownership' },
  { id: 2, dimension: 'Target Personas',
    mui: 'Frontend devs → Tech Lead (MUI ecosystem teams)',
    ag: 'Frontend devs → Engineering Manager (data-heavy apps)',
    bryntum: 'Frontend devs → Engineering Manager (feature-rich data apps)',
    inhouse: 'Tech Lead → Engineering Manager' },
  { id: 3, dimension: 'Ideal Use Cases',
    mui: 'Dashboards, SaaS B2B, CRUD apps, data tables in MUI ecosystems',
    ag: 'Trading platforms, analytics, massive datasets, pivot tables',
    bryntum: 'Data-heavy enterprise apps needing advanced grid interactions',
    inhouse: 'When the grid UX is the core product differentiator' },
  { id: 4, dimension: 'Wins when',
    mui: 'Existing MUI stack, multi-team standardization, TCO matters',
    ag: 'Raw performance needed, pivoting, 100k+ rows client-side',
    bryntum: 'Advanced grid interactions needed beyond standard sorting/filtering',
    inhouse: 'Truly unique grid UX, no market alternative covers the need' },
  { id: 5, dimension: 'Loses when',
    mui: 'Massive datasets, most advanced grid-specific features needed',
    ag: 'Design system coherence matters, platform approach preferred',
    bryntum: 'Use case is standard (CRUD/dashboard), overkill and more expensive',
    inhouse: 'Real cost underestimated, time-to-market missed' },
  { id: 6, dimension: 'OSS (grid tier)',
    mui: '✅ Community tier MIT (free)',
    ag: '✅ Community tier MIT (free)',
    bryntum: '❌ No free tier',
    inhouse: '✅ You own everything' },
  { id: 7, dimension: 'Pricing (grid entry)',
    mono: true,
    mui: 'Free community / Pro $299/dev/year',
    ag: 'Free community / Enterprise $999/dev',
    bryntum: 'From $680/dev (3+ devs)',
    inhouse: '$0 license — hidden: dev time' },
  { id: 8, dimension: 'Commercial/SaaS use',
    mui: '✅ Included in all paid plans',
    ag: '✅ Included in Enterprise',
    bryntum: '⚠️ OEM license required for SaaS',
    inhouse: '✅ No restriction' },
  { id: 9, dimension: 'Notable Customers',
    mui: 'Tesla · Apple · Southwest · Siemens · Volvo · Deloitte',
    ag: 'J.P. Morgan · MongoDB · NASA',
    bryntum: 'Ferrari · Red Bull · HSBC · IMAX',
    inhouse: 'N/A' },
]

// ─── Cell helpers ─────────────────────────────────────────────────────────────

function cellColor(value) {
  if (value?.startsWith('❌')) return '#dc2626'
  if (value?.startsWith('⚠️')) return '#d97706'
  return '#374151'
}

function makeDimensionCol(width = 165) {
  return {
    field: 'dimension',
    headerName: 'Dimension',
    width,
    sortable: false,
    filterable: false,
    renderCell: ({ value }) => (
      <span style={{
        fontSize: '11px', fontWeight: '600', color: '#9ca3af',
        textTransform: 'uppercase', letterSpacing: '0.06em',
      }}>
        {value}
      </span>
    ),
  }
}

function makeProductColumn(field, label, color) {
  return {
    field,
    headerName: label,
    flex: 1,
    minWidth: 200,
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

const companyColumns = [
  makeDimensionCol(175),
  makeProductColumn('mui',     'MUI',     COLORS.mui),
  makeProductColumn('ag',      'AG Grid', COLORS.ag),
  makeProductColumn('bryntum', 'Bryntum', COLORS.bryntum),
]

const gridColumns = [
  makeDimensionCol(160),
  makeProductColumn('mui',     'MUI X',          COLORS.mui),
  makeProductColumn('ag',      'AG Grid',         COLORS.ag),
  makeProductColumn('bryntum', 'Bryntum',         COLORS.bryntum),
  makeProductColumn('inhouse', 'Build in-house',  COLORS.inhouse),
]

// ─── Theme ────────────────────────────────────────────────────────────────────

const lightTheme = createTheme({
  palette: { mode: 'light', primary: { main: '#007FFF' } },
  typography: { fontFamily: "'DM Sans', sans-serif" },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: 'none',
          fontFamily: "'DM Sans', sans-serif",
          '& .MuiDataGrid-columnHeaders': { background: '#f8fafc', borderColor: '#e5e7eb' },
          '& .MuiDataGrid-columnHeader': { background: '#f8fafc' },
          '& .MuiDataGrid-columnHeaderTitle': { color: '#6b7280' },
          '& .MuiDataGrid-cell': { borderColor: '#f0f0f0', alignItems: 'flex-start', paddingTop: '12px', paddingBottom: '12px' },
          '& .MuiDataGrid-row': { background: '#ffffff' },
          '& .MuiDataGrid-row:nth-of-type(even)': { background: '#f9fafb' },
          '& .MuiDataGrid-row:hover': { background: '#f3f4f6' },
          '& .MuiDataGrid-footerContainer': { display: 'none' },
          '& .MuiDataGrid-virtualScroller': { background: '#ffffff' },
          '& .MuiDataGrid-filler': { background: '#ffffff' },
          '& .MuiDataGrid-scrollbarFiller': { background: '#ffffff' },
          '& .MuiDataGrid-columnSeparator': { color: '#e5e7eb' },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: { fontFamily: "'DM Sans', sans-serif", fontSize: '13px', lineHeight: '1.65', borderRadius: '8px' },
      },
    },
  },
})

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProductOverview() {
  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 24px 60px' }}>

      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: '600', color: '#111827', marginBottom: '8px', letterSpacing: '-0.02em' }}>
          Company & Data Grid Component Suite Comparison
        </h1>
        <p style={{ fontSize: '14px', color: '#6b7280' }}>
          How the main Enterprise React UI component vendors stack up, and when each one wins.
        </p>
      </div>

      <ThemeProvider theme={lightTheme}>

        {/* ── Section 1: Company Overview ─────────────────────────────────── */}
        <div style={{ marginBottom: '12px' }}>
          <h2 style={{ fontSize: '17px', fontWeight: '600', color: '#111827', marginBottom: '4px', letterSpacing: '-0.02em' }}>
            Company Overview
          </h2>
          <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '16px' }}>
            Who they are, what they build, and how they're funded.
          </p>

          <div>
            <div style={{
              background: '#ffffff', border: '1px solid #e5e7eb',
              borderRadius: '10px', overflow: 'hidden', marginBottom: '8px',
            }}>
              <DataGrid
                rows={companyRows}
                columns={companyColumns}
                hideFooter
                disableColumnMenu
                disableRowSelectionOnClick
                getRowHeight={() => 'auto'}
                style={{ minHeight: 400 }}
              />
            </div>
            <TechLabel tags={['MUI X — DataGrid', '@mui/material — ThemeProvider', 'Inline styles']} />
          </div>

          <Alert
            severity="warning"
            sx={{ mt: 2, '& .MuiAlert-message': { fontSize: '13px', lineHeight: '1.7' } }}
          >
            <strong>Market signal:</strong>{' '}
            AG Grid and Bryntum announced a <strong>strategic partnership in November 2025</strong>, backed by Adelis Equity Partners. The two companies now operate as a <strong>combined group</strong> with aligned roadmaps and shared board leadership. This consolidation positions them to cover both data grids and scheduling, a broader suite that competes more directly with MUI X's component range.
          </Alert>
        </div>
        <div style={{ marginBottom: '30px' }} />

        {/* ── Section 2: Data Grid Head to Head ───────────────────────────── */}
        <div>
          <p style={{ fontSize: '15px', color: '#6b7280', marginBottom: '30px', fontStyle: 'italic' }}>
            Most evaluations start with a specific component, typically the Data Grid, before expanding to broader needs.
          </p>
          <h2 style={{ fontSize: '17px', fontWeight: '600', color: '#111827', marginBottom: '4px', letterSpacing: '-0.02em' }}>
            Data Grid Comparison
          </h2>
          <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '16px' }}>
            Focused comparison of the Data Grid component specifically. Each vendor offers additional components beyond what is compared here.
          </p>

          <div>
            <div style={{
              background: '#ffffff', border: '1px solid #e5e7eb',
              borderRadius: '10px', overflow: 'hidden', marginBottom: '8px',
            }}>
              <DataGrid
                rows={gridRows}
                columns={gridColumns}
                hideFooter
                disableColumnMenu
                disableRowSelectionOnClick
                getRowHeight={() => 'auto'}
                style={{ minHeight: 400 }}
              />
            </div>
            <TechLabel tags={['MUI X — DataGrid', '@mui/material — ThemeProvider', 'Inline styles']} />
          </div>

          <div style={{ marginTop: '20px' }}>
            <div style={{
              background: '#eff6ff',
              border: '1px solid #bfdbfe',
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
                <p style={{ fontSize: '14px', color: '#1e40af', lineHeight: '1.65' }}>
                  In most Enterprise evaluations, the real question isn't which grid has more features, it's{' '}
                  <strong style={{ color: '#1e3a8a' }}>which solution fits best into the team's existing stack and workflow</strong>.
                  {' '}That's where MUI X has a{' '}
                  <em>structural advantage</em> for teams already building on Material UI.
                </p>
              </div>
            </div>
          </div>
        </div>

      </ThemeProvider>
    </div>
  )
}
