import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {HeaderModule} from './header/header.module';
import {FooterComponent} from './footer/footer.component';
import {NavigationModule} from './navigation/navigation.module';
 import {RibbonComponent} from './ribbon/ribbon.component';
import {ToggleActiveDirective} from '../utils/toggle-active.directive';
import { MainLayoutComponent } from './app-layouts/main-layout.component';
//import { EmptyLayoutComponent } from './app-layouts/empty-layout.component';
import {RouterModule} from '@angular/router';
// import { AuthLayoutComponent } from './app-layouts/auth-layout.component';
import {TooltipModule, BsDropdownModule} from 'ngx-bootstrap';
 import { RouteBreadcrumbsComponent } from './ribbon/route-breadcrumbs.component';
import {UtilsModule} from '../utils/utils.module';

@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    NavigationModule,
    FormsModule,
    RouterModule,

    UtilsModule,


    TooltipModule,
    BsDropdownModule,
  ],
  declarations: [
    MainLayoutComponent,
    FooterComponent,
    RibbonComponent,
     RouteBreadcrumbsComponent
  ],
  exports:[
    HeaderModule,
    NavigationModule,
    FooterComponent,
    RibbonComponent
  ]
})
export class SmartadminLayoutModule{

}
