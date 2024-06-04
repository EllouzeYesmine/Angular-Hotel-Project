import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reservation } from 'src/Modeles/Reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = 'http://localhost:3000/reservation';

  constructor(private http: HttpClient) {}

  createReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(this.apiUrl, reservation);
  }

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiUrl).pipe(
      map((reservations: any[]) => 
        reservations.map(reservation => ({
          ...reservation,
          dateArrivee: new Date(reservation.dateArrivee),
          dateDepart: new Date(reservation.dateDepart)
        }))
      )
    );
  }

  getReservationById(idReservation: string): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.apiUrl}/${idReservation}`).pipe(
      map(reservation => ({
        ...reservation,
        dateArrivee: new Date(reservation.dateArrivee),
        dateDepart: new Date(reservation.dateDepart)
      }))
    );
  }

  deleteReservation(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateReservation(id: string, reservation: Reservation): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.apiUrl}/${id}`, {
      ...reservation,
      dateArrivee: reservation.dateArrivee.toISOString().split('T')[0],
      dateDepart: reservation.dateDepart.toISOString().split('T')[0]
    });
  }
}
