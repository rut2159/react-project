import './App.css';
import CookingComponent from './Cooking/CookingComponent';
import { useState } from 'react'
function App() {
          const [showCookings, setShowCookings] = useState(false);

          const toggleCookingsVisibility = () => {
        setShowCookings(!showCookings);
    };

  return (
    <div className="App">
      <div style={{ marginTop: 20 }}>

       {/* cooking */}
     <button onClick={toggleCookingsVisibility}>
                {showCookings ? 'להסתרת התבשילים' : 'להצגת התבשילים'}
            </button>
            {showCookings && <CookingComponent />}


              

      </div>
    </div>
  );
}

export default App;
