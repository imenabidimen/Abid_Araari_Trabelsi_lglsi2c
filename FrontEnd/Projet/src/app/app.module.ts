import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SocialPCComponent } from './social-pc/social-pc.component';
import { SocialMobileComponent } from './social-mobile/social-mobile.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { MenuClientComponent } from './menu-client/menu-client.component';
import { MenuChefComponent } from './menu-chef/menu-chef.component';
import { HttpClientModule } from '@angular/common/http';
import { ContactComponent } from './contact/contact.component';
import { Menu1Component } from './menu1/menu1.component';
import { SignupComponent } from './signup/signup.component';
import { AdminComponent } from './admin/admin.component';
import { MenuTunisianComponent } from './menu-tunisian/menu-tunisian.component';
import { MenuItalianComponent } from './menu-italian/menu-italian.component';
import { MenuDessertComponent } from './menu-dessert/menu-dessert.component';
import { MenuAsianComponent } from './menu-asian/menu-asian.component';
import { MenuFrenchComponent } from './menu-french/menu-french.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SocialPCComponent,
    SocialMobileComponent,
    AboutComponent,
    LoginComponent,
    MenuClientComponent,
    MenuChefComponent,
    MenuComponent,
    ContactComponent,
    Menu1Component,
    SignupComponent,
    AdminComponent,
    MenuTunisianComponent,
    MenuItalianComponent,
    MenuDessertComponent,
    MenuAsianComponent,
    MenuFrenchComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
