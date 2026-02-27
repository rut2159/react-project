// ...existing code...
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const GlobalContext = createContext(null)

const initialSettings = {
  startTime: '',
  location: 'home',
  mealsCount: 2,
  guests: false,
}
// ...existing code...
const shabbatCookingList = {
  basic: ["חלה","סלט ירקות","טחינה","חומוס"],
  firstMeal: ["דג חריימה","מרק עוף","עוף בתנור","אורז לבן"],
  secondMeal: ["חמין","קוגל אטריות","סלט כרוב"],
  thirdMeal: ["טונה עם ירקות","חצילים במיונז","לחמניות"]
};

export default shabbatCookingList
export const getShabbatCookingList = () => shabbatCookingList
// ...existing code...
const defaultBaseShopping = [
  { id: uuidv4(), name: 'חלה', qty: 2, unit: 'יח׳' },
  { id: uuidv4(), name: 'לחם', qty: 1, unit: 'יח׳' },
  { id: uuidv4(), name: 'חמאה', qty: 1, unit: 'חב׳' },
]

const defaultMealAdditions = {
  1: [{ id: uuidv4(), name: 'עוף', qty: 1, unit: 'יח׳' }],
  2: [{ id: uuidv4(), name: 'דג', qty: 1, unit: 'יח׳' }],
}

const defaultGuestShopping = [{ id: uuidv4(), name: 'מתנה למארח', qty: 1, unit: 'יח׳' }]

const defaultBaseTasks = [
  { id: uuidv4(), title: 'לנקות את הסלון', durationMin: 30, day: 'יום שישי', forGuests: false },
]
const defaultGuestTasks = [
  { id: uuidv4(), title: 'לארוז מיטת אורח', durationMin: 15, day: 'יום שישי', forGuests: true },
]

const defaultBaseCookings = [{ id: uuidv4(), name: 'חלה', durationMin: 90, meal: 'base' }]
const defaultMealCookings = {
  1: [{ id: uuidv4(), name: 'עוף', durationMin: 80, meal: 1 }],
  2: [{ id: uuidv4(), name: 'דג', durationMin: 40, meal: 2 }],
}

// בטוחה לטעינה מ־localStorage
function safeLoad(key, fallback) {
  try {
    const v = localStorage.getItem(key)
    return v ? JSON.parse(v) : fallback
  } catch (e) {
    console.warn('safeLoad parse failed for', key, e)
    return fallback
  }
}

function mergeItems(acc, item) {
  const key = item.name
  if (!acc[key]) acc[key] = { ...item }
  else acc[key].qty = (acc[key].qty || 0) + (item.qty || 0)
  return acc
}

