import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { HotelService } from '../hotel.service';

@Component({
  selector: 'app-create-hotel',
  templateUrl: './create-hotel.component.html',
  styleUrls: ['./create-hotel.component.scss']
})
export class CreateHotelComponent implements OnInit {
  @ViewChild('createHotelForm') newHotelForm: NgForm | undefined;

  constructor(
    private userService: UserService,
    private router: Router,
    private hotelService: HotelService,
  ) { }

  onHotelCreateSubmitHandler(): void {
    if (!this.newHotelForm) return;

    const form = this.newHotelForm;

    if (form.invalid) {
      return;
    }

    if (!localStorage.getItem('accessToken')) {
      this.userService.isLoggedIn = false;
      this.userService.clearToken();
      this.userService.showMessage('Login session expired!');
      this.userService.username = null;
      this.router.navigate(['/']);
    }

    let submitData: { hotelName: string; imageUrl: string; description: string , price: number} =
      form.value;

    this.hotelService.createHotel(submitData).subscribe({
      next: (response) => {
        this.router.navigate([`/catalog`]);
        this.userService.showMessage('Posted successfully!');
      },
      error: (error) => {
        this.userService.showMessage(error.error.message);
      },
    });

  }
  ngOnInit(): void {
    if (!localStorage.getItem('accessToken')) {
      this.userService.isLoggedIn = false;
      this.router.navigate(['/']);
    }
  }
}
