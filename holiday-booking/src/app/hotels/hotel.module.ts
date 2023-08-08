import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateHotelComponent } from './create-hotel/create-hotel.component';
import { EditHotelComponent } from './edit-hotel/edit-hotel.component';
import { HotelRoutingModule } from './hotel-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CreateHotelComponent,
    EditHotelComponent
  ],
  imports: [
    CommonModule,
    HotelRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class HotelModule { }
