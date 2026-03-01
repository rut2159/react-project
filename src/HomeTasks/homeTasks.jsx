import React from 'react'
import { useGlobalContext } from '../context/GlobalContext.jsx'

export default function HomeTasks() {
  const { derivedTasks, toggleTaskDone, totalRemainingTaskMinutes } = useGlobalContext()

  const completedCount = (derivedTasks || []).filter(t => t.done).length
  const totalCount = (derivedTasks || []).length
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  const fmtMinutes = (m) => {
    if (!m) return '0 דקות'
    const h = Math.floor(m / 60)
    const mm = m % 60
    return h ? `${h} ש׳ ${mm} דק` : `${mm} דק`
  }

  if (!derivedTasks || derivedTasks.length === 0) {
    return (
      <div>
        <div style={{
          background: 'linear-gradient(135deg, #f6a000 0%, #d89e00 100%)',
          borderRadius: '20px',
          padding: '40px',
          color: 'white',
          marginBottom: '40px',
          boxShadow: 'var(--shadow-lg)',
          textAlign: 'center',
        }}>
          <h1 style={{ fontSize: '3em', margin: 0, color: 'white', WebkitTextFillColor: 'white' }}>
            📋 משימות
          </h1>
        </div>
        <div style={{
          background: 'var(--bg-card)',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: 'var(--shadow-md)',
          textAlign: 'center',
          border: '1px solid var(--border-accent)',
        }}>
          <p style={{ fontSize: '1.2em', color: 'var(--text-secondary)', margin: '0 0 12px 0' }}>
            אין משימות להציג
          </p>
          <p style={{ fontSize: '0.95em', color: 'var(--text-secondary)', margin: 0 }}>
            כל משימות הבתים שלך ירופאים 🎉
          </p>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #f6a000 0%, #d89e00 100%)',
        borderRadius: '20px',
        padding: '40px',
        color: 'white',
        marginBottom: '40px',
        boxShadow: 'var(--shadow-lg)',
      }}>
        <h1 style={{
          fontSize: '3em',
          margin: '0 0 24px 0',
          color: 'white',
          WebkitTextFillColor: 'white',
        }}>
          📋 משימות
        </h1>
        
        {/* Progress Bar */}
        <div style={{ marginBottom: '12px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '8px',
            fontSize: '0.95em',
            fontWeight: 600,
          }}>
            <span>התקדמות משימות</span>
            <span>{completedCount} / {totalCount}</span>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.3)',
            borderRadius: '10px',
            height: '10px',
            overflow: 'hidden',
          }}>
            <div style={{
              background: 'white',
              height: '100%',
              width: `${progressPercent}%`,
              transition: 'width 0.3s ease',
            }} />
          </div>
        </div>
        <p style={{ margin: 0, opacity: 0.95 }}>
          {progressPercent === 100 ? '🎉 סיימת את כל המשימות!' : `${Math.round(100 - progressPercent)}% נותר`}
        </p>
      </div>

      {/* Tasks List */}
      <div style={{
        display: 'grid',
        gap: '12px',
        marginBottom: '20px',
      }}>
        {derivedTasks.map(t => (
          <div
            key={t.id}
            style={{
              background: 'white',
              borderRadius: '12px',
              padding: '16px',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              transition: 'all 0.3s ease',
              opacity: t.done ? 0.6 : 1,
              borderLeft: t.done ? '4px solid var(--success-color)' : '4px solid var(--warning-color)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = 'var(--shadow-md)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
            }}
          >
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              flex: 1,
              cursor: 'pointer',
            }}>
              <input
                type="checkbox"
                checked={!!t.done}
                onChange={() => toggleTaskDone(t.id)}
                style={{
                  width: '22px',
                  height: '22px',
                  cursor: 'pointer',
                  accentColor: 'var(--success-color)',
                }}
              />
              <div>
                <p style={{
                  margin: 0,
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  textDecoration: t.done ? 'line-through' : 'none',
                }}>
                  {t.title}
                </p>
                <p style={{
                  margin: '4px 0 0 0',
                  fontSize: '0.85em',
                  color: 'var(--text-secondary)',
                }}>
                  📅 {t.day}
                </p>
              </div>
            </label>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              <span style={{
                background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                color: 'white',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '0.85em',
                fontWeight: 600,
                whiteSpace: 'nowrap',
              }}>
                ⏱️ {t.durationMin || 0} דק
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div style={{
        background: 'var(--bg-card)',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: 'var(--shadow-md)',
        border: '1px solid var(--border-accent)',
      }}>
        <h3 style={{
          margin: '0 0 16px 0',
          color: 'var(--secondary-color)',
        }}>
          📊 סיכום משימות
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '16px',
        }}>
          <div style={{ textAlign: 'center', padding: '12px' }}>
            <p style={{ margin: '0 0 8px 0', fontSize: '0.95em', color: 'var(--text-secondary)' }}>
              סה״כ משימות
            </p>
            <p style={{
              fontSize: '2em',
              fontWeight: 700,
              margin: 0,
              color: 'var(--warning-color)',
            }}>
              {totalCount}
            </p>
          </div>
          <div style={{ textAlign: 'center', padding: '12px' }}>
            <p style={{ margin: '0 0 8px 0', fontSize: '0.95em', color: 'var(--text-secondary)' }}>
              הסתיימו
            </p>
            <p style={{
              fontSize: '2em',
              fontWeight: 700,
              margin: 0,
              color: 'var(--success-color)',
            }}>
              {completedCount}
            </p>
          </div>
          <div style={{ textAlign: 'center', padding: '12px' }}>
            <p style={{ margin: '0 0 8px 0', fontSize: '0.95em', color: 'var(--text-secondary)' }}>
              זמן נותר
            </p>
            <p style={{
              fontSize: '1.8em',
              fontWeight: 700,
              margin: 0,
              color: 'var(--primary-color)',
            }}>
              {Math.floor(totalRemainingTaskMinutes / 60)}:{String(totalRemainingTaskMinutes % 60).padStart(2, '0')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}