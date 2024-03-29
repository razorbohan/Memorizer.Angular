import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { environment } from '../../../environments/environment';

interface ApiResponse {
	success: boolean;
	error: string;
	body: any;
}

@Injectable()
export class AuthService {

	baseUrl = environment.baseUrl;
	isLoggedIn: boolean;
	loginDataSubject: BehaviorSubject<{ username: string, token: string }>;

	constructor(
		private http: HttpClient,
		private router: Router) {
		this.loginDataSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('jwt_auth')));
		this.togleLoggedIn();
	}

	async login(data: any) {
		const response = await this.http.post<ApiResponse>(`${this.baseUrl}/Authenticate`, data).toPromise();
		this.handleResponse(response);
	}

	async register(data: any) {
		const response = await this.http.post<ApiResponse>(`${this.baseUrl}/Register`, data).toPromise();
		this.handleResponse(response);
	}

	async checkEmail(email: string): Promise<boolean> {
		const response = await this.http.get<ApiResponse>(`${this.baseUrl}/CheckEmail/${email}`).toPromise();
		return response.success;
	}

	logout() {
		localStorage.removeItem('jwt_auth');
		this.togleLoggedIn();
		this.router.navigate(['Auth', 'Login']);
	}

	private handleResponse(response: ApiResponse) {
		if (!response.error && response.body) {
			localStorage.setItem('jwt_auth', JSON.stringify(response.body));
			this.togleLoggedIn();
			this.router.navigate(['Home']);
		} else { throw new Error(response.error); }
	}

	private togleLoggedIn() {
		this.isLoggedIn = !!localStorage.getItem('jwt_auth');
		this.loginDataSubject.next(JSON.parse(localStorage.getItem('jwt_auth')));
	}
}
