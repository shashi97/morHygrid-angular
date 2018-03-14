import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ReportViewerService } from '../shared/report-viewer.service'
import { TreeModel, ReportParameters, ReportObject } from './shared/tree-table.model';
import { ErrorModel } from '../../../core/error/error.model';
import { ErrorService } from '../../../core/error/error.service';
import { Message } from 'primeng/primeng';
@Component({
  selector: 'tree-table',
  templateUrl: './tree-table.component.html',
  styleUrls: ['./tree-table.component.css']
})

export class TreeTableComponent implements OnInit {
  // reportViewData;
  message: Message[] = [];
  error: ErrorModel = new ErrorModel();
  @Input() reportViewData: Array<TreeModel>;

  childObject: boolean = false;
  dataBaseName: Array<any>;
  sourceTypeData;
  query: string = '';
  GridHeight: number;
  TestReportData;
  gridData: Array<any> = [];
  dynamicDataLoaderGif: boolean = false;
  reportObject: ReportObject = new ReportObject();
  reportParameters: ReportParameters = new ReportParameters();
  @Output() onSelected: EventEmitter<any> = new EventEmitter();
  @Output() gridDataChanges: EventEmitter<any> = new EventEmitter();
  @Output() treeLayOutSelection: EventEmitter<any> = new EventEmitter();
  @Output() reportSelectChanges: EventEmitter<any> = new EventEmitter();
  @Output() reportNewLayOut: EventEmitter<any> = new EventEmitter();
  @Input() isFullScreen: boolean = false;

  @Input()
  set layoutJsonObject(layoutJsonObject) {
    if (layoutJsonObject) {
      this.getReportObjectByReportId(layoutJsonObject);
      let isTrue: boolean = false;
      this.reportObject.ReportLayouts.filter(item => {
        if (layoutJsonObject.ReportLayoutID == item.ReportLayoutID) {
          item.LayoutJson = layoutJsonObject.LayoutJson;
          item.LayoutName = layoutJsonObject.LayoutName;
          return isTrue = true;
        }
      })
      if (!isTrue) {
        this.reportObject.ReportLayouts.push(layoutJsonObject);
      }
      const ReportLayoutDDO = [{ label: 'Select Layout', value: null }];
      this.reportObject.ReportLayouts.forEach(obj => {
        ReportLayoutDDO.push({
          label: obj.LayoutName,
          value: obj.ReportLayoutID
        })
      })
      this.reportObject.ReportLayoutDDO = ReportLayoutDDO;
      this.reportObject.selectedReportLayout = layoutJsonObject.ReportLayoutID;
      this.reportObject.layOutRadioSelection = 1;
      this.onLayOutSelect(layoutJsonObject.ReportLayoutID);
    }
  }
  constructor(public reportViewerService: ReportViewerService,
    public errorService: ErrorService) { }

  ngOnInit() {
    // this.getReportViewerJson();

    // this.reportViewData.forEach(element => {
    //   element.map(element => {
    //    return element.childObject = false
    //   });
    // });
    this.initializeReportData();
  }



  initializeReportData() {
    if (this.reportViewData) {
      this.reportViewData.forEach(element => {
        element.Children.forEach(object => {
          if (!object.Children) {
            this.intializeReportParam(object);
          } else if (object.Children) {
            object.Children.forEach(data => {
              this.intializeReportParam(data);
            })
          }
        });
      });
      this.getDataBaseName();
    }
  }

