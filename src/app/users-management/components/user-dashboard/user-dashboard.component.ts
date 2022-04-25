import { UsersManagementService } from './../../services/users-management.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  users: User[] = [];

  constructor(private usersManagementService: UsersManagementService) { }

  ngOnInit(): void {
    this.usersManagementService.getListUsers().subscribe(response => {
      this.users = response.data;
    })
  }

  addNewUser() {
    
  }

}
