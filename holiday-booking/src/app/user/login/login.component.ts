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

  errorMessage: string = '';
  showErrorMessage: boolean = false;

  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private router: Router
  ) { }

  onLoginSubmitHandler(): void {
    if (!this.loginForm) return;

    const form = this.loginForm;

    if (form.invalid) {
      this.showErrorMessage = true;
      this.errorMessage = 'Please enter email and password';
      this.userService.showMessage(this.errorMessage);
      return;
    }

    const value: { email: string; password: string } = form.value;

    this.userService.login(value.email, value.password).subscribe({
      next: (response) => {
        if (response.accessToken) {
          // this.apiService.clearToken();
          this.userService.isLoggedIn = true;
          this.userService.setToken('accessToken', response.accessToken);
          this.userService.setToken('email', response.email);
          this.userService.setToken('userId', response._id);
          this.userService.setToken('username', response.username);

          console.log('Login successful!');
          this.router.navigate(['/']);
          this.userService.showMessage('Logged in successfully!');
        }
      },
      error: (error) => {
        this.userService.showMessage(error.error.message);
        this.errorMessage = error.error.message
        setTimeout(() => {
          this.errorMessage = '';
        },3000)
      },
    });
  }
}

