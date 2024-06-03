import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/Services/reservation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit{
  typechambre = this.route.snapshot.paramMap.get('type');
  reservationForm!:FormGroup;
  constructor(
    private fb: FormBuilder, 
    private reservationService: ReservationService,
    private router:Router,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.reservationForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      numtel: ['', Validators.required],
      datearrivee: ['', Validators.required],
      datedepart: ['', Validators.required],
      typechambre: [this.typechambre, Validators.required] // Valeur par défaut
    });
  }
  


  
  onSubmit(): void {
    const roomType = this.reservationForm.value.typechambre;
    if (this.reservationForm.valid) {
      this.reservationService.createReservation(this.reservationForm.value).subscribe(
        response => {
          console.log('Reservation created successfully', response);
          // this.router.navigate(['/suiteReservation/:type']); 
          this.router.navigate(['/suiteReservation', roomType]); 
        },
        error => {
          console.error('Error creating reservation', error);
        }
      );
    }
  }
}
