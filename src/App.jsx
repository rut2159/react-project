import './App.css'
// ...existing code...
import {  Routes, Route } from 'react-router-dom';
import Home from "./Home/Home.jsx";
import HomeTasks from './HomeTasks/homeTasks.jsx';
import CookingComponent from './Cooking/CookingComponent.jsx';
import {ShoppingList} from './ShoppingList/ShoppingList.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home-tasks" element={<HomeTasks />} />
        <Route path="/cookings" element={<CookingComponent />} />
        <Route path="/shopping" element={<ShoppingList />} />
      </Routes>
    </>
  )
}

export default App