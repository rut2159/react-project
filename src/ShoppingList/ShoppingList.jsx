import React from "react"
import { useGlobalContext } from "../context/GlobalContext.jsx"
// import "./shopping.css" // עדכון לשם תקין

export default function ShoppingList() {
  const { derivedShopping, togglePurchased } = useGlobalContext()

  console.debug("ShoppingList derivedShopping:", derivedShopping)

  if (!derivedShopping || derivedShopping.length === 0) {
    return (
      <div style={{ padding: 16 }}>
        <h2>רשימת קניות לשבת</h2>
        <p style={{ color: "#c00" }}>אין פריטים להציג — derivedShopping ריקה.</p>
        <details style={{ whiteSpace: "pre-wrap", background: "#f8f8f8", padding: 8, borderRadius: 6 }}>
          <summary>הצג אובייקט derivedShopping (לבדיקה)</summary>
          <pre style={{ maxHeight: 200, overflow: "auto" }}>{JSON.stringify(derivedShopping, null, 2)}</pre>
        </details>
      </div>
    )
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>רשימת קניות לשבת</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {derivedShopping.map(it => (
          <li key={it.id} style={{ display: "flex", justifyContent: "space-between", padding: 8, borderRadius: 8 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input type="checkbox" checked={!!it.purchased} onChange={() => togglePurchased(it.id)} />
              <span>{it.name}</span>
            </label>
            <div style={{ color: "#666" }}>{it.qty || 1} {it.unit || ""}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}