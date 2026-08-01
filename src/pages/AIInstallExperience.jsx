import TechLabel from '../components/TechLabel'
import { DataGrid } from '@mui/x-data-grid'

const SECTION = ({ title, children }) => (
  <div style={{ marginBottom: '40px' }}>
    <h2 style={{
      fontSize: '16px', fontWeight: '700', color: '#111827',
      letterSpacing: '-0.01em', marginBottom: '16px',
      paddingBottom: '10px', borderBottom: '1px solid #e5e7eb',
    }}>
      {title}
    </h2>
    {children}
  </div>
)

const CARD = ({ children, accent }) => (
  <div style={{
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    borderLeft: accent ? `3px solid ${accent}` : '1px solid #e5e7eb',
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
    background: `${color}12`,
    border: `1px solid ${color}30`,
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
    background: '#f1f5f9',
    border: '1px solid #e2e8f0',
    borderRadius: '4px',
    padding: '1px 6px',
    color: '#334155',
  }}>
    {children}
  </code>
)

const BLOCK = ({ children }) => (
  <pre style={{
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '12px',
    background: '#f8fafc',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    padding: '14px 18px',
    color: '#334155',
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
    fontSize: '13px', color: '#374151', lineHeight: '1.6', marginBottom: '8px',
  }}>
    <span style={{ color, flexShrink: 0, fontWeight: '700', marginTop: '1px' }}>{icon}</span>
    <span>{children}</span>
  </li>
)

const comparisonRows = [
  { criterion: 'Packages to install',       mui: '4 (incl. peer deps)',         ag: '2',                           winner: 'ag' },
  { criterion: 'Silent install trap',        mui: 'Missing peer deps (fixed in docs, AI training lag)', ag: 'ModuleRegistry (v33+) — silent unless ValidationModule enabled', winner: 'draw' },
  { criterion: 'API legibility for LLMs',    mui: '✅ Very readable',            ag: '✅ Readable',                 winner: 'mui' },
  { criterion: 'Theming without internals',  mui: '⚠️ Semantic tokens in v8+ — edge cases remain', ag: '✅ withParams() API', winner: 'draw' },
  { criterion: 'Risk of stale AI docs',      mui: 'Low — stable API',            ag: 'High — v33 breaking change',  winner: 'mui' },
  { criterion: 'Visual debug needed',        mui: 'Yes (dark mode classes)',      ag: 'Yes (empty grid, no error)',  winner: 'draw' },
  { criterion: 'Community features (free)',  mui: 'Basic',                       ag: 'Virtualisation, filters…',    winner: 'ag' },
  { criterion: 'Design system integration',  mui: '✅ Native MUI theme',        ag: '❌ Manual',                   winner: 'mui' },
]

