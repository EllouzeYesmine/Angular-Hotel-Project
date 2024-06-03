import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-type-chambre',
  templateUrl: './type-chambre.component.html',
  styleUrls: ['./type-chambre.component.css']
})
export class TypeChambreComponent {
  roomTypes = ['Single', 'Double', 'Suite'];
  selectedRoomType!: string;

  constructor(private router: Router) {}

  onSubmit() {
    this.router.navigate(['/reservation', this.selectedRoomType]);
  }
}
