import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateHotelComponent } from './create-hotel/create-hotel.component';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';
import { EditHotelComponent } from './edit-hotel/edit-hotel.component';

const routes: Routes = [
  {
    path: 'create-hotel',
    component: CreateHotelComponent,
  },
  {
    path: ':id',
    component: HotelDetailsComponent,
  },
  {
    path: 'edit-hotel/:id',
    component: EditHotelComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HotelRoutingModule {}