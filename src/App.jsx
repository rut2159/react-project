import React from "react"
import { Routes, Route, Link } from "react-router-dom"
import Home from "./Home/Home.jsx"
import ShoppingList from "./ShoppingList/ShoppingList.jsx"
import HomeTasks from "./HomeTasks/HomeTasks.jsx"
import Cooking from "./Cooking/Cooking.jsx"
import AddCooking from "./Cooking/AddCooking.jsx"

export default function App() {
  return (
    <div>
      <header style={{ padding: 12, borderBottom: "1px solid #eee", display: "flex", gap: 12 }}>
        <Link to="/">בית</Link>
        <Link to="/shopping">קניות</Link>
        <Link to="/tasks">משימות</Link>
        <Link to="/cooking">בישולים</Link>
        <Link to="/cooking/add">הוסף בישול</Link>
      </header>

      <main style={{ padding: 16 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shopping" element={<ShoppingList />} />
          <Route path="/tasks" element={<HomeTasks />} />
          <Route path="/cooking" element={<Cooking />} />
          <Route path="/cooking/add" element={<AddCooking />} />
        </Routes>
      </main>
    </div>
  )
}