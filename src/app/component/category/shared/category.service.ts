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
import {CategoryModel } from '../shared/category.module'



@Injectable()
export class CategoryService {
  constructor(private http: Http) { }


  public getCategoriesDetails(): Promise<any> {
    const promise = this.http
      .get(ApiUrl.MAIN_URI + 'Category/GetCategoriesDetails')
      .toPromise();
    return new PromiseHandler<any>(promise);
  }

  public deleteCategories(CategoryID): Promise<any> {
    const promise = this.http
      .delete(ApiUrl.MAIN_URI + 'Category/DeleteCategoryDetails?categoryID=' + CategoryID)
      .toPromise();
      return new PromiseHandler<any>(promise);
    }

    public SaveCategoryDetail(obj): Promise<any> {
      const data = JSON.stringify(obj);
      const promise = this.http
        .post(ApiUrl.MAIN_URI + 'Category/SaveCategory' , data)
        .toPromise();
        return new PromiseHandler<any>(promise);
      }
}
