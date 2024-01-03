const notes = [
  {
    id: 1,
    title: "hellow",
    description: "hello world",
    createAt: "2023-12-28T15:02:54.411Z",
  },
];
class NoteApi {
  static getAllNotes() {
    const allNotes = JSON.parse(localStorage.getItem("notes")) || [];
    //sort
    const sortedNotes = allNotes.sort((a, b) =>
      new Date(a.createAt) < new Date(b.createAt) ? +1 : -1
    );
    return sortedNotes;
  }
  static saveNote(noteToSave) {
    const allNotes = NoteApi.getAllNotes();
    const existedNote = allNotes.find((note) => note.id == noteToSave.id);
    if (!existedNote) {
      noteToSave.id = new Date().getTime();
      noteToSave.createAt = new Date().toISOString();
      allNotes.push(noteToSave);
    } else {
      existedNote.title = noteToSave.title;
      existedNote.description = noteToSave.description;
    }
    console.log("done");
    localStorage.setItem("notes", JSON.stringify(allNotes));
  }
}
export default NoteApi;
