import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChambreService {

  constructor(private http:HttpClient) { }
  getChambres(){
    return this.http.get('http://localhost:3000/chambres')
  }
  deleteChambre(id:any){
    return this.http.delete('http://localhost:3000/chambres');
  }
  getChambreById(chambreId:number):Observable<any>{
    return this.http.get(`http://localhost:3000/chambres/${chambreId}`);
  }
}
