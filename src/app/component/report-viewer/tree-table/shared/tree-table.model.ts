export class TreeModel {
  Children: Array<Children> = [];
  GroupOrReportName: string = '';
  IsCustomReport: boolean;
  ReportObject: ReportObject;
  IsReportChild: boolean = false;


}

export class Children {
  Children: Array<Children>;
  GroupOrReportName: string = '';
  IsCustomReport: boolean;
  ReportObject: ReportObject;
  IsReportChild: boolean = false;
  borderLeftColor = '';
}

export class ReportObject {
  ChildReportGroupName: string = "";
  ColumnSchema: string = '';
  CompanyID: string = "";
  DataObjectTypeID: number = 0;
  DatabaseName = [];
  HFADatabaseID: number = 0;
  IsCustomReport: boolean;
  IsFomattedUrl: boolean;
  ReportColumns: Array<ReportColumns>;
  ReportGroupName: string;
  ReportID: number;
  ReportName: string;
  ReportLayouts: Array<ReportLayout> = [];
  ReportLayoutDDO: Array<any> = [];
  ReportParameters: Array<ReportParameters>;
  selectedReportLayout: number = 0;
  layOutRadioSelection: number = 0;
  ServiceUrl: string;
  SourceName: string;
  SourceType: string;
  TokenValue: string;
  IsReportChild: boolean = false;

}

export class ReportLayout {
  LayoutJson: string = '';
  LayoutName: string = "";
  ReportID: number = 0;
  ReportLayoutID: number = 0;

}

export class ReportColumns {
  ColumnID: number;
  ColumnName: string;
  DataType: string;
  DisplayFormat: string;
  DisplayName: string;
  ReportID: number;

}

export class ReportParameters {
  ColumnLabel: string;
  ColumnValue: string;
  DataSourceReportID: number;
  DataType: string;
  DefaultValue;
  Description: string;
  DisplayName: string;
  IsDynamicSource: boolean;
  IsHidden: boolean;
  ParameterDetails: string;
  ParameterName: string;
  ParameterValue: string;
  ReportID: number;
  DefaultValueParams = [];
  DefaultReportParameterData = [];
  ReportParameterID: number;
  listParameterDDO = [];
  selectedListParameterValue;
  dynamicDataLoaderGif: boolean = false;
  layOutRadioSelection: number = 0;

}

export class ReportViewerChartDetailsModel {
  isSelectedSetting = false;
  chartType = '';
  isClosed = false;
  selectedName = '';
  selectedValue = '';
  selectedNameId = 0;
  selectedValueId = 0;
  display = false;
  selectedChartType: string;
  columnNames: Array<any> = [];
  rowDatas: Array<any> = [];
  chartOptions: Array<any> = [];
  columnValue: Array<any>=[];

  single: Array<any> = [
    {
      'name': 'sample',
      'value': 10
    }
  ];
  multiple: Array<MultipleModel> = [{
    name: 'Cyan',
    series: [
      {
        name: 5,
        value: 2650
  }]
}];
  selectedBarValue: Array<string> = [];
   selectedBarName: Array<string> = [];
   selectedBarColumnsName: string;
  
   barchartSettings: Array<BarchartSettings> = [];
  chartDetails: Array<ChartDetailsModel> = new Array<ChartDetailsModel>();
}

export class BarchartSettings{
   selectedBrChartColumnsValue: string;
   selectedBarChartCommonValue: string;
}

export class ChartDetailsModel {
  name: any;
  value: number;
}
export class MultipleModel {
  name: string;
  series: Array<ChartDetailsModel> = new Array<ChartDetailsModel>()
}

// export class primeDDO {
//   label:string;
//   value
// }