import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService implements OnDestroy {

  todos: Todo[] = [];

  storageListenSub: Subscription;

  constructor() {
    this.loadState();

    this.storageListenSub = fromEvent(window, 'storage')
      .subscribe((event: StorageEvent) => {
        if(event.key === 'todos')
          this.loadState();
    })
  }

  ngOnDestroy() {
    if(this.storageListenSub)
      this.storageListenSub.unsubscribe();
  }

  getTodos() {
    return this.todos;
  }

  getTodo(id: string) {
    return this.todos.find(t => t.id === id);
  }

  addTodo(todo: Todo) {
    this.todos.push(todo);
    this.saveState();
  }

  updateTodo(id: string, updatedFields: Partial<Todo>) {
    var todo = this.getTodo(id);
    Object.assign(todo, updatedFields);
    this.saveState();
  }

  deleteTodo(id: string) {
    var index = this.todos.findIndex(t => t.id === id);
    if(index != -1) {
      this.todos.splice(index, 1);
      this.saveState();
    }
  }

  saveState() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  loadState() {
    try {
      var todosInStorage = JSON.parse(localStorage.getItem('todos'));
      this.todos.length = 0;
      this.todos.push(...todosInStorage);

    } catch (error) {
      console.log('There was an error retrieving the todos from localStorage');
      console.log(error);
    }
  }
}
