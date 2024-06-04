import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Chambre } from 'src/Modeles/Chambre';
import { ChambreService } from 'src/Services/chambre.service';

@Component({
  selector: 'app-details-chambre',
  templateUrl: './details-chambre.component.html',
  styleUrls: ['./details-chambre.component.css']
})
export class DetailsChambreComponent implements OnInit {
  chambre!: any[]
  idReservation: string | null = null;
  isLoading: boolean = false;
  error: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chambreService: ChambreService
  ) {}

  ngOnInit(): void {
    const chambreId = this.route.snapshot.paramMap.get('id');
    
    if (chambreId) {
      this.isLoading = true;
      this.chambreService.getChambreById(chambreId)
        .pipe(
          catchError((error) => {
            this.error = error;
            this.isLoading = false;
            return throwError(error);
          })
        )
        .subscribe((data) => {
          this.chambre = data;
          console.log(data);
          
          this.isLoading = false;
        });
    }
  }

  goBack(): void {
    if (this.idReservation) {
      this.router.navigate(['/suiteReservation', this.idReservation]);
    } else {
      this.router.navigate(['/']); // Redirect to homepage or wherever appropriate
    }
  }
}