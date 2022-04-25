import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersManagementService {

  constructor(private http: HttpClient) { }

  getListUsers(): Observable<any> {
    let listUsersUrl = `${environment.reqresUrl}/users?page=2`;
    return this.http.get<User[]>(listUsersUrl);
  }
}
