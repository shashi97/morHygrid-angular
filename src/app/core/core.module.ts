import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';


import { LayoutService } from '../shared/layout/layout.service'
import { UserService } from '../shared/user/user.service'
import { SoundService } from '../shared/sound/sound.service';
import { ApiUrl, RouteService } from '../shared/index';
import { LoaderService } from './loader/loader.service';
import { ErrorService } from './error/error.service';
import { ErrorComponent } from './error/error.component';

import { TabsModule, ProgressbarModule, TooltipModule, BsDropdownModule, AlertModule } from 'ngx-bootstrap';
import {
  AuthenticationService,
  httpFactory,
  LocalStorageService
} from './service';

@NgModule({
  imports: [
    CommonModule,
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    AlertModule.forRoot(),
    TabsModule.forRoot(),
    HttpModule
  ],
  exports: [
    HttpClientModule,
    ErrorComponent
  ],
  declarations: [
    ErrorComponent
  ],
  providers: [
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions, ApiUrl, Router, LoaderService, ErrorService, LocalStorageService]
    },
    LayoutService,
    UserService,
    SoundService,
    AuthenticationService,
    LocalStorageService,
    LoaderService,
    ErrorService
  ]
})
export class CoreModule {

}
