import React from 'react'
import { useGlobalContext } from '../context/GlobalContext.jsx'
import './cooking.css'

export default function Cooking() {
  const { derivedCookings, toggleCookingDone, totalRemainingCookingMinutes } = useGlobalContext()

  return (
    <div style={{ padding: 16 }}>
      <h2>בישולים לשבת</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {derivedCookings.map(c => (
          <li key={c.id} style={{ display: 'flex', justifyContent: 'space-between', padding: 8, borderRadius: 8 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input type="checkbox" checked={!!c.done} onChange={() => toggleCookingDone(c.id)} />
              <span>{c.name}</span>
            </label>
            <div style={{ color: '#666' }}>{c.durationMin || 0} דק</div>
          </li>
        ))}
      </ul>
      <p style={{ color: '#666' }}>זמן הכנה מוערך שנותר: {totalRemainingCookingMinutes} דק</p>
    </div>
  )
}