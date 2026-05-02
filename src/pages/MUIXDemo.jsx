import { useMemo, useCallback } from 'react'
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { generateEmployees } from '../data/employeeData'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#007FFF' },
    background: {
      default: '#0a0a0a',
      paper: '#111111',
    },
  },
  typography: {
    fontFamily: "'DM Sans', sans-serif",
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: 'none',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '13px',
          color: '#d1d5db',
          '& .MuiDataGrid-cell': {
            borderColor: '#1a1a1a',
          },
          '& .MuiDataGrid-columnHeaders': {
            background: '#1e293b',
            borderColor: '#1f1f1f',
          },
          '& .MuiDataGrid-columnHeader': {
            background: '#1e293b',
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: '600',
            color: '#94a3b8',
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          },
          '& .MuiDataGrid-row:hover': {
            background: '#151515',
          },
          '& .MuiDataGrid-row.Mui-selected': {
            background: 'rgba(0,127,255,0.08)',
            '&:hover': {
              background: 'rgba(0,127,255,0.12)',
            },
          },
          '& .MuiDataGrid-footerContainer': {
            borderColor: '#1f1f1f',
            background: '#0d0d0d',
          },
          '& .MuiDataGrid-row:nth-of-type(even)': {
            background: '#0d0d0d',
            '&:hover': {
              background: '#151515',
            },
          },
          '& .MuiCheckbox-root': {
            color: '#4b5563',
            '&.Mui-checked': {
              color: '#007FFF',
            },
          },
          '& .MuiDataGrid-columnSeparator': {
            color: '#2a2a2a',
          },
          '& .MuiTablePagination-root': {
            color: '#9ca3af',
            fontFamily: "'DM Sans', sans-serif",
          },
          '& .MuiDataGrid-virtualScroller': {
            background: '#111111',
          },
          '& .MuiDataGrid-filler': {
            background: '#111111',
          },
          '& .MuiDataGrid-scrollbarFiller': {
            background: '#111111',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '12px',
          textTransform: 'none',
          color: '#9ca3af',
          '&:hover': { background: '#1a1a1a', color: '#f5f5f5' },
        },
      },
    },
  },
})

function StatusBadge({ value }) {
  const styles = {
    Active: { bg: 'rgba(46,204,113,0.12)', color: '#2ecc71', border: 'rgba(46,204,113,0.25)' },
    'On Leave': { bg: 'rgba(245,158,11,0.12)', color: '#f59e0b', border: 'rgba(245,158,11,0.25)' },
    Departed: { bg: 'rgba(239,68,68,0.12)', color: '#ef4444', border: 'rgba(239,68,68,0.25)' },
  }
  const s = styles[value] || styles.Active
  return (
    <span style={{
      padding: '2px 8px',
      borderRadius: '99px',
      background: s.bg,
      color: s.color,
      border: `1px solid ${s.border}`,
      fontSize: '11px',
      fontWeight: '600',
      letterSpacing: '0.03em',
      fontFamily: "'DM Sans', sans-serif",
    }}>
      {value}
    </span>
  )
}

function PerfScore({ value }) {
  const color = value >= 80 ? '#2ecc71' : value >= 60 ? '#007FFF' : value >= 40 ? '#f59e0b' : '#ef4444'
  return (
    <span style={{
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: '12px',
      color,
      fontWeight: '500',
    }}>
      {value}
    </span>
  )
}

function CustomToolbar() {
  return (
    <GridToolbarContainer style={{
      padding: '10px 16px',
      borderBottom: '1px solid #1a1a1a',
      background: '#0d0d0d',
      display: 'flex',
      justifyContent: 'flex-end',
    }}>
      <GridToolbarExport
        slotProps={{
          tooltip: { title: 'Export as CSV' },
          button: {
            style: {
              fontSize: '12px',
              color: '#9ca3af',
              border: '1px solid #2a2a2a',
              borderRadius: '6px',
              padding: '4px 12px',
              fontFamily: "'DM Sans', sans-serif",
              background: '#111111',
            },
          },
        }}
      />
    </GridToolbarContainer>
  )
}

const featureRows = [
  { feature: 'Column sorting (multi)', builtin: '✅ Out of the box', effort: '2–3 days' },
  { feature: 'Column filtering', builtin: '✅ Out of the box', effort: '1–2 weeks' },
  { feature: 'Pagination', builtin: '✅ Out of the box', effort: '1–2 days' },
  { feature: 'Column resizing', builtin: '✅ Out of the box', effort: '1 week' },
  { feature: 'CSV export', builtin: '✅ Out of the box', effort: '2–3 days' },
  { feature: 'Checkbox selection', builtin: '✅ Out of the box', effort: '2–3 days' },
  { feature: 'Keyboard navigation (accessible)', builtin: '✅ Out of the box', effort: '2–4 weeks' },
  { feature: 'Responsive layout', builtin: '✅ Out of the box', effort: '3–5 days' },
]

