import { Component } from '@angular/core';
import { ChambreService } from 'src/Services/chambre.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  data:any[]=[];
  constructor(private CS:ChambreService){
    this.CS.getChambres().subscribe((res:any)=>{
      this.data=res;
    
    });
  }
  
}
