import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Part } from './parts.model';


@Injectable({
  providedIn: 'root'
})
export class PartService {
  private baseUrl = 'http://localhost:3000/parts';

  constructor(private http: HttpClient) { }

  getParts(): Observable<Part[]> {
    return this.http.get<Part[]>(`${this.baseUrl}`);
  }

  addPart(part: Part): Observable<Part> {
    return this.http.post<Part>(`${this.baseUrl}`, part);
  }

  updatePart(part: Part): Observable<Part> {
    return this.http.put<Part>(`${this.baseUrl}/${part.id}`, part);
  }

  deletePart(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
