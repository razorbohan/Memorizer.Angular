import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'memo-login-nav',
  templateUrl: './login-nav.component.html',
  styleUrls: ['./login-nav.component.scss']
})
export class LoginNavComponent implements OnInit {

  username: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      let { username } = JSON.parse(this.authService.isLoggedIn());
      this.username = username;
    }
  }

  logout() {
    this.authService.logout();
    this.username = '';
  }
}