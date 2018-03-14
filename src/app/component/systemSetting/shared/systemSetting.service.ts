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
import { HFADatabaseEntryModel , Categorymodel } from '../shared/hfadatabase.model'



@Injectable()
export class SystemSettingService {
  constructor(private http: Http) { }

  public getColumnDisplayFormats(): Promise<any> {
    const promise = this.http
      .get(ApiUrl.MAIN_URI + 'SystemSetting/GetColumnDisplayFormats')
      .toPromise();
    return new PromiseHandler<any>(promise);
  }
  
  public getDataTypeDisplayFormats(): Promise<any> {
    const promise = this.http
      .get(ApiUrl.MAIN_URI + 'SystemSetting/GetDataTypeDisplayFormats')
      .toPromise();
    return new PromiseHandler<any>(promise);
  }


  public saveColumnDisplayFormat(obj): Promise<any> {
    const data = JSON.stringify(obj);
    const promise = this.http
      .post(ApiUrl.MAIN_URI + 'SystemSetting/SaveColumnDisplayFormat', data)
      .toPromise();
    return new PromiseHandler<any>(promise);
  }
}
