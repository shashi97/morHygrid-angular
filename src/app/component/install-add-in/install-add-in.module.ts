import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './install-add-in.routing';
import { SharedComponentModule } from '../shared/shared-component.module';
import { InstallAddInService } from './shared/install-add-in.service'
import { InstallAddInComponent } from './install-add-in.component'

@NgModule({
    imports: [
        CommonModule,
        routing,
        SharedComponentModule,

    ],
    declarations: [
        InstallAddInComponent
    ],
    providers: [InstallAddInService]
})

export class InstallAddInModule { }