export const GlobalProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => safeLoad('shabbat_settings', initialSettings))

  const [shoppingBase, setShoppingBase] = useState(() =>
    safeLoad('shabbat_shopping_base', defaultBaseShopping)
  )
  const [mealAdditions, setMealAdditions] = useState(() =>
    safeLoad('shabbat_meal_additions', defaultMealAdditions)
  )
  const [guestShopping, setGuestShopping] = useState(() =>
    safeLoad('shabbat_guest_shopping', defaultGuestShopping)
  )

  const [tasksBase, setTasksBase] = useState(() => safeLoad('shabbat_tasks_base', defaultBaseTasks))
  const [tasksGuest, setTasksGuest] = useState(() => safeLoad('shabbat_tasks_guest', defaultGuestTasks))

  const [cookBase, setCookBase] = useState(() => safeLoad('shabbat_cook_base', defaultBaseCookings))
  const [cookPerMeal, setCookPerMeal] = useState(() => safeLoad('shabbat_cook_per_meal', defaultMealCookings))

  const [purchasedItems, setPurchasedItems] = useState(() => safeLoad('shabbat_purchased', {}))
  const [doneTasks, setDoneTasks] = useState(() => safeLoad('shabbat_done_tasks', {}))
  const [doneCookings, setDoneCookings] = useState(() => safeLoad('shabbat_done_cookings', {}))

  useEffect(() => {
    localStorage.setItem('shabbat_settings', JSON.stringify(settings))
    localStorage.setItem('shabbat_shopping_base', JSON.stringify(shoppingBase))
    localStorage.setItem('shabbat_meal_additions', JSON.stringify(mealAdditions))
    localStorage.setItem('shabbat_guest_shopping', JSON.stringify(guestShopping))
    localStorage.setItem('shabbat_tasks_base', JSON.stringify(tasksBase))
    localStorage.setItem('shabbat_tasks_guest', JSON.stringify(tasksGuest))
    localStorage.setItem('shabbat_cook_base', JSON.stringify(cookBase))
    localStorage.setItem('shabbat_cook_per_meal', JSON.stringify(cookPerMeal))
    localStorage.setItem('shabbat_purchased', JSON.stringify(purchasedItems))
    localStorage.setItem('shabbat_done_tasks', JSON.stringify(doneTasks))
    localStorage.setItem('shabbat_done_cookings', JSON.stringify(doneCookings))
  }, [
    settings,
    shoppingBase,
    mealAdditions,
    guestShopping,
    tasksBase,
    tasksGuest,
    cookBase,
    cookPerMeal,
    purchasedItems,
    doneTasks,
    doneCookings,
  ])

  // גזירות נכונות לשימוש בכל הקובץ
  const derivedShopping = useMemo(() => {
    const acc = {}
    shoppingBase.forEach(i => mergeItems(acc, i))
    for (let i = 1; i <= (settings.mealsCount || 0); i++) {
      const extras = (mealAdditions && mealAdditions[i]) || []
      extras.forEach(x => mergeItems(acc, x))
    }
    if (settings.guests) (guestShopping || []).forEach(i => mergeItems(acc, i))
    return Object.values(acc).map(it => ({ ...it, purchased: !!(purchasedItems[it.id] || purchasedItems[it.name]) }))
  }, [shoppingBase, mealAdditions, guestShopping, settings, purchasedItems])

  const derivedTasks = useMemo(() => {
    const all = [...(tasksBase || [])]
    if (settings.guests) all.push(...(tasksGuest || []))
    return all.map(t => ({ ...t, done: !!doneTasks[t.id] }))
  }, [tasksBase, tasksGuest, settings, doneTasks])

  const derivedCookings = useMemo(() => {
    const all = [...(cookBase || [])]
    for (let i = 1; i <= (settings.mealsCount || 0); i++) {
      all.push(...((cookPerMeal && cookPerMeal[i]) || []))
    }
    return all.map(c => ({ ...c, done: !!doneCookings[c.id] }))
  }, [cookBase, cookPerMeal, settings, doneCookings])

  const totalRemainingTaskMinutes = useMemo(
    () => derivedTasks.reduce((s, t) => (!t.done ? s + (t.durationMin || 0) : s), 0),
    [derivedTasks]
  )
  const totalRemainingCookingMinutes = useMemo(
    () => derivedCookings.reduce((s, c) => (!c.done ? s + (c.durationMin || 0) : s), 0),
    [derivedCookings]
  )

  const findItemNameById = (id) => {
    const all = [...(shoppingBase || []), ...(guestShopping || [])]
    Object.values(mealAdditions || {}).forEach(arr => all.push(...(arr || [])))
    return all.find(i => i.id === id)?.name ?? null
  }

  const updateSetting = (patch) => setSettings(prev => ({ ...prev, ...patch }))
  const resetSettings = () => {
    setSettings(initialSettings)
    setPurchasedItems({})
    setDoneTasks({})
    setDoneCookings({})
  }

  const togglePurchased = (itemId) => {
    setPurchasedItems(prev => {
      const name = findItemNameById(itemId)
      const prevVal = prev[itemId] ?? (name ? prev[name] : undefined)
      const newVal = !prevVal
      const copy = { ...prev, [itemId]: newVal }
      if (name) copy[name] = newVal
      return copy
    })
  }

  const toggleTaskDone = (taskId) => setDoneTasks(prev => ({ ...prev, [taskId]: !prev[taskId] }))
  const toggleCookingDone = (cookId) => setDoneCookings(prev => ({ ...prev, [cookId]: !prev[cookId] }))

  const addShoppingBaseItem = (item) => setShoppingBase(prev => [...prev, { id: uuidv4(), ...item }])
  const editShoppingBaseItem = (id, patch) => setShoppingBase(prev => prev.map(i => (i.id === id ? { ...i, ...patch } : i)))
  const deleteShoppingBaseItem = (id) => setShoppingBase(prev => prev.filter(i => i.id !== id))

  // דיאגנוסטיקה קצרה
  useEffect(() => {
    console.debug('GlobalContext state:', {
      settings,
      shoppingBaseCount: (shoppingBase || []).length,
      purchasedItemsCount: Object.keys(purchasedItems || {}).length,
      derivedShoppingPreview: (derivedShopping || []).slice(0, 6),
      derivedTasksCount: (derivedTasks || []).length,
      derivedCookingsCount: (derivedCookings || []).length,
    })
  }, [settings, shoppingBase, purchasedItems, derivedShopping, derivedTasks, derivedCookings])

  return (
    <GlobalContext.Provider
      value={{
        settings,
        updateSetting,
        resetSettings,

        shoppingBase,
        mealAdditions,
        guestShopping,
        derivedShopping,
        addShoppingBaseItem,
        editShoppingBaseItem,
        deleteShoppingBaseItem,
        togglePurchased,

        tasksBase,
        tasksGuest,
        derivedTasks,
        toggleTaskDone,
        setTasksBase,
        setTasksGuest,

        cookBase,
        cookPerMeal,
        derivedCookings,
        toggleCookingDone,
        setCookBase,
        setCookPerMeal,

        totalRemainingTaskMinutes,
        totalRemainingCookingMinutes,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => {
  const ctx = useContext(GlobalContext)
  if (!ctx) throw new Error('useGlobalContext must be used within GlobalProvider')
  return ctx
}
// ...existing code...