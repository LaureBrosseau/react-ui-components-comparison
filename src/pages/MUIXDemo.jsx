import { useMemo, useState, useCallback } from 'react'
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { AgGridReact } from 'ag-grid-react'
import { AllCommunityModule, ModuleRegistry, colorSchemeDark, themeQuartz } from 'ag-grid-community'
import { generateEmployees } from '../data/employeeData'
import TechLabel from '../components/TechLabel'

ModuleRegistry.registerModules([AllCommunityModule])

// ─── MUI theme ──────────────────────────────────────────────────────────────

const muiTheme = createTheme({
  palette: { mode: 'dark', primary: { main: '#007FFF' } },
  typography: { fontFamily: "'DM Sans', sans-serif" },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: 'none',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '13px',
          color: '#d1d5db',
          '& .MuiDataGrid-cell': { borderColor: '#1a1a1a' },
          '& .MuiDataGrid-columnHeaders': { background: '#1e293b', borderColor: '#1f1f1f' },
          '& .MuiDataGrid-columnHeader': { background: '#1e293b' },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: '600', color: '#94a3b8', fontSize: '12px',
            textTransform: 'uppercase', letterSpacing: '0.05em',
          },
          '& .MuiDataGrid-row:hover': { background: '#151515' },
          '& .MuiDataGrid-row.Mui-selected': {
            background: 'rgba(0,127,255,0.08)',
            '&:hover': { background: 'rgba(0,127,255,0.12)' },
          },
          '& .MuiDataGrid-footerContainer': { borderColor: '#1f1f1f', background: '#0d0d0d' },
          '& .MuiDataGrid-row:nth-of-type(even)': { background: '#0d0d0d', '&:hover': { background: '#151515' } },
          '& .MuiCheckbox-root': { color: '#4b5563', '&.Mui-checked': { color: '#007FFF' } },
          '& .MuiDataGrid-columnSeparator': { color: '#2a2a2a' },
          '& .MuiTablePagination-root': { color: '#9ca3af', fontFamily: "'DM Sans', sans-serif" },
          '& .MuiDataGrid-virtualScroller': { background: '#111111' },
          '& .MuiDataGrid-filler': { background: '#111111' },
          '& .MuiDataGrid-scrollbarFiller': { background: '#111111' },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "'DM Sans', sans-serif", fontSize: '12px', textTransform: 'none',
          color: '#9ca3af', '&:hover': { background: '#1a1a1a', color: '#f5f5f5' },
        },
      },
    },
  },
})

// ─── AG Grid theme ───────────────────────────────────────────────────────────

const agTheme = themeQuartz.withPart(colorSchemeDark).withParams({
  backgroundColor: '#111111',
  foregroundColor: '#d1d5db',
  borderColor: '#1f1f1f',
  headerBackgroundColor: '#1e293b',
  headerTextColor: '#94a3b8',
  rowHoverColor: '#151515',
  selectedRowBackgroundColor: 'rgba(0,127,255,0.08)',
  accentColor: '#007FFF',
  fontFamily: "'DM Sans', sans-serif",
  fontSize: 13,
  headerFontSize: 12,
  headerFontWeight: 600,
  cellHorizontalPaddingScale: 1,
  rowBorder: { color: '#1a1a1a', width: 1 },
  columnBorder: false,
  wrapperBorder: false,
  oddRowBackgroundColor: '#0d0d0d',
})

// ─── Shared cell renderers ───────────────────────────────────────────────────

function StatusBadge({ value }) {
  const s = {
    Active:   { bg: 'rgba(46,204,113,0.12)',  color: '#2ecc71', border: 'rgba(46,204,113,0.25)' },
    'On Leave': { bg: 'rgba(245,158,11,0.12)', color: '#f59e0b', border: 'rgba(245,158,11,0.25)' },
    Departed: { bg: 'rgba(239,68,68,0.12)',   color: '#ef4444', border: 'rgba(239,68,68,0.25)' },
  }[value] || {}
  return (
    <span style={{
      padding: '2px 8px', borderRadius: '99px',
      background: s.bg, color: s.color, border: `1px solid ${s.border}`,
      fontSize: '11px', fontWeight: '600', letterSpacing: '0.03em',
      fontFamily: "'DM Sans', sans-serif",
    }}>
      {value}
    </span>
  )
}

