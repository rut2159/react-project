// ...existing code...
import React, { useState } from 'react'
import { useGlobalContext } from '../context/GlobalContext.jsx'

export default function AddCooking() {
  const { setCookBase, setCookPerMeal } = useGlobalContext()
  const [name, setName] = useState('')
  const [duration, setDuration] = useState(30)
  const [meal, setMeal] = useState('base') // 'base' או מספר סעודה (1,2,...)

  const add = () => {
    if (!name) return
    const item = { id: Date.now().toString(), name, durationMin: Number(duration), meal }
    if (meal === 'base') {
      setCookBase(prev => [...prev, item])
    } else {
      const idx = Number(meal)
      setCookPerMeal(prev => ({ ...(prev || {}), [idx]: [...(prev?.[idx] || []), { ...item, meal: idx }] }))
    }
    setName('')
    setDuration(30)
  }

  return (
    <div style={{ padding: 12 }}>
      <h3>הוספת בישול</h3>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input placeholder="שם המנה" value={name} onChange={e => setName(e.target.value)} />
        <input type="number" style={{ width: 80 }} value={duration} onChange={e => setDuration(e.target.value)} />
        <select value={meal} onChange={e => setMeal(e.target.value)}>
          <option value="base">בסיסי (לכל שבת)</option>
          <option value="1">סעודה 1</option>
          <option value="2">סעודה 2</option>
          <option value="3">סעודה 3</option>
        </select>
        <button onClick={add}>הוסף</button>
      </div>
    </div>
  )
}
// ...existing code...