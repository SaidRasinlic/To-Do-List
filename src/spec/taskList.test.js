import TaskList from '../modules/taskList.js';

// Arrange
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

describe('addTask', () => {
  test('should exist', () => {
    // Act and Assert
    expect(myToDoListMock.addTask).toBeDefined();
  });

  test('should NOT add an empty Task', () => {
    // Act
    myToDoListMock.addTask('');

    // Assert
    expect(myToDoListMock.todoList.length).toBe(0);
  });

  test('should add a new valid Task', () => {
    // Act
    myToDoListMock.addTask('New Task');

    // Assert
    expect(myToDoListMock.todoList.length).toBe(1);
  });
});

describe('deleteTask', () => {
  test('should exist', () => {
    // Act and Assert
    expect(myToDoListMock.deleteTask).toBeDefined();
  });
  test('should delete a Task', () => {
    // Arrange
    myToDoListMock.addTask('Task to be deleted');
    const taskLength = myToDoListMock.todoList.length;
    // Act
    myToDoListMock.deleteTask(0);

    // Assert
    expect(myToDoListMock.todoList.length).toBe(taskLength - 1);
  });
});