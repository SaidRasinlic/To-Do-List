import './style.css';
import TaskList from './modules/taskList.js';

const myToDoList = new TaskList();

window.onload = myToDoList.renderList();

const newItemBtn = document.getElementById('add-button');
newItemBtn.addEventListener('click', (e) => {
  e.preventDefault();
  myToDoList.addTask.apply(myToDoList);
});
