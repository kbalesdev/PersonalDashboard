import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NotificationData } from '../shared/notification.data.model';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  animations: [
    trigger('notificationAnim', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(5px)'
        }),
        animate('150ms 125ms ease-out')
      ]),
      transition(':leave', [
        animate(125, style({
          opacity: 0,
          transform: 'scale(0.85)'
        }))
      ])
    ])
  ]
})
export class NotificationComponent implements OnInit {

  notifications: NotificationData[];

  timeout: any;

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationService.notifications.subscribe((notification: NotificationData) => {
      this.notifications = Array(notification);

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.notifications = null;
      }, notification.duration);
    });
  }

}
