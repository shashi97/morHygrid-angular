import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LoginInfoComponent } from '../../user/login-info/login-info.component';
import { LeftPanelModel } from './left-panel.model';
import { RouteService, ApiUrl } from '../../index'
import { LocalStorageService } from '../../../core/service/local-storage.service';


@Component({

  selector: 'hg-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {
  roleId: Number;
  private leftPanelMenu: Array<LeftPanelModel> = new Array<LeftPanelModel>();
  constructor(private router: Router,
    public route: ActivatedRoute,
    private routeService: RouteService,
    private localStorageService: LocalStorageService) {

  }
  ngOnInit() {
    this.leftPanelMenu = this.routeService.selectTopMenu(this.route.snapshot.url);
     this.roleId = Number(localStorage.getItem('roleId'))
  }

  public onClickLeftMenuPanel(header): void {
    this.router.navigate([header.href]);
  }
}
