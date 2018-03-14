import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HFADataBaseComponent } from './hfaDatabase.component';
import { routing } from './hfaDatabase.routing';
import { SharedComponentModule } from '../shared/shared-component.module';
import { HFADataBaseEntryComponent } from './hfadata-base-entry/hfadata-base-entry.component';
import { RouterModule } from '@angular/router';
import { HFADataService } from './shared/hfadatabase.service'
@NgModule({
  imports: [
    CommonModule,
    routing,
    SharedComponentModule

  ],
  declarations: [
    HFADataBaseComponent,
    HFADataBaseEntryComponent
  ],
  exports: [
    SharedComponentModule
  ],
  providers: [
    HFADataService
  ]
})

export class HFADataBaseModule { }
