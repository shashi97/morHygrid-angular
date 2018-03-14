import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// import { HomeComponent } from '../../core/home/home.component';
import { ReportViewerComponent } from './report-viewer.component';
// import { HFADataBaseEntryComponent } from './hfadata-base-entry/hfadata-base-entry.component';
// import { MainLayoutComponent } from '../../shared/layout/app-layouts/main-layout.component';
import { AuthGuard } from '../shared/guards/auth.guard'

export const reportRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ReportViewerComponent,
        data: { pageTitle: 'Report Viewer' }
      }
    ]
  }
];

export const routing = RouterModule.forChild(reportRoutes)

