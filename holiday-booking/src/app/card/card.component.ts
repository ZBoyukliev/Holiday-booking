import { Component, Input } from '@angular/core';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  constructor() { }

  @Input() hotel: any;
  @Input() userService!: UserService;

  ngOnInit(): void {
    // this.userService.checkLoggedIn();
  }

}
