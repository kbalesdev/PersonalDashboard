import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotificationService } from '../shared/notification.service';
import { Todo } from '../shared/todo.model';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;

  @Output() editClick: EventEmitter<void> = new EventEmitter();

  constructor(private todoService: TodoService, private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  onEditClick() {
    this.editClick.emit();
  }

  onDeleteClick() {
    this.todoService.deleteTodo(this.todo.id);
    this.notificationService.onShow('Deleted todo!', 2500);
  }

}
