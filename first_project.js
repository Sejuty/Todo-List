const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');


//addEventListener(type, listener);
//The object that receives a notification (an object that implements the Event interface) 
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteCheck);

function addTodo(event)
{
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

    //<button class = "complete-btn">/checkmark button</button>
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);


    //<button class="trash-btn">delete button</button>
    const trashButton = document.createElement('button');
    trashButton.innerHTML =  '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //append to todoList
    todoList.appendChild(todoDiv);

    //clear toto-input value
    todoInput.value="";
}

function deleteCheck(e)
{
    const item = e.target;

    //delete
    if(item.classList[0] === 'trash-btn')
    {
        const todo = item.parentElement;
        todo.remove();
    }
    //check
    if(item.classList === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}