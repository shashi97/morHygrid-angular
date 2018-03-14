import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from '../../shared/layout/app-layouts/main-layout.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { InstallAddInComponent } from './install-add-in.component';

export const installAddRoutes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: InstallAddInComponent,
                data: { pageTitle: 'Install Add-In' }
            },
        ]

    }
];


export const routing = RouterModule.forChild(installAddRoutes)

