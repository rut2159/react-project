import React from "react"
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

  const remainingPurchases = (derivedShopping || []).filter(i => !i.purchased).length

  const fmtMinutes = (m) => {
    if (!m) return "0 דק"
    const h = Math.floor(m / 60); const mm = m % 60
    return h ? `${h} ש׳ ${mm} דק` : `${mm} דק`
  }

  return (
    <div>
      <h2>הגדרות שבת נוכחית</h2>

      <div style={{ display: "grid", gap: 8, maxWidth: 520 }}>
        <label>
          שעת כניסה:
          <input
            type="time"
            value={settings.startTime || ""}
            onChange={e => updateSetting({ startTime: e.target.value })}
          />
        </label>

        <label>
          מיקום:
          <select value={settings.location} onChange={e => updateSetting({ location: e.target.value })}>
            <option value="home">בבית</option>
            <option value="travel">נוסעים</option>
          </select>
        </label>

        <label>
          כמות סעודות בבית:
          <input
            type="number"
            min={0}
            value={settings.mealsCount || 0}
            onChange={e => updateSetting({ mealsCount: Number(e.target.value) })}
          />
        </label>

        <label>
          אורחים:
          <input
            type="checkbox"
            checked={!!settings.guests}
            onChange={e => updateSetting({ guests: e.target.checked })}
          />
        </label>

        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={resetSettings}>איפוס הגדרות</button>
        </div>
      </div>

      <hr style={{ margin: "12px 0" }} />

      <h3>סטטוס מהיר</h3>
      <ul>
        <li>קניות שנותרו: {remainingPurchases}</li>
        <li>משימות — זמן שנותר: {fmtMinutes(totalRemainingTaskMinutes)}</li>
        <li>בישולים — זמן שנותר: {fmtMinutes(totalRemainingCookingMinutes)}</li>
      </ul>
    </div>
  )
}