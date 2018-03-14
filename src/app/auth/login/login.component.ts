import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { LocalStorageService } from '../../core/service/index';
import { UserModel, Token } from './login.model';
import { RouteService } from '../../shared/route.service'
export enum Color {
  default = 1,
  warn = 0,
  success = 2
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userDetail: UserModel = new UserModel();
  public token: Token = new Token();
  public returnUrl: string;
  public defaultMenu = '';
  public moduleName = 'hfaDatabase';
  public isUserTextBoxBlank = Color.default;
  public isPasswordTextBoxBlank = Color.default;
  public isLoginFail = false;
  public isSubmitted = false;
  constructor(private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private routeService: RouteService,
    private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.authService.getIp().then(res => {
      this.userDetail.IPAddress = res.data.ip;
    })

    // this.message = this.route.snapshot.params['message'];
    const currentUser = this.localStorageService.getCurrentUser();
    if (currentUser) {
      if (this.localStorageService.getModuleName()) {
        this.moduleName = this.localStorageService.getModuleName();

        const selectedModule = this.routeService.topModuleMenus(this.moduleName);
        // if (selectedModule) {
        //   this.defaultMenu = selectedModule[0].defaultMenu;
        // }
      }

      this.returnUrl = this.checkUserRole();
      this.router.navigate([this.returnUrl]);
    } else {
      // reset login status
      this.localStorageService.removeLogin();
      this.returnUrl = '/' + this.moduleName + '/' + this.defaultMenu;
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || this.returnUrl;
    }
  }

  onLogin() {

    this.isSubmitted = true;
    this.authService.login(this.userDetail).then(loginResponse => {
      if (loginResponse.data.Status) {
        this.token = loginResponse.data.Result;
        if (this.token && this.token.access_token) {
          this.localStorageService.setCurrentUser(this.token);
        }
        this.setCurrentUser();
      } else {
        this.isSubmitted = false;
        this.isLoginFail = true;
      }
      console.log(loginResponse);
    }).catch(error => {
      console.log(error);
      this.isLoginFail = true;
      // event.preventDefault();
      // this.router.navigate(['/dashboard/+analytics'])
    })



  }

  setCurrentUser() {
    this.returnUrl = this.checkUserRole();
    const splitUrl = this.returnUrl.split('/')[1];
    if (splitUrl) {
      this.localStorageService.setModuleName(splitUrl);
    }
    this.router.navigate([this.returnUrl]);
  }

  checkUserRole() {
    const role = +localStorage.getItem('roleId');
    if (role === 4) {
      this.moduleName = 'reportViewer'
    } else if (role === 3) {
      this.moduleName = 'report';
    }
    return '/' + this.moduleName + '/' + this.defaultMenu;
  }

}

