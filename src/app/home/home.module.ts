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

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
	faTrashAlt,
	faExchangeAlt,
	faSave,
} from '@fortawesome/free-solid-svg-icons';

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
		FontAwesomeModule
	]
})
export class HomeModule {
	constructor() {
		library.add(
			faTrashAlt,
			faExchangeAlt,
			faSave
		);
	}
}