  intializeReportParam(object) {
    object.ReportObject.ReportParameters.forEach(item => {
      if (item.DataType == "list" && !item.IsDynamicSource) {
        let defaultstring: any = item.ParameterValue.split(" Default:").splice(-1);
        defaultstring = defaultstring[0].slice(0);
        item.selectedListParameterValue = defaultstring.substr(1, defaultstring.length - 2);
        const str = item.ParameterValue.split('["').pop().split('"]').shift();
        const array = str.split('","');
        const listDDO = [];
        array.forEach((seperatedString) => {
          listDDO.push({
            label: seperatedString,
            value: seperatedString
          });
        })
        item.listParameterDDO = listDDO;
      } else if (item.DataType == "boolean") {
        item.DefaultValue = Boolean(item.DefaultValue);
      }
      item.dynamicDataLoaderGif = false;

    })
    const ReportLayoutDDO = [{ label: 'Select Layout', value: null }];
    if (object.ReportObject.ReportLayouts && object.ReportObject.ReportLayouts.length > 0) {
      object.ReportObject.ReportLayouts.forEach(obj => {
        ReportLayoutDDO.push({
          label: obj.LayoutName,
          value: obj.ReportLayoutID
        })
      })

    }
    object.ReportObject.ReportLayoutDDO = ReportLayoutDDO;
    object.ReportObject.layOutRadioSelection = 0;
  }

  getReportObjectByReportId(layoutJsonObject) {
    if (this.reportViewData) {
      this.reportViewData.forEach(element => {
        element.Children.forEach(object => {
          if (!object.Children) {
            if (object.ReportObject.ReportID == layoutJsonObject.ReportID) {
              this.reportObject = object.ReportObject;
              object.ReportObject.layOutRadioSelection = 1;
            }
          } else if (object.Children) {
            object.Children.forEach(data => {
              if (data.ReportObject.ReportID == layoutJsonObject.ReportID) {
                this.reportObject = data.ReportObject;
                data.ReportObject.layOutRadioSelection = 1;
              }
            })
          }
        });
      });
    }
  }

  getDataBaseName() {
    this.reportViewerService.getDataBaseName().then(data => {
      this.dataBaseName = data.data.Result;
    });
  }

  public async getReportParamDetail(parameter, reportObject) {
    this.reportObject = reportObject;
    const dataSourceReportID = parameter.DataSourceReportID;
    const result = await this.reportViewerService.getReportParamDetail(dataSourceReportID);
    if (result.data.Result) {
      this.reportObject = result.data.Result;
    }
    const result1 = await this.reportViewerService.ReportParameterDetails(dataSourceReportID);
    this.reportObject.ReportParameters = result1.data.Result;
    if (this.reportObject.ReportParameters == null) {
      this.reportObject.ReportParameters = [];
    }

    const selectedSource = this.dataBaseName.filter(item => {
      return item.HFADatabaseID == this.reportObject.HFADatabaseID;
    });
    let data;
    if (selectedSource && selectedSource.length > 0) {
      data = await this.reportViewerService.GetSourceType(selectedSource[0].DataSourceTypeID);
    }
    const sourceType = data.data.Result.filter(item => {
      return item.DataObjectTypeID == this.reportObject.DataObjectTypeID;
    })

    if (sourceType && sourceType.length > 0) {
      this.reportObject.SourceType = sourceType[0].DataObjectTypeName;
    }
    const restServiceUrl = this.reportObject.ServiceUrl;
    const reportParams = await this.reportViewerService.GetReportParamDataFromService(this.reportObject, restServiceUrl);

    if (!reportParams.data) {
      this.showErrorMessage('Data Service is not reachable at ' + restServiceUrl);
      return;
    } else {
      data = reportParams.data;
    }

    data = JSON.parse(data)
    parameter.DefaultReportParameterData = data.Result;
    if (parameter.DefaultReportParameterData && parameter.DefaultReportParameterData.length > 0) {
      parameter.ParamColumns = Object.keys(parameter.DefaultReportParameterData[0]);
    }

    await this.getDefaultValueParams(parameter);
  }

  async getDefaultValueParams(parameter) {
    if (parameter.ColumnValue == undefined || parameter.ColumnValue == '') {
      parameter.ColumnValue = parameter.ColumnLabel;
    }
    if (parameter.ColumnLabel == undefined || parameter.ColumnLabel == '') {
      parameter.ColumnLabel = parameter.ColumnValue;
    }
    parameter.DefaultValueParams = [];
    if (parameter.DefaultReportParameterData && parameter.DefaultReportParameterData.length > 0) {
      parameter.DefaultReportParameterData.forEach((item) => {
        const obj = {
          value: item[parameter.ColumnValue],
          label: item[parameter.ColumnLabel]
        }
        parameter.DefaultValueParams.push(obj);
      })
    }
  }

