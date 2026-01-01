import EventForm from "./EventFrom.jsx";
import Navigation from "./Navigation.jsx";
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
        <Navigation />
      </div>

      <div style={{ marginTop: 12 }}>
        <button onClick={goToCookings}>הצגת התבשילים (עמוד)</button>
        <button onClick={goToHomeTasks} style={{ marginLeft: 8 }}>משימות בית (עמוד)</button>
        <button onClick={goToShopping} style={{ marginLeft: 8 }}>קניות (עמוד)</button>
      </div>
    </>
  );
}

export default Home;