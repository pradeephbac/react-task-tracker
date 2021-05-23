import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as uuid from "uuid";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";
import env from "./env";
function App() {
  const [showAddPanel, setShowAddPanel] = useState(true);
  const [tasks, setTasks] = useState([]);

  // load data from server
  useEffect(() => {
    const loadData = async () => {
      const tasksArray = await fetchData();
      setTasks(tasksArray);
    };
    loadData();
  }, []);

  const fetchData = async () => {
    const res = await fetch(env.DOMAIN_URL + "tasks");
    const data = await res.json();
    return data;
  };

  // add tasks
  const addTask = async task => {
    let addedTask = await fetch(env.DOMAIN_URL + "tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(task)
    });

    let responseTask = await addedTask.json();
    setTasks([...tasks, responseTask]);

    // console.log(task);
    // const id = uuid.v4();
    // const newTask = { id, ...task };
    // setTasks([...tasks, newTask]);
  };

  // delete tasks
  const deleteTask = async id => {
    const deleteURL = env.DOMAIN_URL + "tasks/";
    await fetch(`${deleteURL}${id}`, {
      method: "DELETE"
    });
    setTasks(tasks.filter(task => task.id !== id));
  };

  // toggle reminder
  const toggleReminder = async id => {
    const fetchurl = env.DOMAIN_URL + "tasks/";
    let getPossibleTask = await fetch(`${fetchurl}${id}`);
    let reievedChangedTask = await getPossibleTask.json();

    let changedTask = {
      ...reievedChangedTask,
      reminder: !reievedChangedTask.reminder
    };
 

    //  update
    let updatetask = await fetch(`${fetchurl}${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(changedTask)
    });

    const finalizedUpdatedTask = await updatetask.json(); 
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  // toggle add Panel

  return (
    <Router>
      <div className="container">
        <Header
          onPanelAdd={() => setShowAddPanel(!showAddPanel)}
          showAddValue={showAddPanel}
        />
     

        <Route
          path="/"
          exact
          render={(props) => (
            <>
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
            </>
          )}
        />

        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
}

// class App extends React.Component{
//   render () {
//     return <h1> Hello 1</h1>
//   }
// }

export default App;
