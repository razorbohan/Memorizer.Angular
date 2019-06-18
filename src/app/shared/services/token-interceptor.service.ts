import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
	if (this.authService.isLoggedIn) {
		const auth = this.authService.loginDataSubject.getValue();
		request = request.clone({
		setHeaders: {
			Authorization: `Bearer ${auth.token}`
		}
		});
	}
	return next.handle(request);
  }
}
