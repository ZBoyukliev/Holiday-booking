import { Component, OnInit } from '@angular/core';
import { HotelsService } from '../services/hotels.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  hotels: any[] = []; // Assuming your hotel data is an array of objects

  constructor(private hotelService: HotelsService) { }

  ngOnInit(): void {
    this.getHotels();
  }

  getHotels(): void {
    this.hotelService.getHotels().subscribe(
      (data) => {
        this.hotels = data; // Assign the fetched hotel data to the 'hotels' array
        console.log(data);
        console.log(this.hotels);
        
      },
      (error) => {
        console.error('Error fetching hotel data:', error);
      }
    );
  }
}





// export class HomeComponent {

// }
