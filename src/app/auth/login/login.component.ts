import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
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

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    const formData = this.loginForm.value;
    console.log(formData);
    console.log(this.rememberMe.isChecked);
  }
}