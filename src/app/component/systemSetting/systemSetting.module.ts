import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './systemSetting.routing';
import { SharedComponentModule } from '../shared/shared-component.module';
import { SystemSettingComponent } from './systemSetting.component';
import { SystemSettingService } from './shared/systemSetting.service';
@NgModule({
  imports: [
    CommonModule,
    routing,
    SharedComponentModule

  ],
  declarations: [
    SystemSettingComponent
  ],
  exports: [
    SharedComponentModule
  ],
  providers: [
    SystemSettingService
  ]
})

export class SystemSettingModule { }
