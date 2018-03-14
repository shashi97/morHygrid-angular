import { Http, Headers, RequestOptions, BaseRequestOptions, Response } from '@angular/http';
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
import { ApiUrl } from '../../../shared/api.service'
import { CompanyModel } from './company.model'
@Injectable()
export class CompanyService {
    constructor(private http: Http) { }
    public getCompanyList(): Promise<any> {
        const promise = this.http
            .get(ApiUrl.USER_URI + 'api/company')
            .toPromise();
        return new PromiseHandler<any>(promise);
    }

    public getCompanyDetailsById(companyId): Promise<any> {
        const promise = this.http
            .get(ApiUrl.USER_URI + 'api/company/' + companyId)
            .toPromise();
        return new PromiseHandler<any>(promise);
    }

    public SaveCompanyDetail(obj): Promise<any> {
        const data = JSON.stringify(obj);
        const promise = this.http
            .post(ApiUrl.USER_URI + 'api/company/save', data)
            .toPromise();
        return new PromiseHandler<any>(promise);
    }

    public deleteCompanyById(companyID): Promise<any> {
        const promise = this.http
          .post(ApiUrl.USER_URI + 'api/company/delete?companyID=' + companyID , null)
          .toPromise();
          return new PromiseHandler<any>(promise);
        }
}
