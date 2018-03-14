import {
    Component, OnInit, ViewChild, ElementRef, Input, OnChanges, DoCheck, AfterViewInit
    , EventEmitter, Output, ChangeDetectorRef
} from '@angular/core';
import { TreeNode } from 'primeng/primeng';
import { DragulaService } from 'ng2-dragula';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ReportViewerService } from '../shared/report-viewer.service';
import { TreeModel, ReportObject, ReportViewerChartDetailsModel, MultipleModel } from '../tree-table/shared/tree-table.model';
import { LocalStorageService } from '../../../core/service/local-storage.service';
import { TreeTableComponent } from '../../report-viewer/tree-table/tree-table.component';
import { TabConfig } from '../../../shared/tab-view/TabConfig';
import { RichGridComponent } from '../../../core/ag-data-table/rich-grid.component'
import { TabsComponent } from '../../../shared/dynamic-tabs/tabs.component';
import { timeout } from 'rxjs/operators/timeout';
import chartGroups from './chartType';
declare const $;
@Component({
    selector: 'app-report-viewer-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.css']
})

export class ChartComponent implements OnInit, OnChanges, DoCheck, AfterViewInit {
    title = 'app';
    isSettingSelected = false;
    @Input() isFullScreen = false;
    @Input() public rowData: any[];
    @Input() columnDefs: any[];

    @Input() reportViewerChartDetails: Array<ReportViewerChartDetailsModel> = [];
    // _reportViewerChartDetails: Array<ReportViewerChartDetailsModel>= []
    // @Input() get reportViewerChartDetails(): Array<ReportViewerChartDetailsModel> {

    //     return this._reportViewerChartDetails;
    // }
    // set reportViewerChartDetails(theBar: Array<ReportViewerChartDetailsModel>) {
    //     this._reportViewerChartDetails = theBar;
    // }
    @Input() reportToggle = false;
    @Output() chartJson: EventEmitter<any> = new EventEmitter();
    public reportViewerChart: ReportViewerChartDetailsModel = new ReportViewerChartDetailsModel();
    public items: Array<any> = [];
    public columnNames: Array<any> = [];
    breadcumUrl: Array<any>;
    activeItem: Array<any>;
    tabItems: Array<any>;
    columnValue: Array<any> = [];
    multipleValue: MultipleModel = new MultipleModel();
    chartGroups: any[];
    single = [
        {
            'name': 'Germany',
            'value': 8940000
        },
        {
            'name': 'USA',
            'value': 5000000
        },
        {
            'name': 'USA',
            'value': 5000000
        }
    ];

    colorScheme = {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };

    // view: any[] = [700, 300];

    // options
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = true;
    showXAxisLabel = true;
    xAxisLabel = '';
    showYAxisLabel = true;
    explodeSlices = false;
    showLabels = true;
    doughnut = false;
    tooltipDisabled = false;
    yAxisLabel = '';
    legendTitle = 'Legend1';



    multi: any[] = [
        {
            name: 'Cyan',
            series: [
                {
                    name: 5,
                    value: 2650
                },
                {
                    name: 10,
                    value: 2800
                },
                {
                    name: 15,
                    value: 2000
                }
            ]
        },
        {
            name: 'Yellow',
            series: [
                {
                    name: 5,
                    value: 2500
                },
                {
                    name: 10,
                    value: 3100
                },
                {
                    name: 15,
                    value: 2350
                }
            ]
        }
    ];

    view: any[] = [750, 300];

    // options
    // showXAxis = true;
    // showYAxis = true;
    // gradient = false;
    // showLegend = true;
    // showXAxisLabel = true;
    // xAxisLabel = 'Number';
    // showYAxisLabel = true;
    // yAxisLabel = 'Color Value';
    // timeline = true;

