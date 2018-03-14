import { Http, Headers, RequestOptions, BaseRequestOptions, Response } from '@angular/http';
// import { ResetPasswordModel } from '../../reset-password/reset-password.model';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';


import { ApiUrl } from '../../../api.service';
import {
  BaseDataModel,
  ObjectResponseModel,
  PromiseHandler,
  PostObjectResponseModel,
  DeletePromiseHandler,
  ArrayResponseModel
} from '../../../../component/shared/models/base-data.model';

@Injectable()
export class HeaderService {
  constructor(private http: Http) { }

  public getCompanyList(): Promise<any> {
    const promise = this.http
      .get(ApiUrl.MAIN_URI + 'Master/GetCompanyDetails')
      .toPromise();
    return new PromiseHandler<any>(promise);
  }
  

  public getCompanyListById(selectedCompanyId): Promise<any> {
    const promise = this.http
      .get(ApiUrl.USER_URI + 'api/company/' + selectedCompanyId )
      .toPromise();
    return new PromiseHandler<any>(promise);
  }

  public getSelectedCompany(): Promise<any> {
    const promise = this.http
      .get(ApiUrl.MAIN_URI + 'Master/GetCurrentCompany')
      .toPromise();
    return new PromiseHandler<any>(promise);
  }
  public setCurrentCompany(selectedCompany): Promise<any> {
    const promise = this.http
      .get(ApiUrl.MAIN_URI + 'Master/SetCurrentCompany?companyID='
      + selectedCompany.CompanyID +
      '&companyName='
      + selectedCompany.CompanyName +
      '&isHttps='
      + selectedCompany.IsHttps +
      '&serviceUrl='
      + selectedCompany.ServiceUrl +
      '&servicePort='
      + selectedCompany.ServicePort +
      '&restPort='
      + selectedCompany.RestPort
      )
      .toPromise();
    return new PromiseHandler<any>(promise);
  }
}
