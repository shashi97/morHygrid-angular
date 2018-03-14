import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from '../../shared/layout/app-layouts/main-layout.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { UserComponent } from './user.component';
import { UserEditComponent } from './user-edit/user-edit.component';

export const applicationRoutes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: UserComponent,
                data: { pageTitle: 'Users' }
            },
            {
                path: 'Entry/:UserId/:totalDB',
                component: UserEditComponent
            },
            {
                path: 'AddNew/:UserId/:totalDB',
                component: UserEditComponent
              }

        ]

    }
];


export const routing = RouterModule.forChild(applicationRoutes)

