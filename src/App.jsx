import React from "react"
import { Routes, Route, Link, useLocation } from "react-router-dom"
import Home from "./Home/Home.jsx"
import ShoppingList from "./ShoppingList/ShoppingList.jsx"
import HomeTasks from "./HomeTasks/HomeTasks.jsx"
import Cooking from "./Cooking/Cooking.jsx"
import AddCooking from "./Cooking/AddCooking.jsx"

const navItems = [
  { path: '/', label: 'בית', icon: '🏡' },
  { path: '/shopping', label: 'קניות', icon: '🛍️' },
  { path: '/tasks', label: 'משימות', icon: '📋' },
  { path: '/cooking', label: 'בישול', icon: '🍽️' },
  { path: '/cooking/add', label: 'הוסף בישול', icon: '➕' },
]

export default function App() {
  const location = useLocation()

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0f0f0f' }}>
      {/* Header Navigation */}
      <header style={{
        background: '#1a1a1a',
        borderBottom: '2px solid #333333',
        padding: '0',
        boxShadow: 'var(--shadow-lg)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '16px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
        }}>
          <h1 style={{
            fontSize: '1.8em',
            margin: 0,
            background: 'linear-gradient(135deg, #667eea 0%, #00d4ff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.5px',
          }}>
            ✨ שבת מנוהלת
          </h1>
          
          <nav style={{
            display: 'flex',
            gap: '4px',
            flexWrap: 'wrap',
          }}>
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  padding: '10px 16px',
                  borderRadius: '8px',
                  color: location.pathname === item.path ? '#00d4ff' : '#b0b0b0',
                  textDecoration: 'none',
                  fontWeight: location.pathname === item.path ? '700' : '500',
                  fontSize: '0.95em',
                  background: location.pathname === item.path 
                    ? 'rgba(0, 212, 255, 0.1)' 
                    : 'transparent',
                  transition: 'all 0.3s ease',
                  borderBottom: location.pathname === item.path 
                    ? '2px solid #00d4ff' 
                    : '2px solid transparent',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => {
                  if (location.pathname !== item.path) {
                    e.target.style.color = '#00d4ff'
                    e.target.style.background = 'rgba(0, 212, 255, 0.05)'
                  }
                }}
                onMouseLeave={e => {
                  if (location.pathname !== item.path) {
                    e.target.style.color = '#b0b0b0'
                    e.target.style.background = 'transparent'
                  }
                }}
              >
                <span style={{ marginRight: '6px' }}>{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        flex: 1,
        padding: '32px 16px',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
      }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shopping" element={<ShoppingList />} />
          <Route path="/tasks" element={<HomeTasks />} />
          <Route path="/cooking" element={<Cooking />} />
          <Route path="/cooking/add" element={<AddCooking />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer style={{
        background: '#1a1a1a',
        borderTop: '2px solid #333333',
        color: '#b0b0b0',
        textAlign: 'center',
        padding: '24px',
        marginTop: '40px',
      }}>
        <p style={{ margin: '0 0 8px 0', fontSize: '0.95em' }}>
          ✨ שבת שלום ✨
        </p>
        <p style={{ margin: 0, fontSize: '0.85em', opacity: 0.8 }}>
          1.0 | עוזר תכנון שבת חכם
        </p>
      </footer>
    </div>
  )
}