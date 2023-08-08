import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateHotelComponent } from './create-hotel/create-hotel.component';

const routes: Routes = [
  {
    path: 'create-hotel',
    component: CreateHotelComponent,
  },
//   {
//     path: 'register',
//     component: RegisterComponent,
//   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HotelRoutingModule {}