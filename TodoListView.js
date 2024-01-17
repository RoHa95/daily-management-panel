import TodoListApi from "./TodoListApi.js";
const addTodoBtn = document.querySelector(".add-new-todolist");
const changeBoard = document.querySelector(".change-board-container");
const todoItemContainer = document.querySelector(".todolist-item-container");

class TodoListView {
  constructor() {
    const allTodoList = TodoListApi.getAllTodoList();
    console.log("hi");
    console.log(allTodoList);
    addTodoBtn.addEventListener("click", (e) => {
      console.log("hihi");
      changeBoard.classList.add("toast-view");
      changeBoard.innerHTML = `<div class="todo-input-container">
        <input maxlength="50" class="todo-input" type="text" />
      </div>`;
      const todoInput = document.querySelector(".todo-input");
      todoInput.addEventListener("blur", (e) => {
        console.log(e.target.value);
        if (!e.target.value) {
          return;
        }
        TodoListApi.saveTodoList({ title: e.target.value });
        changeBoard.innerHTML = ``;
        changeBoard.classList.remove("toast-view");
        this.creatTodoList();
      });
    });
  }
  creatTodoList() {
    const allTodoList = TodoListApi.getAllTodoList();
    let result = ``;
    if (allTodoList.length == 0) {
      result = `<span class="note-placeholder-container"><p class="note-placeholder">start add new todo!</p></span>`;
    }
    allTodoList.forEach((todo) => {
      result += ` <div class="todolist-item">
      <span><i data-delete-id=${
        todo.id
      } id="delete-btn" class="far fa-trash-alt ${
        todo.isCompleted ? "done1" : ""
      }"></i></span>
      <div class="todolist-item-icons">
      <p class=${todo.isCompleted ? "done" : ""} id="todo-title">${
        todo.title
      }</p>
      <i data-check-id=${todo.id} id="check-btn" class="far fa-check-square ${
        todo.isCompleted ? "done1" : ""
      }"></i>
      </div>
      
    </div>
        `;
    });
    todoItemContainer.innerHTML = result;
    const chechBtns = document.querySelectorAll("#check-btn");
    chechBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        console.log(e.target.dataset.checkId);
        const selectedTodolist = allTodoList.find(
          (todo) => todo.id == e.target.dataset.checkId
        );
        console.log(selectedTodolist);
        selectedTodolist.isCompleted = !selectedTodolist.isCompleted;
        TodoListApi.updatedTodoList(selectedTodolist);
        this.creatTodoList();
      });
    });
    const deleteBtn = document.querySelectorAll("#delete-btn");
    deleteBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        console.log(e.target);
        const id = e.target.dataset.deleteId;
        console.log(id);
        const allTodoList = TodoListApi.getAllTodoList();
        const selectedTodolist = allTodoList.find((todo) => todo.id == id);
        console.log(selectedTodolist);
        TodoListApi.deleteTodoList(id);
        this.creatTodoList();
      });
    });
  }
}
export default new TodoListView();
