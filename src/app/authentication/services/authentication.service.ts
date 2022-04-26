import { AbstractApiService } from './../../shared/services/abstract-api.service';
import { LoginDto } from './../../shared/DTO/login-dto.model';
import { RegisterDto } from './../../shared/DTO/register-dto.model';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends AbstractApiService {

  private headers = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  constructor(protected http: HttpClient, private router: Router) {
    super(http);
   }

  register(email: string, password: string): Observable<RegisterDto> {
    let registerUrl = `${environment.reqresUrl}/register`;
    let credentials = {
      email: email,
      password: password
    }
    return this.http.post<RegisterDto>(registerUrl, credentials, this.headers)
      .pipe(
        catchError(this.handleError)
      )
  }

  login(email: string, password: string): Observable<LoginDto> {
    let loginUrl = `${environment.reqresUrl}/login`;
    let credentials = {
      email: email,
      password: password
    }
    return this.http.post<LoginDto>(loginUrl, credentials, this.headers)
      .pipe(
        catchError(this.handleError)
      )
  }

  storeUserToken(token: string): void {
    localStorage.setItem('token', token);
  }

  gotoUsersDashboard(): void {
    this.router.navigate(['/users']);
  }

}
