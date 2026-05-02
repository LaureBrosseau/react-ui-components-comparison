import { createTheme, ThemeProvider } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Alert from '@mui/material/Alert'
import Chip from '@mui/material/Chip'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Grid from '@mui/material/Grid'
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
    tagline: '"Advanced and powerful components for complex use cases"',
    strategicAngle: 'UI platform extension for React teams standardizing on Material UI',
    audience: 'React developers and their managers in multi-product orgs',
    valueProp: 'The only advanced component suite that integrates natively with the world\'s most-used React UI library. One API, one theme, one team.',
    howWin: '"You\'re already on Material UI, MUI X is the natural upgrade path. No new design system to learn."',
    gap: 'Messaging is dev-first, not yet CTO-first. Enterprise value (TCO, governance, support SLA) is undersold.',
  },
  {
    key: 'ag',
    name: 'AG Grid',
    color: COLORS.ag,
    tagline: '"The best Data Grid in the world"',
    strategicAngle: 'Specialized data grid for high-performance, data-intensive applications',
    audience: 'Frontend engineers working on data-intensive applications',
    valueProp: 'The most feature-complete, highest-performance data grid available. Used by the most demanding teams in finance, analytics, and enterprise software.',
    howWin: '"Nothing else handles 100k+ rows, pivoting, and Excel export with this level of performance."',
    gap: '$999/dev entry price is a significant barrier. No platform story, pure point solution. Locks you into a vendor for a single component.',
  },
  {
    key: 'bryntum',
    name: 'Bryntum',
    color: COLORS.bryntum,
    tagline: '"World Class Web Components"',
    strategicAngle: 'Scheduling & planning platform for complex enterprise applications',
    audience: 'ISVs and Enterprise teams building scheduling/planning tools',
    valueProp: 'The only complete, production-ready suite for Gantt, scheduling, and resource management, with commercial support and 5,000+ enterprise customers.',
    howWin: '"If scheduling is core to your product, you can\'t realistically build this yourself."',
    gap: '100% proprietary with no free tier creates adoption friction. SaaS builders face additional OEM licensing complexity. Recent PE acquisition (Adelis, June 2025) signals ambition, but also potential pricing pressure ahead.',
  },
  {
    key: 'inhouse',
    name: 'Build in-house',
    color: COLORS.inhouse,
    tagline: '"Full control, full responsibility"',
    strategicAngle: 'Build-for-control strategy when no existing solution fits product requirements',
    audience: 'CTOs who believe their use case is unique',
    valueProp: 'No vendor dependency, no licensing cost, complete control over UX and roadmap.',
    howWin: '"Our data model is too specific for any off-the-shelf solution. We need full ownership."',
    gap: 'Massively underestimates true cost. See the Build vs Buy analysis below.',
  },
]

const thinkItems = [
  { icon: '⏱', text: 'Initial build: 2–4 weeks' },
  { icon: '🎨', text: 'We can do it exactly how we want' },
  { icon: '💰', text: 'No license fees' },
  { icon: '🔑', text: 'Full ownership of the codebase' },
  { icon: '🔓', text: 'No external dependency' },
  { icon: '🧩', text: 'We only need a basic version to start' },
  { icon: '🚀', text: 'We can iterate quickly after launch' },
]

const realItems = [
  { icon: '📅', text: 'Initial build (production-grade): 3–6 months' },
  { icon: '♿', text: 'Accessibility and edge cases add complexity' },
  { icon: '💸', text: 'Engineering time outweighs license savings' },
  { icon: '🔧', text: 'Ongoing maintenance required' },
  { icon: '🚫', text: 'No community or support' },
  { icon: '⚡', text: 'Performance issues appear early' },
  { icon: '🌐', text: 'Cross-browser and device support slow down iteration' },
]

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#007FFF' },
    background: { paper: '#ffffff', default: '#f9fafb' },
  },
  typography: { fontFamily: "'DM Sans', sans-serif" },
})

function FieldRow({ label, value, mono }) {
  return (
    <div style={{ marginBottom: '12px' }}>
      <span style={{ fontSize: '10px', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '4px' }}>
        {label}
      </span>
      <p style={{
        fontSize: mono ? '12px' : '13px',
        color: '#374151',
        lineHeight: '1.6',
        margin: 0,
        fontFamily: mono ? "'JetBrains Mono', monospace" : "'DM Sans', sans-serif",
      }}>
        {value}
      </p>
    </div>
  )
}

