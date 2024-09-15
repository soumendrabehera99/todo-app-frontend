import { useState } from "react";
import { removeAllTodos } from "../service/Todoservice";

function TodoMenu({ filterTodos, selectedMenu, setSelectedMenu, fetchTodos }) {
  const [disabled, setDisabled] = useState(false);
  const [clearbtnText, setClearBtnText] = useState("Clear All");
  async function onClearAll(event) {
    setDisabled((state) => true);
    setClearBtnText((state) => "removing...");

    try {
      const response = await removeAllTodos();
      if (response.status == 200) {
        fetchTodos();
        setDisabled((state) => false);
        setClearBtnText((state) => "Clear all");
      } else {
        console.error("Something went wrong!");
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <section className="mt-4 flex  justify-between gap-2 border-gray-300 border-b-2">
      <div className="flex gap-4">
        <button
          onClick={() => {
            filterTodos("ALL");
            setSelectedMenu("ALL");
          }}
          className={`${selectedMenu == "ALL" ? "text-blue-500" : ""}`}
        >
          All
        </button>
        <button
          onClick={() => {
            filterTodos("PENDING");
            setSelectedMenu("PENDING");
          }}
          className={`${selectedMenu == "PENDING" ? "text-blue-500" : ""}`}
        >
          Pending
        </button>
        <button
          onClick={() => {
            filterTodos("COMPLETED");
            setSelectedMenu("COMPLETED");
          }}
          className={`${selectedMenu == "COMPLETED" ? "text-blue-500" : ""}`}
        >
          Completed
        </button>
      </div>
      <button
        // onClick={()=>{
        //   removeAllTodos();
        //   fetchTodos();
        // }}
        //or we can do
        onClick={onClearAll}
        className="bg-blue-400 text-white px-2 rounded-md"
      >
        Clear all
      </button>
    </section>
  );
}
export default TodoMenu;
