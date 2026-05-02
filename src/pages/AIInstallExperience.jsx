import TechLabel from '../components/TechLabel'

const SECTION = ({ title, children }) => (
  <div style={{ marginBottom: '40px' }}>
    <h2 style={{
      fontSize: '16px', fontWeight: '700', color: '#f5f5f5',
      letterSpacing: '-0.01em', marginBottom: '16px',
      paddingBottom: '10px', borderBottom: '1px solid #1f1f1f',
    }}>
      {title}
    </h2>
    {children}
  </div>
)

const CARD = ({ children, accent }) => (
  <div style={{
    background: '#111111',
    border: '1px solid #1f1f1f',
    borderLeft: accent ? `3px solid ${accent}` : '1px solid #1f1f1f',
    borderRadius: '8px',
    padding: '20px 24px',
    marginBottom: '12px',
  }}>
    {children}
  </div>
)

const Label = ({ children, color }) => (
  <span style={{
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: '4px',
    background: `${color}18`,
    border: `1px solid ${color}40`,
    color,
    fontSize: '10px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginBottom: '10px',
  }}>
    {children}
  </span>
)

const CODE = ({ children }) => (
  <code style={{
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '12px',
    background: '#0d0d0d',
    border: '1px solid #2a2a2a',
    borderRadius: '4px',
    padding: '1px 6px',
    color: '#94a3b8',
  }}>
    {children}
  </code>
)

const BLOCK = ({ children }) => (
  <pre style={{
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '12px',
    background: '#0a0a0a',
    border: '1px solid #1f1f1f',
    borderRadius: '6px',
    padding: '14px 18px',
    color: '#94a3b8',
    lineHeight: '1.7',
    overflowX: 'auto',
    marginTop: '10px',
    marginBottom: '4px',
  }}>
    {children}
  </pre>
)

const POINT = ({ icon = '›', color = '#9ca3af', children }) => (
  <li style={{
    display: 'flex', gap: '10px', alignItems: 'flex-start',
    fontSize: '13px', color: '#d1d5db', lineHeight: '1.6', marginBottom: '8px',
  }}>
    <span style={{ color, flexShrink: 0, fontWeight: '700', marginTop: '1px' }}>{icon}</span>
    <span>{children}</span>
  </li>
)

const comparisonRows = [
  { criterion: 'Packages to install',       mui: '4 (incl. peer deps)',         ag: '2',                           winner: 'ag' },
  { criterion: 'Silent install trap',        mui: 'Missing peer deps',           ag: 'Forgotten ModuleRegistry',    winner: 'draw' },
  { criterion: 'API legibility for LLMs',    mui: '✅ Very readable',            ag: '✅ Readable',                 winner: 'mui' },
  { criterion: 'Theming without internals',  mui: '❌ Requires MUI class names', ag: '✅ withParams() API',         winner: 'ag' },
  { criterion: 'Risk of stale AI docs',      mui: 'Low — stable API',            ag: 'High — v33 breaking change',  winner: 'mui' },
  { criterion: 'Visual debug needed',        mui: 'Yes (dark mode classes)',      ag: 'Yes (empty grid, no error)',  winner: 'draw' },
  { criterion: 'Community features (free)',  mui: 'Basic',                       ag: 'Virtualisation, filters…',    winner: 'ag' },
  { criterion: 'Design system integration',  mui: '✅ Native MUI theme',        ag: '❌ Manual',                   winner: 'mui' },
]

