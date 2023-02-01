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
  container.appendChild(getModal());
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

function getModal() {
  const modalContainer = document.createElement('div');
  modalContainer.classList.add(
    'modal',
    'absolute',
    'top-0',
    'left-0',
    'w-full',
    'h-full',
    'hidden'
  );
  const overlay = document.createElement('div');
  overlay.classList.add(
    'bg-black',
    'opacity-50',
    'w-full',
    'h-full',
    'z-10',
    'relative'
  );
  const modal = document.createElement('div');
  modal.classList.add(
    'absolute',
    'max-w-[900px]',
    'w-full',
    'h-[600px]',
    'bg-gray-100',
    'top-24',
    'left-0',
    'right-0',
    'mx-auto',
    'z-20',
    'py-10',
    'px-16'
  );
  const modalHead = document.createElement('h2');
  modalHead.classList.add('text-3xl', 'mb-2');
  modalHead.textContent = 'Add';
  modal.appendChild(modalHead);
  const modalDescription = document.createElement('p');
  modalDescription.textContent =
    'To add a task or project, select the appropriate mode using the radio button.';
  modal.appendChild(modalDescription);
  const addHead = document.createElement('h3');
  addHead.classList.add('text-3xl', 'mb-2');
  addHead.textContent = 'Add mode';
  modal.appendChild(addHead);
  const list = document.createElement('ul');
  list.classList.add('grid', 'w-full', 'gap-5', 'sm:grid-cols-2');
  list.appendChild(getModeButton('Task'));
  list.appendChild(getModeButton('Project'));
  modal.appendChild(list);
  modal.appendChild(getForm('note'));
  modalContainer.appendChild(overlay);
  modalContainer.appendChild(modal);
  return modalContainer;
}

function getModeButton(mode) {
  const listItem = document.createElement('li');
  const input = document.createElement('input');
  input.type = 'radio';
  input.id = `${mode.toLowerCase()}`;
  input.name = 'mode';
  input.value = `${mode.toLowerCase()}`;
  input.classList.add('hidden', 'peer');
  listItem.appendChild(input);
  const label = document.createElement('label');
  label.setAttribute('for', `${mode.toLowerCase()}`);
  label.classList.add(
    'inline-flex',
    'items-center',
    'justify-between',
    'w-full',
    'p-5',
    'text-gray-500',
    'bg-white',
    'border',
    'border-gray-200',
    'rounded-lg',
    'cursor-pointer',
    'dark:hover:text-gray-300',
    'dark:border-gray-700',
    'dark:peer-checked:text-blue-500',
    'peer-checked:border-blue-600',
    'peer-checked:text-blue-600',
    'hover:text-gray-600',
    'hover:bg-gray-100',
    'dark:text-gray-400',
    'dark:bg-gray-800',
    'dark:hover:bg-gray-700'
  );
  const block = document.createElement('div');
  label.appendChild(block);
  const name = document.createElement('div');
  name.classList.add('w-full', 'text-lg');
  name.textContent = mode;
  block.appendChild(name);
  block.classList.add('block');
  listItem.appendChild(label);
  return listItem;
}

function getForm(mode) {
  const formContainer = document.createElement('div');
  const form = document.createElement('form');
  if (mode === 'note') {
    form.insertAdjacentHTML(
      'beforeend',
      `<div>
		<form action="#" id="add-task" method="post">
			<legend class="my-3">
				Please fill all field marked with *, then press "Add" button.
			</legend>
			<div>
				<label for="task-title">
				<span class="block text-md font-medium">Task title*</span>
				</label>
				<input class="h-10 px-3 border border-gray-200 rounded-lg focus-visible:outline-blue-600" type="text" name="task-title" id="task-title" required />
			</div>
	
			<div>
				<label for="task-description">
					<span class="block text-md font-medium">Task description*</span>
				</label>
				<textarea class="h-100 w-full p-3 border border-gray-200 rounded-lg focus-visible:outline-blue-600" name="task-description" id="task-description"></textarea>
			</div>
		</form>
	</div>`
    );
  } else {
    form.insertAdjacentHTML(
      'beforeend',
      `<div>
		<form action="#" id="add-project" method="post">
			<legend class="my-3">
				Please fill all field marked with *, then press "Add" button.
			</legend>
			<div>
				<label for="project-title">
				<span class="block text-md font-medium">Project title*</span>
				</label>
				<input class="h-10 px-3 border border-gray-200 rounded-lg focus-visible:outline-blue-600" type="text" name="project-title" id="project-title" required />
			</div>
	
			<div>
				<label for="project-description">
					<span class="block text-md font-medium">Project description*</span>
				</label>
				<textarea class="h-100 w-full p-3 border border-gray-200 rounded-lg focus-visible:outline-blue-600" name="task-description" id="project-description"></textarea>
			</div>
		</form>
	</div>`
    );
  }
  const buttons = document.createElement('div');
  buttons.classList.add('flex', 'gap-3', 'justify-end', 'mt-3');
  buttons.appendChild(getButton('Close', 'border-rose-500'));
  buttons.appendChild(getButton('Add', 'border-blue-500'));
  form.appendChild(buttons);
  formContainer.appendChild(form);
  return formContainer;
}

function getButton(name, color) {
  const button = document.createElement('button');
  button.classList.add('px-3', 'py-3', 'border', 'rounded-lg', color);
  button.textContent = name;
  return button;
}
