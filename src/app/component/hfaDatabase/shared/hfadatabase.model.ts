import { Message } from 'primeng/primeng';
export class HFADatabaseModel {
  columns: Array<ColumnModel> = [];
  grouping: Array<GroupingModel> = [];
  scrollFocus: {};
  selection: {};
}

export class ColumnModel {
  name: string;
  filter: Array<FilterModel> = [];
  sort: Array<SortModel> = [];
}

export class FilterModel {
}

export class SortModel {
}

export class GroupingModel {
  aggregations: Array<AggregationModel> = [];
  grouping: Array<GroupModel> = [];
}

export class AggregationModel {
}

export class GroupModel {
}

export class HFADatabaseEntryModel {
  CategoryID: string = '';
  CategoryName: string = '';
  ClientSecret: string = '';
  CompanyID: string = '';
  ConsumerKey: string = '';
  DataSourceTypeID: number = 0;
  DatabaseName: string = '';
  Description: string = '';
  HFADatabaseID: number = 0;
  IsSecure: string = '';
  LoginID: string = '';
  Password: string = '';
  PasswordSalt: string = '';
  ServerName: string = '';
  SourceType: string = '';
  SourceTypeName: string = '';
  Header = 'Adding New Source';
  IconClass = 'fa fa-fw fa-plus txt-color-blue';
  SourceNameExampleLabel = ' (your database name) ';
  ServerNameExampleLabel = ' '
  ServerNameLabel = 'Server Name';
  SourceName = '';
}

export class SourceTypemodel {
  DataSourceDescription: string = '';
  DataSourceTypeID: number = 0;
  SourceTypeCode: string = '';
  SourceTypeName: string = '';
  IsSecure: boolean = false;
  LoginID: string = '';
  SourceType: string = '';
}

export class Categorymodel {
  CategoryID: number;
  CategoryName: string;
  CompanyID: string;
  CreatedBy: string;
  ModifiedDateTime: string;
}

export class HfaDatabasCategoryModel {
  CategoryID: number = 0;
  CategoryName: string;
}

export class MyModel {
  msgs: Message[] = [];
}
