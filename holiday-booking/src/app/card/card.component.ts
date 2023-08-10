import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  isDeleteModalOpen = false;

  showDeleteConfirmation(): void {
    console.log('clicked show');

    this.isDeleteModalOpen = true;
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
  }

  deleteHotel(): void {
    // if (this.hotel._id) {
    this.hotelService.deleteHotel(this.hotel._id).subscribe({
      next: () => {
        console.log('Hotel deleted successfully');
        this.hotelDeleted.emit();
      },
      error: (error) => {
        console.error('Error deleting hotel:', error);
      }
    });
    // } else {
    //   console.error('Invalid hotel ID');
    // }

    // this.closeDeleteModal(); 
  }
  ngOnInit(): void {
    this.userService.checkLoggedIn();
    console.log(this.hotel._id);

  }
}





