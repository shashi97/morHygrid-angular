import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ReportComponent } from './report.component';
import { routing } from './report.routing';
import { SharedComponentModule } from '../shared/shared-component.module';
import { ReportService } from './shared/report.service';
import { ReportEntryComponent } from './reportEntry/reportEntry.component';
import { DndModule } from 'ng2-dnd';
@NgModule({
  imports: [
    CommonModule,
    routing,
    SharedComponentModule,
    DndModule.forRoot()
  ],
  declarations: [
    ReportComponent,
    ReportEntryComponent
  ],
  providers: [ReportService]
})

export class ReportModule { }