export default function AIInstallExperience() {
  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 24px 80px' }}>
      
      {/* Header — Context card, same design as the homepage Foreword */}
          <section style={{
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '10px',
            padding: '28px 32px',
            marginBottom: '40px',
            boxShadow: '0 10px 30px rgba(17, 24, 39, 0.04)',
          }}>
            <p style={{
              fontSize: '11px',
              fontWeight: '700',
              color: '#007FFF',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '10px',
            }}>
              AI Developer Experience Report
            </p>
            <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#111827', marginBottom: '18px', letterSpacing: '-0.02em', lineHeight: '1.3' }}>
              AI Integration Experience: MUI X vs AG Grid<br />
              <span style={{ color: '#9ca3af', fontWeight: '400', fontSize: '18px' }}>What works, what breaks, and where AI struggles when integrating both libraries</span>
            </h1>
            <p style={{ fontSize: '15px', color: '#374151', lineHeight: '1.75', marginBottom: '14px' }}>
              This page documents the real integration experience of MUI X and AG Grid from the perspective of an AI coding agent operating autonomously, without human debugging.
            </p>
            <p style={{ fontSize: '15px', color: '#374151', lineHeight: '1.75' }}>
              Every friction point highlighted here reflects an actual failure mode encountered during implementation.
            </p>
          </section>
      
      {/* MUI X Section */}
      <SECTION title="MUI X Data Grid: Integration Experience">

        <CARD accent="#007FFF">
          <Label color="#007FFF">Install command</Label>
          <BLOCK>npm install @mui/x-data-grid @mui/material @emotion/react @emotion/styled</BLOCK>
          <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '10px', lineHeight: '1.6' }}>
            <strong style={{ color: '#111827' }}>4 packages, not 1.</strong>{' '}
            <CODE>@mui/x-data-grid</CODE> alone causes silent runtime failures.<br />
            The peer dependencies on <CODE>@emotion/react</CODE> and <CODE>@emotion/styled</CODE> are
            not always obvious from the package name. <br />A model relying on outdated docs may install only the grid
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
          <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '10px', lineHeight: '1.6' }}>
            The prop-based API is very LLM-friendly, most props are self-documenting.<br />
            The <CODE>slots</CODE> pattern for toolbar customization was the one non-intuitive step in v6/v7 —
            requiring manual composition of <CODE>GridToolbarContainer</CODE> + <CODE>GridToolbarExport</CODE>.<br /><br />
            In v8/v9, this was redesigned: <CODE>showToolbar</CODE> is now a simple boolean prop, and custom
            toolbar props are handled cleanly via <CODE>slotProps</CODE> with TypeScript module augmentation.
            The friction observed during this integration reflects v6/v7 patterns —
            the current API is significantly improved.
          </p>
        </CARD>

        <CARD>
          <Label color="#d97706">Theming — the hardest part</Label>
          <BLOCK>{`// Requires knowing internal MUI class names:
'& .MuiDataGrid-columnHeaders':    { background: '#f8fafc' }
'& .MuiDataGrid-virtualScroller':  { background: '#ffffff' }
'& .MuiDataGrid-filler':           { background: '#ffffff' }
'& .MuiDataGrid-scrollbarFiller':  { background: '#ffffff' }
//                           ↑ without these, color flashes appear when scrolling`}</BLOCK>
          <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '10px', lineHeight: '1.6' }}>
            Basic theming (background, header, pinned columns) is handled via semantic tokens in{' '}
            <CODE>theme.palette.DataGrid</CODE> since v8 — <CODE>bg</CODE>, <CODE>headerBg</CODE>,{' '}
            <CODE>pinnedBg</CODE> — no internal class names needed for core colors.<br /><br />
            Advanced dark mode styling may still require targeting <CODE>MuiDataGrid-filler</CODE> and{' '}
            <CODE>MuiDataGrid-scrollbarFiller</CODE> for complete consistency —{' '}
            a visual bug only detectable by actually rendering the component.{' '}<br />
            <strong style={{ color: '#111827' }}>This is where a screenshot tool was critical</strong>:
            the build succeeds, no JS errors, but the UI is wrong.
          </p>
        </CARD>
<p><strong>Developer Experience Highlights</strong></p>
        <ul style={{ listStyle: 'none', padding: 0, marginTop: '4px' }}>
          <POINT icon="✅" color="#16a34a">Build passed on first attempt, no compilation errors</POINT>
          <POINT icon="✅" color="#16a34a"><CODE>getRowHeight={() => 'auto'}</CODE> makes cells adapt to multi-line content on Page 1</POINT>
          <POINT icon="⚠️" color="#d97706">No errors thrown when theming is misconfigured, purely visual, only catchable by rendering</POINT>
          <POINT icon="✅" color="#16a34a"><CODE>hideFooter</CODE> is a native boolean prop — available in all tiers, no CSS override needed</POINT>
        </ul>
      </SECTION>

      {/* AG Grid Section */}
      <SECTION title="AG Grid Community: Integration Experience">

        <CARD accent="#16a34a">
          <Label color="#16a34a">Install command</Label>
          <BLOCK>npm install ag-grid-react ag-grid-community</BLOCK>
          <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '10px', lineHeight: '1.6' }}>
            <strong style={{ color: '#111827' }}>2 packages, no hidden peer deps.</strong>{' '}<br/>
            Significantly simpler install surface. No emotion, no material dependency.
          </p>
        </CARD>

        <CARD>
          <Label color="#dc2626">The critical silent trap — ModuleRegistry</Label>
          <BLOCK>{`// v33+ REQUIRED — without this, the grid renders empty with no error:
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
ModuleRegistry.registerModules([AllCommunityModule])

// Then in the component:
<AgGridReact rowData={employees} columnDefs={columns} theme={agTheme} />`}</BLOCK>
          <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '10px', lineHeight: '1.6' }}>
            This is <strong style={{ color: '#dc2626' }}>the highest-risk failure point for AI code generation</strong>.<br/>
            AG Grid v33 (mid-2024) introduced a mandatory module registration system.<br/>
            Without it: the component mounts successfully and the grid is completely empty.
            No errors are thrown unless <CODE>ValidationModule</CODE> is explicitly included in the dev build — which is not the default.<br/><br/>
            AG Grid provides a <CODE>ValidationModule</CODE> that, when included in development builds,
            logs clear error messages for missing modules. Without it, the failure is completely silent.<br/><br/>
            Any AI agent trained on pre-v33 examples will generate code that fails silently in the same way.
          </p>
        </CARD>

        <CARD>
          <Label color="#16a34a">Theming — cleaner API than MUI X</Label>
          <BLOCK>{`import { themeQuartz, colorSchemeLight } from 'ag-grid-community'

const agTheme = themeQuartz
  .withPart(colorSchemeLight)       // apply light base
  .withParams({
    backgroundColor:       '#ffffff',
    headerBackgroundColor: '#f8fafc',
    accentColor:           '#007FFF',
    fontFamily:            "'DM Sans', sans-serif",
    oddRowBackgroundColor: '#f9fafb',
  })`}</BLOCK>
          <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '10px', lineHeight: '1.6' }}>
            The <CODE>themeQuartz.withParams()</CODE> API is explicit, typed, and requires zero knowledge
            of internal class names. <br/>Every parameter is a semantic token. Far more LLM-friendly than MUI's
            <CODE>styleOverrides</CODE> approach, but only available in v33+.<br/>
            Older theming guides (ag-theme-alpine CSS) are now outdated.
          </p>
        </CARD>
