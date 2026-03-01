import React from "react"
import { useGlobalContext } from "../context/GlobalContext.jsx"

export default function ShoppingList() {
  const { derivedShopping, togglePurchased } = useGlobalContext()

  const purchasedCount = (derivedShopping || []).filter(it => it.purchased).length
  const totalCount = (derivedShopping || []).length
  const progressPercent = totalCount > 0 ? (purchasedCount / totalCount) * 100 : 0

  if (!derivedShopping || derivedShopping.length === 0) {
    return (
      <div>
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #00d4ff 100%)',
          borderRadius: '20px',
          padding: '40px',
          color: 'white',
          marginBottom: '40px',
          boxShadow: 'var(--shadow-lg)',
          textAlign: 'center',
        }}>
          <h1 style={{ fontSize: '3em', margin: 0, color: 'white', WebkitTextFillColor: 'white' }}>
            🛍️ קניות
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
            אין פריטים להציג
          </p>
          <p style={{ fontSize: '0.95em', color: 'var(--text-secondary)', margin: 0 }}>
            הוסף סעודות והגדר אם יש אורחים כדי לטעון את רשימת הקניות
          </p>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #00d4ff 100%)',
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
          🛍️ קניות
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
            <span>התקדמות קניות</span>
            <span>{purchasedCount} / {totalCount}</span>
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
          {progressPercent === 100 ? '✅ הסתיימת קניות!' : `${Math.round(100 - progressPercent)}% נותר`}
        </p>
      </div>

      {/* Shopping Items */}
      <div style={{
        display: 'grid',
        gap: '12px',
        marginBottom: '20px',
      }}>
        {derivedShopping.map(it => (
          <div
            key={it.id}
            style={{
              background: 'var(--bg-card)',
              borderRadius: '12px',
              padding: '16px',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              transition: 'all 0.3s ease',
              opacity: it.purchased ? 0.6 : 1,
              border: '1px solid var(--border-accent)',
              borderLeft: it.purchased ? '4px solid #00d4aa' : '4px solid #667eea',
              hover: {
                transform: 'translateY(-2px)',
                boxShadow: 'var(--shadow-md)',
              }
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
                checked={!!it.purchased}
                onChange={() => togglePurchased(it.id)}
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
                  textDecoration: it.purchased ? 'line-through' : 'none',
                }}>
                  {it.name}
                </p>
                {it.price && <p style={{
                  margin: '4px 0 0 0',
                  fontSize: '0.85em',
                  color: 'var(--text-secondary)',
                }}>
                  {it.price} ₪
                </p>}
              </div>
            </label>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              <span style={{
                background: 'var(--primary-gradient)',
                color: 'white',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '0.85em',
                fontWeight: 600,
                whiteSpace: 'nowrap',
              }}>
                {it.qty || 1} {it.unit || ''}
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
          📊 סיכום
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '16px',
        }}>
          <div style={{ textAlign: 'center', padding: '12px' }}>
            <p style={{ margin: '0 0 8px 0', fontSize: '0.95em', color: 'var(--text-secondary)' }}>
              סה״כ פריטים
            </p>
            <p style={{
              fontSize: '2em',
              fontWeight: 700,
              margin: 0,
              color: 'var(--primary-color)',
            }}>
              {totalCount}
            </p>
          </div>
          <div style={{ textAlign: 'center', padding: '12px' }}>
            <p style={{ margin: '0 0 8px 0', fontSize: '0.95em', color: 'var(--text-secondary)' }}>
              נקנו
            </p>
            <p style={{
              fontSize: '2em',
              fontWeight: 700,
              margin: 0,
              color: 'var(--success-color)',
            }}>
              {purchasedCount}
            </p>
          </div>
          <div style={{ textAlign: 'center', padding: '12px' }}>
            <p style={{ margin: '0 0 8px 0', fontSize: '0.95em', color: 'var(--text-secondary)' }}>
              נותר
            </p>
            <p style={{
              fontSize: '2em',
              fontWeight: 700,
              margin: 0,
              color: 'var(--warning-color)',
            }}>
              {totalCount - purchasedCount}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}