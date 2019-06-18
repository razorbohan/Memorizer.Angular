import { TestBed, tick, fakeAsync } from '@angular/core/testing';
import { RouterModule, Routes, Router } from '@angular/router';
import { HomeGuard } from './shared/services/home.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { Location } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './material.module';
import { AuthService } from './shared/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './shared/services/auth.guard';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './auth/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
	{ path: '', redirectTo: 'Home', pathMatch: 'full' },
	{ path: 'Home', canActivate: [HomeGuard], component: HomeComponent, data: { animation: 'Home' } }
];

const authRoutes: Routes = [{
	path: 'Auth', canActivate: [AuthGuard], component: AuthComponent, data: { animation: 'Auth' }, children: [
		{ path: 'Login', component: LoginComponent, data: { animation: 'Login' } },
		{ path: 'Register', component: RegisterComponent, data: { animation: 'Register' } }
	]
}];

describe('app-routing', () => {

	let router: Router;
	let location: Location;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [
				HomeComponent,
				LoginComponent,
				RegisterComponent,
				AuthComponent
			],
			imports: [
				FormsModule,
				ReactiveFormsModule,
				BrowserAnimationsModule,
				MaterialModule,
				SharedModule,
				HttpClientModule,
				RouterModule.forRoot(routes),
				RouterModule.forChild(authRoutes)
			],
			providers: [
				AuthService,
				AuthGuard,
				HomeGuard
			]
		});

		router = TestBed.get(Router);
		location = TestBed.get(Location);
	});

	it('should redirect to Login', fakeAsync(() => {
		const fixture = TestBed.createComponent(LoginComponent);
		router.navigateByUrl('/Home');
		tick(1000);

		fixture.detectChanges();
		tick(1000);

		expect(location.path()).toBe('/Auth/Login');
	}));
});
