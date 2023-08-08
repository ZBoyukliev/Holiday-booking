import { Component } from '@angular/core';
import { UserService } from '../user/user.service';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  
  constructor(
    public userService: UserService,
    private router: Router,
    private apiService: ApiService
  ) {}
  logout(): void {
    this.userService.isLoggedIn = false;
    this.userService.username = null;
    this.userService.clearToken();
    console.log('Logout successful!');
    this.router.navigate(['/']);
    this.userService.showMessage('Logged out successfully!');
  }

  clearMessage(): void {
    this.userService.message = null;
  }
  
  ngOnInit(): void {
    if (localStorage.getItem('accessToken')) {
      this.userService.isLoggedIn = true;
      this.userService.username = localStorage.getItem('username')
    }
  }
}
