import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import {  Observable } from 'rxjs';
import { User } from "../types/user";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: User | undefined;
  userId: string | null = null;
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
    }, this.timeoutDelay);
    console.log(this.message);
  };

  userRegister(
    email: string,
    password: string,
    username: string,
  ): Observable<User> {
    return this.http.post<User>(`http://localhost:3030/users/register`, {
      email: email,
      password: password,
      username: username
    });
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`http://localhost:3030/users/login`, { email: email, password: password });
  }

  isAuthenticated(): boolean {
       return this.isLoggedIn; 
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
      this.userId = localStorage.getItem('userId'); 
    }
  };
};
