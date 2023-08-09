import { Component } from '@angular/core';
import { HotelService } from '../hotels/hotel.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent {
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
  // getHotels(): void {
  //   this.hotelService.getHotels().subscribe(
  //     (data) => {
  //       this.hotels = data;
  //       console.log(data);
  //       console.log(this.hotels);
        
  //     },
  //     (error) => {
  //       console.error('Error fetching hotel data:', error);
  //     }
  //   );
  // }
}
