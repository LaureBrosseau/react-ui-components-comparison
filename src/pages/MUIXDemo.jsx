import { useMemo, useState, useCallback } from 'react'
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { AgGridReact } from 'ag-grid-react'
import { AllCommunityModule, ModuleRegistry, colorSchemeLight, themeQuartz } from 'ag-grid-community'
import { generateProspects } from '../data/prospectData'
import TechLabel from '../components/TechLabel'

ModuleRegistry.registerModules([AllCommunityModule])

// ─── MUI theme ──────────────────────────────────────────────────────────────

const muiTheme = createTheme({
  palette: { mode: 'light', primary: { main: '#007FFF' } },
  typography: { fontFamily: "'DM Sans', sans-serif" },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: 'none',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '13px',
          color: '#374151',
          '& .MuiDataGrid-cell': { borderColor: '#f0f0f0' },
          '& .MuiDataGrid-columnHeaders': { background: '#f8fafc', borderColor: '#e5e7eb' },
          '& .MuiDataGrid-columnHeader': { background: '#f8fafc' },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: '600', color: '#6b7280', fontSize: '12px',
            textTransform: 'uppercase', letterSpacing: '0.05em',
          },
          '& .MuiDataGrid-row:hover': { background: '#f3f4f6' },
          '& .MuiDataGrid-row.Mui-selected': {
            background: 'rgba(0,127,255,0.06)',
            '&:hover': { background: 'rgba(0,127,255,0.10)' },
          },
          '& .MuiDataGrid-footerContainer': { borderColor: '#e5e7eb', background: '#f9fafb' },
          '& .MuiDataGrid-row:nth-of-type(even)': { background: '#f9fafb', '&:hover': { background: '#f3f4f6' } },
          '& .MuiCheckbox-root': { color: '#d1d5db', '&.Mui-checked': { color: '#007FFF' } },
          '& .MuiDataGrid-columnSeparator': { color: '#e5e7eb' },
          '& .MuiTablePagination-root': { color: '#6b7280', fontFamily: "'DM Sans', sans-serif" },
          '& .MuiDataGrid-virtualScroller': { background: '#ffffff' },
          '& .MuiDataGrid-filler': { background: '#ffffff' },
          '& .MuiDataGrid-scrollbarFiller': { background: '#ffffff' },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "'DM Sans', sans-serif", fontSize: '12px', textTransform: 'none',
          color: '#6b7280', '&:hover': { background: '#f3f4f6', color: '#111827' },
        },
      },
    },
  },
})

// ─── AG Grid theme ───────────────────────────────────────────────────────────

const agTheme = themeQuartz.withPart(colorSchemeLight).withParams({
  backgroundColor: '#ffffff',
  foregroundColor: '#374151',
  borderColor: '#e5e7eb',
  headerBackgroundColor: '#f8fafc',
  headerTextColor: '#6b7280',
  rowHoverColor: '#f3f4f6',
  selectedRowBackgroundColor: 'rgba(0,127,255,0.06)',
  accentColor: '#007FFF',
  fontFamily: "'DM Sans', sans-serif",
  fontSize: 13,
  headerFontSize: 12,
  headerFontWeight: 600,
  cellHorizontalPaddingScale: 1,
  rowBorder: { color: '#f0f0f0', width: 1 },
  columnBorder: false,
  wrapperBorder: false,
  oddRowBackgroundColor: '#f9fafb',
})

// ─── Cell renderers ──────────────────────────────────────────────────────────

const STATUS_STYLES = {
  Customer:      { bg: 'rgba(22,163,74,0.08)',   color: '#15803d', border: 'rgba(22,163,74,0.2)' },
  Evaluating:    { bg: 'rgba(0,127,255,0.08)',   color: '#1d4ed8', border: 'rgba(0,127,255,0.2)' },
  Prospect:      { bg: 'rgba(217,119,6,0.08)',   color: '#b45309', border: 'rgba(217,119,6,0.2)' },
  Churned:       { bg: 'rgba(220,38,38,0.08)',   color: '#b91c1c', border: 'rgba(220,38,38,0.2)' },
  Disqualified:  { bg: 'rgba(107,114,128,0.08)', color: '#6b7280', border: 'rgba(107,114,128,0.2)' },
}

