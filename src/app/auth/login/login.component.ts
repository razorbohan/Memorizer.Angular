import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { SwitcherComponent } from 'src/app/shared/components/switcher/switcher.component';

@Component({
  selector: 'memo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  @ViewChild(SwitcherComponent)
  private rememberMe: SwitcherComponent;

  constructor() { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit() {
    const formData = this.loginForm.value;
    console.log(formData);
    console.log(this.rememberMe.isChecked);
  }
}