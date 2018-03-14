import './lib'

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/app.module';
import {LicenseManager} from "ag-grid-enterprise/main";
LicenseManager.setLicenseKey("HFA_Group_MultiApp_1Devs1_SaaS_17_June_2018__MTUyOTE5MDAwMDAwMA==d3973ff69ea724c112aaa995e140b389");
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
