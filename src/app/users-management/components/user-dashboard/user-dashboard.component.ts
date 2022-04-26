import { UsersManagementService } from './../../services/users-management.service';
import { Component } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { map, Observable, catchError, EMPTY, Subject } from 'rxjs';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {

  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  users$: Observable<User[]> = this.usersManagementService.getListUsers()
  .pipe(
    map(userListDto => userListDto.data),
    catchError(err => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );

  constructor(private usersManagementService: UsersManagementService) { }

  addNewUser() {
    
  }

  notifyListeners(id: string) {
    this.usersManagementService.userIdSubject.next(id);
  }

}
