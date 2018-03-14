import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './report-access.routing';
import { SharedComponentModule } from '../shared/shared-component.module';
import { ReportAccessService } from './shared/report-access.service'
import { ReportAccessComponent } from './report-access.component'

@NgModule({
    imports: [
        CommonModule,
        routing,
        SharedComponentModule,

    ],
    declarations: [
        ReportAccessComponent
    ],
    providers: [ReportAccessService]
})

export class ReportAccessModule { }
