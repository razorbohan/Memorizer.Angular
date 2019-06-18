import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(private authService: AuthService,
				         private router: Router) { }

	canActivate(): boolean {
		if (!this.authService.isLoggedIn) {
			return true;
		} else {
			this.router.navigate(['Home']);
			return false;
		}
	}
}
