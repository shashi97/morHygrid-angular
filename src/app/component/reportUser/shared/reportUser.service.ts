import { Http, Headers, RequestOptions, BaseRequestOptions, Response } from '@angular/http';
// import { ResetPasswordModel } from '../../reset-password/reset-password.model';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import {
  BaseDataModel,
  ObjectResponseModel,
  PromiseHandler,
  PostObjectResponseModel,
  DeletePromiseHandler,
  ArrayResponseModel
} from '../../shared/models/base-data.model';
import { ApiUrl } from '../../../shared/api.service';



@Injectable()
export class ReportUserService {
  constructor(private http: Http) { }

  public getServiceUserDetails(roleID): Promise<any> {
    const promise = this.http
      .get(ApiUrl.MAIN_URI + 'ServiceReportUser/GetServiceUserDetails?roleID=' + roleID)
      .toPromise();
    return new PromiseHandler<any>(promise);
  }

  public GetServiceUser(ID): Promise<any> {
    const roleId = +localStorage.getItem('roleId');
    const promise = this.http
      .get(ApiUrl.MAIN_URI + 'ServiceReportUser/GetServiceUser?ID=' + ID + '&roleID=' + roleId)
      .toPromise();
    return new PromiseHandler<any>(promise);
  }

  public GetReportByServiceUserID(ID): Promise<any> {
    const promise = this.http
      .get(ApiUrl.MAIN_URI + 'ServiceReportUser/GetReportByServiceUserID?ServiceUserID=' + ID)
      .toPromise();
    return new PromiseHandler<any>(promise);
  }


  public SaveReportForUser(ReportParameterDetails): Promise<any> {
    const data = JSON.stringify(ReportParameterDetails);
    const promise = this.http
      .post(ApiUrl.MAIN_URI + 'ServiceReportUser/SaveReportForUserDetails', data)
      .toPromise();
    return new PromiseHandler<any>(promise);
  }
}
