import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../../shared/models/user.model';

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

  register(email: string, password: string): Observable<any> {
    let registerUrl = `${environment.reqresUrl}/register`;
    let credentials = {
      email: email,
      password: password
    }
    return this.http.post<User>(registerUrl, credentials, this.headers);
  }

  login(email: string, password: string): Observable<any> {
    let loginUrl = `${environment.reqresUrl}/login`;
    let credentials = {
      email: email,
      password: password
    }
    return this.http.post<any>(loginUrl, credentials, this.headers);
  }

  storeUserToken(token: string) {
    localStorage.setItem('token', token);
  }

  gotoUsersDashboard() {
    this.router.navigate(['/users']);
  }

}
