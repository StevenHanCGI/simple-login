import { ActivatedRoute } from '@angular/router';
import { UsersManagementService } from './../../services/users-management.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { catchError, EMPTY, map, Observable, Subject, take, tap } from 'rxjs';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  user$: Observable<User>;

  ngOnInit(): void {
    let userId = this.getIdFromUrl();
    if (userId) {
      this.user$ = this.usersManagementService.getSingleUser(userId)
        .pipe(
          take(1),
          map(singleUserDto => singleUserDto.data),
          catchError(err => {
            this.errorMessageSubject.next(err);
            return EMPTY;
          })
        );
    }
  }

  constructor(private usersManagementService: UsersManagementService, private activatedRoute: ActivatedRoute) {
  }

  getIdFromUrl() {
    return this.activatedRoute.snapshot.paramMap.get("id");
  }

}
