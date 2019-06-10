import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthComponent } from './auth.component';
import { AuthGuard } from '../shared/services/auth.guard';

const routes: Routes = [{
    path: "Auth", canActivate: [AuthGuard], component: AuthComponent, data: { animation: 'Auth' }, children: [
        { path: "Login", component: LoginComponent, data: { animation: 'Login' } },
        { path: "Register", component: RegisterComponent, data: { animation: 'Register' } }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
