import toDoList from './storage';

function getProjectsList() {
  const projectsList = [];
  for (let task of toDoList) {
    if (task.project) {
      projectsList.push(task.project);
    }
  }
  return new Set(projectsList);
}

export default getProjectsList;