function PositioningCard({ card }) {
  return (
    <Card sx={{
      background: `${card.color}06`,
      border: `1px solid ${card.color}30`,
      borderTop: `3px solid ${card.color}`,
      borderRadius: '10px',
      height: '100%',
      boxShadow: `0 2px 8px ${card.color}14, 0 1px 3px rgba(0,0,0,0.06)`,
      transition: 'box-shadow 200ms ease',
      '&:hover': {
        boxShadow: `0 4px 16px ${card.color}22, 0 2px 6px rgba(0,0,0,0.08)`,
      },
    }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '4px', p: 3 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: card.color, flexShrink: 0, display: 'inline-block' }} />
          <h3 style={{ fontSize: '15px', fontWeight: '700', color: card.color, letterSpacing: '-0.01em', margin: 0 }}>
            {card.name}
          </h3>
        </div>

        <p style={{
          fontSize: '12px',
          fontStyle: 'italic',
          color: '#6b7280',
          fontFamily: "'JetBrains Mono', monospace",
          lineHeight: '1.5',
          paddingBottom: '14px',
          borderBottom: `1px solid ${card.color}20`,
          margin: '0 0 12px 0',
        }}>
          {card.tagline}
        </p>

        {card.strategicAngle && (
          <FieldRow label="Strategic Angle" value={card.strategicAngle} />
        )}
        <FieldRow label="Primary audience" value={card.audience} />
        <FieldRow label="Core value proposition" value={card.valueProp} />
        <FieldRow label="How they win deals" value={card.howWin} mono />

        <Alert
          severity="warning"
          sx={{
            mt: 1,
            '& .MuiAlert-message': { fontSize: '12.5px', lineHeight: '1.55' },
          }}
        >
          <span style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '4px' }}>
            Messaging gap
          </span>
          {card.gap}
        </Alert>
      </CardContent>
    </Card>
  )
}

export default function PositioningMessaging() {
  return (
    <ThemeProvider theme={lightTheme}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 24px 60px' }}>
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: '600', color: '#111827', marginBottom: '8px', letterSpacing: '-0.02em' }}>
            Positioning & Messaging
          </h1>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>
            How each player positions itself, with a structured analysis of messaging strengths, gaps, and trade-offs.
          </p>
        </div>

        <div>
          <Grid container spacing={2} sx={{ mb: 1 }}>
            {cards.map(card => (
              <Grid key={card.key} size={6}>
                <PositioningCard card={card} />
              </Grid>
            ))}
          </Grid>
          <TechLabel tags={['MUI — Card', 'MUI — Alert', 'MUI — Grid', 'Inline styles']} />
        </div>

        <div style={{ marginBottom: '40px' }} />

        {/* Build vs Buy section */}
        <Card sx={{
          background: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '10px',
          boxShadow: 'none',
        }}>
          <CardContent sx={{ p: 4 }}>
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', letterSpacing: '-0.02em', marginBottom: '8px' }}>
                Build vs In-House: Perceived vs Actual Cost
              </h2>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                Why internal builds often look simpler upfront than they are in practice
              </p>
            </div>

            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid size={6}>
                <Chip
                  label="Perceived cost & effort"
                  size="small"
                  sx={{
                    mb: 2,
                    background: '#f3f4f6',
                    border: '1px solid #e5e7eb',
                    color: '#6b7280',
                    fontWeight: '600',
                    fontSize: '11px',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    borderRadius: '99px',
                  }}
                />
                <List dense disablePadding sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {thinkItems.map((item, i) => (
                    <ListItem
                      key={i}
                      sx={{
                        background: '#ffffff',
                        border: '1px solid #e5e7eb',
                        borderLeft: '3px solid #9ca3af',
                        borderRadius: '6px',
                        px: 2,
                        py: 1.25,
                        alignItems: 'flex-start',
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 36, mt: 0.25 }}>
                        <span style={{ fontSize: '18px', lineHeight: 1 }}>{item.icon}</span>
                      </ListItemIcon>
                      <ListItemText
                        primary={item.text}
                        slotProps={{ primary: { sx: { fontSize: '13px', color: '#374151', lineHeight: '1.5', fontFamily: "'DM Sans', sans-serif" } } }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Grid>

              <Grid size={6}>
                <Chip
                  label="Actual cost & complexity"
                  size="small"
                  sx={{
                    mb: 2,
                    background: '#fef2f2',
                    border: '1px solid #fca5a5',
                    color: '#dc2626',
                    fontWeight: '600',
                    fontSize: '11px',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    borderRadius: '99px',
                  }}
                />
                <List dense disablePadding sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {realItems.map((item, i) => (
                    <ListItem
                      key={i}
                      sx={{
                        background: '#ffffff',
                        border: '1px solid #e5e7eb',
                        borderLeft: '3px solid #dc2626',
                        borderRadius: '6px',
                        px: 2,
                        py: 1.25,
                        alignItems: 'flex-start',
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 36, mt: 0.25 }}>
                        <span style={{ fontSize: '18px', lineHeight: 1 }}>{item.icon}</span>
                      </ListItemIcon>
                      <ListItemText
                        primary={item.text}
                        slotProps={{ primary: { sx: { fontSize: '13px', color: '#7f1d1d', lineHeight: '1.5', fontFamily: "'DM Sans', sans-serif" } } }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>

            <Alert
              severity="info"
              sx={{ '& .MuiAlert-message': { fontSize: '14px', lineHeight: '1.7' } }}
            >
              <strong style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px' }}>
                MUI X Pro = $299/dev/year
              </strong>
              {' '}≈ 1.5 days of a senior developer's time. The break-even vs. building in-house is typically reached{' '}
              <strong>within the first sprint</strong>.<br />
                {' '}The question is never{' '}
              <strong>"can we build it?"</strong> it's always{' '}
              <strong>"what else could the team have shipped instead?"</strong>
            </Alert>
          </CardContent>
        </Card>
        <TechLabel tags={['MUI — Card', 'MUI — Chip', 'MUI — List', 'MUI — Alert', 'MUI — Grid']} />
      </div>
    </ThemeProvider>
  )
}
