import { Component, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet><angular-loader></angular-loader><app-message></app-message>'
})
export class AppComponent {
  public title = 'app works!';

  public constructor(private viewContainerRef: ViewContainerRef) { }

}
