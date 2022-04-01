import Task from './task.js';
import allowNewline from './allow-newline.js';
// Class that holds a collection of tasks and properties and functions for the group.
export default class TaskList {
  constructor() {
    this.todoList = localStorage.todoList ? JSON.parse(localStorage.todoList) : [];
  }

  // Adds task into the todoList array and calls update local and render functions
  addTask(description) {
    const newItem = document.getElementById('todo-item');
    if (description || newItem.value) {
      if (!description) description = newItem.value;
      newItem.value = '';
      this.todoList.push(new Task(this.todoList.length, description));
      this.updateLocalStorage();
      this.renderList();
    }
  }

  // Updates local storage
  updateLocalStorage = () => {
    localStorage.todoList = JSON.stringify(this.todoList);
  }

  // Update function updates indexes after removing task from the list
  updateIndexes() {
    this.todoList.forEach((todo, index) => {
      todo.index = index;
    });
    this.updateLocalStorage();
    this.renderList();
  }

  // Delete function deletes the task individually
  deleteTask(id) {
    this.todoList.splice(id, 1);
    this.updateIndexes();
  }

  // Clear function clears all completed (checked) tasks
  clearAllBtn() {
    this.todoList = this.todoList.filter((task) => !task.completed);
    this.updateIndexes();
  }

  getAllTasks = () => this.todoList.length;

  // Filter function empties/clears the whole list
  filterAll = () => {
    this.todoList.splice(0, this.todoList.length);
    this.updateIndexes();
  }

  // Creates USER ITERFACE, it simply generates elements to be displayed in our screen
  renderList() {
    const list = document.querySelector('.todo-list');
    const counter = document.querySelector('#counter');
    list.innerHTML = '';
    this.todoList.forEach((todo) => {
      list.innerHTML += `
      <li class="element" id="task-${todo.index}">
      <span id="spanuj"><input class="checkbox ${todo.completed ? ' completed' : ''}" type="checkbox" checked="${todo.completed}">
      <span id="desc" contentEditable="plaintext-only" spellcheck="false">${todo.description}</span></span>
      <span class="fa-solid fa-trash-can hidden"></span>
      <span class="fa-solid fa-ellipsis-vertical fa-lg"></span>
      </li>`;
    });
    counter.innerHTML = this.getAllTasks();
    this.addEventListeners();
  }

  // Event listeners per "this" (instance) object
  addEventListeners() {
    const obj = this;

    // It creates and toggle class "completed" if task checkbox is checked
    function toggleCompleted(e) {
      const index = e.target.parentElement.parentElement.id.split('-')[1];
      obj.todoList[index].completed = !obj.todoList[index].completed;
      document.getElementById(`task-${index}`).children[0].firstChild.classList.toggle('completed');
      obj.updateLocalStorage();
    }

    // Adds class and toggles per task ("li" element) and it's childrens
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

      // Event listeners for editing tasks, focus event is when content gets clicked
      const description = document.getElementById(`task-${task.index}`).children[0].children[1];
      description.addEventListener('focus', (e) => {
        toggleEditMode(e.target.parentElement.parentElement);
      });

      // Blur event means when focus is lost or when it's clicked outside of content
      description.addEventListener('blur', () => {
        setTimeout(() => {
          toggleEditMode(description.parentElement.parentElement);
          task.description = allowNewline(description.innerHTML);
          obj.updateLocalStorage();
        }, 300);
      });

      // Event listeners for deleting tasks.
      const binBtn = document.getElementById(`task-${task.index}`).children[1];
      binBtn.addEventListener('click', () => obj.deleteTask(task.index));
    });

    const clearAllBtn = document.getElementById('clear-completed');
    clearAllBtn.addEventListener('click', () => obj.clearAllBtn());

    // Event listener for filtering an array
    const filter = document.getElementById('filter');
    filter.addEventListener('click', () => obj.filterAll());
  }
}
