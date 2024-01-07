import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})


export class ApiServiceService {

  private baseUrl = 'http://localhost:8080'; 

  constructor(private http: HttpClient) { }

  login(credentials: { email: string, password: string }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(`${this.baseUrl}/user/login`, credentials, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('HTTP Error Response:', error);

    if (error.status === 401) {
      return throwError('Invalid email or password');
    }

    return throwError('Something went wrong');
  }
}