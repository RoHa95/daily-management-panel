import NoteView from "./NoteView.js";
import GoalsView from "./GoalsView.js";
import PicView from "./PicView.js";
//calendar setting
mobiscroll.datepicker("#demo-init-inline", {
  controls: ["calendar"],
  display: "inline",
});

// updating DOM
document.addEventListener("DOMContentLoaded", (e) => {
  console.log(NoteView);
  console.log(GoalsView);
  console.log(PicView);
  PicView.createPicList();
});
