import { Component, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  @ViewChild('registerForm') registerForm: NgForm | undefined;

  errorMessage: string = '';
  showPasswordMatchMessage: boolean = false;

  userData = {
    email: '',
    username: '',
    password: '',
  };
  registrationError: boolean = false;
  allFields: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  onRegisterSubmitHandler(): void {
    console.log('clicked');

    if (!this.registerForm) return;
    const form = this.registerForm;

    if (form.invalid) {
      this.allFields = true;
      this.errorMessage = "All fields are required."
      this.userService.showMessage(this.errorMessage);
      setTimeout(() => {
        this.allFields = false;
      }, 3000);
      return;
    }

    const value: {
      email: string;
      username: string;
      password: string;
      rePass: string;
    } = form.value;

    if (value.email === '' && value.username === '' && value.password === '' && value.rePass === '') {
      this.userService.showMessage("All fields are required.");
      return;
    }

    if (value.password !== value.rePass ) {
      this.errorMessage = "The passwords don't match!"
      this.userService.showMessage( this.errorMessage);
      this.registrationError = true;
      setTimeout(() => {
        this.registrationError = false;
      }, 3000);

     return
    }

    this.userService
      .userRegister(value.email, value.password, value.username)
      .subscribe({
        next: (response) => {
          if (response.accessToken) {
            this.userService.clearToken();
            this.userService.isLoggedIn = true;
            this.userService.setToken('accessToken', response.accessToken);
            this.userService.setToken('email', response.email);
            this.userService.setToken('userId', response._id);
            this.userService.setToken('username', response.username);
            this.router.navigate(['/']);
            this.userService.showMessage('Registered successfully!');
          }
        },
        error: (error) => {
          this.errorMessage = error.error.message;
        },
      });
    
    this.showPasswordMatchMessage = true;
    setTimeout(() => {
      this.showPasswordMatchMessage = false;
    }, 3000);
  };
};
