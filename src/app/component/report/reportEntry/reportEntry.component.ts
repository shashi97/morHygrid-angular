import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Message } from 'primeng/components/common/api';
import { ReportService } from '../shared/report.service'
import { DatabaseModal, ReportModel, TestDataModel, SourceTypeModel, ReportDetailModel, StaticListModel } from '../shared/report.model';
import 'codemirror/mode/sql/sql';
import { TotalRecordService } from '../../shared/service/total-record.service';
import { MasterService } from '../../shared/service/master.service';
import { CategoryListmodel } from '../../shared/model/category.model';
import { MessageService } from '../../shared/message/messageService.service'
import { Calendar } from '../../../shared/calendar/calendar';
declare const $;


@Component({
  selector: 'app-report-entry',
  templateUrl: './reportEntry.component.html',
  styleUrls: ['./reportEntry.component.css']
})
export class ReportEntryComponent implements OnInit, AfterViewInit {

  listOne: Array<string> = ['Coffee', 'Orange Juice', 'Red Wine', 'Unhealty drink!', 'Water'];

  PreDefinedDataObjects: Array<any> = []
  moduleName = 'Reports';
  faIcon = 'fa fa-th fa-fw';
  CategoryName: String;
  totalDB: number;
  reportId: number;
  type = 'report';
  dpid: number;
  showTestDataLoading = false;
  showTestDataFirstTime = false;
  isLoading = false;
  query: string;
  date: boolean = false;
  ErrorColMsg: string;
  TestReportData: Array<any> = [];
  showErrorMsg: boolean;
  showTestData: boolean;
  ErrorMsg: string;
  DataBaseName: Array<DatabaseModal> = [];
  StaticList: StaticListModel = new StaticListModel();
  SourceType: Array<SourceTypeModel> = [];
  ReportDetails: Array<ReportDetailModel> = [];
  groupNameList: Array<string> = [];
  childGroupNameList: Array<string> = [];
  reportDetails: ReportModel = new ReportModel();
  testData: TestDataModel = new TestDataModel();
  gridData: Array<any> = [];
  gridList: Array<any> = [];
  dataSourceDetails: DatabaseModal = new DatabaseModal();
  // categoryDetail: Array<Categorymodel> = [];
  categoryList: Array<CategoryListmodel> = [];
  datePickers: Array<any> = [];
  sourceType: Array<any> = []
  ReportGroups: Array<any> = [];
  DataTpeDetails: Array<any> = [];
  // selectedParamReport: Array<any> = []
  selectedParamReport: ReportModel = new ReportModel();
  restServiceUrl = '';
  HasPreDefinedDataObjects: boolean;
  HasFixedParameters: boolean;
  hideParameterList: boolean;
  ReportParameterListLabel = 'List of Parameters';
  disableSourceType: boolean;
  ShowReportParameter: boolean;
  buttons: Array<any> = [
    { title: 'Save And Close', name: 'saveAndClose', class: 'bg-color-blue custom-color-white', }];
  datePickerVariables = [
    { Value: 'Today', Text: 'Today' },
    { Value: 'Yesterday', Text: 'Yesterday' },
    { Value: 'PrevBusinessDay', Text: 'PrevBusinessDay' },
    { Value: 'EndOfPrevMonth', Text: 'End of Previous Month' },
    { Value: 'EndOfPrevQuarter', Text: 'End of Previous Quarter' },
    { Value: 'EndOfLastYear', Text: 'End of Last Year' },
    { Value: 'StartOfThisMonth', Text: 'Start of This Month' },
    { Value: 'StartOfThisQuarter', Text: 'Start of This Quarter' },
    { Value: 'StartOfThisQuarter', Text: 'Start of This Year' }
  ];
  config: any;
  content: string;
  @ViewChild(Calendar) calendar: Calendar
  @ViewChild('daterp') overlayViewChild: any;
  constructor(
    private router: Router,
    public route: ActivatedRoute,
    public reportService: ReportService,
    public totalRecordService: TotalRecordService,
    private masterService: MasterService,
    public messageService: MessageService,
    private confirmationService: ConfirmationService,
    public el: ElementRef,
  ) {
    /* to configure codemirror */
    this.config = {
      lineNumbers: true, mode: 'text/x-sql', lineWrapping: true,
      indentWithTabs: true,
      smartIndent: true,
      matchBrackets: true,
      autofocus: false,
    };
    this.getDataBaseName();
    this.getCategory();
    this.getGroupName();
    this.getChildGroupName();
    this.getReportDetails();
    this.getDataType();

  }

