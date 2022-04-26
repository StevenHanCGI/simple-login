import { LoginDto } from './../../shared/DTO/login-dto.model';
import { RegisterDto } from './../../shared/DTO/register-dto.model';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

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

  register(email: string, password: string): Observable<RegisterDto> {
    let registerUrl = `${environment.reqresUrl}/register`;
    let credentials = {
      email: email,
      password: password
    }
    return this.http.post<RegisterDto>(registerUrl, credentials, this.headers);
  }

  login(email: string, password: string): Observable<LoginDto> {
    let loginUrl = `${environment.reqresUrl}/login`;
    let credentials = {
      email: email,
      password: password
    }
    return this.http.post<LoginDto>(loginUrl, credentials, this.headers);
  }

  storeUserToken(token: string) {
    localStorage.setItem('token', token);
  }

  gotoUsersDashboard() {
    this.router.navigate(['/users']);
  }

}
