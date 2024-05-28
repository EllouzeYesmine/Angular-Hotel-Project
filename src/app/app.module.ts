import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChambresComponent } from './chambres/chambres.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccueilComponent } from './accueil/accueil.component';
import { RouterLink } from '@angular/router';
import { DetailsChambreComponent } from './details-chambre/details-chambre.component';
import { TestComponent } from './test/test.component';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import { FirebaseModule } from './Firebase.module';
import { LoginComponent } from './login/login.component';
import { ReservationComponent } from './reservation/reservation.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ChambreformComponent } from './chambreform/chambreform.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
  
    ChambresComponent,
    NavbarComponent,
    AccueilComponent,
    DetailsChambreComponent,
    TestComponent,
    LoginComponent,
    ReservationComponent,
    DashboardComponent,
    ChambreformComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterLink,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule,
    FirebaseModule,
    MatFormFieldModule,
    MatDialogModule,
    FormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
