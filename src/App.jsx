import { BrowserRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ProductOverview from './pages/ProductOverview'
import PositioningMessaging from './pages/PositioningMessaging'
import MUIXDemo from './pages/MUIXDemo'
import AIInstallExperience from './pages/AIInstallExperience'
import PMMAnalysis from './pages/PMMAnalysis'

function Nav() {
  return (
    <>
    <nav style={{
      background: 'rgba(255,255,255,0.95)',
      borderBottom: '1px solid #e5e7eb',
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', whiteSpace: 'nowrap' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="2" width="10" height="6" rx="2" fill="#007FFF"/>
            <rect x="14" y="2" width="8" height="6" rx="2" fill="#007FFF" opacity="0.5"/>
            <rect x="2" y="10" width="6" height="6" rx="2" fill="#007FFF" opacity="0.5"/>
            <rect x="10" y="10" width="12" height="6" rx="2" fill="#007FFF"/>
            <rect x="2" y="18" width="14" height="4" rx="2" fill="#007FFF" opacity="0.3"/>
            <rect x="18" y="18" width="4" height="4" rx="2" fill="#007FFF" opacity="0.6"/>
          </svg>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontSize: '17px', fontWeight: '600', color: '#111827', fontFamily: "'DM Sans', sans-serif" }}>
              React UI Landscape
            </span>
            <span style={{ fontSize: '17px', color: '#9ca3af', fontWeight: '400', fontFamily: "'DM Sans', sans-serif" }}>
              — A PMM Perspective
            </span>
          </span>
        </div>

        <div style={{ display: 'flex', gap: '4px' }}>
          {[
            { to: '/', label: 'Company Overview' },
            { to: '/positioning', label: 'Positioning & Messaging' },
            { to: '/demo', label: 'Live Demo' },
            { to: '/pmm', label: 'PMM Analysis' },
            { to: '/ai-install', label: 'AI Developer Experience' },
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
                color: isActive ? '#111827' : '#6b7280',
                background: isActive ? '#f3f4f6' : 'transparent',
                border: isActive ? '1px solid #e5e7eb' : '1px solid transparent',
                transition: 'all 150ms ease',
              })}
            >
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
    </>
  )
}

function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid #e5e7eb',
      background: '#ffffff',
      padding: '24px',
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '8px',
      }}>
        <span style={{ fontSize: '14px', color: '#9ca3af', fontFamily: "'DM Sans', sans-serif" }}>
          © 2026 Laure Brosseau — Product Marketing Analysis
        </span>
        <a
          href="https://www.linkedin.com/in/laurebrosseau/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: '14px',
            color: '#007FFF',
            fontFamily: "'DM Sans', sans-serif",
            textDecoration: 'none',
            fontWeight: '500',
          }}
          onMouseEnter={e => e.target.style.textDecoration = 'underline'}
          onMouseLeave={e => e.target.style.textDecoration = 'none'}
        >
          LinkedIn ↗
        </a>
      </div>
    </footer>
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
      flex: 1,
    }}>
      {children}
    </div>
  )
}

function Inner() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Nav />
      <PageWrapper>
        <Routes>
          <Route path="/" element={<ProductOverview />} />
          <Route path="/positioning" element={<PositioningMessaging />} />
          <Route path="/demo" element={<MUIXDemo />} />
          <Route path="/pmm" element={<PMMAnalysis />} />
          <Route path="/ai-install" element={<AIInstallExperience />} />
        </Routes>
      </PageWrapper>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Inner />
    </BrowserRouter>
  )
}
