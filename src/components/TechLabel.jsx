const TAG_COLORS = {
  mui: { bg: 'rgba(0,127,255,0.1)', border: 'rgba(0,127,255,0.3)', text: '#60a5fa' },
  react: { bg: 'rgba(97,218,251,0.08)', border: 'rgba(97,218,251,0.2)', text: '#67e8f9' },
  html: { bg: 'rgba(255,255,255,0.04)', border: '#2a2a2a', text: '#6b7280' },
  css: { bg: 'rgba(147,51,234,0.08)', border: 'rgba(147,51,234,0.2)', text: '#a78bfa' },
  router: { bg: 'rgba(234,88,12,0.08)', border: 'rgba(234,88,12,0.2)', text: '#fb923c' },
}

const TAG_PRESETS = {
  'MUI X — DataGrid':       { color: 'mui',    icon: '⬡' },
  'MUI X — GridToolbar':    { color: 'mui',    icon: '⬡' },
  '@mui/material — ThemeProvider': { color: 'mui', icon: '⬡' },
  'React Router — NavLink': { color: 'router', icon: '⇌' },
  'Custom HTML <table>':    { color: 'html',   icon: '▤' },
  'Custom HTML <nav>':      { color: 'html',   icon: '▤' },
  'Custom <div>':           { color: 'html',   icon: '▤' },
  'Custom <span>':          { color: 'html',   icon: '▤' },
  'CSS Grid':               { color: 'css',    icon: '⊞' },
  'Inline styles':          { color: 'css',    icon: '✦' },
  'React component':        { color: 'react',  icon: '⚛' },
}

function Tag({ label }) {
  const preset = TAG_PRESETS[label] || { color: 'html', icon: '·' }
  const c = TAG_COLORS[preset.color]
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '5px',
      padding: '2px 8px',
      borderRadius: '4px',
      background: c.bg,
      border: `1px solid ${c.border}`,
      fontSize: '10.5px',
      fontWeight: '500',
      color: c.text,
      fontFamily: "'JetBrains Mono', monospace",
      whiteSpace: 'nowrap',
      letterSpacing: '0.01em',
    }}>
      <span style={{ fontSize: '9px', opacity: 0.8 }}>{preset.icon}</span>
      {label}
    </span>
  )
}

export default function TechLabel({ tags, align = 'left' }) {
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '6px',
      marginTop: '8px',
      justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
    }}>
      {tags.map(tag => <Tag key={tag} label={tag} />)}
    </div>
  )
}
