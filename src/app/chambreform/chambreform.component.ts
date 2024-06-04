import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Chambre } from 'src/Modeles/Chambre';
import { ChambreService } from 'src/Services/chambre.service';

@Component({
  selector: 'app-chambreform',
  templateUrl: './chambreform.component.html',
  styleUrls: ['./chambreform.component.css']
})
export class ChambreformComponent implements OnInit {
  form!: FormGroup;
  chambre!: Chambre;
  id!: string;
  numero!: Int16Array;
  type!: string;
  prix!: Int16Array;
  image!: string;
  description!: string;

  constructor(
    private CS: ChambreService,
    private route: Router,
    private dialogRef: MatDialogRef<ChambreformComponent>,
    private toast: ToastrService,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.chambre = data;
    this.id = data.id;
    this.numero = data.numero;
    this.type = data.type;
    this.prix = data.prix;
    this.image = data.image;
    this.description = data.description;
  }

  ngOnInit(): void {
    this.initFrom();
  }

  initFrom(): void {
    this.form = new FormGroup({
      numero: new FormControl(this.numero, [Validators.required]),
      type: new FormControl(this.type, [Validators.required]),
      prix: new FormControl(this.prix, [Validators.required]),
      image: new FormControl(this.image, [Validators.required]),
      description: new FormControl(this.description, [Validators.required]),
      available: new FormControl(true)
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.id) {
      this.CS.editChambre(this.id, this.form.value).subscribe(
        () => {
          this.dialogRef.close();
          this.toast.success('Chambre modifiée avec succès');
          this.route.navigate(['/chambres']);
        },
        error => {
          this.toast.error('Erreur lors de la modification de la chambre');
        }
      );
    } else {
      const newChambre = this.form.value;
      newChambre.available = true; // Set available to true when creating a new Chambre
      this.CS.createChambre(newChambre).subscribe(
        () => {
          this.dialogRef.close();
          this.toast.success('Chambre créée avec succès');
          this.route.navigate(['/chambres']);
        },
        error => {
          this.toast.error('Erreur lors de la création de la chambre');
        }
      );
    }
  }
}
