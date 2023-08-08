import { Component, OnInit } from '@angular/core';
import { HotelService } from '../hotels/hotel.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  hotels: any[] = []; 

  constructor(private hotelService: HotelService) { }

  ngOnInit(): void {
    this.getHotels();
  }

  getHotels(): void {
    this.hotelService.getHotels()
      .subscribe({
        next: (data) => {
          this.hotels = data;
        },
        error: (error) => {
          console.error('Error fetching hotel data:', error);
        }
      });
  };
};


