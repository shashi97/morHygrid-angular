import { Component, OnInit } from '@angular/core';
// import {UserService} from "../user.service";
import { LayoutService } from "../../layout/layout.service";

@Component({

  selector: 'sa-login-info',
  templateUrl: './login-info.component.html',
})
export class LoginInfoComponent implements OnInit {

  user: any;

  constructor(

    private layoutService: LayoutService) {
  }

  ngOnInit() {
    // this.userService.getLoginInfo().subscribe(user => {
    //   this.user = user
    // })
    this.user = localStorage.getItem('userName')

  }

  toggleShortcut() {
    // this.layoutService.onShortcutToggle()
  }

}
