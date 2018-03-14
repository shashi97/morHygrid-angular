import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../../core/home/home.component';
import { ReportUserComponent } from './reportUser.component';
import { MainLayoutComponent } from '../../shared/layout/app-layouts/main-layout.component';
import { AuthGuard } from '../shared/guards/auth.guard'
import { ReportUserEditComponent } from './reportUserEdit/reportUserEdit.component'


export const reportRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ReportUserComponent,
        data: { pageTitle: 'Reports Users' }
      },
      {
        path: ':UserID/:totalDb',
        component: ReportUserEditComponent
      }
    ]
  }
];

export const routing = RouterModule.forChild(reportRoutes)

