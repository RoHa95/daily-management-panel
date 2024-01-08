import NoteApi from "./NoteApi.js";
const addNewNoteBtn = document.querySelector(".add-new-note");
const noteItemContainer = document.querySelector(".notes-item-container");
const changeBoard = document.querySelector(".change-board-container");

class NoteView {
  constructor() {
    addNewNoteBtn.addEventListener("click", (e) => this.addNewNote(e));
    this.createNoteList();
  }
  addNewNote(e) {
    e.preventDefault();
    changeBoard.classList.remove("toast-view");
    console.log("add new note");
    changeBoard.innerHTML = `<h3>note</h3>
    <input class="note-title-input" type="text" placeholder="Title..." />
    <textarea id="description-input" placeholder="New Note..."></textarea>`;
    this.setNewNote();
  }
  setNewNote() {
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
      })
    );
  }

  createNoteList() {
    const allNotes = NoteApi.getAllNotes();
    let result = "";
    allNotes.forEach((note) => {
      result += `<div class="note-item" data-note-id = ${note.id}>
      <h3>${note.title}</h3>
      <p class="note-description-view">
        ${note.description.substring(0, 60)}
      </p>
      <div class="trash-note-container">
      <span class="note-date">${new Date(note.createAt).toLocaleDateString(
        "fa-IR"
      )}
      </span>
      <div >
      <i data-name-id=${
        note.id
      } class="far fa-trash-alt delete-note-btn"></i></div>
      </div>
    </div>`;
    });
    noteItemContainer.innerHTML = result;

    const deleteNoteBtns = document.querySelectorAll(".delete-note-btn");

    deleteNoteBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = e.target.dataset.nameId;
        NoteApi.deleteNote(id);
        this.createNoteList();
      });
    });
    const notesItem = document.querySelectorAll(".note-item");

    notesItem.forEach((note) => {
      note.addEventListener("click", (e) => {
        const noteId = note.dataset.noteId;
        this.editeNote(noteId);
      });
    });
  }
  editeNote(e) {
    changeBoard.classList.remove("toast-view");
    const noteId = e;
    const allNotes = NoteApi.getAllNotes();
    const note = allNotes.find((note) => note.id == e);
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
      })
    );
  }
}
export default new NoteView();
