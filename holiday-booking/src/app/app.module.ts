import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { CardComponent } from './card/card.component';
import { FooterComponent } from './footer/footer.component';
import { CatalogComponent } from './catalog/catalog.component';
import { UserModule } from './user/user.module';
import { HttpClientModule } from '@angular/common/http';
import { UserRoutingModule } from './user/user-routing.module';
import { UserService } from './user/user.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigationComponent,
    HomeComponent,
    CardComponent,
    FooterComponent,
    CatalogComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserRoutingModule,
    UserModule,
    HttpClientModule,
  ],
  providers: [ UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
