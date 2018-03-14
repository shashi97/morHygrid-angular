import { Component, ViewEncapsulation, Input, OnChanges, forwardRef,
  AfterViewInit, Output, OnInit, EventEmitter, ViewChild } from "@angular/core";
import { GridOptions } from "ag-grid/main";

import ProficiencyFilter from "./filters/proficiencyFilter";
import SkillFilter from "./filters/skillFilter";
import RefData from "./data/refData";
import {ChartComponent} from '../../component/report-viewer/chart/chart.component';
import { TreeModel, ReportObject, ReportViewerChartDetailsModel } from '../../component/report-viewer/tree-table/shared/tree-table.model';

// only import this if you are using the ag-Grid-Enterprise
import "ag-grid-enterprise";

import { HeaderGroupComponent } from "./header-group-component/header-group.component";
import { DateComponent } from "./date-component/date.component";
import { HeaderComponent } from "./header-component/header.component";

@Component({
  selector: 'report-viewer-grid',
  templateUrl: './rich-grid.component.html',
  encapsulation: ViewEncapsulation.None
})
export class RichGridComponent implements AfterViewInit, OnChanges, OnInit {


  private gridOptions: GridOptions;
  reportViewerChartDetails: Array<ReportViewerChartDetailsModel> ;
  public rowData: any[];
  @Input() columnDefs: any[];
  // @ViewChild(forwardRef(() => ChartComponent)) ChartComponent;
  // @Input() gridData: any[];
  @Input() layoutData;
  @Input() isTable = true;
  @Input() isChart;
  @Input() reportToggle;
  @Output() gridOptionsData: EventEmitter<any> = new EventEmitter();
  @Output() isTableChange: EventEmitter<any> = new EventEmitter();
  @Output() isChartChange: EventEmitter<any> = new EventEmitter();


  @Output() gridLayoutJson: EventEmitter<any> = new EventEmitter();
  @Output() chartDetailData: EventEmitter<any> = new EventEmitter();

  
  public rowCount: string;
  public dateComponentFramework: DateComponent;
  public HeaderGroupComponent = HeaderGroupComponent;
  @Input() isFullScreen: boolean = false;
  private _saveLayOut: boolean;

  @Input()
  set saveLayOut(saveLayOut: boolean) {
    this._saveLayOut = false;
    // this.onGridOptionSelection();

  }
  @Input()
  set gridData(gridData: any) {
     setTimeout(() => {
    this.rowData = gridData;
    if (this.rowData && this.gridOptions.columnApi) {
    //  this.getLayOutData();
  //     setTimeout(() => {
         this.getLayOutData();
    }
       }, 10)
    }
  

  ngOnChanges() {
    if (this.rowData && this.gridOptions.columnApi) {
      // setTimeout(() => {
      //   this.getLayOutData();
      // }, 10)
    }
  }

  ngOnInit() {
    console.log('savelayout' + this.saveLayOut);

    // this.saveLayOut
  }

  constructor() {
    // we pass an empty gridOptions in, so we can grab the api out
    this.gridOptions = <GridOptions>{};
    // this.createRowData();
    this.createColumnDefs();
    this.gridOptions.dateComponentFramework = DateComponent;
    this.gridOptions.defaultColDef = {
      headerComponentFramework: <{ new (): HeaderComponent }>HeaderComponent,
      headerComponentParams: {
        menuIcon: 'fa-bars'
      }
    };
    this.gridOptions.getContextMenuItems = this.getContextMenuItems.bind(this);
    // this.gridOptions.floatingFilter = true;
    // this.gridOptions.enableSorting = true;
    // this.gridOptions.showToolPanel = true;
    // this.gridOptions.toolPanelSuppressPivots = true;
    // this.gridOptions.toolPanelSuppressPivotMode = true;
  }
  ngAfterViewInit() {
    this.getLayOutData();
  }

