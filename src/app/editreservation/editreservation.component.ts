import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Reservation } from 'src/Modeles/Reservation';
import { ReservationService } from 'src/Services/reservation.service';

@Component({
  selector: 'app-editreservation',
  templateUrl: './editreservation.component.html',
  styleUrls: ['./editreservation.component.css']
})
export class EditreservationComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private reservationService: ReservationService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<EditreservationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { reservation: Reservation }
  ) {}

  ngOnInit(): void {
    if (this.data.reservation) {
      this.form = this.fb.group({
        id: [this.data.reservation.id, Validators.required],
        nom: [this.data.reservation.nom, Validators.required],
        prenom: [this.data.reservation.prenom, Validators.required],
        numtel: [this.data.reservation.numtel, Validators.required],
        dateArrivee: [this.formatDate(this.data.reservation.dateArrivee), Validators.required],
        dateDepart: [this.formatDate(this.data.reservation.dateDepart), Validators.required],
        typeChambre: [this.data.reservation.typeChambre, Validators.required]
      });
    }
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  save(): void {
    if (this.form.valid) {
      this.reservationService.updateReservation(this.data.reservation.id.toString(), this.form.value).subscribe(() => {
        this.toastr.success('Reservation updated successfully', 'Success');
        this.dialogRef.close(true); // Close the dialog and pass a success flag
      }, error => {
        this.toastr.error('Failed to update reservation', 'Error');
      });
    } else {
      this.toastr.error('Please fill in all fields', 'Error');
    }
  }

  closeEdit(): void {
    this.dialogRef.close(); // Close the dialog without saving
  }
}