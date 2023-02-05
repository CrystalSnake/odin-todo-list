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
  get(title, id, date) {
    const task = document.createElement('div');
    task.classList.add(
      'flex',
      'justify-between',
      'items-center',
      'gap-3',
      'bg-sky-100',
      'my-2',
      'py-3',
      'px-5',
      'rounded-tl-2xl'
    );
    task.dataset.taskId = id;
    const taskInfoContainer = document.createElement('div');
    taskInfoContainer.classList.add(
      'flex',
      'justify-between',
      'items-center',
      'w-full'
    );
    const taskTitle = document.createElement('h4');
    taskTitle.classList.add('text-xl');
    taskTitle.textContent = title;
    const taskDate = document.createElement('p');
    taskDate.classList.add('p-0');
    taskDate.textContent = date;
    taskInfoContainer.appendChild(taskTitle);
    taskInfoContainer.appendChild(taskDate);
    const taskDelete = document.createElement('button');
    taskDelete.classList.add('pb-1', 'text-rose-700', 'text-2xl');
    taskDelete.textContent = '×';
    taskDelete.addEventListener('click', () => {
      toDoList.splice(task.dataset.taskId, 1);
      renderProjectsList();
      renderTasks();
    });
    task.appendChild(taskInfoContainer);
    task.appendChild(taskDelete);
    return task;
  }
}

// function getTask(title, id, date) {
//   const task = document.createElement('div');
//   task.classList.add(
//     'flex',
//     'justify-between',
//     'items-center',
//     'gap-3',
//     'bg-sky-100',
//     'my-2',
//     'py-3',
//     'px-5',
//     'rounded-tl-2xl'
//   );
//   task.dataset.taskId = id;
//   const taskInfoContainer = document.createElement('div');
//   taskInfoContainer.classList.add(
//     'flex',
//     'justify-between',
//     'items-center',
//     'w-full'
//   );
//   const taskTitle = document.createElement('h4');
//   taskTitle.classList.add('text-xl');
//   taskTitle.textContent = title;
//   const taskDate = document.createElement('p');
//   taskDate.classList.add('p-0');
//   taskDate.textContent = date;
//   taskInfoContainer.appendChild(taskTitle);
//   taskInfoContainer.appendChild(taskDate);
//   const taskDelete = document.createElement('button');
//   taskDelete.classList.add('pb-1', 'text-rose-700', 'text-2xl');
//   taskDelete.textContent = '×';
//   taskDelete.addEventListener('click', () => {
//     toDoList.splice(task.dataset.taskId, 1);
//     renderProjectsList();
//     renderTasks();
//   });
//   task.appendChild(taskInfoContainer);
//   task.appendChild(taskDelete);
//   return task;
// }

// function renderTasks() {
//   const notesContainer = document.querySelector('#notes-list');
//   notesContainer.textContent = '';
//   for (let task in toDoList) {
//     notesContainer.appendChild(
//       getTask(toDoList[task].title, task, toDoList[task].date)
//     );
//   }
//   return notesContainer;
// }

export default Task;
