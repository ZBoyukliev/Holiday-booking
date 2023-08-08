import { Component, Input  } from '@angular/core';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  constructor(public userService: UserService) {}

  @Input() hotel: any;

  ngOnInit(): void {
    if (localStorage.getItem('accessToken')) {
      this.userService.isLoggedIn = true;
      this.userService.username = localStorage.getItem('username')
    }
  }

}
