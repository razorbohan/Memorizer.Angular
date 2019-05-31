import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SwitcherComponent } from 'src/app/shared/components/switcher/switcher.component';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'memo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  @ViewChild(SwitcherComponent)
  private rememberMe: SwitcherComponent;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onSubmit() {
    this.authService.login({ ...this.loginForm.value, rememberMe: this.rememberMe.isChecked });
  }
}