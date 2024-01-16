import NoteView from "./NoteView.js";
import GoalsView from "./GoalsView.js";
import PicView from "./PicView.js";
import TodoListView from "./TodoListView.js";

const todolist = document.querySelector(".todolist");
const changeBoard = document.querySelector(".change-board");
const goal = document.querySelector(".goal");
const note = document.querySelector(".note");
const addNewTodolist = document.querySelector(".add-new-todolist");
const addNewGoal = document.querySelector(".plus-container");
//calendar setting
mobiscroll.datepicker("#demo-init-inline", {
  controls: ["calendar"],
  display: "inline",
});
//
const newStyle = {
  color: "red",
};
const newItem = [
  { concept: goal, btn: addNewGoal },
  { concept: todolist, btn: addNewTodolist },
  { concept: note, btn: note },
];
const items = [goal, todolist, note];
Object.assign(todolist.style, newStyle);
newItem.forEach((item) =>
  item.btn.addEventListener("click", (e) => {
    const eleStyle = window.getComputedStyle(item.concept);
    console.log(eleStyle.order);
    const order = Number(eleStyle.order);
    const newOrder = {
      order: order + 1,
      color: "blue",
    };
    console.log(newOrder);
    Object.assign(changeBoard.style, newOrder);
  })
);
// updating DOM
document.addEventListener("DOMContentLoaded", (e) => {
  console.log(NoteView);
  console.log(GoalsView);
  console.log(PicView);
  console.log(TodoListView);
  PicView.createPicList();
  TodoListView.creatTodoList();
});
