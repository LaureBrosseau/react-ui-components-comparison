import TechLabel from '../components/TechLabel'

const COLORS = {
  mui: '#007FFF',
  ag: '#2ecc71',
  bryntum: '#e67e22',
  inhouse: '#ec4899',
}

const cards = [
  {
    key: 'mui',
    name: 'MUI X',
    color: COLORS.mui,
    tagline: '"Performant advanced components for complex use cases"',
    audience: 'React developers and their managers in multi-product orgs',
    valueProp: 'The only advanced component suite that integrates natively with the world\'s most-used React UI library. One API, one theme, one team.',
    howWin: '"You\'re already on Material UI — MUI X is the natural upgrade path. No new design system to learn."',
    gap: 'Messaging is dev-first, not yet CTO-first. Enterprise value (TCO, governance, support SLA) is undersold.',
  },
  {
    key: 'ag',
    name: 'AG Grid',
    color: COLORS.ag,
    tagline: '"The best JavaScript Data Grid in the world"',
    audience: 'Frontend engineers working on data-intensive applications',
    valueProp: 'The most feature-complete, highest-performance data grid available. Used by the most demanding teams in finance, analytics, and enterprise software.',
    howWin: '"Nothing else handles 100k+ rows, pivoting, and Excel export with this level of performance."',
    gap: '$999/dev entry price is a significant barrier. No platform story — pure point solution. Locks you into a vendor for a single component.',
  },
  {
    key: 'bryntum',
    name: 'Bryntum',
    color: COLORS.bryntum,
    tagline: '"The most reliable Web Components suite for Project Planning & Resource Management"',
    audience: 'ISVs and Enterprise teams building scheduling/planning tools',
    valueProp: 'The only complete, production-ready suite for Gantt, scheduling, and resource management — with commercial support and 5,000+ enterprise customers.',
    howWin: '"If scheduling is core to your product, you can\'t realistically build this yourself."',
    gap: '100% proprietary with no free tier creates adoption friction. SaaS builders face additional OEM licensing complexity. Niche positioning limits broader market appeal.',
  },
  {
    key: 'inhouse',
    name: 'Build in-house',
    color: COLORS.inhouse,
    tagline: '"Full control, full responsibility"',
    audience: 'CTOs who believe their use case is unique',
    valueProp: 'No vendor dependency, no licensing cost, complete control over UX and roadmap.',
    howWin: '"Our data model is too specific for any off-the-shelf solution. We need full ownership."',
    gap: 'Massively underestimates true cost. See the Build vs Buy analysis below.',
  },
]

const thinkItems = [
  { icon: '⏱', text: 'Initial build: 2–4 weeks' },
  { icon: '🎨', text: '"We can do it exactly how we want"' },
  { icon: '💰', text: 'No license fees' },
  { icon: '🔑', text: 'Full ownership of the codebase' },
  { icon: '🔓', text: 'No external dependency' },
]

const realItems = [
  { icon: '📅', text: 'Initial build (production-grade): 3–6 months' },
  { icon: '♿', text: 'Accessibility compliance (WCAG): +4–8 weeks' },
  { icon: '🌐', text: 'Cross-browser + device testing: ongoing' },
  { icon: '⚡', text: 'Performance optimization for large datasets: specialist required' },
  { icon: '🔧', text: 'Ongoing maintenance as product evolves: 0.5–1 FTE/year' },
  { icon: '🚫', text: 'No community, no roadmap, no dedicated support' },
  { icon: '💸', text: 'Opportunity cost: what else could those engineers have shipped?' },
]

