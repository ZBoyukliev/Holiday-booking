import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { tap } from 'rxjs/operators';
// import { BehaviorSubject } from 'rxjs';
// import { User } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
//   private user$$ = new BehaviorSubject<User | undefined>(undefined);
//   public user$ = this.user$$.asObservable();

  constructor(private http: HttpClient) {}

//   login(email: string, password: string) {
//     return this.http.post<User>('/users/login', { email, password }).pipe(
//       tap((user) => {
//         this.user$$.next(user);
//       })
//     );
//   }
}
