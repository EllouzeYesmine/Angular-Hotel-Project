import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Chambre } from 'src/Modeles/Chambre';
import { Reservation } from 'src/Modeles/Reservation';
import { ChambreService } from 'src/Services/chambre.service';
import { ReservationService } from 'src/Services/reservation.service';

@Component({
  selector: 'app-suite-reservation',
  templateUrl: './suite-reservation.component.html',
  styleUrls: ['./suite-reservation.component.css']
})
export class SuiteReservationComponent implements OnInit{
  constructor(private CS: ChambreService,private route:ActivatedRoute,private RS:ReservationService) {}
  availableRooms: Chambre[] = [];
  roomType!: any; // Définissez votre type de chambre souhaité
  listeReservation:Reservation[]=[];
  listeeser!: Subscription;
  subscription!: Subscription;
  idReservation :any
  subscription1!: Subscription;
  reservation:any;

  ngOnInit(): void {
    this.idReservation = this.route.snapshot.paramMap.get('id');
    this.RS.getReservation().subscribe(data => {
      this.listeReservation= data;
      
    });

    this.RS.getReservationById(this.idReservation).subscribe(data => {
      this.reservation = data;
    });


    console.log("ttttttttttttt",this.idReservation)





    this.roomType = this.route.snapshot.paramMap.get('type');
    
    this.subscription1=this.RS.getReservation().subscribe({
      next: (chambres) => {
        this.reservation = chambres.filter(res => res.id === this.idReservation);
      }});



    this.subscription = this.CS.getChambres().subscribe({
      next: (chambres) => {
        this.availableRooms = chambres.filter(room => room.type === this.roomType );
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des chambres disponibles:', this.roomType);
      }
    });
    


  }
  
  isRoomReserved(idchambre: string, datearrivee: Date, datedepart: Date): boolean {
    return this.listeReservation.some(reservation =>reservation.idChambre != idchambre ||
      reservation.idChambre === idchambre &&
      ((datearrivee >= reservation.datearrivee && datearrivee < reservation.datedepart) ||
       (datedepart > reservation.datearrivee && datedepart <= reservation.datedepart) ||
       (datearrivee <= reservation.datearrivee && datedepart >= reservation.datedepart))
    );
  }


  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}