    // colorScheme = {
    //     domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    // };

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
    // source: any = [
    //     {
    //         id: 1, detail: [{ description: 'You can move these elements between these two containers' },
    //         { description: 'Moving them anywhere else isnt quite possible' }]
    //     },
    //     {
    //         id: 2, detail: [{
    //             description: 'Theres also the possibility of moving elements around' +
    //             'in the same container, changing their position'
    //         },
    //         { description: 'You can move these elements between these two containers' }]
    //     },
    //     {
    //         id: 3, detail: [{ description: 'You can move these elements between these two containers' },
    //         { description: 'Moving them anywhere else isnt quite possible' }]
    //     }
    // ];
    moduleName = 'Report Viewer';
    layoutTitle: string = '';
    selectedReportObject;
    layoutId: number = 0;
    gridData: Array<any> = [];
    files;
    activeTabReportId: number;
    layoutJsonObject: {

    }
    layoutData
    getGridOption: boolean = false;
    @Input() isChart = false;
    @Input() isTable = true;
    isBoth = false;
    reportViewData: Array<TreeModel> = [];

    @ViewChild('reportViewerGrid') reportViewerGridTemplate;
    @ViewChild(RichGridComponent) RichGridComponent;
    @ViewChild(TabsComponent) tabsComponent;
    @ViewChild('reportViewer') reportViewer: ElementRef;
    @ViewChild('layout') layout: ElementRef;
    tabs: Array<TabConfig> =
        [

            // { component: RichGridComponent, active: true, data: { name: 'Sheet1', selected: true, isEditable: false } },

        ];
    constructor(
        private router: Router,
        public route: ActivatedRoute,
        public reportViewerService: ReportViewerService,
        public localStorageService: LocalStorageService,
        private cdr: ChangeDetectorRef,
        private dragulaService: DragulaService
    ) {

        Object.assign(this, {
            chartGroups
        });
        // dragulaService.drop.subscribe((value) => {
        //     this.onDropModel(value);
        // })
        // Object.assign(this, {single, multi
        console.log('title', this.breadcumUrl);
    }
    // private onDropModel(args) {
    //     console.log(args);
    //     // Here, this.playlists contains the elements reordered
    // }
    ngOnChanges() {
        if (this.columnNames.length === 0) {
            this.columnDefs.map(res => {
                if (res.DataType === 'Int64'
                    || res.DataType === 'Int32'
                    || res.DataType === 'Int16'
                    || res.DataType === 'Decimal'
                    || res.DataType === 'Double'
                    || res.DataType === 'Numeric'
                    || res.DataType === 'Float'
                    || res.DataType === 'Real') {
                    this.columnValue.splice(this.columnValue.length, -1, Object.assign({}, { label: res.field, value: res.field }))
                }
                this.columnNames.splice(this.columnNames.length, -1, Object.assign({}, { label: res.field, value: res.field }))
            })
        }
        this.cdr.detectChanges();
        this.setWidth();
    }
    ngDoCheck() {
        // alert('check');

        this.cdr.detectChanges();
    }
    ngAfterViewInit() {


        this.cdr.detectChanges();
    }
    setWidth() {
        if (this.isChart && this.isTable) {
            this.view = [530, 300];
        } else {
            this.view = [750, 300];
        }

        if (this.isChart && this.isTable && !this.reportToggle) {
            this.view = [350, 300];
        }
        if (this.isChart && !this.isTable && this.reportToggle) {
            this.view = [1156, 300];
        }
    }
    ngOnInit() {


        // this.generateGraphBasedOnDescription();
        // $(document).ready(function () {
        //   $('#hide').click(function () {
        //     $('content').hide();
        //   });
        //   $('#show').click(function () {
        //     $('content').show();
        //   });
        // });
    }



    // public saveReportTab(reportTabID, reportTabName) {
    //     const userId = this.localStorageService.getCurrentUserDetail();
    //     this.reportViewerService.saveReportTab(reportTabID, reportTabName, userId).then(result => {
    //         if (result.data.HasError) {

    //         };
    //     })
    // }


