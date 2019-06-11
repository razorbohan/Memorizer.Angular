import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// import { Ng2SmartTableModule } from 'ng2-smart-table';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { FindMemoComponent } from './find.component';
// import { JsGridComponent } from './js-grid/js-grid.component';
import { SmartTableDatepickerComponent, SmartTableDatepickerRenderComponent } from './datapicker/smart-table-datepicker.component';

import {
  MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatSortModule, MatTableModule, MatDatepickerModule,
} from "@angular/material";
import { MatMomentDateModule } from '@angular/material-moment-adapter'
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    FindMemoComponent,
    // JsGridComponent,
    SmartTableDatepickerComponent,
    SmartTableDatepickerRenderComponent
  ],
  imports: [
    BrowserModule,
    // Ng2SmartTableModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatMomentDateModule
  ],
  exports: [
    // Ng2SmartTableModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatTableModule
  ],
  entryComponents: [
    FindMemoComponent,
    SmartTableDatepickerRenderComponent,
    SmartTableDatepickerComponent
  ]
})
export class FindModule { }