  ngAfterViewInit() {
    // setTimeout(() => {
    //  document.body.appendChild(this.overlayViewChild.nativeElement);
    // }, 1000);

    //  this.el.nativeElement.appendChild(this.overlayViewChild.nativeElement);
  }

  ngOnInit() {
    this.reportDetails.ReportID = this.route.snapshot.params['ReportID'] || 0;
    this.reportId = this.route.snapshot.params['ReportID'] || 0;
    this.totalDB = this.route.snapshot.params['totalDB'];
    this.getServiceUrl();
    if (this.reportDetails.ReportID > 0) {
      this.getReportDetailsById();
    }

  }

  getServiceUrl() {
    this.masterService.getServiceUrl().then(url => {
      if (url.data.Status) {
        if (url.data.Result === 'invalidssl') {
          const message = { severity: 'success', summary: 'Success Message', detail: 'Please configure Https SSL Url' }
          this.messageService.showMessage(message)
          return;
        } else if (!url.data.Result || url.data.Result === '') {
          // will be handled on service now - 02/12/2016
          // restServiceUrl = servicePath;
        } else {
          this.restServiceUrl = url.data.Result;
        }
      }
    });
  }

  getDataType() {
    this.reportService.getDataTypeList().then(res => {
      this.DataTpeDetails = res.data.Result;
    })
  }

  getReportDetails() {

    this.reportService.GetReportDetails().then((data) => {
      if (data.data.Result) {

        this.ReportDetails = data.data.Result.filter((item) => {
          return item.IsReportAsDataSource === true && item.ReportID !== this.reportId;
        });

        const flags = [];
        this.ReportGroups = [];
        this.ReportDetails.forEach(element => {
          // if (flags[element.ReportGroupName]) {
          //   continue;
          // }
          if (!flags[element.ReportGroupName]) {
            flags[element.ReportGroupName] = true;

            this.ReportGroups.push(element.ReportGroupName);
          }
        });
        // for (var i = 0; i < report.ReportDetails.length; i++) {
        //   if (flags[report.ReportDetails[i].ReportGroupName]) continue;
        //   flags[report.ReportDetails[i].ReportGroupName] = true;
        //   report.ReportGroups.push(report.ReportDetails[i].ReportGroupName);
        // }

        // this.GetReportByID(this.reportId);

      }
    })

  }

  getReportDetailsById() {

    this.reportService.getReportListDetailsById(this.reportDetails.ReportID).then(report => {
      this.reportDetails = report.data.Result ? report.data.Result : new ReportModel();
      this.reportDetails.ReportID = this.reportId;
      this.reportColumnDetails(this.reportId);
      this.reportDetails.IconClass = 'fa fa-fw fa-edit txt-color-blue';
      this.reportDetails.Header = 'Edit Report - ' + this.reportDetails.ReportName;
      if (this.reportDetails) {
        this.selectedDatabase(this.reportDetails.HFADatabaseID);
      }

    })
  }

  public reportColumnDetails(reportId) {
    this.ShowReportParameter = true;
    this.reportService.GetReportColumnDetails(reportId).then((data) => {
      if (data.data.Result) {
        this.reportDetails.ReportColumns = data.data.Result;
      }
    });
  }

  selectedDatabase(sourceTypeId: Number): void {
    const selectedSourceType = this.DataBaseName.filter(source => {
      return source.HFADatabaseID === Number(sourceTypeId);
    })[0];
    this.dataSourceDetails = selectedSourceType;
    if (this.dataSourceDetails) {
      // this.reportDetails.DataObjectTypeID = 0;
      this.getSourceType(this.dataSourceDetails.DataSourceTypeID)
    }
  }


