import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { NavModule } from './nav/nav.module';
import { FindModule } from './shared/modals/find/find.module';

import { MemoService } from './shared/services/memo.service';
import { AuthService } from './shared/services/auth.service';
import { TokenInterceptorService } from './shared/services/token-interceptor.service';
import { HomeGuard } from './shared/services/home.guard';
import { AuthGuard } from './shared/services/auth.guard';

import { MaterialModule } from './material.module';

// import { BigLoaderComponent } from './shared/components/big-loader/big-loader.component';

@NgModule({
	declarations: [
		AppComponent,
		// BigLoaderComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule,
		AuthModule,
		HomeModule,
		NavModule,
		FindModule,
		// MaterialModule
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
		},
		HttpClient],
	bootstrap: [AppComponent],
	// entryComponents: [
	// 	AddMemoComponent,
	// 	FindMemoComponent,
	// 	FinishComponent,
	// 	ConfirmComponent,
	// ]
})
export class AppModule { }

// TODO: install fontawesome
// TODO: lint
// TODO: e2e
// TODO: timers
// TODO: deploy
// TODO: 3d-party login
// TODO: angular materials (
	// MatSnackBar, 
	// MatDialog, 
	// mat-progress-spinner/mat-spinner, 
	// mat-divider, 
	// mat-slide-toggle, 
	// badge, 
	// mat-horizontal-stepper)
// TODO: Find modal fix validation
