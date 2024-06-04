import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
export class SuiteReservationComponent implements OnInit, OnDestroy {
  availableRooms: Chambre[] = [];
  roomType!: string;
  reservations: Reservation[] = [];
  reservationId!: string | null;
  reservation!: Reservation;
  subscriptions: Subscription[] = [];

  constructor(
    private chambreService: ChambreService,
    private route: ActivatedRoute,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    this.reservationId = this.route.snapshot.paramMap.get('id');
    this.roomType = this.route.snapshot.paramMap.get('type') || '';

    if (this.reservationId) {
      const reservationSub = this.reservationService.getReservationById(this.reservationId).subscribe(data => {
        this.reservation = data;
      });
      this.subscriptions.push(reservationSub);
    }

    const reservationsSub = this.reservationService.getReservations().subscribe(data => {
      this.reservations = data;
    });
    this.subscriptions.push(reservationsSub);

    const chambresSub = this.chambreService.getChambres().subscribe({
      next: (chambres) => {
        this.availableRooms = chambres.filter(room => room.type === this.roomType);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des chambres disponibles:', error);
      }
    });
    this.subscriptions.push(chambresSub);
  }

  isRoomReserved(idChambre: string, dateArrivee: Date, dateDepart: Date): boolean {
    return this.reservations.some(reservation =>
      reservation.idChambre === idChambre &&
      (
        (dateArrivee >= reservation.dateArrivee && dateArrivee < reservation.dateDepart) ||
        (dateDepart > reservation.dateArrivee && dateDepart <= reservation.dateDepart) ||
        (dateArrivee <= reservation.dateArrivee && dateDepart >= reservation.dateDepart)
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
