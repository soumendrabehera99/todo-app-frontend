import { updateTodoState } from "../service/Todoservice";

function Todos({ todos, fetchTodos }) {
  async function completeStateChange(id, state) {
    try {
      const response = await updateTodoState(id, state);
      if (response.status === 200) {
        fetchTodos();
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <section className="mt-4 max-h-48 overflow-y-auto">
      {todos.map((todo) => (
        <div className="flex gap-3" key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => completeStateChange(todo.id, !todo.completed)}
          />
          <p className={todo.completed ? "line-through" : ""}>{todo.title}</p>
        </div>
      ))}
    </section>
  );
}
export default Todos;
