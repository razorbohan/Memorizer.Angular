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

// import { MaterialModule } from './material.module';

@NgModule({
	declarations: [
		AppComponent,
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
	bootstrap: [AppComponent]
})
export class AppModule { }

// TODO: webpack tslint-loader
// TODO: more angular materials
// MatSnackBar,
// MatDialog,
// mat-progress-spinner/mat-spinner,
// mat-divider,
// mat-slide-toggle,
// badge,
// mat-horizontal-stepper
// TODO: fix FindModal validation
// TODO: profile page
// TODO: 3d-party login
// TODO: e2e
