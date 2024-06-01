import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Chambre } from 'src/Modeles/Chambre';
import { ChambreService } from 'src/Services/chambre.service';

@Component({
  selector: 'app-chambreform',
  templateUrl: './chambreform.component.html',
  styleUrls: ['./chambreform.component.css']
})
export class ChambreformComponent implements OnInit{
  form!: FormGroup ;
  chambre!:Chambre;
  id!:string;
  numero!:Int16Array;
  type!:string;
  prix!:Int16Array;
  image!:string;
  description!:string;
  
  constructor(
    private CS:ChambreService,
    private route:Router,
    private dialogRef:MatDialogRef<ChambreformComponent>,
    @Inject (MAT_DIALOG_DATA) data:any) 
    {
      this.chambre=data;
      this.id=data.id;
      this.numero=data.numero;
      this.type=data.type;
      this.prix=data.prix;
      this.image=data.image;
      this.description=data.description;
      }

  ngOnInit(): void {
      this.initFrom();
  }
  initFrom():void{
  
    this.form=new FormGroup({
    numero:new FormControl(this.numero,[Validators.required]),
    type:new FormControl(this.type,[Validators.required]),
    prix:new FormControl(this.prix,[Validators.required]),
    image:new FormControl(this.image,[Validators.required]),
    description:new FormControl(this.description,[Validators.required]),
    })}
  close(){
    this.dialogRef.close();
  }
  save(): void {
    if (this.id) {
      this.CS.editChambre(this.id, this.form.value).subscribe(() => {
      this.dialogRef.close();
        this.route.navigate(['/chambres']);
      });
    } else {
      this.dialogRef.close(this.form.value);
    }
  }
 

}

