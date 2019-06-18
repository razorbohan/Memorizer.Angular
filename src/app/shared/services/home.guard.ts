import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class HomeGuard implements CanActivate {

  constructor(private authService: AuthService,
				          private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
	if (this.authService.isLoggedIn) {
		return true;
	} else {
		this.router.navigate(['Auth', 'Login']);
		return false;
	}
  }
}
