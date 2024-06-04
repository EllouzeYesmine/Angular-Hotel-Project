import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChambreService } from 'src/Services/chambre.service';

@Component({
  selector: 'app-details-chambre',
  templateUrl: './details-chambre.component.html',
  styleUrls: ['./details-chambre.component.css']
})
export class DetailsChambreComponent implements OnInit{
  idReservation:any;
  chambre!:any;

  isLoadinig:boolean=false;
  loadingTitle:string='';
  error:any=[];
  constructor(private route:ActivatedRoute,private CS:ChambreService){}
  ngOnInit() {
    this.idReservation = this.route.snapshot.paramMap.get('id');
    
    const id = this.route.snapshot.paramMap.get('idChambre')!;
    this.CS.getChambreById(id).subscribe(data => {
      this.chambre = data;
    });
  }
}
