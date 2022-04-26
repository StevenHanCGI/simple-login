import { SingleUserDto } from './../../shared/DTO/single-user-dto.model';
import { UsersListDto } from './../../shared/DTO/users-list-dto.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, catchError, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersManagementService {

  userIdSubject = new Subject();

  constructor(private http: HttpClient) { }

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

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.message}`;
    }
    console.error(err);
    return throwError(() => errorMessage);
  }
}
