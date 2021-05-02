import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators'

const baseStyles = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%'
});

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('routeAnim', [
      transition(':increment', [
        style({
          position: 'relative'
        }),
        query(':enter, :leave', [
          baseStyles
        ], { optional: true }),
        group([
          query(':leave', [
            animate('300ms ease-in', style({
              opacity: 0,
              transform: 'translateX(-50px)'
            }))
          ], { optional: true }),
          query(':enter', [
            style({
              transform: 'translateX(50px)',
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
          position: 'relative'
        }),
        query(':enter, :leave', [
          baseStyles
        ], { optional: true }),
        group([
          query(':leave', [
            animate('300ms ease-in', style({
              opacity: 0,
              transform: 'translateX(50px)'
            }))
          ], { optional: true }),
          query(':enter', [
            style({
              transform: 'translateX(-50px)',
              opacity: 0
            }),
            animate('300ms 120ms ease-out', style({
              opacity: 1,
              transform: 'translateX(0)'
            }))
          ], { optional: true })
        ])
      ]),

      transition('* => secondary', [
        style({
          position: 'relative'
        }),
        query(':enter, :leave', [
          baseStyles
        ], { optional: true }),
        group([
          query(':leave', [
            animate('300ms ease-in', style({
              opacity: 0,
              transform: 'scale(0.8)'
            }))
          ], { optional: true }),
          query(':enter', [
            style({
              transform: 'scale(1.2)',
              opacity: 0
            }),
            animate('300ms 120ms ease-out', style({
              opacity: 1,
              transform: 'scale(1)'
            }))
          ], { optional: true })
        ])
      ]),

      transition('secondary => *', [
        style({
          position: 'relative'
        }),
        query(':enter, :leave', [
          baseStyles
        ], { optional: true }),
        group([
          query(':leave', [
            animate('300ms ease-in', style({
              opacity: 0,
              transform: 'scale(1.25)'
            }))
          ], { optional: true }),
          query(':enter', [
            style({
              transform: 'scale(0.8)',
              opacity: 0
            }),
            animate('300ms 120ms ease-out', style({
              opacity: 1,
              transform: 'scale(1)'
            }))
          ], { optional: true })
        ])
      ])
    ]),

    trigger('bgAnim', [
      transition(':leave', [
        animate(1000, style({
          opacity: 0
        }))
      ])
    ]),

    trigger('fadeAnim', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(250, style({
          opacity: 1
        }))
      ]),

      transition(':leave', [
        animate(250, style({
          opacity: 0
        }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {

  backgrounds: string[] = ['https://images.unsplash.com/photo-1434907652076-85f8401482c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920'];

  loadingBgImage: boolean;

  dateTime: Observable<Date>;

  ngOnInit() {
    this.dateTime = timer(0, 1000).pipe(
      map(() => {
        return new Date();
      })
    );
  }
  
  prepareRoute(outlet: RouterOutlet) {
    if(outlet.isActivated) {
      var tab = outlet.activatedRouteData['tabIndex'];
      if(!tab)
        return 'secondary';

      return tab;
    }
  }

  async changeBgImage() {
    this.loadingBgImage = true;

    var result = await fetch('https://source.unsplash.com/random/1920x1080', {
      method: 'HEAD'
    });

    var alreadyGot = this.backgrounds.includes(result.url);
    if(alreadyGot)
      return this.changeBgImage();

    this.backgrounds.push(result.url);
  }

  onBgImageLoad(imgEvent: Event) {
    this.removeOldBgImage(imgEvent);
    this.loadingBgImage = false;
  }

  removeOldBgImage(imgEvent: Event) {
    var imgElement = imgEvent.target as HTMLImageElement;
    var src = imgElement.src;
    this.backgrounds = this.backgrounds.filter(b => b === src);
  }
}
