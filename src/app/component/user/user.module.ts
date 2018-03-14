import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './user.routing';
import { SharedComponentModule } from '../shared/shared-component.module';
import { UserComponent } from './user.component';
import { UserService } from './shared/user.service';
import { UserEditComponent } from './user-edit/user-edit.component';

@NgModule({
    imports: [
        CommonModule,
        routing,
        SharedComponentModule,

    ],
    declarations: [
        UserEditComponent,
        UserComponent
    ],
    providers: [
        UserService
    ]
})

export class UserModule { }
