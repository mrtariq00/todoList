import {
  collection,
  getDocs,
  db,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "./firebaseconfig.js";

let todos = [];

let todoInput = document.querySelector("#dataInput");
let todoListElm = document.querySelector("#todoOl");
let addBtn = document.querySelector("#addBtn");
let clearBtn = document.querySelector("#clearTodos");

let fetchTodos = async () => {
  try {
    todos = [];
    const querySnapshot = await getDocs(collection(db, "todo"));

    querySnapshot.forEach((todoDoc) => {
      todos.push({
        ...todoDoc.data(),
        id: todoDoc.id,
      });
    });
    console.log(todos);
  } catch (error) {
    console.error(error);
  }
};

let renderTodos = () => {
  if (todos.length) {
    todoListElm.innerHTML = "";
    todos.map((item) => {
      let todoli = document.createElement("li");
      todoli.innerHTML = `
            <div>
            <input type="checkbox" ${item.isCompleted ? "checked" : ""} class="check" />
            <span class="${item.isCompleted ? "done" : ""}">${item.text}</span>
            <div class="btn-group" role="group" aria-label="Basic mixed styles example">
            <button type="button" class="delBtn btn-solid theme-danger">
            <i class="bi bi-x-circle"></i>
            </button>
            <button type="button" ${item.isCompleted ? "disabled" : ""} class="editBtn btn-solid theme-success">
            <i class="bi bi-pencil-square"></i>
            </button>
            </div>
            </div>
            `;

      todoli
        .querySelector(".check")
        .addEventListener("change", () => doneTodo(item.id));
      todoli
        .querySelector(".delBtn")
        .addEventListener("click", () => deleteTodo(item.id));
      todoli
        .querySelector(".editBtn")
        .addEventListener("click", () => editTodo(item.id));

      todoListElm.appendChild(todoli);
    });
  } else {
    todoListElm.innerHTML = `
        <li class="empty">
        <span> Your list is empty! </span>
        </li>`;
  }
};

let addTodo = async () => {
  try {
    if (!todoInput.value) {
      alert("please enter a todo");
      return;
    }

    const docRef = await addDoc(collection(db, "todo"), {
      text: todoInput.value,
      isCompleted: false,
    });
    todoInput.value = "";
    console.log("Document written with ID: ", docRef.id);

    fetchTodos().then(() => {
      renderTodos();
    });
  } catch (error) {
    console.error(error);
  }
};

let deleteTodo = async (todo_id) => {
  try {
    await deleteDoc(doc(db, "todo", todo_id));

    todos = todos.filter((todo) => todo.id != todo_id);
    renderTodos();

    console.log("todo successfully deleted");
  } catch (error) {
    console.error(error);
  }
};

let clearTodo = async () => {
  try {
    let ask = confirm("Are you sure ClearALl Data");

    if (ask) {
      const querySnapshot = await getDocs(collection(db, "todo"));

      for (const todoDoc of querySnapshot.docs) {
        await deleteDoc(doc(db, "todo", todoDoc.id));
      }

      todos = [];
      renderTodos();

      console.log("all todos successfully deleted");
    } else {
        return
    } 
  } catch (error) {
    console.error(error);
  }
};

let doneTodo = async (todo_id) => {
  try {
    let findTodo = todos.find((todo) => todo.id == todo_id);
    let newStatus = !findTodo.isCompleted;

    await updateDoc(doc(db, "todo", todo_id), {
      isCompleted: newStatus,
    });

    findTodo.isCompleted = newStatus;
    renderTodos();

    console.log("todo done or undone");
  } catch (error) {
    console.error(error);
  }
};

let editTodo = (todo_id) => {
  let findTodo = todos.find((todo) => todo.id == todo_id);
  todoInput.value = findTodo.text;

  clearBtn.disabled = true;
  document
    .querySelectorAll(".delBtn, .editBtn")
    .forEach((btn) => {btn.disabled = true});

  addBtn.innerHTML = '<i class="bi bi-pencil-square"></i>';
  addBtn.onclick = () => {
    updateTodo(todo_id);
  };
};

let updateTodo = async (todo_id) => {
  try {
    if (!todoInput.value) {
      alert("please enter a todo");
      return;
    }

    await updateDoc(doc(db, "todo", todo_id), {
      text: todoInput.value,
    });

    todos.forEach((todoObj) => {
      if (todoObj.id == todo_id) {
        todoObj.text = todoInput.value;
      }
    });

    todoInput.value = "";
    resetAddBtn();
    renderTodos();

    console.log("todo update");
  } catch (error) {
    console.error(error);
  }
};

let resetAddBtn = () => {
  clearBtn.disabled = false;
  document
    .querySelectorAll(".delBtn, .editBtn")
    .forEach((btn) => (btn.disabled = false));
  addBtn.innerHTML = '<i class="bi bi-plus-circle"></i>';
  addBtn.onclick = () => {
    addTodo();
  };
};

addBtn.onclick = () => {
  addTodo();
};
clearBtn.onclick = () => {
  clearTodo();
};

fetchTodos().then(() => {
  renderTodos();
});
