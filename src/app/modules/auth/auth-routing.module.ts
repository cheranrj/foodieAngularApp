import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{
		path: 'login',
		component: LoginComponent,
		// data: {
		// 	mustLogin: false,
		// 	authState: false
		// }
	},
	// {
	// 	path: 'verify-login',
	// 	component: LoginComponent,
	// 	// data: {
	// 	// 	mustLogin: false,
	// 	// 	authState: false
	// 	// }
	// },
	{
		path: 'register',
		component: RegisterComponent,
		// data: {
		// 	mustLogin: false,
		// 	authState: false
		// }
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AuthRoutingModule { }
