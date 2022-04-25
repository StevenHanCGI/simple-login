import { SingleUserDto } from './../../shared/DTO/single-user-dto.model';
import { UsersListDto } from './../../shared/DTO/users-list-dto.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersManagementService {

  constructor(private http: HttpClient) { }

  getListUsers(): Observable<UsersListDto> {
    let listUsersUrl = `${environment.reqresUrl}/users?page=2`;
    return this.http.get<UsersListDto>(listUsersUrl);
  }

  getSingleUser(id: string): Observable<SingleUserDto> {
    let singleUserUrl = `${environment.reqresUrl}/users/${id}`;
    return this.http.get<SingleUserDto>(singleUserUrl)
  }
}
