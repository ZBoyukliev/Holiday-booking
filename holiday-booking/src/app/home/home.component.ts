import { Component, OnInit } from '@angular/core';
import { HotelService } from '../hotels/hotel.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  hotels: any[] = [];

  constructor(private hotelService: HotelService, public userService: UserService) { }

  ngOnInit(): void {
    this.userService.checkLoggedIn();
    this.getHotels();

  }

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
};


