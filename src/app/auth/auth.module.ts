import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [
	AuthComponent,
	LoginComponent,
	RegisterComponent
  ],
  imports: [
	CommonModule,
	AuthRoutingModule,
	SharedModule,
	ReactiveFormsModule,
	MaterialModule
  ]
})
export class AuthModule { }
