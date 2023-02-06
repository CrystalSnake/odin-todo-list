import './style.css';
import modalContainer from './modal';
import Task from './task';
import toDoList from './todolist';
import renderProjectsList from './project';

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
    'relative',
    'p-5',
    'pl-7'
  );
  const menu = document.createElement('aside');
  const home = document.createElement('h3');
  home.classList.add('text-4xl', 'my-2');
  home.textContent = 'Home';
  const homeList = document.createElement('ul');
  homeList.classList.add('text-xl');
  for (let i of [
    { title: 'All tasks', id: 'all' },
    { title: 'Today', id: 'today' },
    { title: 'Week', id: 'week' },
  ]) {
    const li = document.createElement('li');
    li.textContent = i.title;
    li.classList.add('cursor-pointer');
    li.setAttribute('id', i.id);
    homeList.appendChild(li);
  }
  const projectsContainer = document.createElement('div');
  projectsContainer.setAttribute('id', 'projects');
  menu.appendChild(home);
  menu.appendChild(homeList);
  menu.appendChild(projectsContainer);
  asideContainer.appendChild(menu);
  asideContainer.appendChild(getAddButton());
  return asideContainer;
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
  mainHead.textContent = 'Tasks';
  const notesList = document.createElement('div');
  notesList.setAttribute('id', 'notes-list');
  main.appendChild(mainHead);
  main.appendChild(notesList);
  mainContainer.appendChild(main);
  return mainContainer;
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

function renderTasks(list) {
  const notesContainer = document.querySelector('#notes-list');
  notesContainer.textContent = '';
  for (let task in list) {
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
    taskCard.dataset.taskId = task;
    const taskInfoContainer = document.createElement('div');
    taskInfoContainer.classList.add(
      'flex',
      'justify-between',
      'items-center',
      'w-full'
    );
    const taskTitle = document.createElement('h4');
    taskTitle.classList.add('text-xl');
    taskTitle.textContent = list[task].title;
    const taskDate = document.createElement('p');
    taskDate.classList.add('p-0');
    taskDate.textContent = list[task].date;
    taskInfoContainer.appendChild(taskTitle);
    taskInfoContainer.appendChild(taskDate);
    const taskDelete = document.createElement('button');
    taskDelete.classList.add('pb-1', 'text-rose-700', 'text-2xl');
    taskDelete.textContent = '×';
    taskDelete.addEventListener('click', delTaskListener);
    taskCard.appendChild(taskInfoContainer);
    taskCard.appendChild(taskDelete);
    notesContainer.appendChild(taskCard);
  }
}

const all = document.querySelector('#all');
all.addEventListener('click', () => renderTasks(toDoList));

renderProjectsList();
renderTasks(toDoList);

function delTaskListener(e) {
  toDoList.splice(e.target.closest('.task-card').dataset.taskId, 1);
  renderProjectsList();
  e.target.closest('.task-card').remove();
}

const closeButton = document.querySelector('#close');
closeButton.addEventListener('click', () => {
  const modal = document.getElementById('modal');
  modal.classList.add('hidden');
});

const addButton = document.querySelector('#add');
addButton.addEventListener('click', () => {
  const title = document.querySelector('#title');
  const taskProject = document.querySelector('#project');
  const description = document.querySelector('#description');
  const date = document.querySelector('#date');
  const newTask = new Task(
    title.value,
    description.value,
    taskProject.value,
    date.value
  );
  newTask.add();
  renderTasks(toDoList);
  renderProjectsList();
});

export default renderTasks;