  getDataBaseName(): void {
    this.reportService.getDataBaseName().then(result => {
      this.DataBaseName = result.data.Result;
    })
  }

  getSourceType(DataSourceTypeID): void {
    this.reportService.getSourceType(DataSourceTypeID).then(result => {
      this.SourceType = result.data.Result;
      if (this.SourceType.length > 0 && this.SourceType[0].HasPreDefinedDataObjects === true) {
        this.HasPreDefinedDataObjects = true;
        this.reportService.getPreDefinedDataObjects(DataSourceTypeID).then(predinedData => {
          this.PreDefinedDataObjects = predinedData.data.Result;
          this.SelectedDataObjects(this.reportDetails.SourceName)
        })
      } else {
        this.HasPreDefinedDataObjects = false;
        this.ReportParameterDetails(this.reportDetails.ReportID)
      }

      if (this.reportDetails.DataSourceTypeID !== DataSourceTypeID) {
        this.reportDetails.DataObjectTypeID = 0;
      }
      if (this.dataSourceDetails.DataSourceType && this.dataSourceDetails.DataSourceType === 'JS') {
        this.disableSourceType = true;
        this.reportDetails.SourceType = 'JS';
        this.reportDetails.SourceNameLabel = ' URI Action or Function  '
        this.reportDetails.SourceNameExampleLabel = ' eg: api/getMonthlySales or api/sales/1 or api/sales/{monthno}/{yearno}/{flag}'
      } else if (this.dataSourceDetails.DataSourceType && this.dataSourceDetails.DataSourceType === 'SF') {
        this.disableSourceType = true;
        this.reportDetails.SourceType = 'Q';
      } else {
        this.disableSourceType = false;
        if (this.reportDetails.ReportID === 0) {
          this.reportDetails.SourceType = '';
        }
        this.reportDetails.SourceNameLabel = ' Database Object   '
        this.reportDetails.SourceNameExampleLabel = ' eg: view / stored procedure / user-defined-function '

      }
    })
  }

  SelectedDataObjects(ObjectName): void {
    const selectedDataObjects = this.PreDefinedDataObjects.filter(item => {
      return item.ObjectName === ObjectName;
    });
    // if (selectedDataObjects && selectedDataObjects.length > 0) {
    //   this.reportDetails.SourceName = selectedDataObjects[0].SourceName;
    // }

    if (selectedDataObjects.length > 0) {
      if (selectedDataObjects[0].HasFixedParameters) {
        this.reportService.GetDataObjectParameters(selectedDataObjects[0].DataObjectID).then((data) => {
          this.HasFixedParameters = true;
          this.reportDetails.ReportParameters = data.data.Result;
          if (this.reportDetails.ReportParameters.length === 0) {
            this.ReportParameterListLabel = 'No Parameters';
            this.hideParameterList = true;
          } else {
            this.ReportParameterListLabel = 'List of Parameters';
            this.hideParameterList = false;
          }
        })
      } else {
        this.HasFixedParameters = false;
        this.hideParameterList = false;
        this.reportDetails.ReportParameters = [];
        this.ReportParameterListLabel = 'List of Parameters';
      }
    }
  }

  ReportParameterDetails(ReportID): void {
    this.reportService.reportParameterDetails(ReportID).then(result => {
      this.reportDetails.ReportParameters = result.data.Result;
      if (!result.data) {
        this.reportDetails.ReportParameters = [];
      }
      if (this.reportDetails.ReportParameters.length > 0) {
        this.GenerateParameters(0);
      }
    })
  }
  selected() {
    alert();
  }

  GenerateParameters(index) {
    const ids = (Number(index) + 1);
    const cdp = { dp: ids, opened: false };
    this.datePickers.splice(this.datePickers.length, 0, cdp);
    if (this.reportDetails.ReportParameters[index].IsDynamicSource) {
      this.GetReportParamDetail(this.reportDetails.ReportParameters[index]).then(res => {
        index++;
        if (index < this.reportDetails.ReportParameters.length) {
          this.GenerateParameters(index);
        }
      });
      // this.GetReportParamDetail(this.reportDetails.ReportParameters[index]) {
      //   index++
      //   if (index < this.reportDetails.ReportParameters.length) {
      //     this.GenerateParameters(index);
      //   }
      // }
    } else {
      index++;
      if (index < this.reportDetails.ReportParameters.length) {
        this.GenerateParameters(index);
      }
    }
  }

