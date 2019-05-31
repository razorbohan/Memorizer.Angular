import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface ApiResponse {
  success: boolean;
  error: string;
  body: any;
}

@Injectable()
export class AuthService {

  baseUrl = 'https://localhost:44367/api';

  constructor(private http: HttpClient,
    private router: Router) { }

  isLoggedIn() {
    let token = localStorage.getItem('jwt_auth');
    return token;
  }

  async login(data: any) {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          let response = await this.http.post<ApiResponse>(`${this.baseUrl}/Authenticate`, data).toPromise();
          this.handleResponse(response);
          resolve();
        } catch (error) {
          reject(error);
        }
      }, 1000);
    });
  }

  async register(data: any) {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          let response = await this.http.post<ApiResponse>(`${this.baseUrl}/Register`, data).toPromise();
          this.handleResponse(response);
          resolve();
        } catch (error) {
          reject(error);
        }
      }, 1000);
    });
  }

  logout() {
    localStorage.removeItem('jwt_auth');
    this.router.navigate(['Auth', 'Login']);
  }

  private handleResponse(response: ApiResponse) {
    console.log(response);

    if (!response.error && response.body) {
      localStorage.setItem('jwt_auth', JSON.stringify(response.body));
      this.router.navigate(['Home']);
    }
    else throw new Error(response.error);
  }
}

