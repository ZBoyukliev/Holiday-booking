import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isLoggedIn: boolean = false;
  message: string | null = null;
  username: string | null = null;
  timeoutDelay: number = 3000;

  constructor(private api: ApiService, private http: HttpClient) { }

  showMessage(text: string) {
    this.message = text;
    console.log(text);
    setTimeout(() => {
      this.message = null;
      console.log(this.message);

    }, this.timeoutDelay);
    console.log(this.message);
  };

  userRegister(
    email: string,
    password: string,
    username: string
  ): Observable<any> {
    return this.http.post(`http://localhost:3030/users/register`, {
      email: email,
      password: password,
      username: username,
    });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`http://localhost:3030/users/login`, { email: email, password: password });
  }

  setToken(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  clearToken(): void {
    localStorage.removeItem('accessToken');
  }

  checkLoggedIn(): void {
    if (localStorage.getItem('accessToken')) {
      this.isLoggedIn = true;
      this.username = localStorage.getItem('username');
    }
  };

};