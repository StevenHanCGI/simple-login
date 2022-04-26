import { AbstractApiService } from './../../shared/services/abstract-api.service';
import { UserCreatedDto } from './../../shared/DTO/user-created-dto.model';
import { SingleUserDto } from './../../shared/DTO/single-user-dto.model';
import { UsersListDto } from './../../shared/DTO/users-list-dto.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersManagementService extends AbstractApiService {

  constructor(protected http: HttpClient) { 
    super(http);
  }

  getListUsers(): Observable<UsersListDto> {
    let listUsersUrl = `${environment.reqresUrl}/users?page=2`;
    return this.http.get<UsersListDto>(listUsersUrl)
    .pipe(
      catchError(this.handleError)
    );
  }

  getSingleUser(id: string): Observable<SingleUserDto> {
    let singleUserUrl = `${environment.reqresUrl}/users/${id}`;
    return this.http.get<SingleUserDto>(singleUserUrl)
    .pipe(
      catchError(this.handleError)
    )
  }

  createNewUser(user: User): Observable<UserCreatedDto> {
    let createUserUrl = `${environment.reqresUrl}/users`;
    return this.http.post<UserCreatedDto>(createUserUrl, user)
    .pipe(
      catchError(this.handleError)
    )
  }
}
