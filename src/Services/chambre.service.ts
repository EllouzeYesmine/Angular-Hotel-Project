import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Chambre } from 'src/Modeles/Chambre';

@Injectable({
  providedIn: 'root'
})
export class ChambreService {
  chambresUpdated = new EventEmitter<void>();
  constructor(private http:HttpClient) { }
  getChambres(){
    return this.http.get<Chambre[]>('http://localhost:3000/chambres')
  }
  getAllChambres(): Observable<Chambre[]> {
    return this.http.get<Chambre[]>('/api/chambres');
  }
  deleteChambre(id:any){
    return this.http.delete('http://localhost:3000/chambres');
  }
  getChambreById(chambreId:string):Observable<any>{
    return this.http.get(`http://localhost:3000/chambres/${chambreId}`);
  }
  onsave(form:Chambre):Observable<Chambre>
  {
    return this.http.post<Chambre>('http://localhost:3000/chambres',form);
  }
  ondelete (id:string):Observable<void>
  {
    return this.http.delete<void>(`http://localhost:3000/chambres/${id}`);
  }
  
  editChambre(id: string, form: any): Observable<any> {
    return this.http.put<void>(`http://localhost:3000/chambres/${id}`,form);
    
  }
 
 
}
 
