import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './shared/layout/app-layouts/main-layout.component';
// import {AuthLayoutComponent} from './shared/layout/app-layouts/auth-layout.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    data: { pageTitle: 'Home' },
    children: [
      {
        path: '', redirectTo: 'hfaDatabase', pathMatch: 'full'
      },
      {
        path: 'hfaDatabase',
        data: {
          expectedRole: [1, 2]
        },
        loadChildren: 'app/component/hfaDatabase/hfaDatabase.module#HFADataBaseModule'
      },
      {
        path: 'report',
        data: {
          expectedRole: [1, 2, 3]
        },
        loadChildren: 'app/component/report/report.module#ReportModule'
      },
      {
        path: 'serviceRepUser',
        data: {
          expectedRole: [1, 2, 3]
        },
        loadChildren: 'app/component/reportUser/reportUser.module#ReportUserModule'
      },
      {
        path: 'category',
        data: {
          expectedRole: [1, 2, 3]
        },
        loadChildren: 'app/component/category/category.module#CategoryModule'
      },
      {
        path: 'colFormatting',
        data: {
          expectedRole: [1, 2]
        },
        loadChildren: 'app/component/systemSetting/systemSetting.module#SystemSettingModule'
      },
      {
        path: 'company',
        data: {
          expectedRole: [1]
        },
        loadChildren: 'app/component/company/company.module#CompanyModule'

      },
      {
        path: 'reportViewer',
        data: {
          expectedRole: [1, 2, 3, 4]
        },
        loadChildren: 'app/component/report-viewer/report-viewer.module#ReportViewerModule'
      },
      {
        path: 'user',
        data: {
          expectedRole: [1, 2]
        },
        loadChildren: 'app/component/user/user.module#UserModule'
      }
      // ,
      // {
      //   path: 'useraccess',
      //   data: {
      //     expectedRole: [1, 2]
      //   },
      //   loadChildren: 'app/component/user-access/user-access.module#UserAccessModule'
      // },
      // {
      //   path: 'reportaccess',
      //   data: {
      //     expectedRole: [1, 2]
      //   },
      //   loadChildren: 'app/component/report-access/report-access.module#ReportAccessModule'
      // },
      // {
      //   path: 'installs',
      //   data: {
      //     expectedRole: [1, 2]
      //   },
      //   loadChildren: 'app/component/install-add-in/install-add-in.module#InstallAddInModule'
      // }
    ]
  },

  { path: 'auth', loadChildren: 'app/auth/auth.module#AuthModule' },

  { path: '**', redirectTo: 'miscellaneous/error404' }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
