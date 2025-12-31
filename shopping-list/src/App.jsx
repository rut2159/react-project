import { ShoppingList } from "./ShoppingList/ShoppingList.jsx";
import { ShowListToCurrentShabbat } from "./ShoppingList/ShowListToCurrentShabbat.jsx";
import { useState } from "react";
import './App.css'

function App() {
  const [showAllOption, setShowAllOption] = useState(false);
  const [showCur, setShowCur] = useState(false);
  function showAllOptionClicked() {
    setShowAllOption(!showAllOption);
  }
  function showCurList() {
    setShowCur(!showCur);
  }
  
  return (

    <>
      <button onClick={showAllOptionClicked}>{showAllOption ? 'hide' : 'show'} all options</button>
      {showAllOption ? <ShoppingList /> : ''}
      <button onClick={showCurList}>{showCur ? 'hide' : 'show'} current shabbat list</button>
      {showCur ? <ShowListToCurrentShabbat /> : ''}

      
    </>


  )
}

export default App
