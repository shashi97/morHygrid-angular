import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LocalStorageService } from '../../../core/service';

@Injectable()
export class AuthGuard implements CanActivate {
    public returnUrl: string
    constructor(private router: Router,
        private localStorageService: LocalStorageService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const role = +localStorage.getItem('roleId')
        const currentUser = this.localStorageService.getCurrentUser();
        this.returnUrl = state.url.split('/')[1];
        const expectedRole = route.data.expectedRole.filter(rl => { return rl === role })
        if (this.returnUrl) {
            if ((expectedRole[0] === role) && (this.returnUrl === 'reportViewer' || role !== 4)) {
                this.localStorageService.setModuleName(this.returnUrl);
                return true;
            }
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }

}