  GetReportParamDetail(parameter) {
    if (Number(parameter.DataSourceReportID) === 0) {
      return;
    }
    const promise = new Promise((resolve, reject) => {

      const dataSourceReportID = parameter.DataSourceReportID;
      this.reportService.getReportByID(dataSourceReportID).then(result => {
        if (result.data.Result) {
          this.selectedParamReport = result.data.Result
        }

        this.reportService.reportParameterDetails(dataSourceReportID).then(report => {

          if (report.data.Result == null) {
            this.selectedParamReport.ReportParameters = [];
          } else {
            this.selectedParamReport.ReportParameters = report.data.Result;
          }

          const selectedSource = this.DataBaseName.filter(item => {
            return item.HFADatabaseID === this.selectedParamReport.HFADatabaseID;
          });
          if (selectedSource.length > 0) {
            this.reportService.getSourceType(selectedSource[0].DataSourceTypeID).then(source => {
              this.sourceType = source.data.Result.filter(item => {
                return item.DataObjectTypeID === Number(this.selectedParamReport.DataObjectTypeID);
              })
              if (this.sourceType.length > 0) {
                this.selectedParamReport.SourceType = this.sourceType[0].DataObjectTypeName;
              }
              this.reportService.GetReportParamDataFromService(this.selectedParamReport, this.restServiceUrl).then(param => {
                if (param.data.Status === 0) {
                  const msg = 'Data Service is not reachable at ' + this.restServiceUrl
                  const message = { severity: 'success', summary: 'Success Message', detail: msg }
                  this.messageService.showMessage(message);
                  resolve(false);
                  //  if (callback != undefined) {
                  //                             callback(false);
                  //                         }
                  return
                } else {
                  param = param.data;
                }

                // param = JSON.parse(param);
                try {
                  param = JSON.parse(param);
                } catch (err) {
                  const message = { severity: 'error', detail: param }
                  this.messageService.showMessage(message);
                  // if (callback != undefined) {
                  //   callback(false);
                  // }
                  resolve(false);
                  return;
                };
                parameter.DefaultReportParameterData = param.Result;
                if (parameter.DefaultReportParameterData &&
                  parameter.DefaultReportParameterData.length > 0) {
                  parameter.ParamColumns = Object.keys(parameter.DefaultReportParameterData[0]);
                }
                this.GetDefaultValueParams(parameter);

              })
            })
          }


        })
      })
    });
    return promise;
  }

  public GetDefaultValueParams(parameter) {
    if (parameter.ColumnValue === '') {
      return;
    }
    if (!parameter.ColumnValue && parameter.ColumnValue === '') {
      parameter.ColumnValue = parameter.ColumnLabel;
    }
    if (!parameter.ColumnLabel && parameter.ColumnLabel === '') {
      parameter.ColumnLabel = parameter.ColumnValue;
    }
    parameter.DefaultValueParams = [];
    parameter.DefaultReportParameterData.forEach((item) => {
      const obj = {
        ID: item[parameter.ColumnValue],
        Name: item[parameter.ColumnLabel]
      }
      parameter.DefaultValueParams.push(obj);
    })
  }

  public onChangeDefault($event, parameter) {
    parameter.DefaultValue = $event.target.value;
  }

  getCategory(): void {
    this.masterService.getAllCategoryList().then(result => {
      this.categoryList = result.data.Result;
    })
  }
  onSaveChange(): void {
    this.saveReport('save');
  }
  onSaveAndClose(): void {
    this.saveReport('cancel');
  }
  onCancel(): void {
    this.router.navigate(['report']);
  }

  getGroupName(): void {
    this.reportService.getGroupName('').then(groupName => {
      this.groupNameList = groupName.data.Result;
    })
  }

  getChildGroupName(): void {
    this.reportService.getChildeGroupName('').then(childGroupName => {
      this.childGroupNameList = childGroupName.data.Result;
    })

  }

