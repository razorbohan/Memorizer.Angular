import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { NavModule } from './nav/nav.module';

import { MemoService } from './shared/services/memo.service';
import { AuthService } from './shared/services/auth.service';
import { TokenInterceptorService } from './shared/services/token-interceptor.service';
import { HomeGuard } from './shared/services/home.guard';
import { AuthGuard } from './shared/services/auth.guard';

import { BigLoaderComponent } from './shared/components/big-loader/big-loader.component';

@NgModule({
	declarations: [
		AppComponent,
		BigLoaderComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
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

//TODO: click-outsie home message error
//TODO: finish mode
//TODO: Find modal
//TODO: angular materials (mat-toolbar-row)
//TODO: 3d-party login?
//TODO: tests
//TODO: deploy