import EventForm from "./EventFrom";
import Navigation from "./Navigation";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <h1>הזנת פרטי השבת הנוכחית: </h1>
      <EventForm />
      <Navigation />
    </div>
  );
}

export default Home;
