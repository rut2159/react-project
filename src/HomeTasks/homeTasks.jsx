import React from 'react'
import { useGlobalContext } from '../context/GlobalContext.jsx'
import './homeTasks.css'

export default function HomeTasks() {
  const { derivedTasks, toggleTaskDone, totalRemainingTaskMinutes } = useGlobalContext()

  const fmtMinutes = (m) => {
    if (!m) return '0 דקות'
    const h = Math.floor(m / 60)
    const mm = m % 60
    return h ? `${h} ש׳ ${mm} דק` : `${mm} דק`
  }

  return (
    <div>
      <h2>משימות לבית לשבת הקרובה</h2>
      <ul>
        {derivedTasks.map(t => (
          <li key={t.id} className={t.done ? 'done' : ''} data-done={t.done}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input type="checkbox" checked={!!t.done} onChange={() => toggleTaskDone(t.id)} />
              <span>{t.title}</span>
            </label>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>{t.durationMin || 0} דק • {t.day}</div>
          </li>
        ))}
      </ul>
      <p>זמן עבודה נשאר: {fmtMinutes(totalRemainingTaskMinutes)}</p>
    </div>
  )
}