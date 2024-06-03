import { Component } from '@angular/core';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent {
  image:string='https://miradorpalace.com/wp-content/uploads/2017/07/single2.jpg';
  type:string='Simple';
  image1:string='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgyytDK6viV3M57-M58aCAeTbKfOVglMcvBDGKqwkzvfKxsCfGeRJ0NyotXmQqIWn590c&usqp=CAU';
  type1:string='Double';
  image2:string='https://ceramic-paris-hotel.com/_novaimg/galleria/1463904.jpg';
  type2:string='Triple';
  image3:string='https://www.dauphinquebec.com/wp-content/uploads/sites/4/2015/12/DSC_2284RS.jpg';
  type3:string='Familiale';
}