<p><strong>Developer Experience Highlights</strong></p>

        <ul style={{ listStyle: 'none', padding: 0, marginTop: '4px' }}>
          <POINT icon="✅" color="#16a34a">Sort, filter, resize enabled globally with one <CODE>defaultColDef</CODE></POINT>
          <POINT icon="✅" color="#16a34a">Row virtualisation included in Community, MUI X requires Pro</POINT>
          <POINT icon="✅" color="#16a34a">CSV export built-in, no custom toolbar needed</POINT>
          <POINT icon="⚠️" color="#d97706"><CODE>cellRenderer</CODE> instead of <CODE>renderCell</CODE>, different name than MUI X for same concept</POINT>
          <POINT icon="⚠️" color="#d97706">High stale-docs risk: v33 is a meaningful API break from all pre-2024 examples</POINT>
        </ul>
      </SECTION>

      {/* Comparison table */}
      <SECTION title="AI Integration Comparison">
        <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '10px', overflow: 'hidden', marginBottom: '8px' }}>
          <DataGrid
            rows={comparisonRows.map((row, i) => ({ id: i, ...row }))}
            columns={[
              {
                field: 'criterion',
                headerName: 'Criterion',
                flex: 1.2,
                renderHeader: () => <span style={{ fontSize: '11px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Criterion</span>,
                renderCell: ({ value }) => <span style={{ fontSize: '13px', fontWeight: '500', color: '#374151' }}>{value}</span>,
              },
              {
                field: 'mui',
                headerName: 'MUI X DataGrid',
                flex: 1.3,
                renderHeader: () => <span style={{ fontSize: '11px', fontWeight: '700', color: '#007FFF', textTransform: 'uppercase', letterSpacing: '0.07em' }}>MUI X DataGrid</span>,
                renderCell: ({ value }) => <span style={{ fontSize: '12px', color: '#4b5563', fontFamily: "'JetBrains Mono', monospace" }}>{value}</span>,
              },
              {
                field: 'ag',
                headerName: 'AG Grid Community',
                flex: 1.3,
                renderHeader: () => <span style={{ fontSize: '11px', fontWeight: '700', color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.07em' }}>AG Grid Community</span>,
                renderCell: ({ value }) => <span style={{ fontSize: '12px', color: '#4b5563', fontFamily: "'JetBrains Mono', monospace" }}>{value}</span>,
              },
              {
                field: 'winner',
                headerName: 'Edge',
                flex: 0.6,
                align: 'center',
                headerAlign: 'center',
                renderHeader: () => <span style={{ fontSize: '11px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Edge</span>,
                renderCell: ({ value }) => (
                  value === 'mui'  ? <span style={{ color: '#007FFF', fontWeight: '700', fontSize: '11px' }}>MUI X ●</span> :
                  value === 'ag'   ? <span style={{ color: '#16a34a', fontWeight: '700', fontSize: '11px' }}>AG Grid ●</span> :
                  <span style={{ color: '#9ca3af', fontSize: '11px' }}>Draw</span>
                ),
              },
            ]}
            hideFooter
            disableRowSelectionOnClick
            getRowHeight={() => 'auto'}
            sx={{
              border: 'none',
              '& .MuiDataGrid-columnHeaders': { background: '#f8fafc' },
              '& .MuiDataGrid-columnSeparator': { display: 'none' },
              '& .MuiDataGrid-cell': { borderColor: '#f0f0f0', py: '10px' },
              '& .MuiDataGrid-row:nth-of-type(odd)': { background: '#ffffff' },
              '& .MuiDataGrid-row:nth-of-type(even)': { background: '#f9fafb' },
              '& .MuiDataGrid-virtualScroller': { background: '#ffffff' },
              '& .MuiDataGrid-filler': { background: '#ffffff' },
            }}
          />
        </div>
        <TechLabel tags={['MUI X — DataGrid']} />
      </SECTION>

      {/* Competitive narrative section */}
      <SECTION title="The competitive narrative exists — but isn't surfaced where it matters most">

        <CARD accent="#007FFF">
          <Label color="#007FFF">Observation</Label>
          <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.75' }}>
            The MUI X Data Grid Overview page already includes a direct comparison with AG Grid —
            React-first design, Material UI integration, component composition.
            The differentiation argument exists and is well-framed.<br /><br />
            However, two gaps remain:<br /><br />
            <strong style={{ color: '#111827' }}>First</strong>, the comparison lives on the Overview page —
            not on the Quickstart page where most developers land first.
            A developer evaluating options may never see it.<br /><br />
            <strong style={{ color: '#111827' }}>Second</strong>, one factual gap stands out: AG Grid Community
            now includes row virtualisation — a feature MUI X reserves for its Pro tier.
            This difference is not addressed anywhere in the MUI X documentation,
            and is the most common objection a developer will raise when comparing the free tiers.
          </p>
        </CARD>

        <CARD>
          <Label color="#6b7280">External validation</Label>
          <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.75' }}>
            Independent sources confirm this positioning.{' '}
            <a href="https://www.infragistics.com/blogs/best-react-data-grid" target="_blank" rel="noopener noreferrer" style={{ color: '#007FFF' }}>
              Infragistics (Feb 2026)
            </a>{' '}
            notes that MUI X is best suited for developers already using MUI who need seamless grid
            integration — echoing exactly the argument MUI makes on its own Overview page.<br /><br />
            The differentiation argument is consistent across sources.
            The opportunity is to make it more visible at the moments that matter most in the evaluation journey.
          </p>
        </CARD>

        <CARD accent="#16a34a">
          <Label color="#16a34a">PMM recommendation</Label>
          <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.75', marginBottom: '10px' }}>
            Two concrete actions would close this gap:
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <POINT icon="1." color="#007FFF">
              Add a <strong style={{ color: '#111827' }}>"Choosing MUI X" callout to the Quickstart page</strong> —
              one short paragraph that frames the integration advantage for teams already on Material UI.
              Not a feature list — a positioning statement.
              The Overview page already has the argument; the Quickstart page is where the audience is.
            </POINT>
            <POINT icon="2." color="#007FFF">
              <strong style={{ color: '#111827' }}>Address the row virtualisation gap directly</strong> —
              either in the Community vs Pro comparison, or in a "Why MUI X?" FAQ entry.
              Acknowledging that AG Grid Community includes virtualisation, and explaining why MUI X Pro
              is still the right choice for most Material UI teams, is more credible than silence on the topic.
            </POINT>
          </ul>
        </CARD>

      </SECTION>

      {/* Conclusion callout */}
      <div style={{
        background: '#eff6ff', border: '1px solid #bfdbfe',
        borderLeft: '4px solid #007FFF', borderRadius: '8px',
        padding: '22px 26px',
      }}>
        <div style={{ fontSize: '13px', fontWeight: '600', color: '#2563eb', marginBottom: '8px' }}>
          Key takeaway
          </div>
            <p style={{ fontSize: '14px', color: '#1e40af', lineHeight: '1.75', marginBottom: '12px' }}>
            Both libraries are AI-installable, but each has <strong style={{ color: '#1e3a8a' }}>version-sensitive failure modes</strong> that do not surface as build errors —
            MUI X peer dependencies (addressed in current docs but subject to AI training lag) and
            AG Grid v33 ModuleRegistry (silent without <strong style={{ color: '#1e3a8a' }}>ValidationModule</strong>).
            </p>
            <p style={{ fontSize: '14px', color: '#1e40af', lineHeight: '1.75', marginBottom: '12px' }}>
            The key limitation is that <strong style={{ color: '#1e3a8a' }}>an AI agent that cannot render and visually validate the result cannot reliably detect these issues.</strong>
            </p>
            <p style={{ fontSize: '14px', color: '#1e40af', lineHeight: '1.75', marginBottom: '16px' }}>
            MUI X stands out for <strong style={{ color: '#1e3a8a' }}>API stability, design system coherence, and a significantly improved theming API since v8</strong>.
            AG Grid stands out for <strong style={{ color: '#1e3a8a' }}>installation simplicity, feature depth in the Community tier, and explicit error guidance via ValidationModule</strong>.
            </p>
            <p style={{ fontSize: '15px', fontWeight: '600', color: '#1e3a8a' }}>
            The main challenge for an AI agent is not generating code — it's validating what the user actually sees.
            </p>
          </div>
        </div>
  )
}