  onChangeDataObject(dataObjectTypeId): void {
    console.log(dataObjectTypeId);
  }

  // GetReportDataFromService(): void {
  //   this.testData.reportToRun = this.reportDetails;
  //   this.SourceType.forEach((source) => {
  //     if (source.DataObjectTypeID === Number(this.reportDetails.DataObjectTypeID)) {
  //       this.reportDetails.SourceType = source.DataObjectTypeName;
  //     }
  //   });
  // }


  public SetDataType(parameter, $event) {
    //  parameter.DataType = $event.target.value;
    // SalaryComponent.ComponentTypeID = parseInt(SalaryComponent.ComponentTypeID);
    const SelectedValue = this.DataTpeDetails.filter((item) => {
      return item.DataTypeDisplayName === parameter.DataType;
    })[0];

    if (SelectedValue) {
      parameter.DataType = SelectedValue.DataType;
      parameter.IsDynamicSource = SelectedValue.IsDynamicSource;
    }

    this.reportDetails.ReportParameters.filter(res => {
      if (parameter.Ids === res.Ids) {
        res.DefaultValue = '';
        res.IsDynamicSource = parameter.IsDynamicSource;
        if (parameter.DataType === 'date') {
          res.IsShowDate = true;
        } else {
          res.IsShowDate = false;
        }
      }
    })

    // for (var i = 0; i < this.reportDetails.ReportParameters.length; i++) {
    //     if (parameter.Ids == res.Ids) {
    //         res.DefaultValue = '';
    //         res.IsDynamicSource = parameter.IsDynamicSource;
    //         if (parameter.DataType == "date") {
    //             res.IsShowDate = true;
    //         }
    //         else {
    //             res.IsShowDate = false;
    //         }
    //     }
    // }
  }



  public showStaticList(parameter, index) {
    this.StaticList = new StaticListModel();
    this.StaticList.ParamIndex = index;
    if (!parameter.StaticListParams) {
      parameter.StaticListParams = [];
    }

    if (parameter.StaticListParams.length === 0) {

      this.StaticList.StaticListParams.splice(this.StaticList.StaticListParams.length, 0, { Order: 1, Value: '' });
    } else {
      this.StaticList.DefaultValue = parameter.DefaultValue;
      parameter.StaticListParams.forEach((res, index1) => {
        this.StaticList.StaticListParams.splice(this.StaticList.StaticListParams.length, 0,
          { Order: index1 + 1, Value: res.Value });
      })
      // for (var i = 0; i < parameter.StaticListParams.length; i++) {
      //   var obj = { Order: i + 1, Value: parameter.StaticListParams[i].Value };
      //   report.StaticList.StaticListParams.splice(report.StaticList.StaticListParams.length, 0, obj);
      // }
    }
  }

  addStaticListParameter() {
    const length = this.StaticList.StaticListParams.length;
    this.StaticList.StaticListParams.splice(length, 0, { Order: (length + 1), Value: '' });
  }

  removeStaticListParameter(item) {
    const index = this.StaticList.StaticListParams.indexOf(item);
    this.StaticList.StaticListParams.splice(index, 1);
  }

  onHover(item) {
    return function (dragItem, mouseEvent) {
      if (item !== dragItem) {
        dragItem.Order = item.Order + ((mouseEvent.offsetY || -1) > 0 ? 0.5 : -0.5);
      }
    }
  }

  createStaticListParameter(index) {
    this.reportDetails.ReportParameters[index].DefaultValue = '';
    this.reportDetails.ReportParameters[index].StaticListParams = [];
    // this.StaticList.StaticListParams = $filter('orderBy')(this.StaticList.StaticListParams, 'Order');
    this.StaticList.StaticListParams.forEach((res) => {
      this.reportDetails.ReportParameters[index].StaticListParams.splice(this.reportDetails.ReportParameters[index].StaticListParams.length,
        0, { Value: res.Value })
    })

    // for (var i = 0; i < this.StaticList.StaticListParams.length; i++) {
    //   const obj = { Value: this.StaticList.StaticListParams[i].Value };
    //   this.reportDetails.ReportParameters[index].StaticListParams
    //     .splice(this.reportDetails.ReportParameters[index].StaticListParams.length, 0, obj);
    // }
    this.reportDetails.ReportParameters[index].DefaultValue = this.StaticList.DefaultValue;

    $('.closeButton').trigger('click');
  }
  setReportRangeData(dpid) {
    this.dpid = dpid;
    this.reportDetails.ReportParameters.forEach(res => {
      res.IsDPOpen = false;
    })
  }
  showRangePicker(label) {
    this.reportDetails.ReportParameters[this.dpid].DefaultValue = '$' + label;

    this.calendar.onDateSelect(true, this.reportDetails.ReportParameters[this.dpid].DefaultValue, true);
  }

