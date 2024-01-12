export default class TodoListApi {
  static getAllTodoList() {
    const allTodoList = JSON.parse(localStorage.getItem("todolist")) || [];
    const sortedTodoList = allTodoList.sort((a, b) => {
      return new Date(a.createAt) < new Date(b.createAt) ? 1 : -1;
    });
    return sortedTodoList;
  }
  static saveTodoList(newTodo) {
    const allTodoList = TodoListApi.getAllTodoList();
    newTodo.createAt = new Date().toISOString();
    newTodo.id = new Date().getTime();
    newTodo.isCompleted = false;
    allTodoList.push(newTodo);
    localStorage.setItem("todolist", JSON.stringify(allTodoList));
  }
  static updatedTodoList(todoToUpdate) {
    const allTodoList = TodoListApi.getAllTodoList();
    const filtered = allTodoList.find((todo) => todo.id === todoToUpdate.id);
    const newAllTodoList = allTodoList.filter(
      (todo) => todo.id !== todoToUpdate.id
    );
    filtered.isCompleted = todoToUpdate.isCompleted;
    newAllTodoList.push(filtered);
    localStorage.setItem("todolist", JSON.stringify(newAllTodoList));
  }
  static deleteTodoList(id) {
    const allTodoList = TodoListApi.getAllTodoList();
    const filteredTodoList = allTodoList.filter((todo) => {
      return todo.id !== id;
    });
    localStorage.setItem("todolist", JSON.stringify(filteredTodoList));
  }
}
