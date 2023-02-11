const defaultList = [
  {
    title: 'Test task',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    project: 'Test Project',
    date: '2023-02-10',
  },
  {
    title: 'Task 2',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    project: 'My Project',
  },
];

const toDoList = JSON.parse(localStorage.getItem('tasks')) || defaultList;

export default toDoList;
