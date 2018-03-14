import { Routes, RouterModule } from '@angular/router';

import { MainLayoutComponent } from '../../shared/layout/app-layouts/main-layout.component';
import { ReportComponent } from './report.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { ReportEntryComponent } from './reportEntry/reportEntry.component'

export const reportRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ReportComponent,
        data: { pageTitle: 'Report' }
      },
      {
        path: 'Entry/:ReportID/:totalDB',
        component: ReportEntryComponent
      },
      {
        path: 'AddNew/:totalDB',
        component: ReportEntryComponent
      }
    ]
  }
];

export const routing = RouterModule.forChild(reportRoutes)

