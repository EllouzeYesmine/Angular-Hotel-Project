import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isThisYear } from 'date-fns';
import { Subscription } from 'rxjs';
import { Chambre } from 'src/Modeles/Chambre';
import { Reservation } from 'src/Modeles/Reservation';
import { ChambreService } from 'src/Services/chambre.service';
import { ReservationService } from 'src/Services/reservation.service';

@Component({
  selector: 'app-confirm-reservation',
  templateUrl: './confirm-reservation.component.html',
  styleUrls: ['./confirm-reservation.component.css']
})
export class ConfirmReservationComponent  implements OnInit{
  constructor(
    private CS: ChambreService,
    private route:ActivatedRoute,
    private RS:ReservationService
   ) {}
  availableRooms: Chambre[] = [];
  reservation:any;
  roomId!: any; // Définissez votre type de chambre souhaité
  
  idReservation :any;
  
  ngOnInit(): void {
    // this.roomId = this.route.snapshot.paramMap.get('idchambre');

    // console.log(this.roomId);
    // this.subscription = this.RS.getReservation().subscribe({
    //   next: (reservations) => {
    //     this.reservation = reservations.filter(res => res.idChambre === this.roomId);

    //   },
    //   if(this.reservation.datearrivee>isThisYear)
    //   error: (error) => {
    //     console.error('Erreur lors de la récupération des chambres disponibles:', this.roomId);
    //   }
    // });
   
    this.idReservation= this.route.snapshot.paramMap.get('id');
    this.roomId= this.route.snapshot.paramMap.get('idChambre');

    this.RS.getReservationById(this.idReservation).subscribe(data => {
      this.reservation = data;
    });
    this.reservation.idchambre = this.roomId;

  }
  



  
}