import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/Services/reservation.service';
import { ChambreService } from 'src/Services/chambre.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  typechambre = this.route.snapshot.paramMap.get('type');
  reservationForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private reservationService: ReservationService,
    private chambreService: ChambreService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.reservationForm = this.fb.group({
      id: [Math.ceil(Math.random() * 1000)],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      numtel: ['', Validators.required],
      datearrivee: ['', Validators.required],
      datedepart: ['', Validators.required],
      typechambre: [this.typechambre, Validators.required]
    });
  }

  onSubmit(): void {
    const id = this.reservationForm.value.id;
    const roomType = this.reservationForm.value.typechambre;

    if (this.reservationForm.valid) {
      this.reservationService.createReservation(this.reservationForm.value).subscribe(
        response => {
          console.log('Reservation created successfully', response);
          this.updateChambreAvailability(roomType);
          this.router.navigate(['/suiteReservation', id, roomType]);
        },
        error => {
          console.error('Error creating reservation', error);
        }
      );
    }
  }

  updateChambreAvailability(typechambre: string): void {
    this.chambreService.getAllChambres().subscribe((chambres) => {
      const chambre = chambres.find(c => c.type === typechambre && c.available);
      if (chambre) {
        chambre.available = false;
        this.chambreService.editChambre(chambre.id, chambre).subscribe(() => {
          console.log('Chambre availability updated');
        });
      }
    });
  }
}