export default function MUIXDemo() {
  const employees = useMemo(() => generateEmployees(500), [])

  const columns = [
    {
      field: 'name',
      headerName: 'Employee Name',
      width: 180,
      renderCell: ({ value }) => (
        <span style={{ fontWeight: '500', color: '#e2e8f0' }}>{value}</span>
      ),
    },
    { field: 'department', headerName: 'Department', width: 140 },
    { field: 'country', headerName: 'Country', width: 160 },
    {
      field: 'salary',
      headerName: 'Salary ($)',
      width: 130,
      type: 'number',
      renderCell: ({ value }) => (
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#94a3b8' }}>
          ${value.toLocaleString()}
        </span>
      ),
    },
    { field: 'startDate', headerName: 'Start Date', width: 130,
      renderCell: ({ value }) => (
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#6b7280' }}>{value}</span>
      ),
    },
    {
      field: 'performance',
      headerName: 'Performance',
      width: 130,
      type: 'number',
      renderCell: ({ value }) => <PerfScore value={value} />,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: ({ value }) => <StatusBadge value={value} />,
    },
  ]

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 24px 60px' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: '600', color: '#f5f5f5', marginBottom: '8px', letterSpacing: '-0.02em' }}>
          MUI X Data Grid — Live
        </h1>
        <p style={{ fontSize: '14px', color: '#6b7280' }}>
          Community tier. No license required. This is what your developers get on day one.
        </p>
      </div>

      <ThemeProvider theme={darkTheme}>
        <div style={{
          background: '#111111',
          border: '1px solid #1f1f1f',
          borderRadius: '10px',
          overflow: 'hidden',
          marginBottom: '40px',
        }}>
          <DataGrid
            rows={employees}
            columns={columns}
            pageSize={25}
            pageSizeOptions={[25, 50, 100]}
            pagination
            checkboxSelection
            disableRowSelectionOnClick
            slots={{ toolbar: CustomToolbar }}
            initialState={{
              pagination: { paginationModel: { pageSize: 25 } },
            }}
            style={{ height: 520 }}
          />
        </div>
      </ThemeProvider>

      {/* Feature comparison table */}
      <div>
        <h2 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#f5f5f5',
          marginBottom: '6px',
          letterSpacing: '-0.02em',
        }}>
          What you'd build to replicate this
        </h2>
        <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '20px' }}>
          Every feature above, if built from scratch by a senior frontend developer
        </p>

        <div style={{
          background: '#111111',
          border: '1px solid #1f1f1f',
          borderRadius: '10px',
          overflow: 'hidden',
          marginBottom: '20px',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#0d0d0d' }}>
                {['Feature', 'Built-in with MUI X', 'Est. dev effort if built from scratch'].map((h, i) => (
                  <th key={h} style={{
                    padding: '12px 18px',
                    textAlign: 'left',
                    fontSize: '11px',
                    fontWeight: '600',
                    color: '#6b7280',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    borderBottom: '1px solid #1f1f1f',
                    borderRight: i < 2 ? '1px solid #1a1a1a' : 'none',
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {featureRows.map((row, i) => (
                <tr key={row.feature} style={{ background: i % 2 === 0 ? '#111111' : '#0f0f0f' }}>
                  <td style={{ padding: '12px 18px', fontSize: '13px', color: '#d1d5db', borderBottom: '1px solid #1a1a1a', borderRight: '1px solid #1a1a1a' }}>
                    {row.feature}
                  </td>
                  <td style={{ padding: '12px 18px', fontSize: '13px', color: '#2ecc71', borderBottom: '1px solid #1a1a1a', borderRight: '1px solid #1a1a1a' }}>
                    {row.builtin}
                  </td>
                  <td style={{ padding: '12px 18px', fontSize: '12px', color: '#f59e0b', fontFamily: "'JetBrains Mono', monospace", borderBottom: '1px solid #1a1a1a' }}>
                    {row.effort}
                  </td>
                </tr>
              ))}
              {/* Total row */}
              <tr style={{ background: '#0a1628', borderTop: '1px solid #1e3a5f' }}>
                <td style={{ padding: '14px 18px', fontSize: '13px', fontWeight: '700', color: '#f5f5f5', borderRight: '1px solid #1a1a1a' }}>
                  Total
                </td>
                <td style={{ padding: '14px 18px', fontSize: '13px', fontWeight: '700', color: '#007FFF', borderRight: '1px solid #1a1a1a' }}>
                  Day 1
                </td>
                <td style={{ padding: '14px 18px', fontSize: '13px', fontWeight: '700', color: '#ef4444', fontFamily: "'JetBrains Mono', monospace" }}>
                  ~6–12 weeks
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{
          background: '#1a0808',
          border: '1px solid #3a1a1a',
          borderLeft: '4px solid #ef4444',
          borderRadius: '8px',
          padding: '18px 22px',
          display: 'flex',
          gap: '12px',
          alignItems: 'flex-start',
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
