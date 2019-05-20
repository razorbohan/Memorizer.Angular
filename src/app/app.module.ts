import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';

import { ClickOutsideDirective } from './directives/click-outside.directive';

import { ModalModule } from 'ngx-bootstrap/modal';
import { AddMemoComponent } from './modals/add/add.component';
import { FindMemoComponent } from './modals/find/find.component';
import { FinishComponent } from './modals/finish/finish.component';


import { Ng2SmartTableModule } from 'ng2-smart-table';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { JsGridComponent } from './modals/find/js-grid/js-grid.component';
import { SmartTableDatepickerRenderComponent, SmartTableDatepickerComponent } from './modals/find/datapicker/smart-table-datepicker.component';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		AppComponent,
		NavComponent,
		HomeComponent,
		ClickOutsideDirective,
		AddMemoComponent,
		FindMemoComponent,
		FinishComponent,
		JsGridComponent,
		SmartTableDatepickerRenderComponent,
		SmartTableDatepickerComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpModule,
		ModalModule.forRoot(),
		Ng2SmartTableModule,
		OwlDateTimeModule,
		OwlNativeDateTimeModule,
		FormsModule
	],
	providers: [],
	bootstrap: [AppComponent],
	entryComponents: [
		AddMemoComponent,
		FindMemoComponent,
		FinishComponent,
		SmartTableDatepickerRenderComponent,
		SmartTableDatepickerComponent
	]
})
export class AppModule { }

//TODO: messageBox to sep-component
//TODO: base logic
//TODO: confirm when deleting
//TODO: finishMessage
//TODO: user login/register
//TODO: connect to db
//TODO: common loader & message-error-box
//TODO: proper collor for message-error-box
//TODO: animations (messages, hovers)
//TODO: tests