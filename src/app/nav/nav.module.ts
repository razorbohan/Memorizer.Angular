import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BsModalService } from 'ngx-bootstrap/modal';

import { FindModule } from '../shared/modals/find/find.module';
import { NavComponent } from './nav.component';
import { LoginNavComponent } from './login-nav/login-nav.component';
import { SharedModule } from '../shared/shared.module';
import {
  NavbarModule,
  WavesModule,
  ButtonsModule,
  MDBBootstrapModule
} from 'angular-bootstrap-md';


@NgModule({
  declarations: [
	NavComponent,
	LoginNavComponent
  ],
  imports: [
	CommonModule,
	RouterModule,
	FindModule,
	NavbarModule,
	WavesModule,
	ButtonsModule,
	MDBBootstrapModule.forRoot(),
	SharedModule
  ],
  exports: [
	FindModule,
	LoginNavComponent,
	NavComponent
  ],
  providers: [BsModalService]
})
export class NavModule { }
