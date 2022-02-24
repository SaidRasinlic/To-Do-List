import './style.css';

const toDoList = document.querySelector('.to-do-list');

const taskList = [
  { id: 0, description: 'Prayer time', completed: false },
  { id: 1, description: 'Breakfast', completed: false },
  { id: 2, description: 'Gym time', completed: true },
  { id: 3, description: 'Chill time', completed: false },
  { id: 4, description: 'Finish the project', completed: true },
];

taskList.forEach((data) => {
  taskList.sort((a, b) => a.index - b.index);
  toDoList.innerHTML += `
  <li id="${data.id}"><span><input type="checkbox" ${data.completed ? 'checked' : 'unchecked'}>
  <span>${data.description}</span></span><span class="fa-solid fa-ellipsis-vertical fa-lg"></span>
  </li>
`;
});
