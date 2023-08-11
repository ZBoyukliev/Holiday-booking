import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CatalogComponent } from './catalog/catalog.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './guards/authGuard';
import { AuthenticatedGuard } from './guards/authActive';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent },
  { path: 'catalog', component: CatalogComponent },
  {
    path: 'users',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule), 
    canActivate: [AuthenticatedGuard],

  },
  {
    path: 'hotels',
    loadChildren: () => import('./hotels/hotel.module').then((m) => m.HotelModule), 
    canActivate: [AuthGuard],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



