import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FindModule } from '../shared/modals/find/find.module';
import { NavComponent } from './nav.component';
import { LoginNavComponent } from './login-nav/login-nav.component';
import { BsModalService } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    NavComponent,
    LoginNavComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FindModule
  ],
  exports: [
    FindModule,
    LoginNavComponent,
    NavComponent
  ],
  providers: [BsModalService]
})
export class NavModule { }
