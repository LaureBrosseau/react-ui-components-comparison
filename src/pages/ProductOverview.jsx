const COLORS = {
  mui: '#007FFF',
  ag: '#2ecc71',
  bryntum: '#e67e22',
  inhouse: '#6b7280',
}

const PRODUCTS = ['MUI X', 'AG Grid', 'Bryntum', 'Build in-house']
const PRODUCT_KEYS = ['mui', 'ag', 'bryntum', 'inhouse']

const rows = [
  {
    label: 'Tagline',
    mono: true,
    values: [
      '"Performant advanced components for complex use cases"',
      '"The best JavaScript Data Grid in the world"',
      '"The most reliable Web Components suite for Project Planning & Resource Management"',
      '"Full control, full responsibility"',
    ],
  },
  {
    label: 'Strategic Angle',
    values: ['UI Platform', 'Best-in-class grid', 'Scheduling specialist', 'Bespoke control'],
  },
  {
    label: 'Open Source',
    values: [
      '✅ Core MIT (open-core)',
      '✅ Community MIT (Enterprise paid)',
      '❌ 100% proprietary',
      '✅ You own the code',
    ],
  },
  {
    label: 'Pricing',
    mono: true,
    values: [
      'Free tier / Pro $299/dev/yr / Premium $599/dev/yr / Enterprise $1,399/dev/yr (15 seats min)',
      'Free Community / Enterprise $999/dev (perpetual) / Bundle with Charts $1,498/dev',
      'No free tier / Small team (3+ devs) $680/dev / Large team (10+ devs) $600/dev / SaaS: contact',
      '$0 license — hidden cost: dev time + maintenance',
    ],
  },
  {
    label: 'SaaS / Commercial Use',
    values: [
      '✅ Included in all plans',
      '✅ Included in Enterprise',
      '⚠️ Separate OEM license required (contact sales)',
      '✅ No restriction',
    ],
  },
  {
    label: 'Target Personas',
    values: [
      'Frontend devs → Tech Lead → CTO (multi-product orgs)',
      'Frontend devs → VP Engineering (data-heavy apps)',
      'Frontend devs → CPO (planning/scheduling tools)',
      'CTO / VP Engineering',
    ],
  },
  {
    label: 'Ideal Use Cases',
    values: [
      'Dashboards, SaaS B2B, CRUD apps, multi-team design systems',
      'Trading platforms, analytics, massive datasets, pivot tables',
      'Gantt charts, resource scheduling, ERP planning modules',
      'When UI component IS the core product differentiator',
    ],
  },
  {
    label: 'Wins when',
    values: [
      'Existing MUI stack, multi-team standardization, TCO matters',
      'Raw performance, pivoting, 100k+ rows client-side',
      'Scheduling is core to the product, not just a feature',
      'Truly unique interaction model, no market alternative',
    ],
  },
  {
    label: 'Loses when',
    values: [
      'Massive datasets, most advanced grid-specific features needed',
      'Design system coherence matters, platform approach preferred',
      'Use case is generic (CRUD/dashboard) or SaaS (OEM friction)',
      'Real cost underestimated, time-to-market missed',
    ],
  },
  {
    label: 'Notable Customers',
    values: [
      'Tesla, Apple, Southwest Airlines, Siemens, Volvo, Deloitte',
      'Financial services, trading desks (performance-critical apps)',
      'Ferrari, Red Bull, HSBC, IMAX (5,000+ customers, 80+ countries)',
      'N/A',
    ],
  },
]

function Cell({ value, mono, color }) {
  const isCheck = value.startsWith('✅')
  const isWarning = value.startsWith('⚠️')
  const isCross = value.startsWith('❌')

  return (
    <td style={{
      padding: '14px 18px',
      fontSize: mono ? '11.5px' : '13px',
      lineHeight: '1.6',
      color: isCross ? '#ef4444' : isWarning ? '#f59e0b' : '#d1d5db',
      fontFamily: mono ? "'JetBrains Mono', monospace" : "'DM Sans', sans-serif",
      borderBottom: '1px solid #1a1a1a',
      borderRight: '1px solid #1a1a1a',
      verticalAlign: 'top',
    }}>
      {value}
    </td>
  )
}

export default function ProductOverview() {
  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 24px 60px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{
          fontSize: '22px',
          fontWeight: '600',
          color: '#f5f5f5',
          marginBottom: '8px',
          letterSpacing: '-0.02em',
        }}>
          Product Overview
        </h1>
        <p style={{ fontSize: '14px', color: '#6b7280' }}>
          Side-by-side competitive comparison across 10 dimensions
        </p>
      </div>

      <div style={{
        background: '#111111',
        border: '1px solid #1f1f1f',
        borderRadius: '10px',
        overflow: 'hidden',
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '900px' }}>
            <thead>
              <tr style={{ background: '#0d0d0d' }}>
                <th style={{
                  padding: '14px 18px',
                  textAlign: 'left',
                  fontSize: '11px',
                  fontWeight: '600',
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  borderBottom: '1px solid #1f1f1f',
                  borderRight: '1px solid #1a1a1a',
                  width: '160px',
                }}>
                  Dimension
                </th>
                {PRODUCTS.map((name, i) => (
                  <th key={name} style={{
                    padding: '14px 18px',
                    textAlign: 'left',
                    fontSize: '13px',
                    fontWeight: '700',
                    color: Object.values(COLORS)[i],
                    borderBottom: '1px solid #1f1f1f',
                    borderRight: i < 3 ? '1px solid #1a1a1a' : 'none',
                    letterSpacing: '-0.01em',
                  }}>
                    <span style={{
                      display: 'inline-block',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: Object.values(COLORS)[i],
                      marginRight: '8px',
                      verticalAlign: 'middle',
                    }} />
                    {name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={row.label} style={{
                  background: ri % 2 === 0 ? '#111111' : '#0f0f0f',
                  transition: 'background 100ms',
                }}>
                  <td style={{
                    padding: '14px 18px',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#9ca3af',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    borderBottom: '1px solid #1a1a1a',
                    borderRight: '1px solid #1a1a1a',
                    verticalAlign: 'top',
                    whiteSpace: 'nowrap',
                  }}>
                    {row.label}
                  </td>
                  {row.values.map((val, i) => (
                    <Cell
                      key={i}
                      value={val}
                      mono={row.mono}
                      color={Object.values(COLORS)[i]}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PMM Insight callout */}
      <div style={{
        marginTop: '24px',
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
            MUI X is not competing on grid features alone — it's competing on <strong style={{ color: '#f5f5f5' }}>platform coherence</strong>. The real buying decision is:{' '}
            <em style={{ color: '#93c5fd' }}>best-of-breed component vs. integrated UI platform</em>.
          </p>
        </div>
      </div>
    </div>
  )
}
