import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import {
  ModalModule, ButtonsModule, TooltipModule, BsDropdownModule, ProgressbarModule, AlertModule, TabsModule,
  AccordionModule, CarouselModule
} from 'ngx-bootstrap'

import { PopoverModule } from 'ngx-popover';

import { SmartadminLayoutModule } from './layout'

import { UserService } from './user'

import { UserModule } from './user/user.module';

import { SmartadminWidgetsModule } from './widgets/smartadmin-widgets.module';

import { UtilsModule } from './utils/utils.module';
// import { InlineGraphsModule } from './graphs/inline/inline-graphs.module';
import { SmartadminFormsLiteModule } from './forms/smartadmin-forms-lite.module';
import { SmartProgressbarModule } from './ui/smart-progressbar/smart-progressbar.module';


@NgModule({
  imports: [
    CommonModule, FormsModule, RouterModule
  ],
  declarations: [

  ],
  exports: [
    CommonModule, FormsModule, RouterModule,

    ModalModule,
    ButtonsModule,

    AlertModule,
    TabsModule,
    TooltipModule,
    BsDropdownModule,
    ProgressbarModule,


    PopoverModule,

    SmartadminLayoutModule,

    UtilsModule,


    SmartadminFormsLiteModule,

    SmartProgressbarModule,

    // InlineGraphsModule,

    SmartadminWidgetsModule
  ]
})
export class SmartadminModule { }
