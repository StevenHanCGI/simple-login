import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UsersDashboardComponent } from './components/users-dashboard/users-dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'users', component: UsersDashboardComponent},
  {path: 'user/:id', component: UserDetailsComponent},
  {path: '', redirectTo:'users', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
