import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateHotelComponent } from './create-hotel/create-hotel.component';
import { EditHotelComponent } from './edit-hotel/edit-hotel.component';
import { HotelRoutingModule } from './hotel-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';



@NgModule({
  declarations: [
    CreateHotelComponent,
    EditHotelComponent,
    HotelDetailsComponent
  ],
  imports: [
    CommonModule,
    HotelRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class HotelModule { }
