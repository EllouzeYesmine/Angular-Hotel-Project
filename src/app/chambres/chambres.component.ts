import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChambreService } from 'src/Services/chambre.service';
import { ChambreformComponent } from '../chambreform/chambreform.component';
import { Chambre } from 'src/Modeles/Chambre';
import { MatTableDataSource } from '@angular/material/table';
import { ViewComponent } from '../view/view.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-chambres',
  templateUrl: './chambres.component.html',
  styleUrls: ['./chambres.component.css']
})
export class ChambresComponent implements OnInit {
  displayedColumns: string[] = ['1', '2', '3', '4', '5', '6', '7'];
  dataSource!: MatTableDataSource<Chambre>;

  constructor(private CS: ChambreService, private dialog: MatDialog, private toastr: ToastrService) {
    this.getAllChambres();
  }

  chambres: Chambre[] = [];
  
  ngOnInit(): void {
    this.getAllChambres();
  }

  getAllChambres(): void {
    this.CS.getChambres().subscribe((res) => {
      this.chambres = res;
      this.dataSource = new MatTableDataSource<Chambre>(this.chambres);
    }, error => {
      this.toastr.error('Failed to load chambres', 'Error');
    });
  }

  openAddDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '700px';
    dialogConfig.height = '650px';
    dialogConfig.data = {
      id: '',
      numero: '',
      type: 'Chambre Simple',
      prix: '',
      image: '',
      description: '',
    };

    const dialogRef = this.dialog.open(ChambreformComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.CS.createChambre(result).subscribe(() => {
          this.getAllChambres();
          this.toastr.success('Chambre created successfully', 'Success');
        }, error => {
          this.toastr.error('Failed to create chambre', 'Error');
        });
      }
    });
  }

  selectedElement?: Chambre;

  openEditDialog(element: Chambre): void {
    this.selectedElement = element;
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '700px';
    dialogConfig.height = '650px';

    dialogConfig.data = {
      id: this.selectedElement.id,
      numero: this.selectedElement.numero,
      type: this.selectedElement.type,
      prix: this.selectedElement.prix,
      image: this.selectedElement.image,
      description: this.selectedElement.description,
    };

    const dialogRef = this.dialog.open(ChambreformComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.CS.editChambre(this.selectedElement!.id, result).subscribe(() => {
          this.getAllChambres();
          this.toastr.success('Chambre updated successfully', 'Success');
        }, error => {
          this.toastr.error('Failed to update chambre', 'Error');
        });
      }
    });
  }

  delete(id: string): void {
    this.CS.deleteChambre(id).subscribe(() => {
      this.getChambres();
      this.toastr.success('Chambre deleted successfully', 'Success');
    }, error => {
      this.toastr.error('Failed to delete chambre', 'Error');
    });
  }

  getChambres(): void {
    this.CS.getChambres().subscribe((r) => {
      this.dataSource = new MatTableDataSource<Chambre>(r);
    }, error => {
      this.toastr.error('Failed to load chambres', 'Error');
    });
  }

  view(element: Chambre): void {
    this.selectedElement = element;
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    dialogConfig.height = '400px';

    const dialogRef = this.dialog.open(ViewComponent, dialogConfig);
  }

  viewChambre(chambre: Chambre): void {
    this.dialog.open(ViewComponent, {
      data: chambre
    });
  }
}
