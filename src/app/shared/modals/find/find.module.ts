import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMomentDateModule } from '@angular/material-moment-adapter'
import {
  MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatSortModule, MatTableModule, MatDatepickerModule,
} from "@angular/material";

import { FindMemoComponent } from './find.component';
import { BigLoaderComponent } from '../../components/big-loader/big-loader.component';

@NgModule({
  declarations: [
    FindMemoComponent,
    BigLoaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatMomentDateModule
  ],
  exports: [
    MatTableModule
  ],
  entryComponents: [
    FindMemoComponent
  ]
})
export class FindModule { }
