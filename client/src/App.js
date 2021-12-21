import { useState, useEffect } from "react";

//base endpoint
const API = "http://localhost:3001";

function App() {
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    getTodos();
  }, []);

  //getting all current todos
  const getTodos = () => {
    fetch(API + "/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error(err));
  };

  //chanding todo to completed
  const completeTodo = async (id) => {
    const data = await fetch(API + "/todo/complete/" + id).then((res) =>
      res.json()
    );
    setTodos((todos) =>
      todos.map((todo) => {
        if (todo._id === data._id) {
          todo.complete = data.complete;
        }
        return todo;
      })
    );
  };

  //add a todo item
  const addTodo = async () => {
    const data = await fetch(API + "/todo/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: newTodo,
      }),
    }).then((res) => res.json());
    //set the todo to the array using ...
    setTodos([...todos, data]);
    //make add window disappear
    setPopupActive(false);
    //set next todo to nothing
    setNewTodo("");
  };

  //delete an existing todo
  const deleteTodo = async (id) => {
    const data = await fetch(API + "/todo/delete/" + id, {
      method: "DELETE",
    }).then((res) => res.json());
    //filter out only ids that arent the same as what was passed in to simulate a delete
    setTodos((todos) => todos.filter((todo) => todo._id !== data._id));
    // console.log(data);
  };

  //jsx stuff
  return (
    <div className="App">
      <h1>Welcome</h1>
      <h4>Your Current Tasks</h4>
      <div className="todos">
        {/* only do this when there is at least 1 todo */}
        {todos.length > 0 ? (
          todos.map((todo) => (
            <div
              className={"todo" + (todo.complete ? " is-complete" : "")}
              key={todo._id}
              onClick={() => completeTodo(todo._id)}
            >
              <div className="checkbox"></div>
              <div className="text">{todo.text}</div>
              <div
                className="delete"
                //stop from parent onclick from firing which causes app to crash
                onClick={(e) => {
                  if (!e) var e = window.event;
                  e.cancelBubble = true;
                  if (e.stopPropagation) e.stopPropagation();
                  deleteTodo(todo._id);
                }}
              >
                X
              </div>
            </div>
          ))
        ) : (
          <p>No more tasks to show</p>
        )}
      </div>
      <div className="addPopup" onClick={() => setPopupActive(true)}>
        +
      </div>
      {popupActive ? (
        <div className="popup">
          <div className="closePopup" onClick={() => setPopupActive(false)}>
            X
          </div>
          <div className="content">
            <h3>Add Task</h3>
            <input
              type="text"
              className="add-todo-input"
              onChange={(e) => setNewTodo(e.target.value)}
              value={newTodo}
            />
            <div className="btn" onClick={addTodo}>
              Create Task
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
