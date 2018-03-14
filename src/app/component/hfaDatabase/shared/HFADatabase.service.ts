import { Http, Headers, RequestOptions, BaseRequestOptions, Response } from '@angular/http';
// import { ResetPasswordModel } from '../../reset-password/reset-password.model';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import * as _ from 'lodash';
import {
  BaseDataModel,
  ObjectResponseModel,
  PromiseHandler,
  PostObjectResponseModel,
  DeletePromiseHandler,
  ArrayResponseModel
} from '../../shared/models/base-data.model';
import { ApiUrl } from '../../../shared/api.service';
import { HFADatabaseEntryModel, Categorymodel } from '../shared/hfadatabase.model';
import { LocalStorageService } from '../../../core/service/local-storage.service'



@Injectable()
export class HFADataService {
  constructor(
    private http: Http,
    public localStorageService: LocalStorageService
  ) { }

  public getHFADataBaseDetails(): Promise<any> {
    const promise = this.http
      .get(ApiUrl.MAIN_URI + 'HFADataBase/GetHFADataBaseDetails')
      .toPromise();
    return new PromiseHandler<any>(promise);
  }

  public SaveHFADataBaseUIState(state): Promise<any> {
    const data = JSON.stringify(state)
    const promise = this.http
      .get(ApiUrl.MAIN_URI + 'HFADataBase/SaveHFADataBaseUIState?stateJson=' + data)
      .toPromise();
    return new PromiseHandler<any>(promise);
  }

  public getSourceType(): Promise<any> {
    const promise = this.http
      .get(ApiUrl.MAIN_URI + 'HFADataBase/GetSourceType')
      .toPromise();
    return new PromiseHandler<any>(promise);
  }

  public getCategoryDetails(): Promise<any> {
    const promise = this.http
      .get(ApiUrl.MAIN_URI + 'Category/GetCategoriesDetails')
      .toPromise();
    return new PromiseHandler<any>(promise);
  }

  public GetHFADataBase(ID): Promise<any> {
    const promise = this.http
      .get(ApiUrl.MAIN_URI + 'HFADataBase/GetHFADataBase?ID=' + ID)
      .toPromise();
    return new PromiseHandler<any>(promise);
  }

  public GetHFADataBasePassword(ID): Promise<any> {
    const promise = this.http
      .get(ApiUrl.MAIN_URI + 'HFADataBase/GetHFADataBasePassword?HFADatabaseID=' + ID)
      .toPromise();
    return new PromiseHandler<any>(promise);
  }

  public SaveCategoryDetail(obj): Promise<any> {
    const data = JSON.stringify(obj);
    const promise = this.http
      .post(ApiUrl.MAIN_URI + 'Category/SaveCategory', data)
      .toPromise();
    return new PromiseHandler<any>(promise);
  }

  public saveHFADataBase(obj): Promise<any> {
    const data = JSON.stringify(obj);
    const promise = this.http
      .post(ApiUrl.MAIN_URI + 'HFADataBase/SaveHFADataBaseDetails', data)
      .toPromise();
    return new PromiseHandler<any>(promise);
  }

  public deleteHfaDatabase(HFADatabaseID): Promise<any> {
    const promise = this.http
      .delete(ApiUrl.MAIN_URI + 'HFADataBase/DeleteHFADataBaseDetails?HFADatabaseID=' + HFADatabaseID)
      .toPromise();
    return new PromiseHandler<any>(promise);
  }


  public getServiceUrl(): Promise<any> {
    const promise = this.http
      .get(ApiUrl.MAIN_URI + 'Master/GetServiceUrl')
      .toPromise();
    return new PromiseHandler<any>(promise);
  }

  public testDatabaseConnection(hfaDataBase, restServiceUrl): Promise<any> {
    const token = localStorage.getItem('Authorization');
    if (token !== undefined && token !== null) {
      hfaDataBase.TokenValue = token;
      let serviceUrl = ApiUrl.DATASERVICE_URI;
      const newHFADataBase = _.cloneDeep(hfaDataBase);
      if (restServiceUrl && restServiceUrl.length > 0) {
        serviceUrl = restServiceUrl;
        newHFADataBase.ServiceUrl = '';
      }
      const data = JSON.stringify(newHFADataBase);
      const promise = this.http
        .post(serviceUrl + 'restservice/TestDatabaseConnection', data)
        .toPromise();
      return new PromiseHandler<any>(promise);
    }

  }
}