const GRID_STYLES = {
  'MUI X':          { color: '#1d4ed8', border: 'rgba(0,127,255,0.25)',   bg: 'rgba(0,127,255,0.06)' },
  'AG Grid':        { color: '#15803d', border: 'rgba(22,163,74,0.25)',   bg: 'rgba(22,163,74,0.06)' },
  'Custom':         { color: '#6b7280', border: '#e5e7eb',                bg: '#f9fafb' },
  'Bryntum':        { color: '#c2410c', border: 'rgba(234,88,12,0.25)',   bg: 'rgba(234,88,12,0.06)' },
  'Kendo':          { color: '#7c3aed', border: 'rgba(124,58,237,0.25)',  bg: 'rgba(124,58,237,0.06)' },
  'TanStack Table': { color: '#0e7490', border: 'rgba(6,182,212,0.25)',   bg: 'rgba(6,182,212,0.06)' },
  'None yet':       { color: '#9ca3af', border: '#e5e7eb',                bg: 'transparent' },
}

function Badge({ value, styleMap }) {
  const s = styleMap[value] || styleMap['None yet'] || {}
  return (
    <span style={{
      padding: '2px 8px', borderRadius: '99px',
      background: s.bg, color: s.color, border: `1px solid ${s.border}`,
      fontSize: '11px', fontWeight: '600', letterSpacing: '0.03em',
      fontFamily: "'DM Sans', sans-serif", whiteSpace: 'nowrap',
    }}>
      {value}
    </span>
  )
}

function ARRCell({ value }) {
  if (!value) return <span style={{ color: '#d1d5db', fontFamily: "'JetBrains Mono', monospace", fontSize: '12px' }}>—</span>
  return (
    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#4b5563' }}>
      ${value.toLocaleString()}
    </span>
  )
}

// ─── MUI toolbar ─────────────────────────────────────────────────────────────

function MuiToolbar() {
  return (
    <GridToolbarContainer style={{
      padding: '10px 16px', borderBottom: '1px solid #e5e7eb',
      background: '#f9fafb', display: 'flex', justifyContent: 'flex-end',
    }}>
      <GridToolbarExport
        slotProps={{
          tooltip: { title: 'Export as CSV' },
          button: {
            style: {
              fontSize: '12px', color: '#6b7280', border: '1px solid #e5e7eb',
              borderRadius: '6px', padding: '4px 12px',
              fontFamily: "'DM Sans', sans-serif", background: '#ffffff',
            },
          },
        }}
      />
    </GridToolbarContainer>
  )
}

// ─── MUI X columns ───────────────────────────────────────────────────────────

const muiColumns = [
  {
    field: 'company', headerName: 'Company', flex: 1.4, minWidth: 140,
    renderCell: ({ value }) => <span style={{ fontWeight: '600', color: '#111827' }}>{value}</span>,
  },
  { field: 'industry', headerName: 'Industry', flex: 1.3, minWidth: 120,
    renderCell: ({ value }) => <span style={{ fontSize: '13px', color: '#374151' }}>{value}</span>,
  },
  { field: 'teamSize', headerName: 'Dev Team', flex: 1, minWidth: 100,
    renderCell: ({ value }) => <span style={{ fontSize: '12px', color: '#9ca3af', fontFamily: "'JetBrains Mono', monospace" }}>{value}</span>,
  },
  { field: 'stack', headerName: 'Stack', flex: 1.2, minWidth: 120,
    renderCell: ({ value }) => <span style={{ fontSize: '12px', color: '#6b7280', fontFamily: "'JetBrains Mono', monospace" }}>{value}</span>,
  },
  {
    field: 'currentGrid', headerName: 'Current Grid', flex: 1.2, minWidth: 120,
    renderCell: ({ value }) => <Badge value={value} styleMap={GRID_STYLES} />,
  },
  {
    field: 'evalStatus', headerName: 'Status', flex: 1, minWidth: 110,
    renderCell: ({ value }) => <Badge value={value} styleMap={STATUS_STYLES} />,
  },
  {
    field: 'arrPotential', headerName: 'ARR Potential', flex: 1.1, minWidth: 120, type: 'number',
    renderCell: ({ value }) => <ARRCell value={value} />,
  },
  {
    field: 'region', headerName: 'Region', flex: 0.8, minWidth: 80,
    renderCell: ({ value }) => <span style={{ fontSize: '12px', color: '#9ca3af', fontFamily: "'JetBrains Mono', monospace" }}>{value}</span>,
  },
  {
    field: 'lastContact', headerName: 'Last Contact', flex: 1, minWidth: 110,
    renderCell: ({ value }) => <span style={{ fontSize: '12px', color: '#d1d5db', fontFamily: "'JetBrains Mono', monospace" }}>{value}</span>,
  },
]

