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
  if (document.querySelector('.expand')) {
    document.querySelector('.expand').remove();
  } else {
    const expand = document.createElement('div');
    expand.classList.add('expand', 'w-full');
    const description = document.createElement('div');
    description.classList.add('task-description', 'mt-2');
    description.textContent =
      toDoList[e.target.closest('.task-card').dataset.taskId].description;
    const taskEdit = document.createElement('button');
    taskEdit.textContent = 'Edit';
    taskEdit.classList.add(
      'edit-button',
      'bg-white',
      'rounded-md',
      'py-1',
      'px-2'
    );
    taskEdit.addEventListener('click', editTaskCard);
    expand.appendChild(description);
    expand.appendChild(taskEdit);
    e.target.closest('.task-card-text').appendChild(expand);
  }
}

function editTaskCard(e) {
  const editForm = document.createElement('div');
  editForm.classList.add('w-full', 'mt-3');
  const editHeader = document.createElement('h3');
  editHeader.textContent = 'Editing';
  editHeader.classList.add('text-xl');
  editForm.appendChild(editHeader);

  const form = document.createElement('form');
  form.setAttribute('action', '#');
  form.setAttribute('id', 'edit-task');
  form.setAttribute('method', 'post');

  const nameLabel = document.createElement('label');
  nameLabel.setAttribute('for', 'title');
  nameLabel.textContent = 'Task title';
  form.appendChild(nameLabel);
  const nameInput = document.createElement('input');
  nameInput.setAttribute(
    'value',
    `${toDoList[e.target.closest('.task-card').dataset.taskId].title}`
  );
  nameInput.classList.add(
    'w-full',
    'h-10',
    'px-3',
    'border',
    'border-gray-200',
    'rounded-lg',
    'focus-visible:outline-blue-600'
  );
  nameInput.setAttribute('type', 'text');
  nameInput.setAttribute('name', 'task-title');
  nameInput.setAttribute('id', 'title');
  form.appendChild(nameInput);

  const projectLabel = document.createElement('label');
  projectLabel.setAttribute('for', 'project');
  projectLabel.textContent = 'Task project';
  form.appendChild(projectLabel);
  const projectInput = document.createElement('input');
  projectInput.setAttribute(
    'value',
    `${toDoList[e.target.closest('.task-card').dataset.taskId].project}`
  );
  projectInput.classList.add(
    'w-full',
    'h-10',
    'px-3',
    'border',
    'border-gray-200',
    'rounded-lg',
    'focus-visible:outline-blue-600'
  );
  projectInput.setAttribute('type', 'text');
  projectInput.setAttribute('name', 'task-project');
  projectInput.setAttribute('id', 'project');
  form.appendChild(projectInput);

  const dateLabel = document.createElement('label');
  dateLabel.classList.add('inline-block', 'w-full');
  dateLabel.setAttribute('for', 'date');
  dateLabel.textContent = 'Task date';
  form.appendChild(dateLabel);
  const dateInput = document.createElement('input');
  dateInput.setAttribute(
    'value',
    `${toDoList[e.target.closest('.task-card').dataset.taskId].date}`
  );
  dateInput.classList.add(
    'h-10',
    'px-3',
    'border',
    'border-gray-200',
    'rounded-lg',
    'focus-visible:outline-blue-600'
  );
  dateInput.setAttribute('type', 'date');
  dateInput.setAttribute('name', 'task-date');
  dateInput.setAttribute('id', 'date');
  form.appendChild(dateInput);

  const descriptionLabel = document.createElement('label');
  descriptionLabel.classList.add('inline-block', 'w-full');
  descriptionLabel.setAttribute('for', 'description');
  descriptionLabel.textContent = 'Task description';
  form.appendChild(descriptionLabel);
  const descriptionInput = document.createElement('textarea');
  descriptionInput.textContent = `${
    toDoList[e.target.closest('.task-card').dataset.taskId].description
  }`;
  descriptionInput.classList.add(
    'w-full',
    'h-100',
    'px-3',
    'border',
    'border-gray-200',
    'rounded-lg',
    'focus-visible:outline-blue-600'
  );
  descriptionInput.setAttribute('name', 'task-description');
  descriptionInput.setAttribute('id', 'description');
  form.appendChild(descriptionInput);

  editForm.appendChild(form);
  const save = document.createElement('button');
  save.textContent = 'Save';
  save.classList.add('bg-white', 'rounded-md', 'py-1', 'px-2', 'mt-2');
  save.addEventListener('click', (e) => {
    toDoList[e.target.closest('.task-card').dataset.taskId].title =
      nameInput.value;
    toDoList[e.target.closest('.task-card').dataset.taskId].project =
      projectInput.value;
    toDoList[e.target.closest('.task-card').dataset.taskId].date =
      dateInput.value;
    toDoList[e.target.closest('.task-card').dataset.taskId].description =
      descriptionInput.value;
    localStorage.setItem('tasks', JSON.stringify(toDoList));
    renderProjectsList();
    renderTaskList();
  });
  editForm.appendChild(save);
  e.target.closest('.expand').appendChild(editForm);
  e.target.closest('.edit-button').remove();
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

export { renderUI, renderProjectsList, renderTaskList };
