import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './shared/services/auth.guard';

const routes: Routes = [
	{ path: "", redirectTo: "Home", pathMatch: "full" },
	{ path: "Home", canActivate: [AuthGuard], component: HomeComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
