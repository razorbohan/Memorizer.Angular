import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatDatepickerModule,
  MatSelectModule,
  MatButtonModule,
} from "@angular/material";
import { EditableComponent } from '../shared/modals/find/editable/editable.component';
import { ViewModeDirective } from '../shared/modals/find/editable/view-mode.directive';
import { EditModeDirective } from '../shared/modals/find/editable/edit-mode.directive';
import { EditableOnEnterDirective } from '../shared/modals/find/editable/edit-on-enter.directive';


@NgModule({
  declarations: [
    HomeComponent,

    // EditableComponent,
    // ViewModeDirective,
    // EditModeDirective,
    // EditableOnEnterDirective
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
  ]
})
export class HomeModule { }
