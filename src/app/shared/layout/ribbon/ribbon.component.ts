import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import {LayoutService} from "../layout.service";
import {RouteBreadcrumbsComponent} from './route-breadcrumbs.component';

@Component({
  selector: 'sa-ribbon',
  templateUrl: './ribbon.component.html'
})
export class RibbonComponent implements OnInit {
  routeParam: string;
   @ViewChild(RouteBreadcrumbsComponent) public routeBreadcrumbs: RouteBreadcrumbsComponent;
  constructor(private layoutService: LayoutService, public router: Router) {
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
    // this.routeBreadcrumbs.callFromParent();
  }

  resetWidgets() {
    this.layoutService.factoryReset()
  }

}
