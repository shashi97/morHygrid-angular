import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './user-access.routing';
import { SharedComponentModule } from '../shared/shared-component.module';
import { UserAccessService } from './shared/user-access.service'
import { UserAccessComponent } from './user-access.component'

@NgModule({
    imports: [
        CommonModule,
        routing,
        SharedComponentModule,

    ],
    declarations: [
        UserAccessComponent
    ],
    providers: [UserAccessService]
})

export class UserAccessModule { }
