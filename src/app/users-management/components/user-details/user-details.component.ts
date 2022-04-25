import { Router } from '@angular/router';
import { UsersManagementService } from './../../services/users-management.service';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  user: User;

  constructor(private usersManagementService: UsersManagementService, private router: Router) {
    this.usersManagementService.getSingleUser(this.getIdByUrl()).subscribe(singleUserDto => {
      this.user = singleUserDto.data;
    });
  }

  ngOnInit(): void {
  }

  getIdByUrl() {
    return this.router.url.split('/')[3];
  }

}
