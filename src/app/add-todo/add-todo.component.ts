import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../shared/notification.service';
import { Todo } from '../shared/todo.model';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {

  constructor(private todoService: TodoService, private router: Router, private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  onFormSubmit(form: NgForm) {
    if(form.invalid) return;

    var todo = new Todo(form.value.text);
    this.todoService.addTodo(todo);
    this.notificationService.onShow('Created todo!', 2500);
    this.router.navigateByUrl("/todos");
  }

}
