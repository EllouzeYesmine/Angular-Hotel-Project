import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Reservation } from 'src/Modeles/Reservation';
import { ReservationService } from 'src/Services/reservation.service';
import {EditreservationComponent} from '../editreservation/editreservation.component'
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-reservation-liste',
  templateUrl: './reservation-liste.component.html',
  styleUrls: ['./reservation-liste.component.css']
})
export class ReservationListeComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nom', 'prenom', 'numtel', 'dateArrivee', 'dateDepart', 'typeChambre', 'actions'];
  dataSource: Reservation[] = [];
  selectedReservation: Reservation | null = null;

  constructor(
    private reservationService: ReservationService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.reservationService.getReservations().subscribe((reservations) => {
      console.log(reservations); // Log the fetched data
      this.dataSource = reservations;
    }, error => {
      this.toastr.error('Failed to load reservations', 'Error');
    });
  }

  deleteReservation(id: number): void {
    this.reservationService.deleteReservation(id.toString()).subscribe(() => {
      this.toastr.success('Reservation deleted successfully', 'Success');
      this.loadReservations(); // Reload the list
    }, error => {
      this.toastr.error('Failed to delete reservation', 'Error');
    });
  }

  editReservation(reservation: Reservation): void {
    const dialogRef = this.dialog.open(EditreservationComponent, {
      width: '400px',
      data: { reservation } // Pass the reservation data to the dialog
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadReservations(); // Reload the reservations if any changes were made
      }
    });
  }
}