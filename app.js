let todoInput = document.querySelector("#dataInput");
let todoOl = document.querySelector("#todoOl");

let todoArr = [];

let addTodo = () => {
  if (todoInput.value != "") {
    todoArr.push({
      text: todoInput.value,
      id: new Date().getTime(),
      isCompleted: false,
    });
    LB(true);
  } else {
    alert("You cannot add an empty todo!");
  }

  todoInput.value = "";

  renderSystem();
};

let LB = (check) => {
  if (check) {
    window.localStorage.setItem("todoArr", JSON.stringify(todoArr));
  } else {
    let todosData = JSON.parse(window.localStorage.getItem("todoArr"));
    todoArr = todosData || [];
  }
};

LB();

let deleteTodo = (id) => {
  todoArr = todoArr.filter((item) => item.id !== id);
  LB(true);
  renderSystem();
};

let clearTodo = () => {
  let ask = confirm("Are you sure you want to delete ALL todos?");

  if (ask) {
    todoArr = [];
  }
  LB(true);
  renderSystem();
};

let updateTodo = (todo_id) => {
  todoArr.forEach((todoObj) => {
    if (todoObj.id == todo_id) {
      todoObj.text = todoInput.value;
    }
  });

  document.querySelectorAll(".delBtn").forEach((btn) => (btn.disabled = false));
  document
    .querySelectorAll(".editBtn")
    .forEach((btn) => (btn.disabled = false));
  document.querySelector("#clearTodos").disabled = false;

  let addBtn = document.querySelector("#addBtn");
  addBtn.innerHTML = '<i class="bi bi-plus-circle"></i>';

  addBtn.removeAttribute("onClick");
  addBtn.setAttribute("onClick", `addTodo()`);
  todoInput.value = "";
  LB(true);

  renderSystem();
};

let editTodo = (todo_id) => {
  document.querySelectorAll(".delBtn").forEach((btn) => (btn.disabled = true));
  document.querySelectorAll(".editBtn").forEach((btn) => (btn.disabled = true));
  document.querySelector("#clearTodos").disabled = true;

  let findTodo = todoArr.find((todo) => todo.id == todo_id);
  todoInput.value = findTodo.text;

  let addBtn = document.querySelector("#addBtn");
  addBtn.innerHTML = `<i class="bi bi-pencil-square"></i>`;

  addBtn.removeAttribute("onClick");
  addBtn.setAttribute("onClick", `updateTodo('${todo_id}')`);
};

let doneTodo = (todo_id) => {
  let findTodo = todoArr.find((todo) => todo.id == todo_id);

  if (findTodo.isCompleted == true) {
    findTodo.isCompleted = false;
  } else {
    findTodo.isCompleted = true;
  }
  LB(true);

  renderSystem();
};

let renderSystem = () => {
  let todoOl = document.querySelector("#todoOl");
  if (todoArr.length) {
    document.querySelector("#todoOl").innerHTML = "";
    todoArr.map((item) => {
      let todoli = document.createElement("li");
      todoli.innerHTML += `
                    <div>
                          <input type="checkbox" ${item.isCompleted ? "checked" : ""} onchange="doneTodo(${item.id})" class="check "/>
                          <span class="${item.isCompleted ? "done" : ""}">${item.text}</span>
                          <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                              <button type="button" onclick="deleteTodo(${item.id})" class="delBtn btn-solid theme-danger">
                                  <i class="bi bi-x-circle"></i>
                                </button>
                                
                                <button type="button" onclick="editTodo(${item.id})" ${item.isCompleted ? "disabled" : ""} class="editBtn btn-solid theme-success">
                                    <i class="bi bi-pencil-square"></i>
                                </button>
                            </div>
                        </div>
                    `;
      todoOl.appendChild(todoli);
    });
  } else {
    todoOl.innerHTML = `
            <li class="empty">
                <span> Your list is empty! </span>
            </li>`;
  }
};

renderSystem();
