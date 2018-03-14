import { Routes, RouterModule } from '@angular/router';

import { MainLayoutComponent } from '../../shared/layout/app-layouts/main-layout.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import {UserAccessComponent} from './user-access.component'

export const userAccessRoutes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: UserAccessComponent,
                data: { pageTitle: 'User Access' }
            },
            // {
            //     path: 'Entry/:CompanyId/:totalDB',
            //     component: CompanyEditComponent
            // },
            // {
            //     path: 'AddNew/:CompanyId/:totalDB',
            //     component: CompanyEditComponent
            //   }

        ]

    }
];


export const routing = RouterModule.forChild(userAccessRoutes)

