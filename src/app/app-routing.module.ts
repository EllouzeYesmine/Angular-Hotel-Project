import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChambresComponent } from './chambres/chambres.component';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { DetailsChambreComponent } from './details-chambre/details-chambre.component';
import { LoginComponent } from './login/login.component';
import { ReservationComponent } from './reservation/reservation.component';
import { TypeChambreComponent } from './type-chambre/type-chambre.component';
import { SuiteReservationComponent } from './suite-reservation/suite-reservation.component';
import { ListChambreComponent } from './list-chambre/list-chambre.component';
import { ConfirmReservationComponent } from './confirm-reservation/confirm-reservation.component';

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
  path:'reservation/:type',
  pathMatch:'full',
  component:ReservationComponent
},
{
  path:'confirmReservation/:id/:idChambre',
  pathMatch:'full',
  component:ConfirmReservationComponent
},
 {
    path:'accueil',
    pathMatch:'full',
    component:AccueilComponent
 },
 {
  path:'listeChambre',
  pathMatch:'full',
  component:ListChambreComponent
},
{
  path:'details/:id/:idChambre',
  pathMatch:'full',
  component:DetailsChambreComponent
},
// {
//   path:'details/:id',
//   pathMatch:'full',
//   component:DetailsChambreComponent
// },
{ 
  path: 'suiteReservation/:id/:type', 
  component: SuiteReservationComponent 
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
