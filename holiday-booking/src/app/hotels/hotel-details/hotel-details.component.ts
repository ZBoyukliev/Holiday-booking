import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from '../hotel.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.scss']
})
export class HotelDetailsComponent {
  hotelId: string | null = null;
  hotel: any;
  isLiked: boolean = false;
  isOwner: boolean = false;
  likesCount: number = 0;

  constructor(private route: ActivatedRoute, private router: Router, private hotelService: HotelService, private userService: UserService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.hotelId = params['id'];

      if (this.hotelId !== null) { // Check for null
        this.getHotelDetails(this.hotelId);
      }
    });
  }
  // ngOnInit(): void {
  //   this.route.params.subscribe(params => {
  //     this.hotelId = params['id'];

  //     if (this.hotelId) {
  //       this.getHotelDetails(this.hotelId);
  //     }
  //   });
  // }

  getHotelDetails(id: string): void {
    this.hotelService.getHotelById(id)
      .subscribe({
        next: (data) => {
          this.hotel = data;
          if (this.hotel._ownerId === this.userService.userId) {
            this.isOwner = true;
          }

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
  };


  toggleLike(): void {
    if (this.isLiked) {
      this.likesCount--;
    } else {
      this.likesCount++;
    }
    this.isLiked = !this.isLiked;
  }

}
