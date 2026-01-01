import './homeTasks.css';
import { useState, useEffect } from "react";

export function HomeTasks() {
  const [tasks, setTasks] = useState([]);
  const [totalTime, setTotalTime] = useState(0);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDuration, setNewTaskDuration] = useState(0);
  const [newTaskDay, setNewTaskDay] = useState("");

  useEffect(() => {
    const fetchTasks = new Promise((resolve) => {
      const baseTasks = [
        { id: 1, name: "לנקות חדר ילדים", duration: 0.5, day: "יום חמישי", done: false },
        { id: 2, name: "לשטוף סלון", duration: 1, day: "יום חמישי", done: false },
      ];
      const guestTasks = [
        { id: 3, name: "אריזת מזוודה למתארחים", duration: 0.5, day: "יום שישי", done: false },
      ];
      const allTasks = baseTasks; 
      setTimeout(() => resolve(allTasks), 100);
    });

    fetchTasks.then(data => setTasks(data));
  }, []);

  useEffect(() => {
    const timeToFinish = tasks.filter(task => !task.done)
      .reduce((sum, task) => sum + task.duration, 0);
    setTotalTime(timeToFinish);
  }, [tasks]);

  const taskDone = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const addTask = () => {
    const newTask = {
      id: Date.now(),
      name: newTaskName,
      duration: parseFloat(newTaskDuration),
      day: newTaskDay,
      done: false,
    };
    setTasks([...tasks, newTask]);

    setNewTaskName("");
    setNewTaskDuration(0);
    setNewTaskDay("");
  };

  return (
    <div>
      <h2>משימות בית לשבת</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <input type="checkbox" checked={task.done} onChange={() => taskDone(task.id)} />
            {task.name} – {task.duration} דקות ({task.day})
            <button onClick={() => deleteTask(task.id)}>מחיקה</button>
          </li>
        ))}
      </ul>
      <input 
        type="text" 
        value={newTaskName} 
        onChange={(e) => setNewTaskName(e.target.value)} 
        placeholder="שם משימה" 
      />
      <input 
        type="number" 
        value={newTaskDuration} 
        onChange={(e) => setNewTaskDuration(e.target.value)} 
        placeholder="משך זמן (דקות)" 
      />
      <input 
        type="text" 
        value={newTaskDay} 
        onChange={(e) => setNewTaskDay(e.target.value)} 
        placeholder="יום" 
      />
      <button onClick={addTask}>הוספת משימה</button>
      <p>זמן עבודה שנשאר: {totalTime} דקות</p>
    </div>
  );
}

export default HomeTasks;

