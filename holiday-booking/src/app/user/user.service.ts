
import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isLoggedIn: boolean = false;
  message: string | null = null;
  username: string | null = null;
  timeoutDelay: number = 3000;

  constructor(private api: ApiService) {}

  showMessage(text: string) {
    this.message = text;
    setTimeout(() => {
      this.message = null;
    }, this.timeoutDelay);
  }
}

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { catchError } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {
//   private apiUrl = 'http://localhost:3030/users/login';

//   constructor(private http: HttpClient) { }

//   login(email: string,username: string, password: string): Observable<any> {
//     const loginData = {
//       email: email,
//       username: username,
//       password: password
//     };

//     return this.http.post<any>(this.apiUrl, loginData)
//       .pipe(
//         catchError((error: any) => {
//           console.error('Login Error:', error);
//           throw error;
//         })
//       );
//   }

//   register(userData: any): Observable<any> {
//     return this.http.post<any>(this.apiUrl, userData)
//       .pipe(
//         catchError((error: any) => {
//           // Handle error here, e.g., display error messages to the user
//           console.error('Registration Error:', error);
//           throw error;
//         })
//       );
//   }

// }
