import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from '../hotel.service';

@Component({
  selector: 'app-edit-hotel',
  templateUrl: './edit-hotel.component.html',
  styleUrls: ['./edit-hotel.component.scss']
})
export class EditHotelComponent implements OnInit {
  hotelId: string | null = null;
  hotel: any = {}; 

  constructor(private route: ActivatedRoute, private hotelService: HotelService, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.hotelId = params['id'];
      if (this.hotelId) {
        this.getHotelDetails(this.hotelId);
      }
    });
  }

  getHotelDetails(id: string): void {
    this.hotelService.getHotelById(id).subscribe({
      next: (data) => {
        this.hotel = data;
      },
      error: (error) => {
        console.error('Error fetching hotel details:', error);
      }
    });
  }

  updateHotel(): void {
    if (this.hotelId) {
      this.hotelService.updateHotel(this.hotelId, this.hotel).subscribe({
        next: () => {
          console.log('Hotel updated successfully');
          this.router.navigate(['/catalog']); 
        },
        error: (error) => {
          console.error('Error updating hotel:', error);
        }
      });
    } else {
      console.error('Invalid hotel ID');
    }
  }
}
