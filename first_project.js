const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

document.addEventListener("DOMContentLoaded", getTodos);
//addEventListener(type, listener);
//The object that receives a notification (an object that implements the Event interface) 
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);




function addTodo(event) {
  //Prevent form from submitting
  event.preventDefault();
  //todo DIV
  //A string that specifies the type of element to be created.
  const todoDiv = document.createElement("div");
  //add "todo" class to div 
  todoDiv.classList.add("todo");

  //create LI
  //<li class = "todo-item">hey</li>
  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);

  saveLocalTodos(todoInput.value);

  //<button class = "complete-btn">/checkmark button</button>
  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);


  //<button class="trash-btn">delete button</button>
  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  //append to todoList
  todoList.appendChild(todoDiv);

  //clear toto-input value
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;

  //delete

  if (item.classList[0] === "trash-btn") {
    // e.target.parentElement.remove();
    const todo = item.parentElement;
    todo.classList.add("fall");

    removeLocalTodos(todo);
    //at the end
    todo.addEventListener("transitionend", e => {
      todo.remove();
    });
  }
  //check
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}


function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
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
    }
  });
}

function saveLocalTodos(todo) {
  let todos;
  //if there is no todo array it creates a todo array
  if (localStorage.getItem("todos") === null) {
    todos = [];
  }
  //if there is todos array it just get the item
  else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  //then push it
  todos.push(todo);
  //set in todos as string in json format
  localStorage.setItem("todos", JSON.stringify(todos));
}

//take all the todos from local storage
function getTodos() {
  let todos;
  //if there is no todo array it creates a todo array
  if (localStorage.getItem("todos") === null) {
    todos = [];
  }
  //if there is todos array it just get the item
  else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

  
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);


    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);


    todoList.appendChild(todoDiv);

  });
}

function removeLocalTodos(todo)
{
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  }
  else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  let index = todo.children[0].innerText;
  //  console.log(todo.children[0].innerText);
  //  console.log(todos.indexOf(todo.children[0].innerText));
  todos.splice(todos.indexOf(index),1);

  //setback the array
  localStorage.setItem("todos", JSON.stringify(todos));
}
