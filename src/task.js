import toDoList from './todolist';
import renderProjectsList from './project';

class Task {
  constructor(title, description, project, date) {
    this.title = title;
    this.description = description;
    this.project = project;
    this.date = date;
  }
  add() {
    toDoList.push(this);
  }
}
export default Task;