    addChart(chartType) {

        this.setWidth();
        this.reportViewerChart.chartType = chartType;

        this.columnNames.map(res => {

            this.reportViewerChart.columnNames.push(Object.assign({}, res));
            // Object.assign({}, res)
        });
        this.columnValue.map(res => {

            this.reportViewerChart.columnValue.push(Object.assign({}, res));
            // Object.assign({}, res)
        });

        // this.chartGroups.map(chart => {
        //     if (chart.type === chartType) {
        //         chart.charts.map(ch => {
        //             this.reportViewerChart.chartOptions.push(Object.assign({}, ch))
        //         })
        //         this.reportViewerChart.selectedChartType = chart.charts[0].value
        //     }
        // })
        if (!this.reportViewerChartDetails) {
            this.reportViewerChartDetails = [];
        }
        this.reportViewerChartDetails.splice(this.reportViewerChartDetails.length, -1, this.reportViewerChart)
        this.reportViewerChart = new ReportViewerChartDetailsModel();
        this.chartJson.emit(this.reportViewerChartDetails);


    }

    deleteChart(index) {
        this.reportViewerChartDetails.splice(index, 1);
    }

    onSelectSetting(chart, event) {
        // this.columnDefs = Object.assign(this.columnDefs, {});
        chart.isSelectedSetting = !chart.isSelectedSetting;
    }
    onSelectLine(lineChartDetail) {

    }
    onSubmitChartSetting(chart) {
        chart.single = [];
        chart.multiple = [];
        if (chart.chartType === 'Pie') {
            this.rowData.map(row => {

                chart.single.push({
                    name: row[chart.selectedName] ? row[chart.selectedName] : '',
                    value: row[chart.selectedValue] ? row[chart.selectedValue] : 0
                })

            })
        } else if (chart.chartType === 'Line') {
            // chart.selectedBarName.map(name => {
            //     this.multipleValue.name = name;
            //     this.multipleValue.series = [];
            //     chart.multiple.splice(chart.multiple.length, -1, Object.assign({}, this.multipleValue));
            //     // chart.selectedBarValue.map(columnDef => {
            //     this.rowData.map(row => {
            //         Object.keys(row).map(rowDetail => {
            //             if (chart.selectedValue === rowDetail) {
            //                 chart.multiple[chart.multiple.length - 1].series.splice(
            //                     chart.multiple[chart.multiple.length - 1].series.length - 1, -1,
            //                     { name: row[name] ? row[name] : '', value: row[chart.selectedValue] ? row[chart.selectedValue] : 0 })
            //             }
            //         })
            //     })
            // })
            chart.selectedBarName.map(barName => {


                chart.selectedBarValue.map(column => {
                    this.multipleValue.name = column;
                    this.multipleValue.series = [];
                    chart.multiple.splice(chart.multiple.length, -1, Object.assign({}, this.multipleValue));
                    this.rowData.map(row => {
                        Object.keys(row).map(rowDetail => {
                            if (column === rowDetail) {
                                chart.multiple[chart.multiple.length - 1].series.splice(
                                    chart.multiple[chart.multiple.length - 1].series.length - 1, -1,
                                    {
                                        name: row[barName] ? row[barName] : '',
                                        value: row[column] ? row[column] : 0
                                    })
                            }
                        })
                    })
                })
            })


            //})

        } else if (chart.chartType === 'Bar') {



            chart.selectedBarValue.map(column => {
                this.multipleValue.name = column;
                this.multipleValue.series = [];
                chart.multiple.splice(chart.multiple.length, -1, Object.assign({}, this.multipleValue));
                this.rowData.map(row => {
                    Object.keys(row).map(rowDetail => {
                        if (column === rowDetail) {
                            chart.multiple[chart.multiple.length - 1].series.splice(
                                chart.multiple[chart.multiple.length - 1].series.length - 1, -1,
                                {
                                    name: row[chart.selectedName] ? row[chart.selectedName] : '',
                                    value: row[column] ? row[column] : 0
                                })
                        }
                    })
                })
            })

        }
        this.chartJson.emit(this.reportViewerChartDetails);
    }
    // onAddColumn(chart) {
    //     chart.barchartSettings.splice(chart.barchartSettings.length, -1,
    //         { selectedBrChartColumnsValue: '', selectedBarChartCommonValue: '' });
    // }
    // onDeleteColumn(chart, index) {
    //     chart.barchartSettings.splice(index, 1);
    // }
}
