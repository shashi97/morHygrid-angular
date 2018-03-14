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
export class UserService {
    constructor(private http: Http) { }
    public getUserList(companyID): Promise<any> {
        const promise = this.http
            .get(ApiUrl.USER_URI + 'api/useradmin/allusers?companyID=' + companyID, null)
            .toPromise();
        return new PromiseHandler<any>(promise);
    }
    public getUserDetailsById(Id): Promise<any> {
        const promise = this.http
            .get(ApiUrl.USER_URI + 'api/useradmin/user/' + Id)
            .toPromise();
        return new PromiseHandler<any>(promise);
    }

    public saveUserDetail(obj): Promise<any> {
        const data = JSON.stringify(obj);
        const promise = this.http
            .post(ApiUrl.USER_URI + 'api/useradmin/saveUser', data)
            .toPromise();
        return new PromiseHandler<any>(promise);
    }


    public getReportByUser(userId, companyId): Promise<any> {
        const promise = this.http
            .get(ApiUrl.USER_URI + 'api/report/list/' + userId + '/' + companyId)
            .toPromise();
        return new PromiseHandler<any>(promise);
    }

    public GetCompanyByUserID(userId): Promise<any> {
        const promise = this.http
            .get(ApiUrl.USER_URI + 'api/company/selectedcompany/' + userId)
            .toPromise();
        return new PromiseHandler<any>(promise);
    }

    public getRoles(): Promise<any> {
        const promise = this.http
            .get(ApiUrl.USER_URI + 'api/useradmin/roles')
            .toPromise();
        return new PromiseHandler<any>(promise);
    }


    public deleteReportUserByReportUserId(reports): Promise<any> {
        const data = JSON.stringify(reports);
        const promise = this.http
            .post(ApiUrl.USER_URI + 'api/report/deletereportuser', data)
            .toPromise();
        return new PromiseHandler<any>(promise);
    }


    public deleteUserById(userId): Promise<any> {
        const promise = this.http
            .post(ApiUrl.USER_URI + 'api/useradmin/deleteuser?userID=' + userId, null)
            .toPromise();
        return new PromiseHandler<any>(promise);
    }

}
