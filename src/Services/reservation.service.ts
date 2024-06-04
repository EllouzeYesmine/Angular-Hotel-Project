import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from 'src/Modeles/Reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) {}

  createReservation(reservation: any): Observable<any> {
    return this.http.post('http://localhost:3000/reservation', reservation);
  }
  getReservation(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>('http://localhost:3000/reservation')
  }
  getReservationById(idReservation:string):Observable<any>{
    return this.http.get(`http://localhost:3000/reservation/${idReservation}`);
  }
}