  call(event) {
    alert();
  }

  AddNewReportParameter() {
    const ids = (Number(this.reportDetails.ReportParameters.length) + 1);
    const dpid = Number(this.reportDetails.ReportParameters.length);
    const cdp = { dp: ids, opened: false };
    this.datePickers.splice(this.datePickers.length, 0, cdp);
    const addNewReportParameter = {
      ReportParameterID: 0, ReportID: this.reportDetails.ReportID,
      ParameterName: '', DataType: '', DefaultValue: '',
      DisplayName: '', Description: '',
      IsDynamicSource: false,
      DataSourceReportID: null,
      ColumnValue: '', ColumnLabel: '',
      Ids: ids, DPId: dpid,
      IsDPOpen: false,
      StaticListParams: []
    };

    this.reportDetails.ReportParameters.splice(this.reportDetails.ReportParameters.length, 0, addNewReportParameter);
  };

  filterReportDetails(reportGroup) {
    return this.ReportDetails.filter(x => x.ReportGroupName == reportGroup);
  }


  GetReportDataFromService() {

    // this.TestDataGridOptions.data = {};

    // const data = {
    //         reportToRun: this.reportDetails,
    //         tokenValue: 'Test'
    //     };

    const dataString = JSON.stringify(this.reportDetails);
    this.SourceType.forEach((item) => {
      if (item.DataObjectTypeID === Number(this.reportDetails.DataObjectTypeID)) {
        this.reportDetails.SourceType = item.DataObjectTypeName;
      }
    });
    this.showTestDataLoading = true;
    this.reportService.GetReportDataFromService(this.reportDetails, this.restServiceUrl).then((result) => {

      let data;
      if (result.data.status === 0) {
        this.showTestDataLoading = false;
        this.messageService.showMessage({ severity: 'error', detail: 'Data Service is not reachable at ' });
        return;
      } else {
        data = result.data;
      }
      try {
        this.reportDetails.ReportColumns = data.ReportColumns;
        this.reportDetails.ColumnSchema = data.ColumnSchema;
        data = JSON.parse(data.ReportData);
      } catch (err) {
        this.showTestDataLoading = false;
        this.messageService.showMessage({ severity: 'error', detail: data });
        return;
      }

      // data = data.Result.Result.Table;
      this.query = data.Call;

      if (!data.Status) {

        this.ErrorMsg = result.data.ErrorMessage;
        this.showErrorMsg = true;
        this.showTestDataFirstTime = true;
        this.showTestData = false;
        this.TestReportData = [];
        this.messageService.showMessage({ severity: 'error', detail: this.ErrorMsg });
        this.showTestDataLoading = false;
        return;
      }
      if (!result.data.ErrorMessage) {
        this.showErrorMsg = false;
        this.showTestData = true;

        // this.renderedColumns = null;

        // var gridScope = angular.element($(".ngGrid")).scope();

        this.gridData = data.Result;

        const keyLength = Object.keys(this.gridData[0]);
        Object.keys(this.gridData[0]).forEach(gridData => {
          this.gridList.splice(this.gridList.length, -1, { field: gridData, header: gridData })
        })

        // for (var item in report.gridData) {
        //   for (var k in report.gridData[item]) {

        //     if (k.replace(/\s/g, '') != k) {
        //       report.gridData[item][k.replace(/\s/g, '')] = report.gridData[item][k];
        //       delete report.gridData[item][k];
        //     } else {
        //       var val = report.gridData[item][k];
        //       var key = k;
        //       delete report.gridData[item][k]
        //       report.gridData[item][key] = val
        //     }

        //   }
        // }

        this.TestReportData = data.Result;

        if (!this.TestReportData || this.TestReportData.length === 0) {
          this.showErrorMsg = true;
          this.showTestData = false;
          this.ErrorMsg = 'There is no data for this query';
          this.showTestDataFirstTime = true;
          this.messageService.showMessage({ severity: 'error', detail: 'There is no data for this query' });
        } else {
          this.ErrorMsg = '';
        }

        // if (report.TestReportData.length != undefined)
        //   report.GridHeight = (report.TestReportData.length * 30) + 70;

        // report.TestDataGridOptions.data = report.gridData;

        // var colDefs = [];
        // if (report.gridData.length > 0) {
        //   var row = report.gridData[0];
        //   for (var colName in row) {
        //     colDefs.push({
        //       'field': colName
        //     });
        //   }

        //   colDefs.forEach(function (colDef) {
        //     if (colDefs.length == 1)
        //       colDef.width = '100%';
        //     else if (colDefs.length == 2)
        //       colDef.width = '50%';
        //     else if (colDefs.length == 3)
        //       colDef.width = '33.3%';
        //     else if (colDefs.length == 4)
        //       colDef.width = '25%';
        //     else
        //       colDef.width = '25%';
        //   });
        // }

        // report.TestDataGridOptions.enableGridMenu = true;

        // report.TestDataGridOptions.rowIdentity = function (row) {
        //   return row.id;
        // };
        // report.TestDataGridOptions.getRowIdentity = function (row) {
        //   return row.id;
        // };

        // report.TestDataGridOptions.columnDefs = colDefs;
      }
      this.showTestDataFirstTime = true;
      this.showTestDataLoading = false;
    });

  }

