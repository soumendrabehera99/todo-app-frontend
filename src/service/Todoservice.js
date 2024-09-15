const BASE_URL = "http://localhost:1200/todos";

export function getTodos() {
  return fetch(BASE_URL);
}

export function addTodo(payLoad) {
  return fetch(BASE_URL, {
    method: "POST",
    body: JSON.stringify(payLoad),
    // body: json,
    headers: {
      //request header
      "content-type": "application/json",
    },
  });
}

export function updateTodoState(id, state) {
  const url = `${BASE_URL}/${id}/state/${state}`;
  return fetch(url, { method: "PATCH" });
}

export function removeAllTodos() {
  const url = `${BASE_URL}/all`;
  return fetch(url, { method: "DELETE" });
}
