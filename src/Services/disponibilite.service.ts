import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisponibiliteService {

  constructor(private http: HttpClient) {}

getAvailability(roomType: string): Observable<string[]> {
  return this.http.get<string[]>(`http://localhost:3000/chambres/${roomType}`);
}
}