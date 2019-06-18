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
} from '@angular/material';

@NgModule({
  declarations: [
	HomeComponent,
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