  public showErrorMessage(errorMessage) {
    this.message.push({ severity: 'error', summary: '', detail: errorMessage });
    // this.errorService.sendErrorMessage(this.error);
  }

  /* this function help to collapse and expand the div of Items*/
  public fileShownEvent(item): void {
    if (this.reportViewData) {
      this.reportViewData.map(element => {
        if (element.GroupOrReportName == item.GroupOrReportName) {
          if (!element.IsReportChild) { element.IsReportChild = true; }
          else { element.IsReportChild = false; }
        }
      })
    }
  }
  public childFileShownEvent(item, report): void {
    if (item.IsReportChild) {
      item.IsReportChild = false;
    } else {
      item.IsReportChild = true;
    }
  }

  public async childReportParameterFileShownEvent(item) {
    if (this.reportViewData) {
      await this.reportViewData.forEach(async element => {
        await element.Children.map(async object => {
          if (!object.Children) {
            if (object.ReportObject.ReportID == item.ReportID && !object.ReportObject.IsReportChild) {
              object.ReportObject.IsReportChild = true;
              var dynamicParams = object.ReportObject.ReportParameters.filter(param => {
                param.dynamicDataLoaderGif = true;
                return param.DataType == 'list' && param.IsDynamicSource == true
              })

              if (dynamicParams && dynamicParams.length > 0) {
                for (var i = 0; i < dynamicParams.length; i++) {
                  if (!dynamicParams[i].DefaultValueParams) {
                    await this.getReportParamDetail(dynamicParams[i], object.ReportObject);
                  }
                  dynamicParams[i].dynamicDataLoaderGif = false;
                }
              }
              this.reportSelectChanges.emit(object.ReportObject);

            } else {
              object.ReportObject.IsReportChild = false;
            }
          } else {
            object.Children.forEach(async data => {
              if (data.ReportObject.ReportID == item.ReportID && !data.ReportObject.IsReportChild) {
                data.ReportObject.IsReportChild = true;
                var dynamicParams = data.ReportObject.ReportParameters.filter(param => {
                  param.dynamicDataLoaderGif = true;
                  return param.DataType == 'list' && param.IsDynamicSource == true
                })
                if (dynamicParams && dynamicParams.length > 0) {
                  for (let i = 0; i < dynamicParams.length; i++) {
                    if (!dynamicParams[i].DefaultValueParams) {
                      await this.getReportParamDetail(dynamicParams[i], data.ReportObject);
                    }
                    dynamicParams[i].dynamicDataLoaderGif = false;
                  }
                }
                this.reportSelectChanges.emit(data.ReportObject);
                //  this.reportObject = object.ReportObject;
              } else {
                data.ReportObject.IsReportChild = false;
              }
            });
          }
        })
      });
    }
  }