  DeleteReportParameter(id, name, index) {
    let val = '';
    if (id === 0) {
      val = 'Delete New Report Parameter - ';
    } else {
      val = 'Delete Report Parameter - ';
    }
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this Report Parameter ?',
      accept: () => {
        this.DeleteReportParameterDetails(id, index);
      }
    });


  }

  DeleteReportParameterDetails(id, index) {
    if (id === 0) {
      this.reportDetails.ReportParameters.splice(index, 1);
    } else {
      this.reportDetails.ReportParameters.splice(index, 1);
    }
  }

  onSelectReportDetail(event, format) {
    this.reportDetails.ReportGroupName = event;
  }


  onSelectChildReportGroup(event, format) {
    this.reportDetails.ChildReportGroupName = event;
  }

  saveReport(val) {

    if (!this.reportDetails.HFADatabaseID || this.reportDetails.HFADatabaseID === 0) {
      this.messageService.showMessage({ severity: 'error', detail: 'Please Select Database Name' });

      return;
    }
    if (this.reportDetails.DataObjectTypeID === 0 || !this.reportDetails.DataObjectTypeID) {


      this.messageService.showMessage({ severity: 'error', detail: 'Please Select Source Type' });
      return;
    }

    if (!this.reportDetails.ReportGroupName || this.reportDetails.ReportGroupName === '') {
      this.messageService.showMessage({ severity: 'error', detail: 'Please Enter Report Group Name' });

      return;
    }
    if (!this.reportDetails.ReportName || this.reportDetails.ReportName === '') {
      this.messageService.showMessage({ severity: 'error', detail: 'Please Enter Report Name' });

      return;
    }
    if (!this.reportDetails.CategoryID || this.reportDetails.CategoryID === '0') {
      this.reportDetails.CategoryID = 0;
    }

    if (!this.reportDetails.SourceName || this.reportDetails.SourceName === '') {
      this.messageService.showMessage({ severity: 'error', detail: 'Please Enter Source Name' });

      return;
    }
    let hasError = false;
    if (this.reportDetails.ReportParameters && this.reportDetails.ReportParameters.length > 0) {
      this.reportDetails.ReportParameters.map(res => {
        if (res.ParameterName === '') {

          this.messageService.showMessage({ severity: 'error', detail: 'Please Enter Parameter Name' });
          hasError = true;
          return;
        }
        if (!res.DataType || res.DataType === '') {
          this.messageService.showMessage({ severity: 'error', detail: '"Please Select DataType' });
          hasError = true;
          return;
        }
        if (res.DataType === 'date') {
          if (res.DefaultValue !== '$Today' &&
            res.DefaultValue !== '$Yesterday' &&
            res.DefaultValue !== '$PrevBusinessDay' &&
            res.DefaultValue !== '$EndOfPrevMonth' &&
            res.DefaultValue !== '$EndOfPrevQuarter' &&
            res.DefaultValue !== '$EndOfLastYear' &&
            res.DefaultValue !== '$StartOfThisMonth' &&
            res.DefaultValue !== '$StartOfThisQuarter' &&
            res.DefaultValue !== '$StartOfThisYear') {
            res.DefaultValue = new DatePipe('en-US').transform(res.DefaultValue, 'MM/dd/yyyy');
            // $moment(res.DefaultValue).format($rootScope.momentDateFormat);
          }
        }
        if (!res.DefaultValue) {
          res.DefaultValue = '';
        }
        if (res.DisplayName === '') {
          this.messageService.showMessage({ severity: 'error', detail: 'Please Enter Display Name' });
          hasError = true;
          return;
        }
        if (!res.Description) {
          res.Description = '';
        }
      });
    }

    if (this.reportDetails.IsFomattedUrl) {
      let count = 0;
      if (this.reportDetails.SourceName) {
        const SplitedSource = this.reportDetails.SourceName.split('/');
        SplitedSource.forEach(source => {
          //   for (var i = 0; i < SplitedSource.length; i++) {
          if (source.indexOf('{') !== -1) {
            count++;
            const checkString = source.substring(1, source.length - 1);
            let e = 0;
            if (this.reportDetails.ReportParameters != null && this.reportDetails.ReportParameters.length > 0) {
              //   for (var j = 0; j < this.reportDetails.ReportParameters.length; j++) {
              this.reportDetails.ReportParameters.forEach(parameter => {
                if (parameter.ParameterName.toLowerCase() !== checkString.toLowerCase()) {
                  e++;
                }
              })
              //  }
              if (e === this.reportDetails.ReportParameters.length) {
                this.messageService.showMessage({ severity: 'error', detail: 'Please Enter Report Group Name' });
                hasError = true;
                return;
              }

            }

          }
        })
        //   }

      }
      //if (this.reportDetails.ReportParameter.length > count) {

      //    messageService.showMsgBox("Report", "Parameter in URL and Parameter list not match", "error");
      //    return;
      //}
    }

    if (this.reportDetails.ReportColumns != null && this.reportDetails.ReportColumns.length > 0) {

      this.reportDetails.ReportColumns.forEach(reportcolumn => {


        if (reportcolumn.ColumnName === '') {
          this.messageService.showMessage({ severity: 'error', detail: 'Please Enter Column Name' });
          hasError = true;
          return;
        }
        if (reportcolumn.DisplayName === '' || !reportcolumn.DisplayName) {
          this.messageService.showMessage({ severity: 'error', detail: '"Please Enter Display Name' });
          hasError = true;
          return;
        }
        if (!reportcolumn.DisplayFormat) {
          reportcolumn.DisplayFormat = '';
        }
      })
    }

    this.reportDetails.CallTime = '';

    if (hasError) {
      return;
    }

    this.reportService.SaveReportDetails(this.reportDetails).then((data) => {

      if (data.data.HasError) {
        this.messageService.showMessage({ severity: 'error', detail: data.data.ErrorMessage });

      } else {
        this.messageService.showMessage({ severity: 'success', detail: 'Report successfully saved' });

        if (val === 'cancel') {
          this.router.navigate(['report']);
        } else {
          let totalReports = Number(this.totalDB);
          if (this.reportId === 0) {
            totalReports = totalReports + 1;
            this.router.navigate(['report/Entry/' + data.data.Result + '/' + totalReports]);
          } else {
            this.router.navigate(['report/Entry/' + this.reportId + '/' + totalReports]);
          }
        }
      }
    });

  }
}



