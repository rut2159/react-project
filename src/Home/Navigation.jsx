import { useNavigate } from "react-router-dom";

function Navigation() {
  const navigate = useNavigate();

  return (
    <div className="navigation">
      <button onClick={() => navigate("/shopping")}>עמוד קניות</button>
      <button onClick={() => navigate("/cooking")}>עמוד בישולים</button>
      <button onClick={() => navigate("/tasks")}>משימות הבית</button>
    </div>
  );
}

export default Navigation;
