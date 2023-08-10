import { Component } from '@angular/core';
import { HotelService } from '../hotels/hotel.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent {
  hotels: any[] = [];

  constructor(private hotelService: HotelService, public userService: UserService) {
    this.userService = userService; 
  }

  ngOnInit(): void {
    this.userService.checkLoggedIn();   
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
  refreshHotels(): void {
    this.getHotels(); 
  }

}
