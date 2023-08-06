import { Component } from '@angular/core';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  constructor( public userService: UserService,) {}
  
  ngOnInit(): void {
    if (localStorage.getItem('accessToken')) {
      this.userService.isLoggedIn = true;
    }
  }
}
