import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  // constructor(private userService: UserService, private router: Router) {}
  email: string = ''; 
  username: string = '';
  password: string = ''; 
  loginError: boolean = false;

  constructor(private userService: UserService) { }

 
}

