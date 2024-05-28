import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-chambreform',
  templateUrl: './chambreform.component.html',
  styleUrls: ['./chambreform.component.css']
})
export class ChambreformComponent {
  form!: FormGroup ;
}
