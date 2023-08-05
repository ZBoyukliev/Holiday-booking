import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private userService: UserService, private router: Router) {}

  // login(): void {
  //   const email = (document.getElementById('email') as HTMLInputElement).value;
  //   const password = (document.getElementById('password') as HTMLInputElement).value;

  //   this.userService.login(email, password).subscribe(
  //     () => {
  //       this.router.navigate(['/']);
  //     },
  //     (error) => {
  //       console.error('Login failed:', error);
  //     }
  //   );
  // }
}

