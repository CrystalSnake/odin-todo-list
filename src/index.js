import './style.css';
import { renderProjectsList, renderTaskList, renderUI } from './renders';
import toDoList from './todolist';

renderUI();
renderProjectsList(toDoList);
renderTaskList(toDoList);
