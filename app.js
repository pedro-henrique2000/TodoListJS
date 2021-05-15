const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter");

const renderTodo = (todo) => {
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  const newTodo = document.createElement("li");
  newTodo.innerText = todo.name;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  const completedButton = document.createElement("button");
  completedButton.classList.add("complete-btn");
  completedButton.innerHTML = '<i class="fas fa-check"> </i>';
  todoDiv.appendChild(completedButton);

  if (todo.completed) {
    todoDiv.classList.toggle("completed");
  }

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("trash-btn");
  deleteButton.innerHTML = '<i class="fas fa-trash"> </i>';

  todoDiv.appendChild(deleteButton);

  todoList.appendChild(todoDiv);
  todoInput.value = "";
};

const addTodo = (event) => {
  event.preventDefault();

  if (todoInput.value === "") {
    window.alert("Campo vazio!");
    return;
  }

  const todo = {
    name: todoInput.value,
    completed: false,
  };

  renderTodo(todo);
  saveTodos(todo);
  filterTodo();
};

const deleteCheck = (event) => {
  event.preventDefault();
  const item = event.target;
  const todo = item.parentElement;

  if (item.classList[0] === "complete-btn") {
    todo.classList.toggle("completed");
    checkOnLocal(todo);
  }

  if (item.classList[0] === "trash-btn") {
    todo.classList.add("fall");
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
    removeOnLocal(todo);
  }
};

const checkOnLocal = (todo) => {
  const todos = getLocalStorage();
  const todoText = todo.childNodes[0].innerText;

  todos.forEach((x) => {
    if (x.name === todoText) {
      x.completed = !x.completed;
      return;
    }
  });

  localStorage.setItem("todos", JSON.stringify(todos));
};

const filterTodo = () => {
  const todos = todoList.childNodes;
  const filterValue = filterOption.value;

  todos.forEach((todo) => {
    switch (filterValue) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
};

const saveTodos = (todo) => {
  const todos = getLocalStorage();
  todos.push(todo);

  localStorage.setItem("todos", JSON.stringify(todos));
};

const getTodos = () => {
  const todos = getLocalStorage();

  todos.forEach((todo) => {
    renderTodo(todo);
  });
};

const removeOnLocal = (todo) => {
  const todos = getLocalStorage();
  const todoIndex = todo.childNodes[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);

  localStorage.setItem("todos", JSON.stringify(todos));
};

const getLocalStorage = () => {
  let todos;
  if (!localStorage.getItem("todos")) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  return todos;
};

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);
document.addEventListener("DOMContentLoaded", getTodos);
