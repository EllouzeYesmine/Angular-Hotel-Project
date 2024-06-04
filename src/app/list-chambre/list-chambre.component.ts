import { Component, OnInit } from '@angular/core';
import { ChambreformComponent } from '../chambreform/chambreform.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChambreService } from 'src/Services/chambre.service';
import { Chambre } from 'src/Modeles/Chambre';

@Component({
  selector: 'app-list-chambre',
  templateUrl: './list-chambre.component.html',
  styleUrls: ['./list-chambre.component.css']
})
export class ListChambreComponent implements OnInit {
  chambres: Chambre[] = [];

  constructor(private CS: ChambreService, private dialog: MatDialog) {
    this.CS.getChambres().subscribe((res: Chambre[]) => {
      // Filter rooms where available is true
      this.chambres = res.filter(room => room.available === true);
    });
  }

  ngOnInit(): void {}

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