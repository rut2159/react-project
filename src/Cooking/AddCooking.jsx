import React, { useState } from 'react'
import { useGlobalContext } from '../context/GlobalContext.jsx'

export default function AddCooking() {
  const { setCookBase, setCookPerMeal } = useGlobalContext()
  const [name, setName] = useState('')
  const [duration, setDuration] = useState(30)
  const [meal, setMeal] = useState('base')
  const [successMessage, setSuccessMessage] = useState('')

  const add = () => {
    if (!name.trim()) {
      alert('אנא הזן שם למנה')
      return
    }
    const item = { id: Date.now().toString(), name, durationMin: Number(duration), meal }
    if (meal === 'base') {
      setCookBase(prev => [...prev, item])
    } else {
      const idx = Number(meal)
      setCookPerMeal(prev => ({ ...(prev || {}), [idx]: [...(prev?.[idx] || []), { ...item, meal: idx }] }))
    }
    
    setSuccessMessage(`✨ "${name}" נוסף בהצלחה!`)
    setName('')
    setDuration(30)
    
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') add()
  }

  return (
    <div>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)',
        borderRadius: '20px',
        padding: '40px',
        color: 'white',
        marginBottom: '40px',
        boxShadow: 'var(--shadow-lg)',
        textAlign: 'center',
      }}>
        <h1 style={{
          fontSize: '3em',
          margin: 0,
          color: 'white',
          WebkitTextFillColor: 'white',
        }}>
          ➕ בישול חדש
        </h1>
      </div>

      {/* Form */}
      <div style={{
        background: 'var(--bg-card)',
        borderRadius: '16px',
        padding: '32px',
        boxShadow: 'var(--shadow-md)',
        maxWidth: '600px',
        margin: '0 auto',
        border: '1px solid var(--border-accent)',
      }}>
        {successMessage && (
          <div style={{
            background: 'linear-gradient(135deg, #00d4aa 0%, #00a884 100%)',
            color: 'white',
            padding: '16px',
            borderRadius: '12px',
            marginBottom: '20px',
            fontWeight: 600,
            animation: 'slideInRight 0.3s ease-out',
          }}>
            {successMessage}
          </div>
        )}

        <div style={{
          display: 'grid',
          gap: '20px',
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
              🍳 שם המנה
            </span>
            <input
              type="text"
              placeholder="לדוגמה: עוף בתנור, סלט, וכו'"
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyPress={handleKeyPress}
              style={{
                padding: '12px 14px',
                borderRadius: '8px',
                border: '2px solid var(--primary-color)',
                fontSize: '1em',
              }}
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
              ⏱️ זמן הכנה (בדקות)
            </span>
            <input
              type="number"
              min="1"
              max="480"
              value={duration}
              onChange={e => setDuration(e.target.value)}
              onKeyPress={handleKeyPress}
              style={{
                padding: '12px 14px',
                borderRadius: '8px',
                border: '2px solid var(--primary-color)',
                fontSize: '1em',
              }}
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
              🍽️ סעודה
            </span>
            <select
              value={meal}
              onChange={e => setMeal(e.target.value)}
              style={{
                padding: '12px 14px',
                borderRadius: '8px',
                border: '2px solid var(--primary-color)',
                fontSize: '1em',
              }}
            >
              <option value="base">🌟 בסיסי (לכל שבת)</option>
              <option value="1">🔢 סעודה ראשונה</option>
              <option value="2">🔢 סעודה שנייה</option>
              <option value="3">🔢 סעודה שלישית</option>
            </select>
          </label>

          <button
            onClick={add}
            style={{
              background: 'var(--primary-gradient)',
              color: 'white',
              padding: '14px 28px',
              fontSize: '1.05em',
              fontWeight: 700,
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: 'var(--shadow-md)',
            }}
            onMouseEnter={e => {
              e.target.style.transform = 'translateY(-3px)'
              e.target.style.boxShadow = 'var(--shadow-lg)'
            }}
            onMouseLeave={e => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = 'var(--shadow-md)'
            }}
          >
            ✨ הוסף בישול
          </button>
        </div>
      </div>
    </div>
  )
}