  getLayOutData() {
    if (this.layoutData) {
      const gridOptionsObj = JSON.parse(this.layoutData);
      if (this.isTable) {

        this.gridOptions.columnApi.setColumnState(gridOptionsObj.ColumnState);
        // set sort
        this.gridOptions.api.setSortModel(gridOptionsObj.SortModel);
        // set filter
        this.gridOptions.api.setFilterModel(gridOptionsObj.FilterModel);
      }
      this.getChartDetail(this.gridOptions, gridOptionsObj.reportViewerChartDetail);
      // this.isChart = gridOptionsObj.isChart;
      // this.isTable = gridOptionsObj.isTable;
      // this.isTableChange.emit(this.isTable);
      // this.isChartChange.emit(this.isChart);
    }

    // if (this.layoutId !== 0) {
    //   const layout = JSON.parse(this.layoutData);
    //   this.isChart = layout.isChart;
    //   this.isTable = layout.isTable;
    // }

  }

  getChartDetail(gridOptions, reportViewerChartDetail) {
    // if (this.isChart) {
      // this.reportViewerChartDetails = Object.assign([], this.reportViewerChartDetails);
    // this.reportViewerChartDetails = reportViewerChartDetail;
    // this.reportViewerChartDetails = [];
    // reportViewerChartDetail.map(res=>{
    //   this.reportViewerChartDetails.push(res);
    // })
    // this.reportViewerChartDetails.push(reportViewerChartDetail[0]);
     this.reportViewerChartDetails = reportViewerChartDetail;
    this.saveGridLayout(gridOptions);
    // this.reportViewerChartDetails = gridOptionsObj.reportViewerChartDetail;
    // this.onChartJson(this.reportViewerChartDetails);
    // }
  }

  private getContextMenuItems(): any {
    // let result: any = [
    //   { // custom item
    //     name: 'Alert ',
    //     action: function () {
    //       window.alert('Alerting about ');
    //     },
    //     cssClasses: ['redFont', 'bold']
    //   }];
    // return result;
  }

  private createRowData() {
    const rowData: any[] = [];

    for (let i = 0; i < 200; i++) {
      const countryData = RefData.countries[i % RefData.countries.length];
      rowData.push({
        name: RefData.firstNames[i % RefData.firstNames.length] + ' ' + RefData.lastNames[i % RefData.lastNames.length],
        skills: {
          android: Math.random() < 0.4,
          html5: Math.random() < 0.4,
          mac: Math.random() < 0.4,
          windows: Math.random() < 0.4,
          css: Math.random() < 0.4
        },
        dob: RefData.DOBs[i % RefData.DOBs.length],
        address: RefData.addresses[i % RefData.addresses.length],
        years: Math.round(Math.random() * 100),
        proficiency: Math.round(Math.random() * 100),
        country: countryData.country,
        continent: countryData.continent,
        language: countryData.language,
        mobile: createRandomPhoneNumber(),
        landline: createRandomPhoneNumber()
      });
    }

    // this.rowData = rowData;
  }

  private createColumnDefs() {
    // this.columnDefs = this.columnDefs;

  }

  private calculateRowCount() {
    if (this.gridOptions.api && this.rowData) {
      const model = this.gridOptions.api.getModel();
      const totalRows = this.rowData.length;
      const processedRows = model.getRowCount();
      this.rowCount = processedRows.toLocaleString() + ' / ' + totalRows.toLocaleString();
    }
  }

  private saveGridLayout(gridOptions) {
    this.gridOptions = gridOptions;
    const obj = { gridOptions: gridOptions, reportViewerChartDetails: this.reportViewerChartDetails }
    this.gridLayoutJson.emit(obj);
    // this.gridLayoutJson.emit(gridOptions);
  }

  private onModelUpdated($event) {
    console.log('onModelUpdated');
    this.calculateRowCount();
    this.saveGridLayout($event);
    // this.onChartJson(this.reportViewerChartDetails);
  }

  private onReady($event) {
    console.log('onReady');
    this.calculateRowCount();
    this.saveGridLayout($event);
    // this.onChartJson(this.reportViewerChartDetails);
  }

  private onCellClicked($event) {
    console.log('onCellClicked: ' + $event.rowIndex + ' ' + $event.colDef.field);
  }

  private onCellValueChanged($event) {
    console.log('onCellValueChanged: ' + $event.oldValue + ' to ' + $event.newValue);
  }

  private onCellDoubleClicked($event) {
    console.log('onCellDoubleClicked: ' + $event.rowIndex + ' ' + $event.colDef.field);
  }

