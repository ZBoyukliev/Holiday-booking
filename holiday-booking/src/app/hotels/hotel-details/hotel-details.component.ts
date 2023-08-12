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
   console.log('default');
   
    this.route.params.subscribe(params => {
      this.hotelId = params['id'];
      this.likesService.getAllLikes().subscribe({
        next: (data) => {
          this.likes = data;
          console.log('Get all likes');
          
        }
      })

      if (this.hotelId !== null) {
        this.getHotelDetails(this.hotelId);
        console.log('Go to details page');

      }
    });

    this.likesService.getLikesByHotelId(this.hotelId!).subscribe({
      next: (data) => {
        this.likesCount = data
        console.log('get likes count by id');
        
      }
    })

    this.likesService.getMyLikeByHotelId(this.hotelId!, this.userService.userId!).subscribe({
      next: (data) => {
        data === 0 ? this.isLiked = false : this.isLiked = true;
        console.log('Get My likes by hotelId && userId', data);
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
      next: (data) => {
        console.log(data)
        this.isLiked = true;
        this.likesCount++;
      },
      error: (error) => {
        console.error('Error liking hotel:', error);
      }
    });
    this.likesService.getAllLikes().subscribe({
      next: (data) => {
        console.log('data: ', data);
        this.likes = data;
      }
    })
    
  }
  dislikeHotel(): void {
    const like = this.likes.find(
      (like: any) => like._ownerId === this.userService.userId && like.hotelId === this.hotelId
    );
  
    if (like) {
      this.likesService.dislikeHotel(like._id).subscribe({
        next: () => {
          this.isLiked = false;
          this.likesCount--;
          
          this.likes = this.likes.filter((l: any) => l !== like);
        },
        error: (error) => {
          console.error('Error disliking hotel:', error);
        }
      });
    }
  }
  
  // dislikeHotel(): void {
    
  //   const like = this.likes.find((like:any) => like._ownerId === this.userService.userId && like.hotelId === this.hotelId);
  //   console.log(like);
    
  //   if(like) {
  //     this.likesService.dislikeHotel(like._id).subscribe({
  //       next: () => {
  //         this.isLiked = false;
  //         this.likesCount--;
  //       },
  //       error: (error) => {
  //         console.error('Error disliking hotel:', error);
  //       }
  //     });
  //   }
  // }
  
}
