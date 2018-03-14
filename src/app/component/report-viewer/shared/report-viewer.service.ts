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
  ArrayResponseModel
} from '../../shared/models/base-data.model';
import { ApiUrl } from '../../../shared/api.service';
import { HFADatabaseEntryModel, Categorymodel } from '../shared/hfadatabase.model';
import { LocalStorageService } from '../../../core/service/local-storage.service'



@Injectable()
export class ReportViewerService {
  constructor(
    private http: Http,
    public localStorageService: LocalStorageService
  ) { }

  public getReportViewerJsonData(): Promise<any> {
    const token = this.localStorageService.getAccessToken();
    const companyId = this.localStorageService.getCompanyId();
    const userName = this.localStorageService.getUserName();
    // const access_token = 'bearer' + token;
    const promise = this.http
      .get(ApiUrl.DATASERVICE_URI + 'restservice/getreports/?token=' + token + '&userName=' + userName + '&companyId=' + companyId)
      .toPromise();
    return new PromiseHandler<any>(promise);
  }

  public getReportParamDetail(dataSourceReportID): Promise<any> {
    const promise = this.http
      .get(ApiUrl.MAIN_URI + 'Report/GetReportByID?ID=' + dataSourceReportID)
      .toPromise();

    return new PromiseHandler<any>(promise);
  }
  public getReportColumns(report): Promise<any> {
    const data = JSON.stringify(report);
    const promise = this.http
      .post(ApiUrl.MAIN_URI + 'Report/GetReportColumns', data)
      .toPromise();

    return new PromiseHandler<any>(promise);
  }

  //   public getReportColumns = function (report) {
  //     const data = JSON.stringify(report);
  //     return $http.post('/Report/GetReportColumns', data).then(function (data) {
  //         return data.data;
  //     });
  // }

  public ReportParameterDetails(reportID): Promise<any> {
    const promise = this.http
      .get(ApiUrl.MAIN_URI + 'Report/ReportParameterDetails?ReportID=' + reportID)
      .toPromise();
    return new PromiseHandler<any>(promise);
  }

  public getDataBaseName(): Promise<any> {
    const promise = this.http
      .get(ApiUrl.MAIN_URI + 'Report/GetDataBaseName')
      .toPromise();
    return new PromiseHandler<any>(promise);
  }


  public GetSourceType(dataSourceTypeID): Promise<any> {
    const promise = this.http
      .get(ApiUrl.MAIN_URI + 'Report/GetSourceType?dataSourceTypeID=' + dataSourceTypeID)
      .toPromise();
    return new PromiseHandler<any>(promise);
  }

  public GetServiceUrl(): Promise<any> {
    const promise = this.http
      .get(ApiUrl.MAIN_URI + 'Master/GetServiceUrl')
      .toPromise();
    return new PromiseHandler<any>(promise);
  }

  public GetReportParamDataFromService(report, restServiceUrl): Promise<any> {
    const token = this.localStorageService.getAccessToken();
    if (token !== undefined && token !== null) {
      report.TokenValue = token;
      let serviceUrl = ApiUrl.DATASERVICE_URI;
      const newReport = _.cloneDeep(report);
      newReport.ReportColumns = [];
      newReport.ColumnSchema = '';
      newReport.ReportLayoutDDO = [];
      newReport.ReportLayouts = [];
      if (restServiceUrl && restServiceUrl.length > 0) {
        serviceUrl = restServiceUrl + '/';
        newReport.ServiceUrl = '';
        /** if client wants to get report from routed url then we have to use this type of functionality */
        // newReport.ServiceUrl = restServiceUrl + 'restservice/GetParamDataByReport/';
      }
      const data = JSON.stringify(newReport);
      const promise = this.http
        .post(serviceUrl + 'restservice/GetParamDataByReport', data)
        .toPromise();
      return new PromiseHandler<any>(promise);
    }
  }

  public GetReportDataFromService(report, restServiceUrl): Promise<any> {
    const token = this.localStorageService.getAccessToken();
    if (token !== undefined && token !== null) {
      report.TokenValue = token;
      let serviceUrl = ApiUrl.DATASERVICE_URI;
      const newReport = _.cloneDeep(report);
      newReport.ReportColumns = [];
      newReport.ColumnSchema = '';
      newReport.ReportLayoutDDO = [];
      newReport.ReportLayouts = [];
      if (restServiceUrl && restServiceUrl.length > 0) {
        serviceUrl = restServiceUrl + '/';
        newReport.ServiceUrl = '';
        /** if client wants to get report from routed url then we have to use this type of functionality */
        // newReport.ServiceUrl = restServiceUrl + 'restservice/GetDataByReport/';
      }
      const data = JSON.stringify(newReport);
      const promise = this.http
        .post(serviceUrl + 'restservice/GetDataByReport', data)
        .toPromise();
      return new PromiseHandler<any>(promise);
    }
  }

  public saveReportTab(reportTabID, reportTabName, userID): Promise<any> {
    if (Number(reportTabID) === 0) {
      const promise = this.http
        .post(ApiUrl.MAIN_URI +
        'Report/SaveReportTab?reportTabID='
        + reportTabID + '&reportTabName=' + reportTabName + '&userID=' + userID, null)
        .toPromise();
      return new PromiseHandler<any>(promise);

    } else {
      const promise = this.http
        .put(ApiUrl.MAIN_URI + 'Report/SaveReportTab?reportTabID='
        + reportTabID + '&reportTabName=' + reportTabName + '&userID=' + userID, null)
        .toPromise();
      return new PromiseHandler<any>(promise);

    }

  }
  public saveReportLayout(reportLayoutID, reportID, layoutName, layoutJson): Promise<any> {
    const reportLayout = {
      ReportLayoutID: reportLayoutID,
      ReportID: reportID,
      LayoutName: layoutName,
      LayoutJson: layoutJson
    }

    const promise = this.http
      .post(ApiUrl.MAIN_URI +
      'Report/SaveReportLayout', reportLayout)
      .toPromise();
    return new PromiseHandler<any>(promise);


  }

}
