import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from '../hotel.service';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.scss']
})
export class HotelDetailsComponent {
  hotelId: string | null = null;
  hotel: any; // Update this type based on your actual data structure

  constructor(private route: ActivatedRoute, private hotelService: HotelService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.hotelId = params['id'];
      console.log(this.hotelId);
      
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
  }
}
