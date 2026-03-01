import React, { useState } from "react"
import { useGlobalContext } from "../context/GlobalContext.jsx"

export default function Home() {
  const {
    settings,
    updateSetting,
    resetSettings,
    totalRemainingTaskMinutes,
    totalRemainingCookingMinutes,
    derivedShopping,
  } = useGlobalContext()

  const [showStatus, setShowStatus] = useState(false)

  const remainingPurchases = (derivedShopping || []).filter(i => !i.purchased).length

  const fmtMinutes = (m) => {
    if (!m) return "0 דק"
    const h = Math.floor(m / 60); const mm = m % 60
    return h ? `${h} ש׳ ${mm} דק` : `${mm} דק`
  }

  return (
    <div style={{ display: 'flex', gap: '40px', position: 'relative' }}>
      {/* Main Content */}
      <div style={{ flex: 1 }}>
        {/* Hero Section */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '20px',
          padding: '40px',
          color: 'white',
          marginBottom: '40px',
          boxShadow: 'var(--shadow-lg)',
          textAlign: 'center',
          animation: 'fadeIn 0.5s ease-out',
        }}>
          <h1 style={{
            fontSize: '3em',
            margin: '0 0 16px 0',
            color: 'white',
            WebkitTextFillColor: 'white',
          }}>
            ✨ שבת שלום!
          </h1>
          <p style={{
            fontSize: '1.2em',
            margin: 0,
            opacity: 0.95,
            fontWeight: 500,
          }}>
            עוזר תכנון שבת חכם ויעיל
          </p>
        </div>

        {/* Settings Section */}
        <div style={{
          background: 'var(--bg-card)',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid var(--border-accent)',
          animation: 'fadeIn 0.5s ease-out 0.2s both',
        }}>
          <h2 style={{
            marginTop: 0,
            marginBottom: '24px',
            color: 'var(--accent-teal)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            ⚙️ הגדרות שבת
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px',
            marginBottom: '24px',
          }}>
            <label style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}>
              <span style={{
                fontWeight: 600,
                color: 'var(--text-primary)',
                fontSize: '0.95em',
              }}>
                🕐 שעת כניסה
              </span>
              <input
                type="time"
                value={settings.startTime || ""}
                onChange={e => updateSetting({ startTime: e.target.value })}
              />
            </label>

            <label style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}>
              <span style={{
                fontWeight: 600,
                color: 'var(--text-primary)',
                fontSize: '0.95em',
              }}>
                📍 מיקום
              </span>
              <select
                value={settings.location}
                onChange={e => updateSetting({ location: e.target.value })}
              >
                <option value="home">🏠 בבית</option>
                <option value="travel">✈️ נוסעים</option>
              </select>
            </label>

            {settings.location === "home" && (
              <label style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}>
                <span style={{
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  fontSize: '0.95em',
                }}>
                  🍽️ כמות סעודות
                </span>
                <input
                  type="number"
                  min={0}
                  value={settings.mealsCount || 0}
                  onChange={e => updateSetting({ mealsCount: Number(e.target.value) })}
                />
              </label>
            )}

            {settings.location === "home" && (
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 0',
              }}>
                <input
                  type="checkbox"
                  checked={!!settings.hasGuests}
                  onChange={e => updateSetting({ hasGuests: e.target.checked })}
                />
                <span style={{
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  fontSize: '0.95em',
                  cursor: 'pointer',
                }}>
                  👥 יש אורחים
                </span>
              </label>
            )}
          </div>

          <button
            onClick={resetSettings}
            style={{
              background: 'var(--gradient-coral)',
              padding: '12px 24px',
              fontSize: '0.95em',
            }}
          >
            🔄 איפוס הגדרות
          </button>
        </div>
      </div>

      {/* Right Sidebar - Status */}
      <div 
        style={{
          position: 'sticky',
          top: '100px',
          height: 'fit-content',
          width: '300px',
        }}
        onMouseEnter={() => setShowStatus(true)}
        onMouseLeave={() => setShowStatus(false)}
      >
        <div style={{
          background: 'var(--bg-card)',
          borderRadius: '16px',
          border: '2px solid var(--accent-teal)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lg)',
          transition: 'all 0.3s ease',
          transform: showStatus ? 'scale(1)' : 'scale(0.95)',
          opacity: showStatus ? 1 : 0.85,
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '16px',
            color: 'white',
            fontWeight: 700,
            fontSize: '0.95em',
            textAlign: 'center',
            cursor: 'pointer',
          }}>
            📊 סטטוס מהיר
          </div>

          {/* Content */}
          <div style={{
            padding: '20px',
            display: showStatus ? 'block' : 'none',
            animation: showStatus ? 'slideInRight 0.3s ease-out' : 'none',
          }}>
            {/* Shopping Card */}
            <div style={{
              marginBottom: '16px',
              padding: '12px',
              background: 'rgba(0, 212, 255, 0.08)',
              borderRadius: '10px',
              borderRight: '3px solid var(--accent-teal)',
            }}>
              <p style={{
                margin: '0 0 8px 0',
                fontSize: '0.85em',
                color: 'var(--text-secondary)',
                fontWeight: 600,
              }}>
                🛒 קניות שנותרו
              </p>
              <p style={{
                margin: 0,
                fontSize: '2em',
                fontWeight: 700,
                color: 'var(--accent-teal)',
              }}>
                {remainingPurchases}
              </p>
            </div>

            {/* Tasks Card */}
            <div style={{
              marginBottom: '16px',
              padding: '12px',
              background: 'rgba(246, 160, 0, 0.08)',
              borderRadius: '10px',
              borderRight: '3px solid var(--accent-gold)',
            }}>
              <p style={{
                margin: '0 0 8px 0',
                fontSize: '0.85em',
                color: 'var(--text-secondary)',
                fontWeight: 600,
              }}>
                📋 משימות — זמן נותר
              </p>
              <p style={{
                margin: 0,
                fontSize: '1.6em',
                fontWeight: 700,
                color: 'var(--accent-gold)',
              }}>
                {fmtMinutes(totalRemainingTaskMinutes)}
              </p>
            </div>

            {/* Cooking Card */}
            <div style={{
              padding: '12px',
              background: 'rgba(0, 212, 170, 0.08)',
              borderRadius: '10px',
              borderRight: '3px solid var(--accent-mint)',
            }}>
              <p style={{
                margin: '0 0 8px 0',
                fontSize: '0.85em',
                color: 'var(--text-secondary)',
                fontWeight: 600,
              }}>
                🍽️ בישול — זמן נותר
              </p>
              <p style={{
                margin: 0,
                fontSize: '1.6em',
                fontWeight: 700,
                color: 'var(--accent-mint)',
              }}>
                {fmtMinutes(totalRemainingCookingMinutes)}
              </p>
            </div>
          </div>

          {/* Collapsed View */}
          {!showStatus && (
            <div style={{
              padding: '16px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '8px',
              textAlign: 'center',
            }}>
              <div>
                <p style={{
                  margin: '0 0 4px 0',
                  fontSize: '1.8em',
                  fontWeight: 700,
                  color: 'var(--accent-teal)',
                }}>
                  {remainingPurchases}
                </p>
                <p style={{
                  margin: 0,
                  fontSize: '0.7em',
                  color: 'var(--text-secondary)',
                }}>
                  קניות
                </p>
              </div>
              <div>
                <p style={{
                  margin: '0 0 4px 0',
                  fontSize: '1.3em',
                  fontWeight: 700,
                  color: 'var(--accent-gold)',
                }}>
                  {Math.floor(totalRemainingTaskMinutes / 60)}
                </p>
                <p style={{
                  margin: 0,
                  fontSize: '0.7em',
                  color: 'var(--text-secondary)',
                }}>
                  משימות
                </p>
              </div>
              <div>
                <p style={{
                  margin: '0 0 4px 0',
                  fontSize: '1.3em',
                  fontWeight: 700,
                  color: 'var(--accent-mint)',
                }}>
                  {Math.floor(totalRemainingCookingMinutes / 60)}
                </p>
                <p style={{
                  margin: 0,
                  fontSize: '0.7em',
                  color: 'var(--text-secondary)',
                }}>
                  בישול
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}