
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

  constructor(private api: ApiService) { }

  showMessage(text: string) {
    this.message = text;
    console.log(text);
    setTimeout(() => {
      this.message = null;
      console.log(this.message);

    }, this.timeoutDelay);
    console.log(this.message);
  }
};