  private onCellContextMenu($event) {
    console.log('onCellContextMenu: ' + $event.rowIndex + ' ' + $event.colDef.field);
  }

  private onCellFocused($event) {
    console.log('onCellFocused');
    this.saveGridLayout($event);
    //  this.onChartJson(this.reportViewerChartDetails);
  }

  private onRowSelected($event) {
    // taking out, as when we 'select all', it prints to much to the console!!
    // console.log('onRowSelected: ' + $event.node.data.name);
  }

  private onSelectionChanged() {
    console.log('selectionChanged');
  }

  private onFilterModified($event) {
    console.log('onFilterModified');
    this.saveGridLayout($event);
    // this.onChartJson(this.reportViewerChartDetails);
  }

  private onVirtualRowRemoved($event) {
    // because this event gets fired LOTS of times, we don't print it to the
    // console. if you want to see it, just uncomment out this line
    // console.log('onVirtualRowRemoved: ' + $event.rowIndex);
  }

  private onRowClicked($event) {
    console.log('onRowClicked: ' + $event.node.data.name);
  }

  public onQuickFilterChanged($event) {
    this.gridOptions.api.setQuickFilter($event.target.value);
  }

  // here we use one generic event to handle all the column type events.
  // the method just prints the event name
  private onColumnEvent($event) {
    console.log('onColumnEvent: ' + $event);
    this.saveGridLayout($event);
    // this.onChartJson(this.reportViewerChartDetails);
  }

  public dobFilter() {
    let dateFilterComponent = this.gridOptions.api.getFilterInstance('dob');
    dateFilterComponent.setModel({
      type: 'equals',
      dateFrom: '2000-01-01'
    });
    this.gridOptions.api.onFilterChanged();
  }

  public onGridOptionSelection() {
    const obj = { gridOptions: this.gridOptions, reportViewerChartDetails: this.reportViewerChartDetails }
    this.gridOptionsData.emit(obj);
  }
  public onChartJson(chartDetail) {
    // this.chartDetailData.emit(chartDetail);
    this.reportViewerChartDetails = chartDetail;
    this.saveGridLayout(this.gridOptions);
  }
}


function skillsCellRenderer(params) {
  const data = params.data;
  const skills = [];
  RefData.IT_SKILLS.forEach(function (skill) {
    if (data && data.skills && data.skills[skill]) {
      skills.push('<img src="https://www.ag-grid.com/images/skills/' + skill + '.png" width="16px" title="' + skill + '" />');
    }
  });
  return skills.join(' ');
}

function countryCellRenderer(params) {
  const flag = "<img border='0' width='15' height='10' style='margin-bottom: 2px' src='https://www.ag-grid.com/images/flags/" + RefData.COUNTRY_CODES[params.value] + ".png'>";
  return flag + " " + params.value;
}

function createRandomPhoneNumber() {
  let result = '+';
  for (let i = 0; i < 12; i++) {
    result += Math.round(Math.random() * 10);
    if (i === 2 || i === 5 || i === 8) {
      result += ' ';
    }
  }
  return result;
}

function percentCellRenderer(params) {
  const value = params.value;

  const eDivPercentBar = document.createElement('div');
  eDivPercentBar.className = 'div-percent-bar';
  eDivPercentBar.style.width = value + '%';
  if (value < 20) {
    eDivPercentBar.style.backgroundColor = 'red';
  } else if (value < 60) {
    eDivPercentBar.style.backgroundColor = '#ff9900';
  } else {
    eDivPercentBar.style.backgroundColor = '#00A000';
  }

  const eValue = document.createElement('div');
  eValue.className = 'div-percent-value';
  eValue.innerHTML = value + '%';

  const eOuterDiv = document.createElement('div');
  eOuterDiv.className = 'div-outer-div';
  eOuterDiv.appendChild(eValue);
  eOuterDiv.appendChild(eDivPercentBar);

  return eOuterDiv;
}

//Utility function used to pad the date formatting.
function pad(num, totalStringSize) {
  let asString = num + "";
  while (asString.length < totalStringSize) asString = "0" + asString;
  return asString;
}


