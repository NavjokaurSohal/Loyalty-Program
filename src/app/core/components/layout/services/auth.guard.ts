import { Injectable } from "@angular/core";
import { CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authService: AuthService,
    ) { 
    }

    canActivate(route: any, state: RouterStateSnapshot): boolean {
        const token = this.authService.getToken();
        if (!token) {
            this.router.navigate(['/signin']);
            return false;
        }

        return true;
    }

}