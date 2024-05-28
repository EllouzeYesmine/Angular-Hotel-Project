import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChambreService } from 'src/Services/chambre.service';
import { ChambreformComponent } from '../chambreform/chambreform.component';

@Component({
  selector: 'app-chambres',
  templateUrl: './chambres.component.html',
  styleUrls: ['./chambres.component.css']
})
export class ChambresComponent {
chambres:any[]=[];
constructor(private CS:ChambreService, private dialog: MatDialog){
  this.CS.getChambres().subscribe((res:any)=>{
    this.chambres=res;
  
  });
}
open() {

  const dialogConfig = new MatDialogConfig();

  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;

  this.dialog.open(ChambreformComponent, dialogConfig);
  
}
}
