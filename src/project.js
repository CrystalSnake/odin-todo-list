import toDoList from './todolist';
import renderTasks from '.';

function getProjectsList() {
  const projectsList = [];
  for (let task of toDoList) {
    if (task.project) {
      projectsList.push(task.project);
    }
  }
  return new Set(projectsList);
}

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
    listItem.addEventListener('click', filterTaskProject);
    projectsList.appendChild(listItem);
  }
  projectsContainer.appendChild(projectsHead);
  projectsContainer.appendChild(projectsList);
  return projectsContainer;
}

function filterTaskProject(e) {
  renderTasks(toDoList.filter((task) => task.project === e.target.textContent));
}

export default renderProjectsList;
