import Task from './task.js';
import allowNewline from './allow-newline.js';
// Class that holds a collection of tasks and properties and functions for the group.
export default class TaskList {
  constructor() {
    this.todoList = localStorage.todoList ? JSON.parse(localStorage.todoList) : [];
  }

  addTask(description) {
    console.log(description);
    const newItem = document.getElementById('todo-item');
    if (description || newItem.value) {
      if (!description) description = newItem.value;
      newItem.value = '';
      this.todoList.push(new Task(this.todoList.length, description));
      this.updateLocalStorage();
      this.renderList();
    }
  }

  updateLocalStorage = () => {
    localStorage.todoList = JSON.stringify(this.todoList);
  }

  updateIndexes() {
    this.todoList.forEach((todo, index) => {
      todo.index = index;
    });
    this.updateLocalStorage();
    this.renderList();
  }

  deleteTask(id) {
    this.todoList.splice(id, 1);
    this.updateIndexes();
  }

  renderList() {
    const list = document.querySelector('.todo-list');
    list.innerHTML = '';
    this.todoList.forEach((todo) => {
      list.innerHTML += `
      <li class="element" id="task-${todo.index}">
      <span id="spanuj"><input class="checkbox ${todo.completed ? ' completed' : ''}" type="checkbox" checked="${todo.completed}">
      <span id="desc" contentEditable="true" spellcheck="false">${todo.description}</span></span>
      <span class="fa-solid fa-trash-can hidden" id="trash"></span>
      <span class="fa-solid fa-ellipsis-vertical fa-lg"></span>
      </li>`;
    });
    this.addEventListeners();
  }

  addEventListeners() {
    const obj = this;

    function toggleCompleted(e) {
      const index = e.target.parentElement.parentElement.id.split('-')[1];
      obj.todoList[index].completed = !obj.todoList[index].completed;
      document.getElementById(`task-${index}`).children[0].firstChild.classList.toggle('completed');
      obj.updateLocalStorage();
    }

    function toggleEditMode(parent) {
      parent.classList.toggle('edit-mode');
      parent.children[1].classList.toggle('hidden');
      parent.children[2].classList.toggle('hidden');
    }

    this.todoList.forEach((task) => {
      // Event listeners for the checkboxes (completed indicator).
      const checkbox = document.getElementById(`task-${task.index}`).children[0].firstChild;
      checkbox.addEventListener('change', toggleCompleted);
      checkbox.checked = task.completed;

      // Event listeners for editing tasks,
      const description = document.getElementById(`task-${task.index}`).children[0].children[1];
      description.addEventListener('focus', (e) => {
        toggleEditMode(e.target.parentElement.parentElement);
      });

      description.addEventListener('blur', () => {
        setTimeout(() => {
          toggleEditMode(description.parentElement.parentElement);
          task.description = allowNewline(description.innerHTML);
          obj.updateLocalStorage();
        }, 100);
      });

      // Event listeners for deleting tasks.
      const binBtn = document.getElementById(`task-${task.index}`).children[1];
      binBtn.addEventListener('click', () => obj.deleteTask(task.index));
    });
  }
}
