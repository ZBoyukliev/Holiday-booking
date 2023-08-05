
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3030/users/login';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const loginData = {
      email: email,
      password: password
    };

    return this.http.post<any>(this.apiUrl, loginData)
      .pipe(
        catchError((error: any) => {
          console.error('Login Error:', error);
          throw error;
        })
      );
  }
}
