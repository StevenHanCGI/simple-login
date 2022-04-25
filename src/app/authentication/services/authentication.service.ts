import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private headers = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  constructor(private http: HttpClient, private router: Router) { }

  register(user: User): Observable<any> {
    let registerUrl = `${environment.reqresUrl}/register`;
    return this.http.post<User>(registerUrl, user, this.headers);
  }

  login(user: User): Observable<any> {
    let loginUrl = `${environment.reqresUrl}/login`;
    return this.http.post<User>(loginUrl, user, this.headers);
  }

  storeUserToken(token: string) {
    localStorage.setItem('token', token);
  }

  gotoUsersDashboard() {
    this.router.navigate(['/users']);
  }

}
