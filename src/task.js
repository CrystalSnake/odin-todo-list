import toDoList from './storage';

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

function getSetList() {
  let taskFilterList = toDoList;

  Object.defineProperty(this, 'taskFilterList', {
    get() {
      return taskFilterList;
    },
    set(value) {
      taskFilterList = value;
    },
  });
}

const list = new getSetList();

export { list, Task };
