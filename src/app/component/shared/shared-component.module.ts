import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavBarModule } from './navBar/navBar.module';
import { TableHeaderModule } from './tableHeader/tableHeader.module'
import { ModalPopupModule } from './modalPopup/modalPopup.module'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DpDatePickerModule } from 'ng2-date-picker';
import { AgGridModule } from 'ag-grid-angular';
import { DragulaModule } from 'ng2-dragula';
import { RichGridComponent } from '../../core/ag-data-table/rich-grid.component';
import { ChartComponent } from '../../component/report-viewer/chart/chart.component';
import { DateComponent } from '../../core/ag-data-table/date-component/date.component';
import { HeaderComponent } from '../../core/ag-data-table/header-component/header.component';
import { HeaderGroupComponent } from '../../core/ag-data-table/header-group-component/header-group.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { TreeTableComponent } from '../report-viewer/tree-table/tree-table.component'
import { UITabViewModule } from '../../shared/tab-view/tabview';
import { FocusDirective } from './directives/focus.directive';

import {
  DataTableModule,
  SharedModule,
  PanelMenuModule,
  CheckboxModule,
  TabMenuModule,
  MenuModule,
  RadioButtonModule,
  DropdownModule,
  GrowlModule,
  AutoCompleteModule,
  PanelModule,
  TreeModule,
  // CalendarModule,
  DialogModule,
  ConfirmDialogModule,
  ConfirmationService, MultiSelectModule,
  TooltipModule

} from 'primeng/primeng';
import { CalendarModule } from '../../shared/calendar/calendar';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { CodemirrorModule } from 'ng2-codemirror';

/* shared service for total records */
import { TotalRecordService } from './service/total-record.service';
import { ManageModule } from './manage-component/manage-component.module';

import { MasterService } from './service/master.service';

import { ShContextMenuModule } from 'ng2-right-click-menu';



@NgModule({
  imports: [
    CommonModule,
    DropdownModule,
    DataTableModule,
    GrowlModule,
    SharedModule,
    FormsModule,
    NavBarModule,
    TableHeaderModule,
    ModalPopupModule,
    PanelMenuModule,
    AutoCompleteModule,
    DialogModule,
    TabMenuModule,
    MenuModule,
    PanelModule,
    CalendarModule,
    CheckboxModule,
    NgbModule.forRoot(),
    DpDatePickerModule,
    RadioButtonModule,

    AgGridModule.withComponents([DateComponent,
      HeaderComponent,
      HeaderGroupComponent]),

    ManageModule,
    Ng2AutoCompleteModule,
    CodemirrorModule,

    ConfirmDialogModule,

    TreeModule,
    ShContextMenuModule,
    DragulaModule,
    NgxChartsModule,
    MultiSelectModule,
    TooltipModule

  ],

  declarations: [
    RichGridComponent,
    DateComponent,
    HeaderComponent,
    HeaderGroupComponent,
    TreeTableComponent,
    FocusDirective,
    ChartComponent

  ],

  providers: [
    TotalRecordService,
    MasterService,
    ConfirmationService

  ],
  exports: [
    DropdownModule,
    DataTableModule,
    GrowlModule,
    SharedModule,
    FormsModule,
    NavBarModule,
    TableHeaderModule,
    ModalPopupModule,
    PanelMenuModule,
    AutoCompleteModule,
    DialogModule,
    TabMenuModule,
    PanelModule,
    MenuModule,
    AgGridModule,
    RichGridComponent,
    DateComponent,
    HeaderComponent,
    ManageModule,
    Ng2AutoCompleteModule,
    CodemirrorModule,
    CalendarModule,
    ConfirmDialogModule,
    TreeModule,
    TreeTableComponent,
    NgbModule,
    DpDatePickerModule,
    RadioButtonModule,
    ShContextMenuModule,
    FocusDirective,
    DragulaModule,
    NgxChartsModule,
    ChartComponent,
    MultiSelectModule
  ],
  entryComponents: [TreeTableComponent],
  bootstrap: [RichGridComponent]




})
export class SharedComponentModule { }
