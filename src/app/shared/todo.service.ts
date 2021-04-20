import { Injectable } from '@angular/core';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todos: Todo[] = [
    new Todo("This is a test"),
    new Todo("This is a test also!")
  ];

  constructor() {
    this.todos[0].completed = true;
   }

  getTodos() {
    return this.todos;
  }

  getTodo(id: string) {
    return this.todos.find(t => t.id === id);
  }

  addTodo(todo: Todo) {
    this.todos.push(todo);
  }

  updateTodo(id: string, updatedFields: Partial<Todo>) {
    var todo = this.getTodo(id);
    Object.assign(todo, updatedFields);
  }

  deleteTodo(id: string) {
    var index = this.todos.findIndex(t => t.id === id);
    if(index != -1) {
      this.todos.splice(index, 1);
    }
  }
}
