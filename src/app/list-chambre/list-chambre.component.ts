import { Component } from '@angular/core';
import { ChambreformComponent } from '../chambreform/chambreform.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChambreService } from 'src/Services/chambre.service';

@Component({
  selector: 'app-list-chambre',
  templateUrl: './list-chambre.component.html',
  styleUrls: ['./list-chambre.component.css']
})
export class ListChambreComponent {

  chambres:any[]=[];
  constructor(private CS:ChambreService, private dialog: MatDialog){
    this.CS.getChambres().subscribe((res:any)=>{
      this.chambres=res;
    
    });
  }
  open() {
  
    const dialogConfig = new MatDialogConfig();
  
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '700px';
    dialogConfig.height = '650px';
    dialogConfig.data = {
      id: '',
      numero: '',
      type: '',
      prix: '',
      image: '',
      description: '',
    };
    this.dialog.open(ChambreformComponent, dialogConfig);
    
  }
  }
  
  
