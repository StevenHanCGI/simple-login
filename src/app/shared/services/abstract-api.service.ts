import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AbstractApiService {

  constructor(protected httpClient: HttpClient) { }

  handleError(err: HttpErrorResponse): Observable<never> {
    console.error(err);
    return throwError(() => err.error.error);
  }
}
