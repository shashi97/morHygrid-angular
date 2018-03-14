export class ReportModel {
    CategoryID: any;
    CategoryName: string;
    ChildReportGroupName = '';
    ColumnSchema: string;
    CompanyID: string;
    DataObjectTypeID = 0;
    DataSourceTypeID = 0;
    DatabaseName: string;
    HFADatabaseID = 0;
    IsFomattedUrl: boolean;
    IsReportAsDataSource = false;
    ReportGroupName = '';
    ReportID = 0;
    ReportName = '';
    SourceName = '';
    SourceType = '';
    Header = 'Adding New Report';
    IconClass = 'fa fa-fw fa-plus txt-color-blue';
    ReportParameters = [];
    ReportColumns: Array<ReportColumsModel> = new Array<ReportColumsModel>();
    SourceNameLabel: string;
    SourceNameExampleLabel: string;
    CallTime: string;
}

export class ReportColumsModel {
    ColumnName: string;
    DataType: string;
    DisplayFormat: string;
    DisplayName: string;
}


export class DatabaseModal {
    DataSourceType: null
    DataSourceTypeID = 0
    DatabaseName = ''
    Description: null
    HFADatabaseID = 0
}

export class TestDataModel {
    reportToRun: ReportModel;
    tokenValue = 'value';
}

export class SourceTypeModel {
    DataObjectTypeCode: string;
    DataObjectTypeDesc: string;
    DataObjectTypeID: number;
    DataObjectTypeName: string;
    DataSourceTypeID: number;
    HasPreDefinedDataObjects: boolean;
}

export class ReportDetailModel {
    ReportID: 0;
    CategoryID: any;
    HFADatabaseID: 0;
    ReportGroupName: '';
    ChildReportGroupName: '';
    ReportName: '';
    DataSourceTypeID: 0;
    DataObjectTypeID: 0;
    SourceType: '';
    SourceName: '';
    SourceTypeCode: '';
    IsHidden: false;
    IsReportAsDataSource: false;
    ColumnSchema: '';
    ReportParameters: Array<any> = [];
    ReportColumns: Array<any> = [];
}

export class StaticListModel {
    ParamIndex: number;
    DefaultValue = '';
    StaticListParams: Array<any> = [];
}

// export class ReportEntryModel {
//     HFADatabaseID: number = 0;
//     DataObjectTypeID: number = 0;
//     ReportName: string = '';
//     CategoryID: number = 0
//     CategoryName: string = ''
//     SourceName: string = ''
//     IsFomattedUrl: boolean = false;
//     IsReportAsDataSource: boolean = false;
// }

// export class Categorymodel {
//     CategoryID: number;
//     CategoryName: string;
//     CompanyID: string;
//     CreatedBy: string;
//     ModifiedDateTime: string;
// }

