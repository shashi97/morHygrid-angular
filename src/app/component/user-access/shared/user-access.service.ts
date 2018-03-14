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

@Injectable()
export class UserAccessService {
    constructor(private http: Http) { }
    public getCompanyList(): Promise<any> {
        const promise = this.http
            .get(ApiUrl.USER_URI + 'api/company')
            .toPromise();
        return new PromiseHandler<any>(promise);
    }

    public getUserList(): Promise<any> {
        const promise = this.http
            .get(ApiUrl.USER_URI + 'api/useradmin/allusers')
            .toPromise();
        return new PromiseHandler<any>(promise);
    }


    public getUserAccessDetails(obj): Promise<any> {
        const data = JSON.stringify(obj);
        const promise = this.http
            .post(ApiUrl.USER_URI + 'api/accesslog/user', data)
            .toPromise();
        return new PromiseHandler<any>(promise);
    }

    // return $http.post("/api/accesslog/user", data).then(function (data) {
    //     return data.data;
    // });

}
