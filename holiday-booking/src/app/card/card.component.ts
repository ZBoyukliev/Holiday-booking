import { Component,  EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../user/user.service';
import { HotelService } from '../hotels/hotel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  constructor(private hotelService: HotelService, private router: Router) { }

  @Input() hotel: any;
  @Input() userService!: UserService;
  @Output() hotelDeleted: EventEmitter<void> = new EventEmitter<void>();

  deleteHotel(): void {
    window.confirm('Are you sure you want to delete the hotel permanently!') &&
    this.hotelService.deleteHotel(this.hotel._id)
    .subscribe({
      next: () => {
        console.log('Hotel deleted successfully');
        this.hotelDeleted.emit();
      },
      error: (error) => {
        console.error('Error deleting hotel:', error);
      }
    });

  }
  ngOnInit(): void {
    this.userService.checkLoggedIn();
  }
}
