import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { TreeNode } from 'primeng/primeng';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ReportViewerService } from './shared/report-viewer.service';
import { TreeModel, ReportObject, ReportViewerChartDetailsModel } from './tree-table/shared/tree-table.model';
import { LocalStorageService } from '../../core/service/local-storage.service';
import { TreeTableComponent } from '../report-viewer/tree-table/tree-table.component';
import { TabConfig } from '../../shared/tab-view/TabConfig';
import { RichGridComponent } from '../../core/ag-data-table/rich-grid.component'
import { TabsComponent } from './../../shared/dynamic-tabs/tabs.component';
import { LayoutService } from '../../shared/layout/layout.service';
import { timeout } from 'rxjs/operators/timeout';
declare const $;
@Component({
  selector: 'app-report-viewer',
  templateUrl: './report-viewer.component.html',
  styleUrls: ['./report-viewer.component.css']
})
export class ReportViewerComponent implements OnInit, AfterViewInit {
  title = 'app';
  isFullScreen = false;
  isSettingSelected = false;

  public reportViewerChartDetails: Array<ReportViewerChartDetailsModel> = new Array<ReportViewerChartDetailsModel>();
  public reportViewerChart: ReportViewerChartDetailsModel = new ReportViewerChartDetailsModel();
  public items: Array<any> = [];
  breadcumUrl: Array<any>;
  activeItem: Array<any>;
  tabItems: Array<any>;



  // line, area
   autoScale = true;


  // description: Array<any> = [
  //   { description: 'You can move these elements between these two containers' },
  //   { description: 'Moving them anywhere else isnt quite possible' },
  //   { description: 'Theres also the possibility of moving elements around in the same container, changing their position' },
  //   { description: 'You can move these elements between these two containers' },
  //   { description: 'Moving them anywhere else isnt quite possible' },
  //   { description: 'Theres also the possibility of moving elements around in the same container, changing their position' },
  //   { description: 'You can move these elements between these two containers' },
  //   { description: 'Moving them anywhere else isnt quite possible' },
  //   { description: 'Theres also the possibility of moving elements around in the same container, changing their position' },
  //   { description: 'You can move these elements between these two containers' },
  //   { description: 'Moving them anywhere else isnt quite possible' },
  //   { description: 'Theres also the possibility of moving elements around in the same container, changing their position' }
  // ];
  source: any = [
    {
      id: 1, detail: [{ description: 'You can move these elements between these two containers' },
      { description: 'Moving them anywhere else isnt quite possible' }]
    },
    {
      id: 2, detail: [{
        description: 'Theres also the possibility of moving elements around' +
        'in the same container, changing their position'
      },
      { description: 'You can move these elements between these two containers' }]
    },
    {
      id: 3, detail: [{ description: 'You can move these elements between these two containers' },
      { description: 'Moving them anywhere else isnt quite possible' }]
    }
  ];
  columnDefs;
  moduleName = 'Report Viewer';
  layoutTitle: string = '';
  selectedReportObject;
  rowData;
  layoutId: number = 0;
  gridData: Array<any> = [];
  files;
  activeTabReportId: number;
  layoutJsonObject: {

  }
  layoutData
  reportToggle: boolean = false;
  getGridOption: boolean = false;
  isChart = false;
  isTable = true;
  isBoth = false;
  reportViewData: Array<TreeModel> = [];

