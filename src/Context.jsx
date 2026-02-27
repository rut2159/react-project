import React, { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null);

const DEFAULTS = {
  settings: {
    mealsAtHome: ["fridayNight", "shabbatLunch"],
    hasGuests: false,
    location: "home",
    candleTime: "18:00"
  },
  shopping: [
    { id: 1, name: "חלה", qty: 2, bought: false },
    { id: 2, name: "יין", qty: 1, bought: false },
    { id: 3, name: "מלח", qty: 1, bought: false }
  ],
  tasks: [
    { id: 1, title: "לנקות מטבח", durationMins: 30, day: "friday", done: false },
    { id: 2, title: "לשטוף כלים", durationMins: 20, day: "friday", done: false }
  ],
  cookings: [
    { id: 1, name: "מרק", durationMins: 60, meal: "shabbatLunch", done: false }
  ]
};

function readLS(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function GlobalProvider({ children }) {
  const [settings, setSettings] = useState(() => readLS("g_settings", DEFAULTS.settings));
  const [shopping, setShopping] = useState(() => readLS("g_shopping", DEFAULTS.shopping));
  const [tasks, setTasks] = useState(() => readLS("g_tasks", DEFAULTS.tasks));
  const [cookings, setCookings] = useState(() => readLS("g_cookings", DEFAULTS.cookings));
  const [loading, setLoading] = useState(false);

  // persist
  useEffect(() => { localStorage.setItem("g_settings", JSON.stringify(settings)); }, [settings]);
  useEffect(() => { localStorage.setItem("g_shopping", JSON.stringify(shopping)); }, [shopping]);
  useEffect(() => { localStorage.setItem("g_tasks", JSON.stringify(tasks)); }, [tasks]);
  useEffect(() => { localStorage.setItem("g_cookings", JSON.stringify(cookings)); }, [cookings]);

  // helpers
  const nextId = (list) => (list.length ? Math.max(...list.map(i => i.id)) + 1 : 1);

  // settings
  function updateSettings(patch) { setSettings(prev => ({ ...prev, ...patch })); }
  function resetSettings() { setSettings(DEFAULTS.settings); }

  // shopping CRUD
  function addShopping(item) {
    setShopping(prev => [...prev, { id: nextId(prev), bought: false, ...item }]);
  }
  function updateShopping(id, patch) {
    setShopping(prev => prev.map(it => it.id === id ? { ...it, ...patch } : it));
  }
  function removeShopping(id) { setShopping(prev => prev.filter(it => it.id !== id)); }
  function toggleBought(id) { setShopping(prev => prev.map(it => it.id === id ? { ...it, bought: !it.bought } : it)); }

  // tasks CRUD
  function addTask(task) { setTasks(prev => [...prev, { id: nextId(prev), done: false, ...task }]); }
  function updateTask(id, patch) { setTasks(prev => prev.map(t => t.id === id ? { ...t, ...patch } : t)); }
  function removeTask(id) { setTasks(prev => prev.filter(t => t.id !== id)); }
  function toggleTaskDone(id) { setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t)); }

  // cookings CRUD
  function addCooking(c) { setCookings(prev => [...prev, { id: nextId(prev), done: false, ...c }]); }
  function updateCooking(id, patch) { setCookings(prev => prev.map(c => c.id === id ? { ...c, ...patch } : c)); }
  function removeCooking(id) { setCookings(prev => prev.filter(c => c.id !== id)); }
  function toggleCookingDone(id) { setCookings(prev => prev.map(c => c.id === id ? { ...c, done: !c.done } : c)); }

  // derived helpers
  function remainingShoppingCount() { return shopping.filter(s => !s.bought).length; }
  function totalRemainingTasksTime() { return tasks.filter(t => !t.done).reduce((s, t) => s + (t.durationMins || 0), 0); }
  function remainingCookingsCount() { return cookings.filter(c => !c.done).length; }

  return (
    <GlobalContext.Provider value={{
      settings, updateSettings, resetSettings,
      shopping, addShopping, updateShopping, removeShopping, toggleBought, remainingShoppingCount,
      tasks, addTask, updateTask, removeTask, toggleTaskDone, totalRemainingTasksTime,
      cookings, addCooking, updateCooking, removeCooking, toggleCookingDone, remainingCookingsCount,
      loading, setLoading
    }}>
      {children}
    </GlobalContext.Provider>
  );
}