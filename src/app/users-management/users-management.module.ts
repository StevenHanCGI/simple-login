import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersManagementRoutingModule } from './users-management-routing.module';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UserDetailsComponent,
    UserDashboardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsersManagementRoutingModule
  ]
})
export class UsersManagementModule { }
