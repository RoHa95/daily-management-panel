import NoteView from "./NoteView.js";
//calendar setting
mobiscroll.datepicker("#demo-init-inline", {
  controls: ["calendar"],
  display: "inline",
});

// updating DOM
document.addEventListener("DOMContentLoaded", (e) => {
  console.log(NoteView);
});
