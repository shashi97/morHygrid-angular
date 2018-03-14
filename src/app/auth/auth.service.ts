import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, BaseRequestOptions, Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {
  BaseDataModel,
  ObjectResponseModel,
  PromiseHandler,
  PostObjectResponseModel,
  DeletePromiseHandler
} from '../component/shared/models/base-data.model';
import { Token } from './+login/login.model';
import { ApiUrl } from '../shared/api.service';
@Injectable()
export class AuthService {
  isLoggedIn: boolean = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;
  constructor(private http: Http,
    private jsonp: Jsonp) { }

  public login(userDetail): Promise<any> {
    const logInfo = JSON.stringify(userDetail)
    const promise = this.http
      .post(ApiUrl.LOGIN_URI + 'SignIn/SignIn', logInfo)
      .toPromise();
    return new PromiseHandler<any>(promise );
  }

  /* use to get ip address */
  public getIp(): Promise<any> {
    const promise = this.jsonp.get('//api.ipify.org/?format=jsonp&callback=JSONP_CALLBACK')
      .toPromise();
    return new PromiseHandler<any>(promise);
  };



  logout(): void {
    this.isLoggedIn = false;
  }
}
