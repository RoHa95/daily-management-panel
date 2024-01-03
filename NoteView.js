import NoteApi from "./NoteApi.js";
const addNewNoteBtn = document.querySelector(".add-new-note");
const noteItemContainer = document.querySelector(".notes-item-container");
const changeBoard = document.querySelector(".change-board-container");
const noteController = document.querySelector(".notes-container");
class NoteView {
  constructor() {
    // noteController.addEventListener("click", (e) => this.addNotePanel(e));
    addNewNoteBtn.addEventListener("click", (e) => this.addNewNote(e));
    this.createNoteList();
  }
  addNotePanel(e) {
    changeBoard.innerHTML = `<h3>note</h3>
    <input class="note-title-input" type="text" placeholder="Title..." />
    <textarea id="description-input" placeholder="New Note..."></textarea>`;
    const titleInput = document.querySelector(".note-title-input");
    const descriptionInput = document.querySelector("#description-input");
    [titleInput, descriptionInput].forEach((inputFeild) =>
      inputFeild.addEventListener("blur", (e) => {
        const note = {};
        note.title = titleInput.value;
        note.description = descriptionInput.value;
        if (!titleInput.value || !descriptionInput.value) return;
        this.addNewNote(note);
        this.createNoteList();
        console.log(note);
        titleInput = "";
        descriptionInput = "";
      })
    );
  }
  addNewNote(e) {
    e.preventDefault();
    console.log("add new note");
    changeBoard.innerHTML = `<h3>note</h3>
    <input class="note-title-input" type="text" placeholder="Title..." />
    <textarea id="description-input" placeholder="New Note..."></textarea>`;
    const titleInput = document.querySelector(".note-title-input");
    const descriptionInput = document.querySelector("#description-input");
    [titleInput, descriptionInput].forEach((inputFeild) =>
      inputFeild.addEventListener("blur", (e) => {
        const note = {};
        note.title = titleInput.value;
        note.description = descriptionInput.value;
        note.id = e;
        if (!titleInput.value || !descriptionInput.value) return;
        NoteApi.saveNote(note);
        this.createNoteList();
        console.log(note);
        titleInput = "";
        descriptionInput = "";
      })
    );
  }
  createNoteList() {
    const allNotes = NoteApi.getAllNotes();
    let result = "";
    allNotes.forEach((note) => {
      result += `<div class="note-item" data-note-id = ${note.id}>
      <h3>${note.title}</h3>
      <p>
        ${note.description}
      </p>
    </div>`;
    });
    noteItemContainer.innerHTML = result;
    const notesItem = document.querySelectorAll(".note-item");
    notesItem.forEach((note) => {
      note.addEventListener("click", (e) => {
        const noteId = note.dataset.noteId;
        console.log(note.dataset.noteId);
        this.editeNote(noteId);
      });
    });
  }
  editeNote(e) {
    const noteId = e;
    const allNotes = NoteApi.getAllNotes();
    const note = allNotes.find((note) => note.id == e);
    console.log(note);
    changeBoard.innerHTML = `<h3>note</h3>
    <input class="note-title-input" type="text" value="${note.title}" />
    <textarea id="description-input">${note.description}</textarea>`;
    const titleInput = document.querySelector(".note-title-input");
    const descriptionInput = document.querySelector("#description-input");
    [titleInput, descriptionInput].forEach((inputFeild) =>
      inputFeild.addEventListener("blur", () => {
        const note = {};
        note.title = titleInput.value;
        note.description = descriptionInput.value;
        note.id = noteId;
        if (!titleInput.value || !descriptionInput.value) return;
        NoteApi.saveNote(note);
        this.createNoteList();
        console.log(note);
        titleInput = "";
        descriptionInput = "";
      })
    );
  }
}
export default new NoteView();
