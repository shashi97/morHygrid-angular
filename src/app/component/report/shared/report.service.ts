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
import { ApiUrl } from '../../../shared/api.service'
import { ReportModel } from './report.model';
import { LocalStorageService } from '../../../core/service/local-storage.service'

@Injectable()
export class ReportService {
    constructor(private http: Http,
        public localStorageService: LocalStorageService) { }
    public getReportListDetails(): Promise<any> {
        const promise = this.http
            .get(ApiUrl.MAIN_URI + 'Report/GetReportDetails')
            .toPromise();
        return new PromiseHandler<any>(promise);
    }

    public getDataBaseName(): Promise<any> {
        const promise = this.http
            .get(ApiUrl.MAIN_URI + 'Report/GetDataBaseName')
            .toPromise();
        return new PromiseHandler<any>(promise);
    }

    public getSourceType(dataSourceTypeID): Promise<any> {
        const promise = this.http
            .get(ApiUrl.MAIN_URI + 'Report/GetSourceType?dataSourceTypeID=' + dataSourceTypeID)
            .toPromise();
        return new PromiseHandler<any>(promise);
    }

    public getCategoryDetails(): Promise<any> {
        const promise = this.http
            .get(ApiUrl.MAIN_URI + 'Category/GetCategoriesDetails')
            .toPromise();
        return new PromiseHandler<any>(promise);
    }

    public GetReportParamDataFromService(report, restServiceUrl): Promise<any> {
        const token = localStorage.getItem('Authorization')
        if (token !== undefined && token !== null) {
            report.TokenValue = token
            let serviceUrl = ApiUrl.DATASERVICE_URI;
            const newReport = _.cloneDeep(report);
            newReport.ReportColumns = [];
            newReport.ColumnSchema = '';
            if (restServiceUrl && restServiceUrl.length > 0) {
                serviceUrl = restServiceUrl;
                newReport.ServiceUrl = '';
            }
            const data = JSON.stringify(newReport);
            const promise = this.http
                .post(serviceUrl + 'restservice/GetParamDataByReport', data)
                .toPromise();
            return new PromiseHandler<any>(promise);
        }

    }


    // public getReportListDetailsById(reportId): Promise<ObjectResponseModel<ReportModel>> {
    //     const promise = this.http
    //         .get(ApiUrl.MAIN_URI + 'Report/GetReportByID?ID=' + reportId)
    //         .toPromise();
    //     return new PromiseHandler<ObjectResponseModel<ReportModel>>(promise);
    // }


    public getReportListDetailsById(reportId): Promise<any> {
        const promise = this.http
            .get(ApiUrl.MAIN_URI + 'Report/GetReportByID?ID=' + reportId)
            .toPromise();
        return new PromiseHandler<any>(promise);
    }

    public getPreDefinedDataObjects(dataSourceTypeID): Promise<any> {
        const promise = this.http
            .get(ApiUrl.MAIN_URI + 'Report/GetPreDefinedDataObjects?dataSourceTypeID=' + dataSourceTypeID)
            .toPromise();
        return new PromiseHandler<any>(promise);
    }

    public GetDataObjectParameters(dataObjectID): Promise<any> {
        const promise = this.http
            .get(ApiUrl.MAIN_URI + 'Report/GetDataObjectParameters?dataObjectID=' + dataObjectID)
            .toPromise();
        return new PromiseHandler<any>(promise);
    }

    public reportParameterDetails(ReportID): Promise<any> {
        const promise = this.http
            .get(ApiUrl.MAIN_URI + 'Report/ReportParameterDetails?ReportID=' + ReportID)
            .toPromise();
        return new PromiseHandler<any>(promise);
    }


    public getReportByID(ID): Promise<any> {
        const promise = this.http
            .get(ApiUrl.MAIN_URI + 'Report/GetReportByID?ID=' + ID)
            .toPromise();
        return new PromiseHandler<any>(promise);
    }

    public DeleteReportDetails(ReportID): Promise<any> {
        const promise = this.http
            .delete(ApiUrl.MAIN_URI + 'Report/DeleteReportDetails?ReportID=' + ReportID)
            .toPromise();
        return new PromiseHandler<any>(promise);
    }


    public getGroupName(searchGroupName): Promise<any> {
        const promise = this.http
            .get(ApiUrl.MAIN_URI + 'Report/GetGroupName?searchParam=' + searchGroupName)
            .toPromise();
        return new PromiseHandler<any>(promise);
    }
    public getChildeGroupName(searchChildGroupName): Promise<any> {
        const promise = this.http
            .get(ApiUrl.MAIN_URI + 'Report/GetChildGroupName?searchParam=' + searchChildGroupName)
            .toPromise();
        return new PromiseHandler<any>(promise);
    }

    public getDataTypeList(): Promise<any> {
        const promise = this.http
            .get(ApiUrl.MAIN_URI + '/Report/GetDataType')
            .toPromise();
        return new PromiseHandler<any>(promise);
    }

    public GetReportDetails(): Promise<any> {
        const promise = this.http
            .get(ApiUrl.MAIN_URI + '/Report/GetReportDetails')
            .toPromise();
        return new PromiseHandler<any>(promise);
    }
    public GetReportColumnDetails(reportId): Promise<any> {
        const promise = this.http
            .get(ApiUrl.MAIN_URI + '/Report/GetReportColumnDetails?ReportID=' + reportId)
            .toPromise();
        return new PromiseHandler<any>(promise);
    }

    public GetReportColumns(report): Promise<any> {
        const data = JSON.stringify(report);
        const promise = this.http
            .post(ApiUrl.MAIN_URI + 'Report/GetReportColumns', data)
            .toPromise();
        return new PromiseHandler<any>(promise);
    }

    public GetReportDataFromService(report, restServiceUrl): Promise<any> {
        const token = localStorage.getItem('Authorization');
        const companyId = this.localStorageService.getCompanyId();
        if (token) {
            report.TokenValue = token
            let serviceUrl = ApiUrl.DATASERVICE_URI;
            const newReport = _.cloneDeep(report);
            newReport.ReportColumns = [];
            newReport.ColumnSchema = '';
            if (restServiceUrl && restServiceUrl.length > 0) {
                serviceUrl = restServiceUrl;
                newReport.ServiceUrl = '';
            }
            const data = JSON.stringify(newReport);
            const promise = this.http
                .post(serviceUrl + 'restservice/GetTestReportData?tokenValue=' + token + '&companyId=' + companyId, data)
                .toPromise();
            return new PromiseHandler<any>(promise);
        }

    }

    public DeleteReportParameter(id): Promise<any> {

        const promise = this.http
            .post(ApiUrl.MAIN_URI + 'Report/DeleteReportParameter?ReportParameterID=' + id, null)
            .toPromise();
        return new PromiseHandler<any>(promise);
    }


    public SaveReportDetails(reportDetails): Promise<any> {
        const jsonReportDetailsData = JSON.stringify(reportDetails);
        const promise = this.http
            .post(ApiUrl.MAIN_URI + 'Report/SaveReportDetails', jsonReportDetailsData)
            .toPromise();
        return new PromiseHandler<any>(promise);
    }

}