  public async getReportDataFromService(selectedReport) {
    this.reportObject = selectedReport;
    // if (this.reportObject.layOutRadioSelection == 0) {
    //   this.reportNewLayOut.emit('newLayOut');
    // }
    // this.reportNewLayOut.emit('newLayOut');
    if (this.reportObject.layOutRadioSelection == 1) {
      this.onLayOutSelect(this.reportObject.selectedReportLayout);
    }
    if (this.reportObject.layOutRadioSelection == 1 && !this.reportObject.selectedReportLayout) {
      this.showErrorMessage('Please select Layout');
      return;
    }
    this.reportSelectChanges.emit(this.reportObject);
    await this.selectedDataSource(this.reportObject.HFADatabaseID);

    const dataString = JSON.stringify(this.reportObject);

    this.sourceTypeData.forEach(item => {
      if (item.DataObjectTypeID == this.reportObject.DataObjectTypeID) {
        this.reportObject.SourceType = item.DataObjectTypeName;
      }
    });
    const testReportData = [];
    const restServiceUrl = this.reportObject.ServiceUrl;
    this.reportViewerService.GetReportDataFromService(this.reportObject, restServiceUrl).then(data => {

      if (data.data.status === 0) {
        this.showErrorMessage('Data Service is not reachable at ' + restServiceUrl);
        return;
      } else {
        data = data.data;
      }
      data = JSON.parse(data)
      // try {
      //   data = JSON.parse(data);
      // }
      // catch (err) {
      //   this.showErrorMessage(data);
      //   return;
      // }

      // data = data.Result.Result.Table;
      this.query = data.Call;

      if (!data.Status) {

        // report.ErrorMsg = data.ErrorMessage;
        // report.showErrorMsg = true;
        // report.showTestDataFirstTime = true;
        // report.showTestData = false;
        // report.TestReportData = [];
        // messageService.showMsgBox('Report', data.ErrorMessage, 'error');
        this.showErrorMessage('Report' + 'Error while getting data: ' + data.ErrorMessage);
        return;
      }
      if (data.ErrorMessage == null) {
        // report.showErrorMsg = false;
        // report.showTestData = true;

        // report.renderedColumns = null;

        // var gridScope = angular.element($('.ngGrid')).scope();

        this.gridData = data.Result;


        for (var item in this.gridData) {
          for (var k in this.gridData[item]) {

            if (k.replace(/\s/g, '') != k) {
              this.gridData[item][k.replace(/\s/g, '')] = this.gridData[item][k];
              delete this.gridData[item][k];
            } else {
              var val = this.gridData[item][k];
              var key = k;
              delete this.gridData[item][k];
              this.gridData[item][key] = val;
            }

          }
        }


        this.TestReportData = data.Result;

        if (this.TestReportData == null || this.TestReportData.length == 0) {
          // this.showErrorMsg = true;
          // this.showTestData = false;
          // this.ErrorMsg = 'There is no data for this query';
          // this.showTestDataFirstTime = true;
          this.showErrorMessage('Report' + 'There is no data for this query');
        } else {
          // this.error = '';
        }

        if (this.TestReportData && this.TestReportData.length != undefined)
          this.GridHeight = (this.TestReportData.length * 30) + 70;

        let colDefs = [];
        if (this.gridData && this.gridData.length > 0) {
          var row = this.gridData[0];
          for (var colName in row) {
            const width = colName.length * 5 + 145;
            const columnDetail = this.reportObject.ReportColumns.filter(column => {
              return colName === column.ColumnName
            })[0];
            if(columnDetail)
            {
            if (columnDetail && (columnDetail.DataType == "Int16" 
              || columnDetail.DataType == "Int32" 
              || columnDetail.DataType == "Int64"
              || columnDetail.DataType == "Decimal"
              || columnDetail.DataType == "Double")) {
              colDefs.push({
                headerName: colName,
                field: colName,
                filter: 'text',
                width: width,
                enableRowGroup: true,
                enablePivot: true,
                enableValue: true,
                DataType: columnDetail.DataType,
                aggFunc: "sum",
                allowedAggFuncs: ["sum", "min", "max"]
              });
            } else {
              colDefs.push({
                headerName: colName,
                field: colName,
                filter: 'text',
                width: width,
                enableRowGroup: true,
                enablePivot: true,
                DataType: columnDetail.DataType,
              });
            }
          }
          }
        }
        this.gridDataChanges.emit({ colDefs: colDefs, gridData: this.gridData, reportObject: this.reportObject });

      }

    });
  }

  selectDataObject(objID) {
    this.reportObject.DataObjectTypeID = objID;
    // if (objID == 3) {
    //   $('.CodeMirror').show();
    // }
    // else {
    //   $('.CodeMirror').hide();
    // }
  }

  public async selectedDataSource(sourceID) {
    // this.selectDataObject(this.reportObject.DataObjectTypeID);
    const selectedSource = await this.dataBaseName.filter(item => {
      return item.HFADatabaseID == sourceID;
    });
    if (selectedSource && selectedSource.length > 0) {
      const data = await this.reportViewerService.GetSourceType(selectedSource[0].DataSourceTypeID);
      this.sourceTypeData = data.data.Result;
    }
  }
  onLayOutSelect(layoutId) {
    this.treeLayOutSelection.emit(layoutId);
  }

}
