import toDoList from './todolist';
import getProjectsList from './project';
import getContainer from './UI';

function renderUI() {
  document.body.classList.add('font-display');
  document.body.appendChild(getContainer());
}

//Tasks

function renderTask(task, id) {
  const taskCard = document.createElement('div');
  taskCard.classList.add(
    'task-card',
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
  taskCard.dataset.taskId = id;
  const taskInfoContainer = document.createElement('div');
  taskInfoContainer.classList.add(
    'flex',
    'justify-between',
    'items-center',
    'w-full'
  );
  const taskTitle = document.createElement('h4');
  taskTitle.classList.add('text-xl');
  taskTitle.textContent = task.title;
  const taskDate = document.createElement('p');
  taskDate.classList.add('p-0');
  taskDate.textContent = task.date;
  taskInfoContainer.appendChild(taskTitle);
  taskInfoContainer.appendChild(taskDate);
  const taskDelete = document.createElement('button');
  taskDelete.classList.add('pb-1', 'text-rose-700', 'text-2xl');
  taskDelete.textContent = '×';
  taskDelete.addEventListener('click', delTaskListener);
  taskCard.appendChild(taskInfoContainer);
  taskCard.appendChild(taskDelete);
  return taskCard;
}

function renderTaskList(list) {
  const notesContainer = document.querySelector('#notes-list');
  notesContainer.textContent = '';
  for (let task in list) {
    notesContainer.appendChild(renderTask(list[task], task));
  }
}

function delTaskListener(e) {
  toDoList.splice(e.target.closest('.task-card').dataset.taskId, 1);
  renderProjectsList();
  e.target.closest('.task-card').remove();
}

//Projects

function renderProjectsList() {
  const projectsContainer = document.querySelector('#projects');
  projectsContainer.textContent = '';
  const projectsHead = document.createElement('h3');
  projectsHead.classList.add('text-4xl', 'my-2');
  projectsHead.textContent = 'Projects';
  const projectsList = document.createElement('ul');
  projectsList.classList.add('text-xl');
  for (let project of getProjectsList()) {
    const listItem = document.createElement('li');
    listItem.classList.add('cursor-pointer');
    listItem.textContent = project;
    listItem.addEventListener('click', (e) => {
      renderTaskList(
        toDoList.filter((task) => task.project === e.target.textContent)
      );
    });
    projectsList.appendChild(listItem);
  }
  projectsContainer.appendChild(projectsHead);
  projectsContainer.appendChild(projectsList);
  return projectsContainer;
}

export { renderUI, renderProjectsList, renderTaskList };
