import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

//import { HttpModule } from '@angular/http';
// import { FormsModule } from '@angular/forms';

// import { ModalModule } from 'ngx-bootstrap/modal';
// import { Ng2SmartTableModule } from 'ng2-smart-table';
// import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { NavComponent } from './nav/nav.component';
// import { LoginNavComponent } from './nav/login-nav/login-nav.component';
// import { HomeComponent } from './home/home.component';
import { AuthModule } from './auth/auth.module';

// import { ClickOutsideDirective } from './shared/directives/click-outside.directive';
// import { AddMemoComponent } from './shared/modals/add/add.component';
// import { FindMemoComponent } from './shared/modals/find/find.component';
// import { FinishComponent } from './shared/modals/finish/finish.component';
// import { JsGridComponent } from './shared/modals/find/js-grid/js-grid.component';
// import { SmartTableDatepickerRenderComponent, SmartTableDatepickerComponent } from './shared/modals/find/datapicker/smart-table-datepicker.component';
import { MemoService } from './shared/services/memo.service';
import { TokenInterceptorService } from './shared/services/token-interceptor.service';
import { HomeModule } from './home/home.module';
import { NavModule } from './nav/nav.module';
import { AuthService } from './shared/services/auth.service';
import { HomeGuard } from './shared/services/home.guard';
import { AuthGuard } from './shared/services/auth.guard';
// import { MessageComponent } from './shared/components/message/message.component';
// import { LoaderComponent } from './shared/components/loader/loader.component';
// import { ConfirmComponent } from './shared/modals/confirm/confirm.component';


@NgModule({
	declarations: [
		AppComponent,
		// NavComponent,
		// HomeComponent,
		// ClickOutsideDirective,
		// AddMemoComponent,
		// FindMemoComponent,
		// FinishComponent,
		// JsGridComponent,
		// SmartTableDatepickerRenderComponent,
		// SmartTableDatepickerComponent,
		// MessageComponent,
		// LoaderComponent,
		// ConfirmComponent,
		// LoginNavComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		// HttpModule,
		// ModalModule.forRoot(),
		// Ng2SmartTableModule,
		// OwlDateTimeModule,
		// OwlNativeDateTimeModule,
		// FormsModule,
		AuthModule,
		HomeModule,
		NavModule
	],
	providers: [
		MemoService,
		AuthService,
		HomeGuard,
		AuthGuard,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptorService,
			multi: true
		}],
	bootstrap: [AppComponent],
	// entryComponents: [
	// 	AddMemoComponent,
	// 	FindMemoComponent,
	// 	FinishComponent,
	// 	ConfirmComponent,
	// 	SmartTableDatepickerRenderComponent,
	// 	SmartTableDatepickerComponent
	// ]
})
export class AppModule { }

//TODO: update nav after login
//TODO: user login/register
//TODO: async validation
//TODO: связь компонентов через memoService
//TODO: big start loader
//TODO: animations (messages, hovers)
//TODO: Find modal
//TODO: tests
//TODO: angular materials (mat-toolbar-row)