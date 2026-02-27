import './App.css'
// ...existing code...
import {  Routes, Route } from 'react-router-dom';
import Home from "./Home/Home.jsx";
import HomeTasks from './HomeTasks/homeTasks.jsx';
import CookingComponent from './Cooking/CookingComponent.jsx';
import {ShoppingList} from './ShoppingList/ShoppingList.jsx';
import { GlobalProvider } from './context/GlobalContext.jsx';

function App() {
  return (
    <>
      <GlobalProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home-tasks" element={<HomeTasks />} />
          <Route path="/cookings" element={<CookingComponent />} />
          <Route path="/shopping" element={<ShoppingList />} />
        </Routes>
      </GlobalProvider>
    </>
  )
}

export default App