function PositioningCard({ card }) {
  return (
    <div style={{
      background: '#111111',
      border: '1px solid #1f1f1f',
      borderRadius: '10px',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{
          width: '10px', height: '10px',
          borderRadius: '50%',
          background: card.color,
          flexShrink: 0,
        }} />
        <h3 style={{ fontSize: '15px', fontWeight: '700', color: card.color, letterSpacing: '-0.01em' }}>
          {card.name}
        </h3>
      </div>

      <p style={{
        fontSize: '12px',
        fontStyle: 'italic',
        color: '#9ca3af',
        fontFamily: "'JetBrains Mono', monospace",
        lineHeight: '1.5',
        paddingBottom: '12px',
        borderBottom: '1px solid #1a1a1a',
      }}>
        {card.tagline}
      </p>

      <FieldRow label="Primary audience" value={card.audience} />
      <FieldRow label="Core value proposition" value={card.valueProp} />
      <FieldRow label="How they win deals" value={card.howWin} mono />

      <div style={{
        background: '#0d1117',
        border: '1px solid #2a1f1a',
        borderRadius: '6px',
        padding: '12px 14px',
        display: 'flex',
        gap: '10px',
        alignItems: 'flex-start',
      }}>
        <span style={{ fontSize: '14px', flexShrink: 0, marginTop: '1px' }}>⚠️</span>
        <div>
          <span style={{ fontSize: '10px', fontWeight: '700', color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '4px' }}>
            Messaging gap
          </span>
          <p style={{ fontSize: '12.5px', color: '#d1a060', lineHeight: '1.55' }}>{card.gap}</p>
        </div>
      </div>
    </div>
  )
}

function FieldRow({ label, value, mono }) {
  return (
    <div>
      <span style={{ fontSize: '10px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '4px' }}>
        {label}
      </span>
      <p style={{
        fontSize: mono ? '12px' : '13px',
        color: '#d1d5db',
        lineHeight: '1.6',
        fontFamily: mono ? "'JetBrains Mono', monospace" : "'DM Sans', sans-serif",
      }}>
        {value}
      </p>
    </div>
  )
}

function CostItem({ icon, text, variant }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      padding: '12px 16px',
      background: variant === 'real' ? '#0d1117' : '#0f0f0f',
      borderRadius: '6px',
      border: `1px solid ${variant === 'real' ? '#1e2a3a' : '#1a1a1a'}`,
    }}>
      <span style={{ fontSize: '18px', flexShrink: 0, lineHeight: '1.2' }}>{icon}</span>
      <span style={{
        fontSize: '13px',
        color: variant === 'real' ? '#94a3b8' : '#6b7280',
        lineHeight: '1.5',
        fontFamily: variant === 'real' ? "'JetBrains Mono', monospace" : "'DM Sans', sans-serif",
        fontSize: variant === 'real' ? '12.5px' : '13px',
      }}>{text}</span>
    </div>
  )
}

export default function PositioningMessaging() {
  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 24px 60px' }}>
      {/* Section 1 header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: '600', color: '#f5f5f5', marginBottom: '8px', letterSpacing: '-0.02em' }}>
          Positioning & Messaging
        </h1>
        <p style={{ fontSize: '14px', color: '#6b7280' }}>
          How each player positions itself — and the honest PMM assessment
        </p>
      </div>

      {/* 2x2 card grid */}
      <div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '16px',
        marginBottom: '8px',
      }}>
        {cards.map(card => (
          <PositioningCard key={card.key} card={card} />
        ))}
      </div>
      <TechLabel tags={['CSS Grid', 'React component', 'Inline styles']} />
      </div>
      <div style={{ marginBottom: '40px' }} />

      {/* Section 2: Build vs Buy */}
      <div style={{
        background: '#111111',
        border: '1px solid #1f1f1f',
        borderRadius: '10px',
        padding: '36px',
      }}>
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '700',
            color: '#f5f5f5',
            letterSpacing: '-0.02em',
            marginBottom: '8px',
          }}>
            Why "We'll Build It In-House" Is the Most Expensive Decision
          </h2>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>
            What teams think vs. what actually happens
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
          marginBottom: '28px',
        }}>
          {/* Left: what teams think */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '14px',
            }}>
              <span style={{
                padding: '4px 10px',
                background: '#1a1a1a',
                border: '1px solid #2a2a2a',
                borderRadius: '99px',
                fontSize: '11px',
                fontWeight: '600',
                color: '#9ca3af',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}>
                What teams think
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {thinkItems.map((item, i) => (
                <CostItem key={i} icon={item.icon} text={item.text} variant="think" />
              ))}
            </div>
          </div>

          {/* Right: real cost */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '14px',
            }}>
              <span style={{
                padding: '4px 10px',
                background: '#1a1520',
                border: '1px solid #ef4444',
                borderRadius: '99px',
                fontSize: '11px',
                fontWeight: '600',
                color: '#ef4444',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}>
                The real cost
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {realItems.map((item, i) => (
                <CostItem key={i} icon={item.icon} text={item.text} variant="real" />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom callout */}
        <div style={{
          background: '#0a1628',
          border: '1px solid #1e3a5f',
          borderLeft: '4px solid #007FFF',
          borderRadius: '8px',
          padding: '20px 24px',
          display: 'flex',
          gap: '14px',
          alignItems: 'flex-start',
        }}>
          <span style={{ fontSize: '20px', flexShrink: 0, marginTop: '2px' }}>💡</span>
          <p style={{ fontSize: '14px', color: '#93c5fd', lineHeight: '1.7' }}>
            <strong style={{ color: '#60a5fa', fontFamily: "'JetBrains Mono', monospace", fontSize: '13px' }}>
              MUI X Pro = $299/dev/year
            </strong>
            {' '}≈ 1.5 days of a senior developer's time. The break-even vs. building in-house is typically reached{' '}
            <strong style={{ color: '#f5f5f5' }}>within the first sprint</strong>.
            {' '}The question isn't{' '}
            <em>"can we build it?"</em> — it's{' '}
            <em style={{ color: '#f5f5f5' }}>"should we?"</em>
          </p>
        </div>
      </div>
      <TechLabel tags={['CSS Grid', 'Custom <div>', 'Inline styles']} />
    </div>
  )
}
