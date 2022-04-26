import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersManagementService } from './../../services/users-management.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { map, Subject, BehaviorSubject, take, tap } from 'rxjs';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  addUserForm: FormGroup;

  usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();


  ngOnInit(): void {
    this.addUserForm = new FormGroup({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email,
      ])),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      avatar: new FormControl('', Validators.required)
    });

    this.initUser();

  }

  initUser(): void {
    this.usersManagementService.getListUsers()
      .pipe(
        take(1),
        map(userListDto => userListDto.data),
        tap(object => {
          this.usersSubject.next(object)
        }
        )
      ).subscribe()
  }

  constructor(private usersManagementService: UsersManagementService) { }

  // When adding a new user it will display on the page but when refreshed, it will disapear.
  // This is because the create API call is fake, it doesnt really create an object in the backend
  addNewUser(): void {
    if (this.addUserForm.valid) {
      let newUser: User = {
        id: '',
        email: this.addUserForm.value.email,
        first_name: this.addUserForm.value.firstName,
        last_name: this.addUserForm.value.last_name,
        avatar: this.addUserForm.value.avatar
      };
      this.usersManagementService.createNewUser(newUser)
      .pipe(
        map(userCreatedDto => {
          let newUser: User = {
            id: userCreatedDto.id,
            email: userCreatedDto.email,
            first_name: userCreatedDto.first_name,
            last_name: userCreatedDto.last_name,
            avatar: ''
          };
          return newUser;
        }),
        take(1),
        tap(user => {
          this.usersSubject.getValue().push(user)
        })
      ).subscribe()
    }
  }

}