function PerfScore({ value }) {
  const color = value >= 80 ? '#2ecc71' : value >= 60 ? '#007FFF' : value >= 40 ? '#f59e0b' : '#ef4444'
  return (
    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color, fontWeight: '500' }}>
      {value}
    </span>
  )
}

// ─── MUI toolbar ─────────────────────────────────────────────────────────────

function MuiToolbar() {
  return (
    <GridToolbarContainer style={{
      padding: '10px 16px', borderBottom: '1px solid #1a1a1a',
      background: '#0d0d0d', display: 'flex', justifyContent: 'flex-end',
    }}>
      <GridToolbarExport
        slotProps={{
          tooltip: { title: 'Export as CSV' },
          button: {
            style: {
              fontSize: '12px', color: '#9ca3af', border: '1px solid #2a2a2a',
              borderRadius: '6px', padding: '4px 12px',
              fontFamily: "'DM Sans', sans-serif", background: '#111111',
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
    field: 'name', headerName: 'Employee Name', width: 180,
    renderCell: ({ value }) => <span style={{ fontWeight: '500', color: '#e2e8f0' }}>{value}</span>,
  },
  { field: 'department', headerName: 'Department', width: 140 },
  { field: 'country', headerName: 'Country', width: 160 },
  {
    field: 'salary', headerName: 'Salary ($)', width: 130, type: 'number',
    renderCell: ({ value }) => (
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#94a3b8' }}>
        ${value.toLocaleString()}
      </span>
    ),
  },
  {
    field: 'startDate', headerName: 'Start Date', width: 130,
    renderCell: ({ value }) => (
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#6b7280' }}>{value}</span>
    ),
  },
  {
    field: 'performance', headerName: 'Performance', width: 130, type: 'number',
    renderCell: ({ value }) => <PerfScore value={value} />,
  },
  {
    field: 'status', headerName: 'Status', width: 120,
    renderCell: ({ value }) => <StatusBadge value={value} />,
  },
]

// ─── AG Grid columns ──────────────────────────────────────────────────────────

const agColumns = [
  {
    field: 'name', headerName: 'Employee Name', width: 180,
    cellStyle: { fontWeight: '500', color: '#e2e8f0' },
  },
  { field: 'department', headerName: 'Department', width: 150 },
  { field: 'country', headerName: 'Country', width: 160 },
  {
    field: 'salary', headerName: 'Salary ($)', width: 140,
    valueFormatter: ({ value }) => `$${value.toLocaleString()}`,
    cellStyle: { fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#94a3b8' },
  },
  {
    field: 'startDate', headerName: 'Start Date', width: 130,
    cellStyle: { fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#6b7280' },
  },
  {
    field: 'performance', headerName: 'Performance', width: 140,
    cellRenderer: ({ value }) => <PerfScore value={value} />,
  },
  {
    field: 'status', headerName: 'Status', width: 130,
    cellRenderer: ({ value }) => <StatusBadge value={value} />,
  },
]

// ─── Feature table ────────────────────────────────────────────────────────────

const featureRows = [
  { feature: 'Column sorting (multi)',            mui: '✅ Built-in',  ag: '✅ Built-in',  effort: '2–3 days' },
  { feature: 'Column filtering',                  mui: '✅ Built-in',  ag: '✅ Built-in',  effort: '1–2 weeks' },
  { feature: 'Pagination',                        mui: '✅ Built-in',  ag: '✅ Built-in',  effort: '1–2 days' },
  { feature: 'Column resizing',                   mui: '✅ Built-in',  ag: '✅ Built-in',  effort: '1 week' },
  { feature: 'CSV export',                        mui: '✅ Built-in',  ag: '✅ Built-in',  effort: '2–3 days' },
  { feature: 'Checkbox selection',                mui: '✅ Built-in',  ag: '✅ Built-in',  effort: '2–3 days' },
  { feature: 'Keyboard navigation (accessible)',  mui: '✅ Built-in',  ag: '✅ Built-in',  effort: '2–4 weeks' },
  { feature: 'Row virtualisation (100k+ rows)',   mui: '⚠️ Pro only',  ag: '✅ Community', effort: '4–8 weeks' },
  { feature: 'Excel export',                      mui: '❌ Not available', ag: '⚠️ Enterprise', effort: '1–2 weeks' },
  { feature: 'Pivot / grouping',                  mui: '⚠️ Premium',   ag: '⚠️ Enterprise', effort: '4–8 weeks' },
  { feature: 'MUI design system integration',     mui: '✅ Native',    ag: '❌ Manual',    effort: 'Ongoing' },
  { feature: 'Theming API',                       mui: '✅ MUI theme', ag: '⚠️ Custom CSS', effort: 'Ongoing' },
]

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
        border: active ? `1px solid ${color}` : '1px solid #2a2a2a',
        background: active ? `${color}18` : 'transparent',
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
        background: active ? color : '#3a3a3a', flexShrink: 0,
      }} />
      {children}
    </button>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function MUIXDemo() {
  const [activeTab, setActiveTab] = useState('mui')
  const employees = useMemo(() => generateEmployees(500), [])

  const onAgGridReady = useCallback((params) => {
    params.api.sizeColumnsToFit()
  }, [])

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 24px 60px' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: '600', color: '#f5f5f5', marginBottom: '8px', letterSpacing: '-0.02em' }}>
          Data Grid — Live Comparison
        </h1>
        <p style={{ fontSize: '14px', color: '#6b7280' }}>
          Same 500 rows. Same columns. Two different libraries — compare the API, the styling, the features.
        </p>
      </div>

      {/* Tab switcher */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <TabBtn active={activeTab === 'mui'} onClick={() => setActiveTab('mui')} color="#007FFF">
          MUI X DataGrid
        </TabBtn>
        <TabBtn active={activeTab === 'ag'} onClick={() => setActiveTab('ag')} color="#2ecc71">
          AG Grid Community
        </TabBtn>
      </div>

      {/* MUI X grid */}
      {activeTab === 'mui' && (
        <div>
          <ThemeProvider theme={muiTheme}>
            <div style={{ background: '#111111', border: '1px solid #1f1f1f', borderRadius: '10px', overflow: 'hidden', marginBottom: '8px' }}>
              <DataGrid
                rows={employees}
                columns={muiColumns}
                pageSizeOptions={[25, 50, 100]}
                pagination
                checkboxSelection
                disableRowSelectionOnClick
                slots={{ toolbar: MuiToolbar }}
                initialState={{ pagination: { paginationModel: { pageSize: 25 } } }}
                style={{ height: 520 }}
              />
            </div>
          </ThemeProvider>
          <TechLabel tags={['MUI X — DataGrid', 'MUI X — GridToolbar', '@mui/material — ThemeProvider']} />
        </div>
      )}

      {/* AG Grid */}
      {activeTab === 'ag' && (
        <div>
          <div style={{ background: '#111111', border: '1px solid #1f1f1f', borderRadius: '10px', overflow: 'hidden', marginBottom: '8px', height: 560 }}>
            <AgGridReact
              rowData={employees}
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
      <div style={{
        marginTop: '24px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
        marginBottom: '40px',
      }}>
        <div style={{
          background: '#0a1628', border: '1px solid #1e3a5f', borderLeft: '3px solid #007FFF',
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
              <li key={t} style={{ fontSize: '12px', color: '#93c5fd', fontFamily: "'JetBrains Mono', monospace", display: 'flex', gap: '8px' }}>
                <span style={{ color: '#007FFF', flexShrink: 0 }}>›</span>{t}
              </li>
            ))}
          </ul>
        </div>
        <div style={{
          background: '#0a1a0f', border: '1px solid #1a3a24', borderLeft: '3px solid #2ecc71',
          borderRadius: '8px', padding: '16px 20px',
        }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#2ecc71', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
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
              <li key={t} style={{ fontSize: '12px', color: '#86efac', fontFamily: "'JetBrains Mono', monospace", display: 'flex', gap: '8px' }}>
                <span style={{ color: '#2ecc71', flexShrink: 0 }}>›</span>{t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Feature comparison table */}
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#f5f5f5', marginBottom: '6px', letterSpacing: '-0.02em' }}>
          Feature comparison: MUI X vs AG Grid vs Build from scratch
        </h2>
        <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '20px' }}>
          Community tier only — no paid plans
        </p>

        <div style={{
          background: '#111111', border: '1px solid #1f1f1f', borderRadius: '10px',
          overflow: 'hidden', marginBottom: '8px',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#0d0d0d' }}>
                {[
                  { label: 'Feature', color: '#6b7280' },
                  { label: 'MUI X Community', color: '#007FFF' },
                  { label: 'AG Grid Community', color: '#2ecc71' },
                  { label: 'Built from scratch', color: '#6b7280' },
                ].map(({ label, color }, i) => (
                  <th key={label} style={{
                    padding: '12px 18px', textAlign: 'left',
                    fontSize: '11px', fontWeight: '700', color,
                    textTransform: 'uppercase', letterSpacing: '0.07em',
                    borderBottom: '1px solid #1f1f1f',
                    borderRight: i < 3 ? '1px solid #1a1a1a' : 'none',
                  }}>
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {featureRows.map((row, i) => (
                <tr key={row.feature} style={{ background: i % 2 === 0 ? '#111111' : '#0f0f0f' }}>
                  <td style={{ padding: '11px 18px', fontSize: '13px', color: '#d1d5db', borderBottom: '1px solid #1a1a1a', borderRight: '1px solid #1a1a1a' }}>
                    {row.feature}
                  </td>
                  <td style={{ padding: '11px 18px', fontSize: '12px', color: row.mui.startsWith('✅') ? '#60a5fa' : row.mui.startsWith('❌') ? '#ef4444' : '#f59e0b', borderBottom: '1px solid #1a1a1a', borderRight: '1px solid #1a1a1a', fontFamily: "'JetBrains Mono', monospace" }}>
                    {row.mui}
                  </td>
                  <td style={{ padding: '11px 18px', fontSize: '12px', color: row.ag.startsWith('✅') ? '#4ade80' : row.ag.startsWith('❌') ? '#ef4444' : '#f59e0b', borderBottom: '1px solid #1a1a1a', borderRight: '1px solid #1a1a1a', fontFamily: "'JetBrains Mono', monospace" }}>
                    {row.ag}
                  </td>
                  <td style={{ padding: '11px 18px', fontSize: '12px', color: '#f59e0b', borderBottom: '1px solid #1a1a1a', fontFamily: "'JetBrains Mono', monospace" }}>
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
          background: '#1a0808', border: '1px solid #3a1a1a', borderLeft: '4px solid #ef4444',
          borderRadius: '8px', padding: '18px 22px', display: 'flex', gap: '12px', alignItems: 'flex-start',
        }}>
          <span style={{ fontSize: '16px', marginTop: '1px' }}>🚨</span>
          <p style={{ fontSize: '14px', color: '#fca5a5', lineHeight: '1.65' }}>
            <strong style={{ color: '#f5f5f5' }}>6–12 weeks</strong> of senior frontend dev time, before your first feature request.{' '}
            Every team that has tried to build this has regretted it.
          </p>
        </div>
      </div>
    </div>
  )
}
