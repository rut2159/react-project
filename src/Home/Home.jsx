import EventForm from "./EventFrom.jsx";
import "./Home.css";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Home() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  const goToCookings = () => navigate('/cookings');
  const goToHomeTasks = () => navigate('/home-tasks');
  const goToShopping = () => navigate('/shopping');

  return (
    <>
      <div className="home">
        <h1>הזנת פרטי השבת הנוכחית: </h1>
        <EventForm />
      </div>

      <div >
        <button onClick={goToCookings}>הצגת התבשילים </button>
        <button onClick={goToHomeTasks} >משימות בית </button>
        <button onClick={goToShopping} >קניות </button>
      </div>
    </>
  );
}

export default Home;