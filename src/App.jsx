import { useEffect } from "react";
import { useState } from "react";

import "./App.css";
import AddTodo from "./component/AddTodo";
import TodoMenu from "./component/TodoMenu";
import Todos from "./component/Todos";
import { addTodo, getTodos } from "./service/Todoservice";

function App() {
  const [allTodo, setTodos] = useState([]);
  const [copyTodos, setCopyTodos] = useState([]);

  const [isSend, setSend] = useState("send....");
  const [disabled, setDisabled] = useState(false);

  const [selectedMenu, setSelectedMenu] = useState("ALL");

  async function fetchTodos() {
    try {
      const response = await getTodos();
      const todos = await response.json();
      // console.log(todos);
      setTodos(todos);
      setCopyTodos(todos);
      setSelectedMenu("ALL");
      // it set the value of allTodo
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    //
    //if we use await then the method must be async

    fetchTodos();
  }, []);

  // const designBody ="min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500"

  const obj = {};
  async function submitForm(event) {
    setDisabled((state) => true);
    event.preventDefault();
    const form = event.target;
    const inputs = form.elements; //it gives all the input fields
    //input is not an array it is an array like object so we cannot use forEach so we have to convert it to an array
    Array.from(inputs).forEach((input) => {
      if (input.type != "submit") {
        obj[input.name] = input.value; //if we want to add dynamic key then we have to add between square bracket
      }
    });
    // const json = JSON.stringify(obj); //convert data in json format

    try {
      const response = await addTodo(obj);
      if (response.status === 200) {
        const data = await response.json();
        // setCopyTodos([data, ...allTodo]);
        fetchTodos();
        form.reset();
      } else {
        console.log(response.statusText);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDisabled(false);
    }
  }
  function filterTodos(state) {
    if (state == "ALL") {
      setCopyTodos(allTodo);
    } else if (state === "PENDING") {
      setCopyTodos(allTodo.filter((todo) => !todo.completed));
    } else {
      setCopyTodos(allTodo.filter((todo) => todo.completed));
    }
  }

  return (
    // <main className="min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
    // or we can write
    // <main className={designBody}>
    // or we can write in the css file
    <main>
      <div>
        <h2 className="text-center ">Your Todo</h2>
        <AddTodo onSubmit={submitForm} disabled={disabled} />
        <TodoMenu
          filterTodos={filterTodos}
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
          fetchTodos={fetchTodos}
        />
        <Todos todos={copyTodos} fetchTodos={fetchTodos} />
      </div>
    </main>
  );
}

export default App;
