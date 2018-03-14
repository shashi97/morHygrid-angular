import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ReportViewerComponent } from './report-viewer.component';
import { ReportViewerService } from './shared/report-viewer.service';
import { routing } from './report-viewer.routing';
import { SharedComponentModule } from '../shared/shared-component.module';
// import { HFADataBaseEntryComponent } from './hfadata-base-entry/hfadata-base-entry.component';
import { RouterModule } from '@angular/router';
import { UITabViewModule } from '../../shared/tab-view/tabview';
import { TabsComponent } from './../../shared/dynamic-tabs/tabs.component';
import { TabComponent } from './../../shared/dynamic-tabs/tab.component';
import { DynamicTabsDirective } from './../../shared/dynamic-tabs/dynamic-tabs.directive';
// import { HFADataService } from './shared/hfadatabase.service'
@NgModule({
  imports: [
    CommonModule,
    routing,
    SharedComponentModule,
    UITabViewModule,
    ReactiveFormsModule
  ],
  declarations: [
    ReportViewerComponent,
    TabsComponent,
    TabComponent,
    DynamicTabsDirective
    
    // HFADataBaseEntryComponent
  ],
  exports: [
    SharedComponentModule,
    UITabViewModule
    
  ],
  entryComponents: [TabComponent],
  providers: [
    ReportViewerService
  ]
})

export class ReportViewerModule { }
