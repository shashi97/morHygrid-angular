import { Routes, RouterModule } from '@angular/router';

import { MainLayoutComponent } from '../../shared/layout/app-layouts/main-layout.component';
import { CompanyComponent } from './company.component';
import { AuthGuard } from '../shared/guards/auth.guard'
import {CompanyEditComponent} from './company-edit/company-edit.component'

export const comapnyRoutes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: CompanyComponent,
                data: { pageTitle: 'Companies' }
            },
            {
                path: 'Entry/:CompanyId/:totalDB',
                component: CompanyEditComponent
            },
            {
                path: 'AddNew/:CompanyId/:totalDB',
                component: CompanyEditComponent
              }

        ]

    }
];


export const routing = RouterModule.forChild(comapnyRoutes)

