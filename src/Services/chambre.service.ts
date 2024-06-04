import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chambre } from 'src/Modeles/Chambre';

@Injectable({
  providedIn: 'root'
})
export class ChambreService {
  chambresUpdated = new EventEmitter<void>();

  private apiUrl = 'http://localhost:3000/chambres';

  constructor(private http: HttpClient) { }

  getChambres(): Observable<Chambre[]> {
    return this.http.get<Chambre[]>(this.apiUrl);
  }

  getAllChambres(): Observable<Chambre[]> {
    return this.http.get<Chambre[]>(this.apiUrl);
  }

  deleteChambre(id: string): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/chambres?id=${id}`);
  }

  getChambreById(chambreId: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/chambres?id=${chambreId}`);
  }

  createChambre(form: Chambre): Observable<Chambre> {
    return this.http.post<Chambre>(this.apiUrl, form);
  }

  editChambre(id: string, form: Chambre): Observable<Chambre> {
    return this.http.put<Chambre>(`${this.apiUrl}/${id}`, form);
  }
}
