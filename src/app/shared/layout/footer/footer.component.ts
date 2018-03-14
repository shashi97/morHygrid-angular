import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'sa-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

  routeParam: string;
  constructor( public router: Router) {

    this.router.events.subscribe(event  => {
      console.log(event);
      if (event instanceof NavigationEnd ) {
        this.routeParam = event.url;
      }
    });
  }

  ngOnInit() {
    this.router.events.subscribe(event  => {
      console.log(event);
      if (event instanceof NavigationEnd ) {
        this.routeParam = event.url;
      }
    });
  }

}