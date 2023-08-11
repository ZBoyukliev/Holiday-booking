import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from '../hotel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.scss']
})
export class HotelDetailsComponent {
  hotelId: string | null = null;
  hotel: any;
  isDeleteModalOpen = false;

  showDeleteConfirmation(): void {
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
  }

  constructor(private route: ActivatedRoute, private router: Router, private hotelService: HotelService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.hotelId = params['id'];

      if (this.hotelId) {
        console.log('clicked');

        this.getHotelDetails(this.hotelId);
      }
    });
  }

  getHotelDetails(id: string): void {
    this.hotelService.getHotelById(id)
      .subscribe({
        next: (data) => {
          this.hotel = data;
          console.log(this.hotel);

        },
        error: (error) => {
          console.error('Error fetching hotel details:', error);
        }
      });
  };

  deleteHotel(): void {
    if (this.hotelId) {
      this.hotelService.deleteHotel(this.hotelId).subscribe({
        next: () => {
          console.log('Hotel deleted successfully');
          this.router.navigate(['/catalog']);
        },
        error: (error) => {
          console.error('Error deleting hotel:', error);
        }
      });
    } else {
      console.error('Invalid hotel ID');
    }

    this.closeDeleteModal();
  }

}
