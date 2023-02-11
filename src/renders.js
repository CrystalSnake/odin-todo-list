import toDoList from './storage';
import getProjectsList from './project';
import getContainer from './UI';
import { list } from './task';

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
    'task-card-text',
    'flex',
    'flex-wrap',
    'justify-between',
    'items-center',
    'w-full'
  );
  const taskTitle = document.createElement('h4');
  taskTitle.classList.add('text-xl', 'cursor-pointer');
  taskTitle.textContent = task.title;
  taskTitle.addEventListener('click', expandTaskCard);
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

function expandTaskCard(e) {
  if (document.querySelector('.task-description')) {
    document.querySelector('.task-description').remove();
  } else {
    const description = document.createElement('div');
    description.classList.add('task-description', 'w-full', 'mt-2');
    description.textContent =
      toDoList[e.target.closest('.task-card').dataset.taskId].description;
    e.target.closest('.task-card-text').appendChild(description);
  }
}

function renderTaskList() {
  const notesContainer = document.querySelector('#notes-list');
  notesContainer.textContent = '';
  for (let task in list.taskFilterList) {
    notesContainer.appendChild(renderTask(list.taskFilterList[task], task));
  }
}

function delTaskListener(e) {
  toDoList.splice(e.target.closest('.task-card').dataset.taskId, 1);
  localStorage.setItem('tasks', JSON.stringify(toDoList));
  renderProjectsList();
  e.target.closest('.task-card').remove();
  e.stopPropagation();
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
      list.taskFilterList = toDoList.filter(
        (task) => task.project === e.target.textContent
      );
      renderTaskList();
    });
    projectsList.appendChild(listItem);
  }
  projectsContainer.appendChild(projectsHead);
  projectsContainer.appendChild(projectsList);
  return projectsContainer;
}

export { list, renderUI, renderProjectsList, renderTaskList };
