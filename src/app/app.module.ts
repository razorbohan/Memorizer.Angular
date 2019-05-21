import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';

import { ClickOutsideDirective } from './shared/directives/click-outside.directive';

import { ModalModule } from 'ngx-bootstrap/modal';
import { AddMemoComponent } from './shared/modals/add/add.component';
import { FindMemoComponent } from './shared/modals/find/find.component';
import { FinishComponent } from './shared/modals/finish/finish.component';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { JsGridComponent } from './shared/modals/find/js-grid/js-grid.component';
import { SmartTableDatepickerRenderComponent, SmartTableDatepickerComponent } from './shared/modals/find/datapicker/smart-table-datepicker.component';
import { MemoService } from './shared/services/memo.service';
import { MessageComponent } from './shared/components/message/message.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { ConfirmComponent } from './shared/modals/confirm/confirm.component';

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
		SmartTableDatepickerComponent,
		MessageComponent,
		LoaderComponent,
		ConfirmComponent
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
	providers: [MemoService],
	bootstrap: [AppComponent],
	entryComponents: [
		AddMemoComponent,
		FindMemoComponent,
		FinishComponent,
		ConfirmComponent,
		SmartTableDatepickerRenderComponent,
		SmartTableDatepickerComponent
	]
})
export class AppModule { }

//TODO: finishMessage + mode
//TODO: confirm when deleting
//TODO: user login/register
//TODO: animations (messages, hovers)
//TODO: big start loader
//TODO: tests