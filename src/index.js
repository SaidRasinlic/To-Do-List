import './style.css';
import TaskList from './modules/taskList.js';

const myToDoList = new TaskList();

window.onload = myToDoList.renderList();

const newItem = document.getElementById('add-button');
newItem.addEventListener('click', () => {
  myToDoList.addTask.apply(myToDoList);
});
