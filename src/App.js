import React from "react";
import { useState, useEffect } from "react";
import * as uuid from "uuid";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import env from './env'
function App() {
  const [showAddPanel, setShowAddPanel] = useState(true);
  const [tasks, setTasks] = useState([ ]);

  // load data from server
  useEffect( () => {
    const loadData = async () => {
     const tasksArray = await fetchData();
     setTasks(tasksArray)
    }
    loadData()
  },[])

  const fetchData = async () => {
    const res = await fetch(env.DOMAIN_URL+'tasks')
    const data = await res.json() 
    return data
  }


  // add tasks
  const addTask = task => {
    console.log(task);
    const id = uuid.v4();
    const newTask = { id, ...task };
    setTasks([...tasks, newTask]);
  };

  // delete tasks
  const deleteTask = id => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // toggle reminder
  const toggleReminder = id => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  // toggle add Panel

  return (
    <div className="container">
      <Header
        onPanelAdd={() => setShowAddPanel(!showAddPanel)}
        showAddValue={showAddPanel}
      />
      {showAddPanel && <AddTask onAdd={addTask} />}

      {tasks && tasks.length > 0 ? (
        <Tasks
          tasks={tasks}
          onDelete={deleteTask}
          onReminder={toggleReminder}
        />
      ) : (
        <h5> No any pending tasks</h5>
      )}
    </div>
  );
}

// class App extends React.Component{
//   render () {
//     return <h1> Hello 1</h1>
//   }
// }

export default App;
