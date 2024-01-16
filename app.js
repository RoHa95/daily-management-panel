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
const newItem = [
  { concept: goal, btn: addNewGoal },
  { concept: todolist, btn: addNewTodolist },
  { concept: note, btn: note },
];
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
  const allImage = JSON.parse(localStorage.getItem("pic2")) || [];
  console.log(NoteView);
  console.log(GoalsView);
  console.log(allImage);
  let pp = new PicView(allImage);
  console.log(pp);
  console.log(TodoListView);
  // PicView.createPicList(allImage);
  TodoListView.creatTodoList();
});
