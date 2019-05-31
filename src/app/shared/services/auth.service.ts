import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface ApiResponse{
  success: boolean;
  error: string;
  body: any;
}

@Injectable()
export class AuthService {

  baseUrl = 'https://localhost:44367/api';
  token: any;

  constructor(private http: HttpClient,
    private router: Router) { }

  isLoggedIn() {
    let token = localStorage.getItem('jwt_token');
    return token;
  }

  async login(data: any) {
    let response = await this.http.post<ApiResponse>(`${this.baseUrl}/Authenticate`, data).toPromise();
    console.log(response);
    
    if (!response.error && response.body)
    {
      localStorage.setItem('jwt_token', response.body);
      this.router.navigate(['Home']);
    }
  }

  async register(data: any) {
    let response = await this.http.post<ApiResponse>(`${this.baseUrl}/Auth/Register`, data).toPromise();
    if (!response.error && response.body)
      localStorage.setItem('jwt_token', response.body);
  }

  logout() {
    localStorage.removeItem('jwt_token');
  }
}

