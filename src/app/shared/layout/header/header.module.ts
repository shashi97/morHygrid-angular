import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { PopoverModule } from 'ngx-popover';

import { CollapseMenuComponent } from './collapse-menu/collapse-menu.component';
import { FullScreenComponent } from './full-screen/full-screen.component';


import { HeaderComponent } from './header.component';

import { UtilsModule } from '../../utils/utils.module';
import { UserModule } from '../../user/user.module';
import { BsDropdownModule } from 'ngx-bootstrap';
import { HeaderService } from './shared/header.service';

@NgModule({
  imports: [
    CommonModule,

    FormsModule,
    BsDropdownModule,

    UtilsModule, UserModule, PopoverModule,
  ],
  declarations: [
    FullScreenComponent,
    CollapseMenuComponent,
    HeaderComponent,
  ],
  providers: [HeaderService],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
