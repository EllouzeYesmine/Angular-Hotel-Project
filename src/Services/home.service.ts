import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Chambre } from 'src/Modeles/Chambre';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private apiUrl = 'http://localhost:3000/chambres';

  constructor(private http: HttpClient) { }

  getAllChambres(): Observable<Chambre[]> {
    return this.http.get<Chambre[]>(this.apiUrl);
  }

  getAvailableChambres(): Observable<Chambre[]> {
    return this.getAllChambres().pipe(
      map(chambres => chambres.filter(chambre => chambre.available))
    );
  }
}
