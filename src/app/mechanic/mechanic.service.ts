import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mechanic } from './mechanic.model';

@Injectable({
  providedIn: 'root'
})
export class MechanicService {
  private baseUrl = 'http://localhost:3000/mechanics';

  constructor(private http: HttpClient) { }

  getMechanics(): Observable<Mechanic[]> {
    return this.http.get<Mechanic[]>(`${this.baseUrl}`);
  }

  addMechanic(mechanic: Mechanic): Observable<Mechanic> {
    return this.http.post<Mechanic>(`${this.baseUrl}`, mechanic);
  }

  updateMechanic(mechanic: Mechanic): Observable<Mechanic> {
    return this.http.put<Mechanic>(`${this.baseUrl}/${mechanic.id}`, mechanic);
  }

  deleteMechanic(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
