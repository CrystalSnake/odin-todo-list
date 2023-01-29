import './style.css';

document.body.classList.add('font-display');
document.body.appendChild(getContainer());

function getContainer() {
  const container = document.createElement('div');
  container.classList.add(
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
    'py-5'
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

function getMain() {
  const mainContainer = document.createElement('div');
  mainContainer.classList.add('sm:flex-1', 'w-full', 'sm:w-9/12');
  const main = document.createElement('main');
  main.classList.add('w-full');
  const mainHead = document.createElement('h2');
  mainHead.classList.add('text-4xl', 'mt-3', 'mb-4', 'text-center');
  mainHead.textContent = 'Notes';
  const notesList = document.createElement('div');
  notesList.appendChild(getNote());
  main.appendChild(mainHead);
  main.appendChild(notesList);
  mainContainer.appendChild(main);
  return mainContainer;
}

function getNote() {
  const note = document.createElement('div');
  note.classList.add('bg-teal-50', 'my-2', 'p-4');
  note.textContent = 'Note 1';
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
