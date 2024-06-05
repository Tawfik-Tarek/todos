class Todo {
  constructor(public name: string, public completed: boolean) {}

  toggle() {
    this.completed = !this.completed;
  }

  printDetails() {
    console.log(
      `${this.name} ${this.completed ? "completed" : "not completed"}`
    );
  }

  static store(todos: Todo[]) {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  static retrieve(): Todo[] {
    const todos = localStorage.getItem("todos");
    return todos
      ? JSON.parse(todos).map(
          (t: { name: string; completed: boolean }) =>
            new Todo(t.name, t.completed)
        )
      : [];
  }

  static clear() {
    localStorage.removeItem("todos");
  }

  static delete(todo: Todo) {
    const todos = Todo.retrieve();
    const index = todos.findIndex((t: Todo) => t.name === todo.name);
    if (index > -1) {
      todos.splice(index, 1);
      Todo.store(todos);
    }
  }

  static update(todo: Todo) {
    const todos = Todo.retrieve();
    const index = todos.findIndex((t: Todo) => t.name === todo.name);
    if (index > -1) {
      todos[index] = todo;
      Todo.store(todos);
    }
  }

  static add(todo: Todo) {
    const todos = Todo.retrieve();
    if (!todos.some((t) => t.name === todo.name)) {
      todos.push(todo);
      Todo.store(todos);
    }
  }

  static renderTodos() {
    const todos = Todo.retrieve();
    const ul = document.querySelector("ul") as HTMLUListElement;
    ul.innerHTML = "";
    todos.forEach((todo: Todo) => {
      const li = document.createElement("li");
      const span = document.createElement("span");
      span.textContent = todo.name;
      li.appendChild(span);
      li.className = todo.completed ? "completed" : "";
      li.addEventListener("click", () => {
        todo.toggle();
        Todo.update(todo);
        Todo.renderTodos();
      });
      const button = document.createElement("button");
      button.textContent = "Delete";
      button.addEventListener("click", (e) => {
        e.stopPropagation();
        Todo.delete(todo);
        Todo.renderTodos();
      });
      li.appendChild(button);
      ul.appendChild(li);
    });
  }

  
}

export { Todo };