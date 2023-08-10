import { Component, Input } from '@angular/core';
import { UserService } from '../user/user.service';
import { HotelService } from '../hotels/hotel.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  constructor(private hotelService: HotelService) { }

  @Input() hotel: any;
  @Input() userService!: UserService;

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
          // Optionally, you can emit an event to notify the parent component to refresh the hotels list
          // this.deleted.emit(this.hotel._id);
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





