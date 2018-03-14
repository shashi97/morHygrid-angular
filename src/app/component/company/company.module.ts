import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyComponent } from './company.component';
import { routing } from './company.routing';
import { SharedComponentModule } from '../shared/shared-component.module';
import { CompanyService } from './shared/company.service';
import {CompanyEditComponent} from './company-edit/company-edit.component'

@NgModule({
  imports: [
    CommonModule,
    routing,
    SharedComponentModule,

  ],
  declarations: [
    CompanyComponent,
    CompanyEditComponent
  ],
  providers: [CompanyService]
})

export class CompanyModule { }
