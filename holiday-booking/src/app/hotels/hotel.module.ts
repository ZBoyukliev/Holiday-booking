import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateHotelComponent } from './create-hotel/create-hotel.component';
import { EditHotelComponent } from './edit-hotel/edit-hotel.component';



@NgModule({
  declarations: [
    CreateHotelComponent,
    EditHotelComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HotelModule { }
