import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, BaseRequestOptions, Response } from '@angular/http';
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
import { ApiUrl } from '../../../shared/api.service'
@Injectable()
export class MasterService {

  constructor(private http: Http) { }

  public saveCategoryDetail(data): Promise<any> {
    const promise = this.http
      .post(ApiUrl.MAIN_URI + 'Category/SaveCategory', data)
      .toPromise();
    return new PromiseHandler<any>(promise);
  }

  public getAllCategoryList(): Promise<any> {
    const promise = this.http
      .get(ApiUrl.MAIN_URI + 'Category/GetCategoriesDetails')
      .toPromise();
    return new PromiseHandler<any>(promise);
  }

  public getServiceUrl(): Promise<any> {
    const promise = this.http
      .get(ApiUrl.MAIN_URI + 'Master/GetServiceUrl')
      .toPromise();
    return new PromiseHandler<any>(promise);
  }

}
