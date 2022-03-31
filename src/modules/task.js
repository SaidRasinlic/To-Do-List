// An individual task. Holds properties for one task.
export default class Task {
  constructor(index = 0, description, completed = false) {
    this.index = index;
    this.description = description;
    this.completed = completed;
  }
}