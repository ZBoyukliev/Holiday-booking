import { Component, OnInit } from '@angular/core';
import { HotelService } from '../hotels/hotel.service';
import { UserService } from '../user/user.service';
import { Hotel } from '../types/hotel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  hotels: Hotel[] = [];

  constructor(private hotelService: HotelService, public userService: UserService) { }

  getHotels(): void {
    this.hotelService.getHotels()
      .subscribe({
        next: (data) => {
          this.hotels = data;
          console.log(this.hotels);
        },
        error: (error) => {
          console.error('Error fetching hotel data:', error);
        }
      });
    console.log(this.hotels);
  };

  ngOnInit(): void {
    this.userService.checkLoggedIn();
    this.getHotels();
  };

};