  @ViewChild('reportViewerGrid') reportViewerGridTemplate;
  @ViewChild(RichGridComponent) RichGridComponent;
  @ViewChild(TabsComponent) tabsComponent;
  @ViewChild('reportViewer') reportViewer: ElementRef;
  tabs: Array<TabConfig> =
  [

    // { component: RichGridComponent, active: true, data: { name: 'Sheet1', selected: true, isEditable: false } },

  ];
  constructor(
    private router: Router,
    public route: ActivatedRoute,
    public reportViewerService: ReportViewerService,
    public localStorageService: LocalStorageService,
    private layoutService: LayoutService
  ) {
    this.breadcumUrl = this.getTitle(router.routerState, router.routerState.root);
    // Object.assign(this, {single, multi})   
    console.log('title', this.breadcumUrl);
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.breadcumUrl = this.getTitle(this.router.routerState, this.router.routerState.root);
        console.log('title', this.breadcumUrl);
        // titleService.setTitle(title);
      }
    });

    this.getReportViewerJson();
    // this.generateGraphBasedOnDescription();
    // $(document).ready(function () {
    //   $("#hide").click(function () {
    //     $("content").hide();
    //   });
    //   $("#show").click(function () {
    //     $("content").show();
    //   });
    // });
  }
  ngAfterViewInit() {
    // if (this.layoutId !== 0) {
    //   const layout = JSON.parse(this.layoutData);
    //   this.isChart = layout.isChart;
    //   this.isTable = layout.isTable;
    // }
  }
  getTitle(state, parent) {
    const data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.pageTitle) {
      data.push(parent.snapshot.data.pageTitle);
    }

    if (state && parent) {
      data.push(... this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }

  onToggle() {
    const e2: any = this.reportViewer.nativeElement;
    const document: any = window.document;
    if (!this.fullScreen()) {
      this.isFullScreen = true;
      e2.webkitRequestFullscreen();
    } else {
      this.isFullScreen = false;
      document.webkitExitFullscreen();
    }
  }




  fullScreen() {
    const document: any = window.document;
    return (document.fullScreenElement && document.fullScreenElement !== null)
      || document.mozFullScreen
      || document.webkitIsFullScreen;
  }

  onClickShow() {
    const x = document.getElementById('myDIV');

    if (this.isTable && this.isChart) {
      x.style.display = 'none';
      this.reportToggle = true;
      this.layoutService.onMinifyMenu('both');
      return;
    }
    // this.layoutService.onMinifyMenu(false);
    // x.style.display = 'block';
    // this.reportToggle = false;
  }
    // this.reportToggle = false;
    // this.reportToggle = false;
    // this.reportToggle = false;
  
 onClickCheckForTableOrGraph() {
    const x = document.getElementById('myDIV');
    const tab = this.tabsComponent.getActiveTab();
    tab.layoutJson.isChart = this.isChart;
    tab.layoutJson.isTable = this.isTable;
    this.tabsComponent.setDisplayCurrentState(tab);
    if (this.isTable && this.isChart) {
      x.style.display = 'none';
      this.reportToggle = true;
      this.layoutService.onMinifyMenu('both');
      return;
    }
    // this.layoutService.onMinifyMenu(false);
    // x.style.display = 'block';
    // this.reportToggle = false;
  }
  myFunction() {
    var x = document.getElementById("myDIV");
    if (x.style.display === "none") {
      x.style.display = "block";
      this.reportToggle = false;
    } else {
      x.style.display = "none";
      this.reportToggle = true;
    }
  }

  public getReportViewerJson() {
    this.reportViewerService.getReportViewerJsonData().then(result => {
      if (result.data) {
        this.reportViewData = result.data;
      }
    })
  }

  public saveReportTab(reportTabID, reportTabName) {
    const userId = this.localStorageService.getCurrentUserDetail();
    this.reportViewerService.saveReportTab(reportTabID, reportTabName, userId).then(result => {
      if (result.data.HasError) {

      };
    })
  }

  public onReportSelect(report: ReportObject) {
    this.selectedReportObject = report;
  }

  onGridReady(params) {
    this.rowData = this.gridData;

    params.api.setRowData(this.gridData);
  }

  onGridDataChangesFromTree(columnDataObj) {
    this.columnDefs = columnDataObj.colDefs;
    this.gridData = columnDataObj.gridData;
    if (columnDataObj.reportObject.layOutRadioSelection == 0) {
      this.layoutId = 0;
    }

    this.ontreeLayOutSelection(this.layoutId, columnDataObj.reportObject.ReportLayouts);
    if (this.layoutTitle == '') {
      this.layoutTitle = columnDataObj.reportObject.ReportName;
    }
    this.isChart = true;
    this.isTable = true;
      if (this.layoutId !== 0) {
        const layout = JSON.parse(this.layoutData);
        this.layoutService.onMinifyMenu('both');
        this.isChart = layout.isChart;
        this.isTable = layout.isTable;
      } else {
        this.isChart = false;
        this.isTable = true;
      }
      this.onClickShow();
    const obj = {
      saveLayOut: this.getGridOption,
      columnDefs: this.columnDefs,
      layoutData: this.layoutData,
      gridData: this.gridData,
      isTable: this.isTable,
      isChart: this.isChart
    }
    this.tabsComponent.openTab(
      this.layoutId,
      columnDataObj.reportObject.ReportID,
      this.layoutTitle,
      this.reportViewerGridTemplate,
      obj,
      true
    );
    
  //   setTimeout(() => {
  //     if (this.layoutId !== 0) {
  //       const layout = JSON.parse(this.layoutData);
  //       this.layoutService.onMinifyMenu('both');
  //       this.isChart = layout.isChart;
  //       this.isTable = layout.isTable;
  //     } else {
  //       this.isChart = false;
  //       this.isTable = true;
  //     }
  //     this.onClickShow();
  //   }, 10)
   }

  ontreeLayOutSelection(layoutId, ReportLayouts) {
    this.layoutId = Number(layoutId) || 0;
    this.layoutData = '';
    this.layoutTitle = '';
    if (this.layoutId > 0 && ReportLayouts) {
      ReportLayouts.filter(element => {
        if (element.ReportLayoutID == this.layoutId) {
          this.layoutData = element.LayoutJson;
          this.layoutTitle = element.LayoutName
        }
      });
    }
  }

  onChangeGridLayout(data) {
    const gridOptions = data.gridOptions;
    if (gridOptions && gridOptions.api) {
      const layoutJson = {
        FilterModel: gridOptions.api.getFilterModel(),
        SortModel: gridOptions.api.getSortModel(),
        ColumnState: gridOptions.columnApi.getColumnState(),
        reportViewerChartDetail: data.reportViewerChartDetails,
        isChart: this.isChart,
        isTable: this.isTable
      }
      this.tabsComponent.setReportLayoutJson(layoutJson);
    }
  }
  // onchartDetailData(chartDetail) {
  //   // alert();
  //   const tab = this.tabsComponent.getActiveTab();
  //   tab.layoutJson.reportViewerChartDetail = chartDetail;
  // }

  saveReportLayout() {
    let tab = this.tabsComponent.getActiveTab();
    tab.layoutJson.isChart = this.isChart;
    tab.layoutJson.isTable = this.isTable;
    this.layoutData = JSON.stringify(tab.layoutJson);
    this.reportViewerService.saveReportLayout(tab.layoutId,
      tab.reportId, tab.title, this.layoutData).then(result => {
        if (!result.data.HasError) {
          tab.layoutId = result.data.Result;
          this.layoutJsonObject = {
            ReportLayoutID: tab.layoutId,
            ReportID: tab.reportId,
            LayoutName: tab.title,
            LayoutJson: this.layoutData
          }
          this.tabsComponent.updateTabLayoutId(tab);
        };
      })
  }

  // onClickReportTypeViewer(state) {

  //   switch (state) {
  //     case 'table':
  //       this.isTable = !this.isTable;
  //       break;
  //     case 'chart':
  //       this.isChart = !this.isChart;
  //       break;
  //     default:
  //       break;
  //   }
  // }
  // addChart(chartType) {
  //   this.reportViewerChart = new ReportViewerChartDetailsModel();
  //   this.reportViewerChart.chartType = chartType;
  //   this.reportViewerChartDetails.splice(this.reportViewerChartDetails.length, -1, this.reportViewerChart)
  //   // switch (chartType) {
  //   //   case 'pie':
  //   //     break;
  //   //   case 'line':

  //   //     break;
  //   //   default:
  //   //     break;
  // }

  // deleteChart(index) {
  //   this.reportViewerChartDetails.splice(index, 1);
  // }

  onSelectSetting(chart) {
    chart.isSelectedSetting = !chart.isSelectedSetting;
  }
  onSelectLine(lineChartDetail) {

  }
  // const grapContain = {
  //   id: this.source.length, detail: []
  // };
  // this.source.splice(this.source.length, -1, grapContain)
}


  // generateGraphBasedOnDescription() {
  // const devide = this.description.length / this.source.length;
  // const remainder = this.description.length % this.source.length;

  // this.source.forEach((sr, sourceIndex) => {
  //   this.description.forEach((des, descriptionIndex) => {
  //      if() {

  //      }
  //   });
  // });

  //  }


