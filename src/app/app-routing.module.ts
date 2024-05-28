import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChambresComponent } from './chambres/chambres.component';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { DetailsChambreComponent } from './details-chambre/details-chambre.component';
import { LoginComponent } from './login/login.component';
import { ReservationComponent } from './reservation/reservation.component';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:'accueil'
  },
  {
    path: 'login',
    pathMatch:'full',
    component:LoginComponent,
  },
  {
    path:'chambres',
    pathMatch:'full',
    component:ChambresComponent
},
{
  path:'reservation',
  pathMatch:'full',
  component:ReservationComponent
},
 {
    path:'accueil',
    pathMatch:'full',
    component:AccueilComponent
 },
{
  path:'details/:id',
  pathMatch:'full',
  component:DetailsChambreComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
