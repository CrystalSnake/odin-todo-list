import isThisWeek from 'date-fns/isThisWeek';
import modalContainer from './modal';
import toDoList from './todolist';
import { list, renderTaskList } from './renders';

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
  for (let i of ['All tasks', 'Today', 'Week']) {
    const li = document.createElement('li');
    li.textContent = i;
    li.classList.add('cursor-pointer');
    li.addEventListener('click', (e) => {
      if (i === 'Week') {
        list.taskFilterList = toDoList.filter((task) =>
          isThisWeek(new Date(task.date))
        );
      } else if (i === 'Today') {
        list.taskFilterList = toDoList.filter(
          (task) => task.date === new Date().toISOString().split('T')[0]
        );
      } else {
        list.taskFilterList = toDoList;
      }
      renderTaskList();
    });
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

export default getContainer;
