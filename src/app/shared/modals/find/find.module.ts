import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { FindMemoComponent } from './find.component';
import { JsGridComponent } from './js-grid/js-grid.component';
import { SmartTableDatepickerComponent, SmartTableDatepickerRenderComponent } from './datapicker/smart-table-datepicker.component';

@NgModule({
  declarations: [
    FindMemoComponent,
    JsGridComponent,
    SmartTableDatepickerComponent,
    SmartTableDatepickerRenderComponent
  ],
  imports: [
    CommonModule,
    Ng2SmartTableModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    FormsModule
  ],
  exports: [
    Ng2SmartTableModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  entryComponents: [
    FindMemoComponent,
    SmartTableDatepickerRenderComponent,
    SmartTableDatepickerComponent
  ]
})
export class FindModule { }
