import  {Todo}  from './main';
Todo.renderTodos();

const form = document.querySelector("form.addTodo") as HTMLFormElement;
const input = document.querySelector("input.newTodo") as HTMLInputElement;
const button = document.querySelector("button.addTodo") as HTMLButtonElement;
const ul = document.querySelector("ul") as HTMLUListElement;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoText = input.value;
  if(!todoText){
    return;
  }
  input.value = "";
  const todo = new Todo(todoText, false);
  Todo.add(todo);
  Todo.renderTodos();
});
