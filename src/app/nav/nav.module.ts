import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BsModalService } from 'ngx-bootstrap/modal';

import { FindModule } from '../shared/modals/find/find.module';
import { NavComponent } from './nav.component';
import { LoginNavComponent } from './login-nav/login-nav.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    NavComponent,
    LoginNavComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FindModule,
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
