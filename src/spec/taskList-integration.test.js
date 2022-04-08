import {
  beforeEach, describe, expect, jest, test,
} from '@jest/globals';
import TaskList from '../modules/taskList.js';
import allowNewline from '../modules/allow-newline.js';

describe('Editing a task description', () => {
  const myToDoListMock = new TaskList();

  beforeEach(() => {
    global.localStorage = {};
    document.body.innerHTML = `
    <div class="wrapper">
    <ul class="to-do-header">
     <li>
      <h2>Today's to do</h2><span class="fa-solid fa-arrows-rotate fa-lg" title="Filter list" id="filter"><span id="counter"></span></span>
     </li>
     <li>
      <input type="text" id="todo-item" required placeholder="Add to your list..."><span class="fa-solid fa-plus fa-lg" id="add-button"></span>
     </li>
    </ul>
    <ul class="todo-list">
    </ul>
    <ul id="clear-all-btn" class="to-do-footer">
     <li id="clear-completed">Clear all completed</li>
    </ul>
   </div>
     `;
  });

  test('should permit the edition of an existing task', () => {
    const toggleEditModeMock = jest.fn((parent) => {
      parent.classList.toggle('edit-mode');
      parent.children[1].classList.toggle('hidden');
      parent.children[2].classList.toggle('hidden');
    });

    const blurEventMock = jest.fn((description, task) => {
      toggleEditModeMock(description.parentElement.parentElement);
      task.description = allowNewline(description.innerHTML);
      myToDoListMock.updateLocalStorage();
    });

    myToDoListMock.todoList = [{
      index: 0,
      description: 'My first incomplete task',
      completed: false,
    },
    {
      index: 1,
      description: 'My first complete task',
      completed: true,
    },
    {
      index: 2,
      description: 'My second incomplete task',
      completed: false,
    },
    {
      index: 3,
      description: 'My second complete task',
      completed: true,
    }];

    myToDoListMock.renderList();
    const editingTaskIndex = 0;
    const description = document.getElementById(`task-${editingTaskIndex}`).children[0].children[1];
    toggleEditModeMock(description.parentElement.parentElement);
    expect(description.parentElement.parentElement.classList).toContain('edit-mode');
    description.innerHTML += ' - editing!';
    blurEventMock(description, myToDoListMock.todoList[editingTaskIndex]);
    expect(myToDoListMock.todoList[editingTaskIndex].description).toBe('My first incomplete task - editing!');
  });
});

describe('update Completed status', () => {
  const myToDoListMock = new TaskList();

  beforeEach(() => {
    global.localStorage = {};
    document.body.innerHTML = `
    <div class="wrapper">
    <ul class="to-do-header">
     <li>
      <h2>Today's to do</h2><span class="fa-solid fa-arrows-rotate fa-lg" title="Filter list" id="filter"><span id="counter"></span></span>
     </li>
     <li>
      <input type="text" id="todo-item" required placeholder="Add to your list..."><span class="fa-solid fa-plus fa-lg" id="add-button"></span>
     </li>
    </ul>
    <ul class="todo-list">
    </ul>
    <ul id="clear-all-btn" class="to-do-footer">
     <li id="clear-completed">Clear all completed</li>
    </ul>
   </div>
     `;
  });

  test('should update an item\'s \'completed\' status', () => {
    const toggleCompletedModeMock = jest.fn((el) => {
      const index = el.parentElement.parentElement.id.split('-')[1];
      myToDoListMock.todoList[index].completed = !myToDoListMock.todoList[index].completed;
      document.getElementById(`task-${index}`).children[0].firstChild.classList.toggle('completed');
      myToDoListMock.updateLocalStorage();
    });

    myToDoListMock.todoList = [{
      index: 0,
      description: 'My first incomplete task',
      completed: false,
    },
    {
      index: 1,
      description: 'My first complete task',
      completed: true,
    },
    {
      index: 2,
      description: 'My second incomplete task',
      completed: false,
    },
    {
      index: 3,
      description: 'My second complete task',
      completed: true,
    }];

    myToDoListMock.renderList();
    const updateTaskIndex = 0;
    const checkboxMock = document.getElementById(`task-${updateTaskIndex}`).children[0].firstChild;
    expect(myToDoListMock.todoList[updateTaskIndex].completed).toBe(false);
    toggleCompletedModeMock(checkboxMock);
    expect(myToDoListMock.todoList[updateTaskIndex].completed).toBe(true);
  });
});

describe('clearAll completed', () => {
  const myToDoListMock = new TaskList();

  beforeEach(() => {
    global.localStorage = {};
    document.body.innerHTML = `
    <div class="wrapper">
    <ul class="to-do-header">
     <li>
      <h2>Today's to do</h2><span class="fa-solid fa-arrows-rotate fa-lg" title="Filter list" id="filter"><span id="counter"></span></span>
     </li>
     <li>
      <input type="text" id="todo-item" required placeholder="Add to your list..."><span class="fa-solid fa-plus fa-lg" id="add-button"></span>
     </li>
    </ul>
    <ul class="todo-list">
    </ul>
    <ul id="clear-all-btn" class="to-do-footer">
     <li id="clear-completed">Clear all completed</li>
    </ul>
   </div>
     `;
  });

  test('should exist', () => {
    expect(myToDoListMock.clearAllBtn).toBeDefined();
  });

  test('should clear all completed', () => {
    myToDoListMock.todoList = [{
      index: 0,
      description: 'My first incomplete task',
      completed: false,
    },
    {
      index: 1,
      description: 'My first complete task',
      completed: true,
    },
    {
      index: 2,
      description: 'My second incomplete task',
      completed: false,
    },
    {
      index: 3,
      description: 'My second complete task',
      completed: true,
    }];
    expect(myToDoListMock.todoList.length).toBe(4);
    myToDoListMock.clearAllBtn();
    expect(myToDoListMock.todoList.length).toBe(2);
  });
});

describe('updateIndexes() method', () => {
  const myToDoListMock = new TaskList();

  beforeEach(() => {
    global.localStorage = {};
    document.body.innerHTML = `
    <div class="wrapper">
    <ul class="to-do-header">
     <li>
      <h2>Today's to do</h2><span class="fa-solid fa-arrows-rotate fa-lg" title="Filter list" id="filter"><span id="counter"></span></span>
     </li>
     <li>
      <input type="text" id="todo-item" required placeholder="Add to your list..."><span class="fa-solid fa-plus fa-lg" id="add-button"></span>
     </li>
    </ul>
    <ul class="todo-list">
    </ul>
    <ul id="clear-all-btn" class="to-do-footer">
     <li id="clear-completed">Clear all completed</li>
    </ul>
   </div>
     `;
  });

  test('should exist', () => {
    expect(myToDoListMock.updateIndexes).toBeDefined();
  });

  test('should update an item\'s index property upon drag/drop actions', () => {
    myToDoListMock.todoList = [{
      index: 0,
      description: 'My first incomplete task',
      completed: false,
    },
    {
      index: 1,
      description: 'My first complete task',
      completed: true,
    },
    {
      index: 2,
      description: 'My second incomplete task',
      completed: false,
    },
    {
      index: 3,
      description: 'My second complete task',
      completed: true,
    }];
    [myToDoListMock.todoList[0], myToDoListMock.todoList[1]] = [
      myToDoListMock.todoList[1],
      myToDoListMock.todoList[0],
    ];
    myToDoListMock.updateIndexes();
    let counterIndex = 0;
    myToDoListMock.todoList.forEach((task) => {
      expect(task.index).toBe(counterIndex);
      counterIndex += 1;
    });
  });
});