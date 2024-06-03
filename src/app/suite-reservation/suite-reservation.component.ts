import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Chambre } from 'src/Modeles/Chambre';
import { ChambreService } from 'src/Services/chambre.service';
import { ReservationService } from 'src/Services/reservation.service';

@Component({
  selector: 'app-suite-reservation',
  templateUrl: './suite-reservation.component.html',
  styleUrls: ['./suite-reservation.component.css']
})
export class SuiteReservationComponent implements OnInit{
  constructor(private CS: ChambreService,private route:ActivatedRoute) {}
  availableRooms: Chambre[] = [];
  roomType!: any; // Définissez votre type de chambre souhaité
  
  subscription!: Subscription;
  ngOnInit(): void {
    this.roomType = this.route.snapshot.paramMap.get('type');
    console.log(this.roomType);
    this.subscription = this.CS.getChambres().subscribe({
      next: (chambres) => {
        this.availableRooms = chambres.filter(room => room.type === this.roomType);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des chambres disponibles:', this.roomType);
      }
    });
  }
  



  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}