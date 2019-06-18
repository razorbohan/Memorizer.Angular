import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FindMemoComponent } from './find.component';
import { BigLoaderComponent } from '../../components/big-loader/big-loader.component';

import { EditableComponent } from './editable/editable.component';
import { ViewModeDirective } from './editable/view-mode.directive';
import { EditModeDirective } from './editable/edit-mode.directive';
import { EditableOnEnterDirective } from './editable/edit-on-enter.directive';
import { SharedModule } from '../../shared.module';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [
	FindMemoComponent,
	BigLoaderComponent,

	EditableComponent,
	ViewModeDirective,
	EditModeDirective,
	EditableOnEnterDirective
  ],
  imports: [
	BrowserModule,
	FormsModule,
	ReactiveFormsModule,
	BrowserAnimationsModule,
	MaterialModule,
	SharedModule
  ],
  entryComponents: [
	FindMemoComponent
  ]
})
export class FindModule { }
