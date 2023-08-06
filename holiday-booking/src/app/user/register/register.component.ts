import { Component, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { NgForm } from '@angular/forms'
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  @ViewChild('registerForm') registerForm: NgForm | undefined;

  userData = {
    email: '',
    username: '',
    password: '',
  };
  registrationError: boolean = false;

  constructor(
    private api: ApiService,
    private userService: UserService,
    private router: Router
  ) { }

  onRegisterSubmitHandler(): void {
    console.log('clicked');
    
    if (!this.registerForm) return;

    const form = this.registerForm;

    if (form.invalid) {
      return;
    }

    if (form.value.password !== form.value.rePass) {
      this.userService.showMessage("The passwords don't match!");
      return;
    }

    const value: {
      email: string;
      username: string;
      password: string;
      rePassword: string;
    } = form.value;


    this.api   
      .userRegister(value.email, value.password, value.username)   
      .subscribe({
        next: (response) => {
          if (response.accessToken) {
            this.api.clearToken();
            this.userService.isLoggedIn = true;
            console.log(this.userService.isLoggedIn );
            
            this.api.setToken('accessToken', response.accessToken);

            console.log('Registered successfully!');
            this.router.navigate(['/']);
            this.userService.showMessage('Registered successfully!');

            this.router.navigate(['/']);
            this.userService.showMessage('Registered successfully!');
          }
        },
        error: (error) => {
          this.userService.showMessage(error.error.message);
        },
      });
      console.log(this.userService.isLoggedIn);
  };
};

