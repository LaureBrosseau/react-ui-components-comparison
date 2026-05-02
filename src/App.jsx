import { BrowserRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ProductOverview from './pages/ProductOverview'
import PositioningMessaging from './pages/PositioningMessaging'
import MUIXDemo from './pages/MUIXDemo'

function Nav() {
  return (
    <nav style={{
      background: 'rgba(8,8,8,0.95)',
      borderBottom: '1px solid #1f1f1f',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backdropFilter: 'blur(12px)',
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '56px',
      }}>
        <span style={{
          fontSize: '13px',
          fontWeight: '600',
          color: '#f5f5f5',
          letterSpacing: '0.02em',
          whiteSpace: 'nowrap',
        }}>
          React Enterprise Components{' '}
          <span style={{ color: '#007FFF' }}>—</span>{' '}
          <span style={{ color: '#9ca3af', fontWeight: 400 }}>Competitive Analysis</span>
        </span>

        <div style={{ display: 'flex', gap: '4px' }}>
          {[
            { to: '/', label: 'Product Overview' },
            { to: '/positioning', label: 'Positioning & Messaging' },
            { to: '/demo', label: 'MUI X Live Demo' },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              style={({ isActive }) => ({
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: '500',
                textDecoration: 'none',
                color: isActive ? '#f5f5f5' : '#9ca3af',
                background: isActive ? '#1a1a1a' : 'transparent',
                border: isActive ? '1px solid #2a2a2a' : '1px solid transparent',
                transition: 'all 150ms ease',
              })}
            >
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}

function PageWrapper({ children }) {
  const [visible, setVisible] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setVisible(false)
    const t = setTimeout(() => setVisible(true), 30)
    return () => clearTimeout(t)
  }, [location.pathname])

  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(6px)',
      transition: 'opacity 200ms ease, transform 200ms ease',
      minHeight: 'calc(100vh - 56px)',
    }}>
      {children}
    </div>
  )
}

function Inner() {
  return (
    <>
      <Nav />
      <PageWrapper>
        <Routes>
          <Route path="/" element={<ProductOverview />} />
          <Route path="/positioning" element={<PositioningMessaging />} />
          <Route path="/demo" element={<MUIXDemo />} />
        </Routes>
      </PageWrapper>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Inner />
    </BrowserRouter>
  )
}
