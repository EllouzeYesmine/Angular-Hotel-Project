import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ChambreService } from 'src/Services/chambre.service';
import { ChambreformComponent } from '../chambreform/chambreform.component';
import { Chambre } from 'src/Modeles/Chambre';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ViewComponent } from '../view/view.component';

@Component({
  selector: 'app-chambres',
  templateUrl: './chambres.component.html',
  styleUrls: ['./chambres.component.css']
})
export class ChambresComponent implements OnInit{
  displayedColumns: string[] = ['1', '2', '3', '4', '5','6','7'];
  dataSource!:MatTableDataSource<Chambre>;
  
constructor(private CS:ChambreService, private dialog: MatDialog){
  this.getAllChambres();
}
// constructor(private CS:ChambreService, private dialog: MatDialog){
//   this.CS.getChambres().subscribe((res:any)=>{
//     this.chambres=res;
  
//   });
// }
chambres:Chambre[]=[];
ngOnInit(): void {
    this.getAllChambres();
}
getAllChambres(): void {
  this.CS.getChambres().subscribe((res) => {
   this.chambres=res;
   this.dataSource = new MatTableDataSource<any>(this.chambres);
  });
}
// selectedElement?:Chambre
// openDialog(element: Chambre):void {
//   this.selectedElement=element;
//   const dialogConfig = new MatDialogConfig();

//   dialogConfig.disableClose = true;
//   dialogConfig.autoFocus = true;

//   dialogConfig.data = {
//     id: this.selectedElement.id,
//     numero: this.selectedElement.numero,
//     type:this.selectedElement.type,
//     prix: this.selectedElement.prix,
//     image: this.selectedElement.image,
//     description: this.selectedElement.description,

//   };

//   this.dialog.open(ChambreformComponent, dialogConfig);

//   const dialogRef = this.dialog.open(ChambreformComponent, dialogConfig);

//   dialogRef
//     .afterClosed()
//     .subscribe((data) => console.log('Dialog output:', data));
// }

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
      this.CS.onsave(result).subscribe(() => {
        this.getAllChambres();
      });
    }
  });
}
// selectedElement?: Chambre;

// openEditDialog(element: Chambre): void {
//   this.selectedElement = element;
//   const dialogConfig = new MatDialogConfig();

//   dialogConfig.disableClose = true;
//   dialogConfig.autoFocus = true;
//   dialogConfig.width = '700px'; // Ajout d'une largeur
//   dialogConfig.height = '650px'; // Ajout d'une hauteur

//   dialogConfig.data = {
//     id: this.selectedElement.id,
//     numero: this.selectedElement.numero,
//     type: this.selectedElement.type,
//     prix: this.selectedElement.prix,
//     image: this.selectedElement.image,
//     description: this.selectedElement.description,
//   };

//   const dialogRef = this.dialog.open(ChambreformComponent, dialogConfig);

//   dialogRef.afterClosed().subscribe(result => {
//     if (result) {
//       this.CS.onsave(result).subscribe(() => {
//         // Mise à jour de la liste des chambres après sauvegarde
//         this.getAllChambres();
//       });
//     }
//   });
// }

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
      this.CS.onsave(result).subscribe(() => {
        this.getAllChambres();
      });
    }
  });
}



delete(id:string):void
{
this.CS.ondelete(id).subscribe(()=>{
this.getChambres() // pour envoyer une requete à serveur en mode Get et
//recuperer le contenu de la base mis à jour
})
}
// déjà programmé dans le tp précedant :
getChambres ()
{
this.CS.getChambres().subscribe((r)=>{
this.dataSource =new MatTableDataSource<Chambre>(r)
})


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
viewChambre(chambre:Chambre): void {
  this.dialog.open(ViewComponent, {
    data: chambre
  });
}

}