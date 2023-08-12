import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from '../hotel.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { LikesService } from '../likes.service';

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
  likes: any[] = []

  constructor(
    private route: ActivatedRoute,
    private likesService: LikesService,
    private router: Router,
    private hotelService: HotelService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
   
    this.route.params.subscribe(params => {
      
      this.hotelId = params['id'];
      this.likesService.getAllLikes().subscribe({
        next: (data) => {
          this.likes = data;
        }
      })

      if (this.hotelId !== null) {
        this.getHotelDetails(this.hotelId);
      }
    });

    this.likesService.getLikesByHotelId(this.hotelId!).subscribe({
      next: (data) => {
        this.likesCount = data
      }
    })


    this.likesService.getMyLikeByHotelId(this.hotelId!, this.userService.userId!).subscribe({
      next: (data) => {
        data === 0 ? this.isLiked = false : this.isLiked = true;
      }
    })
  }

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

   toggleLike() { 
  
    if (this.isLiked) {
         this.dislikeHotel();
      } else {
         this.likeHotel();
      }
  }


  likeHotel(): void {
    this.likesService.likeHotel(this.hotelId!).subscribe({
      next: () => {
        this.isLiked = true;
        this.likesCount++;
      },
      error: (error) => {
        console.error('Error liking hotel:', error);
      }
    });
  }
  
  dislikeHotel(): void {
    const like = this.likes.find((like:any) => like._ownerId === this.userService.userId && like.hotelId === this.hotelId);
    if (like) {
      this.likesService.dislikeHotel(like._id).subscribe({
        next: () => {
          this.isLiked = false;
          this.likesCount--;
        },
        error: (error) => {
          console.error('Error disliking hotel:', error);
        }
      });
    }
  }
  
  // toggleLike(): void {
  //   if (this.isLiked) {
  //     this.likesCount--;
  //   } else {
  //     this.likesCount++;
  //   }
  //   this.isLiked = !this.isLiked;
  // }

}
