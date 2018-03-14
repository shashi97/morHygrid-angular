import { Routes, RouterModule } from '@angular/router';

import { MainLayoutComponent } from '../../shared/layout/app-layouts/main-layout.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import {ReportAccessComponent} from './report-access.component'

export const reportAccessRoutes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: ReportAccessComponent,
                data: { pageTitle: 'Report Access' }
            },
        ]

    }
];


export const routing = RouterModule.forChild(reportAccessRoutes)

