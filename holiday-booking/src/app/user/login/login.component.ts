import { Component, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm: NgForm | undefined;

  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private router: Router
  ) {}

  onLoginSubmitHandler(): void {
    if (!this.loginForm) return;

    const form = this.loginForm;

    if (form.invalid) {
      return;
    }

    const value: { email: string; password: string } = form.value;

    this.apiService.login(value.email, value.password).subscribe({
      next: (response) => {
        if (response.accessToken) {
          // this.apiService.clearToken();
          this.userService.isLoggedIn = true;
          this.apiService.setToken('accessToken', response.accessToken);

          console.log('Login successful!');
          this.router.navigate(['/']);
          this.userService.showMessage('Logged in successfully!');          
        }
      },
      error: (error) => {
        this.userService.showMessage(error.error.message);        
      },
    });
  }
}

