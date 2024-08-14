import { useState,useEffect } from "react";
import { MdDelete } from "react-icons/md";

function App() {
  const [taskValue, setTaskValue] = useState("");
  const [task, setTask] = useState(()=>{
    return JSON.parse(localStorage.getItem("todo")) || []
  });
  const [dateTime, setDateTime] = useState('')

  localStorage.setItem("todo",JSON.stringify(task))

  const addTask = (evt) => {
    evt.preventDefault();
    if (taskValue === "") {
      alert("Please write something!!!");
      return;
    }
    if (task.some((str) => str.text.toLowerCase() === taskValue.toLowerCase())) {
      alert("Can't add the same task..");
      setTaskValue("");
      return;
    }
    const newItemObject = {
      id: Date.now(),
      text: taskValue,
      checked: false
    };
    setTask([...task, newItemObject]);
    setTaskValue("");
  };

  const deleteTask =(item)=>{
      const deletedvalue = task.filter(remove=> remove !==item)
      setTask(deletedvalue)
  }

  const handleCheck = (id) => {
    const updatedItems = task.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setTask(updatedItems);
  };

  useEffect(() => {
    const interval = setInterval(() => {
    const date = new Date().toLocaleDateString()
    const time = new Date().toLocaleTimeString()
    setDateTime(`${date} - ${time}`)
  }, 1000);
  return () => clearInterval(interval);
},[])

  return (
    <div className="mx-auto text-white max-w-md text-center mt-20">
      <div>
        <h1 className="text-4xl font-bold">To-Do List</h1>
        <div className="mt-4 text-xl">
          <span>{dateTime}</span>
        </div>
        <form onSubmit={addTask} className="mt-3">
          <input
            type="text"
            placeholder="Enter your tasks..."
            value={taskValue}
            onChange={(e) => setTaskValue(e.target.value)}
            className="w-[70%] outline-none border-none text-xl bg-transparent py-2 px-3"
          />
          <button
            className="w-[20%] bg-transparent ml-4 py-2 rounded-sm hover:bg-red-700"
            type="submit"
          >
            Add Task
          </button>
        </form>
        <ul className="mt-7">
          {task.map((item) => {
            return (
              <li key={item.id} className="text-black flex items-center justify-between max-w-80 mx-auto my-2 bg-white px-3 text-xl py-2 rounded-full">
                <div className='flex items-center'>
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => handleCheck(item.id)}
                    className="mr-2"
                  />
                  <span className={item.checked ? 'line-through' : ''}>
                    {item.text}
                  </span>
                </div>
                <button
                  onClick={() => deleteTask(item)}
                  className="text-red-500">
                  <MdDelete />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
