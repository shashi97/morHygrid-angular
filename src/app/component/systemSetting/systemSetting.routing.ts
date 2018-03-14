import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../../core/home/home.component';
import { SystemSettingComponent } from './systemSetting.component'
import { MainLayoutComponent } from '../../shared/layout/app-layouts/main-layout.component';
import { AuthGuard } from '../shared/guards/auth.guard'

export const reportRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: SystemSettingComponent,
        data: { pageTitle: 'System Setting' }
      }
    ]
  }
];

export const routing = RouterModule.forChild(reportRoutes)

