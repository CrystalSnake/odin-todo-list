import './style.css';
import modalContainer from './modal';

const toDoList = [
  { title: 'asdfads', description: 'fsdfasdfasdf', project: undefined },
  { title: 'sfasdf', description: 'sdfweghfdhn', project: undefined },
  { title: 'lliosv', description: 'shylkaszxcdf', project: 'Test Project' },
];

class Task {
  constructor(title, description, project) {
    this.title = title;
    this.description = description;
    this.project = project;
  }
  add() {
    toDoList.push(this);
  }
}

document.body.classList.add('font-display');
document.body.appendChild(getContainer());

function getContainer() {
  const container = document.createElement('div');
  container.classList.add(
    'container',
    'flex',
    'flex-col',
    'justify-between',
    'h-screen',
    'max-w-[960px]',
    'mx-auto'
  );
  container.appendChild(getHeader('Todo List'));
  const content = document.createElement('div');
  content.classList.add('sm:flex', 'gap-5', 'h-full', 'w-full');
  content.appendChild(getAside());
  content.appendChild(getMain());
  container.appendChild(content);
  container.appendChild(getFooter());
  container.appendChild(modalContainer());
  return container;
}

function getHeader(name) {
  const headerContainer = document.createElement('div');
  headerContainer.classList.add('col-span-full', 'h-min', 'my-3', 'bg-sky-200');
  const header = document.createElement('header');
  const logo = document.createElement('h1');
  logo.textContent = name;
  logo.classList.add('text-center', 'text-5xl', 'font-logo', 'pt-3', 'pb-2');
  header.appendChild(logo);
  headerContainer.appendChild(header);
  return headerContainer;
}

function getAside() {
  const asideContainer = document.createElement('div');
  asideContainer.classList.add(
    'flex-none',
    'w-full',
    'min-w-[200px]',
    'sm:w-3/12',
    'bg-sky-200',
    'pl-5',
    'py-5',
    'relative'
  );
  const menuContainer = document.createElement('div');
  menuContainer.classList.add(
    'flex-none',
    'w-full',
    'min-w-[200px]',
    'sm:w-3/12',
    'bg-sky-200',
    'pl-5',
    'py-5'
  );
  const menu = document.createElement('aside');
  const home = document.createElement('h3');
  home.classList.add('text-3xl', 'mb-2');
  home.textContent = 'Home';
  const homeList = document.createElement('ul');
  const allTasks = document.createElement('li');
  allTasks.textContent = 'All tasks';
  const todayTasks = document.createElement('li');
  todayTasks.textContent = 'Today';
  const weekTasks = document.createElement('li');
  weekTasks.textContent = 'Week';
  getProjectList();
  homeList.appendChild(allTasks);
  homeList.appendChild(todayTasks);
  homeList.appendChild(weekTasks);
  menu.appendChild(home);
  menu.appendChild(homeList);
  menu.appendChild(getProjectList());
  menuContainer.appendChild(menu);
  asideContainer.appendChild(menuContainer);
  asideContainer.appendChild(getAddButton());
  return asideContainer;
}

function getProjectList() {
  const projectsContainer = document.createElement('div');
  const projectsHead = document.createElement('h3');
  projectsHead.classList.add('text-3xl', 'mb-2');
  projectsHead.textContent = 'Projects';
  const projectsList = document.createElement('ul');
  const listItem = document.createElement('li');
  listItem.textContent = 'Test Project';
  projectsList.appendChild(listItem);
  projectsContainer.appendChild(projectsHead);
  projectsContainer.appendChild(projectsList);
  return projectsContainer;
}

function getAddButton() {
  const addButton = document.createElement('button');
  addButton.textContent = '+';
  addButton.classList.add(
    'absolute',
    'bottom-10',
    'left-10',
    'bg-white',
    'w-10',
    'h-10',
    'rounded-full',
    'text-3xl',
    'hover:bg-slate-100'
  );
  addButton.addEventListener('click', () => {
    const modal = document.querySelector('.modal');
    modal.classList.remove('hidden');
  });
  return addButton;
}

function getMain() {
  const mainContainer = document.createElement('div');
  mainContainer.classList.add('sm:flex-1', 'w-full', 'sm:w-9/12');
  const main = document.createElement('main');
  main.classList.add('w-full');
  const mainHead = document.createElement('h2');
  mainHead.classList.add('text-4xl', 'mt-3', 'mb-4', 'text-center');
  mainHead.textContent = 'Notes';
  const notesList = document.createElement('div');
  notesList.setAttribute('id', 'notes-list');

  main.appendChild(mainHead);
  main.appendChild(notesList);
  mainContainer.appendChild(main);
  return mainContainer;
}

function renderTasks() {
  const notesContainer = document.querySelector('#notes-list');
  notesContainer.textContent = '';
  for (let task in toDoList) {
    notesContainer.appendChild(getTask(toDoList[task].title, task));
  }
  return notesContainer;
}

function getTask(title, id) {
  const note = document.createElement('div');
  note.classList.add('bg-teal-50', 'my-2', 'p-4');
  note.textContent = title;
  note.dataset.taskID = id;
  return note;
}

function getFooter() {
  const footerContainer = document.createElement('div');
  footerContainer.classList.add('align-bottom', 'bg-slate-300', 'h-min');
  const footer = document.createElement('footer');
  const copyright = document.createElement('p');
  copyright.classList.add('text-center', 'py-3');
  copyright.innerHTML =
    'Crystal Snake 2023	<a href="https://github.com/CrystalSnake">GitHub</a>';
  footer.appendChild(copyright);
  footerContainer.appendChild(footer);
  return footerContainer;
}

renderTasks();

function stopDefAction(evt) {
  evt.preventDefault();
}

const closeButton = document.querySelector('#close');
closeButton.addEventListener('click', () => {
  const modal = document.getElementById('modal');
  modal.classList.add('hidden');
});

const addButton = document.querySelector('#add');
addButton.addEventListener('click', () => {
  const title = document.querySelector('#title');
  const description = document.querySelector('#description');
  const newTask = new Task(title.value, description.value);
  newTask.add();
  renderTasks();
  console.log(toDoList);
});
