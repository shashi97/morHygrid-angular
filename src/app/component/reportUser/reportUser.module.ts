import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './reportUser.routing';
import { SharedComponentModule } from '../shared/shared-component.module';
import { ReportUserComponent } from './reportUser.component'
import { ReportUserService } from './shared/reportUser.service'
import { ReportUserEditComponent } from './reportUserEdit/reportUserEdit.component'

@NgModule({
  imports: [
    CommonModule,
    routing,
    SharedComponentModule

  ],
  declarations: [
    ReportUserComponent,
    ReportUserEditComponent
  ],
  exports: [
    SharedComponentModule
  ],
  providers: [
    ReportUserService
  ]
})

export class ReportUserModule { }