// ─── AG Grid columns ──────────────────────────────────────────────────────────

const agColumns = [
  { field: 'company', headerName: 'Company', width: 160, cellStyle: { fontWeight: '600', color: '#111827' } },
  { field: 'industry', headerName: 'Industry', width: 150 },
  { field: 'teamSize', headerName: 'Dev Team', width: 130, cellStyle: { fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#9ca3af' } },
  { field: 'stack', headerName: 'Stack', width: 160, cellStyle: { fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#6b7280' } },
  { field: 'currentGrid', headerName: 'Current Grid', width: 150, cellRenderer: ({ value }) => <Badge value={value} styleMap={GRID_STYLES} /> },
  { field: 'evalStatus', headerName: 'Status', width: 135, cellRenderer: ({ value }) => <Badge value={value} styleMap={STATUS_STYLES} /> },
  { field: 'arrPotential', headerName: 'ARR Potential', width: 145, valueFormatter: ({ value }) => value ? `$${value.toLocaleString()}` : '—', cellStyle: { fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#4b5563' } },
  { field: 'region', headerName: 'Region', width: 90, cellStyle: { fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#9ca3af' } },
  { field: 'lastContact', headerName: 'Last Contact', width: 130, cellStyle: { fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#d1d5db' } },
]

// ─── Feature table ────────────────────────────────────────────────────────────

const featureRows = [
  { id: 1,  feature: 'Column sorting (multi)',            mui: '✅ Built-in',        ag: '✅ Built-in',        effort: '2–3 days' },
  { id: 2,  feature: 'Column filtering',                  mui: '✅ Built-in',        ag: '✅ Built-in',        effort: '1–2 weeks' },
  { id: 3,  feature: 'Pagination',                        mui: '✅ Built-in',        ag: '✅ Built-in',        effort: '1–2 days' },
  { id: 4,  feature: 'Column resizing',                   mui: '✅ Built-in',        ag: '✅ Built-in',        effort: '1 week' },
  { id: 5,  feature: 'CSV export',                        mui: '✅ Built-in',        ag: '✅ Built-in',        effort: '2–3 days' },
  { id: 6,  feature: 'Checkbox selection',                mui: '✅ Built-in',        ag: '✅ Built-in',        effort: '2–3 days' },
  { id: 7,  feature: 'Keyboard navigation (accessible)',  mui: '✅ Built-in',        ag: '✅ Built-in',        effort: '2–4 weeks' },
  { id: 8,  feature: 'Row virtualisation (100k+ rows)',   mui: '⚠️ Pro only',        ag: '✅ Community',       effort: '4–8 weeks' },
  { id: 9,  feature: 'Excel export',                      mui: '❌ Not available',   ag: '⚠️ Enterprise',     effort: '1–2 weeks' },
  { id: 10, feature: 'Pivot / grouping',                  mui: '⚠️ Premium',         ag: '⚠️ Enterprise',     effort: '4–8 weeks' },
  { id: 11, feature: 'MUI design system integration',     mui: '✅ Native',          ag: '❌ Manual',          effort: 'Ongoing' },
  { id: 12, feature: 'Theming API',                       mui: '✅ MUI theme',       ag: '⚠️ Custom CSS',     effort: 'Ongoing' },
]

const featureColumns = [
  {
    field: 'feature', headerName: 'Feature', flex: 1.6, minWidth: 200, sortable: false,
    renderCell: ({ value }) => (
      <span style={{ fontSize: '13px', color: '#374151', fontWeight: '500' }}>{value}</span>
    ),
  },
  {
    field: 'mui', headerName: 'MUI X Community', flex: 1, minWidth: 150, sortable: false,
    renderHeader: () => (
      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#007FFF', display: 'inline-block' }} />
        <span style={{ fontWeight: '700', color: '#007FFF', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>MUI X Community</span>
      </span>
    ),
    renderCell: ({ value }) => (
      <span style={{ fontSize: '12px', color: featureColor(value), fontFamily: "'JetBrains Mono', monospace" }}>{value}</span>
    ),
  },
  {
    field: 'ag', headerName: 'AG Grid Community', flex: 1, minWidth: 150, sortable: false,
    renderHeader: () => (
      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#16a34a', display: 'inline-block' }} />
        <span style={{ fontWeight: '700', color: '#16a34a', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>AG Grid Community</span>
      </span>
    ),
    renderCell: ({ value }) => (
      <span style={{ fontSize: '12px', color: featureColor(value), fontFamily: "'JetBrains Mono', monospace" }}>{value}</span>
    ),
  },
  {
    field: 'effort', headerName: 'Build in-house', flex: 0.8, minWidth: 130, sortable: false,
    renderHeader: () => (
      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#9ca3af', display: 'inline-block' }} />
        <span style={{ fontWeight: '700', color: '#9ca3af', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Build in-house</span>
      </span>
    ),
    renderCell: ({ value }) => (
      <span style={{ fontSize: '12px', color: '#d97706', fontFamily: "'JetBrains Mono', monospace" }}>{value}</span>
    ),
  },
]

const paidRows = [
  { id: 1,  feature: 'Row grouping / aggregation',          mui: '⚠️ Premium',         ag: '✅ Enterprise',      bryntum: '⚠️ Partial',        effort: '4–8 weeks' },
  { id: 2,  feature: 'Pivoting',                            mui: '⚠️ Premium',         ag: '✅ Enterprise',      bryntum: '❌',                effort: '4–8 weeks' },
  { id: 3,  feature: 'Excel export',                        mui: '⚠️ Pro/Premium',     ag: '✅ Enterprise',      bryntum: '⚠️ Limited',        effort: '1–2 weeks' },
  { id: 4,  feature: 'Advanced filtering',                  mui: '⚠️ Pro/Premium',     ag: '✅ Enterprise',      bryntum: '⚠️ Partial',        effort: '2–4 weeks' },
  { id: 5,  feature: 'Large dataset performance (100k+)',   mui: '⚠️ Premium',         ag: '✅ Strong',          bryntum: '⚠️ Partial',        effort: '4–8 weeks' },
  { id: 6,  feature: 'Charts integration',                  mui: '✅ Native',          ag: '⚠️ Separate (AG Charts)', bryntum: '❌',           effort: '2–4 weeks' },
  { id: 7,  feature: 'Design system / theming',             mui: '✅ Native (MUI)',    ag: '❌ Manual',          bryntum: '❌',                effort: 'Ongoing' },
  { id: 8,  feature: 'Scheduling / Gantt',                  mui: '❌',                 ag: '❌',                 bryntum: '✅ Core strength',  effort: '8–12+ weeks' },
]

const paidColumns = [
  {
    field: 'feature', headerName: 'Feature', flex: 1.8, minWidth: 220, sortable: false,
    renderCell: ({ value }) => (
      <span style={{ fontSize: '13px', color: '#374151', fontWeight: '500' }}>{value}</span>
    ),
  },
  {
    field: 'mui', headerName: 'MUI X Pro/Premium', flex: 1, minWidth: 150, sortable: false,
    renderHeader: () => (
      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#007FFF', display: 'inline-block' }} />
        <span style={{ fontWeight: '700', color: '#007FFF', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>MUI X Pro/Premium</span>
      </span>
    ),
    renderCell: ({ value }) => (
      <span style={{ fontSize: '12px', color: featureColor(value), fontFamily: "'JetBrains Mono', monospace" }}>{value}</span>
    ),
  },
  {
    field: 'ag', headerName: 'AG Grid Enterprise', flex: 1, minWidth: 160, sortable: false,
    renderHeader: () => (
      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#16a34a', display: 'inline-block' }} />
        <span style={{ fontWeight: '700', color: '#16a34a', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>AG Grid Enterprise</span>
      </span>
    ),
    renderCell: ({ value }) => (
      <span style={{ fontSize: '12px', color: featureColor(value), fontFamily: "'JetBrains Mono', monospace" }}>{value}</span>
    ),
  },
  {
    field: 'bryntum', headerName: 'Bryntum', flex: 1, minWidth: 140, sortable: false,
    renderHeader: () => (
      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#e67e22', display: 'inline-block' }} />
        <span style={{ fontWeight: '700', color: '#e67e22', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Bryntum</span>
      </span>
    ),
    renderCell: ({ value }) => (
      <span style={{ fontSize: '12px', color: featureColor(value), fontFamily: "'JetBrains Mono', monospace" }}>{value}</span>
    ),
  },
  {
    field: 'effort', headerName: 'Build in-house', flex: 0.8, minWidth: 130, sortable: false,
    renderHeader: () => (
      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#9ca3af', display: 'inline-block' }} />
        <span style={{ fontWeight: '700', color: '#9ca3af', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Build in-house</span>
      </span>
    ),
    renderCell: ({ value }) => (
      <span style={{ fontSize: '12px', color: '#d97706', fontFamily: "'JetBrains Mono', monospace" }}>{value}</span>
    ),
  },
]

function featureColor(val) {
  if (val?.startsWith('✅')) return '#15803d'
  if (val?.startsWith('❌')) return '#dc2626'
  if (val?.startsWith('⚠️')) return '#d97706'
  return '#374151'
}

// ─── Tab button ───────────────────────────────────────────────────────────────

function TabBtn({ active, onClick, color, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '8px 18px',
        borderRadius: '6px',
        fontSize: '13px',
        fontWeight: '600',
        border: active ? `1px solid ${color}` : '1px solid #e5e7eb',
        background: active ? `${color}12` : 'transparent',
        color: active ? color : '#6b7280',
        cursor: 'pointer',
        transition: 'all 150ms ease',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        letterSpacing: '-0.01em',
      }}
    >
      <span style={{
        width: '7px', height: '7px', borderRadius: '50%',
        background: active ? color : '#d1d5db', flexShrink: 0,
      }} />
      {children}
    </button>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function MUIXDemo() {
  const [activeTab, setActiveTab] = useState('mui')
  const [featureTab, setFeatureTab] = useState('community')
  const prospects = useMemo(() => generateProspects(), [])

  const onAgGridReady = useCallback((params) => {
    params.api.sizeColumnsToFit()
  }, [])

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 24px 60px' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: '600', color: '#111827', marginBottom: '8px', letterSpacing: '-0.02em' }}>
          Data Grid: Live Comparison
        </h1>
        <p style={{ fontSize: '14px', color: '#6b7280' }}>
          200 enterprise prospects tracked with company, stack, current grid solution, eval status, and ARR potential — rendered with two different libraries.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <TabBtn active={activeTab === 'mui'} onClick={() => setActiveTab('mui')} color="#007FFF">
          MUI X DataGrid
        </TabBtn>
        <TabBtn active={activeTab === 'ag'} onClick={() => setActiveTab('ag')} color="#16a34a">
          AG Grid Community
        </TabBtn>
      </div>

      {activeTab === 'mui' && (
        <div>
          <ThemeProvider theme={muiTheme}>
            <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '10px', overflow: 'hidden', marginBottom: '8px' }}>
              <DataGrid
                rows={prospects}
                columns={muiColumns}
                pageSizeOptions={[25, 50, 100]}
                pagination
                disableRowSelectionOnClick
                slots={{ toolbar: MuiToolbar }}
                initialState={{ pagination: { paginationModel: { pageSize: 25 } } }}
                style={{ height: 560 }}
              />
            </div>
          </ThemeProvider>
          <TechLabel tags={['MUI X — DataGrid', 'MUI X — GridToolbar', '@mui/material — ThemeProvider']} />
          <div style={{
            marginTop: '12px',
            background: '#f9fafb', border: '1px solid #e5e7eb', borderLeft: '4px solid #9ca3af',
            borderRadius: '8px', padding: '14px 20px', display: 'flex', gap: '12px', alignItems: 'flex-start',
          }}>
            <span style={{ fontSize: '16px', marginTop: '1px' }}>📊</span>
            <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.65', margin: 0 }}>
              <strong style={{ color: '#374151' }}>About the dataset:</strong>{' '}
              Company names are real. All other attributes (stack, grid solution, ARR, eval status) are randomly generated for demo purposes only.
            </p>
          </div>
        </div>
      )}

      {activeTab === 'ag' && (
        <div>
          <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '10px', overflow: 'hidden', marginBottom: '8px', height: 600 }}>
            <AgGridReact
              rowData={prospects}
              columnDefs={agColumns}
              theme={agTheme}
              pagination
              paginationPageSize={25}
              paginationPageSizeSelector={[25, 50, 100]}
              defaultColDef={{ resizable: true, sortable: true, filter: true }}
              onGridReady={onAgGridReady}
              style={{ height: '100%', width: '100%' }}
            />
          </div>
          <TechLabel tags={['AG Grid — AgGridReact', 'AG Grid Community (free)']} />
          <div style={{
            marginTop: '12px',
            background: '#f9fafb', border: '1px solid #e5e7eb', borderLeft: '4px solid #9ca3af',
            borderRadius: '8px', padding: '14px 20px', display: 'flex', gap: '12px', alignItems: 'flex-start',
          }}>
            <span style={{ fontSize: '16px', marginTop: '1px' }}>📊</span>
            <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.65', margin: 0 }}>
              <strong style={{ color: '#374151' }}>Synthetic dataset.</strong>{' '}
              Company names are real. All other attributes (stack, grid solution, ARR, eval status) are randomly generated for demo purposes only.
            </p>
          </div>
        </div>
      )}

      {/* API diff callout */}
      <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '40px' }}>
        {[
          {
            color: '#007FFF',
            bg: '#eff6ff',
            border: '#bfdbfe',
            title: 'MUI X — Key API concepts',
            items: [
              { label: 'Data binding',    text: 'Prop-based: ', code: 'rows={}  columns={}' },
              { label: 'Cell rendering',  text: 'Custom cells via ', code: 'renderCell' },
              { label: 'Customization',   text: 'Toolbar via ', code: 'slots={{ toolbar }}' },
              { label: 'Theming',         text: 'Native MUI theme — no extra config' },
              { label: 'Virtualisation',  text: 'Pro tier only', warn: true },
            ],
          },
          {
            color: '#16a34a',
            bg: '#f0fdf4',
            border: '#bbf7d0',
            title: 'AG Grid — Key API concepts',
            items: [
              { label: 'Data binding',    text: 'Prop-based: ', code: 'columnDefs={}  rowData={}' },
              { label: 'Cell rendering',  text: 'Custom cells via ', code: 'cellRenderer' },
              { label: 'Export',          text: 'CSV built-in, no configuration needed' },
              { label: 'Virtualisation',  text: 'Included in Community tier', ok: true },
              { label: 'Theming',         text: 'Semantic API: ', code: 'themeQuartz.withParams()' },
            ],
          },
        ].map(({ color, bg, border, title, items }) => (
          <ThemeProvider key={title} theme={muiTheme}>
            <Card sx={{
              background: bg,
              border: `1px solid ${border}`,
              borderLeft: `3px solid ${color}`,
              borderRadius: '8px',
              boxShadow: 'none',
            }}>
              <CardContent sx={{ p: '18px 20px', '&:last-child': { pb: '18px' } }}>
                <div style={{ fontSize: '11px', fontWeight: '700', color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px' }}>
                  {title}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {items.map(({ label, text, code, warn, ok }) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                      <span style={{
                        fontSize: '10px', fontWeight: '600', color: '#9ca3af',
                        textTransform: 'uppercase', letterSpacing: '0.07em',
                        minWidth: '100px', flexShrink: 0,
                      }}>
                        {label}
                      </span>
                      <span style={{ fontSize: '13px', color: '#374151', lineHeight: '1.5' }}>
                        {text}
                        {code && (
                          <code style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: '11.5px',
                            background: 'rgba(0,0,0,0.05)',
                            borderRadius: '3px',
                            padding: '1px 5px',
                            color,
                          }}>
                            {code}
                          </code>
                        )}
                        {warn && <span style={{ color: '#d97706', fontWeight: '600' }}> ⚠️ paid tier</span>}
                        {ok  && <span style={{ color: '#15803d', fontWeight: '600' }}> ✅</span>}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ThemeProvider>
        ))}
      </div>

      {/* Feature comparison tables */}
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '6px', letterSpacing: '-0.02em' }}>
          Feature comparison
        </h2>
        <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '16px' }}>
          From baseline capabilities to paid differentiation across MUI X, AG Grid, Bryntum, and build in-house.
        </p>

        <ThemeProvider theme={muiTheme}>
          <Tabs
            value={featureTab}
            onChange={(_, v) => setFeatureTab(v)}
            sx={{
              minHeight: '36px',
              marginBottom: '16px',
              borderBottom: '1px solid #e5e7eb',
              '& .MuiTabs-indicator': { backgroundColor: '#007FFF', height: '2px' },
              '& .MuiTab-root': {
                minHeight: '36px', padding: '0 16px', fontSize: '13px', fontWeight: '500',
                color: '#6b7280', textTransform: 'none', letterSpacing: '-0.01em',
                '&.Mui-selected': { color: '#007FFF', fontWeight: '600' },
              },
            }}
          >
            <Tab value="community" label="Community tier" />
            <Tab value="paid" label="Paid capabilities" />
          </Tabs>

          {featureTab === 'community' && (
            <div>
              <p style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '12px', fontStyle: '' }}>
                Based on community tiers to provide a consistent baseline across products.<br/><em>Note: some enterprise evaluations start directly with paid plans.</em>
              </p>
              <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '10px', overflow: 'hidden', marginBottom: '8px' }}>
                <DataGrid
                  rows={featureRows}
                  columns={featureColumns}
                  hideFooter
                  disableColumnMenu
                  disableRowSelectionOnClick
                  style={{ minHeight: 200 }}
                />
              </div>             
            </div>
          )}

          {featureTab === 'paid' && (
            <div>
              <p style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '12px', fontStyle: '' }}>
                Comparison of paid features to show how each solution differentiates beyond the baseline.
              </p>
              <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '10px', overflow: 'hidden', marginBottom: '8px' }}>
                <DataGrid
                  rows={paidRows}
                  columns={paidColumns}
                  hideFooter
                  disableColumnMenu
                  disableRowSelectionOnClick
                  style={{ minHeight: 200 }}
                />
              </div>
              <TechLabel tags={['MUI X — DataGrid', 'MUI — Tabs', 'Inline styles']} />
            </div>
          )}
        </ThemeProvider>
      </div>
    </div>
  )
}
