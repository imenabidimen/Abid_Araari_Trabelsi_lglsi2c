import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MenuClientComponent } from './menu-client/menu-client.component';
import { MenuChefComponent } from './menu-chef/menu-chef.component';
import { MenuComponent } from './menu/menu.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { Menu1Component } from './menu1/menu1.component';
import { SignupComponent } from './signup/signup.component';
import { AdminComponent } from './admin/admin.component';
import { MenuTunisianComponent } from './menu-tunisian/menu-tunisian.component';
import { MenuDessertComponent } from './menu-dessert/menu-dessert.component';
import { MenuAsianComponent } from './menu-asian/menu-asian.component';
import { MenuFrenchComponent } from './menu-french/menu-french.component';
import { MenuItalianComponent } from './menu-italian/menu-italian.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'mClient', component:  MenuClientComponent },
  { path: 'mChef', component:   MenuChefComponent },
  { path: 'menu', component: MenuComponent  },
  { path: 'about', component: AboutComponent   },
  { path: 'contact', component:ContactComponent  },
  { path: 'menu1', component:Menu1Component },
  { path: 'signup', component:SignupComponent },
  { path: 'admin', component:AdminComponent },
  { path: 'menuT',  component:MenuTunisianComponent},
  { path: 'menuA', component:MenuAsianComponent },
  { path: 'menuD', component:MenuDessertComponent },
  { path: 'menuI', component:MenuItalianComponent  },
  { path: 'menuF',  component:MenuFrenchComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
