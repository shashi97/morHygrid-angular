import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { Title } from '@angular/platform-browser';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'sa-route-breadcrumbs',
  template: `
        <ol class="breadcrumb">
           <li *ngFor="let item of items">{{item}}</li>
        </ol>
  `,
  styles: []
})
export class RouteBreadcrumbsComponent implements OnInit {

  public items: Array<any> = [];

  constructor(titleService: Title, public router: Router, activatedRoute: ActivatedRoute) {
    // router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
        this.items = this.getTitle(router.routerState, router.routerState.root);
        console.log('title', this.items);
    //     // titleService.setTitle(title);
    //   }
    // });
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.items = this.getTitle(this.router.routerState, this.router.routerState.root);
        console.log('title', this.items);
        // titleService.setTitle(title);
      }
    });


    // this.router.events
    //  // .filter(e => e instanceof NavigationEnd)
    //   .subscribe(v => {
    //     this.items = [];
    //     this.extract(this.router.routerState.root)
    //   });

  }
  public callFromParent() {
    this.items = this.getTitle(this.router.routerState, this.router.routerState.root);
  }


  getTitle(state, parent) {
    var data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.pageTitle) {
      data.push(parent.snapshot.data.pageTitle);
    }

    if (state && parent) {
      data.push(... this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }


}
