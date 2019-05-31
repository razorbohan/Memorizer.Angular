import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomeGuard } from './shared/services/home.guard';

const routes: Routes = [
	{ path: "", redirectTo: "Home", pathMatch: "full" },
	{ path: "Home", canActivate: [HomeGuard], component: HomeComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
