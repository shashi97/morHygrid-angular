import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import {SharedComponentModule} from '../../component/shared/shared-component.module';

import { AuthService } from '../auth.service';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedComponentModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule {



}
