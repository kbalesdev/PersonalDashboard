import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('routeAnim', [
      transition(':increment', [
        style({
          position: 'relative',
          overflow: 'hidden'
        }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          })
        ], { optional: true }),
        group([
          query(':leave', [
            animate('300ms ease-in', style({
              opacity: 0,
              transform: 'translateX(-900px)'
            }))
          ], { optional: true }),
          query(':enter', [
            style({
              transform: 'translateX(900px)',
              opacity: 0
            }),
            animate('300ms 120ms ease-out', style({
              opacity: 1,
              transform: 'translateX(0)'
            }))
          ], { optional: true })
        ])   
      ]),

      transition(':decrement', [
        style({
          position: 'relative',
          overflow: 'hidden'
        }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          })
        ], { optional: true }),
        group([
          query(':leave', [
            animate('300ms ease-in', style({
              opacity: 0,
              transform: 'translateX(900px)'
            }))
          ], { optional: true }),
          query(':enter', [
            style({
              transform: 'translateX(-900px)',
              opacity: 0
            }),
            animate('300ms 120ms ease-out', style({
              opacity: 1,
              transform: 'translateX(0)'
            }))
          ], { optional: true })
        ])
      ])
    ])
  ]
})
export class AppComponent {
  
  prepareRoute(outlet: RouterOutlet) {
    if(outlet.isActivated) {
      return outlet.activatedRouteData['tabIndex'];
    }
  }
}