export default function AIInstallExperience() {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px 80px' }}>

      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '4px 12px', borderRadius: '99px',
          background: 'rgba(0,127,255,0.08)', border: '1px solid rgba(0,127,255,0.2)',
          marginBottom: '14px',
        }}>
          <span style={{ fontSize: '11px', color: '#007FFF', fontWeight: '600', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            AI Developer Experience Report
          </span>
        </div>
        <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#f5f5f5', marginBottom: '10px', letterSpacing: '-0.03em', lineHeight: '1.2' }}>
          Installing MUI X & AG Grid<br />
          <span style={{ color: '#6b7280', fontWeight: '400', fontSize: '20px' }}>as an AI agent — what was easy, what wasn't</span>
        </h1>
        <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.65', maxWidth: '680px' }}>
          This page documents the real installation experience of integrating both libraries into this React app —
          from the perspective of an AI coding agent operating autonomously, without human debugging assistance.
          Every friction point here is a real friction point.
        </p>
      </div>

      {/* MUI X Section */}
      <SECTION title="MUI X DataGrid — Installation Experience">

        <CARD accent="#007FFF">
          <Label color="#007FFF">Install command</Label>
          <BLOCK>npm install @mui/x-data-grid @mui/material @emotion/react @emotion/styled</BLOCK>
          <p style={{ fontSize: '13px', color: '#9ca3af', marginTop: '10px', lineHeight: '1.6' }}>
            <strong style={{ color: '#f5f5f5' }}>4 packages, not 1.</strong>{' '}
            <CODE>@mui/x-data-grid</CODE> alone causes silent runtime failures.
            The peer dependencies on <CODE>@emotion/react</CODE> and <CODE>@emotion/styled</CODE> are
            not always obvious from the package name. A model relying on outdated docs may install only the grid
            package and spend time debugging non-obvious errors.
          </p>
        </CARD>

        <CARD>
          <Label color="#007FFF">API — intuitive for AI generation</Label>
          <BLOCK>{`<DataGrid
  rows={employees}          // ✅ self-explanatory
  columns={columns}          // ✅ self-explanatory
  checkboxSelection          // ✅ boolean prop
  disableRowSelectionOnClick // ✅ readable
  slots={{ toolbar: CustomToolbar }}  // ⚠️ non-obvious pattern
  initialState={{ pagination: { paginationModel: { pageSize: 25 } } }}
/>`}</BLOCK>
          <p style={{ fontSize: '13px', color: '#9ca3af', marginTop: '10px', lineHeight: '1.6' }}>
            The prop-based API is very LLM-friendly — most props are self-documenting.
            The <CODE>slots</CODE> pattern for toolbar customization is the one non-intuitive step:
            it requires knowing that <CODE>GridToolbarContainer</CODE> + <CODE>GridToolbarExport</CODE>
            must be composed manually inside a custom component.
          </p>
        </CARD>

        <CARD>
          <Label color="#f59e0b">Theming — the hardest part</Label>
          <BLOCK>{`// Requires knowing internal MUI class names:
'& .MuiDataGrid-columnHeaders':    { background: '#1e293b' }
'& .MuiDataGrid-virtualScroller':  { background: '#111111' }
'& .MuiDataGrid-filler':           { background: '#111111' }
'& .MuiDataGrid-scrollbarFiller':  { background: '#111111' }
//                           ↑ without these, white flashes appear in dark mode`}</BLOCK>
          <p style={{ fontSize: '13px', color: '#9ca3af', marginTop: '10px', lineHeight: '1.6' }}>
            Dark mode theming requires targeting internal CSS class names that are not in the primary documentation.
            Missing <CODE>filler</CODE> and <CODE>scrollbarFiller</CODE> causes visible white areas —
            a visual bug only detectable by actually rendering the component.{' '}
            <strong style={{ color: '#f5f5f5' }}>This is where a screenshot tool was critical</strong>:
            the build succeeds, no JS errors, but the UI is wrong.
          </p>
        </CARD>

        <ul style={{ listStyle: 'none', padding: 0, marginTop: '4px' }}>
          <POINT icon="✅" color="#2ecc71">Build passed on first attempt — no compilation errors</POINT>
          <POINT icon="✅" color="#2ecc71"><CODE>getRowHeight={() => 'auto'}</CODE> makes cells adapt to multi-line content on Page 1</POINT>
          <POINT icon="⚠️" color="#f59e0b">No errors thrown when dark mode is misconfigured — purely visual, only catchable by rendering</POINT>
          <POINT icon="⚠️" color="#f59e0b">Footer hidden via <CODE>display: none</CODE> override — no clean prop for this in Community tier</POINT>
        </ul>
      </SECTION>

      {/* AG Grid Section */}
      <SECTION title="AG Grid Community — Installation Experience">

        <CARD accent="#2ecc71">
          <Label color="#2ecc71">Install command</Label>
          <BLOCK>npm install ag-grid-react ag-grid-community</BLOCK>
          <p style={{ fontSize: '13px', color: '#9ca3af', marginTop: '10px', lineHeight: '1.6' }}>
            <strong style={{ color: '#f5f5f5' }}>2 packages, no hidden peer deps.</strong>{' '}
            Significantly simpler install surface. No emotion, no material dependency.
          </p>
        </CARD>

        <CARD>
          <Label color="#ef4444">The critical silent trap — ModuleRegistry</Label>
          <BLOCK>{`// v33+ REQUIRED — without this, the grid renders empty with no error:
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
ModuleRegistry.registerModules([AllCommunityModule])

// Then in the component:
<AgGridReact rowData={employees} columnDefs={columns} theme={agTheme} />`}</BLOCK>
          <p style={{ fontSize: '13px', color: '#9ca3af', marginTop: '10px', lineHeight: '1.6' }}>
            This is <strong style={{ color: '#ef4444' }}>the highest-risk failure point for AI code generation</strong>.
            AG Grid v33 (mid-2024) introduced a mandatory module registration system.
            Without it: the component mounts successfully, no console errors, no warnings —
            but the grid is completely empty. Any AI model trained on pre-v33 examples will generate
            code that silently fails.
          </p>
        </CARD>

        <CARD>
          <Label color="#2ecc71">Theming — cleaner API than MUI X</Label>
          <BLOCK>{`import { themeQuartz, colorSchemeDark } from 'ag-grid-community'

const agTheme = themeQuartz
  .withPart(colorSchemeDark)       // apply dark base
  .withParams({
    backgroundColor:       '#111111',
    headerBackgroundColor: '#1e293b',
    accentColor:           '#007FFF',
    fontFamily:            "'DM Sans', sans-serif",
    oddRowBackgroundColor: '#0d0d0d',
  })`}</BLOCK>
          <p style={{ fontSize: '13px', color: '#9ca3af', marginTop: '10px', lineHeight: '1.6' }}>
            The <CODE>themeQuartz.withParams()</CODE> API is explicit, typed, and requires zero knowledge
            of internal class names. Every parameter is a semantic token. Far more LLM-friendly than MUI's
            <CODE>styleOverrides</CODE> approach — but only available in v33+.
            Older theming guides (ag-theme-alpine CSS) are now outdated.
          </p>
        </CARD>

        <ul style={{ listStyle: 'none', padding: 0, marginTop: '4px' }}>
          <POINT icon="✅" color="#2ecc71">Sort, filter, resize enabled globally with one <CODE>defaultColDef</CODE></POINT>
          <POINT icon="✅" color="#2ecc71">Row virtualisation included in Community — MUI X requires Pro</POINT>
          <POINT icon="✅" color="#2ecc71">CSV export built-in, no custom toolbar needed</POINT>
          <POINT icon="⚠️" color="#f59e0b"><CODE>cellRenderer</CODE> instead of <CODE>renderCell</CODE> — different name than MUI X for same concept</POINT>
          <POINT icon="⚠️" color="#f59e0b">High stale-docs risk: v33 is a meaningful API break from all pre-2024 examples</POINT>
        </ul>
      </SECTION>

      {/* Comparison table */}
      <SECTION title="Head-to-head: AI installation difficulty">
        <div style={{ background: '#111111', border: '1px solid #1f1f1f', borderRadius: '10px', overflow: 'hidden', marginBottom: '8px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#0d0d0d' }}>
                {[
                  { label: 'Criterion', color: '#6b7280' },
                  { label: 'MUI X DataGrid', color: '#007FFF' },
                  { label: 'AG Grid Community', color: '#2ecc71' },
                  { label: 'Edge', color: '#6b7280' },
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
              {comparisonRows.map((row, i) => (
                <tr key={row.criterion} style={{ background: i % 2 === 0 ? '#111111' : '#0f0f0f' }}>
                  <td style={{ padding: '12px 18px', fontSize: '13px', color: '#d1d5db', borderBottom: '1px solid #1a1a1a', borderRight: '1px solid #1a1a1a', fontWeight: '500' }}>
                    {row.criterion}
                  </td>
                  <td style={{ padding: '12px 18px', fontSize: '12px', color: '#94a3b8', borderBottom: '1px solid #1a1a1a', borderRight: '1px solid #1a1a1a', fontFamily: "'JetBrains Mono', monospace" }}>
                    {row.mui}
                  </td>
                  <td style={{ padding: '12px 18px', fontSize: '12px', color: '#94a3b8', borderBottom: '1px solid #1a1a1a', borderRight: '1px solid #1a1a1a', fontFamily: "'JetBrains Mono', monospace" }}>
                    {row.ag}
                  </td>
                  <td style={{ padding: '12px 18px', fontSize: '12px', borderBottom: '1px solid #1a1a1a', textAlign: 'center' }}>
                    {row.winner === 'mui' && <span style={{ color: '#007FFF', fontWeight: '700', fontSize: '11px' }}>MUI X ●</span>}
                    {row.winner === 'ag'  && <span style={{ color: '#2ecc71', fontWeight: '700', fontSize: '11px' }}>AG Grid ●</span>}
                    {row.winner === 'draw' && <span style={{ color: '#6b7280', fontSize: '11px' }}>Draw</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TechLabel tags={['Custom HTML <table>', 'Inline styles']} />
      </SECTION>

      {/* Conclusion callout */}
      <div style={{
        background: '#0a1628', border: '1px solid #1e3a5f',
        borderLeft: '4px solid #007FFF', borderRadius: '8px',
        padding: '22px 26px',
      }}>
        <div style={{ fontSize: '11px', fontWeight: '700', color: '#007FFF', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
          Key takeaway
        </div>
        <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '1.75', marginBottom: '12px' }}>
          Both libraries are AI-installable, but both have <strong style={{ color: '#f5f5f5' }}>version-sensitive failure modes</strong> that
          only manifest visually — not as build errors. The critical insight:{' '}
          <strong style={{ color: '#93c5fd' }}>an AI agent that can't render and screenshot the result
          cannot reliably validate either integration.</strong>
        </p>
        <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '1.75' }}>
          MUI X wins on <strong style={{ color: '#f5f5f5' }}>API stability and design system coherence</strong>.
          AG Grid wins on <strong style={{ color: '#f5f5f5' }}>install simplicity, theming clarity, and Community feature depth</strong>.
          The real MUI X advantage isn't the grid in isolation — it's not having to maintain
          two design systems simultaneously.
        </p>
      </div>
    </div>
  )
}
