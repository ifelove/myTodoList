let addBtn = document.getElementById("add");
let list = document.querySelector(".first");
let todoInput = document.querySelector(".todotitle");
let dateInput = document.querySelector(".date");
let todos = [];

class TodoApp {
  constructor(list) {
    this.list = list;
  }
  //get input value from the user and push to todos array
  createTodo() {
    let todotitle = todoInput.value;
    let dueDate = dateInput.value;
    let now = new Date();
    const id = now.getTime();

    //console.log(id, todotitle, dueDate);

    if (todotitle && dueDate) {
      todos.push({ todotitle: todotitle, dueDate: dueDate, id: id });
    } else {
      return;
    }
    console.log(todos);
    myTodo.savedTodo();
  }
  //create todo to the list
  //clear the inputbox
  //render
  addTodo() {
    myTodo.createTodo();
    myTodo.renderTodo();
    myTodo.clearInput();
  }

  clearInput() {
    todoInput.value = "";
    dateInput.value = "";
  }

  //rendring
  renderTodo() {
    this.list.innerHTML = "";
    let savedTodo = JSON.parse(localStorage.getItem("todos"));
    if (Array.isArray(savedTodo)) {
      todos = savedTodo;
      console.log("is array");
      console.log(todos);
    } else {
      todos = "";
    }
    let displayTodo = todos.map((todo, index) => {
      return `  <li>
            <div><span class="num">${index + 1}.</span>
    <span class="whatTodo">
${todo.todotitle}
    </span>
</div>
    <div>
<span class="whenTodo">
    ${todo.dueDate}
</span>
<button class="delBtn" id="${todo.id}">Delete</button>
</div>
</li>  `;
    });

    displayTodo = displayTodo.join("");
    this.list.innerHTML = displayTodo;

    // Delete Todo List functionality
    const delBtn = document.querySelectorAll(".delBtn");
    delBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        console.log(e.target);
        let toDelBtn = e.target;
        let toDelBtnId = parseInt(toDelBtn.id);
        //removing todo with the id with button pressed
        todos = todos.filter((todo) => {
          console.log(typeof todo.id);
          if (todo.id !== toDelBtnId) {
            return todo;
          }
        });
        myTodo.savedTodo();
        myTodo.renderTodo();
        console.log(todos);
      });
    });
  }

  //saving todosto the local storage
  savedTodo() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}

const myTodo = new TodoApp(list);
addBtn.addEventListener("click", myTodo.addTodo);
