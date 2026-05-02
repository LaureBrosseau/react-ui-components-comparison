import { useMemo, useState, useCallback } from 'react'
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid'
import { createTheme, ThemeProvider } from '@mui/material/styles'
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
    field: 'company', headerName: 'Company', width: 160,
    renderCell: ({ value }) => <span style={{ fontWeight: '600', color: '#111827' }}>{value}</span>,
  },
  { field: 'industry', headerName: 'Industry', width: 150,
    renderCell: ({ value }) => <span style={{ fontSize: '13px', color: '#374151' }}>{value}</span>,
  },
  { field: 'teamSize', headerName: 'Dev Team', width: 130,
    renderCell: ({ value }) => <span style={{ fontSize: '12px', color: '#9ca3af', fontFamily: "'JetBrains Mono', monospace" }}>{value}</span>,
  },
  { field: 'stack', headerName: 'Stack', width: 160,
    renderCell: ({ value }) => <span style={{ fontSize: '12px', color: '#6b7280', fontFamily: "'JetBrains Mono', monospace" }}>{value}</span>,
  },
  {
    field: 'currentGrid', headerName: 'Current Grid', width: 150,
    renderCell: ({ value }) => <Badge value={value} styleMap={GRID_STYLES} />,
  },
  {
    field: 'evalStatus', headerName: 'Status', width: 135,
    renderCell: ({ value }) => <Badge value={value} styleMap={STATUS_STYLES} />,
  },
  {
    field: 'arrPotential', headerName: 'ARR Potential', width: 140, type: 'number',
    renderCell: ({ value }) => <ARRCell value={value} />,
  },
  {
    field: 'region', headerName: 'Region', width: 90,
    renderCell: ({ value }) => <span style={{ fontSize: '12px', color: '#9ca3af', fontFamily: "'JetBrains Mono', monospace" }}>{value}</span>,
  },
  {
    field: 'lastContact', headerName: 'Last Contact', width: 130,
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
  { feature: 'Column sorting (multi)',            mui: '✅ Built-in',        ag: '✅ Built-in',        effort: '2–3 days' },
  { feature: 'Column filtering',                  mui: '✅ Built-in',        ag: '✅ Built-in',        effort: '1–2 weeks' },
  { feature: 'Pagination',                        mui: '✅ Built-in',        ag: '✅ Built-in',        effort: '1–2 days' },
  { feature: 'Column resizing',                   mui: '✅ Built-in',        ag: '✅ Built-in',        effort: '1 week' },
  { feature: 'CSV export',                        mui: '✅ Built-in',        ag: '✅ Built-in',        effort: '2–3 days' },
  { feature: 'Checkbox selection',                mui: '✅ Built-in',        ag: '✅ Built-in',        effort: '2–3 days' },
  { feature: 'Keyboard navigation (accessible)',  mui: '✅ Built-in',        ag: '✅ Built-in',        effort: '2–4 weeks' },
  { feature: 'Row virtualisation (100k+ rows)',   mui: '⚠️ Pro only',        ag: '✅ Community',       effort: '4–8 weeks' },
  { feature: 'Excel export',                      mui: '❌ Not available',   ag: '⚠️ Enterprise',     effort: '1–2 weeks' },
  { feature: 'Pivot / grouping',                  mui: '⚠️ Premium',         ag: '⚠️ Enterprise',     effort: '4–8 weeks' },
  { feature: 'MUI design system integration',     mui: '✅ Native',          ag: '❌ Manual',          effort: 'Ongoing' },
  { feature: 'Theming API',                       mui: '✅ MUI theme',       ag: '⚠️ Custom CSS',     effort: 'Ongoing' },
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
  const prospects = useMemo(() => generateProspects(), [])

  const onAgGridReady = useCallback((params) => {
    params.api.sizeColumnsToFit()
  }, [])

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 24px 60px' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: '600', color: '#111827', marginBottom: '8px', letterSpacing: '-0.02em' }}>
          Data Grid — Live Comparison
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
                checkboxSelection
                disableRowSelectionOnClick
                slots={{ toolbar: MuiToolbar }}
                initialState={{ pagination: { paginationModel: { pageSize: 25 } } }}
                style={{ height: 560 }}
              />
            </div>
          </ThemeProvider>
          <TechLabel tags={['MUI X — DataGrid', 'MUI X — GridToolbar', '@mui/material — ThemeProvider']} />
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
        </div>
      )}

      {/* API diff callout */}
      <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '40px' }}>
        <div style={{
          background: '#eff6ff', border: '1px solid #bfdbfe', borderLeft: '3px solid #007FFF',
          borderRadius: '8px', padding: '16px 20px',
        }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#007FFF', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
            MUI X — What's different
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {[
              'Prop-based API: rows={} columns={}',
              'renderCell for custom cell content',
              'slots={{ toolbar }} for customization',
              'Integrates natively with MUI theme',
              'Row virtualisation: Pro tier only',
            ].map(t => (
              <li key={t} style={{ fontSize: '12px', color: '#1e40af', fontFamily: "'JetBrains Mono', monospace", display: 'flex', gap: '8px' }}>
                <span style={{ color: '#007FFF', flexShrink: 0 }}>›</span>{t}
              </li>
            ))}
          </ul>
        </div>
        <div style={{
          background: '#f0fdf4', border: '1px solid #bbf7d0', borderLeft: '3px solid #16a34a',
          borderRadius: '8px', padding: '16px 20px',
        }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
            AG Grid — What's different
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {[
              'columnDefs={} rowData={} API',
              'cellRenderer for custom cells',
              'Built-in CSV export (no config)',
              'Row virtualisation: Community ✅',
              'Theme via themeQuartz.withParams()',
            ].map(t => (
              <li key={t} style={{ fontSize: '12px', color: '#166534', fontFamily: "'JetBrains Mono', monospace", display: 'flex', gap: '8px' }}>
                <span style={{ color: '#16a34a', flexShrink: 0 }}>›</span>{t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Feature comparison table */}
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '6px', letterSpacing: '-0.02em' }}>
          Feature comparison: MUI X vs AG Grid vs Build from scratch
        </h2>
        <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '20px' }}>
          Community tier only — no paid plans
        </p>

        <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '10px', overflow: 'hidden', marginBottom: '8px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {[
                  { label: 'Feature', color: '#6b7280' },
                  { label: 'MUI X Community', color: '#007FFF' },
                  { label: 'AG Grid Community', color: '#16a34a' },
                  { label: 'Built from scratch', color: '#6b7280' },
                ].map(({ label, color }, i) => (
                  <th key={label} style={{
                    padding: '12px 18px', textAlign: 'left',
                    fontSize: '11px', fontWeight: '700', color,
                    textTransform: 'uppercase', letterSpacing: '0.07em',
                    borderBottom: '1px solid #e5e7eb',
                    borderRight: i < 3 ? '1px solid #f0f0f0' : 'none',
                  }}>
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {featureRows.map((row, i) => (
                <tr key={row.feature} style={{ background: i % 2 === 0 ? '#ffffff' : '#f9fafb' }}>
                  <td style={{ padding: '11px 18px', fontSize: '13px', color: '#374151', borderBottom: '1px solid #f0f0f0', borderRight: '1px solid #f0f0f0' }}>
                    {row.feature}
                  </td>
                  <td style={{ padding: '11px 18px', fontSize: '12px', color: featureColor(row.mui), borderBottom: '1px solid #f0f0f0', borderRight: '1px solid #f0f0f0', fontFamily: "'JetBrains Mono', monospace" }}>
                    {row.mui}
                  </td>
                  <td style={{ padding: '11px 18px', fontSize: '12px', color: featureColor(row.ag), borderBottom: '1px solid #f0f0f0', borderRight: '1px solid #f0f0f0', fontFamily: "'JetBrains Mono', monospace" }}>
                    {row.ag}
                  </td>
                  <td style={{ padding: '11px 18px', fontSize: '12px', color: '#d97706', borderBottom: '1px solid #f0f0f0', fontFamily: "'JetBrains Mono', monospace" }}>
                    {row.effort}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TechLabel tags={['Custom HTML <table>', 'Inline styles']} />

        <div style={{
          marginTop: '16px',
          background: '#fef2f2', border: '1px solid #fecaca', borderLeft: '4px solid #dc2626',
          borderRadius: '8px', padding: '18px 22px', display: 'flex', gap: '12px', alignItems: 'flex-start',
        }}>
          <span style={{ fontSize: '16px', marginTop: '1px' }}>🚨</span>
          <p style={{ fontSize: '14px', color: '#b91c1c', lineHeight: '1.65' }}>
            <strong style={{ color: '#7f1d1d' }}>6–12 weeks</strong> of senior frontend dev time, before your first feature request.{' '}
            Every team that has tried to build this has regretted it.
          </p>
        </div>
      </div>
    </div>
  )
}
